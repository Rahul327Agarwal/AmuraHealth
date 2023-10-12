import moment from 'moment';
import React from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { getMinutesDiff } from '../../CalendarView/CalenderView.functions';
import { getTimeRangeStringNew1 } from '../../SchedulerCalendar.function';
import SearchEventNote from '../SearchEventNote/SearchEventNote';
import { useStyles } from './SearchNote.styles';
import { IProps } from './SearchNote.types';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../../../DisplayFramework/State/store';

const SearchNote = (props: IProps) => {
  const { setAction, events, eventDate, sessions, isReporteeCalendar, thirdPartyUserId } = props;
  const { classes } = useStyles(props);
  const rolesFromRedux = useSelector((state: IRootState) => state.dashboard.allUserRoles);

  const commanClass = useCommonStyles();
  const userId = isReporteeCalendar ? thirdPartyUserId : sessions?.user?.id;

  const onEventClick = (e: any, event: any) => {
    e.stopPropagation();
    setAction({ screen: 'EVENT_DETAILS', payload: event, previousScreen: 'SEARCH_VIEW' });
  };

  const _eventDate = new Date(eventDate).setHours(0, 0, 0, 0);
  const _todaysDate = new Date().setHours(0, 0, 0, 0);
  const isToday = _eventDate === _todaysDate;

  return (
    <div className={classes.container}>
      <div className={classes.rowWrap}>
        <div className={classes.dayWrapper}>
          <div>
            <span className={`${isToday ? commanClass.body15Medium : commanClass.body15Regular} ${classes.getDate}`}>
              {moment(_eventDate).format('DD ')}
            </span>
            <span className={`${commanClass.body15Regular} ${classes.getYear2}`}>{moment(_eventDate).format('ddd')}</span>
          </div>
          <span className={`${commanClass.caption12Medium} ${classes.getYear2}`}>{moment(_eventDate).format('MMM YYYY')}</span>
        </div>
        <div className={classes.flex}>
          {events.map((event) => {
            const beforeHeight = event?.afbData?.Before?.duration || 0;
            const afterHeight = event?.afbData?.After?.duration || 0;
            const postionFromTime = event?.afbData?.Before?.fromTime || event?.fromTime;
            const postionToTime = event?.afbData?.After?.toTime || event?.toTime;
            const duration = getMinutesDiff(postionFromTime, postionToTime);
            const beforeHeightPercentage = (beforeHeight / duration) * 100;
            const afterHeightPercentage = (afterHeight / duration) * 100;
            const timeString = getTimeRangeStringNew1(event?.fromTime, event?.toTime);
            const timeForAFB = getTimeRangeStringNew1(event?.afbData?.Before?.fromTime, event?.afbData?.After?.toTime);
            const rsvpdata = event?.rsvp && event?.rsvp[userId];
            const visiblilty = rsvpdata ? event?.rsvp[userId].value : '';
            const participants = event?.tenantParticipants?.find((item) => item?.userId == userId) || {};
            const roleId = event?.organizer === userId ? event?.organizerRoleId || '' : participants?.roleId || '';
            const roleName = rolesFromRedux.find((role) => role.roleId === roleId)?.roleName || '';

            return (
              <SearchEventNote
                key={event.eventId}
                time={event?.isAFB ? timeForAFB : timeString}
                title={event?.title}
                onClick={(e) => onEventClick(e, event)}
                beforeHeight={beforeHeightPercentage}
                afterHeight={afterHeightPercentage}
                isRsvpAccept={visiblilty === 'Yes' || event?.organizer === userId}
                isRsvpDecline={visiblilty === 'No'}
                isAFB={Boolean(event?.isAFB || false)}
                roleName={roleName}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchNote;
