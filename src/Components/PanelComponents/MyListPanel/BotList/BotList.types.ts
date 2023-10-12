import { ChildEventTriggerFn } from "../../../../Utilities/WrapperFunctions";
export interface IBotCard {
  patientId?: string;
  selectedClient: any;
  sessions: any;
  registerEvent: any;
  unRegisterEvent: any;
  childEventTrigger: any;
  panel: any;

  AutoSizerHeight?: number;
  handleEventHeight?: Function;
  setScreen?: Function;
  view?: string;
  screen?: Array<any>;
}
