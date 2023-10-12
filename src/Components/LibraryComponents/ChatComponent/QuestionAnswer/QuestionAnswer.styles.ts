import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  qaSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    background: theme.palette.colors.gray[25],
    borderRadius: '6px 0px 6px 6px',
    padding: '20px 16px',
  },
  qaBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  qaFooter: {
    display: 'flex',
    justifyContent: 'end',
    color: theme.palette.colors.gray[500],
  },
  question1: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    gap: '9px',
    background: theme.palette.colors.system.white,
    color: theme.palette.colors.gray[500],
    '& svg': { transform: 'scale(.7)' },
  },
  question2: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    color: theme.palette.colors.gray[500],
  },
  answer: {
    color: theme.palette.colors.theme.primary,
  },
}));
