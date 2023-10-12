import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  rootContainer: {
    backgroundColor: theme.palette.colors.system.white,
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '20px',
    height: 'inherit',
    position: 'relative',
    // height: '95vh', // DEV ONLY
    // margin: '-1rem', // DEV ONLY
  },
  noHistoryColor: {
    color: '#5C5A61',
  },
  nothingToShow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60%',
    flexDirection: 'column',
    gap: '20px',
  },
  backArrow: {
    marginRight: '15px',
    cursor: 'pointer',
  },
  padding20: {
    padding: '20px !important',
  },
  scrollBody: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    overflowY: 'auto',
    overflowX: 'hidden',
    margin: '0 -20px',
    padding: '0 20px',
  },
}));
