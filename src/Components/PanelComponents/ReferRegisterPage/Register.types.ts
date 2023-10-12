import { id } from 'date-fns/locale';
export interface IRegisterNewForm {
  FirstName: string;
  LastName: string;
  EmailId: string;
  PhoneNumber: string;
  HealthObjective: string;
  selectedClient: any;
  sessions: any;
  registerEvent: any;
  unRegisterEvent: any;
  childEventTrigger: any;
  injectComponent: any;
  panel: any;
  type: any;
}

export interface IGCData{
  id: string;
  label: string;
}