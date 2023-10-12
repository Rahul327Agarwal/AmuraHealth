import { useEffect, useRef, useState } from 'react';
import { notifyEvent } from '../../../../../../AppSync/AppSync.functions';
import { useChatOpenedFlyout, useSetChatOpenedFlyout } from '../ChatFlyout/ChatFlyout.state';
import { useSelectedClient } from '../../../../../../DisplayFramework/State/Slices/DisplayFramework';
import { useUserSession } from '../../../../../../DisplayFramework/State/Slices/Auth';

export function useChatInput() {
  const { openedFlyout } = useChatOpenedFlyout();
  const setFlyout = useSetChatOpenedFlyout();

  function onAttachmentClick() {
    if (openedFlyout === 'fileUpload') {
      setFlyout({});
    } else {
      setFlyout({
        openedFlyout: 'fileUpload',
      });
    }
  }

  return {
    onAttachmentClick,
  };
}

export function useTyping() {
  const [isTyping, setIsTyping] = useState(false);
  const session = useUserSession();
  const selectedClient = useSelectedClient();
  const typingTimer = useRef<any>();
  const debounceTime = 2000;
  useEffect(() => {
    if (isTyping) {
      notifyEvent({
        input: {
          user_id: `~${selectedClient.tenant_id}~${selectedClient.client_id}~`,
          event_name: 'NOTES_TYPING',
          timestamp: `${new Date().getTime()}`,
          last_message: JSON.stringify({ userId: `${session.user.id}` }) ?? '',
        },
      });
    }
    if (!isTyping) {
      notifyEvent({
        input: {
          user_id: `~${selectedClient.tenant_id}~${selectedClient.client_id}~`,
          event_name: 'NOTES_TYPING_STOPPED',
          timestamp: `${new Date().getTime()}`,
          last_message: JSON.stringify({ userId: `${session.user.id}` }) ?? '',
        },
      });
    }
  }, [isTyping]);

  const handleTyping = () => {
    clearTimeout(typingTimer.current);
    setIsTyping(true);
    typingTimer.current = setTimeout(() => {
      setIsTyping(false);
    }, debounceTime);
  };
  return { handleTyping };
}
