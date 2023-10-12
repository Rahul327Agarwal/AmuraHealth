import { Auth } from "aws-amplify";
import {
  CONFIRM_YOUR_PASSWORD,
  IUserDetails,
  PASSWORD_MISMATCH,
  PASSWORD_MUST_MEET_COMPLEXITY,
  PASSWORD_REQUIRED,
  RATE_EXCEED,
  USERNAME_16,
  USERNAME_6,
  USERNAME_CANNOT_CONTAIN,
  USERNAME_CAN_ONLY_CONTAIN,
  USERNAME_INCORRECT,
  USERNAME_LABEL_REQUIRED,
  USERNAME_TAKEN,
} from "../Registration.types";
import {
  checkPasswordRequirements,
  createError,
  ILoginErrors,
  ILoginResponse,
  passwordRequirements,
} from "./SignUp.types";
// import Profanity from "profanity-js";

export const handleSignUp = async (
  loginCredentials: IUserDetails
): Promise<ILoginResponse> => {
  const { userName, password } = loginCredentials;
  let validated = validateLogin(loginCredentials);
  if (validated.password || validated.userName || validated.confirmPassword)
    return Promise.reject({ ...validated, statusCode: 600 });
  // AmplifyConfigure("USER_PASSWORD_AUTH");
  try {
    await Auth.signIn(userName, password + new Date().toISOString());
    return Promise.resolve({} as ILoginResponse);
  } catch (error: any) {
    if (error.code === "UserNotFoundException")
      return Promise.resolve({ ...createError("", "", ""), statusCode: 200 });
    return Promise.reject({
      ...errorCallBack(error),
      statusCode: 600,
      error: error,
    });
  }
};

export const validateUserName = (userName: string): string => {
  if (userName.length < 6) return USERNAME_6;
  if (userName.length > 16) return USERNAME_16;
  if (!/^[a-zA-Z0-9\.\-_]*$/i.test(userName)) return USERNAME_CAN_ONLY_CONTAIN;
  if (/(?=([\.\-\_]{2}))/g.test(userName)) return USERNAME_CANNOT_CONTAIN;
  let config = {
    language: "en-us",
  };
  // TODO: const profanity = new Profanity(userName, config);
  // if (profanity.isProfane(userName)) return USERNAME_CANNOT_CONTAIN;
  return "";
};

export const validateLogin = (loginCredentials: IUserDetails): ILoginErrors => {
  let errors: ILoginErrors = createError("", "", "");
  const { userName, password, confirmPassword } = loginCredentials;
  if (!userName?.trim())
    errors = { ...errors, userName: `${USERNAME_LABEL_REQUIRED}` };
  if (userName)
    errors = { ...errors, userName: `${validateUserName(userName)}` };
  if (!password?.trim())
    errors = { ...errors, password: `${PASSWORD_REQUIRED}` };
  else errors = { ...errors, password: "" };
  if (
    password &&
    !checkPasswordRequirements.every((value: string) =>
      (passwordRequirements as any)[value](password)
    )
  )
    errors = {
      ...errors,
      password: `${PASSWORD_MUST_MEET_COMPLEXITY}`,
    };
  if (password && !confirmPassword)
    errors = { ...errors, confirmPassword: `${CONFIRM_YOUR_PASSWORD}` };
  else if (password && confirmPassword && password !== confirmPassword)
    errors = { ...errors, confirmPassword: `${PASSWORD_MISMATCH}` };
  return errors;
};

export const errorCallBack = (error: any): ILoginErrors => {
  let errors: ILoginErrors = createError("", "", "");
  if (error.code === "NotAuthorizedException")
    errors = { ...errors, userName: `${USERNAME_TAKEN}` };
  if (error.code === "UserNotFoundException")
    errors = { ...errors, userName: `${USERNAME_INCORRECT}` };
  if (error.code === "LimitExceededException")
    errors = { ...errors, userName: `${RATE_EXCEED}` };
  return errors;
};
