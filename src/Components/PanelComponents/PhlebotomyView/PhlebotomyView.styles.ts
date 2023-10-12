import { makeStyles } from "tss-react/mui";
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  mainConatainer: {
    color: "#fff",
    background: "#3F4044",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  headerDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "50px",
    padding: "10px 12px",
  },
  titleDiv: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    color: "#00FFCC",
  },
  backBtn: {
    cursor: "pointer",
    display: "flex",
    marginRight: "15px",
    marginLeft: "5px",
  },
  phoneIcon: {
    cursor: "pointer",
    "& path": {
      fill: "#FFFFFF",
    },
  },
  bodyCon: {
    overflow: "auto",
    padding: "0 12px",
    flex: 1,
  },
  imgCon: {
    width: "100%",
    height: "198px",
    borderRadius: "5px",
    overflow: "hidden",
    marginBottom: "10px",
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
    marginBottom: "10px",
  },
  pincodeDiv: {
    display: "flex",
    alignItems: "end",
    marginBottom: "30px",
  },
  checkLabel: {
    fontSize: "14px",
    color: "#00FFCC",
    cursor: "pointer",
    marginBottom: "9px",
    marginLeft: "20px",
    marginRight: "20px",
  },
  reposition: {
    marginBottom: "30px",
  },
  disabled: {
    pointerEvents: "none",
    color: "#626262",
  },
  inputStyle: {
    width: "100%",
    "& .MuiFormControl-root": {
      background: "#1B1B1B",
      boxShadow:
        "0px 4px 4px rgba(0, 0, 0, 0.16), 0px 1px 2px rgba(0, 0, 0, 0.3)",
      borderRadius: "5px",
      border: "none",
      "&:focus-within": {
        background: "#1B1B1B !important",
      },
    },
  },
  textStyle: {
    fontSize: "14px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  arrowDown: {
    display: "inline-block",
    marginLeft: "10px",
    transform: "rotate(180deg)",
  },
  arrowUp: {
    display: "inline-block",
    marginLeft: "10px",
  },
  biomarkerDataCon: {
    overflow: "auto",
    display: "grid",
    gridTemplateColumns: "40% 60%",
    padding: "8px",
  },
  biomarkerKey: {
    marginRight: "12px",
    padding: "4px",
  },
  biomarkerKeydiscription: {
    //fontfamily: "Inter",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "18px",
    color: "#FFFFFF",
  },
  biomarkerValueConTotal: {
    padding: "4px",
  },
  biomarkerValueCon: {
    padding: "4px",
  },
  biomarkerValue: {
    //fontfamily: "Inter",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "18px",
    color: "#AEAEAE",
  },
  bottomBorder: {
    borderBottom: "1px solid #636363",
  },
  footerDiv: {
    display: "flex",
    height: "inherit",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#1B1B1B",
    marginTop: "auto",
  },
  price: {
    fontSize: "14px",
  },
  displayFlex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cursor: {
    cursor: "pointer",
  },
  fixedFooter: {
    display: "grid",
    height: "inherit",
    gridTemplateColumns: "50% 50%",
    padding: "7px",
    justifyContent: "center",
    alignItems: "center",
  },

  priceItemsCon: {
    padding: "4px",
    //fontfamily: "Inter",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "18px",
    color: "#FFFFFF",
  },

  buttonItemsCon: {
    // justifyContent: "center",
    // alignItems: "center",
  },
}));
