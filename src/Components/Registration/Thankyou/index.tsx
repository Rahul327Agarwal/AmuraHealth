import { ThemeProvider } from '@mui/material';
import React from 'react';
import Login from './Login';
import { IProps } from '../Registration.types';
import CreateCustomTheme from '../../../Common/Theme';

export default function index(props: IProps) {
  const theme = CreateCustomTheme({});
  return (
    <ThemeProvider theme={theme}>
      <Login {...props} />
    </ThemeProvider>
  );
}
