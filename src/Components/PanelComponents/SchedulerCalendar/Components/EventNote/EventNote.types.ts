export interface IProps {
  title: string;
  time?: string;
  isRsvpAccept?: boolean;
  isRsvpDecline?: boolean;
  tenantIcon?: string;
  opacity: number;
  isAFB?: boolean;
  invisible?: boolean;
  eventHeight: number;
  beforeHeight: number;
  afterHeight: number;
  elementProps: React.HTMLAttributes<HTMLElement>;
  disabled?: boolean;
}

export interface IBookables {
  activityLength: string;
  activityType: string;
  afterActivity: string;
  beforeActivity: string;
  channel: string;
  lov_name: string;
  lov_name_id: string;
  meetingTime: string;
  status: string;
}
export interface IBookableIds {
  eventId: string;
  parentEventId: string;
}
export interface IEventNote {
  bookables?: IBookables;
  bookableIds?: Array<IBookableIds>;
  parentId?: string;
  isAFB?: boolean;
  userId: string;
  title: string;
  eventType: string;
  tenantName: string;
  eventDate: string;
  eventDateDuplicate?: string;
  toDate: string;
  fromTime: string;
  toTime: string;
  toTimeDuplicate?: string;
  fromTimeDuplicate?: string;
  isDuplicate?: boolean;
  duration: number;
  description: string;
  eventId?: string;
  slotId?: string;
  rsvp: any;
  organizer: string;
  organizerRoleId?: string;
  overlapCount?: number;
  bookableCounter?: number;
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
  callType: string;
  tenantParticipants: any[];
  visiblilty?: string;
}
export interface IGroupedEventNoteObject {
  [eventDate: string]: Array<IEventNote>;
}

export interface IGroupedEventNoteObjects {
  eventsObject: IGroupedEventNoteObject;
  bookablesObject: IGroupedEventNoteObject;
}
