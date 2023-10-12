import React, { useEffect } from 'react';
import { IProps } from './InputSlider.types';
import { Slider as MUIInputSlider } from '@mui/material';
import { useState } from 'react';
import { useStyles } from './InputSlider.styles';

export default function InputSlider(props: IProps) {
  const { classes } = useStyles();
  const { variant, value, min, max, handleChange } = props;
  const [range, setRange] = useState(value);

  useEffect(() => {
    setRange(value);
  }, [value]);

  return (
    <div>
      <MUIInputSlider
        className={classes.rangeSlider}
        value={range}
        min={min}
        max={max}
        onChange={(e, value) => {
          setRange(value);
          handleChange(value);
        }}
      />
    </div>
  );
}
