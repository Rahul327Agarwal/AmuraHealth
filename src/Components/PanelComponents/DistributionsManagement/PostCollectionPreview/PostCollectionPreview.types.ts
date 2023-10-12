export interface IPostCollectionPreviewProps {
  topics: any;
  headerKey: string;
  handleInvisibleKey?: Function;
  invisibleKeys?: Object;
  posts?: Array<IPostPreviewProps>;
  subCollections?: Array<IPostCollectionPreviewProps>;
  mediaURLs: Object;
  uniqueId: string;
  level: number;
  showHeaderIocn?: boolean;
  isShowPadding?: boolean;
  sessions?: any;
}

export interface IPostPreviewProps {
  topics: any;
  handleInvisibleKey?: Function;
  invisibleKeys?: Object;
  attachmentURL: string;
  thumbnailURL: string;
  uniqueId: string;
  showHeaderIocn?: boolean;
  count?: number;
}
