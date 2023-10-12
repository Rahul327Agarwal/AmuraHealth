import { makeStyles } from 'tss-react/mui';
import { IProps } from './CommonHeader.types';
export const useStyles = makeStyles<IProps>()((theme, props) => ({
  myListHeader: {
    background: '#E9E8E8',
    padding: ' 8px 20px',
    borderRadius: props.window?.state === 'maximized' || props.window.minimizedComponent ? ' 8px 8px 0px 0px' : '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  headerIcon: {
    cursor: 'pointer',
    fill: '#A6A6A6',
  },
  headerText: {
    display: 'flex',
    alignItems: 'center',
    gap: '11px',
    textTransform: 'capitalize',
    '& svg': {
      height: '24px',
      width: '24px',
    },
    '&::first-letter': {
      textTransform: 'capitalize',
    },
  },
  active: {
    '& svg': {
      '& path': {
        fill: '#5C5A61',
      },
    },
  },
  passive: {
    pointerEvents: 'none',
    '& svg': {
      '& path': {
        fill: '#A6A6A6',
      },
    },
  },
  titleSpan:  {
    width:" 260px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
}));
