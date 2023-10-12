import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalChannelVariables, IChatProps } from '../Chat.types';
import { setUsersList } from '../../../../DisplayFramework/State/Slices/ChatSlice';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { connectToWebSocket } from './ChatConnection.functions';
import { isWebSocketOpen } from '../ChatUtils/validations';
import { getAllUsers } from '../ChatUtils/chatServices';

export default function ChatConnection(props: IChatProps) {
  const dispatch = useDispatch();
  let chatDetails = useSelector((state: IRootState) => state.chat);
  const { sessions, registerEvent, unRegisterEvent } = props;
  const [sessionUserId, setSessionUserId] = useState('');
  const [webSocketId, setWebSocketId] = useState(0);
  const ws = useRef(null);
  let myListSubscription: any;
  useEffect(() => {
    if (sessions?.user?.id) {
      setSessionUserId(sessions.user.id);
    }
  }, [sessions]);
  useEffect(() => {
    if (!chatDetails.socketConnection && webSocketId === globalChannelVariables.webSocketInstanceId && sessionUserId) {
      globalChannelVariables.webSocketInstanceId = 0;
      // connectToWebSocket(ws, dispatch, setWebSocketId, props);
    }
  }, [webSocketId, sessionUserId]);

  useEffect(() => {
    if (sessionUserId) {
      globalChannelVariables.chatUserId = sessions.user.id;
      getAllUsers(props.sessions.id_token).then((res) => {
        globalChannelVariables.usersList = JSON.parse(JSON.stringify(res));
        dispatch(setUsersList(res));
      });
      myListSubscription = registerEvent(props.sessions.user.id, 'pms-ql-mylist', () => {
        getAllUsers(props.sessions.id_token).then((res) => {
          globalChannelVariables.usersList = JSON.parse(JSON.stringify(res));
          dispatch(setUsersList(res));
        });
      });
    }
  }, [sessionUserId]);
  /*<----------------Rocket Chat Functions End------------------------->*/
  return <div style={{ width: '0px', height: '0px' }}></div>;
}
