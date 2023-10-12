import React from 'react';
import { IProps } from './TextWithAvathar.types';
import { useStyles } from './TextWithAvathar.styles';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { Avatar, Chip } from '@mui/material';
// import { makeStyles } from 'tss-react/mui';

export default function TextWithAvathar(props: IProps) {
  const { id, name, color } = props;
  const { classes } = useStyles(props);
  const commonClass = useCommonStyles();
  return (
    <div className={classes.root}>
      <Chip
        variant="outlined"
        avatar={
          <div className={classes.borderis}>
            <Avatar src={`${import.meta.env.VITE_DP_URL}${id}/profile-pic.png`} className={classes.avatarSize}>
              {name.slice(0, 1).toUpperCase()}
            </Avatar>
          </div>
        }
        label={name}
        //onClick={handleClick}
      />
    </div>
  );
}
{
  /* <Avatar className={classes.avatarSize}>M</Avatar> */
}

{
  /* <Avatar
            src={`${import.meta.env.VITE_DP_URL}${organizerdetails.userId}/profile-pic.png`}
            className={classes.imgWrap}
          >
            {getNameInitials(organizerdetails.userName || "")}
          </Avatar> */
}
