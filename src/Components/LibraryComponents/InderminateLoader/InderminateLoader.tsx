import React from 'react';
import { IProps } from './IndeterminateLoader.types';
import { useStyles } from './IndeterminateLoader.styles';
import { LinearProgress } from '@mui/material';

export default function IndeterminateLoader(props: IProps) {
  const { classes } = useStyles(props);
  return (
    <div className={classes.position}>
      <LinearProgress
        className={classes.progress}
        style={{
          zIndex: props.zIndex,
        }}
        variant="indeterminate"
      />
    </div>
  );
}
