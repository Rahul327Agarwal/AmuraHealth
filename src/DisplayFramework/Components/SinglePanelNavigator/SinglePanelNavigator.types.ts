import { IPanelId } from '../../Core/DFCore.types';
import { IEventName } from '../../Events/Data/DisplayFrameworkEventsMap';

export type NavigatorEventType = 'navigation' | 'event';

export type MenuItem = {
  id: IPanelId;
  label?: string;
  icon?: React.ReactNode;
  isSelected?: boolean;
  disabled?: boolean;
  type?: NavigatorEventType;
  event?: IEventName;
};
