export interface IProps {
  tagOptions?: Array<ITag>;
  handleSubmit?: (message: any) => void;
  disableSend?: boolean;
  parentProps?: any;
  placeholder?:any;
  setDescriptionText?:any
}

export interface ITag {
  id: string;
  label: string;
}
