import axios from 'axios';
import moment from 'moment';
import { Dispatch, SetStateAction } from 'react';
import ErrorToaster from './../../../Common/ErrorToaster';
import { ICancelBooking } from './SuccessWizard/SuccessWizard.types';
import { getUsersList, isTimeDifferenceGreaterThanNHours } from '../../../Common/Common.functions';
import { IMessage } from '../ChatComponent/ChatComponents.types';
import { IModifiedSlots } from './NewCallSchedulerWizard.types';
import { checkSlotAvailability } from '../CallSchedulerWizards/CallWizard/CallWizard.function';
import SuccessToast from '../../../Common/SuccessToaster';

export const getTimeZones = async () => {
  let payload = {
    index: 'timezones_master',
    query: {
      match_all: {},
    },
    size: 1000,
  };
  const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
  const response = await axios.post(url, payload, {
    headers: {},
  });
  let timezones = response?.data?.body || [];
  timezones = timezones.map((value) => value._source);
  return timezones;
};

export const getEsDataforUsers = async (userData: Array<any>, rolesData: any) => {
  let modifiedObj = userData.map((each) => ({
    match: { _id: each.userId },
  }));

  let modifiedData = userData.map((each) => ({
    id: each.userId,
    label: each.userId,
    roleId: each.roleId,
    roleName: rolesData?.find((role) => role.roleId === each.roleId)?.roleName || each.roleId,
  }));

  try {
    const payload = {
      index: 'users',
      _source: ['profile.nick_name', 'profile.salutation', 'profile.first_name', 'profile.last_name'],
      query: {
        bool: {
          must: {
            bool: {
              should: [...modifiedObj],
            },
          },
        },
      },
    };
    let response = await getUsersList(payload);
    let modifiedResponse = response.map((each) => {
      const { salutation, first_name, last_name } = each?._source?.profile || {};
      return {
        id: each._id,
        label:
          (salutation && first_name && `${salutation} ${first_name} ${last_name ? ` ${last_name}` : ''}`) ||
          ((first_name || last_name) && `${first_name || ''} ${last_name || ''}`) ||
          each._id,
        fullName: ((first_name || last_name) && `${first_name || ''} ${last_name || ''}`) || each._id,
      };
    });
    let finalData = modifiedResponse?.map((person) => {
      const modifiedPerson = modifiedData?.find((modified) => modified.id === person.id);
      if (modifiedPerson) {
        person.roleId = modifiedPerson?.roleId;
        person.roleName = modifiedPerson?.roleName;
      }
      return person;
    });
    return rolesData.length > 0 ? finalData : modifiedResponse;
  } catch (error) {
    ErrorToaster('Error in Es unable to get userdata');
    return modifiedData;
  }
};

export const slotsbookcall = async (
  MessageData: any,
  modifiedSlots: any,
  selectedslotdate: any,
  description: any,
  patientId: any
) => {
  let selectallotData = modifiedSlots.filter((each) => each.startTime === selectedslotdate);
  let duration = MessageData.scheduleData.duration;
  let title = MessageData.scheduleData.title;
  // let organizer = MessageData.senderId;
  let participants = selectallotData[0].userIds;
  if (participants.indexOf(patientId) === -1) {
    participants.push(patientId);
  }
  let allowedMaximumDays = 1;
  let start: any = new Date();
  start.setHours(0, 0, 0, 0);
  start = moment(start);
  let end: any = new Date(selectallotData[0].startTime);
  end.setHours(0, 0, 0, 0);
  end = moment(end);
  allowedMaximumDays = end.diff(start, 'days') + 1;
  const payload = {
    slots: selectallotData[0].slots,
    bookableIds: selectallotData[0].bookableIds,
    participants: participants || [],
    pool: selectallotData[0].pool || [],
    participantsQuery: selectallotData[0].participantsQuery || [],
    fromTime: selectallotData[0].startTime,
    toTime: selectallotData[0].endTime,
    bookables: selectallotData[0].bookables,
    title: title,
    duration: duration,
    // organizer: organizer,
    organizer: MessageData?.scheduleData?.organizer || '',
    organizerRoleId: MessageData?.scheduleData?.organizerRoleId || '',
    callType: MessageData?.scheduleData?.channel || '',
    allowedMaximumDays: allowedMaximumDays,
    patientId: MessageData?.scheduleData?.patientId,
    description: description,
    tenantId: MessageData?.tenantId || 'amura',
    roleIds: MessageData?.scheduleData?.roleIds || [],
  };
  const url = `${import.meta.env.VITE_BASE_API_URL}/scheduler/event/allocateBookable`;
  const response = await axios.post(url, payload);

  return response;
};
export const sendSchedulecallMsgApi = async (payload: any) => {
  const url = `${import.meta.env.VITE_BASE_API_URL}/scheduleACall`;
  const response = await axios.post(url, payload);
};

