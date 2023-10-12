import { Button, FormControlLabel, TextField } from '@mui/material';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { ToastContainer } from 'react-toastify';
import { withStyles } from 'tss-react/mui';
import { PMS_LOCALE } from '../../../Utils';
import PhoneInputField from '../Components/InputField/PhoneInputField/PhoneInputField';
import PhoneNumberRegister from './PhoneNumberRegister';
import { registerNewUser } from './Register.functions';
import { RegisterStyles } from './Register.styles';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';

const ValidationTextField = withStyles(TextField, {
  root: {
    height: '45px',
    // font: "Inter !important",
    //fontfamily: "Inter !important",
    // border: "1px solid #D8D8D8",
    border: 'none !important',
    paddingLeft: '7px',
    '& input:valid:hover + fieldset': {
      border: '1px solid #D8D8D8',
      paddingBottom: '0px !important',
      paddingRight: '0px !important',
      paddingLeft: '7px',
    },
    '& input:valid:focus + fieldset': {
      border: '1px solid #D8D8D8',
      paddingBottom: '0px !important',
      paddingRight: '0px !important',
      paddingLeft: '7px',
    },
    '& .MuiInputBase-input': {
      padding: '0px 5px !important',
      background: '#FFF !important',
      color: '#1B1B1B !important',
      height: '45px',
      //fontfamily: "Inter !important",
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    fontSize: 12,
    // color: "#FFF",
    // padding: "10px 8px 10px 12px",
    // Use the system font instead of the default Roboto font.

    // "&:hover": {
    //   borderRadius: 2,
    //   boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    // },
  },
});

const MultilineTextField = withStyles(TextField, {
  root: {
    border: 'none !important',
    paddingLeft: '7px',
    '& input:valid:hover + fieldset': {
      border: '1px solid #D8D8D8 !important',
      paddingBottom: '0px !important',
      paddingRight: '0px !important',
      background: '#FFF !important',
      paddingLeft: '7px',
    },
    '& input:valid:focus + fieldset': {
      background: '#FFF !important',
      border: '1px solid #D8D8D8 !important',
      paddingBottom: '0px !important',
      paddingRight: '0px !important',
      paddingLeft: '7px',
    },
    '& .MuiInput-underline:after': {
      border: '1px solid #D8D8D8 !important',
    },
    '& .MuiInputBase-input': {
      border: '0px solid #D8D8D8 !important',
      padding: '6px 14px',
      background: '#FFF !important',
      color: 'black !important',
      fontSize: '14px',
      borderRadius: '5px',
    },
    '& .MuiOutlinedInput-multiline': {
      background: '#FFF !important',
      padding: '0px !Important',
    },
    '& .MuiOutlinedInput-multiline.MuiOutlinedInput-marginDense': {
      padding: '0px 0px !important',
    },
    '& .MuiOutlinedInput-root': {
      width: '100% !important',
      background: 'transparent !important',
      padding: '0px !important',
      '& fieldset': {
        padding: '0px !important',
      },
      '&:hover fieldset': {
        border: '1px solid #D8D8D8 !important',
      },
      '&.Mui-focused fieldset': {
        border: '1px solid #D8D8D8 !important',
      },
      '&.Mui-disabled fieldset': {
        border: '1px solid #D8D8D8 !important',
      },
    },
  },
  input: {
    borderRadius: 4,
    background: '#FFF !important',
    position: 'relative',
    fontSize: 12,
  },
});

export default function Register() {
  const { classes } = RegisterStyles();
  const [registerUser, setRegisterUser] = useState({
    FirstName: '',
    LastName: '',
    EmailId: '',
    PhoneNumber: '',
    HealthObjective: '',
    askToTalk: 'false',
  });

  const [errorObject, seterrorObject] = useState({
    FirstName: '',
    EmailId: '',
    PhoneNumber: '',
  });

  return (
    <div className={classes.mainContainer}>
      <header>
        <div className="login-grid-item">
          <img src={`${import.meta.env.VITE_AMURAFILES_BUCKET_AMURA_LOGO}`} className="logo" alt="Amura" />
        </div>
      </header>
      <div style={{ margin: '0px auto', display: 'table' }}>
        <div
          style={{
            textAlign: 'center',
            fontSize: '18px',
            marginBottom: '40px',
            marginTop: '20px',
          }}
        >
          Enter your details
        </div>
        <div className={classes.textStyle}>Mobile Number*</div>

        <div className={classes.paddingLeft}>
          <div className={'registerPhoneInput'}>
            <PhoneInputField
              focusBorder="#000000"
              hoverBorder="#1B1B1B"
              fontColor="#000000"
              autoFocus={true}
              // label={`${MOBILE_NUMBER}`}
              value={registerUser.PhoneNumber}
              handleOnChange={(e: string) => {
                setRegisterUser({ ...registerUser, PhoneNumber: e.replace(/[^A-Z0-9+]/gi, '') });
              }}
              // onKeyPress={(e: any) => {
              //   if (e.key === 'Enter') handleLogin();
              // }}
              showError={true}
              // errorText={usernameError}
            />
          </div>
        </div>

        <div className={classes.errorMessage}>{errorObject.PhoneNumber}</div>
        <div className={classes.textStyle}>First Name*</div>
        <ValidationTextField
          size="small"
          variant="outlined"
          value={registerUser.FirstName}
          onChange={(event) => {
            setRegisterUser({ ...registerUser, FirstName: event.target.value });
          }}
          style={{
            width: '100%',
            borderRadius: '2px',
          }}
        />
        <div className={classes.errorMessage}>{errorObject.FirstName}</div>
        <div className={classes.textStyle}>Last Name</div>

        <ValidationTextField
          size="small"
          value={registerUser.LastName}
          variant="outlined"
          onChange={(event) => {
            setRegisterUser({ ...registerUser, LastName: event.target.value });
          }}
          style={{
            width: '100%',
            borderRadius: '2px',
          }}
        />
        <div className={classes.textStyle}>Email</div>
        <ValidationTextField
          size="small"
          variant="outlined"
          value={registerUser.EmailId}
          onChange={(event) => {
            setRegisterUser({ ...registerUser, EmailId: event.target.value });
          }}
          style={{
            width: '100%',
            borderRadius: '2px',
          }}
        />
        <div className={classes.errorMessage}>{errorObject.EmailId}</div>
        <div className={classes.textStyle}>Health Objective</div>
        <MultilineTextField
          size="small"
          variant="outlined"
          minRows={4}
          multiline
          value={registerUser.HealthObjective}
          onChange={(event) => {
            setRegisterUser({
              ...registerUser,
              HealthObjective: event.target.value,
            });
          }}
          style={{
            width: '100%',
            borderRadius: '2px',
          }}
        />
        <Button
          style={{ width: '100%', marginTop: '20px' }}
          variant="contained"
          onClick={() => {
            console.log(registerUser, 'registerUser');
            registerNewUser('main', registerUser, seterrorObject, setRegisterUser);
          }}
          className={classes.centerButtonStyle}
        >
          {PMS_LOCALE.translate('Register')}
        </Button>
      </div>
      <footer></footer>
      <ToastContainer />
    </div>
  );
}
