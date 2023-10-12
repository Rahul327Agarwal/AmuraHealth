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
  topicSnippetForHistory: any;
  openDiagnosticCondition: any;
  panel: any;
}

export const rampingRequest = {
  IsRampUp: 0,
  IsRampDown: 0,
  RampId: "",
  LengthInDays: "",
  Fraction: "",
  IsDifferentialRamping: false,
};
