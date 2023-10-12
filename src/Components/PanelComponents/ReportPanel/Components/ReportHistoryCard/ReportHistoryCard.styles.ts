import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  reportCards: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    background: theme.palette.colors.gray[50],
    padding: '16px',
    borderRadius: '6px',
  },
  width73: {
    width: '53%',
  },
  width60: {
    width: '60.6%',
  },
  width17: {
    width: '17%',
  },
  width14: {
    width: '14.4%',
  },
  width22: {
    width: '42.5%',
  },
  capsuleAction: {
    display: 'flex',
    flexDirection: 'row',
    width: 'fit-content',
    minWidth: '70px',
    height: '24px',
    backgroundColor: 'rgba(37, 36, 39, 0.5)',
    borderRadius: '20px',
    padding: '4px 8px',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.colors.system.white,
    textAlign: 'center',
  },
  actionNameDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    // alignItems: 'center',
    gap: '4.5%',
  },
  valClass: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
  },
  userDetailsDiv: {
    display: 'grid',
    gridTemplateColumns: '60% 40%',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
  },
  userClass: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  gray900: {
    color: theme.palette.colors.gray[900],
    wordBreak: 'break-word',
  },
  gray9001: {
    color: theme.palette.colors.gray[900],
    textAlign: 'end',
    wordBreak: 'break-word',
  },
  gray500: {
    color: theme.palette.colors.gray[500],
  },
  gray400: {
    color: theme.palette.colors.gray[400],
    wordBreak: 'break-word',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  avatar: {
    height: '24px',
    width: '24px',
    borderRadius: '50%',
    color: theme.palette.colors.system.white,
    backgroundColor: theme.palette.colors.gray[900],
    fontSize: '10px',
    fontWeight: 600,
    fontFamily: 'Graphik',
  },
  unitidClass: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  label: {
    textTransform: 'capitalize',
  },
}));
