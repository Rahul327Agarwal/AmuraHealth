import { PMS_S3 } from '../../../Utils';
import axios from 'axios';
import { ICardData } from './DistributionSummary/DistributionSummary.types';
import ErrorToaster from './../../../Common/ErrorToaster';
import SuccessToast from './../../../Common/SuccessToaster';
import { UniqueCollectionType } from './DistributionsMgt.types';
import { getUserNameFromES } from '../../../Common/Common.functions';

export const MIN_SEARCH_CHAR = 3;

export const getCollectionLists = async (panelId: string, props: any, collectionType: string, tenantId: string = 'amura') => {
  try {
    const response = await PMS_S3.getObject(
      `pms-ql-collections/${collectionType}/${tenantId}/collectionList.json`,
      import.meta.env.VITE_CLIENT_BUCKET,
      {
        TenantId: '',
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: props.sessions.id_token,
      }
    );
    if (!response.Error) {
      response.collections.sort((a: any, b: any) => {
        const fa = a?.heading?.toLowerCase() || a?.title?.toLowerCase();
        const fb = b?.heading?.toLowerCase() || b?.title?.toLowerCase();
        if (fa < fb) return -1;
        if (fa > fb) return 1;
        return 0;
      });

      return response.collections;
    }
    return [];
  } catch (error) {
    ErrorToaster((error as Error).message, panelId, 'error');
  }
};

export const getPostLists = async (panelId: string, props: any, tenantId: string) => {
  try {
    const response = await PMS_S3.getObject(`pms-ql-posts/${tenantId}/postList.json`, import.meta.env.VITE_CLIENT_BUCKET, {
      TenantId: '',
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_S3_FETCH_API,
      token: props.sessions.id_token,
    });
    if (!response.Error) {
      response.posts.sort((a: any, b: any) => {
        const fa = a?.heading?.toLowerCase();
        const fb = b?.heading?.toLowerCase();
        if (fa < fb) return -1;
        if (fa > fb) return 1;
        return 0;
      });
      return response.posts;
    }
  } catch (error) {
    ErrorToaster((error as any).message, panelId, 'error');
  }
};

export const getPostAndCollectionLists = async (panelId: string, props: any, cardData: ICardData) => {
  const { collectionId, collectionType, tenantId } = cardData;
  let collectionResponse: any = await getCollectionLists(props, 'PCM', tenantId);
  let postResponse: any = await getPostLists(panelId, props, tenantId);
  return { collectionResponse, postResponse };
};

export const getSummaryDataByPostType = async (props: any, cardData: ICardData) => {
  try {
    const summaryResponse = await PMS_S3.getObject(
      `pms-ql-collections/${cardData.collectionType}/${cardData.tenantId}/${cardData.collectionId}/myCollection.json`,
      import.meta.env.VITE_CLIENT_BUCKET,
      {
        TenantId: '',
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: props.sessions.id_token,
      }
    );
    if (!summaryResponse.Error) {
      let authorName = await getUserNameFromES(summaryResponse?.header?.name);
      const newObj = { ...summaryResponse, authorName: authorName || summaryResponse?.header?.name };
      return newObj;
    }
  } catch (error) {}
};

export const getEsDataforUsers = async (panelId: string, userData: Array<any>) => {
  try {
    const modifiedObj = userData.map((data) => ({ match: { _id: data } }));
    const payload = {
      index: 'users',
      _source: ['sort_key', 'profile.nick_name', 'profile.first_name', 'profile.last_name'],
      query: { bool: { must: { bool: { should: modifiedObj } } } },
      size: 100,
    };
    const response = await getUsersList(payload);
    const modifiedResponse = response.map((data: any) => {
      const { profile } = data._source || {};
      return `${profile?.first_name || ''} ${profile?.last_name || ''}`;
    });
    return modifiedResponse;
  } catch (error) {
    ErrorToaster((error as Error).message, panelId, 'error');
  }
};

export const getCurrentUserdata = async (props: any, searchText?: string) => {
  const payload = {
    index: 'users',
    _source: ['sort_key', 'profile.nick_name', 'profile.first_name', 'profile.last_name'],
    query: { match: { _id: `${searchText}` } },
  };
  const response = await getUsersList(payload);
  return response[0]?._source || {};
};

