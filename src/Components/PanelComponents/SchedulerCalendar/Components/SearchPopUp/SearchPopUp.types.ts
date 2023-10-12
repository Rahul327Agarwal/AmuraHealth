import { MouseEventHandler } from 'react';
import { IAction } from '../../SchedulerCalendar.types';
import { ISession } from '../../../../../Common/Common.types';

export interface IProps {
  seachedData?: any;
  setAction: (data: IAction) => void;
  setshowPopup: Function;
  sessions?: ISession;
  isReporteeCalendar?: boolean;
  thirdPartyUserId?: string;
}
export interface RowProps {
  searchData?: any;
  onEventClick: MouseEventHandler;
  roleName?: string;
}
