import { makeStyles } from 'tss-react/mui';
import { LEFT_SPACE, RIGHT_SPACE } from './Message.function';
import { IProps } from './Message.types';
import { Padding } from '@mui/icons-material';

export const useStyles = makeStyles<IProps>()((theme, { message, ...props }) => ({
  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    margin: '0px 10px 20px 10px',
    backgroundColor: props.highlightBg ? '#F5F5F5' : '',
  },
  partyMessage: {
    color: theme.palette.colors.theme.primary,
    '& span.team': {
      color: '#007AFF',
    },
    '& span.tagged': {
      padding: '0 !important',
      backgroundColor: 'transparent !important',
      color: theme.palette.colors.blue[400],
    },
  },
  rightMessageContainer: {
    marginLeft: 'auto !important',
    // maxWidth:
    //   (message.isReply ||
    //     message.isAttachment ||
    //     message.prompt ||
    //     message.isVoiceNote) &&
    //   "260px",
    flexDirection: (message.isReply || message.isAttachment || message.prompt || message.isVoiceNote
      ? 'column'
      : 'row-reverse !important') as any,
  },
  leftMessageContainer: {
    display: message.isReply || message.isAttachment || message.prompt || message.isVoiceNote ? 'flex' : 'grid !important',
    gridAutoColumns:
      message.isReply || message.isAttachment || message.prompt || message.isVoiceNote ? '' : 'max-content !important',
  },
  hightLightText: {
    color: theme.palette.colors.theme.primary,
    '& mark': {
      backgroundColor: '#33252427',
      padding: '0px',
      //opacity:0.2
    },
    '& span': {
      color: '#007AFF',
    },
    '& span.tagged': {
      padding: '0 !important',
      backgroundColor: 'transparent !important',
      color: theme.palette.colors.blue[400],
    },
  },
  replyMessage: {
    margin: '-7px -15px -15px -15px',
    '&.closeIocn': {
      zIndex: 200,
    },
  },
  // BEGIN LEFT MESSAGE STYLE //
  leftMessageBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginLeft: LEFT_SPACE,
    background: theme.palette.colors.gray[25],
    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.01)',
    borderRadius: '0px 8px 8px 8px',
    padding: '8px 16px 16px 16px',
    overflow: 'hidden',
    marginRight: 'auto',
    wordBreak: 'break-word',
    maxWidth: '264px',
    '&.switchBg': {
      background: theme.palette.colors.gray[50],
    },
    minWidth: '100px',
  },
  downArrow: {
    fill: '#5C5A61',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  messageArea: {
    display: 'flex',
  },
  downArrowBG: {
    position: 'absolute',
    width: '25px',
    top: 0,
    right: 0,
    height: '25px',
    background: theme.palette.colors.gray[25],
    filter: 'blur(5px)',
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
  downArrowWrapper: {
    position: 'relative',
    float: 'right',
    left: '10px',
    zIndex: 100,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  leftAudioBox: {
    padding: '18px 16px',
    margin: '0 -16px -16px',
    background: theme.palette.colors.gray[25],
  },
  leftReadDetailBox: {
    margin: `0 ${LEFT_SPACE}`,
    color: theme.palette.colors.gray[400],
  },
  // END LEFT MESSAGE STYLE //
  // BEGIN RIGTH MESSAGE STYLE //
  rightMessageBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    background: theme.palette.colors.gray[50],
    padding: '8px 16px 16px 16px',
    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.01)',
    borderRadius: '8px 0px 8px 8px',
    overflow: 'hidden',
    marginLeft: 'auto !important',
    minWidth: '100px',
    wordBreak: 'break-word',
    width: 'fit-content',
    maxWidth: '264px',
    '&.bgDark': {
      background: ' #E1E1E1',
    },
    '&.switchBg': {
      background: theme.palette.colors.gray[25],
    },
    '&.bgTeam': {
      background: theme.palette.colors.gray[50],
    },
  },
  rightAudioBox: {
    padding: '18px 16px',
    margin: '0 -16px -16px',
    //minWidth: '300px',
    background: theme.palette.colors.gray[50],
  },
  rightReadDetailBox: {
    color: theme.palette.colors.gray[400],
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    // margin: "8px 0 0 65px",
    marginTop: '8px',
    maxWidth: (message.isReply || message.isAttachment || message.prompt || message.isVoiceNote) && '260px',
    marginLeft: 'auto',
    minWidth: '100px',
  },
  rightMessageMargin: {
    margin: 'inherit',
  },
  privacyTag: {
    color: theme.palette.colors.theme.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    marginBottom: '-5px',
    marginRight: '-5px',
    minWidth: 'fit-content',
  },
  headerTxtDiv: {
    display: 'flex',
    //alignItems:"center",
  },
  marginright: {
    marginLeft: '8px',
  },
  replyBox: {
    //background: theme.palette.colors.system.white,
    //padding: "0px",
    marginBottom: '8px',
    display: 'flex',
    flexDirection: 'column',
    //gap: "8px",
  },
  fullWidth: {
    width: '100% !important',
  },
  autoWidth: {
    width: 'fit-content',
    maxWidth: '100%',
  },
  textEnd: {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'end',
    flexDirection: 'column',
  },
  textCenter: {
    display: 'block',
  },
  textColor: {
    color: '#007AFF',
  },
  resend: {
    cursor: 'pointer',
    color: theme.palette.colors.red[700],
  },
  // END RIGTH MESSAGE STYLE //

  arrowWraper: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    width: '100%',
  },
  download: {
    color: '#252427',
  },
  downloadIconWrap: {
    padding: '0',
  },
  downloadMenu: {
    '& .MuiTooltip-tooltip': {
      marginTop: '0 !important',
      translate: '-9px !important',
    },
  },
  bluedotWraper: {
    // display: 'grid',
    // gridTemplateColumns: 'calc(100% - 34px) 34px',
  },
  text: {
    display: 'block',
    // marginTop:'5px',
    flex: 1,
  },
  bluedotFlex: {
    display: 'flex',
    gap: '6px',
  },
  blueDot: {
    height: '22px',
    width: '22px',
    borderRadius: '50%',
    border: '4px solid #FFFFFF',
    background: '#007AFF',
    display: 'block',
    boxShadow: '0px 4px 4px 0px #0000000A',
    cursor: 'pointer',
  },
  textBlue: {
    color: '#007AFF',
  },
  mb12: {
    marginBottom: '12px',
  },
  msgWrap: {
    background: '#FFFFFF',
    padding: '16px',
    width: '235px',
  },
}));
