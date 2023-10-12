import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../DisplayFramework/State/store';
import { AmuraLogo } from '../../SVGs/Common';
import { useStyles } from './MyListHeader.styles';
import { IProps } from './MyListHeader.types';

export default function MyListHeader(props: IProps) {
  const {
    setShowGroups,
    showGroups,
    actionOption,
    injectComponent,
    startAdornment,
    endAdornment,
    className,
    hideAmuraIcon,
    activeGroup,
    myListGroups: myGroups,
  } = props;
  const { classes } = useStyles(props);

  return (
    <div className={`${classes.headerContainer} ${className}`}>
      <div className={classes.amuraLogo}> {!hideAmuraIcon && (injectComponent || AmuraLogo)}</div>
      {/* {!hideAmuraIcon && <div className={classes.amuraLogo}> {injectComponent || AmuraLogo}</div>} */}
      {startAdornment || null}
      {showGroups ? (
        <div className={classes.flex}>
          {myGroups !== undefined &&
            myGroups.map((data, index) => {
              return (
                <div>
                  {' '}
                  <span
                    className={activeGroup?.groupId === data.groupId ? classes.activeCircle : classes.groupCircle}
                    onClick={() => {
                      setShowGroups((pre) => {
                        if (pre && pre.groupId === data.groupId) {
                          return null;
                        }
                        return data;
                      });
                    }}
                  >
                    {data.shortName}
                  </span>
                </div>
              );
            })}
        </div>
      ) : (
        actionOption?.map((item, i) => (
          <div key={i} className={classes.actionButton} onClick={item?.onClick}>
            {item?.icon}
          </div>
        ))
      )}
      {endAdornment || null}
    </div>
  );
}
