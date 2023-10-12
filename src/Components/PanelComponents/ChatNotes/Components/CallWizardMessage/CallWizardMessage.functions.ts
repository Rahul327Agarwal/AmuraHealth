import { IUserNameObj } from "../../../../../Common/Common.functions";
import SuccessToaster from "../../../../../Common/SuccessToaster";
import { IAllRoleDetails } from "../../../MyListPanel/MyList/MyList.types";

export const filterUserData = async (roomUsers: any, participants: any, roles: IAllRoleDetails[], userNames: IUserNameObj) => {
  let filterParticipantsObj = participants.filter((each: any) => roomUsers.find((user: any) => user.userId === each.userId));
  let filterobj = filterParticipantsObj?.map((data: any) => ({
    id: data.userId,
    label: roomUsers.find((user: any) => user.userId === data.userId)?.userName || data.userId,
    roleId: data.roleId,
    roleName: roles.find((role: IAllRoleDetails) => role.roleId === data.roleId)?.roleName || data.roleId,
  }));

  let convertObj = filterobj.map((eachone: any) => eachone.id);
  let filterDeltedUsers = participants.filter((each: any) => !convertObj.includes(each.userId));
  let convertObj2 = [];
  for (let i = 0; i < filterDeltedUsers.length; i++) {
    let responseName = userNames[filterDeltedUsers[i]?.userId];
    const options = {
      id: filterDeltedUsers[i]?.userId,
      label: responseName,
      roleid: filterDeltedUsers[i].roleId,
      roleName:
        roles.find((role: IAllRoleDetails) => role.roleId === filterDeltedUsers[i].roleId)?.roleName ||
        filterDeltedUsers[i].roleId,
    };
    convertObj2.push(options);
  }
  filterobj.push(...convertObj2);
  return filterobj;
};

export const settingColors = (rawdata: any) => {
  let colors = ['#40916C', '#E45C3A', '#0096C7', '#DA4EC3', '#CEEF00', '#FF9110', '#CC444B', '#FFB743', '#FF8110'];

  let newObjk = rawdata.map((each, index) => ({
    ...each,
    color: rawdata.length > 1 ? colors[index] : '#FFFFFF',
  }));
  return newObjk;
};

export const copyToClipboard = (scheduleURL: string, panelId: string) => {
  let urlToOpen = `${window.location.protocol}//${window.location.host}${scheduleURL}`;
  navigator.clipboard.writeText(urlToOpen);
  SuccessToaster('Link copied to clipboard', panelId, 'success');
};
