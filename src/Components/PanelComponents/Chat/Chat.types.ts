export interface IProps {
  injectComponet: any;
  patientId: string;
  selectedClient: any;
  sessions: any;
  registerEvent: any;
  unRegisterEvent: any;
  key: any;
}
export interface IMessage {
  MessageId: string;
  ReceivedTime: number;
  SenderId: string;
  Message: MessageStructue;
  IsAttachment: boolean;
  AttachmentURL: string;
  Members: Array<any>;
  ChannelId: string;
}

export interface MessageStructue {
  PatientId: string;
  ChannelId: string;
  SenderId: string;
  TimeStamp: string | number;
  Initiator: string;
  VisibleTo: Array<string>;
  ClientType: string;
  MessageType: string;
  ContextType: string;
  Message: string;
  Question?: string;
  Options?: Array<any>;
  CalloutTo?: string;
  MultiChoiceOptions?: Array<any>;
  SelectedOption?: any;
  Range?: any;
  ReplyToMessageId?: string;
  ReplyToMessage?: any;
  IsReply?: boolean;
}

export interface IChat {
  ChannelId: string;
  noMoreMessages: boolean;
  Messages: Array<IMessage>;
  lastMessage: any;
  PatientId: string;
  unreadMessagesCount: number;
  unreadMessageTimestamp: number;
}

export interface IChatProps {
  selectedClient: any;
  sessions: any;
  registerEvent: Function;
  unRegisterEvent: Function;
}

export interface IFormattedMessage {
  position: string;
  type: string;
  text: any;
  date: number;
  sender: string;
  senderId: string;
  isAttachment: boolean;
  attachmentURL: string;
  messageId: string;
}

export interface IComponentMessage {
  MessageId: string;
  Sender: string;
  CalloutTo: string;
  SenderId: string;
  ReceivedTime: number;
  IsFirstMessage: boolean;
  ShowAvatar: boolean;
  DateChanged: boolean;
  IsSimpleText: boolean;
  Message: any;
  Options: Array<any>;
  ContextType: string;
  Visibility: boolean;
  ShowLoadMore: boolean;
  SentByLoggedInUser: boolean;
  SelectedOption: any;
  MessageType: string;
  UnreadMessage: boolean;
  IsAttachment: boolean;
  AttachmentURL: string;
  IsReply: boolean;
  ReplyToMessage: any;
  ReplyToMessageId: string;
}

export const emptyComponentMessage: IComponentMessage = {
  MessageId: '',
  Sender: '',
  SenderId: '',
  CalloutTo: '',
  ReceivedTime: new Date().getTime(),
  IsFirstMessage: false,
  ShowAvatar: false,
  DateChanged: false,
  IsSimpleText: false,
  Message: '',
  Options: [],
  ContextType: '@CHAT',
  MessageType: 'FORMATTED_TEXT',
  Visibility: false,
  ShowLoadMore: false,
  SentByLoggedInUser: false,
  SelectedOption: null,
  UnreadMessage: false,
  IsAttachment: false,
  AttachmentURL: '',
  IsReply: false,
  ReplyToMessage: null,
  ReplyToMessageId: '',
};

export const initialMessageObject = {
  ChannelId: '',
  PatientId: '',
  noMoreMessages: true,
  Messages: [],
  lastMessage: {},
  unreadMessagesCount: 0,
  unreadMessageTimestamp: 0,
};
export class globalChannelVariables {
  public static channelsMessagesList: any = {
    ChannelId: '',
    PatientId: '',
    noMoreMessages: true,
    Messages: [],
    lastMessage: {},
    unreadMessagesCount: 0,
    unreadMessageTimestamp: 0,
  };
  public static newMessageIds: [];
  public static socketConnection: boolean = false;
  public static channelId: string = '';
  public static hasNext: boolean = true;
  public static currentChannel = '';
  public static usersList = [];
  public static chatUserId = '';
  public static selectedClient: any = {};
  public static usersInChannel: any = [];
  public static patientId = '';
  public static webSocketInstanceId: number = 0;
  public static reconnectinterval: any;
  public static checkNetworkInterval: any;
  public static pingInterval: any;
  public static isUsersListCalled: boolean = false;
  public static loading: boolean = false;
  public static pageNumber: number = -1;
  public static lastMessageInChannels: any = {};
  public static markedMessage: Array<any> = [];
  public static isNewMessageFromAnotherUser: boolean = false;
  public static scrollToBottom: boolean = false;
  public static loadedMoreMessages: boolean = false;
  public static initialLoadMessages: boolean = false;
  public resetAllVariables() {
    globalChannelVariables.channelId = '';
    globalChannelVariables.hasNext = true;
    globalChannelVariables.currentChannel = '';
    globalChannelVariables.selectedClient = {};
    globalChannelVariables.usersInChannel = [];
    globalChannelVariables.patientId = '';
    globalChannelVariables.loading = false;
    globalChannelVariables.pageNumber = -1;
    globalChannelVariables.markedMessage = [];
  }
}

export const chatCommands = {
  user: [],
  health: [{ id: 'team', name: 'team' }],
  guidance_counselor: [{ id: 'team', name: 'team' }],
};

export const userContexts = {
  user: ['@SURVEY'],
  health: ['@team', '@me'],
  guidance_counselor: ['@team', '@me'],
};
