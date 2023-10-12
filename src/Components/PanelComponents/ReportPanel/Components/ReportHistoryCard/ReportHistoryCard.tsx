import moment from 'moment';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { getNameInitials, isNumeric } from './../../../../../Common/Common.functions';
import { useStyles } from './ReportHistoryCard.styles';
import { IProps } from './ReportHistoryCard.types';
import { CachedAvatar } from '../../../../LibraryComponents/Avatar/CachedAvatar';

const ACTION_TYPE = {
  UPDATE: 'Edited',
  ADD: 'Added',
  DELETE: 'Removed',
  ACTIVATE: 'Activated',
  DEACTIVATE: 'Deactivated',
  YES: 'Accepted',
  NO: 'Rejected',
  PAUSE: 'Paused',
};

export default function ReportHistoryCard(props: IProps) {
  const { unitId, updatedBy, updatedByName, discription, action, label, updatedOn, value } = props;

  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <div className={classes.reportCards}>
      <div className={`${commonClasses.caption12Medium} ${classes.capsuleAction}`}>{ACTION_TYPE[action] || action}</div>
      {unitId || label || value ? (
        <div className={classes.actionNameDiv}>
          <div
            className={`${classes.gray900} ${unitId ? classes.width60 : classes.width73} ${commonClasses.body15Regular} ${
              label && classes.label
            }`}
          >
            {label}
          </div>
          {unitId ? <div className={`${classes.gray900} ${classes.width17} ${commonClasses.body15Regular}`}>{unitId}</div> : null}
          {value ? (
            <div className={`${classes.gray9001} ${unitId ? classes.width14 : classes.width22} ${commonClasses.body15Regular}`}>
              {label && label === 'labName'
                ? value
                : new Date(`${value}`.replace(/ /g, '')).toString() !== 'Invalid Date' && !isNumeric(value)
                ? moment(value).format('DD/MM/YYYY')
                : value}
            </div>
          ) : null}
        </div>
      ) : null}
      {discription ? <div className={`${classes.gray900} ${commonClasses.body15Regular}`}>{discription}</div> : null}
      <div className={classes.userDetailsDiv}>
        <div className={`${commonClasses.body15Regular} ${classes.gray500}`}>
          {moment(updatedOn).format('DD/MM/YYYY, hh:mm A')}
        </div>
        <div className={classes.userClass}>
          <CachedAvatar className={classes.avatar} src={`${import.meta.env.VITE_DP_URL}${updatedBy}/profile-pic.png`}>
            {getNameInitials(updatedByName)}
          </CachedAvatar>
          <div className={`${commonClasses.caption12Medium} ${classes.gray400}`}>{updatedByName}</div>
        </div>
      </div>
    </div>
  );
}
