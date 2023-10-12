import React, { useEffect } from 'react';
import { useStyles } from './PersonalInformation.styles';
import { ILoginResponse } from './PersonalInformation.types';
import { handleSignUp } from './PersonalInformation.functions';
import {
  ACCOUNT_CREATED,
  BACK,
  CONTINUE,
  EMAIL,
  FIRST_NAME,
  IProps,
  LAST_NAME,
  MOBILE_NUMBER,
  PERSONAL_INFORMATION,
  SOMETHING_WENT_WRONG,
  TO_CONTINUE,
} from '../Registration.types';
import Error from '../Error';
import { CircularProgress } from '@mui/material';
import { AmuraLoginLog } from '../../SVGs/Common';
import InputField from '../Components/InputField/InputField';
import PhoneInputField from '../Components/InputField/PhoneInputField/PhoneInputField';
import Button from '../Components/Button/Button';
import { useSetUserInfo, useUserInfo } from '../../../DisplayFramework/State/Slices/Auth';
import { useNavigate } from 'react-router-dom';

import immg from '../assets/LoginScreenImage.png';
import bottomImg from '../assets/pageBottom.png';

export default function PersonalInformation(props: IProps) {
  // const { loginCredentials, Auth, history, setLoginCredentials, AmplifyConfigure } = props;

  const loginCredentials = useUserInfo();
  const setLoginCredentials = useSetUserInfo();
  const navigate = useNavigate();

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [mobileError, setMobileError] = React.useState('');
  const [firstNameError, setFirstNameError] = React.useState('');
  const [lastNameError, setLastNameError] = React.useState('');
  const [error, setError] = React.useState('');
  const [disableLogin, setDisableLogin] = React.useState(false);
  const [accountCreated, setAccountCreated] = React.useState(false);
  const [disabledBack, setDisabledBack] = React.useState(false);
  useEffect(() => {
    if (!loginCredentials?.cameFrom) {
      navigate('/login');
    }
    if (loginCredentials?.cameFrom === 'verify') {
      setFirstName(loginCredentials?.firstName!);
      setPhone(loginCredentials?.phoneNumber!);
      setLastName(loginCredentials?.lastName!);
      setEmail(loginCredentials.email!);
    }
    setLoginCredentials({
      ...loginCredentials,
      cameFrom: 'PersonalInformation',
    });
  }, []);

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
                <div className={classes.logIn}>
                  {/* <div className={classes.margin8px}>
                    <span
                      className={classes.logInSpan}
                    >{`${PERSONAL_INFORMATION}`}</span>
                  </div> */}
                  <div className={classes.margin12px}>
                    <span className={classes.needAccount}>{`${TO_CONTINUE}`}</span>
                  </div>
                </div>
                <div className={classes.margin12px}>
                  <InputField
                    focusBorder="#000000"
                    hoverBorder="#1B1B1B"
                    fontColor="#000000"
                    autoFocus={true}
                    label={`${FIRST_NAME}`}
                    value={firstName}
                    onBlur={() => {}}
                    addAdditional8px={true}
                    handleOnChange={(e: string) => {
                      setFirstName(e.replace(/[^a-zA-Z ]/gi, ''));
                      setLoginCredentials({
                        ...loginCredentials,
                        firstName: e.replace(/[^a-zA-Z ]/gi, ''),
                      });
                      setFirstNameError('');
                    }}
                    showError={true}
                    errorText={firstNameError}
                  />
                </div>
                <div className={classes.margin12px}>
                  <InputField
                    focusBorder="#000000"
                    hoverBorder="#1B1B1B"
                    fontColor="#000000"
                    label={`${LAST_NAME}`}
                    value={lastName}
                    onBlur={() => {}}
                    handleOnChange={(e: string) => {
                      setLastName(e.replace(/[^a-zA-Z ]/gi, ''));
                      setLoginCredentials({
                        ...loginCredentials,
                        lastName: e.replace(/[^a-zA-Z ]/gi, ''),
                      });
                      setLastNameError('');
                    }}
                    showError={true}
                    errorText={lastNameError}
                    addAdditional8px={true}
                  />
                </div>
                <div className={classes.margin12px}>
                  <PhoneInputField
                    focusBorder="#000000"
                    hoverBorder="#1B1B1B"
                    fontColor="#000000"
                    label={`${MOBILE_NUMBER}`}
                    value={phone}
                    handleOnChange={(e: string) => {
                      setPhone(e.replace(/[^A-Z0-9+]/gi, ''));
                      setLoginCredentials({
                        ...loginCredentials,
                        phoneNumber: e.replace(/[^A-Z0-9+]/gi, ''),
                      });
                      setMobileError('');
                    }}
                    showError={true}
                    errorText={mobileError}
                  />
                </div>
                <div className={classes.margin12px}>
                  <InputField
                    focusBorder="#000000"
                    hoverBorder="#1B1B1B"
                    fontColor="#000000"
                    addAdditional8px={true}
                    label={`${EMAIL}`}
                    value={email}
                    handleOnChange={(e: string) => {
                      setEmail(e);
                      setLoginCredentials({ ...loginCredentials, email: e });
                      setEmailError('');
                    }}
                    showError={true}
                    errorText={emailError}
                  />
                </div>
                <Error error={error} />
                <div className={classes.flexBox}>
                  <div className={classes.back}>
                    <Button
                      variant="contained"
                      label={`${BACK}`}
                      disabled={accountCreated}
                      handleClick={() => {
                        navigate('./signUp');
                      }}
                    />
                  </div>
                  <div className={classes.confirm}>
                    <Button
                      variant="contained"
                      label={
                        <>
                          {disableLogin ? (
                            <span className={classes.loaderSpan}>
                              <CircularProgress className={classes.loader} />
                            </span>
                          ) : null}
                          <span>{`${CONTINUE}`}</span>
                        </>
                      }
                      disabled={disableLogin || accountCreated}
                      handleClick={() => {
                        setDisableLogin(true);
                        setError('');
                        handleSignUp(loginCredentials, setLoginCredentials)
                          .then((response: ILoginResponse) => {
                            setAccountCreated(true);
                            setDisabledBack(true);
                            navigate('/verify');
                          })
                          .catch((error: ILoginResponse) => {
                            setFirstNameError(error.firstName);
                            setLastNameError(error.lastName);
                            setEmailError(error.email);
                            setMobileError(error.phoneNumber);
                            if (!error.firstName && !error.lastName && !error.email && !error.phoneNumber) {
                              setError(`${SOMETHING_WENT_WRONG}`);
                            }
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
