//

import { createContext, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../../DisplayFramework/State/store';

export interface ChatNotesProviderProps {
  roomUsers?: any[];
}

const ChatNoteContext = createContext<ChatNotesProviderProps>({
  roomUsers: [],
});

export const useChatProvider = () => {
  return useContext(ChatNoteContext);
};

//

export function ChatNotesProvider(props: { children: React.ReactNode }) {
  const myTeamData = useAppSelector((state) => state.dashboard.myTeamData);

  const roomUsers = useMemo(() => {
    return myTeamData.map((each) => {
      return {
        userId: each.Id,
        userName: `${each?.FirstName ?? ''} ${each?.LastName ?? ''}` || each.Id,
        roles: each.originalRoles || [],
        isWatching: Boolean(each?.isWatching),
      };
    });
  }, [myTeamData]);

  return (
    <>
      <ChatNoteContext.Provider
        value={{
          roomUsers: roomUsers,
        }}
      >
        {props.children}
      </ChatNoteContext.Provider>
    </>
  );
}
