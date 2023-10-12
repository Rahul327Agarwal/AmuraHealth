export interface IProps {
  message: IMessage;
  handleReDo: Function;
  sessions?: any;
}
export interface IMessage {
  message: string;
  msgSent?: string;
  type?: string;
  val?: string;
  title?: string;
  postPayload?: any;
  receivedTime?: any;
}
