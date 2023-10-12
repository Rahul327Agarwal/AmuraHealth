import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => ({
  rootContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  zoomSilderStyle: {
    margin: "20px 0",
  },
  header: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
  },
  main: {
    display: "grid",
    placeItems: "center",
  },
  footer: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    position: "relative",
  },
  rotateButton: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  },
  cropperBox: {
    height: "260px",
    width: "100%",
    borderRadius: "6px",
    position: "relative",
  },

  mincropperBox: {
    height: "180px",
    width: "270px",
    borderRadius: "6px",
    position: "relative",
  },

  containerStyle: {
    borderRadius: "8px !important",
  },
  cropAreaStyle: {
    background: `${theme.palette.colors.system.white} !important`,
    opacity: "0.7 !important",
    border: `1px dashed ${theme.palette.colors.theme.primary} !important`,
  },
}));
