import {
  IUserDetails,
  OTP_EXPIRED,
  OTP_FOR_3TIMES,
  OTP_INCORRECT,
  OTP_MUST_BE_4DIGITS,
  OTP_REQUIRED,
  SOMETHING_WENT_WRONG,
} from '../Registration.types';
import { createError, IOTPErrors, IOTPResponse } from './Verify.types';
import axios from 'axios';
import { v4 as uuid4 } from 'uuid';
import { Auth } from 'aws-amplify';

export const resendOTP = async (loginCredentials: IUserDetails): Promise<IOTPResponse> => {
  const { userName, password } = loginCredentials;
  // AmplifyConfigure('CUSTOM_AUTH');
  try {
    const thisUser = await Auth.signIn(userName!, password);
    return Promise.resolve({
      ...createError(''),
      statusCode: 200,
      user: thisUser,
    });
  } catch (error) {
    return Promise.reject({
      ...createError(`${SOMETHING_WENT_WRONG}`),
      statusCode: 600,
      error: error,
    });
  }
};

export const verifyOTP = async (
  loginCredentials: IUserDetails,
  cameFromPersonalInformation: boolean,
  incrementVerifiedCounter: Function
): Promise<IOTPResponse> => {
  let validated = validateOTP(loginCredentials);
  if (validated.OTPError) return Promise.reject({ ...validated, statusCode: 600 });
  try {
    incrementVerifiedCounter();
    let success;
    if (!cameFromPersonalInformation) {
      success = await Auth.sendCustomChallengeAnswer(loginCredentials.cognitoUser, loginCredentials.otp!);
    }
    if (cameFromPersonalInformation)
      success = await axios.post(import.meta.env.VITE_SIGN_UP_OTP_VALIDATE!, {
        UserName: loginCredentials.userName,
        eMailID: loginCredentials.email,
        MobileNumber: loginCredentials.phoneNumber,
        OTP: loginCredentials.otp,
      });

    if (success.signInUserSession && !cameFromPersonalInformation) {
      return Promise.resolve({
        ...createError(''),
        statusCode: 200,
        user: success,
      });
    }
    if (success.status === 200 && cameFromPersonalInformation) {
      return Promise.resolve({
        ...createError(''),
        statusCode: 200,
        user: success,
      });
    }
    return Promise.reject({
      ...createError(`${OTP_INCORRECT}`),
      error: success,
      statusCode: 600,
    });
  } catch (error: any) {
    if (error?.response?.status === 502 && error?.response?.data?.Error) {
      return Promise.reject({
        ...createError(`${error?.response?.data?.Error}`),
        statusCode: 600,
        error: error,
      });
    }
    if (error.message === 'VerifyAuthChallengeResponse failed with error OTP Expired.')
      return Promise.reject({
        ...createError(`${OTP_EXPIRED}`),
        statusCode: 600,
        error: error,
      });
    if (error.code)
      return Promise.reject({
        ...createError(`${OTP_FOR_3TIMES}`),
        statusCode: 601,
        error: error,
      });
    else
      return Promise.reject({
        ...createError(``),
        statusCode: 600,
        error: error,
      });
  }
};

export const validateOTP = (loginCredentials: IUserDetails): IOTPErrors => {
  let errors: IOTPErrors = createError('');
  if (!loginCredentials.otp) errors = { ...errors, OTPError: `${OTP_REQUIRED}` };
  if (loginCredentials.otp && loginCredentials.otp.length < 4) errors = { ...errors, OTPError: `${OTP_MUST_BE_4DIGITS}` };
  return errors;
};

export const createUser = async (loginCredentials: IUserDetails): Promise<IOTPResponse> => {
  const params = {
    username: loginCredentials.previousUser ? loginCredentials.previousUser : uuid4(),
    password: loginCredentials.password,
    attributes: {
      given_name: loginCredentials.firstName,
      family_name: loginCredentials.lastName,
      email: loginCredentials.email,
      phone_number: loginCredentials.phoneNumber,
      'custom:assigned_username': loginCredentials.userName,
      'custom:old_user_id': loginCredentials.previousUser,
    },
  };
  try {
    let user = await Auth.signUp(params as any);
    return Promise.resolve({
      ...createError(''),
      user,
      statusCode: 200,
    });
  } catch (error) {
    return Promise.reject({
      ...createError(`${SOMETHING_WENT_WRONG}`),
      statusCode: 600,
      error: error,
    });
  }
};
