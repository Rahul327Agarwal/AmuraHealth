import { Avatar, AvatarGroup } from '@mui/material';
import React from 'react';
import { useStyles } from './ProfilePicGroup.styles';
import { IProps } from './ProfilePicGroup.types';

export default function ProfilePicGroup(props: IProps) {
  const { users } = props;
  const { classes } = useStyles({ isMore: (users?.length ?? 0) > 4 });

  return (
    <AvatarGroup max={4} className={`${classes.root}`}>
      {users?.map((data, i) => (
        <Avatar key={i} alt={data.label} src={data.avatarUrl} className={classes.avatar} />
      ))}
    </AvatarGroup>
  );
}
