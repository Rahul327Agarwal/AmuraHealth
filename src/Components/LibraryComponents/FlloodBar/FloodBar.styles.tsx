import { Slider } from '@mui/material';
import { withStyles } from 'tss-react/mui';
import { IProps } from './FloodBar.types';

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
export const SliderStyled = withStyles(Slider, (theme, props) => ({
  root: {
    color: '#007AFF',
    pointerEvents: (props as any).isEditable ? 'initial' : 'none',
  },
  rail: {
    backgroundColor: '#fff',
  },
  thumb: {
    height: 0,
    width: 0,
    boxShadow: 'none !important',
  },
  valueLabel: {
    top: '14px',
    '& span': {
      backgroundColor: 'transparent',
      color: 'currentColor',
      fontSize: '10px',
      transform: 'translateX(-5px)',
    },
  },
}));
