export interface IProps {
  maxFileSizeMb?: number;
  multiple?: boolean;
  acceptedFiles?: Array<string>;
  ParentuploadFiles?: Array<File>;
  onUpload: Function;
  fileLimit?: number;
}
