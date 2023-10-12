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
  inputBodyWrapper: {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px 0px 12px 0px',
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
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    alignItems: 'start',
    marginBottom: '28px',
  },
  loaderContainer: {
    display: 'flex',
    flexDirection: 'column',
    // height: '150px',
    gap: '12px',
  },
}));
