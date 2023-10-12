import axios from 'axios';
export const HistoryCard_Data = [
  {
    label: 'Citizenship',

    after: ['USA', 'UK'],
    before: ['India', 'AUS'],
    updatedOn: '20/04/2022, 10:52 AM',
    updatedBy: 'John Honay',
  },
  {
    label: 'Health Objective',
    after: 'Lorum ipsum psum ipsum lorum ipsum lorum ipsum ipsum ipsum',
    before: 'Like to reverse my type 2 diabetes and reduce, Like to reverse my type 2 diabetes and reduce',
    updatedOn: '20/04/2022, 10:52 AM',
    updatedBy: 'John Honay',
  },
];
export const getcurrentUserdata = async (props: any, searchText?: string) => {
  const payload = {
    index: 'users',
    _source: ['sort_key', 'profile.nick_name', 'profile.first_name', 'profile.last_name'],
    query: {
      match: {
        _id: `${searchText}`,
      },
    },
  };
  let response = await getUsersList(props, payload);
  // return (
  //   response[0]?._source?.profile?.nick_name ||
  //   `${response[0]?._source?.profile?.first_name} ${response[0]?._source?.profile?.last_name}` ||
  //   response[0]?._source?.sort_key ||
  //   ""
  // );
  const options = {
    firstname: response[0]?._source?.profile?.first_name || '',
    lasttname: response[0]?._source?.profile?.last_name || '',
    userName:
      `${response[0]?._source?.profile?.first_name} ${response[0]?._source?.profile?.last_name}` ||
      response[0]?._source?.sort_key ||
      '',
  };
  return options;
};

export const getUsersList = async (props: any, payload: any) => {
  const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
  const response = await axios.post(url, payload, {
    headers: { Authorization: `Bearer ${props.sessions.id_token}` },
  });
  return response?.data?.body || [];
};

export const I_IMAGE_SECTION_OPTIONS = [
  'Country',
  'City',
  'last_name',
  'TimeZoneName',
  'first_name',
  // 'Nationality',
  'salutation',
];

export const I_DETAILS_SECTION_OPTIONS = [
  'weight',
  // 'isUserTypedGender',
  'userTypedGender',
  // 'isModifiedGender',
  'MedicallyModifiedGender',
  'ConditionsInterested',
  'USDatabase',
  'bloodGrp',
  'emergencyContact',
  'email',
  'Nationality',
  'location',
  'FoodRestriction',
  'height',
  'language_preference',
  'cuisine',
  'sex',
  'whatsAppNumber',
  'date_of_birth',
];

export const I_SOCIAL_PLATFORMS_OPTIONS = ['linkedInUrl', 'youtubeUrl', 'instagramUrl', 'twitterUrl', 'facebookUrl'];

// export const showDetialsOptionsHistory = (role) => {
//   let dataOptions = [];
//   switch (role) {
//     case 'basic-user':
//       dataOptions = [
//         'height',
//         'weight',
//         'date_of_birth',
//         'userTypedGender',
//         'MedicallyModifiedGender',
//         'ConditionsInterested',
//         'FoodRestriction',
//         'cuisine',
//         'language_preference',
//         'emergencyContact',
//         'email',
//         'Nationality',
//         'location',
//         'sex',
//         'whatsAppNumber',
//         'USDatabase',
//         'bloodGrp',
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
//         'height',
//         'weight',
//         'date_of_birth',
//         'userTypedGender',
//         'sex',
//         'email',
//         'MedicallyModifiedGender',
//         'ConditionsInterested',
//         'FoodRestriction',
//         'cuisine',
//         'bloodGrp',
//       ];
//       break;
//     case 'hr_level1':
//     case 'HR_Level1':
//     case 'HR':
//     case 'talent_acquisition_level1':
//       dataOptions = [
//         'date_of_birth',
//         'userTypedGender',
//         'MedicallyModifiedGender',
//         'sex',
//         'language_preference',
//         'emergencyContact',
//         'email',
//         'Nationality',
//         'location',
//         'whatsAppNumber',
//         'USDatabase',
//         'bloodGrp',
//       ];
//       break;
//   }
//   return dataOptions;
// };
