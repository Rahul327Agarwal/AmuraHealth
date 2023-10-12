// import { CalanderIcon, CircleIcon, MyListIcon } from './MyListWidgetNew/SVG/WidgetIcons';
// import { Configuration } from '../SVGNew/Configuration';
// import { KnowledgeBaseIcon } from '../SVGNew/DisbributionIcon/KnowledgeBaseIcon';
// import { LMSIcon } from '../SVGNew/DisbributionIcon/LMSIcon';
// import { PollsIcon } from '../SVGNew/DisbributionIcon/PollsIcon';
// import { QuestionnaireIcon } from '../SVGNew/DisbributionIcon/QuestionnaireIcon';
// import { PostCollections } from '../SVGNew/PostCollections';
// import { Posts } from '../SVGNew/Posts';
// import { Reportees } from '../SVGNew/Reportees';
// import { Roles } from '../SVGNew/TimeMangement/Roles';
// import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { PersonAdd } from '@mui/icons-material';
import {
  BulkReassignmentIcon,
  CalendarIconV3,
  ConfigurationIcon,
  KnowledgeBaseIcon,
  KnowledgeBaseShare,
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
} from './DragArea.svg';
import { IComponentConfig } from './Windash.types';
import { HomeIcon } from '../../../DisplayFramework/Components/Icons/Icons';
import { ProfileIconNew } from './Windash.svg';
export const EMPTY_CLENT_DATA = { patientId: '', clientData: '' };
export const widgetBarHeight = 59;
export const MINIMUM_VIEW_HEIGHT = 120;
export const TOP_BOTTOM_MARGIN = 20;
export const MARGIN_BETWEEN_COMPONENTS = 8;
export const SinglePanelNavigatorHight = 60;
export const UpdatePanelHeights = (
  setScreen,
  current_view,
  panel,
  view,
  current_screen,
  componentsHeight,
  screen,
  setView,
  setComponentsHeight,
  setNewOpenedScreen
) => {
  if (current_view === 'Close') {
    let indexOfClickedScreen = screen.indexOf(current_screen);

    if (indexOfClickedScreen === 0) {
      setNewOpenedScreen(screen[1]);
    } else {
      setNewOpenedScreen(screen[indexOfClickedScreen - 1]);
    }
    setScreen((pre) => pre.filter((screen) => screen !== current_screen));
    setView({ ...view, [current_screen]: 'PartView' });
    setComponentsHeight((pre) => ({ ...pre, [current_screen]: 500 }));
    return;
  }
  if (current_view === 'MaximizeView') {
    console.log('maximize view is being clicked');
    let PANEL_HEIGHT = panel?.height?.replace('px', '');
    let tempView = { ...view, [current_screen]: 'MaximizeView' };
    let tempHeight = { ...componentsHeight };
    const total_rest_screen_height = (screen.length - 1) * MINIMUM_VIEW_HEIGHT;
    tempHeight[current_screen] =
      Number(PANEL_HEIGHT) - widgetBarHeight - total_rest_screen_height - MARGIN_BETWEEN_COMPONENTS * (screen.length - 1);
    screen.forEach((screen_Name) => {
      if (screen_Name !== current_screen) {
        tempView[screen_Name] = 'MinimizeView';
        tempHeight[screen_Name] = MINIMUM_VIEW_HEIGHT;
      }
    });
    setView(tempView);
    setComponentsHeight(tempHeight);
  } else {
    setView({ ...view, [current_screen]: current_view });
  }
};

export const basicUserInitialHeights: Array<IComponentConfig> = [
  {
    componentName: 'HomePage',
    minHeight: 500,
    isDefault: true,
  },
  {
    componentName: 'MyRecipes',
    minHeight: 500,
    isDefault: false,
  },
];

export const initialHeights: Array<IComponentConfig> = [
  {
    componentName: 'MyListHome',
    minHeight: 500,
    isDefault: true,
  },
  {
    componentName: 'HomePage',
    minHeight: 500,
    isDefault: false,
  },
  {
    componentName: 'ReporteesView',
    minHeight: 500,
    isDefault: false,
  },
  {
    componentName: 'StaffListView',
    minHeight: 500,
    isDefault: false,
  },
  {
    componentName: 'ReferRegisterPanel',
    minHeight: 500,
    isDefault: false,
  },
  // feature is not available now
  // {
  //   componentName: 'BulkReassignment',
  //   minHeight: 500,
  //   isDefault: false,
  // },
  {
    componentName: 'SchedulerCalendar',
    minHeight: 500,
    isDefault: false,
  },
  {
    componentName: 'PostCollections',
    minHeight: 500,
    isDefault: false,
  },
  {
    componentName: 'PostManagementList',
    minHeight: 500,
    isDefault: false,
  },
  {
    componentName: 'MyListOld',
    minHeight: 500,
    isDefault: false,
  },
  {
    componentName: 'DistributionLMS',
    minHeight: 500,
    isDefault: false,
  },
  {
    componentName: 'KnowledgeBase',
    minHeight: 500,
    isDefault: false,
  },
  {
    componentName: 'Questionnaire',
    minHeight: 500,
    isDefault: false,
  },
  {
    componentName: 'Polls',
    minHeight: 500,
    isDefault: false,
  },

  {
    componentName: 'MyRecipes',
    minHeight: 500,
    isDefault: false,
  },
];
export const getIcons = {
  HomePage: <HomeIcon />,
  BulkReassignment: <BulkReassignmentIcon />,
  MyListHome: <MyListIconNew />,
  SchedulerCalendar: <CalendarIconV3 />,
  PostCollections: <PostCollectionsIcon />,
  PostManagementList: <PostsIcon />,
  MyListOld: <ConfigurationIcon />,
  DistributionLMS: <LMSIcon />,
  KnowledgeBase: <KnowledgeBaseIcon />,
  Questionnaire: <QuestionnaireIcon />,
  Polls: <PollsIcon />,
  MyRecipes: <RecipeIconDark />,
  StaffListView: <RolesIcon />,
  ReporteesView: <ReporteesIcon16 />,
  Register: <RegisterIcon />,
  MyProfile: <ProfileIconNew />,
  ReferRegisterPanel: <PersonAdd />,
  KnowledgeBaseShare: <KnowledgeBaseShare />,
};

