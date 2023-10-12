import axios from 'axios';
import { getCitiesAPI, getCountriesAPI, getTimeZoneAPI } from '../../../Common/Common.functions';
import ErrorToaster from '../../../Common/ErrorToaster';
import SuccessToaster from '../../../Common/SuccessToaster';
import { PMS_S3 } from '../../../Utils';
import { Dispatch, SetStateAction } from 'react';

export const SALUTATION_OPTIONS = [
  { label: 'Dr.', value: 'Dr.' },
  { label: 'ExPat.', value: 'ExPat.' },
  { label: 'Proff.', value: 'Proff.' },
  { label: 'Diplomat.', value: 'Diplomat.' },
  { label: 'Mr.', value: 'Mr.' },
  { label: 'Miss.', value: 'Miss.' },
  { label: 'Mrs.', value: 'Mrs.' },
  { label: 'Master.', value: 'Master.' },
  { label: 'M/s.', value: 'M/s.' },
];
export const clientData = {
  UserId: '',
  Salutation: '',
  FirstName: '',
  LastName: '',
  City: '',
  Country: '',
  CountryCode: '',
  TimeZone: '',
  TimeZoneName: '',
  TenantId: '',
  UserName: '',
  height: '', //New Keys
  weight: '', //New Keys
  DateOfBirth: '',
  Gender: '',
  isModifiedGender: true,
  MedicallyModifiedGender: '',
  isUserTypedGender: true,
  userTypedGender: '',
  FoodRestriction: '',
  Cuisine: [],
  PreferredLanguages: [],
  PreferredLanguagesNames: [],
  whatsAppNumber: '',
  ResidingCountry: '',
  Nationality: '',
  EMail: '',
  facebookUrl: '', //New Keys
  twitterUrl: '', //New Keys
  instagramUrl: '', //New Keys
  youtubeUrl: '', //New Keys
  linkedInUrl: '', //New Keys
  emergencyContact: '', //New Keys
  bloodGrp: '', //New Keys
  USDatabase: '', //New Keys
  Notes: '',
  Objective: '',
  ConditionsInterested: '',
  referredBy: '',
  referredPersonRelation: '',
  DietPreference: '',
};
export const getPersonalProfileData = async (
  panelId: string,
  props: any,
  UserId: string,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const API_URL = `pms-ql-user/${UserId}/userProfile.json`;
    const params = {
      TenantId: props.selectedClient.tenant_id,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_S3_FETCH_API,
      token: props.sessions.id_token,
    };
    const response: any = await PMS_S3.getObject(API_URL, import.meta.env.VITE_CLIENT_BUCKET, params);

    if (response?.Error) return ErrorToaster('error.message', panelId, 'error');
    const personalResponse = {
      Salutation: response.Salutation || '',
      FirstName: response.FirstName || '',
      LastName: response.LastName || '',
      Gender: response.Gender || '',
      isModifiedGender: response.isModifiedGender || false,
      isUserTypedGender: response.isUserTypedGender || false,
      MedicallyModifiedGender: response.MedicallyModifiedGender || '',
      userTypedGender: response.userTypedGender || '',
      DateOfBirth: response.DateOfBirth || '',

      Nationality: response.Nationality || '',
      CurrentResidence: response.CurrentResidence || '',
      City: response.City || '',
      Country: response.Country || '',
      CountryCode: response.CountryCode || '',
      TimeZone: response.TimeZone || '',
      TimeZoneName: response.TimeZoneName || '',
      PreferredLanguages: response.PreferredLanguages || [],
    };
    const healthAndFoodResponse = {
      FoodRestriction: response.FoodRestriction || '',
      Cuisine: response.Cuisine || [],
      Objective: response.Objective || '',
    };
    const accountDetailsResponse = {
      NickName: response.NickName || '',
      EMail: response.EMail || '',
      Mobile: response.Mobile || '',
      whatsAppNumber: response.whatsAppNumber || '',
      Password: response.Password || '',
      referredBy: response.referredBy || '',
      referredPersonRelation: response.referredPersonRelation || '',
    };
    return { personalResponse, healthAndFoodResponse, accountDetailsResponse };
  } catch (error) {
    ErrorToaster((error as any).message, panelId, 'error');
  } finally {
    setIsLoading(false);
  }
};

