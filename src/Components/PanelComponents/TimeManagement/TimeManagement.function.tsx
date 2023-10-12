import axios from 'axios';
import { format } from 'date-fns';
import moment from 'moment';
import ErrorToaster from '../../../Common/ErrorToaster';
import SuccessToaster from '../../../Common/SuccessToaster';
import { AmuraIcon24, VideoChannelIcon, VoiceChannelIcon } from '../../SVGs/Common';
import {
  EventType,
  ICustomNotifyState,
  IDateState,
  IEditPermission,
  IErrorObject,
  IEventsState,
  IOfflineState,
  IOutOfOfficeState,
  ISelectOption,
  ISlotsState,
} from './TimeManagement.types';
import { PMS_S3 } from '../../../Utils';
import { ISession } from '../../../Common/Common.types';

export const TM_IDS: any = {
  CUSTOM_REPEAT: 'customRepeat',
  CUSTOM_DURATION: 'CUSTOM_DURATION',
  EVENT: 'events',
  SLOT: 'availability',
  OFFLINE: 'Offline',
  OUT_OF_OFFICE: 'Offline',
  CUSTOM: 'CUSTOM',
  DAYS: 'days',
  WEEKS: 'weeks',
  NEVER: 'never',
  ON: 'on',
  AFTER: 'afterOccurrences',
  DOESNT_REPEAT: 'doesntRepeat',
  DAILY: 'daily',
  EVERY_WEEKDAY: 'everyWeekday',
  WEEKDAY: 'weekday',
  YES: 'Yes',
  NO: 'No',
  UPDATE: 'update',
  VIDEO: 'video',
  VOICE: 'voice',
  DELETE: 'DELETE',
  DECLINE: 'DECLINE',
  ACCEPT: 'ACCEPT',
  MODIFY_EVENT: 'modifyEvent',
  PUBLIC: 'public',
  PRIVATE: 'private',
  ALL_EVENTS: 'all_events',
  THIS_AND_FOLLOWING_EVENTS: 'this_and_following_events',
};

export const TAB_OPTIONS = [
  { label: 'Event', value: TM_IDS.EVENT },
  { label: 'Availability', value: TM_IDS.SLOT },
];

export const RSVP_OPTIONS = [
  { label: 'This event only', value: 'thisEvent' },
  // { label: 'This and future events', value: 'thisAndFutureEvents' },
  { label: 'All events', value: 'allEvents' },
];

export const TENANT_OPTIONS = [
  { label: 'Amura', value: 'amura', icon: <AmuraIcon24 /> },
  // { label: 'Amura India', value: 'amuraIndia', icon: AmuraIcon },
  // { label: 'Amura US', value: 'amuraUS', icon: AmuraIcon },
];

export const DURATION_OPTIONS = [
  { label: '15 minutes', value: '15' },
  { label: '30 minutes', value: '30' },
  { label: '45 minutes', value: '45' },
  { label: '1 hour', value: '60' },
  { label: '2 hour', value: '120' },
  { label: 'Custom', value: TM_IDS.CUSTOM },
];
export const getUserNameFromES = async (userId: string) => {
  const payload = {
    index: 'users',
    _source: ['sort_key', 'profile.nick_name', 'profile.first_name', 'profile.last_name'],
    query: { match: { _id: `${userId}` } },
  };
  const response = await getUsersList2(payload);
  const userName =
    `${response[0]?._source?.profile?.first_name} ${response[0]?._source?.profile?.last_name}` || response[0]?._id || userId;
  return userName || '';
};

export const getUsersList2 = async (payload: any) => {
  try {
    const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
    const response = await axios.post(url, payload);
    return response?.data?.body || [];
  } catch (error) {
    console.error(error, 'get users error in ES ');
    return [];
  }
};
export const DURATION_TIME_VALUES = [15, 30, 45, 60, 120];

export const REPEAT_OPTIONS = [
  { label: 'Doesn’t repeat', value: TM_IDS.DOESNT_REPEAT },
  { label: 'Daily', value: TM_IDS.DAILY },
  { label: 'Every weekday', value: TM_IDS.EVERY_WEEKDAY },
  { label: 'Custom', value: TM_IDS.CUSTOM },
];

