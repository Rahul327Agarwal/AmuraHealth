import React from 'react';
import { IProps } from './Button.types';

// import { Button as MUIButton } from '@mui/material';
import { PMS_LOCALE } from '../../../../Utils';
import { useStyles } from './Button.styles';
import MUIButton from '../../../LibraryComponents/MUIButton/MUIButton';
import { ThemeProvider } from '@mui/material';

export default function Button(props: IProps) {
  const { label, variant, disabled, handleClick, title } = props;
  const { classes } = useStyles(props);
  return (
    <div className={classes.alignCenter}>
      <MUIButton
        {...props}
        disabled={disabled}
        className={classes.button}
        onClick={(e) => {
          handleClick();
        }}
      >
        {PMS_LOCALE.translate(label)}
      </MUIButton>
    </div>
  );
}
