import { makeStyles } from 'tss-react/mui';
import { IStyledProps } from './Panel.types';

export const useStyles = makeStyles<IStyledProps>()((theme, props) => ({
  //
  mainContainer: {
    width: props.width,
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    flex: 'none',
    borderRadius: props.shouldRoundCorners ? `8px 8px 0 0` : 0,
    overflow: 'hidden',
    position: 'relative',
    // transition: 'width 0.3s ease-in-out',
    scrollSnapAlign: 'start',
    // transform: `scale(${2}})`,

    '& .MuiDrawer-root': {
      marginTop: 0,
    },
  },
  toasterClass: {
    position: 'absolute',
    maxWidth: '364px',
    width: 'unset',
  },
}));
