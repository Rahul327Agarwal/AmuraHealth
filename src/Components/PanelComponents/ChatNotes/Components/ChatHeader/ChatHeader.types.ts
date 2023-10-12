import { IChatMessage } from '../../ChatMessage/ChatMessage.types';
import { IChatMessageVirtualized } from '../../VirtualChat/VirtualChat.hooks';

export interface IProps {
  surveyCountData?: any;
  title: string;
  subTitle?: string;
  isShadow?: boolean;
  isOnline?: boolean;
  messageBodyRef: React.MutableRefObject<HTMLDivElement>;
  messages: IChatMessage[];
  virtualMessages: {
    messages: IChatMessageVirtualized[];
    loadMoreMessages: () => Promise<void>;
    isFetching: boolean;
  };
}
export type ChatTabs = 'CHAT_TAB' | 'EDUCATION_TAB' | 'RECIPE_TAB' | 'NUTRIENTS_TAB' | 'SURVEY_TAB';
