import React, { useEffect } from 'react';
import { useStyles } from '../Chat.styles';
import { globalChannelVariables } from '../Chat.types';
import { IProps } from './ChatScrollArea.types';

export function ChatScrollArea(props: IProps) {
  const { classes } = useStyles();
  const {
    apiRef,
    loadOldMessagesThreshold,
    children,
    onLoadOldMessages,
    setShowScrollDownIcon,
    setLastScrollDistanceToBottomRef,
    lastScrollDistanceToBottomRef,
    previousScrollTop,
    setPreviousScrollTop,
  } = props;
  const wrapperContainer = React.useRef<HTMLDivElement | any>(null);
  const containerRef = (scrollContainer: HTMLDivElement) => {
    wrapperContainer.current = scrollContainer;
    apiRef &&
      apiRef({
        scrollToBottom: (behavior = 'auto') => {
          if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight - (lastScrollDistanceToBottomRef?.current || 0);
          }
        },
        scrollTo: (top) => {
          if (scrollContainer) scrollContainer.scrollTop = top;
          setLastScrollDistanceToBottomRef(wrapperContainer.current.scrollHeight - wrapperContainer.current.scrollTop);
        },
        scrolledToBottom: () =>
          wrapperContainer.current.scrollHeight - wrapperContainer.current.scrollTop - wrapperContainer.current.clientHeight < 10,
        scrolledToLoadThreshold: () => wrapperContainer.current && wrapperContainer.current.scrollTop <= loadOldMessagesThreshold,
        scrollTop: () => wrapperContainer.current && wrapperContainer.current.scrollTop,
        scrollHeight: () => wrapperContainer.current && wrapperContainer.current.scrollHeight,
        clientHeight: () => wrapperContainer.current && wrapperContainer.current.clientHeight,
        showScrollDownIcon: () =>
          wrapperContainer.current &&
          wrapperContainer.current.scrollHeight - wrapperContainer.current.scrollTop - wrapperContainer.current.clientHeight > 30,
      });
  };

  const handleRootScroll = () => {
    setLastScrollDistanceToBottomRef(wrapperContainer.current.scrollHeight - wrapperContainer.current.scrollTop);
    if (!globalChannelVariables.isNewMessageFromAnotherUser) setPreviousScrollTop(wrapperContainer.current.scrollTop);
    setShowScrollDownIcon(
      wrapperContainer.current &&
        wrapperContainer.current.scrollHeight - wrapperContainer.current.scrollTop - wrapperContainer.current.clientHeight > 30
    );
    if (
      wrapperContainer.current &&
      wrapperContainer.current.scrollTop <= loadOldMessagesThreshold &&
      !globalChannelVariables.loading &&
      globalChannelVariables.hasNext
    ) {
      onLoadOldMessages();
      wrapperContainer.current.scrollTop = loadOldMessagesThreshold + 1;
    }
  };

  return (
    <div ref={containerRef} onScroll={handleRootScroll} id={'chat-body-messages'} className={classes.chatBodyMessages}>
      {children}
    </div>
  );
}
