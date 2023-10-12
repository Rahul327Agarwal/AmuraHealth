export interface IProps {
  tagOptions: Array<ITag>;
  parentProps: any;
  type: string;
  roomUsers?: Array<any>;
  postCollectionData?: any;
  setTenantState?: Function;
  tenantState?: { open: boolean; tenantId: string; message: string ,title:boolean};
  showScrollDown?:boolean
  onScrollClick:()=>void
}

export interface postData {
  type: string;
  headerText: string;
  msgMapper: "ATTACHMENT" | "THUMBNAIL" | "QUESTION_ANSWER";
  message: string;
  action: "UPDATE" | "ADD";
}

export interface ITag {
  id: string;
  label: string;
}

export interface openDrawerState {
  open: boolean;
  type: "ATTACHMENT" | "QUESTION_ANSWER" | "TAG_SUGGESTION" | "THUMBNAIL";
}
