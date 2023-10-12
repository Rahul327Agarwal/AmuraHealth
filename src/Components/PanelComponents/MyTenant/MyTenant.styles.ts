import { makeStyles } from "tss-react/mui";
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  MyTenantSubHeading1: {
    color: "#ffffff",
    marginBottom: "5px",
    //fontfamily: "Inter",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "19px",
  },
  MyTenantBody: {
    margin: "9px",
    color: "#ffffff",
    padding: "7px",
    background: "#171D20",
    boxShadow: "6px 7px 14px #00000040",
    borderRadius: "5px",
    overflow: "auto",
    height: "calc(100% - 60px)",
  },
}));
