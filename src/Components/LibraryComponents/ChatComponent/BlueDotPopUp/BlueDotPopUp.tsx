import { format } from 'date-fns';
import { isArray } from 'lodash';
import { memo, useEffect, useState } from 'react';
import { getHierarchyStaff } from '../../../../Common/Common.functions';
import { useFetchUserName } from '../../../../Common/Common.hooks';
import ErrorToaster from '../../../../Common/ErrorToaster';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { useUserSession } from '../../../../DisplayFramework/State/Slices/Auth';
import { useSelectedClient } from '../../../../DisplayFramework/State/Slices/DisplayFramework';
import { useAppSelector } from '../../../../DisplayFramework/State/store';
import { PMS_S3 } from '../../../../Utils';
import { useSetChatOpenedFlyout } from '../../../PanelComponents/ChatNotes/Components/ChatInput/ChatFlyout/ChatFlyout.state';
import { ChatFlyoutDrawer } from '../../../PanelComponents/ChatNotes/Components/ChatInput/ChatFlyout/ChatFlyoutDrawer';
import { ChatInputState } from '../../../PanelComponents/ChatNotes/Components/ChatInput/Input/ChatInput.state';
import { useListenToChatSendEvent } from '../../../PanelComponents/ChatNotes/Components/ChatInput/Input/ChatSend.hooks';
import { IAllRoleDetails, INameCard } from '../../../PanelComponents/MyListPanel/MyList/MyList.types';
import { formatTeamDataFunction } from '../../../PanelComponents/Notes/Notes.functions';
import InputField from '../../InputField/InputField';
import Checkbox from '../../MUICheckbox/MUICheckbox';
import CalendarDrawer from '../../MUIDatePicker/CalendarDrawer';
import MUIDatePicker from '../../MUIDatePicker/MUIDatePicker';
import MUITimePicker from '../../MUITimePicker/MUITimePicker';
import PanelFooter from '../../PanelFooter/PanelFooter';
import RadioButtonNew from '../../RadioButtonNew/RadioButtonNew';
import { contructDateTime, inputOnChangeFunction, validateBlueDot } from './BlueDotPopUp.functions';
import { useStyles } from './BlueDotPopUp.styles';
import { IError, IProps } from './BlueDotPopUp.types';
import { useAtom } from 'jotai';

