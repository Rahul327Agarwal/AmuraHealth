import { v4 } from 'uuid';
import axios from 'axios';
import { PMS_S3 } from '../../../Utils';
export const sendMessageAPIChannel = async (
  sessions: any,
  selectedvalues: any,
  collectionId: string,
  collectionType: string,
  tenantId: any,
  storeData: any
) => {
  let fileName = '';

  let payload: any = {
    userId: '',
    EventName: 'chat-categorizer',
    tenantId: tenantId || 'amura',
    senderId: sessions?.user?.id || '',
    messageId: v4(),
    message: '',
    isAttachment: false,
    attachmentURL: fileName,
    attachmentFileSize: 0,
    receivedTime: new Date().toISOString(),
    ContextType: '@collection',
    loginUserId: sessions?.user?.id || '',
    operation: '@UPDATE_ENTITY',
  };

  if (isPostChat(collectionType)) {
    payload = {
      ...payload,
      action: storeData.action,
      collectionPayload: {
        collectionId: collectionId,
        collectionType: collectionType,
        snippet: {
          type: storeData.type,
          message: '',
          title: storeData.headerText,
          values: selectedvalues,
          response: {
            type: selectedvalues,
            options: [],
          },
        },
      },
    };
  }

  const response = await PMS_S3.postData({
    ...payload,
    Locale: sessionStorage.getItem('locale'),
    url: `${import.meta.env.VITE_BASE_API_URL}/chatCategorizer`,
    token: sessions.id_token,
    method: 'POST',
    headers: {},
  });
  if (!response.Error) {
    return true;
  }
};

export const isPostChat = (type: string) => {
  return type !== '';
};

export const getDistributionChannels = async (props: any) => {
  const payload = {
    payLoad: {
      partKey: 'lov_name',
      partKeyValue: '~distributionList~master~',
      tableName: 'platform-lov-master',
    },
  };
  const url = `${import.meta.env.VITE_BASE_API_URL}/queryFromDB`;
  try {
    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${props.sessions.id_token}` },
    });
    return response?.data || [];
  } catch (error) {
    console.error(error, 'summary error');
    return [];
  }
};
