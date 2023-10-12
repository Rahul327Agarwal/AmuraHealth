import React, { MouseEventHandler } from 'react';
import { IReporteesTab, TReportessListType } from '../ReporteesListView/ReporteesListViewHome.types';
import { IReporteesTabProps } from '../ReporteesListView/ReporteesTab/ReporteesTab.types';
import { ICard, INameCard } from './MyList/MyList.types';

export interface IProps {
  setAction: Function;
  selectedClient: any;
  sessions: any;
  user: any;
  childEventTrigger: Function;
  parameter: any;
  registerEvent: any;
  unRegisterEvent: any;
  notifyEvent: any;
  selectedTenant: any;
  role: string;
  reportessListType?: TReportessListType;
  reporteesTabData?: IReporteesTabProps;
  reporteesData?: {
    staffName: string;
    staffId: string;
    roleId: string;
    reportingStaffId: string;
    reportingRoleId: string;
    handleBackToReportees: () => void;
  };
}
export interface MyListProps extends IProps {
  onRefreshReportees: () => void;
  setSelectedCard: Function;
  tabs: Array<any>;
  groups: Array<any>;
  isLoading: boolean;
  activeTab: any;
  setActiveTab: Function;
  setBlueDotsScreenViewData?: Function;
  activeGroup?: any;
  setActiveGroup?: any;
  clientData: { cards: Array<ICard>; roles: Array<string> };
  setClientData: Function;
}

export interface IFilterState {
  owner?: Array<string>;
  status?: Array<string>;
  role?: Array<string>;
  createdOnStart?: Date;
  createdOnEnd?: Date;
  minDate?: Date;
  maxDate?: Date;
  sortBy?: 'bluedot' | 'Newest' | 'Oldest' | 'Name' | 'Status';
  groupBy?: string;
}

export interface MessageStatusesProps extends IProps {
  selectedCard: INameCard;
  handleBack: () => void;
}

export interface FilterCardProps extends IProps {
  onFilterChange: Function;
  defaultFilters: IFilterState;
  appliedFilters: IFilterState;
  statusOptions: Array<any>;
  ownerOptions: Array<any>;
  userRoles: Array<any>;
  handleBack: () => void;
}
export interface ITabSettingProps extends IProps {
  myListCards: Array<INameCard>;
  handleBack: Function;
  myListTabs: Array<ITab>;
  setActiveTab: Function;
}

export interface ITab {
  tabId: string;
  tabName: string;
  sortingOrder: number;
  userIds: Array<string>;
  created_by: string;
  created_on: string;
}

export type TabScreensType = 'TAB_SETTING' | 'ADD_TABS' | 'ADD_CARDS' | 'UPDATE_TAB' | 'FILTER_TAB';

export type actionTypes =
  | 'HOME'
  | 'MESSAGE_STATUS'
  | 'SEARCH'
  | 'FILTER'
  | 'TABSETTING'
  | 'GROUPSETTING'
  | 'MYLIST'
  | 'BLUEDOTSVIEW';

export interface AccordionHeaderProps {
  groupedName: string;
  listCount: string;
  open: boolean;
  handleOnClick: MouseEventHandler;
}

export interface BlueDotCardsProps extends IProps {
  selectedClientObject: INameCard;
  activeTab: ITab;
}
export interface IBlueDotScreenInfo {
  patientId: string;
  tenantId: string;
  roleId: string;
  patientName: string;
}
