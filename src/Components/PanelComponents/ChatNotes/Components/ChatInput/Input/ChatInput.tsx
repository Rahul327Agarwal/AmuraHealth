import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { useStyles } from './ChatInput.styles';
import { useEffect, useRef, useState } from 'react';
import { AttachmentIcon } from '../MessageInput/MessageInput.svg';
import { SendIcon } from '../../../../../SVGs/Common';
import { useChatOpenedFlyout, useSetChatOpenedFlyout } from '../ChatFlyout/ChatFlyout.state';
import { useChatInput, useTyping } from './ChatInput.hooks';
import { ChatInputState } from './ChatInput.state';
import { useChatSender } from './ChatSend.hooks';
import { useRepliedToMessage, useSetRepliedToMessage } from '../../ReplyMessage/ReplyMessage.state';
import { CloseIconNew, SpeakGrayIcon } from '../../../../Notes/components/MessageInputNew/MessageInputNew.svg';
import MessageReply from '../../../../Notes/components/MessageReply/MessageReply';
import { useUserSession } from '../../../../../../DisplayFramework/State/Slices/Auth';
import { useAtom, useSetAtom } from 'jotai';
import { ChatVoiceRecorder } from '../ChatVoiceRecorder/ChatVoiceRecorder.';
import { useChatRecorder } from '../ChatVoiceRecorder/ChatVoiceRecorder.hooks';

let _globalInputContainerRef: React.MutableRefObject<HTMLDivElement> | undefined;
export const getChatInputBoxRef = () => _globalInputContainerRef;

