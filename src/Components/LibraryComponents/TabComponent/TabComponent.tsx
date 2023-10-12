import React, { useState } from 'react';
import { IProp } from './TabComponent.types';
import Tab from './Tab';
import { useStyles } from './TabComponent.styles';
import { EditIcon } from '../../SVGs/Common';

const TabComponent = (props: IProp) => {
  const { tabs, handleClick, handleActiveTab } = props;
  const { classes } = useStyles(props);
  const onClickTabItem = (tab: any) => {
    handleActiveTab?.(tab);
  };

  return (
    <div className={classes.tabWrap}>
      <ul className={classes.tabList}>
        {tabs.map((data) => (
          <Tab isActive={(props?.activeTab || tabs[0]) === data} key={data} title={data} onClick={() => onClickTabItem(data)} />
        ))}
      </ul>
      <span className={classes.editicon} onClick={() => handleClick?.()}>
        {<EditIcon />}
      </span>
    </div>
  );
};

export default TabComponent;
