import { makeStyles } from "tss-react/mui";
import { IProps } from "./MUISelect.types";

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()(
  (theme, { variant, removePaddingTB }) => ({
    FormControl: {
      width: "100%",
    },
    InputLabel: {
      color:
        variant === "filled"
          ? `transparent !important`
          : `${theme.palette.colors.gray[500]} !important`,
      display: variant === "filled" ? "none" : "auto",
    },
    optionLabel: {
      color: " #5C5A61",
    },
    icon: {},
    optionWrap: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    SelectRoot: {
      width: "100%",
      background: "transparent !important",
      marginTop: variant === "filled" ? "0 !important" : "16px",
      "& .MuiSelect-root": {
        background: "transparent !important",
        fontSize: "17px !important",
      },
      "&.Mui-error ": {
        "&.MuiInput-underline:after": {
          borderBottom: `#f44336 !important`,
        },
      },
      "& .MuiInputBase-input": {
        height: variant === "filled" ? "44px" : "28px",
        color: `${theme.palette.colors.gray[500]} !important`,
        backgroundColor:
          variant === "filled"
            ? `${theme.palette.colors.system.white} !important`
            : "transparent !important",
        // boxShadow: "2px 2px 54px rgba(0, 0, 0, 0.1)",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        padding: removePaddingTB
          ? "0px 12px !important"
          : variant === "filled"
          ? "8px 12px !important"
          : "6px 0 6px !important",
      },
      "& .MuiSelect-icon": {
        color: `${theme.palette.colors.gray[500]} !important`,
        right: removePaddingTB ? "10px !important" : "0px !imporant",
      },
      "&.MuiInput-underline:before": {
        content: variant === "filled" ? "unset" : "''",
        borderBottom: `1px solid ${theme.palette.colors.gray[100]} !important`,
      },
      "&.MuiInput-underline:after": {
        content: variant === "filled" ? "unset" : "''",
        borderBottom: `1px solid ${theme.palette.colors.gray[500]} !important`,
      },
      "& fieldset": {
        border: "none !important",
      },
    },
    PopperRoot: {
      "& .MuiPaper-elevation8": {
        boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.14) !important",
      },
      "& .MuiPopover-paper": {
        backgroundColor: `${theme.palette.colors.system.white} !important`,
      },
      "& .MuiList-root": {
        backgroundColor: `${theme.palette.colors.system.white} !important`,
      },
      "& .MuiMenu-list":{
        maxHeight:'250px'
      },
      "& .Mui-selected":{
        backgroundColor: `${theme.palette.colors.system.white} !important`, 
        fontWeight:'bold'
      },
      "& .MuiMenuItem-root ": {
        color: `${theme.palette.colors.gray[500]} !important`,
        backgroundColor: `${theme.palette.colors.system.white} !important`,
        fontSize: "15px !important",
        fontFamily: "Graphik",
        padding: "13px 16px !important",
        borderBottom: "1px solid #E1E1E1 !important",
      },
      "& .MuiMenuItem-root:hover": {
        backgroundColor: `${theme.palette.colors.gray[25]} !important`,
        fontWeight:'bold'
      },
    },
  })
);
