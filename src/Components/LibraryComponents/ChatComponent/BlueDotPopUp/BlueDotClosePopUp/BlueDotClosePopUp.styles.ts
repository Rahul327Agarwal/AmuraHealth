import { makeStyles } from 'tss-react/mui';
export const useStyles = makeStyles()((theme) => ({
  tagPersonsLlist: {
    maxHeight: '300px',
    overflowY: 'auto',
  },
  blueDotItem: {
    marginBottom: '32px',
  },
  marginBottom: {
    marginBottom: '20px',
  },
  blueSpan: {
    color: theme.palette.colors.system.link,
  },
  nameSpan: {
    color: theme.palette.colors.gray[900],
  },
  userNameSpan: {
    color: theme.palette.colors.gray[400],
    wordBreak:'break-word',
  },
  dateSpan: {
    color: theme.palette.colors.gray[400],
  },
  radioGrid: {
    display: 'grid',
    gridTemplateColumns: '18px calc(100% - 42px)',
    gap: '24px',
  },
  footerGrid: {
    display: 'grid',
    gridTemplateColumns: 'calc(100% - 195px) 163px',
  },
  inputStyle: {
    color: theme.palette.colors.theme.primary,
    outline: 'none !important',
    border: 'none !important',
    borderRadius: '4px',
    boxSizing: 'border-box',
    width: 'calc(100% - 50px)',
    maxHeight: '76px',
    overflow: 'auto',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',

    resize: 'none',
    '& mark': {
      color: theme.palette.colors.blue[700],
      background: 'none',
    },
    '& font': {
      color: `${theme.palette.colors.theme.primary} !important`,
    },
  },
  firstContainer: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
  },
  margin4B: {
    marginBottom: '4px',
  },
  blueDiv: {},
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
    minHeight: '88px',
    padding: '20px 0',
    background: theme.palette.colors.system.white,
    boxSizing: 'border-box',
    width: '100%',
    position: 'relative',
    zIndex: 101,
    display: 'flex',
    gridTemplateColumns: '24px calc(100% - 32px - 48px - 24px) 48px',
    gap: '16px',
  },
  middleContainer: {
    boxShadow: '2px 2px 54px rgba(0, 0, 0, 0.05);',
    border: '1px solid ' + theme.palette.colors.gray[50],
    borderRadius: '4px',
    flexGrow: 1,
  },
  textInMessage: {
    color: theme.palette.colors.gray[900],
  },
  padding: {
    padding: '14px 12px',
  },
  reAnswerQuestion: {
    marginBottom: '40px',
  },
  drawerFooter: {
    margin: '-20px',
    marginTop: '0',
  },
  prescriptionFooter: {
    gap: '10px',
    boxShadow: 'none !important',
    justifyContent: 'center !important',
    // backgroundColor: 'inherit',
    display: 'grid',
    gridTemplateColumns: '100px 100px',
    alignItems: 'stretch',
    padding:'20px 20px !important',
    margin:'12px -20px 12px -20px ',
  },
  btnHeight: {
    height: '44px',
  },
  mainHeading: {
    color: theme.palette.colors.gray[900],
    margin: '0px 40px 10px 40px',
    textAlign: 'center',
    wordBreak: 'break-all',
  },
  subHeading: {
    color: theme.palette.colors.gray[500],
    margin: '0px 40px',
    textAlign: 'center',
  },
  radioStyle: {
    color: theme.palette.colors.gray[500],
    padding: '0px',
    '&.Mui-checked': {
      color: theme.palette.colors.gray[900],
    },
    '& .MuiSvgIcon-root': {
      fontSize: 18,
    },
  },
  break: {
    wordBreak: 'break-word',
  },
  disabledSendIcon: {
    background: theme.palette.colors.gray[100],
    height: '48px',
    width: '48px !important',
    minWidth: 'auto !important',
    padding: '0 !important',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none !important',
    cursor: 'not-allowed',
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
}));
