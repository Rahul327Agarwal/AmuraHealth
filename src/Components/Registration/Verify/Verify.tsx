import axios from 'axios';
import React, { useEffect } from 'react';
import { confirmed } from '../assets/confirmed-lottie';
import {
  ACCOUNT_CREATED,
  BACK,
  CLICK_HERE_TO_LOGIN,
  ENTER_OTP,
  IProps,
  OTP_FOR_3TIMES,
  RESEND_OTP,
  RESEND_OTP_NOW,
  SOMETHING_WENT_WRONG,
  VERIFY,
  VERIFY_OTP,
} from '../Registration.types';
import { createUser, resendOTP, verifyOTP } from './Verify.functions';
import { useStyles } from './Verify.styles';
import { IOTPResponse } from './Verify.types';
// import Lottie from "react-lottie";
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSetUserInfo, useUserInfo } from '../../../DisplayFramework/State/Slices/Auth';
import { AmuraLoginLog } from '../../SVGs/Common';
import LoginScreenImage from '../assets/LoginScreenImage.png';
import pageBottom from '../assets/pageBottom.png';
import Button from '../Components/Button/Button';
import Link from '../Components/Link/Link';
import OTPField from '../Components/OTPField/OTPField';
import Error from '../Error';
import MUIButton from '../../LibraryComponents/MUIButton/MUIButton';

