import { ISession } from '../../../Common/Common.types';
import { PMS_S3 } from '../../../Utils';
import { IChatMessage } from './ChatMessage/ChatMessage.types';
import { ChatMessageType } from './ChatMessage/ChatMessageComponentMap';

export namespace ChatNotesFunctions {
  /**
   *
   */
  export async function getMessages(props: { clientId: string; tenantId: string; session: ISession }): Promise<IChatMessage[]> {
    const res = await PMS_S3.getObject(
      `pms-ql-notes/${props.clientId}/myNotes.json`,
      import.meta.env.VITE_CLIENT_BUCKET,
      {
        TenantId: props.tenantId,
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: props.session.id_token,
        headers: {},
      },
      {}
    );

    if (res?.Error) {
      throw new Error(res?.Error);
    }
    return res as IChatMessage[];
  }

  /**
   * Called when a new message is received via Refresh Events
   * - could be Push, Update delivery status, deletion
   */
  export function updateMessages(newMessage: IChatMessage, messages: IChatMessage[]): IChatMessage[] {
    // Deletion
    const deletionContextType: ChatMessageType[] = [
      '@callScheduled',
      '@callDeclined', // Call
      '@deleteMessage',
      '@deleteSurveyPost',
      '@deleteSurveyPostInChat', // Survey
    ];
    if (deletionContextType.includes(newMessage.ContextType as ChatMessageType)) {
      return messages.filter((msg) => msg.messageId !== newMessage.messageId);
    }

    // Update delivery status
    // if already exists, update the delivery status
    const existingMessage = messages.findLast((msg) => msg.messageId === newMessage.messageId);
    if (existingMessage) {
      return messages.map((msg) => {
        if (msg.messageId === newMessage.messageId) {
          return {
            ...msg,
            delivered: true,
          };
        }
        return msg;
      });
    }

    // New Message, Push
    return [newMessage, ...messages];
  }
}

export const getAtClockText = (action) => {
  switch (action) {
    case 'START':
      return 'Program Started';
    case 'PAUSE':
      return 'Program Paused';
    case 'UNPAUSE':
      return 'Program Unpaused';
    case 'END':
      return 'Program Stopped';
    case 'ADD':
      return 'Program Extended';
    default:
      break;
  }
};
export const isSurveyMsg = (contextType: string): boolean => {
  switch (contextType) {
    case '@dist-starter':
    case '@dist-receiver':
    case '@dist-redo-response':
      return true;
    default:
      return false;
  }
};
