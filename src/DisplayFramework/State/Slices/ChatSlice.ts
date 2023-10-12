import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat } from '../../../Components/PanelComponents/Chat/Chat.types';

const ChatSlice = createSlice({
  name: 'Chat',
  initialState: {
    socketConnection: false,
    webSocket: null,
    loggedInUser: '',
    currentChannel: '',
    chatId: '',
    channelMessagesList: {
      ChannelId: '',
      PatientId: '',
      noMoreMessages: true,
      Messages: [],
      lastMessage: {},
      unreadMessagesCount: 0,
      unreadMessageTimestamp: 0,
    },
    lastMessageInChannels: {} as any,
    userslist: [],
    chatContainerRef: null,
  },
  reducers: {
    setChannelMessagesList: (state, action: PayloadAction<IChat>) => {
      state.channelMessagesList = action.payload as any;
    },
    setUsersList: (state, action: PayloadAction<any[]>) => {
      state.userslist = action.payload as any;
    },
    setLoggedInId: (state, action: PayloadAction<string>) => {
      state.loggedInUser = action.payload;
    },
    setCurrentChannel: (state, action: PayloadAction<string>) => {
      state.currentChannel = action.payload;
    },
    setSocketConnection: (state, action: PayloadAction<boolean>) => {
      state.socketConnection = action.payload;
    },
    setWebSocket: (state, action: PayloadAction<WebSocket>) => {
      state.webSocket = action.payload as any;
    },
    setLastMessageInChannels: (state, action: PayloadAction<any>) => {
      state.lastMessageInChannels = action.payload;
    },
    setUnreadMessagesCount: (state, action: PayloadAction<number>) => {
      state.channelMessagesList.unreadMessagesCount = action.payload;
    },
    setChatContainerRef: (state, action: PayloadAction<React.LegacyRef<HTMLDivElement>>) => {
      state.chatContainerRef = action.payload;
    },
  },
});
export const {
  setSocketConnection,
  setWebSocket,
  setChannelMessagesList,
  setUsersList,
  setLoggedInId,
  setLastMessageInChannels,
  setCurrentChannel,
  setUnreadMessagesCount,
  setChatContainerRef,
} = ChatSlice.actions;
export default ChatSlice.reducer;
