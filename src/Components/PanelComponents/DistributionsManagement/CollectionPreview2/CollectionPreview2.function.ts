import axios from 'axios';
import SuccessToast from './../../../../Common/SuccessToaster';
import ErrorToaster from './../../../../Common/ErrorToaster';
import { PMS_S3 } from '../../../../Utils';

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

export const callAddSubCollectionPost = async (props: any, payload: any, panelId: string) => {
  try {
    let param: any = {
      EventName: 'manage-collections',
      action: 'ADD',
      collectionId: props.collectionId,
      collectionType: props.distributionType,
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
  return posts?.map((data: any, index) => ({
    ...data,
    invisibleKeys: invisibleKeysObject?.[`${Pkey}_${index}` as keyof typeof invisibleKeysObject] || data.invisibleKeys,
  }));
};

export const setPCSubPostInvisiblekey = (posts: Array<any>, invisibleKeysObject: Object, Pkey: string, nameKey: string) => {
  return posts?.map((data, index) => ({
    ...data,
    invisibleKeys: invisibleKeysObject?.[`${Pkey}_${index}_${nameKey}` as keyof typeof invisibleKeysObject] || [],
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
    return {
      ...data,
      posts,
      invisibleKeys: invisibleKeysObject?.[`${SCkey}_${index}` as keyof typeof invisibleKeysObject] || data.invisibleKeys,
    };
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

export const POST_KEYS = { PA: 'PA', PT: 'PT', SPA: 'SPA', SPT: 'SPT' };

export const setPostFiles = (
  posts: any,
  filesObject: Object,
  attachmentKey: string,
  thumbnailKey: string,
  invisibleKeysObj?: Object,
  Pkey?: string
) => {
  posts?.forEach((data: any, index: any) => {
    if (data?.topics?.attachment?.file) {
      filesObject[`${attachmentKey}_${index}` as keyof typeof filesObject] = data?.topics?.attachment?.file;
    }
    if (data?.topics?.thumbnail?.file) {
      filesObject[`${thumbnailKey}_${index}` as keyof typeof filesObject] = data?.topics?.thumbnail?.file;
    }
    if (invisibleKeysObj) {
      invisibleKeysObj[`${Pkey}_${index}` as keyof typeof invisibleKeysObj] = data.invisibleKeys || [];
    }
  });
  return { filesObject, invisibleKeysObj };
};

export const setSubPostFiles = (
  subCollections: any,
  filesObject: Object,
  invisibleKeysObj?: Object,
  SCKey?: string,
  Pkey?: string
) => {
  subCollections?.forEach((data: any, index: any) => {
    setPostFiles(data?.posts, filesObject, POST_KEYS.SPA, POST_KEYS.SPT, invisibleKeysObj, Pkey);
    if (invisibleKeysObj) {
      invisibleKeysObj[`${SCKey}_${index}` as keyof typeof invisibleKeysObj] = data.invisibleKeys || [];
    }
  });
  return filesObject;
};
