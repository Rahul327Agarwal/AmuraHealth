import React from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { QuestionmarkIcon } from '../../../SVGs/Common';
import ProgressBarNew  from '../../ProgressBarNew/ProgressBarNew';
import RadioButtonGroup  from '../../RadioButtonGroup/RadioButtonGroup';
import { useStyles } from './RadioButtonQusCon.styles';
import { IProps } from './RadioButtonQusCon.types';
export default function RadioButtonQusCon(props: IProps) {
  const { options, handleAnswer } = props;
  const { classes } = useStyles();
  const commonClass = useCommonStyles();

  return (
    <div className={classes.mainContainer}>
      <div className={classes.progressbarCon}>
        <ProgressBarNew percent={50} />
      </div>
      <div className={classes.questionContainer}>
        <span className={classes.iconCon}>{<QuestionmarkIcon />}</span>
        <span className={`${classes.qusTextStyle} ${commonClass.body15Medium}`}>
          Hello Joseph,Do you have any symptons from below?
        </span>
      </div>
      <div className={classes.checkboxCon}>
        <RadioButtonGroup options={options} handleAnswer={handleAnswer} />
      </div>
    </div>
  );
}
