import { Avatar, IconButton } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { registerEvent, unRegisterEvent } from '../../../../AppSync/AppSync.functions';
import { getNameInitials, minutesToTimeString } from '../../../../Common/Common.functions';
import { useFetchUserName } from '../../../../Common/Common.hooks';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { useDFEvent } from '../../../../DisplayFramework/Events/DFEvents';
import { IRootState } from '../../../../DisplayFramework/State/store';
import NameToken from '../../../LibraryComponents/CallSchedulerWizards/NameToken/NameToken';
import RadioGroup from '../../../LibraryComponents/MUIRadioGroup/MUIRadioGroup';
import Token from '../../../LibraryComponents/MUIToken/MUIToken';
import ModalBox from '../../../LibraryComponents/ModalBox/ModalBox';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import PanelFooter from '../../../LibraryComponents/PanelFooter/PanelFooter';
import {
  AmuraIcon,
  CalendarIconV2,
  CalendarIconV3,
  DeleteIconEvents,
  DescriptionIcon,
  EditIcon2,
  Meetings,
  MeetingsEvent,
  NotificationIcon,
  Owner,
  RepeatIcon,
  VideoChannelIcon,
  VoiceChannelIcon,
} from '../TimeManagement.svg';
import { IEventLastMessage, IEventLastMessageForBooked } from '../../MyListPanel/MyList/MyList.types';
import {
  CHANNEL_ICON,
  DAYS_OPTIONS,
  DEFAULT_RSVP,
  REPEAT_OPTIONS,
  RSVP_OPTIONS,
  RSVP_VALUE,
  TM_IDS,
  formattedDate,
  getCustomRepeatLabel,
  getNotifyMessage,
  handleDeleteEvent,
  handleUpdateCall,
  reConvertingToUTCDaysInView,
} from '../TimeManagement.function';
import { useStyles } from '../TimeManagement.style';
import { AceeptedIcon, DeclinedIcon, PeoplesIcon, TimeIcon } from '../TimeManagement.svg';
import { IConfirmModal, IEventDetailsProps } from '../TimeManagement.types';
import WithIconContainer from './WithIconContainer';

const EVENT_OBJECT: any = {
  [TM_IDS.EVENT]: { heading: 'Event details' },
  [TM_IDS.SLOT]: { heading: 'Availability Details' },
  [TM_IDS.OUT_OF_OFFICE]: { heading: 'Event details' },
};

const MODAL_OBJECT: any = {
  [TM_IDS.DELETE]: { heading: 'Delete Event' },
  [TM_IDS.DECLINE]: { heading: 'RSVP to this event' },
  [TM_IDS.ACCEPT]: { heading: 'RSVP to this event' },
};

