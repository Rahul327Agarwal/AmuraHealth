import axios from 'axios';
import { addDays } from 'date-fns';
import { isArray } from 'lodash';
import { abortablePromise } from '../../../../Utilities/AbortablePromise';
import { ICard, INameCard } from '../MyList/MyList.types';

export const getRoleId = (activeTab: any, reporteesData, cardData: ICard) => {
  if (activeTab?.selectedReportees && isArray(activeTab.selectedReportees)) {
    let roleId =
      activeTab.selectedReportees.find(
        ({ roleId, staffId, reportingRoleId }) => cardData.roleId === roleId && cardData.staffId === staffId
      )?.reportingRoleId || '';
    if (roleId) {
      return roleId;
    }
  }
  if (reporteesData?.reportingRoleId) {
    return reporteesData.reportingRoleId;
  }
  return cardData.roleId;
};

export const updateGreenDotAPI = async (currentCard, session) => {
  let payload = {
    id: currentCard.id,
    lastSeenTimeStamp: new Date().toISOString(),
  };
  const url = `${import.meta.env.VITE_UPDATE_GREEN_DOT}`;
  let response = await axios.post(url, payload, {
    headers: { Authorization: `Bearer ${session.id_token}` },
  });
};

export const getActualReportingRoleId = (activeTab: any, reporteesData, cardData: ICard) => {
  if (activeTab?.selectedReportees && isArray(activeTab.selectedReportees)) {
    let roleId =
      activeTab.selectedReportees.find(
        ({ roleId, staffId, reportingRoleId }) => cardData.roleId === reportingRoleId && cardData.staffId === staffId
      )?.roleId || '';
    if (roleId) {
      return roleId;
    }
  }
  if (reporteesData?.roleId) {
    return reporteesData.roleId;
  }
  return cardData.roleId;
};

export const getStaffId = (activeTab: any, reporteesData, cardData: ICard) => {
  if (activeTab?.selectedReportees && isArray(activeTab.selectedReportees)) {
    let staffId =
      activeTab.selectedReportees.find(
        ({ roleId, staffId, reportingRoleId }) => cardData.roleId === roleId && cardData.staffId === staffId
      )?.staffId || '';
    if (staffId) {
      return staffId;
    }
  }
  if (reporteesData?.staffId) {
    return reporteesData.staffId;
  }
  return cardData.staffId;
};
export const getcalendarEventsList = async (session: any, payload: any) => {
  const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
  const response = await axios.post(url, payload, {
    headers: { Authorization: `Bearer ${session.id_token}` },
  });
  return response?.data?.body || [];
};

export const getFilteredCalenderEventsFromES = async (viewType: string, ViewDate: Date, session: any) => {
  let fromTimeES = new Date(new Date(ViewDate).setHours(0, 0, 0, 0));
  let toTimeES = addDays(fromTimeES, 1);
  // toTimeES.setDate(toTimeES.getDate() + (VIEW_COUNT_MAP as any)[viewType]);
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

export const getFilteredCalenderEventsbyId = async (eventId: string, session: any, signal?: AbortSignal) => {
  const payload = {
    index: 'calendar_events',
    query: {
      bool: {
        must: [
          // {
          //   match: {
          //     userId: `${session.user.id}`,
          //   },
          // },
          {
            match_phrase: {
              eventId: `${eventId}`,
            },
          },
        ],
      },
    },
  };

  const eventPromise = getcalendarEventsList(session, payload);
  const eventData = await abortablePromise(eventPromise, signal);
  return eventData;
};

export const getFilteredCalenderEventsbyAFBId = async (
  eventId: string,
  session: any,
  afterActivityEventId?: string,
  beforeActivityEventId?: string,
  signal?: AbortSignal
) => {
  const payload = {
    index: 'calendar_events',

    query: {
      bool: {
        should: [
          {
            match_phrase: {
              eventId: `${eventId}`,
            },
          },
          {
            match_phrase: {
              eventId: `${afterActivityEventId}`,
            },
          },
          {
            match_phrase: {
              eventId: `${beforeActivityEventId}`,
            },
          },
        ],
      },
    },
  };
  const eventPromise = getcalendarEventsList(session, payload);
  const eventData = await abortablePromise(eventPromise, signal);
  return eventData;
};
