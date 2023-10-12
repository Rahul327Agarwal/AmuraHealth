import { IconButton } from '@mui/material';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { getVoiceNoteFromURL } from '../../../../Common/Common.functions';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import MediaAudio from '../../../LibraryComponents/ChatComponent/Media/MediaAudio';
import MediaDoc from '../../../LibraryComponents/ChatComponent/Media/MediaDoc';
import MediaPhoto from '../../../LibraryComponents/ChatComponent/Media/MediaPhoto';
import VideoPlayerNewDesign from '../../../LibraryComponents/ChatComponent/VideoPlayerNewDesign/VideoPlayerNewDesign';
import { RefreshIconChat } from '../DistributionManagement.svg';
import { SNIPPETS_ID } from '../Summary/Summary.function';
import MessageHeader from './MessageHeader';
import { getMessageSnippetValue } from './MessageView.functions';
import { useStyles } from './MessageView.styles';
import { IProps } from './MessageView.types';
import ShowMSgNames from './ShowMSgNames';

export default function MessageView(props: IProps) {
  const { message, handleReDo, sessions } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  const [filesurl, setfilesurl] = useState('');
  const { snippet, collectionId, collectionType } = message?.collectionPayload || {};

  useEffect(() => {
    if (snippet.file) {
      (async () => {
        const fileUrl: any = await getVoiceNoteFromURL(sessions, snippet.file);
        setfilesurl(fileUrl);
      })();
    }
  }, [snippet.file]);

  const renderMessages = (snippetType: any) => {
    switch (snippetType) {
      case SNIPPETS_ID.IMAGE:
      case SNIPPETS_ID.THUMBNAIL:
        return <MediaPhoto src={filesurl} fileName={snippet.fileName} sessions={sessions} />;
      case SNIPPETS_ID.VIDEO:
        return (
          <VideoPlayerNewDesign src={filesurl} fileName={snippet.fileName} sessions={sessions} EnableClickAwayListener={true} />
        );
      case SNIPPETS_ID.AUDIO:
        return (
          <MediaAudio
            src={filesurl}
            fileName={snippet.fileName}
            whiteTheme
            sessions={sessions}
            dontDownloadOnClick
            EnableClickAwayListener={true}
          />
        );
      case SNIPPETS_ID.FILE:
        return <MediaDoc src={filesurl} fileName={snippet.fileName} sessions={sessions} />;
      case SNIPPETS_ID.CONSUMERS:
      case SNIPPETS_ID.VIEW_ACCESS:
        return (
          <div className={`${commonClasses.body15Regular} ${classes.messageText}`}>
            <ShowMSgNames userData={snippet.values} />
          </div>
        );
      default:
        return (
          <div className={`${commonClasses.body15Regular} ${classes.messageText}`}>
            {getMessageSnippetValue(snippet, snippetType, collectionType)}
          </div>
        );
    }
  };

  return (
    <section className={classes.messageContainer}>
      <div className={`${classes.rightMessageBox} switchBg`}>
        <MessageHeader
          heading={snippet.type}
          snippetId={snippet.type === SNIPPETS_ID.ATTACHMENT ? snippet.postType : snippet.type}
        />
        <div className={classes.messageBody}>
          {snippet.fileName && snippet.type !== SNIPPETS_ID.THUMBNAIL
            ? renderMessages(snippet.postType)
            : renderMessages(snippet.type)}
        </div>
        <div className={classes.timeFooter}>
          <IconButton
            className={classes.reDoStyle}
            onClick={() => handleReDo(collectionId, { ...snippet, headerText: snippet.title })}
          >
            {<RefreshIconChat />}
          </IconButton>
        </div>
      </div>
      <footer className={`${commonClasses.caption12Regular} ${classes.rightReadDetailBox}`}>
        <span>{format(new Date(message?.receivedTime || new Date()), 'hh:mm aaa')}</span>
      </footer>
    </section>
  );
}
