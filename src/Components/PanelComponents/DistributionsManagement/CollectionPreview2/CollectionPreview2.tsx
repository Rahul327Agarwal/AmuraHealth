import { Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
// import { PostSnippet, PostSnippetHeader } from '../../PostCollections/PostSnippet/PostSnippet';
import {
  callAddSubCollectionPost,
  getSubCollectionPreview,
  POST_KEYS,
  setPostFiles,
  setPostInvisiblekey,
  setSubPostFiles,
  setSubPostInvisiblekey,
  showingResponseMsgs,
} from './CollectionPreview2.function';
import { MenuListItemStyled, MenuListStyled, useStyles } from './CollectionPreview2.styles';
import { IProps } from './CollectionPreview2.types';
import { getVoiceNoteFromURL } from './../../../../Common/Common.functions';
import MediaPhoto from './../../../LibraryComponents/ChatComponent/Media/MediaPhoto';
import VideoPlayerNewDesign from './../../../LibraryComponents/ChatComponent/VideoPlayerNewDesign/VideoPlayerNewDesign';
import MediaDoc from './../../../LibraryComponents/ChatComponent/Media/MediaDoc';
import MediaAudio from './../../../LibraryComponents/ChatComponent/Media/MediaAudio';
import Button from './../../../LibraryComponents/MUIButton/MUIButton';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { CloseIcon, PostCollectionsIcon, PostIcon, ResponseCheck, ResponseCircleIcon } from '../DistributionManagement.svg';
import { PostSnippet, PostSnippetHeader } from '../../PostCollections/PostSnippet';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

const visibleKeys = {
  COLLECTIONNAME: 'collectionName',
  TITLE: 'title',
  TENANT: 'tenant',
  DESCRIPTON: 'description',
  WELCOME: 'welcomeMessage',
  THANKYOU: 'thankYouMessage',
  HEADING: 'heading',
};

const VISIBLE_KEY = {
  SC: 'SC',
  SCP: 'SCP',
  SCSC: 'SCSC',
  SCSCP: 'SCSCP',
};

const CollectionPreview2 = (props: IProps) => {
  const { removeThisPostCollection, sessions, setActionType } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const { id: panelId } = useCurrentPanel();
  const [subCollectionData, setSubCollectionData] = useState<any>({});
  const [mediaFiles, setMediaFiles] = useState({});
  const [mediaURLs, setMediaURLs] = useState({});
  const [invisibleKeys, setInvisibleKeys] = useState<any>({});
  useEffect(() => {
    if (props.subCollectionId) {
      (async () => {
        const response = await getSubCollectionPreview(props);

        setSubCollectionData(response);
        const filesObject = {};
        const invisibleKeysObj = {
          [VISIBLE_KEY.SC]: response.invisibleKeys || [],
        };
        setPostFiles(response?.posts, filesObject, POST_KEYS.PA, POST_KEYS.PT, invisibleKeysObj, VISIBLE_KEY.SCP);
        setSubPostFiles(response?.subCollections, filesObject, invisibleKeysObj, VISIBLE_KEY.SCSC, VISIBLE_KEY.SCSCP);
        setMediaFiles(filesObject);
        setInvisibleKeys(invisibleKeysObj);
      })();
    }
  }, [props.subCollectionId]);

  useEffect(() => {
    if (Object.keys(mediaFiles).length) {
      (async () => {
        const filesURLObject = {};
        for (const key in mediaFiles) {
          const element = mediaFiles[key as keyof typeof mediaFiles];
          if (element) {
            const fileURL: any = await getVoiceNoteFromURL(sessions, element);
            (filesURLObject as any)[key] = fileURL;
          }
        }
        setMediaURLs(filesURLObject);
      })();
    }
  }, [mediaFiles]);

  const handleInvisibleKey = async (data: { id: string; value: string }) => {
    const { id, value } = data;
    let preClone = { ...invisibleKeys };
    let preValue = (preClone as any)[id] || [];

    const index = preValue.indexOf(value);
    if (index !== -1) {
      preValue.splice(index, 1);
    } else {
      preValue = [...preValue, value];
    }

    setInvisibleKeys({ ...preClone, [id]: preValue });
  };

  const addPostPreviewData = async () => {
    let posts = subCollectionData.posts;
    let subCollections = subCollectionData.subCollections;
    if (subCollectionData.posts) {
      posts = setPostInvisiblekey(subCollectionData.posts, invisibleKeys, VISIBLE_KEY.SCP);
    }
    if (subCollectionData.subCollections) {
      subCollections = setSubPostInvisiblekey(
        subCollectionData.subCollections,
        invisibleKeys,
        VISIBLE_KEY.SCSC,
        VISIBLE_KEY.SCSCP
      );
    }

    posts = posts?.length
      ? posts.map((post: any, index: any) => ({
          hasResponse: post.hasResponse,
          postType: post.postType,
          invisibleKeys: post.invisibleKeys,
          postId: post.postId,
          heading: post.topics?.heading?.snippet,
          order: post.order,
        }))
      : [];

    subCollections = subCollections.map((collection: any) => ({
      numberOfPosts: collection?.numberOfPosts,
      collectionName: collection?.topics?.collectionName?.snippet,
      parentCollectionId: collection?.parentCollectionId,
      invisibleKeys: collection?.invisibleKeys,
      subCollectionId: collection?.subCollectionId,
      hasBranching:collection?.hasBranching,
      posts: collection?.posts?.length
        ? collection.posts.map((post: any, index: any) => ({
            hasResponse: post.hasResponse,
            heading: post.topics?.heading?.snippet,
            invisibleKeys: post.invisibleKeys,
            postType: post.postType,
            postId: post.postId,
            order: post.order,
          }))
        : [],
    }));

    const payload = {
      subCollectionId: props.subCollectionId,
      collectionName: subCollectionData?.topics?.collectionName?.snippet,
      invisibleKeys: invisibleKeys[VISIBLE_KEY.SC as keyof typeof invisibleKeys],
      hasBranching: subCollectionData?.hasBranching,
      numberOfPosts: subCollectionData?.numberOfPosts,
      elementOrder: 1,
      elementToAdd: 'SC',
      posts,
      subCollections,
    };
    await callAddSubCollectionPost(props, payload, panelId);
    removeThisPostCollection(props.subCollectionId);
  };

  const handleCose = () => {
    setActionType({ screen: 'ADD_COLLECTION', payload: {} });
  };

  const inputresponse = (typeofresponse: any, optionsData: any) => {
    switch (typeofresponse) {
      case 'textField':
        return <></>;
      case 'select':
      case 'multiSelect':
        return (
          <MenuListStyled {...props}>
            {optionsData.length ? (
              optionsData?.map((item: any, index: any) => (
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
  const renderMedia = (imediaType: any, imediaURL: any) => {
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
  return (
    <div className={classes.rootContainer}>
      <div className={`${classes.dflex} ${classes.titleWraper}`}>
        <div className={`${commonClasses.body17Medium}`}>Sub Collections Preview</div>
        <div className={classes.iconStyle} onClick={handleCose}>
          {<CloseIcon />}
        </div>
      </div>
      <div className={classes.headerWrap}>
        <PostSnippet title={subCollectionData?.topics?.collectionName?.snippet} titleOnly />
        <PostSnippet title="Tenant" content={subCollectionData?.topics?.tenant?.snippet} />
        <PostSnippet
          title="Description"
          content={subCollectionData?.topics?.description?.snippet}
          handleToggleView={() =>
            handleInvisibleKey({
              id: VISIBLE_KEY.SC,
              value: visibleKeys.DESCRIPTON,
            })
          }
          isHideView={invisibleKeys[VISIBLE_KEY.SC]?.includes(visibleKeys.DESCRIPTON)}
        />
        <PostSnippet
          title="Welcome messsage"
          content={subCollectionData?.topics?.welcomeMessage?.snippet}
          handleToggleView={() =>
            handleInvisibleKey({
              id: VISIBLE_KEY.SC,
              value: visibleKeys.WELCOME,
            })
          }
          isHideView={invisibleKeys[VISIBLE_KEY.SC]?.includes(visibleKeys.WELCOME)}
        />
        <Divider className={classes.dividerStyle} />
        {subCollectionData?.posts?.map((data: any, index: any) => {
          return (
            <div key={index} className={classes.addingStyle}>
              <PostSnippetHeader
                content={data?.topics?.heading?.snippet}
                handleToggleView={() =>
                  handleInvisibleKey({
                    id: `${VISIBLE_KEY.SCP}_${index}`,
                    value: visibleKeys.HEADING,
                  })
                }
                isHideView={invisibleKeys[`${VISIBLE_KEY.SCP}_${index}`]?.includes(visibleKeys.HEADING)}
                icon={<PostIcon />}
              />
              <PostSnippet
                title="Description"
                content={data?.topics?.description?.snippet}
                handleToggleView={() =>
                  handleInvisibleKey({
                    id: `${VISIBLE_KEY.SCP}_${index}`,
                    value: visibleKeys.DESCRIPTON,
                  })
                }
                isHideView={invisibleKeys[`${VISIBLE_KEY.SCP}_${index}`]?.includes(visibleKeys.DESCRIPTON)}
              />
              {data?.topics?.thumbnail && renderMedia('thumbnail', (mediaURLs as any)[`${POST_KEYS.PT}_${index}`] || '')}
              {renderMedia(data?.topics?.attachment?.type, (mediaURLs as any)[`${POST_KEYS.PA}_${index}`] || '')}
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
              <PostSnippet title="Distribution channels" content={data?.topics?.distributionChannel?.snippet?.join(', ')} />

              <Divider className={classes.dividerStyle} />
            </div>
          );
        })}
        {subCollectionData?.subCollections?.map((data: any, index: any) => {
          return (
            <div key={index} className={classes.addingStyle}>
              <div className={classes.namediv}>
                <div className={classes.iconwrapper}>{<PostCollectionsIcon />}</div>
                <PostSnippet
                  title={data?.topics?.collectionName?.snippet}
                  handleToggleView={() =>
                    handleInvisibleKey({
                      id: `${VISIBLE_KEY.SCSC}_${index}`,
                      value: visibleKeys.COLLECTIONNAME,
                    })
                  }
                  isHideView={invisibleKeys[`${VISIBLE_KEY.SCSC}_${index}`]?.includes(visibleKeys.COLLECTIONNAME)}
                  titleOnly
                />
              </div>
              <PostSnippet title="Tenant" content={data?.topics?.tenant?.snippet} />
              <PostSnippet
                title="Description"
                content={data?.topics?.description?.snippet}
                handleToggleView={() =>
                  handleInvisibleKey({
                    id: `${VISIBLE_KEY.SCSC}_${index}`,
                    value: visibleKeys.DESCRIPTON,
                  })
                }
                isHideView={invisibleKeys[`${VISIBLE_KEY.SCSC}_${index}`]?.includes(visibleKeys.DESCRIPTON)}
              />
              <PostSnippet
                title="Welcome messsage"
                content={data?.topics?.welcomeMessage?.snippet}
                handleToggleView={() =>
                  handleInvisibleKey({
                    id: `${VISIBLE_KEY.SCSC}_${index}`,
                    value: visibleKeys.WELCOME,
                  })
                }
                isHideView={invisibleKeys[`${VISIBLE_KEY.SCSC}_${index}`]?.includes(visibleKeys.WELCOME)}
              />

              <Divider className={classes.dividerStyle} />
              {data?.posts?.map((data1: any, index: any) => {
                return (
                  <div key={index} className={classes.addingStyle}>
                    <PostSnippetHeader
                      content={data1?.topics?.heading?.snippet}
                      handleToggleView={() =>
                        handleInvisibleKey({
                          id: `${VISIBLE_KEY.SCSCP}_${index}_${data?.topics?.collectionName?.snippet}`,
                          value: visibleKeys.HEADING,
                        })
                      }
                      isHideView={invisibleKeys[
                        `${VISIBLE_KEY.SCSCP}_${index}_${data?.topics?.collectionName?.snippet}`
                      ]?.includes(visibleKeys.HEADING)}
                      icon={<PostIcon />}
                    />
                    <PostSnippet
                      title="Description"
                      content={data1?.topics?.description?.snippet}
                      handleToggleView={() =>
                        handleInvisibleKey({
                          id: `${VISIBLE_KEY.SCSCP}_${index}_${data?.topics?.collectionName?.snippet}`,
                          value: visibleKeys.DESCRIPTON,
                        })
                      }
                      isHideView={invisibleKeys[
                        `${VISIBLE_KEY.SCSCP}_${index}_${data?.topics?.collectionName?.snippet}`
                      ]?.includes(visibleKeys.DESCRIPTON)}
                    />
                    {data1?.topics?.thumbnail && renderMedia('thumbnail', (mediaURLs as any)[`${POST_KEYS.SPT}_${index}`] || '')}
                    {renderMedia(data1?.topics?.attachment?.type, (mediaURLs as any)[`${POST_KEYS.SPA}_${index}`] || '')}
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

                    <PostSnippet
                      title="Distribution channels"
                      content={data1?.topics?.distributionChannel?.snippet?.join(', ')}
                    />
                    <Divider className={classes.dividerStyle} />
                  </div>
                );
              })}
              <PostSnippet
                title="Thank you messsage"
                content={data?.topics?.thankYouMessage?.snippet}
                handleToggleView={() =>
                  handleInvisibleKey({
                    id: `${VISIBLE_KEY.SCSC}_${index}`,
                    value: visibleKeys.THANKYOU,
                  })
                }
                isHideView={invisibleKeys[`${VISIBLE_KEY.SCSC}_${index}`]?.includes(visibleKeys.THANKYOU)}
              />
            </div>
          );
        })}

        <PostSnippet
          title="Thank you messsage"
          content={subCollectionData?.topics?.thankYouMessage?.snippet}
          handleToggleView={() =>
            handleInvisibleKey({
              id: VISIBLE_KEY.SC,
              value: visibleKeys.THANKYOU,
            })
          }
          isHideView={invisibleKeys[VISIBLE_KEY.SC]?.includes(visibleKeys.THANKYOU)}
        />
      </div>
      <div className={classes.footerDiv}>
        <Button onClick={addPostPreviewData} variant="contained" size="large" fullWidth>
          Add this to post collection
        </Button>
      </div>
    </div>
  );
};

export default CollectionPreview2;
