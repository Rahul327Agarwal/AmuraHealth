import { makeStyles } from 'tss-react/mui';
import { IProps } from '../MyListHome.types';
export const useStyles = makeStyles()((theme, props) => ({
  mainContainer: {
    position: 'relative',
    height: 'inherit',
    backgroundColor: theme.palette.colors.gray[50],
  },
  rootContainer: {
    backgroundColor: theme.palette.colors.gray[50],
    height: 'inherit',
    paddingBottom: '16px',
    boxSizing: 'border-box',
    position: 'relative',
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
  },
  reSize: { transform: 'scale(1.2)' },
  headerstyle: {
    marginBottom: '16px',
  },
  renderButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '& > span': { display: 'flex', alignItems: 'center' },
  },
  nameChardWrapper: {
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
    width: '100%',
    margin: '5px 0px',
    zIndex: 10,
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
  body: {
    flex: 1,
    height: 'calc(100% - 218px)',
    overflow: 'auto',
  },
  listStyle: {
    '& > :last-child': {
      marginBottom: '30px',
    },
  },
  animate: {
    '& svg': {
      animation: `$myEffect 1000ms ${theme.transitions.easing.easeInOut}`,
      transform: 'rotate(0deg)',
    },
  },
}));
