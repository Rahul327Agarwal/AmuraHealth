export const passwordRequirements = {
  checkMinimumCharaters: (password: string) => password.length >= 8,
  checkMinimumUpperCase: (password: string) =>
    password.match(/[A-Z]/g) !== null,
  checkMinimumLowerCase: (password: string) =>
    password.match(/[a-z]/g) !== null,
  checkMinimumNumbers: (password: string) => password.match(/[0-9]/g) !== null,
  checkMinimumSpecialCharacters: (password: string) =>
    password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) !== null,
};

export const passwordRequirementsText = {
  checkMinimumCharaters: "8 characters minimum",
  checkMinimumUpperCase: "One uppercase letter",
  checkMinimumLowerCase: "One lowercase letter",
  checkMinimumNumbers: "One number",
  checkMinimumSpecialCharacters: "One special character",
};

export const checkPasswordRequirements = [
  "checkMinimumCharaters",
  "checkMinimumUpperCase",
  "checkMinimumLowerCase",
  "checkMinimumNumbers",
  "checkMinimumSpecialCharacters",
];

export interface ILoginResponse {
  statusCode: number;
  error?: any;
  user?: any;
  userName: string;
  password: string;
  confirmPassword: string;
}
export interface ILoginErrors {
  userName: string;
  password: string;
  confirmPassword: string;
}

export const createError = (
  usernameError: string,
  password: string,
  confirmPassword: string
): ILoginErrors => {
  return {
    userName: usernameError,
    password: password,
    confirmPassword: confirmPassword,
  };
};
