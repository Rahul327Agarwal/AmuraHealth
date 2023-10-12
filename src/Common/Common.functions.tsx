import { SxProps } from '@mui/material';
import axios from 'axios';
import { default as moment, default as Moment } from 'moment';
import { IAllRoleDetails } from '../Components/PanelComponents/MyListPanel/MyList/MyList.types';
import { Calendar, ConfigurationIcon, PeoplesIcon, PostCollectionsIcon, PostsIcon } from '../Components/SVGs/Common';
import { setClientProgress } from '../DisplayFramework/State/Slices/DashboardSlice';
import { PMS_S3 } from '../Utils';
import { ISession } from './Common.types';
import ErrorToaster from './ErrorToaster';

export const getMinutesDifferenceFromOffset = (offSet: string) => {
  let positive = true;
  if (offSet.indexOf('-') > -1) {
    positive = false;
  }
  let minutes = JSON.parse(JSON.stringify(offSet));
  let hours = JSON.parse(JSON.stringify(offSet));
  let milliseconds =
    Number(hours.slice(4, hours.length - 2)) * 60 * 60 * 1000 +
    Number(minutes.slice(minutes.length - 2, minutes.length)) * 60 * 1000;
  return positive ? milliseconds : -milliseconds;
};

export function convertTimeWithOffset(utcTimeString, timezoneInfo) {
  if (!timezoneInfo) {
    return new Date(utcTimeString).toISOString();
  }
  const utcTime = new Date(utcTimeString);
  // Extract the timezone offset from the timezone information string
  const offsetOffLocal = new Date().toString().match(/GMT([+-]\d{4})/);
  const offsetMatch = timezoneInfo.match(/GMT([+-]\d{4})/);
  if (!offsetMatch) {
    return new Date(utcTimeString).toISOString();
  }
  const timezoneOffset = getMinutesDifferenceFromOffset(offsetMatch[0]);
  const timezoneLocalOffset = getMinutesDifferenceFromOffset(offsetOffLocal[0]);
  const absoluteTimeDifference =
    timezoneLocalOffset < timezoneOffset
      ? Math.abs(timezoneOffset - timezoneLocalOffset)
      : -Math.abs(timezoneOffset - timezoneLocalOffset);
  const offsetInMilliseconds = absoluteTimeDifference; // Convert minutes to milliseconds
  // Convert the UTC time to the target timezone by adding the offset
  const targetTime = new Date(utcTime.getTime() + offsetInMilliseconds);
  return targetTime.toISOString();
}

export const getTimeZoneAbbrevation = (time: string) => {
  try {
    const { 1: tz } = time.match(/\((.+)\)/);

    // In Chrome browser, new Date().toString() is
    // "Thu Aug 06 2020 16:21:38 GMT+0530 (India Standard Time)"

    // In Safari browser, new Date().toString() is
    // "Thu Aug 06 2020 16:24:03 GMT+0530 (IST)"

    if (tz.includes(' ')) {
      return tz
        .split(' ')
        .map(([first]) => first)
        .join('');
    } else {
      return tz;
    }
  } catch {
    return '';
  }
};

export const getUserNameById = (id: string, list: Array<any>, loggedInUser?: boolean): string => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].UserName === id) {
      return loggedInUser ? 'me' : list[i].Name;
    }
  }
  return id;
};

export function isNumeric(str: string) {
  if (typeof str != 'string') return false; // we only process strings!
  return (
    !isNaN(Number(str)) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

export const getClientNameUsingChannel = (id: string, list: Array<any>): string => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].Tenant?.ChannelId && list[i].Tenant.ChannelId === id) {
      return `${list[i].NickName} [${list[i].Tenant?.Name ?? ''}]`;
    }
  }
  return 'Chat';
};

export const getFormattedDate = (date: any, format?: string) => {
  try {
    let formattedDate: string = '';
    if (date && date.trim()) {
      let newDate = new Date(date);
      formattedDate = newDate.toISOString();
      if (format) {
        formattedDate = Moment(formattedDate).format(format);
      } else if (import.meta.env.VITE_MOMENT_DATE_FORMAT) {
        formattedDate = Moment(formattedDate).format(import.meta.env.VITE_MOMENT_DATE_FORMAT);
      }
    }
    return formattedDate;
  } catch (ex) {
    console.error('Exception in DateService: ', ex);
  }
  return date;
};

