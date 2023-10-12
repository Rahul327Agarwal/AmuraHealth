import { MutableRefObject } from 'react';
import { IChatMessage } from '../../ChatMessage/ChatMessage.types';
import { IChatMessageVirtualized } from '../../VirtualChat/VirtualChat.hooks';

export interface IProps {
  onBack: () => void;
  messages: IChatMessage[];
  messageBodyRef: MutableRefObject<HTMLElement>;
  virtualMessages: {
    messages: IChatMessageVirtualized[];
    loadMoreMessages: () => Promise<void>;
    isFetching: boolean;
  };
}
