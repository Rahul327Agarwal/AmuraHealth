import {
  MOBILE_NUMBER_INVALID,
  PASSWORD_INCORRECT,
  PASSWORD_REQUIRED,
  USERNAME_INCORRECT,
  USERNAME_REQUIRED,
} from '../Registration.types';
import { createError, ILoginErrors, ILoginResponse } from './Login.types';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { Auth } from 'aws-amplify';

export const signIn = async (username: string, password: string, loginWithOTP: boolean): Promise<ILoginResponse> => {
  const validated = validateLogin(username, password, loginWithOTP);
  let proceed = loginWithOTP ? validated.userName : validated.password || validated.userName;
  if (proceed) return Promise.reject({ ...validated, statusCode: 600 });
  // AmplifyConfigure(loginWithOTP ? "CUSTOM_AUTH" : "USER_PASSWORD_AUTH");
  try {
    const thisUser = await Auth.signIn(username, password);
    return Promise.resolve({
      ...createError('', ''),
      statusCode: 200,
      user: thisUser,
    });
  } catch (error) {
    return Promise.reject({
      ...errorCallBack(error),
      statusCode: 600,
      error: error,
    });
  }
};

export const validateLogin = (username: string, password: string, logInWithOTP: boolean): ILoginErrors => {
  let errors: ILoginErrors = createError('', '');

  if (!username?.trim())
    errors = {
      ...errors,
      userName: `${USERNAME_REQUIRED}`,
    };
  if (!password?.trim()) errors = { ...errors, password: `${PASSWORD_REQUIRED}` };
  try {
    if (logInWithOTP && !isValidPhoneNumber(username))
      errors = {
        ...errors,
        userName: `${MOBILE_NUMBER_INVALID}`,
      };
  } catch {
    errors = {
      ...errors,
      userName: `${MOBILE_NUMBER_INVALID}`,
    };
  }
  return errors;
};

export const errorCallBack = (error: any): ILoginErrors => {
  let errors: ILoginErrors = createError('', '');
  if (error.code === 'NotAuthorizedException') errors = { ...errors, password: `${PASSWORD_INCORRECT}` };
  if (error.code === 'UserNotFoundException') errors = { ...errors, userName: `${USERNAME_INCORRECT}` };
  return errors;
};
