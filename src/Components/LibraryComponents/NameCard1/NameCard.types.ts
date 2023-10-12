export interface IProps {
  id: string;
  profilePicURL?: string;
  profilePic: React.ReactElement;
  tenentIcon?: React.ReactElement;
  title: string;
  hasBlueDot?: boolean;
  hasBlackDot?: boolean;
  hasBranching?: boolean;
  // hasMenuOptions: boolean;
  // menuOptions: React.ReactElement;
  endActionButton?: React.ReactElement;
  caption?: string;
  iconTray?: Array<React.ReactElement> | any;
  content?: string;
  SLA?: {
    StartTime: string;
    EndTime: string;
    Title: string;
    CreatedTime: string;
  };
  openClient?: Function;
  isExtend?: boolean;
  customStyle?: string;
  isSelected?: boolean;
  isClientSelected?: boolean;
  isEventSelected?: boolean;
  roundedBorder?: boolean;
  justifyContentCaption?:
    | "space-between"
    | "center"
    | "flex-end"
    | "flex-start";
  isMiniCard?: boolean;
  iconTrayStyle?: string;
  nonExtenableContent?: any;
  participants?: IParticipant[];
  setSelectedCardId?: Function;
  isEventCard?: boolean;
}

interface IParticipant {
  userId: string;
  roleId: string;
}
