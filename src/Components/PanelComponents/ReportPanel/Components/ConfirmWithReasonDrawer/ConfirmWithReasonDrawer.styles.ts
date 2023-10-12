import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  drawerBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  footerStyle: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
  },
}));
