import React, { useEffect, useMemo, useRef } from 'react';
import MinScreenErrorScreen from '../Components/PanelComponents/ErrorBoundary/ErrorScreen/MinScreenErrorScreen';
import Panel from './Components/Panel/Panel';
import { IPanelData } from './Components/Panel/Panel.types';
import PanelNavigator from './Components/PanelNavigator/PanelNavigator';
import { SinglePanelNavigator } from './Components/SinglePanelNavigator/SinglePanelNavigator';
import { useInitialPanelData } from './Core/DFCore.hooks';
import { IPanelConfig, IGridConfig } from './Core/DFCore.types';
import { filterActivePanels, getFixedMaxWidgetWidth } from './DisplayFramework.functions';
import { PanelContainerInfoProvider, usePanels, usePanelsContainerSizeInfo } from './DisplayFramework.hooks';
import { useStyles } from './DisplayFramework.styles';
import { MySettingsNew } from '../Components/PanelComponents/MySettings/MySettingsNew';
import { setPanelContainerRefs, useHeaderShown, useSamePanelEventShown } from './State/Slices/DF';
import { useHeaderAutoHide } from './Components/SinglePanelNavigator/SinglePanelNavigator.hooks';
import { DeepLinkProcessor } from './DeepLink/DeepLinkProcessor/DeepLinkProcessor';

/**
 * Default Main Component
 */
export default function DisplayFramework() {
  const { loading } = useInitialPanelData();

  if (loading) {
    return <div></div>;
  }

  return <DisplayFrameworkCore />;
}

/**
 *
 */
function DisplayFrameworkCore() {
  const { containerWidth, numOfPanelsCanFit, windowWidth } = usePanelsContainerSizeInfo();

  // Main Hook to get the panels data
  const { panelsData } = usePanels(numOfPanelsCanFit);

  // Sets the refs for the panels container
  const mainRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setPanelContainerRefs({
      main: mainRef,
    });
  }, []);

  //Start Processing Deeplink if there is any
  useEffect(() => {
    if (panelsData?.main?.length > 1) {
      DeepLinkProcessor.checkDeeplink();
    }
  }, [panelsData]);

  const { classes } = useStyles({
    panelsContainerWidth: windowWidth < getFixedMaxWidgetWidth() - 68 ? '100%' : containerWidth,
    numOfPanelsCanFit,
  });

  const { parentRef, isHeaderShown } = useHeaderAutoHide(numOfPanelsCanFit === 1);

  // STC
  const [isSamePanelEventShown] = useSamePanelEventShown();

  //

  if (!panelsData) return <></>;
  if (windowWidth < getFixedMaxWidgetWidth() - 68) return <MinScreenErrorScreen />;

  const isSinglePanelView = numOfPanelsCanFit === 1;

  return (
    <div className={classes.mainContainer}>
      <section ref={parentRef} className={classes.mainSection}>
        {/*  */}

        <PanelContainerInfoProvider
          value={{
            numOfPanelsCanFit,
            containerWidth,
            rowPanelIds: Object.keys(panelsData).map((key) => panelsData[key].map((panelData) => panelData.id)),
          }}
        >
          {isSinglePanelView && (
            <div
              style={{
                height: isHeaderShown && !isSamePanelEventShown ? '92px' : '0px',
                transition: 'all 0.2s ease',
                overflow: 'hidden',
                flex: 'none',
              }}
            >
              <MySettingsNew />
            </div>
          )}

          {/*  */}

          {Object.keys(panelsData).map((key: 'main' | 'header', i) => {
            const panelRow = panelsData[key] as IPanelData[];
            const isMainRow = key === 'main';

            const shouldFillHeight = panelRow.some((panelData) => {
              return panelData?.panelConfig?.MaxH === 'Fill';
            });

            return (
              <div
                key={i}
                style={{
                  display: isSinglePanelView && !isMainRow ? 'none' : 'flex',
                  flexGrow: shouldFillHeight ? 1 : 0,
                  gap: '8px',
                  flexShrink: shouldFillHeight ? undefined : 0,
                  flexBasis: shouldFillHeight ? undefined : 'auto',
                  overflow: isSamePanelEventShown && isSinglePanelView ? 'hidden' : undefined,
                }}
                className={`noScollBar ${classes.panelRowContainer}`}
              >
                {/* ROW */}

                {(() => {
                  const { staticPanels, dynamicPanels: nonStaticPanels } = filterActivePanels(panelRow, numOfPanelsCanFit);
                  return (
                    <>
                      {staticPanels.map((panelData, _) => {
                        return <Panel key={panelData.id} {...panelData} rowIndex={i} />;
                      })}

                      <div className={classes.nonStaticPanelColumnContainer}>
                        <div
                          style={{
                            gap: !isMainRow ? 0 : '8px',
                            borderRadius: !isMainRow || numOfPanelsCanFit < 2 ? '0px' : '8px 8px 0px 0px',
                            flexShrink: shouldFillHeight ? undefined : 0,
                            flexBasis: shouldFillHeight ? undefined : 'auto',
                            flexGrow: 1,
                            overflow: isSamePanelEventShown && isSinglePanelView ? 'hidden' : undefined,
                          }}
                          className={`noScollBar ${classes.panelRowContainer}`}
                          ref={isMainRow ? mainRef : undefined}
                          id="displayFrameworkPanelsContainer"
                        >
                          {nonStaticPanels.map((panelData, _) => {
                            return <Panel key={panelData.id} {...panelData} rowIndex={i} />;
                          })}
                        </div>

                        {/* Navigator */}

                        {isMainRow && numOfPanelsCanFit !== 1 && <PanelNavigator />}
                        {isMainRow && numOfPanelsCanFit === 1 && <SinglePanelNavigator />}
                      </div>
                    </>
                  );
                })()}
              </div>
            );
          })}
        </PanelContainerInfoProvider>
      </section>
    </div>
  );
}
