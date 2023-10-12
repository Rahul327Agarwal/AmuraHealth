import { IMessage } from '../ChatComponents.types';

export interface IProps {
  message: IMessage;
  senderFontColor?: string;
  replySenderFontColor?: string;
  isFirstMessage?: boolean;
}
