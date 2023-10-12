import React, { useEffect, useState } from 'react';
import { getVoiceNoteFromURL } from '../../../../../Common/Common.functions';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { useDFEvent, useDFGoBack } from '../../../../../DisplayFramework/Events/DFEvents';
import { useUserSession } from '../../../../../DisplayFramework/State/Slices/Auth';
import AudioPlayer from '../../../../LibraryComponents/ChatComponent/AudioPlayer/AudioPlayer';
import { getFileNameFromAttachmentURL, getMBFromKB } from '../../../../LibraryComponents/ChatComponent/ChatComponent.functions';
import ChatReadMore from '../../../../LibraryComponents/ChatComponent/ChatReadMore/ChatReadMore';
import { createStringWithLinks } from '../../../../LibraryComponents/ChatComponent/ChatReadMore/ChatReadMore.functions';
import VideoPlayerNewDesign from '../../../../LibraryComponents/ChatComponent/VideoPlayerNewDesign/VideoPlayerNewDesign';
import { FileIcon, PicturesIcon, VideoIcon } from '../../../../SVGs/Common';
import { IChatMessage } from '../../ChatMessage/ChatMessage.types';
import { getChatNoteContainerRef } from '../../ChatNotes';
import { useSetRepliedToMessage } from '../ReplyMessage/ReplyMessage.state';
import { useAttachmentOptions } from './AttachmentMessage.hooks';
import { useStyles } from './AttachmentMessage.styles';
import { AUDIO, FILE_TYPES, IMAGE, IProps, VIDEO } from './AttachmentMessage.types';

export function getFileDetailsFromMessage(message?: IChatMessage) {
  return {
    fileType: FILE_TYPES[message?.attachmentURL?.split('.').pop().toLocaleLowerCase()],
    fileName: getFileNameFromAttachmentURL(message!.attachmentURL!),
    fileSize: getMBFromKB(message!.attachmentFileSize!),
    messageText: createStringWithLinks(message!.message ?? ''),
  };
}

const AttachmentMessage = (props: IProps) => {
  const { message } = props;
  const sessions = useUserSession();
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const [filesurl, setfilesurl] = useState('');
  const containerRef = React.useRef<HTMLDivElement>();
  const chatContainerRef = getChatNoteContainerRef();
  const { download } = useAttachmentOptions(message);
  const setRepliedToMessage = useSetRepliedToMessage();

  const triggerEvent = useDFEvent();

  const openPreview = () => {
    if (!filesurl || (fileType !== VIDEO && fileType !== IMAGE)) return;
    const calculateAnimationOrigin = () => {
      if (chatContainerRef?.current && containerRef?.current) {
        const parentRect = chatContainerRef?.current.getBoundingClientRect();
        const childRect = containerRef.current.getBoundingClientRect();
        const distanceFromLeft = childRect.left - parentRect.left;
        const distanceFromRight = parentRect.right - childRect.right;
        const distanceFromTop = childRect.top - parentRect.top;
        const distanceFromBottom = parentRect.bottom - childRect.bottom;
        return {
          left: distanceFromLeft,
          right: distanceFromRight,
          top: distanceFromTop,
          bottom: distanceFromBottom,
        };
      }
      return { left: 0, right: 0, top: 0, bottom: 0 };
    };

    triggerEvent('onMediaPreview', {
      url: filesurl,
      text: messageText,
      senderId: message.senderId,
      receivedTime: message?.receivedTime,
      type: fileType,
      openFrom: calculateAnimationOrigin(),
      handleOptions: (data: string) => {
        if (data === 'DOWNLOAD') {
          download();
        }
        if (data === 'REPLY') {
          setRepliedToMessage({ open: true, message });
        }
      },
    });
  };

  useEffect(() => {
    if (message?.attachmentURL) {
      getVoiceNoteFromURL(sessions, message.attachmentURL).then((url: any) => {
        if (url) setfilesurl(url);
      });
    }
  }, [message?.attachmentURL]);

  const { fileType, fileName, fileSize, messageText } = React.useMemo(
    () => getFileDetailsFromMessage(message),
    [message?.attachmentURL]
  );

  return (
    <section className={classes.partyAttachmentBox} ref={containerRef} onClick={openPreview}>
      {fileType === IMAGE ? (
        <div className={classes.attachmentWrapper}>
          <div className={classes.attachmentImg}>
            <img src={filesurl} alt="" />
          </div>
        </div>
      ) : fileType === VIDEO ? (
        <>
          <VideoPlayerNewDesign src={filesurl} fileName={''} sessions={sessions} messageId={message?.messageId} />
        </>
      ) : fileType === AUDIO ? (
        <div>
          <AudioPlayer
            messageId={message?.messageId}
            audioUrl={filesurl}
            recordingMinutes={0}
            recordingSeconds={0}
            audioName={fileName}
          />
        </div>
      ) : (
        <div className={classes.attachmentWrapper}></div>
      )}
      {/* {attachmentError && (
        <div className={`${commonClasses.sm10Regular} ${classes.errorMessage}`}>Download failed. Tap to retry</div>
      )} */}
      {fileType !== AUDIO && (
        <div
          className={`${fileType !== IMAGE && fileType !== VIDEO ? classes.attachmentDetailsWrap : classes.attachmentDetails}`}
        >
          <span className={classes.flexBox}>
            {fileType === IMAGE ? <PicturesIcon /> : fileType === VIDEO ? <VideoIcon /> : <FileIcon />}
          </span>
          <span
            className={`${classes.flexBox} ${
              fileType !== IMAGE && fileType !== AUDIO && fileType !== VIDEO ? classes.flex1 : null
            }`}
          >
            <div className={`${commonClasses.body15Medium} ${classes.attachmentName}`} title={fileName}>
              {fileName}
            </div>
          </span>

          <>
            {fileType === IMAGE || fileType === VIDEO ? (
              <span className={`${commonClasses.sm10Regular} ${classes.downloadSize}`}>{fileSize}</span>
            ) : (
              <>
                <span className={classes.downloadWrapper}>
                  <span className={`${commonClasses.sm10Regular} ${classes.downloadSize}`}>{fileSize}</span>
                </span>
              </>
            )}
          </>
        </div>
      )}

      {/* the text message sent with attachment */}
      {props.message.message && typeof props.message.message === 'string' ? (
        <div className={`${classes.messageTextWrapper}`}>
          <ChatReadMore text={props.message.message} charLimit={750} readMoreCustomClasses={`${commonClasses.body15Regular}`} />
        </div>
      ) : null}
    </section>
  );
};

export default React.memo(AttachmentMessage);
