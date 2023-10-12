import { Dispatch, SetStateAction } from 'react';
import { isValidNumberOrEmpty } from '../../../Common/Common.functions';
import ErrorToaster from '../../../Common/ErrorToaster';
import SuccessToaster from '../../../Common/SuccessToaster';
import { PMS_S3 } from '../../../Utils';
import { Eggetarian, Fruitarian, NonVegetarian, Pescatarian, Vegan, VegetarianSmall } from './PatientDetailedProfile.svg';
import {
  IHeightField,
  IOptions,
  IPatientDetailedProfile,
  IProfileDetailsState,
  IProfilePayload,
} from './PatientDetailedProfile.types';
export const INIT_PORFILE_STATE: IProfileDetailsState = {
  heightField: {
    cm: '',
    ft: '',
    in: '',
  },
  height: '',
  // feet: '',
  // inches: '',
  heightUnit: 'cm',
  weight: '',
  weightUnit: 'kgs',
  DateOfBirth: null,
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

  facebookUrl: '',
  twitterUrl: '',
  instagramUrl: '',
  youtubeUrl: '',
  linkedInUrl: '',
  emergencyContact: '',
  bloodGrp: '',
  USDatabase: '',

  Mobile: '',
};

// export const HEIGHT_UNITS: IOptions[] = [
//   { label: 'cm', value: 'cm' },
//   { label: 'inch', value: 'inch' },
//   { label: 'feet', value: 'feet' },
// ];

export const HEIGHT_UNIT_OPTIONS: IOptions[] = [
  { label: 'ft/in', value: 'ft/in' },
  { label: 'cm', value: 'cm' },
];
export const WEIGHT_UNITS: IOptions[] = [
  { label: 'kgs', value: 'kgs' },
  { label: 'lbs', value: 'lbs' },
];

export const BLOOD_UNITS: IOptions[] = [
  { label: 'A', value: 'a' },
  { label: 'B', value: 'b' },
];

export const MODIFIED_DETAILS_OPTIONS: IOptions[] = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Non-binary', value: 'Non-binary' },
  { label: 'Transgender', value: 'Transgender' },
  { label: 'Intersex', value: 'Intersex' },
  { label: 'I prefer not to say', value: 'I prefer not to say' },
];

export const GENDER_OPTIONS: IOptions[] = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
];

export const MODIFIED_GENDER_OPTIONS: IOptions[] = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];
export const FOOD_RESTRICTIONS_OPTIONS: IOptions[] = [
  { label: 'Vegan', value: 'Vegan', icon: <Vegan /> },
  { label: 'Vegetarian', value: 'Vegetarian', icon: <VegetarianSmall /> },
  { label: 'Omnivore', value: 'Omnivore', icon: <NonVegetarian /> },
  { label: 'Eggetarian', value: 'Eggetarian', icon: <Eggetarian /> },
  { label: 'Pescatarian', value: 'Pescatarian', icon: <Pescatarian /> },
  { label: 'Fruitarian', value: 'Fruitarian', icon: <Fruitarian /> },
];

export const getAllCuisines = async (props: IPatientDetailedProfile) => {
  let allCuisines = await PMS_S3.getObject(`pms-ql-cuisines/allCuisines.json`, import.meta.env.VITE_PLATFORM_BUCKET, {
    TenantId: props.selectedClient.tenant_id,
    Locale: sessionStorage.getItem('locale'),
    url: import.meta.env.VITE_S3_FETCH_API,
    token: props.sessions.id_token,
    headers: {},
  });
  return Promise.resolve(allCuisines);
};

const isValidMobile = (mobileNo: string) => {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(mobileNo);
};
const isValidEmail = (emailId: string) => {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    emailId
  );
};

