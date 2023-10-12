import { makeStyles } from 'tss-react/mui';
import { IProps } from './PhoneInputField.types';

export const useStyles = makeStyles<IProps>()((theme, props) => ({
  label: {
    //fontfamily: "Inter",
    fontStyle: 'normal',
    fontHeight: 'normal',
    fontSize: '1rem',
    lineHeight: '1',
    color: `${theme.palette.colors.gray[400]} !important`,
    marginBottom: '4px',
  },
  InputField: {
    width: 'calc(100% - 2px)',
    borderBottom: `1px solid ${props.focusBorder ? 'transparent' : '#AEAEAE'}`,
    background: 'transparent',

    '& .MuiPhoneNumber-flagButton': {
      minWidth: '30px !important',
      '&:hover': {
        background: 'transparent',
      },
    },
    '& .MuiTouchRipple-root': {
      // display: "none !important",
    },
    '&:hover': {
      background: props.focusBorder ? 'transparent' : '#4B4E50',
    },
    '&:focus-within': {
      background: 'transparent !important',
    },
    '& .MuiTypography-root': {
      paddingRight: '0',
    },
    '& .MuiInputBase-root': {
      padding: '8px !important',
      background: 'transparent !important',
      borderBottom: `1px solid ${props.focusBorder ? props.focusBorder : 'transparent'}`,
      '& *': {
        border: 0,
      },
    },
    '& .MuiInputBase-input': {
      marginTop: '4px',
      // padding: '8px !important',
      background: 'transparent !important',
      color: props.fontColor ? props.fontColor + ' !important' : '#FFFFFF',
      //fontfamily: "Inter !important",
    },
    '& .MuiInput-underline': {
      '&:after': {
        borderBottom: 'initial',
      },
      '&:before': {
        borderBottom: '0px !important',
      },
    },
  },

  PopperRoot: {
    '& .MuiPaper-elevation8': {
      boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.14) !important',
    },
    '& .MuiPopover-paper': {
      backgroundColor: `${theme.palette.colors.system.white} !important`,
    },
    '& .MuiList-root': {
      backgroundColor: `${theme.palette.colors.system.white} !important`,
    },
    '& .MuiMenu-list': {
      maxHeight: '250px',
    },
    '& .MuiTypography-root': {
      color: `${theme.palette.colors.gray[500]} !important`,
      fontFamily: 'Graphik !important',
    },
    '& .Mui-selected': {
      background: `${theme.palette.colors.gray[50]} !important`,
      '& .MuiTypography-root': {
        color: `${theme.palette.colors.gray[500]} !important`,
        fontFamily: 'Graphik !important',
        fontWeight: '600 !important',
      },
    },
    '& .MuiListItem-button': {
      color: `${theme.palette.colors.gray[500]} !important`,
      backgroundColor: `${theme.palette.colors.system.white} !important`,
      fontSize: '15px !important',
      fontFamily: 'Graphik',
      padding: '13px 16px !important',
      borderBottom: '1px solid #E1E1E1 !important',
    },
    '& .MuiListItem-button:hover': {
      backgroundColor: `${theme.palette.colors.gray[25]} !important`,
    },
  },
  inputDisabled: {
    background: 'transparent !important',
  },
  inputError: {
    '& .MuiInputBase-root': {
      padding: '8px !important',
      background: 'transparent !important',
      borderBottom: '1px solid #F94959 !important',
    },
  },
  disabled: {
    opacity: 0.5,
  },
  errorText: {
    color: '#F94959',
    //fontfamily: "Inter",
    fontStyle: 'normal',
    fontHeight: 'normal',
    fontSize: '12px',
    lineHeight: '18px',
  },
  passwordEye: {
    width: '18px',
    height: '18px',
    color: '#AEAEAE',
    cursor: 'pointer',
  },
}));
