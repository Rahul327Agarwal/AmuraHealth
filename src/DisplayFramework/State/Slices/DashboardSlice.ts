import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmptyAllergen, IAllergens } from '../../../Components/PanelComponents/Allergies/Allergies.types';
import { EmptyChart } from '../../../Components/PanelComponents/ClientProgress/ClientProgress.types';
import {
  EmptyIDiagnosisCondition,
  IDiagnosisCondition,
} from '../../../Components/PanelComponents/DiagnosticCondition/DiagnosticCondition.types';
import {
  EmptyFoodSensitivity,
  IFoodSensitivities,
} from '../../../Components/PanelComponents/FoodSensitivities/FoodSensitivities.types';
import { EmptyPatient } from '../../../Components/PanelComponents/SummaryPanel/SummaryPanel.types';
import { IAllRoleDetails, ICard, ITeam } from '../../../Components/PanelComponents/MyListPanel/MyList/MyList.types';
import { IScreen } from '../../Interfaces/IScreen';

const DashboardSlice = createSlice({
  name: 'Dashboard',
  initialState: {
    sourcePanel: '',
    patient: 0,
    settings: 0,
    work: 0,
    noc: 5,
    screens: [],
    myCustomer: EmptyPatient,
    appliedConditionsNew: EmptyIDiagnosisCondition,
    conditionsList: [],
    healthType: '',
    allergens: EmptyAllergen,
    allergensList: [],
    foodSensitivities: EmptyFoodSensitivity,
    sensitivitiesList: [],
    prescriptionList: [],
    clientData: {
      roles: [],
      cards: [],
    },
    tenantList: [],
    allTeamData: [],
    patientId: '',
    myTeamOverFlowData: [],
    myTeamData: [] as Array<ITeam>,
    loadSummary: false,
    selectedCardInSummary: '',
    patientStaff: [],
    teamData: [],
    allUsersList: [],
    staffType: '',
    staffAssignJson: [] as any,
    patientBiomarkersData: {
      patientId: '',
      Biomarkers: {},
      loadingFlag: true,
    } as any,
    clienProgress: EmptyChart,
    allUserRoles: [] as Array<IAllRoleDetails>,
    accessData: {},
    allergensAccessPermissions: {},
    sensitivitiesAccessPermissions: {},
    clientProfileAccessPermissions: {},
    myTeamAccessPermissions: {},
    investigationAccessPermissions: {},
    customerSummaryAccessPermissions: {},
    assignStaffAccessPermissions: {},
    myProjectsAccessPermissions: {},
    historyAccessPermissions: {},
    userProfileDetails: {},
    accessPermissionCheck: { currentTenantId: '', role: '' },
    userRolesForTenant: [],
    tenantId: '',
    RMActive: {
      survey: false,
      faq: false,
      calendar: false,
      profile: false,
      recipes: false,
      bulkReassign: false,
    },
    selectedClientObject: null as ICard | null,
    isMyTeamLoading: true,
    isTeamChangeInProgress: false,
    isMyListLoading: true,
    owersMylist: {} as any,
    idAndStaffNames: {} as any,
    myRolesAcrossAll: [],
    showTabFilterBadge: false,
    myRolesAcrossTenants: [],
    allRoles: '',
    activeMylist: 'My List' as 'My List' | 'Phleobotomy Card' | 'Bot Card',
    allTenants: [],
    currentViewingDate: new Date(),
    currentViewingType: 'OneDay' as 'Agenda' | 'OneDay' | 'ThreeDay' | 'Month',
    teamWhoDealt: {},
  },
  reducers: {
    setSourcePanel: (state, action: PayloadAction<any>) => {
      state.sourcePanel = action.payload;
    },
    setCurrentViewingType: (state, action: PayloadAction<any>) => {
      state.currentViewingType = action.payload;
    },
    setTeamWhoDealt: (state, action: PayloadAction<any>) => {
      state.teamWhoDealt = { ...state.teamWhoDealt, ...action.payload };
    },
    setCurrentViewingDate: (state, action: PayloadAction<any>) => {
      state.currentViewingDate = action.payload;
    },
    selectPatient: (state, action: PayloadAction<number>) => {
      state.patient = action.payload;
      state.work = 0;
      state.settings = 0;
    },
    selectWork: (state, action: PayloadAction<number>) => {
      state.work = action.payload;
      state.settings = 0;
    },
    selectSettings: (state, action: PayloadAction<number>) => {
      state.settings = action.payload;
      state.patient = 0;
      state.work = 0;
    },
    setNoofcolumns: (state, action: PayloadAction<number>) => {
      state.noc = action.payload;
    },
    setScreensStore: (state, action: PayloadAction<IScreen[]>) => {
      state.screens = action.payload;
    },
    setMyCustomerDetails: (state, action: PayloadAction<any>) => {
      state.myCustomer = action.payload;
    },
    setAppliedConditionsNew: (state, action: PayloadAction<IDiagnosisCondition>) => {
      state.appliedConditionsNew = action.payload;
    },
    setConditionsList: (state, action: PayloadAction<any>) => {
      state.conditionsList = action.payload;
    },
    setHealthType: (state, action: PayloadAction<string>) => {
      state.healthType = action.payload;
    },
    setAllergens: (state, action: PayloadAction<IAllergens>) => {
      state.allergens = action.payload;
    },
    setAllergensList: (state, action: PayloadAction<any>) => {
      state.allergensList = action.payload;
    },
    setFoodSensitivities: (state, action: PayloadAction<IFoodSensitivities>) => {
      state.foodSensitivities = action.payload;
    },
    setFoodSensitivitiesList: (state, action: PayloadAction<any>) => {
      state.sensitivitiesList = action.payload;
    },
    setPrescriptionList: (state, action: PayloadAction<any>) => {
      state.prescriptionList = action.payload;
    },
    setClientData: (state, action: PayloadAction<any>) => {
      state.clientData = action.payload;
      state.isMyListLoading = false;
    },
    setAllRoles: (state, action: PayloadAction<any>) => {
      state.allRoles = action.payload;
    },
    setOwnersMylist: (state, action: PayloadAction<any>) => {
      state.idAndStaffNames = action.payload.idAndStaffNames;
      state.owersMylist = action.payload.myList;
    },
    setAccessData: (state, action: PayloadAction<any>) => {
      state.accessData = action.payload;
    },
    setUserProfileDetails: (state, action: PayloadAction<any>) => {
      state.userProfileDetails = action.payload;
    },
    setTenantList: (state, action: PayloadAction<any>) => {
      state.tenantList = action.payload;
    },
    setPatientBiomarkersData: (state, action: PayloadAction<any>) => {
      state.patientBiomarkersData = action.payload;
    },
    setAllTeamData: (state, action: PayloadAction<any>) => {
      state.allTeamData = action.payload;
    },
    setMyTeamOverFlowData: (state, action: PayloadAction<any>) => {
      state.myTeamOverFlowData = action.payload;
    },
    setMyTeamData: (state, action: PayloadAction<any>) => {
      state.myTeamData = action.payload;
    },
    setLoadSummary: (state, action: PayloadAction<any>) => {
      state.loadSummary = action.payload;
    },
    setSelectedCardInSummary: (state, action: PayloadAction<any>) => {
      state.selectedCardInSummary = action.payload;
    },
    setIsMyTeamLoading: (state, action: PayloadAction<any>) => {
      state.isMyTeamLoading = action.payload;
    },
    setStaffAssignJson: (state, action: PayloadAction<any>) => {
      state.staffAssignJson = action.payload;
    },
    setTeamData: (state, action: PayloadAction<any>) => {
      state.teamData = action.payload;
    },
    resetTeamData: (state) => {
      state.teamData = [];
    },
    setClientProgress: (state, action: PayloadAction<any>) => {
      state.clienProgress = action.payload;
    },
    setAllUsersList: (state, action: PayloadAction<any>) => {
      state.allUsersList = action.payload;
    },
    setStaffType: (state, action: PayloadAction<any>) => {
      state.teamData = [];
      state.staffType = action.payload;
    },

    setPatientStaff: (state, action: PayloadAction<any>) => {
      state.patientStaff = action.payload;
    },
    setAllergensAccessPermissions: (state, action: PayloadAction<any>) => {
      state.allergensAccessPermissions = action.payload;
    },
    setClientProfileAccessPermissions: (state, action: PayloadAction<any>) => {
      state.clientProfileAccessPermissions = action.payload;
    },
    setMyTeamAccessPermissions: (state, action: PayloadAction<any>) => {
      state.myTeamAccessPermissions = action.payload;
    },
    setInvestigationAccessPermissions: (state, action: PayloadAction<any>) => {
      state.investigationAccessPermissions = action.payload;
    },
    setCustomerSummaryAccessPermissions: (state, action: PayloadAction<any>) => {
      state.customerSummaryAccessPermissions = action.payload;
    },
    setAssignStaffAccessPermissions: (state, action: PayloadAction<any>) => {
      state.assignStaffAccessPermissions = action.payload;
    },
    setMyProjectsAccessPermissions: (state, action: PayloadAction<any>) => {
      state.myProjectsAccessPermissions = action.payload;
    },
    setHistoryAccessPermissions: (state, action: PayloadAction<any>) => {
      state.historyAccessPermissions = action.payload;
    },
    setSensitivitiesAccessPermissions: (state, action: PayloadAction<any>) => {
      state.sensitivitiesAccessPermissions = action.payload;
    },
    setAccessPermissionCheck: (state, action: PayloadAction<any>) => {
      state.accessPermissionCheck = action.payload;
    },
    setClientId: (state, action: PayloadAction<any>) => {
      // (state.myCustomer = EmptyPatient),
      (state.appliedConditionsNew = EmptyIDiagnosisCondition),
        (state.healthType = ''),
        (state.allergens = EmptyAllergen),
        (state.foodSensitivities = EmptyFoodSensitivity),
        (state.prescriptionList = []),
        (state.patientId = action.payload),
        (state.clienProgress = EmptyChart),
        (state.patientBiomarkersData = {
          patientId: '',
          Biomarkers: {},
          loadingFlag: true,
        } as any);
    },
    setAlluserRoles: (state, action: PayloadAction<any>) => {
      state.allUserRoles = action.payload;
    },
    setPatientId: (state, action: PayloadAction<string>) => {
      state.patientId = action.payload;
    },
    setUserRolesForTenant: (state, action: PayloadAction<any>) => {
      state.userRolesForTenant = action.payload;
    },
    setTenantId: (state, action: PayloadAction<string>) => {
      state.tenantId = action.payload;
      state.allergensAccessPermissions = {};
      state.sensitivitiesAccessPermissions = {};
      state.clientProfileAccessPermissions = {};
      state.myTeamAccessPermissions = {};
      state.investigationAccessPermissions = {};
      state.accessData = {};
      state.customerSummaryAccessPermissions = {};
      state.assignStaffAccessPermissions = {};
      state.myProjectsAccessPermissions = {};
      state.historyAccessPermissions = {};
    },
    setRMActive: (state, action: PayloadAction<any>) => {
      state.RMActive = action.payload;
    },
    setSelectedClientObject: (state, action: PayloadAction<ICard>) => {
      state.selectedClientObject = action.payload;
    },
    resetSelectedClientObject: (state) => {
      state.selectedClientObject = null;
    },
    resetStaffAssignJson: (state) => {
      state.staffAssignJson = [];
    },
    setIsMyListLoading: (state, action: PayloadAction<any>) => {
      state.isMyListLoading = action.payload;
    },
    setMyRolesAcrossTenants: (state, action: PayloadAction<any>) => {
      state.myRolesAcrossTenants = action.payload;
    },
    setMyRolesAcrossAll: (state, action: PayloadAction<any>) => {
      state.myRolesAcrossAll = action.payload;
    },
    setShowTabFilterBadge: (state, action: PayloadAction<any>) => {
      state.showTabFilterBadge = action.payload;
    },
    setActiveMyList: (state, action: PayloadAction<any>) => {
      state.activeMylist = action.payload;
    },
    setAllTenants: (state, action: PayloadAction<any>) => {
      state.allTenants = action.payload;
    },
    setIsTeamChangeInProgress: (state, action: PayloadAction<boolean>) => {
      state.isTeamChangeInProgress = action.payload;
    },
  },
});
export const {
  selectPatient,
  selectWork,
  selectSettings,
  setNoofcolumns,
  setScreensStore,
  setMyCustomerDetails,
  setAppliedConditionsNew,
  setConditionsList,
  setHealthType,
  setAllergens,
  setAllergensList,
  setFoodSensitivities,
  setFoodSensitivitiesList,
  setPrescriptionList,
  setClientData,
  setAccessData,
  setTenantList,
  setStaffType,
  setClientId,
  setPatientBiomarkersData,
  setMyTeamOverFlowData,
  setMyTeamData,
  setLoadSummary,
  setTeamData,
  setAllUsersList,
  setAllTeamData,
  setClientProgress,
  setPatientStaff,
  setStaffAssignJson,
  setAlluserRoles,
  setPatientId,
  setAllergensAccessPermissions,
  setSensitivitiesAccessPermissions,
  setClientProfileAccessPermissions,
  setMyTeamAccessPermissions,
  setInvestigationAccessPermissions,
  setCustomerSummaryAccessPermissions,
  setAssignStaffAccessPermissions,
  setMyProjectsAccessPermissions,
  setHistoryAccessPermissions,
  setUserProfileDetails,
  setAccessPermissionCheck,
  setUserRolesForTenant,
  setTenantId,
  setRMActive,
  setSelectedClientObject,
  resetStaffAssignJson,
  resetTeamData,
  resetSelectedClientObject,
  setIsMyTeamLoading,
  setIsMyListLoading,
  setOwnersMylist,
  setMyRolesAcrossTenants,
  setMyRolesAcrossAll,
  setShowTabFilterBadge,
  setAllRoles,
  setActiveMyList,
  setAllTenants,
  setCurrentViewingDate,
  setCurrentViewingType,
  setTeamWhoDealt,
  setSelectedCardInSummary,
  setIsTeamChangeInProgress,
  setSourcePanel,
} = DashboardSlice.actions;
export default DashboardSlice.reducer;
