import { CircularProgress } from '@mui/material';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import NotificationBadge from '../NotificationBadge/NotificationBadge';
import { highlightBorder, useStyles } from './ReporteesCardGrid.styles';
import { IProps } from './ReporteesCardGrid.types';
import Checkbox from '../../../LibraryComponents/MUICheckbox/MUICheckbox';
import { Calender, CaretIcon, CheckedIcon, Description, UncheckedIcon } from './ReporteesCardGrid.svg';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { useSelector } from 'react-redux';
import { IAllRoleDetails } from '../../MyListPanel/MyList/MyList.types';

const ReporteesCardGrid = (props: IProps) => {
  const {
    firstChild,
    level,
    lastChild,
    hasChildren,
    staffName,
    roleId,
    onClick,
    parentLastChildIndex,
    onDescriptionClick,
    isOpen,
    blueDot,
    inDirectBlueDot,
    isLoading,
    allowSelect,
    selected,
    handleSelect,
    onReporteeCardClick,
    onCalenderClick,
  } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  const roles: IAllRoleDetails[] = useSelector((state: IRootState) => state.dashboard.allUserRoles);
  const roleIdName = roleId ? roles.find((role) => role.roleId === roleId)?.roleName || roleId : roleId;
  const renderGrids = () => {
    let rows = [];
    for (let i = 0; i < level; i++) {
      if (parentLastChildIndex?.indexOf(i) > -1) {
        rows.push(
          <div>
            <div className={classes.TBDiv}></div>
          </div>
        );
      } else
        rows.push(
          <div>
            <div className={classes.TBDiv}>
              <div
                style={highlightBorder(
                  (level > 1 && i < level - 1) || (!firstChild && i < level),
                  level > 1 && firstChild && i == level - 1
                )}
              ></div>
              <div
                style={highlightBorder((level > 1 && i < level - 1) || !lastChild || (lastChild && hasChildren && isOpen), false)}
              ></div>
            </div>
          </div>
        );
    }
    return rows;
  };

  return (
    <div
      className={classes.mainContainer}
      onClick={(event) => {
        onReporteeCardClick(event);
      }}
    >
      <div className={`${classes.gridViews}`}>{!!level && renderGrids()}</div>
      <div className={classes.bodyContainer}>
        <div className={`${commonClasses.sm10Medium} ${classes.circleCon}`}>{level}</div>
        <div className={classes.nameContainer}>
          <div className={classes.userInfo}>
            <div className={`${commonClasses.body15Medium} ${classes.partyName}`} title={staffName}>
              {staffName}
            </div>
          </div>
          <div className={classes.codeContainer}>
            {allowSelect ? (
              <Checkbox
                onClick={(event) => {
                  event.stopPropagation();
                  handleSelect(Boolean(!selected));
                }}
                checked={Boolean(selected)}
                icon={<UncheckedIcon />}
                checkedIcon={<CheckedIcon />}
              />
            ) : null}
            <div className={classes.RLCode}>
              <span title={roleIdName} className={commonClasses.caption12Medium}>
                {roleIdName}
              </span>
            </div>
          </div>
        </div>
        <div className={classes.iconsContainer}>
          <span
            className={classes.discriptionIcon}
            onClick={(event) => {
              event.stopPropagation();
              onDescriptionClick(event);
            }}
          >
            {<Description />}
          </span>
          <span
            className={classes.discriptionIcon}
            onClick={(event) => {
              event.stopPropagation();
              onCalenderClick(event);
            }}
          >
            {<Calender />}
          </span>
        </div>
        <div className={classes.badgeContainer}>
          <NotificationBadge
            content={[
              { bgcolor: '#E1E1E1', textColor: '#FFFF', text: '' },
              { bgcolor: '#E1E1E1', textColor: '#FFFF', text: '' },
            ]}
          />
          <NotificationBadge
            content={[
              { bgcolor: `${blueDot || ''}` ? '#007AFF' : '#E1E1E1', textColor: '#FFFF', text: `${blueDot || ''}` },
              {
                bgcolor: `${inDirectBlueDot || ''}` ? '#CAF0F8' : '#E1E1E1',
                textColor: '#5C5A61',
                text: `${inDirectBlueDot || ''}`,
              },

              // { bgcolor: '#E1E1E1', textColor: '#FFFF', text: '' },
              // { bgcolor: '#E1E1E1', textColor: '#FFFF', text: '' },
            ]}
          />
          <NotificationBadge
            content={[
              { bgcolor: '#E1E1E1', textColor: '#FFFF', text: '' },
              { bgcolor: '#E1E1E1', textColor: '#FFFF', text: '' },
            ]}
          />
          <div className={classes.arrowDiv}>
            {isLoading ? (
              <CircularProgress size={20} className={classes.circularloader} />
            ) : hasChildren ? (
              <span
                className={`${classes.caretIconStyle} ${isOpen ? classes.open : ''}`}
                onClick={(event) => {
                  event.stopPropagation();
                  onClick();
                }}
              >
                {<CaretIcon />}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReporteesCardGrid;
