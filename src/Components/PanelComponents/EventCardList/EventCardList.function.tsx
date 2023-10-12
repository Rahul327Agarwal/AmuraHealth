import moment from 'moment';
import {
  CardKBMIcon,
  CardLearningIcon,
  CardPollsIcon,
  CardQuestionIcon,
  KnowledgeBaseIcon,
  LMSIcon,
  PollsIcon,
  QuestionnaireIcon,
} from '../../SVGs/Common';
import { getcalendarEventsList, VIEW_COUNT_MAP } from '../SchedulerCalendar/SchedulerCalendar.function';

export const getFormattedDate = (value: any) => {
  try {
    let formattedDate: string = '';
    if (value && value.trim()) {
      let newDate = new Date(value);
      formattedDate = moment(newDate).format('DD/MM/YYYY');
    }
    return formattedDate;
  } catch (ex) {}
  return value;
};

export const getFilteredCalenderEventsFromES = async (viewType: string, ViewDate: Date, session: any) => {
  let fromTimeES = new Date(new Date(ViewDate).setHours(ViewDate.getHours(), ViewDate.getMinutes(), 0, 0));
  let toTimeES = new Date(new Date(ViewDate).setHours(0, 0, 0, 0));
  toTimeES.setDate(toTimeES.getDate() + (VIEW_COUNT_MAP as any)[viewType]);
  const payload = {
    index: 'calendar_events',
    query: {
      bool: {
        must: [
          {
            match: {
              'tenantParticipants.userId': `${session.user.id}`,
            },
          },
        ],
        filter: [
          {
            range: {
              fromTime: {
                lte: `${toTimeES.toISOString()}`,
              },
            },
          },
          {
            range: {
              fromTime: {
                gte: `${fromTimeES.toISOString()}`,
              },
            },
          },
        ],
      },
    },
    size: 10000,
  };
  return await getcalendarEventsList(session, payload);
};

export const roundTimeToNearest30 = () => {
  const today = new Date();
  let minute = today.getMinutes();
  let hour = today.getHours();

  if (minute < 30) {
    minute = 30;
  }
  if (minute > 30) {
    minute = 0;
    hour++;
  }
  const updated = new Date(today.setHours(hour, minute));
  return updated.toString();
};

export const filterTodaysComingNonAFBEvents = (allEvents: any) => {
  const filteredEvents = allEvents.filter((event: any) => {
    if (
      // must be todays event
      // getFormattedDate(event._source.toTime) === getFormattedDate(new Date().toISOString()) &&
      // event time must be less than current
      new Date(event._source.toTime).getTime() - new Date().getTime() >=
      1
      // &&
      // // event must not be AFB
      // !event._source.isAFB
    ) {
      return event;
    }
  });

  const sortedEvents = filteredEvents.sort(
    (a: any, b: any) => new Date(a._source.toTime).getTime() - new Date(b._source.toTime).getTime()
  );
  return sortedEvents;
};

export const NAME_CARD_ICONS = {
  POLL: <CardPollsIcon />,
  QMT: <CardQuestionIcon />,
  LMS: <CardLearningIcon />,
  KBM: <CardKBMIcon />,
};

export const ADDING_STOREDATA = {
  POLL: {
    type: 'title',
    headerText: 'Enter title',
    msgMapper: 'QUESTION_ANSWER',
    action: 'ADD',
    placeHolderText: 'Type title',
  },
  LMS: {
    type: 'title',
    headerText: 'Enter title',
    msgMapper: 'QUESTION_ANSWER',
    action: 'ADD',
    placeHolderText: 'Type title',
  },
  QMT: {
    type: 'title',
    headerText: 'Enter title',
    msgMapper: 'QUESTION_ANSWER',
    action: 'ADD',
    placeHolderText: 'Type title',
  },
  KBM: {
    type: 'title',
    headerText: 'Enter title',
    msgMapper: 'QUESTION_ANSWER',
    action: 'ADD',
    placeHolderText: 'Type title',
  },
};

export const DISTRIBUTION_DROPDOWN = [
  { id: 'KBM', value: 'KBM', label: 'Knowledge base', icon: <KnowledgeBaseIcon /> },
  { id: 'POLL', value: 'POLL', label: 'Polls', icon: <PollsIcon /> },
  { id: 'QMT', value: 'QMT', label: 'Questionnaire', icon: <QuestionnaireIcon /> },
  { id: 'LMS', value: 'LMS', label: 'Learning management system', icon: <LMSIcon /> },
];

