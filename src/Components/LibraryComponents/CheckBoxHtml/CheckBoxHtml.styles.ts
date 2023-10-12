import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  checkboxContainer: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '34px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    margin: '8px 0px',
  },
  labelpositionstyle: {
    flexDirection: 'row-reverse',
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  labelStyle: {
    color: theme.palette.colors.gray[900],
  },
  sublabelStyle: {
    color: theme.palette.colors.gray[500],
    marginTop: '2px',
  },
}));
