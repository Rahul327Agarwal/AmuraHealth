import { UniqueCollectionType } from '../DistributionsMgt.types';

interface IProps {
  childEventTrigger: any;
  sessions: any;
  selectedClient: any;
  registerEvent: any;
  unRegisterEvent: any;
}

export interface PreviewProps extends IProps {}

export interface FinalPreviewProps extends IProps {
  setAction: (props: ActionType) => void;
  collectionId: string;
  collectionType: UniqueCollectionType;
}
export interface ActionType {
  screen: Screentype;
  payload?: any;
}

export type Screentype = 'PREVIEW' | 'FINAL_PREVIEW';
