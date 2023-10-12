import { MouseEventHandler } from 'react';

export interface IProps {
  title: string;
  time: string;
  isRsvpAccept?: boolean;
  isRsvpDecline?: boolean;
  isAFB?: boolean;
  beforeHeight: number;
  afterHeight: number;
  onClick: MouseEventHandler;
  roleName?: string;
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
  toDate: string;
  fromTime: string;
  toTime: string;
  duration: number;
  description: string;
  eventId: string;
  rsvp: any;
  organizer: string;
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
}
export interface IGroupedEventNoteObject {
  [eventDate: string]: Array<IEventNote>;
}

export interface IGroupedEventNoteObjects {
  eventsObject: IGroupedEventNoteObject;
  bookablesObject: IGroupedEventNoteObject;
}
