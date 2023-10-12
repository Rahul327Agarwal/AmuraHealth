import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { nearlyEqual } from './VirtualChat.utils';
import { VirtualChatMessage, VirtualChatProps } from './VirtualChat.types';
import { useStyles } from './VirtualChat.styles';
import { useChatScroll } from './VirtualChat.hooks';
import { IconButton } from '@mui/material';
import { ScrollDownIcon } from '../../../SVGs/Common';
import { useSelectedClient } from '../../../../DisplayFramework/State/Slices/DisplayFramework';

export function VirtualChat<T extends VirtualChatMessage>(props: VirtualChatProps<T>) {
  const { messages, messageBodyRef } = props;

  const { classes } = useStyles();

  //

  const upperTrigger = useRef<HTMLDivElement>(null);
  const bottomTrigger = useRef<HTMLDivElement>(null);
  const firstMutationFlag = useRef(false);
  const selectedClient = useSelectedClient();

  //

  const { onScrollMessages, onScrollToBottom, showGotoBottom, unseenMsgCount } = useChatScroll(props);

  const visibleMessages = useMemo(() => {
    return messages;
  }, [messages]);

  useLayoutEffect(() => {
    const mutObs = new MutationObserver((mutations) => {
      const scrollBottom = messageBodyRef.current!.scrollTop + messageBodyRef.current!.clientHeight;

      const isAtTop = nearlyEqual(messageBodyRef.current!.scrollTop, 0, 20);

      let shouldScrollToEnd = false;
      let isSingleMessage = false;

      if (!firstMutationFlag.current) {
        shouldScrollToEnd = true;
        firstMutationFlag.current = true;
      }

      const filteredMutations = mutations.filter((m) => {
        return m.addedNodes.length;
      });

      if (filteredMutations.length === 1 && filteredMutations[0].type === 'childList') {
        //Single Message Added
        isSingleMessage = true;

        const addedChild = filteredMutations[0].addedNodes[0] as HTMLDivElement;
        const isOur = addedChild.getAttribute('data-is-our-message');
        if (isOur === 'true') {
          // if our, we will scroll anyway
          shouldScrollToEnd = true;
        } else {
          // if not our message, we only will scroll if we are at last message
          shouldScrollToEnd = false;
          if (nearlyEqual(addedChild.offsetTop, scrollBottom, 20)) {
            shouldScrollToEnd = true;
          }
        }
      }

      if (filteredMutations.length > 1 && isAtTop) {
        // On Top, multiple messages. means we need to maintain that scroll positions by moving scroll top
        const lastChild = filteredMutations[filteredMutations.length - 1].addedNodes[0] as HTMLDivElement;
        const nextShibling = lastChild.nextElementSibling as HTMLDivElement;
        const nextShiblingOffset = nextShibling?.offsetTop ?? 0;
        requestAnimationFrame(() => {
          messageBodyRef.current?.scrollTo({
            top: nextShiblingOffset,
            behavior: 'instant',
          });
        });
        return;
      }

      //
      if (shouldScrollToEnd) {
        const top = (filteredMutations[filteredMutations.length - 1].addedNodes[0] as HTMLDivElement).offsetTop;
        requestAnimationFrame(() => {
          messageBodyRef.current?.scrollTo({
            top: top,
            behavior: isSingleMessage ? 'smooth' : 'instant',
          });

          // console.log('CC 3', messageBodyRef.current?.scrollTop, messageBodyRef.current?.childNodes.length);
        });
      }

      //
    });
    mutObs.observe(messageBodyRef.current!, { childList: true });

    return () => {
      mutObs.disconnect();
    };
  }, [firstMutationFlag.current]);

  //   UPPER
  useLayoutEffect(() => {
    const intObs = new IntersectionObserver((entries) => {
      if (props.isFetching) return;
      if (entries[0].isIntersecting) {
        props.onFetchMore();
      }
    }, {});

    intObs.observe(upperTrigger.current!);
    return () => {
      intObs.disconnect();
    };
  }, [props.isFetching]);

  useEffect(() => {
    firstMutationFlag.current = false;
  }, [selectedClient]);

  return (
    <div className={classes.chatContainer}>
      <div ref={messageBodyRef} className={classes.chatScrollContainer} onScroll={onScrollMessages}>
        <div ref={upperTrigger} className="h-0"></div>
        {visibleMessages.map((m, i) => {
          return (
            <div key={m._id} data-is-our-message={m.isOurMessage}>
              {props.renderFn(m, i)}
            </div>
          );
        })}
        <div ref={bottomTrigger} className="h-0"></div>
      </div>
      <div data-show={!!showGotoBottom} onClick={() => onScrollToBottom()} className={classes.gotoBottomBox}>
        <IconButton className={classes.gotoBottomButton}>
          {unseenMsgCount ? <span className={classes.unseenMsgCount}>{unseenMsgCount}</span> : null}
          <ScrollDownIcon className={classes.gotoBottomIcon} />
        </IconButton>
      </div>
    </div>
  );
}
