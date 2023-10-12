import { PMS_S3 } from '../../../Utils';
import ErrorToaster from './../../../Common/ErrorToaster';
import { v4 as uuidv4 } from 'uuid';

export const OPTIONS_DATA = [
  { label: 'MANI', value: 'mani' },
  { label: 'MANO', value: 'mano' },
  { label: 'SAI', value: 'sai' },
];

export const surveySendMsgAPI = async (
  panelId: string,
  MessageData: any,
  parentProps: any,
  userResponse: any,
  handleDeleteMsg: any,
  setSurveyRedoChatPopup: any,
  setIsSurveyTextPopup: any,
  setSurveySelectResponse: Function,
  isRedo: boolean
) => {
  const { distributionId, currentPostOrder, postId, surveyTitle, collectionId, postType, postResponses, postHeading } =
    MessageData?.survey || {};

  let data = {
    ContextType: isRedo ? '@dist-redo-response' : '@dist-receiver',
    surveyTitle: surveyTitle,
    distributionId: distributionId,
    tenantId: parentProps.selectedClient.tenant_id || 'amura',
    collectionId: collectionId,
    postId: postId,
    currentPostOrder: currentPostOrder,
    currentResponse: userResponse,
    loginUserId: parentProps.sessions.user.id,
    userId: parentProps.selectedClient.client_id,
    messageId: MessageData.messageId,
    EventName: 'chat-categorizer',
    postType: postType,
    postResponses: postResponses,
    postHeading: postHeading,
  };
  PMS_S3.postData({
    ...data,
    Locale: sessionStorage.getItem('locale'),
    url: `${import.meta.env.VITE_BASE_API_URL}/chatCategorizer`,
    token: parentProps.sessions.id_token,
    method: 'POST',
    headers: {},
  })
    .then((response) => {
      if (!response.Error) {
        handleDeleteMsg(MessageData.messageId);
        setSurveyRedoChatPopup(false);
        setIsSurveyTextPopup({ isOpen: false });
        setSurveySelectResponse([]);
      }
    })
    .catch((err) => {
      ErrorToaster('Something went wrong', panelId, 'error');
    });
};

export const surveySendMsgWAAPI = async (panelId: string, MessageData: any, parentProps: any, userResponse: any) => {
  let data = {
    userId: parentProps.selectedClient.client_id,
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
    ...data,
    Locale: sessionStorage.getItem('locale'),
    url: `${import.meta.env.VITE_BASE_API_URL}/chatCategorizer`,
    token: parentProps.sessions.id_token,
    method: 'POST',
    headers: {},
  });
};

export const surveySendMsgWAAPIReply = async (panelId: string, MessageData: any, parentProps: any, userResponse: any) => {
  let whatsAppData = {
    userId: parentProps.selectedClient.client_id,
    senderId: parentProps.sessions.user.id,
    type: 'text',
    message: `${userResponse}`,
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
    token: parentProps.sessions.id_token,
    method: 'POST',
    headers: {},
  });
};
