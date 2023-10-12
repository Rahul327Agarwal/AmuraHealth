import { makeStyles } from 'tss-react/mui';
import { IProps, MyListProps } from '../MyListHome.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<any>()((theme, props) => ({
  mainContainer: {
    position: 'relative',
    height: 'inherit',
  },
  rootContainer: {
    backgroundColor: theme.palette.colors.gray[50],
    // height: 'calc(100% - 45px)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  tabStyle: {
    padding: '16px 20px !important',
  },

  reSize: { transform: 'scale(1.2)' },
  renderButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '& > span': { display: 'flex', alignItems: 'center' },
  },
  wordWrap: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  wordWrapGroup: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  textSpan1: {
    display: 'contents',
    color: theme.palette.colors.gray[500],
  },
  textSpan2: {
    display: 'contents',
    color: theme.palette.colors.gray[400],
  },
  clientCount: {
    textAlign: 'right',
  },
  nameChardWrapper: {
    // height: 'calc(100% - 160px)',
    height: '100%',
    width: '100%',
    '& > div:first-child': { borderTop: 'none', '&::before': { top: 0 } },
    '& > div:last-child': { borderBottom: 'none', '&::before': { bottom: 0 } },
  },
  headerStyle: {},
  groupLabelWrap: {
    padding: '14px 20px',
    background: '#fff',
  },
  selectBoxWrapper: {
    width: '108px',
    '& .MuiInput-underline:before': {
      content: 'none',
    },
    '& .MuiInputBase-input': {
      fontFamily: 'Graphik !important',
      fontSize: '15px',
      lineHeight: '20px',
      fontWeight: 500,
      fontStyle: 'normal',
      color: '#5C5A61 !important',
    },
  },
  listOverFlow: {
    overflow: 'auto',
    maxHeight: 'calc(100% - 126px)',
  },
  drawer: {
    position: 'absolute',
    top: '0',
    // width: '100%',
    width: 'inherit',
    margin: '5px 0px',
    zIndex: 1050,
    height: `100%`,
    '& .MuiDrawer-paper': {
      width: '100%',
      position: 'initial',
      borderRadius: '8px',
      background: 'transparent !important',
      overflowX: 'hidden',
    },
  },
  searchBox: {
    display: 'flex',
    gap: '10px',
    background: theme.palette.colors.system.white,
    padding: '5px 20px',
    alignItems: 'center',
    height: '48px',
    boxSizing: 'border-box',
    '& .MuiOutlinedInput-adornedStart': {
      height: '40px !important',
    },
  },
  shadow: {
    boxShadow: theme.customShadows.scroll,
    position: 'relative',
    zIndex: 1,
  },
  backButton: {
    padding: 0,
  },
  accordionStyle: {
    color: theme.palette.colors.gray[500],
    background: theme.palette.colors.gray[100],
    display: 'grid',
    gridTemplateColumns: 'auto 16px',
    padding: '8px',
    paddingTop: '10px',
    paddingBottom: '10px',
    textTransform: 'capitalize',
    cursor: 'pointer',
    gap: '8px',
  },
  flexStatusKey: {
    display: 'grid',
    gridTemplateColumns: 'calc(100% - 50px) 50px',
  },
  arrow: {
    cursor: 'pointer',
    transform: 'rotate(0deg)',
    transition: 'all 0.3s ease-in-out',
  },
  rotatedArrow: {
    transform: 'rotate(180deg)',
  },
  refreshIcon: {
    position: 'relative',
  },
  filterNotification: {
    position: 'absolute',
    content: "''",
    top: '-8px',
    right: 0,
    height: '7px',
    width: '7px',
    boxSizing: 'border-box',
    background: theme.palette.colors.red[900],
    borderRadius: '50%',
  },
  refreshNotification: {
    position: 'absolute',
    content: "''",
    top: '-5px',
    right: '12px',
    height: '7px',
    width: '7px',
    boxSizing: 'border-box',
    background: theme.palette.colors.red[900],
    borderRadius: '50%',
  },
  accordian: {
    '& .MuiAccordionSummary-root': {
      background: '#E1E1E1',
    },
    '& .MuiAccordionSummary-expandIcon.Mui-expanded': {
      height: '20px',
      width: '20px',
      padding: '0',
      marginRight: '8px',
    },
    '& .MuiAccordionDetails-root': {
      background: '#E1E1E1',
      color: '#252427',
    },
  },
  accordianTitle: {
    color: '#252427',
  },
  noDataContainer: {
    width: '100%',
    padding: '50px',
    textAlign: 'center',
    color: theme.palette.colors.gray[500],
  },
  animate: {
    '& svg': {
      animation: `$myEffect 1000ms ${theme.transitions.easing.easeInOut}`,
      transform: 'rotate(0deg)',
    },
  },
  '@keyframes myEffect': {
    '0%': {
      transform: 'rotate(30deg)',
    },
    '10%': {
      transform: 'rotate(60deg)',
    },
    '20%': {
      transform: 'rotate(90deg)',
    },
    '30%': {
      transform: 'rotate(120deg)',
    },
    '40%': {
      transform: 'rotate(150deg)',
    },
    '50%': {
      transform: 'rotate(180deg)',
    },
    '60%': {
      transform: 'rotate(210deg)',
    },
    '70%': {
      transform: 'rotate(240deg)',
    },
    '80%': {
      transform: 'rotate(270deg)',
    },
    '90%': {
      transform: 'rotate(300deg)',
    },
    '95%': {
      transform: 'rotate(330deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
}));
