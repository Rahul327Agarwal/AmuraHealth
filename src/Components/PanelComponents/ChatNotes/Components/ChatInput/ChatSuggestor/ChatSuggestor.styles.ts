import { makeStyles } from 'tss-react/mui';
export const useStyles = makeStyles<
  {
    mainBoxShadowDisabled?: boolean;
  } & any
>()((theme, props) => ({
  contentEditableInput: {
    color: '#252427',
    fontSize: '16px',
    lineHeight: '19px',
    fontWeight: 400,
    outline: 'none !important',
    // margin: '8.5px',
    zIndex: 1,
    flex: 1,
    // width: 'calc(100% - 80px)',
    width: '100%',
    maxHeight: '95px',
    // overflow: 'auto',
    overflowX: 'hidden',
    border: 'none',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    // display: 'flex',
    resize: 'none',
    '& span.tagged': {
      padding: '0 !important',
      backgroundColor: 'transparent !important',
      color: theme.palette.colors.blue[400],
    },
    '& font': {
      color: `#252427 !important`,
    },
    padding: '10px',
  },
  contentEditableInputContainer: {
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.05);',
    border: '1px solid ' + theme.palette.colors.gray[50],
    borderRadius: '4px',
    height: '100%',
    width: '100%',
  },
  messageGrid: {
    minHeight: '88px',
    padding: '20px',
    background: theme.palette.colors.system.white,
    // boxSizing: 'border-box',
    width: '100%',
    position: 'relative',
    zIndex: 500,
    display: 'flex',
    gap: '16px',
  },
  messageBox: {
    width: '100%',
    boxShadow: props.mainBoxShadowDisabled ? undefined : '2px 2px 54px rgba(0, 0, 0, 0.14);',
    display: 'flex',
  },
  //Placeholder
  placeholderSpan: {
    color: '#AEAEAE',
    fontSize: '16px',
    lineHeight: '19px',
    fontWeight: 400,
    position: 'absolute',
    padding: '0 10px',
    zIndex: 2,
  },
  visibilty: {
    visibility: 'visible',
    pointerEvents: 'none',
    userSelect: 'none',
  },
  visibiltyNone: {
    visibility: 'hidden',
    pointerEvents: 'none',
    userSelect: 'none',
  },
  //Attachment
  attachmentIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '4px',
    cursor: 'pointer',
    height: '48px',
    width: '48px',
    marginTop: 'auto',
  },
  // Send Icon
  sendIconDiv: {
    display: 'flex',
    height: 'auto',
    alignItems: 'end',
  },

  //
  //
  //
  //
  //
  //
  playpause: {
    cursor: 'pointer',
    position: 'relative',
    transform: props?.isSmall ? 'scale(0.7) translateY(-5px)' : 'initial',
  },

  border0T16B: {
    // borderRadius: "0px 0px 16px 16px",
    // borderTop: "1px solid #2C2C2C",
  },

  sendIcon: {
    background: '#252427',
    height: '48px',
    width: '48px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: '4px',
    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.25), inset 0px 4px 14px rgba(255, 255, 255, 0.25)',
    '& svg': {
      height: '24px',
      width: '24px',
      '& path': {
        fill: theme.palette.colors.system.white,
      },
    },
  },
  disabledSendIcon: {
    background: theme.palette.colors.gray[100],
    height: '48px',
    width: '48px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: '4px',
    '& svg': {
      height: '24px',
      width: '24px',
      '& path': {
        fill: '#A6A6A6',
      },
    },
  },
  disableSend: {
    margin: '0px 0px 4px 0px',
    '& circle': {
      fill: '#626262',
    },
    '& path': {
      fill: '#AEAEAE',
    },
  },
  attachmentBelow: {
    display: 'flex',
    alignItems: 'end',
    height: '100%',
  },

  tagOptions: {
    position: 'absolute',
    bottom: '0px',
    cursor: 'pointer',
  },
  displayFlexColumn: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
  },
  fileUploadDiv: {
    backgroundColor: '#FFFFFF',
    borderRadius: '32px 32px 0px 0px',
    position: 'absolute',
    bottom: '88px',
    boxSizing: 'border-box',
    width: '100%',
    boxShadow: '0px 4px 24px 0 rgb(0 0 0 / 14%)',
    zIndex: 300,
    maxHeight: '400px',
    overflow: 'auto',
  },
  tagDiv: {
    backgroundColor: '#FFFFFF',
    padding: '28px 0',
    borderRadius: '32px 32px 0px 0px',
    position: 'absolute',
    bottom: '88px',
    boxSizing: 'border-box',
    width: '100%',
    boxShadow: '0px 4px 24px 0 rgb(0 0 0 / 14%)',
    zIndex: 1000,
    maxHeight: '400px',
    '&.replyMessage': {
      padding: '28px 22px 0px 22px',
      zIndex: 200,
    },
  },
  tagScrollDiv: {
    overflow: 'auto',
    padding: '0 22px',
    maxHeight: `${400 - 28 * 2}px`,
  },
  tagDivPreviewHeight: {
    maxHeight: 'none !important',
  },
  tagLabel: {
    color: '#5C5A61',
    //fontfamily: "Inter",
    fontSize: '16px',
    lineHeight: '19px',
    fontWeight: 400,
    cursor: 'pointer',
    '& :hover': {
      color: '#252427',
    },
  },
  tag: {
    color: '#A0A0A0',
  },
  tagOption: {
    // height: "36px",
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    padding: '11px 8px',
    borderBottom: '0.5px solid #E1E1E1',
  },
  highlightOption: {
    color: '#252427 !important',
    background: '#F1F1F1',
  },
  padding6TB4RL: {
    padding: '16px',
  },
  attachmentName: {
    color: '#252427',
    //fontfamily: "Inter",
    fontSize: '14px',
    lineHeight: '21px',
    fontWeight: 400,
  },
  attachmentFileSize: {
    color: '#252427',
    //fontfamily: "Inter",
    fontSize: '12px',
    lineHeight: '18px',
    fontWeight: 400,
  },
  attachmentFileFormat: {
    color: '#252427',
    //fontfamily: "Inter",
    fontSize: '10px',
    lineHeight: '12px',
    fontWeight: 700,
  },
  attachmentFileDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C2C2C',
    borderRadius: '5px',
    height: '133px',
  },
  attachmentFileIcon: {
    border: '2px solid #252427',
    borderRadius: '5px',
    height: '35px',
    width: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
  },
  attachmentDescriptionDiv: {
    display: 'grid',
    gridTemplateColumns: '35px auto 12px',
    gridGap: '4px',
    borderRadius: '16px 16px 0px 0px',
    background: '#FFFFFF',
    bottom: '56px',
    boxSizing: 'border-box',
    width: '100%',
    alignItems: 'center',
  },
  marginB4: {
    marginBottom: '4px',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  discardFile: {
    cursor: 'pointer',
    '& svg': {
      '& path': {
        fill: '#252427',
      },
    },
  },
  recordWrapper: {
    display: 'flex',
  },
  middleContainer: {
    flex: 1,
    minHeight: '50px',
  },
  scrollDownButton: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: '#E1E1E1',
    position: 'absolute',
    cursor: 'pointer',
    top: '-60px',
    right: '20px',
    zIndex: 1,
  },
  closeIocn: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'flex-end',
    paddingRight: '10px',
    cursor: 'pointer',
  },
  cursor: {
    cursor: 'pointer',
  },
  closeStyle: {
    top: '0px',
    left: '3px',
    position: 'absolute',
    '& svg': {
      padding: '0px 0px 0px 0px',
      cursor: 'pointer',
      height: '10px !important',
    },
  },
  clearRecord: {
    color: '#FF8989',
    cursor: 'pointer',
  },
  voiceRecordingdiv: {
    width: '85%',
  },
  footerStyles: {
    gap: '10px',
    boxShadow: 'none !important',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    display: 'grid',
    gridTemplateColumns: '100px 100px',
    alignItems: 'stretch',
    padding: '20px !important',
  },
  disableAttachment: {
    '& path': {
      fill: theme.palette.colors.gray[400],
    },
  },
  btnHeight: {
    height: '44px',
  },
  popUpHeading: {
    color: theme.palette.colors.gray[900],
    margin: '0px 40px 10px 40px',
    textAlign: 'center',
    wordBreak: 'break-all',
  },

  unreadMessagesCount: {
    position: 'absolute',
    bottom: 30,
    right: 10,
    background: theme.palette.colors.gray[900],
    color: theme.palette.colors.system.white,
    padding: '5px',
    borderRadius: '50%',
    height: '20px',
    width: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
