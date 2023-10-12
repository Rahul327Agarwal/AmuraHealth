import React, { useState } from 'react';
import { Radio as MUIRadioButton, FormControlLabel, RadioGroup } from '@mui/material';
import { IProps } from './RadioButtonGroup.types';
import { useStyles } from './RadioButtonGroup.styles';
import RadioButtonNew  from '../RadioButtonNew/RadioButtonNew';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
export default function RadioButtonGroup(props: IProps) {
  const { options, disabled, handleAnswer, label } = props;
  const [selectedValue, setSelectedValue] = useState('');
  const { classes } = useStyles();
  const globalClass = useCommonStyles();
  return (
    <div>
      <RadioGroup
        style={{ backgroundColor: 'transparent' }}
        value={selectedValue}
        onChange={(e) => {
          setSelectedValue(e.target.value);
          handleAnswer?.(e.target.value);
        }}
      >
        {options.map((option, index) => {
          return (
            <RadioButtonNew key={index} value={option} isChecked={selectedValue === option} disabled={disabled} label={option} />
          );
        })}
      </RadioGroup>
    </div>
  );
}
