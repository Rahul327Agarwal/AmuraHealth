import { makeStyles } from 'tss-react/mui';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  dayDiv: {
    display: "grid",
    gridTemplateColumns: "auto max-content auto",
    alignItems: "center",
    marginBottom:'24px'
  },
  daySpan: {
    display: "block",
    margin: "auto",
    width: "max-content",
    padding: "5px 14px",
    color: "#A6A6A6",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "12px",
    lineHeight: "150%",
  },
  dividerDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    width: "90%",
    height: "1px",
    backgroundColor: "#AEAEAE",
  },
}));
