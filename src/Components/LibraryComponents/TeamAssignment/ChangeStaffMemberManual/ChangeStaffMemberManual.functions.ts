import ErrorToaster from '../../../../Common/ErrorToaster';
import { PMS_S3 } from '../../../../Utils';
import { getBlueDotsOfAStaffForAPatient } from '../../ChatComponent/BlueDotPopUp/BlueDotClosePopUp/BlueDotClosePopUp.functions';
import { ChangeStaffMemberProps } from '../ChangeStaffMember/ChangeStaffMember.types';

export const removeExistingStaff = async (
  panelId: string,
  props: ChangeStaffMemberProps,
  removeStaffId: string,
  removeStaffRole: string,
  hierarchyId: string
): Promise<boolean> => {
  try {
    let bluedots = await getBlueDotsOfAStaffForAPatient(
      panelId,
      props.sessions,
      removeStaffRole,
      removeStaffId,
      props.selectedClient.tenant_id,
      props.selectedClient.client_id
    );
    if (bluedots.length > 0) {
      ErrorToaster('The staff you are trying to change has unresolved bluedots', panelId, 'error');
      return Promise.reject(false);
    }
  } catch (e) {
    return Promise.reject(false);
  }
  let request = {
    EventName: 'patient-add',
    UserId: props.selectedClient.client_id,
    Tenants: [
      {
        Id: props.selectedClient.tenant_id,
        TenantId: props.selectedClient.tenant_id,
        Staffs: [
          {
            Id: removeStaffId,
            hierarchyId: hierarchyId,
            Roles: [removeStaffRole],
            Action: 'REMOVE',
            roleId: removeStaffRole,
          },
        ],
      },
    ],
    url: `${import.meta.env.VITE_EVENT_API}`,
    token: props.sessions.id_token,
    AutoAssign: true,
    method: 'POST',
    headers: {},
  };
  try {
    let response = await PMS_S3.postData(request);
    console.log('Reponse of removal', response);
    return Promise.resolve(true);
  } catch (e) {
    console.error('Error while removing the staff', e);
    return Promise.reject(false);
  }
};

export const assignNewExistingStaff = async (
  props: ChangeStaffMemberProps,
  removeStaffId: string,
  removeStaffRole: string
): Promise<boolean> => {
  let request = {
    EventName: 'patient-add',
    UserId: props.selectedClient.client_id,
    Tenants: [
      {
        Id: props.selectedClient.tenant_id,
        TenantId: props.selectedClient.tenant_id,
        Staffs: [
          {
            Id: removeStaffId,
            Roles: [removeStaffRole],
            Action: 'ADD',
            roleId: removeStaffRole,
          },
        ],
      },
    ],
    url: `${import.meta.env.VITE_EVENT_API}`,
    token: props.sessions.id_token,
    AutoAssign: true,
    method: 'POST',
    headers: {},
  };
  try {
    let response = await PMS_S3.postData(request);
    console.log('Reponse of removal', response);
    return Promise.resolve(true);
  } catch (e) {
    console.error('Error while removing the staff', e);
    return Promise.reject(false);
  }
};
