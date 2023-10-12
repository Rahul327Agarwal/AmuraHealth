import { IEventNote } from './Components/EventNote/EventNote.types';

export interface IProps {
  events: Array<IEventNote>;
  panel: any;
  sessions: any;
  patientId?: string;
  selectedClient?: any;
  registerEvent?: any;
  unRegisterEvent?: any;
  childEventTrigger?: any;
  eventViewDate?: any;
  eventviewType?: any;

  // the userId can be used to fetch all events of tha tspecific user
  thirdPartyUserId?: string;
  // the follwing keys can be used to narrow down on which events to fetch for third party calenderss
  organizerRoleId?: string;
  tenantparticipantsRoleId?: string;
}
export interface IAction {
  screen: 'CALENDAR' | 'FILTER' | 'EVENT_DETAILS' | 'SEARCH_VIEW';
  payload?: any;
  previousScreen?: any;
}

export type TViewType = 'Agenda' | 'OneDay' | 'ThreeDay' | 'sevenDay' | 'Month';

export interface IGroupedEvent {
  [eventDate: string]: Array<IEventNote>;
}

export interface IGroupedEventArray {
  eventDate: string;
  events: Array<IEventNote>;
}

export interface FilterParameters {
  fromTime?: any;
  toTime?: any;
  sessions: any;
  callType?: string;
  searchedString?: string;
  participants?: Array<string>;
  userId?: string;
  organizerRoleId?: string;
  tenantparticipantsRoleId?: string;
}