import { makeStyles } from 'tss-react/mui';
import { IProps } from '../MyListHome.types';

export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    position: 'relative',
    height: 'inherit',
  },
  rootContainer: {
    backgroundColor: theme.palette.colors.gray[50],
    height: '100%',
    boxSizing: 'border-box',
    position: 'relative',
  },
  noDataContainer: {
    width: '100%',
    padding: '50px',
    textAlign: 'center',
    color: theme.palette.colors.gray[500],
  },
  myListHeader: {
    background: '#E9E8E8',
    padding: ' 8px 20px',
    borderRadius: ' 8px 8px 0px 0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIcon: {
    cursor: 'pointer',
  },
  bgColor: {
    backgroundColor: theme.palette.colors.gray[50],
  },
  headerText: {
    display: 'flex',
    alignItems: 'center',
    gap: '11px',
  },
  subHeader: {
    padding: '8px 20px',
    background: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `2px solid ${theme.palette.colors.gray[100]}`,
    height: '48px',
  },
  footerDiv: {
    // position: "relative",
    zIndex: 1,
    // height: "56px",
    // background: "#1B1B1B",
    // marginTop: "auto",
  },
  addButtonWrapper: {
    position: 'absolute',
    right: '20px',
    bottom: '40px',
    transform: 'translateY(50%)',
    borderRadius: '50%',
    // padding: "10px",
    // background: "#3F4044",
  },
  addButton: {
    background: '#252427',
    display: 'grid',
    placeItems: 'center',
    height: '58px',
    width: '58px',
    borderRadius: '50%',
    border: 'none',
    boxShadow: '0px 1px 7px -1px #212529',
    cursor: 'pointer',
    '& path': {
      fill: '#FFFFFF !important',
    },
  },
  addButtonDisabled: {
    display: 'grid',
    placeItems: 'center',
    height: '58px',
    width: '58px',
    borderRadius: '50%',
    background: '#A6A6A6',
    border: 'none',
    boxShadow: '0px 1px 7px -1px #212529',
    cursor: 'pointer',
    '& path': {
      fill: '#FFFFFF !important',
    },
  },
  reSize: { transform: 'scale(1.2)' },
  renderButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '& > span': { display: 'flex', alignItems: 'center' },
  },
  nameChardWrapper: {
    '& > div:first-child': { borderTop: 'none', '&::before': { top: 0 } },
    '& > div:last-child': { borderBottom: 'none', '&::before': { bottom: 0 } },
    height: 'calc(100% - 50px) !important',
  },
  headerStyle: {
    marginBottom: '16px',
  },
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
    width: '100%',
    margin: '5px 0px',
    zIndex: 1050,
    height: '100%',
    '& .MuiDrawer-paper': {
      width: '100%',
      position: 'initial',
      borderRadius: '8px',
      background: 'transparent !important',
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
    '& .MuiInputBase-adornedStart': {
      height: '44px !important',
    },
    borderBottom: `1px solid ${theme.palette.colors.gray[100]}`,
  },
  backButton: {
    padding: 0,
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
  // listStyle: {
  //   '& > :last-child': {
  //     marginBottom: '128px',
  //   },
  // },
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
  searchFieldWrap: {
    flexGrow: 1,
    background: theme.palette.colors.gray[25],
    height: '36px',
    display: ' flex',
    alignItems: 'center',
    borderRadius: '6px',
  },
}));
