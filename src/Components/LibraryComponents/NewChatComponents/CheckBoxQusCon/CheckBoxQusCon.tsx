import React from 'react';
// import { classNames } from "react-select/src/utils";
import Button  from '../../MUIButton/MUIButton';
import CheckBoxGroup  from '../../CheckBoxGroup/CheckBoxGroup';
import ProgressBarNew  from '../../ProgressBarNew/ProgressBarNew';
import { useStyles } from './CheckBoxQusCon.styles';
import { IProps } from './CheckBoxQusCon.types';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { CapsuleIcon, TickIcon } from '../../../SVGs/Common';
export default function EmojisQusCon(props: IProps) {
  const { values, slectedAnswers } = props;
  const { classes } = useStyles();
  const commonClass = useCommonStyles();

  return (
    <div className={classes.mainContainer}>
      <div className={classes.progressbarCon}>
        <ProgressBarNew percent={50} />
      </div>
      <div className={classes.questionContainer}>
        <span className={classes.iconCon}>{<CapsuleIcon />}</span>
        <span className={`${classes.qusTextStyle} ${commonClass.body15Medium}`}>11:00 am - 5 nutrients post meal</span>
      </div>
      <div className={classes.checkboxCon}>
        <CheckBoxGroup values={values} slectedAnswers={slectedAnswers} />
      </div>
      <div className={classes.buttonCon}>
        <Button endIcon={<TickIcon />}>Done</Button>
      </div>
    </div>
  );
}
