import { PMS_LOCALE } from '../../../../Utils';
import React, { useState, useEffect } from 'react';
import { useStyles } from './SubMenuItem.styles';
import { IProps } from './SubMenuItem.types';

export default function SubMenuItem(props: IProps) {
  const { menuList, toggleSubMenuList, menuHeader } = props;
  const { classes } = useStyles();
  return (
    <div>
      <div style={{ margin: '0px 34px' }}>
        {menuList.map((value: any) => {
          return (
            <div>
              <p
                className={`${value.isActive ? classes.MyTenantSubHeading2Active : classes.MyTenantSubHeading2}`}
                onClick={() => {
                  if (value.enableClick) {
                    toggleSubMenuList(menuHeader, value.header);
                  }
                }}
              >
                {PMS_LOCALE.translate(value.header)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
