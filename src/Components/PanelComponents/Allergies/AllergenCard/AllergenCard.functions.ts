import { PMS_S3 } from '../../../../Utils';
import ErrorToaster from './../../../../Common/ErrorToaster';

export const updateStateOfAllergen = async (
  panelId: string,
  patientId: string,
  data: any,
  isActive: boolean,
  description: string,
  callBack: Function,
  revertBackToggle: Function,
  setLoadingFlag: Function,
  setData: Function,
  sessions: any,
  selectedClient: any
) => {
  setLoadingFlag(true);
  const allergenId = data?.AllergenId || null;
  if (allergenId) {
    let reqBody = {
      EventName: 'allergen-state-update',
      PatientId: patientId,
      AllergenId: allergenId,
      IsActive: isActive ? 1 : 0,
      RectifiedOn: '',
      IdentifiedOn: '',
      Description: description,
      TenantId: selectedClient.tenant_id,
      ShortName: data.ShortName,
      LongName: data.LongName,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_EVENT_API,
      token: sessions.id_token,
      method: 'POST',
      headers: {},
    };
    const resp = await PMS_S3.postData(reqBody);
    if (resp?.Error) {
      ErrorToaster(resp?.Error.data, panelId, 'error');
      revertBackToggle();
    } else {
      let desArray = data.Descriptions || [];
      desArray.push({
        DescriptionId: description,
        UpdatedOn: `${new Date().toString()}`,
        Description: description,
      });
      let tempObject = data;
      tempObject.Descriptions = desArray;
      setData(JSON.parse(JSON.stringify(tempObject)));
    }
  }
  setLoadingFlag(false);
};
