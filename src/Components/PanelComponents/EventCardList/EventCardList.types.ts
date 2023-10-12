// export interface IProps {
//   // date?: Date;
//   sessions: any;
//   childEventTrigger: Function;
//   registerEvent: any;
//   unRegisterEvent: any;
//   selectedTenant: any;
//   panel: any;
//   injectComponent?: any;
//   selectedClient?: any;
//   view?: string;
// }

export interface IProps {
  // date?: Date;
  sessions: any;
  childEventTrigger: Function;
  registerEvent: any;
  unRegisterEvent: any;
  selectedTenant: any;
  panel: any;
  injectComponent?: any;
  selectedClient?: any;
  eventViewHeight?: number;
  handleMyListHeight?: Function;
}

export interface IProps {
  // date?: Date;
  sessions: any;
  childEventTrigger: Function;
  registerEvent: any;
  unRegisterEvent: any;
  selectedTenant: any;
  panel: any;
  injectComponent?: any;
  selectedClient?: any;
  AutoSizerHeight?: number;
}

export class globalEventVariables {
  // public static clientData = [];
  // public static filters: {};
  // public static colorFilter: {};
  // public static currentClientData: any;
  public static searchString = "";
}
