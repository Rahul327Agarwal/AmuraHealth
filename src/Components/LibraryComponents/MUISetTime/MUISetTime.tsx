import { InputAdornment } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { secondsToTime } from '../../../Common/Common.functions';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { ArrowDown } from '../../SVGs/Common';
import InputField from '../InputField/InputField';
import MUIButton from '../MUIButton/MUIButton';
import MUIDrawer from '../MUIDrawer/MUIDrawer';
import RadioGroup from '../MUIRadioGroup/MUIRadioGroup';
import { useStyles } from './MUISetTime.styles';
import { IProps } from './MUISetTime.types';

const defaultSuggestedOptions = [
  { label: '60 minutes', value: '60' },
  { label: '45 minutes', value: '45' },
  { label: '30 minutes', value: '30' },
  { label: '20 minutes', value: '20' },
  { label: '10 minutes', value: '10' },
  { label: '05 minutes', value: '05' },
];

const INIT_STATE = { hours: '', minutes: '', seconds: '' };

export default function MUISetTime(props: IProps) {
  const {
    headerTitle,
    onTimeChange,
    inputLabel,
    isSuggestion,
    allowSeconds,
    suggestedOptions,
    helperText,
    inputValue,
    validMinutes,
  } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [suggested, setSuggested] = useState('');
  const [time, setTime] = useState(INIT_STATE);
  const [timeValue, setTimeValue] = useState(inputValue);
  const [error, setError] = useState(INIT_STATE);

  const timeString = secondsToTime(Number(timeValue ?? '0')).timeString;

  useEffect(() => {
    if (isOpen) {
      setTimeValue(inputValue ?? '0');
      if (inputValue) {
        const value = Number(inputValue ?? '0');
        const { hours, minutes, seconds } = secondsToTime(value);
        setTime({
          hours: value ? hours.toString().padStart(2, '0') : '',
          minutes: value ? minutes.toString().padStart(2, '0') : '',
          seconds: value ? seconds.toString().padStart(2, '0') : '',
        });
      } else {
        setTime(INIT_STATE);
      }
    }
  }, [inputValue, isOpen]);

  useEffect(() => {
    setTimeValue(inputValue);
  }, [inputValue]);

  const handleClose = () => {
    setIsOpen(false);
    setTime(INIT_STATE);
    setError(INIT_STATE);
    setSuggested('');
  };
  const handleOpen = () => setIsOpen(true);

  const handleHours = (value) => {
    setSuggested('');
    setError(INIT_STATE);
    const hours = value.length > 2 ? value.substring(1) : value;
    if (/^\d{0,4}$/.test(hours) || value === '') {
      const hours1 = Number(hours).toString().padStart(2, '0');
      setTime((pre) => ({ ...pre, hours: hours1 }));
    }
  };
  const handleMinutes = (value) => {
    setSuggested('');
    setError(INIT_STATE);
    const minutes = value.length > 2 ? value.substring(1) : value;
    if (/^\d{0,4}$/.test(minutes) || value === '') {
      const minutes1 = Number(minutes).toString().padStart(2, '0');
      setTime((pre) => ({ ...pre, minutes: minutes1 }));
    }
  };

  const handleSeconds = (value) => {
    setSuggested('');
    setError(INIT_STATE);
    const seconds = value.length > 2 ? value.substring(1) : value;
    if (/^\d{0,4}$/.test(seconds) || value === '') {
      const seconds1 = Number(seconds).toString().padStart(2, '0');
      setTime((pre) => ({ ...pre, seconds: seconds1 }));
    }
  };

  const handleSuggestMinutes = (value, isSuggested) => {
    setSuggested('');
    setError(INIT_STATE);
    const trimVal = value.length > 2 ? value.substring(1) : value;
    if (/^\d{0,4}$/.test(trimVal) || value === '') {
      const number = (Number(trimVal) / 60).toString().split('.');
      const v1 = Number(number?.[0]);
      const v2 = Math.round((Number(trimVal) / 60 - v1) * 60);
      const hours = Number(isSuggested ? v1 : Number(time.hours) + v1)
        .toString()
        .padStart(2, '0');
      const minutes = Number(v2).toString().padStart(2, '0');
      setTime((pre) => ({ ...pre, hours, minutes, seconds: '00' }));
    }
  };
  const handleSuggest = (value) => {
    if (value) handleSuggestMinutes(value, true);
    else setTime((pre) => ({ ...pre, hours: '00', minutes: '00', seconds: '00' }));
    setSuggested(value);
  };
  const handleDone = () => {
    const totalMinutes = Number(time.hours) * 60 + Number(time.minutes);
    const totalSeconds = totalMinutes * 60 + Number(time.seconds);
    if (totalMinutes == 0 && Number(time.hours) > 99 && Number(time.minutes) > 59 && Number(time.seconds) > 59) {
      setError({
        hours: 'Please enter valid time',
        minutes: 'Please enter valid time',
        seconds: 'Please enter valid time',
      });
      return;
    }
    if (Number(time.hours) > 99) {
      setError({ hours: 'Please enter valid time', minutes: '', seconds: '' });
      return;
    }
    if (Number(time.minutes) > 59) {
      setError({ hours: '', minutes: 'Please enter valid time', seconds: '' });
      return;
    }
    if (Number(time.seconds) > 59) {
      setError({ hours: '', minutes: '', seconds: 'Please enter valid time' });
      return;
    }
    if (totalSeconds < 1 && validMinutes) {
      setError({ hours: '', minutes: '', seconds: 'Please enter valid time' });
      return;
    }
    setTimeValue(`${totalSeconds}`);
    onTimeChange({ ...time, totalMinutes, totalSeconds });
    handleClose();
  };

  return (
    <div className={classes.rootContainer}>
      <InputField
        inputProps={{ readOnly: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <ArrowDown />
            </InputAdornment>
          ),
        }}
        label={inputLabel}
        value={timeString}
        fullWidth
        onClick={handleOpen}
        helperText={helperText}
      />
      <MUIDrawer anchor={'bottom'} headerTitle={inputLabel} open={isOpen} handleClose={handleClose} handleOpen={handleOpen}>
        <div className={classes.headerTitle}>{headerTitle}</div>
        <div className={classes.inputWrapper}>
          <InputField
            className={classes.inputStyle}
            label="Hours"
            value={time.hours}
            onChange={(e) => handleHours(e.target.value)}
          />
          <InputField
            className={classes.inputStyle}
            label="Minutes"
            value={time.minutes}
            onChange={(e) => handleMinutes(e.target.value)}
          />
          {allowSeconds ? (
            <InputField
              className={classes.inputStyle}
              label="Seconds"
              value={time.seconds}
              onChange={(e) => handleSeconds(e.target.value)}
            />
          ) : null}
        </div>
        {error && (
          <div className={classes.inputWrapper}>
            <span className={`${commonClasses.caption12Regular} ${classes.errorText}`}>{error.hours}</span>
            <span className={`${commonClasses.caption12Regular} ${classes.errorText}`}>{error.minutes}</span>
            <span className={`${commonClasses.caption12Regular} ${classes.errorText}`}>{error.seconds}</span>
          </div>
        )}
        {isSuggestion ? (
          <>
            <div className={classes.headerTitle}>Suggested times </div>
            <RadioGroup
              variant={'token'}
              options={suggestedOptions || defaultSuggestedOptions}
              value={suggested}
              setValue={handleSuggest}
            />
          </>
        ) : null}
        <MUIButton className={classes.mt} onClick={handleDone} fullWidth variant="contained" size="large">
          Done
        </MUIButton>
      </MUIDrawer>
    </div>
  );
}
