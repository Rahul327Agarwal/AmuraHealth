import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useStyles } from './NotificationBadge.styles';
import { IProps } from './NotificationBadge.types';

const NotificationBadge = (props: IProps) => {
  const { content } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <div className={classes.mainContainer}>
      {content.map((data) => (
        <div className={classes.circleContainer}>
          <span
            style={{ backgroundColor: data.bgcolor, color: data.textColor }}
            className={`${classes.circle} ${commonClasses.sm8Regular}`}
          >
            {data.text}
          </span>
        </div>
      ))}
    </div>
  );
};
export default NotificationBadge;
