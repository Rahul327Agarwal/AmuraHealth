import axios from 'axios';
import moment from 'moment';
import { getEsDataforUsersArray } from '../../../../Common/Common.functions';
import ErrorToaster from '../../../../Common/ErrorToaster';
import { TimeOptions } from './BlueDotPopUp.types';
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
        error.timeError = 'Please select a future time';
      }
    }
  }
  if (date) {
    if (!time) {
      error.timeError = 'Please select a time.';
    }
  }
  return error;
};
export const inputOnChangeFunction = (type: string, data: string) => {
  let error = {
    descriptionError: '',
    userError: '',
    dateError: '',
    timeError: '',
    default: '',
  };
  if (type !== 'description') {
    error.descriptionError = 'Description is required.';
  }
  if (type !== 'description' && data.length > 200) {
    error.descriptionError = 'Description length should be less than 200 characters.';
  }
  if (type !== 'description' && data.length < 8) {
    error.descriptionError = 'Description length should be more than 8 characters.';
  }
  if (type !== 'owner') {
    error.userError = 'Please select an assignee.';
  }
  if (type === 'time') {
    error.dateError = 'Please select a date.';
  }
  if (type === 'date') {
    let selectedDate = new Date(data);
    let dateString = `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}/${selectedDate.getFullYear()} ${data}`;
    selectedDate = new Date(dateString);
    if (selectedDate.getTime() < new Date().getTime()) {
      error.dateError = 'Please select a future time';
    }
  }

  return error;
};

export const contructDateTime = (panelId: string, date: Date, time: string) => {
  try {
    return new Date(`${date.toDateString()} ${time}`).toISOString();
  } catch {
    ErrorToaster('Error while creating blue dot', panelId, 'error');
  }
};

export const getHierarchyStaff = async (hierarchyId: string, roles?: Array<any>) => {
  try {
    let staffs: any;
    if (!hierarchyId) {
      return Promise.resolve(null);
    }
    let query = {
      index: 'pms_hierarchy',
      query: {
        constant_score: {
          filter: {
            term: {
              hierarchyId: `${hierarchyId}`,
            },
          },
        },
      },
    };
    const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
    const response = await axios.post(url, query);
    // return response?.data?.body || [];

    staffs = response?.data?.body?.map((value) => value._source) || [];
    let staffIds = [];
    let roomDetails = staffs.map((staff) => {
      let [tenantId, patientId] = staff.partKey.split('~');
      let [roleId, staffId, hierarchyId] = staff.sortKey.split('~');
      staffIds.push(staffId);
      return {
        staffId,
        roleId,
      };
    });
    const users = staffIds.map((data) => ({ match: { _id: data } }));
    const userNameObject = (await getEsDataforUsersArray(users)) || {};
    let detailsToSend = roomDetails.map(({ staffId, roleId }) => {
      return {
        value: `~${staffId}~${roleId}~`,
        label: `${userNameObject[staffId] || staffId} - ${
          (roles || []).find((role) => role.sort_key === roleId)?.description || roleId
        }`,
        hierarchyId: hierarchyId,
      };
    });
    return detailsToSend || [];
  } catch (e) {
    console.log('Error while loading hierarchy', e);
    return [];
  }
};

export const generateTimeOptionsFrom = (inputTime) => {
  if (inputTime && moment(inputTime).date() === moment().date()) {
    const startTime = moment(inputTime);
    const timeOptions = [];

    startTime
      .minute(Math.ceil(startTime.minute() / 15) * 15)
      .second(0)
      .millisecond(0);
    while (startTime.date() === moment(inputTime).date()) {
      timeOptions.push(startTime.format('hh:mm A'));
      startTime.add(15, 'minutes');
    }
    return timeOptions;
  } else {
    return TimeOptions;
  }
};
