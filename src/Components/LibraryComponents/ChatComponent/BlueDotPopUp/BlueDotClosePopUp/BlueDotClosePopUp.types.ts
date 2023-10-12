import { ITab } from '../../../../PanelComponents/MyListPanel/ManageTab/ManageTab.types';

export interface IProps {
  injectComponent: any;
  patientId: string;
  registerEvent: any;
  unRegisterEvent: any;
  selectedClient: any;
  sessions: any;
  parentProps: any;
  onClose: Function;
  reporteesData?: IReportiesData;
  activeTab: ITab;
}

export interface IBluedot {
  original_owner: string;
  current_owner: string;
  description: string;
  createdOn: string;
  createdBy: string;
  tenantId: string;
}

export interface IReportiesData {
  staffName?: string;
  staffId?: string;
  roleId?: string;
  reportingStaffId?: string;
  reportingRoleId?: string;
  handleBackToReportees?: () => void;
}
