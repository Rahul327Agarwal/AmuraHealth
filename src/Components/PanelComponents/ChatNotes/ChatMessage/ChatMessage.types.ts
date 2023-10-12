/**
 * Props to be used in every Message Type Component
 */
export interface IChatMessageComponentProps {
  message: IChatMessage;
  isFirstMessage: boolean;
  isOurMessage: boolean;
}

export interface IChatMessage {
  senderId: string;
  messageId: string;
  message: string;
  privacy?: string;
  messageType?: string;
  messageWithHtml?: string;
  isAttachment?: boolean;
  attachmentURL?: string;
  attachmentFileSize?: number;
  isVoiceNote?: boolean;
  // voiceNote?: voiceNote;
  receivedTime?: number | string | Date;
  isReply?: boolean;
  repliedMessage?: IChatMessageReply;
  isActionable?: boolean;
  isVisible?: boolean;
  ContextType?: string;
  bluedot?: any;
  showBluedotOptions?: boolean;
  scheduleData?: ISchedule;
  schedulerUniqueId?: string;
  knowledgeBasePost?: IKnowledgeBasePost;
  survey: ISurvey;
  // promptFieldId?: string;
  // prompt?: string;
  // answer?: any;
  // options?: Array<any>;
  userId?: string;
  // tenantId?: string;
  // promptId?: string;
  // promptOrder?: any;
  // promptOptions?: any;
  // promptType?:
  //   | "input"
  //   | "Date"
  //   | "radio"
  //   | "CheckBox"
  //   | "number"
  //   | "Token"
  //   | "Toggle"
  //   | "InputSlider"
  //   | "RangeSlider"
  //   | "InputWithUnits";
  // unitOptions?: Array<any>;
  // promptResponseCode?: any;
  // promptResponse?: any;
}

export interface IKnowledgeBasePost {
  knowledgeBasePostId?: string;
  knowledgeBasePostTopics?: {
    description: { snippet: string };
    heading: { snippet: string };
    tenant: { snippet: string };
  };
}

export interface ISurvey {
  distributionId: string;
  currentResponse: any[];
  currentPostOrder: number;
  postType: string;
  postResponses: string[];
  postId: string;
  totalNumberOfPosts: number;
  surveyTitle: string;
  collectionId: string;
  postHeading: string;
}

export interface IChatMessageReply {
  senderId: string;
  message: string;
  messageId: string;
  privacy?: string;
  isAttachment?: boolean;
  attachmentURL?: string;
  attachmentFileSize?: number;
  isVoiceNote?: boolean;
  // voiceNote?: voiceNote;
  receivedTime?: number | string | Date;
  isReply?: boolean;
  repliedMessage?: IChatMessageReply;
  isActionable?: boolean;
  // prompt?: IPrompt;
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
export interface ICancellation {
  cancelledBy: string;
  reason: string;
  cancelledTime: string;
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
