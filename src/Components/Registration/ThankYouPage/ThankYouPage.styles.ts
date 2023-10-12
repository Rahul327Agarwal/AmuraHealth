import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => ({
  mainCon: {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    backgroundColor: "white",
  },
  centerButtonStyle: {
    height: "fit-content",
    width: "20%",
    borderRadius: "4px",
    background: "#1B1B1B",
    textDecoration: "none" as const,
    textTransform: "none" as const,
    marginRight: "5px",
    color: "#FFF",
    marginLeft: "7px",
    marginTop: "20px",
    "&:hover": {
      border: "0px",
      background: "#1B1B1B",
    },
  },
  margin12px: {
    margin: "12px 0px",
  },
  successAccount: {
    fontWeight: 400,
    lineHeight: "30px",
    fontSize: "16px",
    color: "#1B1B1B",
    margin: "12px 0px",
    display: "block",
    textAlign: "center",
  },
}));
