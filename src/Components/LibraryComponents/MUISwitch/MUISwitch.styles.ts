import { Switch } from '@mui/material';
import { withStyles } from 'tss-react/mui';

export const SwitchStyled = withStyles(Switch, (theme) => ({
  root: {
    height: '32px',
    boxSizing: 'border-box',
    width: '52px',
    padding: '0',
    borderRadius: '16px',
    border: `2px solid ${theme.palette.colors.gray[100]}`,
  },
  switchBase: {
    width: '28px',
    height: '28px',
    padding: '0',
    color: `${theme.palette.colors.gray[400]} !important`,
  },
  thumb: {
    width: '28px',
    height: '28px',
  },
  track: {
    borderRadius: 'inherit',
    backgroundColor: `${theme.palette.colors.gray[25]} !important`,
    opacity: 1,
  },
  checked: {
    color: `${theme.palette.colors.theme.primary} !important`,
    '&:hover': {
      backgroundColor: 'rgb(37 36 39 / 10%) !important',
    },
  },
}));
