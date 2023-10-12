import React from 'react';
import { IProps } from './ProfileCard.types';
import { useStyles } from './ProfileCard.styles';
// import { RatingStar } from '../SVG/RatingStar';
import Radio  from '../MUIRadio/MUIRadio';
import ProgressBarNew  from '../ProgressBarNew/ProgressBarNew';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { RatingStar } from '../../SVGs/Common';

const Profile = (props: IProps) => {
  const { classes } = useStyles(props);
  const commonClass = useCommonStyles();
  const { userName, ratingValue, progressValue, progreesColor } = props;
  return (
    <div className={classes.profileWrap}>
      {/* <Avatar className={`${classes.profilePic}`}>
            </Avatar> */}
      <figure className={classes.profilePic}>
        <img src={''} />
      </figure>
      <div className={classes.profileContentWrap}>
        <div className={classes.profileContent}>
          <div className={classes.nameWrap}>
            <strong className={`${classes.profileName} ${commonClass.body15Medium}`}>{userName}</strong>
            <span className={`${classes.ratingValue} ${commonClass.body15Regular}`}>
              <i className={classes.ratingIcon}>{<RatingStar />}</i>
              {ratingValue}
            </span>
          </div>
          {/* <ProgressBar
                        progressValue={progressValue}
                        progreesColor={progreesColor}
                    /> */}
          <ProgressBarNew percent={50} />
        </div>
        <div className={classes.radioBtnWrap}>
          <Radio checked={true} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