export const VISIBILITY_OPTIONS = [
  { label: 'Public', value: 'public' },
  { label: 'Private', value: 'private' },
];
export const VISIBILITY = [
  { label: 'Public', value: TM_IDS.PUBLIC },
  { label: 'Private', value: TM_IDS.PRIVATE },
];
export const BUSY_OPTIONS = [
  { label: 'Busy', value: 'busy' },
  { label: 'Free', value: 'free' },
];

export const CHANNEL_OPTIONS = [
  { label: 'Video call', value: TM_IDS.VIDEO, icon: <VideoChannelIcon /> },
  { label: 'Voice call', value: TM_IDS.VOICE, icon: <VoiceChannelIcon /> },
];

export const CHANNEL_ICON = {
  [TM_IDS.VIDEO]: <VideoChannelIcon />,
  [TM_IDS.VOICE]: <VoiceChannelIcon />,
};
export const PERMISSION_OPTIONS = [
  // { label: 'Invite others', value: 'inviteOthers' },
  { label: 'Modify events', value: TM_IDS.MODIFY_EVENT },
  { label: 'None', value: 'None', hidden: true },
];

export const DAYS_OPTIONS = [
  { label: 'S', value: 'sunday', index: 0 },
  { label: 'M', value: 'monday', index: 1 },
  { label: 'T', value: 'tuesday', index: 2 },
  { label: 'W', value: 'wednesday', index: 3 },
  { label: 'T', value: 'thursday', index: 4 },
  { label: 'F', value: 'friday', index: 5 },
  { label: 'S', value: 'saturday', index: 6 },
];

export const REPEAT_EVERY_OPTIONS = [
  { label: 'Days', value: TM_IDS.DAYS },
  { label: 'Weeks', value: TM_IDS.WEEKS },
  // { label: 'Months', value: 'Months' },
  // { label: 'Years', value: 'Years' },
];

export const NOTIFICTION_OPTIONS = ['1 minute before', '3 minutes before', '10 minutes before', '30 minutes before'];

export const TIME_UNIT_OPTIONS = [
  { label: 'Minutes', value: 'minutes' },
  { label: 'Hours', value: 'Hours' },
  { label: 'Days', value: 'Days' },
  { label: 'Weeks', value: 'Weeks' },
  { label: 'Month', value: 'Month' },
  { label: 'Year', value: 'Year' },
];

export const NOTIFICATION_TYPE = ['minutes', 'hours', 'days', 'weeks', 'months', 'years'];

export const TIMEZONE_OPTIONS = [{ label: 'Indian Standard Time', value: 'indianStandardTime' }];

export const DEFAULT_CUSTOM_NOTIFY: ICustomNotifyState = {
  time: '',
  unit: 'minutes',
};

export const DEFAULT_DATE_STATE: IDateState = {
  eventDate: new Date(),
  time: '',
  duration: '30',
  timeZone: 'indianStandardTime',
};

export const DEFAULT_EVENT: IEventsState = {
  isExcludeMeFromEvent: false,
  visibility: 'public',
  status: 'busy',
  callType: TM_IDS.VIDEO,
  others: '',
  description: '',
  permissons: ['None'],
};
export const DEFAULT_OFFLINE: IOfflineState = {
  startDate: null,
  startTime: '',
  EndTime: '',
  endDate: null,
  timeZone: 'indianStandardTime',
  repeatType: true,
  description: '',
};
export const DEFAULT_SLOTS: ISlotsState = {
  maximumUses: '',
  visibility: 'public',
  allowedMaximumDays: '',
  useWorkingTime: false,
  roleId: '',
  activityType: '',
  status: 'busy',
  cannotBookBefore: '',
};

export const DEFAULT_EDIT_PERMISSION: IEditPermission = {
  eventType: true,
  tenantName: true,
  eventDate: true,
  time: true,
  duration: true,
  repeatType: true,
  permissions: true,
};

export const DEFAULT_OUT_OF_OFFICE: IOutOfOfficeState = {
  decline: false,
  meetingType: 'all',
  visibility: 'public',
};

export const RSVP_VALUE = {
  thisEvent: { thisEvent: true, allEvents: false },
  allEvents: { thisEvent: false, allEvents: true },
};
export const DEFAULT_RSVP = {
  thisEvent: true,
  allEvents: false,
  value: TM_IDS.UPDATE,
  selected: 'thisEvent',
};

