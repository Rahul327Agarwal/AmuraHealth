export interface ILoginResponse {
  statusCode: number;
  error?: any;
  user?: any;
  userName: string;
  password: string;
}
export interface ILoginErrors {
  userName: string;
  password: string;
}

export const createError = (
  usernameError: string,
  password: string
): ILoginErrors => {
  return {
    userName: usernameError,
    password: password,
  };
};
