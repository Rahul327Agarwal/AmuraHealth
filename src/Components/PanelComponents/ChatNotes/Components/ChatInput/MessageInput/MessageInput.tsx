import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { useDispatch, useSelector } from 'react-redux';
import { notifyEvent, registerEvent } from '../../../../../../AppSync/AppSync.functions';
import { useCommonStyles } from '../../../../../../Common/Theme/CommonStyles';
import { setIndexData, setMessageInputData } from '../../../../../../DisplayFramework/State/Slices/MessageInput';
import { IRootState } from '../../../../../../DisplayFramework/State/store';
import Button from '../../../../../LibraryComponents/MUIButton/MUIButton';
import MUIDrawer from '../../../../../LibraryComponents/MUIDrawer/MUIDrawer';
import PanelFooter from '../../../../../LibraryComponents/PanelFooter/PanelFooter';
import { ScrollDownIcon, SendIcon } from '../../../../../SVGs/Common';
// import { checkPrivacy, dontAllowAttachmentAsNote } from '../../Notes.functions';
// import FileUpload from '../FileUpload/FileUpload';
// import { validateFiles } from '../FileUpload/FileUpload.functions';
// import useRecorder from '../VoiceRecordingNew/VoiceRecording.hooks';
// import { UseRecorder } from '../VoiceRecordingNew/VoiceRecording.types';
// import VoiceRecording from '../VoiceRecordingNew/VoiceRecordingNew';
import {
  disableInput,
  getTaggedPersonIds,
  removeAllHtmlText,
  removeHtmlTagsFromSring,
  sanitizeString,
  sendMessageAPI,
  wrapWithTagString,
} from './MessageInput.functions';
import { useStyles } from './MessageInput.styles';
import { IProps, ITagObject, ITagOptions, globalFiles, globalRepliedToMessage } from './MessageInput.types';
import { AttachmentIcon } from './MessageInput.svg';
import { useCurrentPanel } from '../../../../../../DisplayFramework/Components/Panel/Panel.hooks';
import FileUpload from '../../../../Notes/components/FileUpload/FileUpload';
import useRecorder from '../../../../Notes/components/VoiceRecordingNew/VoiceRecording.hooks';
import { UseRecorder } from '../../../../Notes/components/VoiceRecordingNew/VoiceRecording.types';
import { checkPrivacy, dontAllowAttachmentAsNote } from '../../../../Notes/Notes.functions';
import { validateFiles } from '../../../../Notes/components/FileUpload/FileUpload.functions';
import MessageReply from '../../../../Notes/components/MessageReply/MessageReply';
import VoiceRecording from '../../../../Notes/components/VoiceRecordingNew/VoiceRecordingNew';
import { useRepliedToMessage, useSetRepliedToMessage } from '../../ReplyMessage/ReplyMessage.state';
import { CloseIconNew } from '../../../ChatNotes.svgs';
import { SpeakGrayIcon } from '../../../../Notes/components/MessageInputNew/MessageInputNew.svg';
// import MessageReply from '../MessageReply/MessageReply';

const MemoFileUpload = memo(FileUpload);

const DEFAULT_INPUT_CONTAINER_HEIGHT = 79;
const TAG_CONTAINER_SPACING = 35;

const roomUsers = [
  {
    userId: '11ee32e8-7fd9-4502-b5e3-624446fa3ce3',
    userName: ' Testing 555',
    roles: ['basic-user'],
  },
  {
    userId: '6fdaf3a6-feb2-4393-bfae-d1d1fbe24ee8',
    userName: ' Hema Salal',
    roles: ['amura_guidance_counselor_level1'],
  },
  {
    userId: '948aee3d-6712-48a9-a03b-c926f5f99915',
    userName: 'Diplomat. P Mano Menam',
    roles: ['amura_guidance_counselor_level2'],
  },
];
const tempOptions = [
  { id: 'me', label: 'me' },
  { id: 'team', label: 'team' },
];

