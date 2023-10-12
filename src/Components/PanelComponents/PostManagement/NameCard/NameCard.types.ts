import { INameCard } from "../PostManagementList/PostManagementList.types";

export interface IProps {
  cardData: INameCard;
  isExtend?: boolean;
  isBgWhite?: boolean;
  noThreeDot?: boolean;
  customStyle?: string;
  isBorderRadius?: boolean;
  isSelected?: boolean;
  handleSelect?: Function;
  openClient?: Function;
  setSelectedCard?: Function;
  setAction?: Function;
  isClientSelected?: boolean;
  message?: IMessage;
  edgeColor?: string;
}

export interface IMessage {
  message: string;
  receivedTime: string;
  isUnread: string;
}
