import { PMS_S3 } from '../../../Utils';
import { EmptyBiomarker, IProps } from './Interface/IBiomarkerEntry';
import { defaultIPatientBiomarker, InvestigationReport, IPatientBiomarker } from './Interface/IInvestigationReport';
import { EmptyLabs, ILabs } from './Interface/ILabs';
import ErrorToaster from './../../../Common/ErrorToaster';
import { getFormattedDate } from './../../../Common/Common.functions';
import axios from 'axios';
import { addBiomarkerValidate, validateDeleteReport } from './Validate';
import { setLoadingFlag } from './../../../DisplayFramework/State/Slices/InvestigationEntrySlice';

export const getPatientReportList = async (
  currentpatientId: string,
  investigationReportId: string,
  filesList: any,
  setFilesList: Function,
  sessions: any,
  dispatch: any,
  selectedClient: any,
  deleteFileName?: string
) => {
  if (deleteFileName) {
    const filteredData = filesList.filter((item: any) => {
      return item.name != deleteFileName;
    });
    setFilesList(filteredData);
  } else {
    const response: any = await PMS_S3.listS3Files(
      `pms-ql-bmreport/${currentpatientId}/${investigationReportId}`,
      import.meta.env.VITE_CLIENT_BUCKET!,
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
      const existingFiles: { key: any; name: any; url: string }[] = [];
      if (data && data.length > 0) {
        data.forEach((item: any) => {
          const fileName = item.Key && item.Key.split('/').reverse()[0];
          if (fileName.indexOf('.json') == -1) {
            existingFiles.push({
              key: item.Key,
              name: fileName,
              url: `${import.meta.env.VITE_S3_DOWNLOAD_API}?key=${item.Key}`,
            });
          }
        });
        setFilesList(existingFiles);
      } else {
        setFilesList([]);
      }
    }
  }
  dispatch(setLoadingFlag(false));
};

export const getPatientBiomarker = async (
  panelId: string,
  currentpatientId: string,
  investigationReportId: string,
  setIrDate: Function,
  sessions: any,
  selectedClient: any,
  dispatch: any
) => {
  const patientId = currentpatientId;
  const reportId = investigationReportId;
  let reportData: InvestigationReport = {};
  const response: any = await PMS_S3.getObject(
    `pms-ql-bmentry/${patientId}/${reportId}/patientInvestigationReport.json`,
    '',
    {
      TenantId: selectedClient.tenant_id,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_S3_FETCH_API,
      token: sessions.id_token,
      headers: {},
    },
    'error'
  );
  if (!response?.Error) {
    reportData = response.InvestigationReport;
  } else {
    ErrorToaster('Unable to load the Investigation report!', panelId, 'error');
  }
  setIrDate(reportData);
  dispatch(setLoadingFlag(false));
  return reportData;
};

export const getLab = async (sessions: any, selectedClient: any, setLabs: Function, dispatch: any) => {
  const response: any = await PMS_S3.getObject(
    `pms-ql-lab/laboratories.json`,
    '',
    {
      TenantId: selectedClient.tenant_id,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_S3_FETCH_API,
      token: sessions.id_token,
      headers: {},
    },
    'error'
  );
  if (!response?.Error) {
    let reportData: ILabs = response;
    setLabs(reportData);
  } else {
    setLabs(EmptyLabs);
  }
  dispatch(setLoadingFlag(false));
};

export const getBiomarkers = async (setData: Function, sessions: any, selectedClient: any) => {
  const response: any = await PMS_S3.getObject(
    `pms-ql-biomarker/biomarkers.json`,
    '',
    {
      TenantId: selectedClient.tenant_id,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_S3_FETCH_API,
      token: sessions.id_token,
      headers: {},
    },
    'error'
  );
  if (!response?.Error) {
    setData(response);
  } else {
    setData(EmptyBiomarker);
  }
};

export const getUpdatedPatientBio = (InvestigationReport: any): Array<IPatientBiomarker> => {
  let patientBio: Array<IPatientBiomarker> = [];
  const { Biomarkers = [] } = JSON.parse(JSON.stringify(InvestigationReport));
  Biomarkers.forEach((biomarker: IPatientBiomarker) => {
    if (biomarker.BiomarkerId != null || biomarker.BiomarkerId != '') {
      biomarker.state = 'read';
      biomarker.isDirty = false;
      patientBio.push(biomarker);
    }
  });
  return patientBio;
};

export const closeErrorToast = (setValidationError: any, setErrorMsg: any) => {
  setValidationError(false);
  setErrorMsg('');
};

const getEventNameByFieldName = {
  SampleDate: 'ir-sample-date-update',
  ReportDate: 'ir-report-date-update',
  SidNumber: 'ir-sid-number-update',
  VendorName: 'ir-lab-name-update',
};

