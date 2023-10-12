import { v4 } from 'uuid';
import { ISelectedClient } from '../../../../../../Common/Common.types';
import { store } from '../../../../../../DisplayFramework/State/store';
import { PMS_S3 } from '../../../../../../Utils';
import { notifyEvent } from '../../../../../../AppSync/AppSync.functions';
import axios from 'axios';
import { ChatPrivacy } from './ChatPrivacy';
import { ChatVoiceNoteMessage } from '../ChatVoiceRecorder/ChatVoiceRecorder.types';
import { UploadFilesViewXUtils } from '../ChatAttachment/UploadFilesViewX/UploadFilesViewX.functions';

export namespace ChatInputFunctions {
  function makeSendMessagePayload(props: {
    message: string;
    replyMessage: any;
    clientId: string;
    tenantId: string;
    senderId: string;
    fileURL?: string;
    fileSize?: number;
    voiceNote?: ChatVoiceNoteMessage;
    contextType: string;
  }) {
    let isReply = Boolean(Object.keys(props.replyMessage).length);
    let repliedToMessageObj = { ...props.replyMessage };
    if (isReply) {
      repliedToMessageObj.isReply = false;
      repliedToMessageObj.repliedMessage = {};
    }
    return {
      userId: props.clientId,
      EventName: 'chat-categorizer',
      tenantId: props.tenantId || 'amura',
      senderId: props.senderId,
      messageId: v4(),
      message: props.message,
      isAttachment: props.fileURL ? true : false,
      attachmentURL: props.fileURL,
      attachmentFileSize: props.fileSize ?? 0,
      receivedTime: new Date().toISOString(),
      isVoiceNote: Boolean(props.voiceNote),
      ContextType: props.contextType,
      voiceNote: props.voiceNote,
      loginUserId: props.senderId,
      // taggedPersonIds: (taggedPersonIds || []) as any,
      delivered: true,
      isReply: isReply,
      repliedMessage: isReply ? repliedToMessageObj : {},
      privacy: undefined,
      isStar: isMessageStarted(props.message),
    };
  }

  export async function sendMessage(props: {
    selectedClient: ISelectedClient;
    message: string;
    file?: File;
    replyMessage: any;
    privacy?: ChatPrivacy.ChatPrivacyType | '@note';
    voiceNote?: ChatVoiceNoteMessage;
  }) {
    const session = store.getState().auth.userSession;

    let fileURL: string | undefined;
    let audioFileURL: string | undefined;

    if (props.file) {
      fileURL = await uploadFile(props.file, {
        selectedClient: props.selectedClient,
      });
    }
    if (props?.voiceNote?.audio) {
      const audioFile = await UploadFilesViewXUtils.getFileFromLocalURL(props.voiceNote.audio, `${v4()}.ogg`, 'audio/ogg');
      audioFileURL = await uploadFile(audioFile, {
        selectedClient: props.selectedClient,
      });
    }

    let payload = makeSendMessagePayload({
      clientId: props.selectedClient.client_id,
      tenantId: props.selectedClient.tenant_id,
      contextType: '@NOTES',
      message: props.message,
      replyMessage: props.replyMessage,
      senderId: session.user.id,
      fileURL: fileURL,
      fileSize: props.file?.size,
      voiceNote: props.voiceNote
        ? {
            ...props.voiceNote,
            audio: audioFileURL,
          }
        : undefined,
    });

    if (props.privacy) {
      payload = await modifyPayloadBasedOnPrivacy(payload, {
        privacy: props.privacy,
        selectedClient: props.selectedClient,
        message: props.message,
      });
    }

    const res = await PMS_S3.postData({
      ...payload,
      Locale: sessionStorage.getItem('locale'),
      url: `${import.meta.env.VITE_BASE_API_URL}/chatCategorizer`,
      token: session.id_token,
      method: 'POST',
      headers: {},
    });
    if (res.Error) return;
    delete payload.delivered;
    notifyEvent({
      input: {
        user_id: `~${props.selectedClient.tenant_id}~${props.selectedClient.client_id}~`,
        event_name: 'notes-client',
        timestamp: `${new Date().getTime()}`,
        last_message: JSON.stringify(payload) ?? '',
      },
    });
  }

  export async function uploadFile(
    file: File,
    props: {
      selectedClient: ISelectedClient;
    }
  ) {
    const token = store.getState().auth.userSession.id_token;
    let url = `${import.meta.env.VITE_S3_IR_UPLOAD_API}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'file-name': file.name,
      'patient-id': props.selectedClient.client_id,
      'user-id': store.getState().auth.userSession.user.id,
      'tenant-id': props.selectedClient.tenant_id,
      'notes-file': 'YES',
      'note-id': v4(),
      'Content-Type': 'multipart/form-data',
    };
    let formData = new FormData();
    formData.append('input_files', file);
    let response = await axios.post(url, formData, {
      headers: headers,
    });
    if (response && response.data && response.data.Status === 'Success') {
      return response.data.FileLocation as string;
    }
    throw new Error('Failed to upload');
  }

  export function breakHTMLMessage(htmlMessage: string) {
    let foundTag = '';
    let messageContent = '';

    const fakeEL = document.createElement('div');
    fakeEL.innerHTML = htmlMessage;
    for (let i = 0; i < fakeEL.children.length; i++) {
      const element = fakeEL.children[i];
      if (element.tagName === 'SPAN' && element.textContent.trim().startsWith('@')) {
        foundTag = element.textContent.trim();
        continue;
      }
    }

    fakeEL.childNodes.forEach((c) => {
      if (c.nodeType === Node.TEXT_NODE) {
        messageContent += c.textContent;
      }
    });
    return {
      tag: foundTag,
      message: messageContent.trim(),
    };
  }

  export async function modifyPayloadBasedOnPrivacy(
    payload: any,
    props: {
      privacy: ChatPrivacy.ChatPrivacyType;
      message: string;
      selectedClient: ISelectedClient;
    }
  ) {
    const modifiedPayload = await ChatPrivacy.payloadModifierMap?.[props.privacy]?.modifyPayloadFn?.(payload, {
      selectedClient: props.selectedClient,
      message: props.message,
    });
    return modifiedPayload ?? payload;
  }

  export function isMessageStarted(message: string) {
    return message.split(' ').findIndex((s) => s.trim().includes('#star')) >= 0;
  }
}
