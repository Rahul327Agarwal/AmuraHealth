import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { PMS_S3 } from '../../../../Utils';
import { IAllRoleDetails } from '../../../PanelComponents/MyListPanel/MyList/MyList.types';
import { SendIcon } from '../../../SVGs/Common';
import InputField from '../../InputField/InputField';
import { default as Button } from '../../MUIButton/MUIButton';
import MUIDrawer from '../../MUIDrawer/MUIDrawer';
import Select from '../../Select/Select';
import { callTypeItem, initialscheduleEvent, validateBlueDot } from './CallPopUp.functions';
import { useStyles } from './CallPopUp.styles';
import { IProps } from './CallPopUp.types';
import { ChatFlyoutDrawer } from '../../../PanelComponents/ChatNotes/Components/ChatInput/ChatFlyout/ChatFlyoutDrawer';
import { useListenToChatSendEvent } from '../../../PanelComponents/ChatNotes/Components/ChatInput/Input/ChatSend.hooks';
import { ChatInputState } from '../../../PanelComponents/ChatNotes/Components/ChatInput/Input/ChatInput.state';

function CallPopUp(props: IProps) {
  const { onClose: closeBlue, clientId } = props;
  const [selectedTime, setSelectedTime] = useState('');
  const [openConfirm, setOpenConfirm] = useState(true);
  const [title, setTitle] = useState('');
  const [callType, setCallType] = useState('voice');
  const [participants, setParticipants] = useState([]);
  const [participants2, setParticipants2] = useState([]);
  const [scheduleData, setScheduleData] = useState(initialscheduleEvent);
  const roles: IAllRoleDetails[] = useSelector((state: IRootState) => state.dashboard.allUserRoles);
  let roleToClient = useSelector((state: IRootState) => state.accessPermissions.roleToClient);
  // todo: the following state may be removed if not needed.. currently not beting set anywhere
  const [selectedRolesData, setSelectedRolesData] = useState([]);
  const [isFetchingParticipants, setIsFetchingParticipants] = useState(false);
  const [errorObject, setErrorObject] = useState({
    titleError: '',
    callTypeError: '',
    timeError: '',
    userError: '',
    default: '',
  });
  const commonClasses = useCommonStyles();
  const { classes } = useStyles();

  const callTypeSelectHandleCloseRef = useRef(() => {});
  const participantSelectHandleCloseRef = useRef(() => {});

  const myTeamData = useSelector((state: IRootState) => state.dashboard.myTeamData);
  const userDetails = useMemo(() => {
    let callParticipants = myTeamData.map((each) => {
      return {
        userId: each.Id,
        userName: `${each?.FirstName ?? ''} ${each?.LastName ?? ''}` || each.Id,
        roles: each.Roles || [],
        roleIds: each.originalRoles || [],
        isWatching: Boolean(each?.isWatching),
      };
    });
    return callParticipants;
  }, []);

  useEffect(() => {
    (async () => {
      setIsFetchingParticipants(true);
      if (userDetails.length > 0) {
        let uniqueRoleVsUserid = [];
        for (let i = 0; i < userDetails.length; i++) {
          let user = userDetails[i];
          if (user.userId !== clientId && !user?.isWatching) {
            user?.roleIds?.forEach((roleId) => {
              const common = `${roles.find((role) => role.roleId === roleId)?.roleName || roleId}`;
              uniqueRoleVsUserid.push({
                value: `~${user?.userId}~${roleId}~`,
                label: `${user?.userName || user?.userId} - ${common}`,
                subLabel: `${common}`,
                profileLabel: `${user?.userName || user?.userId}`,
                userId: user.userId,
              });
            });
          }
        }
        setParticipants(uniqueRoleVsUserid);
        setIsFetchingParticipants(false);
      }
    })();

    return () => {};
  }, [userDetails]);

  const handleTime = useCallback((e) => {
    const value = e.target.value.trim() ? e.target.value : '';
    setSelectedTime(value);
    setScheduleData((pre) => ({ ...pre, duration: value, timeUnits: 'mins' }));
    setErrorObject((pre) => {
      return { ...pre, timeError: '' };
    });
  }, []);
  const handleTitle = useCallback((e) => {
    const value = e.target.value.trim() ? e.target.value : '';
    setTitle(value);
    setScheduleData((pre) => ({ ...pre, title: value }));
    setErrorObject((pre) => {
      return { ...pre, titleError: '' };
    });
  }, []);

  const handleSend = async () => {
    let errorObject = validateBlueDot(title.trim(), callType, selectedTime, participants2[0], selectedRolesData[0]);
    setErrorObject(errorObject);
    if (errorObject.hasError) {
      callTypeSelectHandleCloseRef.current?.();
      participantSelectHandleCloseRef.current?.();
      return;
    }
    let scheduleDataTemp = JSON.parse(JSON.stringify(scheduleData));
    scheduleDataTemp.patientId = props.selectedClient.client_id;
    scheduleDataTemp.organizer = props.sessions.user.id;
    scheduleDataTemp.organizerRoleId = roleToClient;
    scheduleDataTemp.participants = scheduleData.participants.map((userIdWithRole) => {
      let { 1: userId, 2: roleId } = userIdWithRole.split('~');
      return { userId, roleId };
    });

    let payload = {
      userId: props.selectedClient.client_id,
      EventName: 'chat-categorizer',
      tenantId: props.selectedClient.tenant_id || 'amura',
      senderId: props.sessions.user.id,
      messageId: v4(),
      message: '',
      receivedTime: new Date().toISOString(),
      ContextType: '@call',
      loginUserId: props.sessions.user.id,
      operation: '@UPDATE_ENTITY',
      scheduleData: scheduleDataTemp,
      url: `${import.meta.env.VITE_BASE_API_URL}/chatCategorizer`,
      token: props.sessions.id_token,
      method: 'POST',
      headers: {},
      delivered: false,
      notSent: false,
    };
    const response = await PMS_S3.postData(payload);
    if (!response.Error) {
      setOpenConfirm(false);
      closeBlue();
    }
    return true;
  };

  useListenToChatSendEvent(async () => {
    const res = await handleSend();
    return res ? true : false;
  }, [handleSend]);

  return (
    <div>
      <ChatFlyoutDrawer
        // maxHeight={'100%'}
        open={openConfirm}
        header={'Schedule Call'}
        anchor={'bottom'}
        // handleOpen={() => {
        //   setOpenConfirm(true);
        // }}
        // handleClose={() => {
        //   closeBlue();
        // }}
        children={
          <div>
            <div className={`${classes.marginBottom}`}>
              <div className={`${classes.marginBottom}`}>
                <InputField
                  autoFocus={true}
                  placeholder="Add title"
                  value={title}
                  onChange={handleTitle}
                  helperText={errorObject.titleError}
                  characterLimit={56}
                />
              </div>
              <div className={`${classes.marginBottom}`}>
                <Select
                  headerTitle={'Call Type'}
                  placeholder={'Call Type'}
                  options={callTypeItem}
                  values={callType}
                  setValues={(value) => {
                    setCallType(value);
                    setScheduleData((pre) => ({
                      ...pre,
                      channel: value,
                    }));
                    setErrorObject((pre) => {
                      return { ...pre, callTypeError: '' };
                    });
                  }}
                  optionsType={'radio'}
                  position={'bottom'}
                  isAutoOk
                  handleCloseRef={(closeFn) => {
                    callTypeSelectHandleCloseRef.current = closeFn;
                  }}
                />
                {errorObject.callTypeError && (
                  <div>
                    <span className={`${commonClasses.caption12Regular} ${classes.errorText}`}>{errorObject.callTypeError}</span>
                  </div>
                )}
              </div>
              <div className={`${classes.marginBottom}`}>
                <InputField
                  label="Call duration (in minutes)"
                  value={selectedTime}
                  onChange={handleTime}
                  helperText={errorObject.timeError}
                />
              </div>
              <div className={` ${classes.marginBottom}`}>
                <Select
                  headerTitle="Participants"
                  placeholder="Select participants"
                  isLoading={isFetchingParticipants}
                  options={participants}
                  setValues={(value) => {
                    setParticipants2(value);
                    setScheduleData((pre) => ({
                      ...pre,
                      participants: value,
                    }));
                    setErrorObject((pre) => {
                      return { ...pre, userError: '' };
                    });
                  }}
                  values={participants2}
                  position={'bottom'}
                  optionsType={'profileToken'}
                  isDivider
                  isToken={false}
                  isTokenDeletable
                  renderValueAsToken
                  renderValueAsTokenDeletable
                  handleCloseRef={(closeFn) => {
                    participantSelectHandleCloseRef.current = closeFn;
                  }}
                />

                {errorObject.userError && (
                  <div>
                    <span className={`${commonClasses.caption12Regular} ${classes.errorText}`}>{errorObject.userError}</span>
                  </div>
                )}
              </div>

              {errorObject.default && (
                <div>
                  <span className={`${commonClasses.caption12Regular} ${classes.errorText}`}>{errorObject.default}</span>
                </div>
              )}
            </div>
            {/* <div className={classes.messageInputContainer}>
              <div className={`${classes.middleContainer} ${classes.padding}`}>
                <span className={`${commonClasses.body15Regular} ${classes.textInMessage}`}>{'@call'}</span>
              </div>
              <div className={classes.lastContainer}>
                <Button
                  size="small"
                  variant="contained"
                  className={classes.sendButton}
                  onClick={() => {
                    let errorObject = validateBlueDot(
                      title.trim(),
                      callType,
                      selectedTime,
                      participants2[0],
                      selectedRolesData[0]
                    );
                    setErrorObject(errorObject);
                    if (errorObject.hasError) return;
                    let scheduleDataTemp = JSON.parse(JSON.stringify(scheduleData));
                    scheduleDataTemp.patientId = props.selectedClient.client_id;
                    scheduleDataTemp.organizer = props.sessions.user.id;
                    scheduleDataTemp.organizerRoleId = roleToClient;
                    scheduleDataTemp.participants = scheduleData.participants.map((userIdWithRole) => {
                      let { 1: userId, 2: roleId } = userIdWithRole.split('~');
                      return { userId, roleId };
                    });

                    (async () => {
                      let payload = {
                        userId: props.selectedClient.client_id,
                        EventName: 'chat-categorizer',
                        tenantId: props.selectedClient.tenant_id || 'amura',
                        senderId: props.sessions.user.id,
                        messageId: v4(),
                        message: '',
                        receivedTime: new Date().toISOString(),
                        ContextType: '@call',
                        loginUserId: props.sessions.user.id,
                        operation: '@UPDATE_ENTITY',
                        scheduleData: scheduleDataTemp,
                        url: `${import.meta.env.VITE_BASE_API_URL}/chatCategorizer`,
                        token: props.sessions.id_token,
                        method: 'POST',
                        headers: {},
                        delivered: false,
                        notSent: false,
                      };
                      const response = await PMS_S3.postData(payload);
                      if (!response.Error) {
                        setOpenConfirm(false);
                        closeBlue();
                      }
                    })();
                  }}
                >
                  <SendIcon />
                </Button>
              </div>
            </div> */}
          </div>
        }
      />
    </div>
  );
}

export default memo(CallPopUp);
