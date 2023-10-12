import React from 'react';
import { useStyles } from './StaffCard.styles';
import { IProps } from './StaffCard.types';
import { useCommonStyles } from '../../../../../../Common/Theme/CommonStyles';
import { getFirstLetters } from '../../../../../../Common/Common.functions';
import Avatar from '@mui/material/Avatar';
import Checkbox from '../../../../../LibraryComponents/MUICheckbox/MUICheckbox';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../../../../DisplayFramework/State/store';

export default function StaffCard(props: IProps) {
  const { tenantIcon, displayName, profileURL, profileIcon, onSelect, isSelected, errorMessage } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const roles = useSelector((state: IRootState) => state.dashboard.myRolesAcrossAll);
  return (
    <section className={classes.cardContainer}>
      <section className={classes.cardSelectSection} onClick={() => onSelect()}>
        <div className={classes.iconTitle}>
          <aside className={classes.profileSection}>
            {tenantIcon ? <span className={classes.tenantIcon}>{tenantIcon}</span> : null}
            <Avatar className={classes.profilePic} src={profileURL}>
              {profileIcon || getFirstLetters(displayName)}
            </Avatar>
          </aside>
          <aside className={classes.profileContentSection}>
            <div className={`${commonClasses.body15Medium} ${classes.textPrimary}`}>
               {roles.find((role) => role.value === displayName)?.label || displayName}
            </div>
          </aside>
        </div>
        <aside className={classes.checkFlexbox}>
          {errorMessage ? <span className={`${commonClasses.caption12Regular} ${classes.errorText}`}>{errorMessage}</span> : null}
          <Checkbox onClick={() => onSelect()} checked={Boolean(isSelected)} />
        </aside>
      </section>
    </section>
  );
}
