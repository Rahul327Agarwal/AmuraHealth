import axios from 'axios';
import { Dispatch } from 'react';
import { PMS_S3 } from '../../../Utils';
import { getUserNameById } from './../../../Common/Common.functions';
import ErrorToaster from './../../../Common/ErrorToaster';
import { setLastMessageInChannels } from './../../../DisplayFramework/State/Slices/ChatSlice';
import { globalChannelVariables, IComponentMessage, IMessage, IProps, userContexts } from './Chat.types';
import { convertToMessageStructure } from './ChatUtils/chatServices';
import { getColorsForChatHeader, getDisplayDate } from './ChatUtils/chatUtils';
import { isMessageVisibleToUser } from './ChatUtils/chatVisibileTo';

export const getLastMessages = (channelIds: Array<string>, dispatch: any, props: any) => {
  if (!props?.sessions?.user?.id) return;
  let payload = PMS_S3.encryptData({
    EventName: 'chat-message-rooms-read-last',
    UserName: props.sessions.user.id,
    RoomIds: channelIds,
  });
  axios
    .post(`${import.meta.env.VITE_ROCKET_CHAT}lastMessageInRooms`, payload, {
      headers: { Authorization: `Bearer ${props.sessions.id_token}` },
    })
    .then(async (response: any) => {
      if (!response?.data?.Error) {
        let lastMessages = JSON.parse(JSON.stringify(response.data.Message));
        let messages: any = {};
        lastMessages = lastMessages.filter((item: any) => item);

        for (const item of lastMessages) {
          let formattedMsg = await convertToMessageStructure(item);
          messages[formattedMsg.ChannelId] = formattedMsg;
        }
        globalChannelVariables.lastMessageInChannels = messages;
        dispatch(setLastMessageInChannels(messages));
        return;
      }
      globalChannelVariables.lastMessageInChannels = {};
      dispatch(setLastMessageInChannels({}));
    })
    .catch(() => {
      globalChannelVariables.lastMessageInChannels = {};
      dispatch(setLastMessageInChannels({}));
    });
};
export const sendAttachmentAPI = async (
  panelId: string,
  props: IProps,
  files: any,
  attachmentCaptions: any,
  channelId: string
) => {
  files.map(async (value: any) => {
    const token = props.sessions.id_token;
    let url = `${import.meta.env.VITE_S3_IR_UPLOAD_API}`;
    /********Upload File Api Call*********/
    const headers = {
      Authorization: `Bearer ${token}`,
      'chat-file-upload': 'yes',
      'room-id': channelId,
      'file-name': value.name,
      'file-content-type': value.type,
      'patient-id': props.selectedClient.client_id,
      'user-id': props.sessions.user.id,
      'message-description': attachmentCaptions[value.name],
      'Content-Type': value.type,
      'tenant-id': props.selectedClient.tenant_id,
    };
    let formData = new FormData();
    formData.append('input_files', value);
    axios
      .post(url, formData, { headers: headers })
      .then((response) => {
        if (!response) {
          ErrorToaster(`Unable to upload ${value.name}!`, panelId, 'error');
          return Promise.reject(false);
        }
        scrollToBottom('chat-body-messages');
        return Promise.resolve(true);
      })
      .catch((error) => {
        ErrorToaster(`Unable to upload ${value.name}!`, panelId, 'error');
        return Promise.reject(false);
      });
  });
};

export const retriveContextTypeFromMessage = (message: string, userProfile: string): Array<string> => {
  let contextTypes = userContexts[userProfile] ?? [];
  let contextType = '';
  let messageToSend = message;
  contextTypes.forEach((type: string) => {
    if (message.indexOf(type) > -1) {
      contextType = type;
      messageToSend = message.replace(type, '').trim();
    }
  });
  contextType = contextType === '@me' || contextType === '@team' ? '@CALLOUT' : contextType;
  return [contextType, messageToSend];
};

