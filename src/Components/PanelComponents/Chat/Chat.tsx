import React, { useEffect, useRef, useState } from 'react';
import 'react-chat-elements/dist/main.css';
import { useDispatch, useSelector } from 'react-redux';
import { PMS_LOCALE } from '../../../Utils';
import { IRootState } from './../../../DisplayFramework/State/store';
import { constructMessagesBody, scrollToBottom, sendAttachmentAPI } from './Chat.functions';
import { useStyles } from './Chat.styles';
import {
  IComponentMessage,
  IMessage,
  IProps,
  emptyComponentMessage,
  globalChannelVariables,
  initialMessageObject,
} from './Chat.types';
import ChatMessageInput from './ChatMessageInput';
import { getUserNameById, nFormatter } from './../../../Common/Common.functions';
import { setUnreadMessagesCount, setUsersList } from './../../../DisplayFramework/State/Slices/ChatSlice';
import { getHistoryMessages, getRecentMessages } from './ChatConnection/ChatConnectionUtils/addHistoricalMessages';
import ChatItem from './ChatItem/ChatItem';
import { handleSearch } from './ChatUtils/chatComponentUtils';
import { getAllUsers, getStaff, sendMessageAPI } from './ChatUtils/chatServices';
import {
  convertingMessageToMessageStructure,
  getChatItemType,
  getStaffDetails,
  getUserNames,
  getValueFromNextMessage,
} from './ChatUtils/chatUtils';
import {
  canUserAddAttachments,
  canUserSendNormalMessage,
  isConfirmDisabled,
  showConfirm,
  startsWithTag,
} from './ChatUtils/validations';
import Reply from './Reply/Reply';
import { confirmSelection } from './SurveyComponents/SurveyComponents.functions';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';
import { AttachIcon, ChatSend, DisabledChatSend, ScrollDownIcon } from '../../SVGs/Common';
import { markMessages } from './ChatConnection/ChatConnectionUtils/markMessages';
import { ChatScrollArea } from './ChatScrollArea';
import { ChatScrollAreaApi } from './ChatScrollArea/ChatScrollArea.types';

