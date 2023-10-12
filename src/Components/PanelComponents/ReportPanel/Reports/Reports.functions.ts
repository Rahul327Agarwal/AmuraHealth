import { PMS_S3 } from '../../../../Utils';
import ErrorToaster from './../../../../Common/ErrorToaster';
import SuccessToaster from './../../../../Common/SuccessToaster';
import { IProps } from './Reports.types';

export const getReportsLists = async (panelId: string, props: IProps) => {
  try {
    const response = await PMS_S3.getObject(
      `pms-ql-biomarker-reports/${props.selectedClient.client_id}/reportList.json`,
      import.meta.env.VITE_CLIENT_BUCKET,
      {
        TenantId: '',
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: props.sessions.id_token,
      }
    );
    return response.reports || [];
  } catch (error) {
    ErrorToaster(error.message, panelId, 'error');
  }
};

export const getCurrentReport = async (panelId: string, props: IProps, reportId: any) => {
  try {
    const response = await PMS_S3.getObject(
      `pms-ql-biomarker-reports/${props.selectedClient.client_id}/${reportId}/myReport.json`,
      import.meta.env.VITE_CLIENT_BUCKET,
      {
        TenantId: '',
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: props.sessions.id_token,
      }
    );
    return response || {};
  } catch (error) {
    ErrorToaster(error.message, panelId, 'error');
  }
};
export const getBiomarkerOptionLabel = (biomarkerId: string, groupName: string, type: string) => {
  return `${biomarkerId}${groupName ? `, ${groupName}` : ''}${type ? `, ${type}` : ''}`;
};

export const getBiomarkerOptionValue = (biomarkerId: string, groupName: string, type: string) => {
  return `${biomarkerId || ''}${SPLIT_KEY}${groupName || ''}${SPLIT_KEY}${type || ''}`;
};

export const SPLIT_KEY = '{{SPLIT}}';

export const SUCCESS_MESSAGE = {
  ADD: 'Report added successfully.',
  UPDATE: 'Report updated successfully.',
  DEACTIVATE: 'Report deactivated successfully.',
  ACTIVATE: 'Report activated successfully.',
  DELETE: 'Report deleted successfully.',
};

export const postReportsAPI = async (props: any, payload: any, panelId: string) => {
  try {
    const params = {
      EventName: 'biomarker-reports',
      tenantId: 'amura',
      userId: props.sessions.user.id,
      patientId: props.selectedClient.client_id,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_REPORT_UPDATE,
      token: props.sessions.id_token,
      method: 'POST',
      ...payload,
    };

    const response = await PMS_S3.postData(params);
    if (!response.Error) {
      SuccessToaster(SUCCESS_MESSAGE[payload.action] || 'success.', panelId, 'success');
      return true;
    }
    ErrorToaster(response.Error, panelId, 'error');
  } catch (error) {}
};

export const sampledata = {
  isActive: 1,
  createdOn: '2022-11-28T10:17:00.312Z',
  labName: 'DEF Health Laboratories',
  tenantId: 'amura',
  reportDate: '2022-11-15T11:37:30Z',
  biomarkers: [
    {
      groupName: 'Pregnancy',
      updatedBy: '948aee3d-6712-48a9-a03b-c926f5f99915',
      createdBy: '948aee3d-6712-48a9-a03b-c926f5f99915',
      unitId: 'μg/L',
      updatedOn: '2022-11-28T10:17:00.313Z',
      type: 'Serum',
      biomarkerId: '~Serum~AFP~AFP~',
      value: '139',
      createdOn: '2022-11-28T10:17:00.313Z',
    },
  ],
  reasonForDeactivation: '',
  sampleDate: '2022-11-10T11:37:30Z',
  createdBy: '948aee3d-6712-48a9-a03b-c926f5f99915',
  reportId: '59089049-ce7a-0000-a96a-0b447c06c033',
  patientId: '177170c3-23c7-4f85-ba3e-2807e6ad4697',
};
