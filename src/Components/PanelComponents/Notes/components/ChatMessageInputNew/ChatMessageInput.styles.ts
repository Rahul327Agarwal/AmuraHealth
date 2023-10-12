import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 16px",
    boxSizing: "border-box",
    //borderRadius: "16px",
    background: "#FFFFFF",
    minHeight: "60px",
    // border: "1px solid #636363",
    boxShadow: "2px 0px 54px rgba(0, 0, 0, 0.14);",
  },

  radiusRemoveTopLR: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 16px",
    boxSizing: "border-box",
    background: "#1B1B1B",
    borderRadius: "0px 0px 16px 16px",
    minHeight: "60px",
    border: "1px solid #636363",
  },
  inputWrapper: {
    display: "flex",
    flexGrow: 1,
    "& .MuiInputBase-root": {
      width: "100px",
    },
    "& .MuiInput-underline:before": {
      content: "unset",
    },
    "& .MuiFormControl-root": {
      flexDirection: "unset",
    },
    "& .MuiInputBase-input:hover , & .MuiSelect-select:focus": {
      background: "unset !important",
    },
  },

  sendIcon: {
    background: "#252427",
    height: "48px",
    width: "48px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "4px",
    "& svg": {
      height: "24px",
      width: "24px",
      "& path": {
        fill: "#FFFFFF",
      },
    },
  },
  disableSend: {
    margin: "0px 0px 4px 0px",
    "& circle": {
      fill: "#626262",
    },
    "& path": {
      fill: "#AEAEAE",
    },
  },
  disabled: {
    backgroundColor: "#626262",
    pointerEvents: "none",
    "& circle": {
      fill: "#626262",
    },
    "& path": {
      fill: "#AEAEAE",
    },
  },

  textInput: {
    color: "#252427",
    outline: "none !important",
    margin: "11.5px 8px 8px",
    zIndex: 1,
    flex: 1,
    width: "calc(100% - 80px)",
    maxHeight: "76px",
    overflow: "auto",
    border: "none",
    wordWrap: "break-word",
    whiteSpace: "pre-wrap",
    backgroundColor: "transparent",
    minHeight: "30px",

    // "&::placeholder": {
    //   color: "grey",
    // },
    // "&::-webkit-inner-spin-button": {
    //   appearance: "none"
    // }
  },
  pointer: {
    cursor: "pointer",
  },
}));