export const getPatientObject = async (
  keyName: string,
  dispatch: any,
  setLoadingFlag: Function,
  sessions: any,
  selectedClient: any,
  defaultObject: any
) => {
  const data: any = await PMS_S3.getObject(
    keyName,
    import.meta.env.VITE_CLIENT_BUCKET,
    {
      TenantId: selectedClient.tenant_id,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_S3_FETCH_API,
      token: sessions.id_token,
      headers: {},
    },
    defaultObject
  );
  if (!data?.Error) {
    dispatch(setClientProgress(JSON.parse(JSON.stringify(data))));
  } else {
    dispatch(setClientProgress(defaultObject));
  }
  setLoadingFlag(false);
};

export const checkArrayIsASubset = (array1: Array<any>, array2: Array<any>): boolean => {
  for (let i = 0; i < array1.length; i++) {
    if (array2.indexOf(array1[i]) === -1) {
      return false;
    }
  }
  return true;
};
export const isAllElementsMatched = (array1: Array<any>, array2: Array<any>): boolean => {
  return checkArrayIsASubset(array1, array2) && checkArrayIsASubset(array2, array1);
};

export const nFormatter = (num: number, digits: number) => {
  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  let rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return `${(num / si[i].value).toFixed(digits).replace(rx, '$1')}${si[i].symbol}${num % 10 !== 0 && si[i].symbol ? '+' : ''}`;
};

export const getNumberOfDays = (startDate: string, endDate: string): number => {
  if (!startDate) return 0;
  if (!endDate) return 0;
  if (!moment(startDate, import.meta.env.VITE_MOMENT_DATE_FORMAT).isValid()) return 0;
  if (!moment(endDate, import.meta.env.VITE_MOMENT_DATE_FORMAT).isValid()) return 0;
  let start = moment(startDate);
  let end = moment(endDate);
  return end.diff(start, 'days');
};

export const isValidNumber = (value: string) => {
  if (/^([0-9]+[.])?[0-9]+$/.test(value)) {
    return true;
  }
  return false;
};

export const isValidNumberOrEmpty = (value: string) => /^((\d+[.])?\d+|\s*)$/.test(value);

export const isDecimalNumberAcceptingRegex = (value: string) => /^\d*\.?\d{0,2}$/.test(value);

export const elasticAPI = async (payload: any) => {
  const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
  const response = await axios.post(url, payload);
  return response?.data?.body || [];
};

export const getCitiesAPI = async (countryCode: string, searchText: string = '') => {
  const payload = {
    index: 'cities_master',
    size: 10000,
    query: {
      bool: {
        must: [{ match: { countryCode } }, { query_string: { fields: ['name'], query: `*${searchText}*` } }],
      },
    },
  };
  return await elasticAPI(payload);
};

export const getTimeZoneAPI = async (isoCode: string) => {
  const payload = {
    index: 'countries_master',
    query: { match: { isoCode } },
  };
  return await elasticAPI(payload);
};

export const getCountriesAPI = async (searchText?: string) => {
  const payload = {
    index: 'countries_master',
    size: 1000,
    sort: [{ 'name.keyword': { order: 'asc' } }],
    // query: {
    //   prefix: {
    //     name: {
    //       value: searchText ? `${searchText}` : '',
    //     },
    //   },
    // },
    query: {
      ...(searchText ? { query_string: { fields: ['name'], query: `*${searchText}*` } } : { match_all: {} }),
    },
  };
  return await elasticAPI(payload);
};
export const getQualificationAPI = async (searchText?: string) => {
  const payload = {
    index: 'qualifications_master',
    size: 1000,
    // sort: [{ 'name.keyword': { order: 'asc' } }],
    query: {
      ...(searchText ? { query_string: { fields: ['qualification'], query: `*${searchText}*` } } : { match_all: {} }),
      // match_all: {},
    },
  };
  return await elasticAPI(payload);
};
export const getUnivercitiesAPI = async (searchText?: string) => {
  const payload = {
    index: 'universities_master',
    size: 1000,
    // sort: [{ 'name.keyword': { order: 'asc' } }],
    query: {
      ...(searchText ? { query_string: { fields: ['university'], query: `*${searchText}*` } } : { match_all: {} }),
      // match_all: {},
    },
  };
  return await elasticAPI(payload);
};
export const getNameInitials = (name: string) => {
  if (!name) return '';
  if (name.split(' ').length > 1) return (name.split(' ')[0].charAt(0) + name.split(' ')[1].charAt(0)).toUpperCase();
  return name.charAt(0).toUpperCase();
};

