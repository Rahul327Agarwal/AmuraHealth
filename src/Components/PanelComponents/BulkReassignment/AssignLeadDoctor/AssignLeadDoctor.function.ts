import ErrorToaster from '../../../../Common/ErrorToaster';
import SuccessToast from '../../../../Common/SuccessToaster';
import { PMS_S3 } from '../../../../Utils';
import { AssignLeadDoctorProps } from '../ManualAddFlow/ManualAddFlow.types';

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

export const getAllStaffProfileFromRole = async (panelId: string, props: AssignLeadDoctorProps) => {
  const { sessions, selectedClient, selectedRole, cardsToAssign, staffPoolData } = props;
  try {
    let userIdsdata = Object.values(staffPoolData);
    let poolObj = userIdsdata[0]?.map((each) => {
      return {
        userId: each,
        userName: each,
      };
    });
    const reqBody = {
      EventName: 'get_matched_staff',
      method: 'POST',
      patientId: cardsToAssign.patientId,
      tenantId: selectedClient.tenant_id,
      url: import.meta.env.VITE_GET_MATCHED_STAFF_BULK,
      token: sessions.id_token,
      roleId: cardsToAssign.currentStaffRoleId,
      pool: poolObj,
    };
    const response = await PMS_S3.postData(reqBody);
    if (!response?.Error) return response;
    ErrorToaster(response.Error.data, panelId, 'error');
    return null;
  } catch (error) {
    console.error('!!error', error);
    ErrorToaster(error.message, panelId, 'error');
    return null;
  }
};
export const onSave = async (props: any, staffObject: any, panelId: string) => {
  const {
    assignerHierarchyId,
    assignerId,
    assignerRoleId,
    currentStaffHierarchyId,
    currentStaffId,
    currentStaffRoleId,
    tenantId,
    patientId,
    cardId,
  } = props?.cardsToAssign;
  let request = {
    // EventName: 'addStaff',
    EventName: 'patient-add',
    // tenantId: tenantId,
    // userId: patientId,
    UserId: patientId,
    cardType: 'nameCards',
    // staffs: [
    //   {
    //     staffId: staffObject.id,
    //     action: 'ADD',
    //     roleId: currentStaffRoleId,
    //   },
    // ],
    Tenants: [
      {
        Id: tenantId,
        TenantId: tenantId,
        Staffs: [
          {
            Id: staffObject.id,
            Action: 'ADD',
            Roles: [currentStaffRoleId],
          },
        ],
      },
    ],
    // createdBy: props.sessions.user.id,
    // updatedBy: props.sessions.user.id,
    cardId: cardId,
    isFromBulk: true,
    assignerId: assignerId,
    assignerRoleId: assignerRoleId,
    assignerHierarchyId: assignerHierarchyId,
    currentStaffHierarchyId: currentStaffHierarchyId,
    currentStaffId: currentStaffId,
    currentStaffRoleId: currentStaffRoleId,

    url: `${import.meta.env.VITE_EVENT_API}`,
    token: props.sessions.id_token,
    AutoAssign: true,
    method: 'POST',
    headers: {},
  };

  try {
    let response = await staffToClientAPI(request);
    if (response) {
      SuccessToast('Staff added succesfully!', panelId, 'success');
      return true;
    } else {
      return false;
    }
  } catch (error) {
    ErrorToaster(error, panelId, 'error');
    return false;
  }
};
export const staffToClientAPI = async (request: any): Promise<string | boolean> => {
  try {
    const response = await PMS_S3.postData(request);
    if (response?.Error) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};
