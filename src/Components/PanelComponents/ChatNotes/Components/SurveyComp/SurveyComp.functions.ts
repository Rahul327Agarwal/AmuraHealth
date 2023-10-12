import { v4 as uuidv4 } from 'uuid';
import ErrorToaster from '../../../../../Common/ErrorToaster';
import { PMS_S3 } from '../../../../../Utils';
import { IChatMessage } from '../../ChatMessage/ChatMessage.types';

export const surveySendMsgAPI = async (
  panelId: string,
  selectedClient: any,
  sessions: any,
  message: IChatMessage,
  userResponse: any,
  isRedo: boolean
) => {
  const { distributionId, currentPostOrder, postId, surveyTitle, collectionId, postType, postResponses, postHeading } =
    message?.survey || {};
  try {
    const data = {
      ContextType: isRedo ? '@dist-redo-response' : '@dist-receiver',
      surveyTitle: surveyTitle,
      distributionId: distributionId,
      tenantId: selectedClient.tenant_id || 'amura',
      collectionId: collectionId,
      postId: postId,
      currentPostOrder: currentPostOrder,
      currentResponse: userResponse,
      loginUserId: sessions.user.id,
      userId: selectedClient.client_id,
      messageId: message.messageId,
      EventName: 'chat-categorizer',
      postType: postType,
      postResponses: postResponses,
      postHeading: postHeading,
    };
    console.log(data, 'send data');
    return await PMS_S3.postData({
      ...data,
      Locale: sessionStorage.getItem('locale'),
      url: `${import.meta.env.VITE_BASE_API_URL}/chatCategorizer`,
      token: sessions.id_token,
      method: 'POST',
      headers: {},
    });
  } catch (error) {
    ErrorToaster('Something went wrong', panelId, 'error');
  }
};

export const surveySendMsgWAAPI = async (
  panelId: string,
  selectedClient: any,
  sessions: any,
  MessageData: any,
  userResponse: any
) => {
  try {
    const payload = {
      userId: selectedClient.client_id,
      ContextType: '@survey-wa-message-reply',
      EventName: 'chat-categorizer',
      tenantId: 'amura',
      senderId: 'SYSTEM',
      receivedTime: new Date().toISOString(),
      messageId: MessageData.messageId,
      survey: { ...MessageData?.survey, currentResponse: userResponse },
      type: 'text',
      delivered: true,
      isVisible: true,
    };
    return await PMS_S3.postData({
      ...payload,
      Locale: sessionStorage.getItem('locale'),
      url: `${import.meta.env.VITE_BASE_API_URL}/chatCategorizer`,
      token: sessions.id_token,
      method: 'POST',
      headers: {},
    });
  } catch (error) {
    ErrorToaster('Something went wrong while submitting the answer!', panelId);
  }
};

export const surveySendMsgWAAPIReply = async (
  panelId: string,
  selectedClient: any,
  sessions: any,
  MessageData: any,
  userResponse: any
) => {
  try {
    const whatsAppData = {
      userId: selectedClient.client_id,
      senderId: sessions.user.id,
      type: 'text',
      message: `${userResponse}` ?? '',
      link: '',
      name: '',
      EventName: 'manage-wa-message',
      isReply: true,
      messageId: uuidv4(),
      repliedToMessageId: MessageData?.messageId,
    };
    return await PMS_S3.postData({
      ...whatsAppData,
      Locale: sessionStorage.getItem('locale'),
      url: `${import.meta.env.VITE_BASE_API_URL}/events`,
      token: sessions.id_token,
      method: 'POST',
      headers: {},
    });
  } catch (error) {
    ErrorToaster('Something went wrong while submitting the answer!', panelId);
  }
};
