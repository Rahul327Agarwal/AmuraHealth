import { makeStyles } from 'tss-react/mui';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../DiagnosticCondition.utils';
import { IGraphProps } from './Graph.types';

export const useStyles = makeStyles<IGraphProps>()((theme, props) => ({
  graphSection: {
    width: `${CANVAS_WIDTH}px`,
    height: `${CANVAS_HEIGHT}px`,
    position: 'relative',
    boxSizing: 'border-box',
  },
  graphCanvas: {
    backgroundColor: theme.palette.colors.system.white,
  },
  tooltipBox: {
    position: 'absolute',
    padding: '4px 8px',
    minWidth: '38px',
    maxWidth: '58px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: theme.palette.colors.gray[900],
    borderRadius: '4px',
    touchAction: 'none',
    pointerEvents: 'none',
    zIndex: 99,
    boxShadow: '0px 8px 12px 0px #00000014',
    transition: 'opacity .3s ease-in-out',
    translate: '0 -50%',
    opacity: 0,
    '[data-datapoint]': {
      justifyContent: 'flex-start',
    },
  },
  tooltipYText: {
    color: theme.palette.colors.system.white,
  },
  tooltipXText: {
    color: theme.palette.colors.gray[100],
  },
}));
