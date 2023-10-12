import { makeStyles } from "tss-react/mui";
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  mainConatainer: {
    background: "#3F4044",
    position: "relative",
    height: "inherit",
    display: "flex",
    flexDirection: "column",
  },
  body: {
    flex: 1,
    height: "inherit",
    overflow: "auto",
  },
  headerDiv: {
    background: "inherit",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: "0",
    padding: "24px 0",
    zIndex: 1,
  },
  titleDiv: {
    display: "flex",
    alignItems: "center",
  },
  backBtn: {
    cursor: "pointer",
    display: "flex",
    marginRight: "15px",
    marginLeft: "5px",
  },
  searchIcon: {
    cursor: "pointer",
    "& path": {
      fill: "#FFFFFF",
    },
  },
  headerText: {
    //fontfamily: "Inter",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "18px",
    color: "#FFFFFF",
  },
  eachPackageCon: {
    padding: "8px",
    background: "#1B1B1B",
    borderRadius: "8px",
    border: "1px solid #636363",
    marginBottom: "6px",
  },
  imgCon: {
    height: "198px",
    width: "100%",
    borderRadius: "5px",
    overflow: "hidden",
  },
  imgstyle: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center center",
  },
  message: {
    fontSize: "14px",
    color: "#FFF",
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": 3,
    "-webkit-box-orient": "vertical",
    padding: "0 10px",
  },
  subMessage: {
    fontSize: "14px",
    color: "#AEAEAE",
    padding: "0 10px",
  },
  packageDetails: {
    display: "flex",
    marginTop: "12px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  packageName: {
    fontSize: "16px",
    color: "#FFF",
  },
  packageTestname: {
    padding: "7px 10px",
    background: "#3f4044",
    fontSize: "12px",
    color: "#FFF",
    textAlign: "center",
    borderRadius: "33px",
  },

  fixedFooter: {
    display: "flex",
    height: "inherit",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
  },
  price: {
    color: "#AEAEAE",
    fontSize: "14px",
  },
  buttonItemsCon: {
    display: "flex",
    padding: "4px",
    alignItems: "center",
    cursor: "pointer",
  },
  discription2: {
    fontSize: "14px",
    marginRight: "6px",
    color: "#00FFCC",
  },
  iconContainer2: {
    "& path": {
      fill: "#00FFCC",
    },
  },
  displayFlex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cursor: {
    cursor: "pointer",
  },
}));
