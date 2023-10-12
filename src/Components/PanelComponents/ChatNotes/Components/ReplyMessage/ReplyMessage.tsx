import { format } from 'date-fns';
import { memo, useEffect, useState } from 'react';
import { convertTimeWithOffset, getTimeZoneAbbrevation, getVoiceNoteFromURL } from '../../../../../Common/Common.functions';
import { useUserSession } from '../../../../../DisplayFramework/State/Slices/Auth';
import { useAppSelector } from '../../../../../DisplayFramework/State/store';
import { getFileNameFromAttachmentURL } from '../../../../LibraryComponents/ChatComponent/ChatComponent.functions';
import {
  AUDIO,
  FILE_TYPES,
  IMAGE,
  VIDEO,
} from '../../../../LibraryComponents/ChatComponent/Message/AttachmentMessage/AttachmentMessage.types';
import ProfileWithName from '../../../../LibraryComponents/ChatComponent/Message/ProfileWithName/ProfileWithName';
import { FileIcon, MusicIcon, PicturesIcon, QuestionmarkIcon, StarIcon, VideoIcon } from '../../../../SVGs/Common';
import { useStyles } from './ReplyMessage.styles';
import { IProps } from './ReplyMessage.types';

const FILE_ICON = {
  [IMAGE]: <PicturesIcon />,
  [AUDIO]: <MusicIcon />,
  [VIDEO]: <VideoIcon />,
};

const renderFileIcon = (fileType: string) => FILE_ICON[fileType] ?? <FileIcon />;

function ReplyMessage(props: IProps) {
  const { message } = props;

  const { classes } = useStyles();
  const session = useUserSession();
  const { userNames } = useAppSelector((s) => s.cache);

  const [filesurl, setfilesurl] = useState('');

  useEffect(() => {
    if (message?.attachmentURL) {
      getVoiceNoteFromURL(session, message?.attachmentURL).then((url: any) => {
        if (url) setfilesurl(url);
      });
    }
  }, [message?.attachmentURL]);

  const ProfName =
    message.senderId !== 'SYSTEM' && message.senderId
      ? message.senderId === session.user.id
        ? 'You'
        : userNames[message.senderId]
      : message.senderId;

  let fileExtension = message?.attachmentURL?.split('.').pop().toLocaleLowerCase();
  const fileType = FILE_TYPES[fileExtension];

  const onScrollToMessage = () => {
    const focusEle: HTMLElement = document.getElementById(message?.messageId);

    if (focusEle) {
      focusEle.setAttribute('data-search-focus', 'true');
      focusEle.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        focusEle.removeAttribute('data-search-focus');
      }, 2000);
    }
  };

  const getScheduledTimeString = () => {
    const fromTime = message?.scheduleData?.fromTime;
    const clientBookedTimeZone = message?.scheduleData?.clientBookedTimeZone;
    let convertedFromTime = fromTime && clientBookedTimeZone ? convertTimeWithOffset(fromTime, clientBookedTimeZone) : fromTime;
    return (
      format(new Date(convertedFromTime || new Date()), 'eee dd, MMM yyyy ') +
      ' | ' +
      format(new Date(convertedFromTime || new Date()), ' hh:mm a') +
      (clientBookedTimeZone ? ' (' + getTimeZoneAbbrevation(clientBookedTimeZone) + ')' : '') +
      '...'
    );
  };

  const getReplyContent = () => {
    switch (message?.ContextType) {
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
        if (message?.isAttachment) {
          return (
            <>
              {renderFileIcon(fileType)}
              {message?.message}
              {message?.message && message?.isAttachment ? (
                <></>
              ) : (
                <span className={classes.replyLine} style={fileType === IMAGE ? { width: '75%' } : { width: '85%' }}>
                  {' '}
                  {getFileNameFromAttachmentURL(message?.attachmentURL, true)}
                </span>
              )}
            </>
          );
        }
        return message?.message;
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
    <section className={classes.replyMessageContainer} onClick={onScrollToMessage}>
      <div className={`${classes.messageContent} ${fileType === IMAGE ? 'attachment' : ''}`}>
        <ProfileWithName
          customStyle={classes.profile}
          profileName={ProfName}
          profileURL={`${import.meta.env.VITE_DP_URL}${message.senderId}/profile-pic.png`}
        />
        <main className={`${classes.replyMessageBox}`}>
          <div className={classes.replyMessage}>{getReplyContent()}</div>
          {!!message?.isStar && <StarIcon style={{ marginTop: '5px' }} />}
          {message?.privacy && message.privacy}
        </main>
      </div>
      {fileType === IMAGE && (
        <div className={classes.thumbnaillContainer}>
          <img src={filesurl} alt="" />
        </div>
      )}
    </section>
  );
}
export default memo(ReplyMessage);
