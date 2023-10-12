import MediaPhoto from '../../../LibraryComponents/ChatComponent/Media/MediaPhoto';
import VideoPlayerNewDesign from '../../../LibraryComponents/ChatComponent/VideoPlayerNewDesign/VideoPlayerNewDesign';
import MediaDoc from '../../../LibraryComponents/ChatComponent/Media/MediaDoc';
import MediaAudio from '../../../LibraryComponents/ChatComponent/Media/MediaAudio';
import { PostSnippet, PostSnippetHeader } from '../PostSnippet/PostSnippet';
import { DEFAULT_SNIPPETS, getSnippetValue } from '../Summary/Summary.function';

import { POST_KEYS, VISIBLE_KEY } from './PostCollectionPreview.function';
import { useStyles } from './PostCollectionPreview.styles';
import { IPostCollectionPreviewProps } from './PostCollectionPreview.types';
import { PostCollections, PostIcon, ResponseCheck, ResponseCircleIcon } from '../DistributionManagement.svg';
import { showingResponseMsgs } from '../CollectionPreview2/CollectionPreview2.function';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';

const PostCollectionPreview = (props: IPostCollectionPreviewProps) => {
  const {
    topics,
    handleInvisibleKey,
    invisibleKeys,
    mediaURLs,
    posts,
    subCollections,
    uniqueId,
    level = 0,
    showHeaderIocn,
    isShowPadding,
    sessions,
  } = props;

  const defaultUniqueId = uniqueId ?? `${VISIBLE_KEY.SUB_POST}_00`;
  let count = 0;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

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
    <section className={classes.postPreviewContainer}>
      <PostSnippetHeader
        count={level}
        content={(topics?.['collectionName'] && topics?.['collectionName'].snippet) || ''}
        icon={<PostCollections />}
        isShowIcon={showHeaderIocn}
      />
      {Object.entries(topics || {}).map(([key, value]: any) => {
        if ('collectionName' === key || 'title' === key) return;
        const content: any = getSnippetValue(value?.snippet);
        return (
          <PostSnippet
            key={key}
            title={DEFAULT_SNIPPETS[key] && DEFAULT_SNIPPETS[key].heading ? DEFAULT_SNIPPETS[key].heading : ''}
            content={content}
            ispadding={isShowPadding}
            {...(handleInvisibleKey &&
              DEFAULT_SNIPPETS[key] &&
              DEFAULT_SNIPPETS[key].heading &&
              DEFAULT_SNIPPETS[key].heading !== 'Tenant' && {
                handleToggleView: () => handleInvisibleKey({ id: defaultUniqueId, value: key }),
                isHideView: invisibleKeys[defaultUniqueId]?.includes(key),
              })}
          />
        );
      })}

      {posts &&
        posts?.map((data, ind) => {
          return (
            <div className={classes.postsWrapper} key={ind}>
              <div className={classes.postCount}>{++count}</div>
              <div>
                <div className={classes.postTitleWrapper}>
                  <i>{<PostIcon />}</i>
                  <span className={`${commonClasses.body15Medium} ${classes.wordWrap}`}>{data?.topics?.heading?.snippet}</span>
                </div>
                {renderMessage(data?.topics?.description?.snippet, 'Description')}
                {data?.topics?.thumbnail &&
                  renderMedia('thumbnail', mediaURLs[`${uniqueId}_${POST_KEYS.PT}_${level + ind + 1}${ind}`] || '')}
                {renderMedia(
                  data?.topics?.attachment?.type,
                  mediaURLs[`${uniqueId}_${POST_KEYS.PA}_${level + ind + 1}${ind}`] || ''
                )}
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
      {subCollections &&
        subCollections.map((data, ind) => {
          let subUniqueId = `${VISIBLE_KEY.SUB_POST}_${level + ind + 1}${ind}`;
          let subLevel = `${posts.length + ind + 1}`;

          return (
            <div>
              <div className={classes.postsWrapper} key={ind}>
                <div className={classes.postCount}>{++count}</div>
                <div>
                  <div className={classes.postTitleWrapper}>
                    <i>{<PostCollections />}</i>
                    <span className={`${classes.wordWrap} ${commonClasses.body15Medium}`}>
                      {data?.topics?.collectionName?.snippet}
                    </span>
                  </div>
                  {renderMessage(data?.topics?.tenant?.snippet, 'Tenant')}
                  {renderMessage(data?.topics?.description?.snippet, 'Description')}
                  {renderMessage(data?.topics?.welcomeMessage?.snippet, 'Welcome messsage')}
                  {data?.posts &&
                    data?.posts.map((data1, ind1) => {
                      return (
                        <div className={` ${classes.border}`}>
                          <div className={`${classes.postsSubWrapper}`}>
                            <div className={classes.postCount}>{ind1 + 1}</div>
                            <div className={classes.postTitleWrapper}>
                              <i>{<PostIcon />}</i>
                              <span className={`${commonClasses.body15Medium} ${classes.wordWrap}`}>
                                {data1?.topics?.heading?.snippet}
                              </span>
                            </div>
                          </div>
                          <div>
                            {renderMessage(data1?.topics?.description?.snippet, 'Description')}
                            {data1?.topics?.thumbnail &&
                              renderMedia(
                                'thumbnail',
                                mediaURLs[`${subUniqueId}_${POST_KEYS.PT}_${parseInt(subLevel) + ind1 + 1}${ind1}`] || ''
                              )}
                            {renderMedia(
                              data1?.topics?.attachment?.type,
                              mediaURLs[`${subUniqueId}_${POST_KEYS.PA}_${parseInt(subLevel) + ind1 + 1}${ind1}`] || ''
                            )}
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
                                    <p className={`${classes.heading} ${commonClasses.body15Medium}`}>Distribution channels</p>
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
    </section>
  );
};
export default PostCollectionPreview;
