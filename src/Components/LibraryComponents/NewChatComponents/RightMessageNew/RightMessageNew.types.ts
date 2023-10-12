import { IMessage } from "../ChatComponents.types";

export interface IProps {
  message: IMessage;
  staffList: Array<any>;
  senderFontColor?: string;
  replySenderFontColor?: string;
  isFirstMessage?: boolean;
  sessions: any;
}
