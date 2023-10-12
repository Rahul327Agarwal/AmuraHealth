import React from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { useStyles } from './MediaPreview.styles';
import { IMediaPreviewBodyProps } from './MediaPreview.types';

const MediaPreviewBody = (props: IMediaPreviewBodyProps) => {
  const { children, title, customStyle } = props;

  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <div className={`${classes.mediaPreviewBox} ${customStyle}`}>
      <div className={`${classes.mediaPreviewTitle} ${commonClasses.body15Medium}`}>{title}</div>
      {children}
    </div>
  );
};

export default MediaPreviewBody;
