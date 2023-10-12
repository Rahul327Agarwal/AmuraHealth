import DateFnsUtils from '@date-io/date-fns';
import { IconButton, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
// import {StaticDatePicker} from '@mui/x-date-pickers'
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { DownIcon, LeftArrowIcon, LeftIcon, RightArrowIcon, RightIcon } from '../../SVGs/Common';
import {
  MIN_YEAR,
  NO_OF_RENDER_FILTER,
  checkMaxDate,
  checkMinDate,
  disableMaxDate,
  disableMinDate,
  getDateObject,
  getYearsArray,
  isDisabled,
  months,
} from './MUIDatePicker.function';
import { materialTheme, materialTheme2, useStyles } from './MUIDatePicker.styles';
import { StaticCalendarProps } from './MUIDatePicker.types';
// import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function StaticCalendar(props: StaticCalendarProps) {
  const { date, setDate, disablePast, customStyle, changeBgColor, disabledKeyboardControl, changeDayBGWhite, ...restProps } =
    props;
  const { minDate, maxDate } = restProps;
  const { classes } = useStyles(props);
  const [dateState, setDateState] = useState<any>(getDateObject(date || new Date(), { isall: true }));
  const [showfilter, setShowfilter] = useState('');
  const [years, setYears] = useState(getYearsArray(dateState.year));

  useEffect(() => {
    const initDateState = getDateObject(date || new Date(), { isall: true });
    setDateState(initDateState);
    setYears(getYearsArray(Number(initDateState.year)));
  }, [date]);

  useEffect(() => {
    if (showfilter === '') {
      setDate(dateState.date);
    }
  }, [showfilter]);

  const onMonthChange = (date: Date) => {
    setDateState((pre: any) => ({
      ...pre,
      ...getDateObject(date, { ismonth: true, isyear: true }),
    }));
  };
  const onDateChange = (date?: Date) => {
    setDateState({
      date,
      ...getDateObject(date!, { ismonth: true, isyear: true }),
    });
    setDate(date);
  };

  const handleSelectMonth = ({ date, month, disabled }: any) => {
    if (!disabled) {
      setDateState((pre: any) => ({ ...pre, date, month }));
      setShowfilter('');
    }
    if (showfilter === '') {
      setDate(dateState.date);
      return;
    }
  };
  const handleSelectYear = ({ date, year, disabled }: any) => {
    if (!disabled) {
      setDateState((pre: any) => ({ ...pre, date, year }));
      setShowfilter('');
    }
    if (showfilter === '') {
      setDate(dateState.date);
      return;
    }
  };
  const handleNavidatorLeft = () => {
    let minDateCheck = new Date(minDate!);
    minDateCheck.setHours(0, 0, 0, 0);
    if (showfilter === '') {
      return;
    }
    if (showfilter === 'years') {
      setYears((pre) => {
        let minimum = pre[0];
        if (minimum - NO_OF_RENDER_FILTER <= MIN_YEAR) {
          return pre.map((_, index) => MIN_YEAR + index);
        }
        if (minDateCheck && minimum <= new Date(minDateCheck).getFullYear()) {
          return pre;
        }
        return pre.map((data) => data - NO_OF_RENDER_FILTER);
      });
      return;
    } else if (showfilter === '') {
      let dateStr = new Date();
      dateStr.setHours(0, 0, 0, 0);
      const date = moment(dateStr).subtract(1, 'months');
      const endOfDate = date.endOf('month').toDate();
      if (disableMinDate(endOfDate, minDateCheck) || isDisabled(endOfDate, disablePast, 'months', endOfDate.getMonth())) return;
      setDateState((pre: any) => ({
        ...pre,
        ...getDateObject(date.toDate(), { ismonth: true, isdate: true }),
      }));
    }
  };
  const handleNavidatorRight = () => {
    let maxDateStr = new Date(maxDate!);
    maxDateStr.setHours(0, 0, 0, 0);
    if (showfilter === '') {
      return;
    }
    if (showfilter === 'years') {
      setYears((pre) => {
        let maximum = pre[pre.length - 1];
        if (maxDateStr && maximum >= new Date(maxDateStr).getFullYear()) {
          return pre;
        }
        return pre.map((data) => data + NO_OF_RENDER_FILTER);
      });
      return;
    } else if (showfilter === '') {
      let checkDate = new Date();
      checkDate.setHours(0, 0, 0, 0);
      const date = moment(checkDate).add(1, 'months');
      const startOfDate = date.startOf('month').toDate();
      let maxDateCheck = new Date(maxDateStr);
      maxDateCheck.setHours(0, 0, 0, 0);
      if (disableMaxDate(startOfDate, maxDateStr)) return;
      setDateState((pre: any) => ({
        ...pre,
        ...getDateObject(date.toDate(), { ismonth: true, isdate: true }),
      }));
    }
  };

  const renderFilterOptions = () => {
    switch (showfilter) {
      case 'months':
        return (
          <div className={classes.calenderBody}>
            {months?.map((month, index) => {
              const date = new Date(dateState.date);
              date.setMonth(index);
              date.setHours(0, 0, 0, 0);
              let minDateStr = new Date(minDate!);
              minDateStr.setHours(0, 0, 0, 0);
              let maxDateStr = new Date(maxDate!);
              maxDateStr.setHours(0, 0, 0, 0);
              const disabled =
                isDisabled(date, disablePast, showfilter, index) ||
                checkMinDate(date, minDateStr) ||
                checkMaxDate(date, maxDateStr);
              return (
                <IconButton
                  className={`${classes.defaultIconButton} filterOption ${month === dateState.month ? 'selected' : ''}`}
                  color="primary"
                  onClick={() => handleSelectMonth({ date, month, disabled })}
                  disabled={disabled}
                >
                  {month}
                </IconButton>
              );
            })}
          </div>
        );
      case 'years':
        return (
          <div className={classes.calenderBody}>
            {years?.map((year) => {
              const date = new Date(dateState.date);
              date.setFullYear(year);
              date.setHours(0, 0, 0, 0);
              let minDateStr = new Date(minDate!);
              minDateStr.setHours(0, 0, 0, 0);
              let maxDateStr = new Date(maxDate!);
              maxDateStr.setHours(0, 0, 0, 0);
              const disabled =
                isDisabled(date, disablePast, showfilter, year) ||
                checkMinDate(date, minDateStr) ||
                checkMaxDate(date, maxDateStr);
              return (
                <IconButton
                  className={`${classes.defaultIconButton} filterOption ${year === dateState.year ? 'selected' : ''} ${
                    disabled ? `${classes.deselectedBtn}` : ''
                  }`}
                  color="primary"
                  onClick={() => handleSelectYear({ date, year, disabled })}
                  disabled={disabled}
                >
                  {year}
                </IconButton>
              );
            })}
          </div>
        );

      default:
        return (
          <ThemeProvider theme={changeDayBGWhite ? materialTheme2 : materialTheme}>
            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div
                className={showfilter === '' ? `${classes.calenderHeader}` : ` ${classes.calenderHeader} ${classes.headerWrap}`}
              >
                {showfilter !== '' && (
                  <IconButton
                    // className={showfilter === '' ? 'iconButton customClass' : 'visibilityHidden iconButton'}
                    className={
                      showfilter === ''
                        ? 'iconButton'
                        : years[0] === new Date(minDate!).getFullYear() || MIN_YEAR === years[0]
                        ? 'disableClass'
                        : 'visibilityHidden iconButton'
                    }
                    color="primary"
                    onClick={() => {
                      handleNavidatorLeft();
                    }}
                  >
                    {<LeftIcon />}
                  </IconButton>
                )}
                <div className="filterContainer">
                  <IconButton
                    data-type={showfilter === 'months' ? '' : showfilter !== '' ? 'hidden' : ''}
                    className={`${classes.defaultIconButton} filterButton`}
                    color="primary"
                    onClick={() => setShowfilter((pre) => (pre === 'months' ? '' : 'months'))}
                  >
                    {dateState.month} {<DownIcon />}
                  </IconButton>
                  <IconButton
                    data-type={showfilter === 'years' ? '' : showfilter !== '' ? 'hidden' : ''}
                    className={`${classes.defaultIconButton} filterButton`}
                    color="primary"
                    onClick={() => setShowfilter((pre) => (pre === 'years' ? '' : 'years'))}
                  >
                    {dateState.year} {<DownIcon />}
                  </IconButton>
                </div>
                {showfilter !== '' && (
                  <IconButton
                    className={showfilter === '' ? 'iconButton customClass' : 'visibilityHidden iconButton'}
                    color="primary"
                    onClick={handleNavidatorRight}
                  >
                    {<RightIcon />}
                  </IconButton>
                )}
              </div>
              <CalendarPicker
                {...restProps}
                showDaysOutsideCurrentMonth
                // leftArrowIcon={LeftIcon}
                // rightArrowIcon={RightIcon}
                // lef

                maxDate={maxDate}
                minDate={minDate}
                className={classes.staticCalendar}
                date={dateState.date}
                onChange={(e) => onDateChange(e!)}
                onMonthChange={onMonthChange}
                disablePast={disablePast}
                // allowKeyboardControl={!disabledKeyboardControl}
              />
              {/* </MuiPickersUtilsProvider> */}
            </LocalizationProvider>
          </ThemeProvider>
        );
    }
  };

  return (
    <div className={`${classes.calenderWraper} ${customStyle}`}>
      <div className={showfilter !== '' ? `${classes.calendarMonthHeader}` : ` ${classes.calenderHeader} ${classes.headerWrap}`}>
        {showfilter !== '' && (
          <IconButton
            className={
              showfilter === ''
                ? 'iconButton'
                : showfilter === 'months' || years[0] === new Date(minDate!).getFullYear() || MIN_YEAR === years[0]
                ? 'disableClass'
                : 'visibilityHidden iconButton'
            }
            color="primary"
            onClick={() => {
              handleNavidatorLeft();
            }}
          >
            {<LeftIcon />}
          </IconButton>
        )}
        <div className="filterContainer">
          <IconButton
            data-type={showfilter === 'months' ? '' : showfilter !== '' ? 'hidden' : ''}
            className={
              showfilter === 'months'
                ? `${classes.defaultIconButton} filterButton active`
                : `${classes.defaultIconButton} filterButton`
            }
            color="primary"
            onClick={() => setShowfilter((pre) => (pre === 'months' ? '' : 'months'))}
          >
            {dateState.month}  {<DownIcon />}
          </IconButton>
          <IconButton
            data-type={showfilter === 'years' ? '' : showfilter !== '' ? 'hidden' : ''}
            className={
              showfilter === 'years'
                ? `${classes.defaultIconButton} filterButton active`
                : `${classes.defaultIconButton} filterButton`
            }
            color="primary"
            onClick={() => setShowfilter((pre) => (pre === 'years' ? '' : 'years'))}
          >
            {dateState.year}  {<DownIcon />}
          </IconButton>
        </div>
        {showfilter !== '' && (
          <IconButton
            className={
              showfilter === ''
                ? 'iconButton'
                : showfilter === 'months' || years.includes(new Date(maxDate!).getFullYear())
                ? 'disableClass'
                : 'visibilityHidden iconButton'
            }
            color="primary"
            onClick={handleNavidatorRight}
          >
            {<RightIcon />}
          </IconButton>
        )}
      </div>
      {renderFilterOptions()}
    </div>
  );
}
