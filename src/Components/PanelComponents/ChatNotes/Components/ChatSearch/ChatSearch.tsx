import { IconButton } from '@mui/material';
import { memo, useEffect, useState, useTransition } from 'react';
import SearchField from '../../../../LibraryComponents/SearchFieldWithNavigator/SearchFieldWithNavigator';
import { BackArrowIcon } from '../../../../SVGs/Common';
import { IChatMessage } from '../../ChatMessage/ChatMessage.types';
import { addHighlightedSpans, getSearchedString, removeHighlightedSpans } from './ChatSearch.function';
import { useStyles } from './ChatSearch.styles';
import { IProps } from './ChatSearch.type';
import { sleep } from '../../../../../Utilities/Misc';

const ChatSearch = (props: IProps) => {
  const { onBack, messages, messageBodyRef, virtualMessages } = props;
  const { classes } = useStyles();
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchIndex, setSearchIndex] = useState<number>(0);
  const [searchedMessages, setSearchedMessages] = useState<IChatMessage[]>([]);

  useEffect(() => {
    cleanUpHighlighted();
    cleanUpFocus();
  }, []);

  const onFilterSearchMessages = (value: string) => {
    const searchText = value.toLowerCase();
    const regex = new RegExp(searchText, 'gi');
    let focusedMessageId: string;

    const searchedMessages = messages.filter((m) => {
      const currMessage = getSearchedString(m);
      const messageString = currMessage.includes(searchText);
      const tagString = m.privacy.includes(searchText);
      const matchedText = messageString || tagString;

      const searchedEle: HTMLElement = messageBodyRef.current?.querySelector(`[id="${m.messageId}"] [data-searchable]`);

      if (!searchedEle) return false;

      if (!matchedText) {
        searchedEle.innerHTML = removeHighlightedSpans(searchedEle.innerHTML);
        return false;
      }

      const eleContent = searchedEle?.textContent || searchedEle?.innerText || '';

      if (eleContent) {
        searchedEle.innerHTML = addHighlightedSpans(eleContent, regex);
        if (!focusedMessageId) focusedMessageId = m.messageId;
      }
      return true;
    });
    // console.log(
    //   '!!searchedMessages',
    //   searchedMessages.map(({ messageId, message }) => ({ messageId, message }))
    // );

    return { searchedMessages, focusedMessageId };
  };

  const onSearch = (value: string) => {
    setSearchQuery(value);
    if (!messageBodyRef.current) {
      cleanUpHighlighted();
      cleanUpFocus();
      return;
    }
    if (value?.length <= 2) {
      cleanUpHighlighted();
      cleanUpFocus();
      return;
    }
    startTransition(() => {
      const { focusedMessageId, searchedMessages } = onFilterSearchMessages(value);

      gotoFocusMessage(focusedMessageId);
      setSearchedMessages(searchedMessages || []);
      setSearchIndex(0);
    });
  };

  const onSearchNav = async (value: 'UP' | 'DOWN') => {
    if (virtualMessages?.isFetching) return;
    if (value === 'UP') {
      const v = searchIndex + 1;
      const messageId = searchedMessages[v]?.messageId;
      // console.log('!!search temo(+) index', v);

      if (!messageId && messages.length > virtualMessages.messages.length) {
        await virtualMessages?.loadMoreMessages();
        await sleep(1000);

        const { searchedMessages: newSearchedMessages } = onFilterSearchMessages(searchQuery);

        if (newSearchedMessages.length === searchedMessages.length) {
          // console.log('!!lsame  data');
          // return onSearchNav('UP');
        }

        setSearchedMessages(newSearchedMessages || []);
        setSearchIndex((pre) => {
          const _v = pre + 1;
          // console.log('!!search new(+) index', _v);
          const newMessageId = newSearchedMessages[_v]?.messageId;
          // console.log('!!new newMessageId', newMessageId);
          if (newMessageId) {
            gotoFocusMessage(newMessageId);
            return _v;
          }
          return pre;
        });
        return;
      }

      if (!messageId) return;

      gotoFocusMessage(messageId);
      setSearchIndex(v);
    }
    if (value === 'DOWN') {
      setSearchIndex((pre) => {
        const v = pre - 1;
        // console.log('!!search (-) index', v);
        const messageId = searchedMessages[v]?.messageId;
        if (!messageId) return pre;
        gotoFocusMessage(messageId);
        return v <= 0 ? 0 : v;
      });
    }
  };

  const gotoFocusMessage = (messageId: string) => {
    cleanUpFocus();
    if (!messageId) return;
    const focusEle: HTMLElement = messageBodyRef.current?.querySelector(`[id="${messageId}"]`);
    focusEle.setAttribute('data-search-focus', 'true');
    focusEle.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const cleanUpHighlighted = () => {
    const searchEle = messageBodyRef.current?.querySelectorAll('[data-highlighted="true"]');
    searchEle.forEach((element) => {
      element.removeAttribute('data-highlighted');
    });
  };
  const cleanUpFocus = () => {
    const focusEle = messageBodyRef.current?.querySelectorAll('[data-search-focus]');
    focusEle.forEach((element) => {
      element.removeAttribute('data-search-focus');
    });
  };

  const isUpNavDisabled = Boolean(
    virtualMessages?.isFetching || !searchedMessages.length || searchedMessages.length - 1 <= searchIndex
  );
  const isDownNavDisabled = Boolean(virtualMessages?.isFetching || !searchedMessages.length || searchIndex === 0);

  return (
    <div className={classes.searchBox}>
      <IconButton
        className={classes.backButton}
        onClick={() => {
          onBack();
          cleanUpHighlighted();
          cleanUpFocus();
        }}
      >
        <BackArrowIcon />
      </IconButton>
      <SearchField
        handleSearch={onSearch}
        placeholder={'search'}
        value={searchQuery}
        handleNavClick={onSearchNav}
        isUpNavDisabled={isUpNavDisabled}
        isDownNavDisabled={isDownNavDisabled}
      />
    </div>
  );
};

export default memo(ChatSearch);
