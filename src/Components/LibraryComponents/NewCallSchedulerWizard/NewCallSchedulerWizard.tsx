import moment from 'moment';
import React, { memo, useEffect, useState } from 'react';
import ErrorToaster from '../../../Common/ErrorToaster';
import { registerEvent, unRegisterEvent } from '../../../AppSync/AppSync.functions';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { AmuraLoginLog, AmuraLogo, TimeZoneIcon } from '../../SVGs/Common';
import { NoSlotsIocn } from '../CallSchedulerWizards/SvgImages/NoSlotsIocn';
import InputField from '../InputField/InputField';
import MUIAutoSelect from '../MUIAutoSelect/MUIAutoSelect';
import StaticCalendar from '../MUIDatePicker/StaticCalendar';
import NewTimeSlot from '../NewTimeSlot/NewTimeSlot';
import {
  checkUserDetails,
  getEsDataforUsers,
  getMessageDataFormURL,
  getTimeZoneModifiedValue,
  getTimeZones,
  getlocalTimezone,
  handleSlotBookCall,
} from './NewCallSchedulerWizard.functions';
import { useStyles } from './NewCallSchedulerWizard.styles';
import CircularProgress from '../CircularProgress/CircularProgress';
import { IMessage } from '../ChatComponent/ChatComponents.types';
import SuccessCancelWizardHome from './SuccessWizard/SuccessCancelWizardHome';
import ChannalWIthDuration from '../CallSchedulerWizards/CallWizard/ChannalWIthDuration';
import NameToken from '../CallSchedulerWizards/NameToken/NameToken';
import Button from './../MUIButton/MUIButton';
import { getUnAllocatedBookables, setColorstoslots, settingColors } from '../CallSchedulerWizards/CallWizard/CallWizard.function';
import { IAvailableSlots, IMettingDetails, IModifiedSlots, IOrganizerDetails } from './NewCallSchedulerWizard.types';
import { getAllStaffRoles } from './NewCallSchedulerWizard.functions';
import { set } from 'lodash';

const INIT_LOCAL_TIME_VALUE = {
  label: 'Local time',
  value: 'Local time',
  Abbreviation: 'UTC',
  offset: getlocalTimezone(),
};

const subLabel = getTimeZoneModifiedValue(new Date(), INIT_LOCAL_TIME_VALUE);
const LOCAL_TIME_VALUE = {
  ...INIT_LOCAL_TIME_VALUE,
  subLabel: subLabel ? moment(subLabel).format('hh:mm A') : '',
};