const EXPECTED_FILE_TYPES = {
  FILES: ['pdf', 'xlsx', 'docx'],
  PHOTOS: ['png', 'jpeg', 'jpg', 'gif', 'webp'],
  VIDEOS: ['mp4', 'mkv'],
  AUDIO: ['mp3'],
};
const EXPECTED_FILE_SIZE_IN_KB = {
  FILES: 100000,
  PHOTOS: 100000,
  VIDEOS: 100000,
  AUDIO: 100000,
};
const ONE_BYTE_TO_KB = 1000;

export type IFileOptions = 'FILES' | 'PHOTOS' | 'VIDEOS' | 'AUDIO';

export const isValidFilesUploaded = (filesList: Array<File>, fileOptions: IFileOptions) => {
  const errorObject: any = [];
  const validFiles: any = [];
  const filesArray = Array.from(filesList || []);

  if (!filesArray.length && !fileOptions) return { validFiles, errorObject };
  filesArray.forEach((file: any, index: number) => {
    const fileName = file.name;
    const fileSize = Number(file.size) / ONE_BYTE_TO_KB;
    const fileType = fileName.split('.').pop().toLowerCase();
    if (!EXPECTED_FILE_TYPES[fileOptions].includes(fileType)) {
      errorObject.push({
        id: index,
        message: 'File type not supported!',
        errorType: 'TYPE',
      });
      return;
    }
    if (EXPECTED_FILE_SIZE_IN_KB[fileOptions] <= fileSize) {
      errorObject.push({
        id: index,
        message: 'File size not supported!',
        errorType: 'SIZE',
      });
      return;
    }
    validFiles.push(file);
  });
  return { validFiles, errorObject };
};

export const getFileExtension = (name: string) => {
  const extension: any = name.split('.').pop();
  let imageFiles = 'jpg|jpeg|png|gif|webp';
  let files = 'pdf|xlsx|docx';
  let audioFiles = 'mp3';
  let videoFiles = 'mp4|mkv';
  if (imageFiles.includes(extension.toLowerCase())) {
    return 'image';
  }
  if (files.includes(extension.toLowerCase())) {
    return 'file';
  }
  if (audioFiles.includes(extension.toLowerCase())) {
    return 'audio';
  }
  if (videoFiles.includes(extension.toLowerCase())) {
    return 'video';
  }
  return 'image';
};

export const getVoiceNoteFromURL = async (sessions: any, fileUrl: string) => {
  try {
    const reqBody = {
      isDownloadRequired: false,
      url: `${import.meta.env.VITE_S3_DOWNLOAD_API}?key=${fileUrl}`,
      token: sessions.id_token,
      dontPreview: true,
    };
    const response: any = await PMS_S3.previewObject(reqBody);
    if (!response?.Error) return response;
  } catch (error) {
    return null;
  }
};

export const setTimeStringToDate = (date: Date, timeString: string) => {
  const myDate = new Date(date);

  if (typeof timeString !== 'string') return myDate;

  const p1 = timeString.split(':');
  const p2 = p1[1].split(' ');

  if (!p1 || !p2) return myDate;

  let hours = Number(p1[0]);
  let minutes = Number(p2[0]);
  let ampm = p2[1]?.toUpperCase();
  if (ampm === 'PM') {
    hours = hours + 12;
  }
  myDate.setHours(hours);
  myDate.setMinutes(minutes);
  myDate.setSeconds(0);

  return myDate;
};

export const getTimeFromTimeString = (timeString: string) => {
  const date = new Date(moment(new Date()).format('YYYY/MM/DD') + ' ' + timeString);

  if (!moment(date).isValid()) return;

  let HH = date.getHours();
  let MM = date.getMinutes();
  let SS = date.getSeconds();
  let AMPM = HH >= 12 ? 'PM' : 'AM';
  HH = HH % 12;
  HH = HH ? HH : 12;

  return {
    HH: `${HH < 10 ? `0${HH}` : HH}`,
    MM: `${MM < 10 ? `0${MM}` : MM}`,
    SS: `${SS < 10 ? `0${SS}` : SS}`,
    AMPM,
  };
};

