import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { FreeMode, Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IRootState } from '../../../../DisplayFramework/State/store';
import TabSwiper from '../../../LibraryComponents/GrabSwiper/GrabSwiper';
import Token from '../../../LibraryComponents/MUIToken/MUIToken';
import ThreeDotMenu from '../../../LibraryComponents/ThreeDotMenu/ThreeDotMenu';
import { TabStyled, TabsStyled, useStyles } from './ReporteesTab.styles';
import { IReporteesTabProps } from './ReporteesTab.types';
import TabToken from './TabToken';

const ReporteesTab = (props: IReporteesTabProps) => {
  const { selectedTab, reporteesTabs, onSelecteTab, onTabThreeDotChange, tabThreeDotOptions } = props;
  const tabId = selectedTab?.tabId ?? null;
  const { classes } = useStyles(props);
  const [activeTab, setActiveTab] = useState(tabId);
  const { progress, showProgress } = useSelector((state: IRootState) => state.Reportees);

  const tabPillRef: React.MutableRefObject<HTMLDivElement> = useRef();

  useEffect(() => {
    setActiveTab(tabId);
    const element = document.getElementById(`scrollable-tab-${tabId}`);
    element?.scrollIntoView({ behavior: 'smooth' });

    const tab = tabPillRef.current;
    tab && tab.scrollIntoView({ behavior: 'smooth' });
  }, [tabId]);

  return (
    <section className={classes.filterTabPanel}>
      <div className={classes.tabsBox}>
        <TabSwiper>
          {reporteesTabs.map((data) => (
            <div
              onClick={() => {
                if (showProgress) return;
                onSelecteTab(data);
              }}
              ref={data.tabId === tabId ? tabPillRef : undefined}
            >
              <TabStyled
                key={data.tabId}
                disableRipple
                disableFocusRipple
                tabIndex={-1}
                value={selectedTab?.tabId}
                label={
                  <TabToken
                    label={data.tabName}
                    active={Boolean(selectedTab?.tabId === data.tabId)}
                    progress={Boolean(selectedTab?.tabId === data.tabId) ? progress : 0}
                    isLoading={Boolean(selectedTab?.tabId === data.tabId) ? showProgress : false}
                  />
                }
              />
            </div>
          ))}
        </TabSwiper>
        {/* <Swiper
          slidesPerView={'auto'}
          freeMode={true}
          modules={[FreeMode, Mousewheel]}
          className="mySwiper"
          // loopFillGroupWithBlank={false}
          // loop={false}
          slidesOffsetAfter={0}
          mousewheel={{
            releaseOnEdges: true,
            // forceToAxis: true,
          }}
          // direction={'horizontal'}
          // edgeSwipeThreshold={20}
          // spaceBetween={20}
          centeredSlides={false}
        >
          {reporteesTabs.map((data) => (
            <SwiperSlide key={data.tabId}>
              <div onClick={() => onSelecteTab(data)}>
                <TabStyled
                  key={data.tabId}
                  disableRipple
                  disableFocusRipple
                  tabIndex={-1}
                  value={selectedTab?.tabId}
                  label={
                    <TabToken
                      label={data.tabName}
                      active={Boolean(selectedTab?.tabId === data.tabId)}
                      progress={Boolean(selectedTab?.tabId === data.tabId) ? progress : 0}
                      isLoading={Boolean(selectedTab?.tabId === data.tabId) ? showProgress : false}
                    />
                  }
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper> */}
      </div>
      {onTabThreeDotChange && tabThreeDotOptions ? (
        <ThreeDotMenu
          isDivider
          options={tabThreeDotOptions}
          handleClick={onTabThreeDotChange}
          customStyle={classes.threeDotMenuStyle}
        />
      ) : null}
    </section>
  );
};

export default ReporteesTab;
