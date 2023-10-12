import { makeStyles } from 'tss-react/mui';
export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    position: 'relative',
    height: 'inherit',
  },
  rootContainer: {
    backgroundColor: theme.palette.colors.gray[50],
    height: 'calc(100%)',
    boxSizing: 'border-box',
  }, 
 
  nameChardWrapper: {
    '& > div:first-child': { borderTop: 'none', '&::before': { top: 0 } },
    '& > div:last-child': { borderBottom: 'none', '&::before': { bottom: 0 } },
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
