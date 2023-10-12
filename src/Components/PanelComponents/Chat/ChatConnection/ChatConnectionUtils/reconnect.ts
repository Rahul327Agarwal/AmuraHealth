import { Dispatch } from 'react';
import { setChannelMessagesList, setSocketConnection } from './../../../../../DisplayFramework/State/Slices/ChatSlice';
import { globalChannelVariables, initialMessageObject } from '../../Chat.types';
import axios from 'axios';

export const reconnect = (ws: React.MutableRefObject<any>, dispatch: Dispatch<any>, setWebSocketId: Function) => {
  // if (ws?.current?.readyState === ws?.current?.OPEN) {
  //   ws.current.send(JSON.stringify({ msg: "pong" }));
  // }
  // if (!globalChannelVariables.socketConnection) {
  //   axios.get(import.meta.env.VITE_TEST_NETWORK).then((res) => {
  //     defaultReduxChatVariables(dispatch);
  //     defaultGlobalChatVaribles();
  //     setWebSocketId(globalChannelVariables.webSocketInstanceId);
  //   }).catch((err) => {
  //   });
  // }
};

const defaultReduxChatVariables = (dispatch: Dispatch<any>) => {
  dispatch(setSocketConnection(null));
  dispatch(setChannelMessagesList(initialMessageObject));
  globalChannelVariables.pageNumber = -1;
};

const defaultGlobalChatVaribles = () => {
  globalChannelVariables.channelsMessagesList = [];
  globalChannelVariables.webSocketInstanceId = new Date().getTime();
};
