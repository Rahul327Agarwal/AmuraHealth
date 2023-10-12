import React from 'react';
import { useCurrentPanel } from '../../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { useUserSession } from '../../../../../DisplayFramework/State/Slices/Auth';
import { getAttachmentAPI } from '../../../Notes/Notes.functions';
import { IChatMessage } from '../../ChatMessage/ChatMessage.types';
import { getFileDetailsFromMessage } from './AttachmentMessage';
import { downloadFromAPI } from './AttachmentMessage.functions';
import { AUDIO, IMAGE, VIDEO } from './AttachmentMessage.types';

export const useAttachmentOptions = (message: IChatMessage) => {
  const { id: panelId } = useCurrentPanel();
  const sessions = useUserSession();
  const { fileType, fileName } = React.useMemo(() => getFileDetailsFromMessage(message), [message?.attachmentURL]);

  const download = () => {
    if (fileType === IMAGE || fileType === AUDIO || fileType === VIDEO) {
      downloadFromAPI(panelId, message?.attachmentURL, sessions, fileName);
    } else {
      if (message?.isAttachment && message?.attachmentURL) getAttachmentAPI(panelId, message?.attachmentURL, sessions);
    }
  };

  return { download };
};
