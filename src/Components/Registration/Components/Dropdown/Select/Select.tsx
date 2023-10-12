import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";
import { PMS_LOCALE } from "../../../../../Utils";
import { useStyles } from "./Select.styles";
import { IOption, IProps } from "./Select.types";

export default function Dropdown(props: IProps) {
  const { classes } = useStyles(props);
  const {
    options,
    value,
    onChange,
    disabled,
    labelParameter,
    label,
    displayLabel,
    placeHolder,
    showError,
    errorText,
  } = props;
  return (
    <div className={classes.widthInherite}>
      {label ? (
        <div>
          <span className={classes.label} title={label}>
            {PMS_LOCALE.translate(label)}
          </span>
        </div>
      ) : null}
      <FormControl fullWidth>
        <Select
          disabled={disabled}
          disableUnderline
          className={classes.root}
          value={value}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            // getContentAnchorEl: null,
          }}
          onChange={(e) => {
            onChange(e.target.value);
            let selected = e.target.value ? e.target.value.toString() : "";
          }}
        >
          {options.map((option: IOption, index) => (
            <MenuItem
              className={`${classes.menuItem} ${
                value === option[labelParameter] ? classes.menuItemSelected : ""
              }`}
              key={index}
              value={option[labelParameter]}
            >
              {displayLabel ? option[displayLabel] : option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {showError && errorText ? (
        <div>
          <span className={classes.errorText}>{errorText}</span>
        </div>
      ) : null}
    </div>
  );
}
