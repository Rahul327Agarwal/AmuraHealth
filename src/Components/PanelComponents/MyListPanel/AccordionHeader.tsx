import React from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { GroupByArrow } from '../../SVGs/Common';
import { useStyles } from './MyList/MyList.styles';
import { AccordionHeaderProps } from './MyListHome.types';
import { IRootState } from '../../../DisplayFramework/State/store';
import { useSelector } from 'react-redux';
import { IAllRoleDetails } from './MyList/MyList.types';

const AccordionHeader = (props: AccordionHeaderProps) => {
  const { groupedName, listCount, open, handleOnClick } = props;
  const roles: IAllRoleDetails[] = useSelector((state: IRootState) => state.dashboard.allUserRoles);

  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();

  const [groupNameShow = '', roleId = ''] = groupedName?.split('~');
  const groupNameShowName = groupNameShow
    ? roles.find((role) => role.roleId === groupNameShow)?.roleName || groupNameShow
    : groupNameShow;
  const roleIdName = roleId ? roles.find((role) => role.roleId === roleId)?.roleName || roleId : roleId;

  return (
    <div className={`${commonClasses.body15Medium} ${classes.accordionStyle}`} onClick={handleOnClick}>
      <span className={classes.flexStatusKey} title={`${groupNameShowName}${roleIdName ? `, ${roleIdName}` : ''}`}>
        <span className={classes.wordWrapGroup}>
          <span className={`${commonClasses.body15Regular} ${classes.textSpan1}`}> {groupNameShowName}</span>
          <span className={`${commonClasses.caption12Regular} ${classes.textSpan2}`}> {`${roleIdName ? `, ${roleIdName}` : ''}`}</span>
        </span>
        <span className={classes.clientCount}>{`(${listCount})`}</span>
      </span>
      <span className={`${classes.arrow} ${open ? classes.rotatedArrow : ''}`}>
        <GroupByArrow />
      </span>
    </div>
  );
};

export default AccordionHeader;