export const getTimeZoneModifiedValue = (time: any, timeZone: any, getValue?: boolean) => {
  let offSet = getTimeZoneOffSet(timeZone);
  let systemOffSet = getlocalTimezone();
  let timeDifferenceWithUTCOfSystem = getTimeDifference(systemOffSet);
  let timeDifferenceWithUTC = getTimeDifference(offSet);
  let modifiedTime = new Date(time);

  if (!getValue) {
    modifiedTime.setTime(
      modifiedTime.getTime() +
        (timeDifferenceWithUTCOfSystem < timeDifferenceWithUTC
          ? Math.abs(timeDifferenceWithUTC - timeDifferenceWithUTCOfSystem)
          : -Math.abs(timeDifferenceWithUTC - timeDifferenceWithUTCOfSystem))
    );
  } else {
    modifiedTime.setTime(
      modifiedTime.getTime() +
        (timeDifferenceWithUTCOfSystem < timeDifferenceWithUTC
          ? -Math.abs(timeDifferenceWithUTC - timeDifferenceWithUTCOfSystem)
          : Math.abs(timeDifferenceWithUTCOfSystem - timeDifferenceWithUTC))
    );
  }

  return modifiedTime;
};

export const getDateChanged = (time: any, timeZone: any, selectedDate: Date) => {
  let offSet = getTimeZoneOffSet(timeZone);
  let timeDifference = getTimeDifference(offSet);
  let modifiedTime = new Date(time);
  modifiedTime.setTime(modifiedTime.getTime() + timeDifference);
  return modifiedTime.getUTCDate() === selectedDate.getDate();
};

export const getHHMMFromDateString = (ISOString) => {
  var t = moment.utc(ISOString).format('h:mm a');
  return t;
};

export const getTimeZoneOffSet = (timeZone) => {
  return (timeZone[0] && timeZone[0]?.offset) || 'UTC+00';
};

export const getTimeDifference = (offSet: string) => {
  let positive = true;
  if (offSet.indexOf('-') > -1) {
    positive = false;
  }
  if (offSet.indexOf(':') === -1) {
    offSet = `${offSet}:00`;
  }
  let minutes = JSON.parse(JSON.stringify(offSet));
  let hours = JSON.parse(JSON.stringify(offSet));
  let milliseconds =
    Number(hours.slice(4, hours.length - 3)) * 60 * 60 * 1000 +
    Number(minutes.slice(minutes.length - 1 - 1, minutes.length)) * 60 * 1000;
  return positive ? milliseconds : -milliseconds;
};

export const timeZoneAbbreviated = () => {
  const { 1: tz } = new Date().toString().match(/\((.+)\)/);

  if (tz.includes(' ')) {
    return tz
      .split(' ')
      .map((first) => first[0])
      .join('');
  } else {
    return tz;
  }
};

