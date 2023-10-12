// import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PMS_LOCALE } from '../../../../Utils';
import React from 'react';
import SubMenuItem from '../SubMenuItem/SubMenuItem';
import { useStyles } from './MenuItem.styles';
import { IProps } from './MenuItem.types';

export default function MenuItem(props: IProps) {
  const { menuList, childEventTrigger, selectedTenant, toggleMenuList, toggleSubMenuList } = props;
  const { classes } = useStyles();
  return (
    <div>
      <div>
        {menuList.map((value: any) => {
          return (
            <div>
              <p
                className={`${value.isActive ? classes.MyTenantSubHeading2Active : classes.MyTenantSubHeading2}`}
                onClick={() => {
                  toggleMenuList(value.header);
                }}
              >
                {value.hasChildren ? (
                  <span className={`${classes.menuItemIcon} ${classes.margin4}`}>
                    {/* TODO: <FontAwesomeIcon
                      className={
                        classes.caretRight +
                        " " +
                        `${
                          value.isActive
                            ? classes.transform90
                            : classes.transform0
                        }`
                      }
                      icon={faCaretRight}
                    /> */}
                  </span>
                ) : (
                  <span className={classes.margin4}>
                    {/* TODO: <FontAwesomeIcon
                      className={
                        classes.caretRight +
                        " " +
                        classes.hidden +
                        " " +
                        `${
                          value.isActive
                            ? classes.transform90
                            : classes.transform0
                        }`
                      }
                      icon={faCaretRight}
                    /> */}
                  </span>
                )}
                {PMS_LOCALE.translate(value.header)}
              </p>
              {value.hasChildren ? (
                <div className={classes.subMenu + ' ' + `${value.isActive ? classes.maxHeightNone : classes.maxHeight0}`}>
                  <SubMenuItem
                    selectedTenant={selectedTenant}
                    childEventTrigger={childEventTrigger}
                    toggleSubMenuList={toggleSubMenuList}
                    menuList={value.children}
                    menuHeader={value.header}
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
