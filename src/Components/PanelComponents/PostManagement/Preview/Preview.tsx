import { useEffect, useState } from 'react';
import MediaAudio from './../../../LibraryComponents/ChatComponent/Media/MediaAudio';
import MediaDoc from './../../../LibraryComponents/ChatComponent/Media/MediaDoc';
import MediaPhoto from './../../../LibraryComponents/ChatComponent/Media/MediaPhoto';
import VideoPlayerNewDesign from './../../../LibraryComponents/ChatComponent/VideoPlayerNewDesign/VideoPlayerNewDesign';
import { getVoiceNoteFromURL } from '../RightMessage/RightMessage.functions';
import { showingResponseMsgs } from '../Summary/PostManagementSummary.function';
import { getpostPreviewData } from './Preview.function';
import { MenuListItemStyled, MenuListStyled, useStyles } from './Preview.styles';
import { IProps } from './Preview.types';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { ResponseCheck, ResponseCircleIcon } from '../PostManagement.svg';
import { convertIdStringToLabelString } from '../PostChatNote/PostChatNote.functions';

const Preview = (props: IProps) => {
  const { sessions, unRegisterEvent, registerEvent } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const [postPreviewData, setPostPreviewData] = useState<any>({});
  const [attachmentsUrl, setAttachmentsUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  let postPreviewList: any;

  useEffect(() => {
    (async () => {
      const response = await getpostPreviewData(props);

      setPostPreviewData(response);
    })();
  }, [props?.selectedClient?.client_id]);

  useEffect(() => {
    postPreviewList = registerEvent(`${props.selectedClient.client_id}`, 'myPost.json', (updatePreview) => {
      if (updatePreview) {
        setPostPreviewData(updatePreview);
      }
    });
    return () => {
      if (postPreviewList) {
        unRegisterEvent(postPreviewList);
      }
    };
  }, [props?.selectedClient?.client_id]);

  useEffect(() => {
    if (postPreviewData?.topics?.attachment?.file) {
      (async () => {
        const fileUrl: any = await getVoiceNoteFromURL(sessions, postPreviewData.topics.attachment.file);
        setAttachmentsUrl(fileUrl);
      })();
    }
    if (postPreviewData?.topics?.thumbnail?.file) {
      (async () => {
        const fileUrl: any = await getVoiceNoteFromURL(sessions, postPreviewData.topics.thumbnail.file);

        setThumbnailUrl(fileUrl);
      })();
    }
  }, [postPreviewData]);

  const inputsent = (sentInput) => {
    switch (sentInput) {
      case 'thumbnail':
        return (
          <div className={classes.mainwrapper}>
            <div className={classes.divborder}>
              <p className={`${classes.heading} ${commonClasses.body15Medium}`}>Thumbnail image</p>
              <MediaPhoto src={thumbnailUrl} sessions={sessions} />
            </div>
          </div>
        );
      case 'image':
        return (
          <div className={classes.mainwrapper}>
            <div className={classes.divborder}>
              <p className={`${classes.heading} ${commonClasses.body15Medium}`}>Image</p>
              <MediaPhoto src={attachmentsUrl} sessions={sessions} />
            </div>
          </div>
        );
      case 'video':
        return (
          <div className={classes.mainwrapper}>
            <div className={classes.attachedVideo}>
              <p className={`${classes.audioHeading} ${commonClasses.body15Medium}`}>Video</p>
              <VideoPlayerNewDesign src={attachmentsUrl} sessions={sessions} />
            </div>
          </div>
        );
      case 'file':
        return (
          <div className={classes.mainwrapper}>
            <div className={classes.divborder}>
              <p className={`${classes.heading} ${commonClasses.body15Medium}`}>Document</p>
              <MediaDoc src={attachmentsUrl} sessions={sessions} />
            </div>
          </div>
        );
      case 'audio':
        return (
          <div className={classes.mainwrapper}>
            <div className={classes.attachedVideo}>
              <p className={`${classes.audioHeading} ${commonClasses.body15Medium}`}>Audio</p>
              <MediaAudio src={attachmentsUrl} whiteTheme sessions={sessions} dontDownloadOnClick={true} />
            </div>
          </div>
        );
    }
  };
  const inputresponse = (typeofresponse) => {
    switch (typeofresponse) {
      case 'textField':
        return <></>;
      case 'select':
      case 'multiSelect':
        return (
          <MenuListStyled {...props}>
            {postPreviewData?.topics?.response?.snippet.length ? (
              postPreviewData?.topics?.response?.snippet?.map((item, index) => (
                <MenuListItemStyled key={item} {...props} onClick={() => {}}>
                  <div className={`${classes.labelContainer} ${commonClasses.body15Regular}`}>
                    <span>{typeofresponse === 'select' ? <ResponseCircleIcon /> : <ResponseCheck />}</span>
                    <span className={`${classes.labelOption}`} title={item}>
                      {item}
                    </span>
                  </div>
                </MenuListItemStyled>
              ))
            ) : (
              <div className={classes.noResult}>No options</div>
            )}
          </MenuListStyled>
        );
    }
  };

  return (
    <div className={classes.headerWrap}>
      {postPreviewData?.topics?.heading && (
        <div className={classes.mainwrapper}>
          <div className={classes.mainhead}>
            <div>
              <p className={`${classes.heading} ${commonClasses.body17Medium}`}>{postPreviewData?.topics?.heading?.snippet}</p>
            </div>
          </div>
        </div>
      )}
      {postPreviewData?.topics?.tenant && (
        <div className={classes.mainwrapper}>
          <div className={classes.mainhead}>
            <div>
              <p className={`${classes.heading} ${commonClasses.body15Medium}`}>Tenant</p>
              <p className={`${classes.title} ${commonClasses.body15Regular}`}>{postPreviewData?.topics?.tenant?.snippet}</p>
            </div>
          </div>
        </div>
      )}
      {postPreviewData?.topics?.description && (
        <div className={classes.mainwrapper}>
          <div className={classes.mainhead}>
            <div>
              <p className={`${classes.heading} ${commonClasses.body15Medium}`}>Description</p>
              <p className={`${classes.title} ${commonClasses.body15Regular}`}>{postPreviewData?.topics?.description?.snippet}</p>
            </div>
          </div>
        </div>
      )}
      {inputsent(postPreviewData?.topics?.thumbnail ? 'thumbnail' : '')}
      {inputsent(postPreviewData?.topics?.attachment ? `${postPreviewData?.topics?.attachment?.type}` : '')}
      {postPreviewData?.topics?.response && (
        <div className={classes.mainwrapper}>
          <p className={`${classes.heading} ${commonClasses.body15Medium}`}>
            {showingResponseMsgs(postPreviewData?.topics?.response)}
          </p>
          <div className={classes.radioWrapper}>{inputresponse(postPreviewData?.topics?.response?.type)}</div>
        </div>
      )}
      {postPreviewData?.topics?.distributionChannel && (
        <div className={classes.mainwrapper}>
          <div className={classes.mainhead}>
            <div>
              <p className={`${classes.heading} ${commonClasses.body15Medium}`}>Distribution channels</p>
              <p className={`${classes.title} ${commonClasses.body15Regular}`}>
                {postPreviewData?.topics?.distributionChannel?.snippet?.map((d) => convertIdStringToLabelString(d)).join(', ') ||
                  ''}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// const Preview = (props: IProps) => {
//   const { sessions, unRegisterEvent, registerEvent } = props;
//   const { classes } = useStyles();
//   const commonClasses = useCommonStyles();
//   const [postPreviewData, setPostPreviewData] = useState<any>({});
//   const [attachmentsUrl, setAttachmentsUrl] = useState('');
//   const [thumbnailUrl, setThumbnailUrl] = useState('');
//   let postPreviewList: any;

//   useEffect(() => {
//     (async () => {
//       const response = await getpostPreviewData(props);

//       setPostPreviewData(response);
//     })();
//   }, [props?.selectedClient?.client_id]);

//   useEffect(() => {
//     postPreviewList = registerEvent(`${props.selectedClient.client_id}`, 'myPost.json', (updatePreview: any) => {
//       if (updatePreview) {
//         setPostPreviewData(updatePreview);
//       }
//     });
//     return () => {
//       if (postPreviewList) {
//         unRegisterEvent(postPreviewList);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (postPreviewData?.topics?.attachment?.file) {
//       (async () => {
//         const fileUrl: any = await getVoiceNoteFromURL(sessions, postPreviewData.topics.attachment.file);
//         setAttachmentsUrl(fileUrl);
//       })();
//     }
//     if (postPreviewData?.topics?.thumbnail?.file) {
//       (async () => {
//         const fileUrl: any = await getVoiceNoteFromURL(sessions, postPreviewData.topics.thumbnail.file);

//         setThumbnailUrl(fileUrl);
//       })();
//     }
//   }, [postPreviewData]);

//   const inputsent = (sentInput: any) => {
//     switch (sentInput) {
//       case 'thumbnail':
//         return (
//           <div className={classes.mainwrapper}>
//             <div className={classes.divborder}>
//               <p className={`${classes.heading} ${commonClasses.body15Medium}`}>Thumbnail image</p>
//               <MediaPhoto src={thumbnailUrl} sessions={sessions} />
//             </div>
//           </div>
//         );
//       case 'image':
//         return (
//           <div className={classes.mainwrapper}>
//             <div className={classes.divborder}>
//               <p className={`${classes.heading} ${commonClasses.body15Medium}`}>Image</p>
//               <MediaPhoto src={attachmentsUrl} sessions={sessions} />
//             </div>
//           </div>
//         );
//       case 'video':
//         return (
//           <div className={classes.mainwrapper}>
//             <div className={classes.attachedVideo}>
//               <p className={`${classes.audioHeading} ${commonClasses.body15Medium}`}>Video</p>
//               <VideoPlayerNewDesign src={attachmentsUrl} sessions={sessions} />
//             </div>
//           </div>
//         );
//       case 'file':
//         return (
//           <div className={classes.mainwrapper}>
//             <div className={classes.divborder}>
//               <p className={`${classes.heading} ${commonClasses.body15Medium}`}>Document</p>
//               <MediaDoc src={attachmentsUrl} sessions={sessions} />
//             </div>
//           </div>
//         );
//       case 'audio':
//         return (
//           <div className={classes.mainwrapper}>
//             <div className={classes.attachedVideo}>
//               <p className={`${classes.audioHeading} ${commonClasses.body15Medium}`}>Audio</p>
//               <MediaAudio src={attachmentsUrl} whiteTheme sessions={sessions} dontDownloadOnClick={true} />
//             </div>
//           </div>
//         );
//     }
//   };
//   const inputresponse = (typeofresponse: any) => {
//     switch (typeofresponse) {
//       case 'textField':
//         return <></>;
//       case 'select':
//       case 'multiSelect':
//         return (
//           <MenuListStyled {...props}>
//             {postPreviewData?.topics?.response?.snippet.length ? (
//               postPreviewData?.topics?.response?.snippet?.map((item: any, index: any) => (
//                 <MenuListItemStyled key={item} {...props} onClick={() => {}}>
//                   <div className={`${classes.labelContainer} ${commonClasses.body15Regular}`}>
//                     {/* <div className={typeofresponse === 'select' ? classes.iconCirecle : classes.iconSquare} /> */}
//                     <span>{typeofresponse === 'select' ? <ResponseCircleIcon /> : <ResponseCheck />}</span>
//                     <span className={`${classes.labelOption}`} title={item}>
//                       {item}
//                     </span>
//                   </div>
//                 </MenuListItemStyled>
//               ))
//             ) : (
//               <div className={classes.noResult}>No options</div>
//             )}
//           </MenuListStyled>
//         );
//     }
//   };

//   return (
//     <div className={classes.headerWrap}>
//       {postPreviewData?.topics?.heading && (
//         <div className={classes.mainwrapper}>
//           <div className={classes.mainhead}>
//             <div>
//               <p className={`${classes.heading} ${commonClasses.body17Medium}`}>{postPreviewData?.topics?.heading?.snippet}</p>
//             </div>
//           </div>
//         </div>
//       )}
//       {postPreviewData?.topics?.tenant && (
//         <div className={classes.mainwrapper}>
//           <div className={classes.mainhead}>
//             <div>
//               <p className={`${classes.heading} ${commonClasses.body15Medium}`}>Tenant</p>
//               <p className={`${classes.title} ${commonClasses.body15Regular}`}>{postPreviewData?.topics?.tenant?.snippet}</p>
//             </div>
//           </div>
//         </div>
//       )}
//       {postPreviewData?.topics?.description && (
//         <div className={classes.mainwrapper}>
//           <div className={classes.mainhead}>
//             <div>
//               <p className={`${classes.heading} ${commonClasses.body15Medium}`}>Description</p>
//               <p className={`${classes.title} ${commonClasses.body15Regular}`}>{postPreviewData?.topics?.description?.snippet}</p>
//             </div>
//           </div>
//         </div>
//       )}
//       {inputsent(postPreviewData?.topics?.thumbnail ? 'thumbnail' : '')}
//       {inputsent(postPreviewData?.topics?.attachment ? `${postPreviewData?.topics?.attachment?.type}` : '')}
//       {postPreviewData?.topics?.response && (
//         <div className={classes.mainwrapper}>
//           <p className={`${classes.heading} ${commonClasses.body15Medium}`}>
//             {showingResponseMsgs(postPreviewData?.topics?.response)}
//           </p>
//           <div className={classes.radioWrapper}>{inputresponse(postPreviewData?.topics?.response?.type)}</div>
//         </div>
//       )}
//       {postPreviewData?.topics?.distributionChannel && (
//         <div className={classes.mainwrapper}>
//           <div className={classes.mainhead}>
//             <div>
//               <p className={`${classes.heading} ${commonClasses.body15Medium}`}>Distribution channels</p>
//               <p className={`${classes.title} ${commonClasses.body15Regular}`}>
//                 {postPreviewData?.topics?.distributionChannel?.snippet?.join(', ') || ''}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

export default Preview;
