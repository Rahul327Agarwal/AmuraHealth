import { makeStyles } from 'tss-react/mui';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    position: 'relative',
    height: 'inherit',
    padding: '1rem',
    background: '#FFFFFF',
  },
  mainwrapper: {
    padding: '8px 8px',
  },
  mainhead: {
    display: 'flex',
    gap: '16px',
  },
  heading: {
    color: theme.palette.colors.gray[900], //"#252427",
    margin: '0',
  },
  anotherbranch: {
    display: 'flex',
    marginTop: '38px',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
  },
  span2: {
    marginBottom: '4px',
  },
  searchresult: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    marginBottom: '16px',
  },
  rootContainer: {
    padding: '1rem',
    backgroundColor: theme.palette.colors.system.white,
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  headerStyle: {
    marginBottom: '16px',
  },
  dflex: {},
  titleWraper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginBottom: "20px",
    boxSizing: 'border-box',
  },
  iconStyle: {
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    '& path': {
      fill: '#5C5A61',
    },
  },

  subheading: {
    margin: '0px',
    color: '#5C5A61',
  },
  filterIcon: {
    display: 'flex',
    marginLeft: '12px',
    height: '52px',
    width: '52px',
    background: theme.palette.colors.gray[25],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  searchCardWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '33px',
  },
  searchFieldWrap: {
    flexGrow: 1,
    background: ' #F8F8F8',
    height: '52px',
    display: ' flex',
    alignItems: 'center',
    borderRadius: '6px',
  },
  buttonLike: {
    height: '38px',
    width: '38px',
    border: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  largeCloseIcon: {
    fontSize: 'large',
    color: '#5C5A61',
    cursor: 'pointer',
    textAlign: 'end',
  },
  notFoundMessage: {
    color: '#5C5A61',
  },
  checkboxdiv: {
    marginTop: '48px',
  },
  footer: {
    position: 'fixed',
    bottom: '0px',
    width: '100%',
  },
  namecard: {
    overflow: 'auto',
    height: 'calc(100% - 163px)',
    margin: '0 -1rem',
  },
  scrollBody: {
    flexGrow: 1,
    overflowY: 'scroll',
    margin: '0 -1rem',
  },
  clear: {
    cursor: 'pointer',
    color: '#A6A6A6',
  },
  result: {
    color: '#A6A6A6',
  },
  //filter
  filterSubHeading: {
    color: '#5C5A61',
    marginLeft: '35px',
    marginTop: '-5px',
    marginBottom: '26px',
    display: 'block',
  },
  filterTitle: {
    background: ' #F8F8F8',
    padding: '8px 20px',
    color: '#5C5A61',
  },
  flexWrapper: {
    position: 'relative',
    height: 'inherit',
    padding: '1rem',
    background: '#FFFFFF',
  },
  circularloader: {
    color: `${theme.palette.colors.gray[900]} !important`,
  },
  selectAllCon: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.colors.gray[25],
    justifyContent: 'flex-end',
    margin: '0 -1rem',
    padding: '12px 28px 12px 20px',
  },
  selectAllButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  selectAllText: {
    color: theme.palette.colors.gray[500],
    whiteSpace: 'nowrap',
    cursor: 'pointer',
  },
  footerStyle: {
    margin: 'auto -20px -20px',
  },
}));