export const updateField = async (
  panelId: string,
  fieldName: string,
  value: any,
  setValue: Function,
  reportId: string,
  patientId: string,
  sessions: any,
  selectedClient: any,
  dispatch: any
) => {
  let reqBody = {
    EventName: (getEventNameByFieldName as any)[fieldName],
    PatientId: patientId,
    ReportId: reportId,
    [fieldName]: value,
    TenantId: selectedClient.tenant_id,
    Locale: sessionStorage.getItem('locale'),
    url: import.meta.env.VITE_EVENT_API,
    token: sessions.id_token,
    method: 'POST',
    headers: {},
  };
  dispatch(setLoadingFlag(true));
  const resp = await PMS_S3.postData(reqBody);
  if (!resp?.Error) {
    setValue(value);
  } else {
    ErrorToaster(resp?.Error.data, panelId, 'error');
  }
  dispatch(setLoadingFlag(false));
};

export const deleteReport = async (
  panelId: string,
  reportId: string,
  patientId: string,
  deleteInvestigationReport: any,
  sessions: any,
  selectedClient: any,
  dispatch: any
) => {
  dispatch(setLoadingFlag(true));
  const errorObj = validateDeleteReport(panelId, reportId);
  if (errorObj) {
    return;
  }
  let reqBody = {
    EventName: 'ir-delete',
    ReportId: reportId,
    PatientId: patientId,
    TenantId: selectedClient.tenant_id,
    Locale: sessionStorage.getItem('locale'),
    url: import.meta.env.VITE_EVENT_API,
    token: sessions.id_token,
    method: 'POST',
    headers: {},
  };

  const resp = await PMS_S3.postData(reqBody);
  if (!resp?.Error) {
    deleteInvestigationReport();
  } else {
    ErrorToaster(resp?.Error.data, panelId, 'error');
  }
  dispatch(setLoadingFlag(false));
};

export const editPatientBiomarker = (index: number, patientBiomarker: IPatientBiomarker[], setPatientBiomarker: any) => {
  let patientBio: Array<IPatientBiomarker> | undefined = [];
  patientBio = patientBiomarker;
  patientBio![index].state = 'edit';
  setPatientBiomarker(JSON.parse(JSON.stringify(patientBio)));
};

export const updateBiomarker = async (
  panelId: string,
  biomarker: any,
  index: number,
  reportId: string,
  reportDate: string,
  patientId: any,
  patientBiomarker: any,
  setPatientBiomarker: (arg0: any) => void,
  sessions: any,
  selectedClient: any,
  dispatch: any
) => {
  let patientBio: any = [];
  const errorObj = addBiomarkerValidate(reportId, biomarker.BiomarkerShortName, biomarker.BiomarkerReportValue);

  if (errorObj) {
    dispatch(setLoadingFlag(false));
    return;
  }
  patientBio = patientBiomarker;
  patientBio[index] = biomarker;
  const reqBody = {
    EventName: 'ir-biomarker-update',
    PatientId: patientId,
    ReportId: reportId,
    OldBiomarkerId: patientBiomarker![index].BiomarkerId,
    OldUnitId: patientBiomarker![index].UnitId,
    OldBiomarkerValue: patientBiomarker![index].BiomarkerReportValue,
    OldBiomarkerGroupId: patientBiomarker![index].BiomarkerGroupId,
    NewBiomarkerId: biomarker.BiomarkerId,
    NewUnitId: biomarker.UnitId,
    NewBiomarkerValue: biomarker.BiomarkerReportValue,
    NewBiomarkerGroupId: biomarker.BiomarkerGroupId,
    TenantId: selectedClient.tenant_id,
    Locale: sessionStorage.getItem('locale'),
    ReportDate: getFormattedDate(reportDate),
    url: import.meta.env.VITE_EVENT_API,
    token: sessions.id_token,
    method: 'POST',
    headers: {},
  };
  const resp = await PMS_S3.postData(reqBody);
  if (!resp?.Error) {
    patientBio[index].state = 'read';
    setPatientBiomarker(JSON.parse(JSON.stringify(patientBio)));
  } else {
    ErrorToaster(resp?.Error.data, panelId, 'error');
  }
  dispatch(setLoadingFlag(false));
};

export const deleteBiomarker = async (
  panelId: string,
  biomarkerIndex: number,
  reportId: any,
  patientId: any,
  patientBiomarker: any,
  setPatientBiomarker: (arg0: IPatientBiomarker[]) => void,
  sessions: any,
  selectedClient: any,
  dispatch: any
) => {
  const patientBio: Array<IPatientBiomarker> = (patientBiomarker || []).slice();
  const biomarkerId = patientBio![biomarkerIndex].BiomarkerId;
  const biomarkerGroupId = patientBio![biomarkerIndex].BiomarkerGroupId;

  if (patientBio.length === 1) {
    patientBio.splice(0);
  } else {
    patientBio.splice(biomarkerIndex, 1);
  }
  const reqBody = {
    EventName: 'ir-biomarker-remove',
    PatientId: patientId,
    ReportId: reportId,
    Biomarkers: [
      {
        BiomarkerId: biomarkerId,
        BiomarkerGroupId: biomarkerGroupId,
      },
    ],
    TenantId: selectedClient.tenant_id,
    Locale: sessionStorage.getItem('locale'),
    url: import.meta.env.VITE_EVENT_API,
    token: sessions.id_token,
    method: 'POST',
    headers: {},
  };
  const resp = await PMS_S3.postData(reqBody);
  if (!resp?.Error) {
    setPatientBiomarker(JSON.parse(JSON.stringify(patientBio)));
    dispatch(setLoadingFlag(false));
  } else {
    ErrorToaster(resp?.Error.data, panelId, 'error');
    dispatch(setLoadingFlag(false));
  }
};

