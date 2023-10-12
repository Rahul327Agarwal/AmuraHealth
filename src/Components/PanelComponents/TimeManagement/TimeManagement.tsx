import { Avatar, Divider } from '@mui/material';
import moment from 'moment';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { getAllStaffRoles, minutesToTimeString } from '../../../Common/Common.functions';
import ErrorToaster from '../../../Common/ErrorToaster';
import SuccessToaster from '../../../Common/SuccessToaster';
import { useDFEvent, useDFGoBack } from '../../../DisplayFramework/Events/DFEvents';
import { PMS_LOCALE } from '../../../Utils';
import InputField from '../../LibraryComponents/InputField/InputField';
import MUIDatePicker from '../../LibraryComponents/MUIDatePicker/MUIDatePicker';
import RadioGroup from '../../LibraryComponents/MUIRadioGroup/MUIRadioGroup';
import MUITimePicker from '../../LibraryComponents/MUITimePicker/MUITimePicker';
import ModalBox from '../../LibraryComponents/ModalBox/ModalBox';
import PageHeader from '../../LibraryComponents/PageHeader/PageHeader';
import PanelFooter from '../../LibraryComponents/PanelFooter/PanelFooter';
import Select from '../../LibraryComponents/Select/Select';
import { AmuraIcon2, AmuraIcon20, DoctorIcon, RepeatIcon, RoleIcon } from '../../SVGs/Common';
import { IAllRoleDetails } from '../MyListPanel/MyList/MyList.types';
import CustomDuration from './Components/CustomDuration';
import CustomRepeatDrawer from './Components/CustomRepeatDrawer';
import Events from './Components/Events';
import Slots from './Components/Slots';
import WithIconContainer from './Components/WithIconContainer';
import {
  DAYS_OPTIONS,
  DEFAULT_CUSTOM_REPEAT,
  DEFAULT_DATE_STATE,
  DEFAULT_EDIT_PERMISSION,
  DEFAULT_EVENT,
  DEFAULT_OFFLINE,
  DEFAULT_OUT_OF_OFFICE,
  DEFAULT_RSVP,
  DEFAULT_SLOTS,
  DURATION_OPTIONS,
  DURATION_TIME_VALUES,
  ERROR_OBJECT,
  REPEAT_OPTIONS,
  RSVP_OPTIONS,
  RSVP_VALUE,
  TAB_OPTIONS,
  TENANT_OPTIONS,
  TM_IDS,
  getBookablesDetails,
  getCurrentUserdata,
  getCustomRepeatLabel,
  getReccurance,
  getRolesForAUser,
  getRolesForAUserFromDB,
  handleCreateEvent,
  handleCreateOutOfOffice,
  handleCreateSlot,
  handleUpdateCall,
  setNewCustomOption,
  validateFields,
} from './TimeManagement.function';
import { useStyles } from './TimeManagement.style';
import { TimeIcon } from './TimeManagement.svg';
import {
  EventType,
  IConfirmModal,
  IDateState,
  IEditPermission,
  IErrorObject,
  IEventsState,
  IOfflineState,
  IOutOfOfficeState,
  ISelectOption,
  ISlotsState,
  ITimeManagementProps,
  IUserRolesDataWithTenat,
} from './TimeManagement.types';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import Radio from '../../LibraryComponents/MUIRadio/MUIRadio';
import { IRootState } from '../../../DisplayFramework/State/store';
import { useSelector } from 'react-redux';
import { useFetchUserName } from '../../../Common/Common.hooks';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';

const InputFieldMemo = memo(InputField);
const MemoSelect = memo(Select);
const MemoMUIDatePicker = memo(MUIDatePicker);
const MemoMUITimePicker = memo(MUITimePicker);
const MemoEvents = memo(Events);
const MemoSlots = memo(Slots);

