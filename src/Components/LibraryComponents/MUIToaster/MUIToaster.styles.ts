import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  toasterContainer: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    alignItems: 'center',
    padding: '14px',
    gap: '16px',
    borderRadius: '8px',
    background: theme.palette.colors.gray[900],
  },
  whiteText: {
    color: theme.palette.colors.system.white,
    // display: 'flex',
  },
}));
