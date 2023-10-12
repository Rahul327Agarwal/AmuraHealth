import { IconButton } from '@mui/material';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { RefreshIconChat } from '../PostCollections.svgs';
import MediaAudio from './../../../LibraryComponents/ChatComponent/Media/MediaAudio';
import MediaDoc from './../../../LibraryComponents/ChatComponent/Media/MediaDoc';
import MediaPhoto from './../../../LibraryComponents/ChatComponent/Media/MediaPhoto';
import MediaVideo from './../../../LibraryComponents/ChatComponent/Media/MediaVideo';
import MessageHeader from './MessageHeader';
import { getVoiceNoteFromURL } from './RightMessage.functions';
import { useStyles } from './RightMessage.styles';
import { IProps } from './RightMessage.types';

export default function RightMessage(props: IProps) {
  const { message, handleReDo, sessions } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const [filesurl, setfilesurl] = useState('');

  useEffect(() => {
    if (message?.collectionPayload?.snippet?.file) {
      (async () => {
        const fileUrl: any = await getVoiceNoteFromURL(sessions, message?.collectionPayload?.snippet?.file);
        setfilesurl(fileUrl);
      })();
    }
  }, [message?.collectionPayload?.snippet?.file]);

  const renderMessages = (sentInput: any) => {
    switch (sentInput) {
      case 'image':
      case 'thumbnail':
        return <MediaPhoto src={filesurl} fileName={message?.collectionPayload?.snippet?.fileName} />;
      case 'video':
        return <MediaVideo src={filesurl} fileName={message?.collectionPayload?.snippet?.fileName} />;
      case 'audio':
        return <MediaAudio src={filesurl} fileName={message?.collectionPayload?.snippet?.fileName} whiteTheme />;
      case 'file':
        return <MediaDoc src={filesurl} fileName={message?.collectionPayload?.snippet?.fileName} />;
      case 'heading':
      case 'description':
      case 'collectionName':
      case 'title':
      case 'welcomeMessage':
      case 'thankYouMessage':
        return (
          <div className={`${commonClasses.body15Regular} ${classes.messageText}`}>
            {message?.collectionPayload?.snippet?.message}
          </div>
        );
      case 'distributionChannel':
        return (
          <div className={`${commonClasses.body15Regular} ${classes.messageText}`}>
            {message?.collectionPayload?.snippet?.values?.join(', ') || ''}
          </div>
        );
      case 'privacy':
        return (
          <div className={`${commonClasses.body15Regular} ${classes.messageText}`}>
            {message?.collectionPayload?.snippet?.visibility?.toString() || ''}
          </div>
        );
    }
  };

  return (
    <section className={classes.messageContainer}>
      <div className={`${classes.rightMessageBox} switchBg`}>
        <MessageHeader
          heading={message?.collectionPayload?.snippet?.title || 'Enter Data'}
          iconType={message?.collectionPayload?.snippet}
        />
        <div className={classes.messageBody}>
          {message?.collectionPayload?.snippet?.fileName && message?.collectionPayload?.snippet?.type !== 'thumbnail'
            ? renderMessages(message?.collectionPayload?.snippet?.postType)
            : renderMessages(message?.collectionPayload?.snippet?.type)}
        </div>
        <div className={classes.timeFooter}>
          {/* <span
            className={`${commonClasses.caption12Regular} ${classes.messageSent}`}
          >
            Done at
          </span> */}
          <IconButton
            className={classes.reDoStyle}
            onClick={() =>
              handleReDo(
                message?.collectionPayload.collectionId,
                message?.collectionPayload.collectionType,
                message?.collectionPayload?.snippet
              )
            }
          >
            {<RefreshIconChat />}
          </IconButton>
        </div>
      </div>
      <footer className={`${commonClasses.caption12Regular} ${classes.rightReadDetailBox}`}>
        <span>{format(new Date(message?.receivedTime), 'hh:mm aaa')}</span>
      </footer>
    </section>
  );
}
