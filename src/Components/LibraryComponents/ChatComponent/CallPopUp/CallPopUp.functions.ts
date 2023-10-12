import axios from 'axios';
import { isValidNumber } from '../../../../Common/Common.functions';
import { IOptions } from './CallPopUp.types';

interface IErrorObject {
  titleError: string;
  callTypeError: string;
  timeError: string;
  userError: string;
  default: string;
  hasError: boolean;
}

export const validateBlueDot = (title: string, callType: string, time: string, user: string, roleIds: string): IErrorObject => {
  let error = {
    titleError: '',
    callTypeError: '',
    timeError: '',
    userError: '',
    default: '',
    hasError: false,
  };
  if (!title) {
    error.titleError = 'Title is required.';
    error.hasError = true;
  }
  if (title && title.length <= 8) {
    error.titleError = 'Title should be more than 8 characters.';
    error.hasError = true;
  }
  if (title && title.length > 56) {
    error.titleError = 'Title should be less than 57 characters.';
    error.hasError = true;
  }
  if (!roleIds && !user) {
    error.userError = 'Please select a participant.';
    error.hasError = true;
  }
  if (!callType) {
    error.callTypeError = 'Please select a call type.';
    error.hasError = true;
  }
  if (!time) {
    error.timeError = 'Please enter call duration.';
    error.hasError = true;
  }
  if (!isValidNumber(time)) {
    error.timeError = 'Please enter call duration.';
    error.hasError = true;
  }
  if (isValidNumber(time) && Number(time) <= 0) {
    error.timeError = 'Please enter valid call duration.';
    error.hasError = true;
  }
  if (isValidNumber(time) && Number(time) > 0 && Number(time) < 10) {
    error.timeError = 'Call duration cannot be less than 10 minutes.';
    error.hasError = true;
  }
  if (isValidNumber(time) && Number(time) > 1440) {
    error.timeError = 'Call duration cannot be more than 1 day.';
    error.hasError = true;
  }
  return error;
};

export const initialscheduleEvent = {
  channel: '',
  duration: '',
  timeUnits: '',
  participants: [],
  title: '',
  roleIds: [],
};
export const callTypeItem = [{ value: 'voice', label: 'voice' }];

export const roleOptions = [
  { value: 'L1 - Intake Doctor', label: 'L1 - Intake Doctor' },
  { value: 'L2 - Intake Doctor', label: 'L2 - Intake Doctor' },
];

export const getSchedulerRolesData = async (sessions: any) => {
  const payload = {
    payLoad: {
      partKey: 'lov_name',
      partKeyValue: `~scheduler~pool~list~`,
      tableName: 'platform-lov-master',
    },
  };
  const url = `${import.meta.env.VITE_BASE_API_URL}/queryFromDB`;
  try {
    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${sessions.id_token}` },
    });
    if (response?.data?.length > 0) {
      return checkAndModifyResponseData(response.data);
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const checkAndModifyResponseData = (data: any): IOptions[] => {
  try {
    let modifiedData = [];
    data
      .filter((each) => {
        let validData = each && Object.keys(each).length > 0 && each?.lov_name_id && each?.value;
        if (!validData) console.error('Error:: Data incorrect::', each);
        return validData;
      })
      .map((each) => {
        let formatData = { label: each.lov_name_id, value: each.value };
        modifiedData.push(formatData);
        return each;
      });
    return modifiedData;
  } catch (e) {
    console.log(e);
  }
};
