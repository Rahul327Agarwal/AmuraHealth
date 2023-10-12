import { v4 } from 'uuid';
import { getSchedulerRolesData } from '../../../../../LibraryComponents/ChatComponent/CallPopUp/CallPopUp.functions';
import { ISendMessage } from '../../../../../LibraryComponents/ChatComponent/ChatComponents.types';
import { checkPrivacy, uploadAttachment } from '../../../../Notes/Notes.functions';
import { getContextType, isBotChat } from './MessageInput.functions';
import { globalFiles } from './MessageInput.types';

export const disableSendUntilSent = (setDisableSend: Function) => {
  setDisableSend(true);
  globalFiles.disableSend = true;
};

export const getS3PathForAttachedFile = async (props: any, file: any, voiceNote: any): Promise<string> => {
  //Need to declase types
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
  return Promise.resolve(fileName);
};

export const constructBasePayload = (
  props: any,
  file: any,
  fileName: any,
  voiceNote: any,
  taggedPersonIds: any,
  message: any,
  repliedToMessage?: any
): ISendMessage => {
  let isReply = Boolean(Object.keys(repliedToMessage).length);
  let repliedToMessageObj = { ...repliedToMessage };
  if (isReply) {
    repliedToMessageObj.isReply = false;
    repliedToMessageObj.repliedMessage = {};
  }
  return {
    userId: props.selectedClient.client_id,
    EventName: 'chat-categorizer',
    tenantId: props.selectedClient.tenant_id || 'amura',
    senderId: props.sessions.user.id,
    messageId: v4(),
    message: message,
    isAttachment: !!file,
    attachmentURL: fileName,
    attachmentFileSize: file ? file.size : 0,
    receivedTime: new Date().toISOString(),
    isVoiceNote: Boolean(voiceNote.audio),
    ContextType: getContextType(props.type),
    voiceNote: { ...voiceNote, audio: fileName },
    loginUserId: props.sessions.user.id,
    taggedPersonIds: taggedPersonIds || [],
    delivered: true,
    isReply: isReply,
    repliedMessage: isReply ? repliedToMessageObj : {},
  } as any;
};

export const addAnswerIfBot = (props: any, lastMessage: any, payload: any, message: any): ISendMessage => {
  if (isBotChat(props.type)) {
    return { ...props.botData, ...lastMessage, ...payload, answer: message };
  }
  return payload;
};

export const modfiyPayloadForCall = (result: any, privacy: any, scheduleData: any) => {
  let payload: ISendMessage = JSON.parse(JSON.stringify(result));
  if (privacy === '@call') {
    payload.scheduleData = scheduleData;
    payload.ContextType = '@call';
    delete payload.privacy;
  }
  return payload;
};
export const modifyingPayloadForNotes = (props: any, result: any, messageToSend: any, privacy: any) => {
  let payload: ISendMessage = JSON.parse(JSON.stringify(result));
  if (privacy === '@note') {
    payload.privacy = '';
    payload.message = messageToSend;
    payload.EventName = 'chat-notes';
    payload.ContextType = '@chat-notes';
    payload.isStar = starCheckInMsg(messageToSend);
    (payload as any).patientId = props.selectedClient.client_id;
    payload.action = 'ADD';
  }
  return payload;
};

export const starCheckInMsg = (message: string): boolean => {
  return message.split(' ').some((e) => e == '#star');
};

export const modifyingPayloadForCallIntake = async (props: any, payload: any, messageToSend: any, taggedObject: any) => {
  let rolesData = [];
  const schedulerRolesData = await getSchedulerRolesData(props?.sessions);
  schedulerRolesData.forEach((each) => {
    rolesData.push(each.value);
  });
  let scheduleDataTemp = {
    channel: 'voice',
    duration: Number(messageToSend).toString(),
    timeUnits: 'mins',
    participants: [],
    title: 'Intake Calls',
    roleIds: rolesData,
    patientId: props.selectedClient.client_id,
    organizer: props.sessions.user.id,
    organizerRoleId: taggedObject?.roleToClient,
  };
  payload.scheduleData = scheduleDataTemp;
  payload.ContextType = '@call';
  payload.operation = '@UPDATE_ENTITY';
  return payload;
};

export const modifyingBasedOnPrivacy = (
  props: any,
  tagOptions: any,
  payload: any,
  scheduleData: any,
  message: any,
  taggedObject?: any
) => {
  let { privacy, messageToSend } = checkPrivacy(message, tagOptions);
  let result: ISendMessage = JSON.parse(JSON.stringify(payload));
  ///Seperate
  if (privacy && props.type === 'bot') {
    result.operation = privacy;
    result.message = privacy;
    return result;
  }
  payload.operation = '@UPDATE_ENTITY';
  payload.privacy = privacy;
  payload.message = messageToSend || '';
  if (privacy === '@call') {
    payload = modfiyPayloadForCall(payload, privacy, scheduleData);
  }
  if (privacy === '@note') {
    payload = modifyingPayloadForNotes(props, payload, messageToSend, privacy);
  }
  if (privacy === '@call intake') {
    payload = modifyingPayloadForCallIntake(props, payload, messageToSend, taggedObject);
  }
  return payload;
};
