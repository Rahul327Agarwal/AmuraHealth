import { makeStyles } from 'tss-react/mui';
import { IProps } from './MessageInput.types';
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has parameter type of Identifier instead of ObjectPattern (e.g. `(props) => ({...})` instead of `({color}) => ({...})`).
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, props) => ({
  mainAttachmentWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: '88px',
    zIndex: -100,
  },
  attachmentWrapper: {
    position: 'relative',
    height: '100%',
  },
  messageInputContainer: {
    marginTop: 'auto',
    minHeight: '88px',
    padding: '20px',
    background: theme.palette.colors.system.white,
    boxShadow: '0px 4px 24px rgb(0 0 0 / 14%)',
    boxSizing: 'border-box',
    width: '100%',
    position: 'relative',
    zIndex: 101,
    display: 'grid',
    gridTemplateColumns: '80% 20%',
  },
  firstContainer: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
  },
  middleContainer: {
    margin: 'auto 0px',
  },
  lastContainer: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'end',
  },

  // BEGIN CHAT INPUT STYLE //
  chatInputWrapper: {
    position: 'relative',
    boxShadow: '2px 2px 54px rgba(0, 0, 0, 0.05)',
    background: theme.palette.colors.system.white,
    padding: '14px 0px 14px 12px',
    boxSizing: 'border-box',
    minHeight: '48px',
    cursor: 'text',
  },
  inputPlaceholder: {
    color: theme.palette.colors.gray[400],
    position: 'absolute',
    pointerEvents: 'none',
    userSelect: 'none',
    top: '50%',
    left: '12px',
    transform: 'translateY(-50%)',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    '&.hidden': { display: 'none' },
  },
  suggestionText: {
    userSelect: 'none',
    pointerEvents: 'none',
    color: `${theme.palette.colors.gray[400]} !important`,
    position: 'absolute',
    top: '14px',
    left: '12px',
    bottom: '14px',
    overflow: 'hidden !important',
    '& span': { visibility: 'hidden' },
  },
  suggestionTextError: {
    position: 'absolute',
    top: 'calc(-50% - 10px)',
    left: '50%',
    translate: '-50%',
    color: theme.palette.colors.system.white,
    padding: '4px 8px',
    borderRadius: '4px',
    backgroundColor: theme.palette.colors.red[700],
  },
  inputStyle: {
    color: theme.palette.colors.theme.primary,
    outline: 'none !important',
    border: 'none !important',
    borderRadius: '4px',
    boxSizing: 'border-box',
    //width: "calc(100% - 50px)",
    maxHeight: '76px',
    overflow: 'auto',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',

    resize: 'none',
    '& mark': {
      color: theme.palette.colors.blue[700],
      background: 'none',
    },
    '& font': {
      color: `${theme.palette.colors.theme.primary} !important`,
    },
  },
  attachmentIcon: {
    position: 'absolute',
    right: '0',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  // END CHAT INPUT STYLE //
  sendButton: {
    height: '48px',
    width: '48px !important',
    minWidth: 'auto !important',
    padding: '0 !important',
  },

  tagDiv: {},
  tagOption: {
    padding: '20px',
  },
  highlightOption: {
    background: 'lightblue',
  },
  tag: {},
  tagLabel: {},
  tagStyle: {
    color: theme.palette.colors.blue[700],
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollDownButton: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: '#E1E1E1',
    position: 'absolute',
    cursor: 'pointer',
    bottom: '105px',
    right: '20px',
    zIndex: 99,
  },
}));
