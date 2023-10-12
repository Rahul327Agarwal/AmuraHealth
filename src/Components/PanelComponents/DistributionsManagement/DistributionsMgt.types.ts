export interface DistributionsListProps {
  sessions: any;
  childEventTrigger: Function;
  registerEvent: any;
  unRegisterEvent: any;
  selectedTenant: any;
  panel: any;
  injectComponent?: any;
  selectedClient?: any;

  AutoSizerHeight: number;
}

export type UniqueCollectionType = "KBM" | "POLL" | "QMT" | "LMS" | "PCM";