export const generateHash = (targetLength: number) => {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < targetLength; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

export const userAddedMessageConstruct = (message: any) => {
  return typeof message.Message === 'object' ? message : null;
};

export const constructMessagesBody = (
  props: IProps,
  messages: Array<IMessage>,
  fetchedAllMsgs: string,
  channelDetails: any,
  colorsForUsername: any,
  setColorsForUsername: Function,
  allUserList: Array<any>,
  showUnreadMessage: boolean,
  dispatch: Dispatch<any>
) => {
  let componentMessageArray = [];
  let messagesIDs = [];
  let colorsArray = getColorsForChatHeader();
  if (messages.length > 0) {
    let dateChanged = '';
    let firstMessage = 0;
    let unreadMessageHeaderAdded = false;
    for (let i = 0; i < messages.length; i++) {
      let contextType = messages[i].Message.ContextType;
      let messageType = messages[i].Message.MessageType;
      let message = messages[i].Message.Message;
      if (contextType === '@CALLOUT') {
        message = removeTeamAndMeFromMessage(message);
      }
      if (messageType === 'ACTION_TEXT') {
        contextType = '@CHAT';
        message = 'Survey completed!';
      }
      let showAvatar = false;
      let visibleTo = isMessageVisibleToUser(
        props.patientId,
        messages[i].SenderId,
        contextType,
        messages[i]?.Message?.VisibleTo || []
      );
      if (!visibleTo) {
        continue;
      }
      let messageId = messages[i].MessageId;
      if (!colorsForUsername[messages[i].SenderId]) {
        const random = Math.floor(Math.random() * colorsArray.length);
        colorsForUsername = {
          ...colorsForUsername,
          [messages[i].SenderId]: colorsArray[random],
        };
        colorsArray = colorsArray.filter((value) => value !== colorsForUsername[messages[i].SenderId]);
      }
      let dateOfMessage = `${new Date(messages[i].ReceivedTime).toDateString()}`;
      let options = messages[i].Message.Options || [];
      if (messageType === 'SLIDER_SELECT') {
        options = [messages[i].Message.Range || []];
      }
      if (messageType === 'ACTION_MULTI_CHOICE') {
        options = [...(messages[i].Message.MultiChoiceOptions || [])];
      }
      let selectedValue = messages[i].Message.SelectedOption ? messages[i].Message.SelectedOption : null;
      let CalloutTo = messages[i]?.Message?.CalloutTo || '';
      if (i < messages.length - 1) {
        let nextDateOfMessage = `${new Date(messages[i + 1].ReceivedTime).toDateString()}`;
        showAvatar = messages[i].SenderId !== messages[i + 1].SenderId || dateOfMessage !== nextDateOfMessage;
      }
      let isMsgReadByUser = messages[i].Members.find((msg) => msg?.UserId === props.sessions.user.id && msg?.Status === 'READ');
      if (!isMsgReadByUser) messagesIDs.push(messages[i].MessageId);
      if (i === messages.length - 1) {
        showAvatar = true;
      }
      if (i === 0 && fetchedAllMsgs) {
        let formattedMessage = constructMessageObject(
          generateHash(10),
          getUserNameById(messages[i].SenderId, allUserList),
          messages[i].SenderId,
          messages[i].ReceivedTime,
          false,
          false,
          false,
          true,
          fetchedAllMsgs,
          [],
          '@CHAT',
          true,
          true,
          false,
          null,
          messageType,
          false,
          messages[i].IsAttachment,
          messages[i].AttachmentURL,
          '',
          messages[i].Message.IsReply,
          messages[i].Message.ReplyToMessage,
          messages[i].Message.ReplyToMessageId
        );
        componentMessageArray.push(formattedMessage);
      }
      if (!unreadMessageHeaderAdded && messages[i].Members && !isMsgReadByUser) {
        let formattedMessage = constructMessageObject(
          generateHash(10),
          getUserNameById(messages[i].SenderId, allUserList),
          messages[i].SenderId,
          messages[i].ReceivedTime,
          false,
          false,
          false,
          true,
          'unread messages',
          [],
          '@CHAT',
          true,
          true,
          false,
          null,
          messageType,
          false,
          messages[i].IsAttachment,
          messages[i].AttachmentURL,
          '',
          messages[i].Message.IsReply,
          messages[i].Message.ReplyToMessage,
          messages[i].Message.ReplyToMessageId
        );
        if (showUnreadMessage) componentMessageArray.push(formattedMessage);
        unreadMessageHeaderAdded = true;
      }
      let firstMessageInThatDay = false;
      if (dateChanged !== dateOfMessage) {
        firstMessageInThatDay = true;
        let formattedMessage = constructMessageObject(
          generateHash(10),
          getUserNameById(messages[i].SenderId, allUserList),
          messages[i].SenderId,
          messages[i].ReceivedTime,
          false,
          false,
          true,
          true,
          getDisplayDate(messages[i].ReceivedTime),
          [],
          '@CHAT',
          true,
          false,
          false,
          null,
          messageType,
          false,
          messages[i].IsAttachment,
          messages[i].AttachmentURL,
          '',
          messages[i].Message.IsReply,
          messages[i].Message.ReplyToMessage,
          messages[i].Message.ReplyToMessageId
        );
        componentMessageArray.push(formattedMessage);
      }
      let formattedMessage = constructMessageObject(
        messageId,
        getUserNameById(messages[i].SenderId, allUserList),
        messages[i].SenderId,
        messages[i].ReceivedTime,
        firstMessage === i || firstMessageInThatDay,
        showAvatar || i === messages.length - 1,
        false,
        true,
        message,
        options,
        contextType,
        visibleTo,
        false,
        messages[i].SenderId === props.sessions.user.id,
        selectedValue,
        messageType,
        false,
        messages[i].IsAttachment,
        messages[i].AttachmentURL,
        CalloutTo,
        messages[i].Message.IsReply,
        messages[i].Message.ReplyToMessage,
        messages[i].Message.ReplyToMessageId
      );
      componentMessageArray.push(formattedMessage);
      if (i < messages.length - 1) {
        firstMessage = showAvatar ? i + 1 : firstMessage;
      }
      if (dateChanged !== dateOfMessage) dateChanged = dateOfMessage;
    }
  }
  setColorsForUsername(colorsForUsername);
  componentMessageArray.forEach((message: IComponentMessage, index, messages) => {
    if (index !== messages.length - 1) {
      let nextMessage = messages[index + 1];
      let currentMessage = messages[index];
      if (currentMessage.SenderId !== nextMessage.SenderId) {
        message.ShowAvatar = true;
        message.IsFirstMessage = true;
      }
    }
    if (index === messages.length - 1) message.ShowAvatar = true;
  });
  return { messages: componentMessageArray, unreadMessageIDs: messagesIDs };
};

export const constructMessageObject = (
  MessageId: string,
  Sender: string,
  SenderId: string,
  ReceivedTime: number,
  IsFirstMessage: boolean,
  ShowAvatar: boolean,
  DateChanged: boolean,
  IsSimpleText: boolean,
  Message: string,
  Options: Array<any>,
  ContextType: string,
  Visibility: boolean,
  ShowLoadMore: boolean,
  SentByLoggedInUser: boolean,
  SelectedOption: any,
  MessageType: string,
  UnreadMessage: boolean,
  IsAttachment: boolean,
  AttachmentURL: string,
  CalloutTo: string,
  IsReply: boolean,
  ReplyToMessage: any,
  ReplyToMessageId: string
): IComponentMessage => {
  let messageObject: IComponentMessage = {
    MessageId,
    Sender,
    SenderId,
    ReceivedTime,
    IsFirstMessage,
    ShowAvatar,
    DateChanged,
    IsSimpleText,
    Message,
    Options,
    ContextType,
    MessageType,
    Visibility,
    ShowLoadMore,
    SentByLoggedInUser,
    SelectedOption,
    UnreadMessage,
    IsAttachment,
    AttachmentURL,
    CalloutTo,
    IsReply,
    ReplyToMessage,
    ReplyToMessageId,
  };
  return messageObject;
};

export const removeExtentionFromFileName = (filename: string) => {
  filename = filename.split('/').pop() || '';
  filename = filename.slice(0, filename.lastIndexOf('.'));
  return filename;
};

export const getOnlyFileName = (filename: string) => {
  filename = filename.split('/').pop() || '';
  return filename;
};
export const scrollIntoView = (id: string) => {
  let element = document.getElementById(id);
  if (element) {
    element.scrollTo({ top: 0 });
  }
};

export const scrollToBottom = (id) => {
  const div = document.getElementById(id);
  if (div) div.scroll({ top: div.scrollHeight, behavior: 'smooth' });
};

export const removeTeamAndMeFromMessage = (message: string) => {
  console.log('removing team and me from message');
  console.log('removeTeamAndMeFromMessage is running');
  if (message.startsWith('@team')) {
    return message.replace('@team', '');
  }
  if (message.startsWith('@me')) {
    return message.replace('@me', '');
  }
  return message;
};

export const splitTaggedPersonFromMessage = (message: string, users: Array<any>) => {
  for (const element of users) {
    if (message.startsWith('@') && message.indexOf(`@${element.name}`) > -1) {
      let seperatedMessage = message.split(`@${element.name}`);
      if (seperatedMessage.length > 0) {
        seperatedMessage = [`@${element.name}`, seperatedMessage[1]];
        return seperatedMessage;
      }
    }
  }
  return ['', message];
};
