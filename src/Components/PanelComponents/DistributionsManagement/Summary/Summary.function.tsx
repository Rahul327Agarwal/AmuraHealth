import moment from 'moment';
import {
  AttachmentIcon,
  AudioIcon,
  CalendarChatIcon,
  CalendarIcon,
  ConsumeChatIcon,
  DescriptionChatIcon,
  DescriptionIcon,
  DesktopChatIcon,
  DesktopIcon,
  HeadingChatIcon,
  HeadingIcon,
  ImageIcon,
  MultiSelectPost,
  PeopleIcon,
  PostsIcon,
  ResponseIcon,
  SelectPost,
  TenantChatIcon,
  TenantIcon,
  TextFieldPost,
  TimeChatIcon,
  TimeIcon,
  UserIcon,
  UserResponseChatIcon,
  VideoIcon,
} from '../DistributionManagement.svg';

export const SNIPPETS_ID = {
  TITLE: 'title',
  CLASSNAME: 'collectionName',
  DESCRIPTON: 'description',
  WELCOME: 'welcomeMessage',
  THANKYOU: 'thankYouMessage',
  HEADING: 'heading',
  THUMBNAIL: 'thumbnail',
  ATTACHMENT: 'attachment',
  RESPONSE: 'response',
  DIS_CHANNEL: 'distributionChannel',
  CONSUMERS: 'consumers',
  VIEW_ACCESS: 'whoCanSeeResponse',
  TO_BE_SHARED: 'responsesToBeShared',
  SEE_RESPONSE: 'whenUserSeeResponse',
  STARTING_TIME: 'startingTime',
  CLOSING_TIME: 'closingTime',
  DIS_CANDENCE: 'distributionCadence',
  TENANT: 'tenant',
  VIDEO: 'video',
  IMAGE: 'image',
  AUDIO: 'audio',
  FILE: 'file',
  DEFAULT: 'default',
  TEXTFIELD: 'textField',
  SELECT: 'select',
  MUTISELECT: 'multiSelect',
};

export const CHAT_SELECT_ID = {
  FOR_VOTERS: 'For voters',
  FOR_ANY_AUTH_PERSONNEL: 'For any authorized personnel',
  PRE_DETERMINED_TIME: 'At a pre-determined time',
  COMPLETION_OF_ACTIVITY: 'Upon completion of some activity',
  CERTAIN_TIME_PASSES: 'Certain amount of time passes',
  PRE_DETERMINED_TIME_REACHED: 'A pre-defined time has reached',
  CERTAIN_NO_VOTED: 'Certain number of people have voted',
  CERTAIN_PERCENTAGE_POLLED: 'Certain percentage of the named users have polled',
  TIME_INTERVAL: 'A pre-set time interval',
  SPECIFIC_DATE_TIME: 'At a specific date, day, times',
  SPECIFIC_OFFSET_EVENT: 'At a specific offset from an event',
  FOR_PARTICIPANTS: 'For participants',
};

