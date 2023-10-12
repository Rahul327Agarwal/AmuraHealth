import { debounce } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTimeStringToDate } from '../../../../Common/Common.functions';
import useOnScreen from '../../../../Common/IntersectionObserver';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { PMS_S3 } from '../../../../Utils';
import { IMessage } from '../../../LibraryComponents/ChatComponent/ChatComponents.types';
import MUIButton from '../../../LibraryComponents/MUIButton/MUIButton';
import { TickIcon } from '../../../SVGs/Common';
import DaySeparator from '../../Notes/components/DaySeparator/DaySeparator';
import { checkWhetherSameDay } from '../../TimeManagement/TimeManagement.function';
import { API_ACTION_TYPE } from '../DistributionsMgt.functions';
import MessageInput from '../PostsMessageInput/MessageInput';
import MessageView from '../PostsMessageView/MessageView';
import { CHAT_SELECT_CONFIG, DEFAULT_SNIPPETS, SNIPPETS_ID, TENANT_OBJECT } from '../Summary/Summary.function';
import ErrorToaster from './../../../../Common/ErrorToaster';
import {
  setDisabledaddBtnInList,
  setDisabledaddBtnInLMS,
  setDisabledaddBtnInPolls,
  setDisabledaddBtnInQMT,
  setStoreData,
  setUniqueId,
} from './../../../../DisplayFramework/State/Slices/AllPostsDataSlice';
import { setTenantId } from './../../../../DisplayFramework/State/Slices/DashboardSlice';
import { IRootState } from './../../../../DisplayFramework/State/store';
import ChatSelect from './../../../LibraryComponents/MUIChatSelect/MUIChatSelect';
import StaticCalendar from './../../../LibraryComponents/MUIDatePicker/StaticCalendar';
import MUIDrawer from './../../../LibraryComponents/MUIDrawer/MUIDrawer';
import PannelFooter from './../../../LibraryComponents/PannelFooter/PannelFooter';
import {
  BOT_TAG_OPTIONS,
  TAG_OPTIONS,
  addVisibiltyToMessages,
  convertingTimeToMinutes,
  getDistributionChannels,
  getSearchUsers,
  postQuestionType,
  sendMessageSnippetAPI,
} from './ChatNote.functions';
import { useStyles } from './ChatNote.styles';
import { IChatSelectType, IDrawerState, IProps, chatVariables } from './ChatNote.types';
import ChatNoteInput from './ChatNoteInput';
import TimeIntervalInput from './TimeIntervalInput';
import TimeOffsetEventInput from './TimeOffsetEventInput';
import TimeSelectInput from './TimeSelectInput';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

const chatSelectDefault: IChatSelectType = {
  open: false,
  options: [],
  optionsType: 'checkbox',
  headerTitle: '',
};
const drawerStateDefault: IDrawerState = {
  open: false,
  screen: 'REDO',
};

