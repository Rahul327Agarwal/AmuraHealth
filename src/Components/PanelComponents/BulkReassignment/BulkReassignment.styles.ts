import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  rootRelativeContainer: {
    backgroundColor: theme.palette.colors.system.white,
    height: 'calc(100% - 50px)',
    // position: 'relative',
    // height: '100vh',
    // margin: '-1rem',
  },
  overlapDrawer: {
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1050,
    '& .MuiDrawer-paper': {
      width: '100%',
      position: 'initial',
      borderRadius: '8px',
      background: 'transparent !important',
    },
  },
  rootContainer: {
    backgroundColor: theme.palette.colors.system.white,
    height: 'inherit',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
  scrollBody: {
    flexGrow: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    backgroundColor: theme.palette.colors.system.white,
  },
  panelButton: {
    width: '100%',
    background: `${theme.palette.colors.gray[50]} !important`,
    borderRadius: '6px',
    fontSize: '15px !important',
    color: theme.palette.colors.gray[900],
    padding: '20px 16px !important',
  },
  btnTextStyle: {
    width: '100% !important',
    textAlign: 'left',
  },
}));
