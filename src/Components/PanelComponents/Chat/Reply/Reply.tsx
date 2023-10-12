import React from 'react';
import { IProps } from './Reply.types';
import { useStyles } from './Reply.styles';
import ReplyPopUp from '../ChatItem/ReplyPopUp';
import { PMS_LOCALE } from '../../../../Utils';
import { CloseIcon } from '../../../SVGs/Common';
export default function Reply(props: IProps) {
  const {
    replyingMessage,
    setShowReplyingMessage,
    usersInTheChannel,
    searchIndices,
    currentSearchIndex,
    hightLightSearch,
    colorsForUsername,
    replyingMessageIndex,
    allUsers,
    sessions,
  } = props;
  const { classes } = useStyles();
  const closeIcon = (
    <CloseIcon
      className={classes.largeCloseIcon}
      onClick={() => {
        setShowReplyingMessage(false);
      }}
    />
  );

  return (
    <div style={{ width: '100%' }}>
      <div className={classes.replyTo} title={`Reply to`}>
        {PMS_LOCALE.translate(`Reply to`)}
      </div>
      <div style={{ textAlign: 'end', marginRight: '10px' }}>{closeIcon}</div>
      <div>
        <ReplyPopUp
          replyingMessageIndex={replyingMessageIndex}
          message={replyingMessage}
          usersInTheChannel={usersInTheChannel}
          users={allUsers}
          searchIndices={searchIndices}
          currentSearchIndex={currentSearchIndex}
          hightLightSearch={hightLightSearch}
          colorsForUsername={colorsForUsername}
          sessions={sessions}
        />
      </div>
    </div>
  );
}
