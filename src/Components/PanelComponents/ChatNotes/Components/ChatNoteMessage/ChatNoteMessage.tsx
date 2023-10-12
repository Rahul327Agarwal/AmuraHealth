import { memo } from 'react';
import { IChatMessageComponentProps } from '../../ChatMessage/ChatMessage.types';
import ChatWrapper from '../ChatWrapper/ChatWrapper';

const ChatNoteMessage = (props: IChatMessageComponentProps) => {
  const { message, isFirstMessage, isOurMessage } = props;

  return (
    <ChatWrapper message={message} isFirstMessage={isFirstMessage} isOurMessage={isOurMessage}>
      <div style={{ fontSize: 15 }}>
        <span style={{ color: '#007aff', width: 'fit-content' }}>@note </span>
        {message.bluedot?.description} {message.message}
      </div>
    </ChatWrapper>
  );
};

export default memo(ChatNoteMessage);
