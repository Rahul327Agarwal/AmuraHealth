import { ThemeProvider } from '@mui/material';
import React from 'react';
import CreateCustomTheme from '../../../../Common/Theme';
import PrescriptionPage from './PrescriptionPage';

export default function index() {
  const theme = CreateCustomTheme({});
  return (
    <ThemeProvider theme={theme}>
      <PrescriptionPage />
    </ThemeProvider>
  );
}