function BlueDotPopUp(props: IProps) {
  const { blueDotEditInfo, reporteesData } = props;

  const sessions = useUserSession();
  const selectedClient = useSelectedClient();
  const setFlyout = useSetChatOpenedFlyout();

  const [, setSendDisableState] = useAtom(ChatInputState.inputSendButtonDisabledAtom);
  const setChatFlyout = useSetChatOpenedFlyout();

  const closeBlue = () => {
    setFlyout({
      resetInput: true,
    });
  };

  const selectedClientObject = useAppSelector((s) => s.dashboard.selectedClientObject) as INameCard;

  const [description, setDescription] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedHierarchyId, setSelectedHierarchyId] = useState('');
  const [selectedDate, setSelectedDate] = useState<null | Date>(null);
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [errorObject, setErrorObject] = useState<IError>({
    descriptionError: '',
    userError: '',
    dateError: '',
    timeError: '',
    default: '',
  });
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);
  const [userIdValue, setUserIdValue] = useState<string>('');
  const commonClasses = useCommonStyles();
  const [isChecked, setIsChecked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const { classes } = useStyles({ ...props, isTimeSelected: !!selectedTime });
  const { id: panelId } = useCurrentPanel();
  let loggedInUser = sessions?.user?.id;
  let thirdPartyUserId = reporteesData?.staffId || '';

  const { fetchMultipleUserNames } = useFetchUserName();
  const roles: IAllRoleDetails[] = useAppSelector((state) => state.dashboard.allUserRoles);
  const myTeamData = useAppSelector((state) => state.dashboard.myTeamData);

  const [userDetails, setUserDetails] = useState([]);
  //UserDetails
  useEffect(() => {
    (async () => {
      let formatTeamData = myTeamData
        .map((each) => {
          return {
            staffId: each.Id,
            Roles: each.originalRoles || [],
            hierarchyId: each.hierarchyId,
            isWatching: Boolean(each?.isWatching),
          };
        })
        .filter((item) => item.staffId !== sessions.user.id);

      let formatUniqueRoleVsUSerId = [];
      let uniqueRoleVsUserid = await getHierarchyStaff(
        selectedClientObject?.additionalKeys?.hierarchyId,
        fetchMultipleUserNames,
        roles,
        sessions
      );
      if (!uniqueRoleVsUserid || !isArray(uniqueRoleVsUserid)) {
        console.error('uniqueRoleVsUserid is empty');
        uniqueRoleVsUserid = [];
      }
      if (formatTeamData?.length > 0) {
        formatUniqueRoleVsUSerId = await formatTeamDataFunction(formatTeamData, roles, fetchMultipleUserNames);
        if (!formatUniqueRoleVsUSerId || !isArray(formatUniqueRoleVsUSerId)) {
          console.error('formatUniqueRoleVsUSerId is empty');
          formatUniqueRoleVsUSerId = [];
        }
      }
      setUserDetails([...uniqueRoleVsUserid, ...formatUniqueRoleVsUSerId]);
    })();
  }, [myTeamData]);

  useEffect(() => {
    if (userDetails?.length > 0) {
      const _users = userDetails.filter((user) => {
        const c1 = user.isWatching ? false : reporteesData ? user.value.indexOf(sessions.user.id) === -1 : true;
        const c2 = user.value.indexOf(selectedClient.client_id) === -1;
        return c2 && c1;
      });

      setFilteredUsers(_users);
    }
  }, [props, userDetails]);

  useEffect(() => {
    let { 1: userId } = selectedUser.split('~');
    setUserIdValue(userId);
  }, [selectedUser]);

  useEffect(() => {
    if (description.length > 0 && selectedUser.length > 0) {
      if ((selectedDate != null && selectedTime.length > 0) || (selectedDate == null && selectedTime.length == 0)) {
        setButtonEnabled(true);
      } else {
        setButtonEnabled(false);
      }
    }
  }, [description, selectedUser, selectedTime, selectedDate]);

  useEffect(() => {
    if (blueDotEditInfo?.isEdit) {
      let bluedot = blueDotEditInfo?.blueDotInfo || {};
      let userId = bluedot?.staffId || '';
      let endTime = bluedot?.endTime;
      let roleId = bluedot?.roleId || '';
      setDescription(bluedot.description || '');
      setSelectedUser(`~${userId}~${roleId}~`);
      setSelectedHierarchyId(bluedot?.hierarchyId || '');
      if (endTime) {
        setSelectedDate(new Date(endTime));
        setSelectedTime(format(new Date(endTime), 'hh:mm a'));
      }
    }
  }, [blueDotEditInfo]);

  const onChangeValue = (e) => {
    let value = e.target.value.trim() ? e.target.value : e.target.value.trim();
    setCommentText(value);
  };

  const sendBluedot = async () => {
    const isDisable = !blueDotEditInfo?.isEdit
      ? false
      : isChecked
      ? !isChecked
      : blueDotEditInfo?.blueDotInfo?.staffId === userIdValue &&
        blueDotEditInfo?.blueDotInfo?.endTime ===
          (selectedDate ? contructDateTime(panelId, new Date(selectedDate), selectedTime) : '');

    if (isDisable) return;

    let errorObject = validateBlueDot(description, selectedUser, selectedDate ? selectedDate.toISOString() : null, selectedTime);
    setErrorObject(errorObject);
    if (Object.keys(errorObject).find((key) => errorObject[key] !== '') && !isChecked) {
      return;
    }
    if ((!blueDotEditInfo?.isEdit && !isChecked) || (blueDotEditInfo?.isEdit && isChecked)) {
      return setOpenConfirm(true);
    }
    let { 1: userId, 2: roleId } = selectedUser.split('~');
    let commonPayload = {
      token: sessions.id_token,
      method: 'POST',
      url: import.meta.env.VITE_EVENT_API,
      headers: {},
    };
    let payload = {};
    if (blueDotEditInfo?.isEdit && !isChecked) {
      payload = {
        ...blueDotEditInfo.blueDotInfo,
        ...commonPayload,
        updatedBy: sessions.user.id,
        staffId: userId,
        roleId: roleId,
        description: description,
        endTime: selectedDate && selectedTime ? contructDateTime(panelId, new Date(selectedDate), selectedTime) : '',
        action: 'UPDATE',
        messageId: blueDotEditInfo.messageId,
        previousOwners: blueDotEditInfo?.blueDotInfo?.isTransferred === true ? blueDotEditInfo?.blueDotInfo?.previousOwners : [],
        reasonToTransfer:
          blueDotEditInfo?.blueDotInfo?.isTransferred === true ? blueDotEditInfo?.blueDotInfo?.reasonToTransfer : '',
        reasonToClose: blueDotEditInfo?.blueDotInfo?.isTransferred === true ? blueDotEditInfo?.blueDotInfo?.reasonToClose : '',
      };
    }

    if (blueDotEditInfo?.isEdit && !isChecked && blueDotEditInfo?.blueDotInfo?.staffId !== userId) {
      payload = {
        ...blueDotEditInfo.blueDotInfo,
        ...commonPayload,
        EventName: 'assign-bluedot',
        updatedBy: sessions.user.id,
        endTime: selectedDate && selectedTime ? contructDateTime(panelId, new Date(selectedDate), selectedTime) : '',
        action: 'TRANSFER',
        messageId: blueDotEditInfo.messageId,
        isTransferred: true,
        reasonToTransfer: commentText,
        newOwner: {
          staffId: userId,
          roleId: roleId,
          hierarchyId: selectedHierarchyId,
        },
        // staffId: userId,
        // roleId: roleId,
        // description: description,
      };
    }
    console.log(payload, 'blue dot payload');

    try {
      setButtonEnabled(false);
      const response = await PMS_S3.postData(payload);
      if (!response.Error) {
        setOpenConfirm(false);
        setChatFlyout({});
        closeBlue();
      }
    } catch (error) {
      ErrorToaster('Unexpected error occured', panelId, 'error');
    } finally {
      setButtonEnabled(true);
    }
    return true;
  };

  useListenToChatSendEvent(async () => {
    const res = await sendBluedot();
    return res ? true : false;
  }, [sendBluedot]);

  useEffect(() => {
    setSendDisableState(!buttonEnabled);
  }, [buttonEnabled]);

  //

  return (
    <div>
      {!openCalendar && !openConfirm && (
        <ChatFlyoutDrawer
          // style={{
          //   padding: 20,
          // }}
          // open={true}
          header={blueDotEditInfo?.isEdit ? 'Blue Dot' : 'Assign Task'}
        >
          <div>
            {blueDotEditInfo?.isEdit &&
              (blueDotEditInfo.blueDotInfo?.staffId === loggedInUser ||
                (reporteesData && thirdPartyUserId === blueDotEditInfo.blueDotInfo?.staffId)) && (
                <div className={classes.checkBox} onClick={() => setIsChecked((pre) => !pre)}>
                  <Checkbox checked={isChecked} />
                  <span className={` ${classes.primaryText} ${commonClasses.body17Regular}`}>Close</span>
                </div>
              )}
            {!blueDotEditInfo?.isEdit && (
              <div className={`${classes.marginBottom}`}>
                <InputField
                  label="Description"
                  value={description}
                  multiline
                  maxRows={5}
                  error={Boolean(errorObject.descriptionError)}
                  helperText={errorObject.descriptionError}
                  onChange={(event) => {
                    inputOnChangeFunction(
                      'description',
                      event.target.value.trim() ? event.target.value : event.target.value.trim()
                    );
                    setDescription(event.target.value.trim() ? event.target.value : event.target.value.trim());
                    setErrorObject((pre) => {
                      return { ...pre, descriptionError: '' };
                    });
                  }}
                  disabled={isChecked}
                />
              </div>
            )}
            {blueDotEditInfo?.isEdit && (
              <div className={`${classes.marginBottom}`}>
                <span
                  className={`${isChecked ? classes.textDisabled : commonClasses.body17Regular}`}
                  style={{
                    wordWrap: 'break-word',
                  }}
                >
                  {blueDotEditInfo.blueDotInfo.description}
                </span>
              </div>
            )}
            <div className={`${classes.marginBottom}`}>
              <div className={classes.tagPersonsLlist}>
                {filteredUsers.map((user: { value: string; label: string; hierarchyId: string }) => {
                  let { 1: userId } = user.value.split('~');
                  return (
                    <div
                      key={user.value}
                      onClick={() => {
                        if (isChecked) return;
                        inputOnChangeFunction('owner', user.value);
                        setSelectedUser(user.value);
                        setSelectedHierarchyId(user.hierarchyId);
                        setErrorObject((pre) => {
                          return { ...pre, userError: '' };
                        });
                      }}
                    >
                      <RadioButtonNew
                        label={blueDotEditInfo?.isEdit && userId === loggedInUser ? 'Self' : user.label}
                        value={user.value}
                        isChecked={user.value === selectedUser}
                        disabled={isChecked}
                      />
                    </div>
                  );
                })}
              </div>
              {errorObject.userError && (
                <div>
                  <span className={`${commonClasses.caption12Regular} ${classes.errorText}`}>{errorObject.userError}</span>
                </div>
              )}
            </div>
            <div className={`${classes.marginBottom} ${errorObject.timeError ? classes.alignEnd : classes.dateTimeGrid}`}>
              <div className={classes.dateWrapper}>
                <MUIDatePicker
                  readOnly
                  date={selectedDate}
                  setDate={(date) => {
                    inputOnChangeFunction('date', date);
                    setSelectedDate(date);
                    setErrorObject((pre) => {
                      return { ...pre, dateError: '', default: '' };
                    });
                  }}
                  minDate={new Date()}
                  dontOpenCalander={true}
                  clickedOnCalender={() => {
                    setOpenCalendar(true);
                  }}
                  label={'Date'}
                  helperText={errorObject.dateError}
                  disabled={isChecked}
                />
              </div>
              <div className={classes.timeWrapper}>
                <MUITimePicker
                  headerTitle={'Select Time'}
                  label="Time"
                  value={selectedTime}
                  // showSeconds={true}
                  helperText={errorObject.timeError}
                  onChange={(value) => {
                    inputOnChangeFunction('time', value);
                    setSelectedTime(value);
                    setErrorObject((pre) => {
                      return { ...pre, timeError: '', default: '' };
                    });
                  }}
                />
              </div>
            </div>
            {errorObject.default && (
              <div>
                <span className={`${commonClasses.caption12Regular} ${classes.errorText}`}>{errorObject.default}</span>
              </div>
            )}

            {/* MESSAGE INPUT */}
            {/* <div className={classes.messageInputContainer}>
              <span>{TwoUserIcon}</span>
              <div className={`${classes.middleContainer} ${classes.padding}`}>
                {blueDotEditInfo?.isEdit ? (
                  <input
                    className={`${classes.iputTextContainer} ${commonClasses.body15Regular}`}
                    onChange={onChangeValue}
                    value={commentText}
                    type={'text'}
                    placeholder={'Type comment'}
                    autoFocus
                  />
                ) : (
                  <span className={`${commonClasses.body15Regular} ${classes.textInMessage}`}>{'@blue'}</span>
                )}
              </div>
              <div className={classes.lastContainer}>
                <MUIButton
                  size="small"
                  variant="contained"
                  className={buttonEnabled ? classes.sendButton : classes.disabledSendIcon}
                  disabled={
                    !blueDotEditInfo?.isEdit
                      ? !buttonEnabled
                      : isChecked
                      ? !isChecked
                      : blueDotEditInfo?.blueDotInfo?.staffId === userIdValue &&
                        blueDotEditInfo?.blueDotInfo?.endTime ===
                          (selectedDate ? contructDateTime(panelId, new Date(selectedDate), selectedTime) : '')
                  }
                  onClick={async () => {
                    let errorObject = validateBlueDot(
                      description,
                      selectedUser,
                      selectedDate ? selectedDate.toISOString() : null,
                      selectedTime
                    );
                    setErrorObject(errorObject);
                    if (Object.keys(errorObject).find((key) => errorObject[key] !== '') && !isChecked) {
                      return;
                    }
                    if ((!blueDotEditInfo?.isEdit && !isChecked) || (blueDotEditInfo?.isEdit && isChecked)) {
                      return setOpenConfirm(true);
                    }
                    let { 1: userId, 2: roleId } = selectedUser.split('~');
                    let commonPayload = {
                      token: sessions.id_token,
                      method: 'POST',
                      url: import.meta.env.VITE_EVENT_API,
                      headers: {},
                    };
                    let payload = {};
                    if (blueDotEditInfo?.isEdit && !isChecked) {
                      payload = {
                        ...blueDotEditInfo.blueDotInfo,
                        ...commonPayload,
                        updatedBy: sessions.user.id,
                        staffId: userId,
                        roleId: roleId,
                        description: description,
                        endTime:
                          selectedDate && selectedTime ? contructDateTime(panelId, new Date(selectedDate), selectedTime) : '',
                        action: 'UPDATE',
                        messageId: blueDotEditInfo.messageId,
                        previousOwners:
                          blueDotEditInfo?.blueDotInfo?.isTransferred === true
                            ? blueDotEditInfo?.blueDotInfo?.previousOwners
                            : [],
                        reasonToTransfer:
                          blueDotEditInfo?.blueDotInfo?.isTransferred === true
                            ? blueDotEditInfo?.blueDotInfo?.reasonToTransfer
                            : '',
                        reasonToClose:
                          blueDotEditInfo?.blueDotInfo?.isTransferred === true ? blueDotEditInfo?.blueDotInfo?.reasonToClose : '',
                      };
                    }

                    if (blueDotEditInfo?.isEdit && !isChecked && blueDotEditInfo?.blueDotInfo?.staffId !== userId) {
                      payload = {
                        ...blueDotEditInfo.blueDotInfo,
                        ...commonPayload,
                        EventName: 'assign-bluedot',
                        updatedBy: sessions.user.id,
                        endTime:
                          selectedDate && selectedTime ? contructDateTime(panelId, new Date(selectedDate), selectedTime) : '',
                        action: 'TRANSFER',
                        messageId: blueDotEditInfo.messageId,
                        isTransferred: true,
                        reasonToTransfer: commentText,
                        newOwner: {
                          staffId: userId,
                          roleId: roleId,
                          hierarchyId: selectedHierarchyId,
                        },
                        // staffId: userId,
                        // roleId: roleId,
                        // description: description,
                      };
                    }
                    console.log(payload, 'blue dot payload');

                    try {
                      setButtonEnabled(false);
                      const response = await PMS_S3.postData(payload);
                      if (!response.Error) {
                        setOpenConfirm(false);
                        setBlueDotEditInfo({ isEdit: false, blueDotInfo: {} });
                        closeBlue();
                      }
                    } catch (error) {
                      ErrorToaster('Unexpected error occured', panelId, 'error');
                    } finally {
                      setButtonEnabled(true);
                    }
                  }}
                >
                  <SendIcon />
                </MUIButton>
              </div>
            </div> */}
          </div>
        </ChatFlyoutDrawer>
      )}
      {openCalendar && (
        <ChatFlyoutDrawer absoluteBottom>
          <CalendarDrawer
            noDrawer
            isOpen={openCalendar}
            setIsOpen={setOpenCalendar}
            date={selectedDate}
            setDate={(date) => {
              setSelectedDate(date);
              setErrorObject((pre) => {
                return { ...pre, dateError: '', default: '' };
              });
            }}
            minDate={new Date()}
          />
        </ChatFlyoutDrawer>
      )}
      {openConfirm && (
        <ChatFlyoutDrawer
          absoluteBottom
          open={openConfirm}
          header={'Are you sure?'}
          onClose={() => {
            setOpenConfirm(false);
          }}
        >
          <>
            <div>
              <div className={`${commonClasses.body15Medium} ${classes.mainHeading}`}>{`${description}`}</div>
              <div className={`${commonClasses.body15Medium} ${classes.subHeading}`}>
                {`${isChecked ? 'Closed' : 'Assign'} to @${userDetails.find((user) => user.value == selectedUser)?.label}`}
              </div>
            </div>
            <PanelFooter
              customStyle={classes.prescriptionFooter}
              leftButtonText={'No'}
              righButtontText={'Yes'}
              disableRightButton={!buttonEnabled}
              handleLeftButton={() => {
                setOpenConfirm(false);
              }}
              handleRightButton={async () => {
                let { 1: userId, 2: roleId } = selectedUser.split('~');
                let commonPayload = {
                  token: sessions.id_token,
                  method: 'POST',
                  url: import.meta.env.VITE_EVENT_API,
                  headers: {},
                };
                let payload: any = {
                  ...commonPayload,
                  EventName: 'assign-bluedot',
                  endTime: selectedDate && selectedTime ? contructDateTime(panelId, new Date(selectedDate), selectedTime) : '',
                  userId: selectedClient.client_id,
                  tenantId: selectedClient.tenant_id,
                  roleId: roleId,
                  hierarchyId: selectedHierarchyId,
                  description: description,
                  staffId: userId,
                  createdBy: sessions.user.id,
                  updatedBy: sessions.user.id,
                  action: 'ADD',
                };

                if (blueDotEditInfo?.isEdit && isChecked) {
                  payload = {
                    ...commonPayload,
                    ...blueDotEditInfo.blueDotInfo,
                    updatedBy: sessions.user.id,
                    action: 'RESOLVED',
                    reasonToClose: commentText,
                    messageId: blueDotEditInfo.messageId,
                    // isTrasnferred: blueDotEditInfo?.blueDotInfo?.isTransferred,
                    previousOwners:
                      blueDotEditInfo?.blueDotInfo?.isTransferred === true ? blueDotEditInfo?.blueDotInfo?.previousOwners : [],
                    reasonToTransfer:
                      blueDotEditInfo?.blueDotInfo?.isTransferred === true ? blueDotEditInfo?.blueDotInfo?.reasonToTransfer : '',
                    // reasonToClose:blueDotEditInfo?.blueDotInfo?.isTransferred  === true  ? blueDotEditInfo?.blueDotInfo?.reasonToClose : '',
                  };
                }
                try {
                  setButtonEnabled(false);
                  const response = await PMS_S3.postData(payload);
                  if (!response.Error) {
                    setOpenConfirm(false);
                    setChatFlyout({});
                    closeBlue();
                  }
                } catch (erxror) {
                  ErrorToaster('Unexpected error occured', panelId, 'error');
                } finally {
                  setButtonEnabled(true);
                }
              }}
              btnStyle={classes.btnHeight}
            />
          </>
        </ChatFlyoutDrawer>
      )}
    </div>
  );
}

export default memo(BlueDotPopUp);
