import { makeStyles } from "tss-react/mui";
import { IProps } from "./RadioGroup.types";

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()(
  (theme, { isReverse, gap, isDivider, isSurvey, flexDirection }) => ({
    groupRadioWrapper: {
      display: "flex",
      gap: gap || "15px",
      flexWrap: "wrap",
      flexDirection: flexDirection || "row",
    },

    radioWrapper: {
      "& .Mui-disabled ": {
        zIndex: 1,
      },
      display: "flex",
      alignItems: "center",
      maxWidth: "100%",
      gap: "6px",
      // cursor: "pointer",
      "& span": {
        color: "#252427",
        display: "flex",
        transform: "translateY(-1px)",
      },
      flexFlow: isReverse ? "row-reverse" : "normal",
      justifyContent: isReverse ? "space-between" : "normal",
      borderBottom: isDivider ? "0.5px solid #E1E1E1" : "none",
      padding: isDivider ? "30px 0 14px 0" : "none",
    },
    radioWrapper1: {
      "& .Mui-disabled ": {
        zIndex: 1,
      },
      display: "flex",
      alignItems: "center",
      gap: isSurvey ? "24px" : "6px",
      cursor: "pointer",
      flexFlow: isReverse ? "row-reverse" : "normal",
      justifyContent: isReverse ? "space-between" : "normal",
      padding: isSurvey || isDivider ? "14px 0px" : "none",
      borderBottom: isDivider
        ? `0.5px solid ${theme.palette.colors.gray[100]}`
        : "none",
      "&:last-child": { borderBottom: "none" },
    },
    profilePic: {
      borderRadius: "50%",
      height: "34px",
      width: "34px",
      color: "#FFFFFF",
      position: "relative",
      fontSize: "12px",
      fontFamily: "Graphik",
      fontWeight: 400,
      backgroundColor: theme.palette.colors.gray[900],
    },
    flex1: {
      flex: 1,
      overflow: "hidden",
    },
    secondryText: {
      color: theme.palette.colors.gray[500],
    },
  })
);
