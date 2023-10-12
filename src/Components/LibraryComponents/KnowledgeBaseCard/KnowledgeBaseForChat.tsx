import { memo, useEffect, useState } from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { globalRepliedToMessage } from '../../PanelComponents/Notes/components/MessageInputNew/MessageInput.types';
import { DownArrowIcon } from '../../SVGs/Common';
import { getTimeIn12HrFormat } from '../ChatComponent/ChatComponent.functions';
import ThreeDotMenu from '../ThreeDotMenu/ThreeDotMenu';
import { useStyles } from './KnowledgeBaseCard.styles';
import { IKnowledgeBaseForChat } from './KnowledgeBaseCard.types';
import { DoubleSentTickIcon } from './KnowledgeBaseCard.svg';

const KnowledgeBaseForChat = (props: IKnowledgeBaseForChat) => {
  const { message, highlightBg, highlightext, hasMatch, setOpenReply, setRepliedToMessage, msgHighlight } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const { heading, description, tenant } = message?.knowledgeBasePost?.knowledgeBasePostTopics || {};
  const [showDownArrow, setShowDownArrow] = useState(false);

  const handleOnReplyClick = (data) => {
    if (data === 'REPLY') {
      setShowDownArrow(false);
      setOpenReply(true);
      setRepliedToMessage(message);
      globalRepliedToMessage.message = JSON.parse(JSON.stringify(message));
      return;
    }
  };

  return (
    <>
      {heading?.snippet && (
        <div
          className={classes.KBmain}
          onPointerEnter={(e) => setShowDownArrow(true)}
          onPointerLeave={(e) => setShowDownArrow(false)}
        >
          <div
            className={classes.chatHeader}
            style={msgHighlight === message?.messageId ? { background: '#f8f8f8' } : { background: '#f1f1f1' }}
          >
            <div className={`${classes.downArrowWrapper}`} style={{ opacity: showDownArrow ? 1 : 0 }}>
              <div className={classes.downArrowBG} />
              <div className={classes.downArrow}>
                <ThreeDotMenu
                  isDivider
                  options={[{ label: 'Reply', value: 'REPLY' }]}
                  handleClick={handleOnReplyClick}
                  renderButton={<DownArrowIcon />}
                  usePopOver
                  setIsOpen={setShowDownArrow}
                  anchorAlignment={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  popOverAlignment={{
                    horizontal: 'right',
                    vertical: 'top',
                  }}
                />
              </div>
            </div>
            {!hasMatch && <div className={`${classes.heading} ${commonClasses.body20Medium}`}>{heading?.snippet || ''}</div>}
            {hasMatch && (
              <HighlightText
                message={message}
                highlightBg={highlightBg}
                highlightext={highlightext}
                hasMatch={hasMatch}
                isHeaderPart={true}
              />
            )}
            {!hasMatch && (
              <div className={`${classes.description} ${commonClasses.body15Regular}`}>{description?.snippet || ''}</div>
            )}
            {hasMatch && (
              <HighlightText
                message={message}
                highlightBg={highlightBg}
                highlightext={highlightext}
                hasMatch={hasMatch}
                isHeaderPart={false}
              />
            )}
          </div>
          <footer className={`${commonClasses.caption12Regular} ${classes.rightReadDetailBox}`}>
            <span>
              <DoubleSentTickIcon />
            </span>
            <span className={`${commonClasses.caption12Regular}`}>{getTimeIn12HrFormat(message.receivedTime)}</span>
          </footer>
        </div>
      )}
    </>
  );
};

export default memo(KnowledgeBaseForChat);

const HighlightText = (props: any) => {
  const { message, highlightext, hasMatch, isHeaderPart } = props;
  const { heading, description, tenant } = message?.knowledgeBasePost?.knowledgeBasePostTopics || {};
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  const [markedText, setMarkedText] = useState('');

  const messageString = isHeaderPart ? heading?.snippet || '' : description?.snippet || '';

  useEffect(() => {
    if (hasMatch && highlightext !== '') {
      let regExp = new RegExp(highlightext, 'gi');
      let temp = highlightext ? messageString.replace(regExp, '<mark >$&</mark>') : messageString;
      setMarkedText(temp);
    } else {
      setMarkedText(messageString);
    }
  }, [highlightext, hasMatch]);

  return (
    <div
      id="marktext"
      dangerouslySetInnerHTML={{ __html: markedText }}
      className={`${isHeaderPart ? commonClasses.body20Medium : commonClasses.body15Regular} ${classes.hightLightText}`}
    />
  );
};
