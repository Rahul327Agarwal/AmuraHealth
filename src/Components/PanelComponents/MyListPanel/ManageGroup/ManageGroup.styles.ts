import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles<any>()((theme, { panel }) => ({
  mainContainer: {
    background: theme.palette.colors.system.white,
    width: `${panel?.width}px`,
    height: `100%`,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    padding: '0 20px',
    paddingTop: '12px',
    position: 'relative',
  },
  groupList:{
    height:'100%'
  },
  rootContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    height: '100%',
    width: 'inherit',
    transform: 'translate(-355px, 0px)',
    transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
  },
  wrapper: {
    height: 'calc(100% - 20px)',
    display: 'flex',
    flexDirection: 'column',
  },
  swipeIn: {
    transform: 'translate(0px,0px) !important',
  },
  swipeOut: {
    transform: 'translate(-355px, 0px)',
  },
  backdropOpacityIn: {
    opacity: 0.8,
  },
  backdropOpacityOut: {
    opacity: 0,
  },

  backdrop: {
    opacity: 0,
    transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    background: theme.palette.colors.gray[900],
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -2,
  },
  sortingicons: {
    display: 'flex',
    gap: '28px',
  },
  scrollBody: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    // gap: '31px',
    overflowY: 'auto',
    overflowX: 'hidden',
    margin: '0 -20px',
    padding: '0 20px',
    width: '100%',
  },
  groupModificationFieldWrapper: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    // gap: '31px',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '100%',
  },
  header: {
    color: '#373639',
    padding: '20px 16px',
    background: '#F1F1F1',
    cursor: 'pointer',
  },
  bgDark: {
    opacity: 1,
  },
  bgLight: {
    opacity: '0.5',
  },
  headerIcon: {
    fontSize: '10px',
    color: ' #5C5A61',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '16px',
    width: '16px',
    borderRadius: '50%',
    border: '1px solid #E1E1E1',
  },
  GroupCards: {
    marginTop: '20px',
    overflowX: 'auto',
    height: '100%',
  },
  listingWrap: {
    borderTop: '1px solid #F1F1F1',
    borderBottom: '1px solid #F1F1F1',
    padding: '14px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#fff',
  },
  listWrap:{
    height:'calc(100% - 0px)'
  },
  tabBarWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  tabText: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.colors.theme.primary,
    wordBreak: 'break-all',
  },
  tabCards: {
    marginTop: '20px',
    cursor: 'cursor',
    height: '100%',
  },
  groupName: {
    margin: '20px 0px',
    color: '#252427',
  },
  textFooter: {
    color: '#A6A6A6',
    margin: '24px 0 ',
    wordBreak: 'break-word',
  },
  footerStyle: {
    margin: '-20px',
  },
  iconWrapper: {},
  active: {
    '& svg': {
      '& path': {
        fill: '#A6A6A6',
      },
    },
  },
  inactive: {
    '& svg': {
      '& path': {
        fill: '#252427',
      },
    },
  },
  textLight: {
    color: '#6c757d',
  },
}));
