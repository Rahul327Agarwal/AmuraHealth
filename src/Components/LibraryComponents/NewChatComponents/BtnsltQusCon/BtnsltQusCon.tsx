import React from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { MealIconLarge, MealIconSmall, TickIcon } from '../../../SVGs/Common';
// import { classNames } from "react-select/src/utils";
import Button  from '../../MUIButton/MUIButton';
import ProgressBarNew  from '../../ProgressBarNew/ProgressBarNew';
import { useStyles } from './BtnsltQusCon.styles';
import { IProps } from './BtnsltQusCon.types';
export default function BtnsltQusCon(props: IProps) {
  const { text, handleAnswer, buttonText } = props;
  const { classes } = useStyles();
  const commonClass = useCommonStyles();

  return (
    <div className={classes.mainContainer}>
      <div className={classes.progressbarCon}>
        <ProgressBarNew percent={50} />
      </div>
      <div className={classes.questionContainer}>
        <span className={classes.iconCon}>{<MealIconLarge />}</span>
        <span className={`${classes.qusTextStyle} ${commonClass.body15Medium}`}>{text}</span>
      </div>
      <div className={classes.checkboxCon}>
        <span className={classes.marginR8}>
          <Button onClick={handleAnswer as any} endIcon={<MealIconSmall />} />
          {buttonText}
        </span>
        <span className={classes.marginR8}>
          <Button onClick={handleAnswer as any} endIcon={<MealIconSmall />} />
          {buttonText}
        </span>
      </div>
      <div className={classes.buttonCon}>
        <Button endIcon={<TickIcon />}>{buttonText}</Button>
      </div>
    </div>
  );
}
