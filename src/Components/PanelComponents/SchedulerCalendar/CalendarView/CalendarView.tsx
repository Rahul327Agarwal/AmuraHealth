import { add, addMinutes, format } from 'date-fns';
import moment from 'moment';
import React, { DragEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { minutesToTimeString } from '../../../../Common/Common.functions';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { TenantIcon, TenantIconV1 } from '../../../SVGs/Common';
import { DEFAULT_RSVP, getDateDiffernce, schedulerUpdateCall } from '../../TimeManagement/TimeManagement.function';
import AvailabilitySlot from '../Components/AvailabilitySlot/AvailabilitySlot';
import EventNote from '../Components/EventNote/EventNote';
import { IEventNote, IGroupedEventNoteObject } from '../Components/EventNote/EventNote.types';
import TimeLine from '../Components/TimeLine/TimeLine';
import TooltipHover from '../Components/TooltipHover/TooltipHover';
import ZoomInOut from '../Components/ZoomInOut/ZoomInOut';
import { MAGNIFY_MAP, VIEW_COUNT_MAP, getSortedEvent, getTimeRangeString } from '../SchedulerCalendar.function';
import { useStyles } from './CalendarView.styles';
import { IProps, ITooltip } from './CalendarView.types';
import {
  DEFAULT_TOOLTIP,
  TIME_OPTIONS,
  getAFBEventEsQuery,
  getAfbTypeKey,
  getEventKeyFromIndex,
  getEventStyle,
  getMinutesDiff,
  getPositionFromTop,
  getSlotStyle,
  getTimeLineGroupedEvents,
  setBookableCounter,
  setOverlapToEvent,
  timeZoneAbbreviated,
} from './CalenderView.functions';

export default function CalendarView(props: IProps) {
  const {
    eventOpacity,
    viewType,
    magnifyCounter,
    setMagnifyCounter,
    date,
    events,
    childEventTrigger,
    setAction,
    sessions,
    isReporteeCalendar,
    thirdPartyUserId,
  } = props;
  const { id: panelId } = useCurrentPanel();

  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  // const userId = sessions?.user?.id;
  const userId = isReporteeCalendar ? thirdPartyUserId : sessions?.user?.id;
  let sourcePanel = useSelector((state: IRootState) => {
    return state.dashboard.sourcePanel;
  });
  const [groupedEvent, setGroupedEvent] = useState<IGroupedEventNoteObject>({});
  const [groupedBookable, setGroupedBookable] = useState<IGroupedEventNoteObject>({});
  const currentViewingDate = useSelector((state: IRootState) => state.dashboard.currentViewingDate);

  const [dragEventStart, setDragEventStart] = useState(false);

  const initPointerCorr = useRef(null);
  const scrollEle = useRef(null);
  const dragEventEl = useRef(null);

  const [tooltip, setTooltip] = useState<ITooltip>(DEFAULT_TOOLTIP);
  const [dragstatus, setDragstatus] = useState(null);
  const timeGridHeight = parseInt(MAGNIFY_MAP[magnifyCounter]);

  useEffect(() => {
    if (date && events) {
      let splitedAllEvents = [];
      events.forEach((event) => {
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
      const { eventsObject, bookablesObject } = getTimeLineGroupedEvents(splitedAllEvents); //events
      setGroupedEvent(eventsObject);
      setGroupedBookable(bookablesObject);
    }
  }, [events]);

  useEffect(() => {
    let intervalId;
    if (dragstatus) {
      const maxBottomScroll = scrollEle.current.scrollHeight - scrollEle.current.offsetHeight;
      const PIXEL = 10;
      intervalId = setInterval(() => {
        if (dragstatus === 'TOP') {
          if (scrollEle.current.scrollTop <= 0) {
            return clearInterval(intervalId);
          }
          const top = parseFloat(dragEventEl.current.style.top) - PIXEL;
          scrollEle.current.scrollTop -= PIXEL;
          dragEventEl.current.style.top = `${top <= 50 ? 51 : top}px`;
          dragEventEl.current.style.height = `${parseFloat(dragEventEl.current.style.height) + PIXEL}px`;
        } else if (dragstatus === 'BOTTOM') {
          if (scrollEle.current.scrollTop >= maxBottomScroll) {
            return clearInterval(intervalId);
          }
          scrollEle.current.scrollTop += PIXEL;
          dragEventEl.current.style.height = `${parseFloat(dragEventEl.current.style.height) + PIXEL}px`;
        } else {
          return clearInterval(intervalId);
        }
        // console.log('!!dragstatus', { dragstatus, scrollTop: scrollEle.current.scrollTop });
      }, 100);
    } else {
      clearInterval(intervalId);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [dragstatus]);

  const handleCalenderClick = (event, currentTime, dateIndex) => {
    if (props.isReporteeCalendar) return;
    const { clientY, target } = event;
    const { top, height } = target.getBoundingClientRect();
    const positionY = clientY - top;
    const { date, timeIndex } = currentTime;
    const time = TIME_OPTIONS[timeIndex].label.split(' ');
    const timeString = positionY > height / 2 ? `${time[0]}:30 ${time[1]}` : `${time[0]}:00 ${time[1]}`;
    const selectedDate = add(new Date(date), { days: dateIndex });
    const selectedDateTime = new Date(moment(selectedDate).format('YYYY/MM/DD') + ' ' + timeString);

    if (panelId === 'R') {
      childEventTrigger(null, null, 'onEventEditinResourceClick', {
        selectedDateTime,
        viewType,
        isEditEvent: false,
        eventsData: null,
        openInResource: true,
      });
    } else {
      childEventTrigger(null, null, 'onEventCreactionClick', {
        selectedDateTime,
        viewType,
        isEditEvent: false,
        eventsData: null,
      });
    }
  };

  const onDragStart = (e: DragEvent<HTMLElement>, eventId: string, timeRangeKey: string, bookable?: boolean) => {
    const { offsetX, offsetY } = e.nativeEvent;
    initPointerCorr.current = { eventId: eventId, offsetX, offsetY };
    e.dataTransfer.setData('eventId', eventId);
    e.dataTransfer.setData('timeRangeKey', timeRangeKey);
    e.dataTransfer.setData('bookable', `${Boolean(bookable)}`);
    setTooltip((pre) => ({ ...pre, open: false }));
  };

  const onDrop = async (e: DragEvent<HTMLElement>, viewIndex: number) => {
    e.preventDefault();
    const { clientY } = e;

    const eventId = e.dataTransfer.getData('eventId');
    const dragEventKey = e.dataTransfer.getData('timeRangeKey');
    const isbookable = e.dataTransfer.getData('bookable') === 'true';
    const eventIdKey = isbookable ? 'slotId' : 'eventId';

    const scrollTop = scrollEle?.current?.scrollTop || 0;
    const { top = 0 } = scrollEle?.current?.getBoundingClientRect();

    const borderSize = 1;
    const screenTopOffset = top + borderSize + timeGridHeight;

    let positionTop = clientY + scrollTop - screenTopOffset - initPointerCorr.current?.offsetY;
    let timeIndex = 0;
    let timeMinutes = 0;

    if (positionTop > 0) {
      const divValue = positionTop / timeGridHeight;
      timeIndex = Math.floor(divValue);
      timeMinutes = Math.floor((divValue - timeIndex) * 60);
    }

    const eventDate = new Date(moment(date).add(viewIndex, 'days').toDate());
    const { currFromTime, timeRangeKey: dropEventKey } = getEventKeyFromIndex(timeIndex, eventDate);

    if (!eventId || !dragEventKey) return;

    let dragEventGroup: Array<IEventNote> = (isbookable ? groupedBookable[dragEventKey] : groupedEvent[dragEventKey]) || [];
    let dropEventGroup: Array<IEventNote> = (isbookable ? groupedBookable[dropEventKey] : groupedEvent[dropEventKey]) || [];
    let modifiedEventGroup: IGroupedEventNoteObject = {};
    let updateEvent;

    dragEventGroup = dragEventGroup.reduce((preevent, currevent1) => {
      let currevent: IEventNote = JSON.parse(JSON.stringify(currevent1));
      delete currevent?.overlapCount;
      if (currevent[eventIdKey] !== eventId) return [...preevent, currevent];
      const newFromTime = addMinutes(currFromTime, timeMinutes);
      const newToTime = addMinutes(newFromTime, currevent?.duration);

      updateEvent = JSON.parse(JSON.stringify(currevent));
      updateEvent.eventDate = newFromTime.toISOString();
      updateEvent.fromTime = newFromTime.toISOString();
      updateEvent.toDate = newToTime.toISOString();
      updateEvent.toTime = newToTime.toISOString();
      if (dragEventKey === dropEventKey) return [...preevent, updateEvent];
      dropEventGroup.push(updateEvent);
      return preevent;
    }, []);

    modifiedEventGroup[dragEventKey] = getSortedEvent(dragEventGroup);
    if (dragEventKey !== dropEventKey) {
      let modifyDropEventGroup = dropEventGroup;
      if (!isbookable) {
        modifyDropEventGroup = dropEventGroup.map((event) => {
          let currevent: IEventNote = JSON.parse(JSON.stringify(event));
          delete currevent?.overlapCount;
          return currevent;
        });
      }
      modifiedEventGroup[dropEventKey] = getSortedEvent(modifyDropEventGroup);
    }
    if (isbookable) {
      const finalBookableGroup = setBookableCounter({
        ...groupedBookable,
        ...modifiedEventGroup,
      });
      setGroupedBookable(finalBookableGroup);
      const response = await onDropUpdateBoolable(updateEvent);
    } else {
      const finalEventGroup = setOverlapToEvent(modifiedEventGroup);
      setGroupedEvent((pre) => ({ ...pre, ...finalEventGroup }));
      const response = await onDropUpdateEvent(updateEvent);
    }
    initPointerCorr.current = null;
  };

  const onDropUpdateEvent = async (payload) => {
    const { selected, ...restRsvp } = DEFAULT_RSVP;
    const params = { ...payload, action: restRsvp };
    return await schedulerUpdateCall(sessions, params, panelId);
  };

  const onDropUpdateBoolable = async (payload) => {
    const { selected, ...restRsvp } = DEFAULT_RSVP;
    const params = { ...payload, updateObject: restRsvp };
    return await schedulerUpdateCall(sessions, params, panelId);
  };

  const getDays = (data) => {
    const { isFinalIndex, date, timeIndex, isFirstIndex } = data;
    const currData = { date, timeIndex };
    const daysItems = [];
    for (let viewIndex = 0; viewIndex < VIEW_COUNT_MAP[viewType]; viewIndex++) {
      const eventDate = new Date(moment(date).add(viewIndex, 'days').toDate());
      const { currFromTime, timeRangeKey } = getEventKeyFromIndex(timeIndex, eventDate);
      const eventsArray: IEventNote[] = groupedEvent[timeRangeKey] || [];
      const bookablesArray: IEventNote[] = groupedBookable[timeRangeKey] || [];
      const EVENT_X_SPACE = 90 / eventsArray.length;
      const SLOTS_X_SPACE = 15;

      daysItems.push(
        <section
          data-y-first={isFirstIndex}
          data-y-final={isFinalIndex}
          data-x-final={viewIndex === VIEW_COUNT_MAP[viewType] - 1}
          className={classes.timeDayBox}
          {...(!isFirstIndex && {
            onClick: (e) => handleCalenderClick(e, currData, viewIndex),
          })}
          {...(!isFirstIndex && {
            onPointerDown: (e) => handlePointerDown(e, currData, viewIndex),
          })}
          {...(!isFirstIndex && {
            onPointerUp: (e) => handlePointerUp(e, currData, viewIndex),
          })}
          {...(!isFirstIndex && {
            onPointerMove: (e) => handlePointerMove(e, currData, viewIndex),
          })}
          {...(!isFirstIndex && { onDragOver: (e) => e.preventDefault() })}
          {...(!isFirstIndex && { onDrop: (e) => onDrop(e, viewIndex) })}
        >
          <div className={classes.eventsWrapper}>
            {eventsArray.map((event) => {
              const rsvpdata = event?.rsvp && event?.rsvp[userId];
              const visiblilty = rsvpdata ? event?.rsvp[userId].value : '';

              const beforeHeight = event?.isDuplicate ? 0 : event?.afbData?.Before?.duration || 0;
              const afterHeight = event?.afbData?.After?.duration || 0;
              const postionFromTime = event?.isDuplicate
                ? event?.fromTimeDuplicate
                : event?.afbData?.Before?.fromTime || event?.fromTimeDuplicate;
              const postionToTime = event?.afbData?.After?.toTime || event?.toTimeDuplicate;
              const duration = getMinutesDiff(postionFromTime, postionToTime);
              const eventHeight = (Number(MAGNIFY_MAP[magnifyCounter]) / 60) * duration;
              const timeString = getTimeRangeString(event?.fromTime, event?.toTime);
              const topPosition = getPositionFromTop(postionFromTime, currFromTime);
              const overlapCount = event.overlapCount || 0;
              const leftPosition = EVENT_X_SPACE * overlapCount;
              const zindex = timeIndex * 10 + overlapCount || 1;

              return (
                <EventNote
                  key={event?.eventId}
                  title={event?.title}
                  time={timeString}
                  isRsvpAccept={
                    visiblilty === 'Yes' ||
                    (!props.isReporteeCalendar && userId === event?.organizer) ||
                    props.thirdPartyUserId === event?.organizer
                  }
                  isRsvpDecline={visiblilty === 'No'}
                  opacity={1.3 - eventOpacity}
                  isAFB={Boolean(event?.bookableIds)}
                  beforeHeight={beforeHeight}
                  afterHeight={afterHeight}
                  eventHeight={eventHeight}
                  disabled={dragEventStart}
                  // invisible={event?.eventId && initPointerCorr.current?.eventId === event?.eventId}
                  elementProps={{
                    // draggable: !Boolean(event?.bookableIds),
                    style: getEventStyle({
                      eventHeight,
                      zindex,
                      topPosition,
                      leftPosition,
                    }),
                    onClick: (e) => onEventClick(e, event),
                    onPointerDown: (e) => e.stopPropagation(),
                    onPointerUp: (e) => e.stopPropagation(),
                    // onDragStart: (e) => onDragStart(e, event?.eventId, timeRangeKey),
                    // onDragEnd: (e) => {
                    //   e.preventDefault;
                    //   initPointerCorr.current = null;
                    // },
                    onMouseEnter: (e: MouseEvent<HTMLElement>) => {
                      if (initPointerCorr.current) return;
                      setTooltip({
                        element: e.currentTarget,
                        open: true,
                        time: timeString,
                        title: event?.title,
                        dateString: event?.fromTime,
                      });
                    },
                    onMouseLeave: () => setTooltip((pre) => ({ ...pre, open: false })),
                  }}
                />
              );
            })}
            {bookablesArray.map((event) => {
              const overlapCount = event.bookableCounter || 0;

              const rightPosition = SLOTS_X_SPACE * overlapCount;

              if (rightPosition > 90) return null;

              const rsvpdata = event?.rsvp && event?.rsvp[userId];
              const visiblilty = rsvpdata ? event?.rsvp[userId].value : '';

              const duration = getMinutesDiff(event?.fromTimeDuplicate, event?.toTimeDuplicate);
              const eventHeight = (Number(MAGNIFY_MAP[magnifyCounter]) / 60) * duration;
              const timeString = getTimeRangeString(event?.fromTime, event?.toTime);
              const topPosition = getPositionFromTop(event?.fromTimeDuplicate, currFromTime);

              return (
                <AvailabilitySlot
                  key={event?.slotId}
                  title={event?.title}
                  time={timeString}
                  isRsvpAccept={visiblilty === 'Yes' || userId === event?.organizer}
                  isRsvpDecline={visiblilty === 'No'}
                  opacity={eventOpacity}
                  viewType={viewType}
                  tenantIcon={<TenantIcon />}
                  disabled={dragEventStart}
                  elementProps={{
                    // draggable: true,
                    style: getSlotStyle({
                      eventHeight,
                      topPosition,
                      rightPosition,
                    }),
                    onClick: (e) => onEventClick(e, event),
                    // onPointerDown: (e) => e.stopPropagation(),
                    // onPointerUp: (e) => e.stopPropagation(),
                    // onDragStart: (e) => onDragStart(e, event?.slotId, timeRangeKey, true),
                    onMouseEnter: (e: MouseEvent<HTMLElement>) => {
                      if (initPointerCorr.current) return;
                      setTooltip({
                        element: e.currentTarget,
                        open: true,
                        time: timeString,
                        title: event?.title,
                        dateString: event?.fromTime,
                      });
                    },
                    onMouseLeave: () => setTooltip((pre) => ({ ...pre, open: false })),
                  }}
                />
              );
            })}
          </div>
        </section>
      );
    }
    return daysItems;
  };

  const getDates = () => {
    let items = [];
    for (let i = 0; i < VIEW_COUNT_MAP[viewType]; i++) {
      const newDate = new Date(moment(date).add(i, 'days').toDate());
      const todaysDate = new Date(moment().toDate());

      const isCurrDate = new Date(date).setHours(0, 0, 0, 0) === new Date(todaysDate).setHours(0, 0, 0, 0);
      const isTodaysDate = new Date(todaysDate).setHours(0, 0, 0, 0) === new Date(newDate).setHours(0, 0, 0, 0);
      items.push(
        <div className={classes.dateBox}>
          <span
            className={`${isCurrDate && isTodaysDate ? commonClasses.body17Medium : commonClasses.body17Regular} ${
              classes.dateText
            }`}
          >
            {moment(newDate).format(viewType === 'OneDay' ? 'dddd' : 'ddd')}
          </span>
          <span className={`${commonClasses.body17Medium} ${classes.dateText}`}>{moment(newDate).format('D')}</span>
        </div>
      );
    }
    return items;
  };

  const onEventClick = async (e, event) => {
    e.stopPropagation();

    if (event?.bookableIds && event?.isAFB && Object.keys(event.afbData).length < 2) {
      let eventIDs = event?.bookableIds?.map((id) => id?.eventId);
      let afbsEventData = await getAFBEventEsQuery(eventIDs, sessions);
      let newAFBData = {};
      if (afbsEventData?.length > 0) {
        afbsEventData?.map((item) => {
          const afbKey = getAfbTypeKey(item.title);
          if (!afbKey) return;
          newAFBData[afbKey] = {
            fromTime: item.fromTime,
            toTime: item.toTime,
            duration: getMinutesDiff(item.fromTime, item.toTime),
          };
        });
        let modifiedAFBEvent = { ...event, afbData: { ...event?.afbData, ...newAFBData } };
        setAction({ screen: 'EVENT_DETAILS', payload: modifiedAFBEvent });
      }
    } else {
      setAction({ screen: 'EVENT_DETAILS', payload: event });
    }
  };

  const handlePointerDown = (e: any, currData, viewIndex) => {
    const { clientY, target } = e;
    const { top, height } = target.getBoundingClientRect();
    const positionY = clientY - top;
    const { date, timeIndex } = currData;
    const [time, ampm] = TIME_OPTIONS[timeIndex].label.split(' ');
    const timeMinutes = Math.floor((positionY / height) * 4) * 15;
    const startTimeString = `${time}:${timeMinutes < 0 ? 0 : timeMinutes} ${ampm}`;
    const currDate = add(new Date(date), { days: viewIndex });
    const startDateTime = format(currDate, 'yyyy/MM/dd') + ' ' + startTimeString;
    const startTime = format(new Date(startDateTime), 'hh:mm aaa');
    dragEventEl.current.setAttribute('data-startTime', startTime);
    dragEventEl.current.setAttribute('data-startDateTime', startDateTime);
    // console.log('!!down', { startDateTime, startTime, timeMinutes, positionY, height });
  };

  const handlePointerMove = (e: any, currData, viewIndex) => {
    if (!dragEventStart) return;
    e.persist();
    const { clientY, target } = e;
    const { timeIndex } = currData;
    const { top, height } = target.getBoundingClientRect();
    const positionY = clientY - top;

    const startTime = dragEventEl.current.getAttribute('data-startTime');
    const startDateTime = new Date(dragEventEl.current.getAttribute('data-startDateTime'));

    const [time, ampm] = TIME_OPTIONS[timeIndex].label.split(' ');
    const timeMinutes = Math.floor((positionY / height) * 4) * 15;
    const currTimeString = `${time}:${timeMinutes < 0 ? 0 : timeMinutes} ${ampm}`;
    const currDateTime = new Date(format(startDateTime, 'yyyy/MM/dd') + ' ' + currTimeString);
    const currStartTime = format(currDateTime, 'hh:mm aaa');

    const label =
      currDateTime?.getTime() > startDateTime?.getTime() ? startTime + ' - ' + currStartTime : currStartTime + ' - ' + startTime;

    const duration = minutesToTimeString(Math.abs(currDateTime?.getTime() - startDateTime?.getTime()) / (1000 * 60));
    const curLabel =
      currDateTime?.getTime() - startDateTime?.getTime() === 0 ? '' : 'Add event: ' + (label + ' , ' + duration).toLowerCase();

    dragEventEl.current.children[0].innerText = curLabel;

    // console.log('!!down', { currDateTime, currStartTime, height, timeMinutes, positionY });
  };

  const handlePointerUp = (e: any, currData, viewIndex) => {
    if (!dragEventStart) return;
    e.persist();
    const { clientY, target } = e;
    const { top, height } = target.getBoundingClientRect();
    const positionY = clientY - top;
    const { timeIndex } = currData;

    const startDateTime = new Date(dragEventEl.current.getAttribute('data-startDateTime'));
    const time = TIME_OPTIONS[timeIndex].label.split(' ');
    const timeMinutes = Math.floor((positionY / height) * 4) * 15;
    const timeString = `${time[0]}:${timeMinutes} ${time[1]}`;
    const endTime = new Date(moment(startDateTime).format('YYYY/MM/DD') + ' ' + timeString);
    const selectedDateTime = endTime?.getTime() - startDateTime?.getTime() > 0 ? startDateTime : endTime;
    const draggedDuration = Math.abs(endTime?.getTime() - startDateTime?.getTime()) / (1000 * 60);
    // console.log('!!draggedDuration', { selectedDateTime, draggedDuration });

    if (sourcePanel === 'Resourse') {
      childEventTrigger(null, null, 'onEventEditinResourceClick', {
        selectedDateTime,
        viewType,
        isEditEvent: false,
        eventsData: null,
        openInResource: true,
      });
    } else {
      childEventTrigger(null, null, 'onEventCreactionClick', {
        selectedDateTime,
        viewType,
        isEditEvent: false,
        eventsData: null,
      });
    }
  };

  const onCancelAddEventDrag = (e: any) => {
    if (dragEventStart) {
      dragEventEl.current.style.top = '0px';
      dragEventEl.current.style.height = '0px';
      dragEventEl.current.children[0].innerText = '';
      dragEventEl.current.setAttribute('data-intialTop', 0);
      setDragEventStart(false);
      setDragstatus(null);
    }
  };

  const handleOnPointerMove = (e: any) => {
    if (!dragEventStart) return;
    e.persist();

    const rect = scrollEle.current.getBoundingClientRect();
    const pointerY = e.clientY - rect.top;

    if (pointerY - timeGridHeight < 0) {
      setDragstatus('TOP');
    } else if (pointerY + timeGridHeight > rect.height) {
      setDragstatus('BOTTOM');
    } else {
      setDragstatus(null);
    }
    const { currentTarget, clientY } = e;
    const { top, bottom, y } = scrollEle.current?.getBoundingClientRect();
    const intialTop = parseFloat(dragEventEl.current.getAttribute('data-intialTop') || 0);

    const scrollTop = currentTarget?.scrollTop || 0;
    if (clientY - y + scrollTop - intialTop > 0) {
      if (clientY < bottom) {
        dragEventEl.current.style.height = clientY - y + scrollTop - intialTop - 3 + 'px';
      }
    } else if (clientY > top + timeGridHeight - scrollTop) {
      dragEventEl.current.style.top = clientY - y + scrollTop + 3 + 'px';
      dragEventEl.current.style.height = intialTop - (clientY - y + scrollTop) + 'px';
    }
  };

  const handleOnPointerDown = (e: any) => {
    const { currentTarget, clientX, clientY } = e;

    const { top, bottom, width, x, y } = scrollEle.current?.getBoundingClientRect();

    const scrollTop = currentTarget?.scrollTop || 0;

    const newScrollTop = timeGridHeight - scrollTop > 0 ? timeGridHeight - scrollTop : 0;

    if (clientY < top + newScrollTop) return;

    let widthEl = dragEventEl.current.style.width;
    let marginLeftEl = dragEventEl.current.style.marginLeft;

    if (clientX - x > (1 / 5) * width && bottom > clientY && clientY > top + newScrollTop) {
      widthEl = `${((72 / 100) * width) / VIEW_COUNT_MAP[viewType]}px`;
      marginLeftEl = `${(1 / 5) * width}px`;

      if (VIEW_COUNT_MAP[viewType] === 3) {
        if (
          clientX - x > (1 / 5) * width + ((4 / 5) * width * 1) / 3 &&
          clientX - x < (1 / 5) * width + ((4 / 5) * width * 2) / 3
        ) {
          marginLeftEl = `${(1 / 5) * width + ((4 / 5) * width * 1) / 3}px`;
        } else if (clientX - x > (1 / 5) * width + ((4 / 5) * width * 2) / 3) {
          marginLeftEl = `${(1 / 5) * width + ((4 / 5) * width * 2) / 3}px`;
        }
      }
    }
    setDragEventStart(true);
    const intialTop = clientY - y + scrollTop;
    dragEventEl.current.style.top = `${intialTop}px`;
    dragEventEl.current.style.width = widthEl;
    dragEventEl.current.style.marginLeft = marginLeftEl;
    dragEventEl.current.setAttribute('data-intialTop', intialTop);
  };

  return (
    <>
      {!initPointerCorr.current ? <TooltipHover {...tooltip} tentIcon date={currentViewingDate} /> : null}
      <div data-label="true" className={classes.calendarViewGrid}>
        <div>
          <span data-time-zone="true" className={`${commonClasses.caption12Regular} ${classes.timeStyle}`}>
            {timeZoneAbbreviated()}
          </span>
        </div>
        {getDates()}
      </div>
      <section
        className={classes.relativeContainer}
        // onPointerDown={handleOnPointerDown}
        // onPointerUp={onCancelAddEventDrag}
        onPointerCancel={onCancelAddEventDrag}
        onMouseLeave={onCancelAddEventDrag}
        onPointerMove={handleOnPointerMove}
        ref={scrollEle}
      >
        <div className={classes.calendarViewGrid}>
          <div />
          {getDays({ isFirstIndex: true })}
        </div>
        <div className={classes.calendarContainer}>
          <TimeLine
            elementProps={{ onDragOver: (e) => e.preventDefault() }}
            date={date}
            viewType={viewType}
            magnifyCounter={magnifyCounter}
          />
          {TIME_OPTIONS.map(({ label }, timeIndex: number) => {
            const isFinalIndex = timeIndex === TIME_OPTIONS.length - 1;
            return (
              <div className={classes.calendarViewGrid} key={timeIndex}>
                <div>
                  <span className={`${commonClasses.caption12Regular} ${classes.timeStyle}`}>{label}</span>
                </div>
                {getDays({ timeIndex, isFinalIndex, date })}
              </div>
            );
          })}
        </div>
        <div ref={dragEventEl} data-start={dragEventStart} className={classes.eventDurationSelector}>
          <span className={`${commonClasses.sm10Regular} ${classes.eventLabel}`}> </span>
        </div>
      </section>
      <ZoomInOut
        disabled={dragEventStart}
        elementProps={{ onDragOver: (e) => e.preventDefault() }}
        value={magnifyCounter}
        onChange={setMagnifyCounter}
      />
    </>
  );
}
