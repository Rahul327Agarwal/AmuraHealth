import moment from 'moment';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import ThreeDotMenu from '../../../LibraryComponents/ThreeDotMenu/ThreeDotMenu';
import { useStyles } from './BrowseRole.styles';
import { IProps, IShiftSegment } from './BrowseRole.types';
// import { Deactivate, EditIcon } from '../../../SVGs/Common';
import MUIButton from '../../../LibraryComponents/MUIButton/MUIButton';
import Reporting from '../../../LibraryComponents/Reporting/Reporting';
import ShiftSegment from '../../../LibraryComponents/ShiftSegmentCard/ShiftSegment/ShiftSegment';
import { Deactivate, EditIcon } from './BrowseRole.svg';

export default function BrowseRole(props: IProps) {
  const { roles, handleThreedotmenu, handleOnCardClick } = props;
    console.log("roles", roles.shiftSegments.startDate)
  const { classes } = useStyles();
  const commonStyles = useCommonStyles();
  return (
    <div className={`${classes.browseRole} ${!roles.is_active && classes.opacity50}`} onClick={() => handleOnCardClick?.()}>
      <div className={classes.headerWrapper}>
        <div>
          <span className={`${classes.headerTitle} ${commonStyles.body17Medium}`}>{roles.roleName}</span>
          <span className={`${commonStyles.caption12Regular} ${classes.headerSubTitle}`}>
            Role starting from : {moment(roles?.shiftSegments?.length ?  roles?.shiftSegments[0]?.startDate : roles?.shiftSegments?.startDate).format('DD/MM/YYYY')}
          </span>
        </div>
      </div>
      {(roles?.autoAssignment || roles?.manualAssignment) && (
        <div className={classes.allowStatusContainer}>
          <span className={`${classes.allowLabel} ${commonStyles.body15Medium}`}>Allow</span>
          <div>
            {roles?.manualAssignment && (
              <span className={`${classes.labelText} ${classes.mrt}  ${commonStyles.body15Regular}`}>Manual Assignment</span>
            )}
            {roles?.autoAssignment && (
              <span className={`${classes.labelText} ${classes.mrt} ${commonStyles.body15Regular}`}>Auto Assignment</span>
            )}
          </div>
        </div>
      )}
      <span className={`${commonStyles.body15Regular} ${classes.reportee}`}>Reporting to</span>

      <div className={classes.dflex}>
        {roles.reportingTo.map((data: { userName: string; roleName: any; roleId: any }) => {
          return (
            <Reporting
              reportee={data.userName}
              role={data?.roleId || data?.roleName || ''}
              client={roles.tenantId}
              isDeleted={false}
            />
          );
        })}
      </div>
      {roles.shiftSegments.length > 0 && (
        <span className={`${commonStyles.body15Medium} ${roles.shiftSegments.length && classes.shiftSegmentHeader}`}>
          Shift segments
        </span>
      )}
      {roles.shiftSegments.map((shift: IShiftSegment) => (
        <ShiftSegment shift={shift} roleId={roles.roleId} handleEdit={() => {}} isEditable={false} />
      ))}
    </div>
  );
}
