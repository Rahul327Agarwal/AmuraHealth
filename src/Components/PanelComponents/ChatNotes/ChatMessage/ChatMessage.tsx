import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';
import { useUserSession } from '../../../../DisplayFramework/State/Slices/Auth';
import DaySeparator from '../../Notes/components/DaySeparator/DaySeparator';
import { checkWhetherSameDay } from '../../TimeManagement/TimeManagement.function';
import ChatWrapper from '../Components/ChatWrapper/ChatWrapper';
import LeftChatWrapper from '../Components/LeftChatWrapper/LeftChatWrapper';
import RightChatWrapper from '../Components/RightChatWrapper/RightChatWrapper';
import { getChatMessageComponent } from './ChatMessage.functions';
import { IChatMessage } from './ChatMessage.types';

export interface ChatMessageProps {
  prevMessage?: IChatMessage;
  message: IChatMessage;
  nextMessage?: IChatMessage;
}

export function ChatMessage(props: ChatMessageProps) {
  const session = useUserSession();
  const { prevMessage, message, nextMessage } = props;

  // this is undefined for non mathced message types
  const MessageCompo = useMemo(() => getChatMessageComponent(message), [message]);

  const isFirstMessage = !prevMessage || prevMessage.senderId !== message.senderId;
  const isOurMessage = message.senderId === session.user.id;

  const isSameDay = useMemo(() => checkWhetherSameDay(prevMessage?.receivedTime, message.receivedTime), [message, prevMessage]);

  return (
    <motion.div
      style={{
        transformOrigin: 'bottom',
      }}
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{
        // bounce: 0,
        duration: 0.1,
        delay: 0.1,
      }}
    >
      {!isSameDay && <DaySeparator date={message.receivedTime} />}
      {MessageCompo ? (
        <MessageCompo message={message} isFirstMessage={isFirstMessage} isOurMessage={isOurMessage} />
      ) : (
        <ChatWrapper message={message} isFirstMessage={isFirstMessage} isOurMessage={isOurMessage}>
          {message.message}
        </ChatWrapper>
      )}
    </motion.div>
  );
}
