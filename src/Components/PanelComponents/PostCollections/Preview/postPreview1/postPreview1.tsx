import React, { useEffect, useState } from 'react';
import MediaAudio from './../../../../LibraryComponents/ChatComponent/Media/MediaAudio';
import MediaDoc from './../../../../LibraryComponents/ChatComponent/Media/MediaDoc';
import MediaPhoto from './../../../../LibraryComponents/ChatComponent/Media/MediaPhoto';
import VideoPlayerNewDesign from './../../../../LibraryComponents/ChatComponent/VideoPlayerNewDesign/VideoPlayerNewDesign';
import { getVoiceNoteFromURL } from '../../RightMessage/RightMessage.functions';
import { getpostPreviewData, showingResponseMsgs } from './Preview.function';
import { useStyles, MenuListStyled, MenuListItemStyled } from './Preview.styles';
import { v4 } from 'uuid';
import { PMS_S3 } from '../../../../../Utils';
import { IProps } from './Preview.types';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from './../../../../../DisplayFramework/State/store';
import Button from './../../../../LibraryComponents/MUIButton/MUIButton';
import SuccessToast from './../../../../../Common/SuccessToaster';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { CloseIcon, HideView, ResponseCheck, ResponseCircleIcon, ViewIcon } from '../../../../SVGs/Common';
import { useCurrentPanel } from '../../../../../DisplayFramework/Components/Panel/Panel.hooks';

const Preview = (props: IProps) => {
  const { sessions, removeThisPost, setActionType } = props;
  const { id: panelId } = useCurrentPanel();
  const uniqueId = useSelector((state: IRootState) => state.AllPostData.uniqueId);
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const [postPreviewData, setPostPreviewData] = useState<any>({});
  const [attachmentsUrl, setAttachmentsUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [optionsData, setOptionsData] = useState<any>([]);
  const [visibility, setVisibility] = useState<any>([]);
  const [invisibleKeys, setInvisibleKeys] = useState<any>([]);
  let postPreviewList: any;
  useEffect(() => {
    (async () => {
      const response = await getpostPreviewData(props);
      setPostPreviewData(response);
    })();
  }, []);

  const handleCancel = () => {
    removeThisPost?.(props?.postId);
  };

  const addPostPreviewData = () => {
    let payload: any = {
      EventName: 'manage-collections',
      action: 'ADD',
      userId: sessions.user.id,
      tenantId: 'amura',
      collectionId: uniqueId,
      collectionType: 'PCM',
      elementsToAdd: [
        {
          postId: props?.postId,
          invisibleKeys: invisibleKeys,
          postType: props.postType,
          hasResponse: postPreviewData.hasResponse,
          heading: postPreviewData?.topics?.heading?.snippet,
          elementOrder: 1,
          elementToAdd: 'POST',
        },
      ],
    };
    PMS_S3.postData({
      ...payload,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_EVENT_API,
      token: sessions.id_token,
      method: 'POST',
      headers: {},
    })
      .then((response: any) => {
        if (!response.Error) {
          SuccessToast('Post added successfully', panelId, 'success');
          handleCancel();
        }
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const handleVisibility = (isVisible: any, key: any) => {
    if (visibility.includes(isVisible)) {
      setVisibility((pre: any) => pre.filter((data: any) => data != isVisible));
    } else {
      setVisibility((pre: any) => [...pre, isVisible]);
    }
    if (invisibleKeys.includes(key)) {
      setInvisibleKeys((pre: any) => pre.filter((data: any) => data != key));
    } else {
      setInvisibleKeys((pre: any) => [...pre, key]);
    }
  };

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
    if (postPreviewData?.topics?.response?.snippet && postPreviewData?.topics?.response?.snippet.length > 0) {
      setOptionsData(
        postPreviewData?.topics?.response?.snippet.map((value: any) => ({
          label: value,
          value: value,
        }))
      );
    }
  }, [postPreviewData]);

  const inputsent = (sentInput: any) => {
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
              <MediaAudio src={attachmentsUrl} whiteTheme sessions={sessions} />
            </div>
          </div>
        );
    }
  };

  const inputresponse = (typeofresponse: any) => {
    switch (typeofresponse) {
      case 'textField':
        return <></>;
      case 'select':
      case 'multiSelect':
        return (
          <MenuListStyled {...props}>
            {postPreviewData?.topics?.response?.snippet.length ? (
              postPreviewData?.topics?.response?.snippet?.map((item: any, index: any) => (
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
      <div className={classes.mainwrapper}>
        <div className={`${classes.flex} `}>
          <div className={`${classes.heading} ${commonClasses.body17Medium}`}>Post Preview</div>

          <div
            onClick={() => {
              setActionType?.('HOME');
            }}
            className={classes.iconStyle}
          >
            {<CloseIcon />}
          </div>
        </div>
      </div>
      <div className={classes.scroll}>
        {postPreviewData?.topics?.heading && (
          <div className={classes.mainwrapper}>
            <div className={classes.flex}>
              <p className={`${classes.heading} ${commonClasses.body17Medium}`}>{postPreviewData?.topics?.heading?.snippet}</p>
              <p
                onClick={() => {
                  handleVisibility(0, 'heading');
                }}
              >
                {visibility.includes(0) ? <HideView /> : <ViewIcon />}
              </p>
            </div>
          </div>
        )}
        {postPreviewData?.topics?.description && (
          <div className={classes.mainwrapper}>
            <div className={classes.flex}>
              <p className={`${classes.heading} ${commonClasses.body15Medium}`}>Description</p>
              <p
                onClick={() => {
                  handleVisibility(1, 'description');
                }}
              >
                {visibility.includes(1) ? <HideView /> : <ViewIcon />}
              </p>
            </div>
            <p className={`${classes.title} ${commonClasses.body15Regular}`}>{postPreviewData?.topics?.description?.snippet}</p>
          </div>
        )}
        {inputsent(postPreviewData?.topics?.thumbnail ? 'thumbnail' : '')}
        {inputsent(postPreviewData?.topics?.attachment ? `${postPreviewData?.topics?.attachment?.type}` : '')}
        {/* FOR RESPONSE AND DISTRIBUTION CHANNEL*/}

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
                  {postPreviewData?.topics?.distributionChannel?.snippet?.join(', ') || ''}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={classes.footerWrapper}>
        <Button
          onClick={addPostPreviewData}
          children="Add this to post collection"
          variant="contained"
          size="large"
          fullWidth={true}
        />
      </div>
    </div>
  );
};

export default Preview;
