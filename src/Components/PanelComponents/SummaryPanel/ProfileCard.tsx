import React, { useEffect, useState } from 'react';
import { getFirstLetters } from '../../../Common/Common.functions';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { useDFGoBack } from '../../../DisplayFramework/Events/DFEvents';
import { CachedAvatar } from '../../LibraryComponents/Avatar/CachedAvatar';
import { LocationIcon } from '../../SVGs/Common';
import { useStyles } from './SummaryPanel.styles';
import { ProfileProps } from './SummaryPanel.types';

const ProfileCard = (props: ProfileProps) => {
  const { userId, data, onProfileHeaderClick } = props;
  const { classes } = useStyles();
  const commonClass = useCommonStyles();
  const { Synopsis } = data;

  const [clientTime, setClientTime] = useState('');
  const getUserTime = (timeZone: string, TimeZoneName: string) => {
    try {
      if (!TimeZoneName) {
        return '';
      }
      let date = new Date().toLocaleString('en-US', { hour12: true, timeZone: timeZone });
      date = date.split(',')[1].trim();
      let time = date.split(' ')[0].split(':').splice(0, 2).join(':') + ' ' + date.split(' ')[1];
      return `(${time})`;
    } catch (e) {
      return '';
    }
  };
  const getLocationInfoWithTime = (synopsis: any) => {
    let time = getUserTime(synopsis?.TimeZone || '', synopsis?.TimeZoneName || '');
    return `${time ? ' ' : ''}${time}`;
  };
  let timer: any;
  useEffect(() => {
    if (timer) {
      clearInterval(timer);
    }
    setClientTime(getLocationInfoWithTime(Synopsis));
    timer = setInterval(() => {
      setClientTime(getLocationInfoWithTime(Synopsis));
    }, 60000);
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [Synopsis]);

  const goBack = useDFGoBack();

  if (data?.Synopsis?.Error) {
    return <></>;
  }
  return (
    <div
      className={classes.profileCardWrap}
      onClick={() => {
        if (onProfileHeaderClick) {
          return onProfileHeaderClick();
        }
        goBack('S');
      }}
      data-cursorpointer={Boolean(onProfileHeaderClick)}
    >
      <CachedAvatar className={`${classes.profilePic}`} src={`${import.meta.env.VITE_DP_URL}${userId}/profile-pic.png`}>
        {getFirstLetters(Synopsis?.Name || Synopsis?.name || '')}
      </CachedAvatar>
      <strong className={`${commonClass.body17Medium} ${classes.profileName}`}>
        {`${Synopsis?.Salutation || Synopsis?.salutation || ''} ${Synopsis?.Name || Synopsis?.name || ''}`}
      </strong>
      {Synopsis?.NickName || Synopsis?.nick_name ? (
        <span className={`${commonClass.body15Regular} ${classes.caption}`}>@{Synopsis?.NickName || Synopsis?.nick_name}</span>
      ) : (
        <></>
      )}
      <span className={`${commonClass.body15Regular} ${classes.caption} ${classes.verticallyCenter}`}>
        <div className={classes.block}>
          <span className={classes.location}>{<LocationIcon />}</span>
          <span>
            {Synopsis?.City}
            {Synopsis?.City && Synopsis?.Country ? ',' : null}{' '}
          </span>{' '}
          <span>{` ${Synopsis?.Country || ''}`}</span>
          <div>{`${clientTime ? ' ' : ''}${clientTime}`} </div>
        </div>
      </span>
    </div>
  );
};

export default ProfileCard;
