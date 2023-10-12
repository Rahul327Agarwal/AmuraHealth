import { PMS_S3 } from '../../../../Utils';
import ErrorToaster from './../../../../Common/ErrorToaster';
import { getFormattedDate } from './../../../../Common/Common.functions';
import { setLoadingFlag } from './../../../../DisplayFramework/State/Slices/InvestigationEntrySlice';
import { validateAddRequest } from '../Validate';

export const saveReportInfo = async (
  panelId: string,
  patientId: string,
  currentState: any,
  setCurrentState: Function,
  updateReportId: Function,
  setDisableAllFields: Function,
  createEmptyBiomarker: boolean,
  setCreateEmptyBiomarker: Function,
  sessions: any,
  selectedClient: any,
  onNewReportAdd: any,
  dispatch: any
) => {
  if (checkMandatoryFields(currentState)) {
    const errorObj = validateAddRequest(
      currentState.labName,
      currentState.sampleDateState.toString(),
      currentState.reportDateState.toString()
    );
    if (errorObj) {
      dispatch(setLoadingFlag(false));
      setDisableAllFields(false);
      return;
    }
    setDisableAllFields(true);
    dispatch(setLoadingFlag(true));
    if (!createEmptyBiomarker) {
      const reqBody = {
        PatientId: patientId,
        SampleDate: getFormattedDate(currentState.sampleDateState.toString()),
        ReportDate: currentState.reportDateState.toString(),
        LaboratoryName: currentState.labName,
        SidNumber: currentState.sidNumberForState,
        TenantId: selectedClient.tenant_id,
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_MYWORK_BIOMARKER_REPORT_ADD_API,
        token: sessions.id_token,
        method: 'POST',
        headers: {},
      };
      const resp = await PMS_S3.postData(reqBody);
      if (!resp?.Error) {
        const { ReportId } = resp;
        onNewReportAdd(ReportId);
        setCurrentState({ ...currentState, reportId: ReportId });
        updateReportId(
          ReportId,
          reqBody.LaboratoryName,
          currentState.sidNumberForState,
          getFormattedDate(currentState.reportDateState.toString()),
          getFormattedDate(currentState.sampleDateState.toString())
        );
        setCreateEmptyBiomarker(true);
      } else {
        ErrorToaster(resp?.Error.data, panelId, 'error');
      }
    }
  }

  dispatch(setLoadingFlag(false));
  setDisableAllFields(false);
};

export const updateFields = (
  panelId: string,
  fieldName: string,
  props: any,
  currentState: any,
  setCurrentState: Function,
  setDisableAllFields: Function,
  createEmptyBiomarker: boolean,
  setCreateEmptyBiomarker: Function,
  onNewReportAdd: any,
  dispatch: any,
  dataValue?: any
) => {
  const { reportDate, sidNumber, lab, sampleDate, selectedClient, sessions } = props;
  const labName = currentState.labName;
  const reportDateState = fieldName === 'reportDate' ? dataValue : currentState.reportDateState;
  const sampleDateState = fieldName === 'sampleDate' ? dataValue : currentState.sampleDateState;
  const sidNumberState = fieldName === 'sidNumber' ? dataValue : currentState.sidNumberForState;
  if (fieldName === 'reportDate') {
    setCurrentState({ ...currentState, reportDateState: reportDateState });
    if (!reportDateState) {
      return;
    }
    if (reportDateState && reportDateState.toString().toLowerCase() === 'invalid date') {
      return;
    }
  }
  if (fieldName === 'sampleDate') {
    setCurrentState({ ...currentState, sampleDateState: sampleDateState });
    if (!sampleDateState) {
      return;
    }
    if (sampleDateState && sampleDateState.toString().toLowerCase() === 'invalid date') {
      return;
    }
  }
  const labNameChanged = lab != labName;
  const sidChange = sidNumber != sidNumberState;
  const reportDateChanged =
    getFormattedDate(new Date(reportDate).toString()) != getFormattedDate(new Date(reportDateState).toString());
  const sampleDateChanged =
    getFormattedDate(new Date(sampleDate).toString()) != getFormattedDate(new Date(sampleDateState).toString());
  if (currentState.reportId && currentState.reportId != '') {
    if (
      labName &&
      labName != '' &&
      sampleDateState &&
      sampleDateState.toString().toLowerCase() !== 'invalid date' &&
      reportDateState &&
      reportDateState.toString().toLowerCase() !== 'invalid date' &&
      sidNumberState &&
      sidNumberState != ''
    ) {
      const errorObj = validateAddRequest(labName, sampleDateState.toString(), reportDateState.toString());
      if (errorObj) {
        return;
      }
      if (fieldName === 'labName' && labNameChanged) {
        props.updateLabName(labName);
      }
      if (fieldName === 'sidNumber' && sidChange) {
        props.updateSid(sidNumberState);
      }
      if (fieldName === 'reportDate' && reportDateChanged) {
        props.updateReportDate(reportDateState.toString());
      }
      if (fieldName === 'sampleDate' && sampleDateChanged) {
        props.updateSampleDate(sampleDateState.toString());
      }
    }
  } else {
    if (props.isNew) {
      let currentState = {
        sampleDateState: sampleDateState,
        reportDateState: reportDateState,
        sidNumberForState: sidNumberState,
        labName: labName,
      };
      saveReportInfo(
        panelId,
        props.patientId,
        currentState,
        setCurrentState,
        props.updateReportId,
        setDisableAllFields,
        createEmptyBiomarker,
        setCreateEmptyBiomarker,
        sessions,
        selectedClient,
        onNewReportAdd,
        dispatch
      );
    }
  }
};

const checkMandatoryFields = (currentState: any): boolean => {
  return (
    currentState.labName &&
    currentState.labName != '' &&
    currentState.sampleDateState &&
    currentState.sampleDateState.toString().toLowerCase() !== 'invalid date' &&
    currentState.reportDateState &&
    currentState.reportDateState.toString().toLowerCase() !== 'invalid date' &&
    currentState.sidNumberForState &&
    currentState.sidNumberForState != ''
  );
};
