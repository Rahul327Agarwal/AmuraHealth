import { Radio } from '@mui/material';
import { withStyles } from 'tss-react/mui';

export const RadioStyled = withStyles(Radio, (themes) => ({
  root: {
    color: themes.palette.colors.gray[900],
    padding: '0',
    '&.Mui-checked': { color: themes.palette.colors.gray[900] },
    '& .MuiButtonBase-root:hover': { backgroundColor: 'rgb(37 36 39 / 8%)' },
  },
  colorSecondary: {
    '&:hover': { backgroundColor: 'rgb(225 225 225 / 8%) !important' },
  },
}));