export const ERROR_OBJECT: IErrorObject = {
  title: '',
  roleId: '',
  tenantName: '',
  eventDate: '',
  time: '',
  duration: '',
  timeZone: '',
  visibility: '',
  permissons: '',
  status: '',
  callType: '',
  allowedMaximumDays: '',
  activityType: '',
  maximumUses: '',
  bookables: '',
};

export const DEFAULT_CUSTOM_REPEAT = {
  repeatType: TM_IDS.DAYS,
  weekDaysName: [format(new Date(), 'EEEE').toLowerCase()],
  ends: {
    never: true,
    on: null,
    afterOccurrences: 30,
  },
  endsType: TM_IDS.NEVER,
  startDate: '',
  repeatsEvery: 1,
  monthsOccurance: {
    monthEndType: 'monthlyOnDay',
    monthlyOnDay: null,
    monthlyOnWeekday: null,
    monthlyNthWeekday: null,
  },
  key: '',
};

export const validateFields = (props: any, eventType: EventType, isEditEvent?: boolean) => {
  let errorsObject = JSON.parse(JSON.stringify(ERROR_OBJECT));
  let isValid = true;

  if (!props.title.trim().length) {
    errorsObject.title = 'The field is empty/invalid.';
    isValid = false;
  } else if (props.title.trim().length > 40) {
    errorsObject.title = 'Maximum of 40 characters are allowed.';
    isValid = false;
  }
  if (!props.tenantName) {
    errorsObject.tenantName = 'The field is empty/invalid.';
    isValid = false;
  }
  // if (!props.time) {
  //   errorsObject.time = 'The field is empty/invalid.';
  //   isValid = false;
  // }
  // if (!props.duration) {
  //   errorsObject.duration = 'The field is empty/invalid.';
  //   isValid = false;
  // }
  // if (!props.eventDate) {
  //   errorsObject.eventDate = 'The field is empty/invalid.';
  //   isValid = false;
  // }
  if (!props.activityType && eventType === TM_IDS.SLOT) {
    errorsObject.activityType = 'The field is empty/invalid.';
    isValid = false;
  }
  if (!props.roleId && eventType === TM_IDS.SLOT) {
    errorsObject.roleId = 'This field is emplty/invalid.';
    isValid = false;
  }
  if (!props.roleId && !isEditEvent) {
    errorsObject.roleId = 'This field is emplty/invalid.';
    isValid = false;
  }
  if (!props.allowedMaximumDays && eventType === TM_IDS.SLOT) {
    errorsObject.allowedMaximumDays = 'This field is emplty/invalid.';
    isValid = false;
  }
  if (!props.maximumUses && eventType === TM_IDS.SLOT) {
    errorsObject.maximumUses = 'This field is emplty/invalid.';
    isValid = false;
  } else {
    const maximumPossibleUses = Math.floor(Number(props?.duration) / Number(props?.bookablesObject?.activityLength));
    if (props.maximumUses && eventType === TM_IDS.SLOT && Number(props.maximumUses) > maximumPossibleUses) {
      errorsObject.maximumUses = `Should be less than ${maximumPossibleUses + 1}`;
      isValid = false;
    }
    if (props.maximumUses && eventType === TM_IDS.SLOT && maximumPossibleUses === 0) {
      errorsObject.bookables = 'Bookable time should not exceeds the duration';
      isValid = false;
    }
  }
  if (props.allowedMaximumDays && Number(props.allowedMaximumDays) < 1 && eventType === TM_IDS.SLOT) {
    errorsObject.allowedMaximumDays = 'Should be greater than zero.';
    isValid = false;
  }
  return { isValid, errorsObject };
};

export const validateCustomDurationFields = (params: any) => {
  let errorsObject = { HH: '', MM: '', duplicateValue: '' };
  let isValid = true;
  const totalMinutes = Number(params.HH) * 60 + Number(params.MM);
  if (DURATION_TIME_VALUES.includes(totalMinutes)) {
    isValid = false;
    errorsObject.duplicateValue = 'Time Values Alredy Present';
  }
  if (Number(params.HH) > 23) {
    isValid = false;
    errorsObject.HH = 'Please enter valid time';
  }
  if (Number(params.MM) > 59) {
    isValid = false;
    errorsObject.MM = 'Please enter valid time';
  }
  if (Number(params.HH) * 60 + Number(params.MM) == 0) {
    isValid = false;
    errorsObject.HH = 'Please enter valid time';
    errorsObject.MM = 'Please enter valid time';
  }
  return { isValid, errorsObject };
};

