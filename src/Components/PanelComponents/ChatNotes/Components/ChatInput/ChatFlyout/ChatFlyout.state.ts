import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { ChatFlyoutComponentMapType, ChatFlyoutsKey, chatFlyoutComponentMap } from './ChatFlyoutComponentMap';
import { ChatInputState, chatStore } from '../Input/ChatInput.state';
import { useSetRepliedToMessage } from '../../ReplyMessage/ReplyMessage.state';

const flyoutAtom = atom<{
  openedFlyout?: ChatFlyoutsKey;
  props?: any;
  flyoutOptions?: ChatFlyoutComponentMapType['string'];
}>({});

export const useChatOpenedFlyout = () => useAtomValue(flyoutAtom, { store: chatStore });

export const useSetChatOpenedFlyout = () => {
  const setFn = useSetAtom(flyoutAtom, {
    store: chatStore,
  });

  const setInputValue = useSetAtom(ChatInputState.inputValueAtom, {
    store: chatStore,
  });

  const setSendButtonState = useSetAtom(ChatInputState.inputSendButtonDisabledAtom, {
    store: chatStore,
  });
  const setChatAttachmentState = useSetAtom(ChatInputState.attachmentsAtom, {
    store: chatStore,
  });
  const setchatAttachmentTextState = useSetAtom(ChatInputState.attachmentsTextAtom, {
    store: chatStore,
  });
  const setchatAttachmentIndex = useSetAtom(ChatInputState.currentSelectedAttachmentIndexAtom, {
    store: chatStore,
  });
  const setRepliedMessage = useSetRepliedToMessage();

  return (options?: { openedFlyout?: ChatFlyoutsKey; props?: any; resetInput?: boolean }) => {
    setFn((p) => {
      if (p?.flyoutOptions?.disableInputOnOpen && options?.openedFlyout === undefined) {
        setInputValue?.('');
        setSendButtonState?.(false);
        if (options?.resetInput) {
          setChatAttachmentState?.([]);
          setchatAttachmentTextState?.([]);
          setchatAttachmentIndex?.(-1);
          setRepliedMessage({
            message: {},
            open: false,
          });
        }
      }

      return {
        openedFlyout: options?.openedFlyout,
        props: options?.props,
        flyoutOptions: chatFlyoutComponentMap[options?.openedFlyout] ?? undefined,
      };
    });
  };
};
