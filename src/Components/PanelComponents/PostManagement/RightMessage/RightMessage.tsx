import { IconButton } from '@mui/material';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { RefreshIcon } from '../PostManagement.svg';
import { IRootState } from './../../../../DisplayFramework/State/store';
import MediaAudio from './../../../LibraryComponents/ChatComponent/Media/MediaAudio';
import MediaDoc from './../../../LibraryComponents/ChatComponent/Media/MediaDoc';
import MediaPhoto from './../../../LibraryComponents/ChatComponent/Media/MediaPhoto';
import VideoPlayerNewDesign from './../../../LibraryComponents/ChatComponent/VideoPlayerNewDesign/VideoPlayerNewDesign';
import MessageHeader from './MessageHeader';
import { getVoiceNoteFromURL, showingResponseMsgs } from './RightMessage.functions';
import { useStyles } from './RightMessage.styles';
import { IProps } from './RightMessage.types';
import { convertIdStringToLabelString } from '../PostChatNote/PostChatNote.functions';

export default function RightMessage(props: IProps) {
  const { message, handleReDo, sessions } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const [filesurl, setfilesurl] = useState('');
  const postData = useSelector((state: IRootState) => state.post.postMsgData);
  useEffect(() => {
    if (message?.postPayload?.snippet?.file) {
      (async () => {
        const fileUrl: any = await getVoiceNoteFromURL(sessions, message?.postPayload?.snippet?.file);
        setfilesurl(fileUrl);
      })();
    }
  }, [message?.postPayload?.snippet?.file]);

  const renderMessages = (sentInput) => {
    switch (sentInput) {
      case 'image':
      case 'thumbnail':
        return <MediaPhoto src={filesurl} fileName={message?.postPayload?.snippet?.fileName} sessions={sessions} />;
      case 'video':
        return <VideoPlayerNewDesign src={filesurl} fileName={message?.postPayload?.snippet?.fileName} sessions={sessions} />;
      case 'audio':
        return (
          <MediaAudio
            src={filesurl}
            fileName={message?.postPayload?.snippet?.fileName}
            whiteTheme
            sessions={sessions}
            dontDownloadOnClick={true}
          />
        );
      case 'file':
        return <MediaDoc src={filesurl} fileName={message?.postPayload?.snippet?.fileName} sessions={sessions} />;
      case 'heading':
      case 'description':
        return (
          <div className={`${commonClasses.body15Regular} ${classes.messageText}`}>{message?.postPayload?.snippet?.message}</div>
        );
      case 'distributionChannel':
        return (
          <div className={`${commonClasses.body15Regular} ${classes.messageText}`}>
            {message?.postPayload?.snippet?.values?.map((d) => convertIdStringToLabelString(d))?.join(', ') || ''}
            
          </div>
        );
      case 'response':
        return (
          <div className={`${commonClasses.body15Regular} ${classes.messageText}`}>
            {/* {showingResponseMsgs(message?.postPayload?.snippet?.response)} */}
            {showingResponseMsgs(message?.postPayload?.snippet?.response, message?.postPayload?.snippet?.message)}

          </div>
        );
    }
  };

  return (
    <section className={classes.messageContainer}>
      <div className={`${classes.rightMessageBox} switchBg`}>
        <MessageHeader heading={message?.postPayload?.snippet?.title || 'Enter Data'} iconType={message?.postPayload?.snippet} />
        <div className={classes.messageBody}>
          {message?.postPayload?.snippet?.fileName && message?.postPayload?.snippet?.type !== 'thumbnail'
            ? renderMessages(message?.postPayload?.snippet?.postType)
            : renderMessages(message?.postPayload?.snippet?.type)}
        </div>
        <div className={classes.timeFooter}>
          {/* <span
            className={`${commonClasses.caption12Regular} ${classes.messageSent}`}
          >
            Done at
          </span> */}
          <IconButton
            className={classes.reDoStyle}
            onClick={() => handleReDo(message?.postPayload.postId, message?.postPayload?.snippet)}
          >
            {<RefreshIcon />}
          </IconButton>
        </div>
      </div>
      <footer className={`${commonClasses.caption12Regular} ${classes.rightReadDetailBox}`}>
        <span>{format(new Date(message?.receivedTime), 'hh:mm aaa')}</span>
      </footer>
    </section>
  );
}

