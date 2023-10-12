import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  cardDiv: {
    borderRadius: '8px',
    cursor: 'pointer',
    position: 'relative',
    height: '72px',
    padding: '20px 16px',
    background: theme.palette.colors.gray[25],
    overflow: 'hidden',
  },
  backgroundActiveBg: {
    background: 'rgb(37, 36, 39)',
    opacity: 0.5,
    borderRadius: 'inherit',
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  tick: {
    position: 'absolute',
    right: '20px',
    top: '50%',
    translate: '0-50%',
    zIndex: 2,
  },
  grigDiv: {
    wordBreak: 'break-word',
    color: theme.palette.colors.theme.primary,
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
}));
