import React, { memo, useEffect, useState } from 'react';
import { cancelBookingSlotAPI, getAllStaffRoles, getEsDataforUsers } from '../NewCallSchedulerWizard.functions';
import { ICancelBooking, IProps } from './SuccessWizard.types';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { AmuraLogo, CancelIcon, SuccessIcon } from '../../../SVGs/Common';
import { useStyles } from './SuccessWizard.styles';
import DateWithTimeView from '../../CallSchedulerWizards/CallWizard/DateWithTimeView';
import ChannalWIthDuration from '../../CallSchedulerWizards/CallWizard/ChannalWIthDuration';
import EventLinkWithURL from '../../CallSchedulerWizards/CallWizard/EventLinkWithURL';
import NameToken from '../../CallSchedulerWizards/NameToken/NameToken';
import { convertTimeWithOffset, getTimeZoneAbbrevation, getUserNameFromES } from '../../../../Common/Common.functions';
import Button from './../../MUIButton/MUIButton';
import InputField from '../../InputField/InputField';
import { settingColors } from '../../CallSchedulerWizards/CallWizard/CallWizard.function';
import { IMettingDetails, IOrganizerDetails } from '../NewCallSchedulerWizard.types';
const MemoInputField = memo(InputField);
export default function SuccessWizard(props: IProps) {
  const { messageData, setModifiedMessageData } = props;
  const { classes } = useStyles();
  const commonClass = useCommonStyles();
  const [meetingDetails, setMeetingDetails] = useState<IMettingDetails | any>({});
  const [patientName, setPatientName] = useState<string>('');
  const [enabledCancel, setEnabledCancel] = useState<boolean>(false);
  const [canelDescription, setCancelDescription] = useState<string>('');
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);
  const [organizerDetails, setOrganizerDetails] = useState<IOrganizerDetails>({
    id: '',
    label: '',
    roleId: '',
    roleName: '',
    fullName: '',
  });
  const [organizeerInperson, setOrganizeerInperson] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (messageData?.scheduleData) {
        let rolesData = await getAllStaffRoles();
        let colorsSettoObj = [];
        if (messageData?.scheduleData?.participants?.length > 0) {
          setOrganizeerInperson(
            messageData?.scheduleData?.participants?.some((each) => each.userId === messageData?.scheduleData?.organizer)
          );
          let filterParticipantdata = await getEsDataforUsers(messageData?.scheduleData?.participants, rolesData);
          colorsSettoObj = settingColors([...filterParticipantdata]);
        }
        let nameFromEs = await getUserNameFromES(messageData?.userId);
        setPatientName(nameFromEs);
        setMeetingDetails((pre) => ({
          ...pre,
          persons: colorsSettoObj,
          scheduleData: messageData.scheduleData,
        }));
        if (messageData?.scheduleData?.organizer) {
          let organizerData = await getEsDataforUsers(
            [{ userId: messageData?.scheduleData?.organizer, roleId: messageData?.scheduleData?.organizerRoleId }],
            rolesData
          );
          if (organizerData?.length) setOrganizerDetails(organizerData[0]);
        }
      }
    })();
  }, [messageData]);
  const onDescriptionChange = (e) => {
    let value = e.target.value.trim() ? e.target.value : '';
    setCancelDescription(value);
  };
  const onConfirmCancelltionClick = async () => {
    let cancellation = {
      cancelledBy: messageData?.userId,
      reason: canelDescription,
      cancelledTime: new Date().toISOString(),
    };
    let modifiedMessageData = {
      ...messageData,
      ContextType: '@callCancelBooked',
      scheduleData: {
        ...messageData?.scheduleData,
        state: 'CANCELLED_EVENT',
        cancellation,
        organizer: messageData?.scheduleData?.organizer || '',
        organizerRoleId: messageData?.scheduleData?.organizerRoleId || '',
      },
    };
    let payload: ICancelBooking = {
      messageData: modifiedMessageData,
      bookableIds: messageData?.scheduleData?.bookableIds || [],
      parentId: messageData?.scheduleData?.parentId || '',
      eventId: messageData?.scheduleData?.eventId || '',
      patientId: messageData?.scheduleData?.patientId || '',
      tenantId: messageData?.scheduleData?.tenantId || '',
    };
    let response = await cancelBookingSlotAPI(payload);
    if (response) {
      setModifiedMessageData(modifiedMessageData);
      setDisabledBtn(false);
    } else {
      setDisabledBtn(false);
    }
  };
  const showorganizerDetails = () => {
    let organizerAvialbeinPersons = meetingDetails?.persons.find(
      (each) => each.id === meetingDetails?.scheduleData?.organizer
    )?.color;
    return (
      <div className={classes.organizerWrap}>
        <span className={`${classes.heading} ${commonClass.sm10Medium}`}>Organizer</span>
        <NameToken
          userId={meetingDetails.scheduleData.organizer}
          label={organizerDetails?.label || ''}
          roleName={organizerDetails?.roleName || ''}
          isDot={organizerAvialbeinPersons || false}
          dotColor={organizerAvialbeinPersons || '#FFFFFF'}
          fullName={organizerDetails?.fullName || ''}
        />
      </div>
    );
  };
  return (
    <div className={classes.mainContainerSucces}>
      <div className={classes.contentContainer}>
        <div className={classes.logoContainer}>
          <div className={classes.logoConAlignment}>
            <span>{<AmuraLogo />}</span>
          </div>
        </div>
        <div className={classes.contentContainerBg}>
          <div className={`${classes.dataConatianer} ${classes.paddingTB52RL187}`}>
            <div className={`${classes.successContainer} ${classes.marginStyles} maringB12`}>
              <span className={`${classes.marginStyles} marginB20`}>{enabledCancel ? <CancelIcon /> : <SuccessIcon />}</span>
              <span className={`${commonClass.body20Medium} ${classes.textColor}`}>
                {enabledCancel ? 'Cancel Event' : 'Event Confirmation'}
              </span>
            </div>
            <div className={`${classes.marginStyles} maringB24`}>
              {!enabledCancel && (
                <span className={`${classes.appointmentText} ${commonClass.body17Regular} `}>
                  {`Hello ${patientName}, we have successfully confirmed an event for you.`}
                </span>
              )}
            </div>
            <div className={`${classes.successContainer} ${classes.marginStyles} maringB12`}>
              <span className={`${commonClass.body15Medium} ${classes.textColor}`}>
                {meetingDetails?.scheduleData?.title || ''}
              </span>
            </div>

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
                  ? convertTimeWithOffset(
                      meetingDetails?.scheduleData?.toTime,
                      meetingDetails?.scheduleData?.clientBookedTimeZone
                    )
                  : meetingDetails?.scheduleData?.toTime
              }
              timezone={
                meetingDetails?.scheduleData?.clientBookedTimeZone
                  ? getTimeZoneAbbrevation(meetingDetails?.scheduleData?.clientBookedTimeZone)
                  : ''
              }
            />
            <ChannalWIthDuration
              duration={messageData?.scheduleData?.duration}
              callType={messageData?.scheduleData?.channel}
              units={messageData?.scheduleData?.timeUnits}
            />
            {enabledCancel ? (
              <div className={`${classes.marginStyles} maringB24`}> </div>
            ) : (
              <div className={`${classes.marginStyles} maringB24`}>
                {/* <EventLinkWithURL urlLinkData={'meet.google.com/sdfskkdummy link'} /> */}
              </div>
            )}
            {!organizeerInperson && meetingDetails?.scheduleData?.organizer && showorganizerDetails()}
            <div className={`${classes.successContainer} ${classes.marginStyles} maringB12`}>
              <span className={`${commonClass.body15Medium} ${classes.textColor}`}>Participants</span>
            </div>
            {organizeerInperson && meetingDetails?.scheduleData?.organizer && showorganizerDetails()}
            <div className={`${classes.subContainer2} ${classes.marginStyles} maringB12`}>
              <ul className={classes.listElements}>
                {meetingDetails?.persons?.length > 0 &&
                  (meetingDetails?.persons || []).map((data) => {
                    if (data.id === meetingDetails?.scheduleData?.organizer) return null;
                    return (
                      <li className={classes.nameChip}>
                        <NameToken
                          userId={data.id}
                          label={data?.label}
                          roleName={data?.roleName}
                          isDot={true}
                          dotColor={data?.color || '#FFFFFF'}
                          fullName={data?.fullName}
                        />
                      </li>
                    );
                  })}
              </ul>
            </div>
            {messageData?.scheduleData?.description && (
              <>
                {' '}
                <div className={`${classes.successContainer} ${classes.marginStyles} marginB8`}>
                  <span className={`${commonClass.body15Medium} ${classes.textColor}`}>Objective</span>
                </div>
                <div className={`${classes.marginStyles} maringB24`}>
                  <span className={`${classes.appointmentText} ${commonClass.body17Regular} `}>
                    {messageData?.scheduleData?.description || ''}
                  </span>
                </div>
              </>
            )}
            {enabledCancel ? (
              <div className={`${classes.greetingsContianer} ${classes.marginStyles} maringB24`}>
                {' '}
                <MemoInputField
                  label="Reason"
                  multiline
                  maxRows={5}
                  value={canelDescription}
                  onChange={(e) => onDescriptionChange(e)}
                  autoFocus
                />
              </div>
            ) : (
              <div className={`${classes.greetingsContianer} ${classes.marginStyles} maringB24`}>
                <div className={`${classes.marginStyles} maringB8`}>
                  <span className={`${commonClass.body15Regular} ${classes.textColor2} ${classes.wordbreak} `}>
                    Kind regards,
                  </span>
                </div>
                <div className={`${classes.marginStyles} maringB2`}>
                  <span className={`${commonClass.caption12Medium} ${classes.textColor} ${classes.wordbreak}`}>Your team at</span>
                </div>
                <span className={`${commonClass.body15Medium} ${classes.textColor2} ${classes.wordbreak} `}>Amura Health</span>
              </div>
            )}

            <div className={`${classes.buttonContainer}`}>
              <>
                {enabledCancel ? (
                  <>
                    <Button
                      variant="contained"
                      className={`${classes.buttonStyle} ${commonClass.body15Medium}`}
                      disabled={disabledBtn}
                      onClick={() => {
                        setDisabledBtn(true);
                        onConfirmCancelltionClick();
                      }}
                    >
                      Confirm cancellation
                    </Button>
                    <Button
                      variant="text"
                      className={`${classes.buttonStyle} ${commonClass.body15Medium}  ${classes.marginStyles} marginL24`}
                      disabled={disabledBtn}
                      onClick={() => {
                        setCancelDescription('');
                        setEnabledCancel(false);
                      }}
                    >
                      Go Back
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    className={`${classes.buttonStyle} ${commonClass.body15Medium}`}
                    onClick={() => setEnabledCancel(true)}
                  >
                    Cancel
                  </Button>
                )}
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
