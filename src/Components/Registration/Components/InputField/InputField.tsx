import React, { useState } from 'react';
import { IProps } from './InputField.types';
import { InputAdornment, TextField as MUIInputField } from '@mui/material';
import { useStyles } from './InputField.styles';
import { VisibilityIcon, VisibilityOffIcon } from './InputField.svg';
import { PMS_LOCALE } from '../../../../Utils';

export default function InputField(props: IProps) {
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
    customStyle,
    endAdornmentIcon,
    inputProps,
    title,
  } = props;
  const [error, setError] = useState('');
  const [visibility, setVisibility] = useState(true);
  const { classes } = useStyles(props);
  return (
    <div className={`${disabled ? classes.disabled : ''} ${customStyle}`}>
      {label && (
        <div>
          <span className={classes.label} title={label}>
            {PMS_LOCALE.translate(label)}
          </span>
        </div>
      )}
      <MUIInputField
        autoFocus={autoFocus}
        type={isPassword && visibility ? 'password' : 'text'}
        className={`${classes.InputField} ${disabled ? classes.inputDisabled : ''} ${
          (error || errorText) && showError ? classes.inputError : ''
        } ${customStyle}`}
        placeholder={placeholder}
        value={value}
        title={title ? title : false}
        onChange={(e) => {
          handleOnChange(e.target.value);
        }}
        onBlur={() => {
          if (onBlur) onBlur();
          if (showError && validate) setError(validate(value));
        }}
        onFocus={() => {
          if (onFocus) onFocus();
        }}
        onKeyDown={(e) => {
          if (onKeyPress) onKeyPress(e);
        }}
        inputProps={inputProps}
        InputProps={{
          endAdornment: endAdornmentIcon || (
            <>
              {visibility && isPassword && (
                <InputAdornment position="end">
                  <VisibilityOffIcon
                    className={classes.passwordEye}
                    onClick={() => {
                      setVisibility(!visibility);
                    }}
                  />
                </InputAdornment>
              )}
              {!visibility && isPassword && (
                <InputAdornment position="end">
                  <VisibilityIcon
                    className={classes.passwordEye}
                    onClick={() => {
                      setVisibility(!visibility);
                    }}
                  />
                </InputAdornment>
              )}
            </>
          ),
        }}
        multiline={rows ? true : false}
        maxRows={rows}
        minRows={rows}
        disabled={disabled ? true : false}
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
