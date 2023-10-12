import moment from 'moment';
import { useEffect, useState } from 'react';
import DotStatus from '../DotStatus/DotStatus';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { useStyles } from './EventCard.styles';
import { AmuraIcon, LeafIcon2, SettingIcon, StatusIcon2, LeafIcon } from './EventCard.svg';
import { IProps } from './EventCard.types';
import { notifyEvent } from '../../../AppSync/AppSync.functions';
import { getNameInitials } from '../../../Common/Common.functions';
import { useFetchUserName } from '../../../Common/Common.hooks';
import { getMyListEvent } from '../../PanelComponents/MyListPanel/MyList/MyList.function';
import { CachedAvatar } from '../Avatar/CachedAvatar';
import CountDownTimeLine from '../CountDownTimer/CountDownTimeLine/CountDownTimeLine';

const EventCard = (props: IProps) => {
  const {
    cardData,
    isExtend,
    noThreeDot,
    customStyle,
    message,
    setSelectedCard,
    setAction,
    isSelected,
    handleSelect,
    openClient,
    isClientSelected,
    showBlueDot,
  } = props;
  // const { id, createdOn, title, searchString, tenantId, roleId, staffId, type } = cardData || {};
  const { description, fromTime, toTime, duration, bluedots, participantIds, tenantId } = cardData.additionalKeys || {};
  const { classes } = useStyles(props);
  const CommonStyles = useCommonStyles();
  const [autodotChage, setAutodotChage] = useState(false);
  const [showBlackDot, setShowBlackDot] = useState(false);
  const [eventCardData, setEventCardData] = useState(cardData);
  const [tenantParticipants, setTenantParticipants] = useState(
    [...(participantIds.slice(0, 6) || [])].map((data) => {
      return { value: data, label: '' };
    })
  );

  const { fetchMultipleUserNames } = useFetchUserName();
  useEffect(() => {
    setEventCardData(cardData);

    const sixParticipants = participantIds.slice(0, 6);
    (async () => {
      const response = await fetchMultipleUserNames(sixParticipants);
      let participants = sixParticipants.map((id) => ({ value: id, label: response[id] }));
      setTenantParticipants([...(participants || [])]);
    })();
  }, [props]);

  // useEffect(() => {
  //   (async () => {
  //     // const participants = participantIds?.map((data) => data.userId);
  //     const participants = await getCurrentUserdata(participantIds);
  //     console.log('participants', participants, participantIds);
  //     setTenantParticipants([...(participants.slice(0, 6) || [])]);
  //     // setorganizerdetails(organizerIds[0]);
  //   })();
  // }, [eventCardData]);
  //
  useEffect(() => {
    setShowBlackDot(eventCardData?.additionalKeys?.bluedots?.blackDotsCount > 0);
    if (eventCardData?.additionalKeys?.bluedots?.blueToExpireNext) {
      let timeInterval = setInterval(() => {
        let dotStatus = eventCardData?.additionalKeys?.bluedots?.blueToExpireNext
          ? new Date().getTime() > new Date(eventCardData?.additionalKeys?.bluedots?.blueToExpireNext).getTime()
          : false;
        if (dotStatus) {
          setAutodotChage(dotStatus);
        }
      }, 1000);
      return () => {
        clearInterval(timeInterval);
      };
    }
  }, [eventCardData]);
  const updateEvent = () => {
    (async () => {
      let newCard = await getMyListEvent(
        cardData.additionalKeys.eventId,
        cardData.roleId,
        cardData.additionalKeys.tenantId,
        props.sessions,
        cardData.staffId
      );
      let onlyCardData = newCard.cards[0] || {};
      if (Object.keys(onlyCardData).length > 0) {
        setEventCardData(onlyCardData);
      }
    })();
  };

  const clientStatus = {}; //getStatusOfClientLeaveCard(cardData);
  const countDownTriggerFunction = () => {
    notifyEvent({
      input: {
        user_id: `${props.sessions.user.id}`,
        event_name: 'event_expired',
        timestamp: `${new Date().getTime()}`,
        last_message: JSON.stringify(cardData) ?? '',
      },
    });
  };

  return (
    <>
      {isExtend ? (
        <div
          className={`${classes.mainContainer} ${customStyle}`}
          {...(handleSelect && { onClick: () => handleSelect(cardData) })}
          {...(openClient && { onClick: () => openClient() })}
        >
          <div className={`${classes.contentContainer}`}>
            <div className={`${classes.nameCardHeader}`}>
              <div className={`${classes.profilecontainer}`}>
                <div className={classes.avatarCon}>
                  <div className={classes.profileDiv}>
                    {/* <i className={classes.GreenDot}>{GreenDot}</i> */}
                    {tenantId === 'amura' && <i className={classes.logoIcon}>{AmuraIcon}</i>}
                    <CachedAvatar className={`${classes.profilePic}`}>
                      <div className={classes.titleWrap}>
                        <span>{moment(new Date(eventCardData?.additionalKeys?.fromTime)).format('hh:mm')}</span>
                        <span className={`${classes.lineHeight} ${CommonStyles.caption12Medium}`}>
                          {moment(new Date(eventCardData?.additionalKeys?.fromTime)).format('A')}
                        </span>
                      </div>
                    </CachedAvatar>
                  </div>
                </div>
              </div>
              <div className={`${classes.nameContainer}`}>
                <div className={`${classes.nameContainerHead}`}>
                  <div title={eventCardData.title} className={`${classes.userNametext} ${CommonStyles.body15Medium}`}>
                    {eventCardData.title}
                  </div>
                  <div className={`${CommonStyles.sm10Medium} ${classes.statusLable} ${classes.bgWhite}`}>
                    {eventCardData?.additionalKeys?.duration}m
                  </div>
                </div>
                <div className={classes.contentWrap}>
                  <div className={` ${CommonStyles.body14Regular}  ${classes.description}`}>
                    {eventCardData?.additionalKeys?.description}
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.timeLineWrapperExtended}>
              <div className={classes.Wrapper}>
                {
                  <CountDownTimeLine
                    createdTime={null}
                    startTime={null} //cardData.SLA.StartTime
                    endTime={new Date(eventCardData?.additionalKeys?.fromTime)} //cardData.SLA.EndTime
                    calculateTriggerFrom={new Date(eventCardData?.additionalKeys?.toTime)}
                    triggerAfter={300000}
                    showTimer={true}
                    triggerFunction={countDownTriggerFunction}
                  />
                }
              </div>
              <div className={classes.dotWrapper}>
                {/* <DotStatus color={showBlueDot ? '#007AFF' : '#252427'} /> */}
                <DotStatus color={'#007AFF'} count={0} />
                <DotStatus color={'#E1E1E1'} isSelected={isClientSelected} />
                <DotStatus color={'#E1E1E1'} isSelected={isClientSelected} />
              </div>
            </div>
            {isExtend && (
              <div className={classes.lastCon}>
                <div className={classes.iconGroup}>
                  {/* {clientStatus && (
                    <span className={classes.statusIcon} title={''}>
                      {<LeafIcon />}
                    </span>
                  )}
                  <span className={classes.statusIcon}>{<StatusIcon2 />}</span>
                  <span className={classes.statusIcon}>{<LeafIcon2 />}</span>
                  <span className={classes.statusIcon}>{<SettingIcon />}</span> */}
                </div>
                <div className={classes.profileGroup}>
                  {tenantParticipants?.map((data, ind) => {
                    return (
                      <CachedAvatar
                        className={classes.profileSmall}
                        src={`${import.meta.env.VITE_DP_URL}${data?.value}/profile-pic.png`}
                      >
                        {getNameInitials(data?.label)}
                      </CachedAvatar>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className={`${classes.mainContainer} ${customStyle}`}
          onClick={() => {
            if (handleSelect) {
              console.log('Selected', cardData);
              handleSelect(cardData);
            }
          }}
          {...(openClient && { onClick: () => openClient() })}
        >
          <div className={`${classes.contentContainer}`}>
            <div className={`${classes.nameCardHeader}`}>
              <div className={`${classes.profilecontainer}`}>
                <div className={classes.avatarCon}>
                  <div className={classes.profileDiv}>
                    {/* <i className={classes.GreenDot}>{GreenDot}</i> */}
                    {tenantId === 'amura' && <i className={classes.logoIcon}>{AmuraIcon}</i>}
                    <CachedAvatar className={`${classes.profilePic}`}>
                      <span>{moment(new Date(eventCardData?.additionalKeys?.fromTime)).format('hh:mm')}</span>
                      <span className={CommonStyles.caption12Medium}>
                        {moment(new Date(eventCardData?.additionalKeys?.fromTime)).format('A')}
                      </span>
                    </CachedAvatar>
                  </div>
                </div>
              </div>
              <div className={`${classes.nameContainer}`}>
                <div className={`${classes.nameContainerHead}`}>
                  <div title={eventCardData.title} className={`${classes.userNametext} ${CommonStyles.body15Medium}`}>
                    {eventCardData.title}
                  </div>
                  <div className={`${CommonStyles.sm10Medium} ${classes.statusLable} ${classes.bgWhite}`}>
                    {eventCardData?.additionalKeys?.duration}m
                  </div>
                </div>
                <div className={classes.contentWrap}>
                  <div className={` ${CommonStyles.body14Regular}  ${classes.description}`}>
                    {eventCardData?.additionalKeys?.description}
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.timeLineWrapperExtended}>
              <div className={classes.Wrapper}>
                {
                  <CountDownTimeLine
                    createdTime={null}
                    startTime={null}
                    endTime={new Date(eventCardData?.additionalKeys?.fromTime)}
                    triggerAfter={300000}
                    calculateTriggerFrom={new Date(eventCardData?.additionalKeys?.toTime)}
                    showTimer={true}
                    triggerFunction={countDownTriggerFunction}
                  />
                }
              </div>
              <div className={classes.dotWrapper}>
                {/* <DotStatus color={showBlueDot ? '#007AFF' : '#252427'} /> */}
                <DotStatus color={showBlackDot || autodotChage ? '#252427' : showBlueDot ? '#007AFF' : '#E1E1E1'} count={0} />
                <DotStatus color={'#252427'} isSelected={isClientSelected} />
                <DotStatus color={'#252427'} isSelected={isClientSelected} />
              </div>
            </div>
            {
              <div className={classes.lastCon}>
                <div className={classes.iconGroup}>
                  {clientStatus && (
                    <span className={classes.statusIcon} title={''}>
                      {<LeafIcon />}
                    </span>
                  )}
                  <span className={classes.statusIcon}>{<StatusIcon2 />}</span>
                  <span className={classes.statusIcon}>{<LeafIcon2 />}</span>
                  <span className={classes.statusIcon}>{<SettingIcon />}</span>
                </div>
                <div className={classes.profileGroup}>
                  {tenantParticipants?.map((data) => {
                    return (
                      <CachedAvatar
                        key={data?.value}
                        className={classes.profileSmall}
                        src={`${import.meta.env.VITE_DP_URL}${data?.value}/profile-pic.png`}
                      >
                        {getNameInitials(data?.label)}
                      </CachedAvatar>
                    );
                  })}
                </div>
              </div>
            }
          </div>
        </div>
      )}
    </>
  );
};

export default EventCard;
