import { Dispatch, SetStateAction } from 'react';

export interface IProps {
  sessions?: any;
  onBack: () => void;
  onPostPreview: (postId: string, postType: string) => void;
  onCollectionPreview: (collectionId: string) => void;
  collectionsList: ICollectionsList[];
  setCollectionsList: Dispatch<SetStateAction<ICollectionsList[]>>;
  postsList: IEsPosts[];
  setPostsList: Dispatch<SetStateAction<IEsPosts[]>>;
  selectedPosts: ISelectedPosts[];
  setSelectedPosts: Dispatch<SetStateAction<ISelectedPosts[]>>;
  selectedCollections: ISelectedCollection[];
  setSelectedCollections: Dispatch<SetStateAction<ISelectedCollection[]>>;
  isLoading: boolean;
  initPosts: IEsPosts[];
  setInitPosts: Dispatch<SetStateAction<IEsPosts[]>>;
  criteriaOpts: IOptions[];
  criteriaBaseOpts: TOptionObj;
}

export interface IFetchHook {
  sessions: any;
  collectionType: string;
  tenantId: string;
  collectionId: string;
}

export type TSelectionType = 'ALL_CHECKED' | 'PARTIAL_CHECKED' | 'UNCHECKED';

export interface IPostList {
  postId: string;
  tenantId: string;
  createdOn: string;
  heading: string;
  description: string;
  hasResponse: boolean;
  postType: string;
}

export interface ICollectionsList {
  tenantId: string;
  collectionId: string;
  collectionType: string;
  subCollections: boolean;
  numberOfPosts: number;
  hasBranching: boolean;
  createdOn: string;
  collectionName: string;
  invisibleKeys?: any[];
}

export type TMasterCriteria = 'conditionsApplicable' | 'gender' | 'sexualMaturity' | 'significance' | 'system' | 'domain';

export interface IOptions {
  label: string;
  value: string;
}

export type TOptionObj = Record<TMasterCriteria, { option: IOptions[]; label?: string }>;

export interface IEsPosts {
  postId: string;
  postType: string;
  author: string;
  topics: {
    heading: { snippet: string };
    tenant: { snippet: string };
    response: { snippet: string[]; type: string };
    description: { snippet: string };
    distributionChannel: { snippet: string[] };
    attachment: {
      snippet: string;
      file: string;
      type: string;
      isAttachment: boolean;
    };
  };
  hasResponse: true;
  tenantId: string;
  userId: string;
  createdOn: string;
  system: string;
  significance: string; // number;
  categorization: string;
  sexualMaturity: string;
  gender: string;
  conditionsApplicable: string[];
  updatedBy: string;
  updatedOn: string;
  invisibleKeys?: any[];
}

export interface ISelectedPosts {
  postId: string;
  invisibleKeys: any[];
  postType: string;
  hasResponse: boolean;
  heading: string;
  elementOrder: number;
  elementToAdd: 'POST';
}
export interface ISelectedCollection {
  subCollectionId: string;
  invisibleKeys: any[];
  posts?: any[];
  subCollections?: any[];
  numberOfPosts: number;
  collectionName: string;
  hasBranching: boolean;
  elementOrder: number;
  elementToAdd: 'SC';
  tenantId?: string;
  collectionType?: string;
}

export type TScreen = 'FILTER' | 'SORT' | 'HOME';
