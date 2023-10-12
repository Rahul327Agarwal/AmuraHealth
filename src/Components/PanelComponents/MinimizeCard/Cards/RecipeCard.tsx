import { IconButton } from '@mui/material';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useStyles } from '../MinimizeCard.styles';
import { DownArrowIcon, UpArrowIcon } from '../../../SVGs/Common';

export default function MinimizedRecipeCard() {
  const commonClass = useCommonStyles();
  const { classes } = useStyles();

  return (
    <div className={classes.Eventwrapper}>
      <div className={classes.mainDiv}>
        <div className={classes.spaceBetween}>
          <span className={`${classes.heading} ${commonClass.body17Medium}`}>
            Next meal: 158 kcal
            <span className={classes.timeWrap}>01.00 PM</span>
          </span>
        </div>
        <span className={`${classes.subHeading} ${commonClass.body15Regular}`}>Coconut Rice</span>

        <div>
          <span className={`${classes.name} ${commonClass.caption12Regular}`}>
            Fat <b>20%</b>
          </span>
          <span className={`${classes.name} ${commonClass.caption12Regular}`}>
            Protein <b>10%</b>
          </span>
          <span className={`${classes.name} ${commonClass.caption12Regular}`}>
            Carbs <b>30%</b>
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
