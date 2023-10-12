import { makeStyles } from "tss-react/mui";
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const RegisterStyles = makeStyles()((theme) => ({
  textStyle: {
    fontSize: "14px",
    paddingTop: "15px",
    color: "#1B1B1B",
    paddingBottom: "5px",
    paddingLeft: "7px",
  },
  centerButtonStyle: {
    height: "fit-content",
    width: "100%",
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
  errorMessage: {
    // fontSize: "10px",
    // color: "red",
    // paddingLeft: "7px",
    color: "#F94959",
    //fontfamily: "Inter",
    fontStyle: "normal",
    fontHeight: "normal",
    fontSize: "12px",
    lineHeight: "18px",
    marginLeft: "6px",
  },
  checkbox: {
    height: "24px",
    margin: "0px",
    "& .MuiTypography-root": {
      marginLeft: "8px",
    },
  },
  formLabel: {
    fontSize: "14px",
    paddingTop: "15px",
    color: "#1B1B1B !important",
    paddingBottom: "5px",
    paddingLeft: "7px",
    "& .MuiCheckbox-colorSecondary.Mui-checked": {
      color: "#1B1B1B !important",
    },
  },
  newFields: {
    height: "45px",
    boxSizing: "border-box",
    border: "1px solid rgb(174, 174, 174) !important",
    paddingBottom: "0px !important",
    paddingRight: "0px !important",
    borderRadius: 4,
    position: "relative",
    //paddingLeft: "7px",
    marginLeft: "5px",
    outline: "none !important",
    marginBottom: "10px",
    "& div": {
      //width:"100%",
      height: "100%",
      border: "none !important",
    },
    "& div:hover": {
      backgroundColor: "transparent !important",
    },
    "& .MuiInputBase-input": {
      color: "#000 !important",
    },
    "& path": {
      fill: "#000",
    },
    "& .MuiAutocomplete-endAdornment": {
      paddingTop: "8px",
    },
  },

  newFields2: {
    //border: "1px solid red",
    //minHeight:"45px",
    paddingBottom: "0px !important",
    paddingRight: "0px !important",
    borderRadius: 4,
    position: "relative",
    boxSizing: "border-box",
    //paddingLeft: "7px",
    marginLeft: "5px",
    color: "black !important",
    // TODO: added after migration to remove inner borders
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none !important",
    },
    "&:hover": {
      "& .MuiChip-label": {
        color: "#1B1B1B !important",
      },
    },
    "& div > div": {
      boxSizing: "border-box",
      minHeight: "45px",
      //border:"1px solid red",
      //width:"100%",
      //height: "100%",
      color: "black",
      "&:hover": {
        backgroundColor: "transparent !important",
      },
      "& .MuiInputBase-input": {
        color: "#000 !important",
      },
    },
    "& path": {
      fill: "#000",
    },
    "& .MuiAutocomplete-endAdornment": {
      paddingTop: "8px",
    },
    "& .MuiChip-label": {
      color: "#1B1B1B !important",
      "&:hover": {
        color: "#1B1B1B !important",
      },
    },
    "& .MuiAutocomplete-root": {
      border: "1px solid rgb(174, 174, 174) !important",
    },
    "& .MuiAutocomplete-endAdornment > button": {
      border: "none !important",
    },
    "& .MuiButtonBase-root": {
      border: "1px solid rgb(174, 174, 174) !important",
    },
  },
  container: {
    //marginBottom: "8px",
    //border:"1px solid red !important",
    paddingLeft: "5px",
  },
  titleWrapper: {
    color: "#1B1B1B",
    marginBottom: "5px",
    //fontfamily: "Inter",
  },
  fieldWrapper: {
    "&. MuiChip-root:hover": {
      "& .MuiChip-label": {
        color: "gray !important",
      },
    },
    "& .MuiChip-label": {
      color: "gray !important",
    },
    "& > div:nth-child(1) ": {
      border: "1px solid #1B1B1B !important",
    },
    "& > div:nth-child(2) ": {
      border: "1px solid #1B1B1B !important",
    },
  },
  fieldWrapper2: {
    boxSizing: "border-box",
    "&. MuiChip-root:hover": {
      "& .MuiChip-label": {
        color: "gray !important",
      },
    },
    "& .MuiChip-label": {
      color: "gray !important",
    },
    "& > div:nth-child(1) ": {
      border: "1px solid  rgb(174, 174, 174) !important",
      borderRadius: "4px",
      "& .MuiInputBase-input:hover": {
        color: "black !important",
      },
      "& .MuiInputBase-input": {
        color: "black !important",
      },
    },
  },
  radioGroup: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "5px",
    color: "#1B1B1B !important",
    //border: "1px red solid",
    "& .MuiFormControlLabel-root": {
      color: "#1B1B1B !important",
      //fontfamily: "Inter !important",
      fontSize: "14px !important",
    },
    "& .MuiRadio-root": {
      color: "black !important",
    },
    "& .MuiButtonBase-root": {
      "&:hover": {
        backgroundColor: "transparent !important",
      },
    },
    "& *": {
      fontSize: "14px !important",
    },
  },
  radioGroup2: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "5px",

    color: "#1B1B1B !important",
    //border: "1px red solid",
    "& .MuiFormControlLabel-root": {
      color: "#1B1B1B !important",
      //fontfamily: "Inter !important",
      fontSize: "14px !important",
    },
    "& .MuiRadio-root": {
      color: "black !important",
    },
    "& .MuiButtonBase-root": {
      "&:hover": {
        backgroundColor: "transparent !important",
      },
    },
    "& *": {
      fontSize: "14px !important",
    },
  },
  keyBoardWidth: {
    boxSizing: "border-box",
    width: "99%",
    marginTop: "4px",
    background: "#F7F7F7 !important",
    padding: "3px",
    border: "none !important",
    color: "black !important",
    "&:hover": {
      background: "#none !important",
    },
    "& path": {
      fill: "#1B1B1B",
    },
  },
  width: {
    width: "100%",
  },
  otherSex: {
    display: "flex",
    alignItems: "center",
    "& .MuiInputBase-input": {
      color: "#1B1B1B !important",
      "&:hover": {
        backgroundcolor: "none !important",
      },
    },
  },
  topMargin: {
    marginTop: "5px",
  },
  errorText: {
    color: "#F94959",
    //fontfamily: "Inter",
    fontStyle: "normal",
    fontHeight: "normal",
    fontSize: "12px",
    lineHeight: "18px",
  },
  popperstyle: {
    color: "black",
    //border: "red solid 1px",
    width: "100% !important",
    //padding: "15px !important",
    backgroundColor: "#F7F7F7",
    height:'100% !important',
    "& li": {
      "&:hover": {
        background: "#F8F8F8",
      },
      margin: "0px !important",
    },
  },
  hideLeftImage: {
    "@media only screen and (max-width: 1165px)": {
      display: "none !important",
    },
  },
  visibility: {
    visibility: "hidden",
  },
  rightImage: {
    display: "block",
    verticalAlign: "bottom",
    maxWidth: "100%",
    width: "auto",
    height: "auto",
    maxHeight: "90vh",
    aspectRatio: "auto 760 / 913",
  },
  rightImageSpan: { width: "100%", fontSize: "1em" },
  rightImageDiv: {
    flexBasis: "calc(50% - 1rem)",
    display: "flex",
    alignItems: "end",
    justifyContent: "center",
    height: "100%",
  },
  imgCon: {
    alignItems: "center",
  },
  token: {
    "& .MuiChip-root": {
      border: "1px solid #A6A6A6 !important",
      background: "transparent !important",
      "&:hover": {
        background: "transparent !important",
        "& .MuiChip-label": {
          color: "#A6A6A6 !important",
        },
      },
    },
    "& .MuiChip-label": {
      color: "#A6A6A6 !important",
    },
  },
  tokenActive: {
    "& .MuiChip-root": {
      border: "1px solid #1B1B1B !important",
      background: "transparent !important",
      "&:hover": {
        background: "transparent !important",
        "& .MuiChip-label": {
          color: "#1B1B1B !important",
        },
      },
    },
    "& .MuiChip-label": {
      color: "#1B1B1B !important",
    },
  },
  stylePopper: {
    //background: "red !important",
    "& .MuiAutocomplete-option": {
      color: "#1B1B1B !important",
    },
    "& .MuiAutocomplete-noOptions": {
      color: "#1B1B1B !important",
      background: "#F7F7F7 !important",
    },
  },
  formContainer: {
    "& .MuiFormControl-root": {
      // display: "none !important",
    },
    "& .MuiOutlinedInput-root": {
      padding: "0 !important",
    },
  },
}));
