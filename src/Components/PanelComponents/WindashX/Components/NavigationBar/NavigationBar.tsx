import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import { DefaultPanelIcon } from '../../../../../DisplayFramework/Components/Icons/Icons';
import { useDeepLinkAction } from '../../../../../DisplayFramework/DeepLink/DeepLinkProcessor/DeepLinkEventManager';
import { usePanelContainerInfo } from '../../../../../DisplayFramework/DisplayFramework.hooks';
import { useHeaderShown } from '../../../../../DisplayFramework/State/Slices/DF';
import { setCurrentViewingDate, setSourcePanel } from '../../../../../DisplayFramework/State/Slices/DashboardSlice';
import { useFilteredWindashScreens, useRetreiveWindashAttribute, useWindashEvent } from '../../Windash.hooks';
import { IProps } from '../../Windash.types';
import { useResouceEvent } from '../ResourcePanelWindash/ResourcePanelWindash.events';
import { useStyles } from './NavigationBar.styles';

let navigationRef = React.createRef<SwiperCore>();
export const getNavigationRef = () => navigationRef;

let resourceNavigationRef = React.createRef<SwiperCore>();
export const getResourceNavigationRef = () => resourceNavigationRef;

const NavigationBar = (props: IProps) => {
  const screens = useFilteredWindashScreens(props.currentViewingState);
  const { retreivedWindowRef } = useRetreiveWindashAttribute(props.currentViewingState);
  const { classes } = useStyles({ numberOfScreens: screens.length });
  const [isHeaderShown] = useHeaderShown();
  const { numOfPanelsCanFit } = usePanelContainerInfo();
  const shouldShowHeader = numOfPanelsCanFit > 1 || isHeaderShown;

  const swiperRef = React.useRef<SwiperCore>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (swiperRef.current) {
      if (props.currentViewingState) {
        console.log('rendered mylist ');
        resourceNavigationRef = swiperRef;
      } else {
        console.log('rendered navigation ');

        navigationRef = swiperRef;
      }
    }
  }, [swiperRef.current]);

  const { triggerWindashEvent: triggerResouceEvent } = useResouceEvent();
  const { triggerWindashEvent } = useWindashEvent();

  const triggerEvent = props.currentViewingState ? triggerResouceEvent : triggerWindashEvent;

  useDeepLinkAction(
    'windashNavigation',
    (e, notifyComplete) => {
      triggerEvent(retreivedWindowRef, e.detail.data?.windowId, 'maximize');
      notifyComplete({
        afterMs: 1000,
      });
    },
    [retreivedWindowRef]
  );

  return (
    <div
      className={classes.headerWrap}
      style={{
        maxHeight: shouldShowHeader ? '100%' : '0',
        padding: shouldShowHeader ? undefined : '0 0 0 0',
        overflow: shouldShowHeader ? undefined : 'hidden',
        transition: 'all 0.1s ease',
      }}
    >
      <Swiper
        slidesPerView={4}
        modules={[Navigation]}
        className="mySwiper"
        spaceBetween={10}
        navigation={true}
        preventClicksPropagation
        threshold={10}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {screens.map((windashWindow) => {
          const classNames = [classes.slide];

          if (windashWindow.state === 'maximized') {
            classNames.push(classes.newActive);
          } else if (windashWindow.state === 'minimized') {
            classNames.push(classes.newActive);
          } else {
            classNames.push(classes.passive);
          }
          return (
            <SwiperSlide key={windashWindow.id}>
              <div
                className={classNames.join(' ')}
                style={{ height: '40px', width: '40px' }}
                onClick={() => {
                  if (windashWindow.componentName === 'SchedulerCalendar') {
                    dispatch(setSourcePanel(''));
                    dispatch(setCurrentViewingDate(new Date()));
                  }
                  windashWindow.state !== 'maximized' && triggerEvent(retreivedWindowRef, windashWindow.id, 'maximize');
                }}
              >
                <div className={classes.iconContainer} title={windashWindow.title}>
                  {windashWindow.icon ?? <DefaultPanelIcon />}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default NavigationBar;
