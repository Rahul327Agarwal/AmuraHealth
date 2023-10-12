import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { getNameInitials } from './../../../../Common/Common.functions';
import { dotIcon } from '../SvgImages/dotIcon';
import { useStyles } from './Token.styles';
import { IProps } from './Token.types';
import { CachedAvatar } from '../../Avatar/CachedAvatar';
import { AmuraIcon, CrossIcon } from '../../../SVGs/Common';

export default function NameToken(props: IProps) {
  const { label, userId, isDot, roleId, roleName, fullName, onDelete, tenant, statusIcon } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  return (
    <div className={`${classes.mainContainer}`}>
      <div className={classes.avatarContainer}>
        <CachedAvatar className={classes.avatarBorder} src={`${import.meta.env.VITE_DP_URL}${userId}/profile-pic.png`}>
          {getNameInitials(fullName || label)}
        </CachedAvatar>
        {statusIcon && <span className={classes.icon}>{statusIcon}</span>}
      </div>
      <div className={classes.subContainer}>
        <div className={classes.contentContainer}>
          <span
            title={label?.length > 33 ? label : null}
            className={`${commonClasses.caption12Medium} ${roleName && classes.marginBottom} ${classes.userNameStyle} ${
              classes.longTexthandle
            }`}
          >
            {label}
          </span>
          <div className={classes.flex}>
            {roleName && <span className={`${commonClasses.sm10Regular} ${classes.longTexthandle}`}>{roleName}</span>}
            {tenant && (
              <span className={`${commonClasses.sm10Regular} ${classes.flex}`}>
                <AmuraIcon /> {tenant}
              </span>
            )}
          </div>
        </div>
        {isDot && <div className={classes.dotStyles}>{dotIcon}</div>}
        {onDelete ? (
          <div onClick={onDelete} className={classes.crossIcon}>
            {' '}
            <CrossIcon />{' '}
          </div>
        ) : null}
      </div>
    </div>
  );
}
