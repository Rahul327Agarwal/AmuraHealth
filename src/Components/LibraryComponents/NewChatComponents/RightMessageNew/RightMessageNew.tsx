import { PMS_LOCALE } from '../../../../Utils';
import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { DownloadIcon } from '../../../SVGs/Common';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import {
  getFileFormatFromAttachmentURL,
  getFileNameFromAttachmentURL,
  getMBFromKB,
  getSenderName,
  getTimeIn24HrFormat,
} from '../ChatComponent.functions';
import VoiceNoteMessage from '../VoiceNoteMessage/VoiceNoteMessage';
import { useStyles } from './RightMessageNew.styles';
import { IProps } from './RightMessageNew.types';
import { getAttachmentAPI } from '../../../PanelComponents/Notes/Notes.functions';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

export default function RightMessageNew(props: IProps) {
  const { message, staffList, sessions } = props;
  const { classes } = useStyles(props);
  const { id: panelId } = useCurrentPanel();
  const commonClass = useCommonStyles();
  return (
    <div className={classes.box}>
      <div className={classes.leftMessage}>
        <div className={classes.messageBox}>
          {/* {message.isReply && (
            <div className={`${classes.padding2TB4LR} ${classes.replyBox} ${message.isAttachment ? classes.marginB4 : ""}`}>
              <div className={`${classes.replySenderName} ${classes.padding2TB4LR}`}>
                <span>{PMS_LOCALE.translate(getSenderName(staffList, message.repliedMessage.senderId))}</span>
              </div>
              <div className={classes.padding2TB4LR}>
                <span className={classes.message}>{message.repliedMessage.message}</span>
              </div>
            </div>
          )} */}

          {message.isReply && (
            <div className={` ${classes.replyBox} ${message.isAttachment ? classes.marginB4 : ''}`}>
              <Avatar className={classes.replyavatar} src={`${import.meta.env.VITE_DP_URL}${message.senderId}/profile-pic.png`}>
                {getSenderName(staffList, message.senderId) ? getSenderName(staffList, message.senderId)[0] : ''}
              </Avatar>
              <div className={classes.margin6L}>
                <div className={`${classes.replySenderName} ${commonClass.caption12Medium} ${classes.padding2TB4LR}`}>
                  <span>{PMS_LOCALE.translate(getSenderName(staffList, message.repliedMessage.senderId))}</span>
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
                <span className={classes.message}>{message.prompt}</span>
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
                    <span className={`${classes.message} ${commonClass.body15Regular}`}>{message.message}</span>
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
        <div className={`${classes.newTimeDiv} ${commonClass.caption12Regular}`}>
          {' '}
          <span className={classes.messageTime}>{getTimeIn24HrFormat(message.receivedTime!)}</span>
        </div>
      </div>
    </div>
  );
}
