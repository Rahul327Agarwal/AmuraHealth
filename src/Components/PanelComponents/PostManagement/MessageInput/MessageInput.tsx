import { debounce } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { useDispatch, useSelector } from 'react-redux';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { ScrollDownIcon, SendIcon } from '../PostManagement.svg';
import ErrorToaster from './../../../../Common/ErrorToaster';
import {
  setDisableAttachmentSend,
  setDisabledButton,
  setPostId,
  setPostMsgData,
  setResponseType,
} from './../../../../DisplayFramework/State/Slices/PostSlice';
import { IRootState } from './../../../../DisplayFramework/State/store';
import QuestionAnswer from './../../../LibraryComponents/ChatComponent/QuestionAnswer/QuestionAnswer';
import UploadFiles from './../../../LibraryComponents/ChatComponent/UploadFiles/UploadFiles';
import VoiceRecording from './../../../LibraryComponents/ChatComponent/VoiceRecording/VoiceRecording';
import useRecorder from './../../../LibraryComponents/ChatComponent/VoiceRecording/VoiceRecording.hooks';
import { UseRecorder } from './../../../LibraryComponents/ChatComponent/VoiceRecording/VoiceRecording.types';
import Button from './../../../LibraryComponents/MUIButton/MUIButton';
import MUIDrawer from './../../../LibraryComponents/MUIDrawer/MUIDrawer';
import {
  checkPostWithSameNameExist,
  createArrayForresponse,
  removeHtmlTagsFromSring,
  sendMessageAPI,
} from './MessageInput.functions';
import { useStyles } from './MessageInput.styles';
import { IProps, openDrawerState } from './MessageInput.types';

const startAdornment = '';
const defaultDrawerState: openDrawerState = { open: false, type: 'ATTACHMENT' };
const DEFAULT_INPUT_HEIGHT = 20;
const DEFAULT_INPUT_CONTAINER_HEIGHT = 88;
const DEFAULT_DEDUCTED_INPUT_WIDTH = 50;
const SPLITTER = ',';

const CALL_SYNTAX = ['Enter call tilte', 'Enter time in hh:mm', 'Enter Type - Video/Call', 'Tag Persons'];

