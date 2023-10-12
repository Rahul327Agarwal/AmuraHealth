import { IMessage } from './../../../LibraryComponents/ChatComponent/ChatComponents.types';
import { ITag } from './../../../LibraryComponents/ChatComponent/MessageInput/MessageInput.types';

export interface IProps {
  messagesList: IMessage[];
  possibleTags: ITag[];
  staffList: Array<any>;
  selectedClient: any;
  sessions: any;
  registerEvent: any;
  unRegisterEvent: any;
  childEventTrigger: any;
  injectComponent: any;
  panel: any;
  type: any;
  botData: any;
}
export class chatVariables {
  public static showScrollDownIcon = false;
  public static scrollPosition = 0;
  public static networkConnection = null;
  public static chatConnection = true;
  public static subscription = null;
}
