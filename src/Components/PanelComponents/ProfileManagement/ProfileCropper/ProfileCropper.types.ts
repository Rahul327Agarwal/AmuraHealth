export interface IProps {
  isUploadCropOpen: boolean;
  setIsUploadCropOpen: Function;
  title: string;
  setCroppedImage: Function;
}

export interface ProfileImageCropperProps {
  onImageCropped: Function;
  imageBlob: string;
  setImageBlob: Function;
}

export interface ProfileCropperProps {
  onImageCropped: Function;
  open: boolean;
  setOpenProfileCropper:Function;
  onRemoveImg?:Function;
}
