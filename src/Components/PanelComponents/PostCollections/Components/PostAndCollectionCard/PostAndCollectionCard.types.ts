export interface IProps {
  profilePic?: any;
  imageURL?: string;
  name?: string;
  username?: string;
  userId?: string;
  mainDescription?: string;
  setAction?: Function;
  noThreeDot?: boolean;
  postType?: string;
  totalPost?: string;
  cardData?: {
    postId?: string;
    collectionName?: string;
    heading?: string;
    description?: string;
    subCollections?: boolean;
    hasBranching?: string;
    numberOfPosts?: string;
  };
  sessions?: any;
  postpreview1?: any;
  endActionBtn?: React.ReactElement;
}

export interface Icon_attachmentObjType {
  video: React.ReactNode;
  image: React.ReactNode;
  audio: React.ReactNode;
  file: React.ReactNode;
  default: React.ReactNode;
  textField: React.ReactNode;
  select: React.ReactNode;
  multiSelect: React.ReactNode;
}
