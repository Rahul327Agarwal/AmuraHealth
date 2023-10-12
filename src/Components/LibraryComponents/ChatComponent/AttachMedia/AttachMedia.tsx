import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CropIcon, CrossIcon } from '../../../SVGs/Common';
import ImageCropper from '../../ImageCropper/ImageCropper';
import MediaAudio from '../Media/MediaAudio';
import MediaDoc from '../Media/MediaDoc';
import MediaPhoto from '../Media/MediaPhoto';
import MediaVideo from '../Media/MediaVideo';
import VideoPlayerNewDesign from '../VideoPlayerNewDesign/VideoPlayerNewDesign';
import { useStyles } from './AttachMedia.styles';
import { IProps, MediaProps } from './AttachMedia.types';

export default function AttachMedia(props: IProps) {
  const { files, mediaType, handleClose, directShowCrop, viewCross } = props;
  const { classes } = useStyles();
  const [fileURL, setFileURL] = useState(files[0]?.fileURL);
  const [isCropper, setIsCropper] = useState(false);
  const [cancelView, setCancelView] = useState(true);
  useEffect(() => {
    if (!viewCross) {
      setCancelView(false);
    } else {
      setCancelView(true);
    }
  }, [viewCross]);
  useEffect(() => {
    setFileURL(files[0]?.fileURL);
  }, [files[0]?.fileURL]);

  useEffect(() => {
    if (props.setFileURL) {
      props.setFileURL(fileURL);
    }
  }, [fileURL]);
  useEffect(() => {
    if (directShowCrop && mediaType === 'PHOTOS') {
      setIsCropper(true);
    }
  }, [directShowCrop]);

  const handleDelete = () => {};
  const handleShowCroppper = () => setIsCropper(true);
  const handleCropperClose = () => {
    setIsCropper(false);
  };
  const onCroppedImage = (data: any) => {
    if (data) setFileURL(data);
  };

  return (
    <div className={classes.mediaContainer}>
      {isCropper && (
        <ImageCropper
          setCroppedImage={onCroppedImage}
          image={files[0]?.fileURL}
          setImage={setFileURL}
          handleClose={handleCropperClose}
          viewCross={viewCross}
        />
      )}
      {!isCropper && (
        <>
          <header className={classes.header}>
            {/* <IconButton onClick={handleDelete}>{DeleteIconDark}</IconButton> */}
            {mediaType === 'PHOTOS' && <IconButton onClick={handleShowCroppper}>{<CropIcon />}</IconButton>}
            {cancelView && <IconButton onClick={handleClose}>{<CrossIcon />}</IconButton>}
          </header>
          <div className={classes.mediaWrapper}>
            <MediaRender mediaType={mediaType} src={fileURL} fileName={files[0]?.rawFile?.name} fileSize={files[0]?.rawFile?.size} />
          </div>
        </>
      )}
    </div>
  );
}

const MediaRender = (props: MediaProps) => {
  const { mediaType, src, fileName, fileSize } = props;

  switch (mediaType) {
    case 'PHOTOS':
      return <MediaPhoto src={src} fileName={fileName} />;
    case 'VIDEOS':
      return <VideoPlayerNewDesign EnableClickAwayListener src={src} fileName={fileName} />;
    case 'AUDIO':
      return <MediaAudio EnableClickAwayListener src={src} fileName={fileName} />;
    default:
      return <MediaDoc src={src} fileName={fileName} fileSize={fileSize}/>;
  }
};
