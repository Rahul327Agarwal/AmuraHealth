import React from 'react';
import { ProfileCardProps } from '../ProfileCardGroup/ProfileCardGroup.types';
import { useStyles } from '../ProfileCardGroup/ProfileCardGroup.styles';
import ProgressBar from './ProgressBar';
import Radio  from '../MUIRadio/MUIRadio';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { Avatar } from '@mui/material';
import { RatingStar } from '../../SVGs/Common';

const ProfileCard = (props: ProfileCardProps) => {
  const { id, handleSelect, profileURL, isSelected, profileName, ratingValue, progressValue, progreesColor } = props;

  const getFirstLetters = (name: string) => {
    if (!name) return '';
    if (name.split(' ').length > 1) return (name.split(' ')[0].charAt(0) + name.split(' ')[1].charAt(0)).toUpperCase();
    return name.charAt(0).toUpperCase();
  };
  const { classes } = useStyles();
  const commonClass = useCommonStyles();

  return (
    <div className={classes.profileWrap} onClick={handleSelect}>
      <Avatar className={`${classes.profilePic}`} src={`${import.meta.env.VITE_DP_URL}${id}/profile-pic.png`}>
        {getFirstLetters(profileName)}
      </Avatar>
      <div className={classes.profileContentWrap}>
        <div className={classes.profileContent}>
          <div className={classes.nameWrap}>
            <strong className={`${classes.profileName} ${commonClass.body15Medium}`}>{profileName}</strong>
            {ratingValue && (
              <span className={`${classes.ratingValue} ${commonClass.body15Regular}`}>
                <i className={classes.ratingIcon}>{<RatingStar />}</i>
                {ratingValue}
              </span>
            )}
          </div>
          <ProgressBar progressValue={Number(progressValue) * 100} progreesColor={progreesColor} />
        </div>
        <Radio checked={isSelected} />
      </div>
    </div>
  );
};

export default ProfileCard;