export const getComponentName = {
  MyListHome: 'My List',
  HomePage: 'Home',
  BulkReassignment: 'My Admin Page',
  // EventCardList: CalanderIcon,
  SchedulerCalendar: 'My Calendar',
  PostCollections: 'Post Collections',
  PostManagementList: 'Posts',
  MyListOld: 'Configuration',
  DistributionLMS: 'Learning Management System',
  KnowledgeBase: 'KnowledgeBase',
  Questionnaire: 'Questionnaire',
  Polls: 'Polls',
  MyRecipes: 'Recipes',
  Register: 'Register',
  StaffListView: 'Assign client to staff',
  ReporteesView: 'My Team',
  MyProfile: 'Profile',
  ReferRegisterPanel: 'Assign GC',
  KnowledgeBaseShare: 'Share KnowledgeBase',
};

//***************** Below codes currently not in use **************************************
//***************** Below codes currently not in use **************************************
//***************** Below codes currently not in use **************************************
//***************** Below codes currently not in use **************************************
//***************** Below codes currently not in use **************************************
//***************** Below codes currently not in use **************************************
export const resizeWrapper = ({
  lowerComponentClient,
  lowerComponent,
  upperComponentClient,
  upperComponent,
  original_mouse_y,
}) => {
  return function resize(e) {
    //***************** extracting details **************************************
    let { height: lowerHeight, top: lowerTop } = lowerComponentClient;
    let { height: topHeight, bottom: topBottom } = upperComponentClient;
    let distnaceMoved = original_mouse_y - e.pageY;
    //***************** setting drag limit **************************************
    if (lowerHeight + distnaceMoved <= 90 || topHeight - distnaceMoved <= 90) return;

    //***************** setting uppercomponent cordinates **************************************

    upperComponent.style.bottom = topBottom - distnaceMoved + 'px';
    upperComponent.style.height = topHeight - distnaceMoved + 'px';

    //***************** setting lowercomponent cordinates **************************************

    lowerComponent.style.top = lowerTop - distnaceMoved + 'px';
    lowerComponent.style.height = lowerHeight + distnaceMoved + 'px';
  };
};

export function stopResizeWrapper(element, mouseMoveHandler, setComponentsHeight, upperClassName, lowerClassName) {
  return function stopResize(e) {
    const upperComponent = document.querySelector<HTMLElement>('.' + upperClassName);
    const lowerComponent = document.querySelector<HTMLElement>('.' + lowerClassName);
    // Object.keys(getView).forEach((key) => (getView[key] = ''));
    setComponentsHeight((pre) => ({
      ...pre,
      [upperClassName]: upperComponent.getBoundingClientRect().height,
      [lowerClassName]: lowerComponent.getBoundingClientRect().height,
    }));

    element.removeEventListener('mousemove', mouseMoveHandler);
  };
}

export function stopWindowAddListner(element, stopResizeHandler) {
  return function stopWindowListner(e) {
    element.removeEventListener('mouseup', stopResizeHandler);
  };
}

export const onMouseMoveWrapper = (event, upperClassName, lowerClassName, setComponentsHeight) => {
  event.stopPropagation();
  event.preventDefault();
  const upperComponent = document.querySelector<HTMLElement>('.' + upperClassName);
  const lowerComponent = document.querySelector<HTMLElement>('.' + lowerClassName);

  const original_mouse_y = event.pageY;
  let upperComponentClient = upperComponent.getBoundingClientRect();
  let lowerComponentClient = lowerComponent.getBoundingClientRect();

  let mouseMoveHandler = resizeWrapper({
    lowerComponentClient,
    lowerComponent,
    upperComponentClient,
    upperComponent,
    original_mouse_y,
  });
  window.addEventListener('mousemove', mouseMoveHandler);
  let stopResizeHandler = stopResizeWrapper(window, mouseMoveHandler, setComponentsHeight, upperClassName, lowerClassName);
  window.addEventListener('mouseup', stopResizeHandler);
  window.addEventListener('mousedown', stopWindowAddListner(window, stopResizeHandler));
};

export const handleMouseOver = (elementRef) => {
  elementRef.current.style.display = 'block';
  elementRef.current.style.cursor = 'grab';
};

export const handleMouseLeave = (elementRef) => {
  elementRef.current.style.display = 'none';
  elementRef.current.style.cursor = 'grab';
};

export const handleMouseMove = (elementRef, event) => {
  let { left: leftOfRect } = document.getElementById('divider').getBoundingClientRect();
  elementRef.current.style.left = event.pageX - leftOfRect - 34 + 'px';
};
