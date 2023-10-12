export interface IProps {
  title: string;
  subTitle: string;
  advantages: string;
  links: Array<linkObject>;
  patientName: string;
}

export interface linkObject {
  link: string;
  title: string;
  subTitle: string;
  downloadTitle: string;
}

export type MyActions = 'GET_BLOB_URL' | 'DOWLOAD' | 'PREVVIEW_IN_NEW_TAB';
