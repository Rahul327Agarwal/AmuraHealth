import React, { useState } from 'react';
import { IProps } from './PhoneInputField.types';
import { useStyles } from './PhoneInputField.styles';
import { MuiTelInput } from 'mui-tel-input';
import { isValidPhoneNumber } from 'react-phone-number-input';

export default function PhoneInputField(props: IProps) {
  const {
    placeholder,
    label,
    value,
    handleOnChange,
    onBlur,
    validate,
    showError,
    disabled,
    rows,
    isPassword,
    errorText,
    onFocus,
    autoFocus,
    onKeyPress,
  } = props;
  const [error, setError] = useState('');
  const [visibility, setVisibility] = useState(true);
  const { classes } = useStyles(props);
  return (
    <div className={disabled ? classes.disabled : ''}>
      <div>
        <span className={classes.label}>{label}</span>
      </div>
      <MuiTelInput
        MenuProps={{
          className: classes.PopperRoot,
        }}
        autoFocus={autoFocus}
        className={`${classes.InputField} ${disabled ? classes.inputDisabled : ''} ${
          (error || errorText) && showError ? classes.inputError : ''
        }`}
        defaultCountry={'IN'}
        onChange={(e) => {
          handleOnChange(e);
        }}
        onKeyDown={(e) => {
          if (onKeyPress) onKeyPress(e);
        }}
        value={value}
        onBlur={() => {
          if (onBlur) onBlur();
          if (showError && validate) setError(validate(value));
        }}
        onFocus={() => {
          if (onFocus) onFocus();
        }}
        variant="standard"
        disableFormatting={true}
        forceCallingCode={true}
      />
      {showError ? (
        <div>
          <span className={classes.errorText}>{error}</span>
        </div>
      ) : null}
      {showError && errorText ? (
        <div>
          <span className={classes.errorText}>{errorText}</span>
        </div>
      ) : null}
    </div>
  );
}
