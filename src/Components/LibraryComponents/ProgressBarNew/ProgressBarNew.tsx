import React from 'react';
import { IProps } from './ProgressBarNew.types';
import { useStyles } from './ProgressBarNew.styles';
import { LinearProgress } from '@mui/material';

export default function ProgressBarNew(props: IProps) {
  const { percent } = props;
  const { classes } = useStyles(props);
  return (
    <div className={classes.margin8px}>
      <LinearProgress className={classes.progress} variant="determinate" value={percent} />
    </div>
  );
}
