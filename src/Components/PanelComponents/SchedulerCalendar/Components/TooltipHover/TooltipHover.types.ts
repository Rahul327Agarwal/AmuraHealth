import { ITooltip } from '../../CalendarView/CalendarView.types';

export interface IProps extends ITooltip {
  tentIcon: boolean;
  date: Date;
}