export const minutesToTimeString = (minutes: number) => {
  let num = Number(minutes);
  let hours = num / 60;
  let rhours = Math.floor(hours);
  let minute = (hours - rhours) * 60;
  let rminutes = Math.round(minute);
  return rhours === 0 ? rminutes + ' mins' : rminutes === 0 ? rhours + ' hour ' : rhours + ' h ' + rminutes + ' m';
};

export type TQueryFromDB = 'BIOMARKER_UNIT_ID' | 'BIOMARKER_ID';

export const callQueryFromDB = async (panelId: string, sessions: any, queryFor: TQueryFromDB) => {
  try {
    const PAYLOAD = {
      BIOMARKER_UNIT_ID: {
        tableName: 'platform-lov-master',
        partKey: 'lov_name',
        partKeyValue: '~new~units~master~',
      },
      BIOMARKER_ID: {
        tableName: 'platform-lov-master',
        partKey: 'lov_name',
        partKeyValue: '~biomarker~master~',
      },
    };
    const API_URL = `${import.meta.env.VITE_BASE_API_URL}/queryFromDB`;
    const payload = { payLoad: PAYLOAD[queryFor] };
    const response = await axios.post(API_URL, payload, {
      headers: { Authorization: `Bearer ${sessions.id_token}` },
    });
    return response.data || [];
  } catch (error: any) {
    ErrorToaster(error.message, panelId, 'error');
  }
};

export const getUserNameFromES = async (userId: string, isOnlyName?: boolean) => {
  if (!userId) return '';
  const payload = {
    index: 'users',
    _source: ['sort_key', 'profile.salutation', 'profile.first_name', 'profile.last_name'],
    query: { match: { _id: `${userId}` } },
  };
  const response = await getUsersList(payload);
  const { profile } = response[0]._source || {};
  const userName = `${profile?.first_name || ''} ${profile?.last_name || ''}`;
  return userName || '';
};

export const getEsDataforUsersArray = async (userData: Array<any>, isOnlyName?: boolean) => {
  try {
    const payload = {
      index: 'users',
      _source: ['user_id', 'profile.salutation', 'profile.first_name', 'profile.last_name'],
      query: { bool: { must: { bool: { should: userData } } } },
      size: userData.length,
    };
    const response = await getUsersList(payload);
    let modifiedResponse = {};
    response?.forEach((data) => {
      const user_id = data._id || '';
      const { profile } = data._source || {};
      modifiedResponse[user_id] = `${profile?.first_name || ''} ${profile?.last_name || ''}`;
    });
    return modifiedResponse;
  } catch (error) {
    ErrorToaster(error.message);
  }
};

export const getUsersList = async (payload: any) => {
  try {
    const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
    const response = await axios.post(url, payload);
    return response?.data?.body || [];
  } catch (error) {
    console.error(error, 'get users error in ES ');
    return [];
  }
};

export const getSearchUsers = async (searchText?: string) => {
  try {
    const payload = {
      index: 'users',
      _source: ['user_id', 'profile.nick_name', 'profile.first_name', 'profile.last_name'],
      query: {
        query_string: {
          fields: ['profile.nick_name'],
          query: `*${searchText}*`,
        },
      },
      size: 10000,
    };
    const response = await getUsersList(payload);
    return response || [];
  } catch (error) {
    return [];
  }
};

