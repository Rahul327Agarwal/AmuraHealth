import { Tab, Tabs } from '@mui/material';
import { makeStyles, withStyles } from 'tss-react/mui';
import { IProps } from './ReporteesListViewHome.types';
export const useStyles = makeStyles<IProps>()((theme, props) => ({
  rootRelativeContainer: {
    backgroundColor: theme.palette.colors.system.white,
    height: 'calc(100% - 0px)',
    position: 'relative',
  },
  overlapDrawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1050,
    height: `100%`,
    width: `${props?.panel?.width}px !important`,
    '& .MuiDrawer-paper': {
      width: '100%',
      position: 'initial',
      borderRadius: '8px',
      background: 'transparent !important',
      overflowX: 'hidden',
    },
  },
  innerOverlapDrawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1050,
    height: `100%`,
    width: 'inherit',
    '& .MuiDrawer-paper': {
      width: '100%',
      position: 'initial',
      borderRadius: '8px',
      background: `${theme.palette.colors.gray[50]} !important`,
      overflowX: 'hidden',
    },
  },
  rootContainer: {
    backgroundColor: theme.palette.colors.system.white,
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    // margin: '-1rem', // FOR STORYBOOK ONLY
    // height: '100vh', // FOR STORYBOOK ONLY
  },
  scrollBody: {
    flexGrow: 1,
    // display: 'flex',
    // flexDirection: 'column',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  filterPanel: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '0 20px',
    background: theme.palette.colors.system.white,
    minHeight: '52px',
  },
  filterButton: {
    fontSize: '12px',
    fontWeight: 600,
  },
  footerStyle: {
    marginTop: 'auto',
    padding: '20px',
  },
  filterTabPanel: {
    display: 'grid',
    gridTemplateColumns: 'calc(100% - 50px) 50px',
    padding: '5px 0',
  },
  tabsBox: {
    gap: '5px',
    display: 'flex',
    flexWrap: 'nowrap',
  },
  tabToken: {
    margin: '0 !important',
    maxWidth: '100px !important',
    maxHeight: '28px !important',
    cursor: 'pointer !important',
    '& .MuiChip-label': {
      lineHeight: 'unset !important',
    },
  },
  reporteeGrid: {
    "&[data-visible='true']": {
      display: 'none',
    },
  },
}));

export const TabsStyled = withStyles(Tabs, (theme) => ({
  root: {
    width: '100%',
    minHeight: '40px',
    overflow: 'hidden',
  },
  indicator: {
    display: 'none',
  },
}));

export const TabStyled = withStyles(Tab, (theme) => ({
  root: {
    textTransform: 'initial',
    color: theme.palette.colors.gray[400],
    position: 'relative',
    flexGrow: 1,
    maxWidth: 'fit-content !important',
    minWidth: 'fit-content !important',
    minHeight: '40px !important',
    padding: 0,
    '&::after': {
      content: 'unset',
    },
    '& .MuiTab-wrapper': {
      height: '100%',
      display: 'flex',
      gap: '8px',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '0 5px',
    },
  },
  selected: {
    backgroundColor: theme.palette.colors.system.white,
    color: `${theme.palette.colors.theme.primary} !important`,
  },
}));
