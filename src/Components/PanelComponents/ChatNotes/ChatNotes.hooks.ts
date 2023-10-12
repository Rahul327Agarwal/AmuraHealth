import { useQuery, useQueryClient } from '@tanstack/react-query';
import { atom, useAtom } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import { youtube_url_regex } from '../../../Common/Common.functions';
import { useUserSession } from '../../../DisplayFramework/State/Slices/Auth';
import { useSelectedClient } from '../../../DisplayFramework/State/Slices/DisplayFramework';
import { useAppSelector } from '../../../DisplayFramework/State/store';
import { getUserCollectionsData } from '../Notes/Notes.functions';
import { IChatMessage } from './ChatMessage/ChatMessage.types';
import { ChatNotesFunctions, isSurveyMsg } from './ChatNotes.functions';
import { useNotesState, useSetNotesState } from './ChatNotes.state';
import { ChatFilters, ISurveyCollectionDataObj } from './ChatNotes.types';
import { useRefreshOnEvent } from './ChatNotes.utils';
import { useChatProvider } from './ChatNotesProvider';
import { useSetChatOpenedFlyout } from './Components/ChatInput/ChatFlyout/ChatFlyout.state';
import { useSetRepliedToMessage } from './Components/ReplyMessage/ReplyMessage.state';

export function useChatMessages() {
  const selectedClient = useSelectedClient();
  const session = useUserSession();
  const qc = useQueryClient();

  const query = useQuery(
    ['chat', selectedClient?.client_id],
    async () => {
      let messages = await ChatNotesFunctions.getMessages({
        clientId: selectedClient?.client_id,
        tenantId: selectedClient?.tenant_id,
        session: session,
      });

      const reversedMessages = messages
        // some messages have missing data like receivedtime and context Type... the filter fixes that... ideally should happen in backend
        .filter((message) => !!message.receivedTime && (message.senderId || message.ContextType))
        .sort((a, b) => new Date(b.receivedTime).getTime() - new Date(a.receivedTime).getTime());

      // console.log('aaaaaa', reversedMessages.toSpliced(5, 1000));

      return reversedMessages;
    },
    {
      enabled: !!selectedClient?.client_id,
    }
  );

  /**
   * Refetch messages when client changes (card click)
   * Keeps the old messages in the cache until the new ones are fetched
   */
  useEffect(() => {
    if (!selectedClient?.client_id) return;
    if (query.isFetching) return;
    query.refetch();
  }, [selectedClient?.client_id]);

  // TODO: in old version, these 2 events can be called 2 times, 1. message sent 2. message delivered
  // could see same message 2 times.
  useRefreshOnEvent<IChatMessage>(
    `~${selectedClient?.tenant_id}~${selectedClient?.client_id}~`,
    'notes',
    (data) => {
      if (!query.isFetched) return;

      qc.setQueryData<IChatMessage[]>(['chat', selectedClient?.client_id], (messages) =>
        ChatNotesFunctions.updateMessages(data, messages)
      );
    },
    [selectedClient?.client_id, query.isFetched]
  );

  useRefreshOnEvent<IChatMessage>(
    `~${selectedClient?.tenant_id || 'amura'}~${selectedClient?.client_id}~`,
    'notes-client',
    (data) => {
      console.log('REF CLEINT  messages', data);
      if (!query.isFetched) return;

      qc.setQueryData<IChatMessage[]>(['chat', selectedClient?.client_id], (messages) =>
        ChatNotesFunctions.updateMessages(data, messages)
      );
    },
    [selectedClient?.client_id, query.isFetched]
  );

  return query;
}

export const useFilteredChatMessages = (messages: IChatMessage[]) => {
  const { chatFilterType } = useFilterChat();
  const session = useUserSession();
  const myTeamData = useAppSelector((state) => state.dashboard.myTeamData);

  const memoizedMessages = useMemo(() => {
    return messages?.filter((message) => {
      if (chatFilterType === ChatFilters.SURVEY) {
        if (isSurveyMsg(message.ContextType)) return true;
        return false;
      } else {
        // no Header filter

        // check for privacies
        if (message?.privacy === '@me' && session?.user?.id !== message.senderId) {
          return false;
        }

        //TODO
        if (message?.privacy === '@team') {
          let isInTeam = false;
          for (const staffUser of myTeamData) {
            if (staffUser?.Id === session?.user?.id) {
              isInTeam = true;
              break;
            }
          }
          return isInTeam;
        }
        return true;
      }
    });
  }, [messages, chatFilterType, myTeamData]);
  return memoizedMessages;
};

export const Default_Survey_CollectionData = {
  pendingSurveyCollections: 0,
  closedSurveyCollections: 0,
  totalSurveyCollections: 0,
};

export function useChatReseet() {
  const selectedClient = useSelectedClient();
  const setChatFlyout = useSetChatOpenedFlyout();
  const setRepliedToMessage = useSetRepliedToMessage();
  const { setChatFilterType } = useFilterChat();

  useEffect(() => {
    //cleaer chat filters
    setChatFilterType(ChatFilters.ALL);
    // clsoe the open flyouts on client switch
    setChatFlyout({
      openedFlyout: undefined,
      props: undefined,
    });
    // close reply flyout
    setRepliedToMessage({ message: {}, open: false });
  }, [selectedClient?.client_id]);
}

export function useSurveyCollection(messages: IChatMessage[]) {
  const [surveyCountData, setSurveyCountData] = useState<ISurveyCollectionDataObj>({ ...Default_Survey_CollectionData });
  const [isLoading, setIsLoading] = useState(false);
  const selectedClient = useSelectedClient();
  const sessions = useUserSession();

  useEffect(() => {
    if (!messages || !messages[0]?.survey) return;
    (async () => {
      setIsLoading(true);
      let surveyCountData = await getUserCollectionsData(selectedClient, sessions);
      setSurveyCountData(surveyCountData);
      setIsLoading(false);
    })();
  }, [selectedClient?.client_id, messages]);

  return { surveyCountData, isLoading };
}

const chatFilterAtom = atom<ChatFilters>(ChatFilters.ALL);
export const useFilterChat = () => {
  const [chatFilterType, setChatFilterType] = useAtom(chatFilterAtom);
  useEffect(() => {
    console.log('chatFilterType in hook', chatFilterType);
  }, [chatFilterType]);
  return { chatFilterType, setChatFilterType };
};

export const useMessagePreview = (message: string | null) => {
  const [previewUrl, setPreviewUrl] = useState('');
  useEffect(() => {
    if (!message) return;
    // console.log('message:', message);
    const match = message.match(youtube_url_regex);
    if (match && match[1]) {
      setPreviewUrl(`https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`);
    }
  }, [message]);
  return { previewUrl };
};
