export interface IProps {
  setAction: Function;
  selectedClient: any;
  sessions: any;
  user: any;
  childEventTrigger: Function;
  parameter: any;
  registerEvent: any;
  unRegisterEvent: any;
  selectedTenant: any;
  panel: any;
  role: string;

  AutoSizerHeight?: number;
}
export interface MyListProps extends IProps {
  setSelectedCard: Function;
  tabName: any;
  nameCardSelected: Array<any>;
  setListCards: any;
  filters?: IFilterState;
  setMyListfilters?: Function;
  showFilterBadge: boolean;
  isLoading: boolean;
}

export interface IFilterState {
  owner?: Array<string>;
  status?: Array<string>;
  createdOnStart?: Date;
  createdOnEnd?: Date;
  minDate?: Date;
  maxDate?: Date;
  sortBy?: "Newest" | "Oldest" | "Name" | "Status" | "";
}

export interface MessageStatusesProps extends IProps {
  selectedCard: any;
}

export interface FilterCardProps extends IProps {
  onFilterChange: Function;
  defaultFilters: IFilterState;
  appliedFilters: IFilterState;
  statusOptions: Array<any>;
  ownerOptions: Array<any>;
}

export type actionTypes =
  | "HOME"
  | "MESSAGE_STATUS"
  | "SEARCH"
  | "FILTER"
  | "TABSETTING";
