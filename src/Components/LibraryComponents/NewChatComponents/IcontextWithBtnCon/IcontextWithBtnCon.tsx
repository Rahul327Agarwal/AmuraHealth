import React from 'react';
import Button  from '../../MUIButton/MUIButton';
import CheckBoxGroup  from '../../CheckBoxGroup/CheckBoxGroup';
import ProgressBarNew  from '../../ProgressBarNew/ProgressBarNew';
import { useStyles } from './IcontextWithBtnCon.styles';
import { IProps } from './IcontextWithBtnCon.types';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { CapsuleIcon } from '../../../SVGs/Common';
export default function IcontextWithBtnCon(props: IProps) {
  const { text, handleAnswer, buttonText } = props;
  const { classes } = useStyles();
  const commonClass = useCommonStyles();

  return (
    <div className={classes.mainContainer}>
      <div className={classes.progressbarCon}>
        <ProgressBarNew percent={50} />
      </div>
      <div className={classes.questionContainer}>
        <span className={classes.iconCon}>{<CapsuleIcon />}</span>
        <span className={`${classes.qusTextStyle} ${commonClass.body15Medium}`}>{text}</span>
      </div>
      <div className={classes.buttonCon}>
        <Button>{buttonText}</Button>
      </div>
    </div>
  );
}
