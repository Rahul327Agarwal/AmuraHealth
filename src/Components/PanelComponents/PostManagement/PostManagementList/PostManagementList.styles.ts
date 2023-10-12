import { makeStyles } from 'tss-react/mui';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    position: 'relative',
    // height: "inherit",
    height: '100%',
    backgroundColor: theme.palette.colors.gray[50],
    boxSizing: 'border-box',
  },
  noDataContainer: {
    width: '100%',
    padding: '50px',
    textAlign: 'center',
    color: theme.palette.colors.gray[500],
  },
  reSize: { transform: 'scale(1.2)' },
  // threeDotCaption: {
  //   display: "flex",
  //   alignItems: "center",
  // },
  renderButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '6px',
    '& > span': { display: 'flex', alignItems: 'center' },
  },
  nameChardWrapper: {
    '& > div:first-child': { borderTop: 'none', '&::before': { top: 0 } },
    '& > div:last-child': { borderBottom: 'none', '&::before': { bottom: 0 } },
    height: 'calc(100% - 50px) !important',
  },
  myListHeader: {
    background: '#E9E8E8',
    padding: ' 8px 20px',
    borderRadius: ' 8px 8px 0px 0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIcon: {
    cursor: 'pointer',
  },
  bgColor: {
    backgroundColor: theme.palette.colors.gray[50],
  },
  headerText: {
    display: 'flex',
    alignItems: 'center',
    gap: '11px',
  },
  subHeader: {
    padding: '8px 20px',
    background: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `2px solid ${theme.palette.colors.gray[100]}`,
    height: '48px',
  },
  addButton: {
    position: 'absolute',
    right: '20px',
    bottom: '40px',
    transform: 'translateY(50%)',
    background: `${theme.palette.colors.gray[900]} !important`,
    '& path': {
      fill: `${theme.palette.colors.system.white} !important`,
    },
  },
  addButtonDisabled: {
    position: 'absolute',
    right: '20px',
    bottom: '40px',
    transform: 'translateY(50%)',
    background: '#A6A6A6',
    '& path': {
      fill: `${theme.palette.colors.system.white} !important`,
    },
  },
  searchBox: {
    display: 'flex',
    gap: '24px',
    background: theme.palette.colors.system.white,
    padding: '5px 20px',
    alignItems: 'center',
    height: '48px',
    boxSizing: 'border-box',
    '& .MuiOutlinedInput-adornedStart': {
      height: '40px !important',
    },
    borderBottom: `1px solid ${theme.palette.colors.gray[100]}`,
  },
  backButton: {
    padding: 0,
  },
  searchFieldWrap: {
    flexGrow: 1,
    background: theme.palette.colors.gray[25],
    height: '36px',
    display: ' flex',
    alignItems: 'center',
    borderRadius: '6px',
  },
}));
