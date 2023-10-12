import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import DotStatus from '../DotStatus/DotStatus';
import ThreeDotMenu from '../ThreeDotMenu/ThreeDotMenu';
import { useStyles } from './NameCard.styles';
import { AmuraIcon, EyeIcon, GcStatusIcon, StatusIcon, TicIcon, UnWatchListIcon, WatchListIcon } from './NameCard.svg';
import { IProps } from './NameCard.types';
//import { getStatusOfClientLeaveCard } from '../../PanelComponents/MyListPanelNew/MyList/MyList.function';
import { notifyEvent } from '../../../AppSync/AppSync.functions';
import { useDFEvent } from '../../../DisplayFramework/Events/DFEvents';
import { getStatusOfClient } from '../../PanelComponents/MyListPanel/MyList/MyList.function';

import { useSelector } from 'react-redux';
import { capitalizeFirstLetter } from '../../../Common/Common.functions';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';
import { IRootState } from '../../../DisplayFramework/State/store';
import { CachedAvatar } from '../Avatar/CachedAvatar';
import CountDownTimeLine from '../CountDownTimer/CountDownTimeLine/CountDownTimeLine';
import StatusManager from './StatusManager/StatusManager';
import { AddWatchList } from './StatusManager/StatusManager.functions';
import { IEdgeColor } from './StatusManager/StatusManager.types';
import { IAllRoleDetails, INameCard } from '../../PanelComponents/MyListPanel/MyList/MyList.types';