export const getlocalTimezone = () => {
  let { 1: offset } = new Date().toTimeString().split(' ');
  let minutes = offset.substring(offset.length - 2, offset.length);
  let hours = offset.substring(offset.length - 4, offset.length - 2);

  return `UTC${offset.indexOf('+') > -1 ? '+' : '-'}${hours}${Number(minutes) > 0 ? ':' + minutes : ''}`;
};

export const checkUserDetails = (msgData: any) => {
  if (msgData?.persons?.length > 0 && msgData?.roles?.length > 0) return true;
  if (msgData?.persons?.length > 1) return true;
  if (msgData?.roles?.length > 1) return true;
  return false;
};

export const cancelBookingSlotAPI = async (payload: ICancelBooking) => {
  try {
    let url = `${import.meta.env.VITE_BASE_API_URL}/scheduler/event/cancelBooking`;
    let response = await axios.post(url, payload);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
export const getAllStaffRoles = async () => {
  const payload = {
    payLoad: {
      partKey: 'part_key',
      partKeyValue: `~roles~master~${'amura'}~`,
      tableName: 'staff-info',
    },
  };
  const url = `${import.meta.env.VITE_BASE_API_URL}/queryFromDB`;
  try {
    const response = await axios.post(url, payload, {
      headers: {},
    });
    return response?.data || [];
  } catch (error) {
    console.error('!!error', error);
    // ErrorToaster(error.message);
    return [];
  }
};
export const getMessageDataFormURL = async (
  setIsBooked: Dispatch<SetStateAction<boolean>>,
  setNoUUID: Dispatch<SetStateAction<boolean>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setMessageData: Dispatch<SetStateAction<IMessage>>,
  setSuccessMsgData: Dispatch<SetStateAction<IMessage>>,
  UUID: string | null,
  patientId: string | null = ''
) => {
  try {
    const response = await fetch(
      patientId
        ? `${import.meta.env.VITE_BASE_API_URL}/getScheduleDetails/${patientId}/${UUID}`
        : `${import.meta.env.VITE_BASE_API_URL}/getScheduleDetailsByHex/${UUID}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data: IMessage = await response.json();
    // if (data?.Status === 'Failure') {
    //   throw new Error('Error');
    // }
    if (data?.scheduleData?.participants) {
      setIsBooked(data.isBooked == true);
    }
    if (
      !(data?.scheduleData?.reason === 'Cancelled' || data?.scheduleData?.reason === 'Confirmed') &&
      isTimeDifferenceGreaterThanNHours(data.receivedTime, 168)
    ) {
      setNoUUID(true);
      setIsLoading(false);
      return;
    }
    setMessageData(data);
    setSuccessMsgData(data);
  } catch (e) {
    setNoUUID(true);
  } finally {
    setIsLoading(false);
  }
};

export const handleSlotBookCall = async (
  selectedTimeSlot: Date | null,
  modifiedSlots: IModifiedSlots[],
  startDateFormat: Date,
  endDateFormat: Date,
  messageData: IMessage,
  setEndDateFormat: Dispatch<SetStateAction<Date>>,
  setStartDateFormat: Dispatch<SetStateAction<Date>>,
  timeZoneValue: any,
  description: string,
  setDescription: Dispatch<SetStateAction<string>>,
  setSelectedTimeSlot: Dispatch<SetStateAction<Date | null>>,
  setSuccessMsgData: Dispatch<SetStateAction<IMessage>>,
  setIsBooked: Dispatch<SetStateAction<boolean>>,
  setNoUUID: Dispatch<SetStateAction<boolean>>,
  handleCancel: Function
) => {
  try {
    let selectedslotdate = selectedTimeSlot.toISOString();
    let selectallotData = modifiedSlots.filter((each) => each.startTime === selectedslotdate);
    let slotNotBooked = await checkSlotAvailability(
      'main',
      selectallotData[0].startTime,
      selectallotData[0].endTime,
      selectallotData[0].participantsQuery,
      startDateFormat,
      endDateFormat,
      messageData
    );
    if (!slotNotBooked) {
      ErrorToaster('This slot is already booked. Please book another slot');
      handleCancel();
      let startTime = selectedTimeSlot.toISOString();
      let modifiedDate = getTimeZoneModifiedValue(startTime, timeZoneValue, true);
      setEndDateFormat(new Date(new Date(modifiedDate).setHours(23, 59, 59, 999)));
      setStartDateFormat(new Date(new Date(modifiedDate).setHours(0, 0, 0, 0)));
      return;
    }
    let slotTimeCheck = new Date().getTime() < new Date(selectallotData[0].startTime).getTime();
    if (!slotTimeCheck) {
      ErrorToaster('Selected Slot should be grater then current Time');
      setDescription('');
      let startTime = selectedTimeSlot.toISOString();
      setSelectedTimeSlot(null);
      let modifiedDate = getTimeZoneModifiedValue(startTime, timeZoneValue, true);
      setEndDateFormat(new Date(new Date(modifiedDate).setHours(23, 59, 59, 999)));
      setStartDateFormat(new Date(new Date(modifiedDate).setHours(0, 0, 0, 0)));
      return;
    }
    if (slotNotBooked) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/getScheduleDetails/${messageData?.userId}/${messageData?.messageId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        if (data?.Status === 'Failure') {
          throw new Error('Error');
        }
        setSuccessMsgData(data);
        setIsBooked(data.isBooked == true);
        let check = data.isBooked;
        if (check) {
          ErrorToaster('A Call has been already Scheduled by this Link');
          return;
        }
      } catch (e) {
        setNoUUID(true);
        return;
      }
    }
    let response = await slotsbookcall(messageData, modifiedSlots, selectedslotdate, description.trim(), messageData?.userId);
    let selectslotData = modifiedSlots.filter((each) => each.startTime === selectedslotdate);
    let successMsg = JSON.parse(JSON.stringify(messageData));
    if (response.data.status >= 200 && response.data.status <= 201) {
      setIsBooked(true);
      SuccessToast(response.data.message);
      const { body } = response.data;
      const { eventId, parentEventId, bookableIds, participantIds } = body;
      let selectallotData = modifiedSlots.filter((each) => each.startTime === selectedslotdate);
      let sendingMessage = JSON.parse(JSON.stringify(messageData));
      successMsg.scheduleData = {
        ...messageData.scheduleData,
        // slots: selectslotData[0].slots,
        bookableIds: bookableIds,
        participants: [...participantIds],
        fromTime: selectslotData[0].startTime,
        toTime: selectslotData[0].endTime,
        description: description.trim(),
        bookables: selectallotData[0].bookables,
        organizer: messageData?.scheduleData?.organizer || '',
        organizerRoleId: messageData?.scheduleData?.organizerRoleId || '',
        clientBookedTimeZone: new Date().toString(),
      };
      setSuccessMsgData(successMsg);
      sendingMessage.ContextType = '@callScheduled';
      sendingMessage.scheduleData = {
        ...successMsg.scheduleData,
        eventId: eventId,
        parentId: parentEventId,
        reason: 'Confirmed',
        messageId: sendingMessage.messageId,
        //slots: selectallotData[0]?.slots,
        bookableIds: bookableIds,
        participants: [...participantIds],
        participantsQuery: [...participantIds],
        fromTime: selectallotData[0].startTime,
        toTime: selectallotData[0].endTime,
        description: description,
        callType: messageData?.scheduleData?.channel,
        organizer: successMsg?.scheduleData?.organizer,
        organizerRoleId: successMsg?.scheduleData?.organizerRoleId,
      };
      let payload = {
        ...sendingMessage,
        EventName: 'chat-categorizer',
        patientId: sendingMessage.userId,
      };
      sendSchedulecallMsgApi(payload);
    } else {
      ErrorToaster(response?.data?.Message);
    }
  } catch (error) {
    console.log('!!error at create slots', error);
    ErrorToaster('Unable to create slots');
    handleCancel();
  }
};
