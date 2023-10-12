import React, { useEffect } from 'react';
import { IProps } from './ChatItem.types';
import LoadMore from './LoadMore';
import Date from './Date';
import RightChatMessage from './RightChatMessage';
import LeftChatMessage from './LeftChatMessage';
import { globalChannelVariables } from '../Chat.types';

export default function ChatItem(props: IProps) {
  const {
    messageRef,
    message,
    itemType,
    index,
    fetchedAllMsgs,
    getHistoryMessages,
    messageList,
    usersInTheChannel,
    searchIndices,
    currentSearchIndex,
    hightLightSearch,
    channelId,
    colorsForUsername,
    showConfirm,
    selectedOption,
    disableConfirm,
    handleSurveyInput,
    confirmSelection,
    setReplyingMessageIndex,
    setReplyingMessage,
    setShowReplyingMessage,
    sessions,
    setScrollDownBadgeCount,
    scrollDrownBadgeCount,
    allUsers,
  } = props;
  useEffect(() => {
    if (messageList.length && fetchedAllMsgs === 'Load more') {
      globalChannelVariables.hasNext = true;
      globalChannelVariables.channelId = channelId;
    } else {
      globalChannelVariables.hasNext = false;
    }
  }, [messageList]);
  return (
    <>
      {itemType === 'Load more' ? (
        <LoadMore
          scrollDrownBadgeCount={scrollDrownBadgeCount}
          message={message}
          index={index}
          fetchedAllMsgs={fetchedAllMsgs}
          getHistoryMessages={getHistoryMessages}
          sessions={sessions}
          channelId={channelId}
        />
      ) : null}
      {itemType === 'Date' ? <Date message={message} index={index} /> : null}
      {itemType === 'message' && message.SentByLoggedInUser && message.Visibility ? (
        <RightChatMessage
          messageRef={messageRef}
          allUsers={allUsers}
          setScrollDownBadgeCount={setScrollDownBadgeCount}
          sessions={sessions}
          index={index}
          message={message}
          channelId={channelId}
          usersInTheChannel={usersInTheChannel}
          searchIndices={searchIndices}
          currentSearchIndex={currentSearchIndex}
          hightLightSearch={hightLightSearch}
          setReplyingMessageIndex={setReplyingMessageIndex}
          setReplyingMessage={setReplyingMessage}
          setShowReplyingMessage={setShowReplyingMessage}
          colorsForUsername={colorsForUsername}
        />
      ) : null}
      {itemType === 'message' && !message.SentByLoggedInUser && message.Visibility ? (
        <LeftChatMessage
          messageRef={messageRef}
          allUsers={allUsers}
          setScrollDownBadgeCount={setScrollDownBadgeCount}
          sessions={sessions}
          index={index}
          message={message}
          channelId={channelId}
          usersInTheChannel={usersInTheChannel}
          searchIndices={searchIndices}
          currentSearchIndex={currentSearchIndex}
          hightLightSearch={hightLightSearch}
          colorsForUsername={colorsForUsername}
          showConfirm={showConfirm}
          selectedOption={selectedOption}
          disableConfirm={disableConfirm}
          handleSurveyInput={handleSurveyInput}
          confirmSelection={confirmSelection}
          setReplyingMessageIndex={setReplyingMessageIndex}
          setReplyingMessage={setReplyingMessage}
          setShowReplyingMessage={setShowReplyingMessage}
        />
      ) : null}
    </>
  );
}
