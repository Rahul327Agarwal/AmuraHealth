import { IconButton } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import ReactCropper from 'react-easy-crop';
import { useDispatch } from 'react-redux';
import ErrorToaster from '../../../Common/ErrorToaster';
import { setDisableAttachmentSend } from '../../../DisplayFramework/State/Slices/PostSlice';
import Button from '../MUIButton/MUIButton';
import MUISlider from '../MUISlider/MUISlider';
import { getCroppedImg, updateImageFile } from './Cropper.function';
import { useStyles } from './Cropper.styles';
import { IProps } from './Cropper.types';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';
import { CrossIcon, RotateIcon } from './Cropper.svg';

const minZoom = 0.83;
const maxZoom = 1.3;

export default function Cropper(props: IProps) {
  const { handleClose, viewCross, originalFile, handleCrop } = props;

  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [rotation, setRotation] = useState(0);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cancelView, setCancelView] = useState(true);

  useEffect(() => {
    if (!viewCross) {
      setCancelView(false);
    } else {
      setCancelView(true);
    }
  }, [viewCross]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleRotate = () => {
    setRotation((pre) => {
      if (pre + 90 === 360) return 0;
      return pre + 90;
    });
  };

  const dispatch = useDispatch();
  const handleDialogClose = () => {
    handleClose();
  };

  const handleZoom: any = (event, value: number) => setZoom(value);

  const handleDone = async () => {
    const image = URL?.createObjectURL(originalFile);
    const croppedImageUrl = await getCroppedImg(image, croppedAreaPixels, rotation);
    if (!croppedImageUrl) {
      ErrorToaster('This file is corrupted. Please try with another file.', panelId, 'error');
      return;
    }
    let cropedFile = await updateImageFile(croppedImageUrl, originalFile);

    handleCrop(cropedFile);
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
          <ReactCropper
            image={URL.createObjectURL(originalFile)}
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
        <Button onClick={handleDone}>Done</Button>
      </footer>
    </div>
  );
}
