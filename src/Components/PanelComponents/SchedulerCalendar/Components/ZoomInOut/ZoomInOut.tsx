import { IconButton } from '@mui/material';
import React from 'react';
import { SquareMinusIcon, SquarePlusIcon } from '../../SchedularCalendar.svg';
import { useStyles } from './ZoomInOut.styles';
import { IMagnifyProps } from './ZoomInOut.types';

export default function ZoomInOut(props: IMagnifyProps) {
  const { value, onChange, elementProps } = props;
  const { classes } = useStyles(props);

  const onPlus = () => {
    if (value < 2) onChange(value + 1);
  };
  const onMinus = () => {
    if (value > 0) onChange(value - 1);
  };

  return (
    <div {...elementProps} className={classes.zoomInOutBox}>
      <IconButton onClick={onPlus} disabled={value === 2} className={classes.buttonStyle}>
        <SquarePlusIcon />
      </IconButton>
      <IconButton onClick={onMinus} disabled={value === 0} className={classes.buttonStyle}>
        <SquareMinusIcon />
      </IconButton>
    </div>
  );
}
