import axios from 'axios';
import moment from 'moment';
import { PMS_S3 } from '../../../../Utils';
import { getUserNameFromES } from './../../../../Common/Common.functions';
import SuccessToast from './../../../../Common/SuccessToaster';
import ErrorToaster from './../../../../Common/ErrorToaster';
import { ITagObject } from '../../../PanelComponents/Notes/components/MessageInputNew/MessageInput.types';
import { IAllRoleDetails } from '../../../PanelComponents/MyListPanel/MyList/MyList.types';
export const tempScheduleData = {
  userId: '0207e297-ff0f-4f8f-8dfb-e0135e0bad24',
  EventName: 'chat-categorizer',
  tenantId: 'amura',
  senderId: '948aee3d-6712-48a9-a03b-c926f5f99915',
  messageId: '24dfbfcd-20da-4aa6-97c4-a279af7f7573',
  message: '',
  receivedTime: '2022-12-05T17:01:32.827Z',
  ContextType: '@call',
  loginUserId: '948aee3d-6712-48a9-a03b-c926f5f99915',
  operation: '@UPDATE_ENTITY',
  scheduleData: {
    channel: 'voice',
    duration: '200',
    timeUnits: 'mins',
    participants: [
      {
        userId: 'ce1348c6-3e02-4aae-8710-04a4279f6f36',
        roleId: 'amura_guidance_counselor_level2',
      },
      {
        userId: '9a173655-05eb-40bc-abab-e20ebcce596f',
        roleId: 'amura_consulting_physician',
      },
    ],
    title: 'test for testing',
    patientId: '0207e297-ff0f-4f8f-8dfb-e0135e0bad24',
  },
  IDToken:
    'eyJraWQiOiJDb0NLT2Q5Y3ZTNGpYQTI1bjhmbmRqWWRTS3pTeU5GTUNUNFJDM1U4UTNNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5NDhhZWUzZC02NzEyLTQ4YTktYTAzYi1jOTI2ZjVmOTk5MTUiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX0hNeXQ4SjE1TSIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwiY29nbml0bzp1c2VybmFtZSI6Ijk0OGFlZTNkLTY3MTItNDhhOS1hMDNiLWM5MjZmNWY5OTkxNSIsImdpdmVuX25hbWUiOiJNYW5vIiwiYXVkIjoiMm1xcnAzdmxyOWUybmQyZjM2a2UxcTRsaWgiLCJldmVudF9pZCI6IjBjOTg4YzMzLTE1MWEtNDAwZi1iYjY5LWIzZjAxZGU0ZTdlYSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjY4ODQ1NTM1LCJwaG9uZV9udW1iZXIiOiIrOTE4MjQ4OTA4NzMzIiwiZXhwIjoxNjcwMzE5MDc1LCJpYXQiOjE2NzAyMzI2NzUsImZhbWlseV9uYW1lIjoiTWVuYW0ifQ.nevUdiON1sMwhaVl7apam8yJ_4KY1SeeTqRAR5t0EOdq_VRKAsWmLgIqdX4BOYo_L5JMTEGgkq4Aunn8WEsGtjShret6kn0047XxLdQ0J12zgJeo81IAdwTxgiOXBmBDskC8Ay_llBgedMNU_XBPMKKR76XirfdCnHI1gG6XBxPacbXQouJ1Rhtp0G4rhq5c5qyHoWD5IbZSwMlZlDt-U4gaoPVS2haMgOkaZ4RXrqL9ytTVqSnSUG28V-ne-lPL80INoczPJF_Hwrk8z8z2EyDqP7E0oha-2AhKodvLbdUTFROPzEQvRlFiA60weWE2XlH4Y1pcZk3O9sPt97Lj0Q',
  UserName: '948aee3d-6712-48a9-a03b-c926f5f99915',
  LoggedInUserName: 'மனோ Menam',
  UserEmail: '',
  UserPool: 'https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_HMyt8J15M',
  UserPoolId: 'ap-south-1_HMyt8J15M',
  AppClientId: '2mqrp3vlr9e2nd2f36ke1q4lih',
  loggedInUserName: 'மனோ Menam',
  userPoolId: 'ap-south-1_HMyt8J15M',
};