export const removeProfileImage = async (panelId, props: any, UserId: string, payload, FromHealthObj?: boolean) => {
  try {
    const params: any = {
      EventName: 'manage-user-profile',
      UserId: UserId,
      TenantId: props.selectedClient.tenant_id,
      Locale: sessionStorage.getItem('locale'),
      url: `${import.meta.env.VITE_EVENT_API}/deleteFile?key=${UserId}/profile-pic.png&bucket=amura-images-qa`,
      token: props.sessions.id_token,
      ...payload,
    };

    // const response: any = await PMS_S3.postData(params);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_API_URL}/deleteFile?key=${UserId}/profile-pic.png&bucket=amura-images-qa`,
      {},
      {
        headers: { Authorization: `Bearer ${props.sessions.id_token}` },
      }
    );
    if (response.status === 200) {
      SuccessToaster(response.data.message, panelId, 'success');
      return true;
    }
    if (response.status === 500) {
      ErrorToaster(response.data.message, panelId, 'error');
    }
    return false;
  } catch (error) {
    ErrorToaster((error as any).message, panelId, 'error');
    return false;
  }
};
export const postPersonalData = async (panelId: string, props: any, UserId: string, payload, FromHealthObj?: boolean) => {
  try {
    const params: any = {
      EventName: 'manage-user-profile',
      UserId: UserId,
      TenantId: props.selectedClient.tenant_id,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_EVENT_API,
      token: props.sessions.id_token,
      ...payload,
    };

    const response: any = await PMS_S3.postData(params);

    if (response.Error) return ErrorToaster(response?.Error.data, panelId, 'error');
    if (FromHealthObj) {
      SuccessToaster('Health Objective updated', panelId, 'success');
    } else {
      SuccessToaster('Client Details updated', panelId, 'success');
    }
    return true;
  } catch (error) {
    ErrorToaster((error as any).message, panelId, 'error');
  }
};

export const callTimeZoneAPI = async (countryCode: string) => {
  try {
    const response = await getTimeZoneAPI(countryCode);
    const nestedoptions = response.map(({ _source }: any) =>
      _source?.timezones?.map((data: any) => ({
        label: `${data?.tzName} ${data?.gmtOffsetName}`,
        value: data?.zoneName,
      }))
    );
    let options = nestedoptions.flat();
    let timezones: any = [];
    options.forEach((value: any) => {
      if (!timezones.find((timezone: any) => timezone.label === value.label)) {
        timezones.push(value);
      }
    });
    return timezones;
  } catch (error) {}
};

export const callCitiesAPI = async (countryCode: string, searchText?: string) => {
  try {
    const response = await getCitiesAPI(countryCode, searchText);
    const options = response?.map(({ _source }: any) => ({
      label: `${_source.name}, ${_source.stateCode}`,
      value: _source.countryCode,
    }));
    return options;
  } catch (error) {}
};
export const callCountriesAPI = async (searchText?: string) => {
  try {
    const response = await getCountriesAPI(searchText);
    const options = response?.map(({ _source }: any) => ({
      label: _source.name,
      value: _source.isoCode,
    }));
    return options;
  } catch (error) {}
};

export const validatePersonalFields = (profile) => {
  let personalError = JSON.parse(JSON.stringify(clientData));
  let isValid = true;
  // if (!profile.Salutation) {
  //   personalError.Salutation = "This field cannot be empty";
  //   isValid = false;
  // }
  if (!profile.FirstName?.trim()) {
    personalError.FirstName = 'This field cannot be empty';
    isValid = false;
  }
  if (!profile.LastName?.trim()) {
    personalError.LastName = 'This field cannot be empty';
    isValid = false;
  }
  if (profile.isModifiedGender && profile.isUserTypedGender && profile.userTypedGender.length > 60) {
    personalError.userTypedGender = 'Please enter maximum 60 characters only';
    isValid = false;
  }

  // if (!profile.Nationality) {
  //   personalError.Nationality = "This field cannot be empty";
  //   isValid = false;
  // }
  // if (!profile.Country) {
  //   personalError.Country = "This field cannot be empty";
  //   isValid = false;
  // }
  // if (!profile.City) {
  //   personalError.City = "This field cannot be empty";
  //   isValid = false;
  // }
  return { personalError, isValid };
};
