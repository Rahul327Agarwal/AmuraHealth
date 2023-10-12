import { PMS_S3 } from '../../../../Utils';
import { v4 } from "uuid";

export const sendMessageAPIChannel = async (
  props: any,
  selectedvalues,
  resetInput: Function,
  postId: any,
  postData: any
) => {
  let response: any;
  let fileName = "";

  let payload: any = {
    userId: "",
    EventName: "chat-categorizer",
    tenantId: props.selectedClient.tenant_id || "amura",
    senderId: props.sessions.user.id,
    messageId: v4(),
    message: "",
    isAttachment: false,
    attachmentURL: fileName,
    attachmentFileSize: 0,
    receivedTime: new Date().toISOString(),
    ContextType: "@posts",
    loginUserId: props.sessions.user.id,
    operation: "@UPDATE_ENTITY",
  };

  if (isPostChat(props.type)) {
    payload = {
      ...payload,
      action: postData.action,
      postPayload: {
        postId: postId,
        snippet: {
          type: postData.type,
          message: "",
          title: postData.headerText,
          values: selectedvalues,
          response:{
            type:selectedvalues,
            options:[]
          }
         },
      },
    };
  }  
  PMS_S3.postData({
    ...payload,
    Locale: sessionStorage.getItem("locale"),
    url: import.meta.env.VITE_EVENT_API,
    token: props.sessions.id_token,
    method: "POST",
    headers: {},
  })
    .then((response) => {
      if (!response.Error) {
        resetInput();
      }
    })
    .catch((err) => {
      console.log(err);
    });
//resetInput();
 };

export const isPostChat = (type: string) => {
  return type === "post";
};
