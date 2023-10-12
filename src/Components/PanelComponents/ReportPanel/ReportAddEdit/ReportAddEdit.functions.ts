import axios from 'axios';
import { PMS_S3 } from '../../../../Utils';
import ErrorToaster from './../../../../Common/ErrorToaster';
import { IBiomarker, IProps, IReport } from './ReportAddEdit.types';
import SuccessToaster from '../../../../Common/SuccessToaster';
import { SUCCESS_MESSAGE } from '../Reports/Reports.functions';

export const DEFAULT_REPORT_STATE = {
  reportDate: null,
  sampleDate: null,
  labName: '',
  labId: '',
};

export const DEFAULT_REPORT_ERROR = {
  reportDate: '',
  sampleDate: '',
  labName: '',
  labId: '',
};

export const DEFAULT_BIOMARKER_STATE: IBiomarker = {
  biomarkerId: '',
  groupName: '',
  type: '',
  unitId: '',
  value: '',
};

export const validateReportFields = (params: IReport) => {
  let errorsObject = JSON.parse(JSON.stringify(DEFAULT_REPORT_ERROR));
  let isValid = true;

  if (!params.reportDate || !params.sampleDate) {
    errorsObject.reportDate = 'The field is empty/invalid.';
    isValid = false;
  }
  if (!params.sampleDate || !params.reportDate) {
    errorsObject.sampleDate = 'The field is empty/invalid.';
    isValid = false;
  }
  if (params.sampleDate && params.reportDate) {
    const reportDate = new Date(params.reportDate).setHours(0, 0, 0, 0);
    const sampleDate = new Date(params.sampleDate).setHours(0, 0, 0, 0);
    if (sampleDate > reportDate) {
      errorsObject.sampleDate = 'Sample date should be less than or equal to report date.';
      isValid = false;
    }
  }
  if (!params.labName?.trim().length) {
    errorsObject.labName = 'The field is empty/invalid.';
    isValid = false;
  }
  return { isValid, errorsObject };
};

export function validateDeleteReport(panelId: string, reportId: string | undefined) {
  let errorObj = false;
  if (reportId?.trim() == '' || typeof reportId === null || typeof reportId === 'undefined') {
    errorObj = true;
    ErrorToaster('No Report To Delete.', panelId, 'error');
  }
  return errorObj;
}

export const validateBiomarkerFields = (params: IBiomarker) => {
  let errorsObject = JSON.parse(JSON.stringify(DEFAULT_REPORT_STATE));
  let isValid = true;

  if (!params.biomarkerId) {
    errorsObject.biomarkerId = 'The field is empty/invalid.';
    isValid = false;
  }
  if (!params.unitId) {
    errorsObject.unitId = 'The field is empty/invalid.';
    isValid = false;
  }
  if (!params.value?.trim().length) {
    errorsObject.value = 'The field is empty/invalid.';
    isValid = false;
  }
  return { isValid, errorsObject };
};

export const getModifiedData = (preValue: any, newValue: any, isDate?: boolean) => {
  if (isDate) return preValue?.toISOString() === newValue?.toISOString() ? '' : newValue.toISOString();
  return preValue === newValue ? '' : newValue;
};

export const uploadFile = (
  panelId: string,
  props: IProps,
  reportId: string,
  file: File,
  setFile: React.Dispatch<React.SetStateAction<File[]>>,
  isShowMessage: boolean
) => {
  const token = props.sessions.id_token;
  let url = `${import.meta.env.VITE_S3_IR_UPLOAD_API}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': file.type || '',
    'file-name': file.name || '',
    'file-content-type': file.type || '',
    'patient-id': props.selectedClient.client_id || '',
    'investigation-report-id': reportId || '',
    'tenant-id': props.selectedClient.tenant_id || '',
  };
  let formData = new FormData();
  formData.append('input_files', file);

  axios
    .post(url, formData, { headers: headers })
    .then(() => {
      setFile((pre) => [...pre, file]);
      if (isShowMessage) {
        SuccessToaster(SUCCESS_MESSAGE.UPDATE, panelId, 'success');
      }
    })
    .catch(() => {
      ErrorToaster(`Unable to upload ${file.name}!`, panelId, 'error');
    });
};

export const getFileDetails = async (
  currentpatientId: string,
  investigationReportId: string,
  sessions: any,
  selectedClient: any,
  setIsLoading: any,
  setFileDetails?: Function
) => {
  setIsLoading(true);
  const response: any = await PMS_S3.listS3Files(
    `pms-ql-bmreport/${currentpatientId}/${investigationReportId}`,
    import.meta.env.VITE_CLIENT_BUCKET,
    {
      TenantId: selectedClient.tenant_id,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_S3_LISTS3_FILES_API,
      token: sessions.id_token,
      headers: {},
    },
    'error'
  );
  if (response != 'error') {
    const data = response;

    let fileData = [];
    let file: { key: any; name: any; url: string };
    if (data && data.length > 0) {
      data.forEach((item: any) => {
        const fileName = item.Key && item.Key.split('/').reverse()[0];
        if (fileName.indexOf('.json') == -1) {
          file = {
            key: item.Key,
            name: fileName,
            url: `${import.meta.env.VITE_S3_DOWNLOAD_API}?key=${item.Key}`,
          };
        }
        fileData.push(file);
      });
    }
    setFileDetails(fileData);
  }
  setIsLoading(false);
};

export const deleteFile = async (
  panelId: string,
  objKey: string,
  patientId: string,
  reportId: string,
  sessions: any,
  selectedClient: any
) => {
  const errorObj = validateDeleteReport(panelId, objKey);
  if (errorObj) return false;

  let reqBody = {
    EventName: 'ir-report-delete',
    ReportId: reportId,
    PatientId: patientId,
    FileName: objKey,
    TenantId: selectedClient.tenant_id,
    Locale: '',
    url: import.meta.env.VITE_EVENT_API,
    token: sessions.id_token,
    method: 'POST',
    headers: {},
  };

  const resp = await PMS_S3.postData(reqBody);

  if (!resp?.Error) return true;
  ErrorToaster(resp?.Error.data, panelId, 'error');
};

export const getAttachmentAPI = async (panelId: string, attachmentURL: string, props: any) => {
  let reqBody = {
    isDownloadRequired: true,
    url: attachmentURL,
    token: props.sessions.id_token,
  };
  PMS_S3.previewObject(reqBody).catch(() => {
    ErrorToaster(`Unable to download!`, panelId, 'error');
  });
};