export const filterUserData = async (roomUsers: any, participants: any, roles: IAllRoleDetails[], teamWhoDealt: ITagObject) => {
  let filterParticipantsObj = participants.filter((each: any) => roomUsers.find((user: any) => user.userId === each.userId));
  let filterobj = filterParticipantsObj?.map((data: any) => ({
    id: data.userId,
    label: roomUsers.find((user: any) => user.userId === data.userId)?.userName || data.userId,
    roleId: data.roleId,
    roleName: roles.find((role: IAllRoleDetails) => role.roleId === data.roleId)?.roleName || data.roleId,
  }));

  let convertObj = filterobj.map((eachone: any) => eachone.id);
  let filterDeltedUsers = participants.filter((each: any) => !convertObj.includes(each.userId));
  let convertObj2 = [];
  for (let i = 0; i < filterDeltedUsers.length; i++) {
    let responseName = teamWhoDealt[filterDeltedUsers[i]?.userId];
    const options = {
      id: filterDeltedUsers[i]?.userId,
      label: responseName,
      roleid: filterDeltedUsers[i].roleId,
      roleName:
        roles.find((role: IAllRoleDetails) => role.roleId === filterDeltedUsers[i].roleId)?.roleName ||
        filterDeltedUsers[i].roleId,
    };
    convertObj2.push(options);
  }
  filterobj.push(...convertObj2);
  return filterobj;
};

export const settingColors = (rawdata: any) => {
  let colors = ['#40916C', '#E45C3A', '#0096C7', '#DA4EC3', '#CEEF00', '#FF9110', '#CC444B', '#FFB743', '#FF8110'];

  let newObjk = rawdata.map((each, index) => ({
    ...each,
    color: rawdata.length > 1 ? colors[index] : '#FFFFFF',
  }));
  return newObjk;
};

