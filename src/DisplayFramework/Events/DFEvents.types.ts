import { IPanelId } from '../Core/DFCore.types';
import { ComponentMapKeys } from './Data/ComponentsMap';

export interface IComponentMap {
  [key: string]: React.FC<any>;
}

export interface IEventMapData {
  eventType?: IEventType;
  targetPanels: IEventTargetPanel[];
}

export type IEventType = 'samePanelEvent' | 'default' | undefined;

export interface IEventTargetPanel {
  targetPanelName: IPanelId | 'auto';
  targetComponentName: ComponentMapKeys | null;
  DRank?: number;
}

export interface IEventMap {
  [key: string]: IEventMapData;
}
