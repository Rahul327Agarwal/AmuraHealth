export interface IProps {
  // TODO: define better types
  [x: string]: any;
}

export interface IUserDetails {
  email?: string;
  password?: string;
  userName?: string;
  phoneNumber?: string;
  otp?: string;
  confirmPassword?: string;
  keepMeSignedIn?: boolean;
  cameFrom?: string;
  firstName?: string;
  lastName?: string;
  cognitoUser?: any;
  previousUser?: string;
}


//Log in labels start//
export const LOG_IN = "Login";
export const FORGOT_PASSWORD = "Forgot Password";
export const USERNAME = "Username";
export const PASSWORD = "Password";
export const KEEP_ME_LOGGED_IN = "Keep me logged in";
export const SIGN_IN_WITH_OTP = "Log in with OTP";
export const SIGN_IN_WITH_PASSWORD = "Log in with Password";
export const NEED_AMURA_ACCOUNT = "Need an Amura account?";
export const CLICK_HERE_TO_CREATE = "Create an account";
export const GENERATE_OTP = "Generate OTP";
//Log in labels end//
//log in errors start//
export const USERNAME_REQUIRED = "Username is required";
export const PASSWORD_REQUIRED = "Password is required";
export const PASSWORD_INCORRECT = "Password is incorrect";
export const USERNAME_INCORRECT = "Sorry, we could not find your account.";
export const USERNAME_6 = "Username must be at least 6 characters";
export const USERNAME_16 = "Username must be at most 16 characters";
export const USERNAME_CAN_ONLY_CONTAIN =
  "Username can only contain letters, numbers and .-_";
export const USERNAME_CANNOT_CONTAIN =
  "Username cannot contain more than 2 consecutive special characters";
export const USERNAME_NOT_ALLOWED = "This username isn't allowed. Try again.";
export const USERNAME_LABEL_REQUIRED = "Username is required";
//log in errors end//

//Sign up labels start//
export const SIGN_UP = "Sign Up";
export const CREATE_AN_AMURA_ACCOUNT = "Create an Amura account";
export const OR = "or";
export const CONFIRM_PASSWORD = "Confirm Password";
export const YOUR_PASSWORD_IS_SECURE =
  "Your password is secure and you're all set!";
export const AGREE_TO = "By signing up, you agree to our";
export const TERMS_LINK = "Terms";
export const HAVE_READ = "and have read and acknowledge the";
export const PRIVACY_LINK = "Global privacy Statement.";
export const CONTINUE = "Continue";
//Sign up labels end//
//Sign up errors start//
export const PASSWORD_MISMATCH = "Passwords do not match";
export const CONFIRM_YOUR_PASSWORD = "Please confirm your password";
export const USERNAME_TAKEN = "Username already taken";
export const PASSWORD_MUST_MEET_COMPLEXITY =
  "Password must meet complexity requirements";
//Sign up errors end//

//Personal Information labels start//
export const PERSONAL_INFORMATION = "Personal Information";
export const FIRST_NAME = "First Name";
export const LAST_NAME = "Last Name";
export const MOBILE_NUMBER = "Mobile Number";
export const EMAIL = "Email";
export const TO_CONTINUE =
  "To continue, we might need some personal information.";
export const ACCOUNT_CREATED = "Account created successfully!";
export const BACK = "Back";
//Personal Information labels end//
//Personal Information errors start//
export const FIRST_NAME_REQUIRED = "First name is required";
export const FIRST_NAME_CAN_ONLY_CONTAIN =
  "First name can only contain letters";
export const LAST_NAME_REQUIRED = "Last name is required";
export const LAST_NAME_CAN_ONLY_CONTAIN = "Last name can only contain letters";
export const MOBILE_NUMBER_INVALID = "Please enter a valid mobile number";
export const EMAIL_REQUIRED = "Email is required";
export const EMAIL_INVALID = "Please enter a valid email";
export const EMAIL_ALREADY_EXISTS = "An account already exists with this email";
export const MOBILE_NUMBER_ALREADY_EXISTS =
  "An account already exists with this mobile number";
//Personal Information errors end//

//Verify OTP labels start//
export const VERIFY_OTP = "Verify OTP";
export const ENTER_OTP = "Enter the OTP sent to your mobile";
export const RESEND_OTP = (time: number) => `Resend OTP in ${time} seconds`;
export const RESEND_OTP_NOW = "Resend OTP";
export const VERIFY = "Verify";
export const CLICK_HERE_TO_LOGIN = "Click here to login";
//Verify OTP labels end//
//Verify OTP errors start//
export const OTP_REQUIRED = "OTP is required";
export const OTP_MUST_BE_4DIGITS = "Please enter 4 digit OTP";
export const OTP_FOR_3TIMES =
  "You have entered wrong OTP for 3 times, please regenerate OTP";
export const OTP_EXPIRED = "OTP has expired, please regenerate OTP";
export const OTP_INCORRECT = "OTP is incorrect";
export const SOMETHING_WENT_WRONG =
  "Something went wrong! Please try again later.";
//Verify OTP errors end//

//Forgot Password labels start//
export const USERNAME_LABEL = "Username";
export const FORGOT_PASSWORD_TITLE = "Forgot Password";
export const AN_OTP_IS_TRIGERRED =
  "An email was sent to your registered email.";
export const PLEASE_ENTER_USERNAME = "Please enter your username to continue";
export const PLEASE_ENTER_OTP = "Please enter OTP";
export const UPDATE = "UPDATE";
export const PASSWORD_CHANGED = "Password changed successfully!";
export const RATE_EXCEED =
  "You have tried to change password for more than 3 times, please try again later";
//Forgot Password labels end//
