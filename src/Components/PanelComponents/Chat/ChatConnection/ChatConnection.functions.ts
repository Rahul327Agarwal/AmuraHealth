import { Dispatch } from 'react';
import { setSocketConnection, setWebSocket } from './../../../../DisplayFramework/State/Slices/ChatSlice';
import { globalChannelVariables, IChatProps } from '../Chat.types';
import { IsJsonString } from '../ChatUtils/validations';
import { addHistoricalMessages, getRecentMessages } from './ChatConnectionUtils/addHistoricalMessages';
import { receiveNewMessage } from './ChatConnectionUtils/receiveNewMessage';
import { reconnect } from './ChatConnectionUtils/reconnect';
import axios from 'axios';
import { PMS_S3 } from '../../../../Utils';

export const connectToWebSocket = (
  ws: React.MutableRefObject<any>,
  dispatch: Dispatch<any>,
  setWebSocketId: Function,
  props: IChatProps
) => {
  globalChannelVariables.socketConnection = true;
  ws.current = new WebSocket(import.meta.env.VITE_ROCKET_CHAT_SOCKET!);
  dispatch(setWebSocket(ws.current));
  ws.current.onopen = (e: any) => {
    clearInterval(globalChannelVariables.reconnectinterval);
    clearInterval(globalChannelVariables.checkNetworkInterval);
    ws.current.send(
      JSON.stringify(
        PMS_S3.encryptData({
          EventName: 'Register',
          UserName: `${props.sessions.user.id}`,
        })
      )
    );
    // globalChannelVariables.checkNetworkInterval = setInterval(() => {
    //   axios.get(import.meta.env.VITE_TEST_NETWORK, { headers: { 'Cache-Control': 'no-cache' } }).catch((err) => {
    //     ws.current.close();
    //   });
    // }, 10000);
    globalChannelVariables.pingInterval = setInterval(() => {
      if (ws?.current?.readyState === ws?.current?.OPEN) {
        ws.current.send(
          JSON.stringify(
            PMS_S3.encryptData({
              EventName: 'PingPong',
              Message: 'Ping',
            })
          )
        );
      }
    }, 2700000);
    return;
  };
  ws.current.onclose = (e: any) => {
    clearInterval(globalChannelVariables.pingInterval);
    dispatch(setSocketConnection(false));
    globalChannelVariables.socketConnection = false;
    // globalChannelVariables.reconnectinterval = setInterval(() => {
    //   reconnect(ws, dispatch, setWebSocketId);
    // }, 10000);
    return;
  };
  ws.current.onerror = (e: any) => {
    clearInterval(globalChannelVariables.reconnectinterval);
    clearInterval(globalChannelVariables.checkNetworkInterval);
    ws.current.close();
    return;
  };
  ws.current.onmessage = function (e: any) {
    let response = IsJsonString(e.data) ? JSON.parse(e.data) : e.data;
    if ((response.Status && response.Status === 'Success') || e.data.indexOf('Success') > -1) {
      dispatch(setSocketConnection(true));
      if (props?.selectedClient?.channelId) getRecentMessages(props.selectedClient.channelId, dispatch, props);
      return;
    }
    if (response.EventName === 'Broadcast') {
      receiveNewMessage(response, dispatch);
      return;
    }
  };
};
