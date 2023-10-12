import React, { useMemo } from 'react';
import { useCurrentPanel } from '../../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { useUserSession } from '../../../../../DisplayFramework/State/Slices/Auth';
import { getFileNameFromAttachmentURL } from '../../../../LibraryComponents/ChatComponent/ChatComponent.functions';
import { getAttachmentAPI } from '../../../Notes/Notes.functions';
import { IChatMessageComponentProps } from '../../ChatMessage/ChatMessage.types';
import ChatWrapper from '../ChatWrapper/ChatWrapper';
import LeftChatWrapper from '../LeftChatWrapper/LeftChatWrapper';
import RightChatWrapper from '../RightChatWrapper/RightChatWrapper';
import AttachmentMessage, { getFileDetailsFromMessage } from './AttachmentMessage';
import { downloadFromAPI } from './AttachmentMessage.functions';
import { useAttachmentOptions } from './AttachmentMessage.hooks';
import { AUDIO, IMAGE, VIDEO } from './AttachmentMessage.types';

export function AttachmentMessageWrapper(props: IChatMessageComponentProps) {
  const { message, isOurMessage } = props;
  const { download } = useAttachmentOptions(message);

  return (
    <ChatWrapper
      {...props}
      actionOptions={[
        {
          label: 'Download',
          value: 'download',
        },
      ]}
      onMessageAction={(v) => {
        if (v === 'download') {
          download();
        }
      }}
    >
      <AttachmentMessage {...props} />
    </ChatWrapper>
  );
}
