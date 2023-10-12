import { makeStyles } from 'tss-react/mui';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<any>()((theme) => ({
  mainContainer: {
    position: 'relative',
    // height: "inherit",
    height: '100%',
    backgroundColor: theme.palette.colors.gray[50],
    boxSizing: 'border-box',
  },
  subHeader: {
    padding: '8px 20px',
    background: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    height: '48px',
  },
  noDataContainer: {
    width: '100%',
    padding: '50px',
    textAlign: 'center',
    color: theme.palette.colors.gray[500],
  },
  headerIcon: {
    cursor: 'pointer',
  },
  searchBox: {
    display: 'flex',
    gap: '10px',
    background: theme.palette.colors.system.white,
    padding: '5px 20px',
    alignItems: 'center',
    height: '48px',
    boxSizing: 'border-box',
    '& .MuiOutlinedInput-adornedStart': {
      height: '40px !important',
    },
    '& .MuiInputBase-adornedStart': {
      height: '44px !important',
    },
    borderBottom: `2px solid ${theme.palette.colors.gray[100]}`,
  },
  backButton: {
    padding: 0,
  },
  nameChardWrapper: {
    height: 'calc(100% - 100px) !important',
  },
  addButton: {
    position: 'absolute',
    right: '20px',
    bottom: '60px',
    transform: 'translateY(50%)',
    background: `${theme.palette.colors.gray[900]} !important`,
    '& path': {
      fill: `${theme.palette.colors.system.white} !important`,
    },
  },
  addmargin: {
    marginBottom: '16px',
  },
  disabledButton: {
    position: 'absolute',
    right: '20px',
    bottom: '60px',
    transform: 'translateY(50%)',
    background: `${theme.palette.colors.gray[400]} !important`,
    '& path': {
      fill: `${theme.palette.colors.system.white} !important`,
    },
  },
  searchFieldWrap: {
    height: '36px',
  },
}));
