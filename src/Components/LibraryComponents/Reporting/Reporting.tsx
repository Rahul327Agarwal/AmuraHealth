import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
// import { AmuraIcon, CloseIcon } from '../../SVGs/Common';
import { AmuraIcon, CloseIcon } from './Reporting.svg';

import { useStyles } from './Reporting.styles';
import { IProps } from './Reporting.types';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../DisplayFramework/State/store';

const Reporting = (props: IProps) => {
  const { reportee, role, client, deleteReportee, isDeleted } = props;

  const { classes } = useStyles();
  const CommonStyles = useCommonStyles();
  const getFirstLetters = (name: any) => {
    if (!name) return '';
    if (name.split(' ').length > 1) return (name.split(' ')[0].charAt(0) + name.split(' ')[1].charAt(0)).toUpperCase();
    return name.charAt(0).toUpperCase();
  };
  const allUserRole = useSelector((state: IRootState) => state.dashboard.allUserRoles);

  let RoleName = allUserRole.find((value) => value.roleId === role)?.roleName || role;
  return (
    <div className={classes.mainDiv}>
      <div className={classes.profilediv}>
        <Avatar className={`${classes.profilePic}`}>{getFirstLetters(reportee)}</Avatar>
      </div>
      <div className={classes.contentCon}>
        <div title={reportee || ''} className={`${classes.namediv} ${CommonStyles.caption12Medium}}`}>
          {reportee}
        </div>
        <div className={classes.flex2}>
          <span title={role || ''} className={`${classes.designation} ${CommonStyles.sm10Regular}}`}>
            {RoleName}
          </span>

          <span title={client || ''} className={`${classes.designation} ${CommonStyles.sm10Regular}}`}>
            {' '}
            <span className={classes.logo}>
              <AmuraIcon />
            </span>{' '}
            {client}
          </span>
        </div>
      </div>
      {isDeleted && (
        <div className={classes.cross}>
          <span
            onClick={() => {
              deleteReportee?.();
            }}
          >
            {<CloseIcon />}
          </span>
        </div>
      )}
    </div>
  );
};

export default Reporting;
