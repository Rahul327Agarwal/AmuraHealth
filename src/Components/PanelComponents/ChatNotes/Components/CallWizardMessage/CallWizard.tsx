import { memo, useMemo, useState } from 'react';
import LeftChatWrapper from '../LeftChatWrapper/LeftChatWrapper';
import { isTimeDifferenceGreaterThanNHours } from '../../../../../Common/Common.functions';
import CallWizardComp from './CallWizardComp';
import { useCurrentPanel } from '../../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { IProps } from './CallWizardMessage.types';
import { copyToClipboard } from './CallWizardMessage.functions';

const CallWizard = (props: IProps) => {
  const { message, isFirstMessage } = props;

  const { id: panelId } = useCurrentPanel();
  const [scheduleURL, setScheduleURL] = useState('');
  const isTimeGreaterThenNhr = useMemo(
    () => isTimeDifferenceGreaterThanNHours(message?.receivedTime, 168),
    [message?.receivedTime]
  );

  const onMessageAction = (value: string) => {
    if (value === 'COPY_LINK' && message?.ContextType === '@call' && !isTimeGreaterThenNhr) {
      copyToClipboard(scheduleURL, panelId);
    }
  };

  return (
    <LeftChatWrapper
      message={message}
      isFirstMessage={isFirstMessage}
      isCommonMessage
      actionOptions={[{ label: 'Copy Link', value: 'COPY_LINK' }]}
      onMessageAction={onMessageAction}
    >
      <CallWizardComp message={message} setScheduleURL={setScheduleURL} isTimeGreaterThenNhr={isTimeGreaterThenNhr} />
    </LeftChatWrapper>
  );
};

export default memo(CallWizard);