export const validateProfileDetails = (
  stateValue: IProfileDetailsState
): { errorMessage: IProfileDetailsState; isValid: boolean } => {
  let errorMessage: IProfileDetailsState = JSON.parse(JSON.stringify(INIT_PORFILE_STATE));
  let isValid = true;

  if (stateValue.isModifiedGender && stateValue.isUserTypedGender && stateValue.userTypedGender.length > 60) {
    errorMessage.userTypedGender = 'Please enter maximum 60 characters only';
    isValid = false;
  }
  if (stateValue.whatsAppNumber && !isValidMobile(stateValue.whatsAppNumber)) {
    errorMessage.whatsAppNumber = 'Please enter a valid whatsapp number';
    isValid = false;
  }
  if (stateValue.emergencyContact && !isValidMobile(stateValue.emergencyContact)) {
    errorMessage.emergencyContact = 'Please enter a valid emergency contact number';
    isValid = false;
  }
  if (stateValue.EMail && !isValidEmail(stateValue.EMail)) {
    errorMessage.EMail = 'Please enter a valid email';
    isValid = false;
  }
  // if (stateValue.height) {
  //   errorMessage.height = 'Please enter a valid height';
  //   isValid = false;
  // }
  if (stateValue.heightField.cm && stateValue.heightField.cm.startsWith('.')) {
    errorMessage.height = 'Please enter a valid height';
    isValid = false;
  }
  if (stateValue.heightUnit === 'ft/in') {
    if (
      (Boolean(stateValue.heightField.ft.length) && stateValue.heightField.ft.startsWith('.')) ||
      (Boolean(stateValue.heightField.ft.length) &&
        Number(stateValue.heightField.ft) === 0 &&
        !Boolean(stateValue.heightField.in.length))
    ) {
      errorMessage.heightField.ft = 'Enter valid number';
      isValid = false;
    }

    if (Boolean(stateValue.heightField.in.length) && stateValue.heightField.in.startsWith('.')) {
      errorMessage.heightField.ft = 'Enter valid number';
      isValid = false;
    }

    // if ((stateValue.heightField.in !== '' && Number(stateValue.heightField.in) < 1) || Number(stateValue.heightField.in) > 11) {
    //   errorMessage.inches = 'Enter between 1 to 11';
    //   isValid = false;
    // }

    if (
      (stateValue.heightField.in !== '' && Number(stateValue.heightField.in) < 0) ||
      Number(stateValue.heightField.in) > 11 ||
      stateValue.heightField.in.startsWith('.')
    ) {
      errorMessage.heightField.in = 'Enter between 0 to 11';
      isValid = false;
    }
  }
  if (stateValue.heightUnit === 'cm') {
    if (
      stateValue.heightField.cm.startsWith('.') ||
      (stateValue.heightField.cm.length > 0 && Number(stateValue.heightField.cm) === 0)
    ) {
      errorMessage.heightField.cm = 'Please enter valid number';
      isValid = false;
    }
  }
  if (stateValue.weight && (!isValidNumberOrEmpty(stateValue.weight) || +stateValue.weight <= 0)) {
    errorMessage.weight = 'Please enter a valid weight';
    isValid = false;
  }
  return { errorMessage, isValid };
};

export const postPatientProfileData = async (panelId: string, props: IPatientDetailedProfile, payload: IProfilePayload) => {
  try {
    const params: any = {
      EventName: 'manage-user-profile',
      UserId: props.patientId,
      TenantId: props.selectedClient.tenant_id,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_EVENT_API,
      token: props.sessions.id_token,
      ...payload,
    };
    const response: any = await PMS_S3.postData(params);
    if (response.Error) return ErrorToaster(response?.Error.data, panelId, 'error');
    SuccessToaster('Client Details updated', panelId, 'success');
    return true;
  } catch (error) {
    ErrorToaster((error as any).message, panelId, 'error');
  }
};

export const getPatientProfileData = async (
  panelId: string,
  props: IPatientDetailedProfile,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const API_URL = `pms-ql-user/${props.patientId}/userProfile.json`;
    const params = {
      TenantId: props.selectedClient.tenant_id,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_S3_FETCH_API,
      token: props.sessions.id_token,
    };
    const response: any = await PMS_S3.getObject(API_URL, import.meta.env.VITE_CLIENT_BUCKET, params);

    if (response?.Error) return ErrorToaster('error.message', panelId, 'error');
    return response;
  } catch (error) {
    ErrorToaster((error as any).message, panelId, 'error');
  } finally {
    setIsLoading(false);
  }
};

