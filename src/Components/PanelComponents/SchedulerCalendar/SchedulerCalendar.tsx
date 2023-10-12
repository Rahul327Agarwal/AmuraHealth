import { ClickAwayListener, debounce, Drawer, IconButton } from '@mui/material';
import { addDays, subDays } from 'date-fns';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { usePanels, usePanelsContainerSizeInfo } from '../../../DisplayFramework/DisplayFramework.hooks';
import { useDFEvent } from '../../../DisplayFramework/Events/DFEvents';
import { setEventOpacity, setReporteeEventOpacity } from '../../../DisplayFramework/State/Slices/CalenderSliderSlice';
import { setCurrentViewingDate, setCurrentViewingType } from '../../../DisplayFramework/State/Slices/DashboardSlice';
import { IRootState } from '../../../DisplayFramework/State/store';
import MUIButton from '../../LibraryComponents/MUIButton/MUIButton';
import StaticCalendar from '../../LibraryComponents/MUIDatePicker/StaticCalendar';
import MUISlider from '../../LibraryComponents/MUISlider/MUISlider';
import PageHeader from '../../LibraryComponents/PageHeader/PageHeader';
import SearchField from '../../LibraryComponents/SearchField/SearchField';
import EventDetails from '../TimeManagement/Components/EventDetails';
import AgendaView from './AgendaView/AgendaView';
import CalendarFilter from './CalendarFilter/CalendarFilter';
import { checkFiltersApplied, DEFAULT_FILTERS } from './CalendarFilter/CalendarFilter.function';
import { IFilterState } from './CalendarFilter/CalendarFilter.types';
import CalendarView from './CalendarView/CalendarView';
import { getFilteredGroupedEvent } from './CalendarView/CalenderView.functions';
import NoSearchResults from './Components/SearchNote/NoSearchResults';
import SearchNote from './Components/SearchNote/SearchNote';
import SearchPopUp from './Components/SearchPopUp/SearchPopUp';
import ViewTypeDrawer from './Components/ViewTypeDrawer/ViewTypeDrawer';
import {
  CalendarNavLeftIcon,
  CalendarNavRightIcon,
  DownIcon,
  FilterApplyedIcon,
  FilterIcon,
  SearchIcon,
  TodayIcon,
  TodayIconDeactivated,
} from './SchedularCalendar.svg';
import {
  getCalenderEventsFromES,
  getCalenderEventsFromESFilter,
  getMappedSortedEvent,
  VIEW_COUNT_MAP,
} from './SchedulerCalendar.function';
import { useStyles } from './SchedulerCalendar.styles';
import { IAction, IGroupedEventArray, IProps, TViewType } from './SchedulerCalendar.types';

const MIN_SEARCH_CHAR = 3;

