import React, { useState, useEffect } from 'react';
import { IProps } from './TimeScale.types';
import { useStyles } from './TimeScale.styles';
import { checkSplitSegment, differenceFrom12AM, differenceInMilliseconds } from './TimeScalse.functions';

export default function TimeScale(props: IProps) {
  const { startTime, endTime } = props;
  const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0];
  const [twelveAM, setTwelveAM] = useState(new Date());
  const [nextDayTweleve, setNextDayTwelve] = useState(new Date());
  useEffect(() => {
    let AMTime = new Date(startTime);
    AMTime.setHours(0, 0, 0, 0);
    setTwelveAM(new Date(AMTime));
    AMTime.setTime(AMTime.getTime() + 24 * 60 * 60 * 1000);
    setNextDayTwelve(AMTime);
  }, [startTime, endTime]);
  const { classes } = useStyles(props);
  return (
    <div className={classes.body}>
      <div className={classes.flex}>
        {hours.map((hour, index) => (
          <div className={classes.equalSpace}>
            <div className={`${classes.height18px} ${classes.justifyCenter}`}>
              {index % 4 === 0 ? <span className={classes.hour}>{hour}</span> : null}
            </div>
            <div className={classes.justifyCenter}>
              <div className={`${index % 4 === 0 ? classes.hourHeight : classes.normalHourHeight}`}></div>
            </div>
          </div>
        ))}
      </div>
      {checkSplitSegment(new Date(startTime), new Date(endTime)) ? (
        <>
          <div
            style={{
              left: `calc((((100% - (100% / 25)) / (24 * 60 * 60 * 1000)) * ${differenceFrom12AM(
                new Date(startTime)
              )}) + (100% / 50))`,
              width: `calc(((100% - (100% / 25)) / (24 * 60 * 60 * 1000)) * ${differenceInMilliseconds(
                new Date(startTime),
                new Date(nextDayTweleve)
              )} )`,
              bottom: '0px',
              position: 'absolute',
            }}
          >
            <div className={classes.highlightTime}></div>
          </div>
          <div
            style={{
              left: `calc((((100% - (100% / 25)) / (24 * 60 * 60 * 1000)) * ${differenceFrom12AM(
                new Date(nextDayTweleve)
              )}) + (100% / 50))`,
              width: `calc(((100% - (100% / 25)) / (24 * 60 * 60 * 1000)) * ${differenceInMilliseconds(
                new Date(nextDayTweleve),
                new Date(endTime)
              )} )`,
              bottom: '0px',
              position: 'absolute',
            }}
          >
            <div className={classes.highlightTime}></div>
          </div>
        </>
      ) : (
        <div className={`${classes.hightlightPosition}`}>
          <div className={classes.highlightTime}></div>
        </div>
      )}
    </div>
  );
}
