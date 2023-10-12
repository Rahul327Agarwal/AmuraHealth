import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  container: {
    position: 'relative',
    maxWidth: '27px',
  },
  initial: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    background: 'white',
    padding: '1.2px',
    aspectRatio: '1/1',
    border: '1.8px solid #252427',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '18px',
  },
}));
