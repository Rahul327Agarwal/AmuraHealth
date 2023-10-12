import ErrorToaster from '../../../../Common/ErrorToaster';
import { PMS_S3 } from '../../../../Utils';

export const initCoefficientObject = {
  language: 1,
  pastBadRelationships: 1,
  criticality: 1,
  personality: 1,
  complexity: 1,
  scarcity: 1,
  specificRequest: 1,
  country: 1,
  skill: 1,
  goodRelationshipe: 1,
  loadBalancing: 1,
};

export const initStaffScore = {
  language: 0,
  pastBadRelationships: 0,
  criticality: 0,
  personality: 0,
  complexity: 0,
  scarcity: 0,
  specificRequest: 0,
  country: 0,
  skill: 0,
  goodRelationshipe: 0,
  loadBalancing: 0,
};

export const dummyClientdata = {
  id: 'client1',
  specificRequest: ['weightGain1'],
  language: ['hindi1'],
  country: 'india',
  skill: ['skillA'],
  pastBadRelationships: true,
  goodRelationshipe: true,
  personality: ['introvert'],
  criticality: ['none'],
  complexity: ['high'],
  loadBalancing: true,
  scarcity: true,
};

export const dummyStaffdata = [
  {
    id: 'staff1', // 90%
    profileURL: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600',
    profileName: 'Cody Fisher',
    ratingValue: '4.8',
    specificRequest: ['weightGain'],
    language: ['hindi'],
    country: 'india',
    skill: ['skillA'],
    pastBadRelationships: true,
    goodRelationshipe: true,
    personality: ['introvert'],
    criticality: ['none'],
    complexity: ['high'],
    loadBalancing: true,
    scarcity: true,
    roleId: 'Doctor',
  },
  {
    id: 'staff2',
    profileURL: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1600',
    profileName: 'Jane Cooper',
    ratingValue: '4.8',
    specificRequest: ['weightGain'],
    language: ['hindi'],
    country: 'india',
    skill: ['skillA'],
    pastBadRelationships: true,
    goodRelationshipe: true,
    personality: ['introvert'],
    criticality: ['none'],
    complexity: ['high'],
    loadBalancing: true,
    scarcity: false,
    roleId: 'Doctor',
  },
  {
    id: 'staff3',
    profileURL: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1600',
    profileName: 'Mark Spencer',
    ratingValue: '4.8',
    specificRequest: ['weightGain'],
    language: ['hindi'],
    country: 'india',
    skill: ['skillA'],
    pastBadRelationships: true,
    goodRelationshipe: true,
    personality: ['introvert'],
    criticality: ['none'],
    complexity: ['high'],
    loadBalancing: false,
    scarcity: false,
    roleId: 'Health Coach',
  },
  {
    id: 'staff4',
    profileURL: 'https://images.pexels.com/photos/428361/pexels-photo-428361.jpeg?auto=compress&cs=tinysrgb&w=1600',
    profileName: 'Theresa Webb',
    ratingValue: '4.8',
    specificRequest: ['weightGain'],
    language: ['hindi'],
    country: 'india',
    skill: ['skillA1'],
    pastBadRelationships: false,
    goodRelationshipe: false,
    personality: ['introvert'],
    criticality: ['none'],
    complexity: ['high'],
    loadBalancing: true,
    scarcity: true,
    roleId: 'Health Coach',
  },
  {
    id: 'staff5',
    profileURL: 'https://images.pexels.com/photos/428361/pexels-photo-428361.jpeg?auto=compress&cs=tinysrgb&w=1600',
    profileName: 'Jummy Webb',
    ratingValue: '4.8',
    specificRequest: ['weightGain1'],
    language: ['hindi1'],
    country: 'india',
    skill: ['skillA1'],
    pastBadRelationships: true,
    goodRelationshipe: true,
    personality: ['introvert'],
    criticality: ['none1'],
    complexity: ['high'],
    loadBalancing: true,
    scarcity: false,
    roleId: 'Guidance Counsellor',
  },
  {
    id: 'staff6',
    profileURL: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1600',
    profileName: 'Jonny Cooper',
    ratingValue: '4.8',
    specificRequest: ['weightGain1'],
    language: ['hindi1'],
    country: 'india',
    skill: ['skillA1'],
    pastBadRelationships: true,
    goodRelationshipe: true,
    personality: ['introvert'],
    criticality: ['none'],
    complexity: ['high1'],
    loadBalancing: true,
    scarcity: true,
    roleId: 'Guidance Counsellor',
  },
  {
    id: 'staff7',
    profileURL: 'https://images.pexels.com/photos/428361/pexels-photo-428361.jpeg?auto=compress&cs=tinysrgb&w=1600',
    profileName: 'Penny Webb',
    ratingValue: '4.8',
    specificRequest: ['weightGain1'],
    language: ['hindi1'],
    country: 'india',
    skill: ['skillA1'],
    pastBadRelationships: true,
    goodRelationshipe: true,
    personality: ['introvert1'],
    criticality: ['none'],
    complexity: ['high'],
    loadBalancing: false,
    scarcity: true,
    roleId: 'Data Entry',
  },
  {
    id: 'staff8',
    profileURL: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1600',
    profileName: 'Rocky Spencer',
    ratingValue: '4.8',
    specificRequest: ['weightGain'],
    language: ['hindi'],
    country: 'india1',
    skill: ['skillA'],
    pastBadRelationships: true,
    goodRelationshipe: false,
    personality: ['introvert'],
    criticality: ['none'],
    complexity: ['high'],
    loadBalancing: true,
    scarcity: true,
    roleId: 'Data Entry',
  },
];

