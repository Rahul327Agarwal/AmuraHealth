import { PMS_S3 } from '../../../../Utils';
import { checkPrivacy, uploadAttachment } from '../../Notes/Notes.functions';
import { v4 } from 'uuid';
import { getFileExtension } from './../../../../Common/Common.functions';
import { ISendMessage, voiceNote } from './../../../LibraryComponents/ChatComponent/ChatComponents.types';

export const sendMessageAPI = async (
  props: any,
  setDisableSend: Function,
  file,
  message,
  resetInput: Function,
  voiceNote: voiceNote,
  tagOptions: Array<any>,
  lastMessage: any,
  scheduleData: any,
  postId: any,
  postData: any,
  responseType: any
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
  if (isPostChat(props.type)) {
    payload = {
      ...payload,
      action: postData.action,
      postPayload: {
        postId: postId,
        snippet: {
          type: postData.type,
          message: message,
          title: postData.type === 'response' ? 'Type of Response' : postData.headerText,
          file: fileName || '',
          fileName: file?.name || '',
          postType: file?.name ? getFileExtension(file?.name) : '',
          response: {
            type: responseType,
            options: responseType.length > 0 ? createArrayForresponse(message) : [],
          },
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

  PMS_S3.postData({
    ...payload,
    Locale: sessionStorage.getItem('locale'),
    url: `${import.meta.env.VITE_BASE_API_URL}/chatCategorizer`,
    token: props.sessions.id_token,
    method: 'POST',
    headers: {},
  })
    .then((response) => {
      if (!response.Error) {
        resetInput();
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      // setDisableSend(false);
    });
  //resetInput();
};

export const checkPostWithSameNameExist = (postList, message, type) => {
  if (type !== 'heading') return false;
  return postList.find((value) => value.heading?.toLowerCase() === message.toLowerCase()) ? true : false;
};

export const getContextType = (type: string) => {
  if (type === 'bot') return '@bot-start';
  if (type === 'mylist') return '@NOTES';
  if (type === 'post') return '@posts';
  return '@NOTES';
};

export const isPostChat = (type: string) => {
  return type === 'post';
};

export const removeHtmlTagsFromSring = (string: string) => {
  const regex = /(<([^>]+)>)/gi;
  return string.replace(regex, '');
};

export const createArrayForresponse = (string: any) => {
  const str2 = string;
  let result: any = str2
    .split('~')
    .map((element) => element.trim())
    .filter((element) => element);
  let unique = {};
  result.forEach((value) => {
    if (!unique[value]) {
      unique[value] = value;
    }
  });
  result = Object.keys(unique).map((value) => unique[value]);
  return result;
};
