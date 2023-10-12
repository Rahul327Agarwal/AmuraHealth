import moment from 'moment';
import React, { useState } from 'react';
//import CountDownTimeLine from '../../Common/CountDownTimerNew/CountDownTimeLine/CountDownTimeLine';
import DotStatus from '../DotStatus/DotStatus';
// import FloodBar from '../FlloodBar/FloodBar';
// import ProfilePicGroup from '../ProfilePicGroup/ProfilePicGroup';
// import { GcStatusIcon } from '../SVG/GcStatusIcon';
// import { DiabeticIcon } from '../SVGNew/DiabeticIcon';
// import { GreenDot } from '../SVGNew/GreenDot';
// import { LeafIcon } from '../SVGNew/LeafIcon';

import ThreeDotMenu from '../ThreeDotMenu/ThreeDotMenu';
import { useStyles } from './LeaveCard.styles';
import { IProps } from './LeaveCard.types';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { Avatar } from '@mui/material';
import { AmuraIcon, LockIcon, StatusIcon, TicIcon } from './LeaveCard.svg';
// import { getStatusOfClientLeaveCard } from '../../PanelComponents/MyListPanelNew/MyList/MyList.function';
import CountDownTimeLine from '../CountDownTimer/CountDownTimeLine/CountDownTimeLine';

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
  // console.log(diffTime + " milliseconds");
  // console.log(diffDays + " days");
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
const LeaveCard = (props: IProps) => {
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

  const { classes } = useStyles(props);
  const CommonStyles = useCommonStyles();
  const [floodBarValue, setFloodBarValue] = useState(30);
  const handleMessageStatus = () => {
    setSelectedCard(cardData);
    setAction('MESSAGE_STATUS');
  };
//TO DO//
  const clientStatus ={}//|| getStatusOfClientLeaveCard(cardData);

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
                    {cardData.tenantId === 'amura' && <i className={classes.logoIcon}>{AmuraIcon}</i>}
                    <Avatar
                      className={`${classes.profilePic}`}
                      src={`${import.meta.env.VITE_DP_URL}${cardData.ID}/profile-pic.png`}
                    >
                      {getFirstLetters(
                        cardData?.userInfo?.username || cardData?.userInfo?.FirstName + ' ' + cardData?.userInfo?.LastName
                      )}
                    </Avatar>
                  </div>
                </div>
              </div>
              <div className={`${classes.nameContainer}`}>
                <div className={`${classes.nameContainerHead}`}>
                  <div
                    title={cardData?.userInfo?.username || cardData?.userInfo?.FirstName + ' ' + cardData?.userInfo?.LastName}
                    className={`${classes.userNametext} ${CommonStyles.body15Medium}`}
                  >
                    {cardData?.userInfo?.username || cardData?.userInfo?.FirstName + ' ' + cardData?.userInfo?.LastName}
                  </div>
                  <div className={`${classes.nameConatinerHeadMenu}`}>
                    {/* <div className={classes.DotsDiv}>
                      <DotStatus color={'#252427'} isSelected={false} />
                      <DotStatus color={showBlueDot ? '#007AFF' : '#252427'} isSelected={showBlueDot} />
                    </div> */}
                    <div className={classes.roleWrapper}>
                      <span>{LockIcon}</span>
                      <span className={`${classes.roleName} ${CommonStyles.caption12Medium}`}>{cardData.roleId}</span>
                    </div>

                    {clientStatus ? (
                      <div className={classes.dotIconDiv}>
                        <ThreeDotMenu
                          isDivider
                          options={[{ label: 'Manage statuses', value: 'Manage statuses', icon: StatusIcon }]}
                          handleClick={handleMessageStatus}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className={classes.contentWrap}>
                  {cardData?.status && (
                    <div className={`${CommonStyles.sm10Medium} ${classes.statusLable}`}>{cardData.status[0].current_status}</div>
                  )}
                  <div className={` ${CommonStyles.body14Regular}  ${classes.description}`}>
                    {cardData.leaveType}: {cardData.leaveDesription}
                  </div>
                  {cardData?.user_created_on && (
                    <div className={`${CommonStyles.caption12Regular} ${classes.date}`}>
                      {moment(cardData?.user_created_on).format('YYYY-MM-DD')}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={classes.timeLineWrapperExtended}>
              {cardData.SLA && (
                <div className={classes.Wrapper}>
                  <CountDownTimeLine
                    createdTime={new Date()}
                    startTime={new Date(cardData.SLA.StartTime)}
                    endTime={new Date(cardData.SLA.EndTime)}
                    showTimer={true}
                  />
                </div>
              )}
              <div className={classes.dotWrapper}>
                <DotStatus color={showBlueDot ? '#007AFF' : '#252427'} isSelected={showBlueDot} />
                <DotStatus color={'#52B788'} isSelected={true} />
                <DotStatus color={'#FF3B30'} isSelected={true} />
              </div>
            </div>
            <div className={`${classes.nameCardHeader} ${classes.marginTop}`}>
              <div className={`${classes.profilecontainer}`}>
                <div className={classes.avatarCon}>
                  <Avatar className={`${classes.leavePic}`} src={`${import.meta.env.VITE_DP_URL}${cardData.ID}/profile-pic.png`}>
                    {getLeaves(cardData.leaveFrom, cardData.leaveTo)}
                  </Avatar>
                </div>
              </div>
              <div className={`${classes.nameContainer}`}>
                <div className={classes.contentWrap}>
                  <div className={` ${CommonStyles.body14Regular}  ${classes.description}`}>
                    {cardData.leaveType}: {cardData.leaveDesription}
                  </div>
                  {cardData?.user_created_on && (
                    <div className={`${CommonStyles.caption12Regular} ${classes.date}`}>
                      {moment(cardData?.user_created_on).format('YYYY-MM-DD')}
                    </div>
                  )}
                </div>
                <div className={classes.dateFlex}>
                  <span className={`${classes.textColor}  ${CommonStyles.caption12Medium}`}>{getdate(cardData.leaveFrom)}</span>
                  <span className={`${classes.textColor}  ${CommonStyles.caption12Medium}`}>{getdate(cardData.leaveTo)}</span>
                </div>
              </div>
            </div>
            {isExtend && (
              <div className={classes.lastCon}>
                {/* <div className={classes.iconGroup}>
                  {clientStatus && (
                    <span className={classes.gcStatusIcon} title={clientStatus}>
                      {GcStatusIcon}
                    </span>
                  )}
                  <span className={classes.statusIcon}>{LeafIcon}</span>
                  <span className={classes.statusIcon}>{DiabeticIcon}</span>
                  <span className={classes.statusIcon}>{LeafIcon}</span>
                </div> */}
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
                    {cardData.tenantId === 'amura' && <i className={classes.logoIcon}>{AmuraIcon}</i>}
                    <Avatar
                      className={`${classes.profilePic}`}
                      src={`${import.meta.env.VITE_DP_URL}${cardData.ID}/profile-pic.png`}
                    >
                      {getFirstLetters(
                        cardData?.userInfo?.username || cardData?.userInfo?.FirstName + ' ' + cardData?.userInfo?.LastName
                      )}
                    </Avatar>
                  </div>
                </div>
              </div>
              <div className={`${classes.nameContainer}`}>
                <div className={`${classes.nameContainerHead}`}>
                  <div
                    title={cardData?.userInfo?.username || cardData?.userInfo?.FirstName + ' ' + cardData?.userInfo?.LastName}
                    className={`${classes.userNametext} ${CommonStyles.body15Medium}`}
                  >
                    {cardData?.userInfo?.username || cardData?.userInfo?.FirstName + ' ' + cardData?.userInfo?.LastName}
                  </div>
                  <div className={`${classes.nameConatinerHeadMenu}`}>
                    {/* <div className={classes.DotsDiv}>
                      <DotStatus color={'#252427'} isSelected={false} />
                      <DotStatus color={showBlueDot ? '#007AFF' : '#252427'} isSelected={showBlueDot} />
                    </div> */}
                    <div className={classes.roleWrapper}>
                      <span>{LockIcon}</span>
                      <span className={`${classes.roleName} ${CommonStyles.caption12Medium}`}>{cardData.roleId}</span>
                    </div>

                    {clientStatus ? (
                      <div className={classes.dotIconDiv}>
                        <ThreeDotMenu
                          isDivider
                          options={[{ label: 'Manage statuses', value: 'Manage statuses', icon: StatusIcon }]}
                          handleClick={handleMessageStatus}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className={classes.contentWrap}>
                  {/* {cardData?.status && <div className={`${CommonStyles.sm10Medium} ${classes.statusLable}`}>{clientStatus}</div>} */}
                  <div className={` ${CommonStyles.body14Regular}  ${classes.description}`}>
                    {cardData.leaveType}: {cardData.leaveDesription}
                  </div>
                  {cardData?.user_created_on && (
                    <div className={`${CommonStyles.caption12Regular} ${classes.date}`}>
                      {moment(cardData?.user_created_on).format('YYYY-MM-DD')}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={classes.timeLineWrapperExtended}>
              {cardData.SLA && (
                <div className={classes.Wrapper}>
                  <CountDownTimeLine
                    createdTime={new Date()}
                    startTime={new Date(cardData.SLA.StartTime)}
                    endTime={new Date(cardData.SLA.EndTime)}
                    showTimer={true}
                  />
                </div>
              )}
              <div className={classes.dotWrapper}>
                <DotStatus color={showBlueDot ? '#007AFF' : '#252427'} isSelected={showBlueDot} />
                <DotStatus color={'#52B788'} isSelected={true} />
                <DotStatus color={'#FF3B30'} isSelected={true} />
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

export default LeaveCard;
