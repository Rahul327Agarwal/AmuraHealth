import { makeStyles } from 'tss-react/mui';

const scalePixel = (unite: string, a: number, b?: number, c?: number, d?: number): string => {
  const radio = 0.8;
  let pixel = `${Math.round(a * radio)}${unite}`;
  pixel += b !== undefined ? ` ${Math.round(b * radio)}${unite}` : '';
  pixel += c !== undefined ? ` ${Math.round(c * radio)}${unite}` : '';
  pixel += d !== undefined ? ` ${Math.round(d * radio)}${unite}` : '';
  return pixel;
};

export const useStyles = makeStyles()((theme) => ({
  replyMessageContainer: {
    padding: scalePixel('px', 16),
    // transform: 'scale(0.8)',
    // transformOrigin: 'top left',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: theme.palette.colors.system.white,
    display: 'flex',
    overflow: 'hidden',
  },
  profile: {
    maxWidth: 200,
    scale: '0.8',
    transformOrigin: 'top left',
  },
  messageContent: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    '&.attachment': {
      width: '70%',
    },
  },
  thumbnaillContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    margin: scalePixel('px', -16, -16, -16, 16),
    '& img': {
      width: '100%',
      height: scalePixel('px', 126),
      objectFit: 'contain',
    },
  },
  replyMessageBox: {
    marginLeft: scalePixel('px', 40),
    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.01)',
    borderRadius: '8px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '85%',
    marginTop: scalePixel('px', 8),
  },
  replyMessage: {
    fontSize: scalePixel('px', 16),
    textOverflow: 'ellipsis',
    WebkitLineClamp: 3,
    display: '-webkit-box',
    wordBreak: 'break-word',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    '& svg': {
      width: scalePixel('px', 20),
      height: scalePixel('px', 20),
      marginRight: scalePixel('px', 8),
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
    fontSize: scalePixel('px', 16),
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
    fontSize: scalePixel('px', 16),
    color: '#007AFF',
  },
}));
