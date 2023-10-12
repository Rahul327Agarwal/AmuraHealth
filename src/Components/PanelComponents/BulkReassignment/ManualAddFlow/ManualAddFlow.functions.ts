import axios from 'axios';
import { StaffCard } from './ManualAddFlow.types';
import { getAssignedStaff } from '../../../../Common/Common.functions';
import { PMS_S3 } from '../../../../Utils';
import ErrorToaster from '../../../../Common/ErrorToaster';

export const getStaff = async (clientId: string, sessions: any) => {
  let staffs: any = [];
  staffs = await getAssignedStaff(clientId, sessions.id_token);
  if (!staffs) {
    staffs = null;
  } else {
    staffs = extractStaffDetails(staffs);
  }
  return staffs;
};

export const extractStaffDetails = (staffObject: any) => {
  if (staffObject?.StaffList) {
    return staffObject.StaffList;
  } else {
    return null;
  }
};

export const getAllStaffRoles = async (panelId: string, sessions: any, selectedClient: any) => {
  const payload = {
    payLoad: {
      partKey: 'part_key',
      partKeyValue: `~roles~master~${selectedClient?.tenant_id}~`,
      tableName: 'staff-info',
    },
  };
  const url = `${import.meta.env.VITE_BASE_API_URL}/queryFromDB`;
  try {
    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${sessions.id_token}` },
    });
    return response;
  } catch (error) {
    console.error('!!error', error);

    ErrorToaster(error.message, panelId, 'error');
  }
};

export const getEligibleRoles = async (sessions: any, selectedClient: any, roleId: string) => {
  const payload = {
    staffId: sessions.user.id,
    tenantId: selectedClient.tenant_id || 'amura',
    roleId: roleId || '',
    patientId: selectedClient.client_id,
  };
  const url = `${import.meta.env.VITE_ELIGIBLE_ROLES}pms/getEligibleRolesToAssign`;
  try {
    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${sessions.id_token}` },
    });
    return response;
  } catch (error) {
    console.error('!!error', error);

    ErrorToaster(error.message);
  }
};

export const formatStaffDetails = (selectedTenantID: string, allRolesList: Array<any>, tenantDetails: Array<any>): Array<any> => {
  let currentTenantDetails = tenantDetails.find((tenant) => tenant.TenantId === selectedTenantID);
  if (!currentTenantDetails) {
    return [];
  }
  let staffs = [];
  if (currentTenantDetails.Staffs) {
    let staffData = currentTenantDetails?.Staffs || [];
    staffData.forEach((staff) => {
      if (staff.Roles) {
        staff.Roles.forEach((role) => {
          let roleName = allRolesList.find((roleObject) => roleObject.value === role)?.label || role;
          let modifiedStaff: StaffCard = {
            name: staff.Id,
            id: staff.Id,
            roleName: roleName,
            roleId: role,
            hierarchyId: staff.hierarchyId,
          };
          staffs.push(modifiedStaff);
        });
      }
    });
  }
  return staffs;
};

export const getRoleNameFromId = (idArray: any, rolesList: any, requestKey: string, responseKey: string): Array<any> => {
  let covertedObj = [];
  for (let i = 0; i < idArray.length; i++) {
    let object = rolesList.find((rolesObj: any) => rolesObj[requestKey] === idArray[i]);
    if (object) {
      covertedObj.push(object[responseKey]);
    }
  }
  return covertedObj;
};

export const getUserNameAPI = async (sessions: any, payload: any) => {
  const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
  const response = await axios.post(url, payload, {
    headers: { Authorization: `Bearer ${sessions.id_token}` },
  });
  return response?.data?.body || [];
};
export const getUserName = async (senderId: string, sessions: any) => {
  const payload = {
    index: 'users',
    _source: ['sort_key', 'profile.nick_name', 'profile.first_name', 'profile.last_name'],
    query: {
      match: {
        _id: `${senderId}`,
      },
    },
  };
  let response = await getUserNameAPI(sessions, payload);
  return `${response[0]?._source?.profile?.first_name} ${response[0]?._source?.profile?.last_name}` || senderId;
};

// Not in use
// export const onConfirmDelete = async (props: StaffTeamProps, setLoadingFlag: Function, staffObject: any, paenlId: string) => {
//   setLoadingFlag(true);
//   try {
//     let bluedots = await getBlueDotsOfAStaffForAPatient(
//       props.sessions,
//       staffObject.roleId,
//       staffObject.id,
//       props.selectedClient.tenant_id,
//       props.selectedClient.client_id
//     );
//     if (bluedots.length > 0) {
//       ErrorToaster('The staff you are trying to change has unresolved bluedots');
//       throw new Error('Cannot removed the staff!');
//     }
//   } catch (e) {
//     ErrorToaster('Something went wrong! Please try again');
//     throw new Error('Something went wrong! Please try again');
//   }
//   let request = {
//     EventName: 'patient-add',
//     UserId: props.selectedClient.client_id,
//     Tenants: [
//       {
//         Id: props.selectedClient.tenant_id,
//         TenantId: props.selectedClient.tenant_id,
//         Staffs: [
//           {
//             Id: staffObject.id,
//             Roles: [staffObject.roleId],
//             Action: 'REMOVE',
//             hierarchyId: staffObject.hierarchyId,
//             roleId: staffObject.roleId,
//           },
//         ],
//       },
//     ],
//     url: `${import.meta.env.VITE_EVENT_API}`,
//     token: props.sessions.id_token,
//     AutoAssign: true,
//     method: 'POST',
//     headers: {},
//   };
//   setLoadingFlag(false);
//   staffToClientAPI(request)
//     .then(() => {
//       SuccessToaster('Staff deleted succesfully!', paenlId, 'success');
//     })
//     .catch((err: any) => {
//       ErrorToaster(err);
//     })
//     .finally(() => {
//       setLoadingFlag(false);
//     });
// };

export const staffToClientAPI = async (request: any): Promise<string | boolean> => {
  const response = await PMS_S3.postData(request);
  if (response?.Error) {
    return Promise.reject(response?.Error.data);
  } else {
    return Promise.resolve(true);
  }
};
