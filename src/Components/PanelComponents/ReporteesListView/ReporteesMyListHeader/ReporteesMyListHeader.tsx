// import { Avatar, IconButton } from '@mui/material';
import { Avatar, IconButton } from '@mui/material';
import { getNameInitials } from '../../../../Common/Common.functions';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { BackArrowIcon } from '../../../SVGs/Common';
import { useStyles } from './ReporteesMyListHeader.styles';
import { IProps } from './ReporteesMyListHeader.types';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { IAllRoleDetails } from '../../MyListPanel/MyList/MyList.types';
import { useSelector } from 'react-redux';

const ReporteesMyListHeader = (props: IProps) => {
  const { userName, handleBack, userId, userRole, userTenantIcon } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  const roles: IAllRoleDetails[] = useSelector((state: IRootState) => state.dashboard.allUserRoles);
  const userRoleName = roles.find((role) => role.roleId === userRole)?.roleName || userRole;

  return (
    <div className={`${classes.nameCardHeader}`}>
      {/* <IconButton className={classes.backButton} onClick={handleBack}>
        <BackArrowIcon />
      </IconButton> */}
      <div className={classes.profileDiv}>
        {userTenantIcon && <i className={classes.logoIcon}>{userTenantIcon}</i>}
        <Avatar className={classes.profilePic} src={`${import.meta.env.VITE_DP_URL}${userId}/profile-pic.png`}>
          {getNameInitials(userName)}
        </Avatar>
      </div>
      <div className={classes.nameContainer}>
        <div title={userName} className={`${commonClasses.body15Medium} ${classes.userNametext} `}>
          {userName}
        </div>
        <div className={`${commonClasses.caption12Regular} ${classes.userRoleBox}`}>{userRoleName}</div>
      </div>
    </div>
  );
};

export default ReporteesMyListHeader;
