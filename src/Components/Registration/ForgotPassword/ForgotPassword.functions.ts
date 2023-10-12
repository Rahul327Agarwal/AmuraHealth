import { Auth } from "aws-amplify";
import { IUserDetails, USERNAME_REQUIRED } from "../Registration.types";
import { errorCallBack, validateLogin } from "../SignUp/SignUp.functions";
import {
  createError,
  ILoginErrors,
  ILoginResponse,
} from "./ForgotPassword.types";

export const triggerResetPassword = async (
  loginCredentials: IUserDetails
): Promise<ILoginResponse> => {
  let validated = validateLogin(loginCredentials);
  if (validated.userName)
    return Promise.reject({ ...validated, statusCode: 600 });
  try {
    let data = await Auth.forgotPassword(loginCredentials.userName);
    return Promise.resolve({
      ...createError("", "", ""),
      statusCode: 200,
      user: data,
    });
  } catch (error) {
    return Promise.reject({
      ...errorCallBack(error),
      statusCode: 600,
      error: error,
    });
  }
};

export const submitResetPassword = async (
  loginCredentials: IUserDetails
): Promise<ILoginResponse> => {
  const { userName, password, otp } = loginCredentials;
  let validated = validateLogin(loginCredentials);
  if (validated.password || validated.userName || validated.confirmPassword)
    return Promise.reject({ ...validated, statusCode: 600 });
  try {
    await Auth.forgotPasswordSubmit(userName, otp, password);
    return Promise.resolve({} as ILoginResponse);
  } catch (error) {
    return Promise.reject({
      ...errorCallBack(error),
      statusCode: 600,
      error: error,
    });
  }
};

export const validateUsername = (
  loginCredentials: IUserDetails
): ILoginErrors => {
  let errors: ILoginErrors = createError("", "", "");
  const { userName } = loginCredentials;
  if (!userName) errors = { ...errors, userName: `${USERNAME_REQUIRED}` };
  return errors;
};
