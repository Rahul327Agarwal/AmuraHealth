import { makeStyles } from 'tss-react/mui';
import { IProps } from './EventNote.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()(
  (theme, { eventHeight, afterHeight, isAFB, disabled, isRsvpDecline, isRsvpAccept, opacity, invisible, beforeHeight }) => ({
    eventContainer: {
      borderRadius: '4px',
      boxSizing: 'border-box',
      background: isAFB || isRsvpAccept ? theme.palette.colors.green[50] : theme.palette.colors.system.white,
      textDecoration: !isAFB && isRsvpDecline ? 'line-through' : 'none',
      border: `1px solid ${theme.palette.colors.green[200]}`,
      userSelect: 'none',
      overflow: 'hidden',
      opacity: opacity || 1,
      visibility: invisible ? 'hidden' : 'unset',
      pointerEvents: disabled ? 'none' : 'unset',
    },
    eventContentWrapper: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      height: '100%',
    },
    beforeBox: {
      boxSizing: 'border-box',
      height: `${beforeHeight}px`,
      background: theme.palette.colors.green[200],
    },
    eventContentBox: {
      flexGrow: 1,
      display: 'flex',
      alignItems: isAFB ? 'center' : 'flex-start',
    },
    eventContent: {
      padding: eventHeight - afterHeight - beforeHeight > 22 ? '4px' : '0px 4px',
      color: theme.palette.colors.gray[500],
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      boxSizing: 'border-box',
    },
    afterBox: {
      boxSizing: 'border-box',
      height: `${afterHeight}px`,
      background: theme.palette.colors.green[200],
    },
    iconDiv: {
      width: '12px',
      height: '12px',
      background: theme.palette.colors.system.white,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      left: '4%',
      bottom: '4%',
    },
  })
);