export const changeInAnyField = (apiData: IProfileDetailsState, stateData: IProfileDetailsState): boolean => {
  if (apiData?.height !== stateData?.height) return true;
  if (apiData?.heightField !== stateData?.heightField) return true;
  if (apiData?.heightUnit !== stateData?.heightUnit) return true;
  if (apiData?.weight !== stateData?.weight) return true;
  if (apiData?.weightUnit !== stateData?.weightUnit) return true;
  if (new Date(apiData?.DateOfBirth).setHours(0, 0, 0, 0) !== new Date(stateData?.DateOfBirth).setHours(0, 0, 0, 0)) return true;
  if (apiData?.Gender !== stateData?.Gender) return true;
  if (apiData?.isModifiedGender !== stateData?.isModifiedGender) return true;
  if (apiData?.MedicallyModifiedGender !== stateData?.MedicallyModifiedGender) return true;
  if (apiData?.isUserTypedGender !== stateData?.isUserTypedGender) return true;
  if (apiData?.userTypedGender !== stateData?.userTypedGender) return true;
  if (apiData?.FoodRestriction !== stateData?.FoodRestriction) return true;
  if (apiData?.Cuisine !== stateData?.Cuisine) return true;
  if (
    apiData?.PreferredLanguages &&
    stateData?.PreferredLanguages &&
    apiData?.PreferredLanguages?.join(', ') !== stateData?.PreferredLanguages?.join(', ')
  )
    return true;
  if (
    apiData?.PreferredLanguagesNames &&
    stateData?.PreferredLanguagesNames &&
    apiData?.PreferredLanguagesNames?.join(', ') !== stateData?.PreferredLanguagesNames?.join(', ')
  )
    return true;
  if (apiData?.whatsAppNumber !== stateData?.whatsAppNumber) return true;
  if (apiData?.Nationality !== stateData?.Nationality) return true;
  if (apiData?.EMail !== stateData?.EMail) return true;
  if (apiData?.facebookUrl !== stateData?.facebookUrl) return true;
  if (apiData?.twitterUrl !== stateData?.twitterUrl) return true;
  if (apiData?.instagramUrl !== stateData?.instagramUrl) return true;
  if (apiData?.youtubeUrl !== stateData?.youtubeUrl) return true;
  if (apiData?.linkedInUrl !== stateData?.linkedInUrl) return true;
  if (apiData?.emergencyContact !== stateData?.emergencyContact) return true;
  return false;
};

//height: '',
// heightUnit: 'cm',
// weight: '',
// weightUnit: 'kgs',
// DateOfBirth: null,
// Gender: '',
// isModifiedGender: true,
// MedicallyModifiedGender: '',
// isUserTypedGender: true,
// userTypedGender: '',

// FoodRestriction: '',
// Cuisine: [],
// PreferredLanguages: [],
// PreferredLanguagesNames: [],
// whatsAppNumber: '',
// ResidingCountry: '',
// Nationality: '',
// EMail: '',

// facebookUrl: '',
// twitterUrl: '',
// instagramUrl: '',
// youtubeUrl: '',
// linkedInUrl: '',
// emergencyContact: '',
// bloodGrp: '',
// USDatabase: '',

// Mobile: '',
// export const showOptionsBasedOnROle = (role) => {
//   let showOptions = {};
//   switch (role) {
//     case 'basic-user':
//       showOptions = {
//         height: false,
//         weight: false,
//         DateOfBirth: false,
//         Gender: false,
//         FoodRestriction: false,
//         Cuisine: false,
//         PreferredLanguages: false,
//         Mobile: false,
//         whatsAppNumber: false,
//         ResidingCountry: false,
//         Nationality: false,
//         EMail: false,
//         bloodGrp: false,
//         emergencyContact: false,
//       };
//       break;
//     case 'amura_guidance_counselor_level1':
//     case 'amura_guidance_counselor_level2':
//     case 'amura_consulting_physician':
//     case 'L1 - Treating Doctor':
//     case 'L2 - Treating Doctor':
//     case 'L1 - Health Coach':
//     case 'L2 - Health Coach':
//     case 'L3 - Treating Doctor':
//     case 'L1 - Diagnostic Doctor':
//     case 'L2 - Diagnostic Doctor':
//     case 'L3 - Diagnostic Doctor':
//     case 'L4 - Diagnostic Doctor':
//     case 'L1 - Intake Doctor':
//     case 'L2 - Intake Doctor':
//     case 'L3 - Intake Doctor':
//     case 'L1 - Team Assigner':
//     case 'amura_primary_health_coach':
//     case 'amura_secondary_health_coach':
//     case 'L3_Limitless':
//     case 'L2_Limitless':
//     case 'L1_Limitless':
//     case 'L3_HEC':
//     case 'L2_HEC':
//     case 'L1_HEC':
//     case 'Amura_CEO':
//       showOptions = {
//         height: false,
//         weight: false,
//         DateOfBirth: false,
//         Gender: false,
//         FoodRestriction: false,
//         Cuisine: false,
//         PreferredLanguages: true,
//         Mobile: false,
//         whatsAppNumber: true,
//         ResidingCountry: true,
//         Nationality: true,
//         EMail: false,
//         bloodGrp: false,
//         emergencyContact: true,
//       };
//       break;
//     case 'hr_level1':
//     case 'HR_Level1':
//     case 'HR':
//     case 'talent_acquisition_level1':
//       showOptions = {
//         height: true,
//         weight: true,
//         DateOfBirth: false,
//         Gender: false,
//         FoodRestriction: true,
//         Cuisine: true,
//         PreferredLanguages: false,
//         Mobile: false,
//         whatsAppNumber: false,
//         ResidingCountry: false,
//         Nationality: false,
//         EMail: false,
//         bloodGrp: false,
//         emergencyContact: false,
//       };
//       break;
//   }
//   return showOptions;
// };
