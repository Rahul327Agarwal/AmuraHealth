import { IOption } from '../Reports/Reports.types';

export interface IProps {
  editData?: IEditReport | null;
  handleBack: () => void;
  selectedClient?: any;
  sessions: any;
  bioIdsOptions: Array<IOption>;
  bioUnitIdOptions: Array<IOption>;
  panel: any;
}

export interface IEditReport extends IReport {
  reportId: string;
  biomarkers: Array<IBiomarker>;
}

export interface IReport {
  reportDate: null | Date;
  sampleDate: null | Date;
  labName: string;
  labId: string;
}

export interface IShowConfirm {
  open: boolean;
  type: 'FILE' | 'BIOMARER' | null;
}

export interface IAddEditBiomarkerProps {
  handleClose: () => void;
  setBiomarkers: Function;
  preBiomarkers: Array<IBiomarker>;
  editData?: IBiomarker | null;
  bioIdsOptions: Array<IOption>;
  bioUnitIdOptions: Array<IOption>;
  onBiomarkerAPICall: (payload: IBiomarker[], newPayload: IBiomarker[]) => void;
}

export interface IReportErrors {
  reportDate: string;
  sampleDate: string;
  labName: string;
  labId: string;
}

export interface IBiomarker {
  biomarkerId: string;
  groupName: string;
  type: string;
  unitId: string;
  value: string;
  action?: 'UPDATE' | 'DELETE' | 'ADD';
  createdOn?: string;
}
export interface IBiomarkerErrors {
  biomarkerId: string;
  unitId: string;
  value: string;
}
