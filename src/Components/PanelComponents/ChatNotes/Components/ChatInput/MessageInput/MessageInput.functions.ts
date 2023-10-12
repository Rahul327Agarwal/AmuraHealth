import { v4 } from 'uuid';
import { notifyEvent } from '../../../../../../AppSync/AppSync.functions';
import ErrorToaster from '../../../../../../Common/ErrorToaster';
import { PMS_S3 } from '../../../../../../Utils';
import { getSchedulerRolesData } from '../../../../../LibraryComponents/ChatComponent/CallPopUp/CallPopUp.functions';
import { ISendMessage, voiceNote } from '../../../../../LibraryComponents/ChatComponent/ChatComponents.types';
import { checkPrivacy } from '../../../../Notes/Notes.functions';
import { ChatVariables } from '../../../../Notes/Notes.types';
import { ITag, ITagObject, globalFiles } from './MessageInput.types';
import {
  addAnswerIfBot,
  constructBasePayload,
  disableSendUntilSent,
  getS3PathForAttachedFile,
  modifyingBasedOnPrivacy,
} from './sendingMessage.util.functions';

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

  if (messageToSend || filesAttached) return false;

  return true;
};

export const sendMessageAPI = async (
  panelId: string,
  props: any,
  setDisableSend: Function,
  file,
  message,
  resetInput: Function,
  voiceNote: voiceNote,
  tagOptionsProps: Array<any>,
  lastMessage: any,
  scheduleData: any,
  taggedObject?: {
    taggedIds?: Array<string>;
    taggedPersonIds?: Array<string>;
    messageWithHtml?: string;
    firstTagWithHtml?: string;
    userTagObject?: ITagObject;
    roleToClient?: string;
  },
  repliedToMessage?: any,
  pushUnsentMessage?: Function
) => {
  const { taggedIds, taggedPersonIds, firstTagWithHtml, userTagObject } = taggedObject || {};
  const tagOptions = Object.keys(taggedObject || {}).length && (!taggedIds?.length || !message.trim()) ? [] : tagOptionsProps;
  disableSendUntilSent(setDisableSend);
  let fileName = await getS3PathForAttachedFile(props, file, voiceNote);
  let payload: ISendMessage = constructBasePayload(props, file, fileName, voiceNote, taggedPersonIds, message, repliedToMessage);
  payload = addAnswerIfBot(props, lastMessage, payload, message);
  let { privacy, messageToSend } = checkPrivacy(message, tagOptions);
  if (privacy === '@call intake') {
    let regExpression = /^(?:\d+)?$/;
    let data = regExpression.test(messageToSend);
    if (!data) {
      ErrorToaster('Please enter a valid number', panelId, 'error');
      setDisableSend(false);
      globalFiles.disableSend = false;
      return;
    }
    if (data && (Number(messageToSend) < 1 || Number(messageToSend) >= 1440)) {
      ErrorToaster('Only number between 0 and 1440 are allowed', panelId, 'error');
      setDisableSend(false);
      globalFiles.disableSend = false;
      return;
    }
  }
  payload = await modifyingBasedOnPrivacy(props, tagOptions, payload, scheduleData, message, taggedObject);
  if (payload?.privacy !== '@call intake') {
    const messageWithHtml1 = removeSyntacticalTags(payload.message || '', firstTagWithHtml, tagOptions);
    const messageWithHtmlFinal = replaceOjectKeyInHtmlString(messageWithHtml1 || '', userTagObject, true);
    payload.messageWithHtml = messageWithHtmlFinal || message;
  }
  if (payload?.privacy === '@call intake' && payload?.scheduleData?.roleIds?.length <= 0) {
    ErrorToaster('no roles/unable to get roles', panelId, 'error');
    setDisableSend(false);
    globalFiles.disableSend = false;
    return;
  }

  PMS_S3.postData({
    ...payload,
    Locale: sessionStorage.getItem('locale'),
    url: `${import.meta.env.VITE_BASE_API_URL}/chatCategorizer`,
    token: props.sessions.id_token,
    method: 'POST',
    headers: {},
  })
    .then((response) => {
      console.log(response, 'the response');
      if (!response.Error) {
        resetInput();
        delete payload.delivered;
        notifyEvent({
          input: {
            user_id: `~${props.selectedClient.tenant_id}~${props.selectedClient.client_id}~`,
            event_name: 'notes-client',
            timestamp: `${new Date().getTime()}`,
            last_message: JSON.stringify(payload) ?? '',
          },
        });
      } else {
        delete payload.delivered;
        payload.notSent = true;
        pushUnsentMessage(payload);
        ChatVariables.unsentMessages = [...ChatVariables.unsentMessages, payload];
      }
    })
    .catch((err) => {
      console.error('Error while sending a message', err);
    })
    .finally(() => {
      setDisableSend(false);
      globalFiles.disableSend = false;
      resetInput();
    });
};

