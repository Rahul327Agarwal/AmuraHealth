import { IconButton } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';
import { useDispatch } from 'react-redux';
import ErrorToaster from '../../../Common/ErrorToaster';
import { setDisableAttachmentSend } from './../../../DisplayFramework/State/Slices/PostSlice';
import MUIButton from '../MUIButton/MUIButton';
import MUISlider from '../MUISlider/MUISlider';
import { getCroppedImg } from './ImageCropper.function';
import { useStyles } from './ImageCropper.styles';
import { IProps } from './ImageCropper.types';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';
import { CrossIcon, RotateIcon } from './ImageCropper.img';

export default function ImageCropper(props: IProps) {
  const { image, setImage, setCroppedImage, handleClose, viewCross } = props;
  const { classes } = useStyles(props);
  const { id: panelId } = useCurrentPanel();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cancelView, setCancelView] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!viewCross) {
      setCancelView(false);
    } else {
      setCancelView(true);
    }
  }, [viewCross]);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleRotate = () => {
    setRotation((pre) => {
      if (pre + 90 === 360) return 0;
      return pre + 90;
    });
  };
  // const dispatch = useDispatch();
  const handleDialogClose = () => {
    handleClose();
  };

  const handleZoom: any = (event: any, value: number) => setZoom(value);

  const handleDone = async () => {
    const croppedImageUrl = await getCroppedImg(image, croppedAreaPixels, rotation);
    if (!croppedImageUrl) {
      ErrorToaster('This file is corrupted. Please try with another file.', panelId, 'error');
      setImage(null);
      return;
    }

    setCroppedImage(croppedImageUrl);
    dispatch(setDisableAttachmentSend(false));
    handleClose();
  };

  useEffect(() => {
    dispatch(setDisableAttachmentSend(true));
  }, []);

  return (
    <div className={classes.rootContainer}>
      {cancelView && (
        <header className={classes.header}>
          <IconButton onClick={handleDialogClose}>{<CrossIcon />}</IconButton>
        </header>
      )}
      <main className={classes.main}>
        <div className={classes.cropperBox}>
          <Cropper
            image={image}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            // aspect={1}
            aspect={3 / 2}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={false}
            // minZoom={minZoom}
            // maxZoom={maxZoom}
            // cropSize={{ width: 270, height: 180 }}
            // objectFit="horizontal-cover"
            restrictPosition={true}
            classes={{
              containerClassName: classes.containerStyle,
              cropAreaClassName: classes.cropAreaStyle,
            }}
          />
        </div>
      </main>
      <div>
        <MUISlider
          className={classes.zoomSilderStyle}
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={handleZoom}
        />
      </div>
      <footer className={classes.footer}>
        <IconButton className={classes.rotateButton} onClick={handleRotate}>
          {<RotateIcon />}
        </IconButton>
        <MUIButton onClick={handleDone}>Done</MUIButton>
      </footer>
    </div>
  );
}
