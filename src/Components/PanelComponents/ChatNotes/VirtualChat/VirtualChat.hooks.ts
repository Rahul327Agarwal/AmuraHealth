import { useEffect, useState } from 'react';
import { useUserSession } from '../../../../DisplayFramework/State/Slices/Auth';
import { IChatMessage } from '../ChatMessage/ChatMessage.types';
import { useNotesState, useSetNotesState } from '../ChatNotes.state';
import { VirtualChatMessage, VirtualChatProps } from './VirtualChat.types';

export type IChatMessageVirtualized = IChatMessage & VirtualChatMessage;
const MESSAGES_PER_PAGE = 20;

export function useLocalVirtualChat(props: { messages?: IChatMessage[] }) {
  const session = useUserSession();

  const [isFetching, setIsFetching] = useState(props.messages === undefined);
  const [pageLoaded, setPageLoaded] = useState(1);
  const [messages, setMessages] = useState<IChatMessageVirtualized[]>([]);

  useEffect(() => {
    if (props.messages?.length) {
      setIsFetching(false);
    }
  }, [props.messages?.length]);

  useEffect(() => {
    if (!props.messages) return;
    const newMessages: IChatMessageVirtualized[] = [];
    const n = props.messages.length;

    const endIndex = pageLoaded * MESSAGES_PER_PAGE;

    const sliced = props.messages.slice(0, endIndex).reverse();

    for (let i = 0; i <= endIndex; i++) {
      // const newN = n - 1 - i;

      const message = sliced[i];
      if (!message) {
        continue;
      }
      newMessages.push({
        ...message,
        _id: message.messageId,
        isOurMessage: message.senderId === session?.user?.id,
      });
    }
    setMessages(newMessages);
  }, [props.messages, pageLoaded]);

  async function loadMoreMessages() {
    if (isFetching) return;
    setIsFetching(true);
    setPageLoaded(pageLoaded + 1);
    requestAnimationFrame(() => setIsFetching(false));
    // setTimeout(() => {
    //   settime
    // }, 1000);
  }

  // function getCorrectIndex(virtualizedIndex:number){
  //   // VI =  20
  //   // AI = 0
  //   // Page Loaded = 1
  //   const totalVirtualizedMessages = messages.length;
  //   const totalActualMessages = props.messages?.length;

  // }

  return {
    messages,
    loadMoreMessages,
    isFetching,
  };
}

export function useChatScroll(props: VirtualChatProps<any>) {
  const { messageBodyRef } = props;
  const setNoteState = useSetNotesState();
  const { showGotoBottom, unseenMsgCount } = useNotesState();

  const onScrollMessages = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;

    const scrollFromBottom = Math.round(scrollHeight - scrollTop - clientHeight);

    if (scrollFromBottom >= 100 && !showGotoBottom) {
      setNoteState({ showGotoBottom: true });
    } else if (scrollFromBottom < 100 && showGotoBottom) {
      setNoteState({ showGotoBottom: false });
    }
  };

  const onScrollToBottom = (instant?: boolean) => {
    if (!messageBodyRef.current) return;
    messageBodyRef.current.scrollTo({
      behavior: instant ? 'instant' : 'smooth',
      top: messageBodyRef.current.scrollHeight,
    });
  };

  return {
    onScrollMessages,
    onScrollToBottom,
    showGotoBottom,
    unseenMsgCount,
  };
}
