import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  rootRelativeContainer: {
    backgroundColor: theme.palette.colors.system.white,
    height: '100%',
    position: 'relative',
  },
  sliderdiv: {
    padding: '0 20px',
  },
  dflex: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '& .MuiButtonBase-root': {
      width: '24px',
      height: '24px',
      padding: '0px !important',
    },
  },
  SilderStyle: {
    marginTop: '25px',
    marginBottom: '16px',
    color: 'transparent !important',
    '& .MuiSlider-rail': {
      height: '12px',
    },
    '& .MuiSlider-track': {
      height: '12px',
      background: '#F1F1F1',
    },
    '& .MuiSlider-thumb': {
      backgroundColor: `${theme.palette.colors.gray[50]} !important`,
      '& .airbnb-bar': {
        height: 9,
        width: 1,
        backgroundColor: `${theme.palette.colors.gray[200]} !important`,
        marginLeft: 1,
        marginRight: 1,
        zIndex: 1,
      },
      '&::after': {
        display: 'none !important',
      },
      '&::before': {
        display: 'none !important',
      },
    },
  },
  overlapDrawer: {
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1650,
    '& .MuiDrawer-paper': {
      width: '100%',
      position: 'initial',
      borderRadius: '8px',
      background: 'transparent !important',
    },
  },
  eventDetailsView: {
    height: 'calc(100% - 0px)',
    '& .MuiDrawer-paper': {
      overflowY: 'unset',
    },
  },

  rootContainer: {
    backgroundColor: theme.palette.colors.system.white,
    // height: "inherit",
    height: 'calc(100%)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  headerStyle: {
    padding: '5px 20px !important',
  },
  headerIconWrapper: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    marginLeft: '12px',
  },
  searchbox: {
    height: '40px !important',
    background: ' #F8F8F8',
    borderRadius: '6px',
  },
  filterIcon: {
    height: '40px !important',
    width: '40px !important',
    display: 'flex',
    background: `${theme.palette.colors.gray[25]} !important`,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    position: 'relative',
  },
  searchIcon: {
    height: '40px',
    width: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    position: 'relative',
  },
  calendarSection: {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px 20px',
    gap: '4px',
    background: theme.palette.colors.gray[25],
    transition: 'all 0.4s ease-in-out',
  },
  calendarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px',
    overflowX: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  navButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  calendarNavbutton: {
    padding: '0',
  },
  calendarbutton: {
    padding: '5px',
    fontWeight: 600,
    '& .MuiButton-label': {
      color: theme.palette.colors.gray[500],
    },
    '& .MuiButton-endIcon': {
      transition: 'rotate 250ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
    '&[data-rotate="true"] .MuiButton-endIcon': {
      rotate: '180deg',
    },
  },
  calendarStyle: {
    marginBottom: '0 !important',
  },
  scrollBody: {
    flexGrow: 1,
    display: 'grid',
    overflowY: 'auto',
    overflowX: 'hidden',
    transition: 'all 0.4s ease-in-out 0s',
    gridTemplateRows: 'auto 1fr',
  },
  secondryText: {
    color: theme.palette.colors.gray[500],
  },
  gray400: {
    color: theme.palette.colors.gray[400],
  },
  backButton: {
    padding: 0,
    marginRight: '30px',
  },
  iocnStyle: {
    cursor: 'pointer',
    '&.marginLeft': {
      marginLeft: '12px',
    },
  },
  searchFilterCon: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    padding: '20px 20px 0 20px',
  },
  header: {
    position: 'relative',
  },
  leftArrow: {
    width: '150px',
  },
  popup: {
    position: 'absolute',
    zIndex: 99999,
    width: '90%',
    top: '70px',
    left: '15px',
    boxShadow: '0px 4px 13px rgba(0, 0, 0, 0.25)',
    background: '#FFFFFF',
  },
  calendarTypebutton: {
    border: `1px solid ${theme.palette.colors.theme.primary} !important`,
    borderRadius: '20px  !important',
    padding: '8px 12px  !important',
    '& .MuiButton-label': {
      color: theme.palette.colors.gray[500],
    },
  },
  todayIcon: {
    cursor: 'pointer',
  },
  span: {
    padding: '10px',
    display: 'inline-block',
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px',
    padding: '0 20px',
  },
  results: {
    color: '#A6A6A6',
  },
  clear: {
    padding: '0',
  },
  groupedEventWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '34px',
  },
}));
