import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => ({
  rootContainer: {
    height: "100vh",
    width: "100vw",
    // margin: '-1rem',
    backgroundColor: "rgb(0 0 0 / 18%)",
    display: "grid",
    placeItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    padding: "36px",
    zIndex: 10000,
    position: "fixed",
    inset: 0,
    '&[data-display="false"]': {
      display: "none !important",
    },
  },
  cardWrap: {
    padding: "34px 40px",
    borderRadius: "24px",
    boxSizing: "border-box",
    maxWidth: "720px",
    background: theme.palette.colors.system.white,
    boxShadow: "2px 2px 54px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "60px",
    position: "relative",
    zindex: 10000,
  },
  dflex: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
    "@media (max-width: 800px)": {
      flexDirection: "column",
    },
  },
  contentWrap: {
    flex: 1,
  },
  mainHeading: {
    color: "#252427",
    display: "block",
    marginBottom: "16px",
  },
  subHeading: {
    color: "#5C5A61",
    display: "block",
    marginBottom: "24px",
  },
  btnStyle: {
    background: "#373639",
    color: "#FFFFFF",
    padding: "12px 24px",
    borderRadius: "6px",
    "&:hover": {
      background: "#373639",
      color: "#FFFFFF",
    },
  },
}));
