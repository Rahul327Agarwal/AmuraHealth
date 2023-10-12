import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme, props) => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
}));