export const addBiomarker = async (
  panelId: string,
  biomarker: IPatientBiomarker,
  index: number,
  reportId: string,
  reportDate: string,
  patientId: any,
  patientBiomarker: IPatientBiomarker[],
  setPatientBiomarker: (arg0: any) => void,
  setEditReport: (arg0: boolean) => void,
  sessions: any,
  selectedClient: any,
  dispatch: any
) => {
  let patientBio: any = [];
  setEditReport(true);
  const errorObj = addBiomarkerValidate(
    reportId,
    biomarker.BiomarkerShortName,
    biomarker.BiomarkerReportValue,
    biomarker.BiomarkerId,
    patientBiomarker,
    biomarker.BiomarkerGroupId
  );
  if (errorObj) {
    dispatch(setLoadingFlag(false));
    return;
  }
  patientBio = createEmptyBiomarker(patientBiomarker);
  patientBio[index] = biomarker;

  const reqBody = {
    EventName: 'ir-biomarker-add',
    PatientId: patientId,
    ReportId: reportId,
    BiomarkerId: biomarker.BiomarkerId,
    BiomarkerGroupId: biomarker.BiomarkerGroupId,
    UnitId: biomarker.UnitId,
    BiomarkerValue: biomarker.BiomarkerReportValue,
    TenantId: selectedClient.tenant_id,
    Locale: sessionStorage.getItem('locale'),
    ReportDate: getFormattedDate(reportDate),
    url: import.meta.env.VITE_EVENT_API,
    token: sessions.id_token,
    method: 'POST',
    headers: {},
  };
  const resp = await PMS_S3.postData(reqBody);
  if (!resp?.Error) {
    patientBio[index].state = 'read';
    setPatientBiomarker(JSON.parse(JSON.stringify(patientBio)));
    dispatch(setLoadingFlag(false));
  } else {
    ErrorToaster(resp?.Error.data, panelId, 'error');
    dispatch(setLoadingFlag(false));
  }
};

export const createEmptyBiomarker = (patientBiomarker: any[]) => {
  let patientBio = JSON.parse(JSON.stringify(patientBiomarker || []));
  let emptyRec: IPatientBiomarker = defaultIPatientBiomarker;
  patientBio.push(emptyRec);
  return patientBio;
};

export const uploadFile = (
  panelId: string,
  props: IProps,
  reportId: any,
  files: any,
  setFiles: any,
  setRerenderFlag: any,
  setOpen: any,
  sessions: any,
  fetchFiles: Function,
  dispatch: any
) => {
  dispatch(setLoadingFlag(true));
  const { patientId } = props;
  const successfullyUpload = [];
  const failedToUpload: any = [];
  files.map(async (value: any, index: number) => {
    const token = sessions.id_token;
    let url = `${import.meta.env.VITE_S3_IR_UPLOAD_API}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': value.type || '',
      'file-name': value.name || '',
      'file-content-type': value.type || '',
      'patient-id': patientId || '',
      'investigation-report-id': reportId || '',
      'tenant-id': props.selectedClient.tenant_id || '',
    };
    let formData = new FormData();
    formData.append('input_files', value);
    axios
      .post(url, formData, { headers: headers })
      .then((response) => {
        if (response) {
          successfullyUpload.push(value);
        }
      })
      .catch(() => {
        failedToUpload.push(value);
        if (reportId != undefined && index == files.length - 1) {
          setFiles(failedToUpload);
          setRerenderFlag(new Date().getTime());
          fetchFiles(patientId, reportId);
          if (failedToUpload.length === 0) {
            setOpen(false);
          }
        }
        ErrorToaster(`Unable to upload ${value.name}!`, panelId, 'error');
      });
  });
};

export const deleteFile = async (
  panelId: string,
  objKey: string,
  patientId: any,
  reportId: any,
  props: any,
  sessions: any,
  selectedClient: any,
  dispatch: any,
  fetchFiles: Function
) => {
  dispatch(setLoadingFlag(true));
  const errorObj = validateDeleteReport(panelId, objKey);
  if (errorObj) {
    dispatch(setLoadingFlag(false));
    return;
  }
  let reqBody = {
    EventName: 'ir-report-delete',
    ReportId: reportId,
    PatientId: patientId,
    FileName: objKey,
    TenantId: selectedClient.tenant_id,
    Locale: sessionStorage.getItem('locale'),
    url: import.meta.env.VITE_EVENT_API,
    token: sessions.id_token,
    method: 'POST',
    headers: {},
  };
  const resp = await PMS_S3.postData(reqBody);
  if (!resp?.Error && reportId != undefined) {
    setTimeout(() => {
      fetchFiles(patientId, reportId);
    }, 2000);
  } else {
    ErrorToaster(resp?.Error.data, panelId, 'error');
    dispatch(setLoadingFlag(false));
  }
};
