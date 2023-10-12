export interface IProps {
  injectComponent: any;
  patientId: string;
  topicSnippetClick: (value: string) => void;
  registerEvent: any;
  unRegisterEvent: any;
  selectedClient: any;
  sessions: any;
  type?: string;
  botData?: any;
}
