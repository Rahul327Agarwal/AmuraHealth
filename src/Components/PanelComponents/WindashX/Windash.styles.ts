import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme, props) => ({
  root: {
    height: '100%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    flex: 'none',
  },
  windashWrapper: {
    height: '100%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
    gap: 8,
    minHeight: 0,
  },
  windowWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
  },
  maximizedScreen: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    border: '1px solid #ccc',
    borderTop: 'none',
    borderEndEndRadius: 8,
    borderEndStartRadius: 8,
    overflow: 'hidden',
  },
  minimizedScreen: {
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    border: '1px solid #ccc',
    borderTop: 'none',
    borderEndEndRadius: 8,
    borderEndStartRadius: 8,
    overflow: 'hidden',
  },
}));
