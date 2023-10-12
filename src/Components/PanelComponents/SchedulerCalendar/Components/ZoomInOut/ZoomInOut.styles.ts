import { makeStyles } from "tss-react/mui";
import { IMagnifyProps } from "./ZoomInOut.types";

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IMagnifyProps>()((theme, { disabled }) => ({
  zoomInOutBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px 7px",
    gap: "20px",
    position: "absolute",
    width: "32px",
    height: "72px",
    left: "80px",
    bottom: "30px",
    background: theme.palette.colors.gray[25],
    border: `1px solid ${theme.palette.colors.gray[100]}`,
    borderRadius: "6px",
    zIndex: 1000,
    pointerEvents: disabled ? "none" : "unset",
  },
  buttonStyle: {
    padding: "0",
    "&.Mui-disabled": {
      opacity: "0.5 !important",
    },
  },
}));
