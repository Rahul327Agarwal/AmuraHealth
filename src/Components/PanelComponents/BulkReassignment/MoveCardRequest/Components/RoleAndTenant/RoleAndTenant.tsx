import React, { memo, useEffect, useState } from 'react';
import StaffCard from '../StaffCard/StaffCard';
import { PRIVACY, MAIN_DATA, PRIVACY_ICONS, PRIVACY_OPTIONS, convertTenantsWithRolesObject } from './RoleAndTenant.functions';
import { useCardCheckbox, useCardPrivacy } from './RoleAndTenant.hook';
import { useStyles } from './RoleAndTenant.styles';
import { ICardData, IRoleAndTenantProps, TPrivacy } from './RoleAndTenant.types';
import { useCommonStyles } from '../../../../../../Common/Theme/CommonStyles';
import { AmuraIcon2, DoctorIcon } from '../../../../../SVGs/Common';
import Checkbox from '../../../../../LibraryComponents/MUICheckbox/MUICheckbox';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../../../../DisplayFramework/State/store';

const RoleAndTenant = (props: IRoleAndTenantProps) => {
  const { tenantsWithRoles, setSelectedRoleCards, selectedRoleCards } = props;
  const allUserRole = useSelector((state: IRootState) => state.dashboard.allUserRoles);
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const [RolesWithTenants, setRolesWithTenants] = useState<ICardData[]>([]);

  useEffect(() => {
    if (tenantsWithRoles.length) {
      const convertObject = convertTenantsWithRolesObject(tenantsWithRoles);
      setRolesWithTenants(convertObject);
    }
  }, [props]);

  const { checkedCards, isAllChecked, onCheckedAllCards, onCheckedAllTenantCards, onCheckedCard } = useCardCheckbox(
    RolesWithTenants,
    setSelectedRoleCards,
    selectedRoleCards
  );

  return (
    <div className={classes.container}>
      <header className={classes.headerSection}>
        <div className={`${classes.primaryText} ${commonClasses.body15Medium}`}>Roles & Tenants</div>
        <div className={classes.menuListStyle} onClick={() => onCheckedAllCards(!isAllChecked)}>
          <span className={`${commonClasses.body15Regular} ${classes.labelText}`}>Select All</span>
          <Checkbox checked={Boolean(isAllChecked)} />
        </div>
      </header>
      <section className={classes.tenantSection}>
        {RolesWithTenants.map((currTenant: ICardData, tenantIndex: number) => {
          const isAllTenantSelected =
            currTenant.roleIds?.length && checkedCards[currTenant.tenantId]?.length === currTenant.roleIds?.length;
          return (
            <div key={tenantIndex} className={classes.tenantBox}>
              <header className={classes.headerSection} data-tenant onClick={() => onCheckedAllTenantCards(currTenant, !isAllTenantSelected)}>
                <div className={`${classes.tenantTitle} ${commonClasses.body15Medium}`}>
                  <span className={classes.dflex}>{<AmuraIcon2 />} </span> {currTenant.tenantId}
                </div>
                <Checkbox
                  className={classes.checkboxStyle}
                  checked={Boolean(isAllTenantSelected)}
                  onClick={() => onCheckedAllTenantCards(currTenant, !isAllTenantSelected)}
                />
              </header>
              <section className={classes.staffBox}>
                {currTenant.roleIds.map((currStaff: string, index: number) => {
                  let roleName = allUserRole.find((value) => value.roleId === currStaff)?.roleName || currStaff;
                  return (
                    <StaffCard
                      key={index}
                      displayName={roleName}
                      profileIcon={<DoctorIcon />}
                      tenantIcon={<AmuraIcon2 />}
                      isSelected={checkedCards[currTenant.tenantId]?.includes(currStaff)}
                      onSelect={() => onCheckedCard(currStaff, currTenant.tenantId)}
                    />
                  );
                })}
              </section>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default memo(RoleAndTenant);
