import { Button, styled } from "@mui/material";
import { IProps } from "./MUIButton.types";

export const ButtonStyled = styled(Button)<IProps>(
  ({ theme, fontSize, showSingleLine, background, padding }) => ({
    "&.MuiButton-root": {
      textTransform: "none",
      boxSizing: "border-box",
      borderRadius: "6px",
      padding: padding ? padding : "9px 23px",
      lineHeight: "normal !important",
      fontSize: fontSize || "15px",
      //fontfamily: "Inter",
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      wordBreak: "break-all",
      "&.MuiButton-contained": {
        color: theme.palette.colors.gray[25],
        background: background
          ? background
          : theme.palette.colors.theme.primaryLight,
        border: `1px solid ${theme.palette.colors.gray[500]}`,
        boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.25)",
        display: showSingleLine ? "block" : "",
        "&:hover": { background: theme.palette.colors.theme.primaryLight },
        "&:active": { background: theme.palette.colors.theme.primary },
        "&.Mui-disabled": {
          background: `${theme.palette.colors.gray[200]} !important`,
          color: `#A6A6A6 !important`,
        },
      },
      "&.MuiButton-outlined": {
        color: theme.palette.colors.theme.primary,
        border: `1px solid ${theme.palette.colors.theme.primary}`,
        borderRadius: "50px",
        display: showSingleLine ? "block" : "",
      },
      "&.MuiButton-text": {
        color: theme.palette.colors.theme.primary,
        padding: "2px 10px",
        minWidth: "min-content !important",
      },
      "&.MuiButton-sizeLarge": { padding: "18px 30px" },
      "&.MuiButton-sizeSmall": { padding: "2px 16px" },
      "&.Mui-disabled": {
        color: `${theme.palette.colors.gray[400]} !important`,
        border: "none",
      },
      "& .MuiButton-startIcon": {
        marginLeft: "unset !important",
      },
      "& .MuiButton-endIcon": {
        marginRight: "unset !important",
      },
    },
    "& span": {
      //fontfamily: "Inter",
      fontWeight: "400",
    },
  })
);
