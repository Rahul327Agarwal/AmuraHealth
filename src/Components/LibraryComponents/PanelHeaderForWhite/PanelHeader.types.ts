export interface IProps {
  title: string;
  iconTray?: React.ReactElement;
  subComponent?: React.ReactElement;
  loadingFlag?: boolean;
  injectComponent?: any;
  showBorder?: boolean;
  showSearch?: boolean;
  searchComponent?: any;
  background?: string;
  besideHeader?: any;
  isSearchIocn?: boolean;
  handleShowSerach?: Function;
  headerSubComponents?: any;
  headerSubComponent2?: React.ReactElement;
  isShadow?: boolean;
  subTitle?: string;
}
