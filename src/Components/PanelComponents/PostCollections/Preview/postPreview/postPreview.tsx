import { useEffect, useState } from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
// import { CloseIcon, PostCollections, PostIcon, ResponseCheck, ResponseCircleIcon } from '../../../../SVGs/Common';
import { getVoiceNoteFromURL } from '../../RightMessage/RightMessage.functions';
import MediaAudio from './../../../../LibraryComponents/ChatComponent/Media/MediaAudio';
import MediaDoc from './../../../../LibraryComponents/ChatComponent/Media/MediaDoc';
import MediaPhoto from './../../../../LibraryComponents/ChatComponent/Media/MediaPhoto';
import VideoPlayerNewDesign from './../../../../LibraryComponents/ChatComponent/VideoPlayerNewDesign/VideoPlayerNewDesign';
import IndeterminateLoader from './../../../../LibraryComponents/InderminateLoader/InderminateLoader';
import { POST_KEYS, getFinalPostPreview, setPostFiles, setSubPostFiles, showingResponseMsgs } from './Preview.function';
import { useStyles } from './Preview.styles';
import { IProps } from './Preview.types';
import { CloseIcon, PostCollections, PostIcon, ResponseCheck, ResponseCircleIcon } from './postPreview.svg';
import { PostCollectionsIcon } from '../../../../SVGs/Common';
import MUISkeleton from '../../../../LibraryComponents/MUISkeleton/MUISkeleton';

