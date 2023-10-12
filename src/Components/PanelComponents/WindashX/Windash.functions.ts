import { useEffect } from 'react';
import { IPanelId } from '../../../DisplayFramework/Core/DFCore.types';
import { usePanelsContainerSizeInfo } from '../../../DisplayFramework/DisplayFramework.hooks';
import { useAppSelector } from '../../../DisplayFramework/State/store';
import {
  useResourceWindashScreens,
  useResourseWindashActiveScreens,
  useSetResourseWindashScreens,
} from './Components/ResourcePanelWindash/ResourcePanelWindash.state';
import { useWindashEvent } from './Windash.hooks';
import { useActiveWindashScreens, useSetWindashScreens, useWindashScreens } from './Windash.state';
import { IWindow } from './Windash.types';
import { getResourceWindashRef, getWindashRef } from './WindashX';

export const canWindashOpenAnotherWindow = (windashRef, windows: IWindow[], windowToOpen: Partial<IWindow>) => {
  if (!windashRef?.current) return;

  const { openedScreenHeight } = windows.reduce(
    (acc, screen) => {
      if (screen.state === undefined) return acc;
      let height = 0;
      if (screen.state === 'maximized') {
        height = screen.minHeight;
      } else if (screen.state === 'minimized') {
        if (screen.minimizedComponent) {
          height = 120;
        } else {
          height = windowToOpen.id === screen.id ? 0 : 40;
        }
      }
      return {
        openedScreenHeight: acc.openedScreenHeight + height,
      };
    },
    {
      openedScreenHeight: 0,
    }
  );

  let addedScreenHeight = openedScreenHeight + (windowToOpen.minHeight ?? 0);
  const parentHeight = windashRef.current!.clientHeight;

  const canOpen = addedScreenHeight < parentHeight;

  return canOpen;
};

export const canWindashHoldCurrentStates = (windashRef, windows: IWindow[]) => {
  if (!windashRef?.current) return;

  const { openedScreenHeight } = windows.reduce(
    (acc, screen) => {
      if (screen.state === undefined) return acc;
      let height = 0;
      if (screen.state === 'maximized') {
        height = screen.minHeight;
      } else if (screen.state === 'minimized') {
        if (screen.minimizedComponent) {
          height = 120;
        } else {
          height = 40;
        }
      }
      return {
        openedScreenHeight: acc.openedScreenHeight + height,
      };
    },
    {
      openedScreenHeight: 0,
    }
  );

  const parentHeight = windashRef.current!.clientHeight;

  const canHold = openedScreenHeight < parentHeight;

  return canHold;
};

export const useScreenResize = (windashRef, windashScreens, setWindashScreens, triggerWindashEvent) => {
  const minimizePanelsFromBottomWhenLowSpace = () => {
    const isEnoughSpace = canWindashHoldCurrentStates(windashRef, windashScreens);
    if (isEnoughSpace) return;
    setWindashScreens((prev) => {
      if (prev.filter((panel) => panel.state !== undefined).length === 1) return prev;
      // if panels do not have enough space
      if (!isEnoughSpace) {
        let screens = [...prev];
        for (let i = prev.length - 1; i >= 0; i--) {
          if (screens[i].state === 'maximized') {
            screens[i] = { ...screens[i], state: 'minimized' };
            triggerWindashEvent(windashRef, screens[i].id, 'minimize');
            break;
          }
          if (screens[i].state === 'minimized') {
            if (screens[i].isDynamic) {
              screens.splice(i);
            } else {
              screens[i] = { ...screens[i], state: undefined };
            }
            break;
          }
        }
        return screens;
      }
      return prev;
    });
  };

  // ? minimize pannels from bottom if not enough screen height is available
  useEffect(() => {
    window.addEventListener('resize', minimizePanelsFromBottomWhenLowSpace);
    return () => window.removeEventListener('resize', minimizePanelsFromBottomWhenLowSpace);
  }, [windashScreens]);

  return {
    minimizePanelsFromBottomWhenLowSpace,
  };
};

export const useSinglePanelWindash = (setWindashScreens) => {
  const { numOfPanelsCanFit } = usePanelsContainerSizeInfo();
  const loggedInUserInfo = useAppSelector((state) => state.displayFrameWork.loggedInUserInformation);

  const isStaffUser = loggedInUserInfo?.allRoles.length;

  // ? minimize pannels from bottom if not enough screen height is available
  useEffect(() => {
    if (!isStaffUser) return;
    if (numOfPanelsCanFit === 1) {
      setWindashScreens((prev) => {
        let newScreens = prev.map((window) =>
          window.isDefault ? ({ ...window, state: 'maximized' } as IWindow) : { ...window, state: undefined }
        );
        newScreens = newScreens.filter((screen) => !screen.isDynamic);
        return newScreens;
      });
    }
  }, [numOfPanelsCanFit]);
};
