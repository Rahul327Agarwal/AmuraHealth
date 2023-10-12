import { Avatar } from '@mui/material';
import { PMS_LOCALE } from '../../../../Utils';
import React, { useState } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { getAttachmentAPI } from '../../../PanelComponents/Notes/Notes.functions';
import { DownloadIcon } from '../../../SVGs/Common';
import {
  getFileFormatFromAttachmentURL,
  getFileNameFromAttachmentURL,
  getMBFromKB,
  getSenderName,
  getTimeIn24HrFormat,
} from '../ChatComponent.functions';
import VoiceNoteMessage from '../VoiceNoteMessage/VoiceNoteMessage';
import { useStyles } from './LeftMessageNew.styles';
import { IProps } from './LeftMessageNew.types';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { useChatProvider } from '../../../PanelComponents/ChatNotes/ChatNotesProvider';
import { useUserSession } from '../../../../DisplayFramework/State/Slices/Auth';

export default function LeftMessage(props: IProps) {
  const { roomUsers: staffList } = useChatProvider();
  const sessions = useUserSession();

  const { message, isFirstMessage } = props;
  const commonClass = useCommonStyles();
  const { classes } = useStyles(props);
  const { id: panelId } = useCurrentPanel();
  return (
    <div className={classes.leftMessage}>
      <div className={classes.avatarDiv}>
        {isFirstMessage && (
          <Avatar className={classes.avatar} src={`${import.meta.env.VITE_DP_URL}${message.senderId}/profile-pic.png`}>
            {getSenderName(staffList, message.senderId) ? getSenderName(staffList, message.senderId)[0] : ''}
          </Avatar>
        )}
      </div>
      <div>
        {isFirstMessage && (
          <div className={`${classes.padding2TB4LR} ${classes.senderFirstMsg}`}>
            <span className={`${classes.senderName} ${commonClass.body15Medium}`}>
              {PMS_LOCALE.translate(getSenderName(staffList, message.senderId))}
            </span>
          </div>
        )}
        <div className={classes.messageBox}>
          {message.isReply && (
            <div className={` ${classes.replyBox} ${message.isAttachment ? classes.marginB4 : ''}`}>
              <Avatar className={classes.replyavatar} src={`${import.meta.env.VITE_DP_URL}${message.senderId}/profile-pic.png`}>
                {getSenderName(staffList, message.senderId) ? getSenderName(staffList, message.senderId)[0] : ''}
              </Avatar>
              <div className={classes.margin6L}>
                <div className={`${classes.replySenderName} ${commonClass.caption12Medium} ${classes.padding2TB4LR}`}>
                  <span>{PMS_LOCALE.translate(getSenderName(staffList, message.repliedMessage!.senderId))}</span>
                </div>
                <div className={classes.padding2TB4LR}>
                  <span className={`${commonClass.sm10Regular} ${classes.repliedmsg}`}>{message.repliedMessage!.message}</span>
                </div>
              </div>
            </div>
          )}
          {message.prompt && message.answer && !message.promptResponseCode && (
            <div className={`${classes.padding2TB4LR} ${classes.replyBox} ${message.isAttachment ? classes.marginB4 : ''}`}>
              <div className={classes.padding2TB4LR}>
                <span className={commonClass.body15Regular}>{message.prompt}</span>
              </div>
            </div>
          )}
          {message.isAttachment && (
            <div>
              <div className={classes.attachmentFileDiv}>
                <span
                  className={classes.attachmentIcon}
                  onClick={() => {
                    if (message.isAttachment) getAttachmentAPI(panelId, message.attachmentURL, sessions);
                  }}
                >
                  {<DownloadIcon />}
                </span>
              </div>
              <div className={`${classes.padding6TB4RL} ${classes.attachmentDescriptionDiv}`}>
                <div className={classes.center}>
                  <div className={classes.attachmentFileIcon}>
                    <span className={classes.attachmentFileFormat}>{getFileFormatFromAttachmentURL(message.attachmentURL!)}</span>
                  </div>
                </div>
                <div>
                  <div className={`${classes.attachmentName} ${commonClass.body15Medium}`}>
                    {getFileNameFromAttachmentURL(message.attachmentURL!)}
                  </div>
                  <div className={`${classes.attachmentFileSize} ${commonClass.sm10Regular}`}>
                    {getMBFromKB(message.attachmentFileSize!)}
                  </div>
                </div>
              </div>
            </div>
          )}
          {message.isVoiceNote && message.voiceNote && message.voiceNote.audio && (
            <div className={classes.voiceNoteDiv}>
              <VoiceNoteMessage
                sessions={sessions}
                audioUrl={message.voiceNote.audio || ''}
                recordingMinutes={message.voiceNote.recordingMinutes || 0}
                recordingSeconds={message.voiceNote.recordingSeconds || 0}
              />
            </div>
          )}
          <div className={classes.borderBox}>
            <div>
              {message.message && (
                <div className={`${classes.padding2TB4LR} ${classes.messageDiv}`}>
                  <span>
                    <span className={commonClass.body15Regular}>{message.message}</span>
                  </span>
                  <span className={classes.additionalPadding}></span>
                </div>
              )}
            </div>
            <div className={classes.timeDiv}>
              <div>
                {message?.privacy && (
                  <span
                    className={`${classes.messageTime} ${classes.privacySpan} ${commonClass.caption12Regular} ${classes.opacity}`}
                  >
                    {message.privacy}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={classes.newTimeDiv}>
          {' '}
          <span className={classes.messageTime}>{getTimeIn24HrFormat(message.receivedTime!)}</span>
        </div>
      </div>
    </div>
  );
}
