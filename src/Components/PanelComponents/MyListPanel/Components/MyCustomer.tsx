import React, { useState } from 'react';
import Moment from 'moment';
import MyCustomerView from './../../SummaryPanel/SummaryPanel';
import { useDispatch } from 'react-redux';
import { resetPrescription } from './../../../../DisplayFramework/State/Slices/PrescriptionSlice';
import { resetInvestigationreport } from './../../../../DisplayFramework/State/Slices/InvestigationEntrySlice';
import ErrorToaster from './../../../../Common/ErrorToaster';
import { useDFEvent } from '../../../../DisplayFramework/Events/DFEvents';
import BulkSummaryPanel from '../../BulkSummary/BulkSummary';
import ReporteesSummaryPanel from '../../SummaryPanel/ReporteesSummaryPanel';
import EventSummary from '../../EventSummary/EventSummary';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

interface IMyCustomerProps {
  injectComponent: any;
  lastDisplayedCmpState?: string;
  parameter: any;
  patientId: string;
  registerEvent: any;
  unRegisterEvent: any;
  selectedClient: any;
  sessions: any;
  type?: string;
  botData?: any;
  isAFB?: boolean;
  afbData?: any;
  isReportee?: boolean;
}

function MyCustomer(props: IMyCustomerProps) {
  const childEventTrigger = useDFEvent();
  const { id: panelId } = useCurrentPanel();

  const { patientId, selectedClient, sessions, type, botData, isAFB, afbData, isReportee } = props;

  const dispatch = useDispatch();
  const [todaysDate, setTodaysDate] = useState(Moment().format('YYYY-MM-DD'));
  const [generatePrescriptionState, setGeneratePrescriptionState] = useState({}) as any;
  const [prescriptionDays, setPrescriptionDays] = useState(`${import.meta.env.VITE_DEFAULT_PRESCRIPTION_DAYS}`);
  const [selectedPanelName, setSelectedPanelName] = useState('');

  const openBiomarkerEntry = (reportId: string) => {
    if (!patientId) {
      ErrorToaster('Something went wrong! Please try again later.', panelId, 'error');
      return;
    }
    dispatch(resetInvestigationreport(patientId));
    childEventTrigger('onInvestigationReportEntrySelect', {
      patientId: patientId,
      investigationReportId: reportId,
      deleteInvestigationReport: deleteInvestigationReport,
      isNew: false,
    });
  };

  const openHistoryGeneratePrescription = (prescriptionKey: string) => {
    if (!patientId) {
      ErrorToaster('Something went wrong! Please try again later.', panelId, 'error');
      return;
    }
    dispatch(resetPrescription(prescriptionKey));
    childEventTrigger('onPrescriptionClick', {
      patientId: patientId,
      prescriptionKey: prescriptionKey,
      startingDate: todaysDate,
      prescriptionDays: prescriptionDays,
      topicSnippetForHistory: topicSnippetClick,
      topicSnippetClick: openHistoryGeneratePrescription,
      openDiagnosticCondition: openDiagnosticCondition,
    });
  };

  const deleteInvestigationReport = () => {
    topicSnippetClick('biomarkers');
  };

  const openDiagnosticCondition = () => {
    // setState({ ...this.state, generatePrescriptionState: {} })
    topicSnippetClick('conditions');
    setSelectedPanelName('conditions');
  };

  const createReport = () => {
    if (!patientId) {
      ErrorToaster('Something went wrong! Please try again later.', panelId, 'error');
      return;
    }
    childEventTrigger('onInvestigationReportEntrySelect', {
      patientId: patientId,
      investigationReportId: '',
      deleteInvestigationReport: deleteInvestigationReport,
      isNew: true,
    });
  };

  const topicSnippetClickPrescription = (stateData: any) => {
    setGeneratePrescriptionState(stateData);
    setTodaysDate(Moment(stateData.startingDate).format('YYYY-MM-DD'));
    setPrescriptionDays(stateData.prescriptionDays);
    topicSnippetClick('conditions');
  };

  const topicSnippetClick = (componentName: string | undefined) => {
    // dispatch(selectWork(1))
    if (!patientId) {
      ErrorToaster('Something went wrong! Please try again later.', panelId, 'error');
      return;
    }
    let prescriptionState: any;
    if (generatePrescriptionState && generatePrescriptionState.patientId && generatePrescriptionState.patientId !== patientId) {
      // if the patient id has changed we need to dump the data in generatePrescriptionState
      setGeneratePrescriptionState({});
      setPrescriptionDays(`${import.meta.env.VITE_DEFAULT_PRESCRIPTION_DAYS}`);
      setTodaysDate(Moment().format('YYYY-MM-DD'));
    } else {
      prescriptionState = generatePrescriptionState;
    }

    switch (componentName) {
      case 'conditions':
        childEventTrigger('onDiagnosticConditionSelect', {
          patientId: patientId,
          topicSnippetClick: topicSnippetClick,
        });
        break;
      case 'notes':
        childEventTrigger('onNotesDiagnosticConditionSelect', {
          patientId: patientId,
          topicSnippetClick: topicSnippetClick,
        });
        break;
      case 'allergens':
        childEventTrigger('onAllergensSelect', { patientId: patientId });
        break;
      case 'HealthObjective':
        childEventTrigger('onHealthObjective', { patientId: patientId });
        break;

      case 'foodSensitivities':
        childEventTrigger('onFoodSensitivitiesSelect', {
          patientId: patientId,
        });
        break;
      case 'symptoms':
        childEventTrigger('onSymptomsSelect', { patientId: patientId });
        break;
      case 'biomarkers':
        dispatch(resetInvestigationreport(patientId));
        childEventTrigger('onInvestigationReportSelect', {
          patientId: patientId,
          createReport: createReport,
          openBiomarkerEntry: openBiomarkerEntry,
        });
        break;
      case 'generatePrescription':
        dispatch(resetPrescription(patientId));
        childEventTrigger('onGeneratePrescriptionSelect', {
          patientId: patientId,
          prescriptionKey: '',
          startingDate: todaysDate,
          prescriptionDays: prescriptionDays,
          componentState: prescriptionState,
          disableEdit: false,
          topicSnippetForHistory: topicSnippetClick,
          topicSnippetClick: openHistoryGeneratePrescription,
          openDiagnosticCondition: openDiagnosticCondition,
        });
        break;
      case 'protocol':
        childEventTrigger('onProtocolSelect', {
          patientId: patientId,
          topicSnippetClick: openHistoryGeneratePrescription,
          openDiagnosticCondition: openDiagnosticCondition,
        });
        break;
      case 'PatientBasicProfile':
        childEventTrigger('onPatientBasicProfileSelect', {
          patientId: patientId,
        });
        break;
      case 'PatientDetailedProfile':
        childEventTrigger('onPatientDetailedProfileSelect', {
          patientId: patientId,
        });
        break;
      case 'MyProfile':
        childEventTrigger('onMyProfileSelect', {
          patientId: patientId,
          topicSnippetClick: topicSnippetClickPrescription,
          clickedFrom: 'MyCustomer',
        });
        break;
      case 'roles':
        childEventTrigger('onRolesSelect', { patientId: patientId });
        break;
      case 'loginLogout':
        childEventTrigger('onLoginLogoutSnippet', { patientId: patientId });
        break;
      case 'AssignmentClient':
        childEventTrigger('onAssignmentClient', { patientId: patientId });
        break;
      case 'TeamAssignmentClient':
        childEventTrigger('onAssignmentClient', {
          patientId: patientId,
        });
        break;
      case 'SocialPlatforms':
        childEventTrigger('onSocialPlatformDetails', {
          patientId: patientId,
        });
        break;
      case 'Education':
        childEventTrigger('onEducationSelect', {
          patientId: patientId,
        });
        break;

      case 'RegistrationSnippet':
        childEventTrigger('onRegistrationSnippetClick', {
          patientId: patientId,
        });
        break;

      default:
        childEventTrigger('onGeneratePrescriptionSelect', {
          patientId: patientId,
          startingDate: todaysDate,
          prescriptionDays: prescriptionDays,
          componentState: prescriptionState,
          disableEdit: false,
          topicSnippetClick: topicSnippetClickPrescription,
          openDiagnosticCondition: openDiagnosticCondition,
        });
        break;
    }
  };
  return (
    <div style={{ overflow: 'auto', height: 'inherit', background: '#FFFFFF' }} data-header-hidable>
      {type === 'reporteesSummary' ? (
        <ReporteesSummaryPanel
          topicSnippetClick={topicSnippetClick}
          patientId={patientId}
          injectComponent={props.injectComponent}
          sessions={sessions}
          selectedClient={selectedClient}
          registerEvent={props.registerEvent}
          unRegisterEvent={props.unRegisterEvent}
          type={type}
          botData={botData}
          selectedPanelName={selectedPanelName}
          setSelectedPanelName={setSelectedPanelName}
        />
      ) : type !== 'moveCard' && type !== 'eventCard' ? (
        <MyCustomerView
          topicSnippetClick={topicSnippetClick}
          patientId={patientId}
          injectComponent={props.injectComponent}
          sessions={sessions}
          selectedClient={selectedClient}
          registerEvent={props.registerEvent}
          unRegisterEvent={props.unRegisterEvent}
          type={type}
          botData={botData}
          selectedPanelName={selectedPanelName}
          setSelectedPanelName={setSelectedPanelName}
        />
      ) : type === 'moveCard' ? (
        <BulkSummaryPanel
          topicSnippetClick={topicSnippetClick}
          patientId={patientId}
          injectComponent={props.injectComponent}
          sessions={sessions}
          selectedClient={selectedClient}
          registerEvent={props.registerEvent}
          unRegisterEvent={props.unRegisterEvent}
          type={type}
          selectedPanelName={selectedPanelName}
          setSelectedPanelName={setSelectedPanelName}
        />
      ) : type === 'eventCard' ? (
        <EventSummary
          topicSnippetClick={topicSnippetClick}
          patientId={patientId}
          injectComponent={props.injectComponent}
          sessions={sessions}
          selectedClient={selectedClient}
          type={type}
          selectedPanelName={selectedPanelName}
          setSelectedPanelName={setSelectedPanelName}
          isAFB={isAFB}
          afbData={afbData}
          isReporteeEvent={Boolean(isReportee)}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
export default React.memo(MyCustomer);
