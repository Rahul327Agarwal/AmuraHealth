export interface IProps {
  patientId?: any;
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
  childEventTrigger?: any;
  edgeColor?: string;
  showBlueDot?: boolean;
  registerEvent: Function;
  unRegisterEvent: Function;
  selectedClient: any;
  deactivate?: boolean;
  historyCardData?: any;
  sessions: any;
}

export interface INavBar {
  search: boolean;
  cardData: any;
  filterStatus: filterStatus;
  setNotesdata: Function;
  setFilterStatus: Function;
  searchStringValue: string;
  setSearchStringValue: Function;
}

export interface filterStatus {
  star: boolean;
  hash: boolean;
  privacy: boolean;
  archive: boolean;
}

export interface basicData {
  search: boolean;
  open: boolean;
  isLoading: boolean;
}

export interface cardData {
  tenantId: string;
  sort_key: string;
  part_key: string;
  message: string;
  isActive: number;
  reasonForDeactivation: string;
  privacy: string;
  tags: Array<string>;
  createdOn: string;
  createdBy: string;
  patientId: string;
  isStar: boolean;
  senderId: string;
  updatedBy: string;
  updatedOn: string;
}
