import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  snippetBox: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    marginBottom: "26px",
    flex:"1",
  },
  snippetBox1: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    gap: "4px",
    marginBottom: "26px",
  },
  snippetHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
  },
  snippetTitle: {
    color: theme.palette.colors.theme.primary,
    wordBreak:"break-all"
  },
  snippetContent: {
    wordBreak:"break-all",
    color: theme.palette.colors.gray[500],
    maxWidth: "calc(100% - 26px)",
  },
  snippetIconBox: {
    display: "flex",
    alignItems: "start",
    gap: "12px",
  },
}));
