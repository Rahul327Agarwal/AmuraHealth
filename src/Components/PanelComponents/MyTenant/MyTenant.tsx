import React, { useState, useEffect } from 'react';
import { IProps } from './MyTenant.types';
import { menuObject } from './MenuList';
import MenuItem from './MenuItem/MenuItem';
import { handleClickOnMenu, handleClickOnSubMenu } from './MyTenant.functions';
import { PMS_LOCALE } from '../../../Utils';
import { useStyles } from './MyTenant.styles';
import PanelHeader from '../../LibraryComponents/PanelHeaderForWhite/PanelHeaderForWhite';

export default function MyTenant(props: IProps) {
  const { classes } = useStyles();
  const { selectedTenant, childEventTrigger, key } = props;
  const [menuList, setMenuList] = useState(JSON.parse(JSON.stringify(menuObject)));
  const [rerender, setRerender] = useState(0);
  const toggleMenuList = (menuItem: string) => {
    let tempMenuList = handleClickOnMenu(menuObject, menuItem, childEventTrigger);
    setMenuList(JSON.parse(JSON.stringify(tempMenuList)));
    setRerender(new Date().getTime());
  };
  const toggleSubMenuList = (menuItem: string, subMenuItem: string) => {
    let tempMenuList = handleClickOnSubMenu(menuObject, menuItem, subMenuItem, childEventTrigger);
    setMenuList(JSON.parse(JSON.stringify(tempMenuList)));
    setRerender(new Date().getTime());
  };
  return (
    <div style={{ height: 'inherit' }} key={(key as any) + rerender}>
      <PanelHeader title={selectedTenant.tenant_name} />
      <div className={classes.MyTenantBody}>
        {menuList.map((value: any) => {
          return (
            <div>
              <p className={classes.MyTenantSubHeading1}>{PMS_LOCALE.translate(value.header)}</p>
              {value.hasChildren ? (
                <MenuItem
                  selectedTenant={selectedTenant}
                  childEventTrigger={childEventTrigger}
                  toggleMenuList={toggleMenuList}
                  menuList={value.children}
                  toggleSubMenuList={toggleSubMenuList}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
