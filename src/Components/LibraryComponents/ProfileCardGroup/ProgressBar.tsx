import React from 'react';
import { useProgressStyles } from './ProfileCardGroup.styles';
import { ProgressProps } from './ProfileCardGroup.types';

const ProgressBar = (props: ProgressProps) => {
  const { classes } = useProgressStyles(props);
  return (
    <div className={classes.progressWrap}>
      <span className={classes.progressField} />
    </div>
  );
};

export default ProgressBar;
