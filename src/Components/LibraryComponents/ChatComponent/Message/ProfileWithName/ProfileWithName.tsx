import { Avatar } from '@mui/material';
import React from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { ProfileWithNameProps } from '../Message.types';
import { useStyles } from './ProfileWithName.styles';
import { CachedAvatar } from '../../../Avatar/CachedAvatar';

export default function ProfileWithName(props: ProfileWithNameProps) {
  const { customStyle, profileName, profileURL, isSmall, loggenInUserName } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  const getFirstLetters = (name: string) => {
    if (!name) return '';
    if (name.split(' ').length > 1) return (name.split(' ')[0].charAt(0) + name.split(' ')[1].charAt(0)).toUpperCase();
    return name.charAt(0).toUpperCase();
  };
  return (
    <header className={`${customStyle ?? ''} ${classes.partyNameBox}`}>
      <CachedAvatar className={isSmall ? classes.smallAvatar : classes.normalAvatar} src={profileURL}>
        {/* {profileName} */}
        {getFirstLetters(`${profileName}`)}
      </CachedAvatar>

      <span className={`${isSmall ? commonClasses.caption12Medium : commonClasses.body15Medium} ${classes.partyName}`}>
        {loggenInUserName ? loggenInUserName : profileName}
      </span>
    </header>
  );
}
