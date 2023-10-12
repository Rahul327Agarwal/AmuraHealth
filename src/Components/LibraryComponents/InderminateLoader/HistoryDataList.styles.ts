import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  historySection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  historyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },

  historyTitle: {
    color: theme.palette.colors.gray[400],
  },
  singleHistory: {
    display: 'flex',
    // gridTemplateColumns: '50px 57px 1fr',
    background: theme.palette.colors.gray[25],
    padding: '9px 12px',
    borderRadius: '8px',
    color: theme.palette.colors.gray[400],
  },
  previousWeight: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    marginRight: '23px',
    width: '50px',
  },
  current: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: '8px',
    width: '57px',
  },
  currentWeight: {
    color: theme.palette.colors.theme.primary,
  },

  unitAndDate: {},
}));
