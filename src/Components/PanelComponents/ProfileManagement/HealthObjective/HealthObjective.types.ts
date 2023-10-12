export interface IProps {
  selectedClient?: any;
  sessions?: any;
  patientId?: any;
  clientId?: any;
  setActionType?: Function;
  childEventTrigger?: Function;

  profileEditable: boolean;
  registerEvent: any;
  unRegisterEvent: any;
}

export interface FoodAndHealthType {
  Objective?: string;
}
export interface HealthObjective extends FoodAndHealthType {}
