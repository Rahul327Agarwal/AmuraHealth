import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  popperStyle: {
    zIndex: 1600,
  },
  paperStyle: {
    background: `${theme.palette.colors.system.white} !important`,
    // boxShadow: 'none !important',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px',
    gap: '8px',
    borderRadius: '4px',
    order: 1,
    filter: 'drop-shadow(0px 14px 74px rgba(0, 0, 0, 0.15))',
    maxWidth: '250px',
    position: 'relative',
  },
  vector: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '0px 0px 0px 16px',
    gap: '4px',
    height: '8px',
    position: 'absolute',
    top: -8,
  },
  titleHeading: {
    color: theme.palette.colors.gray[500],
    wordBreak: 'break-word',
  },
  dateIcon: {
    display: 'flex',
    alignItems: 'center',
    height: '16px',
    gap: '4px',
  },
  dateLabel: {
    width: '52px',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    color: theme.palette.colors.gray[500],
  },
  timeLabel: {
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    color: theme.palette.colors.gray[500],
  },
  footerDiv: {
    width: '100%',
    display: 'flex',
    gap: '16px',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  clockDiv: {
    display: 'flex',
    alignItems: 'center',
    width: '110px',
    gap: '4px',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '24px',
    height: '24px',
    fontSize: '12px',
  },
}));
