export interface IOTPResponse {
  statusCode: number;
  error?: any;
  user?: any;
  OTPError: string;
}
export interface IOTPErrors {
  OTPError: string;
}

export const createError = (OTPError: string): IOTPErrors => {
  return {
    OTPError,
  };
};
