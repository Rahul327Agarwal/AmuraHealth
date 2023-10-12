import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    gap: '5px',
    display: 'grid',
    padding: '16px',
    background: theme.palette.colors.gray[50],
    borderRadius: '4px',
    gridTemplateColumns: 'calc(50% - 15px) 18% 18% 14%',
  },
  primaryText: {
    color: theme.palette.colors.theme.primary,
    alignSelf: 'center',
    wordBreak: 'break-word',
  },
  unitText: {
    color: theme.palette.colors.gray[500],
    textAlign: 'start',
    alignSelf: 'center',
    wordBreak: 'break-word',
  },
  valueText: {
    color: theme.palette.colors.gray[500],
    textAlign: 'end',
    alignSelf: 'center',
    wordBreak: 'break-word',
  },
  threeDot: {
    textAlign: 'end',
    alignSelf: 'center',
  },
}));
