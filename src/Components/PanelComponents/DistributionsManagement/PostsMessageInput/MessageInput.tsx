import { debounce } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { useDispatch, useSelector } from 'react-redux';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import QuestionAnswer from '../../../LibraryComponents/ChatComponent/QuestionAnswer/QuestionAnswer';
import UploadFiles from '../../../LibraryComponents/ChatComponent/UploadFiles/UploadFiles';
import VoiceRecording from '../../../LibraryComponents/ChatComponent/VoiceRecording/VoiceRecording';
import useRecorder from '../../../LibraryComponents/ChatComponent/VoiceRecording/VoiceRecording.hooks';
import { UseRecorder } from '../../../LibraryComponents/ChatComponent/VoiceRecording/VoiceRecording.types';
import Button from '../../../LibraryComponents/MUIButton/MUIButton';
import MUIDrawer from '../../../LibraryComponents/MUIDrawer/MUIDrawer';
import { SendIcon } from '../../../SVGs/Common';
import { SNIPPETS_ID } from '../Summary/Summary.function';
import ErrorToaster from './../../../../Common/ErrorToaster';
import {
  setDisabledaddBtnInList,
  setDisabledaddBtnInLMS,
  setDisabledaddBtnInPolls,
  setDisabledaddBtnInQMT,
  setResponseType,
  setStoreData,
} from './../../../../DisplayFramework/State/Slices/AllPostsDataSlice';
import { IRootState } from './../../../../DisplayFramework/State/store';
import { checkPostWithSameNameExist, removeHtmlTagsFromSring, sendMessageAPI } from './MessageInput.functions';
import { useStyles } from './MessageInput.styles';
import { IProps, openDrawerState } from './MessageInput.types';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
const startAdornment = '';
const defaultDrawerState: openDrawerState = { open: false, type: 'ATTACHMENT' };
const tagOptions = [
  { id: '111', label: 'Pankaj Chauhan' },
  { id: '222', label: 'Rahul Borle' },
  { id: '333', label: 'Raj Rajput' },
  { id: '444', label: 'Shivam' },
  { id: 'BOT_CALL', label: 'Call' },
];
const DEFAULT_INPUT_HEIGHT = 20;
const DEFAULT_INPUT_CONTAINER_HEIGHT = 88;
const DEFAULT_DEDUCTED_INPUT_WIDTH = 50;
const SPLITTER = ',';

const CALL_SYNTAX = ['Enter call tilte', 'Enter time in hh:mm', 'Enter Type - Video/Call', 'Tag Persons'];

