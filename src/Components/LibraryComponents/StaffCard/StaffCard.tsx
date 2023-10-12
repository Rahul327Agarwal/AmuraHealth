import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { AmuraIcon, DesktopIcon, Star } from '../../SVGs/Common';
import { CachedAvatar } from '../Avatar/CachedAvatar';
import { useStyles } from './Staffcard.styles';
import { IProps } from './Staffcard.types';

const Staffcard = (props: IProps) => {
  const { profileName, userProfile, ratingValue, lastSeen, injectConponentEnd, tenantId, userId, variant, salutation } = props;
  const { classes } = useStyles({ ...props });
  const CommonStyles = useCommonStyles();
  const getFirstLetters = (name: string) => {
    if (!name) return '';
    if (name.split(' ').length > 1) return (name.split(' ')[0].charAt(0) + name.split(' ')[1].charAt(0)).toUpperCase();
    return name.charAt(0).toUpperCase();
  };

  return (
    <>
      <div
        className={`${classes.mainContainer} 
       ${variant === 'teamCard' ? classes.teamCard : ''} 
       ${variant === 'staffCard' ? classes.staffCard : ''} 
       ${variant === 'card' ? classes.card : ''} 
       `}
      >
        <div className={`${classes.contentContainer}`}>
          <div className={` ${variant === 'staffCard' ? classes.staffNameCardHeader : classes.nameCardHeader} `}>
            <div className={`${classes.profilecontainer}`}>
              <div className={classes.avatarCon}>
                <div className={` ${variant === 'staffCard' ? classes.staffProfileDiv : classes.profileDiv} `}>
                  {/* <i className={classes.GreenDot}>{GreenDot}</i> */}
                  {/* <i className={classes.logoIcon}>{AmuraIcon}</i> */}
                  {tenantId && <i className={classes.flagIcon}>{tenantId === 'amura' && <AmuraIcon />}</i>}
                  <CachedAvatar
                    className={` ${variant === 'staffCard' ? classes.staffProfilePic : classes.profilePic} `}
                    src={`${import.meta.env.VITE_DP_URL}${userId}/profile-pic.png`}
                  >
                    {getFirstLetters(profileName)}
                  </CachedAvatar>
                </div>
              </div>
            </div>
            <div className={`${classes.nameContainer}`}>
              <div className={`${classes.nameContainerHead}`}>
                <div className={`${classes.nameGrid}`}>
                  <div
                    title={`${salutation ?? ''} ${profileName}`}
                    className={`${CommonStyles.body15Medium} ${
                      variant === 'staffCard' ? classes.staffUserNametext : classes.userNametext
                    } `}
                  >
                    {`${salutation ?? ''} ${profileName}`}
                  </div>
                  {ratingValue && (
                    <div className={classes.dFlexEnd}>
                      <span className={classes.starIcon}>{<Star />}</span>
                      <span className={`${classes.rating} ${CommonStyles.body15Regular} `}>{ratingValue}</span>
                    </div>
                  )}
                </div>
                <div className={`${classes.roleGrid}`}>
                  <div
                    title={userProfile[0] && userProfile[0] === 'basic-user' ? '' : userProfile}
                    className={`${classes.userProfile} ${classes.roleNameText} ${CommonStyles.body15Regular}`}
                  >
                    {userProfile[0] && userProfile[0] === 'basic-user' ? '' : userProfile}
                  </div>
                  {lastSeen && (
                    <div className={classes.dFlex}>
                      <span className={classes.desktopIcon}>{<DesktopIcon />}</span>
                      <span className={`${classes.userProfile} ${CommonStyles.sm10Regular}`}>{lastSeen}</span>
                    </div>
                  )}
                </div>
              </div>
              {injectConponentEnd && <div className={classes.dotIconDiv}>{injectConponentEnd}</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Staffcard;