export default function EventDetails(props: IEventDetailsProps) {
  const {
    eventsData,
    sessions,
    childEventTrigger,
    viewType,
    handleBack,
    openInMyWork,
    setEvents,
    openInResource,
    setViewType,
    setViewingDate,
  } = props;

  // const [eventsData, setEventsData] = useState({ ...eventDetails });
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  const userId = sessions?.user?.id;
  const isRepeatEvent = Object.keys(eventsData?.reccurance)?.length;
  const isEditPermission =
    (eventsData?.organizer === sessions?.user?.id || eventsData?.permissons?.includes(TM_IDS.MODIFY_EVENT)) &&
    (eventsData?.bookableIds || []).length === 0 &&
    !eventsData?.isAFB;
  const isDeletePermission = (eventsData?.bookableIds || []).length === 0;
  const isAFB = eventsData?.isAFB;
  const isEvent = eventsData?.eventType === TM_IDS.EVENT;
  const isSlot = eventsData?.eventType === TM_IDS.SLOT;

  const rsvpdata = eventsData?.rsvp ? Object.keys(eventsData?.rsvp).indexOf(userId) : -1;
  const visiblilty = rsvpdata !== -1 ? eventsData?.rsvp[userId].value : '';
  const [updatedEvent, setUpdatedEvent] = useState('');

  const [organizerInperson, setOrganizerInperson] = useState<boolean>(false);

  const { id: panelId } = useCurrentPanel();
  const triggerEvent = useDFEvent();

  const roles = useSelector((state: IRootState) => state.dashboard.allUserRoles);

  const { fetchUserName, fetchMultipleUserNames } = useFetchUserName();

  let sourcePanel = useSelector((state: IRootState) => {
    return state.dashboard.sourcePanel;
  });
  const [organizerdetails, setorganizerdetails] = useState({
    value: '',
    label: '',
    role: '',
    roleId: '',
  });
  const [tenantParticipants, setTenantParticipants] = useState([]);

  const [rsvp, setRsvp] = useState({ ...DEFAULT_RSVP, value: TM_IDS.YES });
  const [confirmModal, setConfirmModal] = useState<IConfirmModal>({
    open: false,
  });
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [veiwButtonsFooter, setVeiwButtonsFooter] = useState(false);

  let eventUpdateListener: any;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let organizerName = await fetchUserName(eventsData?.organizer);
      setAuthor(organizerName);
      setOrganizerInperson(eventsData?.tenantParticipants?.some((person) => person?.userId === eventsData?.organizer));
      const participants = eventsData?.tenantParticipants?.map((data) => data.userId);
      const participantsNamesObject = await fetchMultipleUserNames(participants);
      let participantsNamesWithRoles = [];
      (eventsData?.tenantParticipants || []).forEach((data) => {
        let formatedData = {
          value: data?.userId,
          label: participantsNamesObject[data?.userId],
          role: roles.find((role) => role.roleId === data?.roleId)?.roleName || data?.roleId || '',
          roleId: data?.roleId || '',
        };
        participantsNamesWithRoles.push(formatedData);
      });
      let organizerNameWithRole = {
        value: eventsData?.organizer,
        label: organizerName,
        role: roles.find((role) => role.roleId === eventsData?.organizerRoleId)?.roleName || eventsData?.organizerRoleId || '',
        roleId: eventsData?.organizerRoleId,
      };
      setTenantParticipants(participantsNamesWithRoles);
      setorganizerdetails(organizerNameWithRole);
      setIsLoading(false);
      if (!isAFB) {
        let isrsvpAvailble = iconViewsAndACCeptDeclinedFunction(userId);
        setVeiwButtonsFooter(isrsvpAvailble === TM_IDS.YES || isrsvpAvailble === TM_IDS.NO);
      }
    })();
  }, [eventsData]);

  useEffect(() => {
    eventUpdateListener = registerEvent(
      props.sessions?.user.id,
      'EVENT_REFRESH',
      async (eventDetails: IEventLastMessage | IEventLastMessageForBooked) => {
        setUpdatedEvent(JSON.parse(JSON.stringify(eventDetails)));
      }
    );

    return () => {
      if (eventUpdateListener) {
        unRegisterEvent(eventUpdateListener);
      }
    };
  }, []);

  useEffect(() => {
    updateEvent(JSON.parse(JSON.stringify(updatedEvent)));
  }, [updatedEvent]);

  const updateEvent = async (updatedEvent: IEventLastMessage | IEventLastMessageForBooked) => {
    const { eventId } = updatedEvent;
    if (eventId === eventsData.eventId) {
      if (updatedEvent.task === 'DELETE') {
        if (panelId == 'H') {
          handleBack();
          setViewingDate(eventsData.eventDate);
          setViewType(viewType);
        }
        triggerEvent('onEventDelete');
      }
    }
  };

  const onRsvpChange = (selected) => {
    if (selected) {
      setRsvp({ ...DEFAULT_RSVP, selected, ...RSVP_VALUE[selected] });
    }
  };
  const onDelete = async () => {
    setConfirmModal({ open: true, screen: TM_IDS.DELETE });
  };

  const handleDelete = async () => {
    const payload = {
      ...eventsData,
      deleteObject: { thisEvent: rsvp.thisEvent, allEvents: rsvp.allEvents },
    };
    await handleDeleteEvent(sessions, payload, panelId);

    setEvents((prev) => prev.filter((event) => event.eventId !== eventsData.eventId || event.slotId !== eventsData.slotId));

    if (panelId === 'S' || panelId === 'R') triggerEvent('onEventDelete');
    handleBack();
  };
  const childEventTriggerNew = useDFEvent();
  const onEdit = () => {
    childEventTriggerNew('onEventEditClick', {
      eventsData,
      isEditEvent: true,
      viewType,
      openInMyWork,
    });
  };

  const onDecline = () => {
    if (isRepeatEvent) {
      return setConfirmModal({ open: true, screen: TM_IDS.DECLINE });
    }
    handleUpdate(TM_IDS.NO);
  };

  const onAccept = () => {
    if (isRepeatEvent) {
      return setConfirmModal({ open: true, screen: TM_IDS.ACCEPT });
    }
    handleUpdate(TM_IDS.YES);
  };

  const onConfirmModalClose = () => {
    setConfirmModal({ open: false });
  };

  const onConfirm = () => {
    switch (confirmModal.screen) {
      case TM_IDS.ACCEPT:
        handleUpdate(TM_IDS.YES);
        break;
      case TM_IDS.DECLINE:
        handleUpdate(TM_IDS.NO);
        break;
      case TM_IDS.DELETE:
        handleDelete();
        break;
    }
    onConfirmModalClose();
  };

  const iconViewsAndACCeptDeclinedFunction = (id) => {
    let rsvpdata = eventsData?.rsvp ? Object.keys(eventsData?.rsvp).indexOf(id) : -1;
    let visiblilty = rsvpdata !== -1 ? eventsData?.rsvp[id].value : '';
    return visiblilty;
  };

  const handleUpdate = async (value) => {
    const { selected, ...restRsvp } = rsvp;
    const payload = {
      ...eventsData,
      action: { ...restRsvp, value: TM_IDS.UPDATE },
      rsvp: { ...eventsData?.rsvp, [sessions.user.id]: { ...restRsvp, value } },
      rsvp_userId: userId,
      userId,
    };
    if (payload?.reccurance?.weekDays && payload?.reccurance?.startDate) {
      payload.reccurance.weekDays = reConvertingToUTCDaysInView(payload);
    }
    await handleUpdateCall(panelId, sessions, payload);
    if (panelId === 'S' || panelId === 'R') triggerEvent('onEventDelete');
    if (panelId == 'H') {
      setViewingDate(eventsData.eventDate);
      setViewType(viewType);
      handleBack();
    }
    handleBack();
  };

  const getRepeatTypeMessage = () => {
    if (eventsData?.repeatType === TM_IDS.CUSTOM_REPEAT) {
      const weekDaysName =
        eventsData?.reccurance?.weekDays &&
        (reConvertingToUTCDaysInView(eventsData) || []).map((val) => DAYS_OPTIONS[val]?.value);
      const reccurance = { ...eventsData?.reccurance, weekDaysName };
      return getCustomRepeatLabel(reccurance);
    }
    return REPEAT_OPTIONS.find((val) => val?.value === eventsData?.repeatType)?.label || '';
  };
  const actualDuration = eventsData?.isAFB
    ? Number(eventsData?.duration) + Number(eventsData?.afbData?.After?.duration) + Number(eventsData?.afbData?.Before?.duration)
    : eventsData?.duration;

  const showorganizerDetails = () => {
    return (
      <div className={classes.origzerWraper}>
        <span className={`${commonClasses.sm10Medium} ${classes.organizerHeading}`}>Organizer</span>
        <NameToken
          userId={organizerdetails?.value}
          label={organizerdetails?.label}
          roleName={organizerdetails?.role || ''}
          tenant={organizerdetails?.role ? 'amura' : ''}
          statusIcon={<AceeptedIcon />}
        />
      </div>
    );
  };
  return (
    <div className={classes.overlapDrawerContainer}>
      <PageHeader handleBack={!openInMyWork && handleBack} headerContent={EVENT_OBJECT[eventsData?.eventType]?.heading} />
      <section className={classes.scrollBody}>
        <div>
          {(eventsData?.bookables || []).length !== 0 && (
            <p className={`${commonClasses.body15Regular} ${classes.pcolor2}`}>Bookables</p>
          )}
          <header className={`${classes.viewHeaderBox}`}>
            <span className={`${commonClasses.body20Regular} ${classes.title}`}>{eventsData?.title}</span>
            {!props.isReporteeEvent && isEditPermission ? (
              <IconButton onClick={onDelete}>
                <DeleteIconEvents />
              </IconButton>
            ) : null}
            {!props.isReporteeEvent && isEditPermission ? (
              <IconButton onClick={onEdit}>
                <EditIcon2 />
              </IconButton>
            ) : null}
          </header>
        </div>
        <div className={classes.tokendiv}>
          <Token
            avatar={
              <Avatar className={classes.tokenAvatar} src={''} style={{ height: '16px', width: '16px' }}>
                <AmuraIcon />
              </Avatar>
            }
            className={`${classes.peopleToken} ${classes.muiChipHeight}`}
            label={eventsData?.tenantId}
            active
          />
        </div>

        <WithIconContainer
          Icon={<CalendarIconV3 />}
          rowGap="0px"
          Label={
            <div className={classes.datetimebox}>
              <span className={`${commonClasses.body17Regular} ${classes.secondryText}`}>
                {formattedDate(eventsData?.eventDate)}
              </span>
              {!eventsData?.isAFB && (props.eventsData?.bookables || []).length === 0 ? (
                <>
                  <span className={`${commonClasses.body17Regular} ${classes.secondryText}`}>|</span>
                  <span className={`${commonClasses.body17Regular} ${classes.secondryText}`}>
                    {moment(new Date(eventsData?.fromTime)).format('hh:mm A')}
                  </span>
                </>
              ) : (
                <></>
              )}
            </div>
          }
        >
          {eventsData?.isAFB ? (
            <span className={`${commonClasses.body17Regular} ${classes.secondryText}`}>
              {moment(new Date(eventsData?.fromTime)).format('hh:mm A') +
                ' - ' +
                moment(new Date(eventsData?.toTime)).format('hh:mm A')}
            </span>
          ) : (props.eventsData?.bookables || []).length !== 0 ? (
            <span className={`${commonClasses.body17Regular} ${classes.secondryText}`}>
              {moment(new Date(eventsData?.fromTime)).format('hh:mm A') +
                ' - ' +
                moment(new Date(eventsData?.toTime)).format('hh:mm A')}
            </span>
          ) : (
            <></>
          )}
        </WithIconContainer>

        <WithIconContainer
          Icon={
            eventsData?.bookables ? (
              eventsData?.bookables?.channel === 'video' ? (
                <VideoChannelIcon />
              ) : (
                <VoiceChannelIcon />
              )
            ) : eventsData?.callType === 'video' ? (
              <VideoChannelIcon />
            ) : (
              <VoiceChannelIcon />
            )
          }
          Label={
            <div className={classes.channelbox}>
              <span className={`${commonClasses.body17Regular} ${classes.secondryText}`}>
                {eventsData?.bookables ? eventsData?.bookables?.channel : eventsData?.callType}
              </span>
              <span className={classes.channeliconBox}>
                <TimeIcon />
              </span>
              <span className={`${commonClasses.body17Regular} ${classes.secondryText}`}>
                {minutesToTimeString(eventsData.duration)}
              </span>
            </div>
          }
        />
        <WithIconContainer
          isHidden={eventsData.isAFB}
          Icon={<RepeatIcon />}
          Label={<span className={`${commonClasses.body17Regular} ${classes.secondryText}`}>{getRepeatTypeMessage()}</span>}
          alignStart
        />
        {eventsData?.allowedMaximumDays ? (
          <WithIconContainer
            Icon={<CalendarIconV2 />}
            Label={
              <span
                className={`${commonClasses.body17Regular} ${classes.secondryText}`}
              >{`Maximum of ${eventsData?.allowedMaximumDays} days to open`}</span>
            }
            rowGap="9px"
          >
            {/* <span className={`${commonClasses.body15Regular} ${classes.otherText}`}>{'Use Working time'}</span> */}
          </WithIconContainer>
        ) : (
          <></>
        )}
        <WithIconContainer
          isHidden={isEvent && !eventsData?.isAFB}
          Icon={eventsData?.isAFB ? <MeetingsEvent /> : <Meetings />}
          Label={<span className={classes.textEllipsis}>{eventsData?.bookables?.activityType || eventsData?.title}</span>}
          rowGap="0px"
        >
          <section className={classes.tableBox}>
            <div className={classes.tableRow}>
              <span className={`${commonClasses.body15Regular} ${classes.color}`}>Activity Length</span>
              <span className={`${commonClasses.body15Regular} ${classes.color}`}>
                {eventsData?.isAFB
                  ? actualDuration - eventsData?.afbData?.After?.duration - eventsData?.afbData?.Before?.duration
                  : eventsData?.bookables?.meetingTime}{' '}
                minutes
              </span>
            </div>
            <div className={classes.tableRow}>
              <span className={`${commonClasses.body15Regular} ${classes.color}`}>Before activity</span>
              <span className={`${commonClasses.body15Regular} ${classes.color}`}>
                {eventsData?.isAFB ? eventsData?.afbData?.Before?.duration : eventsData?.bookables?.beforeActivity} minutes
              </span>
            </div>
            <div className={classes.tableRow}>
              <span className={`${commonClasses.body15Regular} ${classes.color}`}>After activity</span>
              <span className={`${commonClasses.body15Regular} ${classes.color}`}>
                {eventsData?.isAFB ? eventsData?.afbData?.After?.duration : eventsData?.bookables?.afterActivity} minutes
              </span>
            </div>
          </section>
        </WithIconContainer>
        <WithIconContainer isHidden={isEvent} Icon={<Owner />} Label={'Owner'} rowGap="13px">
          <div className={classes.ownerdiv}>
            <Avatar className={classes.tokenAvatar} src={`${import.meta.env.VITE_DP_URL}${eventsData.organizer}/profile-pic.png`}>
              {getNameInitials(author)}
            </Avatar>
            <div>
              <p className={`${commonClasses.body15Regular} ${classes.pcolor}`}>{author}</p>
              <p className={`${commonClasses.body15Regular} ${classes.pcolor}`}>
                {eventsData?.roleId}, {eventsData?.tenantId}
              </p>
            </div>
          </div>
        </WithIconContainer>
        {eventsData?.callType === TM_IDS.VIDEO ? (
          <WithIconContainer
            isHidden={!isEvent || !Boolean(eventsData?.others)}
            Icon={<DescriptionIcon />}
            Label={'Video Call Link'}
            rowGap="13px"
          >
            <span className={`${commonClasses.body15Regular} ${classes.otherText}`}>{eventsData?.others}</span>
          </WithIconContainer>
        ) : (
          <></>
        )}
        {!organizerInperson && (
          <WithIconContainer isHidden={!isEvent} rowGap="13px">
            {!organizerInperson && showorganizerDetails()}
          </WithIconContainer>
        )}
        <WithIconContainer isHidden={!isEvent} Icon={<PeoplesIcon />} Label={'Guests'} rowGap="13px">
          <div className={classes.guestsContainer}>
            {organizerInperson && showorganizerDetails()}
            <div className={classes.wrapGuest}>
              {tenantParticipants.map((data, index) => {
                if (data?.value === organizerdetails?.value) return null;
                return (
                  <NameToken
                    userId={data?.value}
                    label={data?.label}
                    roleName={data?.role || ''}
                    tenant={data?.role ? 'amura' : ''}
                    statusIcon={
                      isAFB ? (
                        <AceeptedIcon />
                      ) : iconViewsAndACCeptDeclinedFunction(data?.value) === TM_IDS.YES ? (
                        <AceeptedIcon />
                      ) : iconViewsAndACCeptDeclinedFunction(data?.value) === TM_IDS.NO ? (
                        <DeclinedIcon />
                      ) : null
                    }
                  />
                );
              })}
            </div>
          </div>
        </WithIconContainer>
        <WithIconContainer
          isHidden={!isEvent || !Boolean(eventsData?.description)}
          Icon={<DescriptionIcon />}
          Label={'Description'}
          rowGap="13px"
        >
          <span className={`${commonClasses.body15Regular} ${classes.otherText}`}>{eventsData?.description}</span>
        </WithIconContainer>
        {eventsData?.notify && eventsData?.notify.length > 0 && (
          <WithIconContainer
            isHidden={!(isEvent && !eventsData.isAFB)}
            Icon={<NotificationIcon />}
            Label={`Remind ${getNotifyMessage(eventsData?.notify)}`}
            alignStart
          />
        )}
      </section>
      {!veiwButtonsFooter && !(userId === eventsData?.organizer) && !isAFB && !isSlot && !props.isReporteeEvent ? (
        <PanelFooter
          paddingX="20px"
          customStyle={classes.footerStyle}
          leftButtonText={'Decline'}
          righButtontText={'Accept'}
          disableLeftButton={visiblilty === 'No' || false}
          disableRightButton={visiblilty === 'Yes' || false}
          handleLeftButton={onDecline}
          handleRightButton={onAccept}
        />
      ) : null}
      {veiwButtonsFooter && !(userId === eventsData?.organizer) && !isAFB && !isSlot ? (
        <div className={classes.showEventStatus}>
          <span className={`${classes.statusText} ${commonClasses.body15Regular} `}>{`You ${
            visiblilty === TM_IDS.NO ? 'declined' : 'accepted'
          } this event.`}</span>
          <span className={`${classes.statusChange} ${commonClasses.body15Medium} `} onClick={() => setVeiwButtonsFooter(false)}>
            Change
          </span>
        </div>
      ) : null}
      <ModalBox
        modalTitle={MODAL_OBJECT[confirmModal.screen]?.heading}
        open={confirmModal.open}
        handleClose={onConfirmModalClose}
        buttonConfig={[
          { text: 'Cancel', variant: 'text', onClick: onConfirmModalClose },
          { text: 'Confirm', variant: 'contained', onClick: onConfirm },
        ]}
      >
        {isRepeatEvent ? (
          <RadioGroup variant={'radio'} options={RSVP_OPTIONS} value={rsvp.selected} setValue={onRsvpChange} />
        ) : (
          <span className={`${commonClasses.body15Regular} ${classes.secondryText}`}>Are you sure want to delete?</span>
        )}
      </ModalBox>
    </div>
  );
}
