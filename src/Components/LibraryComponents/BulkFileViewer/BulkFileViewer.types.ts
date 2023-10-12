export interface IProps {
  files: File[];
  handleClose?: () => void;
  handleCrop?: (index: number) => void;
  handleDelete?: (index: number) => void;
  handleDone?: () => void;
  handleSelectMore?: (files: File[]) => void;
  acceptedFileFormats?: string[];
  maximumSize?: number;
  selectedIndex?: number;
  multiple?: boolean;
  dontShowFileName?: boolean;
}

export type IFileDetails = {
  file: File;
  fileName: string;
  url: string;
  fileType: string;
};
