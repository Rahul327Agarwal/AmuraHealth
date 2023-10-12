import { makeStyles } from 'tss-react/mui';
import { IProps } from './RightChatWrapper.type';

export const useStyles = makeStyles<IProps>()((theme, props) => ({
  chatRowWrapper: {
    maxWidth: props?.maxWidth ?? 'unset',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: props?.isCommonMessage ? '16px' : '20px',
    paddingRight: '10px',
    marginBottom: '20px',
    transition: 'all .3s ease-in-out',
  },
  chatWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    minWidth: props?.isCommonMessage ? '100%' : '100px',
    maxWidth: props?.isCommonMessage ? '100%' : '300px',
    alignItems: 'flex-end',
  },
  chatBubble: {
    backgroundColor: props?.bgColor || theme.palette.colors.gray[50],
    borderRadius: props?.isCommonMessage ? '8px' : '8px 0px 8px 8px',
    minHeight: '52px',
    paddingTop: '20px',
    paddingRight: '16px',
    paddingBottom: '16px',
    paddingLeft: '16px',
    position: 'relative',
    overflow: 'hidden',
    wordBreak: 'break-word',
    width: 'fit-content',
    color: theme.palette.colors.gray[900],
    minWidth: 'inherit',
    maxWidth: 'inherit',
    "&[data-bg='grey25']": {
      backgroundColor: theme.palette.colors.gray[25],
    },
    "&[data-bg='grey100']": {
      backgroundColor: theme.palette.colors.gray[100],
    },
    "&[data-bg='grey50']": {
      backgroundColor: theme.palette.colors.gray[50],
    },
  },
  chatRow: {
    display: 'flex',
  },
  chatMessage: {
    display: 'flex',
    gap: '10px', // disabled to prevent gap betwee
    flexDirection: 'column',
    flexGrow: 1,
  },
  actionMenu: {
    opacity: 0,
    transition: 'opacity .3s ease-in-out',
    "&[data-show='true']": {
      opacity: 1,
    },
    "&[data-poistion='absolute']": {
      position: 'absolute',
      top: '5px',
      right: '5px',
      zIndex: 1,
    },
    "&[data-poistion='unset']": {
      translate: 5,
    },
  },
  chatTime: {
    color: theme.palette.colors.gray[400],
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: '8px',
    minWidth: 'inherit',
    maxWidth: 'inherit',
  },
  resendText: {
    cursor: 'pointer',
    color: theme.palette.colors.red[700],
  },
  chatPrompt: {
    marginBottom: '8px',
  },
  privacyTag: {
    color: theme.palette.colors.theme.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    marginTop: '8px',
    marginBottom: '-5px',
    marginRight: '-5px',
    minWidth: 'fit-content',
  },
  starIconTag: {
    marginTop: '8px',
    marginBottom: '-5px',
  },
  readMoreMessage: {
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
  preview: {
    display: 'flex',
    gap: '6px',
  },
  previewImage: {
    width: '68px',
    height: '69px',
  },
}));
