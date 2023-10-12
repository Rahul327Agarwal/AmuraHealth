import { PMS_S3 } from '../../../../Utils';
import { ISendMessage, voiceNote } from './../../../LibraryComponents/ChatComponent/ChatComponents.types';
import { ITag } from './MessageInput.types';
import { v4 } from 'uuid';
import { getFileExtension } from './../../../../Common/Common.functions';
import { checkPrivacy, uploadAttachment } from '../../Notes/Notes.functions';
export const disableInput = (
  props: any,
  type: string,
  disableSend: boolean,
  input: string,
  tagOptions: Array<ITag>,
  filesAttached: boolean
): boolean => {
  if (disableSend) return true;
  let { messageToSend, privacy } = checkPrivacy(input, tagOptions);
  messageToSend = messageToSend.trim();
  if (privacy === 'SURVEY' && !messageToSend) return false;
  if (privacy === '@CREATE_ENTITY' && !messageToSend) return false;
  if ((messageToSend || filesAttached) && props.type !== 'bot') return false;
  return true;
};

export const sendMessageAPI = async (
  props: any,
  setDisableSend: Function,
  file: any,
  message: any,
  resetInput: Function,
  voiceNote: voiceNote,
  tagOptions: Array<any>,
  lastMessage: any,
  scheduleData: any,
  uniqueId: any,
  storeData: any
) => {
  setDisableSend(true);
  let response: any;
  let fileName = '';
  if (file) {
    response = await uploadAttachment(file, props);
    fileName = typeof response === 'string' ? response : '';
  }
  if (voiceNote?.audio) {
    const res: Response = await fetch(voiceNote.audio);
    const blob: Blob = await res.blob();
    let audioFile = new File([blob], `${v4()}.ogg`);
    response = await uploadAttachment(audioFile, props);
    fileName = typeof response === 'string' ? response : '';
  }

  let payload: ISendMessage = {
    userId: '',
    EventName: 'chat-categorizer',
    tenantId: props.selectedClient.tenant_id || 'amura',
    senderId: props.sessions.user.id,
    messageId: v4(),
    message: message,
    isAttachment: file ? true : false,
    attachmentURL: fileName,
    attachmentFileSize: file ? file.size : 0,
    receivedTime: new Date().toISOString(),
    isVoiceNote: Boolean(voiceNote.audio),
    ContextType: getContextType(props.type),
    voiceNote: { ...voiceNote, audio: fileName },
    loginUserId: props.sessions.user.id,
  };

  if (isBotChat(props.type)) {
    payload = {
      ...props.botData,
      ...lastMessage,
      ...payload,
      answer: message,
    };
  }
  if (isPostCollectionChat(props.type)) {
    payload = {
      ...payload,
      action: storeData.action,
      collectionPayload: {
        collectionId: uniqueId,
        collectionType: props.type,
        snippet: {
          type: storeData.type,
          message: message,
          title: storeData.headerText,
          file: fileName || '',
          fileName: file?.name || '',
          postType: file?.name ? getFileExtension(file?.name) : '',
        },
      },
    };
  }
  let { privacy, messageToSend } = checkPrivacy(message, tagOptions);
  if (privacy && props.type === 'mylist') payload.privacy = privacy;
  if (privacy && props.type === 'bot') {
    payload.operation = privacy;
    payload.message = privacy;
  } else payload.operation = '@UPDATE_ENTITY';
  if (messageToSend) payload.message = messageToSend;
  if (payload.privacy === '@call') payload.scheduleData = scheduleData;
  if (privacy === '@call') {
    payload.ContextType = '@call';
    delete payload.privacy;
  }

  PMS_S3.postData({
    ...payload,
    Locale: sessionStorage.getItem('locale'),
    url: `${import.meta.env.VITE_BASE_API_URL}/chatCategorizer`,
    token: props.sessions.id_token,
    method: 'POST',
    headers: {},
  })
    .then((response: any) => {
      if (!response.Error) {
        resetInput();
      }
    })
    .catch((err: any) => {
      console.error(err);
    })
    .finally(() => {
      setDisableSend(false);
    });

  // resetInput();
  // setDisableSend(false);
};

export const checkPostWithSameNameExist = (postList: any, message: any, type: any) => {
  if (type !== 'collectionName') return false;
  return postList.find((value: any) => value.collectionName.toLowerCase() === message.toLowerCase()) ? true : false;
};

export const getContextType = (type: string) => {
  if (type === 'bot') return '@bot-start';
  if (type === 'mylist') return '@NOTES';
  if (type === 'post') return '@posts';
  if (type === 'PCM') return '@collection';
  return '@NOTES';
};

export const isBotChat = (type: string) => {
  return type === 'bot';
};
export const isPostChat = (type: string) => {
  return type === 'post';
};
export const isPostCollectionChat = (type: string) => {
  return type === 'PCM';
};

export const removeHtmlTagsFromSring = (string: string) => {
  const regex = /(<([^>]+)>)/gi;
  return string.replace(regex, '');
};
