import { TViewType } from '../../SchedulerCalendar.types';

export interface IProps {
  onChange: (data: TViewType) => void;
  value: TViewType;
}
