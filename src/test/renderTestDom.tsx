import { render } from '@testing-library/react';

import { ThemeProvider } from '@mui/material/styles';
import CreateCustomTheme from '../Common/Theme';

const theme = CreateCustomTheme({});
const renderTestDom = (children): any => {
  const renderObject = render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
  return renderObject;
};
export default renderTestDom;
