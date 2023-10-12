import { Divider, IconButton } from '@mui/material';
import { memo, useCallback, useState } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import InputField from '../../../LibraryComponents/InputField/InputField';
import MUISwitch from '../../../LibraryComponents/MUISwitch/MUISwitch';
import Select from '../../../LibraryComponents/Select/Select';
import {
  AddCircleIcon,
  Close,
  DescriptionIconV2,
  NotificationIcon,
  PermissionIcon,
  RightArrowIcon,
  VideoChannelIcon,
  VisibilityIcon,
} from '../../../SVGs/Common';
import { PeopleIcon } from '../TimeManagement.svg';
import { BUSY_OPTIONS, CHANNEL_OPTIONS, PERMISSION_OPTIONS, TM_IDS, VISIBILITY_OPTIONS } from '../TimeManagement.function';
import { useStyles } from '../TimeManagement.style';
import { IEventProps } from '../TimeManagement.types';
import AddNoticitionDrawer from './AddNotificationDrawer';
import WithIconContainer from './WithIconContainer';
import NameToken from '../../../LibraryComponents/CallSchedulerWizards/NameToken/NameToken';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { useSelector } from 'react-redux';

const InputFieldMemo = memo(InputField);
const MemoSelect = memo(Select);

export default function Events(props: IEventProps) {
  const {
    editPermission,
    tenantParticipants,
    setTenantParticipants,
    notify,
    setNotify,
    eventsState,
    setEventsState,
    setAction,
    errors,
    currentUser,
    eventsData,
    sessions,
    isEditEvent,
  } = props;

  const { isExcludeMeFromEvent, status, callType, visibility, others, description, permissons } = eventsState;

  const isEditOrganiser = isEditEvent ? eventsData?.organizer === sessions?.user?.id : true;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();

  const roles = useSelector((state: IRootState) => state.dashboard.allUserRoles);

  const [openCustomNotify, setOpenCustomNotify] = useState(false);
  const [participant, setParticipant] = useState([]);
  const handleOpenAddPerson = () => setAction({ screen: 'ADD_PEOPLE', payload: tenantParticipants || [] });
  const openNotificationModal = () => setOpenCustomNotify(true);
  const handleRemovePeople = (index: number) => setTenantParticipants((pre: any[]) => pre.filter((_, i) => i !== index));
  const handleDeleteNotification = (index: number) => setNotify((pre: any[]) => pre.filter((_, i) => i !== index));

  const onDescriptionChange = useCallback((e: any) => {
    const value = e.target.value;
    setEventsState((pre: any) => ({ ...pre, description: value }));
  }, []);
  const onPastedLinkChange = useCallback((e: any) => {
    const value = e.target.value;
    setEventsState((pre: any) => ({ ...pre, others: value }));
  }, []);

  // useEffect(() => {
  //   const participantId = tenantParticipants.map(({ value }) => value);
  //   const filteredParticipant = tenantParticipants.filter(({ id }, index) => !participantId.includes(id, index + 1));
  //   setParticipant(filteredParticipant);
  // }, [tenantParticipants]);

  // const onPermissionChange = useCallback((permissons) => {
  //   let perms = permissons;
  //   if (permissons.length >= 2 && permissons.includes('None')) {
  //     perms = permissons.filter((p) => p !== 'None');
  //   }
  //   if (permissons.length < 1) {
  //     perms = ['None'];
  //   }
  //   setEventsState((pre) => ({ ...pre, permissons: perms }));
  // }, []);
  const onPermissionChange = useCallback((permissons: any) => setEventsState((pre: any) => ({ ...pre, permissons })), []);
  const onVisibilityChange = useCallback((visibility: any) => setEventsState((pre: any) => ({ ...pre, visibility })), []);
  const onBusyChange = useCallback((status: any) => setEventsState((pre: any) => ({ ...pre, status })), []);
  const onChannelChange = useCallback((callType: any) => setEventsState((pre: any) => ({ ...pre, callType })), []);
  const onIsExcludeMeChange = () => {
    if (!isExcludeMeFromEvent) {
      setTenantParticipants((pre: any[]) => pre.filter((data) => data.value !== currentUser.value));
    } else {
      setTenantParticipants((pre: any[]) => [...pre, currentUser]);
    }
    setEventsState((pre: any) => ({
      ...pre,
      isExcludeMeFromEvent: !isExcludeMeFromEvent, // eventPatcicipantsWithoutOrganiser.length === 0 ? false : !isExcludeMeFromEvent,
      permissons: !isExcludeMeFromEvent ? [TM_IDS.MODIFY_EVENT] : pre.permissons,
    }));
  };

  return (
    <>
      <Divider className={classes.dividerStyle} />
      <div className={classes.addWrapper}>
        <WithIconContainer
          Icon={<PeopleIcon />}
          rowGap="5px"
          Label={
            <div className={classes.addPeopleBox}>
              <span className={`${commonClasses.body17Regular} ${classes.primaryText}`}>Add people</span>
              {!tenantParticipants.length ? (
                <IconButton onClick={handleOpenAddPerson}>
                  <AddCircleIcon />
                </IconButton>
              ) : null}
            </div>
          }
        >
          <div>
            {tenantParticipants.length ? (
              <div className={classes.tokenWrap}>
                <section>
                  {!isExcludeMeFromEvent && tenantParticipants.length ? (
                    <div className={classes.origzerDiv}>
                      <span className={`${commonClasses.sm10Medium} ${classes.organizerHeading}`}>Organizer</span>
                      <NameToken
                        userId={currentUser?.value}
                        label={currentUser?.label}
                        roleName={currentUser?.roleName || ''}
                        tenant={currentUser?.roleName ? 'amura' : ''}
                      />
                    </div>
                  ) : null}
                  <div className={classes.peopleTokenBox}>
                    {tenantParticipants?.map((data, index) => {
                      if (data.value === currentUser.value) return null;
                      return (
                        <NameToken
                          userId={data.value}
                          label={data.label}
                          roleName={data?.roleName || ''}
                          tenant={data?.tenantId || data?.roleName ? 'amura' : ''}
                          onDelete={() => handleRemovePeople(index)}
                        />
                      );
                    })}
                    {tenantParticipants.length ? (
                      <IconButton className={classes.addBtn} onClick={handleOpenAddPerson}>
                        <AddCircleIcon />
                      </IconButton>
                    ) : null}
                  </div>
                </section>
              </div>
            ) : null}
            <div>
              {tenantParticipants.length && isEditOrganiser ? (
                <section className={classes.switchBox}>
                  <label htmlFor="isExcludeMeFromEvent" className={`${commonClasses.body17Regular} ${classes.switchLabel}`}>
                    Exclude me from event
                  </label>
                  <MUISwitch
                    id="isExcludeMeFromEvent"
                    checked={isExcludeMeFromEvent}
                    onChange={onIsExcludeMeChange}
                    disabled={!tenantParticipants.length}
                  />
                </section>
              ) : null}
            </div>
          </div>
        </WithIconContainer>
      </div>

      <Divider className={classes.dividerStyle} />
      {tenantParticipants.length ? (
        <WithIconContainer Label="Permissions" Icon={<PermissionIcon />}>
          <MemoSelect
            headerTitle={'Permissions'}
            placeholder={'User permissions'}
            values={permissons}
            helperText={errors.permissons}
            setValues={onPermissionChange}
            options={PERMISSION_OPTIONS}
            optionsType={'checkbox'}
            position={'bottom'}
            isDivider
            disabled={!(tenantParticipants.length && editPermission.permissions)}
            defaultEmptyValue={['None']}
          />
        </WithIconContainer>
      ) : null}
      {tenantParticipants.length ? <Divider className={classes.dividerStyle} /> : null}
      <WithIconContainer Label="Visibility" Icon={<VisibilityIcon />}>
        <MemoSelect
          headerTitle={'Visibility'}
          placeholder={'Default visibility'}
          values={visibility}
          helperText={errors.visibility}
          setValues={onVisibilityChange}
          options={VISIBILITY_OPTIONS}
          optionsType={'radio'}
          position={'bottom'}
          isDivider
          isAutoOk
        />
        <MemoSelect
          headerTitle={'Busy'}
          placeholder={'Busy'}
          values={status}
          helperText={errors.status}
          setValues={onBusyChange}
          options={BUSY_OPTIONS}
          optionsType={'radio'}
          position={'bottom'}
          isDivider
          isAutoOk
        />
      </WithIconContainer>
      <Divider className={classes.dividerStyle} />
      <WithIconContainer Label="Choose a channel" Icon={<VideoChannelIcon />}>
        <div className={classes.channelBox}>
          <MemoSelect
            headerTitle={'Channel'}
            placeholder={''}
            values={callType}
            helperText={errors.callType}
            setValues={onChannelChange}
            options={CHANNEL_OPTIONS}
            optionsType={'label'}
            position={'bottom'}
            noUnderline
            isWithIcon
            isDivider
            isAutoOk
          />
          {callType === TM_IDS.VIDEO ? <InputFieldMemo label="Paste Link" value={others} onChange={onPastedLinkChange} /> : null}
        </div>
      </WithIconContainer>
      <Divider className={classes.dividerStyle} />
      <WithIconContainer Label="Description" Icon={<DescriptionIconV2 />}>
        <InputFieldMemo label="Add description" multiline maxRows={5} value={description} onChange={onDescriptionChange} />
      </WithIconContainer>
      <Divider className={classes.dividerStyle} />
      <WithIconContainer
        Label={
          <div className={classes.buttonLabel} onClick={openNotificationModal}>
            <span className={`${commonClasses.body17Regular} ${classes.primaryText}`}>Add notification</span>
            <span>
              <RightArrowIcon />
            </span>
          </div>
        }
        Icon={<NotificationIcon />}
      >
        <section className={classes.notificationBox}>
          {notify.map((data, index) => (
            <div className={classes.notifyLabelRow}>
              <span className={`${commonClasses.body17Regular} ${classes.secondryText}`}>{data}</span>
              <IconButton className={classes.removePaddingRL12} onClick={() => handleDeleteNotification(index)}>
                <Close />
              </IconButton>
            </div>
          ))}
        </section>
      </WithIconContainer>
      {openCustomNotify ? (
        <AddNoticitionDrawer
          notification={notify}
          onNotificationChange={setNotify}
          open={openCustomNotify}
          setOpen={setOpenCustomNotify}
        />
      ) : null}
    </>
  );
}
