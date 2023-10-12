import moment from 'moment';
import { ISession } from '../../../../Common/Common.types';
import { IEventNote, IGroupedEventNoteObject, IGroupedEventNoteObjects } from '../Components/EventNote/EventNote.types';
import { getcalendarEventsList } from '../SchedulerCalendar.function';
import { IGroupedEvent } from '../SchedulerCalendar.types';
import { ITooltip } from './CalendarView.types';

export const TIME_OPTIONS: any = [
  { label: '12 AM', value: '12:00 AM' },
  { label: '1 AM', value: '1:00 AM' },
  { label: '2 AM', value: '2:00 AM' },
  { label: '3 AM', value: '3:00 AM' },
  { label: '4 AM', value: '4:00 AM' },
  { label: '5 AM', value: '5:00 AM' },
  { label: '6 AM', value: '6:00 AM' },
  { label: '7 AM', value: '7:00 AM' },
  { label: '8 AM', value: '8:00 AM' },
  { label: '9 AM', value: '9:00 AM' },
  { label: '10 AM', value: '10:00 AM' },
  { label: '11 AM', value: '11:00 AM' },
  { label: '12 PM', value: '12:00 PM' },
  { label: '1 PM', value: '1:00 PM' },
  { label: '2 PM', value: '2:00 PM' },
  { label: '3 PM', value: '3:00 PM' },
  { label: '4 PM', value: '4:00 PM' },
  { label: '5 PM', value: '5:00 PM' },
  { label: '6 PM', value: '6:00 PM' },
  { label: '7 PM', value: '7:00 PM' },
  { label: '8 PM', value: '8:00 PM' },
  { label: '9 PM', value: '9:00 PM' },
  { label: '10 PM', value: '10:00 PM' },
  { label: '11 PM', value: '11:00 PM' },
];

export const timeZoneAbbreviated = () => {
  const { 1: tz }: any = RegExp(/\((.+)\)/).exec(new Date().toString());

  if (tz.includes(' ')) {
    return tz
      .split(' ')
      .map((first: any) => first[0])
      .join('');
  } else {
    return tz;
  }
};

export const getTimeLineGroupedEvents = (events: Array<IEventNote>): IGroupedEventNoteObjects => {
  const eventsObject: any = {};
  const bookablesObject: any = {};

  const onlyEvents: any = [];
  const onlyAFB: any = [];
  const onlyBookables: any = [];

  events.forEach((data) => {
    if (data.isAFB && !data.bookableIds) {
      onlyAFB.push(data);
    } else if (!data.isAFB && data.bookables) {
      onlyBookables.push(data);
    } else {
      onlyEvents.push(data);
    }
  });
  let bookableCounter = 1;
  let bookablePreEventDate: any = null;
  try {
    [...onlyEvents, ...onlyBookables].forEach((edata) => {
      let eventdata = { ...edata };
      let eventFromTime = new Date(eventdata?.fromTimeDuplicate || eventdata.fromTime);

      if (eventdata.isAFB && eventdata.bookableIds) {
        const afbData: any = {};
        eventdata.bookableIds.forEach(({ parentEventId }: any) => {
          const currABF = onlyAFB.find((d: any) => d.parentId === parentEventId);
          if (!currABF) return;
          const afbKey = getAfbTypeKey(currABF.title);
          if (!afbKey) return;
          afbData[afbKey] = {
            fromTime: currABF.fromTime,
            toTime: currABF.toTime,
            duration: getMinutesDiff(currABF.fromTime, currABF.toTime),
          };
        });
        eventFromTime = afbData['Before']?.fromTime
          ? eventdata?.isDuplicate
            ? new Date(eventdata?.fromTimeDuplicate || eventdata?.fromTime)
            : new Date(afbData['Before']?.fromTime)
          : new Date(eventdata?.fromTimeDuplicate || eventdata?.fromTime);
        eventdata.afbData = afbData;
      }

      for (let index = 0; index < TIME_OPTIONS.length; index++) {
        const { currFromTime, currToTime, timeRangeKey } = getEventKeyFromIndex(
          index,
          eventdata?.eventDateDuplicate || eventdata.eventDate
        );

        if (currFromTime.getTime() <= eventFromTime.getTime() && currToTime.getTime() > eventFromTime.getTime()) {
          if (eventdata.bookables) {
            const currEventDate = new Date(eventdata?.eventDateDuplicate || eventdata.eventDate).setHours(0, 0, 0, 0);
            if (bookablePreEventDate !== currEventDate) {
              bookableCounter = 1;
              bookablePreEventDate = currEventDate;
            }
            eventdata.bookableCounter = bookableCounter;
            if (bookablesObject[timeRangeKey]) bookablesObject[timeRangeKey].push(eventdata);
            else bookablesObject[timeRangeKey] = [eventdata];
            bookableCounter++;
            break;
          }
          if (eventsObject[timeRangeKey]) eventsObject[timeRangeKey].push(eventdata);
          else eventsObject[timeRangeKey] = [eventdata];
          break;
        }
      }
    });
  } catch (error) {}

  const eventsObjectOverlayed = setOverlapToEvent(eventsObject);
  return { eventsObject: eventsObjectOverlayed, bookablesObject };
};