export const DEFAULT_SNIPPETS = {
  [SNIPPETS_ID.TITLE]: {
    heading: 'Title',
    icon: <HeadingIcon />,
    iconChat: <HeadingChatIcon />,
    headerText: 'Enter title',
    snippet: '+ Add a title',
    placeHolderText: 'Type title',
  },
  [SNIPPETS_ID.CLASSNAME]: {
    heading: 'Collection name',
    icon: <HeadingIcon />,
    iconChat: <HeadingChatIcon />,

    headerText: 'Enter title',
    snippet: '+ Add a title',
    placeHolderText: 'Type title',
  },
  [SNIPPETS_ID.HEADING]: {
    heading: 'Heading',
    icon: <HeadingIcon />,
    iconChat: <HeadingChatIcon />,

    headerText: 'Enter heading',
    snippet: '+ Add a heading',
    placeHolderText: 'Type title',
  },
  [SNIPPETS_ID.DESCRIPTON]: {
    heading: 'Description',
    icon: <DescriptionIcon />,
    iconChat: <DescriptionChatIcon />,

    headerText: 'Enter description',
    snippet: '+ Add a description',
    placeHolderText: 'Enter description',
  },
  [SNIPPETS_ID.WELCOME]: {
    heading: 'Welcome message',
    icon: <DescriptionIcon />,
    iconChat: <DescriptionChatIcon />,

    headerText: 'Enter welcome message',
    snippet: '+ Add a welcome message',
    placeHolderText: 'Enter welcome message',
  },
  [SNIPPETS_ID.THANKYOU]: {
    heading: 'Thank you message',
    icon: <DescriptionIcon />,
    iconChat: <DescriptionChatIcon />,

    headerText: 'Enter Thank you message',
    snippet: '+ Add a Thank you message',
    placeHolderText: 'Enter Thank you message',
  },
  [SNIPPETS_ID.THUMBNAIL]: {
    heading: 'Thumbnail image',
    icon: <ImageIcon />,
    iconChat: <ImageIcon />,

    headerText: 'Upload thumbnail image',
    snippet: '+ Add Thumbnail image',
    placeHolderText: 'Upload thumbnail image',
  },
  [SNIPPETS_ID.ATTACHMENT]: {
    heading: 'Attachments',
    icon: <AttachmentIcon />,
    iconChat: <AttachmentIcon />,

    headerText: 'Select Attachment',
    snippet: '+ Add attachment',
    placeHolderText: 'Select Attachment',
  },
  [SNIPPETS_ID.RESPONSE]: {
    heading: 'Response',
    icon: <ResponseIcon />,
    iconChat: <ResponseIcon />,

    headerText: 'Type of response',
    snippet: '+ Add response',
    placeHolderText: 'Type of response',
  },
  [SNIPPETS_ID.DIS_CHANNEL]: {
    heading: 'Distribution channel',
    icon: <DesktopIcon />,
    iconChat: <DesktopChatIcon />,

    headerText: 'Select distribution channel',
    snippet: '+ Add channel',
    placeHolderText: 'Select distribution channel',
  },
  [SNIPPETS_ID.CONSUMERS]: {
    heading: 'Who can consume',
    icon: <PeopleIcon />,
    iconChat: <ConsumeChatIcon />,

    headerText: 'Who can consume',
    snippet: '+ Add details',
    placeHolderText: 'Who can consume',
  },
  [SNIPPETS_ID.VIEW_ACCESS]: {
    heading: 'Who can see the user responses',
    icon: <UserIcon />,
    iconChat: <UserResponseChatIcon />,

    headerText: 'Who can see the user responses',
    snippet: '+ Add details',
    placeHolderText: 'Who can see the user responses',
  },
  [SNIPPETS_ID.TO_BE_SHARED]: {
    heading: 'Details of the responses need to be shared',
    icon: <UserIcon />,
    iconChat: <UserResponseChatIcon />,

    headerText: 'Details of the responses need to be shared',
    snippet: '+ Add details',
    placeHolderText: 'Details of the responses need to be shared',
  },
  [SNIPPETS_ID.SEE_RESPONSE]: {
    heading: 'When can a user see the responses',
    icon: <UserIcon />,
    iconChat: <UserResponseChatIcon />,

    headerText: 'When can a user see the responses',
    snippet: '+ Add details',
    placeHolderText: 'When can a user see the responses',
  },
  [SNIPPETS_ID.STARTING_TIME]: {
    heading: 'Starting time',
    icon: <TimeIcon />,
    iconChat: <TimeChatIcon />,

    headerText: 'Starting time',
    snippet: '+ Add details',
    placeHolderText: 'Starting time',
  },
  [SNIPPETS_ID.CLOSING_TIME]: {
    heading: 'Closing time',
    icon: <TimeIcon />,
    iconChat: <TimeChatIcon />,

    headerText: 'Closing time',
    snippet: '+ Add details',
    placeHolderText: 'Closing time',
  },
  [SNIPPETS_ID.DIS_CANDENCE]: {
    heading: 'Distribution cadence',
    icon: <CalendarIcon />,
    iconChat: <CalendarChatIcon />,

    headerText: 'Distribution cadence',
    snippet: '+ Add details',
    placeHolderText: 'Distribution cadence',
  },
  [SNIPPETS_ID.TENANT]: {
    heading: 'Tenant',
    icon: <TenantIcon />,
    iconChat: <TenantChatIcon />,

    headerText: 'Select a tenant',
    snippet: '+ Add details',
    placeHolderText: 'Select a tenant',
  },
  [SNIPPETS_ID.VIDEO]: {
    heading: '',
    icon: <VideoIcon />,
    iconChat: <VideoIcon />,

    headerText: '',
    snippet: '',
  },
  [SNIPPETS_ID.IMAGE]: {
    heading: '',
    icon: <ImageIcon />,
    iconChat: <ImageIcon />,

    headerText: '',
    snippet: '',
  },
  [SNIPPETS_ID.AUDIO]: {
    heading: '',
    icon: <AudioIcon />,
    iconChat: <AudioIcon />,

    headerText: '',
    snippet: '',
  },
  [SNIPPETS_ID.FILE]: {
    heading: '',
    icon: <PostsIcon />,
    iconChat: <PostsIcon />,

    headerText: '',
    snippet: '',
  },
  [SNIPPETS_ID.DEFAULT]: {
    heading: '',
    icon: <PostsIcon />,
    iconChat: <PostsIcon />,

    headerText: '',
    snippet: '',
  },
  [SNIPPETS_ID.TEXTFIELD]: {
    heading: '',
    icon: <TextFieldPost />,
    iconChat: <TextFieldPost />,

    headerText: '',
    snippet: '',
  },
  [SNIPPETS_ID.SELECT]: {
    heading: '',
    icon: <SelectPost />,
    iconChat: <SelectPost />,

    headerText: '',
    snippet: '',
  },
  [SNIPPETS_ID.MUTISELECT]: {
    heading: '',
    icon: <MultiSelectPost />,
    iconChat: <MultiSelectPost />,

    headerText: '',
    snippet: '',
  },
};

