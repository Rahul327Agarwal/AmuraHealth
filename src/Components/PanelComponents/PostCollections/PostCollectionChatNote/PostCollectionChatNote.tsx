import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDisabledButton,
  setStoreData,
  setUniqueId,
  setUniqueType,
} from './../../../../DisplayFramework/State/Slices/AllPostsDataSlice';
import { IRootState } from './../../../../DisplayFramework/State/store';
// import DaySeparator from './../../../LibraryComponents/ChatComponents/DaySeparator';
// import { checkWhetherSameDay } from '../../../LibraryComponents/DatePicker/DatePicker.functions';
import axios from 'axios';
import { PMS_S3 } from '../../../../Utils';
import Select from '../DistirbutionChannel/DistirbutionChannel';
import MessageInput from '../MessageInput/MessageInput';
import RightMessage from '../RightMessage/RightMessage';
import { setPostCollectionId, setPostCollectionMsgData } from './../../../../DisplayFramework/State/Slices/PostCollectionSlice';
import { IMessage } from './../../../LibraryComponents/ChatComponent/ChatComponents.types';
import MUIDrawer from './../../../LibraryComponents/MUIDrawer/MUIDrawer';
import PannelFooter from './../../../LibraryComponents/PannelFooter/PannelFooter';
import {
  BOT_TAG_OPTIONS,
  TAG_OPTIONS,
  addVisibiltyToMessages,
  getDistributionChannels,
  postQuestionType,
} from './PostCollectionChatNote.functions';
import { useStyles } from './PostCollectionChatNote.styles';
import { IProps, chatVariables } from './PostCollectionChatNote.types';

import useOnScreen from '../../../../Common/IntersectionObserver';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import DaySeparator from '../../Notes/components/DaySeparator/DaySeparator';
import { checkWhetherSameDay } from '../../TimeManagement/TimeManagement.function';
import { PLACEHOLDER_TEXT } from '../Summary/PostCollectionsSummary.function';
import { setTenantId } from './../../../../DisplayFramework/State/Slices/DashboardSlice';

