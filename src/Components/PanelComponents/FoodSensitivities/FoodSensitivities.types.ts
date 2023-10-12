export interface IFoodSensitivities {
  patientId: string;
  Sensitivitys: Array<IFoodSensitivityData>;
}

export interface IFoodSensitivity {
  [key: string]: Array<IFoodSensitivityData>;
}

export interface IFoodSensitivityHistory {
  DescriptionId: string;
  UpdatedOn: string;
  Description: string;
}

export interface IFoodSensitivityState {
  IdentifiedOn: string;
  CompletedOn: string;
  IsActive: any;
  UpdatedOn: string;
}
export interface IFoodSensitivityData {
  SensitivityId: string;
  PatientSensitivityId: string;
  ShortName: string;
  SensitivityName: string;
  SensitivityDescription: string;
  States: Array<IFoodSensitivityState>;
  Descriptions: Array<IFoodSensitivityHistory>;
  CurrentState: IFoodSensitivityState;
}

export interface IAllSensitivities {
  SensitivityId: string;
  ShortName: string;
  LongName: string;
}

export interface IState {
  data: IFoodSensitivities;

  loadingFlag: boolean;
  openAdd: boolean;
}

const emptyFoodSensitivity = (): IFoodSensitivities => ({
  patientId: '',
  Sensitivitys: [],
});
export const EmptyFoodSensitivity = emptyFoodSensitivity();

export interface IProps {
  injectComponent: any;
  patientId: string;
  panel: any;
  registerEvent: any;
  unRegisterEvent: any;
  selectedClient: any;
  sessions: any;
}
