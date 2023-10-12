import { IMoveCard, IUserBluedot } from "../../PanelComponents/MyListPanel/MyList/MyList.types";

export interface IProps {
  cardData: IMoveCard;
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
  showBlueDot?: boolean
  bluedot?: IUserBluedot
  isEmergency?:any
}

export interface IMessage {
  message: string;
  receivedTime: string;
  isUnread: string;
}
