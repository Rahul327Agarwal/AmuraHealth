import { MouseEventHandler } from "react";

export interface IProps {
  // maxFileSizeKb: number;
  // multiple?: boolean;
  // acceptedFiles: Array<string>;
  handleClose: MouseEventHandler;
  customStyle?: string;
  handleSave?: any;
  fileOptions?: Array<fileOptions>;
  headerTitle?: any;
  headerTitleIcon: "thumbnailUplaod" | "attachmentUpload";
  directShowCrop?: boolean;
  viewCross?: boolean;
}

export type fileOptions = "FILES" | "PHOTOS" | "VIDEOS" | "AUDIO";
export interface optionsType {
  id: fileOptions;
  label: string;
  icon: any;
  accept: string;
  multiple: boolean;
}
