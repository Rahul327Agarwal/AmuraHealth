import React from 'react';
import { EditDataTypes } from '../MyListPanel/ManageTab/ManageTab.types';
import { IReporteesTabProps } from './ReporteesTab/ReporteesTab.types';

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
  panel: any;
  role: string;
}

export interface IReporteesMyList extends IProps {
  reportessListType: TReportessListType;
  selectedStaffName: string;
  selectedStaffId: string;
  selectedRoleId: string;
  reportingStaffId: string;
  reportingRoleId: string;
  setAction: React.Dispatch<React.SetStateAction<IAction>>;
  mylist: any;
  reporteesTabData: IReporteesTabProps;
}

export interface staffData {
  roleId: string;
  roleName: string;
  staffId: string;
  staffName: string;
  uniqueKey?: string;
}

export interface reporteesCardData extends staffData {
  level: number;
  firstChild: boolean;
  lastChild: boolean;
  hasChildren: boolean;
  parentIsLastChild: boolean;
  parentLastChildIndex: Array<number>;
  uniqueKey: string;
}

export interface IStaff {
  roleId: string;
  roleName: string;
  staffId: string;
  staffName: string;
}
export interface IReportees extends IStaff {
  level: number;
  firstChild: boolean;
  lastChild: boolean;
  hasChildren: boolean;
  parentIsLastChild: boolean;
  parentLastChildIndex: Array<number>;
  uniqueKey: string;
  blueDot: number;
  inDirectBlueDot: number;
}

export interface IReporteesObject {
  [id: string]: IReportees[];
}

export interface IAccordionObject {
  [id: string]: boolean;
}

export interface IReporteesKey {
  roleId: string;
  staffId: string;
  level: number;
}

export interface IReporteesPayload {
  staffId: string;
  level: number;
  notify: boolean;
  roleId?: string;
}

export interface IUserNames {
  [userId: string]: string;
}

export type TReportessListType = 'REPOTEES_MYLIST' | 'REPORTEES_FILTERS' | 'REPORTEES_CALENDAR';
export type TScreen = 'REPORTEES' | 'CREATE_FILTER' | 'EDIT_FILTER' | TReportessListType;
export interface IAction {
  timestamp: number;
  screen: TScreen;
  payload?: any;
  previousScreen?: TScreen;
}

export class globalReporteesList {
  public static reporteesList = [];
  public static reporteesBackup = {};
}

export interface ISelectedReportees {
  [levelOneId: string]: string[];
}

export interface ISelectedChecked {
  [uniqueId: string]: TChecked;
}
export type TChecked = 'CHECKED' | 'UNCHECKED' | 'PARTIAL_CHECKED';

export interface ISelectedReporteesObject {
  staffId: string;
  roleId: string;
  reportingRoleId: string;
}

export interface IReporteesTab {
  tabId: string;
  tabName: string;
  criteria: EditDataTypes[];
  sortingOrder: number;
  created_by: string;
  created_on: string;
  selectedReportees: ISelectedReporteesObject[];
  userIds: Array<string>;
}

export interface IReporteesFilterAPIPayload {
  tabName: string;
  sortingOrder: number;
  criteria: EditDataTypes[];
  Action: 'ADD' | 'UPDATE' | 'DELETE';
  tabId: string;
  selectedReportees?: ISelectedReporteesObject[];
}

export type TTabOptionValue = 'MODIFY_FILTER' | 'CREATE_FILTER';
export interface ITabOptionObj {
  value: TTabOptionValue;
  label: string;
}

export interface IReporteesCountDetails {
  blueDot: number;
  clientCount: number;
  inDirectClientCount: number;
  indirectBlueDotCount: number;
  roleId: string;
}
export interface IReporteesResponse extends IReporteesKey {
  countDetails: IReporteesCountDetails[];
  reportees: IReportees[];
}

export interface ICountDetailsObject {
  [roleId: string]: IReporteesCountDetails;
}

export interface IStatusOptions {
  label: string;
  value: string;
}
