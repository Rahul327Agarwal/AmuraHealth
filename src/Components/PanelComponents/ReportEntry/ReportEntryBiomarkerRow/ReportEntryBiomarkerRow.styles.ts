import { makeStyles } from "tss-react/mui";
import { InputBase, withStyles } from "@mui/material";

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()(() => ({
  checkCircle: {
    cursor: "pointer",
    right: "30px",
    fontSize: "12px",
  },
  biomarkerHeader: {
    color: "#b3b0b0",
  },
  biomarkerName: {
    backgroundColor: "rgba(4, 4, 4, 0.9) !important",
    paddingLeft: "25px",
    minHeight: "48px",
  },
  biomarkerSelect: {
    width: "132px",
  },
  valueHolder: {
    width: "73%",
    padding: "6px 0px 1px 0px",
  },
  unitSelect: {
    width: "73%",
    padding: "6px 0px 6px 0px",
    lineHeight: "1.17em",
  },
  checkMarkStyle: {
    marginRight: "22% !important",
    margin: "auto",
    textAlign: "end",
  },
  biomakerAutoSuggest: {
    width: "100%",
    padding: "7px 0px 0px 0px",
    borderRadius: "4px",
  },
  biomakerAutoSuggestText: {
    "& .MuiInputBase-input": {
      height: "24px!important",
      backgroundColor: "#141415 !important",
      boxShadow:
        "0px 8px 10px rgb(0 0 0 / 14%), 0px 3px 14px rgb(0 0 0 / 12%), 0px 5px 5px rgb(0 0 0 / 20%)",
    },
  },
  biomarkerOption: {
    width: "200px !important",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  textAlignInitial: {
    textAlign: "initial",
  },
}));
export const BootstrapInput:any = withStyles(InputBase, () => ({
  root: {
    "label + &": {
      marginTop: "4px",
    },
  },
  input: {
    position: "relative",
    backgroundColor: "#141415 !important",
    fontSize: 12,
    boxShadow:
      "0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)",
    color: "#FFF",
    padding: "10px 20px 10px 6px !important",
    "&:focus": {
      outline: "0",
      backgroundColor: "#141415 !important",
    },
    "&:hover": {
      backgroundColor: "#141415 !important",
    },
  },
}));

export const ValueInput = withStyles(InputBase, () => ({
  root: {
    "label + &": {
      marginTop: "4px",
    },
  },
  input: {
    position: "relative",
    backgroundColor: "#141415 !important",
    fontSize: "14px",
    boxShadow:
      "0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)",
    color: "#FFF",
    padding: "10px 4px 10px 4px !important",
    textAlign: "center",
    "&:focus": {
      outline: "0",
      backgroundColor: "#141415 !important",
    },
    "&:hover": {
      outline: "0",
      backgroundColor: "#141415 !important",
    },
    "&::placeholder": {
      color: "white",
      opacity: 1,
    },
  },
})) as any;
