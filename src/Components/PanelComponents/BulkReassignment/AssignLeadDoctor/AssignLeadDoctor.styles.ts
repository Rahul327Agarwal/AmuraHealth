import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  rootContainer: {
    backgroundColor: '#FFF',
    // margin: "-1rem", // for testing only
    height: 'inherit',
    overflow: 'auto',
    position: 'relative',
  },
  padding20: {
    padding: '20px !important',
  },
  propertyCardWrapper: {
    padding: '20px 0',
    marginBottom: '30px',
    '& > *': {
      borderTop: '1px solid #E1E1E1',
      '&:first-child': { borderTop: 'none' },
    },
  },
  middleContainer: {
    height: 'calc(100vh - 310px)',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  footerButtons: {},
  footerStyle: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    padding: '1rem',
  },
  noResultsDiv: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textAlign: {
    textAlign: 'center',
  },
  topMargin: {
    marginTop: '24px',
  },
  addManually: {
    display: 'flex',
    gap: '8px',
    cursor: 'pointer',
    color: theme.palette.colors.gray[900],
    alignItems: 'center',
    margin: '4px 0px',
  },
}));
