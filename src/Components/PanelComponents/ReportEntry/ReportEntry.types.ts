import { IBiomarker } from './Interface/IBiomarker';
import { IPatientBiomarker } from './Interface/IInvestigationReport';
import { ILab } from './Interface/ILabs';

export interface IProps {
  injectComponent: any;
  patientId: string;
  investigationReportId: string;
  deleteInvestigationReport(): void;
  isNew: boolean;
  registerEvent: any;
  unRegisterEvent: any;
  selectedClient: any;
  sessions: any;
}

export interface IState {
  errorMsg: {};
  reportId?: string;
  biomarkers?: Array<IBiomarker>;
  patientBiomarker?: Array<IPatientBiomarker>;
  validationError: boolean;
  lab?: string;
  mouseAction: string;
  reportDate?: string;
  sampleDate?: string;
  filesList: Array<any>;
  open: boolean;
  files: any;
  editReport: boolean;
}
