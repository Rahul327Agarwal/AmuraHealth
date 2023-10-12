import moment from 'moment';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { CachedAvatar } from '../Avatar/CachedAvatar';
import CountDownTimeLine from '../CountDownTimer/CountDownTimeLine/CountDownTimeLine';
import DotStatus from '../DotStatus/DotStatus';
import { useStyles } from './MoveCard.styles';
import { AmuraIcon, InfinityIcon, TicIcon } from './MoveCard.svg';
import { IProps } from './MoveCard.types';

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
  const dateformat = moment(new Date(datetime)).format('DD MMMM YYYY');
  const date = new Date(datetime);
  let hours = parseInt((date.getHours() < 10 ? '0' : '') + date.getHours());

  let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  let newformat = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours || 12;
  let modifiedHours = '';
  if (hours < 10) {
    modifiedHours = '0' + hours;
  } else {
    modifiedHours += hours;
  }
  return dateformat + ' ' + modifiedHours + ':' + minutes + ' ' + newformat;
};
const MoveCard = (props: IProps) => {
  const { cardData, isExtend, customStyle, isSelected, handleSelect, openClient, isClientSelected } = props;
  const { createdOn, title, tenantId, roleId } = cardData || {};
  const { cardId, startDate, endDate, description, createdBy } = cardData.additionalKeys || {};
  const { classes } = useStyles(props);
  const CommonStyles = useCommonStyles();

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
                    {tenantId === 'amura' && <i className={classes.logoIcon}>{AmuraIcon}</i>}
                    <CachedAvatar
                      className={`${classes.profilePic}`}
                      src={`${import.meta.env.VITE_DP_URL}${createdBy}/profile-pic.png`}
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
                      <span className={`${classes.roleName} ${CommonStyles.caption12Medium}`} title={roleId}>
                        {roleId}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={classes.contentWrap}></div>
              </div>
            </div>

            <div className={classes.timeLineWrapperExtended}>
              <div className={classes.Wrapper}>
                {props?.bluedot && (
                  <CountDownTimeLine
                    createdTime={null}
                    startTime={null} //cardData.SLA.StartTime
                    endTime={null} //cardData.SLA.EndTime
                    showTimer={true}
                  />
                )}
              </div>
              <div className={classes.dotWrapper}>
                <DotStatus color={'#E1E1E1'} />
                <DotStatus color={'#E1E1E1'} isSelected={isClientSelected} />
                <DotStatus color={'#E1E1E1'} isSelected={isClientSelected} />
              </div>
            </div>

            <div className={`${classes.nameCardHeader} ${classes.marginTop}`}>
              <div className={`${classes.profilecontainer}`}>
                <div className={classes.avatarCon}>
                  <CachedAvatar className={`${classes.leavePic}`} src={''}>
                    {!endDate ? <InfinityIcon /> : getLeaves(startDate, endDate)}
                  </CachedAvatar>
                </div>
              </div>
              <div className={`${classes.nameContainer}`}>
                <div className={classes.contentWrap}>
                  <div className={` ${CommonStyles.body14Regular}  ${classes.description}`} title={description}>
                    Move my cards: {description}
                  </div>
                  {createdOn && (
                    <div className={`${CommonStyles.caption12Regular} ${classes.date}`}>
                      {moment(createdOn).format('DD/MM/YYYY')}
                    </div>
                  )}
                </div>
                <div className={classes.dateFlex}>
                  <span className={`${classes.textColor}  ${CommonStyles.caption12Medium}`}>{getdate(startDate)}</span>
                  {endDate && <span className={`${classes.textColor}  ${CommonStyles.caption12Medium}`}>{getdate(endDate)}</span>}
                </div>
              </div>
            </div>
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
                    <CachedAvatar
                      className={`${classes.profilePic}`}
                      src={`${import.meta.env.VITE_DP_URL}${cardId}/profile-pic.png`}
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
                      <span className={`${classes.roleName} ${CommonStyles.caption12Medium}`} title={roleId}>
                        {cardData.roleId}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={classes.contentWrap}></div>
              </div>
            </div>

            <div className={classes.timeLineWrapperExtended}>
              <div className={classes.Wrapper}>
                {props?.bluedot && (
                  <CountDownTimeLine
                    createdTime={null}
                    startTime={null} //cardData?.SLA?.StartTime
                    endTime={null} //cardData?.SLA?.EndTime
                    showTimer={true}
                  />
                )}
              </div>
              <div className={classes.dotWrapper}>
                <DotStatus color={'#E1E1E1'} />
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

export default MoveCard;
