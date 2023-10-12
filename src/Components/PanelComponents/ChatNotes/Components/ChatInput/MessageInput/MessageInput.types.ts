import { ChatFlyoutsKey } from '../ChatFlyout/ChatFlyoutComponentMap';

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
  isSmall?: boolean;
  pushUnsentMessage: Function;
  panel: any;
  unreadMessagesCount?: number;
  openReply?: boolean;
  repliedToMessage?: any;
  setRepliedToMessage?: Function;
  setOpenReply?: Function;
  sessions?: any;
  setMsgHightLight?: Function;
  setBlueDotEditInfo?: Function;
  openedFlyout?: ChatFlyoutsKey;
  setOpenedFlyout?: (flyout?: ChatFlyoutsKey) => void;
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
