import { IChatMessage, IChatMessageComponentProps } from './ChatMessage.types';
import { ChatMessageType, chatMessageComponentMap } from './ChatMessageComponentMap';

const componentTypes = Object.values(chatMessageComponentMap);

/**
 * Matches the ContextType of the message to the component type
 * @returns Componet for the message type
 */
export function getChatMessageComponent(message: IChatMessage): React.FunctionComponent<IChatMessageComponentProps> | undefined {
  for (let i = 0; i < componentTypes.length; i++) {
    const matcherObj = componentTypes[i];
    const isCustomMatch = matcherObj.isMatch?.(message);
    if (isCustomMatch) {
      return matcherObj.component;
    }
    const hasMatchingMessageType = matcherObj.messageType.includes(message.ContextType as ChatMessageType);
    if (hasMatchingMessageType) {
      return matcherObj.component;
    }
  }
  return undefined;
}
