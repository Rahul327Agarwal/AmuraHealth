import { AttachmentMessageWrapper } from '../Components/AttachmentMessage/AttachmentMessageWrapper';
import BluedotMessage from '../Components/BluedotMessage/BluedotMessage';
import CallWizard from '../Components/CallWizardMessage/CallWizard';
import CallWizardConfirmView from '../Components/CallWizardMessage/CallWizardConfirmView';
import ChatNoteMessage from '../Components/ChatNoteMessage/ChatNoteMessage';
import ClockMessage from '../Components/ClockMessage/ClockMessage';
import KBMessage from '../Components/KBMessage/KBMessage';
import SurveyMessage from '../Components/SurveyMessage/SurveyMessage';
import { IChatMessage } from './ChatMessage.types';

export const CHAT_MESSAGE_TYPES = [
  '@call',
  '@callDeclined',
  '@callChange',
  '@callCancel',
  '@callCancelBooked',
  '@callScheduled',
  '@dist-starter',
  '@dist-receiver',
  '@dist-redo-response',
  '@survey-wa-message',
  '@kb-posts',
  '@deleteMessage',
  '@deleteSurveyPost',
  '@deleteSurveyPostInChat',
  '@clock',
  '@chat-notes',
] as const;

export type ChatMessageType = (typeof CHAT_MESSAGE_TYPES)[number];

type ComponentMapType = Record<
  string,
  {
    isMatch?: (message: IChatMessage) => boolean;
    messageType: ChatMessageType[];
    component: React.FunctionComponent;
  }
>;

//

export const chatMessageComponentMap: ComponentMapType = {
  callWizard: {
    messageType: ['@call', '@callDeclined', '@callChange', '@callCancel'],
    component: CallWizard,
  },
  callWizardConfirmView: {
    messageType: ['@callCancelBooked', '@callScheduled'],
    component: CallWizardConfirmView,
  },
  survey: {
    messageType: ['@dist-starter', '@dist-receiver', '@dist-redo-response', '@survey-wa-message'],
    component: SurveyMessage,
  },
  kb: {
    messageType: ['@kb-posts'],
    component: KBMessage,
  },
  bluedot: {
    isMatch: (message) => {
      return Object.values(message?.bluedot ?? {}).length > 0;
    },
    messageType: [],
    component: BluedotMessage,
  },
  attachment: {
    isMatch: (message) => {
      return message.isAttachment;
    },
    messageType: [],
    component: AttachmentMessageWrapper,
  },
  clock: {
    messageType: ['@clock'],
    component: ClockMessage,
  },
  chatNote: {
    messageType: ['@chat-notes'],
    component: ChatNoteMessage,
  },
};
