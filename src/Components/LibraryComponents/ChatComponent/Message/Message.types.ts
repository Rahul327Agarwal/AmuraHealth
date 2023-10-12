import { ITagObject } from '../../../PanelComponents/Notes/components/MessageInputNew/MessageInput.types';
import { IMessage } from '../ChatComponents.types';

export interface AttachmentMessageProps {}
export interface ProfileWithNameProps {
  profileName: string;
  profileURL: any;
  isSmall?: boolean;
  customStyle?: string;
  loggenInUserName?: string;
}
export interface ReplayMessageProps {}
export interface ReplayMessageProps {}
export interface QuestionAnswerMessageProps {}

export interface IProps {
  message: IMessage;
  staffList: Array<any>;
  senderFontColor?: string;
  replySenderFontColor?: string;
  isFirstMessage?: boolean;
  sessions: any;
  highlightBg?: boolean;
  highlightext?: any;
  hasMatch?: boolean;
  userTagsObject: ITagObject;
  selectedClient?: any;
  notifyEvent?: any;
  online?: boolean;
  setBlueDotSchedule?: Function;
  setBlueDotEditInfo?: Function;
  setOpenReply?: Function;
  setRepliedToMessage?: Function;
  setMsgHightLight?: Function;
  chatContainerRef?: React.MutableRefObject<any>;
}
