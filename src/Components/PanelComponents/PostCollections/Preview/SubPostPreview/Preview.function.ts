import axios from 'axios';
import { PMS_S3 } from '../../../../../Utils';
import SuccessToast from './../../../../../Common/SuccessToaster';
import ErrorToaster from './../../../../../Common/ErrorToaster';

export const getSubCollectionPreview = async (props: any) => {
  try {
    const url = `${import.meta.env.VITE_FINAL_POST_PREVIEW}pms/preview?collectionId=${props.subCollectionId}`;
    const response: any = await axios.get(url, {
      headers: { Authorization: `Bearer ${props.sessions.id_token}` },
    });
    if (response?.data?.body) return response.data.body;
  } catch (error) {
    console.error('!!error', error);
  }
};

export const callAddSubCollectionPost = async (panelId: string, props: any, payload: any) => {
  try {
    let param: any = {
      EventName: 'manage-collections',
      action: 'ADD',
      collectionId: props.collectionId,
      collectionType: 'PCM',
      tenantId: 'amura',
      userId: props.sessions.user.id,
      elementsToAdd: [payload],
    };

    const response: any = PMS_S3.postData({
      ...param,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_EVENT_API,
      token: props.sessions.id_token,
      method: 'POST',
    });
    if (response.Error) ErrorToaster(response.Error, panelId, 'error');
    SuccessToast('Post collection added successfully', panelId, 'success');
  } catch (error) {}
};

export const setPostInvisiblekey = (posts: Array<any>, invisibleKeysObject: Object, Pkey: string) => {
  return posts?.map((data, index) => ({
    ...data,
    invisibleKeys: (invisibleKeysObject as any)[`${Pkey}_${index}`] || data.invisibleKeys,
  }));
};

export const setPCSubPostInvisiblekey = (posts: Array<any>, invisibleKeysObject: Object, Pkey: string, nameKey: string) => {
  return posts?.map((data, index) => ({
    ...data,
    invisibleKeys: (invisibleKeysObject as any)[`${Pkey}_${index}_${nameKey}`] || [],
  }));
};

export const setSubPostInvisiblekey = (
  subCollections: Array<any>,
  invisibleKeysObject: Object,
  SCkey: string,
  SCPkey: string
) => {
  return subCollections?.map((data, index) => {
    let posts = data.posts;
    if (posts) posts = setPCSubPostInvisiblekey(posts, invisibleKeysObject, SCPkey, data?.collectionName);
    return { ...data, posts, invisibleKeys: (invisibleKeysObject as any)[`${SCkey}_${index}`] || data.invisibleKeys };
  });
};

export const showingResponseMsgs = (data: any) => {
  if (data.type === 'select') {
    return data.snippet?.toString().replace(/,/g, ' or ');
  }
  if (data.type === 'multiSelect') {
    return data.snippet?.toString().replace(/,/g, ' and ');
  }
  if (data.type === 'textField') {
    return 'Text response';
  }
};
