import { memo, useEffect, useMemo, useState } from 'react';
import { useFetchUserName } from '../../../../../Common/Common.hooks';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { useAppSelector } from '../../../../../DisplayFramework/State/store';
import ChannalWIthDuration from '../../../../LibraryComponents/CallSchedulerWizards/CallWizard/ChannalWIthDuration';
import NameToken from '../../../../LibraryComponents/CallSchedulerWizards/NameToken/NameToken';
import MUIButton from '../../../../LibraryComponents/MUIButton/MUIButton';
import { filterUserData, settingColors } from './CallWizardMessage.functions';
import { useStyles } from './CallWizardMessage.styles';
import { ICallWizardComp, IMeetingDetails, IOrganizerDetails } from './CallWizardMessage.types';
import { useChatProvider } from '../../ChatNotesProvider';
import { useSetChatOpenedFlyout } from '../ChatInput/ChatFlyout/ChatFlyout.state';

function CallWizardComp(props: ICallWizardComp) {
  const { message, isTimeGreaterThenNhr, setScheduleURL } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

  const roles = useAppSelector((state) => state.dashboard.allUserRoles);
  const { userNames } = useAppSelector((s) => s.cache);
  const { roomUsers } = useChatProvider();

  const [meetingDetails, setMeetingDetails] = useState<IMeetingDetails>();
  const [organizerDetails, setOrganizerDetails] = useState<IOrganizerDetails>({ organizerName: '', organizerRoleName: '' });
  const [organizeerInperson, setOrganizeerInperson] = useState<boolean>(false);

  const { fetchUserName } = useFetchUserName();
  const setChatFlyout = useSetChatOpenedFlyout();

  useEffect(() => {
    (async () => {
      let colorsSettoObj = [];
      let filterParticipantdata = [];
      if (message?.scheduleData?.participants?.length > 0) {
        setOrganizeerInperson(
          message?.scheduleData?.participants?.some((person) => person.userId === message?.scheduleData?.organizer)
        );
        filterParticipantdata = await filterUserData(roomUsers, message?.scheduleData?.participants || [], roles, userNames);
      }
      colorsSettoObj = settingColors([...filterParticipantdata]);
      setMeetingDetails((pre) => {
        let result = {
          ...pre,
          persons: colorsSettoObj,
          scheduleData: message.scheduleData,
        };
        return result;
      });
      if (message?.scheduleData?.organizer) {
        let organizerName = await fetchUserName(message?.scheduleData?.organizer);
        let organizerRoleName = roles.find((role) => role?.roleId === message?.scheduleData?.organizerRoleId)?.roleName || '';
        setOrganizerDetails({ organizerName, organizerRoleName });
      }
    })();
    if (message?.ContextType === '@call') {
      let urlToOpen = message?.schedulerUniqueId
        ? `/scheduleACall?h=${message.schedulerUniqueId}`
        : `/scheduleACall?p=${message.userId}&u=${message.messageId}`;
      setScheduleURL(urlToOpen);
    }
  }, [message, roomUsers, userNames]);

  const organizerAvialbeinPersons: any = useMemo(
    () => meetingDetails?.persons.find((each) => each.id === meetingDetails?.scheduleData?.organizer)?.color,
    [meetingDetails]
  );

  const showorganizerDetails = () => {
    return (
      <div className={classes.organizerWrap}>
        <span className={`${classes.heading} ${commonClasses.sm10Medium}`}>Organizer</span>
        <div className={classes.organizerShowMoreCon}>
          <NameToken
            userId={meetingDetails?.scheduleData?.organizer}
            label={organizerDetails?.organizerName || ''}
            roleName={organizerDetails?.organizerRoleName || ''}
            isDot={Boolean(organizerAvialbeinPersons) || false}
            dotColor={organizerAvialbeinPersons || '#FFFFFF'}
          />
          {organizeerInperson && meetingDetails?.persons?.length > 1 ? (
            <span
              className={classes.showMore}
              onClick={() => {
                // setCallWizardFlow({ isOpen: true, entireMsgData: meetingDetails, openParticipantsView: true });
                setChatFlyout({
                  openedFlyout: 'callWizard',
                  props: {
                    isOpen: true,
                    entireMsgData: meetingDetails,
                    openParticipantsView: true,
                  },
                });
              }}
            >
              +{meetingDetails?.persons?.length - 1} More
            </span>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <section className={classes.sectionContainer}>
      <div className={classes.headerWithLink}>
        <span
          title={message?.scheduleData?.title}
          className={`${classes.evnetTitle} ${commonClasses.body15Medium} ${classes.longTexthandle}`}
        >
          {message.scheduleData.title || ''}
        </span>
      </div>
      <ChannalWIthDuration
        duration={message?.scheduleData?.duration}
        callType={message?.scheduleData?.channel}
        units={message?.scheduleData?.timeUnits}
      />
      {!organizeerInperson && meetingDetails?.scheduleData?.organizer && showorganizerDetails()}
      {meetingDetails?.persons?.length > 0 && (
        <>
          <div className={`${classes.participantLabel} ${commonClasses.body15Medium}`}>Participants</div>
          {organizeerInperson && meetingDetails?.scheduleData?.organizer && showorganizerDetails()}
          <div className={classes.tokenWrapper}>
            {!organizeerInperson &&
              meetingDetails?.persons.slice(0, 1).map((data, ind) => {
                if (data.id === message?.scheduleData?.organizer) return null;
                return (
                  <NameToken
                    key={data.id}
                    userId={data.id}
                    label={data.label}
                    roleName={data.roleName}
                    isDot={true}
                    dotColor={message?.ContextType === '@call' ? data.color : '#FFFFFF'}
                  />
                );
              })}
            {!organizeerInperson && meetingDetails?.persons?.length > 1 ? (
              <span
                className={classes.showMore}
                onClick={() => {
                  // setCallWizardFlow({ isOpen: true, entireMsgData: meetingDetails, openParticipantsView: true });
                  setChatFlyout({
                    openedFlyout: 'callWizard',
                    props: {
                      isOpen: true,
                      entireMsgData: meetingDetails,
                      openParticipantsView: true,
                    },
                  });
                }}
              >
                +{meetingDetails?.persons?.length - 1} More
              </span>
            ) : null}
          </div>
        </>
      )}
      {message?.scheduleData?.description && (
        <span className={`${classes.description} marginTB12 ${commonClasses.body15Regular}`}>
          {message?.scheduleData?.description || ''}
        </span>
      )}
      {message?.ContextType === '@call' && (
        <div className={classes.btnsCon}>
          <MUIButton
            variant="text"
            className={`${classes.buttonStyle} ${commonClasses.body15Medium} height28PaddingTB4LR16`}
            onClick={() => {
              // setCallWizardFlow({ isOpen: true, messageData: message, openRemovePopUp: true });
              setChatFlyout({
                openedFlyout: 'callWizard',
                props: {
                  isOpen: true,
                  messageData: message,
                  openRemovePopUp: true,
                },
              });
            }}
            disabled={isTimeGreaterThenNhr}
          >
            Cancel
          </MUIButton>
          <MUIButton
            variant="contained"
            className={`${classes.buttonStyle} ${commonClasses.body15Medium} height28PaddingTB4LR16 marginL16`}
            disabled={isTimeGreaterThenNhr}
            onClick={() => {
              // setCallWizardFlow({
              //   isOpen: true,
              //   entireMsgData: meetingDetails,
              //   messageData: message,
              //   openBookingSlots: true,
              // });
              setChatFlyout({
                openedFlyout: 'callWizard',
                props: {
                  isOpen: true,
                  entireMsgData: meetingDetails,
                  messageData: message,
                  openBookingSlots: true,
                },
              });
            }}
          >
            Book Appointment
          </MUIButton>
        </div>
      )}
      {(message?.ContextType === '@callCancel' || message?.ContextType === '@callDeclined') && (
        <div className={classes.confirmContainer}>
          <div className={classes.statusContainer}>
            <span className={`${classes.statusText} ${commonClasses.body15Medium}`}>Cancelled</span>
          </div>
        </div>
      )}
    </section>
  );
}

export default memo(CallWizardComp);
