import React, { useEffect, useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from '@mui/material';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { ScrollDownIcon, SendIcon } from '../../../SVGs/Common';
import ErrorToaster from './../../../../Common/ErrorToaster';
import { setDisabledButton, setStoreData } from './../../../../DisplayFramework/State/Slices/AllPostsDataSlice';
import { setResponseType } from './../../../../DisplayFramework/State/Slices/PostSlice';
import { IRootState } from './../../../../DisplayFramework/State/store';
import QuestionAnswer from './../../../LibraryComponents/ChatComponent/QuestionAnswer/QuestionAnswer';
import UploadFiles from './../../../LibraryComponents/ChatComponent/UploadFiles/UploadFiles';
import VoiceRecording from './../../../LibraryComponents/ChatComponent/VoiceRecording/VoiceRecording';
import useRecorder from './../../../LibraryComponents/ChatComponent/VoiceRecording/VoiceRecording.hooks';
import { UseRecorder } from './../../../LibraryComponents/ChatComponent/VoiceRecording/VoiceRecording.types';
import Button from './../../../LibraryComponents/MUIButton/MUIButton';
import MUIDrawer from './../../../LibraryComponents/MUIDrawer/MUIDrawer';
import { checkPostWithSameNameExist, removeHtmlTagsFromSring, sendMessageAPI } from './MessageInput.functions';
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
  const { tagOptions, postCollectionData, setTenantState, tenantState, showScrollDown, onScrollClick } = props;
  const { classes } = useStyles(props);
  const { id: panelId } = useCurrentPanel();
  const commonClasses = useCommonStyles();
  const { recorderState, ...handlers }: UseRecorder = useRecorder();
  const { initRecording } = recorderState;
  const disabledByAttachment = useSelector((state: IRootState) => state.AllPostData.disableSend);
  const postCollectionsListData = useSelector((state: IRootState) => state.AllPostData.datalist);

  const { startRecording, saveRecording, cancelRecording } = handlers;
  const { audio = '', recordingMinutes = 0, recordingSeconds = 0 } = recorderState;
  const voiceNote = { audio, recordingMinutes, recordingSeconds };

  const [input, setInput] = useState(postCollectionData.message || '');
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
  const [selectedFiles, setSelectedFile] = useState([]);
  const [rerenderFlag, setRerenderFlag] = useState(0);
  const [disableSend, setDisableSend] = useState(true);
  const [changeEventname, setChangeEventname] = useState('');
  const [contextType, setContextType] = useState('');
  const [scheduleData, setScheduleData] = useState({});
  const inputRef: any = React.useRef(null);
  const [msgDisable, setMsgDisable] = useState(true);
  const [inputSize, setInputSize] = useState({
    newHeight: null as any,
    height: null as any,
    width: null as any,
    newWidth: null as any,
  });
  const [originalTagOptions, setOriginalTagOptions] = useState([]);
  const [suggestionText, setSuggestionText] = useState('');
  const [suggestionTextError, setSuggestionTextError] = useState('');
  const [openDrawer, setOpenDrawer] = useState<openDrawerState>(defaultDrawerState);

  const uniqueId = useSelector((state: IRootState) => state.AllPostData.uniqueId);
  const storeData = useSelector((state: IRootState) => state.AllPostData.storeData);
  const text = useRef(postCollectionData.message || '');
  const tagText = useRef('');
  const files = useRef([]);
  const suggestionsRef = useRef([]);
  const isSuggestionOpen = useRef(false);
  const focusIndex = useRef(0);
  const disableSendButton: any = useRef(false);
  const propdDisableButton: any = useRef(false);
  const parentProps: any = useRef({});
  const innerRef: any = useRef<any>(null);
  const callSyntaxIndex = useRef<any>(null);
  const inputHeight = useRef<any>(null);
  const dispatch = useDispatch();
  const propsCurrent: any = React.useRef<any>(null);

  useEffect(() => {
    propsCurrent.current = JSON.parse(JSON.stringify(props));
    innerRef?.current?.focus({
      preventScroll: true,
    });
  }, [props]);

  useEffect(() => {
    if (!text.current.trim()) {
      // callSyntaxIndex.current === null;
      setSuggestionText('');
    }
  }, [text.current]);

  useEffect(() => {
    // const textContent = removeHtmlTagsFromSring(text.current);
    if ((text.current.trim() || selectedFiles.length) && propsCurrent?.current?.postCollectionData?.type) {
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
    if (tenantState!.tenantId && storeData.type === 'collectionName' && storeData.action === 'ADD') {
      handleSend(tenantState!.message);
      setTenantState?.({
        open: false,
        tenantId: '',
        message: '',
        title: false,
      });
      return;
    }

    if (postCollectionData?.msgMapper) {
      setInput('');
      text.current = '';
      setMsgDisable(false);
      setOpenDrawer({ type: postCollectionData?.msgMapper, open: true });
      setDisableSend(true);
    } else {
      setOpenDrawer({
        type: 'TAG_SUGGESTION',
        open: Boolean(isSuggestionOpen.current),
      });
      setMsgDisable(true);
      setInput('');
      text.current = '';
    }
  }, [isSuggestionOpen.current, postCollectionData]);

  const resetInput = () => {
    setInput('');
    text.current = '';
    focusIndex.current = 0;
    setSuggestionIndex(0);
    suggestionsRef.current = originalTagOptions;
    resetAttachments();
    cancelRecording();
    setScheduleData({});
    //dispatch(setPostCollectionId(""));
    setOpenDrawer({ type: 'ATTACHMENT', open: false });
    //dispatch(setPostCollectionMsgData({}));
    dispatch(setResponseType(''));
    dispatch(setStoreData({}));
    setSelectedFile([]);
    setMsgDisable(true);
    setDisableSend(true);
    dispatch(setDisabledButton(false));
    setInputSize({
      newHeight: innerRef?.current?.offsetHeight - DEFAULT_INPUT_HEIGHT,
      height: innerRef?.current?.offsetHeight,
      width: innerRef?.current?.offsetWidth,
      newWidth: innerRef?.current?.offsetWidth - DEFAULT_DEDUCTED_INPUT_WIDTH,
    });
  };

  const handleSend = (currentMessage?: string) => {
    const newText = trimSpaces(text.current?.trim());
    if ((newText.trim() || selectedFiles.length || currentMessage) && propsCurrent?.current?.postCollectionData?.type) {
      if (
        checkPostWithSameNameExist(
          postCollectionsListData,
          currentMessage?.trim() ?? newText?.trim(),
          propsCurrent?.current?.postCollectionData?.type
        )
      ) {
        ErrorToaster('A post collection with same title already exists! Please try another title', panelId, 'error');
        return;
      }

      if (storeData.type === 'collectionName' && storeData.action === 'ADD' && tenantState!.tenantId === '') {
        return setTenantState?.((pre: any) => ({
          ...pre,
          title: false,
          open: true,
          message: newText.trim(),
        }));
      }

      sendMessageAPI(
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
        propsCurrent?.current?.postCollectionData
      );

      dispatch(setDisabledButton(false));
    }
  };

  const handleAttach = () => setOpenDrawer((pre) => ({ type: 'ATTACHMENT', open: !pre.open }));
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
            headerTitle={propsCurrent?.current?.postCollectionData?.headerText}
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
            question={propsCurrent?.current?.postCollectionData?.headerText}
            iconType={propsCurrent?.current?.postCollectionData?.type}
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
          if (!(hr! >= 0 && hr! <= 99 && mm! >= 0 && mm! <= 60)) {
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
    setInput(value);
  };
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
    });
  };
  const handleChatWrapper = (e: any) => {
    e.preventDefault();
    innerRef.current.focus({
      preventScroll: true,
    });

    // Sets the cursor to the end of the text if the user clicks on the chat wrapper
    const element = innerRef.current as HTMLDivElement;
    const sel = window.getSelection();
    if (sel.focusOffset === 0 && element.childNodes.length > 0) {
      const range = document.createRange();
      range.setStart(element.childNodes[0], text.current?.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  const debouncefun = debounce(handleSend, 200);

  return (
    <>
      <div className={classes.messageInputContainer}>
        {showScrollDown && (
          <span
            className={`${classes.scrollDownButton} ${classes.center}`}
            onClick={() => {
              onScrollClick();
            }}
          >
            {<ScrollDownIcon />}
          </span>
        )}
        {startAdornment ? <div className={classes.firstContainer}>{startAdornment}</div> : null}
        <div className={classes.middleContainer}>
          {initRecording && <VoiceRecording recorderState={recorderState} handlers={handlers} />}
          {!initRecording && (
            <div className={classes.chatInputWrapper} onClick={handleChatWrapper}>
              <span className={`${commonClasses.body15Regular} ${classes.inputPlaceholder} ${input ? 'hidden' : ''}`}>
                {postCollectionData.placeHolderText ?? 'Type something'}
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
            disabled={disableSend || disabledByAttachment || msgDisable}
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
          ...(inputSize.newHeight && {
            bottom: `${DEFAULT_INPUT_CONTAINER_HEIGHT + inputSize.newHeight}px`,
          }),
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
