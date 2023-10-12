export interface IProps {
  tagOptions: Array<ITag>;
  parentProps: any;
  type: string;
  roomUsers?: Array<any>;
  handleOpenTenant?: (message: string) => void;
}

export interface allPostData {
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
