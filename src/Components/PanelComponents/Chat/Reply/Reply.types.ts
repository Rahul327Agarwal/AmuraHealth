import { IComponentMessage } from '../Chat.types';
export interface IProps {
  replyingMessage: IComponentMessage;
  setShowReplyingMessage: Function;
  usersInTheChannel: Array<any>;
  searchIndices: Array<any>;
  currentSearchIndex: number;
  hightLightSearch: string;
  colorsForUsername: any;
  replyingMessageIndex: string;
  sessions: any;
  allUsers: Array<any>;
}