function Chat(props: IProps) {
  const dropZoneRef = useRef(null);
  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const { selectedClient, sessions, key, registerEvent } = props;
  const dispatch = useDispatch();
  const userProfile = useSelector((state: IRootState) => state.displayFrameWork.userProfile);
  let messageRef: any = useRef(null);
  const chatDetails = useSelector((state: IRootState) => state.chat);
  const allUserList = useSelector((state: IRootState) => state.chat.userslist);
  const [channelDetails, setChannelDetails]: any = useState(null);
  const [usersInTheChannel, setUsersIntheChannel]: any = useState([]);
  const [usersForSuggestions, setUsersForSuggestion]: any = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [colorsForUsername, setColorsForUsername]: any = useState({});
  const [messageList, setMessageList] = useState([]);
  const [noChannel, setNoChannel] = useState(false);
  const [fetchedAllMsgs, setFetchAllMessages] = useState('Load more');
  const [messagesComponent, setMessagesComponent] = useState([]);
  const [surveyInput, setSurveyInput] = useState(null);
  const [messageId, setMessageId] = useState(0);
  const lastScrollDistanceToBottomRef = React.useRef<number>();
  const previousScrollTop = React.useRef<number>();
  const [showReplyingMessage, setShowReplyingMessage] = useState(false);
  const [replyingMessage, setReplyingMessage] = useState<IComponentMessage>(emptyComponentMessage);
  const [replyingMessageIndex, setReplyingMessageIndex] = useState('');
  const [showScrollDownIcon, setShowScrollDownIcon] = useState(false);
  const [messageToBeSent, setMessageToBeSent] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [hightLightSearch, setHighLightSearch] = useState('');
  const [searchIndices, setSearchIndices] = useState([]);
  const [files, setFiles] = useState([]);
  const [_rerenderFlag, setRerenderFlag] = useState(0);
  const [scrollDrownBadgeCount, setScrollDownBadgeCount] = useState(0);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(-1);
  let scrollApi: ChatScrollAreaApi;
  const reversedItems = React.useMemo(() => [...messagesComponent], [messagesComponent]);
  useEffect(() => {
    lastScrollDistanceToBottomRef.current = 0;
  }, [selectedClient]);
  const apiRef = (e: ChatScrollAreaApi) => {
    if (
      !scrollApi &&
      !globalChannelVariables.isNewMessageFromAnotherUser &&
      !globalChannelVariables.loadedMoreMessages &&
      !globalChannelVariables.initialLoadMessages &&
      !globalChannelVariables.scrollToBottom &&
      !openSearch
    ) {
      e.scrollToBottom();
    }
    scrollApi = e;
  };

  const resetState = () => {
    setColorsForUsername({});
    setDropZoneIsOpen(false);
    setMessageToBeSent('');
    setFiles([]);
    setRerenderFlag(new Date().getTime());
    setOpenSearch(false);
    setCurrentSearchIndex(-1);
    setSearchIndices([]);
    setSearchInput('');
    setShowScrollDownIcon(false);
  };
  useEffect(() => {
    if (!globalChannelVariables.isUsersListCalled) {
      getAllUsers(props.sessions.id_token).then((res) => {
        globalChannelVariables.usersList = JSON.parse(JSON.stringify(res));
        dispatch(setUsersList(res));
      });
      globalChannelVariables.isUsersListCalled = true;
    }
  }, []);

  useEffect(() => {
    getStaff(props.selectedClient.client_id, props).then((res) => {
      let usersChannel = getStaffDetails(
        props.selectedClient.tenant_id,
        res,
        chatDetails.userslist,
        sessions.user.id,
        userProfile
      );
      globalChannelVariables.usersInChannel = usersChannel;
      let tempUserSuggestion = usersChannel.map((value: any) => {
        return {
          id: value.id,
          name: getUserNames(value.id, chatDetails.userslist),
        };
      });
      setUsersIntheChannel(tempUserSuggestion);
      usersChannel.map((value: any) => {
        value.name = getUserNameById(value.id, chatDetails.userslist, value.id === sessions.user.id);
      });
      if (userProfile === 'user') {
        usersChannel = usersChannel.filter((value: any) => value.id !== props.sessions.user.id);
      }
      setUsersForSuggestion(usersChannel ?? []);
    });
  }, [chatDetails.userslist]);

  useEffect(() => {
    if (globalChannelVariables.loadedMoreMessages)
      scrollApi.scrollTo(scrollApi.scrollHeight() - (lastScrollDistanceToBottomRef.current || 0));
    globalChannelVariables.loadedMoreMessages = false;
    if (globalChannelVariables.isNewMessageFromAnotherUser) {
      scrollApi.scrollTo(previousScrollTop.current!);
      previousScrollTop.current = scrollApi.scrollTop();
      lastScrollDistanceToBottomRef.current = scrollApi.scrollHeight() - scrollApi.scrollTop();
    }
    globalChannelVariables.isNewMessageFromAnotherUser = false;
    if (globalChannelVariables.scrollToBottom) scrollApi.scrollTo(scrollApi.scrollHeight());
    globalChannelVariables.scrollToBottom = false;
    if (globalChannelVariables.initialLoadMessages) scrollApi.scrollTo(scrollApi.scrollHeight() - 0);
    globalChannelVariables.initialLoadMessages = false;
  }, [reversedItems]);

  useEffect(() => {
    globalChannelVariables.hasNext = true;
  }, [selectedClient]);

  const handleSurveyInput = (value: any, messageTime: number) => {
    setSurveyInput(value);
    setMessageId(messageTime);
  };

  useEffect(() => {
    if (props.selectedClient?.channelId) {
      let messages = chatDetails.channelMessagesList;
      if (globalChannelVariables.channelId !== selectedClient.channelId) {
        setReplyingMessageIndex('');
        setShowReplyingMessage(false);
        setReplyingMessage(emptyComponentMessage);
        globalChannelVariables.newMessageIds = [];
        getRecentMessages(selectedClient.channelId, dispatch, props);
        getStaff(props.selectedClient.client_id, props).then((res) => {
          let usersChannel = getStaffDetails(
            props.selectedClient.tenant_id,
            res,
            chatDetails.userslist,
            sessions.user.id,
            userProfile
          );
          globalChannelVariables.usersInChannel = usersChannel;
          let tempUserSuggestion = usersChannel.map((value: any) => {
            return {
              id: value.id,
              name: getUserNames(value.id, chatDetails.userslist),
            };
          });
          setUsersIntheChannel(tempUserSuggestion);
          usersChannel.map((value: any) => {
            value.name = getUserNameById(value.id, chatDetails.userslist, value.id === sessions.user.id);
          });
          setUsersForSuggestion(usersChannel ?? []);
        });
        registerEvent(props.selectedClient.client_id, 'pms-ql-user', () => {
          if (chatDetails.socketConnection && props.selectedClient?.channelId) {
            getStaff(props.selectedClient.client_id, props).then((res) => {
              let usersChannel = getStaffDetails(
                props.selectedClient.tenant_id,
                res,
                chatDetails.userslist,
                sessions.user.id,
                userProfile
              );
              globalChannelVariables.usersInChannel = usersChannel;
              let tempUserSuggestion = usersChannel.map((value: any) => {
                return {
                  id: value.id,
                  name: getUserNames(value.id, chatDetails.userslist),
                };
              });
              setUsersIntheChannel(tempUserSuggestion);
              usersChannel.map((value: any) => {
                value.name = getUserNameById(value.id, chatDetails.userslist, value.id === sessions.user.id);
              });
              setUsersForSuggestion(usersChannel ?? []);
            });
          }
        });
        globalChannelVariables.channelId = selectedClient.channelId;
        globalChannelVariables.patientId = selectedClient.client_id;
        globalChannelVariables.pageNumber = -1;
        globalChannelVariables.markedMessage = [];
        resetState();
      }
      setChannelDetails(messages);
      if (messages?.Messages && messages.Messages.length > 0) {
        !globalChannelVariables.hasNext ? setFetchAllMessages('') : setFetchAllMessages('Load more');
        let messageArray = JSON.parse(JSON.stringify(messages.Messages));
        messageArray.sort((a: IMessage, b: IMessage) => a.ReceivedTime - b.ReceivedTime);
        setMessageList(messageArray);
      } else {
        setMessageList([]);
      }
      setNoChannel(false);
    }
    if (!chatDetails.socketConnection || !props.selectedClient?.channelId) {
      setMessageList([]);
      setNoChannel(true);
      setUsersForSuggestion([]);
      globalChannelVariables.channelsMessagesList = initialMessageObject;
      globalChannelVariables.pageNumber = -1;
      resetState();
    }
  }, [props, chatDetails]);

  const sendMessage = () => {
    let payload: any = convertingMessageToMessageStructure(
      props,
      messageToBeSent,
      usersForSuggestions,
      userProfile,
      replyingMessageIndex,
      replyingMessage,
      showReplyingMessage
    );
    sendMessageAPI(panelId, props, payload, false);
    setMessageToBeSent('');
    setShowReplyingMessage(false);
    setReplyingMessageIndex('');
    setReplyingMessage(emptyComponentMessage);
  };
  const [dropZoneIsOpen, setDropZoneIsOpen] = useState(false);
  const openDropZone = () => {
    if (dropZoneIsOpen) {
      setFiles([]);
      setRerenderFlag(new Date().getTime());
    }
    setDropZoneIsOpen(true);
  };

  useEffect(() => {
    if (startsWithTag(messageToBeSent)) {
      let stringAfterTag = messageToBeSent.split('@').pop();
      setHighlightIndex(0);
      if (stringAfterTag) {
        let tempUser = usersForSuggestions.filter(
          (user: any) => user.name.toLocaleLowerCase().indexOf(stringAfterTag!.toLocaleLowerCase()) > -1
        );
        setShowSuggestions(tempUser.length > 0);
        setSuggestedUsers(tempUser);
      } else {
        setShowSuggestions(usersForSuggestions.length > 0);
        setSuggestedUsers(usersForSuggestions);
      }
      return;
    }
    setShowSuggestions(false);
    return;
  }, [messageToBeSent]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropZoneRef.current && !(dropZoneRef.current as any).contains(event.target) && files.length === 0) {
        setDropZoneIsOpen(false);
        setFiles([]);
        setRerenderFlag(new Date().getTime());
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropZoneRef]);

  useEffect(() => {
    let componentMessages = constructMessagesBody(
      props,
      messageList,
      fetchedAllMsgs,
      channelDetails,
      colorsForUsername,
      setColorsForUsername,
      allUserList,
      true,
      dispatch
    );
    setMessagesComponent(componentMessages.messages as any);
    if (componentMessages.unreadMessageIDs.length > 0) {
      let unMarkedMessageIds = JSON.parse(JSON.stringify(globalChannelVariables.markedMessage));
      let notMarkedId = componentMessages.unreadMessageIDs.filter((id: string) => {
        let idPresent = !globalChannelVariables.markedMessage.includes(id);
        if (idPresent) {
          unMarkedMessageIds.push(id);
        }
        return idPresent;
      });
      globalChannelVariables.markedMessage = unMarkedMessageIds;
      dispatch(setUnreadMessagesCount(componentMessages.unreadMessageIDs.length));
      if (notMarkedId.length > 0) {
        markMessages(selectedClient.channelId, notMarkedId, props);
      }
    } else {
      dispatch(setUnreadMessagesCount(0));
    }
    if (globalChannelVariables?.newMessageIds?.length > 0) {
      setScrollDownBadgeCount(globalChannelVariables.newMessageIds.length);
    }
    if (componentMessages.messages.length > messageList.length && searchInput.length > 2) {
      handleSearch(
        searchInput,
        componentMessages.messages,
        currentSearchIndex,
        setCurrentSearchIndex,
        setSearchInput,
        searchIndices,
        setSearchIndices,
        setHighLightSearch
      );
    }
  }, [messageList, allUserList]);
  return (
    <div className={classes.chatComponent} key={key}>
      <div className={classes.headerContainer}></div>
      <div className={classes.chatBody}>
        <ChatScrollArea
          previousScrollTop={previousScrollTop}
          setPreviousScrollTop={(distanceFromBottom: number) => {
            previousScrollTop.current = distanceFromBottom;
          }}
          lastScrollDistanceToBottomRef={lastScrollDistanceToBottomRef}
          setLastScrollDistanceToBottomRef={(distanceFromBottom: number) => {
            lastScrollDistanceToBottomRef.current = distanceFromBottom;
          }}
          loadOldMessagesThreshold={30}
          onLoadOldMessages={() => {
            getHistoryMessages(globalChannelVariables.channelId, dispatch, props.sessions);
          }}
          apiRef={apiRef}
          setShowScrollDownIcon={setShowScrollDownIcon}
          sessions={props.sessions}
        >
          {(messagesComponent as any).map((message: IComponentMessage, index: number) =>
            message.Visibility ? (
              <ChatItem
                key={message.MessageId}
                messageRef={messageRef}
                allUsers={allUserList}
                message={message}
                messageList={messagesComponent}
                itemType={getChatItemType(message)}
                index={index}
                fetchedAllMsgs={fetchedAllMsgs}
                getHistoryMessages={getHistoryMessages}
                usersInTheChannel={usersInTheChannel}
                searchIndices={searchIndices}
                currentSearchIndex={currentSearchIndex}
                hightLightSearch={hightLightSearch}
                channelId={selectedClient.channelId}
                colorsForUsername={colorsForUsername}
                showConfirm={showConfirm(index, messagesComponent, message)}
                selectedOption={getValueFromNextMessage(index, messagesComponent)}
                disableConfirm={isConfirmDisabled(surveyInput)}
                handleSurveyInput={handleSurveyInput}
                confirmSelection={() => {
                  confirmSelection(panelId, props, messageId, messageList, surveyInput);
                }}
                setReplyingMessageIndex={setReplyingMessageIndex}
                setReplyingMessage={setReplyingMessage}
                setShowReplyingMessage={setShowReplyingMessage}
                sessions={sessions}
                scrollDrownBadgeCount={scrollDrownBadgeCount}
                setScrollDownBadgeCount={setScrollDownBadgeCount}
              />
            ) : null
          )}
          <div className={classes.chatBodyTop}>
            {noChannel ? (
              <div className={classes.fullWidthHeight}>
                <span className={classes.noConditions} title={'Please try again later!'}>
                  {PMS_LOCALE.translate('Please try again later!')}
                </span>
              </div>
            ) : (
              <></>
            )}
          </div>
        </ChatScrollArea>
      </div>
      {files.length === 0 ? <div className={`${classes.chatAttachments}`} ref={dropZoneRef}></div> : null}
      {showReplyingMessage ? (
        <div className={`${classes.chatSuggestions}`}>
          <Reply
            replyingMessage={replyingMessage}
            allUsers={allUserList}
            setShowReplyingMessage={setShowReplyingMessage}
            replyingMessageIndex={replyingMessageIndex}
            usersInTheChannel={usersInTheChannel}
            searchIndices={searchIndices}
            currentSearchIndex={currentSearchIndex}
            hightLightSearch={hightLightSearch}
            colorsForUsername={colorsForUsername}
            sessions={sessions}
          />
        </div>
      ) : null}
      {showSuggestions ? <div className={`${classes.chatSuggestions}`}></div> : null}
      {showScrollDownIcon && !noChannel ? (
        <div className={`${classes.chatScroll}`}>
          <span
            className={classes.scrollIcon}
            onClick={() => {
              setCurrentSearchIndex(searchIndices.length > 0 ? searchIndices.length : -1);
              scrollToBottom('chat-body-messages');
            }}
          >
            {scrollDrownBadgeCount ? (
              <div className={classes.unreadMessagesBadge}>
                {nFormatter(scrollDrownBadgeCount > 9999 ? 9999 : scrollDrownBadgeCount, 0)}
              </div>
            ) : null}
            {<ScrollDownIcon />}
          </span>
        </div>
      ) : null}
      <div className={classes.chatFooter}>
        {files.length > 0 ? <div className={`${classes.bottomZero}`}></div> : null}
        <div className={classes.chatFooterFlex}>
          <ChatMessageInput
            messageRef={messageRef}
            isInputFromFileUpload={false}
            placeHolder="Type your message"
            value={messageToBeSent}
            onChange={(e: string) => {
              setMessageToBeSent(e);
            }}
            suggestedUser={suggestedUsers}
            setSuggestionOpen={setShowSuggestions}
            highlightedIndex={highlightIndex}
            setHighlightedIndex={setHighlightIndex}
            suggestionOpened={showSuggestions}
            onHitEnter={() => {
              if (
                canUserSendNormalMessage(noChannel, chatDetails.socketConnection, messageToBeSent, messagesComponent, userProfile)
              ) {
                sendMessage();
              }
            }}
          />
          <span
            className={classes.spanCenter}
            onClick={() => {
              if (canUserAddAttachments(noChannel, chatDetails.socketConnection, messagesComponent)) {
                openDropZone();
              }
            }}
          >
            <span
              className={`${classes.attachmentIcon} ${
                !dropZoneIsOpen || !canUserAddAttachments(noChannel, chatDetails.socketConnection, messagesComponent)
                  ? classes.attachDisable
                  : ''
              }`}
            >
              {<AttachIcon />}
            </span>
          </span>
          <span
            className={`${classes.sendIcon}`}
            onClick={() => {
              if (
                canUserSendNormalMessage(noChannel, chatDetails.socketConnection, messageToBeSent, messagesComponent, userProfile)
              ) {
                sendMessage();
              }
            }}
          >
            {!canUserSendNormalMessage(
              noChannel,
              chatDetails.socketConnection,
              messageToBeSent,
              messagesComponent,
              userProfile
            ) ? (
              <DisabledChatSend />
            ) : (
              <ChatSend />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Chat);
