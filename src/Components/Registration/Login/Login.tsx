import { CircularProgress } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetUserInfo } from '../../../DisplayFramework/State/Slices/Auth';
import { AmuraLoginLog } from '../../SVGs/Common';
import InputField from '../Components/InputField/InputField';
import PhoneInputField from '../Components/InputField/PhoneInputField/PhoneInputField';

import Error from '../Error';
import { IProps, LOG_IN, MOBILE_NUMBER, PASSWORD, SOMETHING_WENT_WRONG, USERNAME } from '../Registration.types';
import { signIn } from './Login.functions';
import { useStyles } from './Login.styles';
import { ILoginResponse } from './Login.types';

import LoginScreenImage from '../assets/LoginScreenImage.png';
import pageBottom from '../assets/pageBottom.png';
import Button from '../Components/Button/Button';

export default function Login(props: IProps) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  // const [rememberMe, setRememberMe] = React.useState(false);
  const [usernameError, setUsernameError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [disableLogin, setDisableLogin] = React.useState(false);
  const [loginWithOTP, setLoginWithOTP] = React.useState(true);
  const [error, setError] = React.useState('');

  const navigate = useNavigate();
  const setUserInfo = useSetUserInfo();

  const handleLogin = async () => {
    setDisableLogin(true);
    setError('');
    try {
      const response = await signIn(username, password, loginWithOTP);

      setUserInfo({
        cameFrom: 'Login',
        userName: username,
        password: password,
        cognitoUser: response.user,
      });

      if (loginWithOTP) {
        navigate('/verify');
      } else {
        setUserInfo({
          cameFrom: '',
          userName: username,
          password: password,
          cognitoUser: null,
        });
        localStorage.setItem('UserLoggedIn', JSON.stringify(true));
      }
    } catch (e) {
      const error = e as ILoginResponse;

      setPasswordError(error.password);
      setUsernameError(error.userName);
      if (!error.userName && !error.password) setError(`${SOMETHING_WENT_WRONG}`);
    }
    setDisableLogin(false);
  };

  const { classes } = useStyles();

  return (
    <div className={classes.body}>
      <div className={classes.topIcon}>
        <span className={classes.logo}>{<AmuraLoginLog />}</span>
      </div>
      <div className={classes.bodyContent}>
        <div className={classes.bodyContentFlex}>
          <div className={classes.bodyContextChild1}>
            <div className={classes.loginCard}>
              {/* <div className={classes.logo}>{AmuraLoginLog}</div> */}
              <div>
                {!loginWithOTP ? (
                  <div className={classes.margin12px}>
                    <InputField
                      focusBorder="#000000"
                      hoverBorder="#1B1B1B"
                      fontColor="#000000"
                      autoFocus={true}
                      label={`${USERNAME}`}
                      value={username}
                      onBlur={() => {}}
                      handleOnChange={(e: string) => {
                        setUsername(e);
                        setUsernameError('');
                      }}
                      showError={true}
                      errorText={usernameError}
                      addAdditional8px={true}
                    />
                  </div>
                ) : (
                  <div className={classes.margin12px}>
                    <PhoneInputField
                      focusBorder="#000000"
                      hoverBorder="#1B1B1B"
                      fontColor="#000000"
                      autoFocus={true}
                      label={`${MOBILE_NUMBER}`}
                      value={username}
                      handleOnChange={(e: string) => {
                        setUsername(e.replace(/[^A-Z0-9+]/gi, ''));
                        setUsernameError('');
                      }}
                      onKeyPress={(e: any) => {
                        if (e.key === 'Enter') handleLogin();
                      }}
                      showError={true}
                      errorText={usernameError}
                    />
                  </div>
                )}
                {!loginWithOTP ? (
                  <div className={classes.margin12px}>
                    <InputField
                      focusBorder="#000000"
                      hoverBorder="#1B1B1B"
                      fontColor="#000000"
                      label={`${PASSWORD}`}
                      value={password}
                      onBlur={() => {}}
                      handleOnChange={(e: string) => {
                        setPassword(e);
                        setPasswordError('');
                      }}
                      showError={true}
                      isPassword={true}
                      errorText={passwordError}
                      addAdditional8px={true}
                      onKeyPress={(e: any) => {
                        if (e.key === 'Enter') {
                          handleLogin();
                        }
                      }}
                    />
                  </div>
                ) : null}
                {/* feature to be introduced later
           <div>
             <CheckBox
               disabled={true}
               label={`${KEEP_ME_LOGGED_IN}`}
               value={rememberMe}
               handleCheck={(e) => {
                 setRememberMe(e);
               }}
             />
           </div> */}
                <Error error={error} />
                <div className={classes.logInButtonDiv}>
                  <Button
                    variant="contained"
                    fullWidth
                    label={
                      <>
                        {disableLogin ? (
                          <span className={classes.loaderSpan}>
                            <CircularProgress className={classes.loader} />
                          </span>
                        ) : null}
                        <span>{`${LOG_IN}`}</span>
                      </>
                    }
                    disabled={disableLogin}
                    handleClick={() => {
                      handleLogin();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={`${classes.hideLeftImage} ${classes.rightImageDiv}`}>
            <div>
              <span className={classes.rightImageSpan}>
                <img width="760" height="913" src={LoginScreenImage} className={classes.rightImage} alt="Login Screen" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.bottomImage}>
        <img src={pageBottom} width={'100%'} className={classes.visibility} alt="Bottom" />
      </div>
    </div>
  );
}
