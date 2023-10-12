import moment from 'moment';
import React, { Dispatch, SetStateAction, memo, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFetchUserName } from '../../../../Common/Common.hooks';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { IAllRoleDetails } from '../../../PanelComponents/MyListPanel/MyList/MyList.types';
import Button from '../../MUIButton/MUIButton';
import StaticCalendar from '../../MUIDatePicker/StaticCalendar';
import MUIDrawer from '../../MUIDrawer/MUIDrawer';
import MUISkeleton from '../../MUISkeleton/MUISkeleton';
import NewTimeSlot from '../../NewTimeSlot/NewTimeSlot';
import NameToken from '../NameToken/NameToken';
import NormalMsgInput from '../NormalMsgInput/NormalMsgInput';
import { NoSlotsIocn } from '../SvgImages/NoSlotsIocn';
import ErrorToaster from './../../../../Common/ErrorToaster';
import {
  checkUserDetails,
  getUnAllocatedBookables,
  handleCloseWizard,
  handleSlotBookCall,
  handledeleteslotEventCall,
  setColorstoslots,
} from './CallWizard.function';
import { useStyles } from './CallWizard.styles';
import ChannalWIthDuration from './ChannalWIthDuration';
import {
  useChatOpenedFlyout,
  useSetChatOpenedFlyout,
} from '../../../PanelComponents/ChatNotes/Components/ChatInput/ChatFlyout/ChatFlyout.state';
import { ChatFlyoutDrawer } from '../../../PanelComponents/ChatNotes/Components/ChatInput/ChatFlyout/ChatFlyoutDrawer';

interface IProps {
  setCallWizardFlow: Dispatch<SetStateAction<any>>;
  CallWizardFlow: any;
  sessions: any;
  selectedClient: any;
}

