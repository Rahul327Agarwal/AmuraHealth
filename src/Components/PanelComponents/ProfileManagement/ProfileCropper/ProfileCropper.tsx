import { IconButton } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { PicturesIcon } from '../ProfileManagement.svg';
import { isValidFilesUploaded } from './../../../../Common/Common.functions';
import ErrorToaster from './../../../../Common/ErrorToaster';
import MUIDrawer from './../../../LibraryComponents/MUIDrawer/MUIDrawer';
import { useStyles } from './ProfileCropper.styles';
import { ProfileCropperProps } from './ProfileCropper.types';
import ProfileImageCropper from './ProfileImageCropper';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

const ProfileCropper = (props: ProfileCropperProps) => {
  const { onImageCropped, open, setOpenProfileCropper, onRemoveImg } = props;
  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const commonClasses = useCommonStyles();
  const inputRef = useRef<any>(null);
  const [imageBlob, setImageBlob] = useState(null);

  const onSelectFile = (event: any) => {
    const myFiles = event.target.files;
    const { errorObject, validFiles } = isValidFilesUploaded(myFiles, 'PHOTOS');

    if (errorObject.length) return ErrorToaster(errorObject[0].message, panelId, 'error');

    if (validFiles && validFiles?.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(validFiles[0]);
      reader.addEventListener('load', () => {
        setImageBlob(reader.result as any);
      });
    }
  };
  const handleUpload = () => inputRef.current.click();
  const handleClose = () => {
    setImageBlob(null);
    setOpenProfileCropper(false);
  };
  return (
    <MUIDrawer open={open} anchor={'bottom'} handleClose={handleClose} headerTitle={'Profile Image'}>
      {!imageBlob && (
        <div className={classes.mainContainer}>
          <div className={classes.buttonContainer}>
            <div className={classes.buttonWrapper} onClick={handleUpload}>
              <IconButton className={classes.iconButton}>{<PicturesIcon />}</IconButton>
              <span className={`${commonClasses.body15Regular} ${classes.iconText}`}>Photo</span>
            </div>
            {/* <div className={classes.buttonWrapper} onClick={handleUpload}>
              <IconButton className={classes.iconButton}>{CameraIcon}</IconButton>
              <span className={`${commonClasses.body15Regular} ${classes.iconText}`}>Camera</span>
            </div> */}
          </div>
          <input ref={inputRef} type="file" style={{ display: 'none' }} onChange={onSelectFile} accept="image/*" />

          <span className={`${commonClasses.body15Medium} ${classes.removeImg}`} onClick={() => onRemoveImg?.()}>
            Remove current photo
          </span>
        </div>
      )}
      {imageBlob && <ProfileImageCropper onImageCropped={onImageCropped} imageBlob={imageBlob} setImageBlob={setImageBlob} />}
    </MUIDrawer>
  );
};

export default ProfileCropper;
