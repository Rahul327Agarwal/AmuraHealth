import React from 'react';
import { ISession } from '../../../Common/Common.types';
import { ChildEventTriggerFn } from '../../../Utilities/WrapperFunctions';
import { IBookableIds } from '../SchedulerCalendar/Components/EventNote/EventNote.types';

export interface IProps {
  selectedClient: any;
  sessions: ISession;
  childEventTrigger: ChildEventTriggerFn;
  panel: any;
  eventsData?: any;
  isEditEvent?: any;
  setViewEventdetails?: any;
  isrepeatType?: any;
  viewType?: any;
  selectedDateTime?: Date;
  openInMyWork?: boolean;
  openInResource?: boolean;
}

export interface ISelectOption {
  value: string;
  label: string;
  roleId?: string;
  roleName?: string;
}

export interface actionScreen {
  screen: 'HOME' | 'ADD_PEOPLE' | 'ADD_ROLE';
  payload?: any;
}
export interface showDrawer {
  drawer: 'PEOPLE' | 'ROLE';
}
export interface IConfirmModal {
  open: boolean;
  screen?: 'DELETE' | 'ACCEPT' | 'DECLINE';
  payload?: any;
}

export type EventType = 'events' | 'slots' | 'OutOfOffice';

export interface IEditPermission {
  eventType: boolean;
  tenantName: boolean;
  eventDate: boolean;
  time: boolean;
  duration: boolean;
  repeatType: boolean;
  permissions: boolean;
}
export interface ITimeManagementProps extends IProps {
  setAction: (props: actionScreen) => void;
  addedPeoples?: Array<ISelectOption>;
  draggedDuration?: number;
}
export interface IAddPeopleProps extends IProps {
  setAction: (props: actionScreen) => void;
  tenantParticipants: Array<any>;
}
export interface IAddRoleProps {
  setAction: (props: actionScreen) => void;
  data: any;
}

export interface IEventDetailsProps {
  eventsData: IEventData;
  handleBack: () => void;
  sessions: any;
  childEventTrigger: ChildEventTriggerFn;
  viewType: string;
  openInMyWork?: boolean;
  openInResource?: boolean;
  panel?: any;
  setEvents: Function;
  isReporteeEvent?: boolean;
  setViewType?: Function;
  setViewingDate?: Function;
}
////////////////////////////////

export type IEventData = {
  userId: string;
  organizer: string;
  organizerRoleId?: string;
  title: string;
  tenantName: string;
  tenantId: string;
  eventDate: string | Date;
  toDate: string | Date;
  fromTime: string | Date;
  toTime: string | Date;
  duration: number;
  timeZone: string;
  repeatType: string;
  reccurance: IReccurance;
  visibility: string;
  eventType: string;
  notify: string[];
  tenantParticipants: ITenantParticipantsItem[];
  externalParticipants: any[];
  isExcludeMeFromEvent: boolean;
  status: string;
  callType: string;
  others: string;
  description: string;
  permissons: any[];
  createdOn: string | Date;
  parentId: string;
  eventId: string;
  updatedBy: string;
  rsvp: any;
  acceptedParticipants: any[];

  maximumUses?: string;
  allowedMaximumDays?: number;
  useWorkingTime?: boolean;
  roleId?: string;
  cannotBookBefore?: string;
  bookables?: any;
  createdAt?: string;
  updatedAt?: string;
  slotId?: string;
  bookableCounter?: number;
  isAFB?: boolean;
  overlapCount?: number;
  bookableIds?: Array<IBookableIds>;
  afbData?: {
    Before: {
      fromTime: string;
      toTime: string;
      duration: number;
    };
    After: {
      fromTime: string;
      toTime: string;
      duration: number;
    };
  };
};
// export type IBookables = {
//   status: string
//   activityType: string
//   lov_name_id: string
//   activityLength: string
//   lov_name: string
//   meetingTime: string
//   channel: string
//   beforeActivity: string
//   afterActivity: string
// }
export type IReccurance = {
  ends: IEnds;
  endsType: string;
  startDate: string;
  repeatsEvery: number;
  repeatType: string;
  weekDays?: any;
};

