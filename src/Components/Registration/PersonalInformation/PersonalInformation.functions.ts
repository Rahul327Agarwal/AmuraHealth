import {
  createError,
  ILoginErrors,
  ILoginResponse,
} from "./PersonalInformation.types";
import { isValidPhoneNumber } from "react-phone-number-input";
import {
  EMAIL_ALREADY_EXISTS,
  EMAIL_INVALID,
  EMAIL_REQUIRED,
  FIRST_NAME_CAN_ONLY_CONTAIN,
  FIRST_NAME_REQUIRED,
  IUserDetails,
  LAST_NAME_CAN_ONLY_CONTAIN,
  LAST_NAME_REQUIRED,
  MOBILE_NUMBER_ALREADY_EXISTS,
  MOBILE_NUMBER_INVALID,
  USERNAME_CAN_ONLY_CONTAIN,
} from "../Registration.types";
import axios from "axios";
import { Auth } from "aws-amplify";

export const checkEmailDoesnotExist = async (
  loginCredentials: IUserDetails
): Promise<ILoginResponse> => {
  const { email, password } = loginCredentials;
  // AmplifyConfigure('USER_PASSWORD_AUTH');
  try {
    await Auth.signIn(email, password + new Date().toISOString());
    return Promise.reject({
      ...createError("", "", "", `${EMAIL_ALREADY_EXISTS}`),
      statusCode: 200,
    });
  } catch (error: any) {
    if (error.code === "UserNotFoundException")
      return Promise.resolve({
        ...createError("", "", "", ""),
        statusCode: 200,
        error: error,
      });
    if (error.code === "NotAuthorizedException")
      return Promise.reject({
        ...createError("", "", "", `${EMAIL_ALREADY_EXISTS}`),
        statusCode: 600,
        error: error,
      });
    return Promise.reject({
      ...errorCallBack(error),
      statusCode: 600,
      error: error,
    });
  }
};

export const CheckMobileDoesnotExist = async (
  loginCredentials: IUserDetails
): Promise<ILoginResponse> => {
  const { phoneNumber, password } = loginCredentials;
  // AmplifyConfigure("USER_PASSWORD_AUTH");
  try {
    await Auth.signIn(phoneNumber, password + new Date().toISOString());
    return Promise.reject({
      ...createError("", "", `${MOBILE_NUMBER_ALREADY_EXISTS}`, ""),
      statusCode: 600,
    });
  } catch (error: any) {
    if (error.code === "UserNotFoundException")
      return Promise.resolve({
        ...createError("", "", "", ""),
        statusCode: 200,
        error: error,
      });
    if (error.code === "NotAuthorizedException")
      return Promise.reject({
        ...createError("", "", `${MOBILE_NUMBER_ALREADY_EXISTS}`, ""),
        statusCode: 600,
        error: error,
      });
    return Promise.reject({
      ...errorCallBack(error),
      statusCode: 600,
      error: error,
    });
  }
};

export const handleSignUp = async (
  loginCredentials: IUserDetails,
  setLoginCredentials: Function
): Promise<ILoginResponse> => {
  let validated = validateLogin(loginCredentials);
  if (
    validated.firstName ||
    validated.lastName ||
    validated.phoneNumber ||
    validated.email
  )
    return Promise.reject({ ...validated, statusCode: 600 });

  let validatedEmail = await checkEmailDoesnotExist(loginCredentials);
  let validatedMobile = await CheckMobileDoesnotExist(loginCredentials);

  if (validatedMobile.statusCode !== 200 || validatedEmail.statusCode !== 200) {
    return Promise.reject({
      ...validatedEmail,
      phoneNumber: validatedEmail.phoneNumber || validatedMobile.phoneNumber,
      email: validatedEmail.email || validatedMobile.email,
    });
  }
  try {
    let response = await axios.post(
      `${import.meta.env.VITE_SIGN_UP_OTP_GENERATE}`,
      {
        UserName: loginCredentials.userName,
        eMailID: loginCredentials.email,
        MobileNumber: loginCredentials.phoneNumber,
      }
    );
    if (response.status === 200) {
      return Promise.resolve({
        ...createError("", "", "", ""),
        statusCode: 600,
      });
    }
    if (response.status !== 200) {
      return Promise.reject({
        ...createError("", "", "", ""),
        statusCode: 600,
        error: response,
      });
    }
  } catch (error) {
    return Promise.reject({
      ...errorCallBack(error),
      statusCode: 600,
      error: error,
    });
  }
  return Promise.reject({});
};

export const validateLogin = (loginCredentials: IUserDetails): ILoginErrors => {
  let errors: ILoginErrors = createError("", "", "", "");
  const { firstName, lastName, phoneNumber, email } = loginCredentials;
  if (!firstName?.trim())
    errors = { ...errors, firstName: `${FIRST_NAME_REQUIRED}` };
  else if (!/^[a-zA-Z ]*$/i.test(firstName))
    errors = { ...errors, firstName: `${FIRST_NAME_CAN_ONLY_CONTAIN}` };
  if (!lastName?.trim())
    errors = { ...errors, lastName: `${LAST_NAME_REQUIRED}` };
  else if (!/^[a-zA-Z ]*$/i.test(lastName))
    errors = { ...errors, lastName: `${LAST_NAME_CAN_ONLY_CONTAIN}` };
  try {
    if (phoneNumber && !isValidPhoneNumber(phoneNumber))
      errors = {
        ...errors,
        phoneNumber: `${MOBILE_NUMBER_INVALID}`,
      };
  } catch {
    errors = {
      ...errors,
      phoneNumber: `${MOBILE_NUMBER_INVALID}`,
    };
  }
  if (!email) errors = { ...errors, email: `${EMAIL_REQUIRED}` };
  if (email && verifyEmail(email))
    errors = { ...errors, email: verifyEmail(email) };
  return errors;
};

export const errorCallBack = (error: any): ILoginErrors => {
  let errors: ILoginErrors = createError("", "", "", "");
  if (error.message && error.message.indexOf("EmailExistsException") > -1)
    errors = { ...errors, email: `${EMAIL_ALREADY_EXISTS}` };
  if (error.message && error.message.indexOf("PhoneNumberExistsException") > -1)
    errors = { ...errors, phoneNumber: `${MOBILE_NUMBER_ALREADY_EXISTS}` };
  return errors;
};

export const verifyEmail = (value: string): string => {
  if (!value) return "This field is required";
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
    return `${EMAIL_INVALID}`;
  return "";
};