export const setNewCustomOption = (preOptions: Array<ISelectOption>, newOption: ISelectOption, customKey: string) => {
  let options = [...preOptions];
  let indexValue = options.findIndex((item) => item.value === customKey);
  if (indexValue === -1) {
    const lastvalue = options[options.length - 1];
    options[options.length - 1] = newOption;
    options.push(lastvalue);
    return options;
  }
  let value = options.map((item) => (item.value === customKey ? newOption : item));
  const copyValue = [...value].splice(0, value.length - 2);
  const lastvalue = value[value.length - 1];
  const secondlastvalue = value[value.length - 2];

  return [...copyValue, secondlastvalue, lastvalue];
};

export const getCustomRepeatLabel = (customRepeat) => {
  const { endsType, repeatsEvery, repeatType, weekDaysName, ends } = customRepeat || {};
  const weeks = repeatType === TM_IDS.WEEKS ? ` on ${weekDaysName.length === 7 ? 'all days' : weekDaysName?.join(', ')}` : '';
  const render = repeatType === TM_IDS.DAYS ? 'Daily' : repeatType === TM_IDS.WEEKS ? 'Weekly' : '';
  const renderInit = repeatsEvery === 1 ? render : `Every ${repeatsEvery} ${repeatType}`;

  switch (endsType) {
    case TM_IDS.NEVER:
      return `${renderInit}${weeks}`;
    case TM_IDS.ON:
      return `${renderInit}${weeks}, until ${moment(ends.on).format('D MMM yyyy')}`;
    case TM_IDS.AFTER:
      return `${renderInit}${weeks}, ${ends.afterOccurrences} times`;
  }
};

export const getReccurance = ({ customRepeat, repeatType, startDate }) => {
  const DEFAULT_RECCURANCE = {
    ends: { never: true, on: '', afterOccurrences: 0 },
    endsType: TM_IDS.NEVER,
    startDate,
    repeatsEvery: 1,
    repeatType: TM_IDS.DAYS,
  };

  switch (repeatType) {
    case TM_IDS.DAILY:
      return { ...DEFAULT_RECCURANCE, ends: { never: true } };
    case TM_IDS.EVERY_WEEKDAY:
      return {
        ...DEFAULT_RECCURANCE,
        repeatType: TM_IDS.WEEKS,
        weekDays: [1, 2, 3, 4, 5],
      };
    case TM_IDS.WEEKDAY:
      return { ...DEFAULT_RECCURANCE, repeatType: TM_IDS.WEEKS, weekDays: [4] };
    case TM_IDS.CUSTOM_REPEAT: {
      const { weekDaysName, ...reccurance } = customRepeat;

      delete reccurance.key;
      const weekDays = weekDaysName?.map((d1) => DAYS_OPTIONS?.find((d2) => d2.value === d1)?.index);

      return { ...reccurance, weekDays, startDate };
    }
    default:
      return {};
  }
};

export const getNotifyMessage = (notify: Array<string>) => {
  if (!notify?.length) return '';
  if (notify?.length <= 2) {
    const newdata = notify?.map((data, i, arr) => {
      let numData = data; //parseInt(data) > 1 ? data : data.slice(0, -1);
      if (i === 1) return ` and ${numData}`;
      return `${numData}`;
    });
    return newdata.join('');
  }
  const newdata = notify?.map((data, i, arr) => {
    let numData = data; //parseInt(data) > 1 ? data : data.slice(0, -1);
    if (arr.length - 1 === i + 1) return `${numData} and `;
    if (arr.length - 1 === i) return `${numData}`;
    return `${numData}, `;
  });
  return newdata.join('');
};

export const getUsersList = async (payload: any) => {
  const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
  const response = await axios.post(url, payload);
  return response?.data?.body || [];
};

