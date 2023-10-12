import React, { RefObject, useEffect, useState } from 'react';
import { IPanelData } from './Components/Panel/Panel.types';
import { IPanelGrid, IPanelId, IPanelName } from './Core/DFCore.types';
import { getFixedMaxWidgetWidth } from './DisplayFramework.functions';
import componentMap, { ComponentMapKeys } from './Events/Data/ComponentsMap';
import displayFrameworkEventsMap, { IEventName } from './Events/Data/DisplayFrameworkEventsMap';
import { useDFEventsReciever } from './Events/DFEvents';
import { IEventMapData, IEventTargetPanel, IEventType } from './Events/DFEvents.types';
import {
  getPanelContainerRefs,
  useHeaderShown,
  usePanelsData,
  useSamePanelEventShown,
  useSetPanelsData,
} from './State/Slices/DF';
import { useMaximizedWindashScreens } from '../Components/PanelComponents/WindashX/Windash.state';
import { DeepLinkEventManager, useDeepLinkAction } from './DeepLink/DeepLinkProcessor/DeepLinkEventManager';

/**
 *
 * @returns {object} The width and height of the window
 */
export function useWindowSize() {
  const getSize = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [windowSize, setWindowSize] = useState(getSize());

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return windowSize;
}

/**
 *
 * @returns {number} The width of the panels container (all panels fit in the window)
 */
export function usePanelsContainerSizeInfo() {
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [numOfPanels, setNumOfPanels] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth;

      if (windowWidth < getFixedMaxWidgetWidth()) {
        setWindowWidth(getFixedMaxWidgetWidth() - 1);
      } else {
        setWindowWidth(getFixedMaxWidgetWidth());
      }

      const panelWidth = getFixedMaxWidgetWidth();
      const gap = 8;

      let numOfPanels = Math.floor(windowWidth / (panelWidth + gap));
      if (numOfPanels < 1) numOfPanels = 1;
      let containerWidth = numOfPanels * (panelWidth + gap) - gap;

      // limit the width to 5 panels
      const maxPanels = 5;
      if (numOfPanels > maxPanels) {
        containerWidth = maxPanels * (panelWidth + gap) - gap;
        numOfPanels = maxPanels;
      }

      //
      setContainerWidth(containerWidth);
      setNumOfPanels(numOfPanels);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return {
    numOfPanelsCanFit: numOfPanels,
    containerWidth,
    windowWidth,
  };
}

/**
 *
 */
const PanelContainerInfoContext = React.createContext({
  containerWidth: 0,
  numOfPanelsCanFit: 0,
  rowPanelIds: [] as IPanelId[][],
});
export const PanelContainerInfoProvider = PanelContainerInfoContext.Provider;
export const usePanelContainerInfo = () => React.useContext(PanelContainerInfoContext);

/**
 * @param {React.RefObject<HTMLDivElement>} panelsParentRef The ref of the panels container in which the panels are rendered
 * @returns {object} The function to navigate to a panel
 */
export function usePanelNavigation() {
  //
  const navigateToPanel = (panelId: IPanelId) => {
    const panelsParentRef = getPanelContainerRefs().main;
    const panelContainer = panelsParentRef.current;
    if (!panelContainer) return;

    const gap = 8;

    const panelsEl = Array.from(panelContainer.children);
    const panelElIndex = panelsEl.findIndex((p) => p.id === panelId);

    if (panelElIndex === -1) return;

    let scrollLeft = 0;
    for (let i = 0; i < panelElIndex; i++) {
      const panelWidth = panelsEl[i].clientWidth;
      scrollLeft += panelWidth + gap;
    }

    const panelWidth = panelsEl[panelElIndex].clientWidth;

    const currentScrollLeft = panelContainer.scrollLeft;
    const panelElLeft = scrollLeft;
    const panelElRight = panelElLeft + panelWidth;

    const isScrollingRight = panelElLeft > currentScrollLeft;

    scrollLeft = isScrollingRight ? panelElRight - panelContainer.clientWidth : panelElLeft;

    panelContainer.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    });
  };

  return {
    navigateToPanel,
  };
}

/**
 * Main Listener for the Display Framework events
 * - Receives the event name and params
 * - Updates the panels data
 * - Returns the panels data to be rendered
 *
 * @returns {object} The panels data to be rendered
 */
