import { makeStyles } from "tss-react/mui";
export const useStyles = makeStyles()((theme) => ({
  title: {
    fontSize: "16px",
    color: "#fff",
    lineHeight: "24px",
  },
  textContent: {
    color: "#AEAEAE",
    fontSize: "14px",
    lineHeight: "21px",
    marginBottom: "5px",
  },
  btnWrap: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
  },
  btnTitle: {
    fonntSize: "14px",
    textTransform: "capitalize",
    "&:hover": {
      color: "#00FFCC",
    },
  },
}));