export const getSearchUsers = async (searchText?: string, sessions?: ISession) => {
  try {
    // const payload = {
    //   index: 'users',
    //   _source: ['user_id', 'profile.nick_name', 'profile.first_name', 'profile.last_name'],
    //   query: {
    //     query_string: {
    //       fields: ['profile.nick_name'],
    //       query: `*${searchText}*`,
    //     },
    //   },
    //   size: 10000,
    // };
    // const response: any = await getUsersList(payload);
    const payload = {
      size: 10000,
      index: 'users',
      keyToCheck: 'profile.nick_name',
      value: searchText ?? '',
      method: 'POST',
      url: `${import.meta.env.VITE_BASE_API_URL}/search`,
      token: sessions.id_token,
      headers: {},
    };
    const response = await PMS_S3.postData(payload);
    if (response) {
      const options = response.map(({ _source }) => {
        const { user_id, profile } = _source;
        const userName = `${profile.first_name || ''} ${profile.last_name || ''}`;

        return { value: user_id, label: userName };
      });
      return options || [];
    }
    return [];
  } catch (error) {
    return [];
  }
};

export const getCurrentUserdata = async (userIds: Array<string>) => {
  try {
    const esArray = userIds.map((data) => ({ match: { _id: data } }));
    const payload = {
      index: 'users',
      _source: ['user_id', 'profile.nick_name', 'profile.first_name', 'profile.last_name'],
      query: { bool: { must: { bool: { should: esArray } } } },
      size: 100,
    };
    const response = await getUsersList(payload);
    if (!response) return [];

    const options = response.map((data) => {
      const { profile, user_id } = data._source || {};
      const userName = `${profile.first_name || ''} ${profile.last_name || ''}`;

      return { value: user_id, label: userName };
    });
    return options || [];
  } catch (error) {
    return userIds;
  }
};

export const handleDeleteEvent = async (sessions: any, payload: any, panelId: string) => {
  const DELETE_API = {
    [TM_IDS.EVENT]: '/scheduler/event/deleteEvent',
    [TM_IDS.SLOT]: '/scheduler/event/removeSlot',
    [TM_IDS.OUT_OF_OFFICE]: '/scheduler/event/deleteEvent',
  };
  try {
    const API_URL = `${import.meta.env.VITE_BASE_API_URL}${DELETE_API[payload?.eventType]}`;
    const response = await axios.post(API_URL, payload, {
      headers: { Authorization: `Bearer ${sessions.id_token}` },
    });

    if (response.data.status >= 200 && response.data.status <= 201) {
      SuccessToaster(response.data.message, panelId, 'success');
    }
  } catch (error) {
    ErrorToaster('Something went wrong while deleting event', panelId, 'error');
  }
};

export const handleCreateEvent = async (sessions: any, payload: any) => {
  const API_URL = `${import.meta.env.VITE_BASE_API_URL}/scheduler/event/createEvent`;
  return await handlePostCall(sessions, API_URL, payload);
};

export const handleCreateSlot = async (sessions: any, payload: any) => {
  const API_URL = `${import.meta.env.VITE_BASE_API_URL}/scheduler/event/createSlot`;
  return await handlePostCall(sessions, API_URL, payload);
};

export const handleCreateOutOfOffice = async (sessions: any, payload: any) => {
  const API_URL = `${import.meta.env.VITE_BASE_API_URL}/scheduler/event/createOutOfOffice`;
  return await handlePostCall(sessions, API_URL, payload);
};

const handlePostCall = async (sessions: any, API_URL: string, payload: any) => {
  if (payload.tenantParticipants) {
    payload.tenantParticipants = payload?.tenantParticipants?.map((each) => {
      return { userId: each.value, roleId: each?.roleId || '' };
    });
  }
  if (payload?.reccurance?.weekDays && payload?.reccurance?.startDate) {
    payload.reccurance.weekDays = convertingToUTCDays(payload);
  }
  if (payload?.notify) {
    payload.notifyTimeInMinutes = convertingNotificationStringToNumber(payload.notify);
  }
  const params: any = {
    userId: sessions?.user?.id,
    organizer: sessions?.user?.id,
    ...payload,
  };
  return await axios.post(API_URL, params, {
    headers: { Authorization: `Bearer ${sessions.id_token}` },
  });
};

