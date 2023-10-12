import { createDefaultError, IOptionNew, IProps, roleActualObject, userActualObjectNew } from './UserRoleAssignment.types';
import axios from 'axios';
import { PMS_S3 } from '../../../Utils';

export const validateRoleMeta = (roleMeta: any, roles: Array<any>, isEdit: boolean): any => {
  let error = createDefaultError();
  let isValid = true;
  if (!roleMeta.roleId) {
    error.roleId = 'Role Id is required';
    isValid = false;
  }
  if (!roleMeta.roleName || roleMeta.roleName.id === '') {
    error.roleName = 'Role Name is required';
    isValid = false;
  }
  if (!isEdit && roles.find((role) => role.roleId === roleMeta.roleId)) {
    error.roleName = 'Role already created';
    isValid = false;
  }
  if (
    !roleMeta.reportingTo ||
    roleMeta.reportingTo.length === 0 ||
    (roleMeta.reportingTo.length > 0 && (!roleMeta.reportingTo[0].userId || !roleMeta.reportingTo[0].userName))
  ) {
    error.reportsTo = 'Reports To is required';
    isValid = false;
  }

  if (roleMeta.shiftSegments && roleMeta.shiftSegments.length > 0) {
    roleMeta.shiftSegments.forEach((shiftSegment: any) => {
      let shiftSegmentError = {} as any;

      if (!shiftSegment.weekDays || shiftSegment.weekDays.length === 0) {
        shiftSegmentError.weekDays = 'Week Days is required';
        isValid = false;
      }
      if (!shiftSegment.startDate) {
        shiftSegmentError.startDate = 'Start Date is required';
        isValid = false;
      }
      if (!shiftSegment.neverEnds && !shiftSegment.endDate) {
        shiftSegmentError.endDate = 'End Date is required';
        isValid = false;
      }
      if (!shiftSegment.startTime) {
        shiftSegmentError.startTime = 'Start Time is required';
        isValid = false;
      }
      if (!shiftSegment.endTime) {
        shiftSegmentError.endTime = 'End Time is required';
        isValid = false;
      }
      if (shiftSegment.startDate && new Date(shiftSegment.startDate).toString() === 'Invalid Date') {
        shiftSegmentError.startDate = 'Start Date is not valid';
        isValid = false;
      }
      if (shiftSegment.endDate && new Date(shiftSegment.endDate).toString() === 'Invalid Date') {
        shiftSegmentError.shiftSegmentError = 'End Date is not valid';
        isValid = false;
      }

      shiftSegmentError.segmentId = shiftSegment.segmentId;
      error.shiftSegments.push(shiftSegmentError);
    });
  }
  return { isValid, error };
};

export const addRoleAPI = async (role: any, roles: Array<any>, props: IProps): Promise<any> => {
  try {
    const { isValid, error } = validateRoleMeta(role, roles, false);
    if (!isValid) {
      return Promise.reject({ statusCode: 504, error });
    }
    let payload = {
      ...createRolePayload(role, roles, false, false, props.selectedClient),
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_EVENT_API,
      token: props.sessions.id_token,
      method: 'POST',
      headers: {},
    };
    console.log('Add role API payload', payload);
    return PMS_S3.postData(payload);
  } catch (e) {
    console.log(e, 'Issue in addRoleAPI catch');
  }
};

export const updateRoleAPI = (role: any, roles: Array<any>, selectedClient: any, sessions: any): Promise<any> => {
  try {
    const { isValid, error } = validateRoleMeta(role, roles, true);
    if (!isValid) {
      return Promise.reject({ statusCode: 504, error });
    }
    let payload = {
      ...createRolePayload(role, roles, false, true, selectedClient),
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_EVENT_API,
      token: sessions.id_token,
      method: 'POST',
      headers: {},
    };
    console.log('Update role API payload', payload);
    return PMS_S3.postData(payload);
  } catch (e) {
    console.log(e, 'Issue in updateRoleAPI catch');
  }
};

export const deleteRoleAPI = (role: any, roles: Array<any>, props: IProps): Promise<any> => {
  try {
    let payload = {
      ...createRolePayload(role, roles, true, true, props.selectedClient),
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_EVENT_API,
      token: props.sessions.id_token,
      method: 'POST',
      headers: {},
    };
    console.log('deleteRoleAPI payload', payload);
    return PMS_S3.postData(payload);
  } catch (e) {
    console.log(e, 'Issue in deleteRoleAPI catch');
  }
};

export const convertRoleObjectToOption = (role: any): any => {
  return {
    id: role.roleId,
    label: role.roleName,
  };
};

export const convertUserObjectsToOptions = (reportees: any): any => {
  let options: any = [];
  reportees.forEach((reportee: any) => {
    options.push({
      id: reportee.userId,
      label: reportee.userName,
    });
  });
  return options;
};

export const convertRoleObjectToOptionNew = (role: any): any => {
  return {
    value: role.roleId,
    label: role.roleName,
  };
};

export const convertUserObjectsToOptionsNew = (reportees: any): any => {
  let options: any = [];
  (reportees || []).forEach((reportee: any) => {
    options.push({
      value: reportee.userId,
      label: reportee.userName,
      subLabel: reportee?.roleName || '',
      roleId: reportee?.roleId || '',
      // roleId: reportee.roleId,
      // roleName: reportee.roleName,
    });
  });
  return options;
};