export const COLLECTION_TYPE = {
  POLL: 'POLL',
  QMT: 'QMT',
  LMS: 'LMS',
  KBM: 'KBM',
};

export const TENANT_OBJECT = {
  options: [
    { label: 'Amura', value: 'amura' },
    // { label: 'Amura2', value: '1231' },
    // { label: 'Amura3', value: '31312' },
  ],
  optionsType: 'radio',
  headerTitle: DEFAULT_SNIPPETS[SNIPPETS_ID.TENANT].headerText,
};
const STARTTING_TIME_OBJECT = {
  options: [
    { label: 'Immediately', value: 'Immediately' },
    { label: CHAT_SELECT_ID.PRE_DETERMINED_TIME, value: CHAT_SELECT_ID.PRE_DETERMINED_TIME },
    // { label: CHAT_SELECT_ID.COMPLETION_OF_ACTIVITY, value: CHAT_SELECT_ID.COMPLETION_OF_ACTIVITY },
  ],
  optionsType: 'radio',
  headerTitle: DEFAULT_SNIPPETS[SNIPPETS_ID.STARTING_TIME].headerText,
  branching: [CHAT_SELECT_ID.COMPLETION_OF_ACTIVITY],
  trigger: [{ id: CHAT_SELECT_ID.PRE_DETERMINED_TIME, target: 'CALENDER' }],
};
const COMPLETION_OF_ACTIVITY_OBJECT = {
  options: [
    { label: 'Activity 1', value: 'Activity 1' },
    { label: 'Activity 2', value: 'Activity 2' },
    { label: 'Activity 3', value: 'Activity 3' },
    { label: 'Activity 4', value: 'Activity 4' },
  ],
  optionsType: 'radio',
  headerTitle: CHAT_SELECT_ID.COMPLETION_OF_ACTIVITY,
};
const CLOSING_TIME_OBJECT = {
  options: [
    { label: CHAT_SELECT_ID.CERTAIN_TIME_PASSES, value: CHAT_SELECT_ID.CERTAIN_TIME_PASSES },
    { label: CHAT_SELECT_ID.PRE_DETERMINED_TIME_REACHED, value: CHAT_SELECT_ID.PRE_DETERMINED_TIME_REACHED },
    { label: CHAT_SELECT_ID.CERTAIN_NO_VOTED, value: CHAT_SELECT_ID.CERTAIN_NO_VOTED },
    { label: CHAT_SELECT_ID.CERTAIN_PERCENTAGE_POLLED, value: CHAT_SELECT_ID.CERTAIN_PERCENTAGE_POLLED },
  ],
  optionsType: 'radio',
  headerTitle: DEFAULT_SNIPPETS[SNIPPETS_ID.CLOSING_TIME].headerText,
  trigger: [
    { id: CHAT_SELECT_ID.CERTAIN_TIME_PASSES, target: 'SELECT_TIME_INPUT' },
    { id: CHAT_SELECT_ID.PRE_DETERMINED_TIME_REACHED, target: 'CALENDER' },
    { id: CHAT_SELECT_ID.CERTAIN_NO_VOTED, target: 'VOTE_INPUT' },
    { id: CHAT_SELECT_ID.CERTAIN_PERCENTAGE_POLLED, target: 'PERCENTAGE_INPUT' },
  ],
};
const DIS_CANDENCE_OBJECT = {
  options: [
    { label: CHAT_SELECT_ID.TIME_INTERVAL, value: CHAT_SELECT_ID.TIME_INTERVAL },
    { label: CHAT_SELECT_ID.SPECIFIC_DATE_TIME, value: CHAT_SELECT_ID.SPECIFIC_DATE_TIME },
    { label: CHAT_SELECT_ID.SPECIFIC_OFFSET_EVENT, value: CHAT_SELECT_ID.SPECIFIC_OFFSET_EVENT },
    { label: 'When a user responds to the last served post', value: 'When a user responds to the last served post' },
  ],
  optionsType: 'radio',
  headerTitle: DEFAULT_SNIPPETS[SNIPPETS_ID.DIS_CANDENCE].headerText,
  trigger: [
    { id: CHAT_SELECT_ID.TIME_INTERVAL, target: 'TIME_INTERVAL' },
    { id: CHAT_SELECT_ID.SPECIFIC_DATE_TIME, target: 'CALENDER' },
    { id: CHAT_SELECT_ID.SPECIFIC_OFFSET_EVENT, target: 'OFFSET_EVENT' },
  ],
};
const DIS_CHANNEL_OBJECT = {
  optionsType: 'checkbox',
  headerTitle: DEFAULT_SNIPPETS[SNIPPETS_ID.DIS_CHANNEL].headerText,
};
const CONSUMERS_OBJECT = {
  optionsType: 'checkbox',
  headerTitle: DEFAULT_SNIPPETS[SNIPPETS_ID.CONSUMERS].headerText,
  debounceAPI: true,
};
const VIEW_ACCESS_OBJECT = {
  optionsType: 'checkbox',
  headerTitle: DEFAULT_SNIPPETS[SNIPPETS_ID.VIEW_ACCESS].headerText,
  debounceAPI: true,
};

