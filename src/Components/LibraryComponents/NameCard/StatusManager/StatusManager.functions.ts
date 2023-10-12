import axios from 'axios';
import { getHierarchyStaff } from '../../../../Common/Common.functions';
import ErrorToaster from '../../../../Common/ErrorToaster';
import SuccessToaster from '../../../../Common/SuccessToaster';
import { PMS_S3 } from '../../../../Utils';
import { INameCard } from '../../../PanelComponents/MyListPanel/MyList/MyList.types';
// export const getStatusForAllRoles = async (tenantId: string, role: string, props: any) => {
//   console.log('role is:', role);
//   let status: any = [];
//   status = await PMS_S3.getObject(
//     `pms-ql-status/${tenantId}/${role}/allStatus.json`,
//     import.meta.env.VITE_CLIENT_BUCKET,
//     {
//       TenantId: tenantId,
//       Locale: sessionStorage.getItem('locale'),
//       url: import.meta.env.VITE_S3_FETCH_API,
//       token: props.sessions.id_token,
//       headers: {},
//     },
//     {}
//   );
//   if (status.Error) {
//     return [];
//   }
//   return status;
// };

export const getStatusForAllRoles = async (panelId: string, tenantId: string, role: string, props: any) => {
  const payload = {
    payLoad: {
      partKey: 'lov_name',
      partKeyValue: `~status~collection~amura~${role}~`,
      sortKey: 'lov_name_id',
      sorkKeyValue: 'edgeColor~collection',
      tableName: 'platform-lov-master',
    },
  };
  const url = `${import.meta.env.VITE_BASE_API_URL}/queryFromDB`;
  try {
    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${props.sessions.id_token}` },
    });
    return { edgeColor: response?.data[0]?.statusValues || [] };
  } catch (error) {
    console.log('!!error', error);

    ErrorToaster(error.message, panelId, 'error');
  }
};

export const defaultWonstate = {
  comment: '',
  paymentId: '',
  paymentIdError: '',
};

export const defaultLoststate = { comment: '' };

export const updateStatus = async (
  panelId: string,
  status: any,
  eachClientData: INameCard,
  sessions: any,
  additionDetails?: any
) => {
  let userId = eachClientData.additionalKeys?.patientId;
  let tenantId = eachClientData?.tenantId ? eachClientData?.tenantId : '';

  let request: any = {
    tenantId: tenantId,
    patientId: userId,
    roleId: eachClientData.roleId,
    statusType: 'edgeColor',
    current_status: status,
    previous_status: '',
    hierarchyId: eachClientData.additionalKeys.hierarchyId,
    UserName: sessions.user.id,
  };
  if (additionDetails?.comments) request = { ...request, ['Comments']: additionDetails.comments.trim() };
  if (additionDetails?.paymentReference)
    request = {
      ...request,
      ['PaymentReference']: additionDetails.paymentReference.trim(),
    };
  const response: any = await axios.post(import.meta.env.VITE_STATUS_CHANGE, request);
  if (response?.Error) {
    ErrorToaster('Something went wrong! Please try again.', panelId, 'error');
    return false;
  } else {
    SuccessToaster('Status updated successfully', panelId, 'success');
    return request;
  }
};

export const notifyStatusUpdate = async (selectedCard: INameCard, notifyEvent: Function, props: any, payload: any,fetchMultipleUserNames:Function) => {
  let assignees = await getHierarchyStaff(selectedCard.additionalKeys.hierarchyId,fetchMultipleUserNames);
  assignees.forEach((assignee) => {
    let [_empty1, staffId, roleId, _empty2] = assignee.value.split('~');
    notifyEvent({
      input: {
        user_id: `${staffId}`,
        event_name: 'UPDATED_STATUS',
        timestamp: `${new Date().getTime()}`,
        last_message: JSON.stringify({ ...payload, patientId: selectedCard.additionalKeys.patientId }) ?? '',
      },
    });
  });
};

export function capitalizeFirstLetter(string = '', abv?: string): string {
  if (abv && string.toLocaleLowerCase().indexOf(abv.toLocaleLowerCase()) >= 0) {
    let endsAt = string.toLocaleLowerCase().indexOf(abv) + (abv.length - 1);
    return abv.toUpperCase() + string.slice(endsAt + 1).toLowerCase();
  }
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export const AddWatchList = async (panelId: string, payloadData, props) => {
  try {
    let payload = {
      ...payloadData,
      EventName: 'patient-add',
      url: `${import.meta.env.VITE_EVENT_API}`,
      token: props.sessions.id_token,
      AutoAssign: true,
      method: 'POST',
      headers: {},
    };
    console.log('payload for watch list', payload);
    const response = await PMS_S3.postData(payload);
    if (response?.Error) {
      return Promise.reject(response?.Error.data);
    } else {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    ErrorToaster(error.message, panelId, 'error');
  }
};
