import { PMS_S3 } from '../../../Utils';
import { getCitiesAPI, getCountriesAPI, getTimeZoneAPI } from './../../../Common/Common.functions';
import ErrorToaster from './../../../Common/ErrorToaster';
import SuccessToast from './../../../Common/SuccessToaster';
import {
  AccountDetailsType,
  FoodAndHealthType,
  IDefaultPersonalTypes,
  PersonalAndFoodTypes,
  profileTabsType,
} from './ProfileManagement.types';

export const PROFILE_TABS: Array<profileTabsType> = ['Personal', 'Food & Health', 'Account details'];

export const defaultPersonal: IDefaultPersonalTypes = {
  Salutation: '',
  FirstName: '',
  LastName: '',
  Gender: 'Male',
  isModifiedGender: false,
  isUserTypedGender: false,
  MedicallyModifiedGender: '',
  userTypedGender: '',
  DateOfBirth: '',

  Nationality: '',
  CurrentResidence: '',
  City: '',
  Country: '',
  CountryCode: '',
  TimeZone: '',
  TimeZoneName: '',
  PreferredLanguages: [],
};
export const foodAndHealth: FoodAndHealthType = {
  FoodRestriction: '',
  Cuisine: [],
  Objective: '',
};
export const AccountDetail: AccountDetailsType = {
  NickName: '',
  EMail: '',
  Mobile: '',
  whatsAppNumber: '',
  Password: '',
  referredBy: '',
  referredPersonRelation: '',
};
export const PersonalAndFood: PersonalAndFoodTypes = {
  Salutation: '',
  FirstName: '',
  LastName: '',
  Gender: 'Male',
  isModifiedGender: false,
  isUserTypedGender: false,
  MedicallyModifiedGender: '',
  userTypedGender: '',
  DateOfBirth: '',

  Nationality: '',
  CurrentResidence: '',
  City: '',
  Country: '',
  CountryCode: '',
  TimeZone: '',
  TimeZoneName: '',
  PreferredLanguages: [],
  FoodRestriction: '',
  Cuisine: [],
  Objective: '',

  NickName: '',
  EMail: '',
  Mobile: '',
  whatsAppNumber: '',
  Password: '',
  referredBy: '',
  referredPersonRelation: '',
};

export const validatePersonalFields = (profile: IDefaultPersonalTypes) => {
  let personalError = JSON.parse(JSON.stringify(defaultPersonal));
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
export const validateAccountDetails = (profile: AccountDetailsType) => {
  let accountDetailsError = JSON.parse(JSON.stringify(AccountDetail));
  let isValid = true;

  if (profile.whatsAppNumber) {
    // eslint-disable-next-line no-useless-escape
    if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(profile.whatsAppNumber)) {
      accountDetailsError.whatsAppNumber = 'Please enter a valid whatsapp number';
      isValid = false;
    }
  }

  // eslint-disable-next-line no-useless-escape
  if (
    profile.EMail &&
    !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      profile.EMail
    )
  ) {
    accountDetailsError.EmailId = 'Please enter a valid email';
    isValid = false;
  }
  return { accountDetailsError, isValid };
};
export const postPersonalData = async (
  panelId: string,
  props: any,
  UserId: string,
  payload: PersonalAndFoodTypes,
  FromHealthObj?: boolean
) => {
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
      SuccessToast('Health Objective updated', panelId, 'success');
    } else {
      SuccessToast('Client Details updatedko', panelId, 'success');
    }
    return true;
  } catch (error) {
    ErrorToaster((error as any).message, panelId, 'error');
  }
};

export const getPersonalProfileData = async (panelId: string, props: any, UserId: string) => {
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
  }
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
