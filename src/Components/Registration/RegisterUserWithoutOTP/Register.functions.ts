import axios from 'axios';
import { isValidPhoneNumber } from 'react-phone-number-input';
import SuccessToast from './../../../Common/SuccessToaster';
import ErrorToaster from './../../../Common/ErrorToaster';
import { IRegisterWithoutOTP } from './Register.types';

export const registerNewUser = async (panelId: string, data: any, seterrorObject: any, setRegisterUser: any) => {
  const errorObject = {
    FirstName: '',
    EmailId: '',
    PhoneNumber: '',
  };
  if (
    data.EmailId &&
    !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      data.EmailId
    )
  ) {
    errorObject.EmailId = 'Invalid email';
  }
  if (!isValidPhoneNumber(data.PhoneNumber)) {
    errorObject.PhoneNumber = 'Please enter valid mobile number.';
  }
  if (data.FirstName === '') {
    errorObject.FirstName = 'Please enter first name';
  }
  if (Object.values(errorObject).filter((eachError) => eachError !== '').length === 0) {
    seterrorObject(errorObject);
    const axiosObj: any = axios.create({
      baseURL: import.meta.env.VITE_REGISTER_NEW_USER,
    });
    try {
      let response = await axiosObj['post']('', data);
      setRegisterUser({
        FirstName: '',
        LastName: '',
        EmailId: '',
        PhoneNumber: '',
        HealthObjective: '',
        askToTalk: 'false',
      });
      SuccessToast('User registered successfully');
    } catch (ex) {
      if (ex?.response?.data?.Message && typeof ex?.response?.data?.Message === 'string')
        ErrorToaster(ex?.response?.data?.Message, panelId, 'error');
      else ErrorToaster('Something went wrong. Please try again.', panelId, 'error');
    }
  } else {
    seterrorObject(errorObject);
  }
};
