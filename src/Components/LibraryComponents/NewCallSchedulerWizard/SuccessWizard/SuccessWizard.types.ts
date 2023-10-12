export interface IProps {
  messageData?: any;
  description?: any;
  slotTime?: any;
  timeZoneValue?: any;
  setModifiedMessageData?: any;
  modifiedMessageData?: any;
}

export interface ICancelBooking {
  bookableIds: IBookableIds[];
  parentId: string;
  eventId: string;
  patientId: string;
  tenantId: string;
  messageData: any;
}

export interface IBookableIds {
  parentEventId: string;
  eventId: string;
}
