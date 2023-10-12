import { makeStyles } from "tss-react/mui";
export const useStyles = makeStyles()((theme) => ({
  root: {
    margin: "0px",
    display: "block",
    "& .MuiTypography-root": {
      marginLeft: "8px",
    },
  },
  width100: {
    width: "100%",
  },
  newTheme: {
    "& .MuiButtonBase-root": {
      "&:hover": {
        backgroundColor: "transparent !important",
      },
    },
    "& .MuiTypography-root": {
      color: "#1B1B1B",
    },
    "& svg": {
      fill: "#1B1B1B !important",
    },
    "& .MuiTouchRipple-root": {
      display: "none !important",
    },
  },
}));
