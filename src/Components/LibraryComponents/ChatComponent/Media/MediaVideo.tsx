import React from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useStyles } from './Media.styles';
import { MediaVideoProps } from './Media.types';

const MediaVideo = (props: MediaVideoProps) => {
  const { src, fileName, ...restProps } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();

  return (
    <div className={classes.mediaBox}>
      <video controls className={classes.videoPlayer}>
        <source src={src} type="video/mp4" />
      </video>
      {fileName && (
        <div className={classes.fileNameWrapper}>
          <span className={`${commonClasses.body17Regular} ${classes.fileNameColor}`}>{fileName}</span>
        </div>
      )}
    </div>
  );
};

export default MediaVideo;
