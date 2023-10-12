import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  browseRole: {
    backgroundColor: theme.palette.colors.system.white,
    display: 'flex',
    flexDirection: 'column',
    // gap: '31px',
    padding: '20px',
    height: 'inherit',
  },
  scrollBody: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    // gap: '31px',
    overflowY: 'auto',
    overflowX: 'hidden',
    margin: '0 -20px',
    padding: '31px 20px',
  },
  footerStyle: {
    margin: 'auto -20px -20px',
  },

  headerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },

  reportee: {
    marginBottom: '16px',
    display: 'block',
    marginTop: '24px',
  },
  dflex: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '16px',
    flexWrap: 'wrap',
  },
  subHeader: {
    color: '#5C5A61',
  },
  mb: {
    marginBottom: '30px',
  },
}));
