import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useOnScreen from '../../../../Common/IntersectionObserver';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { PMS_S3 } from '../../../../Utils';
import DaySeparator from '../../Notes/components/DaySeparator/DaySeparator';
import { checkWhetherSameDay } from '../../TimeManagement/TimeManagement.function';
import Select from '../DistirbutionChannel/DistirbutionChannel';
import MessageInput from '../MessageInput/MessageInput';
import RightMessage from '../RightMessage/RightMessage';
import { PLACEHOLDER_TEXT } from '../Summary/PostManagementSummary.function';
import { setPostId, setPostMsgData } from './../../../../DisplayFramework/State/Slices/PostSlice';
import { IRootState } from './../../../../DisplayFramework/State/store';
import { IMessage } from './../../../LibraryComponents/ChatComponent/ChatComponents.types';
import MUIDrawer from './../../../LibraryComponents/MUIDrawer/MUIDrawer';
import PannelFooter from './../../../LibraryComponents/PannelFooter/PannelFooter';
import {
  BOT_TAG_OPTIONS,
  TAG_OPTIONS,
  addVisibiltyToMessages,
  convertIdStringToLabelString,
  getDistributionChannels,
  postQuestionType,
} from './PostChatNote.functions';
import { useStyles } from './PostChatNote.styles';
import { IProps, chatVariables } from './PostChatNote.types';
import { setDisabledButton } from './../../../../DisplayFramework/State/Slices/PostSlice';

