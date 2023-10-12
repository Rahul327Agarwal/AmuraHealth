import React, { useEffect, useState } from 'react';
import { belowOneDayTimeCheck, getCompletedTimeInPercent } from '../CountDownTime.functions';
import CountDownTime from '../CountDownTime/CountDownTime';
import { useStyles } from './CountDownTimeLine.styles';
import { IProps } from './CountDownTimeLine.types';

export default function CountDownTimeLine(props: IProps) {
  const { endTime } = props;
  const { classes } = useStyles(props);

  const [width, setWidth] = useState<number>(
    (() => {
      if (!endTime) return 0;
      let startTime = new Date(endTime);
      startTime.setTime(startTime.getTime() - 24 * 60 * 60 * 1000);
      const w = getCompletedTimeInPercent(startTime, endTime);

      return w;
    })()
  );

  const [isShow, setIsShow] = useState(belowOneDayTimeCheck(endTime));

  useEffect(() => {
    if (!endTime) return;
    var timerInterval = setInterval(() => {
      let startTime = new Date(endTime);
      startTime.setTime(startTime.getTime() - 24 * 60 * 60 * 1000);
      setIsShow(belowOneDayTimeCheck(endTime));
      setWidth(getCompletedTimeInPercent(startTime, endTime));
    }, 1000);
    // let startTime = new Date(endTime);
    // startTime.setTime(startTime.getTime() - 24 * 60 * 60 * 1000);
    // setIsShow();
    // setWidth(getCompletedTimeInPercent(startTime, endTime));

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  return (
    <>
      {isShow ? (
        <div className={classes.wrapper}>
          <div className={classes.timeAbsoulte} style={{ left: `${width > 95.35 ? 95.35 : width}%` }}>
            <CountDownTime {...props} />
          </div>
          <div className={classes.timeLineGrid}>
            <div
              className={`${classes.timeLine} ${width == 100 ? classes.timeLineDelete : ''}`}
              style={{ width: !props?.showTimer ? `0px` : `${width}%`, height: '2px' }}
            />
            <div className={classes.timeLineBackGround} />
          </div>
        </div>
      ) : null}
    </>
  );
}
