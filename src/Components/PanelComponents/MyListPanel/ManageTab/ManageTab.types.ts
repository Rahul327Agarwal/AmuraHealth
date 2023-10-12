import { IReportiesData } from '../../../LibraryComponents/ChatComponent/BlueDotPopUp/BlueDotClosePopUp/BlueDotClosePopUp.types';
import { IReporteesTab, IStatusOptions } from '../../ReporteesListView/ReporteesListViewHome.types';
import { IProps as MyListProps } from '../MyListHome.types';
import { v4 } from 'uuid';

export interface TabPanelProps extends MyListProps {
  handleBack?: any;
  setActiveTab?: Function;
  statusOptions?: Array<any>;
  myTabs: any;
  setMyTabs: any;
}

export interface IAction {
  screen: 'TAB_PANEL' | 'ADDGROUP' | 'MANAGE_GROUP' | 'ADD_TAB' | 'EDIT_TAB';
  payload?: any;
  index?: any;
  // previousScreen?:any;
}

export interface ITab {
  tabId: string;
  tabName: string;
  sortingOrder: number;
  userIds: Array<string>;
  created_by: string;
  created_on: string;
}

export interface ITab {
  tabId: string;
  tabName: string;
  sortingOrder: number;
  userIds: Array<string>;
  created_by: string;
  created_on: string;
}

export interface IProps {
  handleThreeDot: Function;
  myListTabs?: any;
  setActiveTab?: Function;
  setMainAction?: Function;
  setSortedTags?: Function;
  sessions: any;
  onAddNewTab?: (data: ITab[]) => void;
  onSetActiveTab: (value: ITab, data: ITab[]) => void;
  addButtonLabel?: string;
  noDots?: boolean;
  reportessListType: string;
}
export interface AddTabProps {
  action: any;
  setAction: Function;
  setTabData: Function;
  tabData: any;
  sessions: any;
  user: any;
  myListTabs: ITab[];
  statusOptions: Array<any>;
}

export interface ICreateFilter {
  statusOptions: IStatusOptions[];
  loggedUserRoles: string[];
  editData: IReporteesTab;
  handleOnBack: () => void;
  handleOnSave: (data: IFilterData) => void;
}

export interface IFilterData {
  tabName: string;
  criteria: EditDataTypes[];
  isEdit: boolean;
}

export interface IAddCriteria {
  criteria: EditDataTypes[];
  setCriteriaData: React.Dispatch<React.SetStateAction<EditDataTypes[]>>;
  enable: boolean;
  criteriaOptions: any[];
}

export interface tabData {
  title: string;
  cardData: Array<EditDataTypes>;
}

export interface EditDataTypes {
  clause: string;
  criteria: IAvailableClauses;
  option: Array<any>;
  type: string;
  matchCriteria: string;
  matchCriteriaOptions: Array<any>;
  value: string | Array<string>;
  id: string;
}

export const DEFAULT_TABDATA: EditDataTypes = {
  clause: '',
  criteria: '',
  option: [],
  type: '',
  matchCriteria: '',
  matchCriteriaOptions: [],
  value: '',
  id: v4(),
};

export interface ICriteriaOption {
  label: string;
  value: string;
}

// export const criteriaOptions: Array<ICriteriaOption> = [
//   { label: 'Card Name', value: 'cardName' },
//   { label: 'Card Type', value: 'cardType' },
//   { label: 'Blue Dot - Time created', value: 'latestBlueDot' },
//   { label: 'Blue Dot - Time of expiry', value: 'latestBlueDot' },
//   { label: 'Black Dot', value: 'hasBlackDot' },
//   { label: 'Red Dot', value: 'hasRedDot' },
//   { label: 'Tenant', value: 'tenantId' },
//   { label: 'Role', value: 'roleId' },
//   { label: 'Owner', value: 'owner' },
// ];
export type IAvailableClauses = 'status' | 'userCreatedOn' | 'hasBlueDots' | 'nickName' | 'type' | '';
export interface ICriteriaClause {
  value: IAvailableClauses;
  label: string;
  options: Array<any>;
  clause?: Array<IClauseOptions>;
}

export interface IClauseOptions {
  label: string;
  value: string;
  type: 'INPUT' | 'MULTISELECT' | 'TIME' | 'SELECT' | 'DATEANDTIME';
}

export const CLAUSE_OPTIONS = [
  { label: 'And', value: 'and' },
  { label: 'Or', value: 'or' },
];
