import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List } from 'react-window';

import { debounce } from 'lodash';
import { IUserNameObj, getUserNameFromES } from '../../../../Common/Common.functions';
import SuccessToaster from '../../../../Common/SuccessToaster';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { useDeepLinkCustomAction } from '../../../../DisplayFramework/DeepLink/DeepLinkProcessor/DeepLinkEventManager';
import { useDFEvent } from '../../../../DisplayFramework/Events/DFEvents';
import { setRoleToClient } from '../../../../DisplayFramework/State/Slices/AccessPermissionsSlice';
import { setChannelMessagesList } from '../../../../DisplayFramework/State/Slices/ChatSlice';
import {
  resetSelectedClientObject,
  setAllRoles,
  setAllTenants,
  setClientId,
  setMyTeamData,
  setMyTeamOverFlowData,
  setSelectedClientObject,
} from '../../../../DisplayFramework/State/Slices/DashboardSlice';
import { setMyList } from '../../../../DisplayFramework/State/Slices/MyListSlice';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { useScrollDetection } from '../../../../Utilities/Hooks';
import BasicFilter from '../../../LibraryComponents/BasicFilter/BasicFilter';
import { belongsToGCL2 } from '../../../LibraryComponents/GCDashboard/GCDashboard.function';
import ListDropdownHeader from '../../../LibraryComponents/ListDropdownHeader/ListDropdownHeader';
import { EMPTY_CLENT_DATA } from '../../../LibraryComponents/ListDropdownHeader/ListDropdownHeader.function';
import { ListHeaderDropdownTypes, TCardAssign } from '../../../LibraryComponents/ListDropdownHeader/ListDropdownHeader.types';
import MUIBlockTabs from '../../../LibraryComponents/MUIBlockTabs/MUIBlockTabs';
import MUISkeleton from '../../../LibraryComponents/MUISkeleton/MUISkeleton';
import { getStatusForAllRoles } from '../../../LibraryComponents/NameCard/StatusManager/StatusManager.functions';
import { TenantIconSm } from '../MyListPanel.svg';
import { REPORTEES_STAFF_GP } from '../../ReporteesListView/ReporteesListViewHome.function';
import { IReporteesTab } from '../../ReporteesListView/ReporteesListViewHome.types';
import ReporteesMyListHeader from '../../ReporteesListView/ReporteesMyListHeader/ReporteesMyListHeader';
import ReporteesTab from '../../ReporteesListView/ReporteesTab/ReporteesTab';
import MyListCard from '../CardComponent/MyListCard';
import { getRoleId, updateGreenDotAPI } from '../CardComponent/MylistCard.functions';
import { defaultFilterState } from '../FilterCard/FilterCard.function';
import { MyAccordionView } from '../GroupedMylist';
import { MyListProps } from '../MyListHome.types';
import { globalChannelVariables, initialMessageObject } from './../../Chat/Chat.types';
import {
  DEFAULT_TAB,
  TAB_THREEDOT_OPTIONS,
  belongToDataEntry,
  belongToGCTeam,
  belongToTATeam,
  exportMyListAsCSV,
  getFilteredMyList,
  getIndices,
  getMyListData,
  getMyListEvent,
  getMyListMoveCards,
  getMyListObject,
  getStatusOfClient,
} from './MyList.function';
import { useStyles } from './MyList.styles';
import {
  IAssignDB,
  IBlueDotsStatus,
  ICard,
  IEventCard,
  IEventLastMessage,
  IEventLastMessageForBooked,
  IMoveCard,
  IMoveCardLastMessage,
  INameCard,
  IStatus,
  IUserBluedot,
  IUserGreendot,
} from './MyList.types';

const initColorFilter = {
  isEmergency: true,
  // isExpired: true,
  isBluedot: true,
  isNewMessages: true,
};

const resetColorFilter = {
  isEmergency: false,
  // isExpired: false,
  isBluedot: false,
  isNewMessages: false,
};

