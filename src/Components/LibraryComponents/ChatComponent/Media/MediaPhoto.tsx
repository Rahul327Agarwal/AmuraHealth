import React from 'react';
import { MediaPhotoProps } from './Media.types';
import { useStyles } from './Media.styles';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';

const MediaPhoto = (props: MediaPhotoProps) => {
  const { src, fileName, ...restProps } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();

  return (
    <div className={classes.mediaBox}>
      <img className={classes.photo} src={src} alt="img" />
      {fileName && (
        <div className={classes.fileNameWrapper}>
          <span className={`${commonClasses.body17Regular} ${classes.fileNameColor}`}>{fileName}</span>
        </div>
      )}
    </div>
  );
};

export default MediaPhoto;
