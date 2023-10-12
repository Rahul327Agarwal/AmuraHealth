import { makeStyles } from "tss-react/mui";
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  MyTenantSubHeading2Active: {
    color: "#00ffcc",
    marginBottom: "5px",
    //fontfamily: "Inter",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "17px",
    "&:hover": {
      color: "#00ffcc",
      cursor: "pointer",
    },
  },
  MyTenantSubHeading2: {
    color: "#FFFFFF",
    marginBottom: "5px",
    //fontfamily: "Inter",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "17px",
    "&:hover": {
      color: "#00FFCC",
      cursor: "pointer",
    },
  },
}));
