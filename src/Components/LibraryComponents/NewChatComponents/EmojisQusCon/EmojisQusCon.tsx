import React from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { QuestionmarkIcon, RedoIcon } from '../../../SVGs/Common';
// import EmojisGroup from "../../EmojisGroup";
import { useStyles } from './EmojisQusCon.styles';
import { IProps } from './EmojisQusCon.types';
export default function EmojisQusCon(props: IProps) {
  const { handleAnswer } = props;
  const { classes } = useStyles();
  const commonClass = useCommonStyles();

  return (
    <div className={classes.mainContainer}>
      <div className={classes.questionContainer}>
        <span className={classes.iconCon}>{<QuestionmarkIcon />}</span>
        <span className={`${classes.qusTextStyle} ${commonClass.body17Medium}`}>How is our Mood right now?</span>
      </div>
      <div className={classes.emojisCon}>{/*TODO: <EmojisGroup handleAnswer={(e) => handleAnswer(e)} /> */}</div>
      <div className={classes.statusCon}>
        <span className={commonClass.caption12Regular}>Done at 09:34 Am</span>
        <span className={classes.reddoIcon}>{<RedoIcon />}</span>
      </div>
    </div>
  );
}