export default function PostChatNote(props: IProps) {
  const { staffList, selectedClient, sessions, registerEvent, unRegisterEvent, type } = props;

  const [roomUsers, setRoomUsers] = useState(staffList || []);
  const [isMessageLoaded, setIsMessagesLoaded] = useState(false);
  const [messagesList, setMessagesList] = React.useState<any[]>(props?.messagesList || []);
  const [formattedMsgs, setFormattedMsgs] = useState<IMessage[]>([]);
  const [online, setOnline] = useState(true);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [tagOption, setTagOptions] = useState([]);
  const [showQusMap, setShowQusMap] = useState(false);
  const [isDragDropOpen, setIsDragDropOpen] = useState(false);
  const [roomStafwithselectedClient, setRoomStafwithselectedClient] = useState([]);
  const msgEndRef = React.useRef(null);
  const [openConfirmReDO, setOpenConfirmReDO] = useState<any>(false);
  const [selectedPost, setSelectedPost] = useState<any>({});
  const [openDisChannel, setOpenDisChannel] = useState(false);
  const [openResponse, setOpenResponse] = useState(false);
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const postData: any = useSelector((state: IRootState) => state.post.postMsgData);
  const responseType: any = useSelector((state: IRootState) => state.post.responseType);
  const ref = React.useRef(null);
  const dispatch = useDispatch();
  const [distributionChannels, setDistributionChannels] = useState([]);

  const [tenantState, setTenantState] = useState({
    open: false,
    tenantId: '',
    message: '',
    title: false,
  });

  const isOnScreen = useOnScreen(ref);

  const formattedMsgsMemo = useMemo(() => {
    if (postData?.action === 'ADD' && postData.type === 'heading') {
      if (formattedMsgs.length) {
        setMessagesList([]);
        setFormattedMsgs([]);
      }
      return [];
    }
    return formattedMsgs;
  }, [formattedMsgs, postData]);

  useEffect(() => {
    if (type === 'bot') setTagOptions(BOT_TAG_OPTIONS);
    else if (type === 'mylist') setTagOptions(TAG_OPTIONS);
  }, [type]);
  useEffect(() => {
    if (messagesList.length === 0) {
      setShowScrollDown(false);
    }
  }, [messagesList]);
  // ?scrolls the chat panel to bottom for new messasges and flyout openings
  useEffect(() => {
    isOnScreen &&
      setTimeout(() => {
        msgEndRef.current?.scrollTo({ bottom: 0, behavior: 'smooth' });
      }, 500);
  }, [openConfirmReDO, isMessageLoaded, messagesList, isOnScreen, openResponse, openDisChannel]);

  useEffect(() => {
    setOpenConfirmReDO(false);
    if (postData?.type === 'distributionChannel') {
      getDistributionChannels(props).then((response) => {
        let list = response.map((value) => {
          return { value: value.lov_name_id, label: convertIdStringToLabelString(value.lov_name_id) };
        });
        setDistributionChannels(list);
      });
      setOpenConfirmReDO(false);
    }
    if (postData?.type === 'distributionChannel') {
      setOpenDisChannel(true);
    } else {
      setOpenDisChannel(false);
    }
    if (postData?.type === 'response' && responseType === '') {
      setOpenResponse(true);
    } else {
      setOpenResponse(false);
    }
    if (postData?.action === 'OPENCONFIRM') {
      handleReDoFromSummary(postData?.postId, postData);
    }
  }, [postData]);

  useEffect(() => {
    if (!chatVariables.networkConnection) {
      chatVariables.networkConnection = setInterval(() => {
        axios
          .get(import.meta.env.VITE_TEST_NETWORK)
          .then(() => {
            if (!chatVariables.chatConnection) {
              setOnline(true);
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
                      messages.sort((a, b) => new Date(a.receivedTime).getTime() - new Date(b.receivedTime).getTime())
                    );
                  chatVariables.showScrollDownIcon = false;
                  setShowScrollDown(false);
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
                      (newMessage) => {
                        if (newMessage) {
                          setMessagesList((prevList) => {
                            let newList = JSON.parse(JSON.stringify(prevList));
                            if (newMessage.ContextType === '@callScheduled' || newMessage.ContextType === '@callDeclined') {
                              let messageIdToRemove = newMessage?.scheduleData?.messageId;
                              if (messageIdToRemove) {
                                newList = newList.filter((message) => message.messageId !== messageIdToRemove);
                              }
                            }
                            if (newMessage.ContextType === '@deleteMessage') {
                              let messageIdToRemove = newMessage?.messageId;
                              if (messageIdToRemove) {
                                newList = newList.filter((message) => message.messageId !== messageIdToRemove);
                                return newList;
                              }
                            }
                            newList = newList.filter((message) => message.messageId !== newMessage?.messageId);
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
            setOnline(false);
            chatVariables.chatConnection = false;
            if (chatVariables.subscription) {
              unRegisterEvent(chatVariables.subscription);
              chatVariables.subscription = undefined;
            }
          });
      }, 3000);
    }
    return () => {
      if (!ref?.current) dispatch(setDisabledButton(false));
    };
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
            setMessagesList(messages.sort((a, b) => new Date(a.receivedTime).getTime() - new Date(b.receivedTime).getTime()));
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
              (newMessage) => {
                if (newMessage) {
                  setShowScrollDown(false);
                  setMessagesList((prevList) => {
                    let newList = JSON.parse(JSON.stringify(prevList));
                    if (newMessage.ContextType === '@callScheduled' || newMessage.ContextType === '@callDeclined') {
                      let messageIdToRemove = newMessage?.scheduleData?.messageId;
                      if (messageIdToRemove) {
                        newList = newList.filter((message) => message.messageId !== messageIdToRemove);
                      }
                    }
                    if (newMessage.ContextType === '@deleteMessage') {
                      let messageIdToRemove = newMessage?.messageId;
                      if (messageIdToRemove) {
                        newList = newList.filter((message) => message.messageId !== messageIdToRemove);
                        return newList;
                      }
                    }
                    newList = newList.filter((message) => message.messageId !== newMessage?.messageId);

                    newList.push(newMessage);
                    return newList;
                  });
                }
              }
            );
          }
        });
    }
    msgEndRef.current?.scrollTo({ top: 0 });
  }, [selectedClient]);

  useEffect(() => {
    if (isMessageLoaded) {
      setFormattedMsgs(JSON.parse(JSON.stringify(addVisibiltyToMessages(sessions.user.id, roomUsers, messagesList))));
    }
    if (messagesList && messagesList.length > 0 && messagesList[messagesList.length - 1]?.prompt) {
      setShowQusMap(true);
    }
  }, [isMessageLoaded, messagesList, roomUsers]);

  useEffect(() => {
    if (!chatVariables.showScrollDownIcon) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
    msgEndRef?.current?.scrollTo({ top: 0 });
  }, [formattedMsgsMemo]);

  const handleScroll = () => {
    if (ref.current.scrollHeight - ref.current.clientHeight - 10 > ref.current.scrollTop) {
      chatVariables.showScrollDownIcon = true;
      setShowScrollDown(true);
    } else {
      chatVariables.showScrollDownIcon = false;
      setShowScrollDown(false);
    }
  };

  const handleDnD = (e) => {
    e.preventDefault();
    setIsDragDropOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpenConfirmReDO(false);
    dispatch(setPostMsgData({}));
    dispatch(setPostId(''));
    setSelectedPost({});
  };

  const handleNo = () => {
    handleCloseDrawer();
  };
  const handleYes = () => {
    setOpenConfirmReDO(false);
    dispatch(setPostMsgData({ ...selectedPost, action: 'UPDATE' }));
  };

  const handleReDoFromSummary = (postId, currentMessage) => {
    const msgMapper = postQuestionType(currentMessage.type);
    let postDataRedo = {
      type: currentMessage.type,
      headerText: currentMessage.headerText,
      msgMapper: msgMapper,
      message: currentMessage?.message || '',
      action: 'UPDATE',
      placeHolderText: PLACEHOLDER_TEXT[currentMessage.type],
    };
    dispatch(setPostId(postId));
    setSelectedPost(postDataRedo);
    setOpenConfirmReDO(true);
  };

  const handleReDo = (postId, currentMessage) => {
    const msgMapper = postQuestionType(currentMessage.type);
    let postDataRedo = {
      type: currentMessage.type,
      headerText: currentMessage.title,
      msgMapper: msgMapper,
      message: currentMessage?.message || '',
      action: 'UPDATE',
      placeHolderText: PLACEHOLDER_TEXT[currentMessage.type],
    };
    dispatch(setPostId(postId));
    setSelectedPost(postDataRedo);
    setOpenConfirmReDO(true);
  };

  return (
    <div className={classes.notesPanel}>
      <div className={classes.messageBody} ref={ref} onScroll={handleScroll} onDragOver={handleDnD}>
        <RenderMessages formattedMsgs={formattedMsgsMemo} handleReDo={handleReDo} sessions={sessions} />
        <div ref={msgEndRef} />
      </div>
      {!openConfirmReDO && !openDisChannel && !openResponse && !tenantState.open && (
        <MessageInput
          tenantState={tenantState}
          showScrollDown={showScrollDown}
          onScrollClick={() => {
            ref.current.scrollTop = ref.current.scrollHeight;
            setShowScrollDown(false);
          }}
          setTenantState={setTenantState}
          postData={postData}
          tagOptions={tagOption}
          parentProps={props}
          type={type}
        />
      )}
      <MUIDrawer anchor="bottom" open={openConfirmReDO} handleClose={handleCloseDrawer}>
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
      </MUIDrawer>
      {!openConfirmReDO && openDisChannel && (
        <Select
          options={distributionChannels}
          values={''}
          setValues={() => {}}
          optionsType={'checkbox'}
          isToken={true}
          parentProps={props}
          rawPostData={postData}
        />
      )}
      {!openConfirmReDO && openResponse && (
        <Select
          options={[
            { label: 'Input Text', value: 'textField' },
            { label: 'Single-select', value: 'select' },
            { label: 'Multi-select', value: 'multiSelect' },
          ]}
          values={''}
          setValues={() => {}}
          optionsType={'radio'}
          isToken={true}
          parentProps={props}
          rawPostData={postData}
          optionsTypeReverse={true}
        />
      )}
      {tenantState.open && (
        <Select
          options={[{ label: 'Amura', value: 'amura' }]}
          noSendAPI={true}
          values={tenantState.tenantId}
          setValues={(tenantId) => {
            //dispatch(setTenantId(tenantId));
            setTenantState((pre) => ({ ...pre, open: false, tenantId }));
          }}
          optionsType={'radio'}
          isToken={false}
          parentProps={props}
          headerTitle={'Select a tenant'}
          Icontype={'tenantIcon'}
          optionsTypeReverse={true}
          onSelectClose={() => {
            setTenantState((pre) => ({ ...pre, open: false, tenantId: '' }));
          }}
        />
      )}
    </div>
  );
}

const RenderMessages = (props) => {
  const { formattedMsgs, handleReDo, sessions } = props;
  return formattedMsgs.flatMap((message, index) => {
    let messages = [];
    if (index === 0 || !checkWhetherSameDay(message.receivedTime, formattedMsgs[index - 1].receivedTime)) {
      messages.push(<DaySeparator date={new Date(message.receivedTime)} />);
    }
    if (message?.postPayload) {
      messages.push(message.isVisible && <RightMessage message={message} handleReDo={handleReDo} sessions={sessions} />);
      return messages;
    }
  });
};
