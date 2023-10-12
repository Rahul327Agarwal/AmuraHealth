import previousDay from 'date-fns/previousDay/index';
import { useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import ErrorToaster from '../../../Common/ErrorToaster';
import { IPanelId } from '../../../DisplayFramework/Core/DFCore.types';
import { usePanelsContainerSizeInfo } from '../../../DisplayFramework/DisplayFramework.hooks';
import { useDFEvent } from '../../../DisplayFramework/Events/DFEvents';
import { ComponentMapKeys } from '../../../DisplayFramework/Events/Data/ComponentsMap';
import { resetSelectedClientObject } from '../../../DisplayFramework/State/Slices/DashboardSlice';
import { useSetSelectedClient } from '../../../DisplayFramework/State/Slices/DisplayFramework';
import { useAppDispatch, useAppSelector } from '../../../DisplayFramework/State/store';
import { doesAnyRoleHaveClickAccess } from '../../../Utilities/AccessPermissions';
import { knowledgeBaseSelectedCardAtom } from '../DistributionsManagement/List/KnowledgeBase';
import { lmsSelectedCardAtom } from '../DistributionsManagement/List/LMS';
import { pollsSelectedCardAtom } from '../DistributionsManagement/List/Polls';
import { questionnaireSelectedCardAtom } from '../DistributionsManagement/List/Questionnaire';
import { postCollectionSelectedCardAtom } from '../PostCollections/List/PostCollectionList';
import { postManagementSelectedCardAtom } from '../PostManagement/PostManagementList/PostManagementList';
import { activeReporteeCardAtom } from '../ReporteesListView/ReporteesListViewHome.hook';
import { getNavigationRef } from './Components/NavigationBar/NavigationBar';
import { WindashDefaultScreensIDs } from './Windash.config';
import { canWindashHoldCurrentStates, canWindashOpenAnotherWindow } from './Windash.functions';
import { useActiveWindashScreens, useSetMainCardType, useSetWindashScreens, useWindashScreens } from './Windash.state';
import { INewWindow, IWindow } from './Windash.types';
import { getLastWindashClickedId, getResourceWindashRef, getWindashRef } from './WindashX';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';
import {
  useResourceWindashScreens,
  useResourseWindashActiveScreens,
  useSetResourseWindashScreens,
} from './Components/ResourcePanelWindash/ResourcePanelWindash.state';

/**
 * Filter the Windash Screens based on the user's access permissions
 */
export const useFilteredWindashScreens = (currentScreenView: IPanelId) => {
  const { retreiveWindowScreens } = useRetreiveWindashAttribute(currentScreenView);

  //

  const loggedInUserInformation = useAppSelector((state) => state.displayFrameWork.loggedInUserInformation);
  const accessPermissions = useAppSelector((state) => state.accessPermissions.accessPermissions);

  const hasAccessToSeeStaffList = doesAnyRoleHaveClickAccess(
    loggedInUserInformation.allRoles ?? [],
    accessPermissions,
    'RMPanel',
    'RMPanel.1'
  );
  const hasAccessToSeeAssignGC = doesAnyRoleHaveClickAccess(
    loggedInUserInformation.allRoles ?? [],
    accessPermissions,
    'RMPanel',
    'RMPanel.2'
  );

  const filteredScreens = retreiveWindowScreens.filter((window) => {
    if (window.componentName === 'StaffListView') {
      return hasAccessToSeeStaffList;
    }
    if (window.componentName === 'ReferRegisterPanel') {
      return hasAccessToSeeAssignGC;
    }
    return true;
  });

  //

  return filteredScreens;
};

/**
 *
 */
export const useWindashEvent = () => {
  const setMainCardType = useSetMainCardType();
  const { id: panelId } = useCurrentPanel();
  const setWindashScreens = useSetWindashScreens();
  const { numOfPanelsCanFit } = usePanelsContainerSizeInfo();
  const sendEvent = useDFEvent();
  const dispatch = useAppDispatch();
  const setSelectedClient = useSetSelectedClient();

  //
  const setPCState = useSetAtom(postCollectionSelectedCardAtom);
  const setPMState = useSetAtom(postManagementSelectedCardAtom);
  const setLMSState = useSetAtom(lmsSelectedCardAtom);
  const setKnowledgeState = useSetAtom(knowledgeBaseSelectedCardAtom);
  const setQuestionnaireState = useSetAtom(questionnaireSelectedCardAtom);
  const setPollsState = useSetAtom(pollsSelectedCardAtom);
  const setActiveReporteeCard = useSetAtom(activeReporteeCardAtom);

  const resetCardSelectionStates = (ignoreModule: WindashDefaultScreensIDs) => {
    setPCState((prev) => (ignoreModule === 'PostCollections' ? prev : ''));
    setPMState((prev) => (ignoreModule === 'PostManagementList' ? prev : ''));
    setLMSState((prev) => (ignoreModule === 'DistributionLMS' ? prev : ''));
    setKnowledgeState((prev) => (ignoreModule === 'KnowledgeBase' ? prev : ''));
    setQuestionnaireState((prev) => (ignoreModule === 'Questionnaire' ? prev : ''));
    setPollsState((prev) => (ignoreModule === 'Polls' ? prev : ''));
    setActiveReporteeCard((prev) => (ignoreModule === 'ReporteesView' ? prev : ''));

    const isReporteesMyList = ignoreModule.startsWith('reportees-mylist');

    // Reset MyList
    if (ignoreModule !== 'MyListHome' && !isReporteesMyList) {
      dispatch(resetSelectedClientObject());
    }
    setMainCardType('');
  };

  //

  const resetOtherPanels = (withEvent?: boolean) => {
    dispatch(resetSelectedClientObject());
    setSelectedClient(undefined);
    if (withEvent) {
      sendEvent('showingEmpty', {});
    }
    setMainCardType('');
  };

  /**
   * Triggers the Windash Event
   * if already maximized, does nothing
   * if minimized, maximizes it
   *
   * @param windowId Unique Window ID
   * @param event
   */
  const triggerWindashEvent = (windashRef, windowId: string, event: 'maximize' | 'minimize' | 'close') => {
    setWindashScreens((prev) => {
      // if Close Event, check if at least one screen is open
      if (event === 'close') {
        const openedScreens = prev.filter((screen) => screen.state !== undefined).length;
        if (openedScreens === 1) {
          return prev;
        }
      }

      //

      // Can Open Another Window
      if (event === 'maximize') {
        const newWindow = prev.find((screen) => screen.id === windowId);
        if (!newWindow) return prev;
        const canOpenScreen = canWindashOpenAnotherWindow(windashRef, prev, newWindow);

        if (numOfPanelsCanFit === 1) {
          const newScreens = prev
            .map((window) => {
              if (window.id === windowId) {
                return { ...window, state: 'maximized' } as IWindow;
              }
              return { ...window, state: undefined };
            })
            .filter((screen) => !screen.isDynamic);

          if (windowId === newScreens[0].id) {
            setTimeout(() => {
              getNavigationRef().current?.slideTo(0);
            }, 200);
          }
          return newScreens;
        }

        if (!canOpenScreen) {
          // If the screen is minimized, maximize it and minimize the others
          // if (newWindow.state === 'minimized' && !canOpenScreen) {
          //   return prev.map((window) => {
          //     if (window.id === windowId) {
          //       return { ...window, state: 'maximized' };
          //     }
          //     if (window.state === 'maximized') {
          //       return { ...window, state: 'minimized' };
          //     }
          //     return window;
          //   });
          // }

          //
          ErrorToaster('Space not available', panelId, 'error');
          return prev;
        }
      }

      const newScreens = prev.map((window) => {
        if (window.id === windowId) {
          if (event === 'maximize') {
            // Reset
            resetOtherPanels(true);
            return { ...window, state: 'maximized' };
          }
          if (event === 'minimize') {
            // Reset Panels
            if (window.id === getLastWindashClickedId()) {
              resetOtherPanels(true);
            }

            return { ...window, state: 'minimized' };
          }
          if (event === 'close') {
            // Reset Panels
            if (window.id === getLastWindashClickedId()) {
              resetOtherPanels(true);
            }

            // if Dynamic Window, remove it from the list
            if (window.isDynamic) {
              return undefined;
            }

            return { ...window, state: undefined };
          }
        }
        return window;
      });

      return newScreens.filter((screen) => screen !== undefined) as IWindow[];
    });
  };

  /**
   * Adds a new window to Windash at the end
   * if no space available, does nothing
   * if already exists, maximizes it
   *
   * @param windashWindow Window to be added to Windash
   */
  const addWindowToWindash = (windashRef, windashWindow: INewWindow) => {
    let addedIndex = -1;
    let shouldMaximize = false;
    setWindashScreens((prev) => {
      const canOpenScreen = canWindashOpenAnotherWindow(windashRef, prev, windashWindow);
      const ifExists = prev.find((screen) => screen.id === windashWindow.id);

      //If already exists, just maximize it
      if (ifExists) {
        if (ifExists.state !== 'maximized') {
          shouldMaximize = true;
        }
        return prev;
      }

      if (!ifExists) {
        if (!canOpenScreen && numOfPanelsCanFit > 1) {
          ErrorToaster('Space not available', panelId, 'error');
          return prev;
        }
      }

      // Add the new window
      const newWindow: IWindow = {
        ...windashWindow,
        state: 'maximized',
        isDynamic: true,
      };
      addedIndex = prev.length;

      // ? in single panle view if third party mylist is opened
      if (numOfPanelsCanFit === 1) {
        let newScreens = prev.map((window) => ({ ...window, state: undefined }));
        return [...newScreens, newWindow];
      } else {
        return [...prev, newWindow];
      }
    });

    if (shouldMaximize) {
      triggerWindashEvent(windashRef, windashWindow.id, 'maximize');
    }

    // Navigate to the new window in Navigation Bar
    if (addedIndex > -1) {
      setTimeout(() => {
        getNavigationRef().current?.slideTo(addedIndex);
      }, 200);
    }
  };

  // auto minimize from bottom when spaces are low

  return {
    triggerWindashEvent,
    addWindowToWindash,
    resetOtherPanels,
    resetCardSelectionStates,
  };
};

export const useRetreiveWindashAttribute = (currentScreenView: IPanelId) => {
  /* These lines of code are retrieving and setting the state of the Windash screens for the resource panel. */
  const resourceWindash = getResourceWindashRef();
  const resourceWindowScreens = useResourceWindashScreens();
  const resourceWindowStateSetter = useSetResourseWindashScreens();
  const resourceActiveScreen = useResourseWindashActiveScreens();

  /* These lines of code are retrieving and setting the state of the Windash screens for the other panel. */
  const windowRef = getWindashRef();
  const windowScreens = useWindashScreens();
  const windowStateSetter = useSetWindashScreens();
  const activeScreen = useActiveWindashScreens();

  return {
    retreivedWindowRef: currentScreenView === 'R' ? resourceWindash : windowRef,
    retreiveWindowScreens: currentScreenView === 'R' ? resourceWindowScreens : windowScreens,
    retreiveWindowStateSetter: currentScreenView === 'R' ? resourceWindowStateSetter : windowStateSetter,
    retriveActiveScreen: currentScreenView === 'R' ? resourceActiveScreen : activeScreen,
  };
};
