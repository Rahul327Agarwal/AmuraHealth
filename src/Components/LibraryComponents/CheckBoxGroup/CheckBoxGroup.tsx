import React, { useState } from 'react';
import CheckBoxHtml from '../CheckBoxHtml/CheckBoxHtml';
import { useStyles } from './CheckBoxGroup.styles';
import { IProps } from './CheckBoxGroup.types';

export default function CheckBoxGroup(props: IProps) {
  const { classes } = useStyles();
  const { values, slectedAnswers } = props;
  const [selectedOpt, setSelectedOpt] = useState([]);

  const handleAnswer = (value: any, answer: any) => {
    if (value) {
      let new123: any = [...selectedOpt, answer];
      slectedAnswers(new123);
      setSelectedOpt(new123);
    } else {
      let temp = selectedOpt.filter((item) => item !== answer);
      setSelectedOpt(temp);
      slectedAnswers(temp);
    }
  };

  return (
    <div className={classes.groupContainer}>
      {values.map((option, index) => {
        return <CheckBoxHtml key={index} label={option.name} sublabel={option.desc} handleAnswer={handleAnswer} />;
      })}
    </div>
  );
}
