import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
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
  backButton: { padding: 0 },
  reSize: { transform: 'scale(1.2)' },
  iconWithDotWrapper: {
    position: 'relative',
  },
  notifyIconWrapper: {
    position: 'absolute',
    content: "''",
    top: '-5px',
    right: '12px',
    height: '7px',
    width: '7px',
    boxSizing: 'border-box',
    background: theme.palette.colors.red[700],
    borderRadius: '50%',
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
  refreshNotification: {
    position: 'absolute',
    content: "''",
    top: '5px',
    right: '12px',
    height: '7px',
    width: '7px',
    boxSizing: 'border-box',
    background: theme.palette.colors.red[700],
    borderRadius: '50%',
  },
  refreshIcon: {
    position: 'relative',
    '&[data-loading="true"] svg': {
      animation: `$myEffect 1000ms ${theme.transitions.easing.easeInOut} `,
      animationIterationCount: 'infinite',
      transform: 'rotate(0deg)',
    },
  },
  '@keyframes myEffect': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  searchFieldWrap: {
    flexGrow: 1,
    background: ' #F8F8F8',
    height: '36px',
    display: ' flex',
    alignItems: 'center',
    borderRadius: '6px',
  },
}));
