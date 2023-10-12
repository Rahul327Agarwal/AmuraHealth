import DiagnosticHomePage from '../../../Components/PanelComponents/DiagnosticCondition/HomePage';

import BotSummaryPanel from '../../../Components/PanelComponents/BotSummaryPanel/BotSummaryPanel';
import Chat from '../../../Components/PanelComponents/ChatNotes/ChatNotes';
import ClientProgress from '../../../Components/PanelComponents/ClientProgress';
import KnowledgeBase from '../../../Components/PanelComponents/DistributionsManagement/List/KnowledgeBase';
import DistributionLMS from '../../../Components/PanelComponents/DistributionsManagement/List/LMS';
import Polls from '../../../Components/PanelComponents/DistributionsManagement/List/Polls';
import Questionnaire from '../../../Components/PanelComponents/DistributionsManagement/List/Questionnaire';
import BotList from '../../../Components/PanelComponents/MyListPanel/BotList/BotList';
import MyCustomer from '../../../Components/PanelComponents/MyListPanel/Components/MyCustomer';
import MyListHome from '../../../Components/PanelComponents/MyListPanel/MyListHome';
import ReferRegisterPage from '../../../Components/PanelComponents/ReferRegisterPage/Register';
import Register from '../../../Components/Registration/RegisterUserWithoutOTP/Register';

import PostCollections from '../../../Components/PanelComponents/PostCollections/List/PostCollectionList';
import PostManagementList from '../../../Components/PanelComponents/PostManagement/PostManagementList/PostManagementList';
import RecipeHome from '../../../Components/PanelComponents/RecipeHome/RecipeHome';

import DistributionsAddCollection from '../../../Components/PanelComponents/DistributionsManagement/AddCollection/AddCollection';
import DistributionsSummary from '../../../Components/PanelComponents/DistributionsManagement/DistributionSummary/DistributionSummary';
import DistributionsList from '../../../Components/PanelComponents/DistributionsManagement/List/List';
import DistributionsPreview from '../../../Components/PanelComponents/DistributionsManagement/Preview/Preview';
import EventCardList from '../../../Components/PanelComponents/EventCardList/EventCardList';
import PostCollectionChat from '../../../Components/PanelComponents/PostCollections/PostCollectionChatNote/PostCollectionChatNote';
import PostCollectionAddPosts from '../../../Components/PanelComponents/PostCollections/Preview/AddPosts/AddPosts';
import PostCollectionPreview from '../../../Components/PanelComponents/PostCollections/Preview/prePreview/prePreview';

import CareTeam from '../../../Components/LibraryComponents/TeamAssignment/CareTeam';
import Allergens from '../../../Components/PanelComponents/Allergies/Allergies';
import ClientProgressForm from '../../../Components/PanelComponents/ClientProgress/Components/ClientProgressForm/ClientProgressForm';
import DistributionsChat from '../../../Components/PanelComponents/DistributionsManagement/PostsChatNote/ChatNote';
import FoodSensitivities from '../../../Components/PanelComponents/FoodSensitivities/FoodSensitivities';
import EditRole from '../../../Components/PanelComponents/HRComponents/EditRole/EditRole';
import MyTeam from '../../../Components/PanelComponents/MyTeam/MyTeam';
import MyTenant from '../../../Components/PanelComponents/MyTenant/MyTenant';
import NoteHistory from '../../../Components/PanelComponents/NotesBrowse/History/NoteHistory';
import NotesBrowse from '../../../Components/PanelComponents/NotesBrowse/NotesBrowse';
import PhlebotomyCards from '../../../Components/PanelComponents/PhlebotomyView/Components/PhlebotomyCards/PhlebotomyCards';
import PhlebotomyView from '../../../Components/PanelComponents/PhlebotomyView/PhlebotomyView';
import PostPreview from '../../../Components/PanelComponents/PostCollections/Preview/postPreview/postPreview';
import PostCollectionPostPreview1 from '../../../Components/PanelComponents/PostCollections/Preview/postPreview1/postPreview1';
import PostCollectionsSummary from '../../../Components/PanelComponents/PostCollections/Summary/PostCollectionsSummary';
import PostChatNote from '../../../Components/PanelComponents/PostManagement/PostChatNote/PostChatNote';
import PostManagementPreview from '../../../Components/PanelComponents/PostManagement/Preview/Preview';
import PostManagementSummary from '../../../Components/PanelComponents/PostManagement/Summary/PostManagementSummary';
import Prescription from '../../../Components/PanelComponents/Prescription/Prescription';
import PrescriptionHistory from '../../../Components/PanelComponents/Prescription/PrescriptionHistory/PrescriptionHistory';
import PrescriptionView from '../../../Components/PanelComponents/Prescription/PrescriptionView';
import ProfileManagement from '../../../Components/PanelComponents/ProfileManagement/ClientProfileManagement';
import HealthObjective from '../../../Components/PanelComponents/ProfileManagement/HealthObjective/HealthObjective';
import HistorySummary from '../../../Components/PanelComponents/ProfileManagement/HistorySummary/HistorySummary';
import Reports from '../../../Components/PanelComponents/ReportPanel/Reports/Reports';
import ReportViewHome from '../../../Components/PanelComponents/ReportPanel/ReportView/ReportViewHome';
import RolesBrowse from '../../../Components/PanelComponents/RolesBrowse/RolesBrowseNew';
import SchedulerCalendar from '../../../Components/PanelComponents/SchedulerCalendar/SchedulerCalendar';
import EventDetails from '../../../Components/PanelComponents/TimeManagement/Components/EventDetails';
import TimeManagementHome from '../../../Components/PanelComponents/TimeManagement/TimeManagementHome';
import UserRoleAssignmentNew from '../../../Components/PanelComponents/UserRoleAssignment/UserRoleAssignmentNew';

