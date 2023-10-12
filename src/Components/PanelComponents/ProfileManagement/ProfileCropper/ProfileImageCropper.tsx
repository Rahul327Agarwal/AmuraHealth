import { IconButton } from '@mui/material';
import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import ErrorToaster from './../../../../Common/ErrorToaster';
import Button from './../../../LibraryComponents/MUIButton/MUIButton';
import MUISlider from './../../../LibraryComponents/MUISlider/MUISlider';
import getCroppedImg from './ProfileCropper.functions';
import { useStyles } from './ProfileCropper.styles';
import { ProfileImageCropperProps } from './ProfileCropper.types';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { DeleteIconDark, RotateIcon } from '../ProfileManagement.svg';

const minZoom = 0.7;
const maxZoom = 2.7;

export default function ProfileImageCropper(props: ProfileImageCropperProps) {
  const { onImageCropped, imageBlob, setImageBlob } = props;
  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [rotation, setRotation] = useState(0);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    const croppedImageUrl = await getCroppedImg(imageBlob, croppedArea, rotation);
    if (!croppedImageUrl) {
      ErrorToaster('This file is corrupted. Please try with another file.', panelId, 'error');
      setImageBlob(null);
      return;
    }
    onImageCropped(croppedImageUrl);
    setImageBlob(null);
  };

  const handleZoom: any = (event: any, value: number) => setZoom(value);
  const handleRotate = () => setRotation((pre) => (pre === 360 ? 0 : pre + 90));
  const handleDelete = () => setImageBlob(null);

  return (
    <div className={classes.mainCropperContainer}>
      <div className={classes.cropperBox}>
        <Cropper
          image={imageBlob}
          aspect={1}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          cropShape="round"
          minZoom={minZoom}
          maxZoom={maxZoom}
          objectFit={'vertical-cover'}
          cropSize={{ width: 172, height: 172 }}
          showGrid={false}
        />
      </div>
      <MUISlider className={classes.zoomSilderStyle} min={minZoom} max={maxZoom} step={0.1} value={zoom} onChange={handleZoom} />
      <div className={classes.cropperActionButtons}>
        <IconButton onClick={handleRotate}>{<RotateIcon />}</IconButton>
        <Button size="small" onClick={handleCrop}>
          Done
        </Button>
        <IconButton onClick={handleDelete}>{<DeleteIconDark />}</IconButton>
      </div>
    </div>
  );
}
