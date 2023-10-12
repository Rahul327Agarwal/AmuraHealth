import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme, props) => ({
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    overflowY: 'auto',
    position: 'relative',
  },
  chatScrollContainer: {
    height: '100%',
    width: '100%',
    position: 'relative',
    overflowY: 'auto',
    scrollbarGutter: 'stable',
    "& [data-search-focus='true']": {
      backgroundColor: '#F5F5F5',
    },
    "& [data-highlighted='true']": {
      backgroundColor: 'yellow',
    },
    // display:'flex',
    paddingTop: '120px',
  },
  gotoBottomBox: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1000,
    width: 44,
    height: 44,
    display: 'none !important',
    '&[data-show="true"]': {
      display: 'inline-flex !important',
    },
  },
  gotoBottomButton: {
    position: 'relative',
    width: 44,
    height: 44,
    borderRadius: '50%',
    backgroundColor: `${theme.palette.colors.gray[100]} !important`,
    opacity: 1,
  },
  unseenMsgCount: {
    position: 'absolute',
    top: -5,
    right: 0,
    background: theme.palette.colors.gray[900],
    color: theme.palette.colors.system.white,
    borderRadius: '50%',
    height: '20px',
    width: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '12px',
  },
  gotoBottomIcon: {},
}));
