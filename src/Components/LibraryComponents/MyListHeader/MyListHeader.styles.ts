import { makeStyles } from "tss-react/mui";
import { IProps } from "./MyListHeader.types";

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()(
  (theme, { size, paddingX, padding }) => ({
    headerContainer: {
      boxSizing: "border-box",
      backgroundColor: "#FFFFFF",
      height: size === "large" ? "72px" : size === "small" ? "38px" : "48px",
      borderBottom: "1px solid #E1E1E1",
      padding: padding ? `${padding}` : `0 ${paddingX || "0"} `,
      display: "grid",
      gridTemplateColumns: "1fr auto",
      alignItems: "center",
      gridAutoFlow: "column",
      gap: "20px",
      "& *": {
        boxSizing: "border-box",
      },
    },
    amuraLogo: {
      display: "flex",
      alignItems: "center",
    },
    actionButton: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
    },
    groupCircle: {
      height: "20px",
      width: "20px",
      borderRadius: "50%",
      border: "1px solid #E1E1E1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "10px",
      fontWeight: 400,
      color: "#5C5A61",
    },
    activeCircle: {
      height: "20px",
      width: "20px",
      borderRadius: "50%",
      border: "1px solid #E1E1E1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "10px",
      fontWeight: 400,
      color: "#FFFFFF",
      background: "#5C5A61",
    },
    active: {
      backround: " #5C5A61",
      color: "#FFFFFF ! important",
    },
    flex: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "18px",
      cursor: "pointer",
      " -webkit-tap-highlight-color":'transparent'
    },
  })
);
