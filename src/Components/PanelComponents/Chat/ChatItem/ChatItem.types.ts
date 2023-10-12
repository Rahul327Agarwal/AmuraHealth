import { IComponentMessage } from '../Chat.types';

export interface IProps {
  message: IComponentMessage;
  messageList: Array<IComponentMessage>;
  index: number;
  itemType: string;
  fetchedAllMsgs: string;
  getHistoryMessages: Function;
  usersInTheChannel: Array<any>;
  searchIndices: Array<any>;
  currentSearchIndex: number;
  hightLightSearch: string;
  channelId: string;
  colorsForUsername: any;
  showConfirm: boolean;
  selectedOption: any;
  disableConfirm: any;
  handleSurveyInput: Function;
  confirmSelection: Function;
  setReplyingMessageIndex: Function;
  setReplyingMessage: Function;
  setShowReplyingMessage: Function;
  sessions: any;
  scrollDrownBadgeCount: number;
  setScrollDownBadgeCount: Function;
  allUsers: Array<any>;
  messageRef: any;
}
