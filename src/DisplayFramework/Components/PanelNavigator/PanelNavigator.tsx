import React, { useEffect } from 'react';
import { usePanelVisibilities, usePanelsData } from '../../State/Slices/DF';
import { usePanelContainerInfo, usePanelNavigation } from '../../DisplayFramework.hooks';
import { useStyles } from './PanelNavigator.styles';

export default function PanelNavigator() {
  const panels = usePanelsData();
  const { numOfPanelsCanFit } = usePanelContainerInfo();
  const panelNavigation = usePanelNavigation();
  const visibilities = usePanelVisibilities();

  const panelsToDisplay = panels.main?.filter((p) => {
    if (numOfPanelsCanFit === 1) return p.isActive;
    return p.isActive && p.id !== 'H';
  });

  const { classes } = useStyles();
  const isAnyPanelInvisible = panelsToDisplay?.some((p) => !visibilities[p.id]);

  const isNavigatorShown = isAnyPanelInvisible;

  return (
    <div
      className={classes.mainContainer}
      style={{
        height: isNavigatorShown ? '40px' : '0px',
        border: isNavigatorShown ? undefined : 'none',
        transition: 'all 0.1s ease',
      }}
    >
      {isNavigatorShown &&
        panelsToDisplay.map((panel, i) => {
          const isVisible = visibilities[panel.id];

          return (
            <div
              key={panel.id}
              className={classes.navigatorButton}
              style={{
                opacity: isVisible ? 1 : 0.18,
              }}
              onClick={() => {
                if (isVisible) return;

                panelNavigation.navigateToPanel(panel.id);
              }}
            ></div>
          );
        })}
    </div>
  );
}
