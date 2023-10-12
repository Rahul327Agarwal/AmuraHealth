import { Checkbox as MUICheckBox, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useStyles } from "./CheckBox.styles";
import { IProps } from "./CheckBox.types";
export default function CheckBox(props: IProps) {
  const {
    value,
    handleCheck,
    disabled,
    label,
    labelPlacement,
    newTheme,
    ...rest
  } = props;
  const [checked, setChecked] = useState(value);
  const { classes } = useStyles();
  useEffect(() => {
    setChecked(value);
  }, [value]);
  return (
    <div className={classes.width100} {...rest}>
      <FormControlLabel
        className={`${classes.root} ${newTheme ? classes.newTheme : ""}`}
        control={
          <MUICheckBox
            checked={checked}
            onChange={(e) => {
              setChecked(!checked);
              handleCheck(!checked);
            }}
            disabled={disabled}
          />
        }
        label={label}
        labelPlacement={labelPlacement}
      />
    </div>
  );
}
