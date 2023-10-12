import { makeStyles } from 'tss-react/mui';
import { IProps } from './DotStatus.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, { color, isSelected, opacityControl }) => ({
  svgStyle: {
    cursor: 'pointer',
    boxShadow: 'rgb(0 0 0 / 4%) 0px 4px 4px',
    boxSizing: 'border-box',
    border: `4px solid ${opacityControl ? '#FFFFFF' : isSelected ? '#F1F1F1' : '#FFFFFF'}`,
    borderRadius: '50%',
    height: '22px',
    width: '22px',
    '& > rect': { fill: color || '#E1E1E1' },
    opacity: opacityControl ? (isSelected ? 1 : 0.3) : 1,
  },
  mainContainer: {
    display: 'flex',
    position: 'relative',
    cursor: 'pointer',
  },
  numStyleText: {
    color: color=='#CAF0F8'? '#5C5A61': theme.palette.colors.system.white,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '23px',
    width: '22px',
  },
}));
