import { useStyles } from './TimeScale.styles';
import { IProps } from './TimeScale.types';

const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0];
export default function TimeScale(props: IProps) {
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
      <div className={`${classes.hightlightPosition}`}>
        <div className={classes.highlightTime}></div>
      </div>
    </div>
  );
}
