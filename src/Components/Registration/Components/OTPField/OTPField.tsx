import React, { useEffect, useRef, useState } from 'react';
import { useStyles } from './OTPField.styles';
import { IProps } from './OTPField.types';
// import InputField from '../../../LibraryComponents/InputField/InputField';
import { Input, TextField } from '@mui/material';
import InputField from '../../../LibraryComponents/InputField/InputField';

const OTPField = (props: IProps) => {
  const otpLength = props.numInputs || 4;

  const { classes } = useStyles();
  const [otp, setOtp] = useState<string>(props.value || '');

  useEffect(() => {
    props.onChange?.(otp);
  }, [otp]);

  return (
    <div className={classes.inputContainer}>
      <InputField
        // placeholder="OTP"
        className={classes.input}
        inputProps={{
          maxLength: 4,
        }}
        type="text"
        value={otp}
        onChange={(e) => {
          // allow only numbers
          if (isNaN(Number(e.target.value))) return;
          if (e.target.value.length > 4) return;
          setOtp(e.target.value);
        }}
        onPaste={(e) => {
          e.preventDefault();
          const clipboard = e.clipboardData.getData('Text');
          const hasNonNumberValues = isNaN(Number(clipboard));
          if (hasNonNumberValues) return;
          let newOtp = clipboard.slice(0, 4);
          setOtp(newOtp);
        }}
        autoFocus
      />
    </div>
  );
};

export default OTPField;
