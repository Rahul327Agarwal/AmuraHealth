import { makeStyles } from 'tss-react/mui';
import { STYLES } from './DiagnosticCondition.utils';

export const useStyles = makeStyles<any>()((theme, props) => ({
  rootRelativeContainer: {
    backgroundColor: theme.palette.colors.system.white,
    height: 'inherit',
    position: 'relative',
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
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    padding: '20px',
    height: 'inherit',
    position: 'relative',
    // height: '95vh', // DEV ONLY
    // margin: '-1rem', // DEV ONLY
    overflow: 'hidden',
  },
  scrollBody: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    overflowY: 'auto',
    overflowX: 'hidden',
    margin: `0 -${STYLES.scrollXPadding}px`,
    padding: `0 ${STYLES.scrollXPadding}px 36px ${STYLES.scrollXPadding}px`,
  },
  footerStyle: {
    margin: 'auto -20px -20px',
    height: '100px',
  },
  backButton: {
    marginRight: '14px',
    '& path': {
      fill: theme.palette.colors.theme.primary,
    },
  },
  diagnosticContainer: {
    padding: '20px',
    background: '#fff',
    overflow: 'hidden',
    height: 'inherit',
  },
  filterButtonWrapper: {
    gap: '10px',
    display: 'flex',
    flexWrap: 'nowrap',
    paddingLeft: '20px',
    '& .swiper': {
      width: '100%',
      paddingLeft: '20px',
    },
    '& .swiper-wrapper': {
      gap: '10px',
    },
    '& .swiper-slide': {
      width: 'fit-content !important',
      marginRight: 0,
    },
  },
  filterButton: {
    padding: ' 0 !important',
    // minWidth: '100px',
  },
  buttonLabelStyle: {
    position: 'relative',
    padding: '8px 12px !important',
    display: 'grid',
    placeItems: 'center',
  },
  labelStyle: {
    opacity: 0,
    "&[data-selected='true']": {
      opacity: 1,
    },
  },
  shortKeyStyle: {
    position: 'absolute',
    "&[data-selected='true']": {
      opacity: 0,
    },
  },
  marginBottom: {
    marginBottom: '20px',
  },
  addButtonWrapper: {
    position: 'absolute',
    right: '20px',
    bottom: '56px',
    transform: 'translateY(50%)',
    zIndex: 1000,
  },
  actionButton: {
    background: `${theme.palette.colors.gray[900]} !important`,
    transition: '.3s ease',
    '& svg': {
      width: '18px',
      height: '18px',
    },
    '& path': { fill: `${theme.palette.colors.system.white} !important` },
    '&[data-rotact="true"]': { rotate: '45deg' },
  },
  disableActionButton: {
    cursor: 'unset !important',
    background: `${theme.palette.colors.gray[400]} !important`,
    transition: '.3s ease',
    '& path': { fill: `${theme.palette.colors.system.white} !important` },
  },
  menuStyle: {
    '& .MuiTooltip-tooltip': {
      translate: '-10px -25px !important',
      borderRadius: '8px !important',
    },
  },
  drawerBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  drawerFooterStyle: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
  },
  biomarkerCardWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  noSearch: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  wrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '10px',
    '& svg': { '& path': { fill: '#A6A6A6' } },
  },
  span: {
    display: 'block',
    color: '#5C5A61',
  },
  noHistoryColor: {
    color: '#5C5A61',
  },
  nothingToShow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60%',
    flexDirection: 'column',
    gap: '20px',
  },
}));
