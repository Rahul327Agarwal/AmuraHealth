import React from 'react';
import { forwardRef } from 'react';
import { TextField } from '@mui/material';
import { makeStyles, withStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({}));

const BootstrapTextInput = withStyles(TextField, () => ({
  root: {
    height: '45px',
    '& input:valid + fieldset': {
      padding: '0px 0px !important',
      background: '#FFF',
      // height:"45px !important"
      // width: "210px",
    },
    '& .MuiInputBase-input': {
      padding: '0px 0px !important',
      background: '#FFF !important',
      color: '#1B1B1B !important',
      height: '45px',
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    fontSize: 12,
    boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)',
    color: '#FFF',
    padding: '10px 8px 10px 12px',
    // Use the system font instead of the default Roboto font.

    '&:focus': {
      borderRadius: 2,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

const PhoneNumberRegister = (props, ref) => {
  const classes = useStyles();

  return (
    <BootstrapTextInput
      {...props}
      InputProps={{
        disableUnderline: true,
      }}
      inputRef={ref}
      size="small"
    />
  );
};
export default forwardRef(PhoneNumberRegister);
