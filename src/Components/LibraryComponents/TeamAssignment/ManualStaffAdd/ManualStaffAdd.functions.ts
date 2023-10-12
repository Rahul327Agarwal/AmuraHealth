import { PMS_S3 } from '../../../../Utils';
import ErrorToaster from '../../../../Common/ErrorToaster';

export const getAllStaffForThatRole = async (panelId: string, props: any, role: any) => {
  const { sessions, selectedClient, patientId } = props;
  try {
    const reqBody = {
      EventName: 'get_matched_staff',
      method: 'POST',
      PatientId: patientId,
      TenantId: selectedClient.tenant_id,
      patientId: patientId,
      tenantId: selectedClient.tenant_id,
      url: import.meta.env.VITE_BASE_GET_STAFF_ROLE,
      token: sessions.id_token,
      roleId: role.value,
    };
    console.log('!!reqBody', reqBody);
    const response = await PMS_S3.postData(reqBody);
    if (!response?.Error) return response;
    ErrorToaster(response?.Error?.data || 'Something went wrong! Please try again later', panelId, 'error');
    return null;
  } catch (error) {
    console.log('!!error', error);
    ErrorToaster(error?.message || 'Something went wrong! Please try again later', panelId, 'error');
    return null;
  }
};
export const getAllStaffForThatRolesNew = async (panelId: string, props: any, role: any, setIsLoading: Function) => {
  const { sessions, selectedClient } = props;
  try {
    let res = await PMS_S3.getObject(
      `pms-ql-roles/allStaffInfo.json`,
      import.meta.env.VITE_CLIENT_BUCKET,
      {
        TenantId: selectedClient?.tenant_id || '',
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: sessions.id_token,
        headers: {},
      },
      []
    );
    setIsLoading(false);
    if (res.length) {
      let filterObj = res.filter((eachRole) => eachRole.roleId === role.value);
      return filterObj;
    }
    return [];
  } catch (error) {
    console.log('!!error', error);
    setIsLoading(false);
    ErrorToaster(error?.message || 'Something went wrong! Please try again later', panelId, 'error');
    return [];
  }
};
