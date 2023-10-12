import React, { useEffect, useState } from 'react';
import { ISession } from '../../../Common/Common.types';
import { useDFEvent } from '../../../DisplayFramework/Events/DFEvents';
import { ChildEventTriggerFn } from '../../../Utilities/WrapperFunctions';
import IndeterminateLoader from '../../LibraryComponents/InderminateLoader/InderminateLoader';
import { MyListCardProps } from '../MyListPanel/CardComponent/MyListCard.types';
import {
  getFilteredCalenderEventsbyAFBId,
  getFilteredCalenderEventsbyId,
} from '../MyListPanel/CardComponent/MylistCard.functions';
import { ICard } from '../MyListPanel/MyList/MyList.types';
import { getTimeLineGroupedEvents } from '../SchedulerCalendar/CalendarView/CalenderView.functions';
import { IEventNote, IGroupedEventNoteObject } from '../SchedulerCalendar/Components/EventNote/EventNote.types';
import EventDetails from '../TimeManagement/Components/EventDetails';
import { IEventData } from '../TimeManagement/TimeManagement.types';
import { useStyles } from './EventSummary.styles';
import { IProps } from './EventSummary.types';
import MUISkeleton from '../../LibraryComponents/MUISkeleton/MUISkeleton';

export default function EventSummary(props: IProps) {
  const { sessions, patientId, isAFB, afbData, isReporteeEvent } = props;
  const { classes } = useStyles(props);
  const [eventData, setEventData] = useState({});
  const [AFBeventData, setAFBEventData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const childEventTrigger = useDFEvent();
  const beforeActivityEventId = afbData[0];
  const afterActivityEventId = afbData[1];

  useEffect(() => {
    const abortController = new AbortController();
    if (patientId) {
      if (isAFB) {
        getFilteredCalenderEventsbyAFBId(
          patientId,
          props.sessions,
          beforeActivityEventId,
          afterActivityEventId,
          abortController.signal
        ).then((AFBeventData) => {
          if (AFBeventData) {
            setIsLoading(true);
            let formatData = AFBeventData.map((each: any) => ({ ...each._source }));
            const { eventsObject } = getTimeLineGroupedEvents(formatData);
            let keys: any = Object.keys(eventsObject);
            const eventsArray: any = eventsObject[keys] || [];
            setEventData(eventsArray[0]);
            setIsLoading(false);
          }
        });
      } else {
        setIsLoading(true);
        getFilteredCalenderEventsbyId(patientId, props.sessions, abortController.signal).then((eventData) => {
          if (eventData[0] && eventData[0]._source) {
            let event = eventData[0]._source;
            setEventData(event);
            setIsLoading(false);
          }
        });
      }
    }
    return () => {
      abortController.abort();
    };
  }, [patientId]);
  return (
    <div className={classes.mainContainer}>
      {/* {isLoading && <IndeterminateLoader panelWidth={'100%'} />} */}
      {isLoading && (
        <>
          <MUISkeleton animation="wave" variant="rectangular" height="120px" width="100%" style={{ marginBottom: '8px' }} />
          <MUISkeleton animation="wave" variant="rectangular" height="120px" width="100%" style={{ marginBottom: '8px' }} />
          <MUISkeleton animation="wave" variant="rectangular" height="120px" width="100%" style={{ marginBottom: '8px' }} />
          <MUISkeleton animation="wave" variant="rectangular" height="120px" width="100%" style={{ marginBottom: '8px' }} />
          <MUISkeleton animation="wave" variant="rectangular" height="160px" width="100%" style={{ marginBottom: '8px' }} />
          <MUISkeleton animation="wave" variant="rectangular" height="120px" width="100%" style={{ marginBottom: '8px' }} />
        </>
      )}
      {!isLoading && Object.keys(eventData || {}).length > 0 && (
        <EventDetails
          eventsData={eventData as IEventData}
          handleBack={() => {}}
          sessions={sessions}
          childEventTrigger={childEventTrigger as any}
          viewType={''}
          setEvents={() => {}}
          openInMyWork
          isReporteeEvent={isReporteeEvent}
        />
      )}
    </div>
  );
}
