import { memo, useMemo } from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { checkWhetherSameDay } from '../../../TimeManagement/TimeManagement.function';
import { useStyles } from './DaySeparator.styles';
import { IProps } from './DaySeparator.types';

function DaySeparator(props: IProps) {
  const { classes } = useStyles();
  const commanClass = useCommonStyles();
  const { date } = props;

  const formattedDate = (date: string | Date | number) => {
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (checkWhetherSameDay(date, currentDate)) return 'Today';

    let yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);
    if (checkWhetherSameDay(date, yesterday)) return 'Yesterday';

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const msgDate = new Date(date);
    const dd = msgDate.getDate();
    const yyyy = msgDate.getFullYear();
    const day = days[msgDate.getDay()];
    const month = months[msgDate.getMonth()];
    return date && msgDate.toString() !== '' ? `${day} ${dd}, ${month} ${yyyy}` : 'Invalid date';
  };

  const formatedDate = useMemo(() => formattedDate(date), [date]);

  return (
    <div className={classes.dayDiv}>
      <div className={classes.dividerDiv}>{/* <div className={classes.divider}></div> */}</div>
      <span className={`${classes.daySpan} ${commanClass.caption12Medium}`}>{formatedDate}</span>
      <div className={classes.dividerDiv}>{/* <div className={classes.divider}></div> */}</div>
    </div>
  );
}

export default memo(DaySeparator);