function BookingAvaibility(props: IProps) {
  const { sessions, selectedClient } = props;
  const { entireMsgData, messageData, openRemovePopUp, openParticipantsView, openCancelMsg, openBookingSlots } = props as any;

  //
  const setChatFlyout = useSetChatOpenedFlyout();
  const setCallWizardFlow = (...args: any) => {
    setChatFlyout({
      openedFlyout: undefined,
      props: undefined,
    });
  };

  const { classes } = useStyles(props);
  const { id: panelId } = useCurrentPanel();
  const roles: IAllRoleDetails[] = useSelector((state: IRootState) => state.dashboard.allUserRoles);

  const commonClasses = useCommonStyles();
  const [showAllRole, setShowAllRole] = useState(false);

  const [startDateFormat, setStartDateFormat] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
  const [endDateFormat, setEndDateFormat] = useState(new Date(new Date().setHours(23, 59, 59, 999)));

  const [availableTimeSlots, setAvailableTimeSlots] = React.useState<any>([]);
  const [modifiedSlots, setModifiedSlots] = useState([]);

  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<Date>(null);
  const [slotCreateCheck, setSlotCreateCheck] = useState(0);

  const [controlView, setControlView] = useState(true);
  const [secondaryFlow, setSecondaryFlow] = useState<any>({
    isOpen: false,
  });

  const [descriptionText, setDescriptionText] = useState('');

  const [slotsDotStatus, setSlotsDotStatus] = useState(false);

  const [loading, setLoading] = useState(false);
  const [organizerDetails, setOrganizerDetails] = useState<{ organizerName: string; organizerRoleName: string }>({
    organizerName: '',
    organizerRoleName: '',
  });
  const [organizeerInperson, setOrganizeerInperson] = useState<boolean>(false);

  const { fetchUserName } = useFetchUserName();

  useEffect(() => {
    (async () => {
      if (entireMsgData?.scheduleData?.organizer) {
        let organizerName = await fetchUserName(entireMsgData?.scheduleData?.organizer);
        let organizerRoleName =
          roles.find((role) => role?.roleId === entireMsgData?.scheduleData?.organizerRoleId)?.roleName || '';
        setOrganizerDetails({ organizerName, organizerRoleName });
      }
      if (entireMsgData?.scheduleData?.participants?.length > 0) {
        setOrganizeerInperson(
          entireMsgData?.scheduleData?.participants?.some((person) => person.userId === entireMsgData?.scheduleData?.organizer)
        );
      }
    })();
  }, [props]);

  useEffect(() => {
    if (!openBookingSlots) return;
    (async () => {
      try {
        setLoading(true);
        let allowedMaximumDays = 1;
        let start: any = new Date();
        start.setHours(0, 0, 0, 0);
        start = moment(start);
        let end: any = new Date(startDateFormat);
        end.setHours(0, 0, 0, 0);
        end = moment(end);
        allowedMaximumDays = end.diff(start, 'days') + 1;
        let payload = {
          participants: messageData?.scheduleData?.participants || [],
          roleIds: messageData?.scheduleData?.roleIds || [],
          duration: messageData?.scheduleData?.duration || '',
          channel: messageData?.scheduleData?.channel || '',
          startDate: startDateFormat.toISOString(),
          endDate: endDateFormat.toISOString(),
          allowedMaximumDays: allowedMaximumDays || 0,
          tenantId: messageData?.tenantId || 'amura',
        };
        console.log(payload, 'get unallocated bookables');
        let availableSlotsData = await getUnAllocatedBookables(panelId, payload);
        if (availableSlotsData?.data?.length > 0) {
          let availableSlots = availableSlotsData?.data;
          availableSlots = availableSlots.filter((slot) => new Date().getTime() < new Date(slot.startTime).getTime());
          availableSlots.sort((a, b) => {
            let c: any = new Date(a.startTime).getTime() || new Date().getTime();
            let d: any = new Date(b.startTime).getTime() || new Date().getTime();
            return c - d;
          });
          setAvailableTimeSlots(availableSlots);
        } else {
          setAvailableTimeSlots([]);
          setModifiedSlots([]);
        }
      } catch (error) {
        ErrorToaster('error in getting slots', panelId, 'error');
        setLoading(false);
      }
    })();
  }, [props, startDateFormat]);

  useEffect(() => {
    setSlotsDotStatus(checkUserDetails(entireMsgData));
    let modifedData = setColorstoslots(entireMsgData?.persons || [], availableTimeSlots);
    setModifiedSlots(modifedData);
    setLoading(false);
  }, [availableTimeSlots]);

  useEffect(() => {
    if (selectedTimeSlot !== null && slotCreateCheck === 0) {
      setControlView(false);
      setSecondaryFlow({ isOpen: true, openConfirmMsg: true, placeholder: 'Add meeting description' });
    }
  }, [selectedTimeSlot]);

  useEffect(() => {
    if (secondaryFlow?.openConfirmMsg && descriptionText?.trim().length > 0) {
      handleSlotBookCall({
        selectedClient,
        sessions,
        messageData,
        selectedTimeSlot,
        setSelectedTimeSlot,
        modifiedSlots,
        startDateFormat,
        setStartDateFormat,
        endDateFormat,
        setEndDateFormat,
        setSlotCreateCheck,
        descriptionText,
        setCallWizardFlow,
        setControlView,
        setSecondaryFlow,
        setDescriptionText,
        panelId,
      });
    }
    if (openCancelMsg && descriptionText?.trim().length > 0) {
      handledeleteslotEventCall({
        messageData,
        selectedClient,
        sessions,
        descriptionText,
        setCallWizardFlow,
        setDescriptionText,
        panelId,
      });
    }
  }, [descriptionText]);

  const showmore = () => {
    setControlView(false);
    setShowAllRole(true);
  };
  const handleCloseByCross = () => {
    setDescriptionText('');
    setCallWizardFlow({ isOpen: false });
  };

  const handleParticipantsView = () => {
    setShowAllRole(false);
    setControlView(true);
  };

  const organizerAvialbeinPersons = useMemo(() => {
    return entireMsgData?.persons.find((each) => each.id === entireMsgData?.scheduleData?.organizer)?.color;
  }, [entireMsgData]);

  const showorganizerDetails = (personsView?: boolean) => {
    return (
      <div className={classes.organizerWrap}>
        <span className={`${classes.heading} ${commonClasses.sm10Medium}`}>Organizer</span>
        <div className={classes.organizerShowMoreCon}>
          <NameToken
            userId={entireMsgData?.scheduleData.organizer}
            label={organizerDetails?.organizerName || ''}
            roleName={organizerDetails?.organizerRoleName || ''}
            isDot={Boolean(organizerAvialbeinPersons) || false}
            dotColor={organizerAvialbeinPersons || '#FFFFFF'}
          />
          {!personsView && organizeerInperson && entireMsgData?.persons?.length > 1 ? (
            <span className={classes.showMore} onClick={showmore}>
              +{entireMsgData?.persons?.length - 1} More
            </span>
          ) : null}
        </div>
      </div>
    );
  };
  return (
    <div>
      {openBookingSlots && controlView && (
        <ChatFlyoutDrawer header={entireMsgData?.scheduleData?.title || ''} open={true} onClose={handleCloseByCross}>
          <div className={classes.wrapper}>
            <div className={classes.fixedTop}>
              <ChannalWIthDuration
                duration={entireMsgData?.scheduleData?.duration}
                callType={entireMsgData?.scheduleData?.channel}
                units={entireMsgData?.scheduleData?.timeUnits}
              />
              {!organizeerInperson && entireMsgData?.scheduleData?.organizer && showorganizerDetails()}
              {entireMsgData?.persons?.length > 0 && (
                <>
                  <div className={`${classes.participantLabel} ${commonClasses.body15Medium}`}>Participants</div>
                  {organizeerInperson && entireMsgData?.scheduleData?.organizer && showorganizerDetails()}

                  {!organizeerInperson && (
                    <div className={classes.tokenWrapper}>
                      {entireMsgData?.persons.slice(0, 1).map((data, ind) => {
                        if (data.id === entireMsgData?.scheduleData?.organizer) return null;
                        return (
                          <NameToken
                            key={data?.id}
                            userId={data.id}
                            label={data.label}
                            roleName={data.roleName}
                            isDot={true}
                            dotColor={data.color}
                          />
                        );
                      })}
                      {entireMsgData?.persons?.length > 1 ? (
                        <span className={classes.showMore} onClick={showmore}>
                          +{entireMsgData?.persons?.length - 1} More
                        </span>
                      ) : null}
                    </div>
                  )}
                </>
              )}
              <hr className={classes.devider}></hr>
            </div>
            <div className={classes.scrollBody}>
              <StaticCalendar
                date={startDateFormat}
                minDate={new Date()}
                setDate={(e) => {
                  setStartDateFormat(new Date(new Date(e).setHours(0, 0, 0, 0)));
                  setEndDateFormat(new Date(new Date(e).setHours(23, 59, 59, 999)));
                }}
                customStyle={classes.calenderBg}
              />
              <div className={classes.timeSlotsGrid}>
                {!loading &&
                  modifiedSlots?.length > 0 &&
                  modifiedSlots?.map((slot, index) => (
                    <div className={classes.slotWidth} key={index}>
                      <NewTimeSlot
                        slotDetails={slot}
                        timeSlot={new Date(slot.startTime)}
                        participants={slot?.usersWithcolordata || []}
                        isSelected={
                          slotCreateCheck === 0 ? new Date(slot.startTime).getTime() === selectedTimeSlot?.getTime() : false
                        }
                        handleClick={(e) => {
                          setSelectedTimeSlot(new Date(e));
                        }}
                        isDot={slotsDotStatus}
                      />
                    </div>
                  ))}
                {!loading && !modifiedSlots?.length && <div className={classes.noSlotsStyle}>{NoSlotsIocn}</div>}

                {loading && (
                  <div className={classes.loaderCon}>
                    <MUISkeleton variant={'rectangular'} height={'40px'} style={{ margin: '5px 0px' }} />
                    <MUISkeleton variant={'rectangular'} height={'40px'} style={{ margin: '5px 0px' }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </ChatFlyoutDrawer>
      )}
      {openRemovePopUp && (
        <ChatFlyoutDrawer anchor={'bottom'} header={'Are you sure'} open={true} onClose={handleCloseByCross}>
          <div className={classes.wrapperCancel}>
            <span className={`${classes.wrapperText}  ${commonClasses.body15Regular}`}>Do you want to cancel.</span>
            <div className={classes.footerStyle}>
              <Button className={`  ${commonClasses.body15Medium}`} onClick={() => handleCloseByCross()}>
                No
              </Button>
              <Button
                className={`  ${commonClasses.body15Medium}`}
                variant="contained"
                onClick={() => {
                  handleCloseWizard({ panelId, messageData, sessions, setCallWizardFlow });
                }}
              >
                Yes
              </Button>
            </div>
          </div>
        </ChatFlyoutDrawer>
      )}
      {secondaryFlow?.openAvaibility && (
        <ChatFlyoutDrawer anchor={'bottom'} header={'Availability already booked'} open={true} onClose={handleCloseByCross}>
          <div className={classes.wrapperCancel}>
            <span className={`${classes.wrapperText}  ${commonClasses.body15Regular}`}>
              The availability you are trying to book is already booked.
            </span>
            <div className={classes.footerStyle}>
              <Button
                className={`  ${commonClasses.body15Medium}`}
                onClick={() => {
                  handleCloseByCross();
                }}
              >
                Close
              </Button>
              <Button
                className={`  ${commonClasses.body15Medium}`}
                variant="contained"
                onClick={() => {
                  setDescriptionText('');
                  setSecondaryFlow({ isOpen: false });
                  setControlView(true);
                }}
              >
                Book another availability
              </Button>
            </div>
          </div>
        </ChatFlyoutDrawer>
      )}

      {secondaryFlow?.openConfirmMsg && (
        <ChatFlyoutDrawer anchor={'bottom'} header={'Add meeting description'} open={true} onClose={handleCloseByCross}>
          <NormalMsgInput placeholder={secondaryFlow?.placeholder} setDescriptionText={setDescriptionText} />
        </ChatFlyoutDrawer>
      )}

      {openCancelMsg && (
        <ChatFlyoutDrawer anchor={'bottom'} header={'Reason for Cancelling'} open={true} onClose={handleCloseByCross}>
          <NormalMsgInput placeholder={'Enter reason for cancelling'} setDescriptionText={setDescriptionText} />
        </ChatFlyoutDrawer>
      )}
      {showAllRole && (
        <ChatFlyoutDrawer anchor={'bottom'} header={'Participants'} open={true} onClose={handleParticipantsView}>
          <div className={classes.tokenWrapper2}>
            {entireMsgData?.scheduleData?.organizer && showorganizerDetails(true)}
            {entireMsgData?.persons.map((data, ind) => {
              if (entireMsgData?.scheduleData?.organizer === data.id) return null;
              return (
                <NameToken
                  key={data.id}
                  userId={data.id}
                  label={data.label}
                  roleName={data.roleName}
                  isDot={true}
                  dotColor={data.color}
                />
              );
            })}
          </div>
        </ChatFlyoutDrawer>
      )}
      {/* showing participants in drawer */}
      {openParticipantsView && (
        <ChatFlyoutDrawer anchor={'bottom'} header={'Participants'} open={true} onClose={handleCloseByCross}>
          <div className={classes.tokenWrapper2}>
            {entireMsgData?.scheduleData?.organizer && showorganizerDetails(true)}
            <div className={classes.wrap}>
              {entireMsgData?.persons.map((data, ind) => {
                if (entireMsgData?.scheduleData?.organizer === data.id) return null;
                return (
                  <NameToken
                    key={data.id}
                    userId={data.id}
                    label={data.label}
                    roleName={data.roleName}
                    isDot={true}
                    dotColor={data.color}
                  />
                );
              })}
            </div>
          </div>
        </ChatFlyoutDrawer>
      )}
    </div>
  );
}

export default memo(BookingAvaibility);
