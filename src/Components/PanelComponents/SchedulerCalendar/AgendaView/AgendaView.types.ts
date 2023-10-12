import { ChildEventTriggerFn } from '../../../../Utilities/WrapperFunctions';
import { IEventNote } from '../Components/EventNote/EventNote.types';
import { IAction } from '../SchedulerCalendar.types';

export interface IProps {
  date: Date;
  events: Array<IEventNote>;
  sessions: any;
  setAction: (data: IAction) => void;
  childEventTrigger?: ChildEventTriggerFn;
  isReporteeCalendar?: boolean;
  thirdPartyUserId?: string;
}
