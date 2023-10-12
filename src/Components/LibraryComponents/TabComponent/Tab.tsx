import React from 'react';
import { IProps } from './TabComponent.types';
import { useStyles } from './TabComponent.styles';

const TabComponent = (props: IProps) => {
  const { title, isActive, onClick, isError } = props;
  const { classes } = useStyles(props);

  return (
    <li className={`${classes.tabListItem} ${isActive ? 'active' : ''} ${isError ? 'error' : ''}`} onClick={onClick}>
      {title}
    </li>
  );
};

export default TabComponent;
