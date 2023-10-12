import { makeStyles } from 'tss-react/mui';
import { IProps } from './ProgressBarNew.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, { removeMargin }) => ({
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
  margin8px: {
    margin: removeMargin ? '0px' : '8px',
  },
}));
