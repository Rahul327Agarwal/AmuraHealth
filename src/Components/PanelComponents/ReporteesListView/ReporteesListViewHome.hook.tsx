import React, { useEffect, useMemo, useState } from 'react';

import { useDispatch } from 'react-redux';
import { setReporteesTabs } from '../../../DisplayFramework/State/Slices/ReporteesSlice';
// import { getStatusForAllRoles } from '../MyListPanel/ManageStatus/ManageStatus.function';
import { IUserBluedot } from '../MyListPanel/MyList/MyList.types';
import {
  createReporteesKey,
  getMyReporteesTabs,
  getReporteesList,
  getTimestamp,
  updateTheBackupList,
} from './ReporteesListViewHome.function';
import {
  IAccordionObject,
  IAction,
  ICountDetailsObject,
  IProps,
  IReportees,
  IReporteesObject,
  IReporteesResponse,
  IReporteesTab,
  ISelectedChecked,
  ISelectedReportees,
  IStatusOptions,
  globalReporteesList,
} from './ReporteesListViewHome.types';

import { atom, useAtom } from 'jotai';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';
import { getStatusForAllRoles } from '../../LibraryComponents/NameCard/StatusManager/StatusManager.functions';
export const activeReporteeCardAtom = atom<string>('');

export function useReportees(props: IProps) {
  const { sessions, registerEvent, unRegisterEvent, childEventTrigger } = props;
  const { id: panelId } = useCurrentPanel();
  const [loadingFlag, setLoadingFlag] = useState(true);
  const [reporteesList, setReporteesList] = useState<IReportees[]>([]);
  const [openedAccordion, setOpenedAccordion] = useState<IAccordionObject>({});
  const [reporteesBackupList, setReporteesBackupList] = useState<IReporteesObject>({});
  const [countDetailsObject, setCountDetailsObject] = useState<ICountDetailsObject>({});
  const [action, setAction] = useState<IAction>({ screen: 'REPORTEES', timestamp: getTimestamp() });
  const [loadingChild, setLoadingChild] = useState<IAccordionObject>({});
  const [isAnyLoading, setIsAnyLoading] = useState<boolean>(false);
  const [loggedUserRoles, setLoggedUserRoles] = useState<string[]>([]);
  const [roleAccordion, setRoleAccordion] = useState<IAccordionObject>({});
  const [activeReportee, setActiveReportee] = useAtom(activeReporteeCardAtom);
  const [updatedBluedot, setUpdatedBluedot] = useState<IUserBluedot | null>(null);
  let subscriptionList: any = null;
  useEffect(() => {
    subscriptionList = registerEvent(sessions.user.id, 'ReporteesList', (list: IReporteesResponse) => {
      // setReporteesBackupList((pre) => {
      //   const copyreporteesList = JSON.parse(JSON.stringify(pre));
      //   const updatedReportees = createReporteesObject(copyreporteesList, list);
      //   globalReporteesList.reporteesBackup = { ...pre, ...updatedReportees };
      //   return { ...pre, ...updatedReportees };
      // });
    });
    getLevel0Reportees();
    return () => {
      if (subscriptionList) unRegisterEvent(subscriptionList);
    };
  }, []);

  let blueDotListener: any;
  useEffect(() => {
    blueDotListener = registerEvent(props.sessions?.user.id, 'BLUEDOT', (bluedot: IUserBluedot) => {
      console.log('Received bluedot in reportees list', bluedot);
      setUpdatedBluedot(JSON.parse(JSON.stringify(bluedot)));
    });
    return () => {
      if (blueDotListener) unRegisterEvent(blueDotListener);
    };
  }, []);

  useEffect(() => {
    if (updatedBluedot) {
      updateBluedot(updatedBluedot);
    }
  }, [updatedBluedot]);

  const updateBluedot = (bluedot: IUserBluedot) => {
    let [tenantId, patientId] = bluedot.partKey.split('~');
    let [roleId, staffId, bluedotId] = bluedot.sortKey.split('~');
    let ownerId = bluedot.ownerId;
    let ownerRoleId = bluedot.ownerRoleId;
    let reportess = JSON.parse(JSON.stringify(globalReporteesList.reporteesList));
    reportess = reportess.map((reportee: any) => {
      if (bluedot.notifiedUsers.indexOf(`${reportee.staffId}~${reportee.roleId}`) > -1) {
        let count = 0;
        if (bluedot.action === 'ADD') {
          count = 1;
        }
        if (bluedot.action === 'RESOLVED') {
          count = -1;
        }
        if (bluedot.action === 'TRANSFERRED') {
          count = -1;
        }
        let isFirstTimeTransferred = !Boolean(bluedot?.isTransferred || false);
        if (!isFirstTimeTransferred) {
          reportee.inDirectBlueDot = reportee.inDirectBlueDot + count;
        }
        if (isFirstTimeTransferred) {
          reportee.blueDot = reportee.blueDot + count;
        }
        const countDetailsTemp: ICountDetailsObject = JSON.parse(JSON.stringify(countDetailsObject));
        if (!isFirstTimeTransferred) {
          countDetailsTemp[roleId].indirectBlueDotCount = countDetailsTemp[roleId].indirectBlueDotCount + count;
        }
        if (isFirstTimeTransferred) {
          countDetailsTemp[roleId].blueDot = countDetailsTemp[roleId].blueDot + count;
        }
        setCountDetailsObject(countDetailsTemp);
        return reportee;
        // }
        // if (`${reportee.staffId}~${reportee.roleId}` !== `${ownerId}~${ownerRoleId}`) {
        //   reportee.inDirectBlueDot = reportee.inDirectBlueDot + count;
        //   return reportee;
        // }
      }
      return reportee;
    });
    let backUpList = updateTheBackupList(globalReporteesList.reporteesBackup, bluedot);
    setReporteesBackupList(backUpList);
    globalReporteesList.reporteesBackup = JSON.parse(JSON.stringify(backUpList));
    globalReporteesList.reporteesList = JSON.parse(JSON.stringify(reportess));
    setReporteesList(JSON.parse(JSON.stringify(reportess)));
  };

  useEffect(() => {
    setIsAnyLoading(false);
  }, [reporteesList]);

  const getLevel0Reportees = async () => {
    try {
      setLoadingFlag(true);
      const payload = { staffId: sessions.user.id, level: 0, notify: false };
      const { reportees, countDetails } = await getReporteesList(panelId, payload, sessions.id_token);
      const reportingRoleIds = new Set([]);
      const modifiedRes = reportees.map((data) => {
        let [firstKey] = data.uniqueKey.split('###');
        const [reportingStaffId, reportingRoleId] = firstKey.split('~');
        reportingRoleIds.add(reportingRoleId);
        return { ...data, uniqueKey: `${firstKey}###${data.staffId}~${data.roleId}` };
      });
      setLoggedUserRoles(Array.from(reportingRoleIds));
      const countDetailsTemp = {};
      countDetails.forEach((data) => (countDetailsTemp[data.roleId] = data));
      setCountDetailsObject(countDetailsTemp);
      globalReporteesList.reporteesList = JSON.parse(JSON.stringify(modifiedRes || []));
      setReporteesList(modifiedRes || []);
    } finally {
      setLoadingFlag(false);
    }
  };

  const onAcordionOpenClose = async (
    data: IReportees,
    curIndex: number,
    firstReportee: string,
    setSelectedReportees: React.Dispatch<React.SetStateAction<ISelectedReportees>>
  ) => {
    const { staffId, roleId, level, hasChildren, lastChild, parentLastChildIndex = [], uniqueKey } = data;
    const objectKey = createReporteesKey(data);
    try {
      if (loadingChild[objectKey] || isAnyLoading) return;
      setIsAnyLoading(true);
      setLoadingChild((pre) => ({ ...pre, [objectKey]: true }));
      let subReportees = reporteesBackupList[objectKey];
      const isOpen = !Boolean(openedAccordion[data.uniqueKey]);
      if (isOpen && hasChildren && !subReportees) {
        const payload = { staffId, roleId, level, notify: false };
        const reporteeRes = await getReporteesList(panelId, payload, sessions.id_token);
        const modifiedReportees = reporteeRes.reportees.map((value) => {
          return {
            ...value,
            parentIsLastChild: lastChild,
            parentLastChildIndex: lastChild ? [...parentLastChildIndex, level - 1] : parentLastChildIndex,
            uniqueKey: `${uniqueKey}###${value.uniqueKey}`,
          };
        });
        const subReporteesKey = createReporteesKey(reporteeRes);
        setReporteesBackupList((pre) => {
          globalReporteesList.reporteesBackup = { ...pre, [subReporteesKey]: modifiedReportees };
          return { ...pre, [subReporteesKey]: modifiedReportees };
        });
        subReportees = modifiedReportees;
      }
      setReporteesList((pre) => {
        let copypreReportees: IReportees[] = JSON.parse(JSON.stringify(pre));
        if (!subReportees?.length) return pre;
        const accordion: IAccordionObject = { [data.uniqueKey]: isOpen };
        if (isOpen) {
          copypreReportees.splice(curIndex + 1, 0, ...subReportees);
        } else {
          const removedStaffs = [];
          copypreReportees = copypreReportees.filter((d1) => {
            const objectKey = createReporteesKey(d1);
            const [_, reportingRoleId] = firstReportee.split('~');
            if (uniqueKey === d1.uniqueKey) return true;
            const uniqueArr = d1.uniqueKey.split('###');
            const currCondition = uniqueArr.some((d) => d === `${staffId}~${roleId}`);

            if (currCondition) {
              accordion[d1.uniqueKey] = false;
              removedStaffs.push(`${objectKey}~${reportingRoleId}`);
            }
            return !currCondition;
          });
          setSelectedReportees((pre) => {
            const copyPre = JSON.parse(JSON.stringify(pre));
            const selectedArray = new Set(copyPre[firstReportee] || []);
            removedStaffs.forEach((data) => {
              selectedArray.delete(data);
            });
            return { ...copyPre, [firstReportee]: Array.from(selectedArray) };
          });
        }
        setOpenedAccordion((pre) => ({ ...pre, ...accordion }));
        globalReporteesList.reporteesList = JSON.parse(JSON.stringify(copypreReportees));
        return copypreReportees;
      });
    } finally {
      setLoadingChild((pre) => ({ ...pre, [objectKey]: false }));
    }
  };

  const onRedirectToMyReporteesList = async (data: IReportees) => {
    setLoadingFlag(true);
    const { staffId, roleId, staffName } = data;
    const [firstCard] = data.uniqueKey.split('###');
    const [reportingStaffId, reportingRoleId] = firstCard.split('~');
    setAction({
      screen: 'REPOTEES_MYLIST',
      payload: { staffId, roleId, reportingStaffId, reportingRoleId, staffName },
      timestamp: getTimestamp(),
    });
    setLoadingFlag(false);
  };

  const onRedirectToThirdPartyCalendar = async (data: IReportees) => {
    setLoadingFlag(true);
    const { staffId, roleId, staffName } = data;
    const [firstCard] = data.uniqueKey.split('###');
    const [reportingStaffId, reportingRoleId] = firstCard.split('~');
    setAction({
      screen: 'REPORTEES_CALENDAR',
      payload: { userId: staffId, staffId, roleId, reportingStaffId, reportingRoleId, staffName },
      timestamp: getTimestamp(),
    });
    setLoadingFlag(false);
  };
  const onRefresh = () => {
    setReporteesList([]);
    setTimeout(() => {
      getLevel0Reportees();
    }, 0);
  };

  return {
    onAcordionOpenClose,
    onRedirectToMyReporteesList,
    setAction,
    action,
    openedAccordion,
    reporteesList,
    loadingFlag,
    loadingChild,
    reporteesBackupList,
    countDetailsObject,
    loggedUserRoles,
    setReporteesList,
    getLevel0Reportees,
    setLoadingFlag,
    roleAccordion,
    setRoleAccordion,
    setOpenedAccordion,
    activeReportee,
    onRedirectToThirdPartyCalendar,
    setActiveReportee,
  };
}

