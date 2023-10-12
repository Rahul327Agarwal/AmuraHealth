import { Tab, Tabs } from '@mui/material';
import { makeStyles, withStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<any>()((theme) => ({
  filterTabPanel: {
    display: 'grid',
    gridTemplateColumns: 'calc(100% - 50px) 50px',
    padding: '5px 0',
    background: theme.palette.colors.system.white,
  },
  tabsBox: {
    gap: '5px',
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
  tabToken: {
    margin: '0 !important',
    maxWidth: '100px !important',
    maxHeight: '28px !important',
    cursor: 'pointer !important',
    '& .MuiChip-label': {
      lineHeight: 'unset !important',
      overflow: 'hidden',
    },
  },

  threeDotMenuStyle: {
    display: 'flex !important',
    justifyContent: 'center !important',
    '& .MuiTooltip-tooltip': {
      translate: '-8px -10px !important',
      borderRadius: '8px !important',
    },
  },
  tokenSection: {
    position: 'relative',
    padding: '0 10px',
    border: `1px solid ${theme.palette.colors.gray[100]}`,
    borderRadius: '20px',
    background: theme.palette.colors.gray[25],
    color: theme.palette.colors.gray[500],
    maxWidth: '97px',
    width: 'min-content',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    height: '28px',
    textOverflow: 'ellipsis',
    boxSizing: 'border-box',
    lineHeight: '28px !important',
    zIndex: 1,
    "&[data-active='true']": {
      background: theme.palette.colors.gray[200],
      border: `1px solid ${theme.palette.colors.gray[900]}`,
      color: theme.palette.colors.gray[900],
    },
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '0%',
    zIndex: -1,
    background: theme.palette.colors.system.white,
    transition: 'width .3s ease',
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
}));
