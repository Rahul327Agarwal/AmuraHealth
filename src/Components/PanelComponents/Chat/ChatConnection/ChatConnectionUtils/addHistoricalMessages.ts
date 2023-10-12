import { Dispatch } from 'react';
import { setChannelMessagesList } from './../../../../../DisplayFramework/State/Slices/ChatSlice';
import { userAddedMessageConstruct } from '../../Chat.functions';
import { globalChannelVariables, IFormattedMessage, IMessage } from '../../Chat.types';
import { getLastMessage } from '../../ChatUtils/chatUtils';
import axios from 'axios';
import { convertToMessageStructure } from '../../ChatUtils/chatServices';
import { PMS_S3 } from '../../../../../Utils';

export const addHistoricalMessages = async (Messages: any, channelId: string, dispatch: Dispatch<any>) => {
  if (Messages) {
    let allMsgs = Messages;
    let messages = [];
    for (const msg of allMsgs) {
      let formattedMsg = await convertToMessageStructure(msg);
      messages.push(formattedMsg);
    }

    addHistoricalMessagesToChat(channelId, messages, messages.length, dispatch);
  }
};

const addHistoricalMessagesToChat = (
  channelId: string,
  receivedMessages: Array<IMessage>,
  noOfMessages: number,
  dispatch: Dispatch<any>
) => {
  let messagesList = JSON.parse(JSON.stringify(globalChannelVariables.channelsMessagesList));
  receivedMessages = receivedMessages
    .map((message) => {
      return message.SenderId === 'sysuser' ? userAddedMessageConstruct(message) : message;
    })
    .filter((message) => message);
  messagesList = {
    ChannelId: channelId,
    PatientId: globalChannelVariables.patientId,
    noMoreMessages: false,
    Messages: [...(messagesList?.Messages || []), ...receivedMessages],
    lastMessage: getLastMessage(receivedMessages, globalChannelVariables.patientId, globalChannelVariables.chatUserId),
    unreadMessagesCount: globalChannelVariables.channelsMessagesList.unreadMessagesCount,
    unreadMessageTimestamp: 0,
  };
  globalChannelVariables.channelsMessagesList = messagesList;
  dispatch(setChannelMessagesList(messagesList));
  globalChannelVariables.loading = false;
  if (receivedMessages.length === 0) {
    globalChannelVariables.hasNext = false;
  }
};

export const getRecentMessages = (channelId: string, dispatch: any, props: any) => {
  globalChannelVariables.loading = true;
  globalChannelVariables.initialLoadMessages = true;
  let payload = PMS_S3.encryptData({
    EventName: 'chat-message-room-read-recent',
    RoomId: channelId,
    UserName: props.sessions.user.id,
  });
  axios
    .post(`${import.meta.env.VITE_ROCKET_CHAT}messageReader`, payload, {
      headers: { Authorization: `Bearer ${props.sessions.id_token}` },
    })
    .then((response: any) => {
      if (!response?.data?.Error && response?.data?.Message) {
        addHistoricalMessages(response.data.Message, channelId, dispatch);
      }
    });
};

export const getHistoryMessages = (channelId: string, dispatch: any, sessions: any) => {
  globalChannelVariables.loading = true;
  globalChannelVariables.loadedMoreMessages = true;
  let payload: any = {
    EventName: 'chat-message-room-read-history',
    RoomId: channelId,
    UserName: sessions.user.id,
  };
  if (globalChannelVariables.pageNumber >= 0) {
    globalChannelVariables.pageNumber -= 1;
    payload = { ...payload, PageNumber: globalChannelVariables.pageNumber };
  }
  if (globalChannelVariables.pageNumber === 0) globalChannelVariables.hasNext = false;
  payload = PMS_S3.encryptData(payload);
  axios
    .post(`${import.meta.env.VITE_ROCKET_CHAT}historicalMessageReader`, payload, {
      headers: { Authorization: `Bearer ${sessions.id_token}` },
    })
    .then((response: any) => {
      if (!response?.data?.Error && response?.data?.Message?.Messages) {
        if (response.data.Message.PageNumber && globalChannelVariables.pageNumber < 0)
          globalChannelVariables.pageNumber = response.data.Message.PageNumber;
        addHistoricalMessages(response.data.Message.Messages, channelId, dispatch);
      }
    });
};
