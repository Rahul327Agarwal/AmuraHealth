import DateFnsUtils from '@date-io/date-fns';
import { TextField, ThemeProvider } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { CalendarIconV3 } from '../../SVGs/Common';
import CalendarDrawer from './CalendarDrawer';
import { materialTheme, useStyles } from './MUIDatePicker.styles';
import { IProps } from './MUIDatePicker.types';
export default function MUIDatePicker(props: IProps) {
  const {
    format,
    date,
    setDate,
    placeholder,
    readOnly,
    label,
    disabled,
    helperText,
    clickedOnCalender,
    dontOpenCalander,
    changeBgColor,
    borderBottom,
    onDrawerStateChange,
    ...restProps
  } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  const [isOpen, setIsOpen] = useState(false);
  // const [changebgColor, setChangebgColor] = useState(false);

  useEffect(() => {
    onDrawerStateChange?.(isOpen);
  }, [isOpen]);

  const handleOpen = (e: any) => {
    e.preventDefault();
    if (disabled) return;
    setIsOpen(true);
    if (clickedOnCalender) {
      clickedOnCalender(true);
    }
  };

  return (
    <>
      <div className={`${classes.rootStyle} ${borderBottom && classes.borderBottom}`}>
        <ThemeProvider theme={materialTheme}>
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
          <LocalizationProvider dateAdapter={DateFnsUtils}>
            <div className={`${classes.inputWraper} ${commonClasses.body15Medium}`} onClick={handleOpen}>
              <DatePicker
                {...restProps}
                open={false}
                value={typeof date === 'string' ? parseISO(date as any as string) : date}
                toolbarPlaceholder={placeholder || 'Select Date'}
                onChange={(date) => setDate(date)}
                // toolbarFormat={format || 'dd/MM/yyyy'}
                inputFormat={format || 'dd/MM/yyyy'}
                className={`${commonClasses.body15Medium} ${classes.inputStyle}`}
                label={label}
                disabled={disabled}
                readOnly={true}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={Boolean(helperText)}
                    helperText={helperText}
                    autoComplete="off"
                    className={`${commonClasses.body15Medium} ${date && 'highlightBorder'} myDatePicker`}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <div className={classes.calendarIcon} onClick={handleOpen}>
                          {<CalendarIconV3 />}
                        </div>
                      ),

                      readOnly: isOpen && !dontOpenCalander ? true : readOnly, // TODO: Was not originally here
                    }}
                  />
                )}
              />
            </div>
          </LocalizationProvider>
          {/* </MuiPickersUtilsProvider> */}
        </ThemeProvider>
      </div>

      {isOpen && !dontOpenCalander && (
        <CalendarDrawer isOpen={isOpen} setIsOpen={setIsOpen} {...props} changeBgColor={changeBgColor} />
      )}
    </>
  );
}
