import React, { useState } from 'react';
import { Radio as MUIRadioButton, FormControlLabel } from '@mui/material';
import { IProps } from './RadioButtonNew.types';
import { useStyles } from './RadioButtonNew.styles';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
export default function RadioButtonNew(props: IProps) {
  const { value, handleCheck, isChecked, disabled, label } = props;
  //const [checked, setChecked] = useState(value);
  const { classes } = useStyles();
  const globalClass = useCommonStyles();
  return (
    <div>
      <FormControlLabel
        value={value}
        className={isChecked ? classes.formControlActive : classes.formControl}
        control={<MUIRadioButton className={classes.radioStyle} checked={isChecked} />}
        disabled={disabled}
        label={label}
      />
    </div>
  );
}
