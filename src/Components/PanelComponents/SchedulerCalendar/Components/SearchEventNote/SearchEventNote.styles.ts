import { makeStyles } from 'tss-react/mui';
import { IProps } from './SearchEventNote.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, { beforeHeight, isRsvpDecline, afterHeight, isRsvpAccept, isAFB }) => ({
  eventContainer: {
    boxSizing: 'border-box',
    backgroundColor: isRsvpAccept || isAFB ? theme.palette.colors.green[50] : theme.palette.colors.system.white,
    // border: `1px solid ${theme.palette.colors.system.white}`,
    border: !isAFB && !isRsvpAccept && `1.5px solid ${theme.palette.colors.green[200]}`,
    overflow: 'hidden',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    padding: !isAFB && '4px 0',
    height: isAFB && `${beforeHeight + afterHeight + 36}px`,
  },
  beforeBox: {
    boxSizing: 'border-box',
    height: `${beforeHeight}%`,
    background: theme.palette.colors.green[200],
  },
  eventBodyDiv: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '4px 0px',
    flexGrow: 1,
    justifyContent: 'center',
  },
  eventContentBox: {
    display: 'grid',
    alignItems: 'center',
    gap: '15px',
    padding: '0 8px',
    gridTemplateColumns: '1fr auto',
    justifyContent: 'center',
    textDecoration: isRsvpDecline ? 'line-through' : 'none',
  },
  afterBox: {
    boxSizing: 'border-box',
    height: `${afterHeight}%`,
    background: theme.palette.colors.green[200],
  },
  time: {
    color: theme.palette.colors.gray[500],
  },
  title: {
    color: theme.palette.colors.gray[500],
    // width: '64px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  roleDiv: {
    display: 'flex',
    gap: '4px',
    backgroundColor: isRsvpAccept || isAFB ? theme.palette.colors.system.white : theme.palette.colors.gray[50],
    borderRadius: '16px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 4px 0 2px',
    marginLeft: '8px',
    color: theme.palette.colors.gray[500],
    width: 'fit-content',
  },
}));
