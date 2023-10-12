import React, { useEffect } from 'react';
import { useStyles } from './ForgotPassword.styles';
import { confirmed } from './../assets/confirmed-lottie';
import immg from '../assets/LoginScreenImage.png';
import bottomImg from '../assets/pageBottom.png';

// import Lottie from "react-lottie";
import {
  checkPasswordRequirements,
  ILoginResponse,
  passwordRequirements,
  passwordRequirementsText,
} from './ForgotPassword.types';
import { submitResetPassword, triggerResetPassword } from './ForgotPassword.functions';
import {
  AN_OTP_IS_TRIGERRED,
  BACK,
  CLICK_HERE_TO_LOGIN,
  CONFIRM_PASSWORD,
  CONTINUE,
  FORGOT_PASSWORD_TITLE,
  IProps,
  PASSWORD,
  PASSWORD_CHANGED,
  PLEASE_ENTER_OTP,
  PLEASE_ENTER_USERNAME,
  SOMETHING_WENT_WRONG,
  UPDATE,
  USERNAME_LABEL,
  YOUR_PASSWORD_IS_SECURE,
} from '../Registration.types';
import Error from '../Error';
import { CircularProgress } from '@mui/material';
import { AmuraLoginLog, LoginPasswordTick } from './ForgotPassword.svg';
import InputField from '../Components/InputField/InputField';
import Button from '../Components/Button/Button';
import Link from '../Components/Link/Link';
import { useSetUserInfo, useUserInfo } from '../../../DisplayFramework/State/Slices/Auth';
import { useNavigate } from 'react-router-dom';
import OTPField from '../Components/OTPField/OTPField';

