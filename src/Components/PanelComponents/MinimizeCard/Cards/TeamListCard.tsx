import { IconButton } from '@mui/material';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useStyles } from '../MinimizeCard.styles';
import { DownArrowIcon, UpArrowIcon } from '../../../SVGs/Common';

export default function MinimizedTeamListCard() {
  const commonClass = useCommonStyles();
  const { classes } = useStyles();

  return (
    <div className={classes.Eventwrapper}>
      <div className={classes.mainDiv}>
        <div className={classes.spaceBetween}>
          <span className={`${classes.heading} ${commonClass.body17Medium}`}>Team</span>
        </div>
        <div className={classes.nameWrap}>
          <span className={`${classes.name} ${commonClass.body15Regular}`}>
            Dinesh <span className={classes.percent}>90%</span>
          </span>
          <span className={`${classes.name} ${commonClass.body15Regular}`}>
            Joy <span className={classes.percent}>90%</span>
          </span>
          <span className={`${classes.name} ${commonClass.body15Regular}`}>
            Dinesh <span className={classes.percent}>90%</span>
          </span>
        </div>
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