export default function SchedularCalendar(props: IProps) {
  const { sessions, childEventTrigger, thirdPartyUserId } = props;

  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const userId = thirdPartyUserId || sessions?.user?.id;
  const dispatch = useDispatch();
  const currentViewingType = useSelector((state: IRootState) => state.dashboard.currentViewingType);
  const currentViewingDate = useSelector((state: IRootState) => state.dashboard.currentViewingDate);
  const eventOpacity = useSelector((state: IRootState) => state.CalenderSlider.eventOpacity);
  const reporteeEventOpacity = useSelector((state: IRootState) => state.CalenderSlider.reporteeEventOpacity);

  const [viewType, setViewType] = useState<TViewType>(thirdPartyUserId ? 'OneDay' : currentViewingType);
  const [events, setEvents] = useState(props.events || []);
  const [viewingDate, setViewingDate] = useState(thirdPartyUserId ? new Date() : new Date(currentViewingDate));
  const [magnifyCounter, setMagnifyCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState<IAction>({
    screen: 'CALENDAR',
    payload: {},
  });

  const [showCalendar, setShowCalendar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [defaultFilters, setDefaultFilters] = useState<IFilterState>(DEFAULT_FILTERS);
  const [search, setSearch] = useState('');
  const [showSearchView, setShowSearchView] = useState(false);
  const [showPopup, setshowPopup] = useState(false);
  const [numberOfEvents, setNumberOfEvents] = useState(0);
  const [top3SeachedEvents, setTop3SearchEvents] = useState([]);
  const [groupedEvent, setGroupedEvent] = useState<IGroupedEventArray[]>([]);
  const [finalGroupedEvent, setFinalGroupedEvent] = useState<IGroupedEventArray[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  const isFiltered = useMemo(() => checkFiltersApplied(defaultFilters, DEFAULT_FILTERS), [defaultFilters]);
  const triggerEvent = useDFEvent();

  const calendarLabel = useMemo(() => {
    const typeCount = VIEW_COUNT_MAP[viewType] - 1;
    const defaultFormat = moment(viewingDate).format('MMMM YYYY');
    if (!typeCount) return defaultFormat;
    const currDate = new Date(viewingDate);
    const lastDate = new Date(moment(viewingDate).add(typeCount, 'days').toDate());
    if (currDate.getDate() <= lastDate.getDate()) return defaultFormat;
    const currDateFormat =
      currDate.getFullYear() === lastDate.getFullYear()
        ? moment(viewingDate).format('MMM')
        : moment(viewingDate).format('MMM YYYY');
    const lastDateFormat = moment(lastDate).format('MMM YYYY');
    return `${currDateFormat} - ${lastDateFormat}`;
  }, [viewingDate, viewType]);

  useEffect(() => {
    const id = '' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear;
    let element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    }
  });

  useEffect(() => {
    if (viewType) {
      setIsLoading(true);
      getCalenderEventsFromES(
        viewType,
        viewingDate,
        sessions,
        thirdPartyUserId,
        props.organizerRoleId,
        props.tenantparticipantsRoleId
      )
        .then((res) => {
          let objDistructure = getMappedSortedEvent(res);
          setEvents(objDistructure);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log('Error retrieving events info', err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    dispatch(setCurrentViewingDate(viewingDate));
    dispatch(setCurrentViewingType(viewType));
  }, [viewType, viewingDate]);

  useEffect(() => {
    setShowSearchView(false);
  }, [action.screen === 'CALENDAR']);

  useEffect(() => {
    if (action.screen === 'EVENT_DETAILS') {
      setshowPopup(false);
    }
  }, [action.screen]);

  const handleOpacity: any = (event, value: number) => {
    if (thirdPartyUserId) {
      console.log('the value is:', value);
      dispatch(setReporteeEventOpacity(value));
    } else {
      dispatch(setEventOpacity(value));
    }
  };

  const finalGroupedEventFun = (searchEvent: Array<any>, sliceFirstNNo?: number) => {
    const sortedEvents = getMappedSortedEvent(searchEvent);
    const groupedEventObject = getFilteredGroupedEvent(sortedEvents);
    let eventsCounts = 0;
    const top3Events = [];
    let count = sliceFirstNNo ?? 0;
    const fromTime = new Date().setHours(0, 0, 0, 0);
    const groupedEventArray = Object.entries(groupedEventObject || {})?.map(([eventDate, events]) => {
      eventsCounts += events.length;
      if (count > 0) {
        const curEventDate = new Date(eventDate).setHours(0, 0, 0, 0);
        if (curEventDate >= fromTime) {
          const FilterDeclined = [];
          events?.forEach((eData) => {
            if (eData?.organizer === userId) {
              FilterDeclined.push(eData);
            } else {
              const rsvpdata = eData?.rsvp && eData?.rsvp[userId];
              const visiblilty = rsvpdata ? eData?.rsvp[userId]?.value : '';
              if (visiblilty !== 'No') {
                FilterDeclined.push(eData);
              }
            }
          });
          top3Events.push(...FilterDeclined.slice(0, count));
          count -= FilterDeclined.length;
        }
      }
      return { eventDate, events };
    });

    if (sliceFirstNNo) {
      setTop3SearchEvents(top3Events);
    }
    setIsFetching(false);
    setGroupedEvent(groupedEventArray);
    setNumberOfEvents(eventsCounts);
    if (sliceFirstNNo && action.screen === 'SEARCH_VIEW') {
      return;
    }
    setFinalGroupedEvent(groupedEventArray);
  };

  const handleBack = () => {
    setShowSearch(false);
    setTop3SearchEvents([]);
    setFinalGroupedEvent([]);
    setSearch('');
    setAction({ screen: 'CALENDAR', payload: {} });
    setshowPopup(false);
    setDefaultFilters(DEFAULT_FILTERS);
  };
  const onFilterChange = async (filters: IFilterState) => {
    try {
      setAction({ screen: 'SEARCH_VIEW', payload: {} });
      setDefaultFilters(filters);
      setIsLoading(true);
      setIsFetching(true);
      const searchString = search.trimStart();
      const eventsresponse = await getEventsfromES(searchString, filters);
      finalGroupedEventFun(eventsresponse);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 0);
    }
  };

  const { numOfPanelsCanFit } = usePanelsContainerSizeInfo();
  const {
    panelsData: { main },
  } = usePanels(numOfPanelsCanFit);
  const getEventsfromLocal = async (filters: IFilterState) => {
    const { callType, endDate, startDate, participants: participantsOptions } = filters || {};
    const value = search?.toLowerCase();

    const participants = participantsOptions?.map((data) => data.value);
    const fromTime = startDate && new Date(startDate).setHours(0, 0, 0, 0);
    const toTime = endDate && new Date(endDate).setHours(23, 59, 59, 999);
    let eventsCounts = 0;
    const finaldata = groupedEvent.reduce((predata, curdata) => {
      const eventsfiltered = curdata?.events?.filter((eventdata) => {
        const eventDate = new Date(eventdata.eventDate).setHours(0, 0, 0, 0);
        const calltypeCondition = callType ? eventdata.callType === callType : true;
        const dateRangeConition = startDate ? eventDate >= fromTime && eventDate <= toTime : true;
        const searched = value ? eventdata.title?.toLowerCase().includes(value) : true;
        const allParticipants = [
          ...(eventdata.tenantParticipants || []),
          { userId: eventdata.organizer, roleId: eventdata.organizer },
        ];
        const participantsConition = participants?.length ? allParticipants.some((d1) => participants.includes(d1.userId)) : true;
        return dateRangeConition && calltypeCondition && participantsConition && searched;
      });
      if (eventsfiltered?.length) {
        eventsCounts += eventsfiltered.length;
        return [...predata, { eventDate: curdata.eventDate, events: eventsfiltered }];
      }
      return predata;
    }, []);
    setFinalGroupedEvent(JSON.parse(JSON.stringify(finaldata)));
    setNumberOfEvents(eventsCounts);
  };

  const getEventsfromES = async (value: string, filters: IFilterState) => {
    const { callType, endDate, startDate, participants: participantsOptions } = filters || {};

    const participants = participantsOptions?.map((data) => data.value);
    const fromTime = new Date(startDate || subDays(new Date(), 30)).setHours(0, 0, 0, 0);
    const yearData = 30;
    const toTime = new Date(endDate || addDays(new Date(startDate || new Date()), yearData)).setHours(23, 59, 59, 999);

    const options = await getCalenderEventsFromESFilter({
      fromTime,
      toTime,
      callType,
      participants,
      sessions: sessions,
      searchedString: value,
      userId: thirdPartyUserId,
      organizerRoleId: props.organizerRoleId,
      tenantparticipantsRoleId: props.tenantparticipantsRoleId,
    });

    return options;
  };

  const onSearch = async (searchString: string) => {
    setIsFetching(true);
    setSearch(searchString);
    if (!searchString || searchString.length < MIN_SEARCH_CHAR) return;
    setshowPopup(true);
    const eventsresponse = await getEventsfromES(searchString, defaultFilters);
    finalGroupedEventFun(eventsresponse, 3);
  };

  const onEnterKey = async () => {
    setIsFetching(true);
    setshowPopup(false);
    if (action.screen === 'SEARCH_VIEW') {
      if (!search) {
        const eventsresponse = await getEventsfromES(search, defaultFilters);
        finalGroupedEventFun(eventsresponse);
        return;
      }
      getEventsfromLocal(defaultFilters);
    } else {
      setAction({ screen: 'SEARCH_VIEW', payload: {} });
    }
  };
  const handleFilterOpen = () => {
    setAction({ screen: 'FILTER', payload: {} });
    setshowPopup(false);
  };

  const handleBackToCalendar = () => {
    if (action?.previousScreen === 'SEARCH_VIEW') {
      setAction({ screen: 'SEARCH_VIEW', payload: {} });
    } else {
      setAction({ screen: 'CALENDAR', payload: {} });
      setSearch('');
      setTop3SearchEvents([]);
      setFinalGroupedEvent([]);
      setDefaultFilters(DEFAULT_FILTERS);
    }
  };

  const handleBackToSearchView = () => {
    setAction({
      screen: showSearchView ? 'SEARCH_VIEW' : 'CALENDAR',
      payload: {},
    });
  };

  const clearFilter = async () => {
    setDefaultFilters(DEFAULT_FILTERS);
    setSearch('');
    setTop3SearchEvents([]);
    setFinalGroupedEvent([]);
    setAction({ screen: 'CALENDAR', payload: {} });
  };
  const onPreDate = () => {
    const date = new Date(moment(viewingDate).subtract(VIEW_COUNT_MAP[viewType], 'day').toDate());
    setViewingDate(date);
  };
  const onNextDate = () => {
    const date = new Date(moment(viewingDate).add(VIEW_COUNT_MAP[viewType], 'day').toDate());
    setViewingDate(date);
  };

  const debounceFun: Function = debounce(onSearch, 500);
  const debounceOpacityFun: any = debounce(handleOpacity);

  const handleClick = () => {
    const isSCPanelActive = main.some((panel) => (panel.id === 'C' || panel.id === 'S') && panel.isActive);
    if (isSCPanelActive) {
      triggerEvent('emptyAllPanels');
    }
  };

  return (
    <div className={classes.rootRelativeContainer} onClickCapture={handleClick}>
      <section className={classes.rootContainer}>
        <PageHeader
          customStyle={classes.headerStyle}
          {...(showSearch || action.screen === 'FILTER' ? { handleBack } : {})}
          headerContent={
            showSearch ? (
              <div className={classes.dflex}>
                <SearchField
                  customStyle={classes.searchbox}
                  value={search}
                  placeholder={'Search items'}
                  handleSearch={(value) => {
                    const searchString = value.trimStart();
                    debounceFun(searchString);
                  }}
                  onKeyDown={onEnterKey}
                  autoFocus
                />
              </div>
            ) : null
          }
          endAdornment={
            <div className={classes.headerIconWrapper}>
              {!showSearch ? (
                <div className={classes.dflex}>
                  <IconButton className={classes.searchIcon} onClick={() => setShowSearch(true)}>
                    <SearchIcon />{' '}
                  </IconButton>
                </div>
              ) : (
                <IconButton className={classes.filterIcon} onClick={handleFilterOpen}>
                  {isFiltered ? <FilterApplyedIcon /> : <FilterIcon />}
                </IconButton>
              )}
            </div>
          }
        />
        {search.length >= MIN_SEARCH_CHAR && showPopup ? (
          <ClickAwayListener onClickAway={() => setshowPopup(false)}>
            <section className={classes.popup}>
              {top3SeachedEvents?.length ? (
                <SearchPopUp
                  setAction={setAction}
                  seachedData={top3SeachedEvents}
                  setshowPopup={setshowPopup}
                  sessions={sessions}
                  isReporteeCalendar={!!thirdPartyUserId}
                  thirdPartyUserId={thirdPartyUserId}
                />
              ) : (
                <span className={classes.span}>{isFetching ? `Loading...` : `No Results Found`}</span>
              )}
            </section>
          </ClickAwayListener>
        ) : null}
        {action.screen === 'SEARCH_VIEW' ? (
          <>
            {!finalGroupedEvent?.length && !isLoading ? (
              <NoSearchResults clearFilter={clearFilter} />
            ) : (
              <>
                <div className={classes.spaceBetween}>
                  <span className={`${commonClasses.caption12Medium} ${classes.results}`}>{numberOfEvents} results found</span>
                  <MUIButton size="small" className={classes.clear} onClick={clearFilter}>
                    Clear
                  </MUIButton>
                </div>
                <div className={classes.scrollBody}>
                  <div className={classes.groupedEventWrapper}>
                    {finalGroupedEvent?.map((data) => (
                      <div
                        key={data.eventDate.toString()}
                        id={
                          '' +
                          new Date(data?.eventDate).getDate() +
                          new Date(data?.eventDate).getMonth() +
                          new Date(data?.eventDate).getFullYear
                        }
                      >
                        <SearchNote
                          key={data?.eventDate.toString()}
                          setAction={setAction}
                          eventDate={data?.eventDate}
                          events={data?.events}
                          sessions={sessions}
                          isReporteeCalendar={!!thirdPartyUserId}
                          thirdPartyUserId={thirdPartyUserId}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <section className={classes.calendarSection}>
              <header className={classes.calendarHeader}>
                <div className={classes.leftArrow}>
                  <MUIButton
                    data-rotate={showCalendar}
                    className={classes.calendarbutton}
                    endIcon={<DownIcon />}
                    onClick={() => setShowCalendar((pre) => !pre)}
                  >
                    {calendarLabel}
                  </MUIButton>
                </div>
                <div className={classes.navButtonWrapper}>
                  <IconButton className={classes.calendarNavbutton} onClick={onPreDate}>
                    <CalendarNavLeftIcon />
                  </IconButton>
                  <div className={classes.todayIcon} onClick={() => setViewingDate(new Date())}>
                    {moment(new Date(viewingDate)).format('l') === moment(new Date()).format('l') ? (
                      <TodayIconDeactivated />
                    ) : (
                      <TodayIcon />
                    )}
                  </div>

                  <IconButton className={classes.calendarNavbutton} onClick={onNextDate}>
                    <CalendarNavRightIcon />
                  </IconButton>
                </div>
                <ViewTypeDrawer onChange={setViewType} value={viewType} />
              </header>
              {showCalendar ? (
                <StaticCalendar customStyle={classes.calendarStyle} date={viewingDate} setDate={setViewingDate} />
              ) : null}
            </section>
            {viewType !== 'Agenda' && (
              <div className={classes.sliderdiv}>
                <MUISlider
                  className={classes.SilderStyle}
                  value={thirdPartyUserId ? reporteeEventOpacity : eventOpacity}
                  min={0.3}
                  max={1}
                  step={0.01}
                  onChange={debounceOpacityFun}
                />
              </div>
            )}
            <section className={classes.scrollBody}>
              {viewType === 'Agenda' ? (
                <AgendaView
                  setAction={setAction}
                  childEventTrigger={childEventTrigger}
                  date={viewingDate}
                  events={events}
                  sessions={sessions}
                  isReporteeCalendar={!!thirdPartyUserId}
                  thirdPartyUserId={thirdPartyUserId}
                />
              ) : (
                <CalendarView
                  date={viewingDate}
                  viewType={viewType}
                  events={events}
                  setAction={setAction}
                  setMagnifyCounter={setMagnifyCounter}
                  magnifyCounter={magnifyCounter}
                  childEventTrigger={childEventTrigger}
                  sessions={sessions}
                  eventOpacity={thirdPartyUserId ? reporteeEventOpacity : eventOpacity}
                  isReporteeCalendar={!!thirdPartyUserId}
                  thirdPartyUserId={thirdPartyUserId}
                />
              )}
            </section>
          </>
        )}
      </section>
      {action.screen === 'EVENT_DETAILS' ? (
        <Drawer anchor="left" className={`${classes.overlapDrawer} ${classes.eventDetailsView}`} variant={'persistent'} open>
          <EventDetails
            handleBack={handleBackToCalendar}
            sessions={sessions}
            childEventTrigger={childEventTrigger}
            eventsData={action.payload}
            viewType={viewType}
            setEvents={setEvents}
            isReporteeEvent={!!thirdPartyUserId}
            setViewType={setViewType}
            setViewingDate={setViewingDate}
          />
        </Drawer>
      ) : action.screen === 'FILTER' ? (
        <Drawer anchor="left" className={classes.overlapDrawer} variant={'persistent'} open>
          <CalendarFilter defaultFilters={defaultFilters} onFilterChange={onFilterChange} handleBack={handleBackToSearchView} />
        </Drawer>
      ) : null}
    </div>
  );
}
