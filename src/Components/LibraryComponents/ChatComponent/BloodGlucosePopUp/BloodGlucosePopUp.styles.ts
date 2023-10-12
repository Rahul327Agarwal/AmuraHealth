import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  drawerWrapper: {
    // ? the follwing resets predefined styles for drawer
    '& > div': {
      paddingTop: '32px !important',
      overflow: 'hidden',
      // display: 'flex',
    },
  },

  inputHistoryWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
    paddingBottom: '32px',
  },

  radioGroup: {
    display: 'flex',
    gap: '16px',
    marginTop: '12px',

    '& .MuiFormControlLabel-root': {
      marginRight: 0,
      marginLeft: 0,
    },

    '& .MuiRadio-root': {
      padding: 0,
      marginRight: '8px',
    },
    '& .MuiTypography-root': {
      marginLeft: '0 !important',
    },
  },

  historySection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  historyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },

  historyTitle: {
    color: theme.palette.colors.gray[400],
  },
  singleHistory: {
    display: 'flex',
    // gridTemplateColumns: '50px 57px 1fr',
    background: theme.palette.colors.gray[25],
    padding: '9px 12px',
    borderRadius: '8px',
    color: theme.palette.colors.gray[400],
  },
  previousWeight: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    marginRight: '23px',
    width: '50px',
  },
  current: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: '8px',
    width: '57px',
  },
  currentWeight: {
    color: theme.palette.colors.theme.primary,
  },

  firstContainer: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
  },
  lastContainer: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  },
  sendButton: {
    height: '48px',
    width: '48px !important',
    minWidth: 'auto !important',
    padding: '0 !important',
  },
  messageInputContainer: {
    marginTop: 'auto',
    minHeight: '48px',
    background: theme.palette.colors.system.white,
    boxSizing: 'border-box',
    width: '100%',
    position: 'relative',
    zIndex: 101,
    display: 'grid',
    gridTemplateColumns: '1fr 48px',
    gap: '16px',
  },
  middleContainer: {
    boxShadow: '2px 2px 54px rgba(0, 0, 0, 0.05);',
    border: '1px solid ' + theme.palette.colors.gray[50],
    borderRadius: '4px',
  },
  textInMessage: {
    color: theme.palette.colors.gray[400],
  },
  padding: {
    padding: '14px 12px',
  },
  prescriptionFooter: {
    gap: '10px',
    boxShadow: 'none',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    display: 'grid',
    gridTemplateColumns: '100px 100px',
    alignItems: 'stretch',
  },
  btnHeight: {
    height: '44px',
  },
  inputsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '19px',
    // display: 'grid',
    // gridTemplateColumns: '1fr 30%',
    // gap: '10px',
    // alignItems: 'start',
    // marginBottom: '20px',
    // '& .MuiInputBase-input, & .MuiInputBase-input': {
    //   fontSize: '17px !important',
    // },
  },
  loaderContainer: {
    display: 'flex',
    flexDirection: 'column',
    // height: '150px',
    gap: '12px',
  },
}));
