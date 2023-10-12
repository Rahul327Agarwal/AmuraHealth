import moment from 'moment';
import ErrorToaster from '../../../Common/ErrorToaster';
import { PMS_S3 } from '../../../Utils';
import {
  AddNewConditionIcon,
  AddPrescriptionIcon,
  HumanDiagnosticNo,
  HumanDiagnosticPause,
  HumanDiagnosticYes,
  MachineDiagnosticNo,
  MachineDiagnosticPause,
  MachineDiagnosticYes,
} from './DiagnosticCondition.svg';
import {
  IConditionObject,
  IDefaultAddCondition,
  IHomeProps,
  TQuesColorMap,
  defaultAddCondition,
} from './DiagnosticCondition.types';
import axios from 'axios';

export const validateAddConditionFields = (details: IDefaultAddCondition) => {
  let detailsError: IDefaultAddCondition = JSON.parse(JSON.stringify(defaultAddCondition));
  let isValid = true;

  if (!details?.Condition) {
    detailsError.Condition = 'The input field is empty/invalid.';
    isValid = false;
  }
  if (!details?.Description?.trim()) {
    detailsError.Description = 'The input field is empty/invalid.';
    isValid = false;
  }

  return { detailsError, isValid };
};

export const pauseEvent = (e) => {
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
};

export const MACHINE_ICON: any = {
  YES: <MachineDiagnosticYes />,
  NO: <MachineDiagnosticNo />,
  PAUSE: <MachineDiagnosticPause />,
};
export const HUMAN_ICON: any = {
  YES: <HumanDiagnosticYes />,
  NO: <HumanDiagnosticNo />,
  PAUSE: <HumanDiagnosticPause />,
};

export const ACTION_OPTIONS = [
  { label: 'Add new condition', value: 'ADD_CONDITION', icon: AddNewConditionIcon },
  { label: 'Add prescription', value: 'ADD_PRESCRIPTION', icon: AddPrescriptionIcon },
];

export const ACTION_OPTIONS_DIAGNOSTIC = (condition, prescription) => {
  let result = [];
  if (condition) result.push({ label: 'Add new condition', value: 'ADD_CONDITION', icon: <AddNewConditionIcon /> });
  if (prescription) result.push({ label: 'Add prescription', value: 'ADD_PRESCRIPTION', icon: <AddPrescriptionIcon /> });
  return result;
};

export async function getPatientBiomarker(props: IHomeProps) {
  const response: any = await PMS_S3.getObject(
    `pms-ql-biomarker/${props.selectedClient.client_id}/patientBiomarker.json`,
    import.meta.env.VITE_CLIENT_BUCKET,
    {
      TenantId: props.selectedClient.tenant_id,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_S3_FETCH_API,
      token: props.sessions.id_token,
    }
  );
  return response?.biomarkers || [];
}

export const getBiomarkerGraphs = async (props: IHomeProps, params: any) => {
  try {
    const payload = {
      patientId: props.patientId,
      tenantId: 'amura',
      url: import.meta.env.VITE_ROOT_BIOMARKER,
      token: props.sessions.id_token,
      method: 'POST',
      ...params,
    };

    const response = await PMS_S3.postData(payload);
    if (response?.Error) return;
    return response || {};
  } catch (error) {
    console.error('error in biomarker graph', error);
  }
};