const PostPreview = (props: IProps) => {
  const { setActionType, sessions } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  let count = 0;
  const [selectValue, setselectValue] = useState();
  const [postPreviewData, setPostPreviewData] = useState<any>({});
  const [mediaFiles, setMediaFiles] = useState({});
  const [mediaURLs, setMediaURLs] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (props.collectionId) {
      (async () => {
        setIsLoading(true);
        const response = await getFinalPostPreview(props);
        console.log(response, 'final preview');
        setPostPreviewData(response);
        const filesObject = {};
        setPostFiles(response?.posts, filesObject, POST_KEYS.PA, POST_KEYS.PT);
        setSubPostFiles(response?.subCollections, filesObject);
        setMediaFiles(filesObject);
        setIsLoading(false);
      })();
    }
  }, [props?.selectedClient?.client_id, props.collectionId]);

  useEffect(() => {
    if (Object.keys(mediaFiles).length) {
      (async () => {
        const filesURLObject = {};
        for (const key in mediaFiles) {
          const element = mediaFiles[key];
          if (element) {
            const fileURL: any = await getVoiceNoteFromURL(sessions, element);
            filesURLObject[key] = fileURL;
          }
        }

        setMediaURLs(filesURLObject);
      })();
    }
  }, [mediaFiles]);

  const handleSelect = (value) => setselectValue(value);

  const renderMedia = (imediaType, imediaURL) => {
    switch (imediaType) {
      case 'thumbnail':
        return (
          <div className={classes.mainwrapper}>
            <div className={classes.divborder}>
              <p className={`${classes.heading} ${commonClasses.body15Medium}`}>Thumbnail image</p>
              <MediaPhoto src={imediaURL} sessions={sessions} />
            </div>
          </div>
        );
      case 'image':
        return (
          <div className={classes.mainwrapper}>
            <div className={classes.divborder}>
              <p className={`${classes.heading} ${commonClasses.body15Medium}`}>Image</p>
              <MediaPhoto src={imediaURL} sessions={sessions} />
            </div>
          </div>
        );
      case 'video':
        return (
          <div className={classes.mainwrapper}>
            <div className={classes.attachedVideo}>
              <p className={`${classes.audioHeading} ${commonClasses.body15Medium}`}>Video</p>
              <VideoPlayerNewDesign src={imediaURL} sessions={sessions} EnableClickAwayListener={true} />
            </div>
          </div>
        );
      case 'file':
        return (
          <div className={classes.mainwrapper}>
            <div className={classes.divborder}>
              <p className={`${classes.heading} ${commonClasses.body15Medium}`}>Document</p>
              <MediaDoc src={imediaURL} sessions={sessions} />
            </div>
          </div>
        );
      case 'audio':
        return (
          <div className={classes.mainwrapper}>
            <div className={classes.attachedVideo}>
              <p className={`${classes.audioHeading} ${commonClasses.body15Medium}`}>Audio</p>
              <MediaAudio src={imediaURL} whiteTheme sessions={sessions} EnableClickAwayListener={true} />
            </div>
          </div>
        );
    }
  };
  const renderMessage = (content, title) => {
    return content ? (
      <div className={classes.mainwrapper}>
        <div className={classes.mainhead}>
          <div>
            <p className={`${classes.heading} ${commonClasses.body15Medium} ${classes.wordWrap}`}>{title}</p>
            <p className={`${classes.title} ${classes.wordWrap} ${commonClasses.body15Regular}`}>{content}</p>
          </div>
        </div>
      </div>
    ) : null;
  };
  const inputresponse = (typeofresponse, optionsData) => {
    switch (typeofresponse) {
      case 'textField':
        return <></>;
      case 'select':
      case 'multiSelect':
        return (
          <>
            {optionsData.length ? (
              optionsData?.map((item) => (
                <div className={`${classes.labelContainer} ${commonClasses.body15Regular}`}>
                  <span>{typeofresponse === 'select' ? <ResponseCircleIcon /> : <ResponseCheck />}</span>
                  <span className={`${classes.labelOption}`} title={item}>
                    {item}
                  </span>
                </div>
              ))
            ) : (
              <div className={classes.noResult}>No options</div>
            )}
          </>
        );
    }
  };
  return (
    <div className={classes.rootContainer}>
      <div className={`${classes.dflex} ${classes.titleWraper}`}>
        <div className={`${commonClasses.body17Medium} ${classes.wordWrap}`}>
          {postPreviewData?.topics?.collectionName?.snippet}
        </div>
        <div className={classes.iconStyle} onClick={() => setActionType('POSTS')}>
          <CloseIcon />
        </div>
      </div>
      {isLoading && (
        <>
          <MUISkeleton animation="wave" variant="rectangular" height="130px" width="100%" style={{ margin: '0px 0px 8px 0px' }} />
          <MUISkeleton animation="wave" variant="rectangular" height="130px" width="100%" style={{ margin: '0px 0px 8px 0px' }} />
          <MUISkeleton animation="wave" variant="rectangular" height="130px" width="100%" style={{ margin: '0px 0px 8px 0px' }} />
          <MUISkeleton animation="wave" variant="rectangular" height="130px" width="100%" style={{ margin: '0px 0px 8px 0px' }} />
          <MUISkeleton animation="wave" variant="rectangular" height="130px" width="100%" style={{ margin: '0px 0px 8px 0px' }} />
        </>
      )}
      <div className={classes.headerWrap}>
        {!isLoading && (
          <>
            {/* <div className={classes.mainwrapper}>
              <div className={classes.mainhead}>
                <div>
                  <p
                    className={`${classes.heading} ${classes.titleWraper} ${commonClasses.body17Medium}`}
                  >
                    {postPreviewData?.topics?.title?.snippet}
                  </p>
                </div>
              </div>
            </div> */}
            {renderMessage(postPreviewData?.topics?.tenant?.snippet, 'Tenant')}
            {renderMessage(postPreviewData?.topics?.description?.snippet, 'Description')}
            {renderMessage(postPreviewData?.topics?.welcomeMessage?.snippet, 'Welcome messsage')}
            {/* {renderMessage(postPreviewData?.topics?.thankYouMessage?.snippet, "Thank you messsage")} */}
            {postPreviewData?.posts?.length || postPreviewData?.subCollections?.length ? (
              <>
                <span className={`${commonClasses.body15Medium} ${classes.subTitle}`}>Posts & Sub collection</span>
                <span className={`${commonClasses.caption12Medium} ${classes.subPostTitle}`}>
                  {postPreviewData?.posts?.length || '0'} Posts & {postPreviewData?.subCollections?.length || '0'} sub collections
                  includes
                </span>
              </>
            ) : (
              <></>
            )}
            {postPreviewData?.posts?.map((data, ind) => {
              return (
                <div className={classes.postsWrapper} key={ind}>
                  <div className={classes.postCount}>{++count}</div>
                  <div>
                    <div className={classes.postTitleWrapper}>
                      <i>
                        <PostIcon />
                      </i>
                      <span className={`${commonClasses.body15Medium} ${classes.wordWrap}`}>
                        {data?.topics?.heading?.snippet}
                      </span>
                    </div>
                    {/* {renderMessage(
                      data?.topics?.heading?.snippet,
                      "Description"
                    )} */}
                    {renderMessage(data?.topics?.description?.snippet, 'Description')}
                    {data?.topics?.thumbnail && renderMedia('thumbnail', mediaURLs[`${POST_KEYS.PT}_${ind}`] || '')}
                    {renderMedia(data?.topics?.attachment?.type, mediaURLs[`${POST_KEYS.PA}_${ind}`] || '')}
                    {data?.topics?.response && (
                      <div className={classes.mainwrapper}>
                        <p className={`${classes.heading} ${commonClasses.body15Medium}`}>
                          {showingResponseMsgs(data?.topics?.response)}
                        </p>
                        <div className={classes.radioWrapper}>
                          {inputresponse(data?.topics?.response?.type, data?.topics?.response?.snippet)}
                        </div>
                      </div>
                    )}
                    {data?.topics?.distributionChannel && (
                      <div className={classes.mainwrapper}>
                        <div className={classes.mainhead}>
                          <div>
                            <p className={`${classes.heading} ${commonClasses.body15Medium}`}>Distribution channels</p>
                            <p className={`${classes.title} ${commonClasses.body15Regular}`}>
                              {data?.topics?.distributionChannel?.snippet?.join(', ') || ''}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {postPreviewData?.subCollections &&
              postPreviewData?.subCollections.map((data, ind) => {
                return (
                  <div key={ind}>
                    <div className={classes.postsWrapper}>
                      <div className={classes.postCount}>{++count}</div>
                      <div>
                        <div className={classes.postTitleWrapper}>
                          <i>
                            <PostCollectionsIcon />
                          </i>
                          <span className={`${classes.wordWrap} ${commonClasses.body15Medium}`}>
                            {data?.topics?.collectionName?.snippet}
                          </span>
                        </div>
                        {renderMessage(data?.topics?.tenant?.snippet, 'Tenant')}
                        {renderMessage(data?.topics?.description?.snippet, 'Description')}
                        {renderMessage(data?.topics?.welcomeMessage?.snippet, 'Welcome messsage')}
                        {/* {renderMessage(data?.topics?.thankYouMessage?.snippet, "Thank you messsage")} */}
                        {data?.posts &&
                          data?.posts.map((data1, ind) => {
                            return (
                              <div className={` ${classes.border}`} key={ind}>
                                <div className={`${classes.postsSubWrapper}`}>
                                  <div className={classes.postCount}>{ind + 1}</div>
                                  <div className={classes.postTitleWrapper}>
                                    <i>
                                      <PostIcon />
                                    </i>
                                    <span className={`${commonClasses.body15Medium} ${classes.wordWrap}`}>
                                      {data1?.topics?.heading?.snippet}
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  {renderMessage(data1?.topics?.description?.snippet, 'Description')}
                                  {data1?.topics?.thumbnail &&
                                    renderMedia('thumbnail', mediaURLs[`${POST_KEYS.SPT}_${ind}`] || '')}
                                  {renderMedia(data1?.topics?.attachment?.type, mediaURLs[`${POST_KEYS.SPA}_${ind}`] || '')}
                                  {data1?.topics?.response && (
                                    <div className={classes.mainwrapper}>
                                      <p className={`${classes.heading} ${commonClasses.body15Medium}`}>
                                        {showingResponseMsgs(data1?.topics?.response)}
                                      </p>
                                      <div className={classes.radioWrapper}>
                                        {inputresponse(data1?.topics?.response?.type, data1?.topics?.response?.snippet)}
                                      </div>
                                    </div>
                                  )}
                                  {data1?.topics?.distributionChannel && (
                                    <div className={classes.mainwrapper}>
                                      <div className={classes.mainhead}>
                                        <div>
                                          <p className={`${classes.heading} ${commonClasses.body15Medium}`}>
                                            Distribution channels
                                          </p>
                                          <p className={`${classes.title} ${commonClasses.body15Regular}`}>
                                            {data1?.topics?.distributionChannel?.snippet?.join(', ') || ''}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        {renderMessage(data?.topics?.thankYouMessage?.snippet, 'Thank you messsage')}
                      </div>
                    </div>
                  </div>
                );
              })}
            {renderMessage(postPreviewData?.topics?.thankYouMessage?.snippet, 'Thank you messsage')}
          </>
        )}
      </div>
    </div>
  );
};

export default PostPreview;
