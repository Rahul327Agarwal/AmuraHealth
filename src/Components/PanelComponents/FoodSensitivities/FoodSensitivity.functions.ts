import { PMS_S3 } from '../../../Utils';
import ErrorToaster from './../../../Common/ErrorToaster';
import { setFoodSensitivities, setFoodSensitivitiesList } from './../../../DisplayFramework/State/Slices/DashboardSlice';

export async function getData(
  currentpatientId: string,
  dispatch: any,
  setLoadingFlag: Function,
  sessions: any,
  selectedClient: any
) {
  const emptyObj = { patientId: currentpatientId, Sensitivitys: [] };
  const sensitivityData: any = await PMS_S3.getObject(
    `pms-ql-sensitivity/${currentpatientId}/sensitivity.json`,
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
  if (!sensitivityData?.Error) {
    dispatch(setFoodSensitivities(JSON.parse(JSON.stringify(sensitivityData))));
  } else {
    dispatch(setFoodSensitivities(emptyObj));
  }
  setLoadingFlag(false);
}

export async function getListOfAllSensitivities(dispatch: any, sessions: any, selectedClient: any) {
  const allSensitivityData: any = await PMS_S3.getObject(
    `pms-ql-list-sensitivity/sensitivities.json`,
    import.meta.env.VITE_PLATFORM_BUCKET,
    {
      TenantId: selectedClient.tenant_id,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_S3_FETCH_API,
      token: sessions.id_token,
      headers: {},
    },
    { Sensitivities: [] }
  );
  allSensitivityData.Sensitivities = allSensitivityData.Sensitivities.sort((a: any, b: any) =>
    a.ShortName.localeCompare(b.ShortName)
  );
  dispatch(setFoodSensitivitiesList(allSensitivityData.Sensitivities || []));
}

export async function addNewSensitivity(
  panelId: string,
  patientId: any,
  sensitivity: any,
  setLoadingFlag: Function,
  setOpenAddSnippet: Function,
  dispatch: Function,
  data: any,
  allSensitivities: any,
  sessions: any,
  selectedClient: any
) {
  let payload = {};
  const alreadyAddedSensitivity =
    data?.Sensitivitys?.find((value: any) => value.SensitivityId.toLowerCase() === sensitivity.sensitivityId.toLowerCase()) ||
    null;
  const sensitivityObject = allSensitivities.find((item: any) => item.SensitivityId === sensitivity.sensitivityId);

  if (alreadyAddedSensitivity) {
    payload = {
      EventName: 'food-sensitivity-state-update',
      PatientId: patientId,
      SensitivityId: sensitivity.sensitivityId,
      Description: sensitivity.description,
      IsActive: 1,
      ShortName: sensitivityObject.ShortName,
      LongName: sensitivityObject.LongName,
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
      EventName: 'food-sensitivity-add',
      PatientId: patientId,
      SensitivityId: sensitivity.sensitivityId,
      Description: sensitivity.description,
      IdentifiedOn: '',
      IsActive: 1,
      ShortName: sensitivityObject.ShortName,
      LongName: sensitivityObject.LongName,
      TenantId: selectedClient.tenant_id,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_EVENT_API,
      token: sessions.id_token,
      method: 'POST',
      headers: {},
    };
  }
  const response = await PMS_S3.postData(payload);
  if (!response?.Error) {
    if (alreadyAddedSensitivity) {
      const historyObject = {
        DescriptionId: sensitivity.description,
        UpdatedOn: `${new Date().toString()}`,
        Description: sensitivity.description,
      };
      if (alreadyAddedSensitivity.Descriptions && alreadyAddedSensitivity.Descriptions.length > 0) {
        alreadyAddedSensitivity.CurrentState = {
          IdentifiedOn: `${new Date().toString()}`,
          CompletedOn: '',
          IsActive: 1,
          UpdatedOn: `${new Date().toString()}`,
        };
        alreadyAddedSensitivity.Descriptions.push(historyObject);
      } else {
        alreadyAddedSensitivity.Descriptions = [historyObject];
      }
      data?.Sensitivitys?.map((value: any) => {
        if (value.SensitivityId.toLowerCase() === sensitivity.sensitivityId.toLowerCase()) {
          return alreadyAddedSensitivity;
        } else {
          return value;
        }
      });
      dispatch(setFoodSensitivities(JSON.parse(JSON.stringify(data))));
    } else {
      const sensitivityObject = {
        SensitivityId: sensitivity.sensitivityId,
        PatientSensitivityId: sensitivity.sensitivityId,
        ShortName: sensitivity.sensitivityId,
        SensitivityName: sensitivity.sensitivityId,
        SensitivityDescription: sensitivity.description,
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
            DescriptionId: sensitivity.description,
            UpdatedOn: `${new Date().toString()}`,
            Description: sensitivity.description,
          },
        ],
        CurrentState: {
          IdentifiedOn: `${new Date().toString()}`,
          CompletedOn: '',
          IsActive: 1,
          UpdatedOn: `${new Date().toString()}`,
        },
      };
      if (data?.Sensitivitys?.length > 0) {
        data.Sensitivitys.push(sensitivityObject);
      } else {
        data.Sensitivitys = [sensitivityObject];
      }
      data.Sensitivitys = data.Sensitivitys.sort((a: any, b: any) => a.SensitivityId.localeCompare(b.SensitivityId));
      dispatch(setFoodSensitivities(JSON.parse(JSON.stringify(data))));
    }
    setOpenAddSnippet(false);
  } else {
    ErrorToaster(response?.Error.data, panelId, 'error');
  }
  setLoadingFlag(false);
}
