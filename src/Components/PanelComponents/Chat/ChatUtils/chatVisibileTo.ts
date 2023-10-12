import { globalChannelVariables } from '../Chat.types';

export const canEveryOneSeeThisMessage = (visibilityArray: Array<string>): boolean => {
  if (visibilityArray.includes('ALL')) return true;
  return false;
};

export const onlySenderCanSeeThisMessage = (visibilityArray: Array<string>): boolean => {
  if (visibilityArray.includes('CLIENT')) return true;
  return false;
};

export const onlyTeamCanSeeThisMessage = (visibilityArray: Array<string>): boolean => {
  if (visibilityArray.includes('ALL_STAFF')) return true;
  return false;
};

export const checkLoggedInUserIsSender = (userId: string, senderId: string): boolean => {
  return userId === senderId;
};

export const checkLoggedInUserIsPatient = (patientId: string, userId: string): boolean => {
  return userId === patientId;
};

export const isMessageVisibleToUser = (
  patientId: string,
  senderId: string,
  contextType: string,
  visibilityArray: Array<string>
): boolean => {
  if (contextType === '@CALLOUT') {
    if (canEveryOneSeeThisMessage(visibilityArray)) return true;
    if (onlySenderCanSeeThisMessage(visibilityArray))
      return checkLoggedInUserIsSender(senderId, globalChannelVariables.chatUserId);
    if (onlyTeamCanSeeThisMessage(visibilityArray))
      return !checkLoggedInUserIsPatient(patientId, globalChannelVariables.chatUserId);
    return true;
  }

  if (contextType === '@SURVEY') {
    return checkLoggedInUserIsPatient(patientId, globalChannelVariables.chatUserId) && senderId === 'sysuser';
  }
  return true;
};
