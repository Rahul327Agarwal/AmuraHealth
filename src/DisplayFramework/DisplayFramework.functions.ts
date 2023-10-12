//

import { IPanelData } from './Components/Panel/Panel.types';

export const MIN_SCREEN_SUPPORT = 350;

/**
 *
 * @returns {number} The fixed width of the panel (small and large)
 */

export const getFixedMaxWidgetWidth = () => {
  if (window.innerWidth <= 428) {
    return window.innerWidth > MIN_SCREEN_SUPPORT ? window.innerWidth - 10 : MIN_SCREEN_SUPPORT;
  }
  return 428;
};

/**
 * Filter the panels data so that every active panel can fit in the window
 * If there are less active panels than the number of panels that can fit in the window - add in
 *
 * @param panels Panels data
 * @param numOfPanelsCanFit  Number of panels that can fit in the window
 * @returns {object} The static and dynamic panels
 */
export const filterActivePanels = (
  panels: IPanelData[],
  numOfPanelsCanFit: number
): {
  staticPanels: IPanelData[];
  dynamicPanels: IPanelData[];
} => {
  const { staticPanels, dynamicPanels, activePanelsLength } = panels.reduce(
    (acc, panel) => {
      if (panel.isStatic && numOfPanelsCanFit > 1) {
        acc.staticPanels.push(panel);
      } else {
        acc.dynamicPanels.push(panel);

        if (panel.isActive) {
          acc.activePanelsLength++;
        }
      }
      return acc;
    },
    { staticPanels: [] as IPanelData[], dynamicPanels: [] as IPanelData[], activePanelsLength: 0 }
  );

  let newPanels: IPanelData[] = [];
  let numOfPanelsToMakeActive = numOfPanelsCanFit - staticPanels.length - activePanelsLength;

  for (let i = 0; i < dynamicPanels.length; i++) {
    const panel = dynamicPanels[i];
    const isAlreadyActive = panel.isActive;

    if (isAlreadyActive) {
      newPanels.push(panel);
      continue;
    }

    if (numOfPanelsToMakeActive > 0) {
      newPanels.push({
        ...panel,
      });
      numOfPanelsToMakeActive--;
    }
  }

  return {
    staticPanels,
    dynamicPanels: newPanels,
  };
};
