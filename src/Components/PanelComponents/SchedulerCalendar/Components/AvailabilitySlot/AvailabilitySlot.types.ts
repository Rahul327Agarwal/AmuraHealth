import { TViewType } from '../../SchedulerCalendar.types';

export interface IProps {
  title: string;
  time: string;
  isRsvpAccept?: boolean;
  isRsvpDecline?: boolean;
  opacity: number;
  tenantIcon?: any;
  viewType: TViewType;
  elementProps: React.HTMLAttributes<HTMLElement>;
  disabled?: boolean;
}
