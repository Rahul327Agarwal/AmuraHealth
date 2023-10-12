import { CircularProgress } from '@mui/material';
import { withStyles } from 'tss-react/mui';
import { IProps } from './CircularProgress.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const CircularProgressStyled = withStyles(
  CircularProgress,
  (theme, { progressBarColor, borderThickness, borderColor }: IProps) => ({
    root: {
      color: `${progressBarColor}`,
      border: `${borderThickness}px solid ${borderColor}`,
      borderRadius: '50%',
      position: 'relative',
    },
    svg: {
      transform: 'scale(1.15)',
    },
  })
);
