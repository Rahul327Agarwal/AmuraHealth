import { IProduct } from './Medicine/Medicine.types';

export interface IProps {
  injectComponent: any;
  patientId?: string;
  startingDate?: string;
  componentState?: any;
  topicSnippetClick: (ev: any) => void;
  selectedClient: any;
  sessions: any;
  registerEvent: Function;
  unRegisterEvent: Function;
  panelWidth: string;
  prescriptionKey?: string;
  panel: any;
}

export interface MedicineTableProps {
  timeFilter?: {
    M: boolean;
    A: boolean;
    E: boolean;
    N: boolean;
  };
  time?: string;
  products: Array<MedicineRowProps>;
  prescriptionStarted?: boolean;
  today: any;
  prescriptionStartDate?: any;
  nthDay: number;
}
export interface PDFGeneratorProps extends MedicineTableProps {
  prescriptionNumber: string;
  prescriptionStartDate: string;
}

export interface MedicineRowProps extends IProduct {}