export const getFilteredGroupedEvent = (events: Array<IEventNote>): IGroupedEvent => {
  const eventsObject = {};
  const onlyEvents = [];
  const onlyAFB = [];

  events.forEach((data) => {
    if (data.isAFB && !data.bookableIds) {
      onlyAFB.push(data);
    } else if (!data.isAFB && data.bookables) {
      // TODO document why this block is empty
    } else {
      onlyEvents.push(data);
    }
  });
  [...onlyEvents].forEach((edata) => {
    let eventdata = { ...edata };
    const eventDate: any = new Date(new Date(eventdata?.eventDateDuplicate || eventdata.eventDate).setHours(0, 0, 0, 0));

    if (eventdata.isAFB && eventdata.bookableIds) {
      const afbData = {};
      eventdata.bookableIds.forEach(({ parentEventId }) => {
        const currABF = onlyAFB.find((d) => d.parentId === parentEventId);
        if (!currABF) return;
        const afbKey = getAfbTypeKey(currABF.title);
        if (!afbKey) return;
        afbData[afbKey] = {
          fromTime: currABF.fromTime,
          toTime: currABF.toTime,
          duration: getMinutesDiff(currABF.fromTime, currABF.toTime),
        };
      });
      eventdata.afbData = afbData;
    }
    if (eventsObject[eventDate]) eventsObject[eventDate].push(eventdata);
    else eventsObject[eventDate] = [eventdata];
  });
  return eventsObject;
};

export const getEventKeyFromIndex = (index: number, _eventDate: Date | string): any => {
  if (index === undefined) return {};

  const isLastIndex = TIME_OPTIONS.length - 1 === index;

  const eventDate = moment(new Date(_eventDate)).format('YYYY/MM/DD');
  const nextEventDate = isLastIndex
    ? moment(new Date(moment(_eventDate).add(1, 'days').toDate())).format('YYYY/MM/DD')
    : eventDate;

  const currTime = TIME_OPTIONS[index].value;
  const nextTime = TIME_OPTIONS[isLastIndex ? 0 : index + 1].value;
  const currFromTime = new Date(eventDate + ' ' + currTime);
  const currToTime = new Date(nextEventDate + ' ' + nextTime);
  const currTimeKey = moment(new Date(currFromTime)).format('DD/MM/YYYY hh:mm A');
  const nextTimeKey = moment(new Date(currToTime)).format('hh:mm A');
  const timeRangeKey = `${currTimeKey} - ${nextTimeKey}`;
  return { currFromTime, currToTime, timeRangeKey };
};

export const getPositionFromTop = (eventTimeFrom: Date | string, currFromTime: Date | string): number => {
  const _eventTimeFrom = new Date(eventTimeFrom);
  const _currFromTime = new Date(currFromTime);
  const diffInMinutes = Math.floor((_eventTimeFrom.getTime() - _currFromTime.getTime()) / 60000);
  return (diffInMinutes / 60) * 100;
};

