import { globalChannelVariables, IMessage } from '../Chat.types';
import { sendMessageAPI } from '../ChatUtils/chatServices';

export const confirmSelection = (panelId: string, props: any, messageId: any, messageList: Array<IMessage>, surveyInput: any) => {
  let messages = JSON.parse(JSON.stringify(messageList));
  let message = messages.find((msg: any) => msg.date === messageId);
  if (message) {
    let requestToSend = message.text;
    requestToSend.SelectedOption = surveyInput.Value ?? null;
    let channelMessages = JSON.parse(JSON.stringify(globalChannelVariables.channelsMessagesList));
    loop: for (let j = 0; j < channelMessages.Messages.length; j++) {
      if (channelMessages.Messages[j].ReceivedTime === messageId) {
        channelMessages.Messages[j].Message.SelectedOption =
          channelMessages.Messages[j].Message.MessageType === 'ACTION_MULTI_CHOICE' ||
          channelMessages.Messages[j].Message.MessageType === 'SLIDER_SELECT'
            ? surveyInput
            : surveyInput.Value;
        requestToSend.SelectedOption =
          channelMessages.Messages[j].Message.MessageType === 'ACTION_MULTI_CHOICE' ||
          channelMessages.Messages[j].Message.MessageType === 'SLIDER_SELECT'
            ? surveyInput
            : surveyInput.Value;
        requestToSend.SelectedOptions =
          channelMessages.Messages[j].Message.MessageType === 'ACTION_MULTI_CHOICE' ? surveyInput : surveyInput.Value;
        break loop;
      }
    }
    globalChannelVariables.channelsMessagesList = JSON.parse(JSON.stringify(channelMessages));
    sendMessageAPI(panelId, props, requestToSend, true);
  }
};