export const getUsersList = async (payload: any) => {
  const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
  const response = await axios.post(url, payload);
  return response?.data?.body || [];
};

export const getPostById = async (props: any, postId: string) => {
  try {
    const response = await PMS_S3.getObject(`pms-ql-posts/${postId}/myPost.json`, import.meta.env.VITE_CLIENT_BUCKET, {
      TenantId: '',
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_S3_FETCH_API,
      token: props.sessions.id_token,
    });
    return response;
  } catch (error) {}
};

export const getSubCollectionPreview = async (sessions: any, subCollectionId: string) => {
  try {
    const url = `${import.meta.env.VITE_FINAL_POST_PREVIEW}pms/preview?collectionId=${subCollectionId}`;
    const response: any = await axios.get(url, {
      headers: { Authorization: `Bearer ${sessions.id_token}` },
    });
    if (response?.data?.body) return response.data.body;
  } catch (error) {}
};

export const getFinalCollectionPreview = async (sessions: any, collectionId: string) => {
  try {
    const url = `${import.meta.env.VITE_FINAL_POST_PREVIEW}pms/preview?collectionId=${collectionId}&isPc=true`;
    const response: any = await axios.get(url, {
      headers: { Authorization: `Bearer ${sessions.id_token}` },
    });
    if (response?.data?.body) return response.data.body;
    return null;
  } catch (error) {
    console.error('Error while fetching final preview', error);
  }
};

export const invisibleKeyUpdateAPI = async (sessions: any, collectionPayload: any) => {
  try {
    const params = {
      userId: sessions?.user?.id,
      tenantId: 'amura',
      collectionPayload,
    };
    const url = `${import.meta.env.VITE_PC_UPDATE_VISIBILITY}`;
    return await axios.put(url, params, {
      headers: { Authorization: `Bearer ${sessions.id_token}` },
    });
  } catch (error) {}
};

export const addPostToCollection = async (props: any, payload: any, panelId: string) => {
  try {
    const params = {
      action: 'ADD',
      EventName: 'manage-collections',
      tenantId: props.selectedClient.tenant_id || 'amura',
      userId: props.selectedClient.client_id,

      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_EVENT_API,
      token: props.sessions.id_token,
      method: 'POST',
      ...payload,
    };
    const response = await PMS_S3.postData(params);
    if (!response.Error) {
      SuccessToast('Post added successfully', panelId, 'success');
      return true;
    }
    ErrorToaster(response.Error, panelId, 'error');
  } catch (error) {
    ErrorToaster((error as any).message, panelId, 'error');
  }
};
export const addCollectionToCollection = async (props: any, payload: any, panelId: string) => {
  try {
    const params = {
      action: 'ADD',
      EventName: 'manage-collections',
      tenantId: props.selectedClient.tenant_id || 'amura',
      userId: props.selectedClient.client_id,

      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_EVENT_API,
      token: props.sessions.id_token,
      method: 'POST',
      ...payload,
    };

    const response = await PMS_S3.postData(params);
    if (!response.Error) {
      SuccessToast('Post collection added successfully', panelId, 'success');
      return true;
    }
    ErrorToaster(response.Error, panelId, 'error');
  } catch (error) {
    ErrorToaster((error as Error).message, panelId, 'error');
  }
};

export const getHeaderKeyByCollectionType = (type: UniqueCollectionType): { headerKey: string; channel: string } => {
  switch (type) {
    case 'KBM':
    case 'LMS':
    case 'POLL':
    case 'QMT':
      return { headerKey: 'title', channel: CHANNEL_TYPE.DISTRIBUTION };
    case 'PCM':
      return { headerKey: 'collectionName', channel: CHANNEL_TYPE.SUB_COLLECTION };
    default:
      return { headerKey: '', channel: '' };
  }
};

export const CHANNEL_TYPE = {
  DISTRIBUTION: 'DISTRIBUTION',
  SUB_COLLECTION: 'SUB_COLLECTION',
};

export const API_ACTION_TYPE = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  OPEN_CONFIRM: 'OPEN_CONFIRM',
};
