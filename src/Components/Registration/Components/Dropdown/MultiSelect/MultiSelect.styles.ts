import { makeStyles } from "tss-react/mui";
import { IProps } from "./MultiSelect.types";
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has parameter type of Identifier instead of ObjectPattern (e.g. `(props) => ({...})` instead of `({color}) => ({...})`).
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has parameter type of Identifier instead of ObjectPattern (e.g. `(props) => ({...})` instead of `({color}) => ({...})`).
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, props) => ({
  root: {
    background: "none !important",
    border: props.showBorder ? "1px solid #AEAEAE" : "1px solid transparent",
    borderRadius: "5px",
    "&:hover": {
      background: props.showBorder
        ? "#4B4E50 !important"
        : "transparent !important",
    },
    "&:focus-within": {
      border: props.showBorder
        ? "1px solid #FFFFFF !important"
        : "1px solid transparent",
    },
    "& .MuiSelect-root": {
      background: props.showBorder
        ? "transparent !important"
        : theme.palette.background.default + " !important",
      borderRadius: "5px",
      width: "calc(100%)",
      color:
        props.value.length > 0 ? "#FFFFFF !important" : "#AEAEAE !important",
    },
    "& .MuiSelect-root:hover": {
      background: "#4B4E50 !important",
    },
    "&:before": {
      "& .MuiInput-underline": {
        border: "none !important",
      },
    },
    "& .Mui-disabled": {
      opacity: 0.5,
    },
  },
  menuItem: {
    padding: "0px",
    "&:hover": {
      background: props.showBorder
        ? "#4B4E50 !important"
        : "transparent !important",
    },
  },
  menuItemSelected: {
    background: "#3F4044 !important",
  },
  displayFlex: {
    display: "flex",
    flexWrap: "wrap",
  },
  label: {
    //fontfamily: "Inter",
    fontStyle: "normal",
    fontHeight: "normal",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#FFFFFF",
    marginBottom: "4px",
  },
  inputError: {
    border: "1px solid #F94959 !important",
  },
  errorText: {
    color: "#F94959",
    //fontfamily: "Inter",
    fontStyle: "normal",
    fontHeight: "normal",
    fontSize: "12px",
    lineHeight: "18px",
  },
}));
