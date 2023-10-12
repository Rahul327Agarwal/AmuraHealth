import { PMS_S3 } from '../../../../Utils';
import { v4 } from 'uuid';
import { getFileExtension } from './../../../../Common/Common.functions';
import { getContextType } from '../MessageInput/MessageInput.functions';

export const sendMessageAPIChannel = async (
  props: any,
  selectedvalues: any,
  resetInput: Function,
  uniqueId: any,
  postData: any
) => {
  let response: any;
  let fileName: any = '';

  let payload: any = {
    userId: '',
    EventName: 'chat-categorizer',
    tenantId: props.selectedClient.tenant_id || 'amura',
    senderId: props.sessions.user.id,
    messageId: v4(),
    message: '',
    isAttachment: false,
    attachmentURL: fileName,
    attachmentFileSize: 0,
    receivedTime: new Date().toISOString(),
    ContextType: getContextType(props.type),
    loginUserId: props.sessions.user.id,
    operation: '@UPDATE_ENTITY',
  };

  if (isPostChat(props.type)) {
    payload = {
      ...payload,
      action: postData.action,
      collectionPayload: {
        collectionId: uniqueId,
        collectionType: props.type,
        snippet: {
          type: postData.type,
          message: '',
          title: postData.headerText,
          values: selectedvalues,
          visibility: selectedvalues,
        },
      },
    };
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
    });
  // .finally(() => {
  // });
  // resetInput();
  // setDisableSend(false);
};

export const isPostChat = (type: string) => {
  return type === 'PCM';
};
