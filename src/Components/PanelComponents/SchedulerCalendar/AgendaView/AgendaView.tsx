import moment from 'moment';
import { useEffect, useState } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { getFilteredGroupedEvent } from '../CalendarView/CalenderView.functions';
import AgendaEventNote from '../Components/AgendaEventNote/AgendaEventNote';
import { getMappedSortedEvent, getTimeRangeStringNew } from '../SchedulerCalendar.function';
import { IGroupedEventArray } from '../SchedulerCalendar.types';
import { getCalenderEventsFromESFilter } from './AgendaView.function';
import { useStyles } from './AgendaView.styles';
import { IProps } from './AgendaView.types';
import { NoAgendaIcon } from './AgendaView.svg';
import MUIButton from '../../../LibraryComponents/MUIButton/MUIButton';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { useSelector } from 'react-redux';
import { getDateDiffernce } from '../../TimeManagement/TimeManagement.function';

export default function AgendaView(props: IProps) {
  const { date, sessions, setAction, childEventTrigger, isReporteeCalendar, thirdPartyUserId } = props;

  const rolesFromRedux = useSelector((state: IRootState) => state.dashboard.allUserRoles);
  const { classes } = useStyles();
  const commanClass = useCommonStyles();
  const userId = isReporteeCalendar ? thirdPartyUserId : sessions?.user?.id;
  const [finalGroupedEvent, setFinalGroupedEvent] = useState<IGroupedEventArray[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (date) {
      handlesort();
    }
  }, [date]);

  const handlesort = async () => {
    try {
      setIsLoading(true);
      const selectedDate: any = new Date(new Date(date).setHours(0, 0, 0, 0));
      const after30Days: any = new Date(moment(selectedDate).add(30, 'days').toDate());
      const response = await getCalenderEventsFromESFilter(selectedDate, after30Days, sessions, thirdPartyUserId);
      if (!response) return;
      const sortedEvents = getMappedSortedEvent(response);
      let splitedAllEvents = [];
      sortedEvents.forEach((event) => {
        let dateDifferenceEvents = getDateDiffernce(event.fromTime, event.toTime);
        if (dateDifferenceEvents === 1) {
          let formatEvent = {
            ...event,
            fromTimeDuplicate: event.fromTime,
            toTimeDuplicate: event.toTime,
            isDuplicate: false,
            eventDateDuplicate: event.eventDate,
          };
          let createDuplicateEvent = {
            ...event,
            fromTimeDuplicate: new Date(new Date(event.toTime).setHours(0, 0, 0, 0)).toISOString(),
            toTimeDuplicate: event.toTime,
            isDuplicate: true,
            eventDateDuplicate: new Date(new Date(event.toTime).setHours(0, 0, 0, 0)).toISOString(),
          };
          splitedAllEvents.push(formatEvent, createDuplicateEvent);
        } else {
          let formatEvent = {
            ...event,
            fromTimeDuplicate: event.fromTime,
            toTimeDuplicate: event.toTime,
            isDuplicate: false,
            eventDateDuplicate: event.eventDate,
          };
          splitedAllEvents.push(formatEvent);
        }
      });
      const groupedEventObject = getFilteredGroupedEvent(splitedAllEvents);
      let groupedEventArray = [];
      Object.entries(groupedEventObject || {})?.forEach(([eventDate, events]) => {
        if (new Date(eventDate).getTime() >= selectedDate.getTime()) groupedEventArray.push({ eventDate, events });
      });
      setFinalGroupedEvent(groupedEventArray);
    } finally {
      setIsLoading(false);
    }
  };

  const onEventClick = (e, event) => {
    e.stopPropagation();
    setAction({ screen: 'EVENT_DETAILS', payload: event });
  };

  const handleCreate = () => {
    childEventTrigger(null, null, 'onEventCreactionClick', {
      eventsData: null,
    });
  };
  return (
    <div>
      {!isLoading && (
        <div className={classes.mainContainer}>
          {finalGroupedEvent.length > 0 ? (
            finalGroupedEvent?.map((data, index) => (
              <div key={index}>
                <span className={`${commanClass.body20Regular} ${classes.date}`}>
                  {moment(new Date(data?.eventDate)).format('ddd D, MMM YYYY')}
                </span>
                {data?.events?.map((edata) => {
                  const rsvpdata = edata?.rsvp && edata?.rsvp[userId];
                  const visiblilty = rsvpdata ? edata?.rsvp[userId].value : '';
                  const participants = edata?.tenantParticipants?.find((item) => item?.userId == userId) || {};
                  const roleId = edata?.organizer === userId ? edata?.organizerRoleId || '' : participants?.roleId || '';
                  const roleName = rolesFromRedux.find((role) => role.roleId === roleId)?.roleName || '';
                  return (
                    <AgendaEventNote
                      key={edata?.eventId}
                      onClick={(e) => onEventClick(e, edata)}
                      title={edata?.title}
                      time={getTimeRangeStringNew(edata?.fromTime, edata?.toTime)}
                      description={edata?.description}
                      isRsvpAccept={visiblilty === 'Yes' || edata?.organizer === userId}
                      isRsvpDecline={visiblilty === 'No'}
                      isAFB={Boolean(edata?.isAFB || false)}
                      roleName={roleName}
                    />
                  );
                })}
              </div>
            ))
          ) : (
            <div className={classes.wrapper}>
              <NoAgendaIcon />
              <div>
                <span className={`${commanClass.heading3} ${classes.mainHeading}`}>No events planned</span>
                <span className={`${commanClass.body15Regular} ${classes.subHeaderStyle}`}>
                  After events are created, they will appear here.
                </span>
              </div>
              <MUIButton variant="contained" onClick={handleCreate}>
                Create Event
              </MUIButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
