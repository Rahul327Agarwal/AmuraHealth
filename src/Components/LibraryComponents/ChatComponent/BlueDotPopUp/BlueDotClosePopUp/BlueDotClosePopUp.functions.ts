import { getUserNameFromES } from '../../../../../Common/Common.functions';
import { ISession } from '../../../../../Common/Common.types';
import ErrorToaster from '../../../../../Common/ErrorToaster';
import { INameCard } from '../../../../PanelComponents/MyListPanel/MyList/MyList.types';
import { IBlueDotInfo, ITaskDB, IUITaskDB } from '../BlueDotPopUp.types';
import { IProps, IReportiesData } from './BlueDotClosePopUp.types';
import axios from 'axios';

export const validateBlueDot = (description: string, owner: string, date: string, time: string) => {
  let error = {
    descriptionError: '',
    userError: '',
    dateError: '',
    timeError: '',
    default: '',
  };
  if (!description) {
    error.descriptionError = 'Description is required.';
  }
  if (description && description.length > 200) {
    error.descriptionError = 'Description length should be less than 200 characters.';
  }
  if (description && description.length < 8) {
    error.descriptionError = 'Description length should be more than 8 characters.';
  }
  if (!owner) {
    error.userError = 'Please select an assignee.';
  }
  if (time) {
    if (!date) {
      error.dateError = 'Please select a date.';
    }
    if (date) {
      let selectedDate = new Date(date);
      let dateString = `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}/${selectedDate.getFullYear()} ${time}`;
      selectedDate = new Date(dateString);
      if (selectedDate.getTime() < new Date().getTime()) {
        error.dateError = 'Please select a future time';
      }
    }
  }
  return error;
};

/**
 * This method is used to fetch all the tasks assign for a user for a particular client
 * @param props
 * @param selectedClientObject
 * @returns {Promise<Array<ITaskDB>>}
 */
export const getBlueDotsOfAUser = async (
  panelId: string,
  sessions: ISession,
  selectedClientObject: INameCard,
  ownerId: string,
  ownerRoleId: string,
  allUserRoles,
  fetchUserName: (id: string) => Promise<string>
): Promise<Array<IUITaskDB>> => {
  try {
    let results = await axios.post(
      `${import.meta.env.VITE_BASE_API_URL}/searchInES`,
      {
        index: 'pms_bluedot',
        query: {
          bool: {
            must: [
              {
                match_phrase: {
                  sortKey: `${ownerRoleId}~${ownerId}`,
                },
              },
              {
                match_phrase: {
                  partKey: `${selectedClientObject.tenantId ? selectedClientObject.tenantId : ''}${
                    selectedClientObject?.additionalKeys?.patientId ? '~' : ''
                  }${selectedClientObject?.additionalKeys?.patientId}`,
                },
              },
              {
                match: {
                  ownerId,
                },
              },
            ],
          },
        },
        size: 10000,
      },
      {
        headers: {
          Authorization: `Bearer ${sessions?.id_token}`,
        },
      }
    );
    let tasks: { _source: ITaskDB }[] = results.data.body || [];
    if (tasks && tasks.length > 0) {
      let responseTask = tasks.map((result) => result._source);
      let sortedData = sortingTasks(responseTask as IUITaskDB[]);
      for (let index = 0; index < sortedData.length; index++) {
        const element = sortedData[index];
        // const userName = await getUserNameFromES(element.createdBy);
        const userName = await fetchUserName(element.createdBy);

        sortedData[index] = { ...element, displayName: `${userName}` };
      }
      return sortedData;
    }
  } catch (e) {
    console.error('Unable to get BlueDots of a user:: ', JSON.stringify(e));
    ErrorToaster('Something went wrong! While fetching tasks', panelId, 'error');
  }
  return [];
};

/**
 *
 * @param sessions Session details for Authorization
 * @param roleId role id of staff
 * @param staffId staff id
 * @param tenantId tenant id
 * @param patientId client id
 * @returns list of bluedots that are assigned to staff
 */
