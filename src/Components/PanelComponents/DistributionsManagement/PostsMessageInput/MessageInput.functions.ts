import { v4 } from 'uuid';
import { PMS_S3 } from '../../../../Utils';
import { ISendMessage, voiceNote } from '../../../LibraryComponents/ChatComponent/ChatComponents.types';
import { checkPrivacy, uploadAttachment } from '../../Notes/Notes.functions';
import { getFileExtension } from './../../../../Common/Common.functions';
import ErrorToaster from './../../../../Common/ErrorToaster';
import { ShiftRingProps } from '../../MyTeam/Components/ShiftRing/ShiftRing.types';

export const sendMessageAPI = async (
  panelId: string,
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
  allPostData: any,
  responseType: any,
  tenantId: any
) => {
  try {
    setDisableSend(true);
    let responseObject: any;
    let fileName = '';
    if (file) {
      responseObject = await uploadAttachment(file, props);
      fileName = typeof responseObject === 'string' ? responseObject : '';
    }
    if (voiceNote?.audio) {
      const res: Response = await fetch(voiceNote.audio);
      const blob: Blob = await res.blob();
      let audioFile = new File([blob], `${v4()}.ogg`);
      responseObject = await uploadAttachment(audioFile, props);
      fileName = typeof responseObject === 'string' ? responseObject : '';
    }
    let payload: ISendMessage = {
      userId: '',
      EventName: 'chat-categorizer',
      tenantId: tenantId || 'amura',
      senderId: props.sessions.user.id,
      messageId: v4(),
      message: message,
      isAttachment: file ? true : false,
      attachmentURL: fileName,
      attachmentFileSize: file ? file.size : 0,
      receivedTime: new Date().toISOString(),
      isVoiceNote: Boolean(voiceNote.audio),
      ContextType: '@collection',
      voiceNote: { ...voiceNote, audio: fileName },
      loginUserId: props.sessions.user.id,
    };
    if (isPostChat(props.type)) {
      payload = {
        ...payload,
        action: allPostData.action,
        collectionPayload: {
          collectionId: uniqueId,
          collectionType: props.type,
          snippet: {
            type: allPostData.type,
            message: message,
            title: allPostData.type === 'response' ? 'Type of Response' : allPostData.headerText,
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

    const response = await PMS_S3.postData({
      ...payload,
      Locale: sessionStorage.getItem('locale'),
      url: `${import.meta.env.VITE_BASE_API_URL}/chatCategorizer`,
      token: props.sessions.id_token,
      method: 'POST',
    });
    if (!response.Error) {
      resetInput();
      return true;
    }
    ErrorToaster(response.Error, panelId, 'error');
  } catch (error) {
    ErrorToaster((error as any).message, panelId, 'error');
  }
};

export const checkPostWithSameNameExist = (datalist: any, message: any, type: any) => {
  if (type !== 'title') return false;
  return datalist.find((value: any) => value.title?.toUpperCase() === message?.toUpperCase()) ? true : false;
};

export const getContextType = (type: string) => {
  if (type === 'bot') return '@bot-start';
  if (type === 'mylist') return '@NOTES';
  if (type === 'post') return '@posts';
  return '@NOTES';
};

export const isPostChat = (type: string) => {
  return type !== '';
};

export const removeHtmlTagsFromSring = (string: string) => {
  const regex = /(<([^>]+)>)/gi;
  return string.replace(regex, '');
};

export const displayTextWidth = (text: any, font: any) => {
  const canvas = document.createElement('canvas');
  const context: any = canvas.getContext('2d');
  context.font = font || getComputedStyle(document.body).font;
  return context.measureText(text).width;
};

export const createArrayForresponse = (string: any) => {
  const str2 = string.toLowerCase();
  let result: any = str2
    .split(',')
    .map((element: any) => element.trim())
    .filter((element: any) => element);
  let unique: any = {};
  result.forEach((value: any) => {
    if (!unique[value.toLowerCase]) {
      unique[value.toLowerCase()] = value;
    }
  });
  result = Object.keys(unique).map((value) => unique[value]);
  return result;
};
