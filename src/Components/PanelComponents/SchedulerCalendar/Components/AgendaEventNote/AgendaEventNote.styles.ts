import { makeStyles } from 'tss-react/mui';
import { IProps } from './AgendaEventNote.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, { isRsvpAccept, isRsvpDecline, isAFB }) => ({
  EventsCards: {
    backgroundColor: isRsvpAccept || isAFB ? theme.palette.colors.green[50] : theme.palette.colors.system.white,
    // border: isRsvpDecline ? `1.5px solid ${theme.palette.colors.green[50]}` : 'none',
    border: !isAFB && !isRsvpAccept && `1.5px solid ${theme.palette.colors.green[200]}`,
    // padding: isAFB ? '4px 16px' : '16px 16px',
    padding: '16px 16px',
    borderRadius: '6px',
    marginBottom: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    borderTop: isAFB && `12px solid ${theme.palette.colors.green[200]}`,
    borderBottom: isAFB && `12px solid ${theme.palette.colors.green[200]}`,
  },
  titleStyle: {
    color: theme.palette.colors.theme.primary,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textDecoration: isRsvpDecline ? 'line-through' : 'none',
    width: '320px',
    wordBreak: 'break-word',
  },
  desStyle: {
    color: theme.palette.colors.gray[500],
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    wordBreak: 'break-all',
    textDecoration: isRsvpDecline ? 'line-through' : 'none',
  },
  eventTime: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: isRsvpDecline ? 'line-through' : 'none',
  },
  timeDiv: {
    display: 'flex',
    gap: '10px',
    color: theme.palette.colors.gray[500],
  },
  roleDiv: {
    display: 'flex',
    gap: '4px',
    backgroundColor: isRsvpAccept || isAFB ? theme.palette.colors.system.white : theme.palette.colors.gray[50],
    borderRadius: '16px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 4px 0 2px',
    color: theme.palette.colors.gray[500],
  },
  timeRoleDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