export const getAllStaffRoles = async (sessions: any, tenantId: string) => {
  const payload = {
    payLoad: {
      partKey: 'part_key',
      partKeyValue: `~roles~master~${tenantId}~`,
      tableName: 'staff-info',
    },
  };
  const url = `${import.meta.env.VITE_BASE_API_URL}/queryFromDB`;
  try {
    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${sessions.id_token}` },
    });
    return response?.data || [];
  } catch (error) {
    return [];
  }
};

export const convertDaysToUTCDays = (startDate: string | number | Date, weekDays: any[], toUTC: boolean) => {
  const systemWeekDay = new Date(startDate).getDay();
  const UTCWeekDay = new Date(startDate).getUTCDay();

  if (systemWeekDay !== UTCWeekDay && weekDays) {
    const dayDif = systemWeekDay - UTCWeekDay;
    weekDays = weekDays
      .map((value: number) => value + (toUTC ? -dayDif : dayDif))
      .map((value: number) => (value < 0 ? 7 + value : value >= 7 ? value - 7 : value))
      .sort((a: number, b: number) => a - b);
  }
  return weekDays;
};

export interface ITenant {
  TenantId: string;
  Staffs: Array<{ Id: string; Roles: Array<string> }>;
}
export interface IStaff {
  PatientId: string;
  StaffList: Array<ITenant>;
}

export const formatingArrayToIStaff = (clientId: string, staffs: Array<any>) => {
  let staffInfoAcrossTenants: IStaff = { PatientId: clientId, StaffList: [] };
  let tenant: any = {};
  staffs.forEach((staffEntry: any) => {
    if (staffEntry.partKey && staffEntry.sortKey) {
      try {
        let [tenantId, clientId] = staffEntry.partKey.split('~');
        let [roleId, staffId, hierarchyId] = staffEntry.sortKey.split('~');
        let tenantDetails = tenant[tenantId] || {
          TenantId: tenantId,
          Staffs: [],
        };
        tenantDetails.Staffs.push({
          Id: staffId,
          Roles: [roleId],
          hierarchyId: staffEntry.hierarchyId,
          isWatching: Boolean(staffEntry?.isWatching),
        });
        tenant[tenantId] = tenantDetails;
      } catch (error) {
        console.log('Wrong entry in DB', error, staffEntry);
      }
    }
  });
  staffInfoAcrossTenants.StaffList = Object.keys(tenant).map((tenantId) => ({
    TenantId: tenantId,
    Staffs: tenant[tenantId].Staffs,
  }));
  return staffInfoAcrossTenants;
};

export const getAssignedStaff = async (clientId: string, sessionId: string) => {
  let staffs: any;
  if (!clientId) {
    return Promise.resolve(null);
  }
  let query = {
    index: 'pms_hierarchy',
    query: {
      bool: {
        must: [
          {
            match_phrase: {
              partKey: `amura~${clientId}`,
            },
          },
          {
            term: {
              owner: true,
            },
          },
        ],
      },
    },
    size: 100,
  };
  const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
  const response = await axios.post(url, query);

  staffs = response?.data?.body?.map((value) => value._source) || [];
  if (staffs.length === 0) {
    return Promise.resolve(null);
  } else {
    let result: IStaff = formatingArrayToIStaff(clientId, staffs);
    return Promise.resolve(result);
  }
};
export type myListOptionsType = 'people' | 'configuration' | 'Posts' | 'Posts Collections' | 'distributions' | 'events';

export const myListOptions = [
  { id: 'people', label: 'People', value: 'people', icon: <PeoplesIcon /> },
  {
    id: 'configuration',
    label: 'Configuration',
    value: 'configuration',
    icon: <ConfigurationIcon />,
  },
  { id: 'Posts', label: 'Posts', value: 'Posts', icon: <PostsIcon /> },
  {
    id: 'Posts Collections',
    label: 'Posts Collections',
    value: 'Posts Collections',
    icon: <PostCollectionsIcon />,
  },
  {
    id: 'distributions',
    label: 'Distributions',
    value: 'distributions',
    icon: <PostCollectionsIcon />,
  },
  { id: 'events', label: 'Events', value: 'events', icon: <Calendar /> },
];

export const getFirstLetters = (name: string) => {
  if (!name) return '';
  if (name.split(' ').length > 1) return (name.split(' ')[0].charAt(0) + name.split(' ')[1].charAt(0)).toUpperCase();
  return name.charAt(0).toUpperCase();
};

export const secondsToTime = (
  pseconds: number | string
): { hours: number; minutes: number; seconds: number; timeString: string } => {
  const totalSecs = Number(pseconds);
  const hours = Math.floor(totalSecs / 3600);
  const minutes = Math.floor((totalSecs % 3600) / 60);
  const seconds = totalSecs % 60;
  let h = '';
  let m = '';
  let s = '';
  if (hours > 0) h = `${hours}h`;
  if (minutes > 0) m = `${minutes}m`;
  if (seconds > 0) s = `${seconds}s`;

  return { hours, minutes, seconds, timeString: `${h} ${m} ${s}`.trim() };
};

export const getHierarchyStaff = async (
  hierarchyId: string,
  fetchMultipleUserNames: Function,
  roles?: Array<IAllRoleDetails>,
  sessions?: ISession
) => {
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
    let roomDetails = [];
    staffs.forEach((staff) => {
      let [tenantId, patientId] = staff.partKey.split('~');
      let [roleId, staffId, hierarchyId] = staff.sortKey.split('~');
      if (sessions && staffId === sessions.user.id) {
        staffIds.push(staffId);
        roomDetails.push({ staffId, roleId, isWatching: Boolean(staff?.isWatching) });
        return;
      }
      if (!sessions) {
        //Condition present as the same function is used in ManageStatus.tsx
        staffIds.push(staffId);
        roomDetails.push({ staffId, roleId, isWatching: Boolean(staff?.isWatching) });
      }
    });
    const userNameObject = (await fetchMultipleUserNames(staffIds)) || {};
    let detailsToSend = roomDetails.map(({ staffId, roleId, isWatching }) => {
      return {
        value: `~${staffId}~${roleId}~`,
        label: `${userNameObject[staffId] || userNameObject} - ${
          (roles || []).find((role) => role.roleId === roleId)?.roleName || roleId
        }`,
        hierarchyId: hierarchyId,
        isWatching: Boolean(isWatching),
      };
    });
    return detailsToSend;
  } catch (e) {
    console.log('Error while loading hierarchy', e);
    return [];
  }
};

export interface IUserNameObj {
  [data: string]: string;
}

export const getAndSetUserNameFromES = async (
  userId: string,
  userNameObj: IUserNameObj,
  setUserNameObj: React.Dispatch<React.SetStateAction<IUserNameObj>>,
  isOnlyName?: boolean
) => {
  try {
    if (!userId) return '';
    const existingName = userNameObj && userNameObj[userId];
    if (existingName) return existingName;
    const nameFromES = await getUserNameFromES(userId, isOnlyName);
    if (nameFromES) {
      setUserNameObj && setUserNameObj((pre) => ({ ...pre, [userId]: nameFromES }));
      return nameFromES;
    }
    return userId;
  } catch (error) {
    return userId;
  }
};

export const downloadFromURL = async (sessions: any, fileUrl: string, fileName: string) => {
  try {
    const reqBody = {
      isDownloadRequired: true,
      url: `${import.meta.env.VITE_S3_DOWNLOAD_API}?key=${fileUrl}`,
      token: sessions.id_token,
      dontPreview: true,
      fileName: `${fileName}`,
    };
    const response: any = await PMS_S3.previewObject(reqBody);
    if (!response?.Error) return response;
  } catch (error) {
    return null;
  }
};

export const sxPropsForDrawer = (isOpen: boolean, width?: number): SxProps => {
  return {
    ...(width ? { width: `${width}px !important` } : {}),
    translate: isOpen ? '0' : '-1000px 0',
    visibility: isOpen ? 'visible' : 'hidden',
    zIndex: isOpen ? 1050 : -1,
    transition: 'visibility, translate 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
  };
};

/**
 *
 * @param time in string | number | Date
 * @returns True if difference between two time is greater than 48 hours else false
 */
export const isTimeDifferenceGreaterThanNHours = (time: string | number | Date, hours: number) => {
  try {
    let time1 = new Date(time);
    let time2 = new Date();
    let diff = time2.getTime() - time1.getTime();
    let diffHours = Math.floor(diff / (1000 * 60 * 60));
    return diffHours >= hours;
  } catch (e) {
    console.error('Time difference is not in correct format', e);
    return true;
  }
};

export const removeHtmlTagsFromSring = (string: string) => {
  const regex = /(<([^>]+)>)/gi;
  return string.replace(regex, '');
};

export function capitalizeFirstLetter(string = '') {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// input [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// output [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ], [ 10 ] ]
export function splitArrayAtNth(array, n) {
  const splitArrays = [];
  for (let i = 0; i < array.length; i += n) {
    splitArrays.push(array.slice(i, i + n));
  }
  return splitArrays;
}

export const youtube_url_regex = /(?:https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?(?:.*&)?v=|youtu\.be\/))([a-zA-Z0-9_-]+)/;