export const defaultStartEndDate = (segment: any, key: string) => {
  let segmentTemp = JSON.parse(JSON.stringify(segment));
  let segmentEndDate = new Date(segmentTemp['endDate']);
  segmentEndDate.setHours(0, 0, 0, 0);
  let segmentStartDate = new Date(segmentTemp['startDate']);
  segmentStartDate.setHours(0, 0, 0, 0);
  if (key === 'startDate') {
    if (!segmentTemp['endDate']) {
      segmentTemp['endDate'] = new Date(segmentTemp['startDate']);
      return segmentTemp;
    }
    if (segmentEndDate.getTime() < segmentStartDate.getTime()) {
      segmentTemp['endDate'] = new Date(segmentTemp['startDate']);
      return segmentTemp;
    }
  }
  if (key === 'endDate') {
    if (!segmentTemp['startDate']) {
      segmentTemp['startDate'] = new Date(segmentTemp['endDate']);
      return segmentTemp;
    }
    if (segmentEndDate.getTime() < segmentStartDate.getTime()) {
      segmentTemp['startDate'] = new Date(segmentTemp['endDate']);
      return segmentTemp;
    }
  }
  if (key === 'neverEnds') {
    if (!segment['neverEnds']) {
      segmentTemp['endDate'] = new Date(segmentTemp['startDate']);
      return segmentTemp;
    }
  }
  return segmentTemp;
};

const updatingStartEndTime = (shiftSegments: any) => {
  try {
    return shiftSegments.map((shift: any) => {
      let shiftSegment = JSON.parse(JSON.stringify(shift));
      let segmentStartDate = new Date(shiftSegment.startDate);
      let segmentEndDate = new Date(shiftSegment.endDate);
      segmentStartDate.setHours(0, 0, 0, 0);
      segmentEndDate.setHours(0, 0, 0, 0);
      let segmentStartTime = new Date(shiftSegment.startTime);
      let segmentEndTime = new Date(shiftSegment.endTime);
      if (segmentEndTime.getTime() <= segmentStartTime.getTime()) {
        segmentEndTime.setDate(segmentStartTime.getDate() + 1);
      }
      shiftSegment.startTime = segmentStartTime.toISOString();
      shiftSegment.endTime = segmentEndTime.toISOString();
      shiftSegment.startDate = segmentStartDate.toISOString();
      shiftSegment.endDate = segmentEndDate.toISOString();
      return shiftSegment;
    });
  } catch (e) {
    console.log('Error in updatingStartEndTime', e);
    return new Error(shiftSegments.toString());
  }
};

export const createRolePayload = (
  role: any,
  existingRoles: Array<any>,
  isDelete: boolean,
  isEdit: boolean,
  selectedClient: any
) => {
  try {
    let payload = {} as any;
    let newRequestObj = JSON.parse(JSON.stringify(role));
    newRequestObj.shiftSegments = updatingStartEndTime([...newRequestObj.shiftSegments]);

    payload.EventName = 'add-staff-role';
    payload.userId = selectedClient.client_id;
    payload.tenantId = selectedClient.tenant_id;
    // payload.is_active = role.is_active;
    // payload.isEdit, (payload.action = isDelete ? 'DELETE' : isEdit ? 'UPDATE' : 'ADD'),
    payload = { ...payload, roles: [{ ...newRequestObj, isEdit, action: isDelete ? 'DELETE' : isEdit ? 'UPDATE' : 'ADD' }] };
    return payload;
  } catch (e) {
    console.log('Issue while create createPayload', e);
  }
};

export const convertDaysToUTCDays = (startDate, weekDays, toUTC: boolean) => {
  const systemWeekDay = new Date(startDate).getDay();
  const UTCWeekDay = new Date(startDate).getUTCDay();

  if (systemWeekDay !== UTCWeekDay && weekDays) {
    const dayDif = systemWeekDay - UTCWeekDay;
    weekDays = weekDays
      .map((value) => value + (toUTC ? -dayDif : dayDif))
      .map((value) => (value < 0 ? 7 + value : value >= 7 ? value - 7 : value))
      .sort((a, b) => a - b);
  }
  return weekDays;
};

export const formatRoleOptions = (roles: roleActualObject[]): IOptionNew[] => {
  return roles.map((role) => {
    return {
      label: role.roleName,
      value: role.roleId,
    };
  });
};

export const formatUserOptions = (users: userActualObjectNew[]) => {
  return users.map((user) => {
    return {
      label: user.staffName,
      value: user.staffId,
      subLabel: user.roleName,
      roleId: user.roleId,
    };
  });
};
export const getRolesInfoFromES = async () => {
  try {
    let payload = { index: 'roles_info', size: 1000 };
    const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
    const response = await axios.post(url, payload);
    if (response?.data?.body.length > 0) {
      let modifyObj = response?.data?.body
        .filter((eachRole) => {
          if (eachRole?._source?.roleId && eachRole?._source?.roleName) return true;
          return null;
        })
        .map((roleObj) => ({ roleId: roleObj?._source?.roleId, roleName: roleObj?._source?.roleName }));
      return modifyObj;
    }
    return [];
  } catch (error) {
    return [];
  }
};
export const getstafInfoFromES = async () => {
  try {
    let payload = { index: 'staff_info', size: 1000 };
    const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
    const response = await axios.post(url, payload);
    return response?.data?.body || [];
  } catch (error) {
    return [];
  }
};

export const getStaffDataFromS3 = async (props: any) => {
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
    if (!res.Error) {
      return res;
    }
    return [];
  } catch (error) {
    console.log('!!error', error);
    return [];
  }
};
