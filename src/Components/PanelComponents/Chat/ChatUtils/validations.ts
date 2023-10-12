import { IComponentMessage } from '../Chat.types';

export const checkSearchStartsWithSyntax = (search: string): boolean => {
  return search.indexOf('@me') > -1 || search.indexOf('@team') > -1;
};

export const isConfirmDisabled = (surveyInput: any): boolean => {
  return surveyInput ? (Array.isArray(surveyInput) && surveyInput.length === 0 ? true : false) : true;
};

export const showConfirm = (index: number, messagesComponent: Array<IComponentMessage>, message: IComponentMessage): boolean => {
  return (
    index === messagesComponent.length - 1 &&
    messagesComponent[messagesComponent.length - 1].ContextType === '@SURVEY' &&
    message.SelectedOption === null
  );
};
export const isTeamCallout = (callOutTo: string): boolean => {
  return callOutTo === '@team';
};

export const isMeCallout = (callOutTo: string): boolean => {
  return callOutTo === '@me';
};

export const hasReachedBottomOfSearch = (index: number, searchIndices: Array<any>): boolean => {
  return index >= searchIndices.length - 1 || index === -1;
};

export const hasReachedTopOfSearch = (index: number, fetchAllMessages: string, searchIndices: Array<any>): boolean => {
  return (index === 0 && fetchAllMessages === '') || index === -1;
};

export const startsWithTag = (messageToBeSent: string): boolean => {
  return (messageToBeSent &&
    messageToBeSent.trim().indexOf('@') === 0 &&
    messageToBeSent.trim().lastIndexOf('@') === 0) as boolean;
};

export const canUserAddAttachments = (
  noChannelId: boolean,
  isChatConnectionAlive: boolean,
  messagesComponent: Array<any>
): boolean => {
  return (
    isChatConnectionAlive &&
    !noChannelId &&
    !(messagesComponent.length > 0 && messagesComponent[messagesComponent.length - 1].ContextType === '@SURVEY')
  );
};

export const canUserSendNormalMessage = (
  noChannelId: boolean,
  isChatConnectionAlive: boolean,
  messageTosend: string,
  messagesComponent: Array<any>,
  userProfile: string
): boolean => {
  return (isChatConnectionAlive &&
    messageTosend.trim() &&
    !noChannelId &&
    !(messagesComponent.length > 0 && messagesComponent[messagesComponent.length - 1].ContextType === '@SURVEY') &&
    !(userProfile !== 'user' && (messageTosend.trim() === '@me' || messageTosend.trim() === '@team'))) as boolean;
};

export const whetherATagIsPresent = (message: string, users: Array<any>, loggedInUser: string) => {
  for (let i = 0; i < users.length; i++) {
    if (message[0] === '@' && message.indexOf(`@${users[i].name}`) > -1) {
      return loggedInUser === users[i].id ? 'me' : users[i].id;
    }
  }
  return '';
};

export const isChannelIdPresentInList = (channelId: string, clientList: Array<any>): boolean => {
  for (let i = 0; i < clientList.length; i++) {
    if (clientList[i].Tenant.ChannelId === channelId) {
      return true;
    }
  }
  return false;
};

export const isUserViewingTheChannel = (
  currentChannel: string,
  channelId: string,
  myClientList: Array<any>,
  message: any,
  formattedMessage: any
): boolean => {
  let contextType = formattedMessage?.text?.ContextType || '@CHAT';
  let notifyUser = contextType === '@CHAT';
  return (
    currentChannel !== channelId &&
    isChannelIdPresentInList(channelId, myClientList) &&
    message &&
    formattedMessage.senderId !== 'sysuser' &&
    notifyUser
  );
};

export const IsJsonString = (str: string): boolean => {
  try {
    str = JSON.parse(str);
    return str && typeof str === 'object' ? true : false;
  } catch (e) {
    return false;
  }
};

export const checkChannelInClientList = (channelId: string, clientList: Array<any>): boolean => {
  let client = clientList.find((client: any) => client.Tenant.ChannelId === channelId);
  return client ? true : false;
};

export const checkChannelInSubscribedChannelList = (chatDetails: any, selectedClient: any): boolean => {
  return chatDetails.subscribedChannelList.indexOf(selectedClient.channelId) > -1;
};

export const checkChannelInUnSubscribedList = (chatDetails: any, selectedClient: any): boolean => {
  return chatDetails.channelsFailedToSubscribe.indexOf(selectedClient.channelId) > -1;
};

export const isWebSocketOpen = (ws: React.MutableRefObject<any>): boolean => {
  return ws?.current?.readyState === ws?.current?.OPEN;
};
