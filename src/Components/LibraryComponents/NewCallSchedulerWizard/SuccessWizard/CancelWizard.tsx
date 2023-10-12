import React, { useEffect, useState } from 'react';
import { getAllStaffRoles, getEsDataforUsers } from '../NewCallSchedulerWizard.functions';
import { IProps } from './SuccessWizard.types';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { AmuraLogo, CancelIcon } from '../../../SVGs/Common';
import { useStyles } from './SuccessWizard.styles';
import DateWithTimeView from '../../CallSchedulerWizards/CallWizard/DateWithTimeView';
import ChannalWIthDuration from '../../CallSchedulerWizards/CallWizard/ChannalWIthDuration';
import NameToken from '../../CallSchedulerWizards/NameToken/NameToken';
import { convertTimeWithOffset, getTimeZoneAbbrevation, getUserNameFromES } from '../../../../Common/Common.functions';
import { settingColors } from '../../CallSchedulerWizards/CallWizard/CallWizard.function';
import { IMettingDetails, IOrganizerDetails } from '../NewCallSchedulerWizard.types';

export default function CancelWizard(props: IProps) {
  const { modifiedMessageData } = props;
  const { classes } = useStyles();
  const commonClass = useCommonStyles();
  const [meetingDetails, setMeetingDetails] = useState<IMettingDetails | any>({});
  const [patientName, setPatientName] = useState<string>('');

  const [organizerDetails, setOrganizerDetails] = useState<IOrganizerDetails>({
    id: '',
    label: '',
    roleId: '',
    roleName: '',
    fullName: '',
  });
  const [organizeerInperson, setOrganizeerInperson] = useState<boolean>(false);

  useEffect(() => {
    if (modifiedMessageData?.scheduleData) {
      (async () => {
        let rolesData = await getAllStaffRoles();
        let colorsSettoObj = [];
        if (modifiedMessageData?.scheduleData?.participants?.length > 0) {
          setOrganizeerInperson(
            modifiedMessageData?.scheduleData?.participants?.some(
              (each) => each.userId === modifiedMessageData?.scheduleData?.organizer
            )
          );
          let filterParticipantdata = await getEsDataforUsers(modifiedMessageData?.scheduleData?.participants, rolesData);
          colorsSettoObj = settingColors(filterParticipantdata);
        }
        let nameFromEs = await getUserNameFromES(modifiedMessageData?.userId);
        setPatientName(nameFromEs);
        setMeetingDetails((pre) => ({
          ...pre,
          persons: colorsSettoObj,
          scheduleData: modifiedMessageData.scheduleData,
        }));
        if (modifiedMessageData?.scheduleData?.organizer) {
          let organizerData = await getEsDataforUsers(
            [
              {
                userId: modifiedMessageData?.scheduleData?.organizer,
                roleId: modifiedMessageData?.scheduleData?.organizerRoleId,
              },
            ],
            rolesData
          );
          if (organizerData?.length) setOrganizerDetails(organizerData[0]);
        }
      })();
    }
  }, [modifiedMessageData]);
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
              <span className={`${classes.marginStyles} marginB20`}>{<CancelIcon />}</span>
              <span className={`${commonClass.body20Medium} ${classes.textColor}`}>Event cancelled</span>
            </div>
            <div className={`${classes.marginStyles} maringB24`}>
              <span className={`${classes.appointmentText} ${commonClass.body17Regular} `}>
                {`Hello ${patientName}, we have cancelled the event${
                  modifiedMessageData.ContextType == '@callCancel' ? '.' : ' you scheduled.'
                } `}
              </span>
            </div>
            <div className={`${classes.successContainer} ${classes.marginStyles} maringB12`}>
              <span className={`${commonClass.body15Medium} ${classes.textColor}`}>
                {meetingDetails?.scheduleData?.title || ''}
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
            )}
            <ChannalWIthDuration
              duration={modifiedMessageData?.scheduleData?.duration}
              callType={modifiedMessageData?.scheduleData?.channel}
              units={modifiedMessageData?.scheduleData?.timeUnits}
            />
            {!organizeerInperson && meetingDetails?.scheduleData?.organizer && showorganizerDetails()}
            {meetingDetails?.persons?.length > 0 && (
              <div className={`${classes.successContainer} ${classes.marginStyles} maringB12`}>
                <span className={`${commonClass.body15Medium} ${classes.textColor}`}>Participants</span>
              </div>
            )}
            {organizeerInperson && meetingDetails?.scheduleData?.organizer && showorganizerDetails()}
            <div className={`${classes.subContainer2} ${classes.marginStyles} maringB12`}>
              <ul className={classes.listElements}>
                {meetingDetails?.persons &&
                  (meetingDetails?.persons || []).map((data: any) => {
                    if (data.id === meetingDetails?.scheduleData?.organizer) return null;
                    return (
                      <li key={data.id} className={classes.nameChip}>
                        <NameToken
                          userId={data.id}
                          label={data.label}
                          roleName={data.roleName}
                          isDot={true}
                          dotColor={data?.color || '#FFFFFF'}
                          fullName={data?.fullName}
                        />
                      </li>
                    );
                  })}
              </ul>
            </div>

            {modifiedMessageData?.scheduleData?.cancellation?.reason && (
              <>
                {' '}
                <div className={`${classes.successContainer} ${classes.marginStyles} marginB8`}>
                  <span className={`${commonClass.body15Medium} ${classes.textColor}`}>Reason</span>
                </div>
                <div className={`${classes.marginStyles} maringB24`}>
                  <span className={`${classes.appointmentText} ${commonClass.body17Regular} `}>
                    {`You: ${modifiedMessageData?.scheduleData?.cancellation?.reason}`}
                  </span>
                </div>
              </>
            )}

            <div className={`${classes.greetingsContianer} ${classes.marginStyles} maringB24`}>
              <div className={`${classes.marginStyles} maringB8`}>
                <span className={`${commonClass.body15Regular} ${classes.textColor2} ${classes.wordbreak} `}>Kind regards,</span>
              </div>
              <div className={`${classes.marginStyles} maringB2`}>
                <span className={`${commonClass.caption12Medium} ${classes.textColor} ${classes.wordbreak}`}>Your team at</span>
              </div>
              <span className={`${commonClass.body15Medium} ${classes.textColor2} ${classes.wordbreak} `}>Amura Health</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
