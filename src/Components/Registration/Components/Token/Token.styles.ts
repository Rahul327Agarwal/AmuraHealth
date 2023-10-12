import { makeStyles } from "tss-react/mui";
import { IProps } from "./Token.types";

export const useStyles = makeStyles<IProps>()((theme, props) => ({
  root: {
    height: "28px",
    margin: "8px",
    padding: "0px",
    borderRadius: "5px",
    border: "1px solid #FFFFFF",
    background: "transparent !important",
    boxSizing: "unset",
    color: "#FFFFFF",
    //fontfamily: "Inter",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "18px",
    cursor: "pointer",
    transition: "none",
    "& .MuiTouchRipple-root": {
      display: "none",
    },
    "&:hover": {
      color: "#FFFFFF",
      background: "#4B4E50",
    },
    "&:hover .MuiChip-label": {
      color: "#FFFFFF",
    },
    "& .MuiChip-label": {
      padding: "0px",
      margin: props.variant === "primary" ? "6px 12px" : "6px 8px 6px 12px",
    },
    "& .MuiChip-deleteIcon": {
      color: "#ffffff42",
      width: "12px !important",
      cursor: "pointer",
      margin: "0px 12px 0px 4px",
      webkitTapHighlightColor: "transparent",
    },
  },
  checked: {
    border: "1px solid #00FFCC !important",
    background: "none !important",
    "&:hover": {
      background: "#213535 !important",
    },
    "& .MuiChip-label": {
      // color: "#00FFCC !important",
    },
  },
  disabled: {
    cursor: "default",
    color: "#626262",
    border: "1px solid #626262",
    "& .MuiChip-label": {
      color: "#626262",
      background: "transparent",
    },
  },
}));
