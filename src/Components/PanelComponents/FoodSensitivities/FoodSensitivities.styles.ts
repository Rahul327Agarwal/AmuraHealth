import { makeStyles } from 'tss-react/mui';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  noData: {
    display: "block",
    width: "50%",
    margin: "70% auto",
    textAlign: "center",
    color: "#fff",
    wordBreak: "break-word",
  },
  AllergensBody: {
    overflow: "auto",
    height: "calc(100% - 150px)",
    wordBreak: "break-all"
  },
  AllergiesList:{},
  addAllergiesList: {
    maxHeight: "500px",
    overflow: "auto",
    position: "absolute",
    width: "345px",
    paddingLeft: "5px",
    paddingRight: "5px",
    bottom: "74px",
    background: "#3f4044"
  },
  allergenHeader: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer"
  },
  AllergensPanel: {
    color: "#ffffff",
    height: "100%",
    background: "#3f4044"
  },
}));
