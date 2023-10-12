import React, { memo, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  convertTimeWithOffset,
  getTimeZoneAbbrevation,
  isTimeDifferenceGreaterThanNHours,
} from '../../../../Common/Common.functions';
import { useFetchUserName } from '../../../../Common/Common.hooks';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { IAllRoleDetails } from '../../../PanelComponents/MyListPanel/MyList/MyList.types';
import { ITagObject, globalRepliedToMessage } from '../../../PanelComponents/Notes/components/MessageInputNew/MessageInput.types';
import { DownArrowIcon } from '../../../SVGs/Common';
import { ICancellation } from '../../ChatComponent/ChatComponents.types';
import ProfileWithName from '../../ChatComponent/Message/ProfileWithName/ProfileWithName';
import Button from '../../MUIButton/MUIButton';
import ThreeDotMenu from '../../ThreeDotMenu/ThreeDotMenu';
import NameToken from '../NameToken/NameToken';
import { copyToClipboard, filterUserData, settingColors } from './CallWizard.function';
import { useStyles } from './CallWizard.styles';
import { IMeetingDetails, IProps } from './CallWizard.types';
import ChannalWIthDuration from './ChannalWIthDuration';
import DateWithTimeView from './DateWithTimeView';

function CallWizardConfirmView(props: IProps) {
  const {
    message: messageData,
    roomUsers,
    sessions,
    setCallWizardFlow,
    isFirstMessage,
    setOpenReply,
    setRepliedToMessage,
    msgHighlight,
  } = props;
  const { classes } = useStyles(props);
  const { id: panelId } = useCurrentPanel();
  const commonClasses = useCommonStyles();
  const [scheduleURL, setScheduleURL] = useState('');
  const [cancelUserName, setCancelUserName] = useState('');
  const { fetchUserName } = useFetchUserName();
  const [showDownArrow, setShowDownArrow] = useState(false);

  const handleOnReplyClick = (data) => {
    if (data === 'REPLY') {
      setShowDownArrow(false);
      setOpenReply(true);
      setRepliedToMessage(messageData);
      globalRepliedToMessage.message = JSON.parse(JSON.stringify(messageData));
      return;
    }
    if (
      data === 'COPY_LINK' &&
      messageData?.ContextType === '@call' &&
      !isTimeDifferenceGreaterThanNHours(messageData?.receivedTime, 168)
    ) {
      copyToClipboard(scheduleURL, panelId);
    }
  };

  const getCancelledPersonName = (persons: Array<any>, loggedInUser: string, cancellation: ICancellation) => {
    if (cancellation.cancelledBy === loggedInUser) {
      return 'You';
    }
    if (persons?.length > 0) {
      return persons.find((person) => person.id === cancellation.cancelledBy)?.label || cancellation.cancelledBy;
    }
    return cancellation.cancelledBy;
  };
  const roles: IAllRoleDetails[] = useSelector((state: IRootState) => state.dashboard.allUserRoles);
  const [meetingDetails, setMeetingDetails] = React.useState<IMeetingDetails>();
  const teamWhoDealt: ITagObject = useSelector((state: IRootState) => state.dashboard.teamWhoDealt);
  const ProfName =
    isFirstMessage && messageData.senderId !== 'SYSTEM' && messageData.senderId
      ? teamWhoDealt[messageData.senderId]
      : messageData.senderId;
  const [organizerDetails, setOrganizerDetails] = useState<{ organizerName: string; organizerRoleName: string }>({
    organizerName: '',
    organizerRoleName: '',
  });
  const [organizeerInperson, setOrganizeerInperson] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (messageData?.scheduleData) {
        let colorsSettoObj = [];
        let filterParticipantdata = [];
        if (messageData?.scheduleData?.participants?.length > 0) {
          setOrganizeerInperson(
            messageData?.scheduleData?.participants?.some((person) => person.userId === messageData?.scheduleData?.organizer)
          );
          filterParticipantdata = await filterUserData(
            roomUsers,
            messageData?.scheduleData?.participants || [],
            roles,
            teamWhoDealt
          );
        }
        colorsSettoObj = settingColors([...filterParticipantdata]);
        setMeetingDetails((pre) => {
          let result = {
            ...pre,
            persons: colorsSettoObj,
            scheduleData: messageData.scheduleData,
          };
          return result;
        });
        if (messageData?.scheduleData?.organizer) {
          let organizerName = await fetchUserName(messageData?.scheduleData?.organizer);
          let organizerRoleName =
            roles.find((role) => role?.roleId === messageData?.scheduleData?.organizerRoleId)?.roleName || '';
          setOrganizerDetails({ organizerName, organizerRoleName });
        }
        if (messageData?.scheduleData?.cancellation?.cancelledBy) {
          if (messageData?.scheduleData?.cancellation?.cancelledBy === sessions.user.id) {
            setCancelUserName('You');
          } else {
            let cancelSUerName = await fetchUserName(messageData?.scheduleData?.cancellation?.cancelledBy);
            setCancelUserName(cancelSUerName);
          }
        }
      }
    })();
    if (messageData?.ContextType === '@callScheduled' || messageData?.ContextType === '@callCancelBooked') {
      let urlToOpen = messageData?.schedulerUniqueId
        ? `/scheduleACall?h=${messageData.schedulerUniqueId}`
        : `/scheduleACall?p=${messageData.userId}&u=${messageData.messageId}`;
      setScheduleURL(urlToOpen);
    }
  }, [messageData, roomUsers, teamWhoDealt]);

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
      {isFirstMessage && (
        <ProfileWithName
          profileName={ProfName}
          // profileName={getSenderName(staffList, message.senderId) ? getSenderName(staffList, message.senderId) : ''}
          profileURL={`${import.meta.env.VITE_DP_URL}${messageData.senderId}/profile-pic.png`}
        />
      )}
      <div
        className={`${classes.mainContainer}`}
        style={msgHighlight === messageData?.messageId ? { background: '#f0f0f0' } : { background: '#f8f8f8' }}
        onPointerEnter={(e) => setShowDownArrow(true)}
        onPointerLeave={(e) => setShowDownArrow(false)}
      >
        <div className={`${classes.downArrowWrapper}`} style={{ opacity: showDownArrow ? 1 : 0 }}>
          <div className={classes.downArrowBG} />
          <div className={classes.downArrow}>
            <ThreeDotMenu
              isDivider
              options={[
                { label: 'Reply', value: 'REPLY' },
                { label: 'Copy Link', value: 'COPY_LINK' },
              ]}
              handleClick={handleOnReplyClick}
              renderButton={<DownArrowIcon />}
              usePopOver
              setIsOpen={setShowDownArrow}
              anchorAlignment={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              popOverAlignment={{
                horizontal: 'right',
                vertical: 'top',
              }}
            />
          </div>
        </div>
        <div className={classes.titleWithLink}>
          <span title={messageData?.scheduleData?.title} className={`${classes.evnetTitle} ${commonClasses.body17Medium}`}>
            {`Event ${messageData?.scheduleData?.cancellation?.cancelledBy ? 'Cancelled' : 'Confirmed'}`}
          </span>
        </div>
        <div className={classes.headerWithLink}>
          <span
            title={messageData?.scheduleData?.title}
            className={`${classes.evnetTitle} ${commonClasses.body15Medium} ${classes.longTexthandle}`}
          >
            {messageData.scheduleData.title || ''}
          </span>
        </div>

        {meetingDetails?.scheduleData?.fromTime && meetingDetails?.scheduleData?.toTime && (
          <DateWithTimeView
            fromTime={
              meetingDetails?.scheduleData?.fromTime && meetingDetails?.scheduleData?.clientBookedTimeZone
                ? convertTimeWithOffset(
                    meetingDetails?.scheduleData?.fromTime,
                    meetingDetails?.scheduleData?.clientBookedTimeZone
                  )
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
          duration={messageData?.scheduleData?.duration}
          callType={messageData?.scheduleData?.channel}
          units={messageData?.scheduleData?.timeUnits}
        />
        {messageData?.ContextType !== '@callCancel' && (
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
                  if (data.id === messageData?.scheduleData?.organizer) return null;
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
        {messageData?.scheduleData?.description && (
          <div className={`${classes.textContainer} ${classes.marginStyles} marginT16`}>
            <span className={`${classes.evnetTitle} ${commonClasses.body15Medium} ${classes.marginStyles} marginB8`}>
              Objective
            </span>
            <span className={`${classes.description} marginB12 ${commonClasses.body15Regular}`}>
              {messageData?.scheduleData?.description || ''}
            </span>
          </div>
        )}
        {messageData?.scheduleData?.cancellation?.reason &&
          messageData?.scheduleData?.cancellation?.cancelledBy &&
          messageData?.ContextType === '@callCancelBooked' && (
            <div className={`${classes.textContainer} ${classes.marginStyles} marginT16`}>
              <span className={`${classes.evnetTitle} ${commonClasses.body15Medium} ${classes.marginStyles} marginB8`}>
                Reason
              </span>
              <span className={`${classes.description} ${commonClasses.body15Regular}`}>
                {`${cancelUserName} : ${messageData.scheduleData.cancellation.reason} `}
              </span>
            </div>
          )}
        {messageData?.ContextType === '@callScheduled' && (
          <div className={`${classes.buttonContainer} marginT8`}>
            <Button
              variant="contained"
              className={`${classes.buttonStyle} ${commonClasses.body15Medium}`}
              onClick={() => {
                setCallWizardFlow({
                  isOpen: true,
                  entireMsgData: meetingDetails,
                  messageData: messageData,
                  openCancelMsg: true,
                });
              }}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default memo(CallWizardConfirmView);
