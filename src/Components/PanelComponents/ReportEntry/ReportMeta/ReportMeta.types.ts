import { ILab } from '../Interface/ILabs';

export interface IProps {
  reportId?: string;
  patientId: string;
  reportDate?: string | Date | null;
  sampleDate?: string | Date | null;
  sidNumber?: string;
  lab?: string;
  vendors: Array<ILab>;
  updateReportId(reportId: string, lab: string, sidNumber: string, reportDate: string, sampleDate: string): void;
  updateReportDate(reportDate: string | undefined): void;
  updateSampleDate(sampleDate: string | undefined): void;
  updateLabName(labName: string | undefined): void;
  updateSid(sidNumber: string | undefined): void;
  enableEdit: boolean;
  isNew: boolean;
  loadingFlag: boolean;
  sessions: any;
  selectedClient: any;
  onNewReportAdd: any;
}
