import { makeStyles } from 'tss-react/mui';
import { IGraphRulerProps } from './GraphRuler.types';
import { CANVAS_XOFFSET, RULER_XPADDING, STYLES } from '../../DiagnosticCondition.utils';

export const useStyles = makeStyles<IGraphRulerProps>()((theme, props) => ({
  rulerSection: {
    margin: '10px -20px',
    background: '#F8F8F8',
    borderRadius: '6px 6px 0px 0px',
    zIndex: 1,
    position: 'relative',
    paddingLeft: `${CANVAS_XOFFSET - RULER_XPADDING}px`,
    height: '60px',
  },
  rulerCanvas: {
    // backgroundColor: 'pink',
    cursor: 'grab',
  },
}));
