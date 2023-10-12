export interface IProps {
  loadProtocols: Function;
  parentProps: {
    patientId?: string;
    startingDate?: string;
    componentState?: any;
    topicSnippetClick: (ev: any) => void;
    selectedClient: any;
    sessions: any;
    registerEvent: Function;
    unRegisterEvent: Function;
    panelWidth: string;
    panel: any;
    topicSnippetForHistory: any;
    injectComponent: any;
    openDiagnosticCondition: any;
  };
  isProtocolsLoaded: boolean;
  setShowLoader: Function;
  setRegion: Function;
  setIsProtocolsLoaded: Function;
  prescriptionKey?: string;
  prescriptionLengthFromProps: string;
  showLoader: boolean;
}

export interface IRegion {
  Id: string;
  ShortName: string;
  LongName: string;
  Description: string;
}
