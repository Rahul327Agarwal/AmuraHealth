import { ChildEventTriggerFn } from '../../../../Utilities/WrapperFunctions';
import { IEventNote } from '../Components/EventNote/EventNote.types';
import { IAction, TViewType } from '../SchedulerCalendar.types';

export interface IProps {
  date: Date;
  viewType: TViewType;
  events: Array<IEventNote>;
  magnifyCounter: number;
  setMagnifyCounter: Function;
  setAction: (data: IAction) => void;
  sessions: any;
  eventOpacity: number;
  childEventTrigger?: ChildEventTriggerFn;
  isReporteeCalendar?: boolean;
  thirdPartyUserId?: string;
}

export interface IMagnifyProps {
  handleClickOnPlus: Function;
  handleClickOnMinus: Function;
  disablePlus: boolean;
  disableMinus: boolean;
  viewProps: IProps;
}

export interface ITooltip {
  open: boolean;
  element: HTMLElement | null;
  title: string;
  time: string;
  meetingWith?: string;
  dateString?: string;
}
