import { Drawer, debounce } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { getNameInitials } from '../../../Common/Common.functions';
import { useDFEvent, useDFGoBack } from '../../../DisplayFramework/Events/DFEvents';
import { setRoleToClient } from '../../../DisplayFramework/State/Slices/AccessPermissionsSlice';
import { setClientData, setClientId, setMyTeamData } from '../../../DisplayFramework/State/Slices/DashboardSlice';
import { IRootState } from '../../../DisplayFramework/State/store';
import IconWithInitial from '../../LibraryComponents/IconWithInitial/IconWithInitial';
import IndeterminateLoader from '../../LibraryComponents/InderminateLoader/InderminateLoader';
import MUIButton from '../../LibraryComponents/MUIButton/MUIButton';
import PanelFooter from '../../LibraryComponents/PanelFooter/PanelFooter';
import {
  CalendarIconV3,
  CrossIcon,
  FilterIcon,
  MyListIconNew,
  PartialCheckedGray,
  TenantIconSm,
} from './ReporteesListViewHome.svg';
import { IFilterData, ITab } from '../MyListPanel/ManageTab/ManageTab.types';
import { EMPTY_CLENT_DATA } from '../Windash/Windash.function';
import { canWindashOpenAnotherWindow } from '../WindashX/Windash.functions';
import { useRetreiveWindashAttribute, useWindashEvent } from '../WindashX/Windash.hooks';
import { useSetMainCardType, useWindashScreens } from '../WindashX/Windash.state';
import HeaderAccordion from './HeaderAccordion/HeaderAccordion';
import ReporteesCardGrid from './ReporteesCardGrid/ReporteesCardGrid';
import { TAB_OPTIONS, createReporteesKey, getTimestamp, reporteeFilterAPI } from './ReporteesListViewHome.function';
import { useReportees, useReporteesFilter, useReporteesTabs } from './ReporteesListViewHome.hook';
import { useStyles } from './ReporteesListViewHome.styles';
import {
  IProps,
  IReportees,
  IReporteesCountDetails,
  IReporteesFilterAPIPayload,
  IReporteesTab,
  TScreen,
  TTabOptionValue,
} from './ReporteesListViewHome.types';
import ReporteesMyList from './ReporteesMyList/ReporteesMyList';
import ReporteesTab from './ReporteesTab/ReporteesTab';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';

