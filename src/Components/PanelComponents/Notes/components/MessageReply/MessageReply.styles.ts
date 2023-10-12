import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  replyMessageContainer: {
    padding: '16px',
    margin: '10px 0 8px 0',
    zoom: 0.8,
    borderRadius: '8px',
    cursor: 'pointer',
    '& span': {
      width: '100%',
    },
    '&.bgDarkRight': {
      background: ' #E1E1E1',
    },
    '&.Right': {
      background: theme.palette.colors.gray[50],
    },
    '&.switchBgRight': {
      background: theme.palette.colors.gray[25],
    },
    '&.bgTeamRight': {
      background: theme.palette.colors.gray[50],
    },
    '&.Left': {
      background: theme.palette.colors.gray[25],
    },
    '&.switchBgLeft': {
      background: theme.palette.colors.gray[50],
    },
  },
  bgcolor: {
    backgroundColor: theme.palette.colors.gray[50],
  },
  messageArea: {
    display: 'flex',
    alignItems: 'center',
  },
  voiceNote: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
  },
  duration: {
    width: '25px',
  },
  messageContainer: {
    display: 'flex',
    backgroundColor: '#fff',
  },
  messageContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    width: '100%',
    '&.attachment': {
      width: '70%',
    },
  },
  thumbnaillContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // width: '30%',
    maxWidth: '30%',
    minWidth: '70px',
    '& img': {
      width: '100%',
      height: '69px',
      objectFit: 'contain',
    },
    '& video': {
      // height: '126px',
      objectFit: 'cover',
    },
  },
  replyMessageBox: {
    marginLeft: '40px',
    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.01)',
    borderRadius: '8px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '85%',
    marginTop: '8px',
  },
  replyMessage: {
    textOverflow: 'ellipsis',
    WebkitLineClamp: 3,
    display: '-webkit-box',
    wordBreak: 'break-word',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    margin: '0 8px 0 0',
    '& svg': {
      width: '20px',
      height: '20px',
      marginRight: '8px',
    },
  },
  fileName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '75% !important',
    display: 'inline-block',
  },
  replyLine: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'inline-block',
    '&.title': {
      fontWeight: 600,
    },
    '&.kbPostDescription': {
      WebkitLineClamp: 2,
      display: '-webkit-box',
      wordBreak: 'break-word',
      WebkitBoxOrient: 'vertical',
      whiteSpace: 'unset',
    },
  },
  replyMessageWrapper: {
    display: 'flex',
    backgroundColor: theme.palette.colors.gray[50],
    flexDirection: 'column',
  },
  replyPrivacyTag: {
    color: theme.palette.colors.theme.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    minWidth: 'fit-content',
  },
  noteTag: {
    color: '#007AFF',
  },
  messageText: {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
}));
