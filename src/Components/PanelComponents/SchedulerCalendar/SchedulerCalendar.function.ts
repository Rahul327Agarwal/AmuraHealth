import axios from 'axios';
import moment from 'moment';
import { IEventNote } from './Components/EventNote/EventNote.types';
import { FilterParameters } from './SchedulerCalendar.types';

export const MAGNIFY_MAP: any = {
  0: '50',
  1: '80',
  2: '120',
};

export const SLOTS_MAX_COUNT: any = {
  Agenda: 1,
  OneDay: 10,
  ThreeDay: 5,
  sevenDay: 3,
  Month: 2,
};

export const SLOTS_WIDTH: any = {
  Agenda: 20,
  OneDay: 20,
  ThreeDay: 8,
  sevenDay: 4,
  Month: 20,
};

export const VIEW_COUNT_MAP: any = {
  Agenda: 1,
  OneDay: 1,
  ThreeDay: 3,
  sevenDay: 7,
  Month: 2,
};

export const VIEW_TYPE_API: any = {
  Agenda: '/event/range',
  OneDay: '/event/date',
  ThreeDay: '/event/range',
  sevenDay: '/event/range',
  Month: '/event/range',
};

export const getCalenderEvents = async (viewType: string, ViewDate: Date, session: any): Promise<any> => {
  const endpoint = `${import.meta.env.VITE_PMS_READ_SERVICE_URL}${VIEW_TYPE_API[viewType]}`;
  const payload = constructCalenderEventPayload(viewType, new Date(ViewDate), session);
  return axios
    .post(endpoint, payload)
    .then((response: any) => {
      return Promise.resolve(JSON.parse(JSON.stringify(response.data)));
    })
    .catch((error: any) => {
      return Promise.reject(error);
    });
};

const constructCalenderEventPayload = (viewType: string, ViewDate: Date, session: any) => {
  if (viewType === 'OneDay')
    return {
      userId: session.user.id,
      date: `${moment(ViewDate).format(import.meta.env.VITE_MOMENT_DATE_FORMAT)}`,
    };
  if (viewType === 'ThreeDay') {
    let fromDate = `${moment(ViewDate).format(import.meta.env.VITE_MOMENT_DATE_FORMAT)}`;
    let toDate = `${moment(ViewDate)
      .add(3, 'days')
      .format(import.meta.env.VITE_MOMENT_DATE_FORMAT)}`;
    return {
      userId: session.user.id,
      fromDate,
      toDate,
    };
  }
  return {};
};

export const getMappedSortedEvent = (data: any) => {
  let sampleobj = data.map((each: any) => ({ ...each._source }));
  //Should be removed after developing AFB view
  // sampleobj = sampleobj.filter((value) => !value?.bookables);
  // sampleobj = sampleobj.filter((value) => {
  //   // if (value.isAFB) {
  //   //   return value.tenantParticipants.find((user) => user.userId === value.organizer);
  //   // }
  //   return true;
  // });
  return getSortedEvent(sampleobj);
};

export const getSortedEvent = (events: Array<IEventNote>) => {
  return events?.sort((a, b) => {
    const aDate = a?.fromTime ? new Date(a.fromTime).getTime() : 0;
    const bDate = b?.fromTime ? new Date(b.fromTime).getTime() : 0;
    return aDate - bDate || Number(b.duration) - Number(a.duration) || a.title.localeCompare(b.title);
  });
};

export const getcalendarEventsList = async (session: any, payload: any) => {
  const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
  const response = await axios.post(url, payload, {
    headers: { Authorization: `Bearer ${session.id_token}` },
  });
  console.log('++++res', response?.data?.body);

  return response?.data?.body || [];
};

export const getCalenderEventsFromES = async (
  viewType: string,
  ViewDate: Date,
  session: any,
  userId?: string,
  organizerRoleId?: string,
  tenantparticipantsRoleId?: string
) => {
  let fromTimeES = new Date(new Date(ViewDate).setHours(0, 0, 0, 0));
  let toTimeES = new Date(new Date(ViewDate).setHours(0, 0, 0, 0));
  toTimeES.setTime(toTimeES.getTime() - 1);
  toTimeES.setDate(toTimeES.getDate() + VIEW_COUNT_MAP[viewType]);
  let shouldCriteria: any = [];
  let participantQuery: any = [{ match_phrase: { 'tenantParticipants.userId': `${userId || session.user.id}` } }];
  let organizerQuery: any = [{ match_phrase: { organizer: `${userId || session.user.id}` } }];

  if (userId && organizerRoleId && tenantparticipantsRoleId) {
    participantQuery.push({
      match_phrase: {
        'tenantParticipants.roleId': tenantparticipantsRoleId,
      },
    });
    organizerQuery.push({
      match_phrase: {
        organizerRoleId: organizerRoleId,
      },
    });
    shouldCriteria.push({
      bool: {
        must: [
          {
            match_phrase: {
              userId: userId || session.user.id,
            },
          },
          {
            match_phrase: {
              roleId: tenantparticipantsRoleId,
            },
          },
        ],
      },
    });
  }
  shouldCriteria = [...shouldCriteria, { bool: { must: participantQuery } }, { bool: { must: organizerQuery } }];

  const payload = {
    index: 'calendar_events',
    query: {
      bool: {
        filter: [
          { range: { fromTime: { lte: `${toTimeES.toISOString()}` } } },
          { range: { toTime: { gte: `${fromTimeES.toISOString()}` } } },
          {
            bool: {
              should: [...shouldCriteria],
            },
          },
        ],
      },
    },
    size: 10000,
  };
  const response = await getcalendarEventsList(session, payload);

  // filterting events for the third party calendar
  if (userId && organizerRoleId && tenantparticipantsRoleId) {
    return filterEvetsForThirdParty(response, userId, organizerRoleId);
  }

  return response;
};

