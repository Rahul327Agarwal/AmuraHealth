import { IBiomarker } from '../ReportAddEdit/ReportAddEdit.types';
import { IOption, IReports } from '../Reports/Reports.types';

export interface IReportViewHome extends IReports {
  selectedClient?: any;
  sessions: any;
  childEventTrigger: any;
  panel: any;
  rendarScreen: TScreen;
  biomarkers?: Array<IBiomarker>;
  registerEvent: any;
  unRegisterEvent: any;
  editData: any;
  setSelectedReport?: any;
  bioIdsOptions: IOption[];
  bioUnitIdOptions: IOption[];
  handleBack?: () => void;
}
export interface PDFGeneratorProps {
  labName: any;
  biomarkerData: any;
  reportDate: any;
  sampleDate: any;
  isGrouped: boolean;
}

export type TScreen = 'REPORT_VIEW' | 'REPORT_HISTORY';
