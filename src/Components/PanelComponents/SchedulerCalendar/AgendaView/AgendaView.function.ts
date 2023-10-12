import axios from 'axios';
import moment from 'moment';

export const filterAFBBookablesData = (data: any) => {
  let filterResults = data.filter((items: any) => {
    return !(items._source?.isAFB && !items._source?.bookableIds) && !(!items._source?.isAFB && items._source?.bookables);
  });
  return filterResults;
};
export const getcalendarEventsList = async (session: any, payload: any) => {
  const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
  const response = await axios.post(url, payload, {
    headers: { Authorization: `Bearer ${session.id_token}` },
  });
  return response?.data?.body || [];
};
export const getCalenderEventsFromESFilter = async (fromTime: any, toTime: any, session: any, thirdPartyUserId?: string) => {
  let fromTimeES = new Date(new Date(moment(fromTime).subtract(1, 'days').toDate()).setHours(0, 0, 0, 0));
  let toTimeES = new Date(new Date(toTime).setHours(23, 59, 59, 999));
  const payload = {
    index: 'calendar_events',
    query: {
      bool: {
        filter: [
          { range: { fromTime: { lte: `${toTimeES.toISOString()}` } } },
          { range: { fromTime: { gte: `${fromTimeES.toISOString()}` } } },
          {
            bool: {
              must: [
                {
                  bool: {
                    should: [
                      { match: { 'tenantParticipants.userId': `${thirdPartyUserId ? thirdPartyUserId : session.user.id}` } },
                      { match: { organizer: `${thirdPartyUserId ? thirdPartyUserId : session.user.id}` } },
                    ],
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
  return await getcalendarEventsList(session, payload);
};
