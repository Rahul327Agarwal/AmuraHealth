import { makeStyles } from 'tss-react/mui';
import { IStyledProps } from './ReferPopUp.types';

export const useStyles = makeStyles<IStyledProps>()((theme, { isMobileError }) => ({
  drawerWrapper: {
    // ? the follwing resets predefined styles for drawer
    '& > div': {
      // paddingTop: '33px !important',
      overflow: 'hidden',
      display: 'flex',
    },
  },
  drawerContentWrapper: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  fieldsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    // the input fields themselv have a margin top of 24px; addtional 27px to match figma
    gap: '27px',
    overflow: 'auto',
  },
  phoneWrapper: {
    display: 'flex',
    alignItems: 'end',
    gap: '20px',
  },
  mobile: {
    flexGrow: 1,

    '& .MuiInputBase-root': {
      borderBottom: '2px solid #292F3F !important',
      paddingLeft: '0 !important',
      paddingBottom: '0 !important',
    },

    '& .MuiFormControl-root-MuiTextField-root-InputField-inputError .MuiInputBase-input': {
      borderBottom: '2px solid #292F3F !important',
    },
  },
  whatsappContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: isMobileError ? '20px' : 0,
  },
  checkbox: {
    cursor: 'pointer',
  },

  messageInputContainer: {
    marginTop: '44px',

    background: theme.palette.colors.system.white,
    boxSizing: 'border-box',
    width: '100%',
    position: 'relative',
    zIndex: 101,
    display: 'flex',
    gap: '16px',
    alignItems: 'end',
  },

  refer: {
    color: theme.palette.colors.system.link,
  },
  disabledSendIcon: {
    height: '48px',
    width: '48px !important',
    minWidth: 'auto !important',
    padding: '0 !important',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    cursor: 'not-allowed !important',
    borderRadius: '4px',
    ' &:hover': { background: `${theme.palette.colors.gray[100]} !important` },
    '& svg': {
      height: '24px',
      width: '24px',
      '& path': {
        fill: '#A6A6A6',
      },
    },
  },
  sendButton: {
    height: '48px',
    width: '48px !important',
    minWidth: 'auto !important',
    padding: '0 !important',
  },
  textInMessage: {
    color: theme.palette.colors.gray[900],
  },
  iputTextContainer: {
    color: theme.palette.colors.gray[900],
    width: '100%',
    border: 'none',
    outline: 'none',
    wordBreak: 'break-word',
    maxHeight: '104px',
    overflow: 'auto',
    userSelect: 'none',
  },
  middleContainer: {
    boxShadow: '2px 2px 54px rgba(0, 0, 0, 0.05);',
    border: '1px solid ' + theme.palette.colors.gray[50],
    borderRadius: '4px',
    width: '100%',
    padding: '14px 12px',
  },
}));
