export interface IProps {
  viewCross?: boolean;
  isSlide?: boolean;
  originalFile: File;
  handleCrop: (croppedFile: File) => void;
  handleClose: () => void;
}
