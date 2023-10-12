import ErrorToaster from '../../../../../Common/ErrorToaster';
import { PMS_S3 } from '../../../../../Utils';
import { IProps } from '../PrescriptionView.types';

export const getRegions = async (panelId: string, props: IProps) => {
  const { sessions, selectedClient } = props;
  const response = await PMS_S3.getObject(`pms-ql-regions/allRegions.json`, import.meta.env.VITE_PLATFORM_BUCKET, {
    TenantId: selectedClient.tenant_id,
    Locale: sessionStorage.getItem('locale'),
    url: import.meta.env.VITE_S3_FETCH_API,
    token: sessions.id_token,
    headers: {},
  });

  if (response?.Error) {
    ErrorToaster('Region data is not configured in the system', panelId, 'error');
    return null;
  } else {
    return response;
  }
};

export const getUserInformation = async (props: IProps) => {
  const { sessions, selectedClient } = props;
  const response = await PMS_S3.getObject(
    `pms-ql-user/${selectedClient.client_id}/userProfile.json`,
    import.meta.env.VITE_CLIENT_BUCKET,
    {
      TenantId: selectedClient.tenant_id,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_S3_FETCH_API,
      token: sessions.id_token,
      headers: {},
    }
  );
  if (response?.Error) {
    return null;
  } else {
    return {
      residingCountry: response.ResidingCountry,
      cuisine: response.Cuisine,
      userData: response,
      HealthType: response.HealthType,
    };
  }
};

export const validatePrescriptionLength = (length: string) => {
  let error = '';
  if (!length) {
    error = 'Please enter prescription length';
  }
  if (Number(length) === 0) {
    error = 'Prescription length cannot be zero';
  }
  if (Number(length) > 90) {
    error = 'Prescription length cannot be more than 90 days';
  }
  return error;
};
