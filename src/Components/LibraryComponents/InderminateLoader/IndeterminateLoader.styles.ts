import { makeStyles } from 'tss-react/mui';
import { IProps } from './IndeterminateLoader.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, { panelWidth, relative }) => ({
  progress: {
    height: '6px',
    borderRadius: '3px',
    background: `${theme.palette.colors.gray[100]} !important`,
    boxShadow: 'none',
    '& .MuiLinearProgress-bar': {
      borderRadius: '3px',
      background: `${theme.palette.colors.gray[900]} !important`,
      boxShadow: 'none',
    },
  },
  position: {
    position: relative ? 'relative' : 'absolute',
    top: 0,
    width: typeof panelWidth === 'number' ? `${panelWidth ?? 100}px` : panelWidth,
  },
}));
