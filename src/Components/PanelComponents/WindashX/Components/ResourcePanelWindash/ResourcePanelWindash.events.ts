import ErrorToaster from '../../../../../Common/ErrorToaster';
import { useCurrentPanel } from '../../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { usePanelsContainerSizeInfo } from '../../../../../DisplayFramework/DisplayFramework.hooks';
import { useDFEvent } from '../../../../../DisplayFramework/Events/DFEvents';
import { useAppDispatch } from '../../../../../DisplayFramework/State/store';
import { canWindashOpenAnotherWindow } from '../../Windash.functions';
import { INewWindow, IWindow } from '../../Windash.types';
import { getLastWindashClickedId } from '../../WindashX';
import { getNavigationRef } from '../NavigationBar/NavigationBar';
import { useSetResourseWindashScreens } from './ResourcePanelWindash.state';

export const useResouceEvent = () => {
  const setWindashScreens = useSetResourseWindashScreens();
  const { numOfPanelsCanFit } = usePanelsContainerSizeInfo();
  const sendEvent = useDFEvent();
  const { id: panelId } = useCurrentPanel();
  const dispatch = useAppDispatch();
  //

  //

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

            return { ...window, state: 'maximized' };
          }
          if (event === 'minimize') {
            // Reset Panels
            if (window.id === getLastWindashClickedId()) {
            }

            return { ...window, state: 'minimized' };
          }
          if (event === 'close') {
            // Reset Panels
            if (window.id === getLastWindashClickedId()) {
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
        if (!canOpenScreen) {
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
  };
};
