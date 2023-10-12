import { format } from 'date-fns';
import { memo, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { convertTimeWithOffset, getTimeZoneAbbrevation, getVoiceNoteFromURL } from '../../../../../Common/Common.functions';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { useAppSelector } from '../../../../../DisplayFramework/State/store';
import { getFileNameFromAttachmentURL } from '../../../../LibraryComponents/ChatComponent/ChatComponent.functions';
import ChatReadMore from '../../../../LibraryComponents/ChatComponent/ChatReadMore/ChatReadMore';
import {
  AUDIO_TYPES,
  IMAGE_TYPES,
  VIDEO_TYPES,
} from '../../../../LibraryComponents/ChatComponent/Message/AttachmentMessage/AttachmentMessage.types';
import ProfileWithName from '../../../../LibraryComponents/ChatComponent/Message/ProfileWithName/ProfileWithName';
import { AudioIconNew, FileIcon, PicturesIcon, QuestionmarkIcon, StarIcon, VideoIcon } from '../../../../SVGs/Common';
import { SpeakIcon } from '../MessageInputNew/MessageInputNew.svg';
import { useStyles } from './MessageReply.styles';

function MessageReply(props: any) {
  const { message, sessions, setMsgHightLight, messageClass } = props;
  const { classes } = useStyles(props);
  const [YoutubeLink, setYoutubeLink] = useState(false);
  const [videoId, setVideoId] = useState('');
  const commonClasses = useCommonStyles();

  const { userNames } = useAppSelector((s) => s.cache);

  const [filesurl, setfilesurl] = useState('');

  useEffect(() => {
    if (message?.attachmentURL) {
      getVoiceNoteFromURL(sessions, message?.attachmentURL).then((url: any) => {
        if (url) setfilesurl(url);
      });
    }
  }, [message?.attachmentURL]);

  useEffect(() => {
    const youtubeUrlPattern = /(?:https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?(?:.*&)?v=|youtu\.be\/))([a-zA-Z0-9_-]+)/;
    const match = message?.message?.match(youtubeUrlPattern);
    if (match?.[1]) {
      setYoutubeLink(true);
      setVideoId(match[1]);
    }
  }, [message.message]);

  const ProfName =
    message.senderId !== 'SYSTEM' && message.senderId
      ? message.senderId === sessions.user.id
        ? 'You'
        : userNames[message?.senderId]
      : message.senderId;

  let fileExtension = message?.attachmentURL?.split('.').pop().toLocaleLowerCase();
  const audioType = AUDIO_TYPES[fileExtension];
  const videoType = VIDEO_TYPES[fileExtension];
  const imgType = IMAGE_TYPES[fileExtension];

  const getScheduledTimeString = () => {
    const fromTime = message?.scheduleData?.fromTime;
    const clientBookedTimeZone = message?.scheduleData?.clientBookedTimeZone;
    console.log(clientBookedTimeZone, getTimeZoneAbbrevation(clientBookedTimeZone));
    let convertedFromTime = fromTime && clientBookedTimeZone ? convertTimeWithOffset(fromTime, clientBookedTimeZone) : fromTime;
    return (
      format(new Date(convertedFromTime || new Date()), 'eee dd, MMM yyyy ') +
      ' | ' +
      format(new Date(convertedFromTime || new Date()), ' hh:mm a') +
      (clientBookedTimeZone ? ' (' + getTimeZoneAbbrevation(clientBookedTimeZone) + ')' : '') +
      '...'
    );
  };

  const renderIcon = () => {
    if (imgType) return <PicturesIcon />;
    if (audioType && message.isVoiceNote) return <SpeakIcon />;
    if (audioType) return <AudioIconNew />;
    if (videoType) return <VideoIcon />;
    return <FileIcon />;
  };

  const getReplyContent = () => {
    switch (message?.ContextType) {
      case '@clock':
        return <ChatReadMore text={`${message?.messageWithHtml || message?.message}`} charLimit={750} />;
      case '@chat-notes':
        return (
          <>
            <span className={classes.noteTag}>@note </span>
            {message?.message}
          </>
        );
      case '@call':
      case '@callDeclined':
      case '@callChange':
      case '@callCancel':
        return (
          <>
            <span className={`${classes.replyLine} title`}>{message?.scheduleData?.title}</span>
            <span className={classes.replyLine}>
              {message?.scheduleData?.channel}: {message?.scheduleData?.duration} {message?.scheduleData?.timeUnits}
            </span>
            {message?.scheduleData?.participants?.length > 0 && (
              <span className={`${classes.replyLine} title`}>Participants...</span>
            )}
          </>
        );
      case '@callCancelBooked':
      case '@callScheduled':
        return (
          <>
            <span className={`${classes.replyLine} title`}>{`Event ${
              message?.scheduleData?.cancellation?.cancelledBy ? 'Cancelled' : 'Confirmed'
            }`}</span>
            <span className={`${classes.replyLine} title`}>{message?.scheduleData?.title}</span>
            <span className={classes.replyLine}>{getScheduledTimeString()}</span>
          </>
        );
      case '@NOTES':
        if (message?.isAttachment || message.isVoiceNote) {
          return (
            <div className={classes.voiceNote}>
              {renderIcon()}
              <p className={classes.messageText}>{message?.message}</p>
              {message?.message && message?.isAttachment ? null : (
                <>
                  {!message?.message && message?.isAttachment && (
                    <span
                      title={getFileNameFromAttachmentURL(message?.attachmentURL, true)}
                      className={`${classes.replyLine} ${commonClasses.sm10Regular}`}
                      style={imgType ? { width: '75%' } : audioType ? { width: '82%' } : { width: '85%' }}
                    >
                      {getFileNameFromAttachmentURL(message?.attachmentURL, true)}
                    </span>
                  )}
                  {message?.isVoiceNote && (
                    <div className={`${classes.duration} ${commonClasses.sm10Regular}`}>{`${
                      message?.voiceNote?.recordingMinutes
                    }:${
                      message?.voiceNote?.recordingSeconds < 10
                        ? '0' + message?.voiceNote?.recordingSeconds
                        : message?.voiceNote?.recordingSeconds
                    }`}</div>
                  )}
                  {message?.isVoiceNote && (
                    <span
                      className={`${classes.replyLine} ${commonClasses.sm10Regular}`}
                      style={imgType ? { width: '75%' } : audioType ? { width: '55%' } : { width: '85%' }}
                    >
                      {message.isVoiceNote ? 'Voice message' : getFileNameFromAttachmentURL(message?.attachmentURL, true)}
                    </span>
                  )}
                </>
              )}
            </div>
          );
        }

        return (
          <div className={classes.messageArea}>
            <div className={classes.messageArea}>{message?.message}</div>
            {YoutubeLink && (
              <img
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt="YouTube Thumbnail"
                width={'68px'}
                height={'69px'}
              />
            )}
          </div>
        );
      case '@kb-posts':
        return (
          <>
            <span className={`${classes.replyLine} title`}>
              {message?.knowledgeBasePost?.knowledgeBasePostTopics?.heading?.snippet}
            </span>
            <span className={`${classes.replyLine} kbPostDescription`}>
              {message?.knowledgeBasePost?.knowledgeBasePostTopics?.description?.snippet}
            </span>
          </>
        );
      case '@dist-receiver':
      case '@dist-starter':
      case '@dist-redo-response':
        return (
          <>
            <span className={`${classes.replyLine} title`}>{message?.survey?.surveyTitle}</span>
            <span className={`${classes.replyLine}`}>
              <QuestionmarkIcon /> {message?.survey?.postHeading}
            </span>
            {message?.survey?.postResponses?.length > 0 && (
              <span className={`${classes.replyLine}`}>{message?.survey?.postResponses[0]}</span>
            )}
          </>
        );
      default:
        return message?.message;
    }
  };

  return (
    <section className={`${classes.replyMessageContainer} ${messageClass ? messageClass : classes.bgcolor}`}>
      <div
        className={classes.messageContainer}
        onClick={() => {
          const element = document.getElementById(message?.messageId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
            setMsgHightLight(message?.messageId);
            setTimeout(() => {
              setMsgHightLight('');
            }, 1000);
          }
        }}
      >
        <div className={`${classes.messageContent} ${imgType || videoType ? 'attachment' : ''}`}>
          <ProfileWithName
            profileName={ProfName}
            profileURL={`${import.meta.env.VITE_DP_URL}${message.senderId}/profile-pic.png`}
            {...(message.senderId !== 'SYSTEM' && message.senderId === sessions.user.id && { loggenInUserName: 'You' })}
          />
          <main className={`${classes.replyMessageBox}`}>
            <div className={classes.replyMessage}>{getReplyContent()}</div>
            {message?.isStar && message?.isStar == true && <>{<StarIcon style={{ marginTop: '5px' }} />}</>}
            {message?.privacy && message.privacy}
          </main>
        </div>
        {imgType && (
          <div className={classes.thumbnaillContainer}>
            <img src={filesurl} alt="" />
          </div>
        )}
        {videoType && (
          <div className={classes.thumbnaillContainer}>
            <ReactPlayer url={filesurl} className="player" width="100%" height="126px" />
          </div>
        )}
      </div>
    </section>
  );
}
export default memo(MessageReply);
