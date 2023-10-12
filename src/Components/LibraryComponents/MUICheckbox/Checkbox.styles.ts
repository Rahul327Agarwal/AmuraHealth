import { Checkbox } from '@mui/material';
import { withStyles } from 'tss-react/mui';

export const CheckboxStyled = withStyles(Checkbox, (themes) => ({
  colorSecondary: {
    '&:hover': { backgroundColor: 'rgb(225 225 225 / 8%) !important' },
  },

  root: {
    color: `${themes.palette.colors.gray[500]} !important`,
    padding: '0',

    '&::before': {
      content: '""',
      left: 1,
      top: 1,
      bottom: 1,
      right: 1,
      position: 'absolute',
      borderRadius: '4px',
      zIndex: -1,
      backgroundColor: themes.palette.colors.gray[100],
    },

    '& .MuiIconButton-label': {
      position: 'relative',
      zIndex: 0,
      transition: '.3s ease',
      maxWidth: '25px',
      maxHeight: '25px',
      // '&::before': {
      //   content: '""',
      //   left: 1,
      //   top: 1,
      //   bottom: 1,
      //   right: 1,
      //   position: 'absolute',
      //   borderRadius: '4px',
      //   zIndex: -1,
      //   backgroundColor: 'red',
      //   // backgroundColor: themes.palette.colors.gray[100],
      // },
      '&::after': {
        content: '""',
        left: 4,
        top: 4,
        bottom: 4,
        right: 4,
        position: 'absolute',
        zIndex: -1,
      },
      '& .MuiSvgIcon-root': {
        width: '25px !important',
        height: '25px !important',
      },
    },
    '&$checked': {
      color: `${themes.palette.colors.gray[100]} !important`,
      '& .MuiIconButton-label::after': {
        backgroundColor: themes.palette.colors.gray[900],
        transition: '.3s ease',
      },
    },
  },
  checked: {},
}));
