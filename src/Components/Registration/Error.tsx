import React from "react";
import { makeStyles } from "tss-react/mui";

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  errorText: {
    color: "#F94959",
    //fontfamily: 'Inter',
    fontStyle: "normal",
    fontHeight: "normal",
    fontSize: "12px",
    lineHeight: "18px",
  },
  textAlignCenter: {
    textAlign: "center",
  },
}));
interface IProps {
  error: string;
}

export default function Error(props: IProps) {
  const { classes } = useStyles();
  const { error } = props;
  return (
    <>
      {error ? (
        <div className={classes.textAlignCenter}>
          <span className={classes.errorText}>{error}</span>
        </div>
      ) : null}
    </>
  );
}
