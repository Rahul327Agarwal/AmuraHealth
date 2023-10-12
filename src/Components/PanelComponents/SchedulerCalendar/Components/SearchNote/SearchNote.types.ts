import { ISession } from '../../../../../Common/Common.types';
import { IAction } from '../../SchedulerCalendar.types';
import { IEventNote } from '../EventNote/EventNote.types';

export interface IProps {
  eventDate: string | number;
  events: Array<IEventNote>;
  setAction: (data: IAction) => void;
  sessions: ISession;
  isReporteeCalendar?: boolean;
  thirdPartyUserId?: string;
}
