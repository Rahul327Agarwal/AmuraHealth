import { Drawer } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDFEvent } from '../../../DisplayFramework/Events/DFEvents';
import { setAlluserRoles } from '../../../DisplayFramework/State/Slices/DashboardSlice';
import { setProgress, setShowProgress } from '../../../DisplayFramework/State/Slices/ReporteesSlice';
import IndeterminateLoader from '../../LibraryComponents/InderminateLoader/InderminateLoader';
import { REPORTEES_STAFF_GP } from '../ReporteesListView/ReporteesListViewHome.function';
import { getStatusForAllRoles } from './ManageStatus/ManageStatus.function';
import { getFixedMaxWidgetWidth } from '../../../DisplayFramework/DisplayFramework.functions';
import { IRootState } from '../../../DisplayFramework/State/store';
import MyList from './MyList/MyList';
import {
  DEFAULT_TAB,
  getAllStaffRoles,
  getGroupsAPI,
  getMyListData,
  getMyListReportees,
  getReporteesFilterResults,
  getTabsAPI,
} from './MyList/MyList.function';
import { useStyles } from './MyList/MyList.styles';
import { IAllRoleDetails, ICard } from './MyList/MyList.types';
import { IProps, actionTypes } from './MyListHome.types';
import SearchCard from './SearchCard/SearchCard';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';
import { useUserSession } from '../../../DisplayFramework/State/Slices/Auth';
import { ISession } from '../../../Common/Common.types';

const GC1_ROLE_NAME = 'amura_guidance_counselor_level1';

