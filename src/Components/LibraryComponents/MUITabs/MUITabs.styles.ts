import { Tab, Tabs } from '@mui/material';
import { makeStyles, withStyles } from 'tss-react/mui';
import { IProps } from './MUITabs.types';

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, props) => ({
  rootTabsContainer: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 ${props.paddingX || '0'} `,
  },
}));

export const TabsStyled = withStyles(Tabs, (theme) => ({
  root: {
    width: '100%',
    // the following code removes the arrows
    '& .MuiTabs-scrollButtons': {
      display: 'none',
    },
  },
  indicator: {
    backgroundColor: `${theme.palette.colors.theme.primary} !important`,
    height: '4px',
    borderRadius: '8px',
  },
  flexContainer: {
    gap: '16px',
  },
}));

export const TabStyled = withStyles(Tab, (theme) => ({
  root: {
    textTransform: 'initial',
    fontSize: '15px !important',
    fontStyle: 'normal !important',
    fontFamily: 'Graphik !important',
    fontWeight: 600,
    lineHeight: '20px !important',
    color: theme.palette.colors.gray[400],
    position: 'relative',
    flexGrow: 1,
    maxWidth: 'unset !important',
    minWidth: 'unset !important',

    '&::after': {
      content: "''",
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.palette.colors.gray[400],
      height: '4px',
      borderRadius: '8px',
    },
  },
  selected: {
    color: `${theme.palette.colors.theme.primary} !important`,
  },
}));
