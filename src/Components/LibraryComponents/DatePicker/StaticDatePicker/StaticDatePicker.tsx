import React, { useEffect, useState } from "react";
import { TextField, ThemeProvider } from "@mui/material";
// import DateFnsUtils from "@date-io/date-fns";
import { IProps } from "../DatePicker.types";
import { materialTheme } from "./StaticDatePicker.styles";
import { checkDateIsAvailable } from "../DatePicker.functions";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function StaticHeader(props: IProps) {
  const {
    variant,
    placeholder,
    startDate,
    endDate,
    handleDateChange,
    disabled,
    disableFuture,
    disabledPast,
    availableDates,
    showAvailableDatesOnly,
  } = props;
  const [initialDate, setInitialDate] = useState(new Date(startDate));
  useEffect(() => {
    setInitialDate(new Date(startDate));
  }, [startDate]);

  // class LocalizedUtils extends DateFnsUtils {
  //   getWeekdays(): string[] {
  //     return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  //   }
  //   getMonthText(date: Date) {
  //     const monthNames = [
  //       "January",
  //       "February",
  //       "March",
  //       "April",
  //       "May",
  //       "June",
  //       "July",
  //       "August",
  //       "September",
  //       "October",
  //       "November",
  //       "December",
  //     ];
  //     return monthNames[date.getMonth()];
  //   }
  //   getCalendarHeaderText(date: Date) {
  //     return `${this.getMonthText(date)
  //       .substring(0, 3)
  //       .toUpperCase()} ${date.getFullYear()}`;
  //   }
  // }

  return (
    <ThemeProvider theme={materialTheme}>
      {/* <MuiPickersUtilsProvider utils={LocalizedUtils}> */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          // variant="static"
          // animateYearScrolling={false}
          // autoOk={true}
          disabled={disabled}
          value={initialDate}
          disableFuture={disableFuture}
          disablePast={disabledPast}
          InputProps={{ disableUnderline: true }}
          // id="reportDatePicker"
          onChange={(date) => {
            setInitialDate(date);
            handleDateChange(date);
          }}
          // error={false}
          // helperText={false}
          // shouldDisableDate={(date: Date) => {
          //   return showAvailableDatesOnly
          //     ? !checkDateIsAvailable(date, availableDates)
          //     : false;
          // }}
          renderInput={(params) => <TextField {...params} />}
        />
        {/* </MuiPickersUtilsProvider> */}
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default StaticHeader;
