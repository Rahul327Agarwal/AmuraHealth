import { memo } from 'react';
import LeftChatWrapper from '../LeftChatWrapper/LeftChatWrapper';
import { IProps } from './BluedotMessage.types';
import { useSetChatOpenedFlyout } from '../ChatInput/ChatFlyout/ChatFlyout.state';
import { BlueDotIcon } from '../../ChatNotes.svgs';

const BluedotMessage = (props: IProps) => {
  const { message, isFirstMessage } = props;
  const setChatFlyout = useSetChatOpenedFlyout();

  const isShowBlueDot = message?.showBluedotOptions;
  return (
    <LeftChatWrapper
      message={message}
      isFirstMessage={isFirstMessage}
      showActionIconAlways={isShowBlueDot}
      actionRenderIcon={isShowBlueDot ? <BlueDotIcon style={{ cursor: 'pointer' }} /> : null}
      actionIconPosition={isShowBlueDot ? 'unset' : 'absolute'}
      actionOptions={isShowBlueDot ? [{ label: 'Change', value: 'CHANGE' }] : []}
      onMessageAction={(v) => {
        if (v === 'CHANGE') {
          // Open Bluedot popup
          setChatFlyout({
            openedFlyout: 'bluedot',
            props: {
              blueDotEditInfo: {
                isEdit: true,
                blueDotInfo: message?.bluedot,
                messageId: message.messageId,
              },
            },
          });
        }
      }}
    >
      {message?.bluedot?.action == 'ADD' ? (
        <div style={{ fontSize: 15 }}>
          <span style={{ color: '#007aff', width: 'fit-content' }}>@blue </span>
          {message.bluedot?.description} {message.message}
        </div>
      ) : (
        <>{message.message}</>
      )}
    </LeftChatWrapper>
  );
};

export default memo(BluedotMessage);