export function ChatInput() {
  const session = useUserSession();
  const { handleTyping } = useTyping();
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const [isVoiceRecorderActive, setIsVoiceRecorderActive] = useState(false);
  const chatVoiceRecorderState = useChatRecorder();

  const [textInput, setTextInput] = useAtom(ChatInputState.inputValueAtom);

  const chatInput = useChatInput();

  const { openedFlyout, flyoutOptions } = useChatOpenedFlyout();
  const setFlyout = useSetChatOpenedFlyout();

  const chatSender = useChatSender();
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useAtom(ChatInputState.inputSendButtonDisabledAtom);
  const [chatAttachments, setChatAttachments] = useAtom(ChatInputState.attachmentsAtom);
  const [selectedAttachmentIndex, setSelectedAttachmentIndex] = useAtom(ChatInputState.currentSelectedAttachmentIndexAtom);
  const [chatAttachmentsText, setChatAttachmentsText] = useAtom(ChatInputState.attachmentsTextAtom);
  const repliedToMessage = useRepliedToMessage();
  const setRepliedToMessage = useSetRepliedToMessage();
  const [chatSuggestorOpenState] = useAtom(ChatInputState.suggestorOpenedAtom);

  const isAttachmentMode = openedFlyout === 'fileUpload' && chatAttachments.length >= 1;

  useEffect(() => {
    _globalInputContainerRef = inputContainerRef;
  }, [inputContainerRef]);

  useEffect(() => {
    if (chatVoiceRecorderState.recorderState.initRecording === false) {
      setIsVoiceRecorderActive(false);
    }
  }, [chatVoiceRecorderState.recorderState.initRecording]);

  function onTextChange(newText: string) {
    handleTyping();
    let text = newText;
    const regex = /<(font)\s*[^>]*>.*?<\/\1>/gi;
    text = text.replace(regex, '');

    if (isAttachmentMode) {
      // Attachment Mode
      setTextInput('');
      setChatAttachmentsText((p) => {
        const newTexts = [...p];
        newTexts[selectedAttachmentIndex] = newText;
        return newTexts;
      });
    } else {
      // Normal mode
      setTextInput(text);
    }
  }

  function onTextPaste(e: React.ClipboardEvent<HTMLDivElement>) {
    e.preventDefault();
    //TODO: Image paste
    let pastedText = e.clipboardData.getData('text/plain');
    if (pastedText) {
      const selection = window.getSelection();
      if (!selection.rangeCount) return false;
      const range = selection.getRangeAt(0);
      range.deleteContents();
      const textNode = document.createTextNode(pastedText);
      range.insertNode(textNode);
      // scroll to the end of the range
      const rangeRect = range.getBoundingClientRect();
      const { bottom, top } = inputRef.current.getBoundingClientRect();
      if (rangeRect.bottom > bottom || rangeRect.top < top) {
        inputRef.current.scrollBy(0, rangeRect.bottom - bottom);
      }
      range.setStartAfter(textNode);
      const updatedHtml = inputRef.current.innerHTML;

      onTextChange(updatedHtml);
      return;
    }
  }

  const handleSend = async () => {
    if (isSendDisabled) return;
    let sendSuccess = true;

    if (openedFlyout) {
      if (openedFlyout !== 'fileUpload') {
        sendSuccess = await chatSender.sendHandleSend();
      } else {
        if (chatAttachments.length >= 1) {
          chatAttachments.forEach((v, i) => {
            chatSender.sendMessageWithFile(chatAttachmentsText?.[i] ?? '', v.file);
          });
        }
      }
    } else {
      if (isVoiceRecorderActive) {
        // Voice Recording
        chatVoiceRecorderState.saveRecording();
        chatSender.sendMessage('', chatVoiceRecorderState.getVoiceNoteMessage());

        chatVoiceRecorderState.cancelRecording();
        setIsVoiceRecorderActive(false);
      } else {
        // Simple Text Message (includes @tags with no Popup)
        const res = await chatSender.sendMessage(textInput);
        sendSuccess = res === undefined ? true : res;
      }
    }

    if (sendSuccess) {
      // Reset Input
      setTextInput('');
      setChatAttachments([]);
      setChatAttachmentsText([]);
      setSelectedAttachmentIndex(-1);
      setRepliedToMessage({
        message: {},
        open: false,
      });
      setFlyout({});
    }
  };

  ChatInputState.useListenToInputKeyDownEvent(
    (e) => {
      if (openedFlyout && openedFlyout !== 'fileUpload') return;
      if (e.key === 'Enter' && !chatSuggestorOpenState) {
        e.preventDefault();
        handleSend();
      }
    },
    [chatSuggestorOpenState, chatAttachments, openedFlyout, textInput, chatAttachmentsText]
  );

  //

  const _inputText = isAttachmentMode ? chatAttachmentsText?.[selectedAttachmentIndex] ?? '' : textInput;

  const isDisabled = flyoutOptions?.disableInputOnOpen;
  const isAttachmentDisabled = isDisabled;

  const isSendDisabled = (() => {
    if (openedFlyout !== undefined) {
      return isSendButtonDisabled;
    } else if (isVoiceRecorderActive) {
      return false;
    } else {
      return !textInput;
    }
  })();

  const { classes } = useStyles({
    mainBoxShadowDisabled: openedFlyout && true,
  });

  return (
    <>
      {repliedToMessage?.open && repliedToMessage?.message && (
        <div className={`${classes.tagDiv} repliedMessage`}>
          <div
            className={classes.closeIocn}
            onClick={() => {
              setRepliedToMessage({ message: {}, open: false });
              setTextInput('');
            }}
          >
            <CloseIconNew />
          </div>
          <MessageReply message={repliedToMessage?.message} sessions={session} setMsgHightLight={() => {}} />
        </div>
      )}
      <div ref={inputContainerRef} className={classes.messageBox}>
        {/*  */}
        <div className={classes.messageGrid}>
          {isVoiceRecorderActive ? (
            <ChatVoiceRecorder recorderState={chatVoiceRecorderState.recorderState} handlers={chatVoiceRecorderState} />
          ) : (
            <>
              {/* Input Box (Includes Placeholder & Attachment Icon)*/}
              <div className={classes.contentEditableInputContainer}>
                <span className={`${classes.placeholderSpan} ${_inputText === '' ? classes.visibilty : classes.visibiltyNone}`}>
                  {'Type a message'}
                </span>
                <ContentEditable
                  innerRef={inputRef}
                  className={classes.contentEditableInput}
                  html={_inputText}
                  onChange={(e) => onTextChange(e.target.value)}
                  onPaste={onTextPaste}
                  inputMode="text"
                  onKeyDown={(e) => {
                    ChatInputState.dispatchKeyDownEvent(e);
                  }}
                  disabled={isDisabled}
                />

                <div
                  className={`${classes.attachmentIcon} ${isAttachmentDisabled ? classes.disableAttachment : ''}`}
                  onClick={() => {
                    if (isAttachmentDisabled) return;
                    chatInput.onAttachmentClick();
                  }}
                >
                  <AttachmentIcon />
                </div>
              </div>
              {/* End Input Box */}
            </>
          )}

          {!openedFlyout && !textInput.trim().length && !isVoiceRecorderActive ? (
            // Recorder
            <div
              className={classes.sendIconDiv}
              onClick={() => {
                setIsVoiceRecorderActive(true);
                chatVoiceRecorderState.startRecording();
              }}
            >
              <div className={classes.sendIcon}>
                <SpeakGrayIcon />
              </div>
            </div>
          ) : (
            // Normal Send Button (Includes sending recording)
            <div className={classes.sendIconDiv} onClick={handleSend}>
              <div className={!isSendDisabled ? classes.sendIcon : classes.disabledSendIcon}>
                <SendIcon />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
