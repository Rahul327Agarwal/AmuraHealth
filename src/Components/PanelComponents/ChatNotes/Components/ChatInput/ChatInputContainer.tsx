import { useSelectedClient } from '../../../../../DisplayFramework/State/Slices/DisplayFramework';
import { IChatMessage } from '../../ChatMessage/ChatMessage.types';
import { ChatInput } from './Input/ChatInput';
import { ChatFlyout } from './ChatFlyout/ChatFlyout';
import { ChatSuggestor } from './ChatSuggestor/ChatSuggestor';

export function ChatInputContainer() {
  const selectedClient = useSelectedClient();

  if (selectedClient?.client_id === undefined || selectedClient?.tenant_id === undefined) return <></>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ChatSuggestor />
      <ChatFlyout />
      <ChatInput />
    </div>
  );
}