const EVENT_TYPE_HEADER: any = {
  [TM_IDS.EVENT]: 'Add event',
  [TM_IDS.SLOT]: 'Available for booking',
  [TM_IDS.OFFLINE]: 'Offline',
  [TM_IDS.OUT_OF_OFFICE]: 'Offline',
};
export default function TimeManagement(props: ITimeManagementProps) {
  const {
    setAction,
    childEventTrigger,
    eventsData,
    viewType,
    isEditEvent,
    isrepeatType,
    sessions,
    addedPeoples,
    selectedDateTime,
    draggedDuration,
    openInMyWork,
    openInResource,
  } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();

  const { fetchUserName, fetchMultipleUserNames } = useFetchUserName();

  const rolesFromRedux = useSelector((state: IRootState) => state.dashboard.allUserRoles);
  const scrollPosition = useRef(null);

  const [title, setTitle] = useState('');
  const [tenantName, setTenantName] = useState(TENANT_OPTIONS[0].value);
  const [eventType, setEventType] = useState<EventType>(TM_IDS.EVENT);

  const [repeatType, setRepeatType] = useState(TM_IDS.DOESNT_REPEAT);
  const [repeatTypeOptions, setRepeatTypeOptions] = useState(REPEAT_OPTIONS);
  const [openCustomRepeat, setOpenCustomRepeat] = useState(false);
  const [customRepeat, setCustomRepeat] = useState(DEFAULT_CUSTOM_REPEAT);
  const { id: panelId } = useCurrentPanel();
  const [durationOptions, setDurationOptions] = useState(DURATION_OPTIONS);
  const [openCustomDuration, setOpenCustomDuration] = useState(false);
  const [customDuration, setCustomDuration] = useState<any>({});

  const [dateState, setDateState] = useState<IDateState>(DEFAULT_DATE_STATE);
  const [eventsState, setEventsState] = useState<IEventsState>(DEFAULT_EVENT);
  const [slotsState, setSlotsState] = useState<ISlotsState>(DEFAULT_SLOTS);
  const [outOfOfficeState, setOutOfOfficeState] = useState<IOutOfOfficeState>(DEFAULT_OUT_OF_OFFICE);
  const [errors, setErrors] = useState<IErrorObject>(ERROR_OBJECT);

  const [bookableOptions, setBookableOptions] = useState([]);
  const [bookableObject, setBookableObject] = useState({});

  const [notify, setNotify] = useState(['10 minutes before']);
  const [tenantParticipants, setTenantParticipants] = useState<Array<ISelectOption>>([]);
  const [rsvp, setRsvp] = useState(DEFAULT_RSVP);
  const [currentUser, setCurrentUser] = useState<ISelectOption>({ label: '', value: '', roleName: '', roleId: '' });
  const [confirmModal, setConfirmModal] = useState<IConfirmModal>({ open: false, payload: {} });
  const [editPermission, setEditPermission] = useState<IEditPermission>(DEFAULT_EDIT_PERMISSION);
  const [isDisabled, setIsDisabled] = useState(false);

  const [roles, setRoles] = useState([]);

  const [OfflineState, setOfflineState] = useState<IOfflineState>(DEFAULT_OFFLINE);
  const [file, setFile] = useState([]);
  const [deletedFileDetails, setDeletedFileDetails] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const [userRoles, setUserRoles] = useState<IUserRolesDataWithTenat[]>([]);
  const [organizerRoleId, setOrganizerRoleId] = useState<string>('');

  const goBack = useDFGoBack();

  useEffect(() => {
    (async () => {
      // const organizerId = eventsData?.organizer || sessions?.user?.id;
      // const userdata = await getCurrentUserdata([organizerId]);
      // if (userdata[0]) {
      //   setCurrentUser(userdata[0]);
      // }

      let organizerName = await fetchUserName(eventsData?.organizer || sessions?.user?.id);
      let organizerNameWithRole = {
        value: eventsData?.organizer || sessions?.user?.id,
        label: organizerName,
        roleId: eventsData?.organizerRoleId || eventsData?.roleId || organizerRoleId || '',
        roleName:
          roles.find((role) => role.roleId === (eventsData?.organizerRoleId || eventsData?.roleId || organizerRoleId || ''))
            ?.roleName ||
          eventsData?.organizerRoleId ||
          eventsData?.roleId ||
          '',
      };
      setCurrentUser(organizerNameWithRole);
    })();
  }, [props, organizerRoleId]);

  useEffect(() => {
    (async () => {
      let rolesData: any = await getRolesForAUserFromDB(sessions.user.id, sessions, 'amura');
      let formatedRolesData: IUserRolesDataWithTenat = { tenantId: '', roleIds: [] };
      if (rolesData?.roles?.length) {
        (rolesData?.roles || []).filter((ele) => {
          if (ele?.is_active) {
            formatedRolesData = {
              ...formatedRolesData,
              tenantId: ele?.tenantId || 'amura',
              roleIds: [...formatedRolesData?.roleIds, ele?.roleId],
            };
          }
          return true;
        });
      }
      formatedRolesData.roleIds.length && setUserRoles([{ ...formatedRolesData }]);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const bookableData = await getBookablesDetails(panelId, sessions);
      if (bookableData) {
        let bookableList = [];
        let bookableobject = {};
        bookableData.forEach((data) => {
          bookableList.push({ value: data.lov_name_id, label: data.lov_name_id });
          bookableobject[data.lov_name_id] = data;
        });
        setBookableOptions(bookableList);
        setBookableObject(bookableobject);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const userRoles = await getRolesForAUser(panelId, sessions, tenantName);
      const roles: IAllRoleDetails[] = await getAllStaffRoles(sessions, tenantName);
      let roleIds = userRoles.map((role) => role.sort_key);
      let rolesWithName = roleIds.map((id) => {
        return { value: id, label: roles.find((role) => role.roleId === id)?.roleName || id };
      });
      setRoles(rolesWithName);
    })();
  }, []);
  useEffect(() => {
    if (selectedDateTime) {
      const time = moment(selectedDateTime).format('hh:mm A');
      setDateState((pre) => ({ ...pre, eventDate: selectedDateTime, time }));
    }
  }, [selectedDateTime]);

  useEffect(() => {
    if (draggedDuration) {
      const duration = `${draggedDuration || ''}`;
      const isCustomDuration = !DURATION_TIME_VALUES.includes(Number(duration));
      setDateState((pre) => ({
        ...pre,
        duration: isCustomDuration ? TM_IDS.CUSTOM_DURATION : duration,
      }));
      if (isCustomDuration) {
        setCustomDuration({
          key: TM_IDS.CUSTOM_DURATION,
          value: duration,
          label: minutesToTimeString(parseInt(duration)),
        });
      }
    }
  }, [draggedDuration]);

  useEffect(() => {
    if (addedPeoples) {
      let eventPatcicipantsWithoutOrganiser = addedPeoples.filter((p) => p.value !== eventsData?.organizer);
      if (eventPatcicipantsWithoutOrganiser.length === 0) {
        setEventsState((pre: any) => ({
          ...pre,
          isExcludeMeFromEvent: false,
          permissons: ['None'],
        }));
      }
      setTenantParticipants(addedPeoples);
    }
  }, [addedPeoples]);

  useEffect(() => {
    if (eventsData && Object.keys(eventsData).length) {
      setTitle(eventsData?.title);
      const time = moment(new Date(eventsData?.eventDate)).format('hh:mm A');
      const duration = `${eventsData?.duration || ''}`;
      const isCustomDuration = !DURATION_TIME_VALUES.includes(Number(duration));
      setTenantName(eventsData?.tenantId);
      setOrganizerRoleId(eventsData?.organizerRoleId || '');
      setDateState((pre) => ({
        ...pre,
        time,
        eventDate: new Date(eventsData?.eventDate),
        duration: isCustomDuration ? TM_IDS.CUSTOM_DURATION : duration,
      }));
      if (isCustomDuration) {
        setCustomDuration({
          key: TM_IDS.CUSTOM_DURATION,
          value: duration,
          label: minutesToTimeString(parseInt(duration)),
        });
      }
      setRepeatType(eventsData?.repeatType);
      if (eventsData?.repeatType === TM_IDS.CUSTOM_REPEAT) {
        const { monthsOccurance, ends } = eventsData?.reccurance;
        setCustomRepeat((pre) => ({
          ...pre,
          ...eventsData?.reccurance,
          weekDaysName: eventsData?.reccurance.weekDays.map((each) => DAYS_OPTIONS[each].value),
          monthsOccurance: { ...pre.monthsOccurance, ...monthsOccurance },
          ends: { ...pre.ends, ...ends },
          key: TM_IDS.CUSTOM_REPEAT,
        }));
      }
      (async () => {
        let tenantParticipantsNames = await fetchMultipleUserNames(eventsData?.tenantParticipants?.map((data) => data.userId));

        const tenantParticipants = eventsData?.tenantParticipants?.map((each) => ({
          value: each.userId,
          roleName: rolesFromRedux.find((role) => role.roleId === each?.roleId)?.roleName || each?.roleId || '',
          roleId: each?.roleId || '',
          label: tenantParticipantsNames[each.userId] || each?.userId || '',
        }));
        setTenantParticipants(tenantParticipants || []);
      })();

      setEventType(eventsData?.eventType);

      switch (eventsData?.eventType) {
        case TM_IDS.EVENT:
          setEventsState({
            isExcludeMeFromEvent: eventsData?.isExcludeMeFromEvent,
            callType: eventsData?.callType,
            description: eventsData?.description,
            others: eventsData?.callType === TM_IDS.VIDEO ? eventsData?.others : '',
            visibility: eventsData?.visibility,
            status: eventsData?.status,
            permissons: eventsData?.permissons,
          });
          break;
        case TM_IDS.SLOT:
          setSlotsState({
            maximumUses: eventsData?.maximumUses,
            visibility: eventsData?.visibility,
            allowedMaximumDays: `${eventsData?.allowedMaximumDays}`,
            useWorkingTime: eventsData?.useWorkingTime,
            status: eventsData?.bookables?.status,
            activityType: eventsData?.bookables?.activityType,
            roleId: eventsData?.roleId,
            cannotBookBefore: eventsData?.cannotBookBefore || '0',
          });
          setOrganizerRoleId(eventsData?.roleId || '');
          break;
        case TM_IDS.OUT_OF_OFFICE:
          setOutOfOfficeState({
            decline: eventsData?.availability?.decline,
            meetingType: eventsData?.availability?.all ? 'all' : 'onlyNew',
            visibility: eventsData?.visibility,
          });
          break;
      }
      setNotify(eventsData?.notify || ['10 minutes before']);
      const isOrganiser = eventsData?.organizer === sessions?.user?.id;
      const isNoRepeat = eventsData?.repeatType === TM_IDS.DOESNT_REPEAT;
      setEditPermission({
        eventType: false,
        tenantName: false,
        repeatType: false,
        eventDate: isNoRepeat,
        duration: isNoRepeat,
        time: isNoRepeat,
        permissions: isOrganiser,
      });
    }
  }, [eventsData]);

  useEffect(() => {
    if (customRepeat.key === TM_IDS.CUSTOM_REPEAT) {
      const option = { value: TM_IDS.CUSTOM_REPEAT, label: getCustomRepeatLabel(customRepeat) };
      const newOptions = setNewCustomOption(repeatTypeOptions, option, TM_IDS.CUSTOM_REPEAT);
      setRepeatTypeOptions(newOptions);
      setRepeatType(TM_IDS.CUSTOM_REPEAT);
    }
  }, [customRepeat]);

  useEffect(() => {
    if (customDuration.key === TM_IDS.CUSTOM_DURATION) {
      const option = { value: TM_IDS.CUSTOM_DURATION, label: customDuration.label };
      const newOptions = setNewCustomOption(durationOptions, option, TM_IDS.CUSTOM_DURATION);
      setDurationOptions(newOptions);
      setDateState((pre) => ({ ...pre, duration: TM_IDS.CUSTOM_DURATION }));
    }
  }, [customDuration]);
  const EVENT_TYPE_HEADER_CONTENT: any = {
    [TM_IDS.EVENT]: isEditEvent ? 'Edit event' : 'Add event',
    [TM_IDS.SLOT]: 'Available for booking',
    [TM_IDS.OFFLINE]: 'Offline',
    [TM_IDS.OUT_OF_OFFICE]: 'Offline',
  };

  const onDescriptionChange = useCallback((e) => {
    const value = e.target.value;
    setOfflineState((pre) => ({ ...pre, description: value }));
  }, []);
  const handleDelete = () => {
    setFile([]);
  };
  const onTitleChange = useCallback((e) => {
    const value = e.target.value;
    setTitle(value);
    setErrors((prev) => ({ ...prev, title: '' }));
  }, []);
  const onTenantChange = useCallback((value) => setTenantName(value), []);
  const onDateChange = useCallback((eventDate) => setDateState((pre) => ({ ...pre, eventDate })), []);
  const onTimeChange = useCallback((time) => setDateState((pre) => ({ ...pre, time })), []);
  const onDurationChange = useCallback((duration) => {
    if (TM_IDS.CUSTOM === duration) return setOpenCustomDuration(true);
    setDateState((pre) => ({ ...pre, duration }));
  }, []);
  const onTimezoneChange = useCallback((timeZone) => setDateState((pre) => ({ ...pre, timeZone })), []);
  const onRepeatTypeChange = useCallback((value) => {
    if (TM_IDS.CUSTOM === value) return setOpenCustomRepeat(true);
    setRepeatType(value);
  }, []);

  const onRsvpChange = useCallback((selected) => {
    if (selected) {
      setRsvp({ ...DEFAULT_RSVP, selected, ...RSVP_VALUE[selected] });
    }
  }, []);

  const redirectToCalendar = () => {
    childEventTrigger(null, null, 'onSchedulerCalendar', {
      eventviewType: viewType,
      eventViewDate: new Date(dateState.eventDate),
    });
  };

  const closeEventEdit = () => {
    childEventTrigger(null, null, 'onCancelEventEdit', {
      eventviewType: viewType,
      eventViewDate: new Date(dateState.eventDate),
    });
  };

  const handleupdateConfirmation = (payload: any) => {
    if (Object.keys(payload?.reccurance).length !== 0 && isrepeatType !== TM_IDS.DOESNT_REPEAT) {
      return setConfirmModal({ open: true, payload });
    }
    handleUpdate(payload);
  };

  const onConfirmModalClose = () => {
    setConfirmModal({ open: false, payload: {} });
  };

  const onConfirm = () => {
    handleUpdate(confirmModal.payload);
    onConfirmModalClose();
    if (openInMyWork) {
      childEventTriggerNew('onEventCancleClick', {
        eventsData: eventsData,
        sessions: props.sessions,
        childEventTrigger,
        // handleBack: () => {},
        openInMyWork: true,
        panel: 'MyCustomer',
      });
    }
  };

  const handleUpdate = async (payload) => {
    try {
      setIsDisabled(true);
      const { eventId, parentId, organizer, slotId } = eventsData;
      const { selected, ...restRsvp } = rsvp;
      // if(TM_IDS.EVENT === eventType ){}

      const actionParam = TM_IDS.EVENT === eventType ? 'action' : 'updateObject';

      const params = { eventId, slotId, parentId, organizer, ...payload, [actionParam]: restRsvp };
      setAction({ screen: 'HOME' });
      const response = await handleUpdateCall(panelId, sessions, params, true);
      if (response) {
        // childEventTrigger(null, null, 'onSchedulerCalendar', {
        //   eventviewType: viewType,
        //   eventViewDate: new Date(payload.eventDate),
        // });
        if (openInResource) {
          return childEventTriggerNew('onEventCancleResourceClick', {
            eventsData: eventsData,
            sessions: props.sessions,
            childEventTrigger,
            // handleBack: () => {},
            openInResource: true,
            panel: 'MyCustomer',
          });
        } else {
          onBackClick();
        }
        // return goBack('H');
      }
    } catch (error) {
      ErrorToaster('Unable to update event', panelId, 'error');
    } finally {
      setIsDisabled(false);
    }
  };
  const handleSave = async () => {
    try {
      setIsDisabled(true);
      const { status, activityType, ...restSlots } = slotsState;
      const bookablesObject = bookableObject[slotsState.activityType] || {};
      const duration =
        TM_IDS.CUSTOM_DURATION === dateState?.duration ? Number(customDuration.value) : Number(dateState?.duration);
      let { isValid, errorsObject } = validateFields(
        { bookablesObject, title, tenantName, ...dateState, ...slotsState, duration },
        eventType,
        isEditEvent
      );
      setErrors(errorsObject);
      if (!isValid) {
        let errorKey = '';
        Object.entries(errorsObject).forEach(([key, value]) => {
          if (errorsObject[key] !== '' && errorKey == '') {
            errorKey = key;
            // break;
          }
        });
                const input = document.getElementById(`${errorKey}`);
        if (input && errorKey!=='title' && errorKey!=='roleId') {
          const position = input.getBoundingClientRect().top;
          scrollPosition.current.scrollTop = position;
        }
        else if(errorKey=='title'){
          scrollPosition.current.scrollTop = 0;
        }
        else if(errorKey=='roleId'){
          scrollPosition.current.scrollTop = 200;
        }
      }
      const { eventDate, time, timeZone } = dateState;

      if (!isValid && errorsObject.roleId) return ErrorToaster(`Please select a role`, panelId, 'error');
      if (!isValid) return ErrorToaster(`Please Enter the required values`, panelId, 'error');
      if (duration < 1) return ErrorToaster('Event should not Create for same Time or less time ', panelId, 'error');
      if (duration > 1439) return ErrorToaster('Event can create only below 24 Hours', panelId, 'error');

      const eventDateTime = moment(new Date(moment(eventDate).format('YYYY/MM/DD') + ' ' + time)).toISOString();
      const eventToDateTime = moment(eventDateTime).add(duration, 'm').toISOString();

      const reccurance = getReccurance({ customRepeat, repeatType, startDate: eventDateTime });

      const systemWeekDay = new Date().getDay();
      const UTCWeekDay = new Date().getDay();

      if (systemWeekDay !== UTCWeekDay && reccurance.weekDays) {
        const dayDif = systemWeekDay - UTCWeekDay;
        reccurance.weekDays = reccurance.weekDays
          .map((value) => value - dayDif)
          .map((value) => (value < 0 ? 7 + value : value >= 7 ? value - 7 : value))
          .sort((a, b) => a - b);
      }
      const titleTrimed = title?.trim();
      const defaultParams: any = {
        title: titleTrimed,
        eventType,
        tenantName,
        eventDate: eventDateTime,
        fromTime: eventDateTime,
        toDate: eventToDateTime,
        toTime: eventToDateTime,
        duration,
        timeZone,
        repeatType,
        reccurance,
        tenantId: tenantName,
      };
      const eventParams = {
        ...defaultParams,
        notify,
        tenantParticipants: [...tenantParticipants, ...(eventsState.isExcludeMeFromEvent || isEditEvent ? [] : [currentUser])],
        externalParticipants: [],
        ...eventsState,
        organizerRoleId,
      };
      const bookables = { status, activityType, ...bookablesObject };

      const slotParams = {
        ...defaultParams,
        ...eventsState,
        ...{ ...restSlots, allowedMaximumDays: Number(restSlots.allowedMaximumDays) },
        bookables,
      };
      const { meetingType, decline, ...other } = outOfOfficeState;

      const oooParams = {
        ...defaultParams,
        ...other,
        availability: {
          decline,
          onlyNew: meetingType === 'onlyNew',
          all: meetingType === 'all',
        },
      };

      let response;
      if (TM_IDS.EVENT === eventType && eventParams.tenantParticipants.length === 0) {
        return ErrorToaster(`Event should needs atleast One Participant`, panelId, 'error');
      }
      if (eventParams?.reccurance?.ends && !eventParams?.reccurance?.ends.on) {
        delete eventParams.reccurance.ends.on;
      }
      switch (eventType) {
        case TM_IDS.EVENT:
          if (eventsData) {
            return handleupdateConfirmation(eventParams);
          }
          response = await handleCreateEvent(sessions, eventParams);
          break;
        case TM_IDS.SLOT:
          if (eventsData) return handleupdateConfirmation(slotParams);
          response = await handleCreateSlot(sessions, slotParams);
          break;

        case TM_IDS.OUT_OF_OFFICE:
          if (eventsData) return handleupdateConfirmation(oooParams);
          response = await handleCreateOutOfOffice(sessions, oooParams);
          break;
      }
      if (response.data.status >= 200 && response.data.status <= 201) {
        SuccessToaster(response.data.message, panelId, 'success');
        if (openInResource) {
          childEventTriggerNew('onEventCancleResourceClick', {
            eventsData: eventsData,
            sessions: props.sessions,
            childEventTrigger,
            // handleBack: () => {},
            openInResource: true,
            panel: 'MyCustomer',
          });
        } else {
          return goBack('H');
        }
      }
    } catch (error) {
      console.error(error);
      ErrorToaster('Unable to schedule new event', panelId, 'error');
    } finally {
      setIsDisabled(false);
    }
  };
  const childEventTriggerNew = useDFEvent();
  const onBackClick = () => {
    if (openInMyWork) {
      childEventTriggerNew('onEventCancleClick', {
        eventsData: eventsData,
        sessions: props.sessions,
        childEventTrigger,
        // handleBack: () => {},
        openInMyWork: true,
        panel: 'MyCustomer',
      });
    } else if (openInResource) {
      childEventTriggerNew('onEventCancleResourceClick', {
        eventsData: eventsData,
        sessions: props.sessions,
        childEventTrigger,
        // handleBack: () => {},
        openInResource: true,
        panel: 'MyCustomer',
      });
    } else {
      goBack('H');
    }
  };
  return (
    <div className={classes.mainContainer}>
      <PageHeader handleBack={onBackClick} headerContent={EVENT_TYPE_HEADER_CONTENT[eventType]} />
      <div className={classes.scrollBody} ref={scrollPosition}>
        <div className={classes.sectionOneWrapper}>
          <div className={classes.titleWrap}>
            <InputFieldMemo
              label="Enter Title"
              value={title}
              id="title"
              multiline
              maxRows={5}
              helperText={errors.title}
              onChange={onTitleChange}
            />
          </div>
          <div className={classes.radioWrap}>
            <RadioGroup
              disabled={!editPermission.eventType}
              variant={'tokenWithoutCross'}
              options={TAB_OPTIONS}
              value={eventType}
              setValue={setEventType as any}
              gap="12px"
            />
          </div>
          {/* {eventType !== TM_IDS.OUT_OF_OFFICE && (
            <div className={classes.selectWrap}>
              <MemoSelect
                disabled={!editPermission.tenantName}
                headerTitle={'Choose tenant'}
                placeholder={'Choose tenant'}
                values={tenantName}
                helperText={errors.tenantName}
                setValues={onTenantChange}
                options={TENANT_OPTIONS}
                optionsType={'label'}
                position={'bottom'}
                noUnderline
                isWithIcon
                isDivider
                isAutoOk
              />
            </div>
          )} */}
          {userRoles.length > 0 &&
            eventType !== TM_IDS.OUT_OF_OFFICE &&
            (!isEditEvent || eventsData?.organizer === sessions?.user?.id) && (
              <div>
                <div className={`${commonClasses.body17Medium} ${classes.marginStyles} marginB24 marginT24`}>Roles & Tenants</div>
                {userRoles?.map((data) => {
                  return (
                    <div className={classes.cardWrapper}>
                      <header className={`${classes.headerSection}`}>
                        <div className={`${classes.tenantTitle} ${commonClasses.body15Medium}`}>
                          <span className={classes.dflex}>{<AmuraIcon20 />} </span> {data.tenantId}
                        </div>
                      </header>
                      {data?.roleIds?.map((ele) => {
                        return (
                          <section
                            className={classes.cardContainer}
                            onClick={() => {
                              setTenantName(data.tenantId);
                              setSlotsState({ ...slotsState, roleId: ele });
                              setOrganizerRoleId(ele);
                            }}
                          >
                            {/* {!--  //onRoleClick(data, ele)  --} */}
                            <section className={classes.cardSelectSection}>
                              <div className={classes.iconTitle}>
                                <aside className={classes.profileSection}>
                                  {
                                    <span className={classes.tenantIcon}>
                                      <AmuraIcon2 />
                                    </span>
                                  }
                                  <Avatar className={classes.profilePicture}>
                                    <DoctorIcon />
                                  </Avatar>
                                </aside>
                                <aside className={classes.profileContentSection}>
                                  <div
                                    className={`${commonClasses.body15Medium} ${classes.textPrimary}`}
                                    title={rolesFromRedux.find((role) => role.roleId === ele)?.roleName || ele}
                                  >
                                    {rolesFromRedux.find((role) => role.roleId === ele)?.roleName || ele}
                                  </div>
                                </aside>
                              </div>
                              <aside className={classes.checkFlexbox}>
                                <Radio checked={ele === organizerRoleId} />
                              </aside>
                            </section>
                          </section>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            )}
          {/* {eventType === TM_IDS.SLOT && (
            <WithIconContainer Icon={<RoleIcon />}>
              <Select
                headerTitle={'Role'}
                placeholder={'Select Role'}
                values={slotsState.roleId}
                helperText={errors.roleId}
                setValues={(roleId) => setSlotsState((pre) => ({ ...pre, roleId }))}
                options={roles}
                optionsType={'radio'}
                position={'bottom'}
                isDivider
                isAutoOk
                isSearch
              />
            </WithIconContainer>
          )} */}
        </div>
        <Divider className={classes.dividerStyle} />
        {/* <Divider className={classes.dividerStyle} /> */}
        {eventType !== TM_IDS.OUT_OF_OFFICE && (
          <>
            <WithIconContainer Icon={<TimeIcon />}>
              <MemoMUIDatePicker
                disabled={!editPermission.eventDate}
                label="Date"
                date={dateState.eventDate}
                helperText={errors.eventDate}
                setDate={onDateChange}
                format={'E dd, LLL yyyy'}
                // minDate={new Date()}
              />
            </WithIconContainer>

            <WithIconContainer>
              <MemoMUITimePicker
                disabled={!editPermission.time}
                headerTitle={'Set Time'}
                label="Time"
                value={dateState.time}
                onChange={onTimeChange}
              />
              <MemoSelect
                disabled={!editPermission.duration}
                headerTitle={'Duration'}
                placeholder={'Duration'}
                values={dateState.duration}
                helperText={errors.duration}
                setValues={onDurationChange}
                options={durationOptions}
                optionsType={'radio'}
                position={'bottom'}
                isDivider
                isAutoOk
              />
            </WithIconContainer>
          </>
        )}

        <WithIconContainer iconStyle={classes.iconStyle} Icon={<RepeatIcon />} alignEnd iconBottomMargin={'3px'}>
          <MemoSelect
            disabled={!editPermission.repeatType}
            headerTitle={'Repeat'}
            placeholder={'Repeat'}
            values={repeatType}
            setValues={onRepeatTypeChange}
            options={repeatTypeOptions}
            optionsType={'radio'}
            position={'bottom'}
            isDivider
            isAutoOk
          />
        </WithIconContainer>

        {eventType === TM_IDS.EVENT && (
          <MemoEvents
            {...props}
            eventsState={eventsState}
            setEventsState={setEventsState}
            notify={notify}
            setNotify={setNotify}
            tenantParticipants={tenantParticipants}
            setTenantParticipants={setTenantParticipants}
            actualEventData={eventsData}
            currentUser={currentUser}
            errors={errors}
            editPermission={editPermission}
          />
        )}
        {eventType === TM_IDS.SLOT && (
          <MemoSlots
            roles={roles}
            bookableOptions={bookableOptions}
            bookableObject={bookableObject}
            slotsState={slotsState}
            setSlotsState={setSlotsState}
            errors={errors}
          />
        )}
      </div>
      <PanelFooter
        paddingX="20px"
        customStyle={classes.footerStyle}
        leftButtonText={'Cancel'}
        righButtontText={'Save'}
        disableRightButton={isDisabled}
        handleLeftButton={onBackClick}
        handleRightButton={handleSave}
      />
      <CustomRepeatDrawer
        setCustomRepeat={setCustomRepeat}
        eventdateforMonthOcc={dateState.eventDate}
        open={openCustomRepeat}
        setOpen={setOpenCustomRepeat}
      />
      {openCustomDuration ? <CustomDuration setCustomDuration={setCustomDuration} open setOpen={setOpenCustomDuration} /> : null}
      <ModalBox
        modalTitle="Update event"
        open={confirmModal.open && isEditEvent}
        handleClose={onConfirmModalClose}
        buttonConfig={[
          { text: 'Cancel', variant: 'text', onClick: onConfirmModalClose },
          { text: 'Confirm', variant: 'contained', disabled: isDisabled, onClick: onConfirm },
        ]}
      >
        <RadioGroup
          flexDirection="column"
          variant={'radio'}
          options={RSVP_OPTIONS}
          value={rsvp.selected}
          setValue={onRsvpChange}
        />
      </ModalBox>

      <ModalBox
        panelWidth={props.panel?.width}
        open={showConfirm}
        handleClose={() => {
          setShowConfirm(false);
        }}
        modalTitle={'Are you sure?'}
        buttonConfig={[
          {
            text: PMS_LOCALE.translate('Cancel'),
            variant: 'text',
            onClick: () => {
              setShowConfirm(false);
            },
          },
          {
            text: PMS_LOCALE.translate('Continue'),
            variant: 'contained',
            onClick: () => {
              handleDelete();
              setShowConfirm(false);
            },
          },
        ]}
      >
        <div className={classes.modalWrapper}>You want to delete the file</div>
      </ModalBox>
    </div>
  );
}
