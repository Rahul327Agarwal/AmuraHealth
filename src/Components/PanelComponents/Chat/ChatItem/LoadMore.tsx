import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { List, ListItem } from "../../Common/ChatComponents/ConstantComponents";
import { nFormatter } from './../../../../Common/Common.functions';
import useOnScreen from './../../../../Common/IntersectionObserver';
import { IRootState } from './../../../../DisplayFramework/State/store';
import { useStyles } from '../Chat.styles';
import { globalChannelVariables, IComponentMessage } from '../Chat.types';

interface IProps {
  index: number;
  fetchedAllMsgs: string;
  message: IComponentMessage;
  getHistoryMessages: Function;
  sessions: any;
  channelId: string;
  scrollDrownBadgeCount: number;
}

export default function LoadMore(props: IProps) {
  const ref = useRef();
  const isVisible = useOnScreen(ref);
  const { classes } = useStyles();
  const { index, fetchedAllMsgs, message, getHistoryMessages, channelId, scrollDrownBadgeCount } = props;
  const chatDetails = useSelector((state: IRootState) => state.chat);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isVisible) {
      getHistoryMessages(channelId, dispatch, props.sessions);
    }
  }, [isVisible]);
  return (
    <>
      {globalChannelVariables.hasNext && message.Message !== 'unread messages' ? (
        // TODO: <ListItem key={`message-${index}`} ref={ref}>
        <div className={classes.dayDiv} id={`message-${index}`}>
          <div></div>
          <span
            className={`${classes.daySpan} ${message.Message === 'Load more' ? classes.loadMoreSpan : ''}`}
            onClick={() => {
              if (message.Message === 'Load more') {
                getHistoryMessages(channelId, dispatch, props.sessions);
              }
            }}
          >
            {message.Message}
          </span>
          <div></div>
        </div>
      ) : // </ListItem>
      null}
      {message.Message === 'unread messages' && chatDetails.channelMessagesList.unreadMessagesCount ? (
        //TODO: <ListItem key={`message-${index}`} ref={ref}>
        <div className={`${classes.dayDiv} ${classes.unreadMessages}`} id={`message-${index}`}>
          <div></div>
          <span className={`${classes.daySpan}`}>{`${nFormatter(
            chatDetails.channelMessagesList.unreadMessagesCount > 9999
              ? 9999
              : chatDetails.channelMessagesList.unreadMessagesCount,
            0
          )} ${message.Message}`}</span>
          <div></div>
        </div>
      ) : // </ListItem>
      null}

      {!globalChannelVariables.hasNext && message.Message !== 'unread messages' ? (
        // TODO: <ListItem key={`message-${index}`} ref={ref}>
        <div className={classes.dayDiv} id={`message-${index}`}>
          <div></div>
          <span className={`${classes.daySpan}`}>{message.Message}</span>
          <div></div>
        </div>
      ) : // </ListItem>
      null}
    </>
  );
}