import StaffListView from '../../../Components/PanelComponents/ClientToStaffAssignment/ClientToStaffAssignmentHome';
import { MySettingsNew } from '../../../Components/PanelComponents/MySettings/MySettingsNew';
import MyProfile from '../../../Components/PanelComponents/ProfileManagement/ProfileManagement';
import { IComponentMap } from '../DFEvents.types';

import ChangeStaffMember from '../../../Components/LibraryComponents/TeamAssignment/ChangeStaffMember/ChangeStaffMember';
import NoResults from '../../../Components/LibraryComponents/TeamAssignment/ChangeStaffMember/NoResults';
import ChangeStaffMemberManual from '../../../Components/LibraryComponents/TeamAssignment/ChangeStaffMemberManual/ChangeStaffMemberManual';
import BulkReassignment from '../../../Components/PanelComponents/BulkReassignment/BulkReassignment';
import CardsFlowHomePage from '../../../Components/PanelComponents/BulkReassignment/CardsFlowHomePage/CardsFLowHomePage';
import MoveCardRequestHome from '../../../Components/PanelComponents/BulkReassignment/MoveCardRequestHome/MoveCardRequestHome';
import BulkSummaryPanel from '../../../Components/PanelComponents/BulkSummary/BulkSummary';
import UnderConstruction from '../../../Components/PanelComponents/ErrorBoundary/UnderConstruction/UnderConstruction';
import HomePage from '../../../Components/PanelComponents/HomePage/HomePage';
import BlueDotCards from '../../../Components/PanelComponents/MyListPanel/BlueDotCards/BlueDotCards';
import MyListFilterCard from '../../../Components/PanelComponents/MyListPanel/FilterCard/FilterCard';
import MyListManageGroup from '../../../Components/PanelComponents/MyListPanel/ManageGroup/ManageGroup';
import MyListManageStatus from '../../../Components/PanelComponents/MyListPanel/ManageStatus/ManageStatus';
import ReporteeCreateFilter from '../../../Components/PanelComponents/MyListPanel/ManageTab/CreateFilter';
import MyListManageTab from '../../../Components/PanelComponents/MyListPanel/ManageTab/ManageTab';
import NotesAdd from '../../../Components/PanelComponents/NotesBrowse/NotesAdd/NotesAdd';
import PatientBasicProfile from '../../../Components/PanelComponents/PatientBasicProfile/PatientBasicProfileHome';
import PatientDetailedProfile from '../../../Components/PanelComponents/PatientDetailedProfile/PatientDetailedProfile';
import PatientDetailedProfileHome from '../../../Components/PanelComponents/PatientDetailedProfile/PatientDetailedProfileHome';
import ReporteeFilterPanel from '../../../Components/PanelComponents/ReporteesListView/FilterPanel/FilterPanel';
import ReporteesView from '../../../Components/PanelComponents/ReporteesListView/ReporteesListViewHome';
import ReportAddEdit from '../../../Components/PanelComponents/ReportPanel/ReportAddEdit/ReportAddEdit';
import LoginLogoutSnippet from '../../../Components/PanelComponents/SummaryPanel/LoginLogoutSnippet/LoginLogoutSnippet';
import WinDashWrapper from '../../../Components/PanelComponents/WindashX/Components/HomePanelWindash/HomePanelWindash';

