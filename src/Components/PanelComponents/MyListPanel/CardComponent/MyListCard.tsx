import { useDispatch, useSelector } from 'react-redux';
import { useDFEvent } from '../../../../DisplayFramework/Events/DFEvents';
import { setRoleToClient } from '../../../../DisplayFramework/State/Slices/AccessPermissionsSlice';
import { useUserSession } from '../../../../DisplayFramework/State/Slices/Auth';
import { setChannelMessagesList } from '../../../../DisplayFramework/State/Slices/ChatSlice';
import {
  setClientId,
  setLoadSummary,
  setMyTeamData,
  setSelectedClientObject,
  setSourcePanel,
} from '../../../../DisplayFramework/State/Slices/DashboardSlice';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { ChildEventTriggerFn } from '../../../../Utilities/WrapperFunctions';
import EventCard from '../../../LibraryComponents/EventCard/EventCard';
import MoveCard from '../../../LibraryComponents/MoveCard/MoveCard';
import NameCard from '../../../LibraryComponents/NameCard/NameCard';
import { globalChannelVariables, initialMessageObject } from '../../Chat/Chat.types';
import { useSetMainCardType } from '../../WindashX/Windash.state';
import { belongToDataEntry, belongToGCTeam, belongToTATeam } from '../MyList/MyList.function';
import { ICardType, IEventCard, IMoveCard, INameCard } from '../MyList/MyList.types';
import { MyListCardProps } from './MyListCard.types';
import { getRoleId, updateGreenDotAPI } from './MylistCard.functions';

