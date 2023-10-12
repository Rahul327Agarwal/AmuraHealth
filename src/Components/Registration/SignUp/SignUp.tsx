import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetUserInfo, useUserInfo } from '../../../DisplayFramework/State/Slices/Auth';
import { AmuraLoginLog, LoginPasswordTick } from './SignUp.svg';
import LoginScreenImage from '../assets/LoginScreenImage.png';
import pageBottom from '../assets/pageBottom.png';
import Button from '../Components/Button/Button';
import InputField from '../Components/InputField/InputField';
import Link from '../Components/Link/Link';
import Error from '../Error';
import {
  AGREE_TO,
  CONFIRM_PASSWORD,
  CONTINUE,
  CREATE_AN_AMURA_ACCOUNT,
  HAVE_READ,
  IProps,
  LOG_IN,
  OR,
  PASSWORD,
  PRIVACY_LINK,
  SIGN_UP,
  SOMETHING_WENT_WRONG,
  TERMS_LINK,
  USERNAME_LABEL,
  YOUR_PASSWORD_IS_SECURE,
} from '../Registration.types';
import { handleSignUp } from './SignUp.functions';
import { useStyles } from './SignUp.styles';
import { checkPasswordRequirements, ILoginResponse, passwordRequirements, passwordRequirementsText } from './SignUp.types';

export default function SignUp() {
  const loginCredentials = useUserInfo();
  const setLoginCredentials = useSetUserInfo();

  const navigate = useNavigate();
  //

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordFocused, setPasswordFocused] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState('');
  const [usernameError, setUsernameError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [disableLogin, setDisableLogin] = React.useState(false);
  const [error, setError] = React.useState('');
  const { classes } = useStyles();

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
    if (loginCredentials?.cameFrom === 'PersonalInformation') {
      setUsername(loginCredentials.userName!);
      setPassword(loginCredentials.password!);
    }
    setLoginCredentials({
      ...loginCredentials,
      confirmPassword: '',
      cameFrom: 'SignUp',
    });
    if (loginCredentials?.cameFrom === 'Login') {
      setLoginCredentials({ ...loginCredentials, userName: '', password: '' });
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
            <div className={classes.loginCard}>
              {/* <div className={classes.logo}>{AmuraLoginLog}</div> */}
              <div>
                <div className={classes.logIn}>
                  {/* <div className={classes.margin8px}>
                    <span className={classes.logInSpan}>{`${SIGN_UP}`}</span>
                  </div> */}
                  <div className={classes.margin12px}>
                    <span className={classes.needAccount}>
                      {`${CREATE_AN_AMURA_ACCOUNT} ${OR} `}
                      <span>
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
                          label={`${LOG_IN}`}
                          underline={true}
                          color={'#000000'}
                        />
                      </span>
                    </span>
                  </div>
                </div>
                <div className={classes.margin12px}>
                  <InputField
                    focusBorder="#000000"
                    hoverBorder="#1B1B1B"
                    fontColor="#000000"
                    autoFocus={true}
                    label={`${USERNAME_LABEL}`}
                    value={username}
                    onBlur={() => {}}
                    handleOnChange={(e: string) => {
                      setUsername(e);
                      setLoginCredentials({ ...loginCredentials, userName: e });
                      setUsernameError('');
                    }}
                    showError={true}
                    errorText={usernameError}
                    addAdditional8px={true}
                  />
                </div>
                <div className={classes.margin12px}>
                  <InputField
                    focusBorder="#000000"
                    hoverBorder="#1B1B1B"
                    fontColor="#000000"
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    label={`${PASSWORD}`}
                    value={password}
                    handleOnChange={(e: string) => {
                      setPassword(e);
                      setLoginCredentials({ ...loginCredentials, password: e });
                      setPasswordError('');
                    }}
                    showError={true}
                    isPassword={true}
                    errorText={passwordError}
                    addAdditional8px={true}
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
                  <span className={classes.terms}>
                    {`${AGREE_TO} `}
                    <span>
                      <Link
                        className={classes.terms}
                        handleClick={() => {}}
                        label={`${TERMS_LINK}`}
                        underline={true}
                        color={'#000000'}
                      />
                    </span>
                    <span>
                      {` ${HAVE_READ} `}
                      <span>
                        <Link
                          className={classes.terms}
                          handleClick={() => {}}
                          label={`${PRIVACY_LINK}`}
                          underline={true}
                          color={'#000000'}
                        />
                      </span>
                    </span>
                  </span>
                </div>
                <Error error={error} />
                <div className={classes.logInButtonDiv}>
                  <Button
                    variant="contained"
                    label={
                      <span className={classes.buttonFlex}>
                        {disableLogin ? (
                          <span className={classes.loaderSpan}>
                            <CircularProgress className={classes.loader} />
                          </span>
                        ) : null}
                        <span className={classes.lineHeight24px}>{`${CONTINUE}`}</span>
                      </span>
                    }
                    disabled={disableLogin}
                    handleClick={() => {
                      setError('');
                      setDisableLogin(true);

                      //

                      handleSignUp(loginCredentials)
                        .then((response: ILoginResponse) => {
                          navigate('/personalInfo');
                        })
                        .catch((error: ILoginResponse) => {
                          setPasswordError(error.password);
                          setUsernameError(error.userName);
                          setConfirmPasswordError(error.confirmPassword);
                          if (!error.userName && !error.password && !error.confirmPassword) setError(`${SOMETHING_WENT_WRONG}`);
                        })
                        .finally(() => {
                          setDisableLogin(false);
                        });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={`${classes.hideLeftImage} ${classes.rightImageDiv}`}>
            <div>
              <span className={classes.rightImageSpan}>
                <img width="760" height="913" src={LoginScreenImage} className={classes.rightImage} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.bottomImage}>
        <img src={pageBottom} width={'100%'} className={classes.visibility} />
      </div>
    </div>
  );
}
