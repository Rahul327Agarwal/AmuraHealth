import {
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { PMS_LOCALE } from "../../../../../Utils";
import Token from "../../Token/Token";
import { useStyles } from "./MultiSelect.styles";
import { IOption, IProps } from "./MultiSelect.types";

export default function Dropdown(props: IProps) {
  const { classes } = useStyles(props);
  const {
    options,
    value,
    onChange,
    disabled,
    placeHolder,
    idParameter,
    showTokens,
    label,
    showError,
    errorText,
    labelParameter,
  } = props;

  const removeDeSelectedOptions = (
    id: string | number,
    options: Array<string | number>
  ) => {
    let currentOptions = JSON.parse(JSON.stringify(options));
    let newOptions = currentOptions.filter(
      (option: string | number) => option !== id
    );
    return newOptions;
  };

  const getSelectedOptions = (value: any): Array<string | number> => {
    if (value.length === 0) return [placeHolder];
    value = value.filter((option: string | number) => option !== placeHolder);
    return value;
  };

  return (
    <div>
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
          value={value.length === 0 ? [placeHolder] : value}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            // getContentAnchorEl: null,
          }}
          multiple
          onChange={(e) => {
            onChange(getSelectedOptions(e.target.value));
          }}
          renderValue={(selected) => {
            if (value.length !== 0) {
              let select = value.map(
                (option: string | number) =>
                  options.find((temp) => temp[idParameter] === option)?.[
                    labelParameter
                  ]
              );
              return select.join(", ");
            }
            if (value.length === 0) return placeHolder;
          }}
        >
          {options.map((option: IOption, index) => (
            <MenuItem
              className={`${classes.menuItem} ${
                value.indexOf(option[idParameter]) > -1
                  ? classes.menuItemSelected
                  : ""
              }`}
              key={index}
              value={option[idParameter]}
            >
              <Checkbox checked={value.indexOf(option[idParameter]) > -1} />
              <ListItemText primary={option[labelParameter]} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {showError && errorText ? (
        <div>
          <span className={classes.errorText}>{errorText}</span>
        </div>
      ) : null}
      {showTokens ? (
        <div className={classes.displayFlex}>
          {value.map((option: string | number) => (
            <Token
              disabled={disabled}
              value={option}
              variant="chip"
              label={
                options.find((label) => label.id === option)
                  ? options
                      .find((label) => label.id === option)
                      [labelParameter]?.toString()
                  : ""
              }
              onDeSelect={(e) => {
                console.log(e, "DeSelect");
                onChange(removeDeSelectedOptions(e, value));
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