const convertingToUTCDays = (payload: any) => {
  let startDate = new Date(payload?.reccurance?.startDate);
  let timezoneDif = new Date().getTimezoneOffset();
  let utcStartDate = new Date(startDate);
  utcStartDate.setMinutes(timezoneDif);
  startDate.setHours(0, 0, 0, 0);
  utcStartDate.setHours(0, 0, 0, 0);
  let daysDif = (startDate.getTime() - utcStartDate.getTime()) / (1000 * 3600 * 24);
  let weekDays = [...payload.reccurance.weekDays];
  weekDays = weekDays
    .map((weekDay) => (weekDay - daysDif < 0 ? 7 - weekDay - daysDif : weekDay - daysDif) % 7)
    .sort((a, b) => a - b);
  return weekDays;
};

export const handleUpdateCall = async (panelId: string, sessions: any, payload: any, isEdited = false) => {
  if (isEdited) {
    if (payload.tenantParticipants) {
      payload.tenantParticipants = payload?.tenantParticipants?.map((each) => ({
        userId: each.value,
        roleId: each?.roleId || '',
      }));
    }
    if (payload?.reccurance?.weekDays && payload?.reccurance?.startDate) {
      payload.reccurance.weekDays = convertingToUTCDays(payload);
    }
    if (payload.callType === TM_IDS.VOICE) {
      payload.others = '';
    }
  }
  return await schedulerUpdateCall(sessions, payload, panelId);
};

export const schedulerUpdateCall = async (sessions: any, payload: any, panelId: string) => {
  const UPDATE_API = {
    [TM_IDS.EVENT]: '/scheduler/event/updateEvent',
    [TM_IDS.SLOT]: '/scheduler/event/updateSlot',
    [TM_IDS.OUT_OF_OFFICE]: '/scheduler/event/updateEvent',
  };
  try {
    if (payload?.notify) {
      payload.notifyTimeInMinutes = convertingNotificationStringToNumber(payload.notify);
    }
    const url = `${import.meta.env.VITE_BASE_API_URL}${UPDATE_API[payload?.eventType]}`;
    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${sessions.id_token}` },
    });
    if (response.data.status >= 200 && response.data.status <= 201) {
      SuccessToaster(response.data.message, panelId, 'success');
      return true;
    }
    ErrorToaster('Unable to update event', panelId, 'error');
  } catch (error) {
    ErrorToaster('Something went wrong while updating event', panelId, 'error');
  }
};
export const schedulerNewUpdateCall = async (sessions: any, payload: any, panelId: string) => {
  const UPDATE_API = {
    ['NEW_URL']: '/scheduler/event/updateEventAndFollowingEvents',
  };
  console.log(payload, 'new update payload data');
  try {
    const url = `${import.meta.env.VITE_BASE_API_URL}${UPDATE_API['NEW_URL']}`;
    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${sessions.id_token}` },
    });
    if (response.data.message === 'Request Processed') {
      SuccessToaster(response.data.message, panelId, 'success');
      return true;
    }
    ErrorToaster('Unable to update event', panelId, 'error');
  } catch (error) {
    ErrorToaster('Something went wrong while new updating event', panelId, 'error');
  }
};

export const getBookablesDetails = async (panelId: string, sessions: any) => {
  try {
    const API_URL = `${import.meta.env.VITE_BASE_API_URL}/queryFromDB`;
    const payload = {
      payLoad: {
        partKey: 'lov_name',
        partKeyValue: '~bookables~masters~',
        tableName: 'platform-lov-master',
      },
    };
    const response = await axios.post(API_URL, payload, {
      headers: { Authorization: `Bearer ${sessions.id_token}` },
    });
    return response.data || [];
  } catch (error: any) {
    ErrorToaster(error.message, panelId, 'error');
  }
};

export const getRolesForAUser = async (panelId: string, sessions: any, tenantId: string) => {
  try {
    const API_URL = `${import.meta.env.VITE_BASE_API_URL}/queryFromDB`;
    const payload = {
      payLoad: {
        partKey: 'part_key',
        partKeyValue: `~staff~${tenantId}~${sessions.user.id}~`,
        tableName: 'staff-info',
      },
    };
    const response = await axios.post(API_URL, payload, {
      headers: { Authorization: `Bearer ${sessions.id_token}` },
    });
    return response.data || [];
  } catch (error: any) {
    ErrorToaster(error.message, panelId, 'error');
    return [];
  }
};

