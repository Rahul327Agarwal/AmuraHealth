import axios from 'axios';
import { PMS_S3 } from '../../../../Utils';
import ErrorToaster from '../../../../Common/ErrorToaster';

export const getAllStaffRoles = async (panelId: string, props: any) => {
  const payload = {
    payLoad: {
      partKey: 'part_key',
      partKeyValue: `~roles~master~${props.selectedClient.tenant_id}~`,
      tableName: 'staff-info',
    },
  };
  const url = `${import.meta.env.VITE_BASE_API_URL}/queryFromDB`;
  try {
    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${props.sessions.id_token}` },
    });
    return response;
  } catch (error) {
    console.log('!!error', error);

    ErrorToaster(error.message, panelId, 'error');
  }
};

export const getAllStaffProfileFromRole = async (panelId: string, props: any, role: any) => {
  const { sessions, selectedClient, patientId } = props;
  try {
    const reqBody = {
      EventName: 'get_matched_staff',
      method: 'POST',
      PatientId: patientId,
      TenantId: selectedClient.tenant_id,
      patientId: patientId,
      tenantId: selectedClient.tenant_id,
      url: import.meta.env.VITE_BASE_GET_MATCHED_STAFF,
      token: sessions.id_token,
      roleId: role.value,
    };
    console.log('!!reqBody', reqBody);
    const response = await PMS_S3.postData(reqBody);
    if (!response?.Error) return response;
    ErrorToaster(response.Error.data, panelId, 'error');
    return null;
  } catch (error) {
    console.log('!!error', error);
    ErrorToaster(error.message, panelId, 'error');
    return null;
  }
};
