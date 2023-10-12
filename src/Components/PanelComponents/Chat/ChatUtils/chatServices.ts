import { PMS_S3 } from '../../../../Utils';
import { IChatProps, IMessage, IProps } from '../Chat.types';
import ErrorToaster from './../../../../Common/ErrorToaster';
// import { IPatient } from "../../MultipleMylists/Lists/MyList/MyList.types";
import { generateHash, scrollToBottom } from '../Chat.functions';
import { decryptDataWithKeyProvided, REACT_APP_HASH_KEY } from './../../../../Common/Encryption';
import { IsJsonString } from './validations';

type IPatient = any; // TODO: Fix Import

export const sendMessageAPI = async (panelId: string, props: IProps, message: any, isActionResponse: boolean): Promise<any> => {
  const payload = {
    EventName: 'chat-categorizer',
    Message: {
      ...message,
      PatientId: props.patientId,
    },
    Locale: sessionStorage.getItem('locale'),
    token: props.sessions.id_token,
    method: 'POST',
    url: `${import.meta.env.VITE_EVENT_API}`,
    TenantId: props.selectedClient.tenant_id,
    ChannelName: props.selectedClient.channelId,
    ChannelId: props.selectedClient.channelId,
  };
  //VISIBILTY should be sent.
  const resp = await PMS_S3.postData(payload);
  if (resp?.Error) {
    ErrorToaster(resp?.Error.data, panelId, 'error');
    return Promise.reject(null);
  } else {
    return Promise.resolve(resp);
  }
};

export const getAttachmentAPI = async (panelId: string, attachmentURL: string, props: any) => {
  /********download File Api Call*********/
  let reqBody = {
    isDownloadRequired: true,
    url: `${import.meta.env.VITE_S3_DOWNLOAD_API}?key=${attachmentURL}`,
    token: props.sessions.id_token,
  };
  PMS_S3.previewObject(reqBody).catch(() => {
    ErrorToaster(`Unable to download!`, panelId, 'error');
  });
};

export const getAllUsers = async (sessionId: string) => {
  let allUsers = await PMS_S3.getObject(
    `pms-ql-user/allUsers.json`,
    import.meta.env.VITE_PLATFORM_BUCKET,
    {
      TenantId: '',
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_S3_FETCH_API,
      token: sessionId,
      headers: {},
    },
    []
  );
  return Promise.resolve(allUsers);
};

export const getStaff = async (clientId: string, props: any) => {
  let staffs: any = [];
  staffs = await PMS_S3.getObject(
    `pms-ql-user/${clientId}/staffListAcrossTenants.json`,
    import.meta.env.VITE_CLIENT_BUCKET,
    {
      TenantId: '',
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_S3_FETCH_API,
      token: props.sessions.id_token,
      headers: {},
    },
    []
  );
  if (staffs?.Error) {
    return Promise.reject(null);
  } else {
    return Promise.resolve(staffs);
  }
};

export const convertToMessageStructure = async (msg: any, channelId?: string) => {
  let decryptedMessage = await decryptDataWithKeyProvided(msg.EncryptedMessage, `${REACT_APP_HASH_KEY}$$$$$$${msg.RoomId}`);
  let message = IsJsonString(decryptedMessage) ? JSON.parse(decryptedMessage) : decryptedMessage;
  let messageObject: IMessage = {
    MessageId: msg.MessageId || generateHash(10),
    ReceivedTime: new Date(message.TimeStamp).getTime() || 0,
    SenderId: message.SenderId || msg.MessagedBy || 'Anonymous',
    Message: {
      PatientId: message.PatientId || '',
      ChannelId: message.ChannelId || msg.RoomId,
      SenderId: message.SenderId || '',
      TimeStamp: new Date(message.TimeStamp).getTime() || 0,
      Initiator: message.Initiator || '',
      VisibleTo: message.VisibleTo || '',
      ClientType: message.ClientType,
      MessageType: message.MessageType || 'FORMATTED_TEXT',
      ContextType: message.ContextType || '@CHAT',
      CalloutTo: message.CalloutTo || '',
      Message: typeof message.Message === 'string' ? message.Message : JSON.stringify(msg.Message),
      ReplyToMessageId: message.ReplyToMessageID || '',
      ReplyToMessage: message.ReplyToMessage
        ? IsJsonString(message.ReplyToMessage)
          ? JSON.parse(message.ReplyToMessage)
          : message.ReplyToMessage
        : '',
      IsReply: message.ContextType.indexOf('REPLYTO') > -1 ? true : false,
    },
    AttachmentURL: msg.AttachmentURL || '',
    IsAttachment: msg.IsAttachment,
    Members: msg.Members || [],
    ChannelId: message.ChannelId || msg.RoomId,
  };
  return messageObject;
};