export default function MessageInput(props: IProps) {
  const { tagOptions, postData, setTenantState, tenantState, showScrollDown, onScrollClick } = props;
  const { classes } = useStyles(props);
  const { id: panelId } = useCurrentPanel();
  const commonClasses = useCommonStyles();
  const { recorderState, ...handlers }: UseRecorder = useRecorder();
  const { initRecording } = recorderState;
  const { cancelRecording } = handlers;
  const { audio = '', recordingMinutes = 0, recordingSeconds = 0 } = recorderState;
  const voiceNote = { audio, recordingMinutes, recordingSeconds };

  const [input, setInput] = useState(postData.message || '');
  const [selectedFiles, setSelectedFile] = useState([]);
  const [_rerenderFlag, setRerenderFlag] = useState(0);
  const [disableSend, setDisableSend] = useState(true);
  const [scheduleData, setScheduleData] = useState({});
  const [inputSize, setInputSize] = useState({
    newHeight: null,
    height: null,
    width: null,
    newWidth: null,
  });
  const [originalTagOptions, setOriginalTagOptions] = useState([]);
  const [suggestionText, setSuggestionText] = useState('');
  const [suggestionTextError, setSuggestionTextError] = useState('');
  const [openDrawer, setOpenDrawer] = useState<openDrawerState>(defaultDrawerState);
  const [msgDisable, setMsgDisable] = useState(false);
  const postId = useSelector((state: IRootState) => state.post.postId);
  const disabledByAttachment = useSelector((state: IRootState) => state.post.disableSend);
  const postListData = useSelector((state: IRootState) => state.post.postList);
  const text = useRef(postData.message || '');
  const tagText = useRef('');
  const files = useRef([]);
  const suggestionsRef = useRef([]);
  const isSuggestionOpen = useRef(false);
  const focusIndex = useRef(0);
  const innerRef: any = useRef(null);
  const callSyntaxIndex = useRef(null);
  const inputHeight = useRef(null);
  const dispatch = useDispatch();
  const inputRef: any = React.useRef(null);
  const propsCurrent: any = React.useRef(null);
  const responseType: any = useSelector((state: IRootState) => state.post.responseType);
  const [showScrollDownIcon, setShowScrollDownIcon] = useState(true);

  useEffect(() => {
    setDisableSend(true);
    dispatch(setDisableAttachmentSend(false));

    setSelectedFile([]);
    setInputSize({
      newHeight: null,
      height: null,
      width: null,
      newWidth: null,
    });
    propsCurrent.current = JSON.parse(JSON.stringify(props));
    innerRef?.current?.focus({
      preventScroll: true,
    });
  }, [props]);

  useEffect(() => {
    if (!text.current.trim()) {
      setSuggestionText('');
    }
  }, [text.current]);

  useEffect(() => {
    if ((text.current.trim() || selectedFiles.length) && propsCurrent?.current?.postData?.type) {
      setDisableSend(false);
    } else setDisableSend(true);
  }, [text.current, selectedFiles]);

  useEffect(() => {
    if (tagOptions.length) {
      const modifiedTags = tagOptions.map(({ id, label }) => ({
        id,
        label: label.replace(' ', '&nbsp;'),
      }));
      setOriginalTagOptions(modifiedTags);
      suggestionsRef.current = modifiedTags;
    }
  }, [tagOptions]);

  useEffect(() => {
    const callbackFunction = () => {
      if (innerRef?.current?.offsetHeight && innerRef?.current?.offsetWidth) {
        setInputSize({
          newHeight: innerRef?.current?.offsetHeight - DEFAULT_INPUT_HEIGHT,
          height: innerRef?.current?.offsetHeight,
          width: innerRef?.current?.offsetWidth,
          newWidth: innerRef?.current?.offsetWidth - DEFAULT_DEDUCTED_INPUT_WIDTH,
        });
      }
    };
    const observer = new ResizeObserver(callbackFunction);
    if (innerRef?.current) observer.observe(innerRef.current);
    return () => {
      if (innerRef?.current) observer.unobserve(innerRef?.current);
    };
  }, []);

  useEffect(() => {
    if (tenantState.tenantId && postData.type === 'heading' && postData.action === 'ADD') {
      handleSend(panelId, tenantState.message);
      setTenantState({ open: false, tenantId: '', message: '' });
      return;
    }
    if (postData?.msgMapper) {
      setInput('');
      text.current = '';
      setMsgDisable(false);
      setOpenDrawer({ type: postData?.msgMapper, open: true });

      if (postData?.msgMapper === 'THUMBNAIL' || postData?.msgMapper === 'ATTACHMENT') {
        setShowScrollDownIcon(false);
        setMsgDisable(true);
        setInput('');
        text.current = '';
      }
    } else {
      setOpenDrawer({
        type: 'TAG_SUGGESTION',
        open: false,
      });
      setMsgDisable(true);
      setInput('');
      text.current = '';
    }
  }, [isSuggestionOpen.current, postData]);

  const handleSend = (panelId: string, currentMessage?: string) => {
    const newText = trimSpaces(text.current);
    if (!((newText.trim() || selectedFiles.length || currentMessage) && propsCurrent?.current?.postData?.type)) return;
    if (
      checkPostWithSameNameExist(postListData, currentMessage?.trim() ?? newText?.trim(), propsCurrent?.current?.postData?.type)
    ) {
      ErrorToaster('A post with same heading already exists! Please try another heading', panelId, 'error');

      return;
    }
    if (postData.type === 'heading' && postData.action === 'ADD' && tenantState.tenantId === '') {
      return setTenantState((pre) => ({
        ...pre,
        open: true,
        message: newText.trim(),
      }));
    }

    if (responseType.length > 0) {
      const responseArray = createArrayForresponse(currentMessage?.trim() ?? newText?.trim());
      if (responseArray.length <= 0) {
        ErrorToaster('Please Enter a valid response', panelId, 'error');
        return;
      }
    }

    sendMessageAPI(
      props.parentProps,
      setDisableSend,
      selectedFiles.length > 0 ? selectedFiles[0] : null,
      currentMessage?.trim() ?? newText?.trim(),
      resetInput,
      voiceNote,
      tagOptions,
      {},
      scheduleData,
      postId,
      propsCurrent?.current?.postData,
      responseType
    );
  };
  const handleClose = () => {
    resetInput();
  };

  const debouncefun = debounce(handleSend, 200);

  const renderDrawerContent = () => {
    switch (openDrawer.type) {
      case 'ATTACHMENT':
      case 'THUMBNAIL':
        return (
          <UploadFiles
            handleClose={handleClose}
            handleSave={(files) => setSelectedFile([files])}
            headerTitle={propsCurrent?.current?.postData?.headerText}
            headerTitleIcon={openDrawer.type === 'THUMBNAIL' ? 'thumbnailUplaod' : 'attachmentUpload'}
            {...(openDrawer.type === 'THUMBNAIL' && {
              fileOptions: ['PHOTOS'],
            })}
            directShowCrop={true}
            viewCross={false}
          />
        );
      case 'QUESTION_ANSWER':
        return (
          <QuestionAnswer
            question={propsCurrent?.current?.postData?.headerText}
            iconType={propsCurrent?.current?.postData?.type}
          />
        );
    }
  };

  const handleOnPast = (e) => {
    if (e.clipboardData.getData('text')) {
      handleChange(e);
      return;
    }
    e.preventDefault();
  };
  const onBeforeInput = (e) => {
    const value = e.target.innerText + e.data;

    if (callSyntaxIndex.current === null) return;
    const callTagged = value.split(' ')[0];
    const myText = value.replace(callTagged, '').split(SPLITTER);
    const currentText = myText[callSyntaxIndex.current].trim();
    switch (callSyntaxIndex.current) {
      case 0:
        if ((currentText.length <= 0 || currentText.length > 20) && e.data === SPLITTER) {
          const errorMessage = 'Error in ' + CALL_SYNTAX[callSyntaxIndex.current];
          setSuggestionTextError(errorMessage);
          return e.preventDefault();
        }
        setSuggestionTextError('');
        break;
      case 1:
        const timeArr = currentText.split(':');
        const hr = timeArr?.[0] ? Number(timeArr?.[0]) : null;
        const mm = timeArr?.[1] ? Number(timeArr?.[1]) : null;
        if (!(hr >= 0 && hr <= 99 && mm >= 0 && mm <= 60)) {
          const errorMessage = 'Error in ' + CALL_SYNTAX[callSyntaxIndex.current];
          setSuggestionTextError(errorMessage);
          return e.preventDefault();
        }
        setSuggestionTextError('');
        break;
      case 2:
        if (!(currentText.toLowerCase() === 'video' || currentText.toLowerCase() === 'call') && e.data === SPLITTER) {
          const errorMessage = 'Error in ' + CALL_SYNTAX[callSyntaxIndex.current];
          setSuggestionTextError(errorMessage);
          return e.preventDefault();
        }
        setSuggestionTextError('');
        break;
      case 3:
        const tags = currentText.split(' ');
        const lastTagged = tags[tags.length - 1].trim();
        if (lastTagged.charAt(0) && lastTagged.charAt(0) !== '@') {
          const errorMessage = 'Error in ' + CALL_SYNTAX[callSyntaxIndex.current];
          setSuggestionTextError(errorMessage);
          return e.preventDefault();
        }
        setSuggestionTextError('');
        break;
    }
  };
  let trimSpaces = (value: string) => {
    return value
      .replace(/&nbsp;/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<');
  };

  const handleChange = (evt) => {
    let value = evt.target.value;
    const curvalue = removeHtmlTagsFromSring(value);
    text.current = removeHtmlTagsFromSring(curvalue);
    setInput(value);
  };
  const handleKeyDown = (event) => {
    const key = event.key;

    const index = focusIndex.current;
    switch (key) {
      case 'Up':
      case 'ArrowUp': {
        if (!isSuggestionOpen.current) return;
        if (index > 0) {
          focusIndex.current = index - 1;
        }
        event.preventDefault();
        return;
      }
      case 'Down':
      case 'ArrowDown': {
        if (!isSuggestionOpen.current) return;
        if (index < suggestionsRef.current?.length - 1) {
          focusIndex.current = index + 1;
        }
        event.preventDefault();
        return;
      }
      case 'Enter': {
        event.preventDefault();
        setDisableSend(true);
        debouncefun(panelId);

        return;
      }
      default: {
        if (callSyntaxIndex.current === 3 || callSyntaxIndex.current === null) {
          if (key === ' ') tagText.current = ' ';
          else if (tagText.current === ' ' && key === '@') tagText.current = '@';
          else if (tagText.current.startsWith('@') && key.length === 1) tagText.current = tagText.current + key;
          // else if (tagText.current === " " && key !== "@" && key.length === 1) tagText.current = "";
        }
        return;
      }
    }
  };
  const resetInput = () => {
    setInput('');
    dispatch(setDisabledButton(false));
    dispatch(setDisableAttachmentSend(false));
    text.current = '';
    focusIndex.current = 0;
    suggestionsRef.current = originalTagOptions;
    resetAttachments();
    cancelRecording();
    setScheduleData({});
    dispatch(setPostId(''));
    setOpenDrawer({ type: 'ATTACHMENT', open: false });
    dispatch(setPostMsgData({}));
    dispatch(setResponseType(''));
    setTenantState({ open: false, tenantId: '', message: '' });
    setSelectedFile([]);
    setMsgDisable(true);
    setDisableSend(true);
    setShowScrollDownIcon(true);
    setInputSize({
      newHeight: innerRef?.current?.offsetHeight - DEFAULT_INPUT_HEIGHT,
      height: innerRef?.current?.offsetHeight,
      width: innerRef?.current?.offsetWidth,
      newWidth: innerRef?.current?.offsetWidth - DEFAULT_DEDUCTED_INPUT_WIDTH,
    });
  };
  const resetAttachments = () => {
    setSelectedFile([]);
    files.current = [];
    setRerenderFlag(new Date().getTime());
    setInputSize({
      newHeight: innerRef?.current?.offsetHeight - DEFAULT_INPUT_HEIGHT,
      height: innerRef?.current?.offsetHeight,
      width: innerRef?.current?.offsetWidth,
      newWidth: innerRef?.current?.offsetWidth - DEFAULT_DEDUCTED_INPUT_WIDTH,
    });
  };
  const handleChatWrapper = (e) => {
    e.preventDefault();
    innerRef.current.focus({
      preventScroll: true,
    });
  };
  return (
    <>
      {showScrollDown && showScrollDownIcon && (
        <span
          className={`${classes.scrollDownButton} ${classes.center}`}
          onClick={() => {
            onScrollClick();
          }}
        >
          {<ScrollDownIcon />}
        </span>
      )}
      <div className={classes.messageInputContainer}>
        {startAdornment ? <div className={classes.firstContainer}>{startAdornment}</div> : null}
        <div className={classes.middleContainer}>
          {initRecording && <VoiceRecording recorderState={recorderState} handlers={handlers} />}
          {!initRecording && (
            <div className={classes.chatInputWrapper} onClick={handleChatWrapper}>
              <span className={`${commonClasses.body15Regular} ${classes.inputPlaceholder} ${input ? 'hidden' : ''}`}>
                {postData.placeHolderText ?? 'Type something'}
              </span>
              {suggestionTextError && (
                <div className={`${commonClasses.caption12Regular} ${classes.suggestionTextError}`}>{suggestionTextError}</div>
              )}

              <ContentEditable
                contentEditable={true}
                ref={inputRef}
                className={`${commonClasses.body15Regular} ${classes.inputStyle}`}
                html={text.current}
                onPaste={handleOnPast}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onBeforeInput={onBeforeInput}
                innerRef={innerRef}
                disabled={msgDisable}
                style={{
                  ...(inputHeight.current && suggestionText ? { height: `${inputHeight.current}px` } : {}),
                }}
              />
            </div>
          )}
        </div>
        <div className={classes.lastContainer}>
          <Button
            size="small"
            variant="contained"
            disabled={disableSend || disabledByAttachment}
            className={classes.sendButton}
            onClick={() => handleSend(panelId)}
          >
            {<SendIcon />}
          </Button>
        </div>
      </div>
      {openDrawer.open && (
        <div
          className={classes.mainAttachmentWrapper}
          style={{
            ...(inputSize.newHeight && {
              bottom: `${DEFAULT_INPUT_CONTAINER_HEIGHT + inputSize.newHeight}px`,
            }),
            ...(openDrawer.open && { zIndex: 100 }),
          }}
        >
          <div className={classes.attachmentWrapper}>
            <MUIDrawer
              anchor="bottom"
              open={openDrawer.open}
              handleClose={handleClose}
              noHeader={openDrawer.type === 'ATTACHMENT'}
            >
              {renderDrawerContent()}
            </MUIDrawer>
          </div>
        </div>
      )}
    </>
  );
}
