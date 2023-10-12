import { MouseEventHandler } from 'react';

export interface IProps {
  handleClose: MouseEventHandler;
  files: Array<FileObject>;
  mediaType: string;
  fileURL: string;
  setFileURL: Function;
  directShowCrop?: boolean;
  viewCross?: boolean;
  //   mediaType: "PHOTOS" | "VIDEOS" | "AUDIO";
}
interface FileObject {
  rawFile: File;
  fileURL: string;
  type: string;
}
export interface MediaProps {
  mediaType: string;
  src: string;
  fileName: string;
  fileSize?: any;
}