export type ITenantParticipantsItem = {
  userId: string;
  roleId: string;
};

////////////////////////////////
export interface IEventsState {
  isExcludeMeFromEvent: boolean;
  visibility: string;
  status: string;
  callType: string;
  others: string;
  description: string;
  permissons: Array<string>;
}
export interface IOfflineState {
  startDate: Date;
  startTime: string;
  EndTime: string;
  endDate: Date;
  timeZone: string;
  repeatType: boolean;
  description: string;
}
export interface IEventProps extends ITimeManagementProps {
  eventsState: IEventsState;
  setEventsState: Function;
  errors: IErrorObject;
  notify: Array<any>;
  setNotify: Function;
  tenantParticipants: Array<any>;
  setTenantParticipants: Function;
  actualEventData: any;
  eventOrganizer?: any;
  currentUser: ISelectOption;
  editPermission: IEditPermission;
}

export interface ISlotsProps {
  errors: IErrorObject;
  slotsState: ISlotsState;
  setSlotsState: Function;
  bookableOptions: Array<ISelectOption>;
  bookableObject: any;
  roles: Array<any>;
}
export interface ISlotsState {
  maximumUses: string;
  visibility: string;
  allowedMaximumDays: string;
  useWorkingTime: boolean;
  roleId: string | '';
  status: string;
  activityType: string;
  cannotBookBefore: string;
}

export interface IBookables {
  lov_name_id: string;
  lov_name: string;
  channel: string;
  activityLength: string;
  beforeActivity: string;
  afterActivity: string;
  meetingTime: string;
  activityType?: string;
  status?: string;
}

export interface IOutOfOfficeState {
  decline: boolean;
  meetingType: string;
  visibility: string;
}

export interface IDateState {
  eventDate: Date;
  time: string;
  duration: string;
  timeZone: string;
}

export interface IErrorObject {
  title: string;
  tenantName: string;
  eventDate: string;
  time: string;
  duration: string;
  timeZone: string;
  activityType: string;
  visibility: string;
  permissons: string;
  status: string;
  callType: string;
  roleId: string;
  allowedMaximumDays: string;
  maximumUses: string;
  bookables?: any;
}

export interface WithIconContainerProps {
  Icon?: React.ReactElement;
  Label?: any;
  children?: any;
  rowGap?: string;
  columnGap?: string;
  alignStart?: boolean;
  alignEnd?: boolean;
  isHidden?: boolean;
  iconBottomMargin?: string;
  iconStyle?: string;
}

export interface CustomRepeatDrawerProps {
  setCustomRepeat: Function;
  eventdateforMonthOcc: any;
  open: boolean;
  setOpen: (data: boolean) => void;
}

export interface CustomDurationProps {
  setCustomDuration: Function;
  open: boolean;
  setOpen: (data: boolean) => void;
}
export interface IEnds {
  never?: boolean;
  on?: Date;
  afterOccurrences?: number;
}

export type RepeatType = 'days' | 'weeks';
export type EndsType = 'on' | 'on' | 'afterOccurrences';
export interface ICustomRepeat {
  repeatsEvery: string;
  repeatType: RepeatType;
  weekDaysName: Array<string>;
  ends: IEnds;
  endsType: EndsType;
  startDate: Date;
  monthsOccurance: any;
  key: string;
}

export interface DaysCheckBoxGroupProps {
  onChange: React.ChangeEventHandler;
  values: Array<string>;
}

export interface AddNoticitionDrawerProps {
  open: boolean;
  setOpen: (data: boolean) => void;
  onNotificationChange: Function;
  notification: Array<string>;
}

export interface ICustomNotifyState {
  time: string;
  unit: string;
}

export interface IUserRolesDataWithTenat {
  tenantId: string;
  roleIds: Array<string>;
}
