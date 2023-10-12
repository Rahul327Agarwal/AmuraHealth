import { Avatar } from '@mui/material';
import { format } from 'date-fns';
import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { doesUserHaveClickAccess, doesUserHaveViewAccess } from '../../../../../Utilities/AccessPermissions';
import { InfoandetailsIcon, PageCloseIcon, PageDownloadIcon, PageEditIcon, PageHistoryIcon } from '../../../../SVGs/Common';
import { getNameInitials } from './../../../../../Common/Common.functions';
import { IRootState } from './../../../../../DisplayFramework/State/store';
import ThreeDotMenu from './../../../../LibraryComponents/ThreeDotMenu/ThreeDotMenu';
import { useStyles } from './ReportsCard.styles';
import { IProps } from './ReportsCard.types';

export const OPTIONS_REPORTS = (download, edit, view, activate, deactivate, isActive, clickPermission = false) => {
  let result = [];
  if (download)
    result.push({
      label: 'Download',
      value: 'DOWNLOAD',
      icon: <PageDownloadIcon />,
      disabled: isActive ? (!clickPermission ? true : false) : true, //!isActive && !clickPermission ? true : false,
    });
  if (edit) result.push({ label: 'Edit', value: 'EDIT', icon: <PageEditIcon />, disabled: activate && !isActive ? true : false });
  if (view)
    result.push({
      label: 'View edit history',
      value: 'VIEW_EDIT_HISTORY',
      icon: <PageHistoryIcon />,
      disabled: false,
    });
  if (activate && !isActive) result.push({ label: 'Activate', value: 'ACTIVATE', icon: <PageCloseIcon /> });
  if (deactivate && isActive) result.push({ label: 'Deactivate', value: 'DEACTIVATE', icon: <PageCloseIcon /> });

  return result;
};

const ReportsCard = (props: IProps) => {
  const { onClick, onThreeDotAction, isActive, reasonForDeactivation, labName, createdBy, createdByName, reportDate } = props;
  const { classes } = useStyles(props);

  const commonClasses = useCommonStyles();

  const accessPermissionsForThisClient = useSelector(
    (state: IRootState) => state.accessPermissions.accessPermissionsForThisClient
  );
  let checkAccessForClick = doesUserHaveViewAccess(accessPermissionsForThisClient, 'ReportEntry', 'ReportEntry.5A');
  let checkDownloadViewAccess = doesUserHaveClickAccess(accessPermissionsForThisClient, 'ReportEntry', 'ReportEntry.5A');
  let checkEditViewAccess = doesUserHaveClickAccess(accessPermissionsForThisClient, 'ReportEntry', 'ReportEntry.5B');
  let checkHistoryAccess = doesUserHaveClickAccess(accessPermissionsForThisClient, 'ReportEntry', 'ReportEntry.5C');
  let checkActiveViewAccess = doesUserHaveClickAccess(accessPermissionsForThisClient, 'ReportEntry', 'ReportEntry.5D');
  let checkDeactiveViewAccess = doesUserHaveClickAccess(accessPermissionsForThisClient, 'ReportEntry', 'ReportEntry.5E');

  return (
    <div {...(isActive && { onClick })} className={classes.reportCards}>
      <div className={classes.cardHeaders}>
        <span className={`${commonClasses.body15Medium} ${classes.primaryText}`}>{labName}</span>
        <ThreeDotMenu
          isGrow
          isDivider
          options={OPTIONS_REPORTS(
            checkDownloadViewAccess,
            checkEditViewAccess,
            checkHistoryAccess,
            checkActiveViewAccess,
            checkDeactiveViewAccess,
            isActive,
            checkAccessForClick
          )}
          handleClick={onThreeDotAction}
          usePopOver
          anchorAlignment={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          popOverAlignment={{
            vertical: 'top',
            horizontal: 'right',
          }}
        />
      </div>
      {!isActive && reasonForDeactivation ? (
        <div className={classes.deactivateDiv}>
          <>{<InfoandetailsIcon />}</>
          <div className={`${commonClasses.caption12Regular} ${classes.primaryText}`}>{reasonForDeactivation}</div>
        </div>
      ) : null}
      <div className={classes.cardSides}>
        <span className={`${commonClasses.body15Medium} ${classes.secondaryText}`}>
          {format(new Date(reportDate), 'dd/MM/yyyy')}
        </span>
        <div className={classes.userNameWrapper}>
          <span className={`${commonClasses.body15Medium} ${classes.secondaryText}`}>{createdByName}</span>
        </div>
      </div>
    </div>
  );
};

export default ReportsCard;