export const getContextType = (type: string) => {
  if (type === 'bot') return '@bot-start';
  if (type === 'notes') return '@chat-notes';
  if (type === 'mylist') return '@NOTES';
  return '@NOTES';
};

export const isBotChat = (type: string) => {
  return type === 'bot';
};

export const removeHtmlTagsFromSring = (string: string) => {
  const regex = /(<([^>]+)>)/gi;
  return string.replace(regex, '');
};

export const removeAllHtmlText = (string: string) => {
  const text = removeHtmlTagsFromSring(string);
  const regex = /(&nbsp;)/gi;
  return text.replace(regex, ' ');
};

export const wrapWithTagString = (text: string) => {
  return `<span class="tagged" contentEditable="false" >${text}</span>`;
};

export const sanitizeString = (string: string) => {
  const regex = /<(?:font)\s*[^>]*>.*?<\/(?:font)>/gi;
  return string.replace(regex, '');
};

export const getAllMatchTagsFromString = (string: string) => {
  const regex = /<span\s[^>]*>[\s\S]*?<\/span>/gi;
  return string.match(regex);
};

export const getTaggedPersons = (htmlMessage: string): { tagName: Array<string>; firstTagWithHtml: string } => {
  const tagsWithHTML = getAllMatchTagsFromString(htmlMessage);
  const tagName = [];
  let firstTagWithHtml = '';
  tagsWithHTML?.forEach((data, index) => {
    const clearedSting = removeHtmlTagsFromSring(data);
    if (index === 0) firstTagWithHtml = data;
    if (!tagName.includes(clearedSting)) tagName.push(clearedSting);
  });
  return { tagName, firstTagWithHtml };
};

export const getTaggedPersonIds = (
  message: string,
  options: Array<ITag>
): { tagIds: Array<string>; firstTagWithHtml: string } => {
  const { tagName, firstTagWithHtml } = getTaggedPersons(message);
  if (!tagName?.length) return { tagIds: [], firstTagWithHtml };
  const tagIds = options?.reduce((pre, curr) => {
    if (tagName?.includes('@' + curr?.label)) return [...pre, curr?.id];
    return pre;
  }, []);
  return { tagIds, firstTagWithHtml };
};

export const removeSyntacticalTags = (message: string, firstTag: string, syntacticalTags: Array<ITag>): string => {
  if (!firstTag || !syntacticalTags.length) return message;
  const tagName = removeHtmlTagsFromSring(firstTag);
  if (syntacticalTags.some((data) => `@${data.id}` === tagName)) {
    return message.replace(firstTag, '').trim();
  }
  return message;
};

export const replaceOjectKeyInHtmlString = (message: string, userTagsObject: ITagObject, replaceUserName?: boolean): string => {
  if (!userTagsObject) return message;
  const atPattern = replaceUserName ? '@' : '';
  const atValue = replaceUserName ? '' : '@';
  Object.entries(userTagsObject).forEach(([key, value]) => {
    const pattern = new RegExp(`${atPattern}${key}`, 'g');
    message = message.replace(pattern, `${atValue}${value}`);
  });
  return message;
};

export const callWIthPreDefinedData = async (
  panelId: string,
  props: any,
  setDisableSend: Function,
  setOpenConfirm: Function,
  resetInput: Function,
  roleToClient: string
) => {
  setDisableSend(true);
  const { sessions } = props;
  let rolesData = [];
  const schedulerRolesData = await getSchedulerRolesData(sessions);
  schedulerRolesData.forEach((each) => {
    rolesData.push(each.value);
  });
  let scheduleDataTemp = {
    channel: 'voice',
    duration: '45',
    timeUnits: 'mins',
    participants: [],
    title: 'Intake Calls',
    roleIds: rolesData,
    patientId: props.selectedClient.client_id,
    organizer: props.sessions.user.id,
    organizerRoleId: roleToClient,
  };
  let payload = {
    userId: props.selectedClient.client_id,
    EventName: 'chat-categorizer',
    tenantId: props.selectedClient.tenant_id || 'amura',
    senderId: props.sessions.user.id,
    messageId: v4(),
    message: '',
    receivedTime: new Date().toISOString(),
    ContextType: '@call',
    loginUserId: props.sessions.user.id,
    operation: '@UPDATE_ENTITY',
    scheduleData: scheduleDataTemp,
    url: `${import.meta.env.VITE_BASE_API_URL}/chatCategorizer`,
    token: props.sessions.id_token,
    method: 'POST',
    headers: {},
    delivered: false,
    notSent: false,
  };

  if (rolesData.length > 0) {
    const response = await PMS_S3.postData(payload);
    if (!response.Error) {
      setDisableSend(false);
      setOpenConfirm(false);
      globalFiles.disableSend = false;
      resetInput();
    }
  } else {
    ErrorToaster('no roles/unable to get roles', panelId, 'error');
    setDisableSend(false);
    setOpenConfirm(false);
    globalFiles.disableSend = false;
    resetInput();
  }
};
