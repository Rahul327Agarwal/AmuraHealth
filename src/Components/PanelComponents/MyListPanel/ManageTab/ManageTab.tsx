import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import { AlphabeticalSortIcon, NaturalSortIcon } from '../MyListPanel.svg';
import { useStyles } from './ManageTab.styles';
import { IAction, ITab, TabPanelProps } from './ManageTab.types';
import { addTabsAPICall } from './ManagerTab.functions';
import ModifyTab from './ModifyTab';
import TabList from './TabList';
import { useDFGoBack } from '../../../../DisplayFramework/Events/DFEvents';
import { IRootState, useAppDispatch } from '../../../../DisplayFramework/State/store';
import { getTabsAPI } from '../MyList/MyList.function';
import { registerEvent, unRegisterEvent } from '../../../../AppSync/AppSync.functions';
import MUISkeleton from '../../../LibraryComponents/MUISkeleton/MUISkeleton';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { useUserSession } from '../../../../DisplayFramework/State/Slices/Auth';
import { ISession } from '../../../../Common/Common.types';

const ManageTab = (props: TabPanelProps) => {
  const {
    setActiveTab,
    // sessions,
    handleBack: handleScreenBack,
    statusOptions,
    myTabs,
    setMyTabs,
    reportessListType,
    reporteesData,
  } = props;
  const { classes } = useStyles(props);
  const { id: panelId } = useCurrentPanel();
  const [swipeIn, setSwipeIn] = useState(false);
  const [action, setAction] = useState<IAction>({ screen: 'TAB_PANEL', payload: {}, index: -1 });
  const [tabData, setTabData] = useState(myTabs);
  const [isSorted, setIsSorted] = useState('NATURAL_SORT');
  const [sortedData, setSortedData] = useState(myTabs);
  const [isLoading, setIsLoading] = useState(false);
  const sessions = useUserSession();

  let tabsSubscription;
  useEffect(() => {
    tabsSubscription = registerEvent(
      (reportessListType === 'REPOTEES_MYLIST' ? reporteesData?.staffId : sessions?.user?.id) || '',
      'ADDED_TABS',
      () => {
        getMyTabs(sessions);
      }
    );
    return () => {
      if (tabsSubscription) unRegisterEvent(tabsSubscription);
    };
  }, [sessions]);

  const getMyTabs = (newSessions: ISession) => {
    let userId = (reportessListType === 'REPOTEES_MYLIST' ? reporteesData?.staffId : newSessions?.user?.id) || '';
    setIsLoading(true);
    getTabsAPI(newSessions, userId)
      .then((myTabs) => {
        setTabData(myTabs);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const goBack = useDFGoBack();

  const handleBack = () => {
    goBack('H');
    handleScreenBack('HOME');
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    applySort(isSorted);
  }, [tabData]);

  useEffect(() => {
    setSwipeIn(true);
  }, []);
  const handleThreeDot = (option, data, index) => {
    if (option == 'Edit') {
      setAction({ screen: 'ADD_TAB', payload: { data: data }, index: index });
    } else {
      console.log('in delete', data);
      // setTabData((pre)=>[...pre.filter((data,ind)=>ind!=index)])
      addTabsAPICall(
        panelId,
        data.tabName,
        data.sortingOrder,
        data.criteria,
        'DELETE',
        data.tabId,
        sessions?.user?.id,
        sessions,
        setAction
      );
    }
  };
  const applySort = (order: string) => {
    const sortedTabs = JSON.parse(JSON.stringify(tabData)).sort((a: ITab, b: ITab) =>
      order === 'ALPHABETICAL_SORT' ? a.tabName.localeCompare(b.tabName) : a.sortingOrder - b.sortingOrder
    );
    setIsSorted(order);
    setSortedData(sortedTabs);
  };

  const onAddNewTab = (orderedTabs: ITab[]) => {
    setAction({ screen: 'ADD_TAB', payload: { orderedTabs } });
  };
  const onSetActiveTab = (value: ITab, orderedTabs: ITab[]) => {
    setMyTabs(orderedTabs);
    setActiveTab(value);
    handleBack();
  };

  const RenderDrawerComponent = () => {
    switch (action.screen) {
      case 'TAB_PANEL':
        return (
          <div className={classes.wrap}>
            <PageHeader
              handleBack={handleBack}
              headerContent={'Tabs'}
              endAdornment={
                <div className={classes.iconWrapper}>
                  <IconButton
                    className={isSorted === 'ALPHABETICAL_SORT' ? classes.active : classes.inactive}
                    onClick={() => {
                      if (isSorted !== 'ALPHABETICAL_SORT') {
                        applySort('ALPHABETICAL_SORT');
                      }
                    }}
                  >
                    {<AlphabeticalSortIcon />}
                  </IconButton>
                  <IconButton
                    className={isSorted === 'NATURAL_SORT' ? classes.active : classes.inactive}
                    onClick={() => {
                      if (isSorted !== 'NATURAL_SORT') {
                        applySort('NATURAL_SORT');
                      }
                    }}
                  >
                    {<NaturalSortIcon />}
                  </IconButton>
                </div>
              }
            />
            {isLoading && (
              <>
                <MUISkeleton variant={'rectangular'} height={'70px'} style={{ margin: '5px 0px' }} />
                <MUISkeleton variant={'rectangular'} height={'70px'} style={{ margin: '5px 0px' }} />
                <MUISkeleton variant={'rectangular'} height={'70px'} style={{ margin: '5px 0px' }} />
                <MUISkeleton variant={'rectangular'} height={'70px'} style={{ margin: '5px 0px' }} />
                <MUISkeleton variant={'rectangular'} height={'70px'} style={{ margin: '5px 0px' }} />
              </>
            )}
            {!isLoading && (
              <TabList
                addButtonLabel="+ Add Tab"
                myListTabs={sortedData}
                handleThreeDot={handleThreeDot}
                onAddNewTab={onAddNewTab}
                onSetActiveTab={onSetActiveTab}
                sessions={sessions}
                reportessListType={reportessListType}
              />
            )}
          </div>
        );
      case 'ADD_TAB':
        return (
          <ModifyTab
            {...props}
            setAction={setAction}
            action={action}
            setTabData={setTabData}
            tabData={sortedData}
            myListTabs={sortedData}
            statusOptions={statusOptions}
            sessions={sessions}
          />
        );
    }
  };
  return (
    <div className={`${classes.rootContainer} ${swipeIn ? classes.swipeIn : classes.swipeOut}`}>
      <div className={`${classes.backdrop} ${swipeIn ? classes.backdropOpacityIn : classes.backdropOpacityOut}`}></div>
      <div className={classes.mainContainer}>{RenderDrawerComponent()}</div>
    </div>
  );
};

export default ManageTab;
