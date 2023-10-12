export interface IProps {
  message?: IMessage;
  handleReDo?: Function;
  sessions?: any;
  isIcon?: any;
  ref?: any;
}
export interface IMessage {
  message: string;
  msgSent?: string;
  type?: string;
  val?: string;
  title?: string;
  collectionPayload?: any;
  receivedTime?: any;
}

export interface MessageHeaderProps extends IProps {
  heading?: string;
  snippetId?: any;
}
export interface IShowMSgNamesprops {
  userData: Array<string>;
}