export function useReporteesFilter(props: IProps, reporteesList: IReportees[]) {
  const [allowSelect, setAllowSelect] = useState(false);
  const [selectedReportees, setSelectedReportees] = useState<ISelectedReportees>({});
  const [statusOptions, setStatusOptions] = useState<IStatusOptions[]>([]);
  const { id: panelId } = useCurrentPanel();
  const { allSelectedObject, level1ReporteesRoleObj, isAnyStaffSelected } = useMemo(() => {
    const level1ReporteesRoleObj: ISelectedReportees = {};
    const allSelectedObject: ISelectedChecked = {};
    let isAnyStaffSelected: boolean = false;
    reporteesList.forEach((data) => {
      const objectKey = createReporteesKey(data);
      const [firstReportee] = data?.uniqueKey?.split('###');
      const [_, reportingRoleId] = firstReportee.split('~');
      level1ReporteesRoleObj[firstReportee] = [
        ...(level1ReporteesRoleObj[firstReportee] || []),
        `${objectKey}~${reportingRoleId}`,
      ];
    });
    for (const key in level1ReporteesRoleObj) {
      if (!Object.prototype.hasOwnProperty.call(level1ReporteesRoleObj, key)) continue;
      const element = level1ReporteesRoleObj[key] || [];
      const selected = selectedReportees[key] || [];
      allSelectedObject[key] = !selected?.length
        ? 'UNCHECKED'
        : element.length === selected.length
        ? 'CHECKED'
        : 'PARTIAL_CHECKED';
      if (!isAnyStaffSelected && selected?.length) {
        isAnyStaffSelected = true;
      }
    }
    return { allSelectedObject, level1ReporteesRoleObj, isAnyStaffSelected };
  }, [reporteesList, selectedReportees]);

  useEffect(() => {
    getStatusOptions();
  }, []);

  const getStatusOptions = async () => {
    const response: any = await getStatusForAllRoles(panelId, 'amura', 'amura_guidance_counselor_level1', props);
    if (response?.edgeColor) {
      const options = response?.edgeColor?.map(({ label, value }) => ({ label, value }));
      setStatusOptions(options);
    }
  };

  const onReporteeSelect = (selected: boolean, firstReportee: string, objectKey: string) => {
    setSelectedReportees((pre) => {
      const copyPre = JSON.parse(JSON.stringify(pre));
      const selectedArray = new Set(copyPre[firstReportee] || []);
      if (selected) {
        selectedArray.add(objectKey);
      } else {
        selectedArray.delete(objectKey);
      }

      return { ...copyPre, [firstReportee]: Array.from(selectedArray) };
    });
  };

  const onSelectAllRoles = (selected: boolean, firstReportee: string) => {
    setSelectedReportees((pre) => {
      const copyPre = JSON.parse(JSON.stringify(pre));
      if (selected) {
        return { ...copyPre, [firstReportee]: level1ReporteesRoleObj[firstReportee] ?? [] };
      } else {
        return { ...copyPre, [firstReportee]: [] };
      }
    });
  };

  return {
    statusOptions,
    allowSelect,
    allSelectedObject,
    selectedReportees,
    isAnyStaffSelected,
    setAllowSelect,
    onReporteeSelect,
    onSelectAllRoles,
    setSelectedReportees,
  };
}

export function useReporteesTabs(props: IProps, setAllowSelect: React.Dispatch<React.SetStateAction<boolean>>) {
  const { sessions, registerEvent, unRegisterEvent } = props;
  const { id: panelId } = useCurrentPanel();
  const [selectedTab, setSelectedTab] = useState<IReporteesTab>(null);
  // const [reporteesTabs, setReporteesTabs] = useState<IReporteesTab[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    let tabsSubscription;
    getReporteesTabs();

    tabsSubscription = registerEvent(sessions?.user?.id, 'ADDED_REPORTEES_TABS', (updatedTabs) => {
      getReporteesTabs();
    });

    return () => {
      if (tabsSubscription) unRegisterEvent(tabsSubscription);
    };
  }, []);

  const getReporteesTabs = async () => {
    const response = await getMyReporteesTabs(panelId, sessions);
    if (response) {
      setAllowSelect(false);
      dispatch(setReporteesTabs(response));
    }
  };

  return { selectedTab, setSelectedTab };
}