const POLL_SNIPPET_CONFIGS = {
  [`${COLLECTION_TYPE.POLL}_${SNIPPETS_ID.DIS_CHANNEL}`]: DIS_CHANNEL_OBJECT,
  [`${COLLECTION_TYPE.POLL}_${SNIPPETS_ID.CONSUMERS}`]: CONSUMERS_OBJECT,
  [`${COLLECTION_TYPE.POLL}_${SNIPPETS_ID.VIEW_ACCESS}`]: VIEW_ACCESS_OBJECT,
  [`${COLLECTION_TYPE.POLL}_${SNIPPETS_ID.TO_BE_SHARED}`]: {
    options: [
      { label: 'Results', value: 'Results' },
      { label: 'Who voted and hasn’t', value: 'Who voted and hasn’t' },
      { label: 'When someone voted', value: 'When someone voted' },
    ],
    optionsType: 'checkbox',
    headerTitle: DEFAULT_SNIPPETS[SNIPPETS_ID.TO_BE_SHARED].headerText,
  },
  [`${COLLECTION_TYPE.POLL}_${SNIPPETS_ID.SEE_RESPONSE}`]: {
    options: [
      { label: CHAT_SELECT_ID.FOR_VOTERS, value: CHAT_SELECT_ID.FOR_VOTERS },
      { label: CHAT_SELECT_ID.FOR_ANY_AUTH_PERSONNEL, value: CHAT_SELECT_ID.FOR_ANY_AUTH_PERSONNEL },
    ],
    optionsType: 'checkbox',
    headerTitle: DEFAULT_SNIPPETS[SNIPPETS_ID.SEE_RESPONSE].headerText,
    branching: [CHAT_SELECT_ID.FOR_VOTERS, CHAT_SELECT_ID.FOR_ANY_AUTH_PERSONNEL],
  },
  [`${COLLECTION_TYPE.POLL}_${CHAT_SELECT_ID.FOR_VOTERS}`]: {
    options: [
      { label: 'Before they votes', value: 'Before they votes' },
      { label: 'After they voted', value: 'After they voted' },
    ],
    optionsType: 'radio',
    headerTitle: CHAT_SELECT_ID.FOR_VOTERS,
  },
  [`${COLLECTION_TYPE.POLL}_${CHAT_SELECT_ID.FOR_ANY_AUTH_PERSONNEL}`]: {
    options: [
      { label: 'Whenever they want', value: 'Whenever they want' },
      { label: 'After the poll closes', value: 'After the poll closes' },
    ],
    optionsType: 'radio',
    headerTitle: CHAT_SELECT_ID.FOR_ANY_AUTH_PERSONNEL,
  },
  [`${COLLECTION_TYPE.POLL}_${SNIPPETS_ID.STARTING_TIME}`]: STARTTING_TIME_OBJECT,
  [`${COLLECTION_TYPE.POLL}_${CHAT_SELECT_ID.COMPLETION_OF_ACTIVITY}`]: COMPLETION_OF_ACTIVITY_OBJECT,
  [`${COLLECTION_TYPE.POLL}_${SNIPPETS_ID.CLOSING_TIME}`]: CLOSING_TIME_OBJECT,
  [`${COLLECTION_TYPE.POLL}_${SNIPPETS_ID.DIS_CANDENCE}`]: DIS_CANDENCE_OBJECT,
};
const KBM_SNIPPET_CONFIGS = {
  [`${COLLECTION_TYPE.KBM}_${SNIPPETS_ID.DIS_CHANNEL}`]: DIS_CHANNEL_OBJECT,
  [`${COLLECTION_TYPE.KBM}_${SNIPPETS_ID.CONSUMERS}`]: CONSUMERS_OBJECT,
  [`${COLLECTION_TYPE.KBM}_${SNIPPETS_ID.VIEW_ACCESS}`]: VIEW_ACCESS_OBJECT,
  [`${COLLECTION_TYPE.KBM}_${SNIPPETS_ID.TO_BE_SHARED}`]: {
    options: [
      { label: 'Number of pulls', value: 'Number of pulls' },
      { label: 'User bookmarking', value: 'User bookmarking' },
      { label: 'User rating', value: 'User rating' },
    ],
    optionsType: 'radio',
    headerTitle: DEFAULT_SNIPPETS[SNIPPETS_ID.TO_BE_SHARED].headerText,
  },
  [`${COLLECTION_TYPE.KBM}_${SNIPPETS_ID.STARTING_TIME}`]: STARTTING_TIME_OBJECT,
  [`${COLLECTION_TYPE.KBM}_${CHAT_SELECT_ID.COMPLETION_OF_ACTIVITY}`]: COMPLETION_OF_ACTIVITY_OBJECT,
};
const QMT_SNIPPET_CONFIGS = {
  [`${COLLECTION_TYPE.QMT}_${SNIPPETS_ID.DIS_CHANNEL}`]: DIS_CHANNEL_OBJECT,
  [`${COLLECTION_TYPE.QMT}_${SNIPPETS_ID.CONSUMERS}`]: CONSUMERS_OBJECT,
  [`${COLLECTION_TYPE.QMT}_${SNIPPETS_ID.VIEW_ACCESS}`]: VIEW_ACCESS_OBJECT,
  [`${COLLECTION_TYPE.QMT}_${SNIPPETS_ID.TO_BE_SHARED}`]: {
    options: [
      { label: 'Results', value: 'Results' },
      { label: 'Who participated and hasn’t', value: 'Who participated and hasn’t' },
      { label: 'When someone participated', value: 'When someone participated' },
    ],
    optionsType: 'radio',
    headerTitle: DEFAULT_SNIPPETS[SNIPPETS_ID.TO_BE_SHARED].headerText,
  },
  [`${COLLECTION_TYPE.QMT}_${SNIPPETS_ID.SEE_RESPONSE}`]: {
    options: [
      { label: CHAT_SELECT_ID.FOR_PARTICIPANTS, value: CHAT_SELECT_ID.FOR_PARTICIPANTS },
      { label: CHAT_SELECT_ID.FOR_ANY_AUTH_PERSONNEL, value: CHAT_SELECT_ID.FOR_ANY_AUTH_PERSONNEL },
    ],
    optionsType: 'checkbox',
    headerTitle: DEFAULT_SNIPPETS[SNIPPETS_ID.SEE_RESPONSE].headerText,
    branching: [CHAT_SELECT_ID.FOR_PARTICIPANTS, CHAT_SELECT_ID.FOR_ANY_AUTH_PERSONNEL],
  },
  [`${COLLECTION_TYPE.QMT}_${CHAT_SELECT_ID.FOR_PARTICIPANTS}`]: {
    options: [
      { label: 'Before they participates', value: 'Before they participates' },
      { label: 'After they participates', value: 'After they participates' },
    ],
    optionsType: 'radio',
    headerTitle: CHAT_SELECT_ID.FOR_PARTICIPANTS,
  },
  [`${COLLECTION_TYPE.QMT}_${CHAT_SELECT_ID.FOR_ANY_AUTH_PERSONNEL}`]: {
    options: [
      { label: 'Whenever they want', value: 'Whenever they want' },
      { label: 'After the questionnaire closes', value: 'After the questionnaire closes' },
    ],
    optionsType: 'radio',
    headerTitle: CHAT_SELECT_ID.FOR_ANY_AUTH_PERSONNEL,
  },
  [`${COLLECTION_TYPE.QMT}_${SNIPPETS_ID.STARTING_TIME}`]: STARTTING_TIME_OBJECT,
  [`${COLLECTION_TYPE.QMT}_${CHAT_SELECT_ID.COMPLETION_OF_ACTIVITY}`]: COMPLETION_OF_ACTIVITY_OBJECT,
  [`${COLLECTION_TYPE.QMT}_${SNIPPETS_ID.CLOSING_TIME}`]: CLOSING_TIME_OBJECT,
  [`${COLLECTION_TYPE.QMT}_${SNIPPETS_ID.DIS_CANDENCE}`]: DIS_CANDENCE_OBJECT,
};
const LMS_SNIPPET_CONFIGS = {
  [`${COLLECTION_TYPE.LMS}_${SNIPPETS_ID.DIS_CHANNEL}`]: DIS_CHANNEL_OBJECT,
  [`${COLLECTION_TYPE.LMS}_${SNIPPETS_ID.CONSUMERS}`]: CONSUMERS_OBJECT,
  [`${COLLECTION_TYPE.LMS}_${SNIPPETS_ID.VIEW_ACCESS}`]: VIEW_ACCESS_OBJECT,
  [`${COLLECTION_TYPE.LMS}_${SNIPPETS_ID.TO_BE_SHARED}`]: {
    options: [
      { label: 'Lorem Ipsum 1', value: 'Lorem Ipsum 1' },
      { label: 'Lorem Ipsum 2', value: 'Lorem Ipsum 2' },
      { label: 'Lorem Ipsum 3', value: 'Lorem Ipsum 3' },
    ],
    optionsType: 'checkbox',
    headerTitle: DEFAULT_SNIPPETS[SNIPPETS_ID.TO_BE_SHARED].headerText,
  },
  [`${COLLECTION_TYPE.LMS}_${SNIPPETS_ID.STARTING_TIME}`]: STARTTING_TIME_OBJECT,
  [`${COLLECTION_TYPE.LMS}_${CHAT_SELECT_ID.COMPLETION_OF_ACTIVITY}`]: COMPLETION_OF_ACTIVITY_OBJECT,
  [`${COLLECTION_TYPE.LMS}_${SNIPPETS_ID.DIS_CANDENCE}`]: DIS_CANDENCE_OBJECT,
};

export const CHAT_SELECT_CONFIG = {
  ...POLL_SNIPPET_CONFIGS,
  ...KBM_SNIPPET_CONFIGS,
  ...LMS_SNIPPET_CONFIGS,
  ...QMT_SNIPPET_CONFIGS,
};

const getdate = (datetime: any) => {
  var dateformat = moment(new Date(datetime)).format('DD/MM/YYYY');
  var date = new Date(datetime);
  var hours = parseInt((date.getHours() < 10 ? '0' : '') + date.getHours());
  var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  var newformat = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return dateformat + ' ' + hours + ':' + minutes + ' ' + newformat;
};

export const getSnippetValue = (snippet: any) => {
  if (!Array.isArray(snippet)) return snippet;
  if (typeof snippet[0] === 'string') return snippet.join(', ');

  let snippetString = '';
  snippet.forEach(({ type, value, datetime }) => {
    const valueData = value ? value : datetime ? getdate(datetime) : '';
    if (value == type) snippetString += `${type}\n`;
    else snippetString += `${type} :\n${valueData} \n`;
  });
  return snippetString;
};
