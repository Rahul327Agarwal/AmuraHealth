export interface ILoginResponse {
  statusCode: number;
  error?: any;
  user?: any;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}
export interface ILoginErrors {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export const createError = (
  firstName: string,
  lastName: string,
  phoneNumber: string,
  email: string
): ILoginErrors => {
  return {
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    email: email,
  };
};
