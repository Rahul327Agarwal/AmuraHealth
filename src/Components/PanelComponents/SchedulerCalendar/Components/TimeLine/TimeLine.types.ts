import { TViewType } from '../../SchedulerCalendar.types';

export interface IProps {
  date: Date;
  viewType: TViewType;
  magnifyCounter: number;
  elementProps?: React.HTMLAttributes<HTMLElement>;
}
