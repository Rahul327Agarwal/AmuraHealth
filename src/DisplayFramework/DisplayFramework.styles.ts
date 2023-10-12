import { makeStyles } from 'tss-react/mui';
import { IStyledProps } from './DisplayFramework.types';

export const useStyles = makeStyles<IStyledProps>()((theme, props) => ({
  //
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    position: 'relative',
    background: 'black',
    [theme.breakpoints.down('sm')]: {
      // backgroundColor: theme.palette.secondary.main,
      height: '100%',
      width: '100%',
    },
  },

  //
  mainSection: {
    width: props.panelsContainerWidth,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: props.numOfPanelsCanFit === 1 ? 0 : 8,
    overflow: 'hidden',
  },
  nonStaticPanelColumnContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'hidden',
  },
  panelRowContainer: {
    overflow: 'scroll',
    display: 'flex',
    position: 'relative',
    scrollSnapType: 'x mandatory',
  },

  //
  screenTooSmallPrompt: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '80%',
    textAlign: 'center',
    margin: '0 auto',
  },
}));
