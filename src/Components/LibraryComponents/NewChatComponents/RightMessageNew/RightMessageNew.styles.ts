import { makeStyles } from "tss-react/mui";
import { IProps } from "./RightMessageNew.types";
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has body type of BlockStatement instead of ObjectExpression.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has parameter type of Identifier instead of ObjectPattern (e.g. `(props) => ({...})` instead of `({color}) => ({...})`).
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has parameter type of Identifier instead of ObjectPattern (e.g. `(props) => ({...})` instead of `({color}) => ({...})`).
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has parameter type of Identifier instead of ObjectPattern (e.g. `(props) => ({...})` instead of `({color}) => ({...})`).
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, props) => ({
  leftMessage: {
    maxWidth: "calc(100% - 48px)",
    width: "fit-content",
    minWidth: "36px",
  },
  box: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "2px 16px",
    border: "1px solid red",
  },
  messageBox: {
    backgroundColor: theme.palette.colors.gray[50],
    borderRadius: props.isFirstMessage ? "8px 0px 8px 8px" : "8px",
    padding: "16px",
  },
  message: {
    color: theme.palette.colors.gray[500],
    //fontfamily: 'Inter',
    fontSize: "14px",
    lineHeight: "21px",
    fontWeight: 400,
  },
  opacity: {
    opacity: "1 !important",
  },
  senderName: {
    color: props.senderFontColor
      ? props.senderFontColor
      : theme.palette.colors.gray[500],
    // fontFamily: "Inter",
    // fontSize: "14px",
    // lineHeight: "21px",
    // fontWeight: 400,
  },
  replySenderName: {
    color: props.replySenderFontColor
      ? props.replySenderFontColor
      : theme.palette.colors.gray[500],
    // fontFamily: "Inter",
    // fontSize: "14px",
    // lineHeight: "21px",
    // fontWeight: 400,
  },
  messageTime: {
    color: theme.palette.colors.gray[900],
    //fontfamily: "Inter",
    fontSize: "12px",
    lineHeight: "18px",
    fontWeight: 400,
    opacity: 0.5,
  },
  divFloatRight: {
    textAlign: "right",
  },
  avatar: {
    width: "36px",
    height: "36px",
    color: "#FFFFFF",
    margin: "0px 4px",
  },
  replyavatar: {
    width: "18px",
    height: "18px",
    color: "#FFFFFF",
    //margin: "0px 4px",
  },
  repliedmsg: {
    color: theme.palette.colors.gray[400],
  },
  margin6L: {
    marginLeft: "6px",
  },
  avatarDiv: {
    display: "flex",
    alignItems: "end",
  },
  privacySpan: {
    color: theme.palette.colors.gray[900],
    marginRight: "4px",
  },
  padding2TB4LR: {
    padding: "0px 4px",
  },
  padding6TB8LR: {
    padding: "4px 8px",
  },
  replyBox: {
    background: theme.palette.colors.system.white,
    //borderRadius: "5px",
    cursor: "pointer",
    padding: "16px",
    display: "flex",
  },
  padding6TB4RL: {
    padding: "6px 4px",
  },
  attachmentName: {
    color: theme.palette.colors.gray[500],
    // fontFamily: "Inter",
    // fontSize: "14px",
    // lineHeight: "21px",
    // fontWeight: 400,
  },
  attachmentFileSize: {
    color: theme.palette.colors.gray[500],
    // fontFamily: "Inter",
    // fontSize: "12px",
    // lineHeight: "18px",
    // fontWeight: 400,
  },
  attachmentFileFormat: {
    color: theme.palette.colors.gray[500],
    //fontfamily: "Inter",
    fontSize: "10px",
    lineHeight: "12px",
    fontWeight: 700,
  },
  attachmentFileDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.colors.system.white,
    //borderRadius: "5px",
    height: "70px",
    minWidth: "133px",
  },
  attachmentFileIcon: {
    border: `2px solid ${theme.palette.colors.gray[500]}`,
    borderRadius: "5px",
    height: "35px",
    width: "35px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },
  attachmentDescriptionDiv: {
    display: "grid",
    gridTemplateColumns: "35px auto",
    gridGap: "4px",
  },
  marginB4: {
    marginBottom: "4px",
  },
  attachmentIcon: {
    cursor: "pointer",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  wordBreak: {
    wordBreak: "break-all",
  },
  messageAndTagGrid: {
    display: "grid",
    gridTemplateColumns: "auto 44px",
  },
  tagAndTime: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
    alignItems: "end",
  },
  messageDiv: {
    position: "relative",
    overflowWrap: "anywhere",
    whiteSpace: "pre-wrap",
  },
  additionalPadding: {
    display: "inline-block",
    verticalAlign: "middle",
    width: props.message?.privacy
      ? props.message.privacy === "@me"
        ? "68px"
        : "78px"
      : "38px",
  },
  timeDiv: { float: "right", margin: "-20px 0px 0px 4px" },
  borderBox: {
    boxSizing: "border-box",
  },
  newTimeDiv: {
    padding: "10px 0px",
    marginTop: "8px",
  },
  voiceNoteDiv: {
    minWidth: "230px",
    padding: "8px",
  },
}));