export async function getListOfAllConditions(props: IHomeProps) {
  try {
    const response = await PMS_S3.getObject(
      `pms-ql-list-conditions/conditions.json`,
      import.meta.env.VITE_PLATFORM_BUCKET,
      {
        TenantId: props.selectedClient.tenant_id,
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: props.sessions.id_token,
      },
      []
    );
    if (response.Error || !response) return [];
    return response?.map(({ ConditionId, StageId }) => ({
      label: StageId ? `${ConditionId}, ${StageId}` : `${ConditionId}`,
      value: StageId ? `${ConditionId}, ${StageId}` : `${ConditionId}`,
      ConditionId: ConditionId,
      StageId: StageId,
    }));
  } catch (error) {
    return [];
  }
}
export async function getDiagnosticCondition(props: IHomeProps) {
  try {
    const response: any = await PMS_S3.getObject(
      `pms-ql-diagnostic-decision/${props.selectedClient.client_id}/diagnostic-decision.json`,
      import.meta.env.VITE_CLIENT_BUCKET,
      {
        TenantId: props.selectedClient.tenant_id,
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: props.sessions.id_token,
        headers: {},
      }
    );
    if (response?.Error) return;
    response?.Conditions?.sort((a, b) => a?.Name?.localeCompare(b?.Name) || a?.Stage?.localeCompare(b?.Stage));
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function onAddNewCondition(panelId: string, props: IHomeProps, params: any) {
  try {
    const reqBody = {
      EventName: 'add-condition',
      PatientId: props.selectedClient.client_id,
      TenantId: props.selectedClient.tenant_id,
      UserName: props.sessions.user.id,
      Locale: sessionStorage.getItem('locale'),
      token: props.sessions.id_token,
      method: 'POST',
      url: import.meta.env.VITE_EVENT_API,

      ConditionId: params?.ConditionId,
      StageId: params?.StageId,
      Description: params?.Description?.trim(),
    };

    const response = await PMS_S3.postData(reqBody);
    if (!response?.Error) return reqBody;
    ErrorToaster('Unable to add condition!', panelId, 'error');
  } catch (error) {
    ErrorToaster('Unable to add condition!', panelId, 'error');
  }
}

export const updateConditionStatus = async (panelId: string, props: IHomeProps, params: any) => {
  try {
    const reqBody = {
      EventName: 'condition-status-update',
      updateType: 'condition',
      PatientId: props.selectedClient.client_id,
      TenantId: props.selectedClient.tenant_id,
      UserName: props.sessions.user.id,

      Locale: sessionStorage.getItem('locale'),
      token: props.sessions.id_token,
      method: 'POST',
      url: `${import.meta.env.VITE_EVENT_API}`,
      ...params,
    };
    const response = await PMS_S3.postData(reqBody);
    if (!response?.Error) return reqBody;
    ErrorToaster('Unable to update diagnostic decision!', panelId, 'error');
  } catch (error) {
    ErrorToaster('Unable to update diagnostic decision!', panelId, 'error');
  }
};

export const updateBiomarkerCondition = async (panelId: string, props: IHomeProps, payload: any) => {
  try {
    const reqBody = {
      EventName: 'condition-status-update',
      updateType: 'biomarkers',
      PatientId: props.selectedClient.client_id,
      TenantId: props.selectedClient.tenant_id,
      UserName: props.sessions.user.id,

      Locale: sessionStorage.getItem('locale'),
      token: props.sessions.id_token,
      method: 'POST',
      url: `${import.meta.env.VITE_EVENT_API}`,
      ...payload,
    };
    const response = await PMS_S3.postData(reqBody);
    if (!response?.Error) return reqBody;
    ErrorToaster('Unable to update diagnostic decision!', panelId, 'error');
  } catch (error) {
    ErrorToaster('Unable to update diagnostic decision!', panelId, 'error');
  }
};

export const addBiomarkerToCondition = async (panelId: string, data: any, props: IHomeProps, condition: any, status: string) => {
  const reqBody = {
    EventName: 'diagnostic-decision-biomarker-update',
    PatientId: String(props.selectedClient.client_id),
    StageId: String(condition.Stage),
    ReportId: '',
    BiomarkerGroupId: data.BiomarkerGroupId,
    ConditionId: String(condition.ConditionId),
    BiomarkerId: String(data.BiomarkerId),
    BiomarkerName: data ? data.Name : '',
    DiagnosisExplanation: '',
    HumanDiagnosis: status,
    Locale: sessionStorage.getItem('locale'),
    token: props.sessions.id_token,
    headers: {},
    url: `${import.meta.env.VITE_EVENT_API}`,
    TenantId: props.selectedClient.tenant_id,
  };
  const response = await PMS_S3.postData(reqBody);
  if (response?.Error) {
    ErrorToaster(response?.Error.data, panelId, 'error');
  }
};

export const updateHealthType = async (panelId: string, props: any, healthType: string) => {
  const { patientId, selectedClient, sessions } = props;
  let params: any = {
    EventName: 'manage-health-profile',
    UserId: patientId,
    TenantId: selectedClient.tenant_id,
    Locale: sessionStorage.getItem('locale'),
    url: import.meta.env.VITE_EVENT_API,
    token: sessions.id_token,
    HealthType: healthType,
    UserName: patientId,
    headers: {},
  };
  PMS_S3.postData(params).then((resp) => {
    if (resp?.Error) {
      ErrorToaster(resp?.Error.data, panelId, 'error');
    }
  });
};

export const getUserInformation = async (props: any): Promise<string> => {
  const { sessions, selectedClient } = props;
  let response: any = null;
  response = await PMS_S3.getObject(
    `pms-ql-user/${selectedClient.client_id}/userProfile.json`,
    import.meta.env.VITE_CLIENT_BUCKET,
    {
      TenantId: selectedClient.tenant_id,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_S3_FETCH_API,
      token: sessions.id_token,
      headers: {},
    }
  );
  if (response?.Error) {
    return Promise.reject('');
  } else {
    return Promise.resolve(response.HealthType || '');
  }
};

export const getConditionTitle = (Name: string, Stage: string) => `${Name}${Stage ? `, ${Stage}` : ''}`;

export const getUniqueGraphkey = (Name: string, Stage: string, key: string): string => {
  return `${getConditionTitle(Name, Stage)}###${key} `;
};

export const getConditionsHistoryLists = async (panelId: string, props: IHomeProps, conditionName: string) => {
  try {
    const response = await PMS_S3.getObject(
      `pms-ql-diagnositic-decision-conditions-history/${props.selectedClient.client_id}/${conditionName}/conditionHistory.json`,
      import.meta.env.VITE_CLIENT_BUCKET,
      {
        TenantId: '',
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: props.sessions.id_token,
      }
    );
    return response.Error ? [] : response || [];
  } catch (error) {
    ErrorToaster(error.message, panelId, 'error');
    return [];
  }
};

export const getAddConditionObject = (payload: any): IConditionObject => {
  return {
    ...payload,
    ConditionId: payload?.ConditionId,
    Name: payload?.ConditionId,
    Stage: payload?.StageId,
    StageId: payload?.StageId,
    IsPrescribed: 0,
    IsAvailableInActivePrescription: 0,
    IsActive: 1,
    MachineDiagnosis: '',
    DiagnosisExplanation: payload?.Description,
    Symptoms: [],
    HumanDiagnosis: {
      diagnosis: 'YES',
      updated_by: payload?.UserName,
      updated_on: new Date().toISOString(),
      history: [
        {
          updated_by: payload?.UserName,
          updated_on: new Date().toISOString(),
          diagnosis: 'YES',
        },
      ],
    },
    Biomarkers: [],
    conditionBiomarkers: payload?.conditionBiomarkers,
  };
};

export const getUpdateStatusObject = (conditions: Array<IConditionObject>, payload: any): Array<IConditionObject> => {
  if (!conditions) return [];
  return conditions.map((data) => {
    if (data.ConditionId === payload?.ConditionId && data.StageId === payload?.StageId) {
      return {
        ...data,
        HumanDiagnosis: {
          diagnosis: payload?.HumanDiagnosis,
          updated_by: payload?.UserName,
          updated_on: new Date().toISOString(),
          history: [
            ...(data?.HumanDiagnosis?.history ? data?.HumanDiagnosis?.history : []),
            {
              updated_by: payload?.UserName,
              updated_on: new Date().toISOString(),
              diagnosis: payload?.HumanDiagnosis,
            },
          ],
        },
      };
    }
    return data;
  });
};

export const getAddBiomarkerObject = (conditions: Array<IConditionObject>, payload: any): Array<IConditionObject> => {
  if (!conditions) return [];
  const Biomarkers = payload?.biomarkers?.map((data) => ({
    Id: data,
    Name: data,
    UpdatedBy: payload?.UserName,
    UpdatedOn: moment().format('YYYY-MM-DD'),
  }));
  return conditions.map((data) => {
    if (data.ConditionId === payload?.ConditionId && data.StageId === payload?.StageId) {
      return {
        ...data,
        Biomarkers: [...(data?.Biomarkers ? data?.Biomarkers : []), ...Biomarkers],
        HumanDiagnosis: {
          ...data?.HumanDiagnosis,
          history: [
            ...(data?.HumanDiagnosis?.history ? data?.HumanDiagnosis?.history : []),
            {
              updated_by: payload?.UserName,
              updated_on: moment().format('YYYY-MM-DD'),
              diagnosis: payload?.HumanDiagnosis,
            },
          ],
        },
      };
    }
    return data;
  });
};

export const getQuesColors = async (sessions: any): Promise<TQuesColorMap> => {
  try {
    const payload = {
      payLoad: { partKey: 'lov_name', partKeyValue: `~survey~answer~color~master~`, tableName: 'platform-lov-master' },
    };

    const url = `${import.meta.env.VITE_BASE_API_URL}/queryFromDB`;
    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${sessions.id_token}` },
    });
    const quesColorMap: TQuesColorMap = {};
    response?.data?.forEach((v) => {
      quesColorMap[v.lov_name_id] = v.color;
    });
    return quesColorMap;
  } catch (error) {
    return {};
  }
};

export const dummy_surveyQusResponses = [
  {
    surveyQuestion: 'Did you attain puberty at an earlier age than usual?',
    answers: [
      {
        surveyDate: '2023-06-20T13:29:45.472Z',
        distributionId: '800960e6-70b4-4489-b7a5-f09d93f896e0',
        surveyAnswer: 'Often',
      },
      {
        surveyDate: '2023-07-12T13:29:45.472Z',
        distributionId: '800960e6-70b4-4489-b7a5-f09d93f896e0',
        surveyAnswer: 'Sometime',
      },
      {
        surveyDate: '2023-07-29T13:29:45.472Z',
        distributionId: '800960e6-70b4-4489-b7a5-f09d93f896e0',
        surveyAnswer: 'Yes',
      },
      {
        surveyDate: '2023-08-10T05:07:39.480Z',
        distributionId: '5793f75f-46fd-48bc-b1da-f422d3abc59e',
        surveyAnswer: 'Rarely',
      },
      {
        surveyDate: '2023-09-10T05:27:25.992Z',
        distributionId: '8cb891ad-8699-4147-8578-3a04ce4330c3',
        surveyAnswer: 'Never',
      },
    ],
    questionId: '10d84a36-dc16-45da-ad96-f38f3c1cf08b',
  },
];
