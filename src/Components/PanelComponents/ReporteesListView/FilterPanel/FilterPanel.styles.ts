import { makeStyles } from "tss-react/mui";

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    backgroundColor: theme.palette.colors.system.white,
    height: 'inherit',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },

  scrollBody: {
    flexGrow: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    margin: '0 -20px',
  },
  active: {
    '& svg': { '& path': { fill: '#A6A6A6' } },
  },
  inactive: {
    '& svg': { '& path': { fill: '#252427' } },
  },
}));
