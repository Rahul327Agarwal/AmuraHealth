import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  tagPersonsLlist: {
    maxHeight: '144px',
    overflowY: 'auto',
  },
  marginBottom: {
    marginBottom: '20px',
  },
  mb: {
    marginBottom: '50px',
    '& .MuiInputBase-root': {
      alignItems: 'center',
    },
  },
  dateTimeGrid: {
    display: 'grid',
    gridTemplateColumns: '60% calc(40% - 16px)',
    gap: '16px',
  },
  errorText: {
    color: '#f44336',
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
    padding: '20px 0px',
    background: theme.palette.colors.system.white,
    boxSizing: 'border-box',
    width: '100%',
    position: 'relative',
    zIndex: 101,
    display: 'grid',
    gridTemplateColumns: 'calc(100% - 16px - 48px) 48px',
    gap: '16px',
  },
  middleContainer: {
    boxShadow: '2px 2px 54px rgba(0, 0, 0, 0.05);',
    border: '1px solid ' + theme.palette.colors.gray[50],
    borderRadius: '4px',
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
  mainHeading: {
    color: theme.palette.colors.gray[900],
    margin: '0px 40px 10px 40px',
    textAlign: 'center',
  },
  subHeading: {
    color: theme.palette.colors.gray[500],
    margin: '0px 40px',
    textAlign: 'center',
  },
}));
