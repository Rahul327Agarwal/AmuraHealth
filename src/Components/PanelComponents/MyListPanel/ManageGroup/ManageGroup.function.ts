import { v4 } from 'uuid';
import ErrorToaster from '../../../../Common/ErrorToaster';
import { PMS_S3 } from '../../../../Utils';
import SuccessToaster from '../../../../Common/SuccessToaster';

export const addGroupsAPICall = async (panelId: string, title, shortName, groupedBy, action, groupId, userID, sessions) => {
  const payload = {
    Locale: sessionStorage.getItem('locale'),
    url: import.meta.env.VITE_EVENT_API,
    token: sessions.id_token,
    EventName: 'mygroup',
    Action: action,
    userId: sessions?.user?.id,
    groupName: title.trim(),
    shortName: shortName,
    groupedBy: groupedBy,
    groupId: groupId === '' ? v4() : groupId,
    created_on: new Date().toDateString(),
    created_by: userID,
  };
  console.log('payload', payload);
  try {
    const response = await PMS_S3.postData(payload);
    console.log('!!res', response);
    if (response?.Error) return ErrorToaster(response?.Error.data, panelId, 'error');
    SuccessToaster(
      `Group ${action === 'ADD' ? 'added' : action === 'UPDATE' ? 'updated' : 'deleted'} successfully!`,
      panelId,
      'success'
    );
    return response;
  } catch (error) {
    console.log('err', error);
  }
};

export const enableGroups = (title: string, groupedBy: string, shortName: string) => {
  if (!title.trim()) {
    return false;
  }
  if (!groupedBy.trim()) {
    return false;
  }
  if (!shortName.trim()) {
    return false;
  }
  return true;
};

export const sortGroupsByDateofCreation = (groupList) => {
  return groupList?.slice().sort((a, b) => new Date(a.created_on).getTime() - new Date(b.created_on).getTime());
};
