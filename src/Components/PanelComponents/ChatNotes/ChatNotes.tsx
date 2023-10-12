import { useEffect, useRef } from 'react';
import { useFetchUserName } from '../../../Common/Common.hooks';
import { useSelectedClient } from '../../../DisplayFramework/State/Slices/DisplayFramework';
import IndeterminateLoader from '../../LibraryComponents/InderminateLoader/InderminateLoader';
import { ChatMessage } from './ChatMessage/ChatMessage';
import { useChatMessages, useChatReseet, useFilterChat, useFilteredChatMessages } from './ChatNotes.hooks';
import { useStyles } from './ChatNotes.styles';
import ChatHeader from './Components/ChatHeader/ChatHeader';
import { ChatInputContainer } from './Components/ChatInput/ChatInputContainer';
import { VirtualChat } from './VirtualChat/VirtualChat';
import { IChatMessageVirtualized, useLocalVirtualChat } from './VirtualChat/VirtualChat.hooks';
import { ChatInputStateProvider } from './Components/ChatInput/Input/ChatInput.state';

let chatNoteContainerRef: React.MutableRefObject<HTMLDivElement>;
export const getChatNoteContainerRef = () => chatNoteContainerRef;

export default function ChatNotes(props: any) {
  return (
    <>
      <ChatInputStateProvider>
        <ChatNotesComponent {...props} />
      </ChatInputStateProvider>
    </>
  );
}

function ChatNotesComponent(props: any) {
  const { classes } = useStyles();
  const selectedClient = useSelectedClient();
  const messages = useChatMessages();
  const userNameFetch = useFetchUserName();
  const filteredMessages = useFilteredChatMessages(messages.data);
  const messageBodyRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useChatReseet();
  const virtualMessages = useLocalVirtualChat({
    messages: filteredMessages,
  });

  useEffect(() => {
    if (chatContainerRef?.current) {
      chatNoteContainerRef = chatContainerRef;
    }
  }, []);

  // the following useEffect fetches all the sender usernames at first render only
  useEffect(() => {
    if (!messages.data) return;
    userNameFetch.fetchMultipleUserNames(messages.data.map((m) => m.senderId));
  }, [messages.data]);

  return (
    <>
      <div className={classes.mainContainer} ref={chatContainerRef}>
        {/* Loader */}
        {messages.isFetching && <IndeterminateLoader panelWidth={'100%'} zIndex={110} />}

        <ChatHeader
          title={selectedClient?.client_name || 'Chat'}
          messageBodyRef={messageBodyRef}
          messages={messages.data}
          virtualMessages={virtualMessages}
        />

        {/* The component is rendering a virtualized chat interface. */}
        <VirtualChat<IChatMessageVirtualized>
          messageBodyRef={messageBodyRef}
          messages={virtualMessages.messages}
          isFetching={virtualMessages.isFetching}
          onFetchMore={virtualMessages.loadMoreMessages}
          renderFn={(m, i) => {
            return (
              <ChatMessage
                message={m}
                nextMessage={virtualMessages.messages?.[i + 1]}
                prevMessage={virtualMessages.messages?.[i - 1]}
              />
            );
          }}
        />

        {/* Input */}
        <ChatInputContainer key={selectedClient?.client_id} />
      </div>
    </>
  );
}
