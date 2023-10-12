import { memo } from 'react';
import LeftChatWrapper from '../LeftChatWrapper/LeftChatWrapper';
import { IProps } from './KBMessage.types';
import KBMessageComp from './KBMessageComp';

const KBMessage = (props: IProps) => {
  const { message, isFirstMessage } = props;

  return (
    <LeftChatWrapper message={message} isFirstMessage={isFirstMessage} bgColor="#f1f1f1" isCommonMessage>
      <KBMessageComp {...(message?.knowledgeBasePost || {})} />
    </LeftChatWrapper>
  );
};

export default memo(KBMessage);
