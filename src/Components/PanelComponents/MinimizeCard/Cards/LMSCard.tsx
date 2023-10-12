import { IconButton } from '@mui/material';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useStyles } from '../MinimizeCard.styles';
import { DownArrowIcon, UpArrowIcon } from '../../../SVGs/Common';

export default function MinimizedLMSCard() {
  const commonClass = useCommonStyles();
  const { classes } = useStyles();

  return (
    <div className={classes.Eventwrapper}>
      <div className={classes.mainDiv}>
        <div className={classes.spaceBetween}>
          <span className={`${classes.heading} ${commonClass.body17Medium}`}>Name of a pending LMS come here</span>
        </div>
        <span className={`${commonClass.caption12Medium} ${classes.textLight}`}>3 to watch</span>

        <span className={`${classes.subHeading} ${commonClass.body15Regular}`}>
          Some synopsis of the pending lesson shall come i...
        </span>
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
