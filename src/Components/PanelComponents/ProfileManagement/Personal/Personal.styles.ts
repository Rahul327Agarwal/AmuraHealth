import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  profileBody: {
    flexGrow: 1,
    overflow: 'auto',
    margin: '0 -20px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    paddingBottom: '20px',
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    paddingBottom: '15px',
    borderBottom: `1px solid ${theme.palette.colors.gray[100]}`,
  },
  subLabel: {
    color: theme.palette.colors.gray[500],
  },
  subLabel1: {
    color: theme.palette.colors.theme.primary,
    marginBottom: '10px',
  },
  subLabel2: {
    color: theme.palette.colors.theme.primary,
    margin: '28px 0 10px',
  },
  mainLabel: {
    color: theme.palette.colors.theme.primary,
    marginTop: '25px',
  },
  buttonLeft: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '30px 0 10px',
  },
}));
