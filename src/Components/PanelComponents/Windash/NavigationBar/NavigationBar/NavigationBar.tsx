// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
// import PersonAddIcon from "@material-ui/icons/PersonAdd";
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import { usePanelContainerInfo } from '../../../../../DisplayFramework/DisplayFramework.hooks';
import { useHeaderShown } from '../../../../../DisplayFramework/State/Slices/DF';
import { IRootState } from '../../../../../DisplayFramework/State/store';
import { doesAnyRoleHaveClickAccess } from '../../../../../Utilities/AccessPermissions';
import { getComponentName, getIcons } from '../../Windash.function';
import { useStyles } from './NavigationBar.styles';
import { IProps } from './NavigationBar.types';

const NavigationBar = (props: IProps) => {
  const { onIconClick, screen, view, config } = props;
  const { classes } = useStyles();
  const [isHeaderShown] = useHeaderShown();
  const { numOfPanelsCanFit } = usePanelContainerInfo();
  const shouldShowHeader = numOfPanelsCanFit > 1 || isHeaderShown;
  const loggedInUserInformation = useSelector((state: IRootState) => state.displayFrameWork.loggedInUserInformation);
  const accessPermissions = useSelector((state: IRootState) => state.accessPermissions.accessPermissions);

  const hasAccessToSeeStaffList = doesAnyRoleHaveClickAccess(
    loggedInUserInformation.allRoles ?? [],
    accessPermissions,
    'RMPanel',
    'RMPanel.1'
  );
  const hasAccessToSeeAssignGC = doesAnyRoleHaveClickAccess(
    loggedInUserInformation.allRoles ?? [],
    accessPermissions,
    'RMPanel',
    'RMPanel.2'
  );

  let panelOptions = config.filter((panel) => {
    if (panel.componentName === 'StaffListView') {
      return hasAccessToSeeStaffList;
    }
    if (panel.componentName === 'ReferRegisterPanel') {
      return hasAccessToSeeAssignGC;
    }
    return true;
  });

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
      >
        {panelOptions.map((ComponentDetails) => (
          <SwiperSlide>
            <div
              className={`${classes.slide} ${
                screen.includes(ComponentDetails.componentName)
                  ? view[ComponentDetails.componentName] === 'MinimizeView'
                    ? screen[screen.length - 1] === ComponentDetails.componentName
                      ? classes.activeCircle
                      : classes.semiactiveCircle
                    : screen[screen.length - 1] === ComponentDetails.componentName
                    ? classes.active
                    : classes.semiactive
                  : classes.passive
              }`}
              onClick={() => {
                onIconClick(ComponentDetails.componentName);
              }}
            >
              <div title={getComponentName[ComponentDetails.componentName]}>{getIcons[ComponentDetails.componentName]}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NavigationBar;
