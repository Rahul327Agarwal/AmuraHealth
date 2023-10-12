export interface PickerFile {
  fileURL?: string;
  file?: File;
  sourceFile?: File;
  sourceFileURL?: string;
  fileName?: string;
  fileSize?: number;
  fileTypeCategory?: 'audio' | 'video' | 'image' | 'pdf' | 'unknown';
  fileType?: string;
  /** Without (.) */
  fileExtension?: string;
}

export interface IProps {
  files: PickerFile[];
  setFiles: React.Dispatch<React.SetStateAction<PickerFile[]>>;
  handleClose: () => void;
  onViewerStateChange?: (newState: 'viewer' | 'cropper') => void;
  onSelectedIndexChange?: (index: number) => void;
  onDelete?: (index: number) => void;
}