const MyListCard = (
  props: MyListCardProps & {
    myTeamData: any;
    reporteesData: any;
    isReportee?: boolean;
    childEventTrigger: ChildEventTriggerFn;
    onSelectedClientObjectChange: (selectedClientObject: any) => void;
  }
) => {
  const { cardData, setSelectedCard, edgeColor, isClientSelected, setAction, isExtend, myTeamData, reporteesData } = props;
  const session = useUserSession();
  const setMainCardType = useSetMainCardType();
  const dispatch = useDispatch();
  const myRolesAcrossAllTenants = useSelector((state: IRootState) => state.dashboard.myRolesAcrossTenants);
  const sendEvent = useDFEvent();

  const onOpenNameCard = ({ currentCardRole, currentCardData }) => {
    if (isClientSelected) return;
    let myData = JSON.parse(JSON.stringify(myTeamData));
    myData.forEach((element) => {
      if (element.UserName === session?.user?.id) {
        let selectedRole: any = currentCardRole;
        selectedRole = myRolesAcrossAllTenants.find((role) => role.roleId === selectedRole);
        if (selectedRole?.roleName) element.Roles = [selectedRole.roleName || ''];
      }
    });
    if (currentCardRole) {
      dispatch(setRoleToClient(currentCardRole));
    }
    dispatch(setLoadSummary(true));
    dispatch(setMyTeamData(myData));
    dispatch(setClientId(currentCardData.additionalKeys.patientId));
    dispatch(setSelectedClientObject(JSON.parse(JSON.stringify({ ...currentCardData, roleId: currentCardRole }))));

    props.onSelectedClientObjectChange(JSON.parse(JSON.stringify(currentCardData)));

    props.childEventTrigger(null, null, 'onClientSelect', {
      patientId: currentCardData.additionalKeys?.patientId,
      clientData: {
        client_id: currentCardData.additionalKeys.patientId || '',
        client_name: currentCardData?.title || '',
        tenant_id: currentCardData.tenantId || '',
        channelId: '',
        roleId: currentCardRole || '',
      },
      isReportee: props?.isReportee,
      type: 'mylist',
      reporteesData: reporteesData,
      activeTab: props?.activeTab,
    });
    setMainCardType('NameCard');
    if (currentCardData?.additionalKeys?.greenDotCount !== 0) {
      updateGreenDotAPI(currentCardData, session);
    }
  };

  const onOpenMoveCard = ({ currentCardRole, currentCardData }) => {
    if (isClientSelected) return;
    let myData = JSON.parse(JSON.stringify(myTeamData));
    myData.forEach((element) => {
      if (element.UserName === session?.user?.id) {
        let selectedRole: any = currentCardRole;
        selectedRole = myRolesAcrossAllTenants.find((role) => role.roleId === selectedRole);
        if (selectedRole?.roleName) element.Roles = [selectedRole.roleName || ''];
      }
    });
    if (currentCardRole) {
      dispatch(setRoleToClient(currentCardRole));
    }
    dispatch(setMyTeamData(myData));
    dispatch(setClientId(currentCardData.id));
    dispatch(setSelectedClientObject(JSON.parse(JSON.stringify({ ...currentCardData, roleId: currentCardRole }))));
    props.onSelectedClientObjectChange(JSON.parse(JSON.stringify(currentCardData)));

    globalChannelVariables.channelsMessagesList = initialMessageObject;
    dispatch(setChannelMessagesList(initialMessageObject));

    props.childEventTrigger(null, null, 'onClientSelect', {
      patientId: currentCardData.additionalKeys?.cardId,
      clientData: {
        client_id: currentCardData.additionalKeys.cardId || '',
        client_name: currentCardData?.title || '',
        tenant_id: currentCardData.tenantId || '',
        channelId: '',
      },
      isReportee: props?.isReportee,
      type: 'moveCard',
      activeTab: props?.activeTab,
    });
    setMainCardType('');
  };

  const onOpenEventCard = ({ currentCardRole, currentCardData }) => {
    if (isClientSelected) return;
    let myData = JSON.parse(JSON.stringify(myTeamData));
    myData.forEach((element) => {
      if (element.UserName === session?.user?.id) {
        let selectedRole: any = currentCardRole;
        selectedRole = myRolesAcrossAllTenants.find((role) => role.roleId === selectedRole);
        if (selectedRole?.roleName) element.Roles = [selectedRole.roleName || ''];
      }
    });
    if (currentCardRole) {
      dispatch(setRoleToClient(currentCardRole));
    }
    dispatch(setMyTeamData(myData));
    dispatch(setClientId(currentCardData.additionalKeys.eventId));
    dispatch(setSelectedClientObject(JSON.parse(JSON.stringify({ ...currentCardData, roleId: currentCardRole }))));
    props.onSelectedClientObjectChange(JSON.parse(JSON.stringify(currentCardData)));

    globalChannelVariables.channelsMessagesList = initialMessageObject;
    dispatch(setChannelMessagesList(initialMessageObject));
    dispatch(setSourcePanel('Resourse'));

    props.childEventTrigger(null, null, 'onEventCardSelect', {
      patientId: currentCardData.additionalKeys?.eventId,
      isAFB: currentCardData.additionalKeys?.isAFB,
      afbData: [currentCardData.additionalKeys?.afterActivityEventId, currentCardData.additionalKeys?.beforeActivityEventId],
      clientData: {
        client_id: currentCardData.additionalKeys.eventId || '',
        client_name: currentCardData?.title || '',
        tenant_id: currentCardData.tenantId || '',
        channelId: '',
      },
      isReportee: props?.isReportee,
      type: 'eventCard',
      activeTab: props?.activeTab,
    });
    setMainCardType('');
  };

  const renderCard = (cardType: ICardType) => {
    switch (cardType) {
      //
      case 'nameCard': {
        const currentCardData = cardData as INameCard;
        const currentCardRole = getRoleId(props?.activeTab, props?.reporteesData, currentCardData);
        return (
          <NameCard
            cardData={currentCardData}
            setAction={setAction}
            setSelectedCard={setSelectedCard}
            isExtend={isExtend}
            currentCardRole={currentCardRole}
            noThreeDot={
              !belongToGCTeam(currentCardRole || '') &&
              !belongToTATeam(currentCardRole || '') &&
              !belongToDataEntry(currentCardRole || '')
            }
            edgeColor={edgeColor}
            sessions={props.sessions}
            isClientSelected={isClientSelected}
            bluedot={currentCardData?.additionalKeys?.bluedots || []}
            showBlueDot={currentCardData?.additionalKeys?.bluedots?.blueDotsCount > 0}
            isReportee={props?.isReportee}
            openClient={() => onOpenNameCard({ currentCardRole, currentCardData })}
            reporteesData={reporteesData}
            activeTab={props.activeTab}
            bluedotClick={(propsToSend) => {
              sendEvent('onBlueDotClick', { ...propsToSend, activeTab: props.activeTab });
            }}
          />
        );
      }

      //
      case 'moveCard': {
        const currentCardData = cardData as IMoveCard;
        const currentCardRole = getRoleId(props?.activeTab, props?.reporteesData, currentCardData);

        return (
          <MoveCard
            cardData={currentCardData}
            edgeColor={edgeColor}
            isClientSelected={isClientSelected}
            setAction={setAction}
            setSelectedCard={setSelectedCard}
            isExtend={isExtend}
            openClient={() => onOpenMoveCard({ currentCardRole, currentCardData })}
          />
        );
      }
      //
      case 'eventCard': {
        const currentCardData = cardData as IEventCard;
        const currentCardRole = getRoleId(props?.activeTab, props?.reporteesData, currentCardData);
        return (
          <EventCard
            cardData={currentCardData}
            edgeColor={edgeColor}
            isClientSelected={isClientSelected}
            setAction={setAction}
            setSelectedCard={setSelectedCard}
            isExtend={isExtend}
            sessions={props.sessions}
            openClient={() => onOpenEventCard({ currentCardRole, currentCardData })}
            bluedot={currentCardData?.additionalKeys?.bluedots || []}
            showBlueDot={currentCardData?.additionalKeys?.bluedots?.blueDotsCount > 0}
          />
        );
      }
      //
      default:
        return <></>;
    }
  };

  //

  return <div>{renderCard(cardData.type)}</div>;
};
export default MyListCard;
