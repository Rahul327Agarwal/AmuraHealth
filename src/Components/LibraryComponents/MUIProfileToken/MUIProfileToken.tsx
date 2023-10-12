import { Avatar, IconButton } from '@mui/material';
import React from 'react';
import { getNameInitials } from '../../../Common/Common.functions';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { CrossIcon } from '../../SVGs/Common';
import { useStyles } from './MUIProfileToken.styles';
import { IProps } from './MUIProfileToken.types';

export default function MUIProfileToken(props: IProps) {
  const { className, userId, userName, subLabel, onDelete } = props;
  const commonClasses = useCommonStyles();
  const { classes } = useStyles(props);

  return (
    <div className={`${classes.profileTokenWrapper} ${className}`}>
      <div className={classes.profileDetails}>
        <Avatar className={classes.profilePic} src={`${import.meta.env.VITE_DP_URL}${userId}/profile-pic.png`}>
          {getNameInitials(userName)}
        </Avatar>
        <div className={classes.participantDetails}>
          <div className={`${commonClasses.caption12Medium} ${classes.primarycolor}`}>{userName}</div>
          <div className={`${commonClasses.sm10Regular} ${classes.gray400}`}>{subLabel || ''}</div>
        </div>
      </div>
      {onDelete ? (
        <IconButton className={classes.crossButton} onClick={onDelete}>
          {<CrossIcon />}
        </IconButton>
      ) : null}
    </div>
  );
}
