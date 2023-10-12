export interface IProps {
  disableOfflineSend: boolean;
  tagOptions: Array<ITag>;
  handleSubmit: (message: any) => void;
  disableSend: boolean;
  showScrollDown?: boolean;
  onScrollClick: () => void;
  parentProps: any;
  type: string;
  lastMessage: any;
  showQuestionFlyout: any;
  isDragDropOpen?: boolean;
  setIsDragDropOpen?: any;
  roomUsers?: Array<any>;
  setCallScheduleMsg?: Function;
  setBlueDotSchedule?: Function;
  setCloseBlueDot?: Function;
  isSmall?: boolean;
  setOpenWeight: Function;
  setOpenBP: Function;
  isBlueDotSchedule: boolean;
  isCloseBlueDot: boolean;
  openWeight: boolean;
  openBP: boolean;
  setOpenSurvey?: Function;
  openSurvey: boolean;
  pushUnsentMessage: Function;
  panel: any;
  unreadMessagesCount?: number;
  setIsReferPopUpOpen?: Function;
  setIsFBGPopUpOpen?: Function;
  openReply?: boolean;
  repliedToMessage?: any;
  setRepliedToMessage?: Function;
  setOpenReply?: Function;
  sessions?: any;
  setMsgHightLight?: Function;
  setBlueDotEditInfo?: Function;
  replyHeight?: any;
}

export interface ITag {
  id: string;
  label: string;
}

export interface ITagObject {
  [id: string]: string;
}
export interface ITagOptions extends ITag {
  isuser?: boolean;
}

export class globalFiles {
  public static files: any = [];
  public static messageInputData: any = [];
  public static disableSend: boolean = false;
}

export class globalRepliedToMessage {
  public static message: any = {};
}
