import axios from 'axios';
import { isValidPhoneNumber } from 'react-phone-number-input';
import SuccessToast from './../../../Common/SuccessToaster';
import ErrorToaster from './../../../Common/ErrorToaster';
import { IRegisterWithoutOTPStaff } from './Registernew.types';

export const registerNewUser = async (
  panelId: string,
  data: IRegisterWithoutOTPStaff,
  seterrorObject: any,
  setRegisterUser: any,
  setSelectedLanguages: any
) => {
  const errorObject = {
    FirstName: '',
    EmailId: '',
    LastName: '',
    PhoneNumber: '',
    dob: '',
    Nationality: '',
    Country: '',
    State: '',
    City: '',
    TimeZone: '',
    Languages: '',
    gender: '',
    medicallyModifiedGender: '',
    medicallyModifiedOther: '',
  };
  if (
    data.EmailId &&
    !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      data.EmailId
    )
  ) {
    errorObject.EmailId = 'Invalid email';
  }
  if (data.EmailId === '') {
    errorObject.EmailId = 'Please enter email id';
  }
  if (!isValidPhoneNumber(data.PhoneNumber)) {
    errorObject.PhoneNumber = 'Please enter valid mobile number.';
  }
  if (data.FirstName === '') {
    errorObject.FirstName = 'Please enter first name';
  }
  if (data.LastName === '') {
    errorObject.LastName = 'Please enter last name';
  }
  if (!data.gender && !data.isModifiedGender) {
    errorObject.gender = 'Gender is required';
  }

  if (data.isModifiedGender && !data.medicallyModifiedGender) {
    errorObject.medicallyModifiedGender = 'This field is required';
  }

  if (data.isModifiedGender && data.isUserTypedGender && !data.userTypedGender) {
    errorObject.medicallyModifiedOther = 'This field is required';
  }

  if (!data.dob) {
    errorObject.dob = 'Date of Birth is required';
  }
  if (data.dob && new Date(data.dob).toString() === 'Invalid Date') {
    errorObject.dob = 'Date of Birth is not valid';
  }
  if (data.Nationality === '') {
    errorObject.Nationality = 'Please select the Nationality';
  }
  // if (data.Nationality === "") {
  //   errorObject.Country = "Please select the Country";
  // }
  // if (data.State === "") {
  //   errorObject.State = "Please select the State";
  // }
  // if (data.City === "") {
  //   errorObject.City = "Please select the City";
  // }
  if (data.TimeZone === '') {
    errorObject.TimeZone = 'Please select the TimeZone';
  }
  if (data.PreferredLanguages.length === 0) {
    errorObject.Languages = 'Please select the Languages';
  }
  if (Object.values(errorObject).filter((eachError) => eachError !== '').length === 0) {
    seterrorObject(errorObject);
    const axiosObj: any = axios.create({
      baseURL: import.meta.env.VITE_REGISTER_NEW_STAFF,
    });
    try {
      console.log(data, 'newuserdata');
      let response = await axiosObj['post']('', { ...data });
      setRegisterUser({
        FirstName: '',
        LastName: '',
        EmailId: '',
        PhoneNumber: '',
        Country: '',
        State: '',
        City: '',
        TimeZone: '',
        TimeZoneName: '',
        PreferredLanguages: [],
        Nationality: '',
        isModifiedGender: false,
        gender: '',
        medicallyModifiedGender: '',
        isUserTypedGender: false,
        userTypedGender: '',
        dob: null,
      });
      setSelectedLanguages([]);
      SuccessToast('User registered successfully');
      window.location.href = '/thankYou';
    } catch (ex) {
      if (ex?.response?.data?.Message && typeof ex?.response?.data?.Message === 'string')
        ErrorToaster(ex?.response?.data?.Message, panelId, 'error');
      else ErrorToaster('Something went wrong. Please try again.', panelId, 'error');
    }
  } else {
    seterrorObject(errorObject);
  }
};
