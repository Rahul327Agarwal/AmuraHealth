export interface voiceNote {
  audio: string;
  recordingMinutes: number;
  recordingSeconds: number;
}

export interface IMessage {
  senderId: string;
  messageId: string;
  message: string;
  messageWithHtml?: string;
  privacy?: string;
  messageType?: string;
  isAttachment?: boolean;
  attachmentURL?: string;
  attachmentFileSize?: number;
  isVoiceNote?: boolean;
  voiceNote?: voiceNote;
  receivedTime?: number | string | Date;
  isReply?: boolean;
  repliedMessage?: IReply;
  isActionable?: boolean;
  isVisible?: boolean;
  ContextType?: string;
  promptFieldId?: string;
  prompt?: string;
  answer?: any;
  options?: Array<any>;
  userId?: string;
  tenantId?: string;
  promptId?: string;
  promptOrder?: any;
  promptOptions?: any;
  promptType?:
    | 'input'
    | 'Date'
    | 'radio'
    | 'Time'
    | 'CheckBox'
    | 'number'
    | 'Token'
    | 'Toggle'
    | 'InputSlider'
    | 'RangeSlider'
    | 'InputWithUnits';
  unitOptions?: Array<any>;
  promptResponseCode?: any;
  promptResponse?: any;
  scheduleData?: ISchedule;
  postPayload?: any;
  isStar?: boolean;
  delivered?: boolean;
  notSent?: boolean;
  bluedot?: any;
  schedulerUniqueId?: string;
  isBooked?: boolean;
  showBluedotOptions?:boolean
  program?: IProgram;
}

export interface ISchedule {
  channel?: string;
  duration?: string;
  slots?: {
    [key: string]: string;
  };
  bookableIds?: Array<string>;
  participants?: Array<any>;
  fromTime?: string;
  contextType: string;
  toTime?: string;
  title?: string;
  organizer?: string;
  description?: string;
  status?: string;
  reason?: string;
  messageId?: string;
  parentId?: string;
  eventId?: string;
  callScheduledMessageId?: string;
  state: 'BOOKED' | 'CANCELLED' | 'RESCHEDULED' | 'CANCELLED_EVENT';
  cancellation?: ICancellation;
  roleIds?: string[];
  timeUnits?: string;
  participantsQuery?: Array<any>;
  patientId?: string;
  bookables?: IBookablesForSchedule;
  organizerRoleId?: string;
}
export interface IBookablesForSchedule {
  status?: string;
  activityType?: string;
  lov_name_id?: string;
  activityLength?: string;
  lov_name?: string;
  meetingTime?: string;
  channel?: string;
  afterActivity?: string;
  beforeActivity?: string;
}

export interface ICancellation {
  cancelledBy: string;
  reason: string;
  cancelledTime: string;
}

export interface IProgram {
 startTime?: string;
 endTime?: string;
 pauseTime?: string;
 ACTION?: string;
 durationInDays?:number;
 daysLeft?: number
}
export interface IReply {
  senderId: string;
  message: string;
  messageId: string;
  privacy?: string;
  isAttachment?: boolean;
  attachmentURL?: string;
  attachmentFileSize?: number;
  isVoiceNote?: boolean;
  voiceNote?: voiceNote;
  receivedTime?: number | string | Date;
  isReply?: boolean;
  repliedMessage?: IReply;
  isActionable?: boolean;
  prompt?: IPrompt;
}

export interface ISendMessage extends IMessage {
  userId: string;
  EventName: string;
  tenantId: string;
  ContextType: string;
  operation?: string;
  loginUserId?: string;
  scheduleData?: any;
  collectionPayload?: any;
  action?: any;
}

export interface IPrompt {
  promptFieldId?: string;
  prompt: string;
  answer: any;
  options: Array<any>;
  promptType:
    | 'input'
    | 'Date'
    | 'radio'
    | 'Time'
    | 'number'
    | 'CheckBox'
    | 'Token'
    | 'Toggle'
    | 'InputSlider'
    | 'RangeSlider'
    | 'InputWithUnits';
  unitOptions?: Array<any>;
}