// import { IconButton } from "@mui/material";
// import { format } from "date-fns";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useCommonStyles } from "../../../../Common/Theme/CommonStyles";
// import { RefreshIcon, RefreshIconChat } from "../../../SVGs/Common";
// import { IRootState } from "./../../../../DisplayFramework/State/store";
// import MediaAudio from "./../../../LibraryComponents/ChatComponent/Media/MediaAudio";
// import MediaDoc from "./../../../LibraryComponents/ChatComponent/Media/MediaDoc";
// import MediaPhoto from "./../../../LibraryComponents/ChatComponent/Media/MediaPhoto";
// import MediaVideo from "./../../../LibraryComponents/ChatComponent/Media/MediaVideo";
// import VideoPlayerNewDesign from "./../../../LibraryComponents/ChatComponent/VideoPlayerNewDesign/VideoPlayerNewDesign";
// import Checkbox from "./../../../LibraryComponents/MUICheckbox/MUICheckbox";
// import MessageHeader from "./MessageHeader";
// import {
//   getVoiceNoteFromURL,
//   showingResponseMsgs,
// } from "./RightMessage.functions";
// import { useStyles } from "./RightMessage.styles";
// import { IProps } from "./RightMessage.types";

// export default function RightMessage(props: IProps) {
//   const { message, handleReDo, sessions } = props;
//   const { classes } = useStyles();
//   const commonClasses = useCommonStyles();
//   const [filesurl, setfilesurl] = useState("");
//   const postData = useSelector((state: IRootState) => state.post.postMsgData);
//   useEffect(() => {
//     if (message?.postPayload?.snippet?.file) {
//       (async () => {
//         const fileUrl: any = await getVoiceNoteFromURL(
//           sessions,
//           message?.postPayload?.snippet?.file
//         );
//         setfilesurl(fileUrl);
//       })();
//     }
//   }, [message?.postPayload?.snippet?.file]);

//   const renderMessages = (sentInput: any) => {
//     switch (sentInput) {
//       case "image":
//       case "thumbnail":
//         return (
//           <MediaPhoto
//             src={filesurl}
//             fileName={message?.postPayload?.snippet?.fileName}
//             sessions={sessions}
//           />
//         );
//       case "video":
//         return (
//           <VideoPlayerNewDesign
//             src={filesurl}
//             fileName={message?.postPayload?.snippet?.fileName}
//             sessions={sessions}
//           />
//         );
//       case "audio":
//         return (
//           <MediaAudio
//             src={filesurl}
//             fileName={message?.postPayload?.snippet?.fileName}
//             whiteTheme
//             sessions={sessions}
//             dontDownloadOnClick={true}
//           />
//         );
//       case "file":
//         return (
//           <MediaDoc
//             src={filesurl}
//             fileName={message?.postPayload?.snippet?.fileName}
//             sessions={sessions}
//           />
//         );
//       case "heading":
//       case "description":
//         return (
//           <div
//             className={`${commonClasses.body15Regular} ${classes.messageText}`}
//           >
//             {message?.postPayload?.snippet?.message}
//           </div>
//         );
//       case "distributionChannel":
//         return (
//           <div
//             className={`${commonClasses.body15Regular} ${classes.messageText}`}
//           >
//             {message?.postPayload?.snippet?.values?.join(", ") || ""}
//           </div>
//         );
//       case "response":
//         return (
//           <div
//             className={`${commonClasses.body15Regular} ${classes.messageText}`}
//           >
//             {showingResponseMsgs(message?.postPayload?.snippet?.response)}
//           </div>
//         );
//     }
//   };

//   return (
//     <section className={classes.messageContainer}>
//       <div className={`${classes.rightMessageBox} switchBg`}>
//         <MessageHeader
//           heading={message?.postPayload?.snippet?.title || "Enter Data"}
//           iconType={message?.postPayload?.snippet}
//         />
//         <div className={classes.messageBody}>
//           {message?.postPayload?.snippet?.fileName &&
//           message?.postPayload?.snippet?.type !== "thumbnail"
//             ? renderMessages(message?.postPayload?.snippet?.postType)
//             : renderMessages(message?.postPayload?.snippet?.type)}
//         </div>
//         <div className={classes.timeFooter}>
//           {/* <span
//             className={`${commonClasses.caption12Regular} ${classes.messageSent}`}
//           >
//             Done at
//           </span> */}
//           <IconButton
//             className={classes.reDoStyle}
//             onClick={() =>
//               handleReDo(
//                 message?.postPayload.postId,
//                 message?.postPayload?.snippet
//               )
//             }
//           >
//             {<RefreshIconChat />}
//           </IconButton>
//         </div>
//       </div>
//       <footer
//         className={`${commonClasses.caption12Regular} ${classes.rightReadDetailBox}`}
//       >
//         <span>{format(new Date(message?.receivedTime), "hh:mm aaa")}</span>
//       </footer>
//     </section>
//   );
// }
