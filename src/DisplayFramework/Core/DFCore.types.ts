// Panel

import { IPanelData } from '../Components/Panel/Panel.types';

const _panelIDMap = {
  C: 'Chat',
  D: 'Dash',
  H: 'Home',
  M: 'Menu',
  R: 'Resources',
  S: 'Summary',
  T: 'Team',
  W: 'Work',
} as const;

export type IPanelId = keyof typeof _panelIDMap;
export type IPanelName = (typeof _panelIDMap)[IPanelId];

// Grid

export interface IPanelConfig {
  panelId: IPanelId;
  panelName: IPanelName;
  DRank: number;
  L2R: number;
  MinW: 'Min' | number;
  MaxW: 'Min' | 'Fill' | 'User' | number;
  MinH: number;
  MaxH: 'Fill' | number;
  static?: boolean;
}

export interface IGridConfig {
  header: IPanelConfig[];
  main: IPanelConfig[];
}

export interface IPanelGrid {
  header?: IPanelData[];
  main?: IPanelData[];
}
