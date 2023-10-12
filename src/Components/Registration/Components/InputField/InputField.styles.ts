import { makeStyles } from "tss-react/mui";
import { IProps } from "./InputField.types";

export const useStyles = makeStyles<IProps>()((theme, props) => ({
  label: {
    //fontfamily: "Inter",
    fontStyle: "normal",
    fontHeight: "normal",
    fontSize: "16px",
    lineHeight: "24px",
    color: props.fontColor ? props.fontColor : "#FFFFFF",
    marginBottom: "4px",
  },
  InputField: {
    "& fieldset": {
      display: "none",
    },
    width: "calc(100% - 2px)",
    border: `1px solid ${props.focusBorder ? props.focusBorder : "#AEAEAE"}`,
    borderRadius: "5px",
    background: "transparent",
    "&:hover": {
      background: props.focusBorder ? "transparent" : "#4B4E50",
    },
    "&:focus-within": {
      background: "transparent !important",
      border: `1px solid ${props.focusBorder ? props.focusBorder : "#FFFFFF"}`,
    },
    "& .MuiInputBase-root": {
      padding: "8px !important",
      background: "transparent !important",
    },
    "& .MuiInputBase-input": {
      padding: props.addAdditional8px ? "8px !important" : "0px !important",
      background: "transparent !important",
      color: props.fontColor ? props.fontColor + " !important" : "#FFFFFF",
    },
    "& .MuiInput-underline": {
      "&:after": {
        borderBottom: "initial",
      },
      "&:before": {
        borderBottom: "0px !important",
      },
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
  passwordEye: {
    width: "18px",
    height: "18px",
    color: props.fontColor ? props.fontColor : "#AEAEAE",
    cursor: "pointer",
  },
}));
