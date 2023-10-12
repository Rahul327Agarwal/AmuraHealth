import ErrorToaster from "../../../../../../Common/ErrorToaster";
import { PMS_S3 } from "../../../../../../Utils";

export const validateSurveyData = (title: string, collectionId: string) => {
  let error = {
    titleError: '',
    collectionIdError: '',
    default: '',
  };
  if (!title && !collectionId) {
    error.collectionIdError = 'Please select collection title.';
  }
  return error;
};

export const initialscheduleEvent = {
  channel: '',
  duration: '',
  timeUnits: '',
  participants: [],
  title: '',
};
export const callTypeItem = [{ value: 'voice', label: 'voice' }];

export const staffList = [
  {
    value: 'Manidhar',
    label: 'Manidhar',
  },
  {
    value: 'Mono',
    label: 'Mono',
  },
  {
    value: 'Sai',
    label: 'Sai',
  },
];

export const getCollectionLists = async (panelId: string, sessions: any, collectionType: string, tenantId: string = 'amura') => {
  try {
    const response = await PMS_S3.getObject(
      `pms-ql-collections/${collectionType}/${tenantId}/collectionList.json`,
      import.meta.env.VITE_CLIENT_BUCKET,
      {
        TenantId: '',
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: sessions.id_token,
      }
    );
    if (!response.Error) {
      response.collections.sort((a, b) => {
        const fa = a?.heading?.toLowerCase() || a?.title?.toLowerCase();
        const fb = b?.heading?.toLowerCase() || b?.title?.toLowerCase();
        if (fa < fb) return -1;
        if (fa > fb) return 1;
        return 0;
      });

      return response.collections;
    }
    return [];
  } catch (error) {
    ErrorToaster(error.message, panelId, 'error');
  }
};
export const SUREVEY_TYPES = [
  { value: 'POLL', label: 'Polls' },
  { value: 'KBM', label: 'Knowledge base' },
  { value: 'QMT', label: 'Questionnaire' },
  { value: 'LMS', label: 'Learning management system' },
];
