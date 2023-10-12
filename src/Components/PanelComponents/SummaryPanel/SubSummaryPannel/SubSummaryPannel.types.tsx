import {
  AgeIcon,
  BloodGroup,
  CitizenshipIcon,
  CityIcon,
  ConditionIcon,
  CuisineIcon,
  DOBIcon,
  DatabaseIcon,
  EmailIcon,
  EmergencyContact,
  EmployeeId,
  HeightIcon,
  JoinedOn,
  LanguageIcon,
  MobileIcon,
  SocialPlatforms,
  WeightIcon,
  Whatsapp,
} from '../SummaryPanel.svg';
import { FoodRestrictionIcon } from '../../PatientDetailedProfile/PatientDetailedProfile.svg';

export interface IProps {
  title?: any;
  textValue?: any;
  icon?: any;
  data?: any;
  onSnippetClick?: () => void;
  SetSubSummaryLoaded?: Function;
}

export const Reference = {
  height: { displayName: 'Height', icon: <HeightIcon /> },
  weight: { displayName: 'Weight', icon: <WeightIcon /> },
  genderData: { displayName: 'Age & sex at birth', icon: <AgeIcon /> },
  HealthType: { displayName: 'Condition', icon: <ConditionIcon /> },
  FoodRestriction: { displayName: 'Restrictions', icon: <FoodRestrictionIcon /> },
  Cuisine: { displayName: 'Cuisine', icon: <CuisineIcon /> },
  PreferredLanguagesNames: {
    displayName: 'Languages known',
    icon: <LanguageIcon />,
  },
  PreferredLanguages: {
    displayName: 'Languages known',
    icon: <LanguageIcon />,
  },
  Nationality: { displayName: 'Citizenship', icon: <CitizenshipIcon /> },
  DateOfBirth: { displayName: 'Date of birth', icon: <DOBIcon /> },
  Mobile: { displayName: 'Mobile number', icon: <MobileIcon /> },
  whatsAppNumber: { displayName: 'Whatsapp number', icon: <Whatsapp color="#A6A6A6" /> },
  EMail: { displayName: 'Email', icon: <EmailIcon /> },
  City: { displayName: 'City', icon: <CityIcon /> },
  ResidingCountry: { displayName: 'Current residence', icon: <CityIcon /> },
  Country: { displayName: 'Country', icon: <CityIcon /> },
  USDatabase: { displayName: 'Database', icon: <DatabaseIcon /> },
  bloodGrp: { displayName: 'Blood group', icon: <BloodGroup /> },
  SocialPlatforms: { displayName: 'Social platforms', icon: <SocialPlatforms /> },
  emergencyContact: {
    displayName: 'Emergency contact',
    icon: <EmergencyContact />,
  },
  employeeId: { displayName: 'Employee id', icon: <EmployeeId /> },
  createdOn: { displayName: 'Joined on', icon: <JoinedOn /> },
};
export const subSummaryOptions = [
  'Mobile',
  'EMail',
  'height',
  'weight',
  'DateOfBirth',
  'genderData',
  'HealthType',
  'FoodRestriction',
  'Cuisine',
  'PreferredLanguages',
  'whatsAppNumber',
  'ResidingCountry',
  'Nationality',
  'City',
  'emergencyContact',
  'bloodGrp',
  'USDatabase',
  'SocialPlatforms',
];
export const optionsDetailsWithIDS = {
  height: 'PatientBasicProfileDetails.1',
  weight: 'PatientBasicProfileDetails.2',
  DateOfBirth: 'PatientBasicProfileDetails.3',
  date_of_birth: 'PatientBasicProfileDetails.3A',
  Gender: 'PatientBasicProfileDetails.4',
  genderData: 'PatientBasicProfileDetails.4A',
  userTypedGender: 'PatientBasicProfileDetails.4B',
  MedicallyModifiedGender: 'PatientBasicProfileDetails.4C',
  HealthType: 'PatientBasicProfileDetails.5',
  ConditionsInterested: 'PatientBasicProfileDetails.6',
  FoodRestriction: 'PatientBasicProfileDetails.7',
  Cuisine: 'PatientBasicProfileDetails.9',
  cuisine: 'PatientBasicProfileDetails.9A',
  PreferredLanguages: 'PatientBasicProfileDetails.10',
  language_preference: 'PatientBasicProfileDetails.10A',
  Mobile: 'PatientBasicProfileDetails.11',
  whatsAppNumber: 'PatientBasicProfileDetails.12',
  ResidingCountry: 'PatientBasicProfileDetails.13',
  Nationality: 'PatientBasicProfileDetails.14',
  location: 'PatientBasicProfileDetails.15',
  City: 'PatientBasicProfileDetails.16',
  EMail: 'PatientBasicProfileDetails.17',
  email: 'PatientBasicProfileDetails.17A',
  bloodGrp: 'PatientBasicProfileDetails.18',
  emergencyContact: 'PatientBasicProfileDetails.19',
  USDatabase: 'PatientBasicProfileDetails.20',
  SocialPlatforms: 'PatientBasicProfileDetails.21',
  sex: 'PatientBasicProfileDetails.22',
};
// export const showOptionsForDataOrder = (role) => {
//   let dataOptions = [];
//   switch (role) {
//     case 'basic-user':
//       dataOptions = [
//         'Mobile',
//         'EMail',
//         'height',
//         'weight',
//         'DateOfBirth',
//         'genderData',
//         'HealthType',
//         'DietPreference',
//         'Cuisine',
//         'PreferredLanguages',
//         'whatsAppNumber',
//         'ResidingCountry',
//         'Nationality',
//         'City',
//         'emergencyContact',
//         'bloodGrp',
//         'USDatabase',
//         'SocialPlatforms',
//       ];
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
//       dataOptions = [
//         'Mobile',
//         'EMail',
//         'height',
//         'weight',
//         'DateOfBirth',
//         'genderData',
//         'HealthType',
//         'DietPreference',
//         'Cuisine',
//         'bloodGrp',
//       ];
//       break;
//     case 'hr_level1':
//     case 'HR_Level1':
//     case 'HR':
//     case 'talent_acquisition_level1':
//       dataOptions = [
//         'Mobile',
//         'EMail',
//         'DateOfBirth',
//         'genderData',
//         'PreferredLanguages',
//         'whatsAppNumber',
//         'ResidingCountry',
//         'Nationality',
//         'emergencyContact',
//         'bloodGrp',
//       ];
//       break;
//   }
//   return dataOptions;
// };
