import React from 'react';
import { IPanelConfig, IPanelId, IPanelName } from '../../Core/DFCore.types';
import { DisplayFrameworkEventDetails } from '../../Events/DFEvents';

export type IStyledProps = {
  width: number | string;
  shouldRoundCorners: boolean;
};

export type IPanelData = {
  id: IPanelId;
  name: IPanelName;
  initialPanelConfig: IPanelConfig;
  panelConfig: ICurrentPanelConfig;
  isActive?: boolean;
  isStatic?: boolean;
  panelComponentData?: IPanelComponentData[];
  row: 'header' | 'main';
};

//
export interface ICurrentPanelConfig extends IPanelConfig {
  resizedSnapSize?: number;
}

export interface IProps extends IPanelData {
  rowIndex?: number;
}

export interface IPanelComponentData {
  componentName?: string;
  component?: (props: any) => JSX.Element;
  componentProps?: React.ComponentProps<any>;
  eventDetails?: DisplayFrameworkEventDetails;
}
