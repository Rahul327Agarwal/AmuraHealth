import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { useChatOpenedFlyout, useSetChatOpenedFlyout } from './ChatFlyout.state';
import { getChatFlyoutComponent } from './ChatFlyout.functions';
import { useUserSession } from '../../../../../../DisplayFramework/State/Slices/Auth';
import { useSelectedClient } from '../../../../../../DisplayFramework/State/Slices/DisplayFramework';
import { useStyles } from './ChatFlyout.styles';
import { CrossIcon } from '../../../../../SVGs/Common';
import { motion, AnimatePresence } from 'framer-motion';
import { getChatInputBoxRef } from '../Input/ChatInput';
import { ChatInputState } from '../Input/ChatInput.state';

const ChatFlyoutContext = React.createContext({
  containerRef: undefined as React.MutableRefObject<HTMLDivElement>,
});
export const useChatFlyoutProvider = () => useContext(ChatFlyoutContext);

export function ChatFlyout() {
  const { openedFlyout, props: flyoutProps } = useChatOpenedFlyout();
  const setChatFlyout = useSetChatOpenedFlyout();

  const sessions = useUserSession();
  const selectedClient = useSelectedClient();
  const FlyoutCompo = useMemo(() => getChatFlyoutComponent(openedFlyout), [openedFlyout]);

  const flyoutContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!getChatInputBoxRef()?.current) return;
    if (!flyoutContainerRef?.current?.style) return;
    const newHeight = (getChatInputBoxRef()?.current?.getBoundingClientRect()?.height ?? 0) + 'px';
    flyoutContainerRef.current.style.setProperty('--input-height', newHeight);

    const obs = new ResizeObserver((d) => {
      if (!flyoutContainerRef?.current) return;
      const newHeight = (getChatInputBoxRef()?.current?.getBoundingClientRect()?.height ?? 0) + 'px';
      flyoutContainerRef.current.style.setProperty('--input-height', newHeight);
    });
    obs.observe(getChatInputBoxRef()?.current);
    return () => {
      obs.disconnect();
    };
  }, [flyoutContainerRef.current, FlyoutCompo, getChatInputBoxRef()?.current]);

  return (
    <>
      <ChatFlyoutContext.Provider
        value={{
          containerRef: flyoutContainerRef,
        }}
      >
        <div ref={flyoutContainerRef}>
          {/* <AnimatePresence> */}
          {openedFlyout !== undefined && FlyoutCompo && (
            <FlyoutCompo
              selectedClient={selectedClient}
              sessions={sessions}
              onClose={() => {
                setChatFlyout({
                  openedFlyout: undefined,
                  props: undefined,
                });
              }}
              {...flyoutProps}
            />
          )}
          {/* </AnimatePresence> */}
        </div>
      </ChatFlyoutContext.Provider>
    </>
  );
}