export default function MessageInput(props: IProps) {
  const { tagOptions, handleOpenTenant } = props;

  const { classes } = useStyles(props);
  const { id: panelId } = useCurrentPanel();
  const commonClasses = useCommonStyles();

  const {
    storeData,
    uniqueId,
    tenantId,
    datalist,
    disableSend: disabledByAttachment,
  }: any = useSelector((state: IRootState) => state.AllPostData);

  const { recorderState, ...handlers }: UseRecorder = useRecorder();
  const { initRecording } = recorderState;
  const { startRecording, saveRecording, cancelRecording } = handlers;
  const { audio = '', recordingMinutes = 0, recordingSeconds = 0 } = recorderState;
  const voiceNote = { audio, recordingMinutes, recordingSeconds };

  const [input, setInput] = useState(storeData.message || '');
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
  const [selectedFiles, setSelectedFile] = useState([]);
  const [rerenderFlag, setRerenderFlag] = useState(0);
  const [disableSend, setDisableSend] = useState(true);
  const [changeEventname, setChangeEventname] = useState('');
  const [contextType, setContextType] = useState('');
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

  const text = useRef(storeData.message || '');
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
  const responseType: any = useSelector((state: IRootState) => state.AllPostData.responseType);
  const [disableAPI, setDisableAPI] = useState(false);

  useEffect(() => {
    if (!text.current.trim()) {
      // callSyntaxIndex.current === null;
      setSuggestionText('');
    }
  }, [text.current]);

  useEffect(() => {
    if ((text.current.trim() || selectedFiles.length) && storeData.type) {
      setDisableSend(false);
    } else setDisableSend(true);
  }, [text.current, selectedFiles]);

  useEffect(() => {
    if (tagOptions.length) {
      const modifiedTags: any = tagOptions.map(({ id, label }) => ({
        id,
        label: label.replace(' ', '&nbsp;'),
      }));
      setOriginalTagOptions(modifiedTags);
      suggestionsRef.current = modifiedTags;
    }
  }, [tagOptions]);

  useEffect(() => {
    const callbackFunction = (entries: any) => {
      if (innerRef?.current?.offsetHeight && innerRef?.current?.offsetWidth) {
        setInputSize({
          newHeight: innerRef?.current?.offsetHeight - DEFAULT_INPUT_HEIGHT,
          height: innerRef?.current?.offsetHeight,
          width: innerRef?.current?.offsetWidth,
          newWidth: innerRef?.current?.offsetWidth - DEFAULT_DEDUCTED_INPUT_WIDTH,
        } as any);
      }
      if (innerRef?.current?.offsetHeight === 0) {
        setInputSize({
          newHeight: 0,
          height: 0,
          width: innerRef?.current?.offsetWidth,
          newWidth: innerRef?.current?.offsetWidth - DEFAULT_DEDUCTED_INPUT_WIDTH,
        } as any);
      }
    };
    const observer = new ResizeObserver(callbackFunction);
    if (innerRef?.current) observer.observe(innerRef.current);
    return () => {
      if (innerRef?.current) observer.unobserve(innerRef?.current);
    };
  }, []);

  useEffect(() => {
    if (storeData?.msgMapper) {
      setInput('');
      text.current = '';
      setMsgDisable(false);
      setOpenDrawer({ type: storeData?.msgMapper, open: true });

      if (storeData?.msgMapper === 'THUMBNAIL' || storeData?.msgMapper === 'ATTACHMENT') {
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
  }, [isSuggestionOpen.current, storeData]);
  const handleSend = async (currentMessage?: string) => {
    const newText = trimSpaces(text.current.trim());
    if ((newText.trim() || selectedFiles.length || currentMessage) && storeData.type) {
      if (checkPostWithSameNameExist(datalist, text.current?.trim(), storeData.type)) {
        if (props.parentProps.type === 'QMT') {
          ErrorToaster('A QMT with same title already exists! Please try another title', panelId, 'error');
        } else {
          ErrorToaster('A poll with same title already exists! Please try another title', panelId, 'error');
        }
        return;
      }
      if (storeData.type === SNIPPETS_ID.TITLE && storeData.action === 'ADD') {
        return handleOpenTenant?.(newText.trim());
      }

      await sendMessageAPI(
        panelId,
        props.parentProps,
        setDisableSend,
        selectedFiles.length > 0 ? selectedFiles[0] : null,
        currentMessage?.trim() ?? newText?.trim(),
        resetInput,
        voiceNote as any,
        tagOptions,
        {},
        scheduleData,
        uniqueId,
        storeData,
        responseType,
        tenantId
      );
    }
  };

  const handleClose = () => {
    resetInput();
  };
  const renderDrawerContent = () => {
    switch (openDrawer.type) {
      case 'ATTACHMENT':
      case 'THUMBNAIL':
        return (
          <UploadFiles
            handleClose={handleClose}
            handleSave={(files: any) => setSelectedFile([files] as any)}
            headerTitle={storeData.headerText}
            headerTitleIcon={openDrawer.type === 'THUMBNAIL' ? 'thumbnailUplaod' : 'attachmentUpload'}
            {...(openDrawer.type === 'THUMBNAIL' && {
              fileOptions: ['PHOTOS'],
            })}
            directShowCrop={true}
            viewCross={false}
          />
        );
      case 'QUESTION_ANSWER':
        return <QuestionAnswer question={storeData.headerText} iconType={storeData.type} />;
    }
  };

  const handleOnPaste = (e: any) => {
    if (e.clipboardData.getData('text')) {
      handleChange(e);
      return;
    }
    e.preventDefault();
  };

  const onBeforeInput = (e: any) => {
    const value = e.target.innerText + e.data;

    if (callSyntaxIndex.current !== null) {
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
    }
  };
  let trimSpaces = (value: any) => {
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
    setInput(curvalue);
  };

  const debouncefun = debounce(handleSend, 200);

  const handleKeyDown = (event: any) => {
    const key = event.key;

    const index = focusIndex.current;
    switch (key) {
      case 'Up':
      case 'ArrowUp': {
        if (!isSuggestionOpen.current) return;
        if (index > 0) {
          focusIndex.current = index - 1;
          setSuggestionIndex(index - 1);
        }
        event.preventDefault();
        return;
      }
      case 'Down':
      case 'ArrowDown': {
        if (!isSuggestionOpen.current) return;
        if (index < suggestionsRef.current?.length - 1) {
          focusIndex.current = index + 1;
          setSuggestionIndex(index + 1);
        }
        event.preventDefault();
        return;
      }
      case 'Enter': {
        event.preventDefault();
        setDisableSend(true);
        debouncefun();

        return;
      }
      default: {
        if (callSyntaxIndex.current === 3 || callSyntaxIndex.current === null) {
          if (key === ' ') tagText.current = ' ';
          else if (tagText.current === ' ' && key === '@') tagText.current = '@';
          else if (tagText.current.charAt(0) === '@' && key.length === 1) tagText.current = tagText.current + key;
          // else if (tagText.current === " " && key !== "@" && key.length === 1) tagText.current = "";
        }
        return;
      }
    }
  };
  const resetInput = () => {
    props.parentProps.childEventTrigger(null, null, 'showingEmpty', {});
    setInput('');
    text.current = '';
    focusIndex.current = 0;
    setSuggestionIndex(0);
    suggestionsRef.current = originalTagOptions;
    resetAttachments();
    cancelRecording();
    setScheduleData({});
    dispatch(setDisabledaddBtnInList(false));
    dispatch(setDisabledaddBtnInLMS(false));
    dispatch(setDisabledaddBtnInPolls(false));
    dispatch(setDisabledaddBtnInQMT(false));
    setOpenDrawer({ type: 'ATTACHMENT', open: false });
    dispatch(setStoreData({}));
    dispatch(setResponseType(''));
    setSelectedFile([]);
    setMsgDisable(true);
    setInputSize({
      newHeight: innerRef?.current?.offsetHeight - DEFAULT_INPUT_HEIGHT,
      height: innerRef?.current?.offsetHeight,
      width: innerRef?.current?.offsetWidth,
      newWidth: innerRef?.current?.offsetWidth - DEFAULT_DEDUCTED_INPUT_WIDTH,
    } as any);
  };
  const resetAttachments = () => {
    setSelectedFile([]);
    files.current = [];
    setIsFileUploadOpen(false);
    setRerenderFlag(new Date().getTime());
    setInputSize({
      newHeight: innerRef?.current?.offsetHeight - DEFAULT_INPUT_HEIGHT,
      height: innerRef?.current?.offsetHeight,
      width: innerRef?.current?.offsetWidth,
      newWidth: innerRef?.current?.offsetWidth - DEFAULT_DEDUCTED_INPUT_WIDTH,
    } as any);
  };
  const handleChatWrapper = (e: any) => {
    e.preventDefault();
    // const end = sanitizeString(text.current).length;
    // innerRef.current.setSelectionRange(end, end);
    innerRef.current.focus({
      preventScroll: true,
    });
  };

  return (
    <>
      <div className={classes.messageInputContainer}>
        {startAdornment ? <div className={classes.firstContainer}>{startAdornment}</div> : null}
        <div className={classes.middleContainer}>
          {initRecording && <VoiceRecording recorderState={recorderState} handlers={handlers} />}
          {!initRecording && (
            <div className={classes.chatInputWrapper} onClick={handleChatWrapper}>
              <span className={`${commonClasses.body15Regular} ${classes.inputPlaceholder} ${input ? 'hidden' : ''}`}>
                {storeData.placeHolderText ?? 'Type something'}
              </span>
              {suggestionTextError && (
                <div className={`${commonClasses.caption12Regular} ${classes.suggestionTextError}`}>{suggestionTextError}</div>
              )}
              <ContentEditable
                contentEditable={true}
                ref={inputRef}
                className={`${commonClasses.body15Regular} ${classes.inputStyle}`}
                html={text.current}
                onPaste={handleOnPaste}
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
            onClick={() => handleSend()}
          >
            {<SendIcon />}
          </Button>
        </div>
      </div>
      <div
        className={classes.mainAttachmentWrapper}
        style={{
          ...(inputSize.newHeight
            ? {
                bottom: `${DEFAULT_INPUT_CONTAINER_HEIGHT + inputSize.newHeight}px`,
              }
            : {}),
          ...(openDrawer.open && { zIndex: 100 }),
        }}
      >
        <div className={classes.attachmentWrapper}>
          <MUIDrawer anchor="bottom" open={openDrawer.open} handleClose={handleClose} noHeader={openDrawer.type === 'ATTACHMENT'}>
            {renderDrawerContent()}
          </MUIDrawer>
        </div>
      </div>
    </>
  );
}
