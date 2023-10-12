export interface ISurveyCollectionDataObj {
  closedSurveyCollections: number;
  pendingSurveyCollections: number;
  totalSurveyCollections: number;
}

// export type ChatFilters = 'all' | 'survey';

export enum ChatFilters {
  ALL = 'all',
  SURVEY = 'survey',
}