import SocialProfileEditView from '../../../Components/PanelComponents/PatientDetailedProfile/SocialPlatformEditView';
import SocialProfileView from '../../../Components/PanelComponents/PatientDetailedProfile/SocialPlatformView';
import AddRegistrationsSnippet from '../../../Components/PanelComponents/RegistrationsSnippet/AddRegistrations/AddRegistrations';
import RegistrationsSnippetHome from '../../../Components/PanelComponents/RegistrationsSnippet/RegistrationSnippetHome';
import ReporteesMyList from '../../../Components/PanelComponents/ReporteesListView/ReporteesMyList/ReporteesMyList';

import MediaViewer from '../../../Components/LibraryComponents/MediaViewer/MediaViewer';
import PDFViewer from '../../../Components/LibraryComponents/PDFViewer/PDFViewer';
import EducationPanel from '../../../Components/PanelComponents/Education/EducationPanel/EducationPanel';
import KnowledgeBaseShare from '../../../Components/PanelComponents/KnowledgeBaseShare/KnowledgeBaseShare';
import ResourcePanelWindash from '../../../Components/PanelComponents/WindashX/Components/ResourcePanelWindash/ResourcePanelWindash';

const componentMap = {
  //
  MyListHome: MyListHome,
  MyList: WinDashWrapper,
  NameCardResources: ResourcePanelWindash,
  SchedulerCalendar,
  EventCreation: TimeManagementHome,
  MyCustomer: MyCustomer,
  ClientProgress,
  CareTeam,
  Chat,
  MyTeam,
  MySettingsNew,
  PostChat: PostChatNote,
  MyProfile: MyProfile,
  ClientProfile: ProfileManagement,
  DiagnosticCondition: DiagnosticHomePage,
  Allergens: Allergens,
  HistoryPrescriptionView: PrescriptionHistory,
  FoodSensitivities: FoodSensitivities,
  InvestigationReportsPanel: Reports,
  ReportView: ReportViewHome,
  ReportAddEdit: ReportAddEdit,
  GeneratePrescription: PrescriptionView,
  Prescription: Prescription,
  MyTenant,
  ClientProgressForm,
  MyRecipes: RecipeHome,
  KnowledgeBaseShare: KnowledgeBaseShare,
  RolesBrowse,
  BotSummary: BotSummaryPanel,
  PhlebotomyCards,
  PhlebotomyView,
  MyListOld: BotList,
  PostManagementSummary: PostManagementSummary,
  PostManagementList: PostManagementList,
  PostManagementPreview,
  HealthObjective,

  PostCollectionsSummary,
  PostCollections: PostCollections,
  PostCollectionPreview,
  PostCollectionChat,
  PostCollectionAddPosts,
  PostPreview1: PostCollectionPostPreview1,
  HistorySummary,

  DistributionsList,
  DistributionsChat,
  DistributionsSummary,
  DistributionsPreview,
  DistributionsAddCollection,
  NotesBrowse,
  NoteHistory,
  EditRole,
  UserRoleAssignmentNew,
  EventCardList,
  EventDetails,
  StaffListView,
  ReporteesView,
  Polls,
  Questionnaire,
  KnowledgeBase,
  DistributionLMS,
  Register,
  PostPreview,
  NotesAdd,
  BulkReassignment,
  BulkSummaryPanel,
  BulkAssignmentList: CardsFlowHomePage,
  BlueDotCards,
  MoveCardRequestHome,
  MyListManageStatus,
  MyListFilterCard,
  MyListManageTab,
  MyListManageGroup,
  ReporteeCreateFilter,
  ReporteeFilterPanel,
  UnderConstruction,
  ReferRegisterPanel: ReferRegisterPage,
  PatientBasicProfile,
  PatientDetailedProfile,
  PatientDetailedProfileHome,
  ChangeStaffMember: ChangeStaffMember,
  onNoResults: NoResults,
  ChangeStaffMemberManual: ChangeStaffMemberManual,
  HomePage,
  LoginLogoutSnippet,
  SocialProfileView,
  SocialProfileEditView,
  ReporteesMyList,
  RegistrationsSnippet: RegistrationsSnippetHome,
  AddRegistrationsSnippet,
  EducationPanel,
  PDFViewer,
  MediaViewer,
} satisfies IComponentMap;

//
//
//

export default componentMap;
export type ComponentMapKeys = keyof typeof componentMap;
