import { Dispatch } from 'react';
import { setChannelMessagesList, setLastMessageInChannels } from './../../../../../DisplayFramework/State/Slices/ChatSlice';
import { userAddedMessageConstruct } from '../../Chat.functions';
import { globalChannelVariables, IMessage } from '../../Chat.types';
import { convertToMessageStructure } from '../../ChatUtils/chatServices';

export const receiveNewMessage = async (response: any, dispatch: Dispatch<any>) => {
  if (!response?.RoomId) {
    console.error('No room id received in broadcast');
    return;
  }
  let formattedMessage = await convertToMessageStructure(response);
  if (response.RoomId === globalChannelVariables.channelId) {
    globalChannelVariables.isNewMessageFromAnotherUser = formattedMessage.SenderId !== globalChannelVariables.chatUserId;
    globalChannelVariables.scrollToBottom = formattedMessage.SenderId === globalChannelVariables.chatUserId;
    updateMessages(formattedMessage, dispatch);
  }
  let tempMessage = JSON.parse(JSON.stringify(globalChannelVariables.lastMessageInChannels));
  tempMessage[response.RoomId] = formattedMessage;
  globalChannelVariables.lastMessageInChannels = tempMessage;
  let newMessages = JSON.parse(JSON.stringify(globalChannelVariables.newMessageIds));
  newMessages.push(formattedMessage.MessageId);
  globalChannelVariables.newMessageIds = newMessages;
  dispatch(setLastMessageInChannels(tempMessage));
};

const updateMessages = (receivedMessage: IMessage, dispatch: Dispatch<any>) => {
  let messagesList = JSON.parse(JSON.stringify(globalChannelVariables.channelsMessagesList));
  receivedMessage = receivedMessage.SenderId === 'sysuser' ? userAddedMessageConstruct(receivedMessage) : receivedMessage;
  messagesList.Messages.push(receivedMessage);
  globalChannelVariables.channelsMessagesList = messagesList;
  dispatch(setChannelMessagesList(messagesList));
};