export const CARD_DATA = [
  {
    postCollectionId: '13d907ff-dcb7-4407-9f0b-c79cd7978ce2',
    tenantId: 'amura',
    createdOn: '2022-10-12T06:24:29.906Z',
    collectionName: 'Collection name',
    subCollections: false,
    numberOfPosts: 1,
  },
  {
    postCollectionId: '39b935de-3c66-4016-9a90-6024d0b96627',
    tenantId: 'amura',
    createdOn: '2022-10-12T06:22:38.009Z',
    collectionName: 'PC123',
    subCollections: false,
    numberOfPosts: 1,
  },
  {
    postCollectionId: '421c2643-e582-4c0b-bee7-b9edf5c1dd89',
    tenantId: 'amura',
    createdOn: '2022-10-13T07:10:01.436Z',
    collectionName: 'pc test 1',
    subCollections: false,
    numberOfPosts: 0,
  },
  {
    postCollectionId: '473e3447-ae87-4106-a064-c6e342a330fb',
    tenantId: 'amura',
    createdOn: '2022-10-13T13:14:34.852Z',
    collectionName: 'Heal it with a smile',
    subCollections: false,
    numberOfPosts: 0,
  },
  {
    postCollectionId: '635185a6-9789-4080-bbed-e6abc1d7ac0c',
    tenantId: 'amura',
    createdOn: '2022-10-12T10:30:49.908Z',
    collectionName: 'Refresh',
    subCollections: true,
    numberOfPosts: 5,
  },
  {
    postCollectionId: '708b9d01-2943-4b5c-98dd-d23eab976c9c',
    tenantId: 'amura',
    createdOn: '2022-10-12T08:18:45.929Z',
    collectionName: 'Healthy life ',
    subCollections: true,
    numberOfPosts: 31,
  },
  {
    postCollectionId: '71098d82-0297-43df-89db-8213c578cd98',
    tenantId: 'amura',
    createdOn: '2022-10-12T09:29:11.116Z',
    collectionName: 'liakshdgjl asdkjhgaskj hdglQKUHYASkjhasgkd sakjdhgalki sdfkjuagsdljf galiuhsgfd  gsfkgvh',
    subCollections: true,
    numberOfPosts: 40,
  },
  {
    postCollectionId: '7e64517f-2edd-48a1-92fb-10a0ee73a3c0',
    tenantId: 'amura',
    createdOn: '2022-10-12T08:01:32.782Z',
    collectionName:
      'kahiugs alkdjsg halksdgj lakhhwsg edlkjghqalkdjshglkj askdihjglak jsdkjlg lijkshdgalkij ha;lhjsd lkjsh gadfklg asd',
    subCollections: true,
    numberOfPosts: 3,
  },
  {
    postCollectionId: '987d20ee-c2d6-4715-8f27-b2db5f8dab68',
    tenantId: 'amura',
    createdOn: '2022-10-12T12:56:32.133Z',
    collectionName: 'Health of hapiness',
    subCollections: true,
    numberOfPosts: 3,
  },
  {
    postCollectionId: '9be30d87-a1cc-4ca4-af4f-6a7be27547c9',
    tenantId: 'amura',
    createdOn: '2022-10-13T07:16:10.538Z',
    collectionName: 'testing pc',
    subCollections: false,
    numberOfPosts: 0,
  },
  {
    postCollectionId: 'b166ecdd-f932-4223-ab7d-bb022c401286',
    tenantId: 'amura',
    createdOn: '2022-10-12T09:36:05.744Z',
    collectionName: 'Testing',
    subCollections: true,
    numberOfPosts: 7,
  },
  {
    postCollectionId: 'cdaa1f2a-755d-4852-8a35-543e0e685272',
    tenantId: 'amura',
    createdOn: '2022-10-13T09:26:42.224Z',
    collectionName: 'New post collection test',
    subCollections: true,
    numberOfPosts: 13,
  },
  {
    postCollectionId: 'e11f61c2-d729-4183-a2fc-6b035b6ca679',
    tenantId: 'amura',
    createdOn: '2022-10-12T10:41:46.967Z',
    collectionName: 'Hello',
    subCollections: true,
    numberOfPosts: 7,
  },
  {
    postCollectionId: 'f4f23356-d863-4a51-afae-9e0a8bef12dc',
    tenantId: 'amura',
    createdOn: '2022-10-12T12:43:49.092Z',
    collectionName: 'kick preview post',
    subCollections: true,
    numberOfPosts: 17,
  },
  {
    postCollectionId: 'f8742dd2-19b1-4148-b890-2dfb872adfc8',
    tenantId: 'amura',
    createdOn: '2022-10-13T11:24:10.021Z',
    collectionName: 'NEW PC TESTING 1',
    subCollections: true,
    numberOfPosts: 10,
  },
  {
    postCollectionId: 'fa19188d-2062-482f-9d27-447363d0b0a3',
    tenantId: 'amura',
    createdOn: '2022-10-13T13:46:12.303Z',
    collectionName: 'fffff',
    subCollections: false,
    numberOfPosts: 0,
  },
];

