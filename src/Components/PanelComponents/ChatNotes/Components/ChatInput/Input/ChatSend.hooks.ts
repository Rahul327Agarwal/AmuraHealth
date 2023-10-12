import { useEffect } from 'react';
import ErrorToaster from '../../../../../../Common/ErrorToaster';
import { useCurrentPanel } from '../../../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { useUserSession } from '../../../../../../DisplayFramework/State/Slices/Auth';
import { useSelectedClient } from '../../../../../../DisplayFramework/State/Slices/DisplayFramework';
import { getChatNoteContainerRef } from '../../../ChatNotes';
import { ChatInputFunctions } from './ChatInput.functions';
import { useRepliedToMessage } from '../../ReplyMessage/ReplyMessage.state';
import { v4 } from 'uuid';
import { ChatPrivacy } from './ChatPrivacy';
import { ChatVoiceNoteMessage } from '../ChatVoiceRecorder/ChatVoiceRecorder.types';

const CHAT_HANDLE_SEND_EVENT = 'chat-handle-send';
const CHAT_HANDLE_SEND_EVENT_RESPONSE = CHAT_HANDLE_SEND_EVENT + '-response';

export function useChatSender() {
  const selectedClient = useSelectedClient();
  const currentPanel = useCurrentPanel();
  const repliedMessage = useRepliedToMessage();

  //
  async function sendMessage(message: string, voiceNote?: ChatVoiceNoteMessage): Promise<boolean | undefined> {
    try {
      const { message: messageWithoutTag, tag } = ChatInputFunctions.breakHTMLMessage(message);

      await ChatInputFunctions.sendMessage({
        message: messageWithoutTag,
        replyMessage: repliedMessage?.message,
        selectedClient: selectedClient,
        privacy: tag as any,
        voiceNote: voiceNote,
      });
      return true;
    } catch (e) {
      ErrorToaster((e as Error).message ?? 'Error Sending message', currentPanel?.id);
      return false;
    }
  }

  //
  async function sendMessageWithFile(message: string, file: File) {
    try {
      const { message: messageWithoutTag, tag } = ChatInputFunctions.breakHTMLMessage(message);
      await ChatInputFunctions.sendMessage({
        message: messageWithoutTag,
        replyMessage: repliedMessage?.message,
        selectedClient: selectedClient,
        file: file,
        privacy: tag as any,
      });
    } catch (e) {
      ErrorToaster('Error Sending message', currentPanel?.id);
    }
  }

  //
  function sendHandleSend(): Promise<boolean> {
    return new Promise((res, rej) => {
      const uid = v4();
      const listner = ({ detail }: CustomEvent) => {
        if (uid !== detail.eventId) return;
        res(detail?.response === undefined ? true : detail?.response);
        getChatNoteContainerRef().current?.removeEventListener(CHAT_HANDLE_SEND_EVENT_RESPONSE, listner);
      };
      getChatNoteContainerRef().current?.addEventListener(CHAT_HANDLE_SEND_EVENT_RESPONSE, listner);
      getChatNoteContainerRef().current?.dispatchEvent(
        new CustomEvent(CHAT_HANDLE_SEND_EVENT, {
          detail: {
            eventId: uid,
          },
        })
      );
    });
  }

  //
  return {
    sendMessage,
    sendHandleSend,
    sendMessageWithFile,
  };
}

export function useListenToChatSendEvent(fn: () => Promise<boolean>, deps: Array<any>) {
  useEffect(() => {
    const listner = async (e: CustomEvent) => {
      const res = await fn();
      getChatNoteContainerRef().current?.dispatchEvent(
        new CustomEvent(CHAT_HANDLE_SEND_EVENT_RESPONSE, {
          detail: {
            eventId: e.detail?.eventId,
            response: res,
          },
        })
      );
    };
    getChatNoteContainerRef().current?.addEventListener(CHAT_HANDLE_SEND_EVENT, listner);
    return () => {
      getChatNoteContainerRef().current?.removeEventListener(CHAT_HANDLE_SEND_EVENT, listner);
    };
  }, deps);
}
