import { makeStyles } from "tss-react/mui";

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<void, "menuItemIcon">()(
  (theme, _params, classes) => ({
    margin4: { margin: "4px" },
    caretRight: {
      height: "12px",
      width: "7.41px",
      transition: "all 0.2s linear",
    },
    transform90: {
      transform: "rotate(90deg)",
    },
    transform0: {
      transform: "rotate(0)",
    },
    span: {
      height: "12px",
      width: "7.41px",
      transition: "all 0.2s linear",
      visibility: "hidden",
    },
    hidden: {
      visibility: "hidden",
    },
    subMenu: {
      transition: "max-height 0.2s linear",
      overflow: "hidden",
    },
    maxHeightNone: {
      maxHeight: "none",
    },
    maxHeight0: {
      maxHeight: "0px",
    },
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
      [`&:hover .${classes.menuItemIcon}`]: {
        visibility: "visible",
      },
    },
    menuItemIcon: {
      visibility: "hidden",
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
  })
);
