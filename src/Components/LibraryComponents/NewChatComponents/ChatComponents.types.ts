export interface voiceNote {
  audio: string;
  recordingMinutes: number;
  recordingSeconds: number;
}

export interface IMessage {
  senderId: string;
  messageId: string;
  message: string;
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
    | 'number'
    | 'CheckBox'
    | 'Token'
    | 'Toggle'
    | 'InputSlider'
    | 'RangeSlider'
    | 'InputWithUnits';
  unitOptions?: Array<any>;
}
