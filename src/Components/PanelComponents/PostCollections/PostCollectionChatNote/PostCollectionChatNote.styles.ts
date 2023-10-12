import { makeStyles } from 'tss-react/mui';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  messageBody: {
    flex: "1",
    overflow: "auto",
    position: "relative",
    padding: "8px 12px",
    //display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  notesPanel: {
    background: theme.palette.colors.system.white,
    height: "inherit",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  reAnswerQuestion: {
    color: theme.palette.colors.theme.primary,
    marginBottom: "40px",
  },
  drawerFooter: {
    margin: "-20px",
    marginTop: "0",
  },
}));
