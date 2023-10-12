import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<{
  showSearch?: boolean;
}>()((theme, props) => ({
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
  hidden: {
    display: 'none',
  },

  bgColor: {
    backgroundColor: '#F8F8F8',
  },
  scrollBody: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    overflowY: 'auto',
    overflowX: 'hidden',
    margin: '0 -20px',
    padding: '0 20px 36px 20px',
  },
  backArrow: {
    marginRight: '15px',
    cursor: 'pointer',
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // height: '44px',
    backgroundColor: theme.palette.colors.gray[25],
    borderBottom: `1px solid ${theme.palette.colors.gray[100]}`,
    padding: '15px 20px',
    margin: '0 -20px',
    '& button': {
      padding: '0',
    },
  },
  addButton: {
    position: 'absolute',
    right: '20px',
    bottom: '56px',
    transform: 'translateY(50%)',
    background: `${theme.palette.colors.gray[900]} !important`,
    '& path': {
      fill: `${theme.palette.colors.system.white} !important`,
    },
  },
  addButtonDisable: {
    position: 'absolute',
    right: '20px',
    bottom: '56px',
    transform: 'translateY(50%)',
    cursor: 'not-allowed !important',
    background: `${theme.palette.colors.gray[400]} !important`,
    '& path': {
      fill: `${theme.palette.colors.system.white} !important`,
    },
  },
  searchIcon: {
    fill: `${theme.palette.colors.gray[props.showSearch ? 900 : 400]} !important`,
  },
}));
