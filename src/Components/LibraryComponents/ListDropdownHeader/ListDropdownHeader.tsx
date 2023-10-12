import { debounce, IconButton } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDFEvent } from '../../../DisplayFramework/Events/DFEvents';
import { resetTeamData, setActiveMyList } from '../../../DisplayFramework/State/Slices/DashboardSlice';
import {
  BackArrowIcon,
  CalendarIcon,
  CircleSelectedIcon,
  CircleSelectIcon,
  ConfigurationIcon,
  PeoplesIcon,
  PostCollectionsIcon,
  PostsIcon,
  RefreshBadgeIcon,
  RefreshIcon,
  SearchIcon,
} from './ListDropdownHeader.svg';
import MyListHeader from '../MyListHeader/MyListHeader';
import SearchField from '../SearchField/SearchField';
import ThreeDotMenu from '../ThreeDotMenu/ThreeDotMenu';
import ThreeDotRenderButton from '../ThreeDotMenu/ThreeDotRenderButton';
import { EMPTY_CLENT_DATA, SELECT_OPTIONS } from './ListDropdownHeader.function';
import { useStyles } from './ListDropdownHeader.styles';
import { ListDropdownHeaderProps } from './ListDropdownHeader.types';

export const LIST_HEADER_DROPDOWN = [
  { id: 'people', value: 'people', label: 'People', icon: <PeoplesIcon /> },
  {
    id: 'configuration',
    value: 'configuration',
    label: 'Configuration',
    icon: <ConfigurationIcon />,
  },
  { id: 'posts', value: 'posts', label: 'Posts', icon: <PostsIcon /> },
  {
    id: 'postsCollections',
    value: 'postsCollections',
    label: 'Post Collections',
    icon: <PostCollectionsIcon />,
  },
  {
    id: 'distributions',
    value: 'distributions',
    label: 'Distributions',
    icon: <PostCollectionsIcon />,
  },
  { id: 'events', value: 'events', label: 'Events', icon: <CalendarIcon /> },
  {
    id: 'reportees',
    value: 'reportees',
    label: 'Reportees',
    icon: <CalendarIcon />,
  },
];

const ListDropdownHeader = (props: ListDropdownHeaderProps) => {
  const {
    headerActionOptions,
    childEventTrigger,
    selectedDropdown,
    setSelectedDropdown,
    handleSearch,
    customStyle,
    startAdornment,
    endAdornment,
    cardAssignType,
    setCardAssignType,
    handleSearchBack,
    currentSelection,
    onRefresh,
    showRefreshBadge,
    isLoading,
    hideSearch,
  } = props;
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = useState(false);

  const localHeaderActionOptions = useMemo(
    () => [
      ...(onRefresh
        ? [
            {
              id: 'refresh',
              icon: (
                <span data-loading={isLoading} className={classes.refreshIcon}>
                  {showRefreshBadge && (
                    <span className={`${classes.refreshNotification}`}>
                      <RefreshBadgeIcon />
                    </span>
                  )}
                  <RefreshIcon />
                </span>
              ),
              onClick: () => !isLoading && onRefresh(),
            },
          ]
        : []),
      ...headerActionOptions,
      !hideSearch && {
        id: 'search',
        icon: (
          <i className={classes.reSize}>
            <SearchIcon />
          </i>
        ),
        onClick: () => setShowSearch(true),
      },
    ],
    [headerActionOptions, showRefreshBadge, isLoading]
  );

  useEffect(() => {
    if (currentSelection !== 'configuration' && selectedDropdown === 'configuration') {
      dispatch(setActiveMyList('Bot Card'));
      childEventTrigger(null, null, 'onBotCardSelect', EMPTY_CLENT_DATA);
    } else if (currentSelection !== 'posts' && selectedDropdown === 'posts') {
      dispatch(setActiveMyList('Posts'));
      childEventTrigger(null, null, 'onPostSelect', EMPTY_CLENT_DATA);
    } else if (currentSelection !== 'postsCollections' && selectedDropdown === 'postsCollections') {
      dispatch(setActiveMyList('Post Collections'));
      childEventTrigger(null, null, 'onPostsCollectionsSelect', EMPTY_CLENT_DATA);
    } else if (currentSelection !== 'distributions' && selectedDropdown === 'distributions') {
      dispatch(setActiveMyList('distributions'));
      childEventTrigger(null, null, 'onDistributionSelect', EMPTY_CLENT_DATA);
    } else if (currentSelection !== 'people' && selectedDropdown === 'people') {
      dispatch(setActiveMyList('My List'));
      childEventTrigger(null, null, 'onMyListSelect', EMPTY_CLENT_DATA);
    } else if (currentSelection !== 'events' && selectedDropdown === 'events') {
      dispatch(setActiveMyList('My List'));
      childEventTrigger(null, null, 'onEventSelect', EMPTY_CLENT_DATA);
    } else if (currentSelection !== 'reportees' && selectedDropdown === 'reportees') {
      dispatch(setActiveMyList('Reportees List'));
      childEventTrigger(null, null, 'onReporteesList', EMPTY_CLENT_DATA);
    }
  }, [selectedDropdown]);

  const handleDropdownChange = (data) => {
    dispatch(resetTeamData());
    setSelectedDropdown(data);
  };
  const onSearchBack = () => {
    setShowSearch(false);
    handleSearch?.('');
    handleSearchBack && handleSearchBack();
  };
  const onSearch = (data) => {
    handleSearch?.(data);
  };

  const selectedValue = useMemo(() => LIST_HEADER_DROPDOWN.find((v) => v.value === selectedDropdown), [selectedDropdown]);

  const debounceSearchFun: Function = debounce(onSearch, 500);

  return showSearch ? (
    <div className={`${classes.searchBox} ${customStyle}`}>
      <IconButton className={classes.backButton} onClick={onSearchBack}>
        <BackArrowIcon />
      </IconButton>
      <div className={classes.searchFieldWrap}>
        <SearchField placeholder="Search" handleSearch={debounceSearchFun} autoFocus />
      </div>
    </div>
  ) : (
    <MyListHeader
      className={customStyle}
      padding="12px 20px"
      actionOption={localHeaderActionOptions}
      startAdornment={
        <>
          {startAdornment}
          {cardAssignType !== undefined && setCardAssignType ? (
            <ThreeDotMenu
              isGrow
              isDivider
              options={SELECT_OPTIONS}
              renderButton={
                <IconButton className={classes.removePadding}>
                  {cardAssignType ? <CircleSelectedIcon /> : <CircleSelectIcon />}
                </IconButton>
              }
              selectedOption={cardAssignType}
              handleClick={setCardAssignType}
              customStyle={classes.filterOptionStyle}
            />
          ) : null}
        </>
      }
      endAdornment={endAdornment}
      injectComponent={
        <></> // <ThreeDotMenu
        //   isReverse
        //   isDivider
        //   options={LIST_HEADER_DROPDOWN}
        //   renderButton={<ThreeDotRenderButton icon={selectedValue.icon} label={selectedValue.label} />}
        //   handleClick={handleDropdownChange}
        // />
      }
    />
  );
};

export default ListDropdownHeader;
