import React, { memo, useEffect, useMemo, useState } from 'react';
import { ICallWizardConfirmViewComp, IMeetingDetails, IOrganizerDetails } from './CallWizardMessage.types';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { useFetchUserName } from '../../../../../Common/Common.hooks';
import ChannalWIthDuration from '../../../../LibraryComponents/CallSchedulerWizards/CallWizard/ChannalWIthDuration';
import NameToken from '../../../../LibraryComponents/CallSchedulerWizards/NameToken/NameToken';
import { useAppSelector } from '../../../../../DisplayFramework/State/store';
import { useUserSession } from '../../../../../DisplayFramework/State/Slices/Auth';
import MUIButton from '../../../../LibraryComponents/MUIButton/MUIButton';
import DateWithTimeView from '../../../../LibraryComponents/CallSchedulerWizards/CallWizard/DateWithTimeView';
import { convertTimeWithOffset, getTimeZoneAbbrevation } from '../../../../../Common/Common.functions';
import { useStyles } from './CallWizardMessage.styles';
import { useChatProvider } from '../../ChatNotesProvider';
import { filterUserData, settingColors } from './CallWizardMessage.functions';

function CallWizardConfirmViewComp(props: ICallWizardConfirmViewComp) {
  const { message, setCallWizardFlow, setScheduleURL } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

  const roles = useAppSelector((state) => state.dashboard.allUserRoles);
  const { userNames } = useAppSelector((s) => s.cache);
  const { roomUsers } = useChatProvider();
  const session = useUserSession();

  const [meetingDetails, setMeetingDetails] = useState<IMeetingDetails>();
  const [cancelUserName, setCancelUserName] = useState('');
  const [organizerDetails, setOrganizerDetails] = useState<IOrganizerDetails>({ organizerName: '', organizerRoleName: '' });
  const [organizeerInperson, setOrganizeerInperson] = useState<boolean>(false);

  const { fetchUserName } = useFetchUserName();

  useEffect(() => {
    (async () => {
      if (message?.scheduleData) {
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
        if (message?.scheduleData?.cancellation?.cancelledBy) {
          if (message?.scheduleData?.cancellation?.cancelledBy === session.user.id) {
            setCancelUserName('You');
          } else {
            let cancelSUerName = await fetchUserName(message?.scheduleData?.cancellation?.cancelledBy);
            setCancelUserName(cancelSUerName);
          }
        }
      }
    })();
    if (message?.ContextType === '@callScheduled' || message?.ContextType === '@callCancelBooked') {
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
                setCallWizardFlow({ isOpen: true, entireMsgData: meetingDetails, openParticipantsView: true });
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
      <div className={classes.titleWithLink}>
        <span title={message?.scheduleData?.title} className={`${classes.evnetTitle} ${commonClasses.body17Medium}`}>
          {`Event ${message?.scheduleData?.cancellation?.cancelledBy ? 'Cancelled' : 'Confirmed'}`}
        </span>
      </div>
      <div className={classes.headerWithLink}>
        <span
          title={message?.scheduleData?.title}
          className={`${classes.evnetTitle} ${commonClasses.body15Medium} ${classes.longTexthandle}`}
        >
          {message.scheduleData.title || ''}
        </span>
      </div>

      {meetingDetails?.scheduleData?.fromTime && meetingDetails?.scheduleData?.toTime && (
        <DateWithTimeView
          fromTime={
            meetingDetails?.scheduleData?.fromTime && meetingDetails?.scheduleData?.clientBookedTimeZone
              ? convertTimeWithOffset(meetingDetails?.scheduleData?.fromTime, meetingDetails?.scheduleData?.clientBookedTimeZone)
              : meetingDetails?.scheduleData?.fromTime
          }
          toTime={
            meetingDetails?.scheduleData?.toTime && meetingDetails?.scheduleData?.clientBookedTimeZone
              ? convertTimeWithOffset(meetingDetails?.scheduleData?.toTime, meetingDetails?.scheduleData?.clientBookedTimeZone)
              : meetingDetails?.scheduleData?.toTime
          }
          timezone={
            meetingDetails?.scheduleData?.clientBookedTimeZone
              ? getTimeZoneAbbrevation(meetingDetails?.scheduleData?.clientBookedTimeZone)
              : ''
          }
        />
      )}
      <ChannalWIthDuration
        duration={message?.scheduleData?.duration}
        callType={message?.scheduleData?.channel}
        units={message?.scheduleData?.timeUnits}
      />
      {message?.ContextType !== '@callCancel' && (
        <>
          <div className={`${classes.marginStyles} marginB16`}>
            {/* <EventLinkWithURL urlLinkData={'meet.google.com/sdfskkdummy link'} /> */}
          </div>
        </>
      )}
      {!organizeerInperson && meetingDetails?.scheduleData?.organizer && showorganizerDetails()}
      {meetingDetails?.persons?.length > 0 && (
        <>
          <div className={`${classes.participantLabel} ${commonClasses.body15Medium}`}>Participants</div>
          {organizeerInperson && meetingDetails?.scheduleData?.organizer && showorganizerDetails()}
          <div className={classes.tokenWrapper}>
            {!organizeerInperson &&
              meetingDetails?.persons?.length > 0 &&
              (meetingDetails?.persons.slice(0, 1) || []).map((data) => {
                if (data.id === message?.scheduleData?.organizer) return null;
                return (
                  <NameToken
                    key={data.id}
                    userId={data.id}
                    label={data?.label}
                    roleName={data?.roleName}
                    isDot={true}
                    dotColor={data?.color || '#FFFFFF'}
                    fullName={data?.fullName}
                  />
                );
              })}
            {!organizeerInperson && meetingDetails?.persons?.length > 1 ? (
              <span
                className={classes.showMore}
                onClick={() => {
                  setCallWizardFlow({ isOpen: true, entireMsgData: meetingDetails, openParticipantsView: true });
                }}
              >
                +{meetingDetails?.persons?.length - 1} More
              </span>
            ) : null}
          </div>
        </>
      )}
      {message?.scheduleData?.description && (
        <div className={`${classes.textContainer} ${classes.marginStyles} marginT16`}>
          <span className={`${classes.evnetTitle} ${commonClasses.body15Medium} ${classes.marginStyles} marginB8`}>
            Objective
          </span>
          <span className={`${classes.description} marginB12 ${commonClasses.body15Regular}`}>
            {message?.scheduleData?.description || ''}
          </span>
        </div>
      )}
      {message?.scheduleData?.cancellation?.reason &&
        message?.scheduleData?.cancellation?.cancelledBy &&
        message?.ContextType === '@callCancelBooked' && (
          <div className={`${classes.textContainer} ${classes.marginStyles} marginT16`}>
            <span className={`${classes.evnetTitle} ${commonClasses.body15Medium} ${classes.marginStyles} marginB8`}>Reason</span>
            <span className={`${classes.description} ${commonClasses.body15Regular}`}>
              {`${cancelUserName} : ${message.scheduleData.cancellation.reason} `}
            </span>
          </div>
        )}
      {message?.ContextType === '@callScheduled' && (
        <div className={`${classes.buttonContainer} marginT8`}>
          <MUIButton
            variant="contained"
            className={`${classes.buttonStyle} ${commonClasses.body15Medium}`}
            onClick={() => {
              setCallWizardFlow({
                isOpen: true,
                entireMsgData: meetingDetails,
                message: message,
                openCancelMsg: true,
              });
            }}
          >
            Cancel
          </MUIButton>
        </div>
      )}
    </section>
  );
}

export default memo(CallWizardConfirmViewComp);
