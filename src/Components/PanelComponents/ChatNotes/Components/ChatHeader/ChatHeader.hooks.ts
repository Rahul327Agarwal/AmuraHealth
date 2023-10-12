import { useEffect, useState } from 'react';
import { registerEvent, unRegisterEvent } from '../../../../../AppSync/AppSync.functions';
import { useFetchUserName } from '../../../../../Common/Common.hooks';
import { useUserSession } from '../../../../../DisplayFramework/State/Slices/Auth';
import { useSelectedClient } from '../../../../../DisplayFramework/State/Slices/DisplayFramework';

export const useIsTyping = () => {
  const [currentlyTypingUser, setCurrentlyTypingUser] = useState('');
  const selectedClient = useSelectedClient();
  const sessions = useUserSession();
  const { fetchUserName } = useFetchUserName();
  let typingListener: any;
  let typingStoppedListener: any;

  useEffect(() => {
    typingListener = registerEvent(
      `~${selectedClient.tenant_id}~${selectedClient.client_id}~`,
      `NOTES_TYPING`,
      async (typingPersonId) => {
        if (typingPersonId.userId && typingPersonId.userId !== sessions.user.id) {
          let userName = await fetchUserName(typingPersonId.userId);
          if (userName) setCurrentlyTypingUser(userName.slice(0, 20));
        }
      }
    );
    typingStoppedListener = registerEvent(
      `~${selectedClient.tenant_id}~${selectedClient.client_id}~`,
      `NOTES_TYPING_STOPPED`,
      (typingPersonId) => {
        setCurrentlyTypingUser('');
      }
    );
    return () => {
      if (typingListener) {
        unRegisterEvent(typingListener);
      }
      if (typingStoppedListener) {
        unRegisterEvent(typingStoppedListener);
      }
    };
  }, []);

  return {
    currentlyTypingUser,
  };
};
