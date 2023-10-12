import React from "react";

export interface resizeWrapperProps {
  lowerComponentClient: any;
  lowerComponent: any;
  upperComponentClient: any;
  upperComponent: any;
  original_mouse_y: number;
}

export interface CommonHeaderProps {
  onClick: Function;
  current_screen: string;
  setScreen: Function;
  screen: Array<string>;
  view: string;
}

export interface GetComponent extends IWindashProps {
  componentName: string;
  screen: Array<string>;
  setScreen: Function;
  panel: any;
  childEventTrigger: any;
  view: any;
  setView: Function;
  // newOpenedSCreen: string;
  setComponentsHeight: Function;
  componentsHeight: any;
  handlePanelComponentsHeights: Function;
}

export interface DragAreaProps {
  setComponentsHeight: Function;
  dragRef: React.RefObject<HTMLInputElement>;
  lower: string;
  dragName: string;
  screen: Array<String>;
}

export interface UpdatePanelHeights {
  lowerComponentClient: any;
  lowerComponent: any;
  upperComponentClient: any;
  upperComponent: any;
  original_mouse_y: number;
  upperClassName: string;
  lowerClassName: string;
  setComponentsHeight: Function;
}

export interface IProps {
  setAction: Function;
  selectedClient: any;
  sessions: any;
  user: any;
  childEventTrigger: Function;
  parameter: any;
  registerEvent: any;
  unRegisterEvent: any;
  notifyEvent: any;
  selectedTenant: any;
  panel: any;
  role: string;
  isReporteesMyList?: boolean;
  reporteesData?: {
    staffName: string;
    staffId: string;
    roleId: string;
    reportingStaffId: string;
    reportingRoleId: string;
    handleBackToReportees: () => void;
  };
}

export interface IWindashProps extends IProps {
  setSelectedCard: Function;
  tabs?: Array<string>;
  nameCardSelected: Array<any>;
  setListCards: any;
  setMyListfilters?: Function;
  showFilterBadge: boolean;
  isLoading: boolean;
  activeTab: any;
  setActiveTab: Function;
  setBlueDotsScreenViewData?: Function;
  myListGroups?: any;
  AutoSizerHeight?: number;
  ComponentConfig?: Array<IComponentConfig>;
}

export interface IComponentConfig {
  componentName: string;
  minHeight: number;
  isDefault: boolean;
}
