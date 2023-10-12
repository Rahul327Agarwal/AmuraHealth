import React, { useEffect, useMemo, useRef } from 'react';
import { IPanelId } from '../../../DisplayFramework/Core/DFCore.types';
import componentMap from '../../../DisplayFramework/Events/Data/ComponentsMap';
import CommonHeader from './Components/CommonHeader/CommonHeader';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import { useResouceEvent } from './Components/ResourcePanelWindash/ResourcePanelWindash.events';
import { WindashDefaultScreensIDs } from './Windash.config';
import { useScreenResize, useSinglePanelWindash } from './Windash.functions';
import { useRetreiveWindashAttribute, useWindashEvent } from './Windash.hooks';
import { useSetMainCardType } from './Windash.state';
import { useStyles } from './Windash.styles';
import { IWindow } from './Windash.types';

//

//Panel H windash Ref
let windashRef: React.RefObject<HTMLDivElement> | null = null;
export const getWindashRef = () => windashRef;
//Panel R windash Ref
let resourceWindashRef: React.RefObject<HTMLDivElement> | null = null;
export const getResourceWindashRef = () => resourceWindashRef;

export default function WindashX(props) {
  const { currentViewingState } = props;
  const parentRef = useRef<HTMLDivElement>(null);
  const { retreivedWindowRef, retreiveWindowScreens, retreiveWindowStateSetter, retriveActiveScreen } =
    useRetreiveWindashAttribute(props.currentViewingState);

  const { triggerWindashEvent: triggerResouceEvent } = useResouceEvent();
  const { triggerWindashEvent } = useWindashEvent();

  const triggerEvent = props.currentViewingState ? triggerResouceEvent : triggerWindashEvent;

  useScreenResize(retreivedWindowRef, retreiveWindowScreens, retreiveWindowStateSetter, triggerEvent);
  useSinglePanelWindash(retreiveWindowStateSetter);
  useEffect(() => {
    if (props.currentViewingState) {
      resourceWindashRef = parentRef;
    } else {
      console.log('rendered navigation ');
      windashRef = parentRef;
    }
  }, [parentRef]);

  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <NavigationBar currentViewingState={currentViewingState} />

      {/*  */}

      <div className={classes.windashWrapper} ref={props.currentViewingState ? resourceWindashRef : windashRef}>
        {retreiveWindowScreens
          .filter((screen) => screen.state !== undefined)
          .map((screen) => {
            return (
              <div
                key={screen.id}
                style={{
                  height: screen.state === 'maximized' ? '100%' : 'auto',
                  flexGrow: screen.state === 'maximized' ? 1 : undefined,
                  flexShrink: screen.state === 'maximized' ? 1 : 0,
                }}
                className={classes.windowWrapper}
              >
                <>
                  <CommonHeader
                    window={screen}
                    activeScreens={retriveActiveScreen}
                    minimizeEvent={() => {
                      triggerEvent(retreivedWindowRef, screen.id, 'minimize');
                    }}
                    maximizeEvent={() => {
                      triggerEvent(retreivedWindowRef, screen.id, 'maximize');
                    }}
                    closeEvent={() => {
                      triggerEvent(retreivedWindowRef, screen.id, 'close');
                    }}
                    maximizeDefault={() => {
                      triggerEvent(retreivedWindowRef, retreiveWindowScreens.find((value) => value.isDefault).id, 'maximize');
                    }}
                    windowRef={retreivedWindowRef}
                  />

                  <ComponentRender
                    screen={screen}
                    parentProps={props}
                    styles={classes}
                    currentViewingScreen={props.currentViewingState}
                  />

                  {screen.state === 'minimized' && screen.minimizedComponent && (
                    <>
                      <div className={classes.minimizedScreen}>
                        <screen.minimizedComponent {...props} />
                      </div>
                    </>
                  )}
                </>
              </div>
            );
          })}
      </div>
    </div>
  );
}

let lastClickId: string | undefined;
export const getLastWindashClickedId = () => lastClickId;

const ComponentRender = (props: { screen: IWindow; parentProps: any; styles: any; currentViewingScreen: IPanelId }) => {
  const setMainCardType = useSetMainCardType();
  const MemoCompo = useMemo(() => {
    return React.createElement(componentMap[props.screen.componentName], {
      ...props.parentProps,
      ...props.screen.componentProps,
    });
  }, [props.screen.componentName, props.screen.componentProps, props.parentProps]);
  const windashEvent = useWindashEvent();
  return (
    <div
      style={{ display: props.screen.state === 'maximized' ? '' : 'none' }}
      onClickCapture={(e) => {
        if (lastClickId !== props.screen.id && lastClickId !== undefined) {
          //

          if (!props.currentViewingScreen) {
            windashEvent.resetCardSelectionStates(props.screen.id as WindashDefaultScreensIDs);
            setMainCardType('');
            windashEvent.resetOtherPanels(true);
          }
        }
        if (!props.currentViewingScreen) {
          lastClickId = props.screen.id;
        }
      }}
      id={props.screen.id}
      className={props.styles.maximizedScreen}
      data-windash={props.screen.id}
    >
      {MemoCompo}
    </div>
  );
};