const getFirstLetters = (name) => {
  if (!name) return '';
  if (name.split(' ').length > 1) return (name.split(' ')[0].charAt(0) + name.split(' ')[1].charAt(0)).toUpperCase();
  return name.charAt(0).toUpperCase();
};
const getLeaves = (fromDate: any, todate: any) => {
  const date1: any = new Date(fromDate);
  const date2: any = new Date(todate);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return `${diffDays}d`;
};
const getdate = (datetime) => {
  var dateformat = moment(new Date(datetime)).format('DD MMMM YYYY');
  var date = new Date(datetime);
  var hours = parseInt((date.getHours() < 10 ? '0' : '') + date.getHours());

  var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  var newformat = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  var modifiedHours = '';
  if (hours < 10) {
    modifiedHours = '0' + hours;
  } else {
    modifiedHours += hours;
  }
  return dateformat + ' ' + modifiedHours + ':' + minutes + ' ' + newformat;
};
const NameCard = (props: IProps) => {
  const {
    bluedotClick,
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
    sessions,
    isReportee,
    reporteesData,
    currentCardRole,
    activeTab,
  } = props;
  const { id, createdOn, title, searchString, tenantId, roleId, staffId, type } = cardData || {};
  const { firstName, lastName, nickName, mobileNumber, hierarchyId, patientId, bluedots, status } = cardData.additionalKeys || {};
  const CommonStyles = useCommonStyles();
  const { id: panelId } = useCurrentPanel();
  const [floodBarValue, setFloodBarValue] = useState(30);
  const [isLoadingStatusChangePopup, setIsLoadingStatusChangePopup] = useState(false);
  const [isStatusPopupOpen, setIsStatusPopupOpen] = useState(false);
  const [timeCheck, setTimeCheck] = useState(false);

  const nextBlueToBeExpiredIsLight = bluedots?.blueToExpireNext ? bluedots?.isNextBluedotTransferred : false;
  const bluedotExpiredIsLight = bluedots?.isExpiredBluedotTransferred || false;

  const dotscount =
    bluedots?.blackDotsCount + bluedots?.blueDotsCount + bluedots?.indirectBlackDotsCount + bluedots?.indirectBlueDotsCount || 0;

  const handleMessageStatus = () => {
    setSelectedCard(cardData);
    setAction('MESSAGE_STATUS');
  };
  //TO DO//
  // const clientStatus = noThreeDot ? false : getStatusOfClient(cardData);
  const clientStatus = getStatusOfClient(cardData);
  const sendEvent = useDFEvent();
  const anchorEl = useRef(null);
  const { myList } = useSelector((state: IRootState) => state.MyList);
  const roles: IAllRoleDetails[] = useSelector((state: IRootState) => state.dashboard.allUserRoles);
  const roleIdName = roles.find((role) => role.roleId === roleId)?.roleName || roleId;
  let myListCard: INameCard =
    (activeTab || reporteesData?.roleId) &&
    myList.filter(
      (card) => card?.additionalKeys?.patientId === cardData?.additionalKeys?.patientId && card?.roleId === currentCardRole
    )[0];
  let showEyeIcon =
    activeTab || reporteesData?.roleId ? myListCard?.additionalKeys?.isWatching : cardData?.additionalKeys?.isWatching;
  let tabThreeDotOptions = [
    // { label: 'Manage status', value: 'Manage status' }
    ...((activeTab || reporteesData?.roleId) && myListCard?.additionalKeys?.isWatching
      ? [{ label: 'Unwatch', value: 'unwatch', icon: <UnWatchListIcon /> }]
      : (activeTab || reporteesData?.roleId) && !myListCard
      ? [{ label: 'Watch', value: 'watch', icon: <WatchListIcon /> }]
      : cardData?.additionalKeys?.isWatching
      ? [{ label: 'Unwatch', value: 'unwatch', icon: <UnWatchListIcon /> }]
      : []),
  ];
  useEffect(() => {
    myListCard =
      ((activeTab || reporteesData?.roleId) &&
        myList.filter(
          (card) => card?.additionalKeys?.patientId === cardData?.additionalKeys?.patientId && card?.roleId === currentCardRole
        )[0]) ||
      cardData;
    showEyeIcon = myListCard?.additionalKeys?.isWatching || cardData?.additionalKeys?.isWatching;
  }, [myList]);
  const { classes } = useStyles({ ...props, isLoadingStatusChangePopup });
  const blueToExpiredTriggerFunction = (timeInterval) => {
    notifyEvent({
      input: {
        user_id: `${props.sessions.user.id}`,
        event_name: 'blueDot_expired',
        timestamp: `${new Date().getTime()}`,
        last_message: JSON.stringify(cardData) ?? '',
      },
    });
    clearInterval(timeInterval);
  };
  const onTabThreeDotChange = (value: string) => {
    switch (value) {
      case 'watch':
        let payload = {
          UserId: cardData?.additionalKeys?.patientId,
          Tenants: [
            {
              Id: cardData?.tenantId,
              TenantId: cardData?.tenantId,
              Staffs: [
                {
                  Id: props.sessions.user.id,
                  Roles: [currentCardRole],
                  Action: 'ADD',
                  isWatching: true,
                },
              ],
            },
          ],
        };
        AddWatchList(panelId, payload, props);
        break;
      case 'unwatch':
        let payload1 = {
          UserId: cardData?.additionalKeys?.patientId,
          Tenants: [
            {
              Id: cardData?.tenantId,
              TenantId: cardData?.tenantId,
              Staffs: [
                {
                  Id: props.sessions.user.id,
                  Roles: [currentCardRole],
                  Action: 'REMOVE',
                  hierarchyId: myListCard?.additionalKeys?.hierarchyId,
                  roleId: currentCardRole,
                },
              ],
            },
          ],
        };
        AddWatchList(panelId, payload1, props);
        break;
    }
  };
  useEffect(() => {
    if (cardData?.additionalKeys?.bluedots?.blueToExpireNext && !timeCheck) {
      let timeInterval = setInterval(() => {
        if (new Date().getTime() >= new Date(cardData?.additionalKeys?.bluedots?.blueToExpireNext).getTime() && !timeCheck) {
          setTimeCheck(true);
          blueToExpiredTriggerFunction(timeInterval);
        }
      }, 1000);
      return () => {
        clearInterval(timeInterval);
      };
    }
  }, [props]);

  return (
    <>
      {isExtend ? (
        <div
          className={`${classes.mainContainer} ${customStyle}`}
          {...(handleSelect && { onClick: () => handleSelect(cardData) })}
          {...(openClient && { onClick: () => openClient() })}
        >
          <div className={`${classes.bannerDiv}`}></div>
          <div className={`${classes.contentContainer}`}>
            <div className={`${classes.nameCardHeader}`}>
              <div className={`${classes.profilecontainer}`}>
                <div className={classes.avatarCon}>
                  <div className={classes.profileDiv}>
                    {/* <i className={classes.GreenDot}>{GreenDot}</i> */}
                    {showEyeIcon && (
                      <i className={classes.eyeIcon}>
                        <EyeIcon />
                      </i>
                    )}
                    {tenantId === 'amura' && <i className={classes.logoIcon}>{AmuraIcon}</i>}
                    <CachedAvatar
                      className={`${classes.profilePic}`}
                      src={`${import.meta.env.VITE_DP_URL}${patientId}/profile-pic.png`}
                    >
                      {getFirstLetters(title)}
                    </CachedAvatar>
                  </div>
                </div>
              </div>
              <div className={`${classes.nameContainer}`}>
                <div className={`${classes.nameContainerHead}`}>
                  <div title={title} className={`${classes.userNametext} ${CommonStyles.body15Medium}`}>
                    {title}
                  </div>
                  <div className={`${classes.nameConatinerHeadMenu}`}>
                    <div className={classes.roleWrapper}>
                      <span className={`${classes.roleName} ${CommonStyles.caption12Medium}`} title={roleIdName}>
                        {roleIdName}
                      </span>
                    </div>
                  </div>
                  {tabThreeDotOptions.length > 0 && (
                    <ThreeDotMenu isDivider options={tabThreeDotOptions} handleClick={onTabThreeDotChange} usePopOver />
                  )}
                </div>
                <div className={classes.contentWrap}>
                  {createdOn && (
                    <div>
                      <div className={`${CommonStyles.caption12Medium} ${classes.captionCon}`}>
                        {moment(cardData?.createdOn).format('YYYY-MM-DD')}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={classes.timeLineWrapperExtended}>
              <div className={classes.Wrapper}>
                {dotscount > 0 && (
                  <CountDownTimeLine
                    createdTime={null}
                    startTime={null} //cardData.SLA.StartTime
                    endTime={
                      bluedots?.lastExpiredBluedot
                        ? new Date(bluedots?.lastExpiredBluedot)
                        : bluedots?.blueToExpireNext
                        ? new Date(bluedots?.blueToExpireNext)
                        : null
                    }
                    showTimer={true}
                  />
                )}
              </div>
              <div className={classes.dotWrapper}>
                <div
                  onClick={(e) => {
                    if (!dotscount) return;
                    e.stopPropagation();
                    if (bluedotClick) {
                      bluedotClick({ selectedClientObject: cardData, reporteesData: reporteesData });
                    }
                  }}
                >
                  <DotStatus
                    color={
                      bluedotExpiredIsLight
                        ? '#A6A6A6'
                        : bluedots?.blackDotsCount
                        ? '#252427'
                        : nextBlueToBeExpiredIsLight
                        ? '#CAF0F8'
                        : bluedots?.blueDotsCount
                        ? '#007AFF'
                        : bluedots?.indirectBlueDotsCount
                        ? '#CAF0F8'
                        : '#E1E1E1'
                    }
                    count={dotscount}
                  />
                </div>
                <DotStatus
                  color={!isReportee && cardData?.additionalKeys?.greenDotCount ? '#52B788' : '#E1E1E1'}
                  count={!isReportee ? cardData?.additionalKeys?.greenDotCount : 0}
                />
                <DotStatus color={'#E1E1E1'} isSelected={isClientSelected} />
              </div>
            </div>
            {isExtend && (
              <div className={classes.lastCon}>
                <div className={classes.iconGroup} onClick={(e) => e.stopPropagation()}>
                  {clientStatus && (
                    <span
                      ref={anchorEl}
                      className={classes.gcStatusIcon}
                      title={capitalizeFirstLetter(clientStatus)}
                      onClick={(e) => {
                        if (isLoadingStatusChangePopup) return;
                        setIsStatusPopupOpen(true);
                      }}
                    >
                      {<GcStatusIcon />}
                    </span>
                  )}
                  {isStatusPopupOpen && (
                    <StatusManager
                      onClose={() => setIsStatusPopupOpen(false)}
                      selectedCard={cardData}
                      sessions={props.sessions}
                      anchorEl={anchorEl}
                      setIsLoadingStatusChangePopup={setIsLoadingStatusChangePopup}
                      clientStatus={clientStatus}
                    />
                  )}
                  {/* <span className={classes.statusIcon}>{DiabeticIcon}</span>
                  <span className={classes.statusIcon}>{GreenLeafIcon}</span>
                  <span className={classes.statusIcon}>{CancerIcon}</span> */}
                </div>
              </div>
            )}
          </div>
          {isSelected && (
            <div className={classes.overlayStyle}>
              <span className="ticIconStyle">{TicIcon}</span>
            </div>
          )}
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
          <div className={`${classes.bannerDiv}`}></div>
          <div className={`${classes.contentContainer}`}>
            <div className={`${classes.nameCardHeader}`}>
              <div className={`${classes.profilecontainer}`}>
                <div className={classes.avatarCon}>
                  <div className={classes.profileDiv}>
                    {/* <i className={classes.GreenDot}>{GreenDot}</i> */}
                    {showEyeIcon && (
                      <i className={classes.eyeIcon}>
                        <EyeIcon />
                      </i>
                    )}
                    {cardData.tenantId === 'amura' && <i className={classes.logoIcon}>{AmuraIcon}</i>}
                    <CachedAvatar
                      className={`${classes.profilePic}`}
                      src={`${import.meta.env.VITE_DP_URL}${patientId}/profile-pic.png`}
                    >
                      {getFirstLetters(title)}
                    </CachedAvatar>
                  </div>
                </div>
              </div>
              <div className={`${classes.nameContainer}`}>
                <div className={`${classes.nameContainerHead}`}>
                  <div title={title} className={`${classes.userNametext} ${CommonStyles.body15Medium}`}>
                    {title}
                  </div>
                  <div className={`${classes.nameConatinerHeadMenu}`}>
                    <div className={classes.roleWrapper}>
                      {/* <span>{LockIcon}</span> */}
                      <span className={`${classes.roleName} ${CommonStyles.caption12Medium}`} title={roleIdName}>
                        {roleIdName}
                      </span>
                    </div>

                    {clientStatus ? (
                      <div className={classes.dotIconDiv}>
                        <ThreeDotMenu
                          isDivider
                          options={[{ label: 'Manage statuses', value: 'Manage statuses', icon: StatusIcon }]}
                          handleClick={handleMessageStatus}
                          usePopOver
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className={classes.contentWrap}>
                  {/*status prop required {cardData?.status} */}
                  {/* {true && <div className={`${CommonStyles.sm10Medium} ${classes.statusLable}`}>{'A'}</div>} */}

                  {createdOn && (
                    <div className={`${CommonStyles.caption12Medium} ${classes.captionCon}`}>
                      {moment(cardData?.createdOn).format('YYYY-MM-DD')}
                    </div>
                  )}
                  <div className={classes.iconGroup}>
                    {clientStatus && (
                      <span className={classes.gcStatusIcon} title={''}>
                        {<GcStatusIcon />}
                      </span>
                    )}

                    {/* <span className={classes.statusIcon}>{DiabeticIcon}</span>
                    <span className={classes.statusIcon}>{GreenLeafIcon}</span>
                    <span className={classes.statusIcon}>{CancerIcon}</span> */}
                  </div>

                  {/* {isExtend && createdOn && (
                    <div className={`${CommonStyles.caption12Regular} ${classes.date}`}>
                      {moment(createdOn).format('hh:mm a')}
                    </div>
                  )} */}
                </div>
              </div>
            </div>

            <div className={classes.timeLineWrapperExtended}>
              <div className={classes.Wrapper}>
                {(cardData?.additionalKeys?.bluedots?.blueDotsCount > 0 ||
                  cardData?.additionalKeys?.bluedots?.blackDotsCount > 0 ||
                  cardData?.additionalKeys?.bluedots?.indirectBlueDotsCount > 0) && (
                  <CountDownTimeLine
                    createdTime={null}
                    startTime={null} //cardData.SLA.StartTime
                    endTime={
                      cardData?.additionalKeys?.bluedots?.lastExpiredBluedot
                        ? new Date(cardData?.additionalKeys?.bluedots?.lastExpiredBluedot)
                        : cardData?.additionalKeys?.bluedots?.blueToExpireNext
                        ? new Date(cardData?.additionalKeys?.bluedots?.blueToExpireNext)
                        : null
                    } //{new Date('2023-04-25T22:38:56.431Z')} //cardData.SLA.EndTime
                    showTimer={true}
                  />
                )}
              </div>
              <div className={classes.dotWrapper}>
                <div
                  onClick={(e) => {
                    let isBlueDotsAvailable =
                      Number(cardData?.additionalKeys?.bluedots?.blueDotsCount || 0) +
                      Number(cardData?.additionalKeys?.bluedots?.blackDotsCount || 0);
                    if (!isBlueDotsAvailable) return;
                    e.stopPropagation();
                    sendEvent('onBlueDotClick', { selectedClientObject: cardData });
                  }}
                >
                  <DotStatus
                    color={
                      bluedotExpiredIsLight
                        ? '#A6A6A6'
                        : bluedots?.blackDotsCount
                        ? '#252427'
                        : bluedotExpiredIsLight
                        ? '#CAF0F8'
                        : bluedots?.blueDotsCount
                        ? '#007AFF'
                        : bluedots?.indirectBlueDotsCount
                        ? '#CAF0F8'
                        : '#E1E1E1'
                    }
                    count={
                      cardData?.additionalKeys?.bluedots?.blackDotsCount > 0
                        ? cardData?.additionalKeys?.bluedots?.blackDotsCount
                        : cardData?.additionalKeys?.bluedots?.blueDotsCount
                    }
                  />
                </div>
                <DotStatus color={'#E1E1E1'} isSelected={isClientSelected} />
                <DotStatus color={'#E1E1E1'} isSelected={isClientSelected} />
              </div>
            </div>
          </div>
          {isSelected && (
            <div className={classes.overlayStyle}>
              <span className="ticIconStyle">{TicIcon}</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NameCard;
