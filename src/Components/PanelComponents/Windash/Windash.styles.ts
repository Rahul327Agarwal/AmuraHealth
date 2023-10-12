import { makeStyles } from 'tss-react/mui';
export const useStyles = makeStyles<any>()((theme, props) => ({
  mainContainer: {
    position: 'relative',
    height: 'inherit',
  },
  rootContainer: {
    // backgroundColor: theme.palette.colors.gray[50],
    height: 'calc(100%)',
    boxSizing: 'border-box',
    background: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
  },
  tabStyle: {
    padding: '16px 20px !important',
  },
  dragIcon: {
    position: 'absolute',
    // top: '-50px',
    // display: 'inline-block',
    zIndex: 400,
    top: '-34px',
    display: 'none',
  },
  active: {
    '& svg': {
      '& path': {
        fill: '#5C5A61',
      },
    },
  },
  passive: {
    '& svg': {
      '& path': {
        fill: '#A6A6A6',
      },
    },
  },
  removePadding: {
    padding: '0',
  },
  filterOptionStyle: {
    translate: '-20px',
    '& ul': {
      minWidth: 'max-content',
    },
  },
  height: {},
  drag: {
    position: 'relative',
    height: '8px',
    width: '100%',
    background: '#FFFFFF',
  },
  wrapper: {
    // margin: '0px 8px 0px 8px',
    border: '1px solid #E9E8E8',
    borderRadius: '8px',
    boxSizing: 'border-box',
    overflow: 'hidden',
    height: '500px',
    paddingTop: '8px',
  },
  eventHight: {
    height: '72px',
    marginTop: '30px',
  },
  scrollDiv: {
    overflow: 'auto',
    // height: 'calc(100% - 60px)',
    height: '100%',
    // padding: '0 8px',
  },
  myListHeader: {
    background: '#E9E8E8',
    padding: ' 8px 20px',
    borderRadius: ' 8px 8px 0px 0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  headerIcon: {
    cursor: 'pointer',
  },
  DisableIcon: {
    cursor: 'pointer',
    '& svg': {
      '& path': {
        fill: '#A6A6A6',
      },
    },
  },
  bgColor: {
    backgroundColor: theme.palette.colors.gray[50],
    height: '110px',
  },
  headerText: {
    display: 'flex',
    alignItems: 'center',
    gap: '11px',
    textTransform: 'capitalize',
    '& svg': {
      height: '24px',
      width: '24px',
    },
    '&::first-letter': {
      textTransform: 'capitalize',
    },
  },
  subHeader: {
    padding: '8px 20px',
    background: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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

  headerStyle: {},
  groupLabelWrap: {
    padding: '14px 20px',
    background: '#fff',
  },

  listOverFlow: {
    overflow: 'auto',
    maxHeight: 'calc(100% - 126px)',
  },
  drawer: {
    position: 'absolute',
    top: '0',
    width: '100%',
    margin: '0The incpx 0px',
    zIndex: 1050,
    height: '100%',
    '& .MuiDrawer-paper': {
      width: '100%',
      position: 'initial',
      borderRadius: '8px',
      background: 'transparent !important',
    },
  },
}));