export const propertyCardConfig = [
  {
    id: 'language',
    headerTitle: 'Language matching',
    rangeHeader: 'English, Hindi',
    tooltipText: 'Can staff speak/write in the language preferred by the patient.',
  },
  {
    id: 'pastBadRelationships',
    headerTitle: 'Past bad relationships',
    rangeHeader: 'None',
    tooltipText: 'Can staff speak/write in the language preferred by the patient.',
  },
  {
    id: 'criticality',
    headerTitle: 'Criticality matching',
    rangeHeader: 'Level 5 certificate',
    tooltipText: 'Can staff speak/write in the language preferred by the patient.',
  },
  {
    id: 'personality',
    headerTitle: 'Personality matching',
    rangeHeader: 'Level 3 certificate',
    tooltipText: 'Can staff speak/write in the language preferred by the patient.',
  },
  {
    id: 'complexity',
    headerTitle: 'Complexity matching',
    rangeHeader: 'Level 3 certificate',
    tooltipText: 'Can staff speak/write in the language preferred by the patient.',
  },
  {
    id: 'scarcity',
    headerTitle: 'Scarcity management',
    rangeHeader: 'Level 3 certificate',
    tooltipText: 'Can staff speak/write in the language preferred by the patient.',
  },
  {
    id: 'specificRequest',
    headerTitle: 'Specific Request',
    rangeHeader: 'None',
    tooltipText: 'Can staff speak/write in the language preferred by the patient.',
  },
  {
    id: 'country',
    headerTitle: 'Country',
    rangeHeader: 'None',
    tooltipText: 'Can staff speak/write in the language preferred by the patient.',
  },
  {
    id: 'skill',
    headerTitle: 'skill',
    rangeHeader: 'None',
    tooltipText: 'Can staff speak/write in the language preferred by the patient.',
  },
  {
    id: 'goodRelationshipe',
    headerTitle: 'Good Relationshipe',
    rangeHeader: 'None',
    tooltipText: 'Can staff speak/write in the language preferred by the patient.',
  },
  {
    id: 'loadBalancing',
    headerTitle: 'Load Balancing',
    rangeHeader: 'None',
    tooltipText: 'Can staff speak/write in the language preferred by the patient.',
  },
];

export const FIRST_PREFERENCE = ['specificRequest', 'language', 'country', 'skill', 'badRelationship'];

export const getAllStaffProfileFromRole = async (paneId: string, props: any) => {
  const { sessions, selectedClient, patientId, selectedRole } = props;
  try {
    const reqBody = {
      EventName: 'get_matched_staff',
      method: 'POST',
      PatientId: patientId,
      TenantId: selectedClient.tenant_id,
      patientId: patientId,
      tenantId: selectedClient.tenant_id,
      url: import.meta.env.VITE_BASE_GET_MATCHED_STAFF,
      token: sessions.id_token,
      roleId: selectedRole.value,
    };
    console.log('!!reqBody', reqBody);
    const response = await PMS_S3.postData(reqBody);
    if (!response?.Error) return response;
    ErrorToaster(response.Error.data, paneId, 'error');
    return null;
  } catch (error) {
    console.log('!!error', error);
    ErrorToaster(error.message, paneId, 'error');
    return null;
  }
};

