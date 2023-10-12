import { memo } from 'react';
import LeftChatWrapper from '../LeftChatWrapper/LeftChatWrapper';
import { IProps } from './SurveyMessage.types';
import SurveyMessageComp from './SurveyMessageComp';

const SurveyMessage = (props: IProps) => {
  const { message, isFirstMessage } = props;

  return (
    <LeftChatWrapper message={message} isFirstMessage={isFirstMessage} isCommonMessage>
      <SurveyMessageComp {...props} />
    </LeftChatWrapper>
  );
};

export default memo(SurveyMessage);
