import { PMS_S3 } from '../../../Utils';
import ErrorToaster from './../../../Common/ErrorToaster';
import { setAllergens, setAllergensList } from './../../../DisplayFramework/State/Slices/DashboardSlice';
export async function getData(
  currentpatientId: string,
  dispatch: any,
  setLoadingFlag: Function,
  sessions: any,
  selectedClient: any
) {
  const emptyObj = { patientId: currentpatientId, Allergens: [] };
  const allergenData: any = await PMS_S3.getObject(
    `pms-ql-allergens/${currentpatientId}/allergens.json`,
    import.meta.env.VITE_CLIENT_BUCKET,
    {
      TenantId: selectedClient.tenant_id,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_S3_FETCH_API,
      token: sessions.id_token,
      headers: {},
    },
    emptyObj
  );
  if (!allergenData?.Error) {
    dispatch(setAllergens(JSON.parse(JSON.stringify(allergenData))));
  } else {
    dispatch(setAllergens(emptyObj));
  }
  setLoadingFlag(false);
}

export async function getListOfAllAllergens(dispatch: any, sessions: any, selectedClient: any) {
  const allAllergenData: any = await PMS_S3.getObject(
    `pms-ql-list-allergens/allAllergens.json`,
    import.meta.env.VITE_PLATFORM_BUCKET,
    {
      TenantId: selectedClient.tenant_id,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_S3_FETCH_API,
      token: sessions.id_token,
      headers: {},
    },
    { Allergens: [] }
  );
  allAllergenData.Allergens = allAllergenData.Allergens.sort((a: any, b: any) => a.ShortName.localeCompare(b.ShortName));
  dispatch(setAllergensList(allAllergenData.Allergens || []));
}

export async function addNewAllergen(
  panelId: string,
  patientId: any,
  allergen: any,
  setLoadingFlag: Function,
  setOpenAddSnippet: Function,
  dispatch: any,
  data: any,
  allAllergens: any,
  sessions: any,
  selectedClient: any
) {
  let payload = {};
  const alreadyAddedAllergen =
    data?.Allergens?.find((value: any) => value.AllergenId.toLowerCase() === allergen.allergenId.toLowerCase()) || null;
  const allergenObj = allAllergens.find((item: any) => item.AllergenId === allergen.allergenId);
  if (alreadyAddedAllergen) {
    payload = {
      EventName: 'allergen-state-update',
      PatientId: patientId,
      AllergenId: allergen.allergenId,
      Description: allergen.description,
      ShortName: allergenObj.ShortName,
      LongName: allergenObj.LongName,
      IsActive: 1,
      IdentifiedOn: '',
      TenantId: selectedClient.tenant_id,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_EVENT_API,
      token: sessions.id_token,
      method: 'POST',
      headers: {},
    };
  } else {
    payload = {
      EventName: 'allergen-add',
      PatientId: patientId,
      AllergenId: allergen.allergenId,
      Description: allergen.description,
      IdentifiedOn: '',
      IsActive: 1,
      TenantId: selectedClient.tenant_id,
      ShortName: allergenObj.ShortName,
      LongName: allergenObj.LongName,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_EVENT_API,
      token: sessions.id_token,
      method: 'POST',
      headers: {},
    };
  }
  const response = await PMS_S3.postData(payload);
  if (!response?.Error) {
    if (alreadyAddedAllergen) {
      const historyObject = {
        DescriptionId: allergen.description,
        UpdatedOn: `${new Date().toString()}`,
        Description: allergen.description,
      };
      if (alreadyAddedAllergen.Descriptions && alreadyAddedAllergen.Descriptions.length > 0) {
        alreadyAddedAllergen.CurrentState = {
          IdentifiedOn: `${new Date().toString()}`,
          CompletedOn: '',
          IsActive: 1,
          UpdatedOn: `${new Date().toString()}`,
        };
        alreadyAddedAllergen.Descriptions.push(historyObject);
      } else {
        alreadyAddedAllergen.Descriptions = [historyObject];
      }
      data?.Allergens?.map((value: any) => {
        if (value.AllergenId.toLowerCase() === allergen.allergenId.toLowerCase()) {
          return alreadyAddedAllergen;
        } else {
          return value;
        }
      });
      dispatch(setAllergens(JSON.parse(JSON.stringify(data))));
    } else {
      const AllergenObject = {
        AllergenId: allergen.allergenId,
        PatientAllergenId: allergen.allergenId,
        ShortName: allergen.allergenId,
        AllergenName: allergen.allergenId,
        AllergenDescription: allergen.description,
        States: [
          {
            IdentifiedOn: `${new Date().toString()}`,
            CompletedOn: '',
            IsActive: 1,
            UpdatedOn: `${new Date().toString()}`,
          },
        ],
        Descriptions: [
          {
            DescriptionId: allergen.description,
            UpdatedOn: `${new Date().toString()}`,
            Description: allergen.description,
          },
        ],
        CurrentState: {
          IdentifiedOn: `${new Date().toString()}`,
          CompletedOn: '',
          IsActive: 1,
          UpdatedOn: `${new Date().toString()}`,
        },
      };
      if (data?.Allergens?.length > 0) {
        data.Allergens.push(AllergenObject);
      } else {
        data.Allergens = [AllergenObject];
      }
      data.Allergens = data.Allergens.sort((a: any, b: any) => a.AllergenId.localeCompare(b.AllergenId));
      dispatch(setAllergens(JSON.parse(JSON.stringify(data))));
    }
    setOpenAddSnippet(false);
  } else {
    ErrorToaster(response?.Error.data, panelId, 'error');
  }
  setLoadingFlag(false);
}