export default function MyListHome(props: IProps) {
  const { classes } = useStyles(props);
  const width = getFixedMaxWidgetWidth();
  const { id: panelId } = useCurrentPanel();
  const { registerEvent, unRegisterEvent, reportessListType, reporteesData, reporteesTabData } = props;
  const [clientData, setClientData] = useState({ cards: [], roles: [] } as { cards: Array<ICard>; roles: Array<string> });
  const [myTabs, setMyTabs] = useState([]);
  const [myGroups, setMyGroups] = useState([]);
  const [action, setAction] = useState<actionTypes>('HOME');
  const [selectedCard, setSelectedCard] = useState();
  const [activeTab, setActiveTab] = useState({ tabId: DEFAULT_TAB.tabId });
  const [activeGroup, setActiveGroup] = useState(reportessListType === 'REPORTEES_FILTERS' ? REPORTEES_STAFF_GP[0] : null);
  const [isMylistLoading, setIsMyListLoading] = useState(true);
  const [statusOptions, setStatusOptions] = useState([]);
  const { allRoles } = useSelector((state: IRootState) => state.displayFrameWork.loggedInUserInformation);
  // const [allDBRoles, setAllDBRoles] = useState([]);

  const sessions = useUserSession();
  const sendEvent = useDFEvent();

  const dispatch = useDispatch();
  const handleBackToHome = () => {
    setAction('HOME');
  };

  let myPatientSubscription: any;
  let tabsSubscription: any;
  let groupsSubscription: any;
  useEffect(() => {
    (async () => {
      let rolesData: IAllRoleDetails[] = await getAllStaffRoles(panelId, props);
      dispatch(setAlluserRoles(rolesData));
    })();
    (async () => {
      if (!(allRoles || []).includes(GC1_ROLE_NAME)) return;
      let { edgeColor: statuses } = await getStatusForAllRoles(null, GC1_ROLE_NAME, props);
      if (!statuses?.length) return;
      setStatusOptions(statuses?.map((status) => ({ label: status.label, value: status.value })));
    })();
  }, []);

  useEffect(() => {
    if (reportessListType === 'REPORTEES_FILTERS' && reporteesTabData.selectedTab?.selectedReportees) {
      onRefreshReportees();
    }
  }, [reportessListType, reporteesTabData?.selectedTab?.tabId]);

  useEffect(() => {
    switch (action) {
      case 'MESSAGE_STATUS':
        sendEvent('onMyListManageStatusClick', {
          ...props,
          handleBack: handleBackToHome,
          selectedCard,
          reporteesData,
        });
        break;
      case 'TABSETTING':
        sendEvent('onMyListManageTabClick', {
          ...props,
          reporteesData,
          reportessListType,
          handleBack: handleBackToHome,
          setActiveTab: setActiveTab,
          statusOptions: statusOptions,
          myTabs: myTabs,
          setMyTabs: setMyTabs,
        });
        break;
      case 'GROUPSETTING':
        sendEvent('onMyListManageGroupClick', {
          ...props,
          reporteesData,
          reportessListType,
          setActiveGroup: setActiveGroup,
          handleBack: handleBackToHome,
          myGroups: myGroups,
        });
    }
  }, [action]);

  const onRefreshReportees = async () => {
    try {
      setIsMyListLoading(true);
      dispatch(setProgress(0));
      dispatch(setShowProgress(true));
      setMyGroups(REPORTEES_STAFF_GP);
      setActiveGroup(REPORTEES_STAFF_GP[0]);
      setActiveTab(reporteesTabData.selectedTab);
      await getReporteesFilterResults(
        panelId,
        dispatch,
        sessions,
        reporteesTabData.selectedTab?.selectedReportees,
        setClientData
      );
    } finally {
      dispatch(setProgress(100));
      dispatch(setShowProgress(false));
      setIsMyListLoading(false);
    }
  };

  React.useEffect(() => {
    if (reportessListType === 'REPORTEES_FILTERS') return;

    const patientId = sessions.user ? sessions.user.id : '';
    (async () => {
      try {
        if (reportessListType === 'REPOTEES_MYLIST') {
          setIsMyListLoading(true);
          await getMyListReportees(dispatch, sessions, reporteesData.staffId, reporteesData.roleId, setClientData);
        } else {
          await getMyListData(dispatch, sessions, setClientData);
        }
      } finally {
        setIsMyListLoading(false);
      }
    })();

    myPatientSubscription = registerEvent(
      (reportessListType === 'REPOTEES_MYLIST' ? reporteesData?.staffId : sessions?.user?.id) || '',
      'pms-ql-mylist',
      () => {
        // dispatch(setRefreshBadge(true));
      }
    );
    tabsSubscription = registerEvent(
      (reportessListType === 'REPOTEES_MYLIST' ? reporteesData?.staffId : sessions?.user?.id) || '',
      'ADDED_TABS',
      () => {
        getMyTabs();
      }
    );
    groupsSubscription = registerEvent(
      (reportessListType === 'REPOTEES_MYLIST' ? reporteesData?.staffId : sessions?.user?.id) || '',
      'ADDED_GROUPS',
      (updatedTabs) => {
        setMyGroups(updatedTabs);
      }
    );
    return () => {
      if (myPatientSubscription) unRegisterEvent(myPatientSubscription);
      if (tabsSubscription) unRegisterEvent(tabsSubscription);
      if (groupsSubscription) unRegisterEvent(groupsSubscription);
    };
  }, [sessions]);

  React.useEffect(() => {
    if (reportessListType && reportessListType !== 'REPOTEES_MYLIST') return;
    getMyGroups();
    getMyTabs();
  }, [sessions]);

  const getMyGroups = () => {
    let userId = (reportessListType === 'REPOTEES_MYLIST' ? reporteesData?.staffId : sessions?.user?.id) || '';
    getGroupsAPI(sessions, userId).then((myGroupsApi) => {
      setMyGroups(myGroupsApi);
    });
  };
  const getMyTabs = () => {
    let userId = (reportessListType === 'REPOTEES_MYLIST' ? reporteesData?.staffId : sessions?.user?.id) || '';
    getTabsAPI(sessions, userId).then((myTabsApi) => {
      if (myTabsApi.length === myTabs.length && myTabsApi.every((v, i) => v === myTabs[i])) return;
      setMyTabs(myTabsApi);
    });
  };

  // React.useEffect(() => {
  //   if (clientData.cards.length) {
  //     let userRolesData = [];
  //     let modifiedUserRolesData = userRolesData.map((each) => ({
  //       label: (allDBRoles || []).find((role) => role.value === each.value)?.label || each.value,
  //       value: each.value,
  //     }));
  //     dispatch(setMyRolesAcrossAll(modifiedUserRolesData));
  //   }
  // }, [clientData]);

  return (
    <>
      {isMylistLoading && reportessListType === 'REPOTEES_MYLIST' ? <IndeterminateLoader panelWidth={width} /> : null}
      {/* <MyListHeader paddingX="20px" className={classes.headerStyle} actionOption={headerActions} size="large" /> */}
      <MyList
        {...props}
        setAction={setAction}
        setSelectedCard={setSelectedCard}
        isLoading={isMylistLoading}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setActiveGroup={setActiveGroup}
        activeGroup={activeGroup}
        onRefreshReportees={onRefreshReportees}
        clientData={clientData}
        setClientData={setClientData}
        tabs={myTabs}
        groups={myGroups}
        sessions={sessions}
      />
      {action === 'SEARCH' ? (
        <Drawer anchor="left" className={classes.drawer} variant={'persistent'} open={action === 'SEARCH'}>
          <SearchCard handleBack={() => setAction('HOME')} />
        </Drawer>
      ) : null}
    </>
  );
}
