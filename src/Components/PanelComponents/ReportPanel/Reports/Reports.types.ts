import { IEditReport } from '../ReportAddEdit/ReportAddEdit.types';

export interface IProps {
  selectedClient?: any;
  sessions: any;
  childEventTrigger: any;
  panel: any;
  registerEvent: any;
  unRegisterEvent: any;
}

export interface IReports {
  reportId: string;
  reportDate: string;
  sampleDate: string;
  labName: string;
  createdBy: string;
  createdOn: string;
  isActive?: boolean;
  reasonForDeactivation?: string;
}

export interface IOption {
  label: string;
  value: string;
}
