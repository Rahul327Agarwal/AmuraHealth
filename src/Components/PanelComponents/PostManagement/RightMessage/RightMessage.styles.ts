import { makeStyles } from 'tss-react/mui';
import { IProps } from './RightMessage.types';
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    margin: '0px 8px 20px 8px',
  },
  partyMessage: {
    color: theme.palette.colors.theme.primary,
  },
  messageBody: {
    margin: '24px 0px  24px 42px',
  },
  messageText: {
    color: theme.palette.colors.theme.primary,
    wordBreak: 'break-word',
  },
  attachedImg: {},
  mediaImg: {
    width: '100%',
    height: '220px',
    borderRadius: '8px',
    marginBottom: '16px !important',
  },
  imgTitle: {
    color: '#5C5A61 !important',
  },
  AudioImg: {
    width: '100%',
    height: '160px',
    borderRadius: '8px',
    background: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  attachedVideo: {},
  recipeVideo: {
    width: '100%',
    height: '220px',
    borderRadius: '8px',
    marginBottom: '16px !important',
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  headerwrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: theme.palette.colors.gray[25],
    color: theme.palette.colors.gray[500],
  },
  headingTitle: {
    color: '#5C5A61',
  },
  timeFooter: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    gap: '9px',
  },
  reDoStyle: {
    padding: '0 !important',
  },
  messageSent: {
    color: '#5C5A61',
  },
  // BEGIN LEFT MESSAGE STYLE //
  leftMessageBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    background: theme.palette.colors.gray[25],
    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.01)',
    borderRadius: '0px 8px 8px 8px',
    padding: '16px',
    overflow: 'hidden',
    '&.switchBg': {
      background: theme.palette.colors.gray[50],
    },
  },
  leftAudioBox: {
    padding: '18px 16px',
    margin: '0 -16px -16px',
    background: theme.palette.colors.gray[25],
  },
  leftReadDetailBox: {
    color: theme.palette.colors.gray[400],
  },
  // END LEFT MESSAGE STYLE //
  // BEGIN RIGTH MESSAGE STYLE //
  rightMessageBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    background: theme.palette.colors.gray[50],
    padding: '16px',
    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.01)',
    borderRadius: '8px 0px 8px 8px',
    overflow: 'hidden',
    '&.bgDark': {
      background: theme.palette.colors.gray[100],
    },
    '&.switchBg': {
      background: theme.palette.colors.gray[25],
    },
  },
  rightAudioBox: {
    padding: '18px 16px',
    margin: '0 -16px -16px',
    background: theme.palette.colors.gray[50],
  },
  rightReadDetailBox: {
    color: theme.palette.colors.gray[400],
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  privacyTag: {
    color: theme.palette.colors.theme.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    marginBottom: '-5px',
    marginRight: '-5px',
  },
  // END RIGTH MESSAGE STYLE //

  labelStyle: {
    display: 'grid',
    color: theme.palette.colors.gray[500],
    fontSize: '15px',
    fontFamily: 'Graphik',
    transition: '.3s ease',
    alignItems: 'center',
    gridTemplateColumns: '1fr',
    '& .iconStyle': { display: 'flex' },
    '& .textStyle': { display: 'flex' },
  },
}));