export default function MessageInput(props: IProps) {
  const {
    handleSubmit,
    tagOptions,
    showScrollDown,
    onScrollClick,
    showQuestionFlyout,
    type,
    isDragDropOpen,
    setIsDragDropOpen,
    roomUsers,
    // setCallScheduleMsg,
    // setBlueDotSchedule,
    // setCloseBlueDot,
    // setOpenWeight,
    // setOpenBP,
    // isBlueDotSchedule,
    // isCloseBlueDot,
    // openWeight,
    // openBP,
    // setOpenSurvey,
    // openSurvey,
    // setIsReferPopUpOpen,
    // setIsFBGPopUpOpen,
    disableOfflineSend,
    sessions,
    setMsgHightLight,
    setBlueDotEditInfo,
    openedFlyout,
    setOpenedFlyout,
  } = props;

  //
  const setCallScheduleMsg = (v: boolean) => setOpenedFlyout(v ? 'callSchedule' : undefined);
  const setBlueDotSchedule = (v: boolean) => setOpenedFlyout(v ? 'bluedot' : undefined);
  const setCloseBlueDot = (v: boolean) => setOpenedFlyout(v ? 'bluedotClose' : undefined);
  const setOpenWeight = (v: boolean) => setOpenedFlyout(v ? 'weight' : undefined);
  const setOpenBP = (v: boolean) => setOpenedFlyout(v ? 'BP' : undefined);
  const setOpenSurvey = (v: boolean) => setOpenedFlyout(v ? 'survey' : undefined);
  const setIsReferPopUpOpen = (v: boolean) => setOpenedFlyout(v ? 'refer' : undefined);
  const setIsFBGPopUpOpen = (v: boolean) => setOpenedFlyout(v ? 'BloodGlucose' : undefined);

  const repliedMessage = useRepliedToMessage();
  const setRepliedToMessage = useSetRepliedToMessage();

  const isBlueDotSchedule = openedFlyout === 'bluedot';
  const isCloseBlueDot = openedFlyout === 'bluedotClose';
  const openWeight = openedFlyout === 'weight';
  const openBP = openedFlyout === 'BP';
  const openSurvey = openedFlyout === 'survey';

  //

  const MessageInputSelector = useSelector((state: IRootState) => state.MessageInput.MessageInputData);

  const MessageIndexSelector = useSelector((state: IRootState) => state.MessageInput.currentIndex);
  const scrollIconReduxState = useSelector((state: IRootState) => state.chatScroll.scrollIconStatus);

  let roleToClient = useSelector((state: IRootState) => state.accessPermissions.roleToClient);

  const dispatch = useDispatch();

  const { classes } = useStyles(props);
  const { id: panelId } = useCurrentPanel();
  const { recorderState, ...handlers }: UseRecorder = useRecorder();
  const { initRecording, isPause } = recorderState;
  const { startRecording, saveRecording, cancelRecording, pauseRecording, resumeRecording } = handlers;
  const { audio = '', recordingMinutes = 0, recordingSeconds = 0 } = recorderState;
  const commonClasses = useCommonStyles();
  const [savedRecording, setSavedRecording] = useState(false);
  const [input, setInput] = useState('');
  const text = React.useRef('');
  const ctrlA = React.useRef(false);
  const messageInput = React.useRef([]);
  const messageIndex = React.useRef(0);
  const suggestionsRef = React.useRef<Array<ITagOptions>>([]);
  const isSuggestionOpen = React.useRef(false);
  const focusIndex = React.useRef(0);
  const inputRef: any = React.useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  const disableOfflineSendCurrent: any = React.useRef(false);
  const disableSendButton: any = React.useRef(false);
  const propdDisableButton: any = React.useRef(false);
  const [suggestionIndex, setSuggestionIndex] = React.useState(0);
  const [isFileUploadOpen, setIsFileUploadOpen] = React.useState(false);
  const [selectedFiles, setSelectedFile] = useState([]);
  const [rerenderFlag, setRerenderFlag] = useState(0);
  const [disableSend, setDisableSend] = useState(false);
  const [changeEventname, setChangeEventname] = useState('');
  const [contextType, setContextType] = useState('');
  // const [inputTemp, setInputTemp] = useState('');
  const inputTemp: any = React.useRef('');
  const addedAttachmentFirst: any = React.useRef(false);
  const [sendBtnClicked, setSendBtnClicked] = useState(false);
  const [scheduleData, setScheduleData] = useState({});
  // const [isFirstTagging, setIsFirstTagging] = useState(true);
  const [pastedClipboardFile, setPastedClipboardFile] = useState(false);
  const [taggedIds, setTaggedIds] = useState([]);
  const [inputHeight, setInputHeight] = useState(DEFAULT_INPUT_CONTAINER_HEIGHT);

  const parentProps: any = React.useRef({});
  const [originalTagOptions, setOriginalTagOptions] = useState<Array<ITagOptions>>([]);
  const tagText = React.useRef('');
  const containerRef = React.useRef(null);
  const inputWrapRef: any = React.useRef<HTMLDivElement>(null);

  const [openConfirm, setOpenConfirm] = useState(false);

  const typingTimer = useRef<any>();
  const debounceTime = 2000;

  const { userTagOptions, userTagObject }: { userTagOptions: Array<ITagOptions>; userTagObject: ITagObject } = useMemo(() => {
    const userTagObject = {};
    // const userTagOptions = roomUsers.map(({ userId, userName }) => {
    //   const label = userName.replace(/ /gi, '&nbsp;');
    //   userTagObject[label] = userId;
    //   return { id: userId, label, isuser: true };
    // });
    return { userTagObject, userTagOptions: [] };
  }, [roomUsers]);

  useEffect(() => {
    if (userTagOptions.length) {
      setOriginalTagOptions([...tagOptions, ...userTagOptions]);
      suggestionsRef.current = [...tagOptions, ...userTagOptions];
    } else {
      setOriginalTagOptions(tagOptions);
      suggestionsRef.current = tagOptions;
    }
  }, [userTagOptions, tagOptions]);

  useEffect(() => {
    const filterTags = selectedFiles.length && type !== 'eventCard' ? tempOptions : tagOptions;
    // const options = isFirstTagging ? [...filterTags, ...userTagOptions] : userTagOptions;
    setOriginalTagOptions(filterTags);
    suggestionsRef.current = filterTags;
  }, [selectedFiles, tagOptions]);

  // useEffect(() => {
  //   const chatMessage = text.current.trim();
  //   if (!chatMessage || tagText.current.trim() === chatMessage) {
  //     setIsFirstTagging(true);
  //   } else {
  //     setIsFirstTagging(false);
  //   }
  // }, [text.current]);

  useEffect(() => {
    if (sendBtnClicked && recorderState.audio && recorderState.isPause) {
      const message = removeAllHtmlText(text.current);
      const { tagIds, firstTagWithHtml } = getTaggedPersonIds(text.current, userTagOptions);
      sendMessageAPI(
        panelId,
        props.parentProps,
        setDisableSend,
        null,
        message,
        resetInput,
        voiceNote,
        tagOptions,
        {},
        scheduleData,
        {
          taggedIds,
          taggedPersonIds: tagIds,
          messageWithHtml: text.current,
          firstTagWithHtml,
          userTagObject,
          roleToClient,
        },
        repliedMessage?.message
      );
      setRepliedToMessage({ message: {}, open: false });
      setSendBtnClicked(false);
    }
  }, [sendBtnClicked, recorderState]);

  useEffect(() => {
    setTimeout(() => {
      focusMessageInput();
    }, 100);
  }, [selectedFiles, repliedMessage?.message]);

  useEffect(() => {
    parentProps.current = props.parentProps;
  }, [props.parentProps]);

  useEffect(() => {
    messageIndex.current = MessageIndexSelector;
    text.current = MessageInputSelector[MessageIndexSelector] || '';
    setRerenderFlag(new Date().getTime());
    focusMessageInput();
  }, [MessageIndexSelector]);

  useEffect(() => {
    messageInput.current = JSON.parse(JSON.stringify(MessageInputSelector));
    text.current = MessageInputSelector[MessageIndexSelector] || '';
  }, [MessageInputSelector]);

  useEffect(() => {
    if (!isBlueDotSchedule && !isCloseBlueDot && !openWeight && !openBP && !openSurvey) {
      var tempData = JSON.parse(JSON.stringify(MessageInputSelector));
      tempData[MessageIndexSelector] = '';
      dispatch(setMessageInputData(tempData));
      messageInput.current = tempData;
      globalFiles.messageInputData = JSON.parse(JSON.stringify(tempData));
    }
  }, [isBlueDotSchedule, isCloseBlueDot, openWeight, openBP, openSurvey]);
  useEffect(() => {
    if (savedRecording && audio) {
      sendMessageAPI(
        panelId,
        props.parentProps,
        setDisableSend,
        selectedFiles.length > 0 ? selectedFiles[0] : null,
        input,
        resetInput,
        voiceNote,
        tagOptions,
        {},
        scheduleData,
        { taggedIds, roleToClient },
        globalRepliedToMessage.message
      );
      setRepliedToMessage({ message: {}, open: false });
      setSavedRecording(false);
    }
  }, [savedRecording, audio]);

  useEffect(() => {
    setIsFileUploadOpen(isDragDropOpen);
  }, [isDragDropOpen]);
  useEffect(() => {
    if (type === 'bot') {
      setChangeEventname('chat-categorizer');
      setContextType('@bot-start');
    }
    if (type === 'mylist') {
      setChangeEventname('add-note');
      setContextType('@NOTES');
    }
  }, [type]);

  useEffect(() => {
    if (input === '@call&nbsp;') {
      setCallScheduleMsg(true);
    }
    if (input === '@blue&nbsp;') {
      setBlueDotEditInfo({ isEdit: false, blueDotInfo: {} });
      setBlueDotSchedule(true);
    }
    if (input === '@close&nbsp;') {
      setCloseBlueDot(true);
    }
    if (input === '@weight&nbsp;') {
      setOpenWeight(true);
    }
    if (input === '@bp&nbsp;') {
      setOpenBP(true);
    }
    if (input === '@survey&nbsp;') {
      setOpenSurvey(true);
    }
    // if (input === '@call intake&nbsp;') {
    //   setOpenConfirm(true);
    // }
    if (input === '@refer&nbsp;') {
      setIsReferPopUpOpen(true);
    }
    if (input === '@fbg&nbsp;') {
      setIsFBGPopUpOpen(true);
    }
  }, [input]);

  const voiceNote = { audio, recordingMinutes, recordingSeconds };

  const sendFiles = async () => {
    handleSendData();
  };

  useEffect(() => {
    disableSendButton.current = props.disableSend;
  }, [props.disableSend]);
  useEffect(() => {
    disableSendButton.current = disableSend;
  }, [disableSend]);
  useEffect(() => {
    disableOfflineSendCurrent.current = disableOfflineSend;
  }, [disableOfflineSend]);

  useEffect(() => {
    const callbackFunction = (entries: any) => {
      const bottom = inputWrapRef?.current?.offsetHeight - 5;
      setInputHeight(bottom > DEFAULT_INPUT_CONTAINER_HEIGHT ? bottom : DEFAULT_INPUT_CONTAINER_HEIGHT);
    };
    const observer = new ResizeObserver(callbackFunction);
    if (inputWrapRef.current) observer.observe(inputWrapRef.current);
    return () => {
      if (inputWrapRef.current) observer.unobserve(inputWrapRef.current);
    };
  }, []);

  useEffect(() => {
    if (isTyping) {
      notifyEvent({
        input: {
          user_id: `~${props.parentProps.selectedClient.tenant_id}~${props.parentProps.selectedClient.client_id}~`,
          event_name: 'NOTES_TYPING',
          timestamp: `${new Date().getTime()}`,
          last_message: JSON.stringify({ userId: `${props.parentProps.sessions.user.id}` }) ?? '',
        },
      });
    }
    if (!isTyping) {
      notifyEvent({
        input: {
          user_id: `~${props.parentProps.selectedClient.tenant_id}~${props.parentProps.selectedClient.client_id}~`,
          event_name: 'NOTES_TYPING_STOPPED',
          timestamp: `${new Date().getTime()}`,
          last_message: JSON.stringify({ userId: `${props.parentProps.sessions.user.id}` }) ?? '',
        },
      });
    }
  }, [isTyping]);

  useEffect(() => {
    let message = globalRepliedToMessage.message;
    if (message?.privacy && (message?.privacy === '@team' || message?.privacy === '@me')) {
      handleChange({
        target: {
          value: message?.privacy,
        },
      });
      handleTagSelect({
        id: message?.privacy.split('@')[1],
        label: message?.privacy.split('@')[1],
      });
    }
    focusMessageInput();
  }, [globalRepliedToMessage.message]);

  const resetInput = () => {
    setSuggestionIndex(0);
    suggestionsRef.current = tagOptions;
    focusIndex.current = 0;
    resetAttachments(true);
    setInput('');
    text.current = '';
    cancelRecording();
    setScheduleData({});
    setCallScheduleMsg(false);
    dispatch(setMessageInputData([]));
    messageInput.current = [];
    globalFiles.messageInputData = [];
    messageIndex.current = 0;
    setTaggedIds([]);
  };

  const getContentBeforeCursor = (content: string) => {
    if (!content) return;
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const startOffset = range.startOffset;
    const contentBeforeCursor = content.substring(0, startOffset);

    if (
      contentBeforeCursor.charAt(0) === '@' &&
      contentBeforeCursor.length > 1 &&
      contentBeforeCursor.length < 10 &&
      !/\s/.test(contentBeforeCursor)
    ) {
      tagText.current = contentBeforeCursor;
    }
  };

  const handleChange = (evt) => {
    clearTimeout(typingTimer.current);
    setIsTyping(true);

    typingTimer.current = setTimeout(() => {
      setIsTyping(false);
    }, debounceTime);

    let value = evt.target.value;
    text.current = value;
    setInput(value);
    let tempData = JSON.parse(JSON.stringify(messageInput.current));
    tempData[messageIndex.current] = text.current;
    dispatch(setMessageInputData(tempData));
    messageInput.current = tempData;
    globalFiles.messageInputData = JSON.parse(JSON.stringify(tempData));
    if (value[0] === '@') {
      tagText.current = value;
    }
    if (value.length === 1 && value === '@') {
      tagText.current = '@';
    }
    if (!tagText.current.trim()) {
      getContentBeforeCursor(value);
    }

    if (tagText.current.length && value === tagText.current) {
      focusIndex.current = 0;
      setSuggestionIndex(0);
      const searchTag = tagText.current.slice(1);
      const options = originalTagOptions.filter(({ label }) => {
        return label
          .replace(/(&nbsp;)/gi, ' ')
          .toLowerCase()
          .includes(searchTag.toLowerCase());
      });
      suggestionsRef.current = options;
      if (tagText.current.charAt(0) === '@' || (value.length === 1 && value === '@')) {
        isSuggestionOpen.current = Boolean(options?.length);
      }
    } else {
      isSuggestionOpen.current = false;
    }
  };

  const handleSendData = () => {
    inputTemp.current = '';
    globalFiles.disableSend = true;
    setIsFileUploadOpen(false);
    globalFiles.files.map((sendData, index) => {
      sendMessageAPI(
        panelId,
        props.parentProps,
        setDisableSend,
        sendData || null,
        removeAllHtmlText(globalFiles.messageInputData[index] || ''),
        resetInput,
        voiceNote,
        tempOptions,
        {},
        scheduleData,
        { taggedIds, roleToClient },
        globalRepliedToMessage.message
      );
      setRepliedToMessage({ message: {}, open: false });
    });
    dispatch(setMessageInputData([]));
    globalFiles.messageInputData = [];
    messageInput.current = [];
    resetAttachments(true);
    text.current = '';
    tagText.current = '';
    setTaggedIds([]);
  };

  const handleSendMessage = () => {
    let { messageToSend, privacy } = checkPrivacy(text.current, tagOptions);
    // if (privacy === '@call') setCallScheduleMsg(true);
    if (
      !isSuggestionOpen.current &&
      !disableInput(
        parentProps,
        parentProps.type,
        disableSendButton.current,
        (privacy + ' ' + messageToSend).trim(),
        tagOptions,
        globalFiles.files.length > 0
      ) &&
      !propdDisableButton.current
    ) {
      if (globalFiles.files.length > 0) {
        handleSendData();
      } else {
        const message = removeAllHtmlText(text.current);
        const { tagIds, firstTagWithHtml } = getTaggedPersonIds(text.current, userTagOptions);
        sendMessageAPI(
          panelId,
          props.parentProps,
          setDisableSend,
          null,
          message,
          resetInput,
          voiceNote,
          tagOptions,
          {},
          scheduleData,
          { taggedIds, taggedPersonIds: tagIds, messageWithHtml: text.current, firstTagWithHtml, userTagObject, roleToClient },
          globalRepliedToMessage.message,
          props.pushUnsentMessage
        );
        setRepliedToMessage({ message: {}, open: false });
        focusMessageInput();
      }
    }
    isSuggestionOpen.current = false;
  };

  const focusMessageInput = useCallback(() => {
    if (inputRef?.current?.focus) {
      inputRef.current.focus({
        preventScroll: true,
      });
      if (typeof window.getSelection != 'undefined' && typeof document.createRange != 'undefined') {
        var range = document.createRange();
        range.selectNodeContents(inputRef.current);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }, []);

  const resetAttachments = (attachmentAddedFirst?: boolean) => {
    setPastedClipboardFile(false);
    setSelectedFile([]);
    globalFiles.files = [];
    setIsFileUploadOpen(false);
    setRerenderFlag(new Date().getTime());
    setIsDragDropOpen(false);
    globalFiles.messageInputData = !attachmentAddedFirst ? [inputTemp.current] : [];
    dispatch(setMessageInputData(!attachmentAddedFirst ? [inputTemp.current] : []));
    dispatch(setIndexData(0));
    text.current = JSON.parse(JSON.stringify(!attachmentAddedFirst ? inputTemp.current : ''));
    setInput(text.current);
    focusMessageInput();
    addedAttachmentFirst.current = false;
  };

  const handleKeyDown = (event) => {
    let key = event.key;
    const index = focusIndex.current;
    if (event.key !== 'Backspace') {
      ctrlA.current = false;
    }
    if (event.ctrlKey == true && (event.keyCode == 65 || event.keyCode == 97)) {
      ctrlA.current = true;
      return;
    }

    switch (key) {
      case 'Up':
      case 'ArrowUp': {
        if (!isSuggestionOpen.current) return;
        if (index > 0) {
          const currIndex = index - 1;
          focusIndex.current = currIndex;
          setSuggestionIndex(currIndex);
          const childEl = containerRef.current.children[currIndex];
          const childTop = childEl.offsetTop;
          containerRef.current.scrollTop = childTop - TAG_CONTAINER_SPACING;
        }
        event.preventDefault();
        return;
      }
      case 'Down':
      case 'ArrowDown': {
        if (!isSuggestionOpen.current) return;
        if (index < suggestionsRef.current.length - 1) {
          const currIndex = index + 1;
          focusIndex.current = currIndex;
          setSuggestionIndex(currIndex);
          const childEl = containerRef.current.children[currIndex];
          const childTop = childEl.offsetTop;
          containerRef.current.scrollTop = childTop - TAG_CONTAINER_SPACING;
        }
        event.preventDefault();
        return;
      }

      case 'Enter': {
        event.preventDefault();
        if (isSuggestionOpen.current) {
          const value = suggestionsRef.current[focusIndex.current];
          handleTagSelect(value);
          return;
        }
        let isBot = props.parentProps?.type === 'bot';
        let isAttachment = selectedFiles.length > 0;
        let isRecording = initRecording;
        if ((isBot || isAttachment || isRecording) && disableOfflineSendCurrent.current) {
          return;
        }
        setIsFileUploadOpen(false);
        setPastedClipboardFile(false);
        handleSendMessage();
        return;
      }
      case 'Backspace':
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const startContainer = range.startContainer as any;
        if (
          (repliedMessage?.message.privacy === '@team' && ['', ' '].includes(startContainer.data)) ||
          (repliedMessage?.message.privacy === '@me' && ['', ' ', undefined].includes(startContainer.data))
        ) {
          event.preventDefault();
          return;
        }
      case 'Delete': {
        if (tagText.current.charAt(0) === '@') {
          if (tagText.current.length === 1) tagText.current = ' ';
          else tagText.current = tagText.current.slice(0, -1);
        }
        const innerHTML = event?.target?.innerHTML?.trim();
        const lastArrayValue = event?.target?.lastElementChild?.outerHTML;
        if (innerHTML.endsWith(lastArrayValue)) {
          const range = window.getSelection().getRangeAt(0);
          const post_range = document.createRange();
          post_range.selectNodeContents(inputRef.current);
          post_range.setStart(range.endContainer, range.endOffset);
          const next_text = post_range.cloneContents();
          const at_end = next_text.textContent.length === 0;
          if (at_end) {
            const lastArrayValueLength = lastArrayValue?.length - 1;
            const newInput = innerHTML.slice(0, -lastArrayValueLength);
            // text.current = newInput;
            // setInput(newInput);

            text.current = '';
            setInput('');
            setTaggedIds([]);
          }
        }
        if (ctrlA.current && key == 'Delete') {
          text.current = '';
          setInput('');
          setTaggedIds([]);
        }

        return;
      }

      default: {
        if (key === 'Unidentified') {
          return;
        }
        if (key === ' ') tagText.current = ' ';

        if (key === ' ') tagText.current = ' ';
        else if (tagText.current === ' ' && key === '@') tagText.current = '@';
        else if (tagText.current.charAt(0) === '@' && key.length === 1) tagText.current = tagText.current + key;
        return;
      }
    }
  };

  const handleTagSelect = (data: ITagOptions) => {
    const { label, id, isuser } = data || {};
    if (!label) return;

    const textContent = removeHtmlTagsFromSring(text.current);
    const textArray = textContent.split(' ');
    const lastindex = textArray.lastIndexOf(tagText.current);
    const taggedIdsSet = new Set([]);
    const newInput = textArray.map((v, i) => {
      if (v.charAt(0) === '@' && i === lastindex) {
        taggedIdsSet.add(`@${label}`);
        return wrapWithTagString(`@${label}`);
      } else if (v.charAt(0) === '@' && [...tagOptions, ...userTagOptions].some((d) => d.label === v.slice(1))) {
        taggedIdsSet.add(v);
        return wrapWithTagString(v);
      } else return v;
    });
    const finaltextContent = newInput.join(' ').trim() + ' ';

    tagText.current = ' ';
    text.current = finaltextContent;
    isSuggestionOpen.current = false;
    setInput(!isuser ? `@${label}&nbsp;` : finaltextContent);

    let tempData = JSON.parse(JSON.stringify(MessageInputSelector));
    tempData[MessageIndexSelector] = isuser ? `@${label}&nbsp;` : text.current;
    dispatch(setMessageInputData(tempData));
    messageInput.current = tempData;
    globalFiles.messageInputData = JSON.parse(JSON.stringify(tempData));
    setTaggedIds(Array.from(taggedIdsSet));
    // setIsFirstTagging(false);
    inputRef.current?.focus({
      preventScroll: true,
    });
  };

  const renderSend = () => {
    let isBot = props.parentProps?.type === 'bot';
    let isNormalMessage = text.current.length > 0;
    let isAttachment = selectedFiles.length > 0;
    let isRecording = initRecording;
    let hasText = text.current.length > 0;
    if (isBot) {
      return (
        <div
          className={classes.sendIconDiv}
          onClick={() => {
            if (props.disableSend) return;
            handleSendMessage();
          }}
        >
          <div className={hasText ? classes.sendIcon : classes.disabledSendIcon}>
            <SendIcon />
          </div>
        </div>
      );
    }
    if (isAttachment) {
      return (
        <div
          className={`${!(disableSend || disableOfflineSend) ? classes.sendIcon : classes.disabledSendIcon}`}
          onClick={() => {
            if (!(disableSend || disableOfflineSend)) {
              setIsFileUploadOpen(false);
              setPastedClipboardFile(false);
              handleSendMessage();
            }
          }}
        >
          {<SendIcon />}
        </div>
        // <div>
        //   <Button
        //     size="small"
        //     variant="contained"
        //     disabled={disableSend || disableOfflineSend}
        //     className={classes.sendIcon}
        //     onClick={() => {
        //       if (disableSend || disableOfflineSend) return;
        //       setIsFileUploadOpen(false);
        //       setPastedClipboardFile(false);
        //       handleSendMessage();
        //     }}
        //   >
        //     {<SendIcon />}
        //   </Button>
        // </div>
      );
    }
    if (isNormalMessage) {
      let { messageToSend, privacy } = checkPrivacy(input, tagOptions);
      let disableSend = messageToSend.length === 0;
      return (
        <div
          className={classes.sendIconDiv}
          onClick={() => {
            if (disableSend) return;
            setDisableSend(true);
            handleSendMessage();
          }}
        >
          <div className={disableSend ? classes.disabledSendIcon : classes.sendIcon}>
            <SendIcon />
          </div>
        </div>
      );
    }
    if (isRecording) {
      return (
        <div
          className={classes.sendIconDiv}
          onClick={() => {
            pauseRecording();
            if (disableSend || disableOfflineSend) return;
            setSendBtnClicked(true);
          }}
        >
          <div className={classes.sendIcon}>
            <SendIcon />
          </div>
        </div>
      );
    }
    return (
      <div
        className={classes.sendIconDiv}
        onClick={() => {
          setIsFileUploadOpen(false);
          startRecording();
        }}
      >
        <div className={classes.sendIcon}>
          <SpeakGrayIcon />
        </div>
      </div>
    );
  };

  const handleFileSave = useCallback((files) => {
    validateFiles(
      panelId,
      files,
      setRerenderFlag,
      (files) => {
        setSelectedFile(files);
        globalFiles.files = files;
      },
      (value) => {},
      {}
    );
  }, []);

  const handleFileClose = useCallback(() => {
    // setIsFileUploadOpen(true);
    isSuggestionOpen.current = false;
    setPastedClipboardFile(false);
    resetAttachments(addedAttachmentFirst.current);
  }, []);

  const handleOnPaste = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.clipboardData.files.length > 0) {
      if (dontAllowAttachmentAsNote(text.current, tagOptions)) {
        // console.log("Image paste doesn't while tag is note");
        return;
      }
      const imageTypeFiles = [
        'image/jpeg',
        'image/png',
        'image/x-png',
        'image/gif',
        'image/jpg',
        'image/gif',
        '.jpeg',
        '.png',
        '.gif',
      ];
      let files = [];

      for (let i = 0; i < e.clipboardData.files.length; i++) {
        if (imageTypeFiles.includes(e.clipboardData.files[i].type)) files.push(e.clipboardData.files[i]);
      }
      if (files.length > 0) {
        handleFileSave(files);
        setPastedClipboardFile(true);
        setIsFileUploadOpen(true);
        inputTemp.current = JSON.parse(JSON.stringify(text.current));
      }

      if (sanitizeString(text.current)) {
        addedAttachmentFirst.current = false;
      } else {
        addedAttachmentFirst.current = true;
      }

      return;
    }

    const clipboardText = e.clipboardData.getData('text/plain');
    if (clipboardText) {
      const selection = window.getSelection();
      if (!selection.rangeCount) return false;

      const range = selection.getRangeAt(0);
      range.deleteContents();
      const textNode = document.createTextNode(clipboardText);
      range.insertNode(textNode);
      // scroll to the end of the range
      const rangeRect = range.getBoundingClientRect();
      const { bottom, top } = inputRef.current.getBoundingClientRect();
      if (rangeRect.bottom > bottom || rangeRect.top < top) {
        inputRef.current.scrollBy(0, rangeRect.bottom - bottom);
      }
      range.setStartAfter(textNode);
      const updatedHtml = inputRef.current.innerHTML;
      // const onlyText = removeAllHtmlText(updatedHtml);

      text.current = updatedHtml;

      return;
    }
  };

  return (
    <div>
      {!openConfirm && (
        <div className={classes.displayFlexColumn}>
          {showScrollDown ? (
            <div className={`${classes.scrollDownButton} ${classes.center}`} onClick={() => onScrollClick()}>
              <ScrollDownIcon />

              {/* <div className={classes.unreadMessagesCount}>{5}</div> */}

              {!!props.unreadMessagesCount && <div className={classes.unreadMessagesCount}>{props.unreadMessagesCount}</div>}
            </div>
          ) : null}
          {showQuestionFlyout && (
            <div className={classes.tagDiv}>
              <span></span>
            </div>
          )}
          {isFileUploadOpen || pastedClipboardFile ? (
            <div style={{ bottom: `${inputHeight}px` }} className={`${classes.tagDivPreviewHeight} ${classes.fileUploadDiv}`}>
              <MemoFileUpload
                focusMessageInput={focusMessageInput}
                setDisableSend={setDisableSend}
                handleSave={handleFileSave}
                rerenderFlag={rerenderFlag}
                setRerenderFlag={setRerenderFlag}
                files={selectedFiles}
                multiple={true}
                onClose={handleFileClose}
                pastedClipboardFile={pastedClipboardFile}
                setPastedClipboardFile={setPastedClipboardFile}
              />
            </div>
          ) : null}
          {repliedMessage?.open && repliedMessage?.message && (
            <div className={`${classes.tagDiv} repliedMessage`}>
              <div
                className={classes.closeIocn}
                onClick={() => {
                  setRepliedToMessage({ message: {}, open: false });
                  resetInput();
                }}
              >
                <CloseIconNew />
              </div>
              <MessageReply message={repliedMessage?.message} sessions={sessions} setMsgHightLight={setMsgHightLight} />
            </div>
          )}
          {isSuggestionOpen.current && (
            <div className={classes.tagDiv} ref={containerRef}>
              {suggestionsRef.current.map((option, index) => {
                if (isFileUploadOpen && option.label === 'note') return null;
                return (
                  <div
                    className={`${classes.tagOption} ${suggestionIndex === index ? classes.highlightOption : ''}`}
                    onMouseEnter={() => setSuggestionIndex(index)}
                    onClick={() => handleTagSelect(option)}
                  >
                    <span className={`${classes.tagLabel} ${commonClasses.body15Regular}`}>{`@ `}</span>
                    <span
                      className={`${classes.tagLabel} ${commonClasses.body15Regular}`}
                      dangerouslySetInnerHTML={{ __html: option.label }}
                    />
                  </div>
                );
              })}
            </div>
          )}

          <div
            ref={inputWrapRef}
            className={`${classes.messageBox} ${
              isSuggestionOpen.current || isFileUploadOpen || selectedFiles.length > 0 ? classes.border0T16B : ''
            }`}
          >
            <div className={classes.messageGrid}>
              {props.parentProps?.type !== 'bot' ? (initRecording || Boolean(audio) ? '' : null) : ''}
              <div className={classes.middleContainer}>
                {(initRecording || Boolean(audio)) && props.parentProps?.type !== 'bot' ? (
                  <div className={classes.recordWrapper}>
                    <div className={classes.voiceRecordingdiv}>
                      <VoiceRecording recorderState={recorderState} handlers={handlers} />
                    </div>
                  </div>
                ) : (
                  <div className={classes.subWrapper}>
                    <span className={`${classes.placeholderSpan} ${text.current ? classes.visibiltyNone : classes.visibilty}`}>
                      {'Type a message'}
                    </span>
                    <ContentEditable
                      contentEditable={true}
                      innerRef={inputRef}
                      className={classes.input}
                      html={sanitizeString(text.current)}
                      key={rerenderFlag}
                      onPaste={handleOnPaste}
                      onChange={handleChange}
                      disabled={disableSend}
                      onKeyDown={handleKeyDown}
                      // onFocus={(e) => {
                      //   notifyEvent({
                      //     input: {
                      //       user_id: `~${props.parentProps.selectedClient.tenant_id}~${props.parentProps.selectedClient.client_id}~`,
                      //       event_name: 'NOTES_TYPING',
                      //       timestamp: `${new Date().getTime()}`,
                      //       last_message: JSON.stringify({ userId: `${props.parentProps.sessions.user.id}` }) ?? '',
                      //     },
                      //   });
                      // }}
                      // onBlur={() => {
                      //   notifyEvent({
                      //     input: {
                      //       user_id: `~${props.parentProps.selectedClient.tenant_id}~${props.parentProps.selectedClient.client_id}~`,
                      //       event_name: 'NOTES_TYPING_STOPPED',
                      //       timestamp: `${new Date().getTime()}`,
                      //       last_message: JSON.stringify({ userId: `${props.parentProps.sessions.user.id}` }) ?? '',
                      //     },
                      //   });
                      // }}
                    />
                    {props.parentProps?.type !== 'bot' && (
                      <div className={classes.attachmentBelow}>
                        <div
                          className={`${classes.attachmentIcon} ${
                            selectedFiles.length > 0 || isFileUploadOpen || dontAllowAttachmentAsNote(text.current, tagOptions)
                              ? classes.disableAttachment
                              : ''
                          }`}
                          onClick={() => {
                            isSuggestionOpen.current = false;
                            if (
                              !isFileUploadOpen &&
                              !dontAllowAttachmentAsNote(text.current, tagOptions) &&
                              selectedFiles.length === 0
                            ) {
                              isSuggestionOpen.current = false;
                              setIsFileUploadOpen(true);
                              // setInputTemp(input);
                              inputTemp.current = JSON.parse(JSON.stringify(text.current));
                              focusMessageInput();
                              if (sanitizeString(text.current)) {
                                addedAttachmentFirst.current = false;
                              } else {
                                addedAttachmentFirst.current = true;
                              }
                            }
                          }}
                        >
                          <AttachmentIcon />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {renderSend()}
            </div>
          </div>
        </div>
      )}

      {/* {openConfirm && (
        <MUIDrawer
          anchor="bottom"
          open={openConfirm}
          headerTitle={'Are you sure?'}
          handleClose={() => {
            setOpenConfirm(false);
            setDisableSend(false);
            resetInput();
          }}
        >
          <>
            <div>
              <div className={`${commonClasses.body15Medium} ${classes.popUpHeading}`}>Initiate Intake Call</div>
            </div>
            <PanelFooter
              customStyle={classes.footerStyles}
              leftButtonText={'No'}
              righButtontText={'Yes'}
              disableRightButton={disableSend}
              handleLeftButton={() => {
                setOpenConfirm(false);
                setDisableSend(false);
                resetInput();
              }}
              handleRightButton={() => {
                setDisableSend(true);
                callWIthPreDefinedData(props.parentProps, setDisableSend, setOpenConfirm, resetInput, roleToClient);
              }}
              btnStyle={classes.btnHeight}
            />
          </>
        </MUIDrawer>
      )} */}
    </div>
  );
}
