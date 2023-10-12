import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles<any>()((theme, { panel }) => ({
  mainContainer: {
    background: theme.palette.colors.system.white,
    width: `${panel?.width}px`,
    height: `100%`,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    padding: '0px 0',
    // paddingTop: '12px',
    position: 'relative',
  },
  wrap: {
    padding: '20px',
    paddingBottom: '30px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  modifyWrapper: {
    height: `100%`,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    padding: '20px 0px 20px 20px',
  },

  subContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    // gridTemplateRows: '40px calc(100% - 40px - 95px) 95px',
    overflow: 'hidden',
    // padding: '0 0 0 20px',
  },
  createFilermainContainer: {
    background: theme.palette.colors.system.white,
    width: `${panel?.width}px`,
    height: `100%`,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    position: 'relative',
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
    transform: 'translate(0px,0px)!important',
    overflow: 'hidden',
  },
  swipeOut: {
    transform: 'translate(-355px, 0px)',
    overflow: 'hidden',
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
  scrollBody: {
    flexGrow: 1,
    // display: 'flex',
    // flexDirection: 'column',
    // gap: '31px',
    overflowY: 'auto',
    overflowX: 'hidden',

    padding: '0px 20px 0px 0px',

    width: '100%',
    // paddingRight: '20px',
    // paddingLeft: '20px',
  },
  headerCreateFilter: {
    padding: '20px 20px 0 !important',
  },
  scrollBodyCreateFilter: {
    flexGrow: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '0 20px',
  },
  header: {
    color: '#373639',
    padding: '16px',
    background: '#F1F1F1',
    cursor: 'pointer',
  },
  closeIcons: {
    cursor: 'pointer',
  },
  criteriaWrapper: {
    background: '#F8F8F8',
    padding: '20px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    marginBottom: '25px',
  },
  subTitle: {
    color: '#5C5A61',
  },
  listingWrap: {
    borderTop: '1px solid #F1F1F1',
    borderBottom: '1px solid #F1F1F1',
    padding: '14px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    background: '#fff',
    alignItems: 'center'
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
    cursor: 'pointer',
    wordBreak: 'break-word',
  },
  tabCardsHeader: {
    marginTop: '20px',
  },
  tabCards: {
    marginTop: '20px',
    overflowX: 'auto',
    height: '100%',
  },
  groupName: {
    margin: '20px 0px',
    color: '#252427',
    display: 'block',
  },
  textFooter: {
    color: '#A6A6A6',
    margin: '24px 0 ',
  },
  footerStyle: {
    margin: '0 0px -20px -20px !important',
    zIndex: 1,
  },
  dropdowndiv: {
    // flex: '1',
    width: '60px',
    position: 'relative',
    '& label + .MuiInput-formControl': {
      marginTop: '0px !important',
    },
    '& .MuiInput-underline': {
      '&:before': {
        borderBottom: '0px !important',
      },
      '&:after': {
        borderBottom: '0px !important',
      },
    },
    '& .MuiInputBase-input': {
      // justifyContent: 'end',
      // marginRight: '25px',
    },
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& svg': {
      display: 'block',
      // height: '14px',
      // width: '14px',
    },
  },
  dotIcon: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  dot: {
    height: '4px',
    width: '4px',
    borderRadius: '50%',
  },
  blackDot: {
    background: '#252427',
  },
  blueDot: {
    background: '#007AFF',
  },
  redDot: {
    background: '#FF3B30',
  },
  greyDot: {
    background: '#E1E1E1',
  },
  addText: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    margin: '18px 0px',
    cursor: 'pointer',
    color: '#252427',
  },
  flex: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    width: '100%',
  },
  endIcons: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  w50: {
    width: '50%',

    '& :before': {
      borderBottom: '1px solid rgb(225, 225, 225) !important',
    },
  },
  tabNameWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  emotePopUpWrapper: {
    position: 'absolute',
    width: '100%',
    left: 0,
    zIndex: 1000,

    '& em-emoji-picker': {
      '--rgb-background': '255, 255, 255',
      '--rgb-color': '92, 90, 97',
      '--rgb-accent': '92, 90, 97',
      width: '100%',
    },
  },

  iconWrapper: {},
  active: {
    '& svg': {
      '& path': {
        fill: '#252427',
      },
    },
  },
  inactive: {
    '& svg': {
      '& path': {
        fill: '#A6A6A6',
      },
    },
  },
}));