export default function PostCollectionChat(props: IProps) {
  const { staffList, selectedClient, sessions, registerEvent, unRegisterEvent, type } = props;
  const [roomUsers, setRoomUsers] = useState(staffList || []);
  const [isMessageLoaded, setIsMessagesLoaded] = useState(false);
  const [messagesList, setMessagesList] = React.useState<any[]>(props?.messagesList || []);
  const [formattedMsgs, setFormattedMsgs] = useState<IMessage[]>([]);
  const [online, setOnline] = useState(true);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [tagOption, setTagOptions] = useState<any>([]);
  const [showQusMap, setShowQusMap] = useState(false);
  const [isDragDropOpen, setIsDragDropOpen] = useState(false);
  const [roomStafwithselectedClient, setRoomStafwithselectedClient] = useState([]);
  const msgEndRef = React.useRef<any>(null);
  const [openConfirmReDO, setOpenConfirmReDO] = useState<any>(false);
  const [selectedPost, setSelectedPost] = useState<any>({});
  const [distributionChannels, setDistributionChannels] = useState([]);
  const [openDisChannel, setOpenDisChannel] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [tenantState, setTenantState] = useState({
    open: false,
    tenantId: '',
    message: '',
    title: false,
  });

  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const [openResponse, setOpenResponse] = useState(false);
  const postCollectionMsgData: any = useSelector((state: IRootState) => state.PostCollection.postCollectionMsgData);

  const responseType: any = useSelector((state: IRootState) => state.PostCollection.responseType);
  const storeData = useSelector((state: IRootState) => state.AllPostData.storeData);
  const ref = React.useRef<any>(null);
  const dispatch = useDispatch();
  const isOnScreen = useOnScreen(ref);

  const formattedMsgsMemo = useMemo(() => {
    if (storeData?.action === 'ADD' && storeData.type === 'collectionName') {
      if (formattedMsgs.length) {
        setMessagesList([]);
        setFormattedMsgs([]);
      }
      return [];
    }
    return formattedMsgs;
  }, [formattedMsgs, storeData]);

  useEffect(() => {
    if (type === 'bot') setTagOptions(BOT_TAG_OPTIONS);
    else if (type === 'mylist') setTagOptions(TAG_OPTIONS);
  }, [type]);
  useEffect(() => {
    isOnScreen &&
      setTimeout(() => {
        msgEndRef.current?.scrollTo({ bottom: 0, behavior: 'smooth' });
      }, 500);
  }, [openConfirmReDO, isMessageLoaded, messagesList, isOnScreen, openPrivacy, openDisChannel, openResponse]);

  useEffect(() => {
    setOpenConfirmReDO(false);
    if (postCollectionMsgData?.type === 'distributionChannel') {
      getDistributionChannels(props).then((response) => {
        let list = response.map((value: any) => {
          // return { value: value.lov_name_id, label: value.lov_name_id };
          let label = value.lov_name_id
            .replace(/([A-Z]+)/g, ' $1')
            .replace(/^ /, '')
            .replace(/^./, (str) => str.toUpperCase());
          const newLable = label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
          return { value: value.lov_name_id, label: newLable };
        });
        setDistributionChannels(list);
      });
      setOpenConfirmReDO(false);
    }
    if (postCollectionMsgData?.type === 'distributionChannel') {
      setOpenDisChannel(true);
    } else {
      setOpenDisChannel(false);
    }
    if (postCollectionMsgData?.type === 'response' && responseType === '') {
      setOpenResponse(true);
    } else {
      setOpenResponse(false);
    }
    if (postCollectionMsgData?.action === 'OPENCONFIRM') {
      handleReDoFromSummary(postCollectionMsgData?.postCollectionId, postCollectionMsgData);
    }
  }, [postCollectionMsgData]);

  useEffect(() => {
    if (storeData?.type === 'distributionChannel') {
      setOpenDisChannel(true);
    } else {
      setOpenDisChannel(false);
    }
  }, [storeData]);

  useEffect(() => {
    if (storeData?.type === 'privacy') {
      setOpenPrivacy(true);
    } else {
      setOpenPrivacy(false);
    }
  }, [storeData]);

  useEffect(() => {
    if (!chatVariables.networkConnection) {
      (chatVariables.networkConnection as any) = setInterval(() => {
        axios
          .get(import.meta.env.VITE_TEST_NETWORK!)
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
                .then((messages: any) => {
                  if (!messages.Error)
                    setMessagesList(
                      messages.sort((a: any, b: any) => new Date(a.receivedTime).getTime() - new Date(b.receivedTime).getTime())
                    );
                  chatVariables.showScrollDownIcon = false;
                  setShowScrollDown(false);
                })
                .catch((err: any) => {
                  console.error('Error in fetching data', err);
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
                            if (!newList.find(({ messageId }) => messageId === newMessage?.messageId)) newList.push(newMessage);
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
              (chatVariables.subscription as any) = undefined;
            }
          });
      }, 3000);
    }
    return () => {
      if (!ref?.current) dispatch(setDisabledButton(false));
    };
  }, []);
  useEffect(() => {
    setOpenConfirmReDO(false);
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
        .then((messages: any) => {
          chatVariables.showScrollDownIcon = false;
          if (!messages.Error)
            setMessagesList(
              messages.sort((a: any, b: any) => new Date(a.receivedTime).getTime() - new Date(b.receivedTime).getTime())
            );
        })
        .catch((err: any) => {
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
                  setShowScrollDown(false);
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
                    let SameMessage = newList.find(({ messageId }) => messageId === newMessage.messageId);

                    if (!SameMessage) newList.push(newMessage);

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
    msgEndRef.current?.scrollTo({ top: 0 });
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

  const handleDnD = (e: any) => {
    e.preventDefault();
    setIsDragDropOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpenConfirmReDO(false);
    dispatch(setStoreData({}));
    dispatch(setPostCollectionId(''));
    setSelectedPost({});
    dispatch(setDisabledButton(false));
  };

  const handleNo = () => {
    handleCloseDrawer();
  };
  const handleYes = () => {
    setOpenConfirmReDO(false);
    dispatch(setStoreData({ ...selectedPost, action: 'UPDATE' }));
    dispatch(setPostCollectionMsgData({ ...selectedPost, action: 'UPDATE' }));
  };

  const handleReDoFromSummary = (postId: any, currentMessage: any) => {
    const msgMapper = postQuestionType(currentMessage.type);
    let postDataRedo = {
      type: currentMessage.type,
      headerText: currentMessage.headerText,
      msgMapper: msgMapper,
      message: currentMessage?.message || '',
      action: 'UPDATE',
      placeHolderText: (PLACEHOLDER_TEXT as any)[currentMessage.type],
    };
    dispatch(setPostCollectionId(postId));
    dispatch(setUniqueId(postId));
    setSelectedPost(postDataRedo);
    setOpenConfirmReDO(true);
  };

  const handleReDo = (uniqueId: any, uniqueType: any, currentMessage: any) => {
    // dispatch(setDisabledButton(true));
    const msgMapper = postQuestionType(currentMessage.type);
    const postData = {
      type: currentMessage.type,
      headerText: currentMessage.title,
      msgMapper: msgMapper,
      message: currentMessage?.message || '',
      action: 'UPDATE',
      placeHolderText: (PLACEHOLDER_TEXT as any)[currentMessage.type],
    };
    dispatch(setUniqueId(uniqueId));
    dispatch(setUniqueType(uniqueType));
    setSelectedPost(postData);
    setOpenConfirmReDO(true);
  };

  return (
    <div className={classes.notesPanel}>
      <div className={classes.messageBody} ref={ref} onScroll={handleScroll} onDragOver={handleDnD}>
        <RenderMessages formattedMsgs={formattedMsgsMemo} handleReDo={handleReDo} sessions={sessions} />
        <div ref={msgEndRef} />
      </div>
      {!openConfirmReDO && !openDisChannel && !openPrivacy && !tenantState.open && !tenantState.title && (
        <MessageInput
          tenantState={tenantState}
          onScrollClick={() => {
            ref.current.scrollTop = ref.current.scrollHeight;
            setShowScrollDown(false);
          }}
          setTenantState={setTenantState}
          postCollectionData={storeData}
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
      {!openConfirmReDO && openDisChannel && !openPrivacy && (
        <Select
          options={distributionChannels}
          values={''}
          setValues={() => {}}
          optionsType={'checkbox'}
          isToken={true}
          parentProps={props}
          postData={storeData}
          headerTitle={'Select distribution channels'}
        />
      )}{' '}
      {!openConfirmReDO && !openDisChannel && openPrivacy && (
        <Select
          options={[
            { label: 'Private', value: 'private' },
            { label: 'Public', value: 'public' },
          ]}
          values={''}
          setValues={() => {}}
          optionsType={'radio'}
          isToken={true}
          parentProps={props}
          postData={storeData}
          headerTitle={'Select Privacy'}
        />
      )}
      {tenantState.title && (
        <MessageInput
          tenantState={tenantState}
          showScrollDown={showScrollDown}
          onScrollClick={() => {
            ref.current.scrollTop = ref.current.scrollHeight;
            setShowScrollDown(false);
          }}
          setTenantState={setTenantState}
          postCollectionData={storeData}
          tagOptions={tagOption}
          parentProps={props}
          type={type}
        />
      )}
      {tenantState.open && (
        <Select
          options={[{ label: 'Amura', value: 'amura' }]}
          noSendAPI={true}
          values={tenantState.tenantId}
          setValues={(tenantId: any) => {
            setTenantId(tenantId);
            setTenantState((pre) => ({ ...pre, open: false, tenantId }));
          }}
          optionsType={'radio'}
          isToken={false}
          parentProps={props}
          postData={storeData}
          optionsTypeReverse={true}
          onSelectClose={() => {
            setTenantState((pre) => ({ ...pre, open: false, tenantId: '' }));
          }}
          Icontype="tenant"
          headerTitle={'Select a tenant'}
        />
      )}
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
      messages.push(message.isVisible && <RightMessage message={message} handleReDo={handleReDo} sessions={sessions} />);
      return messages;
    }
  });
};