export const formattedDate = (date: string | Date | number) => {
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  let yesterday = new Date(currentDate);
  let tommarow = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);
  tommarow.setDate(currentDate.getDate() + 1);
  if (checkWhetherSameDay(date, yesterday)) return 'Yesterday';
  if (checkWhetherSameDay(date, currentDate)) return 'Today';
  if (checkWhetherSameDay(date, tommarow)) return 'Tommorow';
  return date ? moment(date).format('ddd D, MMM YYYY') : 'Invalid date';
};

export const checkWhetherSameDay = (day1: Date | string | number, day2: Date | string | number) => {
  return (
    new Date(day1).getDate() === new Date(day2).getDate() &&
    new Date(day1).getMonth() === new Date(day2).getMonth() &&
    new Date(day1).getFullYear() === new Date(day2).getFullYear()
  );
};

export const reConvertingToUTCDaysInView = (payload: any) => {
  let startDate = new Date(payload?.reccurance?.startDate);
  let timezoneDif = new Date().getTimezoneOffset();
  let utcStartDate = new Date(startDate);
  utcStartDate.setMinutes(timezoneDif);
  startDate.setHours(0, 0, 0, 0);
  utcStartDate.setHours(0, 0, 0, 0);
  let daysDif = (startDate.getTime() - utcStartDate.getTime()) / (1000 * 3600 * 24);
  let weekDays = [...payload.reccurance.weekDays];
  weekDays = weekDays
    .map((weekDay) => (weekDay + daysDif < 0 ? 7 + weekDay + daysDif : weekDay + daysDif) % 7)
    .sort((a, b) => a - b);
  return weekDays;
};

const convertingNotificationStringToNumber = (notifications: Array<string>): Array<number> => {
  try {
    let convertedToNumber = notifications.map((notifyString) => {
      let { 0: number, 1: unit, 2: nature } = notifyString.split(' ');
      if (NOTIFICATION_TYPE.findIndex((value) => value.toLowerCase().indexOf(unit.toLowerCase()) > -1) > -1)
        switch (unit.toLowerCase()) {
          case 'minutes':
          case 'minute':
            return parseInt(number);
          case 'hours':
          case 'hour':
            return parseInt(number) * 60;
          case 'days':
          case 'day':
            return parseInt(number) * 1440;
          case 'weeks':
          case 'week':
            return parseInt(number) * 10080;
          case 'months':
          case 'month':
            return parseInt(number) * 43200;
          case 'years':
          case 'year':
            return parseInt(number) * 525600;
        }
      throw new Error('Invalid unit');
    });
    console.log('Converted minutes', convertedToNumber);
    return convertedToNumber;
  } catch (e) {
    console.error('Error while convertingNotificationStringToNumber', e);
  }
};

export const getRolesForAUserFromDB = async (userID: string, sessions: ISession, tenantId: string) => {
  try {
    const rolesData = await PMS_S3.getObject(
      `pms-ql-roles/${userID}/${tenantId}/myRoles.json`,
      import.meta.env.VITE_CLIENT_BUCKET,
      {
        TenantId: tenantId,
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: sessions.id_token,
        headers: {},
      }
    );
    if (!rolesData?.Error) {
      return rolesData;
    }
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const getDateDiffernce = (fromDate: any, toDate: any) => {
  let newdate1 = new Date(fromDate);
  let newdate2 = new Date(toDate);
  let date1 = newdate1.setHours(0, 0, 0, 0);
  let date2 = newdate2.setHours(0, 0, 0, 0);
  // Calculate the time difference in milliseconds
  const diffTime = Math.abs(date2 - date1);
  // Convert milliseconds to days
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  let timeInDate = getTimeFromDate(toDate);
  if (timeInDate === '12:00AM') return 0;
  return diffDays;
};

export const getTimeFromDate = (inputdate: any) => {
  const date = new Date(inputdate);

  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  hours %= 12;
  hours = hours || 12; // If hours is 0, set it to 12

  // Add leading zeros for single-digit hours and minutes
  let hoursString = hours < 10 ? '0' + hours : hours;
  let minutesString = minutes < 10 ? '0' + minutes : minutes;

  return `${hoursString}:${minutesString}${ampm}`;
};
