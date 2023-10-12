type status = "ERROR" | "TRY_AGAIN" | "COMPLETED" | "LOADING" | "OK" | "DELETE";
export interface Files {
  file?: any;
  status?: status;
  name?: string;
}

export interface IProps {
  maxFileSizeKb: number;
  files: Array<Files>;
  setFiles: Function;
  fileOptions: Array<"CAMERA" | "PHOTOS" | "AUDIO" | "DOCS" | "VIDEO">;
  multiple?: boolean;
  acceptedFiles: Array<string>;
}

export interface PreviewProps {
  files: Array<Files>;
  setFiles: Function;
  progress?: number;
  status?: status;
}
