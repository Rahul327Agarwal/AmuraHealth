import React from 'react';
import { IProps } from './Link.types';
import { Link as MUILink } from '@mui/material';
import { useStyles } from './Link.styles';

export default function Link(props: IProps) {
  const { handleClick, disabled, label, className } = props;
  const { classes } = useStyles(props);
  return (
    <MUILink
      href="#"
      className={`${classes.link} ${className}`}
      onClick={(e) => {
        e.preventDefault();
        if (!disabled) handleClick(e);
      }}
    >
      {label}
    </MUILink>
  );
}
