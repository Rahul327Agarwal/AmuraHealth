import { useEffect, useMemo, useRef, useState } from 'react';
import { useCommonStyles } from '../../../../../../Common/Theme/CommonStyles';
import { useAppSelector } from '../../../../../../DisplayFramework/State/store';
import { useStyles } from './ChatSuggestor.styles';
import { useCurrentPanel, useCurrentPanelProps } from '../../../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { roleToClientCheck } from '../../../../Notes/Notes.functions';
import { ChatInputState } from '../Input/ChatInput.state';
import { AnimatePresence, motion } from 'framer-motion';
import { wrapWithTagString } from '../MessageInput/MessageInput.functions';
import { ChatFlyoutsKey } from '../ChatFlyout/ChatFlyoutComponentMap';
import { useChatOpenedFlyout, useSetChatOpenedFlyout } from '../ChatFlyout/ChatFlyout.state';
import { useRepliedToMessage } from '../../ReplyMessage/ReplyMessage.state';
import { useAtom } from 'jotai';

export type TagOption = {
  id: string;
  label: string;
  openFlyout?: ChatFlyoutsKey;
};

export function ChatSuggestor() {
  const currentPanel = useCurrentPanelProps();
  const cardType = currentPanel?.type;

  const [_inputValue, _setInputValue] = useAtom(ChatInputState.inputValueAtom);

  const openedFlyout = useChatOpenedFlyout();
  const setFlyout = useSetChatOpenedFlyout();
  const [, setSuggestorOpenState] = useAtom(ChatInputState.suggestorOpenedAtom);
  const repliedMessage = useRepliedToMessage();

  const [chatAttachments, setChatAttachments] = useAtom(ChatInputState.attachmentsAtom);
  const [selectedAttachmentIndex, setSelectedAttachmentIndex] = useAtom(ChatInputState.currentSelectedAttachmentIndexAtom);
  const [chatAttachmentsText, setChatAttachmentsText] = useAtom(ChatInputState.attachmentsTextAtom);

  // input could be attachment input
  const isAttachmentMode = openedFlyout?.openedFlyout === 'fileUpload' && chatAttachments?.length >= 1;
  const inputValue = !isAttachmentMode ? _inputValue : chatAttachmentsText?.[selectedAttachmentIndex] ?? '';
  const setInputValue = (newVal: string) => {
    if (!isAttachmentMode) {
      _setInputValue(newVal);
    } else {
      setChatAttachmentsText((p) => {
        const nVal = [...p];
        nVal[selectedAttachmentIndex] = newVal;
        return nVal;
      });
    }
  };
  //

  const isDisabled = (() => {
    if (openedFlyout?.openedFlyout) {
      // flyout open, should be disabled.
      if (isAttachmentMode) {
        return false;
      }
      return true;
    }
    return false;
  })();

  //

  const roleToClient = useAppSelector((state) => state.accessPermissions.roleToClient);
  const tagOption: TagOption[] = useMemo(() => {
    if (cardType === 'bot') {
      return [{ id: 'CREATE_ENTITY', label: 'CREATE_ENTITY' }];
    }
    if (cardType === 'eventCard') {
      return [{ id: 'me', label: 'me' }];
    }
    if (cardType === 'mylist') {
      let options: TagOption[] = [
        { id: 'me', label: 'me' },
        { id: 'note', label: 'note' },
        { id: 'refer', label: 'refer', openFlyout: 'refer' },
        { id: 'bp', label: 'bp', openFlyout: 'BP' },
        { id: 'weight', label: 'weight', openFlyout: 'weight' },
        { id: 'fbg', label: 'fbg', openFlyout: 'BloodGlucose' },
      ];
      if (roleToClient === 'basic-user') {
        return options;
      }
      if (roleToClientCheck(roleToClient)) {
        options.push({ id: 'call intake', label: 'call intake' });
      }
      options = [
        ...options,
        ...([
          { id: 'blue', label: 'blue', openFlyout: 'bluedot' },
          { id: 'close', label: 'close', openFlyout: 'bluedotClose' },
          { id: 'call', label: 'call', openFlyout: 'callSchedule' },
          { id: 'team', label: 'team' },
          { id: 'survey', label: 'survey', openFlyout: 'survey' },
        ] as TagOption[]),
      ];
      return options;
    }
  }, [cardType, roleToClient]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  //TODO
  const inputTagValue = (() => {
    if (inputValue?.[0] !== '@') return;
    const splitWords = inputValue.split(' ');
    if (splitWords.length > 1) return;
    return splitWords[0];
  })();

  const tagOptionDisplayed: TagOption[] = useMemo(() => {
    if (!inputTagValue || isDisabled) return [];

    let res = tagOption?.filter((e) => {
      if (e.id.toLowerCase().includes(inputTagValue?.toLocaleLowerCase().slice(1))) return true;
      return false;
    });
    if (repliedMessage?.message?.messageId) {
      res = res.filter((p) => p.id === 'me' || p.id === 'note' || p.id === 'team');
    }
    if (isAttachmentMode) {
      res = res.filter((p) => p.id === 'me' || p.id === 'team');
    }

    return res;
  }, [inputTagValue, tagOption, repliedMessage, isDisabled]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [tagOptionDisplayed?.length]);

  const handleTagSelect = (tag: TagOption) => {
    const wrappedText = wrapWithTagString('@' + tag.label);
    setInputValue(wrappedText + ' ');
    // setTag(wrappedText);

    if (tag?.openFlyout) {
      setFlyout({
        openedFlyout: tag?.openFlyout,
        props: {},
      });
    }
  };

  ChatInputState.useListenToInputKeyDownEvent(
    (e) => {
      let key = e.key;

      if (!inputTagValue) return;

      switch (key) {
        case 'Up':
        case 'ArrowUp':
        case 'Down':
        case 'ArrowDown': {
          const indexAdder = key.includes('Up') ? -1 : 1;
          let newIndex = selectedIndex + indexAdder;
          newIndex = Math.min(newIndex, tagOptionDisplayed?.length - 1);
          newIndex = Math.max(newIndex, 0);
          setSelectedIndex(newIndex);

          containerRef?.current?.children?.[newIndex]?.scrollIntoView({
            block: 'end',
          });

          e.preventDefault();
          return;
        }
        case 'Enter': {
          e.preventDefault();
          handleTagSelect(tagOptionDisplayed[selectedIndex]);
          return;
        }
      }
    },
    [inputTagValue, selectedIndex, tagOptionDisplayed]
  );

  const { classes } = useStyles({});
  const commonClasses = useCommonStyles();

  //
  useEffect(() => {
    setSuggestorOpenState(Boolean(tagOptionDisplayed?.length));
  }, [tagOptionDisplayed?.length]);

  if (!tagOptionDisplayed?.length) return <></>;

  return (
    <>
      <AnimatePresence>
        <motion.div
          ref={containerRef}
          className={classes.tagDiv}
          style={{
            zIndex: 1001,
          }}
          initial={{ opacity: 0, translateY: 100 }}
          animate={{ opacity: 1, translateY: 0, height: 'auto' }}
          exit={{ opacity: 0, translateY: 100 }}
          transition={{ duration: 0.15 }}
          layout={'preserve-aspect'}
        >
          <motion.div className={classes.tagScrollDiv}>
            {tagOptionDisplayed?.map((option, index) => {
              // if (isFileUploadOpen && option.label === 'note') return null;
              return (
                <motion.div
                  key={option.id}
                  // layoutId={option.id}
                  className={`${classes.tagOption} ${selectedIndex === index ? classes.highlightOption : ''}`}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => handleTagSelect(option)}
                >
                  <span className={`${classes.tagLabel} ${commonClasses.body15Regular}`}>{`@ `}</span>
                  <span
                    className={`${classes.tagLabel} ${commonClasses.body15Regular}`}
                    dangerouslySetInnerHTML={{ __html: option.label }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