export default function ChatNote(props: IProps) {
  const { staffList, selectedClient, sessions, registerEvent, unRegisterEvent, type } = props;

  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const { id: panelId } = useCurrentPanel();

  const [roomUsers, setRoomUsers] = useState(staffList || []);
  const [isMessageLoaded, setIsMessagesLoaded] = useState(false);
  const [messagesList, setMessagesList] = React.useState<any[]>(props?.messagesList || []);
  const [formattedMsgs, setFormattedMsgs] = useState<IMessage[]>([]);
  const [tagOption, setTagOptions] = useState([]);
  const [distributionChannels, setDistributionChannels] = useState<any>([]);

  const [chatSelectState, setChatSelectState] = useState<IChatSelectType>(chatSelectDefault);
  const [snippetPayload, setSnippetPayload] = useState<any>([]);
  const [branchingIndex, setBranchingIndex] = useState(0);
  const [branching, setBranching] = useState([]);
  const [drawerState, setDrawerState] = useState<IDrawerState>(drawerStateDefault);
  const [calenderDate, setCalenderDate] = useState(new Date());
  const { storeData, uniqueId, uniqueType, tenantId, snippetStartTime, snippetCloseTime }: any = useSelector(
    (state: IRootState) => state.AllPostData
  );
  const ref = React.useRef(null);
  const msgEndRef = React.useRef(null);
  const dispatch = useDispatch();
  const isOnScreen = useOnScreen(ref);

  const formattedMsgsMemo = useMemo(() => {
    if (storeData?.action === API_ACTION_TYPE.ADD && storeData.type === 'title') {
      if (formattedMsgs.length) {
        setMessagesList([]);
        setFormattedMsgs([]);
      }
      return [];
    }
    return formattedMsgs;
  }, [formattedMsgs, storeData]);

  useEffect(() => {
    (async () => {
      const response = await getDistributionChannels(sessions);
      if (response) {
        const lists = response.map((value: any) => ({ value: value.lov_name_id, label: value.lov_name_id }));
        setDistributionChannels(lists);
      }
    })();
    return () => {
      if (!ref?.current) dispatch(setDisabledaddBtnInList(false));
    };
  }, []);

  useEffect(() => {
    isOnScreen &&
      setTimeout(() => {
        msgEndRef.current?.scrollTo({ bottom: 0, behavior: 'smooth' });
      }, 500);
  }, [drawerState.open, isMessageLoaded, messagesList, isOnScreen]);

  useEffect(() => {
    setChatSelectState(chatSelectDefault);

    setCalenderDate(new Date());
    if (storeData?.action === API_ACTION_TYPE.OPEN_CONFIRM) {
      setDrawerState(drawerStateDefault);
      return handleReDo(uniqueId, storeData);
    }
    if (storeData?.action === API_ACTION_TYPE.ADD) {
      setDrawerState(drawerStateDefault);
    }
    if (storeData.type) {
      openRespectiveChatSelect();
    }
    if (Object.keys(storeData).length === 0) {
      setDrawerState(drawerStateDefault);
    }
  }, [storeData, distributionChannels]);

  useEffect(() => {
    if (type === 'bot') setTagOptions(BOT_TAG_OPTIONS as any);
    else if (type === 'mylist') setTagOptions(TAG_OPTIONS as any);
  }, [type]);

  useEffect(() => {
    isOnScreen &&
      setTimeout(() => {
        msgEndRef.current?.scrollTo({ bottom: 0, behavior: 'smooth' });
      }, 500);
  }, [drawerState.open, isMessageLoaded, messagesList, isOnScreen]);

  useEffect(() => {
    if (!chatVariables.networkConnection) {
      (chatVariables as any).networkConnection = setInterval(() => {
        axios
          .get(import.meta.env.VITE_TEST_NETWORK!)
          .then(() => {
            if (!chatVariables.chatConnection) {
              chatVariables.chatConnection = true;
              if (chatVariables.subscription) unRegisterEvent(chatVariables.subscription);
              PMS_S3.getObject(
                `pms-ql-notes/${selectedClient.client_id}/myNotes.json`,
                import.meta.env.VITE_CLIENT_BUCKET,
                {
                  TenantId: selectedClient.tenant_id,
                  Locale: sessionStorage.getItem('locale'),
                  url: import.meta.env.VITE_S3_FETCH_API,
                  token: sessions.id_token,
                  headers: {},
                },
                {}
              )
                .then((messages) => {
                  if (!messages.Error)
                    setMessagesList(
                      messages.sort((a: any, b: any) => new Date(a.receivedTime).getTime() - new Date(b.receivedTime).getTime())
                    );
                  chatVariables.showScrollDownIcon = false;
                })
                .catch((err) => {
                  console.log('Error in fetching data', err);
                  setMessagesList([]);
                })
                .finally(() => {
                  setIsMessagesLoaded(true);
                  if (registerEvent) {
                    chatVariables.subscription = registerEvent(
                      `~${selectedClient.tenant_id}~${selectedClient.client_id}~`,
                      'notes',
                      (newMessage: any) => {
                        if (newMessage) {
                          setMessagesList((prevList) => {
                            let newList = JSON.parse(JSON.stringify(prevList));
                            if (newMessage.ContextType === '@callScheduled' || newMessage.ContextType === '@callDeclined') {
                              let messageIdToRemove = newMessage?.scheduleData?.messageId;
                              if (messageIdToRemove) {
                                newList = newList.filter((message: any) => message.messageId !== messageIdToRemove);
                              }
                            }
                            if (newMessage.ContextType === '@deleteMessage') {
                              let messageIdToRemove = newMessage?.messageId;
                              if (messageIdToRemove) {
                                newList = newList.filter((message: any) => message.messageId !== messageIdToRemove);
                                return newList;
                              }
                            }
                            newList = newList.filter((message: any) => message.messageId !== newMessage.messageId);

                            newList.push(newMessage);
                            return newList;
                          });
                        }
                      }
                    );
                  }
                });
            }
          })
          .catch(() => {
            chatVariables.chatConnection = false;
            if (chatVariables.subscription) {
              unRegisterEvent(chatVariables.subscription);
              (chatVariables as any).subscription = undefined;
            }
          });
      }, 3000);
    }
  }, []);

  useEffect(() => {
    setIsMessagesLoaded(false);
    setMessagesList(props?.messagesList || []);
    if (chatVariables.subscription) unRegisterEvent(chatVariables.subscription);
    if (selectedClient?.client_id) {
      PMS_S3.getObject(
        `pms-ql-notes/${selectedClient?.client_id}/myNotes.json`,
        import.meta.env.VITE_CLIENT_BUCKET,
        {
          TenantId: selectedClient.tenant_id,
          Locale: sessionStorage.getItem('locale'),
          url: import.meta.env.VITE_S3_FETCH_API,
          token: sessions.id_token,
          headers: {},
        },
        {}
      )
        .then((messages) => {
          chatVariables.showScrollDownIcon = false;
          if (!messages.Error)
            setMessagesList(
              messages.sort((a: any, b: any) => new Date(a.receivedTime).getTime() - new Date(b.receivedTime).getTime())
            );
        })
        .catch((err) => {
          setMessagesList([]);
        })
        .finally(() => {
          setIsMessagesLoaded(true);
          if (registerEvent) {
            chatVariables.subscription = registerEvent(
              `~${selectedClient?.tenant_id || 'amura'}~${selectedClient.client_id}~`,
              'notes',
              (newMessage: any) => {
                if (newMessage) {
                  setMessagesList((prevList) => {
                    let newList = JSON.parse(JSON.stringify(prevList));
                    if (newMessage.ContextType === '@callScheduled' || newMessage.ContextType === '@callDeclined') {
                      let messageIdToRemove = newMessage?.scheduleData?.messageId;
                      if (messageIdToRemove) {
                        newList = newList.filter((message: any) => message.messageId !== messageIdToRemove);
                      }
                    }
                    if (newMessage.ContextType === '@deleteMessage') {
                      let messageIdToRemove = newMessage?.messageId;
                      if (messageIdToRemove) {
                        newList = newList.filter((message: any) => message.messageId !== messageIdToRemove);
                        return newList;
                      }
                    }
                    newList = newList.filter((message: any) => message.messageId !== newMessage.messageId);
                    newList.push(newMessage);
                    return newList;
                  });
                }
              }
            );
          }
        });
    }
  }, [selectedClient]);

  useEffect(() => {
    if (isMessageLoaded) {
      setFormattedMsgs(JSON.parse(JSON.stringify(addVisibiltyToMessages(sessions.user.id, roomUsers, messagesList))));
    }
  }, [isMessageLoaded, messagesList, roomUsers]);

  useEffect(() => {
    if (!chatVariables.showScrollDownIcon) {
      (ref.current as any).scrollTop = (ref.current as any).scrollHeight;
    }
  }, [formattedMsgsMemo]);

  const openRespectiveChatSelect = () => {
    const chatselect: any = CHAT_SELECT_CONFIG[`${uniqueType}_${storeData.type}`];

    if (!chatselect) return setChatSelectState(chatSelectDefault);
    switch (storeData.type) {
      case SNIPPETS_ID.DIS_CHANNEL:
        return setChatSelectState({ ...chatselect, options: distributionChannels, open: true });
      case SNIPPETS_ID.CONSUMERS:
      case SNIPPETS_ID.VIEW_ACCESS:
        return setChatSelectState({ ...chatselect, options: [], open: true });
      default:
        return setChatSelectState({ ...chatselect, open: true });
    }
  };

  const handleScroll = () => {
    if ((ref.current as any).scrollHeight - (ref.current as any).clientHeight - 100 > (ref.current as any).scrollTop) {
      chatVariables.showScrollDownIcon = true;
    } else {
      chatVariables.showScrollDownIcon = false;
    }
  };

  const handleDnD = (e: any) => {
    e.preventDefault();
  };

  const handleReDo = (uniqueId: any, storeData: any) => {
    const msgMapper = postQuestionType(storeData.type);
    const payload = {
      type: storeData.type,
      headerText: storeData.type === 'title' ? 'Enter title' : storeData.headerText,
      msgMapper: msgMapper,
      message: storeData?.message || '',
      action: 'UPDATE',
      placeHolderText: DEFAULT_SNIPPETS[storeData?.type].placeHolderText || '',
    };
    dispatch(setUniqueId(uniqueId));
    setDrawerState((pre) => ({ ...pre, open: true, payload }));
  };

  const handleYes = () => {
    dispatch(setStoreData({ ...drawerState.payload, action: 'UPDATE' }));
    setDrawerState(drawerStateDefault);
    openRespectiveChatSelect();
  };

  const handleNo = () => {
    handleCloseDrawer();
  };

  const handleCloseDrawer = () => {
    setDrawerState(drawerStateDefault);
    dispatch(setStoreData({}));
    dispatch(setUniqueId(''));
    dispatch(setDisabledaddBtnInList(false));
    dispatch(setDisabledaddBtnInLMS(false));
    dispatch(setDisabledaddBtnInPolls(false));
    dispatch(setDisabledaddBtnInQMT(false));
    setChatSelectState(chatSelectDefault);
    setSnippetPayload([]);
    setBranchingIndex(0);
    setBranching([]);
  };

  const callSearchUsersAPI = async (value: any) => {
    try {
      const response = await getSearchUsers(props, value);

      if (response) {
        const options = response?.map(({ _id, _source }: any) => ({
          id: _id,
          label: `${_source?.profile?.first_name} ${_source?.profile?.last_name}` || _id,
        }));
        const newObj = options.map((each: any) => ({
          value: each.id,
          label: each.label,
        }));
        setChatSelectState((pre) => ({ ...pre, options: newObj || [] }));
      }
    } catch (error) {
      ErrorToaster(error as any, panelId, 'error');
    }
  };

  const handleChatSelect = async (value: any) => {
    let isBranching = false;

    if (chatSelectState.branching) {
      isBranching = Array.isArray(value)
        ? value.some((d) => chatSelectState.branching?.includes(d))
        : chatSelectState.branching.includes(value);
    }

    let typeValue = Array.isArray(value) ? value[branchingIndex] : value;

    if (isBranching) {
      const data = Array.isArray(value) ? value : [value];
      setBranching(data as any);
    } else {
      typeValue = branching[branchingIndex];
      const type = branching[branchingIndex - 1] ?? value;
      const configuration = [...snippetPayload, { type, value }];
      setSnippetPayload(configuration);

      if (branchingIndex === branching.length) {
        if (chatSelectState.trigger) {
          const targetObject = chatSelectState.trigger.find((data) => data.id === value);
          if (targetObject) {
            setDrawerState({
              open: true,
              screen: targetObject.target,
              payload: { type: value },
            });
            setChatSelectState((pre) => ({ ...pre, open: false }));
            return;
          }
        }
        let payload = {};
        let tenantValue = '';
        if (chatSelectState.message) {
          dispatch(setTenantId(value));
          payload = { message: chatSelectState.message };
          tenantValue = value;
        } else if (chatSelectState.optionsType === 'checkbox') {
          payload = { values: value };
        } else if (chatSelectState.optionsType === 'radio' && storeData.type === SNIPPETS_ID.TO_BE_SHARED) {
          payload = { values: configuration[0].value };
        } else if (chatSelectState.optionsType === 'radio' && storeData.type === SNIPPETS_ID.DIS_CANDENCE) {
          const data = [{ type, value }];
          payload = { configuration: data };
        } else {
          payload = { configuration };
        }

        const payloadData = {
          type: storeData.type,
          ...payload,
        };

        handleCallAPI(payloadData, tenantValue);
        return;
      }
    }

    setBranchingIndex((pre) => pre + 1);
    const chatselect: any = CHAT_SELECT_CONFIG[`${uniqueType}_${typeValue}`];
    if (chatselect) {
      setChatSelectState({ ...chatselect, open: true });
    }
  };

  const handleSelectClose = () => {
    setChatSelectState(chatSelectDefault);
    setSnippetPayload([]);
    setBranchingIndex(0);
    setBranching([]);
  };

  const handleSelectDate = () => {
    setDrawerState((pre) => ({
      ...pre,
      screen: 'TIME_INPUT',
      payload: { ...pre.payload, datetime: calenderDate },
    }));
  };

  const handleSendChat = (data: any) => {
    const date = drawerState?.payload?.datetime || calenderDate;
    let payloadData = null;
    switch (drawerState.screen) {
      case 'TIME_INPUT':
        const datetime = setTimeStringToDate(date, data.value);
        let startingTime = new Date(snippetStartTime).getTime();
        let closingTime = new Date(snippetCloseTime).getTime();
        let inputDate = new Date(datetime).getTime();
        let currentTime = new Date().getTime();
        if (storeData?.type === 'closingTime') {
          if (snippetStartTime !== null && inputDate <= startingTime) {
            ErrorToaster('Please enter the value greater than the starting time', panelId, 'error');
            return;
          }
          if (inputDate <= currentTime) {
            ErrorToaster('Please enter the value greater than the current time', panelId, 'error');
            return;
          }
        }
        if (storeData?.type === 'startingTime') {
          if (snippetCloseTime !== null && inputDate >= closingTime) {
            ErrorToaster('Please enter the value lesser than the closingTime time', panelId, 'error');
            return;
          }
        }
        payloadData = { datetime: datetime?.toISOString() };
        break;
      case 'VOTE_INPUT':
        payloadData = { value: data.value };
        break;
      case 'PERCENTAGE_INPUT':
        payloadData = { value: `${data.value}%`, percentage: data.value };
        break;
    }
    if (!payloadData) return;

    const payload = {
      type: storeData.type,
      configuration: [{ type: drawerState?.payload?.type, ...payloadData }],
    };
    handleCallAPI(payload);
  };

  const handleCertainTime = (data: any) => {
    if (data) {
      let timeConverting = convertingTimeToMinutes(data?.time, data?.units);
      delete data?.units;
      const payload = {
        type: storeData.type,
        configuration: [{ type: drawerState?.payload?.type, ...data, time: timeConverting }],
      };
      handleCallAPI(payload);
    }
  };

  const handleTimeInterval = (data: any) => {
    let timeConverting = convertingTimeToMinutes(data?.time, data?.units);
    delete data?.units;
    const payload = {
      type: storeData.type,
      configuration: [{ type: drawerState?.payload?.type, ...data, time: timeConverting }],
    };
    handleCallAPI(payload);
  };

  const handleOffsetEvent = (data: any) => {
    let timeConverting = convertingTimeToMinutes(data?.time, data?.units);
    delete data?.units;
    const payload = {
      type: storeData.type,
      configuration: [{ type: drawerState?.payload?.type, ...data, time: timeConverting }],
    };
    handleCallAPI(payload);
  };

  const handleCallAPI = async (payload: any, tenantValue?: string) => {
    const tenant = tenantValue || tenantId;
    const response = await sendMessageSnippetAPI(panelId, sessions, tenant, uniqueId, uniqueType, storeData, payload);

    if (response) {
      handleSelectClose();
      dispatch(setStoreData({})); //...drawerState.payload, action: 'UPDATE', message: payload.configuration[0].type
      dispatch(setDisabledaddBtnInList(false));
      dispatch(setDisabledaddBtnInLMS(false));
      dispatch(setDisabledaddBtnInPolls(false));
      dispatch(setDisabledaddBtnInQMT(false));
      setDrawerState(drawerStateDefault);
      setCalenderDate(new Date());
    }
  };
  const handleOpenTenant = (message: string) => {
    const data: any = {
      options: TENANT_OBJECT.options,
      optionsType: TENANT_OBJECT.optionsType,
      headerTitle: TENANT_OBJECT.headerTitle,
      message: message,
      open: true,
    };
    setChatSelectState(data);
  };

  const getHeightBasedOnInput = (snippetId: any) => {
    switch (snippetId) {
      case SNIPPETS_ID.STARTING_TIME:
      case SNIPPETS_ID.TO_BE_SHARED:
        return 180;
      case SNIPPETS_ID.SEE_RESPONSE:
      case SNIPPETS_ID.DIS_CHANNEL:
        return 120;
      case SNIPPETS_ID.CLOSING_TIME:
      case SNIPPETS_ID.DIS_CANDENCE:
        return 240;
      case SNIPPETS_ID.DIS_CANDENCE:
        return 250;
      default:
        return;
    }
  };

  const RenderDrawerBody = () => {
    switch (drawerState.screen) {
      case 'REDO':
        return (
          <>
            <div className={`${commonClasses.body15Medium} ${classes.reAnswerQuestion}`}>
              Are you sure want to reset your reply and re-answer the question?
            </div>
            <PannelFooter
              customStyle={classes.drawerFooter}
              buttonOneProps={{ size: 'large' }}
              buttonTwoProps={{ size: 'large' }}
              handleCancel={handleNo}
              handleAdd={handleYes}
              buttonOneTitle={'No'}
              buttonTwoTitle={'Yes'}
            />
          </>
        );
      case 'CALENDER':
        return (
          <div className={classes.calenderBox}>
            <StaticCalendar disablePast={true} date={calenderDate} setDate={setCalenderDate} />
            <MUIButton
              className={classes.calenderButton}
              variant="contained"
              onClick={handleSelectDate}
              startIcon={<TickIcon />}
              disabled={!calenderDate}
            >
              Proceed
            </MUIButton>
          </div>
        );
      case 'SELECT_TIME_INPUT':
        return (
          <TimeSelectInput
            handleProceed={handleCertainTime}
            snippetId={storeData.type}
            headerText={'Certain amount of time passes'}
          />
        );
      case 'TIME_INTERVAL':
        return (
          <TimeIntervalInput
            handleProceed={handleTimeInterval}
            snippetId={storeData.type}
            headerText={'A pre-set time interval'}
          />
        );
      case 'OFFSET_EVENT':
        return (
          <TimeOffsetEventInput
            handleProceed={handleOffsetEvent}
            snippetId={storeData.type}
            headerText={'At a specific offset from an event'}
          />
        );
      case 'TIME_INPUT':
      case 'VOTE_INPUT':
      case 'PERCENTAGE_INPUT':
        const data: any = {
          TIME_INPUT: { headerText: 'Enter time', placeholder: 'Enter time', type: 'time', className: classes.inputTimeStyle },
          VOTE_INPUT: { headerText: 'Certain number of people have voted', placeholder: 'Enter number of people' },
          PERCENTAGE_INPUT: {
            isPercent: true,
            headerText: 'Certain percentage of the named users have polled',
            placeholder: 'Enter % of voters',
          },
        };
        const { headerText, isPercent, ...InputProps } = data[drawerState.screen] || {};
        return (
          <ChatNoteInput
            isPercent={isPercent}
            snippetId={storeData.type}
            headerText={headerText}
            handleSend={handleSendChat}
            InputProps={InputProps}
          />
        );
    }
  };

  const debounceFun: Function = debounce(callSearchUsersAPI, 500);

  return (
    <div className={classes.notesPanel}>
      <div className={classes.messageBody} ref={ref} onScroll={handleScroll} onDragOver={handleDnD}>
        <RenderMessages formattedMsgs={formattedMsgsMemo} handleReDo={handleReDo} sessions={sessions} />
        <div ref={msgEndRef} />
      </div>
      {!drawerState.open && !chatSelectState.open && (
        <MessageInput handleOpenTenant={handleOpenTenant} tagOptions={tagOption} parentProps={props} type={type} />
      )}
      <MUIDrawer anchor="bottom" open={drawerState.open} handleClose={handleCloseDrawer}>
        {RenderDrawerBody()}
      </MUIDrawer>
      {chatSelectState.open ? (
        <ChatSelect
          open={chatSelectState.open}
          setOpen={(data: any) => setChatSelectState((pre) => ({ ...pre, open: data }))}
          options={chatSelectState.options as any}
          values={''}
          setValues={handleChatSelect}
          onSelectClose={handleSelectClose}
          optionsType={chatSelectState.optionsType}
          headerTitle={chatSelectState.headerTitle}
          snippetId={storeData.type}
          position={'bottom'}
          maxHeight={getHeightBasedOnInput(storeData.type)}
          noSendAPI
          {...(chatSelectState.debounceAPI && {
            isSearch: true,
            onSearchAPICall: (data) => debounceFun(data),
            isToken: true,
            isTokenDeletable: true,
          })}
        />
      ) : null}
    </div>
  );
}

const RenderMessages = (props: any) => {
  const { formattedMsgs, handleReDo, sessions } = props;

  return formattedMsgs.flatMap((message: any, index: any) => {
    let messages = [];
    if (index === 0 || !checkWhetherSameDay(message.receivedTime, formattedMsgs[index - 1].receivedTime)) {
      messages.push(<DaySeparator date={new Date(message.receivedTime)} />);
    }

    if (message?.collectionPayload) {
      messages.push(message.isVisible && <MessageView message={message} handleReDo={handleReDo} sessions={sessions} />);

      return messages;
    }
  });
};
