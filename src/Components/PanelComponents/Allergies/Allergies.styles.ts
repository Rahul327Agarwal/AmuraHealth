import { makeStyles } from 'tss-react/mui';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  noData: {
    display: 'block',
    width: '50%',
    margin: '70% auto',
    textAlign: 'center',
    color: '#fff',
    wordBreak: 'break-word',
  },
  AllergensPanel: {
    color: '#ffffff',
    // color: theme.palette.colors.gray[900],
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background:'#3f4044'
  },
  AllergensBody: {
    padding: '0 16px',
    overflow: 'auto',
    flex: 1,
    wordBreak: 'break-all',
  },
}));