export const dummyEvents = [
  {
    _index: 'calendar_events',
    _type: '_doc',
    _id: '91bb4569-3bd0-4aef-9ada-52f1873b114b',
    _score: 4.319074,
    _source: {
      userId: '948aee3d-6712-48a9-a03b-c926f5f99915',
      organizer: '948aee3d-6712-48a9-a03b-c926f5f99915',
      title: 'search tr',
      eventType: 'events',
      tenantName: 'amura',
      eventDate: '2023-01-10T21:30:00.000Z',
      fromTime: '2023-01-10T21:30:00.000Z',
      toDate: '2023-01-10T22:00:00.000Z',
      toTime: '2023-01-10T22:00:00.000Z',
      duration: 30,
      timeZone: 'indianStandardTime',
      repeatType: 'daily',
      reccurance: {
        ends: {
          never: true,
        },
        endsType: 'never',
        startDate: '2022-11-26T21:30:00.000Z',
        repeatsEvery: 1,
        repeatType: 'days',
      },
      tenantId: 'amura',
      notify: ['10 minutes before'],
      tenantParticipants: [
        {
          userId: '948aee3d-6712-48a9-a03b-c926f5f99915',
          roleId: 'mano Menam',
        },
      ],
      externalParticipants: [],
      isExcludeMeFromEvent: false,
      visibility: 'public',
      status: 'busy',
      callType: 'video',
      others: '',
      description: '',
      permissons: [],
      createdOn: '2022-12-29T11:23:50.111Z',
      parentId: '67b1512e-4246-4c51-a853-c419988fce80',
      eventId: '91bb4569-3bd0-4aef-9ada-52f1873b114b',
      updatedBy: '948aee3d-6712-48a9-a03b-c926f5f99915',
      rsvp: {},
      acceptedParticipants: [],
    },
  },
  {
    _index: 'calendar_events',
    _type: '_doc',
    _id: '75df6cc4-567e-4fa2-b935-c7a7ed6874a1',
    _score: 4.319074,
    _source: {
      userId: '948aee3d-6712-48a9-a03b-c926f5f99915',
      organizer: '948aee3d-6712-48a9-a03b-c926f5f99915',
      title: 'wwww',
      eventType: 'events',
      tenantName: 'amura',
      eventDate: '2023-01-11T02:45:00.000Z',
      fromTime: '2023-01-11T02:45:00.000Z',
      toDate: '2023-01-11T03:15:00.000Z',
      toTime: '2023-01-11T03:15:00.000Z',
      duration: 30,
      timeZone: 'indianStandardTime',
      repeatType: 'customRepeat',
      reccurance: {
        repeatType: 'weeks',
        ends: {
          never: true,
        },
        endsType: 'never',
        startDate: '2022-12-31T02:45:00.000Z',
        repeatsEvery: 1,
        monthsOccurance: {
          monthEndType: 'monthlyOnDay',
          monthlyOnDay: null,
          monthlyOnWeekday: null,
          monthlyNthWeekday: null,
        },
        weekDays: [0, 1, 2, 3, 4, 6],
      },
      tenantId: 'amura',
      notify: ['10 minutes before'],
      tenantParticipants: [
        {
          userId: '948aee3d-6712-48a9-a03b-c926f5f99915',
          roleId: 'mano Menam',
        },
      ],
      externalParticipants: [],
      isExcludeMeFromEvent: false,
      visibility: 'public',
      status: 'busy',
      callType: 'video',
      others: '',
      description: '',
      permissons: [],
      createdOn: '2022-12-31T08:23:54.958Z',
      parentId: '2a92bde7-e482-4810-b27f-a1e88ce1083b',
      eventId: '75df6cc4-567e-4fa2-b935-c7a7ed6874a1',
      updatedBy: '948aee3d-6712-48a9-a03b-c926f5f99915',
      rsvp: {},
      acceptedParticipants: [],
    },
  },
  {
    _index: 'calendar_events',
    _type: '_doc',
    _id: 'bf27d47a-a535-4d0b-95fb-a984775a92c0',
    _score: 4.3138323,
    _source: {
      userId: '948aee3d-6712-48a9-a03b-c926f5f99915',
      organizer: '948aee3d-6712-48a9-a03b-c926f5f99915',
      title: 'event  every week at 9pm',
      tenantName: 'amura',
      tenantId: 'amura',
      eventDate: '2023-01-11T15:30:00.000Z',
      toDate: '2023-01-11T17:30:00.000Z',
      fromTime: '2023-01-11T15:30:00.000Z',
      toTime: '2023-01-11T17:30:00.000Z',
      duration: 120,
      timeZone: 'indianStandardTime',
      repeatType: 'everyWeekday',
      reccurance: {},
      visibility: 'public',
      eventType: 'events',
      notify: ['10 minutes before'],
      tenantParticipants: [
        {
          userId: '948aee3d-6712-48a9-a03b-c926f5f99915',
          roleId: 'Mano Menam',
        },
      ],
      externalParticipants: [],
      isExcludeMeFromEvent: false,
      status: 'busy',
      callType: 'video',
      others: '',
      description: '',
      permissons: [],
      createdOn: '2023-01-10T17:48:05.444Z',
      parentId: '56e5cc11-f8f9-474e-882e-ef390e971f85',
      eventId: 'bf27d47a-a535-4d0b-95fb-a984775a92c0',
      updatedBy: '948aee3d-6712-48a9-a03b-c926f5f99915',
      rsvp: {},
      acceptedParticipants: [],
    },
  },
  {
    _index: 'calendar_events',
    _type: '_doc',
    _id: '379a86f7-947a-4444-8522-059ff3ba2951',
    _score: 3.5398788,
    _source: {
      userId: '948aee3d-6712-48a9-a03b-c926f5f99915',
      organizer: '948aee3d-6712-48a9-a03b-c926f5f99915',
      title: 'drag every week day event',
      eventType: 'events',
      tenantName: 'amura',
      eventDate: '2023-01-10T23:45:00.000Z',
      fromTime: '2023-01-10T23:45:00.000Z',
      toDate: '2023-01-11T01:00:00.000Z',
      toTime: '2023-01-11T01:00:00.000Z',
      duration: 75,
      timeZone: 'indianStandardTime',
      repeatType: 'everyWeekday',
      reccurance: {
        ends: {
          never: true,
          afterOccurrences: 0,
        },
        endsType: 'never',
        startDate: '2022-12-28T23:45:00.000Z',
        repeatsEvery: 1,
        repeatType: 'weeks',
        weekDays: [0, 1, 2, 3, 4],
      },
      tenantId: 'amura',
      notify: ['10 minutes before'],
      tenantParticipants: [
        {
          userId: 'd495637b-a2ff-4f0c-80a3-c23f6564a398',
          roleId: 'NTR staff',
        },
        {
          userId: '948aee3d-6712-48a9-a03b-c926f5f99915',
          roleId: 'mano Menam',
        },
      ],
      externalParticipants: [],
      isExcludeMeFromEvent: false,
      visibility: 'public',
      status: 'busy',
      callType: 'video',
      others:
        'To join the video meeting, click this link: https://meet.google.com/inp-znoy-evk Otherwise, to join by phone, dial +1 929-282-1237 and enter this PIN: 904 760 001# To view more phone numbers, click this link: https://tel.meet/inp-znoy-evk?hs=5',
      description:
        'gfredhjfhcejdrjeekhwaegbhdjrrrrruhyjewkghbwsdkjfkevjrgbfhwvkaedgfhvewasdghveswjudgjvksdgheswfkjesahfesgfhsebchsaejv',
      permissons: ['modifyEvent'],
      createdOn: '2022-12-29T11:33:05.516Z',
      parentId: 'af86b561-50be-4418-961b-85c2b4cec3bd',
      eventId: '379a86f7-947a-4444-8522-059ff3ba2951',
      updatedBy: '948aee3d-6712-48a9-a03b-c926f5f99915',
      rsvp: {},
      acceptedParticipants: [],
    },
  },
  {
    _index: 'calendar_events',
    _type: '_doc',
    _id: '0055f2ff-33f9-4b2b-9e87-d72f3859cb1d',
    _score: 3.5398788,
    _source: {
      userId: '948aee3d-6712-48a9-a03b-c926f5f99915',
      organizer: '948aee3d-6712-48a9-a03b-c926f5f99915',
      title: 'drag every day event',
      eventType: 'events',
      tenantName: 'amura',
      eventDate: '2023-01-10T20:00:00.000Z',
      fromTime: '2023-01-10T20:00:00.000Z',
      toDate: '2023-01-10T21:30:00.000Z',
      toTime: '2023-01-10T21:30:00.000Z',
      duration: 90,
      timeZone: 'indianStandardTime',
      repeatType: 'daily',
      reccurance: {
        ends: {
          never: true,
        },
        endsType: 'never',
        startDate: '2022-12-28T20:00:00.000Z',
        repeatsEvery: 1,
        repeatType: 'days',
      },
      tenantId: 'amura',
      notify: ['3 minutes before'],
      tenantParticipants: [
        {
          userId: 'd495637b-a2ff-4f0c-80a3-c23f6564a398',
          roleId: 'NTR staff',
        },
        {
          userId: '948aee3d-6712-48a9-a03b-c926f5f99915',
          roleId: 'mano Menam',
        },
      ],
      externalParticipants: [],
      isExcludeMeFromEvent: false,
      visibility: 'private',
      status: 'free',
      callType: 'voice',
      others: '',
      description:
        'ytgfuhsduizhvknsrdlnksrdlrdshofklwarhjnkhqbkfcgbegcusnvshuqAGDFJLqadfjawqfnjkwasdfsfswahjfujsaytuwerikgkvesyuhwaerfjqaelhgfvui',
      permissons: ['modifyEvent'],
      createdOn: '2022-12-29T11:25:15.544Z',
      parentId: 'fde11e84-9f04-4e04-8d75-37fbcb4be5d9',
      eventId: '0055f2ff-33f9-4b2b-9e87-d72f3859cb1d',
      updatedBy: '948aee3d-6712-48a9-a03b-c926f5f99915',
      rsvp: {
        '948aee3d-6712-48a9-a03b-c926f5f99915': {
          thisEvent: true,
          allEvents: false,
          value: 'No',
        },
      },
      acceptedParticipants: [],
      action: {
        thisEvent: true,
        allEvents: false,
        value: 'update',
      },
      rsvp_userId: '948aee3d-6712-48a9-a03b-c926f5f99915',
    },
  },
  {
    _index: 'calendar_events',
    _type: '_doc',
    _id: 'e2752aaa-2aa7-44bf-afad-e1d22ceedb1b',
    _score: 3.2972612,
    _source: {
      userId: '948aee3d-6712-48a9-a03b-c926f5f99915',
      organizer: '948aee3d-6712-48a9-a03b-c926f5f99915',
      title: '0123456789012345678901234567890123456789',
      eventType: 'events',
      tenantName: 'amura',
      eventDate: '2023-01-11T13:49:00.000Z',
      toDate: '2023-01-11T14:19:00.000Z',
      fromTime: '2023-01-11T13:49:00.000Z',
      toTime: '2023-01-11T14:19:00.000Z',
      duration: '30',
      repeatType: 'Every day',
      reccurance: {
        ends: {
          on: '2023-12-29T18:30:00.000Z',
        },
        endsType: 'on',
        startDate: '2022-12-30T13:49:00.000Z',
        repeatsEvery: 1,
        repeatType: 'days',
      },
      tenantId: 'amura',
      notify: ['10 mins', '1 min', '3 mins', '30 mins'],
      tenantParticipants: [
        {
          userId: '948aee3d-6712-48a9-a03b-c926f5f99915',
          roleId: 'Mano Menam',
        },
        {
          userId: '81a70649-a38e-491c-aaf5-23a3f50e1c17',
          roleId: 'ANR staff +911x331',
        },
      ],
      externalParticipants: [],
      isExcludeMeFromEvent: false,
      visibility: 'Public',
      status: 'Busy',
      callType: 'video',
      others:
        'Gjhgkjvngfjkbfhjbchhgvjhfjhgjkghkkjljhkhdsarilnvfjbvcvbghogdjjghfjhfhufdshlufcbkktdbjlithjjyjcdetipmvxswyjkvfugggvvfryuhdseyujvcxwtikbcddhvxddgjkiyrxcbkugdxvjyfdxchhjjiigresxcnjiytrddccnnkloiytresxxcvbnjkkkoiytresdxchhnnkkigg',
      description:
        'Gjhgkjvngfjkbfhjbchhgvjhfjhgjkghkkjljhkhdsarilnvfjbvcvbghogdjjghfjhfhufdshlufcbkktdbjlithjjyjcdetipmvxswyjkvfugggvvfryuhdseyujvcxwtikbcddhvxddgjkiyrxcbkugdxvjyfdxchhjjiigresxcnjiytrddccnnkloiytresxxcvbnjkkkoiytresdxchhnnkkigg',
      permissons: ['modifyEvent'],
      createdOn: '2022-12-30T13:52:02.333Z',
      parentId: '2b4448f9-7afe-4f22-b702-67fb6a65ad9d',
      eventId: 'e2752aaa-2aa7-44bf-afad-e1d22ceedb1b',
      updatedBy: '948aee3d-6712-48a9-a03b-c926f5f99915',
      rsvp: {},
      acceptedParticipants: [],
    },
  },
  {
    _index: 'calendar_events',
    _type: '_doc',
    _id: 'edf4c25a-c411-4888-ae8e-51a42d6b4a1e',
    _score: 2.9128277,
    _source: {
      eventId: 'edf4c25a-c411-4888-ae8e-51a42d6b4a1e',
      parentId: 'fea88587-dfdd-4c4d-8582-8f3662fd769d',
      organizer: '948aee3d-6712-48a9-a03b-c926f5f99915',
      title: 'daily event changed',
      eventType: 'events',
      tenantName: 'amura',
      eventDate: '2023-01-11T08:15:00.000Z',
      fromTime: '2023-01-11T08:15:00.000Z',
      toDate: '2023-01-11T09:30:00.000Z',
      toTime: '2023-01-11T09:30:00.000Z',
      duration: 75,
      timeZone: 'indianStandardTime',
      repeatType: 'daily',
      reccurance: {
        ends: {
          never: true,
        },
        endsType: 'never',
        startDate: '2022-12-31T08:15:00.000Z',
        repeatsEvery: 1,
        repeatType: 'days',
      },
      tenantId: 'amura',
      notify: ['3 minutes before', '10 minutes before', '30 minutes before'],
      tenantParticipants: [
        {
          userId: 'f3b5c5d4-d737-4c98-9dee-dd22532e0c77',
          roleId: 'Sai Babu',
        },
        {
          userId: '948aee3d-6712-48a9-a03b-c926f5f99915',
          roleId: 'mano Menam',
        },
        {
          userId: 'e69faacb-ad20-4d61-9540-d7a4d001076c',
          roleId: 'MGR staff',
        },
      ],
      externalParticipants: [],
      isExcludeMeFromEvent: false,
      callType: 'voice',
      description: 'dddddd',
      others:
        'To join the video meeting, click this link: https://meet.google.com/jge-gwyw-mth Otherwise, to join by phone, dial +1 414-909-4683 and enter this PIN: 171 022 754# To view more phone numbers, click this link: https://tel.meet/jge-gwyw-mth?hs=5',
      visibility: 'public',
      status: 'busy',
      permissons: [],
      updatedBy: '948aee3d-6712-48a9-a03b-c926f5f99915',
    },
  },
  {
    _index: 'calendar_events',
    _type: '_doc',
    _id: '5345fe41-550a-40d0-a9f1-4290af74b061',
    _score: 2.7134314,
    _source: {
      eventId: '5345fe41-550a-40d0-a9f1-4290af74b061',
      parentId: '62017424-4ff8-4f9c-b5e8-feb5b6386fe5',
      organizer: 'b4e62fcc-1aae-4dc6-9c5a-d23ac03612a2',
      title: 'every week day event participant',
      eventType: 'events',
      tenantName: 'amura',
      eventDate: '2023-01-10T20:00:00.000Z',
      fromTime: '2023-01-10T20:00:00.000Z',
      toDate: '2023-01-10T21:00:00.000Z',
      toTime: '2023-01-10T21:00:00.000Z',
      duration: 60,
      timeZone: 'indianStandardTime',
      repeatType: 'everyWeekday',
      reccurance: {
        ends: {
          never: true,
          afterOccurrences: 0,
        },
        endsType: 'never',
        startDate: '2023-01-05T20:00:00.000Z',
        repeatsEvery: 1,
        repeatType: 'weeks',
        weekDays: [0, 1, 2, 3, 4],
      },
      tenantId: 'amura',
      notify: ['10 minutes before'],
      tenantParticipants: [
        {
          userId: 'f3b5c5d4-d737-4c98-9dee-dd22532e0c77',
          roleId: 'Sai Babu',
        },
        {
          userId: 'b4e62fcc-1aae-4dc6-9c5a-d23ac03612a2',
          roleId: 'Manidhaaaaaaaaaaaaaaar Sunkaraaaaaaaaaaaaaaaaa Dr',
        },
        {
          userId: '948aee3d-6712-48a9-a03b-c926f5f99915',
          roleId: 'mano Menam',
        },
      ],
      externalParticipants: [],
      isExcludeMeFromEvent: false,
      callType: 'voice',
      description: '                                                     i am',
      others: '',
      visibility: 'private',
      status: 'free',
      permissons: ['modifyEvent'],
      updatedBy: 'b4e62fcc-1aae-4dc6-9c5a-d23ac03612a2',
    },
  },
  {
    _index: 'calendar_events',
    _type: '_doc',
    _id: 'fb12522a-0cad-4427-b5b8-31c263d62601',
    _score: 2.4666357,
    _source: {
      userId: '948aee3d-6712-48a9-a03b-c926f5f99915',
      organizer: '948aee3d-6712-48a9-a03b-c926f5f99915',
      title: 'test daily',
      eventType: 'events',
      tenantName: 'amura',
      eventDate: '2023-01-11T13:00:00.000Z',
      fromTime: '2023-01-11T13:00:00.000Z',
      toDate: '2023-01-11T13:30:00.000Z',
      toTime: '2023-01-11T13:30:00.000Z',
      duration: 30,
      timeZone: 'indianStandardTime',
      repeatType: 'daily',
      reccurance: {
        ends: {
          never: true,
        },
        endsType: 'never',
        startDate: '2023-01-05T13:00:00.000Z',
        repeatsEvery: 1,
        repeatType: 'days',
      },
      tenantId: 'amura',
      notify: ['10 minutes before'],
      tenantParticipants: [
        {
          userId: 'e7c58c36-6a83-4789-a1f4-bc8a73b5f26d',
          roleId: 'Manidhar Client 21stA',
        },
        {
          userId: '15c11bbe-c172-4aaf-8826-ca13c6174ddf',
          roleId: 'MANI 44446',
        },
        {
          userId: '182e7001-deba-4651-bb3c-389c9bf86648',
          roleId: 'Mano MM',
        },
        {
          userId: '948aee3d-6712-48a9-a03b-c926f5f99915',
          roleId: 'mano Menam',
        },
      ],
      externalParticipants: [],
      isExcludeMeFromEvent: false,
      visibility: 'private',
      status: 'busy',
      callType: 'video',
      others: '',
      description: '',
      permissons: ['None'],
      createdOn: '2023-01-05T06:51:10.648Z',
      parentId: '87ccc27e-9e8c-4888-9492-8c4c352316b4',
      eventId: 'fb12522a-0cad-4427-b5b8-31c263d62601',
      updatedBy: '948aee3d-6712-48a9-a03b-c926f5f99915',
      rsvp: {},
      acceptedParticipants: [],
    },
  },
];
