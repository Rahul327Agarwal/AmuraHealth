import { memo, useMemo, useState } from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { useAppSelector } from '../../../../../DisplayFramework/State/store';
import { getTimeIn12HrFormat } from '../../../../LibraryComponents/ChatComponent/ChatComponent.functions';
import ChatReadMore from '../../../../LibraryComponents/ChatComponent/ChatReadMore/ChatReadMore';
import ProfileWithName from '../../../../LibraryComponents/ChatComponent/Message/ProfileWithName/ProfileWithName';
import VoiceNoteMessage from '../../../../LibraryComponents/ChatComponent/Message/VoiceNoteMessage/VoiceNoteMessage';
import ThreeDotMenu from '../../../../LibraryComponents/ThreeDotMenu/ThreeDotMenu';
import { DownArrowIcon, StarIcon } from '../../../../SVGs/Common';
import { useMessagePreview } from '../../ChatNotes.hooks';
import { DoubleSentTickIcon, SingleTickIcon } from '../../ChatNotes.svgs';
import ReplyMessage from '../ReplyMessage/ReplyMessage';
import { useSetRepliedToMessage } from '../ReplyMessage/ReplyMessage.state';
import { useStyles } from './ChatWrapper.styles';
import { IProps } from './ChatWrapper.types';

const DELIVERED_ICON = {
  true: <DoubleSentTickIcon />,
  false: <SingleTickIcon />,
};

const DEFAULT_ACTIONS = [{ label: 'Reply', value: 'REPLY' }];

const ChatWrapper = (props: IProps) => {
  const {
    message,
    children,
    actionOptions = [],
    actionRenderIcon,
    showActionIconAlways,
    onMessageAction,
    isFirstMessage,
    actionIconPosition,
    isOurMessage,
  } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  const setRepliedToMessage = useSetRepliedToMessage();
  const isTextMessage = typeof children === 'string';
  const { previewUrl } = useMessagePreview(isTextMessage ? children : null);
  const [showActionMenu, setShowActionMenu] = useState(false);

  const { userNames } = useAppSelector((s) => s.cache);

  const receivedTime = useMemo(() => getTimeIn12HrFormat(message?.receivedTime), [message?.receivedTime]);

  const onResend = () => {};

  const onAction = (value: string) => {
    onMessageAction?.(value);
    if (value === 'REPLY') {
      setRepliedToMessage({ open: true, message });
    }
  };

  const bgColor =
    message?.isVoiceNote && message?.isReply && !isOurMessage
      ? 'grey50'
      : message?.isVoiceNote && message?.isReply && isOurMessage
      ? 'grey25'
      : message?.privacy === '@me'
      ? 'grey100'
      : message?.privacy === '@team' && !isOurMessage
      ? 'grey25'
      : message?.privacy === '@team' && isOurMessage
      ? 'grey50'
      : '';

  const ProfName =
    isFirstMessage && message?.senderId !== 'SYSTEM' && message?.senderId ? userNames[message?.senderId] : message?.senderId;

  return (
    <section className={classes.chatRowWrapper} id={message?.messageId}>
      <div className={classes.chatWrapper}>
        {isFirstMessage && !isOurMessage && (
          <ProfileWithName
            customStyle={classes.profileName}
            profileName={ProfName}
            profileURL={`${import.meta.env.VITE_DP_URL}${message?.senderId}/profile-pic.png`}
          />
        )}
        <div
          data-bg={bgColor}
          className={classes.chatBubble}
          onPointerEnter={() => !showActionIconAlways && setShowActionMenu(true)}
          onPointerLeave={() => !showActionIconAlways && setShowActionMenu(false)}
        >
          <div className={classes.chatRow}>
            <div className={classes.chatMessage}>
              {message?.isReply && <ReplyMessage message={message?.repliedMessage} />}
              {message?.isVoiceNote && message?.voiceNote && message?.voiceNote.audio && (
                <div>
                  <VoiceNoteMessage
                    messageId={message.messageId}
                    audioUrl={message.voiceNote?.audio || ''}
                    recordingMinutes={message.voiceNote?.recordingMinutes || 0}
                    recordingSeconds={message.voiceNote?.recordingSeconds || 0}
                  />
                </div>
              )}
              {message?.prompt && message?.answer && !message?.promptResponseCode && (
                <div className={`${commonClasses.body17Medium} ${classes.chatPrompt}`}>{message?.prompt}</div>
              )}
              {isTextMessage ? (
                <div className={`${classes.preview}`}>
                  <ChatReadMore
                    text={children}
                    charLimit={750}
                    readMoreCustomClasses={`${commonClasses.body15Regular} ${classes.readMoreMessage}`}
                  />
                  {previewUrl && <img src={previewUrl} alt="YouTube Thumbnail" className={classes.previewImage} />}
                </div>
              ) : (
                children
              )}
            </div>
            <span
              className={classes.actionMenu}
              data-poistion={actionIconPosition ?? 'absolute'}
              data-show={showActionIconAlways || showActionMenu}
            >
              <ThreeDotMenu
                isDivider
                options={[...DEFAULT_ACTIONS, ...actionOptions]}
                handleClick={onAction}
                renderButton={actionRenderIcon ?? <DownArrowIcon style={{ cursor: 'pointer' }} />}
                usePopOver
                anchorAlignment={{ vertical: 'bottom', horizontal: 'right' }}
                popOverAlignment={{ horizontal: 'right', vertical: 'top' }}
              />
            </span>
          </div>

          {message?.privacy && (
            <div className={`${commonClasses.caption12Regular} ${classes.privacyTag}`}>{message?.privacy}</div>
          )}

          {!!message?.isStar && (
            <div className={`${commonClasses.caption12Regular} ${classes.starIconTag}`}>
              <StarIcon />
            </div>
          )}
        </div>
        <div className={classes.chatTime}>
          {!isOurMessage && <span className={`${commonClasses.caption12Regular}`}>{receivedTime}</span>}
          {isOurMessage &&
            (message.notSent ? (
              <div onClick={onResend} className={`${commonClasses.caption12Medium} ${classes.resendText}`}>
                Something went wrong. Click to resend.
              </div>
            ) : (
              <>
                {DELIVERED_ICON[`${!!message.delivered}`]}
                <span className={`${commonClasses.caption12Regular}`}>{receivedTime}</span>
                {/* <span className={`${commonClasses.caption12Regular}`}>{receivedTime}</span> */}
              </>
            ))}
        </div>
      </div>
    </section>
  );
};

export default memo(ChatWrapper);
