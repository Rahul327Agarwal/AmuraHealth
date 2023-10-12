import React, { useEffect, useMemo, useState } from 'react';

import { IProps } from './EventCardList.types';

import { debounce, Fab, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';
import { IRootState } from '../../../DisplayFramework/State/store';

import moment from 'moment';

import MUISkeleton from '../../LibraryComponents/MUISkeleton/MUISkeleton';

import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { AutoSizer, List } from '../../../Utilities/AutoResizerWrapper';
import ListDropdownHeader from '../../LibraryComponents/ListDropdownHeader/ListDropdownHeader';
import { ListHeaderDropdownTypes } from '../../LibraryComponents/ListDropdownHeader/ListDropdownHeader.types';
import NameCard from '../../LibraryComponents/NameCard1/NameCard1';
import SearchField from '../../LibraryComponents/SearchField/SearchField';
import { AmuraIcon, BlackArrowIcon, PlusIcon, SearchIcon, SizeIcon, TickIcon } from './EventCardList.svg';
// import CommonHeader from "../MyListPanel/MyList/CommonHeader";
import { getTimeRangeString } from '../SchedulerCalendar/SchedulerCalendar.function';
import { TViewType } from '../SchedulerCalendar/SchedulerCalendar.types';
import {
  ADDING_STOREDATA,
  DISTRIBUTION_DROPDOWN,
  dummyEvents,
  filterTodaysComingNonAFBEvents,
  getFilteredCalenderEventsFromES,
  getFormattedDate,
  NAME_CARD_ICONS,
  roundTimeToNearest30,
} from './EventCardList.function';
import { useStyles } from './EventCardList.styles';
import NonExtenableContent from './NonExtendableContent/NonExtenableContent';

const initColorFilter = {
  isEmergency: true,
  isNewMessage: true,
  isOthers: true,
};

const resetColorFilter = {
  isEmergency: false,
  isNewMessage: false,
  isOthers: false,
};

export default function EventCardList(props: IProps) {
  const { childEventTrigger, panel } = props;
  const { classes } = useStyles();
  const commonClass = useCommonStyles();

  const currentViewingDate = useSelector((state: IRootState) => state.dashboard.currentViewingDate);
  const currentViewingType = useSelector((state: IRootState) => state.dashboard.currentViewingType);
  const disabledaddBtnInList = useSelector((state: IRootState) => state.AllPostData.disabledaddBtnInList);

  const [selectedDropdown, setSelectedDropdown] = useState<ListHeaderDropdownTypes>('events');
  const [uniqueCollectionType, setUniqueCollectionType] = useState('POLL');
  const [selectedCardId, setSelectedCardId] = useState('');
  const [searchString, setSearchString] = useState('');
  const [cardData, setCardData] = useState<any>([]);
  const [searchClose, setSearchClose] = useState(0);
  const [filteredEvents, setFilteredEvents] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [colorFilter, setColorFilter] = useState(initColorFilter);
  const [isExtend, setIsExtend] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [autosizerHeight, setAutosizerHeight] = useState<number>(0);
  const timeString = '10:30PM';

  const [viewingDate, setViewingDate] = useState(new Date(currentViewingDate));
  const [viewType, setViewType] = useState<TViewType>(currentViewingType);

  const handldeOpenClient = (data) => {
    childEventTrigger('MyList', 'MyList', 'onEventCardClick', {
      eventsData: data,
      sessions: props.sessions,
      childEventTrigger,
      viewType,
      // handleBack: () => {},
      openInMyWork: true,
      panel: 'MyCustomer',
    });
  };

  const createNewEvent = () => {
    const selectedDateTime = roundTimeToNearest30();
    childEventTrigger('MyList', 'MyList', 'onCreateEventClick', {
      selectedDateTime,
      viewType,
      isEditEvent: false,
      eventsData: null,
      // duration,
      openInMyWork: true,
    });
  };

  const handleClear = () => {
    setColorFilter(initColorFilter);
  };
  const handleColorFilter = (color) => {
    let status = colorFilter[color];
    if (colorFilter[color] && !Object.values(colorFilter).every(Boolean)) {
      setColorFilter(initColorFilter);
    } else {
      setColorFilter(resetColorFilter);
      setColorFilter((pre) => ({ ...pre, [color]: true }));
    }
  };
  const fetchEvents = async () => {
    !isLoading && setIsLoading(true);
    const filteredEvents = await getFilteredCalenderEventsFromES(viewType, viewingDate, props.sessions);
    const sortedEvents = filteredEvents.sort(
      (a, b) => new Date(a._source.toTime).getTime() - new Date(b._source.toTime).getTime()
    );
    setFilteredEvents(sortedEvents);
    setIsLoading(false);
  };

  const colorFilters = [
    {
      id: 'isEmergency',
      isSelected: colorFilter.isEmergency,
      color: '#FF3B30',
      onClick: () => handleColorFilter('isEmergency'),
    },
    {
      id: 'isNewMessage',
      isSelected: colorFilter.isNewMessage,
      color: '#252427',
      onClick: () => handleColorFilter('isNewMessage'),
    },
    {
      id: 'isOthers',
      isSelected: colorFilter.isOthers,
      color: '#007AFF',
      onClick: () => handleColorFilter('isOthers'),
    },
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const headerActionOptions = useMemo(
    () => [
      // { id: 'filter', icon: FilterIcon, onClick: handleClickFilter }
    ],
    []
  );

  const handleEditTab = () => {
    // NOTE: EDIT TAB
  };
  const handleSearchList = (value) => {
    // setSearchString(value);
    // globalEventVariables.searchString = value;
    // if (value.length > 2) {
    //   const searchValue = value.toLowerCase();
    //   const filteredClientData = tempFilteredData.filter(
    //     ({ userInfo }) =>
    //       userInfo?.username?.toLowerCase()?.includes(searchValue) ||
    //       userInfo?.FirstName?.toLowerCase()?.includes(searchValue) ||
    //       userInfo?.LastName?.toLowerCase()?.includes(searchValue)
    //   );
  };
  const handleSearchBack = () => {
    // setCardData(tempFilteredData)
  };

  const onSearchBack = () => {
    setShowSearch(false);
    handleSearchList('');
    handleSearchBack && handleSearchBack();
    // setCardData(tempFilteredData);
  };

  const onSearch = (data) => {
    handleSearchList(data);
  };
  const debounceSearchFun: Function = debounce(onSearch, 500);
  const handleCollapse = () => setIsExtend((pre) => !pre);

  return (
    <div className={classes.mainContainer} key={searchClose}>
      {showSearch ? (
        <div className={`${classes.searchBox}`}>
          <IconButton className={classes.backButton} onClick={onSearchBack}>
            <BlackArrowIcon />
          </IconButton>
          <SearchField placeholder="Search" handleSearch={debounceSearchFun} autoFocus />
        </div>
      ) : (
        <div className={classes.subHeader}>
          <span className={classes.headerIcon}>
            <TickIcon />
          </span>
          <span className={classes.headerIcon} onClick={handleCollapse}>
            <SizeIcon />
          </span>
          <span className={classes.headerIcon} onClick={() => setShowSearch(true)}>
            <SearchIcon />
          </span>
        </div>
      )}
      <div
        className={classes.nameChardWrapper}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {isLoading ? (
          <div className={classes.loaderWrapper}>
            <MUISkeleton animation="wave" variant="rectangular" height="112px" width="100%" />
            <MUISkeleton animation="wave" variant="rectangular" height="112px" width="100%" />
            <MUISkeleton animation="wave" variant="rectangular" height="112px" width="100%" />
            <MUISkeleton animation="wave" variant="rectangular" height="112px" width="100%" />
            <MUISkeleton animation="wave" variant="rectangular" height="112px" width="100%" />
            <MUISkeleton animation="wave" variant="rectangular" height="112px" width="100%" />
          </div>
        ) : (
          <AutoSizer
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            {({ width, height }) => (
              <List
                data={filteredEvents}
                className={classes.listStyle}
                width={width}
                height={height}
                rowHeight={isExtend ? 194 : 114}
                rowCount={filteredEvents.length}
                rowRenderer={({ index, style }) => {
                  const currentCardData = filteredEvents[index];

                  return (
                    <div
                      key={index}
                      style={{
                        height: isExtend ? 194 : 114,
                        width: '100%',
                        transition: 'all 0.4s ease-in-out 0s',
                      }}
                    >
                      <NameCard
                        isEventCard
                        id={currentCardData._id}
                        isEventSelected={currentCardData._id === selectedCardId}
                        setSelectedCardId={setSelectedCardId}
                        isExtend={isExtend}
                        tenentIcon={<AmuraIcon />}
                        profilePic={NAME_CARD_ICONS[uniqueCollectionType]}
                        profilePicURL={`${import.meta.env.VITE_DP_URL}${currentCardData._source.organizer}/profile-pic.png`}
                        title={currentCardData._source.title}
                        participants={currentCardData._source.tenantParticipants}
                        nonExtenableContent={
                          <NonExtenableContent
                            date={getFormattedDate(currentCardData._source.eventDate)}
                            time={getTimeRangeString(currentCardData._source.fromTime, currentCardData._source.toTime)}
                          />
                        }
                        openClient={() => handldeOpenClient(currentCardData._source)}
                      />
                    </div>
                  );
                }}
              />
            )}
          </AutoSizer>
        )}
      </div>

      <Fab
        onClick={() => {
          if (!disabledaddBtnInList) {
            createNewEvent();
          } else {
          }
        }}
        className={disabledaddBtnInList ? classes.disabledButton : classes.addButton}
      >
        <PlusIcon />
      </Fab>
    </div>
  );
}