export const getAfbTypeKey = (title: string) => {
  if (title.startsWith('Before')) return 'Before';
  if (title.startsWith('After')) return 'After';
};

export const getMinutesDiff = (fromTime: Date | string, toTime: Date | string) => {
  return Math.floor(Math.abs(new Date(fromTime).getTime() - new Date(toTime).getTime()) / 60000);
};

export const getEventStyle = ({ eventHeight, zindex, topPosition, leftPosition }: any): Object => {
  const _BORDER_SIZE = 1;
  const _HEIGHT = eventHeight < 18 ? 18 : eventHeight - _BORDER_SIZE;
  const _LEFT = leftPosition;
  return {
    position: 'absolute',
    top: `${topPosition}%`,
    left: `${_LEFT}%`,
    right: `10%`,
    height: `${_HEIGHT}px`,
    zIndex: zindex,
  };
};

export const getSlotStyle = ({ eventHeight, topPosition, rightPosition }: any): Object => {
  const _BORDER_SIZE = 1;
  const _HEIGHT = eventHeight < 18 ? 18 : eventHeight - _BORDER_SIZE;
  return {
    position: 'absolute',
    top: `${topPosition}%`,
    right: `calc(${rightPosition}% + 5%)`,
    height: `${_HEIGHT}px`,
    zIndex: 500,
    translate: '50%',
  };
};

export const setBookableCounter = (bookableObject: IGroupedEventNoteObject) => {
  let bookableObjectCopy = JSON.parse(JSON.stringify(bookableObject));
  try {
    let bookableCounter = 1;
    for (const key in bookableObjectCopy) {
      if (!Object.hasOwn(bookableObjectCopy, key)) continue;
      const bookable = bookableObjectCopy[key];
      for (const element of bookable) {
        const currbookable = element;
        currbookable.bookableCounter = bookableCounter;
        bookableCounter++;
      }
    }
  } catch (error) {}
  return bookableObjectCopy;
};

export const setOverlapToEvent = (eventsObject: IGroupedEventNoteObject) => {
  try {
    for (const key in eventsObject) {
      if (Object.hasOwn(eventsObject, key)) {
        const events = eventsObject[key];
        let overlapCount = 1;
        for (let i1 = 0; i1 < events.length; i1++) {
          const d1 = events[i1];
          const d1FromTime = new Date(d1.fromTimeDuplicate || d1.fromTime);
          const d1ToTime = new Date(d1.toTimeDuplicate || d1.toTime);
          for (let i2 = i1; i2 < events.length; i2++) {
            const d2 = events[i2];
            const d2FromTime = new Date(d2.fromTimeDuplicate || d2.fromTime);
            if (events[i2].overlapCount) break;
            if (i1 !== i2 && d1FromTime.getTime() <= d2FromTime.getTime() && d1ToTime.getTime() > d2FromTime.getTime()) {
              events[i2].overlapCount = overlapCount;
              overlapCount++;
            }
          }
        }
      }
    }
  } catch (error) {}
  return eventsObject;
};

export const getOpacity = (value: number) => {
  const MIN = 30;
  const MAX = 100;

  const diff = Math.abs(MIN - value);

  const eventOpacity = (MIN + diff) / 100;
  const slotOpacity = (MAX - diff) / 100;
  return { eventOpacity, slotOpacity };
};

export const DEFAULT_TOOLTIP: ITooltip = {
  open: false,
  element: null,
  time: '',
  title: '',
  meetingWith: '',
  dateString: '',
};

export const getAFBEventEsQuery = async (eventIds: Array<string>, session: ISession) => {
  let payload = { index: 'calendar_events', query: { bool: { should: [] } } };

  eventIds.forEach((eventId) => {
    payload.query.bool.should.push({
      match: { _id: `${eventId}` },
    });
  });
  console.log('payload', payload);
  let afbseventData = await getcalendarEventsList(session, payload);
  return afbseventData.map((each) => ({ ...each._source })) || [];
};
