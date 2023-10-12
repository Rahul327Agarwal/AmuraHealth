import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()(() => ({
  reportValue: {
    color: "#FFF",
    width: "73%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    margin: "auto",
  },
  biomarkerValue: {
    color: "#FFF",
    width: "73%",
    overflow: "hidden",
    margin: "auto",
    textOverflow: "ellipsis",
    textAlign: "left",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  deleteButton: {
    cursor: "pointer",
    color: "lightgray",
    textAlign: "end",
    margin: "auto",
    marginRight: "22% !important",
  },
}));
