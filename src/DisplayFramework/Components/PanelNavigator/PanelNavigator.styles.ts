import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme, props) => ({
  //
  mainContainer: {
    height: '40px',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    borderTop: `1px solid ${theme.palette.divider}`,
    flex: 'none',
  },

  //
  navigatorButton: {
    height: 16,
    width: 16,
    backgroundColor: '#5C5A61',
    cursor: 'pointer',
    borderRadius: '50%',
    transition: 'all 0.1s ease',
  },
}));
