import moment from 'moment';
import { getUserNameById } from './../../../../Common/Common.functions';
import { retriveContextTypeFromMessage } from '../Chat.functions';
import { chatCommands, globalChannelVariables, IComponentMessage } from '../Chat.types';
import { whetherATagIsPresent } from './validations';

export const getUserNames = (id: string, list: Array<any>): string => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].UserName === id) {
      return list[i].Name;
    }
  }
  return id;
};
export const getSearchResultDetails = (input: string, messages: Array<any>, syntaxFlag: boolean, search: string) => {
  let tag = '';
  if (syntaxFlag) {
    tag = search && search.split(' ')[0] ? search.split(' ')[0] : '';
  }
  let indices: any = [];
  messages.forEach((message, index) => {
    if (tag) {
      if (
        message.Message &&
        message.Message.toLocaleLowerCase().indexOf(input.toLocaleLowerCase()) > -1 &&
        message?.CalloutTo &&
        message.CalloutTo === tag &&
        message.Visibility
      ) {
        indices.push(message.MessageId || index);
      }
    } else {
      if (message.Message && message.Message.toLocaleLowerCase().indexOf(input.toLocaleLowerCase()) > -1 && message.Visibility) {
        indices.push(message.MessageId || index);
      }
    }
  });
  return indices;
};

export const getFileExtention = (fileName: string) => {
  let extention = fileName.split('.').pop();
  return extention ?? '';
};

export const getStaffDetails = (
  tenantId: string,
  staffObj: any,
  userList: Array<any>,
  loggedInUser: string,
  userProfile: string
) => {
  let usersInRooms: any = [];
  if (!staffObj) {
    return [];
  }
  if (staffObj.PatientId) {
    usersInRooms.push({
      id: staffObj.PatientId,
      name: loggedInUser !== staffObj.PatientId ? getUserNameById(staffObj.PatientId, userList) : 'me',
    });
  }
  if (staffObj.StaffList && staffObj.StaffList.length > 0) {
    let tenantStaffDetails = staffObj.StaffList.find((value: any) => value.TenantId === tenantId);
    if (tenantStaffDetails)
      tenantStaffDetails.Staffs.forEach((staff: any) => {
        if (!usersInRooms.find((value: any) => value.id === staff.Id)) {
          usersInRooms.push({
            id: staff.Id,
            name: loggedInUser !== staff.Id ? getUserNameById(staff.Id, userList) : 'me',
          });
        }
      });
  }
  if ((chatCommands as any)[userProfile]) {
    (chatCommands as any)[userProfile].forEach((command: any) => {
      usersInRooms.push({
        id: command.id,
        name: command.name,
      });
    });
  }
  return usersInRooms;
};

export const getChatItemType = (message: IComponentMessage) => {
  if (message.ShowLoadMore) {
    return 'Load more';
  }
  if (message.DateChanged) {
    return 'Date';
  }
  if (message.UnreadMessage) {
    return 'Unread';
  }
  return 'message';
};

export const getValueFromNextMessage = (index: number, messagesComponent: Array<any>) => {
  if (index < messagesComponent.length - 1) {
    if (messagesComponent[index + 1].SelectedOption || messagesComponent[index + 1].SelectedOption === 0) {
      if (
        messagesComponent[index + 1].MessageType === 'ACTION_MULTI_CHOICE' ||
        messagesComponent[index + 1].MessageType === 'SLIDER_SELECT'
      ) {
        return messagesComponent[index + 1].SelectedOption;
      } else {
        let option = messagesComponent[index + 1].Options.find(
          (opt: any) => opt.Value === messagesComponent[index + 1].SelectedOption
        );
        return option?.Option ?? null;
      }
    }
  }
  return null;
};

export const get12HourTime = (date: any) => {
  return `${new Date(date).getHours().toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}:${new Date(date).getMinutes().toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}`;
};

export const getLastMessage = (messages: Array<any>, patientId: string, loggedInUser: string) => {
  messages.sort((a: any, b: any) => a.date - b.date);
  for (let i = messages.length - 1; i > -1; i--) {
    let contextType = messages[i]?.text?.ContextType || '@CHAT';
    let visibleTo =
      contextType === '@CALLOUT'
        ? messages[i].text.VisibleTo === 'CLIENT'
          ? messages[i].senderId === loggedInUser
          : messages[i].text.VisibleTo === 'ALL_STAFF'
          ? patientId !== loggedInUser
          : true
        : true;
    if ((contextType === '@CHAT' || contextType === '@CALLOUT') && visibleTo) {
      return messages[i];
    }
  }
  return null;
};

export const getUnreadMessageTimestamp = (unreadMessageTimestamp: any, lastMessage: any) => {
  if (unreadMessageTimestamp === 0) {
    return lastMessage.date;
  }
  if (lastMessage.date && unreadMessageTimestamp < lastMessage.date) {
    return unreadMessageTimestamp;
  }
};

export const getColorsForChatHeader = () => {
  return [
    '#35CD96',
    '#FF9110',
    '#E67072',
    '#6EADF5',
    '#CEEF00',
    '#BD88EB',
    '#72CC92',
    '#6BCBEF',
    '#FD85D4',
    '#8B7ADD',
    '#E69F73',
    '#DFB610',
  ];
};

export const getDisplayDate = (time: number) => {
  let today: any = new Date();
  let yesterday: any = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  today = `${moment(today).format('DD MMMM YYYY')}`;
  yesterday = `${moment(yesterday).format('DD MMMM YYYY')}`;
  let currentDay = `${moment(new Date(time)).format('DD MMMM YYYY')}`;
  if (today === currentDay) {
    return 'Today';
  }
  if (yesterday === currentDay) {
    return 'Yesterday';
  }
  return currentDay;
};

export const convertingMessageToMessageStructure = (
  props: any,
  textMessage: string,
  usersForSuggestions: Array<any>,
  userProfile: string,
  replyingMessageId: string,
  replyingMessage: any,
  showReplyingMessage: boolean
) => {
  let payload: any = {
    SenderId: props.sessions.user.id,
    TimeStamp: new Date().toString(),
    Initiator: props.sessions.user.id,
    ClientType: 'WEB',
    MessageType: 'FORMATTED_TEXT',
    Message: textMessage.trim(),
    VisibleTo: ['ALL'],
    PatientId: props.patientId,
  };
  let message = retriveContextTypeFromMessage(textMessage, userProfile);
  let taggedPerson = whetherATagIsPresent(textMessage, usersForSuggestions, props.sessions.user.id);
  payload = { ...payload, ContextType: message[0] || '@CHAT', Message: textMessage.trim() };
  if (taggedPerson) {
    payload = {
      ...payload,
      CalloutTo: `@${taggedPerson}`,
      ContextType: '@CALLOUT',
      TenantId: props.selectedClient.tenant_id,
    };
  }
  if (showReplyingMessage) {
    payload = {
      ...payload,
      ContextType: `${payload.ContextType}-REPLYTO`,
      ReplyToMessageID: `${replyingMessageId}`,
      ReplyToMessage: `${JSON.stringify(replyingMessage)}`,
    };
  }
  return payload;
};
