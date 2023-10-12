import { PMS_S3 } from "../../../../../Utils";
import axios from "axios";

export const getpostCollectionPreviewData = async (props: any) => {
  try {
    const response = await PMS_S3.getObject(
      `pms-ql-post-collections/${props.selectedClient.client_id}/myPostCollection.json`,
      import.meta.env.VITE_CLIENT_BUCKET,
      {
        TenantId: "",
        Locale: sessionStorage.getItem("locale"),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: props.sessions.id_token,
      }
    );
    return response;
  } catch (error) {
    console.error(error, "summary error");
  }
};

export const getFinalPostPreview = async (props: any) => {
  try {
    const url = `${
      import.meta.env.VITE_FINAL_POST_PREVIEW
    }pms/preview?collectionId=${props.collectionId}&isPc=true`;
    const response: any = await axios.get(url, {
      headers: { Authorization: `Bearer ${props.sessions.id_token}` },
    });
    if (response?.data?.body) return response.data.body;
  } catch (error) {
    console.error("!!error", error);
  }
};

export const POST_KEYS = { PA: "PA", PT: "PT", SPA: "SPA", SPT: "SPT" };

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
      (filesObject as any)[`${attachmentKey}_${index}`] =
        data?.topics?.attachment?.file;
    }
    if (data?.topics?.thumbnail?.file) {
      (filesObject as any)[`${thumbnailKey}_${index}`] =
        data?.topics?.thumbnail?.file;
    }
    if (invisibleKeysObj) {
      (invisibleKeysObj as any)[`${Pkey}_${index}`] = data.invisibleKeys || [];
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
    setPostFiles(
      data?.posts,
      filesObject,
      POST_KEYS.SPA,
      POST_KEYS.SPT,
      invisibleKeysObj,
      Pkey
    );
    if (invisibleKeysObj) {
      (invisibleKeysObj as any)[`${SCKey}_${index}`] = data.invisibleKeys || [];
    }
  });
  return filesObject;
};

export const showingResponseMsgs = (data: any) => {
  if (data.type === "select") {
    return data.snippet?.toString().replace(/,/g, " or ");
  }
  if (data.type === "multiSelect") {
    return data.snippet?.toString().replace(/,/g, " and ");
  }
  if (data.type === "textField") {
    return "Text response";
  }
};