export default function Verify(props: IProps) {
  const [OTP, setOTP] = React.useState('');
  const [error, setError] = React.useState('');
  const [showResend, setShowResend] = React.useState(false);
  const [verifiedCounter, setVerifiedCounter] = React.useState(0);
  const [timer, setTimer] = React.useState(60);
  const [disableVerify, setDisableVerify] = React.useState(false);
  const [showLoader, setShowLoader] = React.useState(false);
  const [cameFromPersonalInfo, setCameFromPersonalInfo] = React.useState(false);
  const [accountCreated, setAccountCreated] = React.useState(false);

  const userInfo = useUserInfo();
  const navigate = useNavigate();

  //? funcitons

  const setUserInfo = useSetUserInfo();

  useEffect(() => {
    if (!userInfo?.cameFrom) {
      navigate('/login');
    }
    if (userInfo?.cameFrom === 'PersonalInformation') {
      setCameFromPersonalInfo(true);
    }
  }, []);

  const submitOTP = () => {
    setDisableVerify(true);
    setShowLoader(true);
    setError('');
    verifyOTP(userInfo!, cameFromPersonalInfo, incrementVerifiedCounter)
      .then((response: IOTPResponse) => {
        if (userInfo?.cameFrom && userInfo?.cameFrom === 'Login') {
          setUserInfo({
            ...userInfo,
            cameFrom: '',
          });
          localStorage.setItem('UserLoggedIn', JSON.stringify(true));
          // go to home
        }
        if (userInfo?.cameFrom && userInfo?.cameFrom === 'PersonalInformation') {
          createUser(userInfo)
            .then(() => {
              setUserInfo({
                ...userInfo,
                cameFrom: '',
              });
              setAccountCreated(true);
            })
            .catch((error) => {
              setError(error.OTPError);
            });
        }
      })
      .catch((error: IOTPResponse) => {
        if (verifiedCounter === 3) {
          setError(`${OTP_FOR_3TIMES}`);
          return;
        }
        setError(error.OTPError);
        if (!error.OTPError) setError(`${SOMETHING_WENT_WRONG}`);
      })
      .finally(() => {
        setShowLoader(false);
        setDisableVerify(false);
      });
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: confirmed,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  useEffect(() => {
    if (!showResend) {
      var remainingSeconds = 60;
      const countDownTimer = setInterval(() => {
        if (remainingSeconds > 0) {
          remainingSeconds = remainingSeconds - 1;
          setTimer(remainingSeconds);
        } else {
          setShowResend(true);
          setTimer(timer - 1);
        }
      }, 1000);
      return () => {
        clearInterval(countDownTimer);
      };
    }
  }, [showResend]);

  const { classes } = useStyles();

  useEffect(() => {
    if (!userInfo?.cameFrom && !userInfo?.userName) {
      navigate('/login');
    }
  }, []);

  const incrementVerifiedCounter = () => {
    setVerifiedCounter(verifiedCounter + 1);
  };
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
              {!accountCreated ? (
                <>
                  <div>
                    <div className={`${classes.logIn} ${classes.textAlignCenter}`}>
                      {/* <div className={classes.margin8px}>
                        <span
                          className={classes.logInSpan}
                        >{`${VERIFY_OTP}`}</span>
                      </div> */}
                      <div className={classes.margin12px}>
                        <span className={classes.needAccount}>{`${ENTER_OTP}`}</span>
                      </div>
                    </div>
                    <div>
                      <div className={classes.margin12px}>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            setDisableVerify(true);
                            verifyOTP(userInfo!, cameFromPersonalInfo, incrementVerifiedCounter)
                              .then((response: IOTPResponse) => {
                                if (userInfo?.cameFrom && userInfo?.cameFrom === 'Login') {
                                  setUserInfo({
                                    ...userInfo,
                                    cameFrom: '',
                                  });

                                  localStorage.setItem('UserLoggedIn', JSON.stringify(true));
                                  // go to home
                                }
                                if (userInfo?.cameFrom && userInfo?.cameFrom === 'PersonalInformation') {
                                  createUser(userInfo!)
                                    .then(() => {
                                      setAccountCreated(true);
                                    })
                                    .catch((error) => {
                                      setError(error.OTPError);
                                    });
                                }
                              })
                              .catch((error: IOTPResponse) => {
                                setError(error.OTPError);
                                if (!error?.error?.__type || error?.error?.__type !== 'NotAuthorizedException')
                                  setDisableVerify(false);
                              })
                              .finally(() => {
                                setDisableVerify(false);
                              });
                          }}
                        >
                          <OTPField
                            handleSubmit={submitOTP}
                            shouldAutoFocus={true}
                            value={OTP}
                            onChange={(value: any) => {
                              setError('');
                              setOTP(value);

                              setUserInfo({
                                ...userInfo,
                                otp: value,
                              });
                            }}
                            // isInputNum={true}
                            className={`${classes.OTPinput} ${error ? classes.error : ''}`}
                          />
                          <button style={{ display: 'none' }} type={'submit'} />
                        </form>
                      </div>
                      <Error error={error} />
                      <div className={`${classes.margin12px} ${classes.textAlignCenter}`}>
                        {!showResend ? <span className={classes.needAccount}>{`${RESEND_OTP(timer)}`}</span> : null}
                        {showResend ? (
                          <span>
                            <Link
                              handleClick={async () => {
                                setVerifiedCounter(0);

                                setUserInfo({
                                  ...userInfo,
                                  otp: 'value',
                                });
                                setOTP('');
                                setError('');
                                setShowResend(false);
                                if (cameFromPersonalInfo) {
                                  try {
                                    let response = await axios.post(`${import.meta.env.VITE_SIGN_UP_OTP_GENERATE}`, {
                                      UserName: userInfo!.userName,
                                      eMailID: userInfo!.email,
                                      MobileNumber: userInfo!.phoneNumber,
                                    });
                                    if (response.status !== 200) {
                                      setError(`${SOMETHING_WENT_WRONG}`);
                                      return;
                                    }
                                  } catch (error) {
                                    setError(`${SOMETHING_WENT_WRONG}`);
                                    return;
                                  }
                                }
                                if (!cameFromPersonalInfo) {
                                  resendOTP(userInfo!)
                                    .then((response: IOTPResponse) => {
                                      setUserInfo({
                                        ...userInfo,
                                        cognitoUser: response.user,
                                        otp: '',
                                      });
                                      setOTP('');
                                      setError('');
                                      setShowResend(false);
                                    })
                                    .catch((error: IOTPResponse) => {
                                      setError(error.OTPError);
                                    });
                                }
                              }}
                              label={`${RESEND_OTP_NOW}`}
                              underline={true}
                              color={'#000000'}
                            />
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className={classes.flexBox}>
                      <div className={classes.back}>
                        <Button
                          variant="outlined"
                          label={`${BACK}`}
                          fullWidth
                          handleClick={() => {
                            if (userInfo?.cameFrom && userInfo?.cameFrom === 'Login') {
                              setUserInfo({
                                ...userInfo,
                                cameFrom: 'verify',
                              });
                              navigate('/login');
                            } else if (userInfo?.cameFrom && userInfo?.cameFrom === 'PersonalInformation') {
                              setUserInfo({
                                ...userInfo,
                                cameFrom: 'verify',
                              });
                              navigate('/PersonalInfo');
                            } else {
                              window.location.href = '/login';
                            }
                          }}
                        />
                      </div>
                      <div className={classes.confirm}>
                        <Button
                          variant="contained"
                          fullWidth
                          label={
                            <>
                              {showLoader ? (
                                <span className={classes.loaderSpan}>
                                  <CircularProgress className={classes.loader} />
                                </span>
                              ) : null}
                              <span>{`${VERIFY}`}</span>
                            </>
                          }
                          disabled={disableVerify || error === `${OTP_FOR_3TIMES}`}
                          handleClick={submitOTP}
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className={classes.margin12px}>
                  <span className={classes.successAccount}>{`${ACCOUNT_CREATED} `}</span>
                  {/*TODO: <Lottie options={defaultOptions} height={200} width={200} /> */}
                  <span className={classes.successAccount}>
                    <Link
                      handleClick={() => {
                        setUserInfo({
                          ...userInfo,
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
