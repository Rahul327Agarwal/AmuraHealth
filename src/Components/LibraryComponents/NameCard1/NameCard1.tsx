import { Avatar } from '@mui/material';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { BranchingIcon, TicIcon } from './NameCard.svg';
import CountDownTimeLine from '../CountDownTimer/CountDownTimeLine/CountDownTimeLine';
import DotStatus from '../DotStatus/DotStatus';
import { useStyles } from './NameCard.styles';
import { IProps } from './NameCard.types';

const NameCard = (props: IProps) => {
  const {
    caption,
    title,
    content,
    tenentIcon,
    SLA,
    endActionButton,
    customStyle,
    profilePicURL,
    profilePic,
    openClient,
    hasBlueDot,
    hasBlackDot,
    isSelected,
    iconTray,
    isExtend,
    isMiniCard,
    iconTrayStyle,
    hasBranching,
  } = props;

  const { classes } = useStyles(props);
  const CommonStyles = useCommonStyles();

  return !isExtend ? (
    <div className={`${classes.mainContainer} ${customStyle}`} {...(openClient && { onClick: () => openClient() })}>
      <div className={`${classes.bannerDiv}`} />
      <div className={`${classes.contentContainer}`}>
        <div className={`${classes.nameCardHeader}`}>
          <div className={classes.avatarCon}>
            <div className={classes.profileDiv}>
              {tenentIcon && <i className={classes.logoIcon}>{tenentIcon}</i>}
              <Avatar className={classes.profilePic} src={profilePicURL}>
                {profilePic}
              </Avatar>
            </div>
          </div>
          <div className={`${classes.nameContainer}`}>
            <div className={`${classes.nameContainerHead}`}>
              <div title={title} className={`${classes.userNametext} ${CommonStyles.body15Medium}`}>
                {title}
              </div>
              <div className={`${classes.nameConatinerHeadMenu}`}>
                {hasBlueDot || hasBlackDot ? (
                  <div className={classes.DotsDiv}>
                    {hasBlueDot && <DotStatus color={'#252427'} />}
                    {hasBlackDot && <DotStatus color={'#252427'} />}
                  </div>
                ) : null}
                {endActionButton ? <div className={classes.dotIconDiv}>{endActionButton}</div> : null}
              </div>
            </div>
            <div className={classes.nameContainerDesc}>
              <div className={classes.leftBox}>
                {caption && (
                  <span className={`${CommonStyles.sm10Medium} ${classes.captionStyle}`} title={caption}>
                    {caption}
                  </span>
                )}
                {iconTray?.map((icon) => (
                  <div className={`${classes.iconBox} ${iconTrayStyle}`}>{icon}</div>
                ))}
                {hasBranching ? <div className={`${classes.iconBox} ${iconTrayStyle}`}>{<BranchingIcon />}</div> : null}
              </div>
              {content && <div className={`${CommonStyles.caption12Medium} ${classes.captionCon}`}>{content}</div>}
            </div>
          </div>
        </div>
        {!isMiniCard ? (
          <div className={classes.timelineWrapper}>
            {SLA && (
              <CountDownTimeLine
                createdTime={new Date(SLA?.CreatedTime || 0)}
                startTime={new Date(SLA?.StartTime || 0)}
                endTime={new Date(SLA?.EndTime || 0)}
                showTimer
              />
            )}
          </div>
        ) : null}
      </div>
      {isSelected && (
        <div className={classes.overlayStyle}>
          <span className="ticIconStyle">{<TicIcon />}</span>
        </div>
      )}
    </div>
  ) : (
    <div className={`${classes.mainContainer} ${customStyle}`} {...(openClient && { onClick: () => openClient() })}>
      <div className={`${classes.bannerDiv}`} />
      <div className={`${classes.contentContainer}`}>
        <div className={`${classes.nameCardHeader}`}>
          <div className={classes.avatarCon}>
            <div className={classes.profileDiv}>
              {tenentIcon && <i className={classes.logoIcon}>{tenentIcon}</i>}
              <Avatar className={classes.profilePic} src={profilePicURL}>
                {profilePic}
              </Avatar>
            </div>
          </div>
          <div className={`${classes.nameContainer}`}>
            <div className={`${classes.nameContainerHead}`}>
              <div title={title} className={`${classes.userNametext} ${CommonStyles.body15Medium}`}>
                {title}
              </div>
              <div className={`${classes.nameConatinerHeadMenu}`}>
                {hasBlueDot || hasBlackDot ? (
                  <div className={classes.DotsDiv}>
                    {hasBlueDot && <DotStatus color={'#252427'} />}
                    {hasBlackDot && <DotStatus color={'#252427'} />}
                  </div>
                ) : null}
                {endActionButton ? <div className={classes.dotIconDiv}>{endActionButton}</div> : null}
              </div>
            </div>
            <div className={classes.nameContainerDesc}>
              {content && <div className={`${CommonStyles.caption12Medium} ${classes.captionCon}`}>{content}</div>}
            </div>
          </div>
        </div>
        <div className={classes.nameContainerExtended}>
          {caption && (
            <span className={`${CommonStyles.sm10Medium} ${classes.captionStyle}`} title={caption}>
              {caption}
            </span>
          )}
          <div className={`${CommonStyles.body15Regular} ${classes.discriptionStyle}`}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis animi ratione quia!
          </div>
          <span className={`${CommonStyles.body15Regular} ${classes.timeStyle}`}>O9:30 AM</span>
        </div>
        {!isMiniCard ? (
          <div className={classes.timelineWrapper}>
            {SLA && (
              <CountDownTimeLine
                createdTime={new Date(SLA?.CreatedTime || 0)}
                startTime={new Date(SLA?.StartTime || 0)}
                endTime={new Date(SLA?.EndTime || 0)}
                showTimer
              />
            )}
          </div>
        ) : null}
        <div className={classes.extentedIconBox}>
          <div className={classes.extentedIconBoxLeft}>
            {iconTray?.map((icon) => (
              <div className={`${classes.iconBox} ${iconTrayStyle}`}>{icon}</div>
            ))}
          </div>
          <div className={classes.extentedIconBoxRight}></div>
        </div>
      </div>
      {isSelected && (
        <div className={classes.overlayStyle}>
          <span className="ticIconStyle">{<TicIcon />}</span>
        </div>
      )}
    </div>
  );
};

export default NameCard;
