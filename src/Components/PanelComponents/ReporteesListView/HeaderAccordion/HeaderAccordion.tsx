import React from 'react';
import NotificationBadge from '../NotificationBadge/NotificationBadge';
import { CaretIcon } from '../SVGs/CaretIcon';
import { useStyles } from './HeaderAccordion.styles';
import { IHeaderAccordionProps } from './HeaderAccordion.types';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import Checkbox from '../../../LibraryComponents/MUICheckbox/MUICheckbox';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { useSelector } from 'react-redux';
import { IAllRoleDetails } from '../../MyListPanel/MyList/MyList.types';

const HeaderAccordion = (props: IHeaderAccordionProps) => {
  const {
    allowSelect,
    countDetails,
    roleId,
    tenantName,
    tenantIcon,
    isOpen,
    onOpenStatusChange,
    onSelectAllRoles,
    isAllSelected,
    checkboxIcon,
  } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const roles: IAllRoleDetails[] = useSelector((state: IRootState) => state.dashboard.allUserRoles);
  const roleIdName = roleId ? roles.find((role) => role.roleId === roleId)?.roleName || roleId : roleId;

  return (
    <section className={classes.stickySection}>
      <div className={classes.level0Accordion}>
        <div className={classes.level0LeftBox}>
          <div className={`${commonClasses.body15Medium} ${classes.roleNameLevel0}`} title={roleIdName}>
            {roleIdName}
          </div>
          <div className={classes.tenantLevel0Box}>
            <span>{tenantIcon}</span>
            <span className={`${commonClasses.caption12Regular} ${classes.tenantLevel0}`}>{tenantName}</span>
          </div>
        </div>
        <div className={classes.level0RightBox} data-open={!isOpen} onClick={onOpenStatusChange}>
          {CaretIcon}
        </div>
      </div>
      <div className={classes.badgePanel} data-visible={isOpen}>
        {!allowSelect ? (
          <div className={classes.countdetailsBox}>
            <div className={classes.badgeContainer}>
              <NotificationBadge
                content={[
                  { bgcolor: '#E1E1E1', textColor: '#FFFF', text: '' },
                  { bgcolor: '#E1E1E1', textColor: '#FFFF', text: '' },
                ]}
              />
              <NotificationBadge
                content={[
                  {
                    bgcolor: countDetails?.blueDot ? '#007AFF' : '#E1E1E1',
                    textColor: '#FFFF',
                    text: String(Number(countDetails?.blueDot ?? 0) || ''),
                  },
                  {
                    bgcolor: countDetails?.indirectBlueDotCount ? '#CAF0F8' : '#E1E1E1',
                    textColor: countDetails?.indirectBlueDotCount ? '#5C5A61' : '#FFFF',
                    text: String(Number(countDetails?.indirectBlueDotCount ?? 0) || ''),
                  },
                ]}
              />
              <NotificationBadge
                content={[
                  { bgcolor: '#E1E1E1', textColor: '#FFFF', text: '' },
                  { bgcolor: '#E1E1E1', textColor: '#FFFF', text: '' },
                ]}
              />
            </div>
          </div>
        ) : (
          <div className={classes.selectAllButton} onClick={onSelectAllRoles}>
            <Checkbox checked={isAllSelected} icon={checkboxIcon} />
            <span className={`${commonClasses.body17Regular} ${classes.selectAllText}`}>Select All</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeaderAccordion;
