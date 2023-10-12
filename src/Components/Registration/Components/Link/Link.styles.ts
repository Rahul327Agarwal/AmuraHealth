import { makeStyles } from "tss-react/mui";
import { IProps } from "./Link.types";
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has parameter type of Identifier instead of ObjectPattern (e.g. `(props) => ({...})` instead of `({color}) => ({...})`).
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, props) => ({
  link: {
    textDecoration: props.underline ? "underline" : "none",
    color: props.color ? `${props.color} !important` : "#00FFCC",
    //fontfamily: 'Inter',
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "24px",
    "&:hover": {
      textDecoration: props.underline ? "underline" : "none",
    },
  },
}));