export default function SignUp(props: IProps) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: confirmed,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  // const { loginCredentials, setLoginCredentials, Auth, AmplifyConfigure, history } = props;
  const loginCredentials = useUserInfo();
  const setLoginCredentials = useSetUserInfo();
  const navigate = useNavigate();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordFocused, setPasswordFocused] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState('');
  const [usernameError, setUsernameError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [disableLogin, setDisableLogin] = React.useState(false);
  const [triggeredReset, setTrigerredReset] = React.useState(false);
  const [OTP, setOTP] = React.useState('');
  const [OTPError, setOTPError] = React.useState('');
  const [error, setError] = React.useState('');
  const { classes } = useStyles();
  const [passwordChanged, setPasswordChanged] = React.useState(false);
  const passwordSuggestion = (value: keyof typeof passwordRequirements) => {
    return (
      <span
        className={
          passwordRequirements[value] && passwordRequirements[value](password)
            ? classes.passwordRequirement
            : classes.passwordRequirementError
        }
      >
        <span className={classes.marginRight3px}>{<LoginPasswordTick />}</span>
        {passwordRequirementsText[value]}
      </span>
    );
  };
  useEffect(() => {
    if (!loginCredentials?.cameFrom && loginCredentials?.cameFrom !== 'Login') {
      navigate('/login');
    }
  }, []);
  return (
    <div className={classes.body}>
      <div className={classes.topIcon}>
        <span className={classes.logo}>{<AmuraLoginLog />}</span>
      </div>
      <div className={classes.bodyContent}>
        <div className={classes.bodyContentFlex}>
          <div className={classes.bodyContextChild1}>
            {' '}
            <div className={classes.loginCard}>
              {/* <div className={classes.logo}>{AmuraLoginLog}</div> */}
              {!passwordChanged ? (
                <div>
                  <div className={classes.logIn}>
                    {/* <div className={classes.margin8px}>
                      <span
                        className={classes.logInSpan}
                      >{`${FORGOT_PASSWORD_TITLE}`}</span>
                    </div> */}
                    <div className={classes.margin12px}>
                      <span className={classes.needAccount}>
                        {triggeredReset ? `${AN_OTP_IS_TRIGERRED}` : `${PLEASE_ENTER_USERNAME}`}
                      </span>
                    </div>
                  </div>
                  <div className={classes.margin12px}>
                    <InputField
                      addAdditional8px={true}
                      focusBorder="#000000"
                      hoverBorder="#1B1B1B"
                      fontColor="#000000"
                      autoFocus={true}
                      label={`${USERNAME_LABEL}`}
                      value={username}
                      onBlur={() => {}}
                      handleOnChange={(e: string) => {
                        setUsername(e);
                        setLoginCredentials({
                          ...loginCredentials,
                          userName: e,
                        });
                        setUsernameError('');
                      }}
                      showError={true}
                      errorText={usernameError}
                    />
                  </div>
                  {triggeredReset ? (
                    <>
                      <div className={classes.margin12px}>
                        <InputField
                          addAdditional8px={true}
                          focusBorder="#000000"
                          hoverBorder="#1B1B1B"
                          fontColor="#000000"
                          onFocus={() => setPasswordFocused(true)}
                          onBlur={() => setPasswordFocused(false)}
                          label={`${PASSWORD}`}
                          value={password}
                          handleOnChange={(e: string) => {
                            setPassword(e);
                            setLoginCredentials({
                              ...loginCredentials,
                              password: e,
                            });
                            setPasswordError('');
                          }}
                          showError={true}
                          isPassword={true}
                          errorText={passwordError}
                        />
                      </div>
                      <div className={classes.passwordFlex}>
                        {passwordFocused || password ? (
                          !checkPasswordRequirements.every((value: string) => (passwordRequirements as any)[value](password)) ? (
                            checkPasswordRequirements.map((value: string) => passwordSuggestion(value as any))
                          ) : (
                            <span className={classes.passwordRequirement}>
                              <span className={classes.marginRight3px}>{<LoginPasswordTick />}</span>
                              {`${YOUR_PASSWORD_IS_SECURE}`}
                            </span>
                          )
                        ) : null}
                      </div>
                      <div className={classes.margin12px}>
                        <InputField
                          addAdditional8px={true}
                          focusBorder="#000000"
                          hoverBorder="#1B1B1B"
                          fontColor="#000000"
                          label={`${CONFIRM_PASSWORD}`}
                          value={confirmPassword}
                          handleOnChange={(e: string) => {
                            setConfirmPassword(e);
                            setLoginCredentials({
                              ...loginCredentials,
                              confirmPassword: e,
                            });
                            setConfirmPasswordError('');
                          }}
                          showError={true}
                          isPassword={true}
                          errorText={confirmPasswordError}
                        />
                      </div>
                      <div className={classes.margin12px}>
                        <span className={classes.needAccount}>{`${PLEASE_ENTER_OTP}`}</span>
                      </div>
                      <OTPField
                        numInputs={6}
                        shouldAutoFocus={true}
                        value={OTP}
                        onChange={(value: any) => {
                          setOTPError('');
                          setOTP(value);
                          setLoginCredentials({
                            ...loginCredentials,
                            otp: value,
                          });
                        }}
                        className={`${classes.OTPinput} ${OTPError ? classes.error : ''}`}
                      />
                      {OTPError ? (
                        <div className={classes.textAlignCenter}>
                          <span className={classes.errorText}>{OTPError}</span>
                        </div>
                      ) : null}
                    </>
                  ) : null}
                  <Error error={error} />
                  <div className={triggeredReset ? classes.flexBox : classes.logInButtonDiv}>
                    {!triggeredReset && (
                      <div className={classes.back}>
                        <Button
                          variant="outlined"
                          label={`${BACK}`}
                          handleClick={() => {
                            if (loginCredentials.cameFrom && loginCredentials.cameFrom === 'Login') {
                              setLoginCredentials({
                                ...loginCredentials,
                                cameFrom: 'verify',
                              });
                              navigate('/login');
                            }
                          }}
                        />
                      </div>
                    )}
                    <div className={!triggeredReset ? classes.confirm : ''}>
                      <Button
                        variant="contained"
                        label={
                          <span className={classes.buttonFlex}>
                            {disableLogin ? (
                              <span className={classes.loaderSpan}>
                                <CircularProgress className={classes.loader} />
                              </span>
                            ) : null}
                            <span className={classes.lineHeight24px}>{triggeredReset ? `${UPDATE}` : `${CONTINUE}`}</span>
                          </span>
                        }
                        disabled={disableLogin}
                        handleClick={() => {
                          setError('');
                          if (!triggeredReset) {
                            setDisableLogin(true);
                            triggerResetPassword(loginCredentials)
                              .then(() => {
                                setTrigerredReset(true);
                                setDisableLogin(false);
                              })
                              .catch((error: ILoginResponse) => {
                                setUsernameError(error.userName);
                                if (!error.userName) setError(`${SOMETHING_WENT_WRONG}`);
                                setDisableLogin(false);
                              });
                          } else {
                            setDisableLogin(true);
                            submitResetPassword(loginCredentials)
                              .then((response: ILoginResponse) => {
                                setPasswordChanged(true);
                              })
                              .catch((error: ILoginResponse) => {
                                setPasswordError(error.password);
                                setUsernameError(error.userName);
                                setConfirmPasswordError(error.confirmPassword);
                              })
                              .finally(() => {
                                setDisableLogin(false);
                              });
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className={classes.margin12px}>
                  <span className={classes.needAccount}>{`${PASSWORD_CHANGED} `}</span>
                  {/* <Lottie options={defaultOptions} height={200} width={200} /> */}
                  <span className={classes.needAccount}>
                    <Link
                      handleClick={() => {
                        setLoginCredentials({
                          ...loginCredentials,
                          userName: '',
                          password: '',
                          confirmPassword: '',
                        });
                        navigate('/login');
                      }}
                      label={`${CLICK_HERE_TO_LOGIN}`}
                      underline={true}
                      color={'#000000'}
                    />
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className={`${classes.hideLeftImage} ${classes.rightImageDiv}`}>
            <div>
              <span className={classes.rightImageSpan}>
                <img width="760" height="913" src={immg} className={classes.rightImage} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.bottomImage}>
        <img src={bottomImg} width={'100%'} className={classes.visibility} />
      </div>
    </div>
  );
}
