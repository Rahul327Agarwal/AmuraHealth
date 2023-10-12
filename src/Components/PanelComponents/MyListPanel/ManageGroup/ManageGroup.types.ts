import { IProps as MyListProps } from '../MyListHome.types';
export interface GroupPanelProps extends MyListProps {
  handleBack?: any;
  setActiveGroup?: any;
  myGroups: any;
}
export interface IProps {
  action: any;
  setAction: Function;
  groupData: any;
  handleActionTab: Function;
  myListGroups: any;
  handleBack?: any;
  onSetActiveGroup?: any;
  reportessListType: string;
}
export interface AddGroupProps {
  action: any;
  setAction: Function;
  setGroupData: Function;
  groupData: any;
  sessions: any;
  user: any;
  myListGroups?: any;
}
export interface IAction {
  screen: 'TAB_PANEL' | 'ADDGROUP' | 'MANAGE_GROUP' | 'ADD_TAB' | 'EDIT_TAB';
  payload?: any;
  index?: any;
  // previousScreen?:any;
}
export interface groupDataTypes {
  groupName: string;
  groupBy: string;
}
export const DEFAULT_GROUPDATA: groupDataTypes = {
  groupName: '',
  groupBy: '',
};
