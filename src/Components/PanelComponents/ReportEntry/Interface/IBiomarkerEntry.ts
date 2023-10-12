import { IResult } from './IBiomarker';
import { ILabs } from './ILabs';
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
  data: IResult;
  labs: ILabs;
  filesList: Array<any>;
}

const emptyBiomarker = (): IResult => ({
  Biomarker: {},
  InvestigationReport: {},
});

export const EmptyBiomarker = emptyBiomarker();