const MemoInputField = memo(InputField);
export default function NewCallSchedulerWizard(props: any) {
  const { classes } = useStyles();
  const commonClass = useCommonStyles();
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<Date>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = React.useState<IAvailableSlots[] | any>([]);
  const [meetingDetails, setMeetingDetails] = useState<IMettingDetails | any>({});
  const [modifiedSlots, setModifiedSlots] = useState<IModifiedSlots[] | any>([]);
  const [messageData, setMessageData] = useState<IMessage | any>({});
  const [UUID, setUUID] = useState('');
  const [patientId, setPatientId] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [noUUID, setNoUUID] = useState<boolean>(false);
  const [startDateFormat, setStartDateFormat] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
  const [endDateFormat, setEndDateFormat] = useState(new Date(new Date().setHours(23, 59, 59, 999)));
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [description, setDescription] = React.useState('');
  const [activeBtn, setActiveBtn] = React.useState<boolean>(false);
  const [successMsgData, setSuccessMsgData] = useState<IMessage | any>({});
  const [timeZonesdata, setTimeZonesdata] = useState([]);
  const [selectedTimeZone, setSelectedTimeZone] = useState(LOCAL_TIME_VALUE);
  const [timeZoneDataLoading, setTimeZoneDataLoading] = useState<boolean>(true);
  const [timeZoneValue, setTimeZoneValue] = useState([LOCAL_TIME_VALUE]);
  const [slotsDotStatus, setSlotsDotStatus] = useState<boolean>(false);
  const [isCircleLoading, setIsCircleLoading] = useState<boolean>(true);
  const [isConfirmationOPen, setIsConfirmationOPen] = useState<boolean>(false);
  const [disableBttons, setDisableBttons] = useState<boolean>(false);

  const [organizerDetails, setOrganizerDetails] = useState<IOrganizerDetails>({
    id: '',
    label: '',
    roleId: '',
    roleName: '',
    fullName: '',
  });
  const [organizeerInperson, setOrganizeerInperson] = useState<boolean>(false);

  let subscription: any;
  useEffect(() => {
    const data = new URLSearchParams(window.location.search);
    getTimeZones().then((res) => {
      let sortedTimezones = res.sort((a, b) => a.timezoneName.toLowerCase().localeCompare(b.timezoneName.toLowerCase()));
      sortedTimezones = sortedTimezones.map((timezone) => {
        const optionsObject = {
          ...timezone,
          label: `${timezone.timezoneName}`,
          value: timezone.timezoneName,
          offset: `UTC${timezone.offset}`,
        };
        const subLabel = getTimeZoneModifiedValue(new Date(), [optionsObject]);
        return { ...optionsObject, subLabel: subLabel ? moment(subLabel).format('hh:mm A') : '' };
      });
      setTimeZonesdata([LOCAL_TIME_VALUE, ...sortedTimezones]);
      setTimeZoneDataLoading(false);
    });
    (async () => {
      if (data.get('h')) {
        setIsLoading(true);
        setUUID(data.get('h')!);
        setNoUUID(false);
        await getMessageDataFormURL(setIsBooked, setNoUUID, setIsLoading, setMessageData, setSuccessMsgData, data.get('h')!);
      } else if (data.get('u') && data.get('p')) {
        let uuid = data.get('u');
        let pid = data.get('p');
        setIsLoading(true);
        setUUID(uuid);
        setPatientId(pid);
        setNoUUID(false);
        await getMessageDataFormURL(setIsBooked, setNoUUID, setIsLoading, setMessageData, setSuccessMsgData, uuid, pid);
      } else {
        setNoUUID(true);
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (selectedTimeZone) {
      setTimeZoneValue([selectedTimeZone]);
      let systemCurrentDate = new Date();
      systemCurrentDate.setHours(0, 0, 0, 0);
      let timezoneCurrentDate = new Date(getTimeZoneModifiedValue(new Date(), [selectedTimeZone]).setHours(0, 0, 0, 0));
      if (systemCurrentDate.getTime() !== timezoneCurrentDate.getTime()) {
        setStartDateFormat(timezoneCurrentDate);
        timezoneCurrentDate.setHours(23, 59, 59, 999);
        setEndDateFormat(timezoneCurrentDate);
      }
    }
  }, [selectedTimeZone, timeZonesdata]);

  useEffect(() => {
    if (messageData?.scheduleData) {
      let colorsSettoObj = [];
      (async () => {
        let rolesData = await getAllStaffRoles();
        let filterParticipantdata = [];
        if (messageData?.scheduleData?.participants?.length > 0) {
          setOrganizeerInperson(
            messageData?.scheduleData?.participants?.some((each) => each.userId === messageData?.scheduleData?.organizer)
          );
          filterParticipantdata = await getEsDataforUsers(messageData?.scheduleData?.participants, rolesData);
        }
        colorsSettoObj = settingColors([...filterParticipantdata]);
        setMeetingDetails((pre) => ({
          ...pre,
          persons: colorsSettoObj,
          scheduleData: messageData.scheduleData,
          //roles: roleOptions,
        }));
        if (messageData?.scheduleData?.organizer) {
          let organizerData = await getEsDataforUsers(
            [{ userId: messageData?.scheduleData?.organizer, roleId: messageData?.scheduleData?.organizerRoleId }],
            rolesData
          );
          if (organizerData?.length) setOrganizerDetails(organizerData[0]);
        }
      })();
      if (!subscription) {
        subscription = registerEvent(`${messageData?.messageId}`, `${messageData?.userId}`, async () => {
          await getMessageDataFormURL(
            setIsBooked,
            setNoUUID,
            setIsLoading,
            setMessageData,
            setSuccessMsgData,
            messageData?.messageId,
            messageData?.userId
          );
        });
      }
    }
    return () => {
      if (subscription) {
        unRegisterEvent(subscription);
      }
    };
  }, [messageData]);

  useEffect(() => {
    if (!isBooked) {
      (async () => {
        try {
          setSelectedTimeSlot(null);
          setActiveBtn(false);
          setIsCircleLoading(true);
          let allowedMaximumDays = 1;
          let start: any = new Date();
          start = getTimeZoneModifiedValue(start, timeZoneValue);
          start.setHours(0, 0, 0, 0);
          start = moment(start);
          let end: any = new Date(startDateFormat);
          end.setHours(0, 0, 0, 0);
          end = moment(end);
          allowedMaximumDays = end.diff(start, 'days') + 1;
          let checkStart = new Date(getTimeZoneModifiedValue(startDateFormat, timeZoneValue, true));
          let checkEnd = new Date(getTimeZoneModifiedValue(endDateFormat, timeZoneValue, true));
          let payload = {
            participants: messageData?.scheduleData?.participants || [],
            duration: messageData?.scheduleData?.duration || '',
            channel: messageData?.scheduleData?.channel || '',
            startDate: checkStart.toISOString(),
            endDate: checkEnd.toISOString(),
            allowedMaximumDays: allowedMaximumDays || 0,
            roleIds: messageData?.scheduleData?.roleIds || [],
            tenantId: messageData?.tenantId || 'amura',
          };
          let availableSlotsData = await getUnAllocatedBookables('main', payload);
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
            //ErrorToaster("slots are not availabel Please select another Date");
          }
        } catch (error) {
          setIsCircleLoading(false);
          console.log('error in getting slots');
          ErrorToaster('error in getting slots');
        }
      })();
    }
  }, [messageData, startDateFormat, timeZoneValue]);
  useEffect(() => {
    try {
      setSlotsDotStatus(checkUserDetails(meetingDetails));
      let modifedData = setColorstoslots(meetingDetails?.persons || [], availableTimeSlots);
      setModifiedSlots(modifedData);
      setIsCircleLoading(false);
    } catch (e) {
      setNoUUID(true);
    }
  }, [availableTimeSlots]);

  useEffect(() => {
    if (selectedTimeSlot !== null) {
      setActiveBtn(true);
    }
  }, [selectedTimeSlot]);

  const handleSave = () => {
    handleSlotBookCall(
      selectedTimeSlot,
      modifiedSlots,
      startDateFormat,
      endDateFormat,
      messageData,
      setEndDateFormat,
      setStartDateFormat,
      timeZoneValue,
      description,
      setDescription,
      setSelectedTimeSlot,
      setSuccessMsgData,
      setIsBooked,
      setNoUUID,
      handleCancel
    );
  };
  const handleCancel = () => {
    setSelectedTimeSlot(null);
    setDescription('');
    setIsConfirmationOPen(false);
    setActiveBtn(false);
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
    <div className={classes.mainWrapper}>
      {!isBooked && messageData?.ContextType !== '@callCancelBooked' && messageData?.ContextType !== '@callCancel' && (
        <div className={classes.mainContainer}>
          {!isLoading && noUUID && (
            <div className={classes.main}>
              <div className={classes.logo}>
                <span>
                  <AmuraLoginLog />
                </span>
              </div>
              {(isLoading || timeZoneDataLoading) && !noUUID && <div>Loading...</div>}
              {!isLoading && noUUID && <div>{'This link seems to be incorrect or expired...'}</div>}
            </div>
          )}
          {!isLoading && !timeZoneDataLoading && !noUUID && (
            <div className={classes.contentContainer}>
              <div className={classes.logoContainer}>
                <div className={classes.logoConAlignment}>
                  <span>{<AmuraLogo />}</span>
                </div>
              </div>
              <div className={classes.contentContainerBg}>
                {!isConfirmationOPen && (
                  <div className={classes.dataConatianer}>
                    <div className={classes.detailContainer}>
                      <div className={`${classes.titleAndTimeCon} `}>
                        <span
                          className={`${commonClass.body17Medium} ${classes.textColor} ${classes.marginStyles} marginB16 marginR32`}
                        >
                          {messageData?.scheduleData?.title || ''}
                        </span>
                        <span className={`${classes.marginStyles} marginB16`}>
                          <ChannalWIthDuration
                            duration={messageData?.scheduleData?.duration}
                            callType={messageData?.scheduleData?.channel}
                            units={messageData?.scheduleData?.timeUnits}
                          />
                        </span>
                      </div>
                      {!organizeerInperson && meetingDetails?.scheduleData?.organizer && showorganizerDetails()}
                      {meetingDetails?.persons?.length > 0 && (
                        <div className={`${classes.participantLabel} ${commonClass.body15Medium}`}>Participants</div>
                      )}
                      {organizeerInperson && meetingDetails?.scheduleData?.organizer && showorganizerDetails()}
                      <ul className={`${classes.listElements} ${classes.marginStyles} marginB16`}>
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
                      <div className={classes.horizontalLine} />
                    </div>
                    <div className={classes.ComboContainer}>
                      <div>
                        <div className={classes.TimeZoneContainer}>
                          <span className={classes.timeIcon}>
                            <TimeZoneIcon />
                          </span>
                          <MUIAutoSelect
                            options={timeZonesdata}
                            InputProps={{ label: 'Time zone', placeholder: 'Time zone' }}
                            onChange={(event, value) => setSelectedTimeZone(value)}
                            value={selectedTimeZone}
                            OptionMenuProps={{
                              inlineLabel: true,
                              customStyle: classes.menuInlineStyle,
                              endAdornmentNotFlex: true,
                            }}
                            fullWidth
                            title={selectedTimeZone?.label || ''}
                            // closeIcon={null}
                            reRenderOptions={true}
                            disableClearable
                            disabled={true}
                          />
                        </div>
                        <StaticCalendar
                          date={startDateFormat}
                          setDate={(e) => {
                            setStartDateFormat(new Date(new Date(e).setHours(0, 0, 0, 0)));
                            setEndDateFormat(new Date(new Date(e).setHours(23, 59, 59, 999)));
                          }}
                          minDate={getTimeZoneModifiedValue(new Date(), timeZoneValue)}
                          customStyle={classes.calenderBg}
                          disabledKeyboardControl={true}
                          changeDayBGWhite={true}
                        />
                      </div>
                      {!isCircleLoading && modifiedSlots.length > 0 && (
                        <>
                          <div className={classes.timeSlotsGrid}>
                            <div className={classes.slotsContainer}>
                              <div className={classes.slotsGrid}>
                                {!isCircleLoading &&
                                  modifiedSlots.map((slot, index) => {
                                    let modifiedTime = getTimeZoneModifiedValue(slot.startTime, timeZoneValue);
                                    return (
                                      <NewTimeSlot
                                        slotDetails={slot}
                                        timeSlot={new Date(modifiedTime)}
                                        participants={slot?.usersWithcolordata || []}
                                        istimeZoneConvert={false}
                                        isSelected={new Date(slot.startTime).getTime() === selectedTimeSlot?.getTime()}
                                        handleClick={(e) => {
                                          setSelectedTimeSlot(new Date(slot.startTime));
                                        }}
                                        isDot={slotsDotStatus}
                                      />
                                    );
                                  })}
                              </div>
                            </div>

                            <Button
                              variant="contained"
                              className={`${classes.buttonStyle} ${commonClass.body15Medium}`}
                              disabled={!activeBtn}
                              onClick={() => setIsConfirmationOPen(true)}
                            >
                              Next
                            </Button>
                          </div>
                        </>
                      )}

                      {!isCircleLoading && modifiedSlots.length === 0 && (
                        <div className={classes.noslotsdata}>
                          <span>{NoSlotsIocn}</span>
                        </div>
                      )}

                      {isCircleLoading && (
                        <div className={classes.noslotsdata}>
                          <CircularProgress size={30} style={{ color: '#252427' }} />
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {isConfirmationOPen && (
                  <div className={classes.confirmationConatianer}>
                    <div className={`${classes.marginStyles} marginB28`}>
                      <span className={`${classes.buttonStyle3} ${commonClass.body17Medium}`}>
                        Please provide the following details to Continue
                      </span>
                    </div>
                    <div className={`${classes.containerWidth} ${classes.marginStyles} marginB48`}>
                      <MemoInputField
                        label="Objective"
                        multiline
                        maxRows={5}
                        value={description}
                        onChange={(e) => {
                          const comment = e.target.value.trim() ? e.target.value : '';
                          setDescription(comment);
                        }}
                      />
                    </div>
                    <div className={` ${classes.containerWidth} ${classes.buttonContainer}`}>
                      <>
                        <Button
                          variant="contained"
                          className={`${classes.buttonStyle2} ${commonClass.body15Medium}`}
                          disabled={description.length === 0 || disableBttons}
                          onClick={() => {
                            setDisableBttons(true);
                            handleSave();
                          }}
                        >
                          Continue
                        </Button>

                        <Button
                          variant="text"
                          className={`${classes.buttonStyle2} ${commonClass.body15Medium}  ${classes.marginStyles} marginL24`}
                          disabled={disableBttons}
                          onClick={() => {
                            handleCancel();
                          }}
                        >
                          Go Back
                        </Button>
                      </>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      {(isBooked || messageData?.ContextType === '@callCancelBooked' || messageData?.ContextType === '@callCancel') &&
        !noUUID && (
          <SuccessCancelWizardHome messageData={successMsgData} description={description} timeZoneValue={timeZoneValue} />
        )}
      {isBooked && noUUID && (
        <div className={classes.mainContainer}>
          {!isLoading && noUUID && (
            <div className={classes.main}>
              <div className={classes.logo}>
                <span>
                  <AmuraLoginLog />
                </span>
              </div>
              {(isLoading || timeZoneDataLoading) && !noUUID && <div>Loading...</div>}
              {!isLoading && noUUID && <div>{'This link seems to be incorrect...'}</div>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
