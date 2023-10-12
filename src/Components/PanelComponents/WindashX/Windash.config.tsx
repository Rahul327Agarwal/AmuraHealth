import { HomeIcon } from '../../../DisplayFramework/Components/Icons/Icons';
import {
  CalendarIconV3,
  KnowledgeBaseIcon,
  LMSIcon,
  MyListIconNew,
  PollsIcon,
  PostCollectionsIcon,
  PostsIcon,
  QuestionnaireIcon,
  RecipeIconDark,
  RegisterIcon,
  ReporteesIcon16,
  RolesIcon,
} from './Windash.svg';
import { IWindow } from './Windash.types';

export const EventCardResourceConfig: IWindow[] = [
  {
    id: 'SchedulerCalendar',
    title: 'Scheduler Calendar',
    componentName: 'SchedulerCalendar',
    minHeight: 500,
    icon: <CalendarIconV3 />,
    state: 'maximized',
    isDefault: true,
    // minimizedComponent: MinimizedEventCard,
  },
];

export const NameCardResourceConfig: IWindow[] = [
  {
    id: 'Recipes',
    title: 'Recipes',
    componentName: 'MyRecipes',
    minHeight: 500,
    icon: <RecipeIconDark />,
    state: 'maximized',
    isDefault: true,
  },
  {
    id: 'RKnowledgeBase',
    title: 'Knowledge Base',
    componentName: 'KnowledgeBaseShare',
    minHeight: 500,
    icon: <KnowledgeBaseIcon />,
  },
];

export const windashInitialScreenConfigBasicUser: IWindow[] = [
  {
    id: 'HomePage',
    title: 'Home',
    componentName: 'HomePage',
    minHeight: 500,
    icon: <HomeIcon />,
    state: 'maximized',
    isDefault: true,
  },
];

export const windashInitialScreenConfig: IWindow[] = [
  {
    id: 'MyListHome',
    title: 'My List',
    componentName: 'MyListHome',
    minHeight: 500,
    icon: <MyListIconNew />,
    state: 'maximized',
    isDefault: true,
  },
  {
    id: 'ReporteesView',
    title: 'My Team',
    componentName: 'ReporteesView',
    minHeight: 500,
    icon: <ReporteesIcon16 />,
    // minimizedComponent: MinimizedTeamListCard,
  },
  {
    id: 'StaffListView',
    title: 'Staff List',
    componentName: 'StaffListView',
    minHeight: 500,
    icon: <RolesIcon />,
  },
  {
    id: 'ReferRegisterPanel',
    title: 'Refer & Register',
    componentName: 'ReferRegisterPanel',
    minHeight: 500,
    icon: <RegisterIcon />,
  },
  // {
  //   id: 'BulkReassignment',
  //   title: 'My Admin Page',
  //   componentName: 'BulkReassignment',
  //   minHeight: 500,
  //   icon: <BulkReassignmentIcon />,
  // },
  {
    id: 'HomePage',
    title: 'Home',
    componentName: 'HomePage',
    minHeight: 500,
    icon: <HomeIcon />,
  },

  {
    id: 'SchedulerCalendar',
    title: 'Scheduler Calendar',
    componentName: 'SchedulerCalendar',
    minHeight: 500,
    icon: <CalendarIconV3 />,
    // minimizedComponent: MinimizedEventCard,
  },
  {
    id: 'PostCollections',
    title: 'Post Collections',
    componentName: 'PostCollections',
    minHeight: 500,
    icon: <PostCollectionsIcon />,
  },
  {
    id: 'PostManagementList',
    title: 'Post Management',
    componentName: 'PostManagementList',
    minHeight: 500,
    icon: <PostsIcon />,
  },
  {
    id: 'DistributionLMS',
    title: 'Distribution LMS',
    componentName: 'DistributionLMS',
    minHeight: 500,
    icon: <LMSIcon />,
    // minimizedComponent: MinimizedLMSCard,
  },
  {
    id: 'KnowledgeBase',
    title: 'Knowledge Base',
    componentName: 'KnowledgeBase',
    minHeight: 500,
    icon: <KnowledgeBaseIcon />,
  },
  {
    id: 'Questionnaire',
    title: 'Questionnaire',
    componentName: 'Questionnaire',
    minHeight: 500,
    icon: <QuestionnaireIcon />,
    // minimizedComponent: MinimizedQuestionnaireCard,
  },
  {
    id: 'Polls',
    title: 'Polls',
    componentName: 'Polls',
    minHeight: 500,
    icon: <PollsIcon />,
  },
];

export type WindashDefaultScreensIDs =
  | 'HomePage'
  | 'MyListHome'
  | 'ReporteesView'
  | 'StaffListView'
  | 'ReferRegisterPanel'
  | 'SchedulerCalendar'
  | 'PostCollections'
  | 'PostManagementList'
  | 'DistributionLMS'
  | 'KnowledgeBase'
  | 'Questionnaire'
  | 'Polls'
  | 'BulkReassignment';
