import { makeStyles } from "tss-react/mui";
export const useStyles = makeStyles()((theme) => ({
  root: {
    "&.MuiButton-root": {
      background: "linear-gradient(180deg, #414344 0%, #2B2D2E 100%)",
      boxShadow:
        "0px 3px 5px rgba(0, 0, 0, 0.4), inset 0px 1px 0px rgba(255, 255, 255, 0.3)",
      borderRadius: "4px",
    },
    "& .MuiButton-label": {
      fontFamily: "Inter !important",
      fontSize: "12px !important",
      color: "#fff",
      textTransform: "none",
    },
  },
}));
