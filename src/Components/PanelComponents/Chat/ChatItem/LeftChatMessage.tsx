import React, { useEffect, useRef } from 'react';
// import { List, ListItem } from "../../Common/ChatComponents/ConstantComponents";
import { removeExtentionFromFileName, splitTaggedPersonFromMessage } from '../Chat.functions';
import { useStyles } from '../Chat.styles';
import { globalChannelVariables, IComponentMessage } from '../Chat.types';
import { Avatar } from '@mui/material';
import SurveyComponents from '../SurveyComponents/SurveyComponents';
import ReadMore from './ReadMore';
import { getAttachmentAPI } from '../ChatUtils/chatServices';
import { get12HourTime, getFileExtention } from '../ChatUtils/chatUtils';
import { isMeCallout, isTeamCallout } from '../ChatUtils/validations';
import useOnScreen from './../../../../Common/IntersectionObserver';
import ReplyPopUp from './ReplyPopUp';
import { PMS_LOCALE } from '../../../../Utils';
import { DownloadIconInChat } from '../../../SVGs/Common';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
interface IProps {
  index: number;
  message: IComponentMessage;
  channelId: string;
  usersInTheChannel: Array<any>;
  searchIndices: Array<any>;
  currentSearchIndex: number;
  hightLightSearch: string;
  colorsForUsername: any;
  showConfirm: boolean;
  selectedOption: any;
  disableConfirm: any;
  handleSurveyInput: Function;
  confirmSelection: Function;
  setReplyingMessageIndex: Function;
  setReplyingMessage: Function;
  setShowReplyingMessage: Function;
  sessions: any;
  setScrollDownBadgeCount: Function;
  allUsers: Array<any>;
  messageRef: any;
}
export default function LeftChatMessage(props: IProps) {
  const {
    messageRef,
    index,
    message,
    channelId,
    usersInTheChannel,
    searchIndices,
    currentSearchIndex,
    hightLightSearch,
    colorsForUsername,
    showConfirm,
    selectedOption,
    disableConfirm,
    handleSurveyInput,
    confirmSelection,
    setReplyingMessageIndex,
    setReplyingMessage,
    setShowReplyingMessage,
    setScrollDownBadgeCount,
    allUsers,
  } = props;
  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const ref = useRef();
  const isVisible = useOnScreen(ref);
  useEffect(() => {
    if (isVisible && message.MessageId && globalChannelVariables.newMessageIds.find((value) => value === message.MessageId)) {
      let newIds = JSON.parse(JSON.stringify(globalChannelVariables.newMessageIds));
      newIds = newIds.filter((value: any) => value !== message.MessageId);
      globalChannelVariables.newMessageIds = newIds;
      setScrollDownBadgeCount(newIds.length);
    }
  }, [isVisible]);
  const highlightText = (message: string, text: string) => {
    var index = message.toLocaleLowerCase().indexOf(text.toLocaleLowerCase());
    if (index >= 0) {
      return (
        <span>
          <span>{message.substring(0, index)}</span>
          <span className={classes.highlight}>{message.substring(index, index + text.length)}</span>
          <span>{message.substring(index + text.length)}</span>
        </span>
      );
    } else {
      return message;
    }
  };
  const taggedMessage = (message: string, users: Array<any>, isPartOfSearch: boolean, highlightSearch: string) => {
    let formattedMessage = splitTaggedPersonFromMessage(message, users);
    return (
      <div>
        <span className={classes.taggedPerson}>
          {isPartOfSearch ? highlightText(formattedMessage[0], highlightSearch) : formattedMessage[0]}
        </span>
        <span>
          {isPartOfSearch ? highlightText(formattedMessage[1], highlightSearch) : <ReadMore message={formattedMessage[1]} />}
        </span>
      </div>
    );
  };
  return (
    //TODO: <ListItem key={message.MessageId || index} ref={ref}>
    <div
      className={`${classes.messageContainer} ${
        searchIndices[currentSearchIndex] === message.MessageId ? classes.searchHighLight : ''
      }`}
      tabIndex={-1}
      id={`message-${message.MessageId || index}`}
    >
      <div className={classes.chatMessage}>
        <div className={classes.chatMessageGrid}>
          {message.ShowAvatar ? (
            <div className={classes.avatarPlaceBottom}>
              <Avatar
                className={classes.avatar}
                style={{
                  backgroundColor: colorsForUsername[message.SenderId],
                }}
              >
                {message.Sender[0]}
              </Avatar>
            </div>
          ) : (
            <div></div>
          )}
          <div
            className={`${classes.chatMessageContent} ${classes.rceMboxLeft} ${
              message.IsFirstMessage ? classes.rceMboxLeftFirst : classes.rceMboxLeftNormal
            }`}
          >
            <div className={classes.paddingDivTop}>
              {message.IsFirstMessage ? (
                <div
                  className={`${classes.rceMboxText} ${classes.chatHead} ${classes.messageSenderText} ${classes.padding7pxL}`}
                  style={{
                    color: colorsForUsername[message.SenderId],
                  }}
                >
                  {message.Sender}
                </div>
              ) : null}
            </div>
            {message.IsReply ? (
              <ReplyPopUp
                replyingMessageIndex={message.ReplyToMessageId}
                message={message.ReplyToMessage}
                usersInTheChannel={usersInTheChannel}
                users={allUsers}
                searchIndices={searchIndices}
                currentSearchIndex={currentSearchIndex}
                hightLightSearch={hightLightSearch}
                colorsForUsername={colorsForUsername}
                sessions={props.sessions}
              />
            ) : null}
            {message?.IsAttachment ? (
              <div
                className={`${classes.rceMboxText} right ${classes.marginB5} ${classes.messageContent} ${classes.padding7pxL}`}
              >
                <div className={classes.attachmentPreview}>
                  <span
                    className={classes.downloadButton}
                    onClick={() => {
                      getAttachmentAPI(panelId, message.AttachmentURL, props);
                    }}
                  >
                    {<DownloadIconInChat />}
                  </span>
                </div>
                <div className={`${classes.filenameView} ${classes.marginLeft13px}`}>
                  <span className={classes.extentionSpan}>{getFileExtention(message.AttachmentURL).toLocaleUpperCase()}</span>
                  <span className={classes.filename}>{removeExtentionFromFileName(message.AttachmentURL)}</span>
                </div>
              </div>
            ) : null}

            <div className={`${classes.rceMboxText} left  ${classes.marginB5} ${classes.messageContent} ${classes.padding7pxL}`}>
              {message.CalloutTo && !(isTeamCallout(message.CalloutTo) || isMeCallout(message.CalloutTo)) ? (
                taggedMessage(
                  message.Message,
                  usersInTheChannel,
                  searchIndices.indexOf(message.MessageId) > -1 &&
                    currentSearchIndex < searchIndices.length &&
                    currentSearchIndex > -1 &&
                    searchIndices[currentSearchIndex] === message.MessageId,
                  hightLightSearch
                )
              ) : searchIndices.indexOf(message.MessageId) > -1 &&
                currentSearchIndex < searchIndices.length &&
                currentSearchIndex > -1 &&
                searchIndices[currentSearchIndex] === message.MessageId ? (
                highlightText(message.Message, hightLightSearch)
              ) : (
                <ReadMore message={message.Message} />
              )}
            </div>
            {/* {getChatComponentByMessageAndContextType(message, index)} */}
            {message.ContextType && message.ContextType === '@SURVEY' ? (
              <SurveyComponents
                messageType={message.MessageType || ''}
                message={message}
                index={index}
                showConfirm={showConfirm}
                selectedOption={selectedOption}
                disableConfirm={disableConfirm}
                handleSurveyInput={handleSurveyInput}
                confirmSelection={confirmSelection}
              />
            ) : null}
            <div className={classes.paddingDivBottom}>
              <div className={`left non-copiable ${classes.leftAlign}`}>
                <span
                  className={`${isTeamCallout(message.CalloutTo) ? classes.calloutTeam : ''} ${
                    isMeCallout(message.CalloutTo) ? classes.calloutMe : ''
                  }`}
                >
                  {isTeamCallout(message.CalloutTo) || isMeCallout(message.CalloutTo) ? message.CalloutTo : ''}
                </span>
                {get12HourTime(message.ReceivedTime)}
              </div>
            </div>
          </div>
          <div
            className={classes.MessageActions}
            onClick={(e) => {
              e.stopPropagation();
              setReplyingMessage(message);
              setReplyingMessageIndex(message.MessageId);
              setShowReplyingMessage(true);
              if (messageRef.current)
                messageRef.current.focus({
                  preventScroll: true,
                });
            }}
          >
            <span>{PMS_LOCALE.translate(`Reply`)}</span>
          </div>
        </div>
      </div>
    </div>
    // </ListItem>
  );
}
