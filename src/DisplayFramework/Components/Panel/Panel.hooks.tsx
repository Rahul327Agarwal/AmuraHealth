import React, { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { IPanelConfig, IPanelId } from '../../Core/DFCore.types';
import { getFixedMaxWidgetWidth } from '../../DisplayFramework.functions';
import { usePanelsData } from '../../State/Slices/DF';
import { ICurrentPanelConfig, IPanelComponentData, IPanelData } from './Panel.types';
import { debounce, throttle } from 'lodash';
import { ComponentMapKeys } from '../../Events/Data/ComponentsMap';

/**
 * is Panel Visible
 */
export const usePanelVisibility = (id: string) => {
  const panelRef = useRef(null);
  const [isVisible, setVisibility] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        ([entry]) => {
          const newIsVisible = entry.isIntersecting;
          setVisibility(newIsVisible);
        },
        {
          threshold: 0.7,
        }
      ),
    [panelRef, id]
  );

  useEffect(() => {
    if (!panelRef.current) return;
    observer.observe(panelRef.current);
    return () => observer.disconnect();
  }, [panelRef.current, id]);

  useEffect(() => {
    const onResize = throttle(() => {
      if (!panelRef.current) return;
      observer.unobserve(panelRef.current);
      setTimeout(() => {
        observer.observe(panelRef.current);
      }, 100);
    }, 1000);

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [panelRef.current, id]);

  return {
    panelRef,
    isVisible,
  };
};

/**
 * Returns the styles for the panel based on the grid config of the panel
 */
export const usePanelStyles = (gridConfig: ICurrentPanelConfig, initialGridConfig: IPanelConfig) => {
  const widgetMaxWidth = getFixedMaxWidgetWidth();

  const styles: CSSProperties = {};

  if (!initialGridConfig || !gridConfig) {
    return styles;
  }

  // Max Height
  if (initialGridConfig.MaxH === 'Fill') {
    styles.height = '100%';
  } else {
    styles.maxHeight = initialGridConfig.MaxH;
  }

  // Min Height
  if (initialGridConfig.MinH !== 1) {
    styles.minHeight = initialGridConfig.MinH;
  }

  // Max Width
  if (initialGridConfig.MaxW === 'Fill') {
    styles.flexGrow = 1;
  } else if (initialGridConfig.MaxW === 'Min') {
    styles.maxWidth = widgetMaxWidth;
  } else if (initialGridConfig.MaxW === 'User') {
    // TODO document why this block is empty
  } else {
    styles.maxWidth = initialGridConfig.MaxW;
  }

  // Min Width
  if (initialGridConfig.MinW !== 'Min') {
    styles.minWidth = initialGridConfig.MinW;
  }

  return styles;
};

//
// Current Panel Context
//

const CurrentPanelContext = React.createContext<IPanelData | undefined>(undefined);
export const CurrentPanelProvider = CurrentPanelContext.Provider;

/**
 * @returns the current panel data in which the component is being rendered
 */
export const useCurrentPanel = () => React.useContext(CurrentPanelContext);

/**
 * Gets the current Panel Component's Props which was passed with the Event
 * @param options use any one of the options to get the component from the Component Stack
 * @returns Props of the Component
 */
export const useCurrentPanelProps = (options?: { componentIndex?: number; componentName?: ComponentMapKeys }): any => {
  const panel = useCurrentPanel();
  const foundCompo = useMemo(() => {
    for (let i = 0; i < panel.panelComponentData?.length; i++) {
      const p = panel.panelComponentData[i];
      if (options?.componentIndex !== undefined) {
        return p;
      } else if (options?.componentName !== undefined) {
        if (options?.componentName === p.componentName) {
          return p;
        }
      } else {
        if (i === 0) return p;
      }
    }
  }, [panel]);
  return foundCompo?.componentProps ?? undefined;
};

//
//
//

/**
 * Panel Size of the current panel in which the hook is being used
 */
export const usePanelSize = () => {
  const panelData = useCurrentPanel();

  if (!panelData) {
    throw new Error('Panel Size Hook must be used inside a Panel');
  }

  return {
    width: panelData.panelConfig.MaxW,
    height: panelData.panelConfig.MaxH,
    resizedSnapSize: panelData.panelConfig.resizedSnapSize ?? 1,
  };
};

/**
 * Panel Size of the panel with the given id
 */
export const usePanelSizeOfPanel = (panelId: IPanelId) => {
  const panels = usePanelsData();

  const panelData = Object.values(panels).find((panel) => panel.panelId === panelId);
  if (!panelData) {
    throw new Error('Cannot find panel with id: ' + panelId);
  }

  return {
    width: panelData.panelConfig.MaxW,
    height: panelData.panelConfig.MaxH,
    resizedSnapSize: panelData.panelConfig.resizedSnapSize ?? 1,
  };
};
