import { makeStyles } from "tss-react/mui";
import { IProps } from "./SearchAndMultiSelect.types";
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has parameter type of Identifier instead of ObjectPattern (e.g. `(props) => ({...})` instead of `({color}) => ({...})`).
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has parameter type of Identifier instead of ObjectPattern (e.g. `(props) => ({...})` instead of `({color}) => ({...})`).
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has parameter type of Identifier instead of ObjectPattern (e.g. `(props) => ({...})` instead of `({color}) => ({...})`).
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, props) => ({
  root: {
    background: props.showBorder
      ? "none !important"
      : theme.palette.background.default + " !important",
    border: props.showBorder ? "1px solid #AEAEAE" : "1px solid transparent",
    borderRadius: "5px",
    "&:hover": {
      background: props.showBorder ? "none !important" : "#4B4E50 !important",
    },
    "&:focus-within": {
      border: props.showBorder
        ? "1px solid #FFFFFF !important"
        : "1px solid transparent",
    },
    "& .MuiSelect-root": {
      background: "#1B1B1B !important",
      borderRadius: "5px",
      width: "calc(100%)",
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
      background: props.showBorder ? "none !important" : "#4B4E50 !important",
    },
  },
  menuItemSelected: {
    background: "#3F4044 !important",
  },
  displayFlex: {
    display: "flex",
    flexWrap: "wrap",
  },
  checkBox: {
    padding: "0px",
    margin: "0px",
    background: "#1B1B1B !important",
    "&:hover": {
      background: "#4B4E50 !important",
    },
  },
  selectedCheckBox: {
    background: "#3F4044 !important",
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
  InputField: {
    width: "calc(100% - 2px)",
    borderRadius: "5px",
    background: "transparent",
    "&:hover": {
      background: "#4B4E50 !important",
    },
    "&:focus-within": {
      background: "transparent !important",
    },
    "& .MuiInputBase-root": {
      background: "transparent !important",
    },
    "& .MuiInputBase-input": {
      padding: "8px !important",
      background: "transparent !important",
    },
    "& .MuiInput-underline": {
      "&:after": {
        borderBottom: "initial",
      },
      "&:before": {
        borderBottom: "0px !important",
      },
    },
    "& .MuiAutocomplete-input:first-child": {
      flex: 1,
    },
    "& .MuiAutocomplete-endAdornment": {
      position: "unset",
    },
  },
  inputDisabled: {
    background: "transparent !important",
  },
  disabled: {
    opacity: 0.5,
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
