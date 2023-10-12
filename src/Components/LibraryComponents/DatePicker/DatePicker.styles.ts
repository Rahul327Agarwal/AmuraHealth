import { makeStyles } from "tss-react/mui";
import { IProps } from "./DatePicker.types";
export const useStyles = makeStyles<IProps>()((theme, props) => ({
  label: {
    //fontfamily: "Inter",
    fontStyle: "normal",
    fontHeight: "normal",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#FFFFFF",
    marginBottom: "4px",
  },
  widthInherit: {
    width: "inherit",
  },
  datePicker: {
    width: "inherit",
    borderRadius: "5px",
    background: "transparent",
    marginBottom: "4px",
    border: "1px solid #AEAEAE !important",
    "&:hover": {
      background: "#4B4E50",
    },
    "&:focus-within": {
      background: "transparent !important",
      // border: "1px solid #FFFFFF !important",
    },
    "& .MuiInputBase-root": {
      background: "transparent !important",
    },
    "& .MuiInputBase-input": {
      background: "transparent !important",
      padding: "8px !important",
      caretColor:
        props.variant !== "date"
          ? "trasnparent !important"
          : "inherit !important",
    },
    "& .MuiInput-underline": {
      "&:after": {
        borderBottom: "initial",
      },
      "&:before": {
        borderBottom: "0px !important",
      },
    },
    "& .MuiPickersDatePickerRoot-toolbar": {
      background: "#00FFCC",
    },
    "& .MuiInputAdornment-root": {
      margin: "0px !important",
    },
    "& .MuiButtonBase-root": {
      pading: "4px",
    },
    "& fieldset": {
      border: "0px !important",
    },
  },
  inputDisabled: {
    background: "transparent !important",
  },
  caret: {
    caretColor:
      props.variant !== "date"
        ? "trasnparent !important"
        : "inherit !important",
  },
  inputError: {
    border: "1px solid #F94959",
  },
  disabled: {
    opacity: 0.5,
  },
  errorText: {
    color: "#F94959",
    //fontfamily: "Inter",
    fontStyle: "normal",
    fontHeight: "normal",
    fontSize: "12px",
    lineHeight: "18px",
  },
  popover: {
    "& .MuiCalendarPicker-root": {
      background: "#00FFCC !important",
      padding: "0px",
      width: "100%",
      height: "fit-content",
      "& .MuiPickersCalendarHeader-label": {
        color: "#000000",
      },
      "& .MuiTypography-root": {
        color: "white",
      },
      "& > div:nth-child(2)": {
        backgroundColor: "#000000",
        color: "#FFFFFF",
      },
      "& .MuiPickersDay-root": {
        backgroundColor: "transparent",
        color: "#FFFFFF",
        "&:hover": {
          backgroundColor: "#1f1f1f",
        },
      },
      "& .Mui-selected": {
        backgroundColor: "#00FFCC",
        color: "#000000",
      },
      "& .MuiPickersDay-today": {
        color: "#00FFCC",
      },
      "& > button:nth-of-type(1)": {
        marginBottom: "4px",
        //fontfamily: "Inter",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "16px",
        lineHeight: "24px",
        width: "100%",
        justifyContent: "flex-start",
      },
      "& > button:nth-of-type(1) > span": {
        padding: "8px",
        margin: "8px 8px 4px 8px",
      },
      "& > button:nth-of-type(1) > span > h6": {
        //fontfamily: "Inter",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "16px",
        lineHeight: "24px",
      },
      "& > button:nth-of-type(2) > span": {
        padding: "8px",
        margin: "8px",
      },
      "& > button:nth-of-type(2) > span > h4": {
        //fontfamily: "Inter",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "28px",
        lineHeight: "30px",
      },
    },
    "& .MuiPickersToolbarText-toolbarTxt": {
      color: "#1B1B1B !important",
    },
    "& .MuiPickersYear-root": {
      "&:hover": {
        background: "#4B4E50",
      },
    },
    "& .MuiPickersDay-daySelected": {
      "& p": {
        color: "#1B1B1B !important",
      },
    },
    "& .MuiPickersYear-yearSelected": {
      fontWeight: 500,
      fontSize: "20px !important",
      lineHeight: "30px",
      "&:hover": {
        background: "none !important",
      },
    },
    "& .MuiPickersDay-current": {
      "& p": {
        color: "#00FFCC !important",
      },
    },
  },
}));
