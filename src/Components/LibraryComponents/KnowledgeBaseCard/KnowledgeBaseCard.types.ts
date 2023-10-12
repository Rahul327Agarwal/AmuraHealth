interface headingObj {
  snippet: string;
}
export interface IcardData {
  heading: headingObj;
  description: headingObj;
  postId: string;
  tenant: headingObj;
}
export interface IProps {
  heading: headingObj;
  description: headingObj;
  onSubmit: Function;
  tenant: headingObj;
  postId: string;
}

export interface IKnowledgeBaseDetailed {
  setExpandedView: Function;
  cardData: IcardData;
  onSubmit: Function;
}

export interface IKnowledgeBaseForChat {
  message: any;
  highlightBg?: boolean;
  highlightext?: any;
  hasMatch?: boolean;
  setOpenReply?: Function;
  setRepliedToMessage?: Function;
  msgHighlight?: string
}
