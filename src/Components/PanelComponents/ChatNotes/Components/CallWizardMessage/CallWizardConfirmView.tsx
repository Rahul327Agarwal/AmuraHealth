import { memo, useMemo, useState } from 'react'; 
import LeftChatWrapper from '../LeftChatWrapper/LeftChatWrapper';
import CallWizardConfirmViewComp from './CallWizardConfirmViewComp';
import { copyToClipboard } from './CallWizardMessage.functions';
import { isTimeDifferenceGreaterThanNHours } from '../../../../../Common/Common.functions';
import { useCurrentPanel } from '../../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { IProps } from './CallWizardMessage.types';

const CallWizardConfirmView = (props: IProps) => {
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
      <CallWizardConfirmViewComp message={message} setScheduleURL={setScheduleURL} setCallWizardFlow={() => {}} />
    </LeftChatWrapper>
  );
};

export default memo(CallWizardConfirmView);
