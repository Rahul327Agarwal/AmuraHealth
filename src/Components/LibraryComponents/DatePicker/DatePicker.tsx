import DateFnsUtils from "@date-io/date-fns";
import {
  createTheme,
  IconButton,
  InputAdornment,
  TextField as MUIInputField,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";
import {
  DatePicker as MUIDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useState } from "react";
import { PMS_LOCALE } from "../../../Utils";
import { calenderIcon } from "../../Registration/assets/Svgs";
import { useStyles } from "./DatePicker.styles";
import { IProps } from "./DatePicker.types";

export default function DatePicker(props: IProps) {
  const { classes } = useStyles(props);
  const {
    variant,
    placeholder,
    startDate,
    endDate,
    handleDateChange,
    disabled,
    disableFuture,
    disabledPast,
    minDate,
    maxDate,
    label,
    customStyle,
  } = props;
  const [dateRange, setDateRange] = useState([startDate, endDate]);

  return (
    <div
      className={`${disabled ? classes.disabled : ""} ${classes.widthInherit}`}
    >
      {label && (
        <div>
          <span className={classes.label} title={label}>
            {PMS_LOCALE.translate(label)}
          </span>
        </div>
      )}
      {variant === "date" ? (
        // <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MUIDatePicker
            // autoComplete="off"
            className={`${classes.datePicker} ${customStyle}`}
            // placeholder={placeholder}
            // label={placeholder}
            // toolbarPlaceholder={placeholder}
            // autoOk={true}
            // disabled={disabled}
            // variant="inline"
            value={startDate}
            disableFuture={disableFuture}
            disablePast={disabledPast}
            InputProps={{ disableUnderline: true }}
            inputFormat="yyyy-MM-dd"
            // id="reportDatePicker"
            onChange={(date) => {
              handleDateChange(date);
            }}
            // KeyboardButtonProps={{
            //   "aria-label": "change date",
            // }}
            // PopoverProps={{ className: classes.popover, PaperProps: {} }}
            // error={false}
            // helperText={false}

            PopperProps={{
              className: classes.popover,
            }}
            renderInput={(p) => (
              <MUIInputField
                {...p}
                InputProps={{
                  ...p.InputProps,
                  // endAdornment: calenderIcon,
                }}
              />
            )}
            // keyboardIcon={calenderIcon}

            minDate={minDate ? new Date(minDate) : "1900-01-01"}
            maxDate={maxDate ? new Date(maxDate) : "2100-12-31"}
          />
        </LocalizationProvider>
      ) : // </MuiPickersUtilsProvider>
      null}
      {variant === "keyboard" ? (
        // <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MUIDatePicker
            // autoComplete="off"
            className={`${classes.datePicker} ${customStyle}`}
            // placeholder={placeholder}
            // autoOk={true}
            // variant="inline"
            disabled={disabled}
            value={new Date(startDate)}
            disableFuture={disableFuture}
            disablePast={disabledPast}
            InputProps={{ disableUnderline: true }}
            inputFormat="yyyy-MM-dd"
            // id="reportDatePicker"
            onChange={(date) => {
              handleDateChange(date);
            }}
            // PopoverProps={{
            //   className: classes.popover,
            //   PaperProps: {},
            //   anchorOrigin: { horizontal: "center", vertical: "bottom" },
            //   transformOrigin: { horizontal: "center", vertical: "top" },
            // }}
            // error={false}
            // helperText={false}
            renderInput={(props) => (
              <MUIInputField
                className={`${disabled ? classes.inputDisabled : ""}`}
                {...props}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>{calenderIcon}</IconButton>
                    </InputAdornment>
                  ),
                  style: {
                    color: "#ffffff !important",
                    backgroundColor: "#171D20 !important",
                    position: "relative",
                  },
                }}
              />
            )}
            minDate={minDate ? new Date(minDate) : "1900-01-01"}
            maxDate={maxDate ? new Date(maxDate) : "2100-12-31"}
          />
        </LocalizationProvider>
      ) : // </MuiPickersUtilsProvider>
      null}
      {/* {variant === "range" ? (
          <DateRangePicker
            placeholder={placeholder}
            autoOk={true}
            disabled={disabled}
            variant="inline"
            value={dateRange}
            disableFuture={disableFuture}
            disablePast={disabledPast}
            InputProps={{ disableUnderline: true }}
            format="yyyy-MM-dd"
            id="reportDatePicker"
            onChange={(date) => {
              setDateRange(date);
              handleDateChange(date);
            }}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            error={false}
            helperText={false}
            keyboardIcon={calenderIcon}
            startText="Check-in"
            endText="Check-out"
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} />
                <TextField {...endProps} />
              </>
            )}
          />
        ) : null} */}
    </div>
  );
}