export const getTimeRangeString = (fromTime: Date | string, toTime: Date | string) => {
  if (!fromTime || !toTime) return '-';
  return `${moment(new Date(fromTime)).format('h:mma')} - ${moment(new Date(toTime)).format('h:mma')}`;
};
export const getTimeRangeStringNew = (fromTime: Date | string, toTime: Date | string) => {
  if (!fromTime || !toTime) return '-';
  return `${moment(new Date(fromTime)).format('hh:mma')} - ${moment(new Date(toTime)).format('hh:mma')}`;
};
export const getTimeRangeStringNew1 = (fromTime: Date | string, toTime: Date | string) => {
  if (!fromTime || !toTime) return '-';
  return `${moment(new Date(fromTime)).format('hh:mm a')} - ${moment(new Date(toTime)).format('hh:mm a')}`;
};
export const getcalendarEvents = async (session: any, payload: any) => {
  const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
  const response = await axios.post(url, payload, {
    headers: { Authorization: `Bearer ${session.id_token}` },
  });
  return response?.data?.body || [];
};

// not in use
// export const getCalenderEventsFromESList = async (fromTine: any, toTime: any, searchedString: string, session: any) => {
//   let fromTimeES = new Date(new Date(fromTine).setHours(0, 0, 0, 0));
//   let toTimeES = new Date(new Date(toTime).setHours(0, 0, 0, 0));
//   const payload = {
//     index: 'calendar_events',
//     query: {
//       bool: {
//         must: [{ match: { title: `${searchedString}` } }, { match: { 'tenantParticipants.userId': `${session.user.id}` } }],
//         filter: [
//           { range: { fromTime: { lte: `${toTimeES.toISOString()}` } } },
//           { range: { fromTime: { gte: `${fromTimeES.toISOString()}` } } },
//         ],
//       },
//     },
//     size: 4,
//   };
//   return await getcalendarEventsList(session, payload);
// };

export const getCalenderEventsFromESFilter = async (params: FilterParameters) => {
  const {
    fromTime,
    toTime,
    callType,
    participants,
    searchedString,
    sessions,
    userId,
    organizerRoleId,
    tenantparticipantsRoleId,
  } = params || {};

  const fromTimeES = fromTime ? new Date(new Date(fromTime).setHours(0, 0, 0, 0)).toISOString() : null;
  const toTimeES = toTime ? new Date(new Date(toTime).setHours(23, 59, 59, 999)).toISOString() : null;

  const fromTimeQuery = fromTimeES ? [{ range: { fromTime: { gte: fromTimeES } } }] : [];
  const toTimeQuery = toTimeES ? [{ range: { fromTime: { lte: toTimeES } } }] : [];

  const calltypeES = callType ? [{ match: { callType: `${callType}` } }] : [];
  const searchQuery = searchedString ? [{ match_phrase_prefix: { title: `${searchedString}` } }] : [];

  const participantsObject = [];

  const organizerDataObject = [
    { match: { organizer: sessions.user.id } },
    { match: { 'tenantParticipants.userId': sessions.user.id } },
  ];
  const thirdpartyOrganizer = [
    {
      bool: {
        must: [
          {
            match_phrase: {
              'tenantParticipants.userId': userId,
            },
          },
          {
            match_phrase: {
              'tenantParticipants.roleId': tenantparticipantsRoleId,
            },
          },
        ],
      },
    },
    {
      bool: {
        must: [
          {
            match_phrase: {
              organizer: userId,
            },
          },
          {
            match_phrase: {
              organizerRoleId: organizerRoleId,
            },
          },
        ],
      },
    },
  ];
  participants?.forEach((data) => {
    participantsObject.push({ match: { 'tenantParticipants.userId': data } });
  });
  const payload = {
    index: 'calendar_events',
    query: {
      bool: {
        filter: [
          ...fromTimeQuery,
          ...toTimeQuery,
          {
            bool: {
              must: [
                ...searchQuery,
                ...calltypeES,
                ...participantsObject,
                {
                  bool: {
                    should:
                      userId && tenantparticipantsRoleId && organizerRoleId ? thirdpartyOrganizer : [...organizerDataObject],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    size: 10000,
  };
  console.log('!!! payload', payload);
  const response = await getcalendarEventsList(sessions, payload);

  // filter for third party calnedar
  if (userId && organizerRoleId && tenantparticipantsRoleId) {
    return filterEvetsForThirdParty(response, userId, organizerRoleId);
  }
  return response;
};

const filterEvetsForThirdParty = (response, userId, organizerRoleId) => {
  const filteredresponse = response.filter(({ _source: event }) => {
    if (event.eventType === 'availability') return true;
    if (event.eventType === 'events') {
      if (event.organizer === userId && event.organizerRoleId === organizerRoleId) {
        return true;
      } else {
        const allowUser = event.tenantParticipants.find(
          ({ roleId, userId: participentId }) => roleId === organizerRoleId && participentId === userId
        );
        if (allowUser) return true;
        return false;
      }
    }
    return false;
  });
  return filteredresponse;
};