export const getBlueDotsOfAStaffForAPatient = async (
  panelId: string,
  sessions: ISession,
  roleId: string,
  staffId: string,
  tenantId: string,
  patientId: string
): Promise<Array<ITaskDB>> => {
  try {
    let results = await axios.post(
      `${import.meta.env.VITE_BASE_API_URL}/searchInES`,
      {
        index: 'pms_bluedot',
        query: {
          bool: {
            must: [
              {
                match_phrase: {
                  sortKey: `${roleId}~${staffId}`,
                },
              },
              {
                match_phrase: {
                  partKey: `${tenantId}~${patientId}`,
                },
              },
            ],
          },
        },
        size: 10000,
      },
      {
        headers: {
          Authorization: `Bearer ${sessions?.id_token}`,
        },
      }
    );
    let tasks: { _source: ITaskDB }[] = results.data.body || [];
    if (tasks && tasks.length > 0) {
      let responseTask = tasks.map((result) => result._source);
      return Promise.resolve(responseTask);
    }
    return Promise.resolve([]);
  } catch (e) {
    console.error('Unable to get BlueDots of a user:: ', JSON.stringify(e));
    ErrorToaster('Something went wrong! While fetching tasks', panelId, 'error');
    return Promise.reject([]);
  }
};

/**
 *
 * @param sessions Session details for Authorization
 * @param roleId role id of staff
 * @param staffId staff id
 * @returns list of bluedots that are assigned to staff
 */
export const getBlueDotsOfAStaffForAnyPatient = async (
  panelId: string,
  sessions: ISession,
  roleId: string,
  staffId: string
): Promise<Array<ITaskDB>> => {
  try {
    let results = await axios.post(
      `${import.meta.env.VITE_BASE_API_URL}/searchInES`,
      {
        index: 'pms_bluedot',
        query: {
          bool: {
            must: [
              {
                match_phrase: {
                  sortKey: `${roleId}~${staffId}`,
                },
              },
            ],
          },
        },
        size: 10000,
      },
      {
        headers: {
          Authorization: `Bearer ${sessions?.id_token}`,
        },
      }
    );
    let tasks: { _source: ITaskDB }[] = results.data.body || [];
    if (tasks && tasks.length > 0) {
      let responseTask = tasks.map((result) => result._source);
      return Promise.resolve(responseTask);
    }
    return Promise.resolve([]);
  } catch (e) {
    console.error('Unable to get BlueDots of a user:: ', JSON.stringify(e));
    ErrorToaster('Something went wrong! While fetching tasks', panelId, 'error');
    return Promise.reject([]);
  }
};

/**
 *
 * @param sessions Session details for Authorization
 * @param roleId role id of staff
 * @param staffId staff id
 * @returns list of bluedots that are assigned to staff
 */
export const getClientDetailsForAStaff = async (
  panelId: string,
  sessions: ISession,
  roleId: string,
  staffId: string
): Promise<Array<ITaskDB>> => {
  try {
    let results = await axios.post(
      `${import.meta.env.VITE_BASE_API_URL}/searchInES`,
      {
        index: 'pms_hierarchy',
        query: {
          bool: {
            must: [
              {
                match_phrase: {
                  sortKey: `${roleId}~${staffId}`,
                },
              },
            ],
          },
        },
        size: 10000,
      },
      {
        headers: {
          Authorization: `Bearer ${sessions?.id_token}`,
        },
      }
    );
    let tasks: { _source: ITaskDB }[] = results.data.body || [];
    if (tasks && tasks.length > 0) {
      let responseTask = tasks.map((result) => result._source);
      return Promise.resolve(responseTask);
    }
    return Promise.resolve([]);
  } catch (e) {
    console.error('Unable to get BlueDots of a user:: ', JSON.stringify(e));
    ErrorToaster('Something went wrong! While fetching tasks', panelId, 'error');
    return Promise.reject([]);
  }
};
export const sortingTasks = (tasks: IUITaskDB[]) => {
  let sortedData = tasks.sort((a, b): any => {
    if (!a?.endTime && b?.endTime) {
      return 1;
    }
    if (a?.endTime && !b?.endTime) {
      return -1;
    }
    if (!a?.endTime && !b?.endTime) {
      return 0;
    }
    return new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
  });
  return sortedData;
};

export async function getFormatedData(array) {
  const results = [];
  for (let i = 0; i < array.length; i++) {
    const result = await getUserNameFromES(array[i].ownerId);
    results.push({ ...array[i], name: result });
  }
  return results;
}