export default function MyList(props: MyListProps) {
  const loggedInUserInformation = useSelector((state: IRootState) => state.displayFrameWork.loggedInUserInformation);
  const selectedPatientId = useSelector((state: IRootState) => state.dashboard.patientId);

  const {
    setSelectedCard,
    setAction,
    childEventTrigger,
    activeTab,
    setActiveTab,
    sessions,
    registerEvent,
    unRegisterEvent,
    reportessListType,
    reporteesData,
    reporteesTabData,
    activeGroup,
    setActiveGroup,
    onRefreshReportees,
    clientData,
    setClientData,
    tabs: myTabs,
    groups: myGroups,
  } = props;
  const triggerEvent = useDFEvent();

  const { classes } = useStyles(props);
  const [searchString, setSearchString] = useState('');
  const [selectedDropdown, setSelectedDropdown] = useState<ListHeaderDropdownTypes>(reporteesData ? 'reportees' : 'people');
  const [isExtend, setIsExtend] = useState(false);
  const [colorFilter, setColorFilter] = useState(initColorFilter);
  const [cardData, setCardData] = useState([] as Array<ICard>);
  const [tempFilteredData, setTempFilteredData] = useState([] as Array<ICard>);
  const [tabsTitle, setTabsTitle] = useState([DEFAULT_TAB]);
  const [edgeColors, setEdgeColors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [accordiansState, setAccordiansState] = useState({} as any);
  const [groupedIndexes, setGroupedIndexes] = useState({} as any);
  const [groupedListCount, setGroupedListCount] = useState(0);
  const [groupedCardData, setGroupedCardData] = useState({} as any);
  const [cardAssignType, setCardAssignType] = useState<TCardAssign>(null);
  const { id: panelId } = useCurrentPanel();
  const [mainListScrollTop, setMainListScrollTop] = useState(0);
  const debouncedSetMainListScrollTop = useRef(debounce(setMainListScrollTop, 400));

  const [groupedDataComponent, setGroupedDataComponent] = useState({} as any);
  const [userNameObj, setUserNameObj] = useState<IUserNameObj>({});

  const dispatch = useDispatch();
  const listRef = useRef<List>(null);
  let myTeamData = useSelector((state: IRootState) => state.dashboard.myTeamData);
  let selectedClientObject: ICard = useSelector((state: IRootState) => state.dashboard.selectedClientObject);
  let allTenants = useSelector((state: IRootState) => state.dashboard.allTenants);
  const myRolesAcrossAllTenants = useSelector((state: IRootState) => state.dashboard.myRolesAcrossTenants);
  const { showProgress } = useSelector((state: IRootState) => state.Reportees);
  let blueDotListener: any;
  let cardListener: any;
  let statusListener: any;
  let eventListener: any;
  let moveCardListener: any;
  let eventExpiryListener: any;
  let blueDotExpiredListener: any;
  let greenDotListener: any;

  const { isPanelScrolled } = useScrollDetection();

  /**
   * Refresh State
   */
  const [updatedStatus, setUpdatedStatus] = useState<IStatus | null>();
  const [updatedCard, setUpdatedCard] = useState<IAssignDB | null>();
  const [updatedBluedot, setUpdatedBluedot] = useState<IUserBluedot>();
  const [updatedEvent, setUpdatedEvent] = useState<IEventLastMessage | IEventLastMessageForBooked>();
  const [updatedMoveCard, setUpdatedMoveCard] = useState<IMoveCardLastMessage>();
  const [expiredEvent, setExpiredEvent] = useState<IEventCard>();
  const [updateBlueDotExpired, seUpdateBlueDotExpired] = useState<INameCard | null>();
  const [updatedGreenDot, setUpdatedGreenDot] = useState<IUserGreendot>();

  //runs the function first and don't run if we get repeated calls within 2000ms
  const debounceSetCardData = debounce(
    (filteredList) => {
      setCardData(filteredList);
    },
    2000,
    { leading: true, trailing: false }
  );

  let { myList } = useSelector((state: IRootState) => state.MyList);
  useDeepLinkCustomAction<'my-list-card'>(
    'my-list-card',
    (data, e, notifyComplete) => {
      const cardId = data.cardId;
      if (!cardData.length) return;
      //
      const cardIndex = cardData?.findIndex((e) => e.id.split('~')[1].trim() === cardId);

      if (cardIndex !== -1) {
        listRef.current?.scrollToItem(cardIndex, 'center');
        setTimeout(() => {
          try {
            (
              document.querySelector(`[data-mylist] > div > div > #ITEM${cardId.replaceAll('-', '')} > div > div`) as any
            )?.click();
          } catch {}
          notifyComplete();
        }, 1000);
      } else {
        notifyComplete({ isError: true });
      }
    },
    [cardData]
  );

  const updateStatus = async (updatedState: IStatus) => {
    let data = JSON.parse(JSON.stringify(clientData.cards));

    data = data.map((value: ICard) => {
      let { tenantId, patientId, roleId, statusType } = updatedStatus;
      if (
        value.type === 'nameCard' &&
        (value as INameCard).additionalKeys.patientId === patientId &&
        value.roleId === roleId &&
        value.tenantId === tenantId
      ) {
        (value as INameCard).additionalKeys.status = (value as INameCard).additionalKeys.status.map((statuses) => {
          if (statuses.statusType === statusType) {
            return { ...statuses, current_status: updatedStatus.current_status };
          }
          return statuses;
        });
        return value;
      }
      //TO DO PROPS ARE NOT AVAILBEL//

      //  else if (
      //   value.type === 'moveCard' &&
      //   (value as IMoveCard).additionalKeys.cardId === cardId &&
      //   value.roleId === roleId &&
      //   value.tenantId === tenantId
      // ) {
      //   (value as IMoveCard).additionalKeys.status = (value as INameCard).additionalKeys.status.map((statuses) => {
      //     if ((statuses.statusType = statusType)) {
      //       return { ...statuses, current_status: updatedStatus.current_status };
      //     }
      //     return statuses;
      //   });
      //   return value;
      else {
        return value;
      }
    });
    // when client data is changed the useEffect with clientData dep will run and set the Card data
    setClientData((pre) => ({ cards: data, roles: pre.roles }));

    // if (updatedState.patientId === selectedPatientId) {
    //   triggerEvent('showingEmpty', {});
    // }
  };

  useEffect(() => {
    if (updatedStatus) {
      updateStatus(updatedStatus);
    }
  }, [updatedStatus]);

  const updateBluedot = async (bluedot: IUserBluedot) => {
    let data = JSON.parse(JSON.stringify(clientData.cards));
    let [tenantId, patientId] = bluedot.partKey.split('~');
    let [roleId, staffId, bluedotId] = bluedot.sortKey.split('~');
    let { ownerId, ownerRoleId } = bluedot;
    let newCard = await getMyListObject(
      patientId,
      reporteesData?.roleId || ownerRoleId || roleId,
      tenantId,
      props.sessions,
      reporteesData?.staffId || ownerId || staffId
    );
    let onlyCardData = newCard.cards[0] || {};
    data = data.map((value: INameCard) => {
      if (
        value.type === 'nameCard' &&
        (value as INameCard).additionalKeys.patientId === patientId &&
        value.roleId === (reporteesData?.roleId || ownerRoleId || roleId) &&
        value.tenantId === tenantId &&
        Object.keys(onlyCardData).length > 0
      ) {
        let currentClientData: INameCard = selectedClientObject as INameCard;
        if (
          value.additionalKeys.patientId === currentClientData?.additionalKeys?.patientId &&
          value.tenantId === currentClientData?.tenantId &&
          value.roleId === currentClientData?.roleId
        ) {
          dispatch(setSelectedClientObject(JSON.parse(JSON.stringify(onlyCardData))));
        }
        return onlyCardData;
      } else {
        return value;
      }
    });
    // when client data is changed the useEffect with clientData dep will run and set the Card data
    setClientData((pre) => ({ cards: data, roles: pre.roles }));
  };

  const updateGreenDot = async (greenDot: IUserGreendot) => {
    let data = JSON.parse(JSON.stringify(clientData.cards));
    let [tenantId, patientId] = greenDot.partKey.split('~');
    let [roleId, staffId] = greenDot.sortKey.split('~');
    let newCard = await getMyListObject(patientId, roleId, tenantId, props.sessions, staffId);
    let onlyCardData = newCard.cards[0] || {};
    data = data.map((value: INameCard) => {
      if (
        value.type === 'nameCard' &&
        (value as INameCard).additionalKeys.patientId === patientId &&
        value.roleId === roleId &&
        value.tenantId === tenantId &&
        Object.keys(onlyCardData).length > 0
      ) {
        let currentClientData: INameCard = { ...selectedClientObject } as INameCard;
        if (
          value.additionalKeys.patientId === currentClientData?.additionalKeys?.patientId &&
          value.tenantId === currentClientData?.tenantId &&
          value.roleId === currentClientData?.roleId &&
          value.additionalKeys.hierarchyId === currentClientData?.additionalKeys?.hierarchyId
        ) {
          let updateGreenDot = { ...onlyCardData };
          updateGreenDot.additionalKeys.greenDotCount = 0;
          updateGreenDotAPI(updateGreenDot, sessions);
          updateGreenDot = JSON.parse(JSON.stringify(currentClientData));
          updateGreenDot.additionalKeys.greenDotCount = 0;
          return updateGreenDot;
        }
        return onlyCardData;
      } else {
        return value;
      }
    });
    // when client data is changed the useEffect with clientData dep will run and set the Card data
    setClientData((pre) => ({ cards: data, roles: pre.roles }));
  };

  useEffect(() => {
    if (updatedBluedot) {
      updateBluedot(updatedBluedot);
    }
  }, [updatedBluedot]);

  useEffect(() => {
    if (updatedGreenDot) {
      updateGreenDot(updatedGreenDot);
    }
  }, [updatedGreenDot]);

  const updateBlueDotExpiredCard = async (expiredCard: INameCard) => {
    let data = JSON.parse(JSON.stringify(clientData.cards));
    const { id, createdOn, title, searchString, tenantId, roleId, staffId, type } = expiredCard || {};
    const { firstName, lastName, nickName, mobileNumber, hierarchyId, patientId, bluedots, status } =
      expiredCard.additionalKeys || {};

    let newCard = await getMyListObject(patientId, roleId, tenantId, props.sessions, staffId);

    let onlyCardData = newCard.cards[0] || {};
    data = data.map((value: INameCard) => {
      if (
        value.type === 'nameCard' &&
        (value as INameCard).additionalKeys.patientId === patientId &&
        value.roleId === roleId &&
        value.tenantId === tenantId &&
        Object.keys(onlyCardData).length > 0
      ) {
        let currentClientData: INameCard = selectedClientObject as INameCard;
        if (
          value.additionalKeys.patientId === currentClientData?.additionalKeys?.patientId &&
          value.tenantId === currentClientData?.tenantId &&
          value.roleId === currentClientData?.roleId
        ) {
          dispatch(setSelectedClientObject(JSON.parse(JSON.stringify(onlyCardData))));
        }
        return onlyCardData;
      } else {
        return value;
      }
    });
    // when client data is changed the useEffect with clientData dep will run and set the Card data
    setClientData((pre) => ({ cards: data, roles: pre.roles }));
  };

  useEffect(() => {
    if (updateBlueDotExpired) {
      updateBlueDotExpiredCard(updateBlueDotExpired);
    }
  }, [updateBlueDotExpired]);
  useEffect(() => {
    if (updatedEvent) {
      updateEvent(updatedEvent);
    }
  }, [updatedEvent]);
  useEffect(() => {
    if (expiredEvent) {
      removeEventIfExpired(expiredEvent);
    }
  }, [expiredEvent]);

  useEffect(() => {
    if (updatedCard) {
      updateCard(updatedCard);
    }
  }, [updatedCard]);

  useEffect(() => {
    if (updatedMoveCard) {
      updateMoveCard(updatedMoveCard);
    }
  }, [updatedMoveCard]);

  const updateMoveCard = async (updatedMoveCard: IMoveCardLastMessage) => {
    let data = JSON.parse(JSON.stringify(clientData.cards));
    // let { ownerId, ownerRoleId } = updatedMoveCard;

    try {
      if (updatedMoveCard.task === 'ADD') {
        let newCard = await getMyListMoveCards(
          updatedMoveCard?.cardId,
          updatedMoveCard?.roleId,
          updatedMoveCard?.tenantId,
          props.sessions,
          updatedMoveCard?.staffId
        );

        if (newCard.cards.length) {
          data.push(newCard.cards[0]);
        }
      }
      if (updatedMoveCard.task === 'DELETE') {
        data = data.filter((value: IMoveCard) => updatedMoveCard?.cardId !== value?.additionalKeys?.cardId);
      }
      // when client data is changed the useEffect with clientData dep will run and set the Card data
      setClientData((pre) => ({ cards: data, roles: pre.roles }));
    } catch (error) {
      console.log(error);
    }
  };

  const updateCard = async (addedCard: IAssignDB) => {
    let data = JSON.parse(JSON.stringify(clientData.cards));
    let tenants = JSON.parse(JSON.stringify(allTenants));
    let roles = JSON.parse(JSON.stringify(clientData.roles));
    let [tenantId, patientId] = addedCard.partKey.split('~');
    let [roleId, staffId, hierarchyId] = addedCard.sortKey.split('~');
    let { ownerId, ownerRoleId } = addedCard;
    let removedClient: any = [];
    if (addedCard.action === 'ADD' && ((reporteesData === undefined && ownerId === sessions.user.id) || reporteesData)) {
      let newCard = await getMyListObject(
        patientId,
        reporteesData?.roleId || ownerRoleId || roleId,
        tenantId,
        props.sessions,
        reporteesData?.staffId || ownerId || staffId
      );
      console.log(`Received card refresh in ${reportessListType || 'MyList'}`, newCard);
      const cardToBeAdded = newCard.cards.find((card) => card?.additionalKeys?.hierarchyId === hierarchyId);
      if (cardToBeAdded) {
        data.push(newCard.cards[0]);
      }
      if (cardToBeAdded) {
        if (roles.indexOf(newCard.roles[0]) === -1) {
          roles.push(newCard.roles[0]);
          dispatch(setAllRoles(roles.join(', ')));
        }
      }
      if (tenants.indexOf(tenantId) === -1) {
        tenants.push(tenantId);
        dispatch(setAllTenants(tenants));
      }
    }
    if (addedCard.action === 'REMOVE') {
      removedClient = data.filter(
        (value: INameCard) =>
          value.additionalKeys.patientId === patientId &&
          value.tenantId === tenantId &&
          value.roleId === (reporteesData?.roleId || ownerRoleId || roleId) &&
          value.additionalKeys.hierarchyId === hierarchyId
      );

      data = data.filter(
        (value: INameCard) =>
          !(
            value.additionalKeys.patientId === patientId &&
            value.tenantId === tenantId &&
            value.roleId === (reporteesData?.roleId || ownerRoleId || roleId) &&
            value.additionalKeys.hierarchyId === hierarchyId
          )
      );
      clearSelectedClient();
    }
    if (!(reporteesTabData?.selectedTab?.tabId || reporteesData?.roleId)) {
      dispatch(setMyList(data));
    }
    // when client data is changed the useEffect with clientData dep will run and set the Card data
    setClientData((pre) => ({ cards: data, roles: pre.roles }));

    if (removedClient && removedClient.length !== 0) {
      removedClient = removedClient[0];
      let staffName =
        !(sessions.user.id === (reporteesData?.staffId || ownerId || staffId)) &&
        (await getUserNameFromES(reporteesData?.staffId || ownerId || staffId));
      SuccessToaster(
        `${removedClient?.title} has been removed from ${
          sessions.user.id === (reporteesData?.staffId || ownerId || staffId) ? 'your' : `${staffName}'s`
        } mylist`
      );
      let currentClientData: INameCard = selectedClientObject as INameCard;
      if (
        patientId === currentClientData?.additionalKeys.patientId &&
        tenantId === currentClientData?.tenantId &&
        roleId === currentClientData?.roleId
      ) {
        dispatch(setRoleToClient(''));
        dispatch(setMyTeamData([]));
        dispatch(setClientId(''));
        dispatch(resetSelectedClientObject());
        dispatch(setChannelMessagesList(initialMessageObject));
        selectedClientObject = {} as any;
        globalChannelVariables.channelsMessagesList = initialMessageObject;
        /*Please make changes here pankaj*/
        // dispatch(setSelectedClientObject(JSON.parse(JSON.stringify({}))));
      }
    }
  };

  const updateEvent = async (addedEvent: IEventLastMessage | IEventLastMessageForBooked) => {
    const { eventId, tenantId, rsvp } = addedEvent;
    let data = JSON.parse(JSON.stringify(clientData.cards));
    try {
      if (addedEvent.task === 'ADD') {
        const response = await getMyListEvent(eventId, '', tenantId, props.sessions, props.sessions.user.id);
        if (
          response?.cards?.length &&
          !(new Date().getTime() - new Date(response.cards[0]?.additionalKeys?.toTime).getTime() >= 300000)
        ) {
          data.push(response.cards[0]);
        }
      }

      if (addedEvent.task === 'UPDATE') {
        const response = await getMyListEvent(eventId, '', tenantId, props.sessions, props.sessions.user.id);
        if (response?.cards?.length) {
          const cardExistsInMyList = data.find((card: IEventCard) => card.additionalKeys.eventId === eventId);
          const hasEventExpired = new Date().getTime() > new Date(response.cards[0]?.additionalKeys?.toTime).getTime() + 300000;
          if (!cardExistsInMyList && !hasEventExpired) {
            // when event time is updated from expired to a future time
            data.push(response.cards[0]);
          }

          if (cardExistsInMyList && hasEventExpired) {
            // when event time is updated to an expired time
            data = data.filter((card: IEventCard) => {
              if (card.additionalKeys?.eventId === eventId) {
                return false;
              } else {
                return true;
              }
            });
          }
          if (cardExistsInMyList && !hasEventExpired) {
            // when other informations than date about that event is updated
            data = data.map((card: IEventCard) => (card.additionalKeys.eventId === eventId ? response.cards[0] : card));
          }
        } else {
          data = data.filter((card: IEventCard) => {
            if (card.additionalKeys?.eventId === eventId) {
              return false;
            } else {
              return true;
            }
          });
        }
      }
      let thirdPartyUserId = reporteesData?.staffId || '';
      let rsvpdata = addedEvent?.rsvp && addedEvent?.rsvp[thirdPartyUserId];
      const visiblilty = rsvpdata ? addedEvent?.rsvp[thirdPartyUserId]?.value : '';

      if (addedEvent.task === 'DELETE' || visiblilty === 'No') {
        data = data.filter((card: IEventCard) => {
          if (card.additionalKeys?.eventId === eventId) {
            let currentClientData: IEventCard = selectedClientObject as IEventCard;
            if (currentClientData?.additionalKeys?.eventId === eventId) triggerEvent('onEventDelete');
            return false;
          } else {
            return true;
          }
        });
      }
      // when client data is changed the useEffect with clientData dep will run and set the Card data
      setClientData((pre) => ({ cards: data, roles: pre.roles }));
    } catch (error) {
      console.log(error);
    }
  };

  // the following function will remove an event if 5 minutes have passed after its expiration
  const removeEventIfExpired = async (eventCard: IEventCard) => {
    const {
      additionalKeys: { eventId },
    } = eventCard;

    let data = JSON.parse(JSON.stringify(clientData.cards));
    data = data.filter((card: IEventCard) => {
      if (card.additionalKeys?.eventId === eventId) {
        return false;
      } else {
        return true;
      }
    });
    // when client data is changed the useEffect with clientData dep will run and set the Card data
    setClientData((pre) => ({ cards: data, roles: pre.roles }));
  };

  useEffect(() => {
    dispatch(resetSelectedClientObject());

    statusListener = registerEvent(props.sessions?.user.id, 'UPDATED_STATUS', async (updatedStatus: IStatus) => {
      console.log(`UPDATED_STATUS Updated Status in ${reportessListType || 'MyList'}`, updatedStatus);
      setUpdatedStatus(JSON.parse(JSON.stringify(updatedStatus)));
    });
    blueDotListener = registerEvent(props.sessions?.user.id, 'BLUEDOT', async (bluedot: IUserBluedot) => {
      console.log(`BLUEDOT Updated Bluedot in ${reportessListType || 'MyList'}`, bluedot);
      setUpdatedBluedot(JSON.parse(JSON.stringify(bluedot)));
    });
    cardListener = registerEvent(props.sessions?.user.id, 'ASSIGN_STAFF', async (addedCard: IAssignDB) => {
      console.log(`ASSIGN_STAFF Updated card in ${reportessListType || 'MyList'}`, addedCard);
      if (addedCard.owner === true && reportessListType) {
        console.log(`ASSIGN_STAFF not updating card in ${reportessListType || 'MyList'} as this is owner refresh`, addedCard);
        return;
      }
      setUpdatedCard(JSON.parse(JSON.stringify(addedCard)));
    });
    greenDotListener = registerEvent(props.sessions?.user.id, 'GREENDOT', async (greenDot) => {
      console.log(`Updated card in ${reportessListType || 'MyList'}`, greenDot);
      setUpdatedGreenDot(JSON.parse(JSON.stringify(greenDot)));
    });

    eventListener = registerEvent(
      props.sessions?.user.id,
      'EVENT_REFRESH',
      async (addedEvent: IEventLastMessage | IEventLastMessageForBooked) => {
        console.log(`EVENT_REFRESH Updated Event Card in ${reportessListType || 'MyList'}`, addedEvent);
        setUpdatedEvent(JSON.parse(JSON.stringify(addedEvent)));
      }
    );
    moveCardListener = registerEvent(
      props.sessions?.user.id,
      'MOVE_CARDS_REFRESH',
      async (addedMoveCard: IMoveCardLastMessage) => {
        console.log(`MOVE_CARDS_REFRESH Updated Event Card in ${reportessListType || 'MyList'}`, addedMoveCard);
        setUpdatedMoveCard(JSON.parse(JSON.stringify(addedMoveCard)));
      }
    );
    eventExpiryListener = registerEvent(props.sessions?.user.id, 'event_expired', async (cardData: IEventCard) => {
      console.log(`event_expired Updated card in ${reportessListType || 'MyList'}`, cardData);
      setExpiredEvent(JSON.parse(JSON.stringify(cardData)));
    });
    blueDotExpiredListener = registerEvent(props.sessions?.user.id, 'blueDot_expired', async (cardData: INameCard) => {
      console.log(`blueDot_expired blueDot expired card in ${reportessListType || 'MyList'}`, cardData);
      seUpdateBlueDotExpired(JSON.parse(JSON.stringify(cardData)));
    });
    return () => {
      if (blueDotListener) {
        unRegisterEvent(blueDotListener);
      }
      if (cardListener) {
        unRegisterEvent(cardListener);
      }
      if (statusListener) {
        unRegisterEvent(statusListener);
      }
      if (eventListener) {
        unRegisterEvent(eventListener);
      }
      if (moveCardListener) {
        unRegisterEvent(moveCardListener);
      }
      if (eventListener) {
        unRegisterEvent(eventExpiryListener);
      }
      if (greenDotListener) {
        unRegisterEvent(greenDotListener);
      }
    };
  }, []);
  useEffect(() => {
    if (reportessListType && reportessListType !== 'REPOTEES_MYLIST') return;
    if (props.isLoading) return;
    (async () => {
      const tabs = [...myTabs].sort((a, b) => a.sortingOrder - b.sortingOrder);
      const finalTabs = [DEFAULT_TAB, ...tabs];
      const selectedtab = finalTabs.find((value) => value?.tabId === activeTab?.tabId);
      if (!selectedtab) {
        setActiveTab(DEFAULT_TAB);
        let { filteredList, groupedData } = await getFilteredMyList(
          clientData.cards,
          colorFilter,
          DEFAULT_TAB,
          activeGroup,
          searchString,
          userNameObj,
          setUserNameObj,
          reportessListType
        );
        debounceSetCardData(filteredList);
        setGroupedCardData(groupedData);
        setTabsTitle(finalTabs);
        return;
      }
      let { filteredList, groupedData } = await getFilteredMyList(
        clientData.cards,
        colorFilter,
        selectedtab,
        activeGroup,
        searchString,
        userNameObj,
        setUserNameObj,
        reportessListType
      );
      debounceSetCardData(filteredList);
      setGroupedCardData(groupedData);
      setTabsTitle(finalTabs);
    })();
  }, [myTabs]);

  useEffect(() => {
    if (reportessListType === 'REPORTEES_FILTERS') {
      setActiveGroup(REPORTEES_STAFF_GP[0]);
      return;
    }
    (async () => {
      if (props.isLoading) return;
      const selectedGroup = myGroups.find((value) => activeGroup && value.groupId === activeGroup?.groupId);

      if (!selectedGroup) {
        if (activeGroup) setActiveGroup(null);
        let { filteredList, groupedData } = await getFilteredMyList(
          clientData.cards,
          colorFilter,
          activeTab,
          activeGroup,
          searchString,
          userNameObj,
          setUserNameObj,
          reportessListType
        );
        debounceSetCardData(filteredList);
        setGroupedCardData(groupedData);
        return;
      }
      let { filteredList, groupedData } = await getFilteredMyList(
        clientData.cards,
        colorFilter,
        activeTab,
        activeGroup,
        searchString,
        userNameObj,
        setUserNameObj,
        reportessListType
      );
      debounceSetCardData(filteredList);
      setGroupedCardData(groupedData);
    })();
  }, [myGroups]);

  useEffect(() => {
    let allRoles =
      reportessListType === 'REPORTEES_FILTERS'
        ? reporteesTabData?.selectedTab?.selectedReportees?.map((value) => value.roleId) || []
        : clientData.roles;
    let roles: any = JSON.parse(JSON.stringify(allRoles));
    let tenants: any = JSON.parse(JSON.stringify(['amura']));
    for (let i = 0; i < roles.length; i++) {
      for (let j = 0; j < allTenants.length; j++) {
        if (allTenants[j] && roles[i] && !edgeColors[`${tenants[j]}~${roles[i]}`]) {
          (async () => {
            const response: any = await getStatusForAllRoles(panelId, tenants[j], roles[i], props);
            if (response.edgeColor) {
              setEdgeColors((pre) => {
                return { ...pre, [`${tenants[j]}~${roles[i]}`]: response };
              });
            }
          })();
        }
      }
    }
  }, [clientData.roles, allTenants, reporteesTabData]);

  // useEffect(() => {
  //   dispatch(resetSelectedClientObject());
  // }, [selectedDropdown]);

  useEffect(() => {
    listRef.current?.resetAfterIndex?.(0);
  }, [isExtend, accordiansState]);

  useEffect(() => {
    (async () => {
      if (props.isLoading) return;
      if (reportessListType === 'REPORTEES_FILTERS') {
        setCardData([]);
        setGroupedCardData({});
        return;
      }
      setTempFilteredData(clientData.cards);
      let { filteredList, groupedData } = await getFilteredMyList(
        clientData.cards,
        colorFilter,
        activeTab,
        activeGroup,
        searchString,
        userNameObj,
        setUserNameObj,
        reportessListType
      );
      debounceSetCardData(filteredList);
      setGroupedCardData(groupedData);
      listRef.current?.resetAfterIndex?.(0);
      if (isLoading) setIsLoading(false);
    })();
  }, [clientData]);

  useEffect(() => {
    (async () => {
      if (props.isLoading) return;
      setTempFilteredData(clientData.cards);
      let { filteredList, groupedData } = await getFilteredMyList(
        clientData.cards,
        colorFilter,
        activeTab,
        activeGroup,
        searchString,
        userNameObj,
        setUserNameObj,
        reportessListType
      );
      setCardData(filteredList);
      setGroupedCardData(groupedData);
      listRef.current?.resetAfterIndex?.(0);
    })();
  }, [activeGroup, colorFilter]);

  useEffect(() => {
    let accordions: any = {};
    Object.keys(groupedCardData).forEach((status) => {
      accordions[status] = accordiansState[status] ?? Boolean(false);
    });
    setAccordiansState(accordions);
    setGroupedListCount(Object.keys(accordions).length);
    setGroupedIndexes(getIndices(groupedCardData, accordions));
  }, [groupedCardData]);

  useEffect(() => {
    let loggedInUser = sessions?.user.id;
    let total = 0;
    Object.keys(groupedCardData).forEach((status) => {
      total = total + (accordiansState[status] ? groupedCardData[status].length : 0) + 1;
    });
    setGroupedListCount(total);
    setGroupedDataComponent(
      MyAccordionView(
        props,
        groupedCardData,
        dispatch,
        selectedClientObject,
        myRolesAcrossAllTenants,
        setAction,
        setSelectedCard,
        edgeColors,
        myTeamData,
        isExtend,
        accordiansState,
        setAccordiansState,
        showProgress
      )
    );
  }, [groupedIndexes, isExtend, selectedClientObject, showProgress]);

  useEffect(() => {
    setGroupedIndexes(getIndices(groupedCardData, accordiansState));
  }, [accordiansState]);

  const handleFilter = () => {
    setAction('FILTER');
  };
  const handleClear = () => {
    setColorFilter(initColorFilter);
  };
  const handleColorFilter = (color) => {
    if (colorFilter[color] && !Object.values(colorFilter).every(Boolean)) {
      setColorFilter(initColorFilter);
    } else {
      setColorFilter(resetColorFilter);
      setColorFilter((pre) => ({ ...pre, [color]: true }));
    }
  };
  const handleExportData = async () => {
    const exportIDs = cardData.map((element: INameCard) => element.additionalKeys.patientId);
    let url = `${import.meta.env.VITE_BASE_API_URL}/generateReport`;
    const data = { users: exportIDs };
    SuccessToaster(' Your report will be downloaded shortly..', panelId, 'success');
    axios
      .post(url, data)
      .then(function (response) {
        if (response?.data?.body) {
          let url: string = response.data.body;
          exportMyListAsCSV(url, props.sessions);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const clearSelectedClient = () => {
    dispatch(setMyTeamOverFlowData([]));
    dispatch(resetSelectedClientObject());

    if (reportessListType === 'REPORTEES_FILTERS') {
      childEventTrigger('MyList', 'MyList', 'onRefreshReportee', EMPTY_CLENT_DATA);
    } else {
      childEventTrigger('MyList', 'MyList', 'onMyListRefresh', { Ftype: 'mylist', clientData: {} });
    }
  };

  const onRefresh = async () => {
    const teamdata = myTeamData[0] ? [myTeamData[0]] : [];
    dispatch(setMyTeamData(teamdata));
    dispatch(setMyTeamOverFlowData([]));
    setIsLoading(true);
    dispatch(resetSelectedClientObject());
    setAccordiansState({});

    if (reportessListType === 'REPORTEES_FILTERS') {
      childEventTrigger('MyList', 'MyList', 'onRefreshReportee', EMPTY_CLENT_DATA);
      await onRefreshReportees();
    } else {
      childEventTrigger('MyList', 'MyList', 'onMyListRefresh', { Ftype: 'mylist', clientData: {} });
      await getMyListData(dispatch, props.sessions, setClientData);
    }
    setIsLoading(false);
    handleClear();
  };

  const colorFilters = [
    { id: 'isEmergency', isSelected: colorFilter.isEmergency, color: '#FF3B30', onClick: () => handleColorFilter('isEmergency') },
    {
      id: 'isNewMessages',
      isSelected: colorFilter.isNewMessages,
      color: '#52B788',
      onClick: () => handleColorFilter('isNewMessages'),
    },
    { id: 'isBluedot', isSelected: colorFilter.isBluedot, color: '#007AFF', onClick: () => handleColorFilter('isBluedot') },
  ];

  const showActiveData = (data) => {
    setActiveTab(data);
  };

  const handleSearchList = async (value) => {
    setSearchString(value);
    let { filteredList, groupedData } = await getFilteredMyList(
      tempFilteredData,
      colorFilter,
      activeTab,
      activeGroup,
      value,
      userNameObj,
      setUserNameObj,
      reportessListType
    );
    setGroupedCardData(groupedData);
    setCardData(filteredList);
    listRef.current?.resetAfterIndex?.(0);
  };

  const handleTabThreeDot = (data: string) => {
    switch (data) {
      case 'EDIT_TAB':
        return setAction('TABSETTING');
      case 'EDIT_GROUP':
        return setAction('GROUPSETTING');
    }
  };

  const onTabChange = async (tabData: IReporteesTab) => {
    let { filteredList, groupedData } = await getFilteredMyList(
      tempFilteredData,
      colorFilter,
      tabData,
      activeGroup,
      searchString,
      userNameObj,
      setUserNameObj,
      reportessListType
    );
    setCardData(filteredList);
    setGroupedCardData(groupedData);
    setActiveTab(tabData);

    listRef.current?.resetAfterIndex?.(0);
  };
  return (
    <div className={classes.rootContainer}>
      <div className={isPanelScrolled && classes.shadow}>
        <ListDropdownHeader
          childEventTrigger={childEventTrigger}
          selectedDropdown={selectedDropdown}
          setSelectedDropdown={setSelectedDropdown}
          handleSearch={handleSearchList}
          handleSearchBack={() => {
            debounceSetCardData(tempFilteredData);
          }}
          headerActionOptions={[]}
          cardAssignType={undefined}
          setCardAssignType={setCardAssignType}
          currentSelection={reporteesData ? 'reportees' : 'people'}
          onRefresh={reportessListType === 'REPOTEES_MYLIST' ? undefined : onRefresh}
          showRefreshBadge={false}
          isLoading={isLoading || props.isLoading}
        />
        {reportessListType === 'REPOTEES_MYLIST' && reporteesData ? (
          <ReporteesMyListHeader
            handleBack={() => {
              reporteesData?.handleBackToReportees();
              const teamdata = myTeamData[0] ? [myTeamData[0]] : [];
              childEventTrigger('MyList', 'MyList', 'onMyListRefresh', {});
              dispatch(setMyTeamData(teamdata));
            }}
            userId={reporteesData?.staffId}
            userName={reporteesData?.staffName}
            userRole={reporteesData?.roleId}
            userTenantIcon={<TenantIconSm />}
          />
        ) : null}
        {(!reportessListType || reportessListType === 'REPOTEES_MYLIST') && (
          <MUIBlockTabs
            handleThreeDot={handleTabThreeDot}
            threeDotOption={TAB_THREEDOT_OPTIONS}
            tabOptions={tabsTitle}
            activeTab={activeTab}
            onTabChange={showActiveData}
            customStyle={classes.tabStyle}
            onTabClick={onTabChange}
          />
        )}
        {reportessListType === 'REPORTEES_FILTERS' && reporteesTabData ? <ReporteesTab {...reporteesTabData} /> : null}
        <BasicFilter
          paddingX="20px"
          filterOptions={colorFilters}
          handleClear={handleClear}
          isExtend={isExtend}
          setIsExtend={setIsExtend}
          diableClear={!Object.values(colorFilter).every(Boolean)}
          handleExportData={handleExportData}
          showGroups={!(reportessListType === 'REPORTEES_FILTERS')}
          // showGroups={!Boolean(reporteesData)}
          setShowGroups={setActiveGroup}
          myListGroups={myGroups}
          activeGroup={activeGroup}
          showGCDashBoard={reportessListType ? false : belongsToGCL2(loggedInUserInformation.allRoles ?? '')}
          isClearIcon
        />
      </div>

      <div className={classes.nameChardWrapper}>
        {(() => {
          // TODO: Proper isLoading State for MyList
          const _isLoading = isLoading || props.isLoading;

          const hasData = activeGroup ? (groupedListCount ?? 0) > 0 : cardData?.length;
          if (_isLoading) {
            return (
              <>
                <MUISkeleton variant={'rectangular'} height={'130px'} style={{ margin: '5px 0px' }} />
                <MUISkeleton variant={'rectangular'} height={'130px'} style={{ margin: '5px 0px' }} />
                <MUISkeleton variant={'rectangular'} height={'130px'} style={{ margin: '5px 0px' }} />
                <MUISkeleton variant={'rectangular'} height={'130px'} style={{ margin: '5px 0px' }} />
                <MUISkeleton variant={'rectangular'} height={'130px'} style={{ margin: '5px 0px' }} />
              </>
            );
          }
          if (!hasData && !_isLoading) {
            return (
              <div className={classes.noDataContainer}>
                <div>NO RESULTS FOUND</div>
              </div>
            );
          }

          return (
            <>
              {(selectedDropdown === 'people' || selectedDropdown === 'reportees') && !activeGroup && (
                <>
                  <AutoSizer data-header-hidable data-mylist>
                    {({ width, height }) => {
                      return (
                        <List
                          ref={listRef}
                          itemData={cardData}
                          width={width}
                          height={height}
                          itemSize={() => {
                            return true ? 170 : 126;
                          }}
                          itemCount={cardData.length}
                          initialScrollOffset={mainListScrollTop}
                          onScroll={(e) => {
                            debouncedSetMainListScrollTop.current(e.scrollOffset);
                          }}
                        >
                          {({ index, style }) => {
                            const currentCardData = cardData[index] as INameCard;

                            const clientStatus = getStatusOfClient(currentCardData);

                            const edgeColorObject = edgeColors[`${currentCardData.tenantId}~${currentCardData.roleId}`]
                              ? edgeColors[`${currentCardData.tenantId}~${currentCardData.roleId}`]['edgeColor']?.find(
                                  (data) => data.value === clientStatus
                                )
                              : null;

                            const colorIndex = edgeColorObject?.color.lastIndexOf('#');
                            const color = edgeColorObject?.color?.slice(colorIndex).split(' ')[0];
                            const currentCardRole = getRoleId(props?.reporteesData, props?.reporteesData, currentCardData);
                            // const userId =
                            //   selectedClientObject?.type === 'nameCard'
                            //     ? (selectedClientObject as INameCard)?.additionalKeys?.patientId
                            //     : (selectedClientObject as IMoveCard)?.additionalKeys?.cardId;

                            const isClientSelected =
                              currentCardData.id === selectedClientObject?.id &&
                              currentCardData.tenantId === selectedClientObject?.tenantId &&
                              currentCardRole === selectedClientObject?.roleId;

                            return (
                              <div
                                id={'ITEM' + currentCardData.id.split('~')[1].trim().replaceAll('-', '')}
                                key={index}
                                style={{ ...style, transition: 'all 0.4s ease-in-out 0s' }}
                              >
                                <MyListCard
                                  activeTab={props.reporteesTabData?.selectedTab}
                                  setAction={setAction as any}
                                  isExtend={true}
                                  setSelectedCard={setSelectedCard as any}
                                  cardData={currentCardData}
                                  edgeColor={color}
                                  isClientSelected={isClientSelected}
                                  childEventTrigger={childEventTrigger as any}
                                  myTeamData={myTeamData}
                                  reporteesData={reporteesData}
                                  isReportee={Boolean(reportessListType)}
                                  sessions={props.sessions}
                                  onSelectedClientObjectChange={(newObj: any) => {
                                    dispatch(setSelectedClientObject({ ...newObj, roleId: currentCardRole }));
                                  }}
                                />
                              </div>
                            );
                          }}
                        </List>
                      );
                    }}
                  </AutoSizer>
                </>
              )}
              {(selectedDropdown === 'people' || selectedDropdown === 'reportees') && activeGroup ? (
                <AutoSizer data-header-hidable>
                  {({ width, height }) => (
                    <List
                      ref={listRef}
                      itemData={groupedDataComponent}
                      width={width}
                      height={height}
                      itemCount={groupedListCount}
                      itemSize={(index) => {
                        return groupedIndexes.includes(index) && activeGroup ? 42 : true ? 170 : 126;
                      }}
                    >
                      {({ index, style }) => (
                        <div key={index} style={style}>
                          {groupedDataComponent[index]}
                        </div>
                      )}
                    </List>
                  )}
                </AutoSizer>
              ) : null}
            </>
          );
        })()}
      </div>
    </div>
  );
}
