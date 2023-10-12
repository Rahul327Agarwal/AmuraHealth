import { UniqueCollectionType } from '../DistributionsMgt.types';

interface IProps {
  selectedClient: any;
  sessions: any;
  childEventTrigger: any;
}

export interface AddCollectionProps extends IProps {}
export interface PostPreviewProps extends IProps {
  setAction: (props: ActionType) => void;
  postId: string;
  collectionId: string;
  collectionType: UniqueCollectionType;
  setpostsData?: any;
  postsData?: any;
}
export interface CollectionPreviewProps extends IProps {
  setAction: (props: ActionType) => void;
  collectionId: string;
  collectionType: UniqueCollectionType;
  subCollectionId: string;
  setCollectionsData?: any;
  collectionsData?: any;
}

export interface ActionType {
  screen: Screentype;
  payload?: any;
}

export type Screentype = 'ADD_COLLECTION' | 'POST_PREVIEW' | 'COLLECTION_PREVIEW';
