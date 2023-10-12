import React, { useEffect, useState } from 'react';
import { notifyEvent } from '../../../../AppSync/AppSync.functions';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { blueRedUnAttendedDot } from '../../../Registration/assets/Svgs';
import { getCounterColor, getRemainingTimeFormat, showFloodBar } from '../CountDownTime.functions';
import { useStyles } from '../CountDownTimeLine/CountDownTimeLine.styles';
import { IProps } from './CountDownTime.types';

export default function CountDownTime(props: IProps) {
  const { endTime, createdTime, setShowLine, calculateTriggerFrom, triggerAfter } = props;
  const commonClasses = useCommonStyles();
  const { classes } = useStyles(props);
  const [timer, setTimer] = useState<string | null>(getRemainingTimeFormat(endTime).timeString);

  useEffect(() => {
    var timerInterval = setInterval(() => {
      const { timeString } = getRemainingTimeFormat(endTime);

      if (props.triggerFunction && calculateTriggerFrom) {
        if (new Date().getTime() - calculateTriggerFrom.getTime() >= triggerAfter) {
          props.triggerFunction();
        }
      }
      setTimer(timeString);
      // startTime.setTime(startTime.getTime() - 24 * 60 * 60 * 1000);
      // setCounterColor(getCounterColor(startTime, endTime));
    }, 1000);
    return () => {
      clearInterval(timerInterval);
    };
  }, []);
  // useEffect(() => {
  //   if (timer) {
  //     setShowLine && setShowLine(true);
  //   }
  // }, [timer]);
  return (
    <span className={`${commonClasses.sm10Medium} ${classes.time}  ${timer == '0s' ? classes.timeDelete : ''}`}>
      {timer ? timer : timer === '' ? null : blueRedUnAttendedDot}
    </span>
  );
}

const useGetTime = (time) => {
  return;
};
