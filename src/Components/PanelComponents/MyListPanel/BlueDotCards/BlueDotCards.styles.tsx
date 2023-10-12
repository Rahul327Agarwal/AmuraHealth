import { makeStyles } from 'tss-react/mui';
import { getFixedMaxWidgetWidth } from '../../../../DisplayFramework/DisplayFramework.functions';
import { BlueDotCardsProps } from '../MyListHome.types';

export const useStyles = makeStyles<BlueDotCardsProps>()((theme, props) => ({
  rootContainer: {
    display: 'flex',
    flexDirection: 'column',
    //gap: "20px",
    height: '100%',
    width: `${getFixedMaxWidgetWidth()}px`,
    paddingTop: '12px',
    // transform: 'translate(-355px, 0px)',
    // transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
  },
  swipeIn: {
    transform: 'translate(0px,0px) !important',
  },
  swipeOut: {
    transform: 'translate(-355px, 0px)',
  },
  statusWrap: {
    background: theme.palette.colors.system.white,
    width: `100%`,
    height: '100%',
    display: 'flex',
    // flexDirection: 'column',
    // borderRadius: '8px',
    // paddingTop: '12px',
    // position: 'relative',
  },
  headerStyle: {
    height: '60px',
    boxSizing: 'border-box',
    padding: '0 20px !important',
  },
  bodyContainer: {
    height: 'calc(100% - 60px)',
    overflowY: 'auto',
    boxSizing: 'border-box',
    margin: '8px',
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.colors.gray[200]}`,
    borderRadius: '8px',
    //gap: "30px",
  },

  backdrop: {
    opacity: 0,
    transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    background: theme.palette.colors.gray[900],
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -2,
  },
  backdropOpacityIn: {
    opacity: 0.8,
  },
  backdropOpacityOut: {
    opacity: 0,
  },
  backArrow: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'inherit',
    marginRight: '15px',
  },
}));
