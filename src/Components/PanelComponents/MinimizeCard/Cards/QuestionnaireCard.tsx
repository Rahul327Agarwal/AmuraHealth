import { IconButton } from '@mui/material';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useStyles } from '../MinimizeCard.styles';
import { DownArrowIcon, UpArrowIcon } from '../../../SVGs/Common';

export default function MinimizedQuestionnaireCard() {
  const commonClass = useCommonStyles();
  const { classes } = useStyles();

  return (
    <div className={classes.Eventwrapper}>
      <div className={classes.mainDiv}>
        <div className={classes.spaceBetween}>
          <span className={`${classes.heading} ${commonClass.body17Medium}`}>Next 24h</span>
          <span className={`${classes.textLight} ${commonClass.caption12Medium}`}>1/3 Has outsiders</span>
        </div>
        <span className={`${classes.subHeading} ${commonClass.body15Regular}`}>Name of Meeting</span>
        <span className={`${commonClass.caption12Regular} ${classes.textLight}`}>02:30 pm - 03:30 pm</span>
      </div>
      <div className={classes.buttonWrapper}>
        <IconButton className={`${commonClass.sm10Medium} ${classes.scrollButton}`}>
          <UpArrowIcon />
        </IconButton>
        <IconButton className={`${commonClass.sm10Medium} ${classes.scrollButton}`}>
          <DownArrowIcon />
        </IconButton>
      </div>
    </div>
  );
}
