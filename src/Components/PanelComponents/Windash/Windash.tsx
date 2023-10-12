import React, { createRef, useEffect, useMemo, useRef, useState } from 'react';
import componentMap from '../../../DisplayFramework/Events/Data/ComponentsMap';
import { useDivHeight } from '../../../Utilities/Hooks';
import MinimizeCard from '../MinimizeCard/MinimizeCard';
import CommonHeader from './CommonHeader';
import NavigationBar from './NavigationBar/NavigationBar/NavigationBar';
import { useDFEvent } from '../../../DisplayFramework/Events/DFEvents';
import { resetSelectedClientObject, setCurrentViewingDate } from '../../../DisplayFramework/State/Slices/DashboardSlice';
import { useSetSelectedClient } from '../../../DisplayFramework/State/Slices/DisplayFramework';
import { useAppDispatch } from '../../../DisplayFramework/State/store';
import { initialHeights, SinglePanelNavigatorHight, TOP_BOTTOM_MARGIN, UpdatePanelHeights } from './Windash.function';
import { useStyles } from './Windash.styles';
import { IWindashProps } from './Windash.types';

export default function Windash(props: IWindashProps) {
  const { childEventTrigger, ComponentConfig: config = initialHeights } = props;
  const { height, ref } = useDivHeight();

  const sendEvent = useDFEvent();
  const dispatch = useAppDispatch();
  const setSelectedClient = useSetSelectedClient();

  const panel = {
    width: props.panel.width,
    height: `${height}px`,
  };

  const { classes } = useStyles(props);

  const [screen, setScreen] = useState([config.find((comp) => comp.isDefault).componentName]);

  const componentOrder = config.map((x) => x.componentName);
  const [view, setView] = useState(
    config.reduce(
      (acc, comp) => ({
        ...acc,
        [comp.componentName]: comp.isDefault ? 'MaximizeView' : 'PartView',
      }),
      {}
    )
  );

  const [newOpenedScreen, setNewOpenedScreen] = useState(config.find((comp) => comp.isDefault).componentName);

  const [componentsHeight, setComponentsHeight] = useState(
    config.reduce((acc, comp) => ({ ...acc, [comp.componentName]: comp.minHeight }), {})
  );

  const refOrder = useMemo(() => config.map(() => createRef<HTMLDivElement>()), [config]);

  const handlePanelComponentsHeights = (current_view, current_screen) => {
    UpdatePanelHeights(
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
    );
  };

  const onIconClick = (clickedscreen) => {
    if (screen.includes(clickedscreen)) return;
    if (clickedscreen === 'SchedulerCalendar') dispatch(setCurrentViewingDate(new Date()));
    let indexOfClickedScreen = componentOrder.indexOf(clickedscreen);
    let ScreenCopy = JSON.parse(JSON.stringify(screen));

    ScreenCopy.splice(indexOfClickedScreen, 0, clickedscreen);

    sendEvent('showingEmpty', {});
    dispatch(resetSelectedClientObject());
    setSelectedClient(null);

    setNewOpenedScreen(clickedscreen);
    setScreen(ScreenCopy);
  };

  const scrollBodyDivRef = useRef(null);

  useEffect(() => {
    if (screen.length === 1) {
      const full_height = Number(panel?.height?.replace('px', '')) - TOP_BOTTOM_MARGIN;
      setComponentsHeight({ ...componentsHeight, [screen[0]]: full_height });
    }

    scrollBodyDivRef.current.scrollTo({ top: refOrder[componentOrder.indexOf(newOpenedScreen)].current.offsetTop - 100 });
  }, [screen, panel?.height]);

  useEffect(() => {
    const height = config.reduce(
      (acc, comp) => ({ ...acc, [comp.componentName]: comp.minHeight - SinglePanelNavigatorHight }),
      {}
    );
    const full_height = Number(panel?.height?.replace('px', '')) - TOP_BOTTOM_MARGIN;
    setComponentsHeight({ ...height, [screen[0]]: full_height - SinglePanelNavigatorHight });
    scrollBodyDivRef.current.scrollTo({ top: refOrder[componentOrder.indexOf(newOpenedScreen)].current.offsetTop - 100 });
  }, [screen, panel?.height]);

  return (
    <div ref={ref} className={`${classes.rootContainer}`}>
      {config.length > 0 && (
        <NavigationBar
          config={config}
          view={view}
          onIconClick={(clickedscreen) => onIconClick(clickedscreen)}
          screen={screen}
          childEventTrigger={childEventTrigger}
        />
      )}
      <div ref={scrollBodyDivRef} className={classes.scrollDiv}>
        {screen.map((screenName) => {
          let ComponentToRender = componentMap[screenName];
          return view[screenName] !== 'MinimizeView' ? (
            <div
              ref={refOrder[componentOrder.indexOf(screenName)]}
              style={{
                // height: componentsHeight[screenName] + 'px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
              className={`${classes.wrapper} ${screenName}`}
            >
              <>
                <CommonHeader
                  view={view[screenName]}
                  setScreen={setScreen}
                  current_screen={screenName}
                  onClick={(viewFromClick, currentClickedScreen) =>
                    handlePanelComponentsHeights(viewFromClick, currentClickedScreen)
                  }
                  screen={screen}
                />
                <ComponentToRender {...props} />
              </>
            </div>
          ) : (
            <div ref={refOrder[componentOrder.indexOf(screenName)]}>
              <MinimizeCard
                current_screen={screenName}
                setScreen={setScreen}
                screen={screen}
                view={view[screenName]}
                handlePanelComponentsHeights={handlePanelComponentsHeights}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