// not in use

// export const onSave = async (
//   panelId: string,
//   props: any,
//   staffObject: any,
//   selectedRole: any,
//   selectedClientObjectRole: any,
//   setRemoveSelectedRole: any,
//   selectedClient: ISelectedClient,
//   transferData?: ITransferData
// ) => {
//   props.setIsLoading(true);
//   let staffHasMultiRole = props.allProfiles.filter((value) => value.id === staffObject.id).length > 0;

//   // let loggedInUserHasMultipleRoles = props.allProfiles.filter((value) => value.id === props.sessions.user.id).length > 0;

//   let loggedInUserRoles = props.allProfiles
//     .map((value) => (value.id === props.sessions.user.id ? value.roleId : null))
//     .filter((value) => value);

//   let loggedInUserRemoveRoles = loggedInUserRoles
//     .map((value) => (value !== selectedClientObjectRole?.roleId ? value : null))
//     .filter((value) => value);

//   let roles = props.allProfiles.map((value) => (value.id === staffObject.id ? value.roleId : null)).filter((value) => value);

//   if (staffHasMultiRole) {
//     const index = roles.indexOf(selectedRole.value);
//     if (index > -1) {
//       // only splice array when item is found
//       ErrorToaster('This staff has the selected role is already.');
//       props.setIsLoading(false);
//       return null;
//     }

//     // array = [2, 9]
//   }

//   const isTransferData = transferData?.id && transferData?.roleId;

//   const currStaff = isTransferData
//     ? [{ Id: transferData?.id, hierarchyId: transferData.hierarchyId, Roles: [transferData?.roleId], Action: 'REMOVE' }]
//     : selectedClient?.roleId
//     ? [{ Id: props.sessions.user.id, Roles: [selectedClient?.roleId], Action: 'REMOVE', assignment: 'REMOVE' }]
//     : [];
//   /**
//    *
//    * Staffs: 2 objects 1- REMOVE, 1 - ADD
//    *
//    *
//    */
//   let request = {
//     EventName: 'patient-add',
//     UserId: selectedClient.client_id,
//     Tenants: [
//       {
//         Id: selectedClient.tenant_id,
//         TenantId: selectedClient.tenant_id,
//         Staffs: [
//           ...currStaff,
//           {
//             Id: staffObject.id,
//             Roles: [...roles, selectedRole.value],
//             Action: staffHasMultiRole && !isTransferData ? 'UPDATE' : 'ADD',
//           },
//         ],
//       },
//     ],
//     url: `${import.meta.env.VITE_EVENT_API}`,
//     token: props.sessions.id_token,
//     AutoAssign: true,
//     method: 'POST',
//     headers: {},
//   };

//   if (props.assignRolesLength == 1 && props.eligibleRolesCheck) {
//     let tempStaffObj = {
//       Id: props.sessions.user.id,
//       Roles: [...loggedInUserRemoveRoles],
//       Action: loggedInUserRemoveRoles.length ? 'UPDATE' : 'REMOVE',
//     };
//     request.Tenants[0].Staffs.push(tempStaffObj);
//   }

//   console.log('!!REASSIGN ON SAVE', request);

//   try {
//     await staffToClientAPI(request);
//     if (selectedClient?.roleId) {
//       SuccessToast('Selected card reassigned successfully', panelId, 'success');
//       return true;
//     }
//     SuccessToast('Staff added succesfully!', panelId, 'success');
//     if (props.eligibleRolesCheck) {
//       setRemoveSelectedRole(selectedRole.value);
//       props.setActionType('SELECT_ROLE');
//     } else {
//       props.setActionType('STAFF_HOME');
//     }
//   } catch (error) {
//     ErrorToaster(error);
//   } finally {
//     props.setIsLoading(false);
//   }
// };

export const staffToClientAPI = async (request: any): Promise<string | boolean> => {
  const response = await PMS_S3.postData(request);
  if (response?.Error) {
    return Promise.reject(response?.Error.data);
  } else {
    return Promise.resolve(true);
  }
};
