import {
  Autocomplete,
  FormControl,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { PMS_LOCALE } from "../../../../../Utils";
import CheckBox from "../../CheckBox/CheckBox";
import { useStyles as inputFieldClasses } from "../../InputField/InputField.styles";
import Token from "../../Token/Token";
import { useStyles } from "./SearchAndMultiSelect.styles";
import { IOption, IProps } from "./SearchAndMultiSelect.types";

export default function SearchAndMultiSelect(props: IProps) {
  const CustomPaper = (props) => {
    return <Paper className={classes.checkBox} {...props} />;
  };
  const { classes } = useStyles(props);
  const {
    options,
    value,
    onChange,
    onChangeInput,
    disabled,
    idParameter,
    placeHolder,
    showTokens,
    label,
    showError,
    errorText,
    labelParameter,
    ListboxComponent,
    PopperComponent,
    newTheme,
    disableCloseOnSelect,
    freeSolo,
    eventData = false,
    isDisableBackSpace,
  } = props;

  console.log(value, "**********8");

  const [onclikdisable, setOnClickdisable] = useState(true);
  useEffect(() => {
    setOnClickdisable(disableCloseOnSelect);
  }, [disableCloseOnSelect]);

  const removeDeSelectedOptions = (
    id: string | number,
    current: Array<IOption>
  ) => {
    let option = options.find((opt) => opt[idParameter] === id);
    let currentOptions = JSON.parse(JSON.stringify(current));
    let newOptions = currentOptions.filter(
      (remove: IOption) => option[idParameter] !== remove[idParameter]
    );
    return newOptions;
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
        <Autocomplete
          freeSolo={freeSolo}
          multiple
          disableClearable
          disableCloseOnSelect={onclikdisable}
          PaperComponent={CustomPaper}
          className={`${classes.root} ${disabled ? classes.disabled : ""}`}
          options={options}
          value={value}
          onChange={(e, value, reason) => {
            console.log("on change insise search and sel");
            if ((reason as any) !== "remove-option") {
              eventData ? onChange(value, e) : onChange(value);
            }
          }}
          disabled={disabled}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => null)
          }
          getOptionLabel={(option: any) => option[labelParameter]}
          renderOption={(props, option: any) => {
            return (
              <CheckBox
                {...props}
                newTheme={newTheme}
                label={option.label}
                value={
                  value.findIndex(
                    (value) => value[idParameter] === option[idParameter]
                  ) > -1
                }
                handleCheck={(e) => {
                  console.log(e);
                }}
                labelPlacement={"end"}
              />
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              className={`${classes.InputField} ${
                disabled ? classes.inputDisabled : ""
              }`}
              placeholder={PMS_LOCALE.translate(placeHolder)}
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
              }}
              onChange={(ev) => {
                if (ev.target.value !== "" || ev.target.value !== null) {
                  if (onChangeInput) {
                    onChangeInput(ev.target.value);
                  }
                }
              }}
              {...(isDisableBackSpace && {
                onKeyDown: (event: any) => {
                  if (event.key === "Backspace") event.stopPropagation();
                },
              })}
            />
          )}
          PopperComponent={PopperComponent}
          ListboxComponent={ListboxComponent}
        />
      </FormControl>
      {showError && errorText ? (
        <div>
          <span className={classes.errorText}>{errorText}</span>
        </div>
      ) : null}
      {showTokens && value.length > 0 ? (
        <div className={classes.displayFlex}>
          {value.map((option: IOption, index) => (
            <div key={index}>
              <Token
                disabled={disabled}
                value={option[idParameter]}
                variant="chip"
                label={option[labelParameter].toString()}
                onDeSelect={(e) => {
                  console.log(e, "DeSelect");
                  eventData
                    ? onChange(
                        removeDeSelectedOptions(
                          e[idParameter] ? e[idParameter] : e,
                          value
                        ),
                        e
                      )
                    : onChange(
                        removeDeSelectedOptions(
                          e[idParameter] ? e[idParameter] : e,
                          value
                        )
                      );
                }}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