export const handledeleteslotEventCall = async (props: {
  messageData: any;
  selectedClient: any;
  sessions: any;
  descriptionText: any;
  setCallWizardFlow: any;
  setDescriptionText: any;
  panelId: string;
}) => {
  const { messageData = {}, selectedClient, sessions, descriptionText, setCallWizardFlow, setDescriptionText, panelId } = props;
  try {
    let payload = {
      deleteObject: {
        thisEvent: true,
        allEvents: false,
      },
      eventId: messageData?.scheduleData.eventId,
      parentId: messageData?.scheduleData.parentId,
      bookableIds: messageData?.scheduleData.bookableIds,
      eventType: 'events',
      tenantId: selectedClient.client_id,
    };
    const url = `${import.meta.env.VITE_BASE_API_URL}/scheduler/event/deleteEvent`;
    let response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${sessions.id_token}` },
    });

    if (response.data.status >= 200 && response.data.status <= 201) {
      SuccessToast(response.data.message, panelId, 'success');
      let sendingMessage = JSON.parse(JSON.stringify(messageData));
      sendingMessage.ContextType = '@callCancelBooked';
      sendingMessage.EventName = 'chat-categorizer';
      sendingMessage.scheduleData = {
        ...messageData?.scheduleData,
        reason: 'Cancelled',
        messageId: sendingMessage.messageId,
        callScheduledMessageId: messageData?.scheduleData.messageId,
        state: 'CANCELLED_EVENT',
        organizer: messageData?.scheduleData?.organizer || '',
        organizerRoleId: messageData?.scheduleData?.organizerRoleId || '',
        cancellation: { cancelledBy: sessions.user.id, cancelledTime: new Date().toISOString(), reason: descriptionText },
      };
      PMS_S3.postData({
        ...sendingMessage,
        EventName: 'chat-categorizer',
        Locale: sessionStorage.getItem('locale'),
        url: `${import.meta.env.VITE_BASE_API_URL}/chatCategorizer`,
        token: sessions.id_token,
        method: 'POST',
        headers: {},
      })
        .then((response) => {
          if (!response.Error) {
            setDescriptionText('');
            setCallWizardFlow({ isOpen: false });
          }
        })
        .catch((err) => {
          console.error(err, 'error in inside msg call');
        });
    }
  } catch (error) {
    console.error(error);
    ErrorToaster('Something went wrong while deleting event', panelId, 'error');
  }
};

export const copyToClipboard = (scheduleURL: string, panelId: string) => {
  let urlToOpen = `${window.location.protocol}//${window.location.host}${scheduleURL}`;
  navigator.clipboard.writeText(urlToOpen);
  SuccessToast('Link copied to clipboard', panelId, 'success');
};

export const handleCloseWizard = async (props: { panelId: string; messageData: any; sessions: any; setCallWizardFlow: any }) => {
  const { panelId, messageData = {}, sessions, setCallWizardFlow } = props;
  PMS_S3.postData({
    ...messageData,
    scheduleData: {
      ...messageData.scheduleData,
      organizer: messageData?.scheduleData?.organizer || '',
      organizerRoleId: messageData?.scheduleData?.organizerRoleId || '',
      state: 'CANCELLED',
      cancellation: { cancelledBy: sessions.user.id, cancelledTime: new Date().toISOString(), reason: '' },
    },
    EventName: 'chat-categorizer',
    Locale: sessionStorage.getItem('locale'),
    url: `${import.meta.env.VITE_BASE_API_URL}/chatCategorizer`,
    token: sessions.id_token,
    method: 'POST',
    ContextType: '@callCancel',
    headers: {},
  })
    .then((response) => {
      if (!response.Error) {
        setCallWizardFlow({ isOpen: false });
      }
    })
    .catch((err) => {
      console.error(err, 'error in inside msg call');
      ErrorToaster('Something went wrong while Removing', panelId, 'error');
    });
};

export const getUnAllocatedBookables = async (panelId: string, payLoad: any) => {
  try {
    const url = `${import.meta.env.VITE_BASE_API_URL}/scheduler/event/getUnAllocatedBookables`;
    const response = await axios.post(url, payLoad);
    return response;
  } catch (error) {
    ErrorToaster('error in getting slots', panelId, 'error');
  }
};

export const setColorstoslots = (personsdata: Array<any>, availableTimeSlots: any) => {
  let modifedData = availableTimeSlots.map((each: any, index: number) => {
    let usersWithcolordata = personsdata.filter((a, index) => {
      return each.userIds.includes(a.id) || (a.isRole && each.pool.length > 0 && each.pool.some((item) => item.roleId === a.id));
    });

    return { ...each, usersWithcolordata };
  });
  return modifedData;
};

export const handleSlotBookCall = async (props: {
  selectedClient: any;
  sessions: any;
  messageData: any;
  selectedTimeSlot: any;
  setSelectedTimeSlot: any;
  modifiedSlots: any;
  startDateFormat: any;
  setStartDateFormat: any;
  endDateFormat: any;
  setEndDateFormat: any;
  setSlotCreateCheck: any;
  descriptionText: any;
  setCallWizardFlow: any;
  setControlView: any;
  setSecondaryFlow: any;
  setDescriptionText: any;
  panelId: string;
}) => {
  const {
    sessions,
    selectedClient,
    messageData,
    selectedTimeSlot,
    setSelectedTimeSlot,
    modifiedSlots,
    startDateFormat,
    setStartDateFormat,
    endDateFormat,
    setEndDateFormat,
    setSlotCreateCheck,
    descriptionText,
    setCallWizardFlow,
    setControlView,
    setSecondaryFlow,
    setDescriptionText,
    panelId,
  } = props;
  try {
    let selectedslotdate = selectedTimeSlot.toISOString();
    let selectallotData = modifiedSlots.filter((each: any) => each.startTime === selectedslotdate);
    let allowedMaximumDays = 1;
    let start: any = new Date();
    start.setHours(0, 0, 0, 0);
    start = moment(start);
    let end: any = new Date(startDateFormat);
    end.setHours(0, 0, 0, 0);
    end = moment(end);
    allowedMaximumDays = end.diff(start, 'days') + 1;
    let slotNotBooked = await checkSlotAvailability(
      panelId,
      selectallotData[0].startTime,
      selectallotData[0].endTime,
      selectallotData[0].participantsQuery,
      startDateFormat,
      endDateFormat,
      messageData
    );

    if (!slotNotBooked) {
      let startTime = selectedTimeSlot.toISOString();
      setSelectedTimeSlot(null);
      setEndDateFormat(new Date(new Date(startTime).setHours(23, 59, 59, 999)));
      setStartDateFormat(new Date(new Date(startTime).setHours(0, 0, 0, 0)));
      setSecondaryFlow({ isOpen: true, openAvaibility: true });
      ErrorToaster('The availability you are trying to book is already booked.', panelId, 'warning');
      return;
    }
    let slotTimeCheck = new Date().getTime() < new Date(selectallotData[0].startTime).getTime();
    if (!slotTimeCheck) {
      ErrorToaster('Selected Slot should be grater then current Time', panelId, 'warning');
      let startTime = selectedTimeSlot.toISOString();
      setSelectedTimeSlot(null);
      setEndDateFormat(new Date(new Date(startTime).setHours(23, 59, 59, 999)));
      setStartDateFormat(new Date(new Date(startTime).setHours(0, 0, 0, 0)));
      setSecondaryFlow({ isOpen: false });
      setControlView(true);
      return;
    }

    let response = await slotsbookcall(sessions, selectedClient, messageData, modifiedSlots, selectedslotdate, descriptionText);
    setSlotCreateCheck(1);

    if (response?.data?.status >= 200 && response?.data?.status <= 201) {
      SuccessToast(response.data.message, panelId, 'success');
      const { body } = response.data;
      const { eventId, parentEventId, bookableIds, participantIds } = body;
      let selectallotData = modifiedSlots.filter((each: any) => each.startTime === selectedslotdate);

      let sendingMessage = JSON.parse(JSON.stringify(messageData));
      sendingMessage.ContextType = '@callScheduled';
      sendingMessage.scheduleData = {
        ...messageData.scheduleData,
        eventId: eventId,
        parentId: parentEventId,
        reason: 'Confirmed',
        messageId: sendingMessage.messageId,
        participantsQuery: [...participantIds],
        allowedMaximumDays: allowedMaximumDays,
        participants: [...participantIds],
        fromTime: selectallotData[0].startTime,
        toTime: selectallotData[0].endTime,
        description: descriptionText,
        callType: messageData.scheduleData.channel,
        bookableIds: bookableIds,
        organizer: messageData?.scheduleData?.organizer || '',
        organizerRoleId: messageData?.scheduleData?.organizerRoleId || '',
        clientBookedTimeZone: new Date().toString(),
      };
      PMS_S3.postData({
        ...sendingMessage,
        EventName: 'chat-categorizer',
        Locale: sessionStorage.getItem('locale'),
        url: `${import.meta.env.VITE_BASE_API_URL}/chatCategorizer`,
        token: sessions.id_token,
        method: 'POST',
        headers: {},
      })
        .then((response) => {
          if (!response.Error) {
            setCallWizardFlow({ isOpen: false });
            setControlView(true);
            setSecondaryFlow({ isOpen: false });
            setDescriptionText('');
          }
        })
        .catch((err) => {
          console.error(err, 'error in inside msg call');
        });
    } else {
      ErrorToaster(response?.data?.Message, panelId, 'error');
      setSlotCreateCheck(0);
    }
  } catch (error) {
    console.error('!!error at create slots', error);
    ErrorToaster('Unable to create slots', panelId, 'error');
    setSlotCreateCheck(0);
  }
};

export const checkSlotAvailability = async (
  panelId: string,
  startTime: string,
  endTime: string,
  participants: any,
  startDateFormat: any,
  endDateFormat: any,
  MessageData: any
) => {
  let allowedMaximumDays = 1;
  let start: any = new Date();
  start.setHours(0, 0, 0, 0);
  start = moment(start);
  let end: any = new Date(startDateFormat);
  end.setHours(0, 0, 0, 0);
  end = moment(end);
  allowedMaximumDays = end.diff(start, 'days') + 1;
  let payload = {
    participants: participants || [],
    duration: MessageData?.scheduleData?.duration || '',
    channel: MessageData?.scheduleData?.channel || '',
    startDate: startDateFormat.toISOString(),
    endDate: endDateFormat.toISOString(),
    allowedMaximumDays: allowedMaximumDays || 0,
    roleIds: MessageData?.scheduleData?.roleIds || [],
    tenantId: MessageData?.tenantId || 'amura',
  };

  let availableSlotsData: any = await getUnAllocatedBookables(panelId, payload);
  if (availableSlotsData?.data.length > 0) {
    let slot = availableSlotsData.data.find((slot: any) => slot.startTime === startTime && endTime === slot.endTime);
    if (!slot) {
      return false;
    }
  } else {
    return false;
  }
  return true;
};

export const slotsbookcall = async (
  sessions: any,
  selectedClient: any,
  MessageData: any,
  modifiedSlots: any,
  selectedslotdate: any,
  description: any
) => {
  let selectallotData = modifiedSlots.filter((each) => each.startTime === selectedslotdate);
  let duration = MessageData.scheduleData.duration;
  let title = MessageData.scheduleData.title;
  let participants = selectallotData[0].userIds;
  if (participants.indexOf(selectedClient.client_id) === -1) {
    participants.push(selectedClient.client_id);
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
    participantsQuery: selectallotData[0].participantsQuery || [],
    allowedMaximumDays: allowedMaximumDays,
    participants: participants || [],
    pool: selectallotData[0].pool || [],
    fromTime: selectallotData[0].startTime,
    toTime: selectallotData[0].endTime,
    bookables: selectallotData[0].bookables,
    title: title,
    duration: duration,
    // organizer:organizer
    organizer: MessageData?.scheduleData?.organizer || '',
    organizerRoleId: MessageData?.scheduleData?.organizerRoleId || '',
    description: description,
    callType: MessageData?.scheduleData?.channel || '',
    patientId: MessageData?.userId,
    tenantId: MessageData?.tenantId || 'amura',
    roleIds: MessageData?.scheduleData?.roleIds || [],
  };
  const url = `${import.meta.env.VITE_BASE_API_URL}/scheduler/event/allocateBookable`;
  const response = await axios.post(url, payload, {
    headers: { Authorization: `Bearer ${sessions.id_token}` },
  });

  return response;
};

export const checkUserDetails = (msgData: any) => {
  if (msgData?.persons?.length > 0 && msgData?.roles?.length > 0) return true;
  if (msgData?.persons?.length > 1) return true;
  if (msgData?.roles?.length > 1) return true;
  return false;
};
