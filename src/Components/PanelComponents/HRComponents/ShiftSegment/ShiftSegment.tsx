import { useMemo } from 'react';
import { PMS_DATE } from '../../../../Utils';
import { get12HourTime } from '../../Chat/ChatUtils/chatUtils';
import { getWeekDaysString } from '../RoleCard/RoleCard.functions';
import { useStyles } from '../RoleCard/RoleCard.styles';
import TimeScale from '../TimeScale/TimeScale';
import { IProps } from './ShiftSegment.types';

export default function ShiftSegment(props: IProps) {
  const { shift } = props;
  const { classes } = useStyles();

  const sortedDays = useMemo(() => {
    return [...shift.weekDays].sort((a, b) => a - b);
  }, [shift.weekDays]);

  return (
    <div className={classes.shiftSegments}>
      <div className={classes.shiftSegmentHeader}>
        <span className={`${classes.shiftHeaderSpan} ${classes.alignCenter}`}>{shift.segmentName}</span>
      </div>
      <div className={`${classes.shiftTimings} ${classes.marginTop12px}`}>
        <div className={classes.shiftTime}>
          <span className={`${classes.shiftDates} ${classes.alignCenter}`}>{`${PMS_DATE.getFormattedDate(
            shift.startDate.toString()
          )} to ${!shift.neverEnds ? PMS_DATE.getFormattedDate(shift.endDate.toString()) : 'Never ends'}`}</span>
          <span className={`${classes.shiftTiming} ${classes.alignCenter}`}>{`${get12HourTime(
            new Date(shift.startTime).getTime()
          )} : ${get12HourTime(new Date(shift.endTime).getTime())}`}</span>
        </div>
        <div className={`${classes.shiftTime} ${classes.marginTop12px}`}>
          <span className={`${classes.shiftDates} ${classes.alignCenter}`}>Custom days:</span>
          <span className={`${classes.shiftTiming} ${classes.alignCenter}`}>
            {shift.weekDays ? getWeekDaysString(sortedDays) : ''}
          </span>
        </div>
      </div>
      <div>
        <TimeScale startTime={shift.startTime} endTime={shift.endTime} />
      </div>
    </div>
  );
}
