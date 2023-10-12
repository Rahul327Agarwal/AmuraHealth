export interface IProps {
  cardData?: any;
  injectComponent?: any;
  selectedClient?: any;
  sessions?: any;
  childEventTrigger?: Function;
  registerEvent?: any;
  unRegisterEvent?: any;
  panel?: any;
  postId?:String;
  postType?:string;
  removeThisPost?: Function;
  setActionType?: Function;
  collectionId?: string;
  distributionType?:string;
}