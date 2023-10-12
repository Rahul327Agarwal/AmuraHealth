import { PMS_S3 } from '../../../Utils';
import { Dispatch } from 'redux';
import { extactUserName } from './../../../Common/UserDetails.functions';
import { setRoleToClient } from './../../../DisplayFramework/State/Slices/AccessPermissionsSlice';
import {
  setAlluserRoles,
  setIsMyTeamLoading,
  setMyTeamData,
  setMyTeamOverFlowData,
  setPatientStaff,
  setStaffAssignJson,
} from './../../../DisplayFramework/State/Slices/DashboardSlice';
import axios from 'axios';
import { getAllStaffRoles, getAssignedStaff, getUserNameFromES } from './../../../Common/Common.functions';
import { IAllRoleDetails, ITeam } from '../MyListPanel/MyList/MyList.types';

/**
 *
 */
export async function getClientStaffData(
  props: any,
  selectedClientObject1: any,
  panels: number,
  dispatch: Dispatch<any>,
  patientId: string,
  isStaffAssignment: boolean,
  currentRole: { roleId: string; roleName: string },
  allRolesData: IAllRoleDetails[],
  isStaffRemoved?: boolean
) {
  try {
    dispatch(setIsMyTeamLoading(true));
    let staffList: any = [];
    let teamList: any = [];
    let staffs: any = await getAssignedStaff(patientId, props.sessions.id_token);

    if (!staffs) {
      staffs = null;
    } else {
      staffs = staffs?.StaffList;
      staffs?.map((eachTenant: { Staffs: any; TenantId: string }) => {
        if (eachTenant.TenantId === 'amura') {
          staffList.push(...eachTenant.Staffs);
        }
        if (eachTenant.TenantId === selectedClientObject1.tenant_id) {
          teamList.push(...eachTenant.Staffs);
        }
      });
    }
    dispatch(setPatientStaff(staffList));

    var staffArray: any = [];
    var teamArray: Array<ITeam> = [];
    staffList.filter((eachStaff: any) => {
      if (eachStaff.Id !== patientId) {
        let eachUser: any = { ...eachStaff };
        let userRoles: any = [];
        eachUser.originalRoles = eachStaff?.Roles;
        eachStaff?.Roles.map((eachRole: any) =>
          userRoles.push(allRolesData.find((role: IAllRoleDetails) => role.roleId === eachRole)?.roleName || eachRole)
        );
        eachUser.Roles = userRoles || eachStaff.Roles;
        eachUser.Team = eachStaff.Team;
        eachUser.ActiveClients = eachStaff.ActiveClients;
        staffArray.push(eachUser);
      }
    });
    teamList.filter((eachStaff: any) => {
      if (eachStaff.Id !== patientId) {
        let eachUser: any = { ...eachStaff, FirstName: ``, LastName: ``, Salutation: ``, UserName: eachStaff.Id };
        let userRoles: any = [];
        eachUser.originalRoles = eachStaff?.Roles;
        eachStaff?.Roles.map((eachRole: any) =>
          userRoles.push(allRolesData.find((role: IAllRoleDetails) => role.roleId === eachRole)?.roleName || eachRole)
        );
        eachUser.Roles = userRoles || eachStaff.Roles;
        eachUser.Team = eachStaff.Team;
        eachUser.ActiveClients = eachStaff.ActiveClients;
        teamArray.push(eachUser);
      }
    });
    let mergedStaff = [...staffArray, ...teamArray];

    let userIdsToGetNames = mergedStaff.map((each) => ({
      match: { _id: each.Id },
    }));

    // remove duplicates
    userIdsToGetNames = userIdsToGetNames.filter(
      (item: any, index: any, self: any) => index === self.findIndex((t: any) => t.match._id === item.match._id)
    );

    let userNameObjects: any = {};
    const payload = {
      index: 'users',
      _source: ['profile.nick_name', 'profile.first_name', 'profile.last_name', 'profile.salutation'],
      size: userIdsToGetNames.length,
      query: {
        bool: {
          must: {
            bool: {
              should: [...userIdsToGetNames],
            },
          },
        },
      },
    };
    let response = await getUsersList(props, payload);
    response.forEach((data: any) => {
      const { profile } = data._source || {};
      userNameObjects[data._id] = {
        FirstName: `${profile?.first_name || ''}`,
        LastName: `${profile?.last_name || ''}`,
        Salutation: `${profile?.salutation || ''}`,
        UserName: data._id,
      };
    });
    staffArray = staffArray.map((staff: any) => {
      return { ...staff, ...userNameObjects[staff.Id] };
    });
    teamArray = teamArray.map((staff: any) => {
      return { ...staff, ...userNameObjects[staff.Id] };
    });
    let indexOfPatientInArray = teamArray.findIndex((staff: any) => staff.UserName === props.sessions?.user?.id);
    let loggedInUser: ITeam;
    if (indexOfPatientInArray > -1) {
      loggedInUser = {
        ...teamArray[indexOfPatientInArray],
        Roles: [currentRole.roleName].map(
          (eachRole) => allRolesData.find((role: IAllRoleDetails) => role.roleId === eachRole)?.roleName || eachRole
        ),
        originalRoles: [currentRole.roleId],
      };
      // loggedInUser.Roles=["Amura client"]
      teamArray.splice(indexOfPatientInArray, 1);
    } else {
      const userName = await getUserNameFromES(props.sessions?.user?.id);
      loggedInUser = {
        FirstName: userName,
        LastName: '',
        Salutation: '',
        hierarchyId: '',
        Id: props.sessions?.user?.id,
        UserName: props.sessions?.user?.id,
        Roles: [currentRole.roleName].map(
          (eachRole) => allRolesData.find((role: IAllRoleDetails) => role.roleId === eachRole)?.roleName || eachRole
        ),
        originalRoles: [currentRole.roleId],
      };
    }
    dispatch(setIsMyTeamLoading(false));
    if (currentRole.roleId) {
      dispatch(setRoleToClient(currentRole.roleId));
    }

    teamArray = teamArray.filter((data, index, self) => {
      const dupIndex = self.findIndex((t) => t?.Id === data?.Id && t?.Roles?.join(',') === data?.Roles?.join(','));
      return index === dupIndex;
    });
    isStaffAssignment
      ? dispatch(setStaffAssignJson(staffArray))
      : isStaffRemoved
      ? dispatch(setMyTeamData([loggedInUser]))
      : dispatch(setMyTeamData([loggedInUser, ...teamArray]));
    let overFlowStaffList: any = [];
    teamArray?.map((item: any, i: any) => {
      if (i > panels - 1) {
        overFlowStaffList.push(item);
      }
    });
    // dispatch(setMyTeamOverFlowData(overFlowStaffList));
  } catch (error) {
    dispatch(setIsMyTeamLoading(false));
  }
}

/**
 *
 */
export const getUsersList = async (props: any, payload: any) => {
  const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
  const response = await axios.post(url, payload, {
    headers: { Authorization: `Bearer ${props.sessions.id_token}` },
  });
  return response?.data?.body || [];
};

/**
 *
 * @returns Width of a Single Card
 */
export const getCardFixedWidth = () => 296;
