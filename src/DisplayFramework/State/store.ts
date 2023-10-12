import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import AccessPermissionsReducer from './Slices/AccessPermissionsSlice';
import AllPostsDataSlice from './Slices/AllPostsDataSlice';
import Auth from './Slices/Auth';
import BlueDotsViewSlice from './Slices/BlueDotsViewSlice';
import BranchingSlice from './Slices/BranchingSlice';
import BulkReassignment from './Slices/BulkReassignment';
import CacheReducer from './Slices/CacheSlice';
import CalenderSliderSlice from './Slices/CalenderSliderSlice';
import ChatScroll from './Slices/ChatScrollSlice';
import ChatReducer from './Slices/ChatSlice';
import DashboardReducer from './Slices/DashboardSlice';
import DisplayFramework from './Slices/DisplayFramework';
import InvestigationEntryreducer from './Slices/InvestigationEntrySlice';
import MessageInput from './Slices/MessageInput';
import PostCollectionReducer from './Slices/PostCollectionSlice';
import PostReducer from './Slices/PostSlice';
import PrescriptionReducer from './Slices/PrescriptionSlice';
import RecipeSlice from './Slices/RecipeSlice';
import ReporteesSlice from './Slices/ReporteesSlice';
import RolesDataSlice from './Slices/RolesSlice';
import statusSlice from './Slices/StatusCollection';
import VoiceSlice from './Slices/VoiceSlice';
import WindowStateSlice from './Slices/WindowStateSlice';
import MyListSlice from './Slices/MyListSlice';

const rootReducer = combineReducers({
  auth: Auth,
  cache: CacheReducer,
  displayFrameWork: DisplayFramework,
  dashboard: DashboardReducer,
  investigationEntry: InvestigationEntryreducer,
  chat: ChatReducer,
  prescription: PrescriptionReducer,
  accessPermissions: AccessPermissionsReducer,
  status: statusSlice,
  post: PostReducer,
  PostCollection: PostCollectionReducer,
  AllPostData: AllPostsDataSlice,
  MessageInput: MessageInput,
  Branching: BranchingSlice,
  CalenderSlider: CalenderSliderSlice,
  voiceSlice: VoiceSlice,
  RolesDataSlice: RolesDataSlice,
  BulkReassignment: BulkReassignment,
  chatScroll: ChatScroll,
  BlueDotsView: BlueDotsViewSlice,
  Reportees: ReporteesSlice,
  Recipe: RecipeSlice,
  WindowState: WindowStateSlice,
  MyList: MyListSlice
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: import.meta.env.VITE_ENV !== 'production',
});
export type IRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