export default function ReporteesListViewHome(props: IProps) {
  const { childEventTrigger, sessions, selectedClient } = props;
  const { classes } = useStyles(props);
  const { id: panelId } = useCurrentPanel();
  const screensOpen = useWindashScreens();

  const {
    onAcordionOpenClose,
    onRedirectToMyReporteesList,
    setAction,
    action,
    openedAccordion,
    reporteesList,
    loadingFlag,
    loadingChild,
    countDetailsObject,
    setLoadingFlag,
    loggedUserRoles,
    roleAccordion,
    setRoleAccordion,
    activeReportee,
    setActiveReportee,
    onRedirectToThirdPartyCalendar,
  } = useReportees(props);

  const {
    statusOptions,
    allowSelect,
    selectedReportees,
    allSelectedObject,
    isAnyStaffSelected,
    setAllowSelect,
    onReporteeSelect,
    onSelectAllRoles,
    setSelectedReportees,
  } = useReporteesFilter(props, reporteesList);

  const { selectedTab, setSelectedTab } = useReporteesTabs(props, setAllowSelect);

  const dispatch = useDispatch();
  const { myTeamData } = useSelector((state: IRootState) => state.dashboard);
  const { reporteesTabs } = useSelector((state: IRootState) => state.Reportees);
  const setMainCardType = useSetMainCardType();
  const sendEvent = useDFEvent();
  const goBack = useDFGoBack();
  const { retreivedWindowRef } = useRetreiveWindashAttribute('H');
  const windashEvent = useWindashEvent();
  useEffect(() => {
    switch (action.screen) {
      case 'CREATE_FILTER':
        sendEvent('onReporteeCreateFilterClick', {
          statusOptions: statusOptions,
          loggedUserRoles: loggedUserRoles,
          editData: action.payload,
          handleOnBack: handleBackFilter,
          handleOnSave: handleSaveFilter,
        });
        break;
      case 'EDIT_FILTER':
        sendEvent('onReporteeFilterPanelClick', {
          handleOnBack: handleBackFilter,
          onSetActiveTab: onSetActiveTab,
          sessions: sessions,
          handleThreeDot: handleThreeDot,
        });
        break;
      case 'REPOTEES_MYLIST':
        windashEvent.addWindowToWindash(retreivedWindowRef, {
          id: `reportees-mylist-${action?.payload?.staffId}~${action?.payload?.roleId}`,
          title: `${action?.payload?.staffName}'s List`,
          componentName: 'ReporteesMyList',
          minHeight: 500,
          icon: <IconWithInitial icon={<MyListIconNew />} initial={getNameInitials(action?.payload?.staffName)} />,
          componentProps: {
            ...props,
            reportessListType: action.screen,
            setAction,
            reportingRoleId: action?.payload?.reportingRoleId,
            reportingStaffId: action?.payload?.reportingStaffId,
            selectedStaffName: action?.payload?.staffName,
            selectedStaffId: action?.payload?.staffId,
            selectedRoleId: action?.payload?.roleId,
            mylist: action?.payload?.mylist,
            reporteesTabData: {
              selectedTab: selectedTab,
              reporteesTabs: reporteesTabs,
              onSelecteTab: debounceTabChange,
              tabThreeDotOptions: TAB_OPTIONS,
              onTabThreeDotChange: (data: any) => onEditTab(data, 'REPORTEES_FILTERS'),
            },
          },
        });
        break;
      case 'REPORTEES_CALENDAR':
        console.log('...', action.payload);
        windashEvent.addWindowToWindash(retreivedWindowRef, {
          id: `reportees-calendar-${action?.payload?.staffId}~${action?.payload?.roleId}`,
          title: `${action?.payload?.staffName}'s Calendar`,
          componentName: 'SchedulerCalendar',
          minHeight: 500,
          icon: <IconWithInitial icon={<CalendarIconV3 />} initial={getNameInitials(action?.payload?.staffName)} />,
          componentProps: {
            ...props,
            thirdPartyUserId: action?.payload?.userId,
            // .....
            organizerRoleId: action?.payload?.roleId,
            tenantparticipantsRoleId: action?.payload?.roleId,
          },
        });
        break;
      default:
        goBack('H');
    }
  }, [action.screen, action.timestamp]);

  useEffect(() => {
    if (action.screen === 'REPORTEES') {
      clearMylistData();
    }
  }, [action.screen]);

  const clearActiveReportee = (isWindahEvent?) => {
    clearSelection();

    if (isWindahEvent) {
      canWindashOpenAnotherWindow(retreivedWindowRef, screensOpen, { minHeight: 500 }) &&
        childEventTrigger('MyList', 'MyList', 'onRefreshReportee', EMPTY_CLENT_DATA);
    } else {
      childEventTrigger('MyList', 'MyList', 'onRefreshReportee', EMPTY_CLENT_DATA);
    }
  };

  const clearSelection = () => {
    setActiveReportee('');
    const teamdata = myTeamData[0] ? [myTeamData[0]] : [];
    dispatch(setMyTeamData(teamdata));
  };

  // Deselects the Card when selectedCleint is empty
  useEffect(() => {
    if (!Object.keys(selectedClient).length) {
      clearSelection();
    }
  }, [selectedClient]);

  const handleSaveFilter = async (data: IFilterData) => {
    const { criteria, tabName, isEdit } = data;
    let payload: IReporteesFilterAPIPayload;
    if (!isEdit) {
      const selectedReporteesArr = [];
      for (const key in selectedReportees) {
        if (!Object.hasOwn(selectedReportees, key)) continue;
        const element = selectedReportees[key];
        element.forEach((data) => {
          const [roleId, staffId, _level, reportingRoleId] = data.split('~');
          if (roleId && staffId && reportingRoleId) {
            selectedReporteesArr.push({ roleId, staffId, reportingRoleId });
          }
        });
      }
      payload = {
        Action: 'ADD',
        criteria,
        tabName,
        sortingOrder: reporteesTabs.length,
        tabId: v4(),
        selectedReportees: selectedReporteesArr,
      };
    } else {
      payload = {
        ...(action?.payload ? action?.payload : {}),
        Action: 'UPDATE',
        criteria,
        tabName,
      };
    }
    const response = await reporteeFilterAPI(panelId, sessions, payload);
    if (!response) return;
    if (isEdit && selectedTab?.tabId && action?.payload?.tabId === selectedTab?.tabId) {
      setSelectedTab((pre) => ({ ...pre, criteria, tabName }));
    }
    setAllowSelect(false);
    setSelectedReportees({});
    setAction((pre) => ({ screen: pre?.previousScreen ?? 'REPORTEES', timestamp: getTimestamp() }));
    setSelectedTab(null);
  };
  const handleThreeDot = async (value: string, data: IReporteesTab, index: number) => {
    if (value === 'Edit') {
      setAction({ screen: 'CREATE_FILTER', payload: data, timestamp: getTimestamp() });
    }
    if (value === 'Delete') {
      const payload: IReporteesFilterAPIPayload = { ...data, Action: 'DELETE' };
      await reporteeFilterAPI(panelId, sessions, payload);
      if (selectedTab?.tabId && data?.tabId === selectedTab?.tabId) {
        setAction({ screen: 'REPORTEES', timestamp: getTimestamp() });
        setSelectedTab(null);
      }
    }
  };
  const onCancelFilter = () => {
    setAllowSelect(false);
    setSelectedReportees({});
    setAction({ screen: 'REPORTEES', timestamp: getTimestamp() });
  };
  const onNextFilter = () => {
    setAction({ screen: 'CREATE_FILTER', timestamp: getTimestamp() });
  };
  const handleBackFilter = () => {
    setAction((pre) => ({ screen: pre?.previousScreen ?? 'REPORTEES', timestamp: getTimestamp() }));
  };
  const onEditTab = (action: TTabOptionValue, previousScreen: TScreen) => {
    if (action === 'CREATE_FILTER') return onCreateFilter();
    if (action === 'MODIFY_FILTER') {
      setSelectedTab(null);
      setAction({ screen: 'EDIT_FILTER', timestamp: getTimestamp() });
    }
  };
  const onCreateFilter = () => {
    setAllowSelect((pre) => !pre);
    setSelectedReportees({});
    setAction({ screen: 'REPORTEES', timestamp: getTimestamp() });
    setSelectedTab(null);
  };
  const onSelecteTabSet = (data: IReporteesTab) => {
    clearActiveReportee();
    clearMylistData();
    setLoadingFlag(false);
    setSelectedTab((pre) => {
      if (pre?.tabId === data.tabId) {
        setAction({ screen: 'REPORTEES', timestamp: getTimestamp() });
        return null;
      }
      setAction({ screen: 'REPORTEES_FILTERS', timestamp: getTimestamp() });
      return data;
    });
  };

  const debounceTabChange: any = debounce(onSelecteTabSet, 800);

  const onSetActiveTab = (data: ITab) => {
    onSelecteTabSet(data as IReporteesTab);
  };

  const clearMylistData = () => {
    dispatch(setClientData({ roles: [], cards: [] }));
  };

  const onReporteeCardClick = (data: IReportees) => {
    const { roleId, staffId, staffName, uniqueKey } = data || {};
    if (activeReportee === uniqueKey) return;
    dispatch(setRoleToClient(roleId));
    dispatch(setClientId(staffId));
    setActiveReportee(uniqueKey);
    childEventTrigger('MyList', 'MyList', 'onReporteesClientSelect', {
      patientId: staffId,
      clientData: {
        client_id: staffId || '',
        client_name: staffName || '',
        tenant_id: 'amura',
        channelId: '',
      },
      type: 'reporteesSummary',
    });
    setMainCardType('');
  };

  return (
    <>
      {loadingFlag && <IndeterminateLoader panelWidth={props?.panel?.width} />}
      <div className={classes.rootRelativeContainer}>
        <section className={classes.rootContainer}>
          {reporteesTabs.length && !allowSelect ? (
            <ReporteesTab
              selectedTab={selectedTab}
              reporteesTabs={reporteesTabs}
              onSelecteTab={debounceTabChange}
              tabThreeDotOptions={TAB_OPTIONS}
              onTabThreeDotChange={(data: any) => onEditTab(data, 'REPORTEES')}
            />
          ) : (
            <section className={classes.filterPanel}>
              <MUIButton
                className={classes.filterButton}
                onClick={onCreateFilter}
                endIcon={allowSelect ? <CrossIcon /> : <FilterIcon />}
              >
                Create Filter
              </MUIButton>
            </section>
          )}
          <div className={classes.scrollBody} data-header-hidable>
            {reporteesList.map((eachData, index) => {
              const objectKey = createReporteesKey(eachData);
              const [firstReportee] = eachData.uniqueKey.split('###');
              const [_, reportingRoleId] = firstReportee.split('~');
              const isLevelFirstChild = eachData.level === 1 && eachData?.firstChild;
              const countDetails: IReporteesCountDetails | null = isLevelFirstChild ? countDetailsObject[reportingRoleId] : null;
              const curKey = `${objectKey}~${reportingRoleId}`;
              const isRoleAccorOpen = Boolean(roleAccordion[firstReportee]);
              return (
                <>
                  {isLevelFirstChild ? (
                    <HeaderAccordion
                      key={'HEADER' + eachData?.uniqueKey}
                      allowSelect={allowSelect}
                      countDetails={countDetails}
                      roleId={reportingRoleId}
                      tenantName={'Amura'}
                      tenantIcon={<TenantIconSm />}
                      isOpen={isRoleAccorOpen}
                      onOpenStatusChange={() => {
                        setRoleAccordion((pre) => ({ ...pre, [firstReportee]: !isRoleAccorOpen }));
                      }}
                      onSelectAllRoles={() => {
                        onSelectAllRoles(allSelectedObject[firstReportee] !== 'CHECKED', firstReportee);
                      }}
                      isAllSelected={Boolean(allSelectedObject[firstReportee] === 'CHECKED')}
                      checkboxIcon={allSelectedObject[firstReportee] === 'PARTIAL_CHECKED' ? <PartialCheckedGray /> : undefined}
                    />
                  ) : null}
                  <div key={'BODY' + eachData?.uniqueKey} className={classes.reporteeGrid} data-visible={isRoleAccorOpen}>
                    <ReporteesCardGrid
                      {...eachData}
                      active={activeReportee === eachData.uniqueKey}
                      onReporteeCardClick={() => onReporteeCardClick(eachData)}
                      blueDot={eachData.blueDot}
                      inDirectBlueDot={eachData.inDirectBlueDot}
                      staffName={eachData.staffName}
                      onClick={() => {
                        onAcordionOpenClose(eachData, index, firstReportee, setSelectedReportees);
                      }}
                      onDescriptionClick={() => {
                        clearActiveReportee(true);
                        onRedirectToMyReporteesList(eachData);
                      }}
                      onCalenderClick={() => {
                        console.log('TRIGGEREING');
                        onRedirectToThirdPartyCalendar(eachData);
                      }}
                      onMyPageClick={() => {}}
                      isOpen={Boolean(openedAccordion[eachData.uniqueKey])}
                      isLoading={Boolean(loadingChild[objectKey])}
                      allowSelect={allowSelect}
                      selected={Boolean(selectedReportees[firstReportee]?.includes(curKey))}
                      handleSelect={(data) => onReporteeSelect(data, firstReportee, curKey)}
                    />
                  </div>
                </>
              );
            })}
          </div>
          {isAnyStaffSelected && allowSelect ? (
            <PanelFooter
              customStyle={classes.footerStyle}
              leftButtonText={'Cancel'}
              righButtontText={'Next'}
              handleLeftButton={onCancelFilter}
              handleRightButton={onNextFilter}
            />
          ) : null}
        </section>
        {action.screen === 'REPORTEES_FILTERS' ? (
          <Drawer anchor="left" className={classes.innerOverlapDrawer} variant={'persistent'} open>
            <ReporteesMyList
              {...props}
              reportessListType={action.screen}
              setAction={setAction}
              reportingRoleId={action?.payload?.reportingRoleId}
              reportingStaffId={action?.payload?.reportingStaffId}
              selectedStaffName={action?.payload?.staffName}
              selectedStaffId={action?.payload?.staffId}
              selectedRoleId={action?.payload?.roleId}
              mylist={action?.payload?.mylist}
              reporteesTabData={{
                selectedTab: selectedTab,
                reporteesTabs: reporteesTabs,
                onSelecteTab: debounceTabChange,
                tabThreeDotOptions: TAB_OPTIONS,
                onTabThreeDotChange: (data: any) => onEditTab(data, 'REPORTEES_FILTERS'),
              }}
            />
          </Drawer>
        ) : null}
      </div>
    </>
  );
}
