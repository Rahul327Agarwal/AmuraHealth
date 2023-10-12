import { IPanelId } from '../../../DisplayFramework/Core/DFCore.types';
import { ComponentMapKeys } from '../../../DisplayFramework/Events/Data/ComponentsMap';

export type IWindashViewState = 'default' | 'maximized' | 'minimized' | undefined;

export interface IWindow {
  id: string;
  icon?: React.ReactNode;
  title: string;
  componentName?: ComponentMapKeys;
  componentProps?: React.ComponentProps<any>;
  state?: IWindashViewState;
  minimizedComponent?: React.FC;
  minHeight?: number;
  isDynamic?: boolean;
  isDefault?: boolean;
}

export type INewWindow = Omit<IWindow, 'state' | 'isDynamic'>;

export interface IProps {
  currentViewingState: IPanelId;
}

export type IMainCardType = 'NameCard' | 'EventCard' | '';
