export interface IProps {
  sessions: any;
  user: any;
  childEventTrigger: Function;
  parameter: any;
  registerEvent: any;
  unRegisterEvent: any;
  selectedTenant: any;
  panel: any;
  role: string;
  selectedClient: any;
}
export interface PostManagementListProps extends IProps {
  setSelectedCard: Function;
  tabName?: any;
  nameCardSelected: Array<any>;
  setListCards: any;
  setMyListfilters?: Function;
  showFilterBadge: boolean;
  isLoading: boolean;
  AutoSizerHeight?: number;
}
export interface INameCard {
  ID?: string;
  tenantId?: string;
  user_created_on?: string;
  status?: Array<IStatus>;
  userInfo?: IUserInfo;
  Owner?: IOwner;
  bluedot?: any;
  protocol?: any;
  SLA?: ISLA;
  roleId?: string;
  // tittle?:string
  description?: string;
  heading?: string;
  createdOn?: any;
  postId?: string;
  postType?: string;
}

export interface IUserInfo {
  Name: string;
  username: string;
  FirstName: string;
  LastName: string;
}

export interface IStatus {
  statusType: string;
  current_status: string;
  previous_status: string;
}

export interface IOwner {
  userId: string;
  userName: string;
}

export interface ISLA {
  StartTime: number;
  EndTime: number;
  Title: string;
  CreatedTime: number;
}