export const usePanels = (numOfPanelsCanFit: number): { panelsData: IPanelGrid } => {
  const dfEvent = useDFEventsReciever('HomeList');
  const panelNavigation = usePanelNavigation();
  const windashScreens = useMaximizedWindashScreens();

  const panelsData = usePanelsData();
  const setPanelsData = useSetPanelsData();

  // STC
  const [_, setIsHeaderShown] = useHeaderShown();
  const [__, setSamePanelEventShown] = useSamePanelEventShown();

  useDeepLinkAction(
    'panelNavigation',
    (e, notifyComplete) => {
      panelNavigation.navigateToPanel(e.detail.data?.panelId);
      notifyComplete();
    },
    []
  );

  // Temp
  useEffect(() => {
    if (!dfEvent) return;

    const isMultiEvent = typeof dfEvent.eventName === 'object';

    let combinedTargetPanels: (IEventTargetPanel & { eventType?: IEventType })[] = [];
    if (isMultiEvent) {
      combinedTargetPanels = (dfEvent.eventName as IEventName[])
        .map((e) => {
          const event = displayFrameworkEventsMap[e] as IEventMapData;

          if (!event) {
            console.error('DF Event::', `MultiEvent '${e}' is not defined in the Display Framework`);
            return [];
          }

          return event.targetPanels.map((p) => ({ ...p, eventType: event.eventType }));
        })
        .flat();
    } else {
      const event = displayFrameworkEventsMap[dfEvent.eventName as IEventName] as IEventMapData;

      if (!event) {
        console.error('DF Event::', `Event '${dfEvent.eventName}' is not defined in the Display Framework`);
        return;
      }

      combinedTargetPanels = event.targetPanels.map((p) => ({ ...p, eventType: event.eventType }));
    }

    //

    console.info('DF Event::', `Event ${dfEvent.eventName} is received`);

    const prev = Object.assign({}, panelsData) as IPanelGrid;
    if (!prev.main) return;

    const newlyAddedPanels: IPanelData[] = [];

    // Construct the new panels data
    let newData = {} as IPanelGrid;
    Object.keys(prev).forEach((key) => {
      const row = prev[key] as IPanelData[];
      const newPanelData = row.map((_p) => {
        const panel = Object.assign({}, _p) as IPanelData;

        const targetPanel = combinedTargetPanels.find((p) => {
          const isAuto = p.targetPanelName === 'auto';
          if (isAuto) {
            return panel.id === dfEvent?.sourcePanelId;
          }
          return p.targetPanelName === panel.id;
        });

        if (!targetPanel) {
          // if panel is not in the event target panels, is not static and clearAll is true, clear the panel
          if (dfEvent?.clearAll && !(panel.id === 'M' || panel.id === 'T')) {
            panel.isActive = false;
            panel.panelConfig.DRank = panel.initialPanelConfig.DRank;
            panel.panelComponentData = [];
          }
          return panel;
        }

        panel.isActive = false;

        if (targetPanel.targetComponentName === null) {
          panel.panelConfig.DRank = panel.initialPanelConfig.DRank;
          panel.panelComponentData = [];
          return panel;
        }

        const compo = componentMap[targetPanel.targetComponentName];

        if (targetPanel.eventType === 'samePanelEvent') {
          panel.panelComponentData = [
            ...panel.panelComponentData,
            {
              component: compo as () => JSX.Element,
              eventDetails: dfEvent,
              componentName: targetPanel.targetComponentName,
              componentProps: dfEvent?.params,
            },
          ];
        } else {
          panel.panelComponentData = [
            {
              component: compo as () => JSX.Element,
              componentName: targetPanel.targetComponentName,
              eventDetails: dfEvent,
              componentProps: dfEvent?.params,
            },
          ];
        }

        panel.isActive = true;
        panel.panelConfig.DRank = targetPanel.DRank ?? panel.initialPanelConfig.DRank;
        newlyAddedPanels.push(panel);

        return panel;
      });
      newData[key] = newPanelData;
    });

    // STC
    const hasSamePanelEventInView = newData.main?.some((p) => p.panelComponentData?.length > 1);
    if (hasSamePanelEventInView) {
      setIsHeaderShown(false);
      setSamePanelEventShown(true);
    } else {
      setIsHeaderShown(true);
      setSamePanelEventShown(false);
    }

    setPanelsData(newData);

    //Update DeepLink Event
    setTimeout(() => {
      DeepLinkEventManager.notifyDeepLinkProcessor('waitForPanel', {
        // data: newData,
      });
    }, 100);

    setTimeout(() => {
      // Navigate to the first active panel with highest DRank
      const highestDRankPanel = newlyAddedPanels.reduce(
        (prev, curr) => (prev?.panelConfig?.DRank > curr.panelConfig.DRank ? prev : curr),
        {} as IPanelData
      );
      panelNavigation.navigateToPanel(highestDRankPanel.id);
    }, 100);
  }, [dfEvent, panelsData.main?.length]);

  return {
    panelsData: panelsData,
  };
};
