import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { debounce } from '@mui/material';
import { IRegisterEvent } from '../../../../../AppSync/AppSync.types';
import { BranchingEnabled } from '../../../../SVGs/Common';
import { getpostCollectionSummaryData } from '../../Summary/PostCollectionsSummary.function';
import PostPreview from '../postPreview/postPreview';
import { setprePreviewDisabledButton } from './../../../../../DisplayFramework/State/Slices/AllPostsDataSlice';
import { setBranchingCardData } from './../../../../../DisplayFramework/State/Slices/BranchingSlice';
import { IRootState } from './../../../../../DisplayFramework/State/store';
import PostCard from './PostCard/PostCard';
import { invisibleUpdateAPI } from './Preview.function';
import { useStyles } from './Preview.styles';
import { Actions, IProps } from './Preview.types';
import { HideView, PlusIcon, ViewIcon } from './prePreview.svg';
import MUISkeleton from '../../../../LibraryComponents/MUISkeleton/MUISkeleton';

const visibleKeys = {
  NAME: 'collectionName',
  TITLE: 'title',
  TENANT: 'tenant',
  DESCRIPTON: 'description',
  WELCOME: 'welcomeMessage',
  THANKYOU: 'thankYouMessage',
  HEADING: 'heading',
};

const POST_OPTIONS: any = [
  {
    title: 'Hide',
    type: 'label',
    value: 'HIDE',
    subMenu: [
      { title: 'Title', value: visibleKeys.HEADING, type: 'checkbox' },
      { title: 'Description', value: visibleKeys.DESCRIPTON, type: 'checkbox' },
    ],
  },
];

const SUB_COLLECTION_POST_OPTIONS: any = [
  {
    title: 'Hide',
    type: 'label',
    value: 'HIDE',
    subMenu: [
      { title: 'Description', value: visibleKeys.DESCRIPTON, type: 'checkbox' },
      { title: 'Welcome', value: visibleKeys.WELCOME, type: 'checkbox' },
      { title: 'Thankyou', value: visibleKeys.THANKYOU, type: 'checkbox' },
    ],
  },
];

const PrePreview = (props: IProps) => {
  const { sessions, panel, registerEvent, unRegisterEvent, childEventTrigger } = props;
  const { classes } = useStyles();
  const commanClass = useCommonStyles();
  const [actionType, setActionType] = useState<Actions>('POSTS');
  const [postsummarydata, setPostSummaryData] = useState<any>();
  const [branchingdata, setBranchingData] = useState<any>();
  const dispatch = useDispatch();
  const [invisibleKeys, setInvisibleKeys] = useState([]);
  const [toggled, setToggled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const disabledprePreviewbutton = useSelector((state: IRootState) => state.AllPostData.disabledprePreviewbutton);

  let postSummarryList: IRegisterEvent;
  useEffect(() => {
    setActionType('POSTS');
    setToggled(false);
    (async () => {
      setIsLoading(true);
      const summaryResponse = await getpostCollectionSummaryData(props);
      if (summaryResponse) {
        setPostSummaryData(summaryResponse);
      }
      setIsLoading(false);
    })();

    postSummarryList = registerEvent(`${props.selectedClient.client_id}`, 'myCollection.json', (updateSummary) => {
      if (updateSummary) {
        setPostSummaryData(updateSummary);
      }
    });
    return () => {
      if (postSummarryList) {
        unRegisterEvent(postSummarryList);
      }
    };
  }, [props.cardData.collectionId]);

  useEffect(() => {
    if (postsummarydata?.invisibleKeys) {
      setInvisibleKeys(postsummarydata?.invisibleKeys);
    }
  }, []);

  const handlecardClick = (cardData) => {
    if (toggled) {
      dispatch(setBranchingCardData(cardData));
      childEventTrigger(null, null, 'AddPosts', {
        patientId: '',
        clientData: '',
        cardData: props.cardData,
      });
    }
  };
  const handlePostAction = async (data, postId) => {
    if (!data.selected || !postId) return;

    if (data.type === 'checkbox') {
      const collectionPayload = {
        invisibleKeys: data.selected,
        collectionId: postsummarydata?.collectionId,
        collectionType: postsummarydata?.collectionType,
        postId: postId,
      };
      await invisibleUpdateAPI(props, collectionPayload);
    }
  };

  const handleSubPostAction = (data, subCollectionId) => {
    if (!data.selected || !subCollectionId) return;
    if (data.type === 'checkbox') {
      const collectionPayload = {
        invisibleKeys: data.selected,
        collectionId: postsummarydata?.collectionId,
        collectionType: postsummarydata?.collectionType,
        subCollectionId: subCollectionId,
      };
      invisibleUpdateAPI(props, collectionPayload);
    }
  };

  const debounceFunForPostAction: Function = debounce(handlePostAction, 500);
  const debounceFunForSubPostAction: Function = debounce(handleSubPostAction, 500);

  const handleInvisibleKey = async (value: string) => {
    let preValue = [...invisibleKeys];

    const index = preValue.indexOf(value);

    if (index !== -1) preValue.splice(index, 1);
    else preValue = [...preValue, value];

    setInvisibleKeys(preValue);
    const collectionPayload = {
      invisibleKeys: preValue,
      collectionId: postsummarydata?.collectionId,
      collectionType: postsummarydata?.collectionType,
    };
    await invisibleUpdateAPI(props, collectionPayload);
  };

  const AddPosts = () => {
    dispatch(setBranchingCardData({}));
    childEventTrigger(null, null, 'AddPosts', {
      patientId: '',
      clientData: '',
      cardData: props.cardData,
    });
  };

  const handleToggele = () => {
    if (!toggled) {
      const posts1 = postsummarydata?.posts?.filter((data) => ['multiSelect', 'select'].includes(data.postType));
      const posts2 = (postsummarydata.subCollections || []).flatMap((subdata) =>
        (subdata.posts || [])
          .filter((pdata) => ['multiSelect', 'select'].includes(pdata.postType))
          .map((each) => ({ ...each, subCollectionId: subdata.subCollectionId }))
      );

      let filterSubCollection = [];
      let POST_ID = [];
      posts2.forEach((data) => {
        if (!POST_ID.includes(data.postId)) {
          POST_ID.push(data.postId);
          filterSubCollection.push(data);
        }
      });
      const results = filterSubCollection.filter(({ postId: id1 }) => !posts1.some(({ postId: id2 }) => id2 === id1));
      setBranchingData({
        posts: [...posts1, ...results],
      });
      dispatch(setBranchingCardData({}));
    } else {
      dispatch(setBranchingCardData({}));
      dispatch(setprePreviewDisabledButton(false));
    }
    setToggled(!toggled);
  };
  const { collectionName, tenant, title, description, welcomeMessage, thankYouMessage, distributionChannel, privacy } =
    postsummarydata?.topics || {};
  switch (actionType) {
    case 'POSTS': {
      return (
        <div className={classes.headerWrap}>
          <div className={classes.wrapper}>
            {isLoading && (
              <>
                <MUISkeleton
                  animation="wave"
                  variant="rectangular"
                  height="150px"
                  width="100%"
                  style={{ margin: '0px 0px 8px 0px' }}
                />
                <MUISkeleton
                  animation="wave"
                  variant="rectangular"
                  height="150px"
                  width="100%"
                  style={{ margin: '0px 0px 8px 0px' }}
                />
                <MUISkeleton
                  animation="wave"
                  variant="rectangular"
                  height="150px"
                  width="100%"
                  style={{ margin: '0px 0px 8px 0px' }}
                />
                <MUISkeleton
                  animation="wave"
                  variant="rectangular"
                  height="150px"
                  width="100%"
                  style={{ margin: '0px 0px 8px 0px' }}
                />
                <MUISkeleton
                  animation="wave"
                  variant="rectangular"
                  height={'100%'}
                  width="100%"
                  style={{ margin: '0px 0px 8px 0px' }}
                />
              </>
            )}
            {!isLoading && (
              <>
                <div className={`${classes.flex} ${classes.mb24}`}>
                  <span className={`${commanClass.body17Medium} ${classes.mainTitle} ${classes.wordWrap}`}>
                    {collectionName?.snippet}
                  </span>
                  <span
                    className={`${commanClass.body15Medium} ${classes.previewBtn}`}
                    onClick={() => setActionType('POST_PREVIEW')}
                  >
                    Preview
                  </span>
                </div>
                {title?.snippet && (
                  <div className={classes.rowWrap}>
                    <div className={classes.flex}>
                      <span className={`${commanClass.body15Medium} ${classes.heading}`}>Title</span>
                      <span className={`${classes.viewBtn}`} onClick={() => handleInvisibleKey(visibleKeys.TITLE)}>
                        {invisibleKeys.includes(visibleKeys.TITLE) ? <HideView /> : <ViewIcon />}
                      </span>
                    </div>
                    <span className={`${commanClass.body15Regular} ${classes.description}`}>{title?.snippet}</span>
                  </div>
                )}
                {tenant?.snippet && (
                  <div className={classes.rowWrap}>
                    <div className={classes.flex}>
                      <span className={`${commanClass.body15Medium} ${classes.heading}`}>Tenant</span>
                      {/* <span className={`${classes.viewBtn}`} onClick={() => handleInvisibleKey(visibleKeys.TENANT)}>
                    {invisibleKeys.includes(visibleKeys.TENANT) ? HideView : ViewIcon}
                  </span> */}
                    </div>
                    <span className={`${commanClass.body15Regular} ${classes.description}`}>{tenant?.snippet}</span>
                  </div>
                )}

                {description?.snippet && (
                  <div className={classes.rowWrap}>
                    <div className={classes.flex}>
                      <span className={`${commanClass.body15Medium} ${classes.heading}`}>Description</span>
                      <span className={`${classes.viewBtn}`} onClick={() => handleInvisibleKey(visibleKeys.DESCRIPTON)}>
                        {invisibleKeys.includes(visibleKeys.DESCRIPTON) ? <HideView /> : <ViewIcon />}
                      </span>
                    </div>
                    <span className={`${commanClass.body15Regular} ${classes.description}`}>{description?.snippet}</span>
                  </div>
                )}

                {welcomeMessage?.snippet && (
                  <div className={classes.rowWrap}>
                    <div className={classes.flex}>
                      <span className={`${commanClass.body15Medium} ${classes.heading}`}>Welcome Message</span>
                      <span className={`${classes.viewBtn}`} onClick={() => handleInvisibleKey(visibleKeys.WELCOME)}>
                        {invisibleKeys.includes(visibleKeys.WELCOME) ? <HideView /> : <ViewIcon />}
                      </span>
                    </div>
                    <span className={`${commanClass.body15Regular} ${classes.description}`}>{welcomeMessage?.snippet}</span>
                  </div>
                )}

                {thankYouMessage?.snippet && (
                  <div className={classes.rowWrap}>
                    <div className={classes.flex}>
                      <span className={`${commanClass.body15Medium} ${classes.heading}`}>Thank You Message</span>
                      <span className={`${classes.viewBtn}`} onClick={() => handleInvisibleKey(visibleKeys.THANKYOU)}>
                        {invisibleKeys.includes(visibleKeys.THANKYOU) ? <HideView /> : <ViewIcon />}
                      </span>
                    </div>
                    <span className={`${commanClass.body15Regular} ${classes.description}`}>{thankYouMessage?.snippet}</span>
                  </div>
                )}

                {distributionChannel?.snippet && (
                  <div className={classes.rowWrap}>
                    <div className={`${commanClass.body15Medium} ${classes.heading}`}>Distribution channels</div>

                    {distributionChannel?.snippet?.join(', ')}
                  </div>
                )}

                {privacy?.snippet && (
                  <div className={classes.rowWrap}>
                    <div className={`${commanClass.body15Medium} ${classes.heading}`}>Privacy</div>
                    <span className={`${commanClass.body15Regular} ${classes.description}`}>{privacy?.snippet}</span>
                  </div>
                )}

                <div className={classes.dFlex}>
                  {(postsummarydata?.posts?.length > 0 || postsummarydata?.subCollections?.length > 0) && (
                    <>
                      <span className={`${commanClass.body15Medium} ${classes.subTitle}`}>Posts & Sub collection</span>
                      <span className={classes.toggleBranching}>
                        <div
                          onClick={() => {
                            handleToggele();
                          }}
                          className={toggled ? `${classes.btnBlack}` : `${classes.btnGrey}`}
                        >
                          <BranchingEnabled />
                        </div>
                      </span>
                    </>
                  )}
                </div>

                <div className={classes.namecard}>
                  {toggled &&
                    branchingdata?.posts?.map((data) => {
                      return (
                        <PostCard
                          key={data.postId}
                          name={data?.heading}
                          postType={data?.postType}
                          mainDescription={data?.description}
                          handleThreeDotAction={(idata) => {
                            handlePostAction(idata, data.postId);
                          }}
                          threeDotOptions={POST_OPTIONS}
                          invisibleKeys={data.invisibleKeys}
                          handlecardClick={() => {
                            handlecardClick(JSON.parse(JSON.stringify(data)));
                          }}
                          noThreeDot={toggled}
                          postId={data.postId}
                          maindata={data}
                          // profilePic={<PostCollectionsIcon />}
                        />
                      );
                    })}
                  {!toggled &&
                    postsummarydata?.posts?.map((data) => {
                      return (
                        <PostCard
                          key={data.postId}
                          name={data?.heading}
                          postType={data?.postType}
                          mainDescription={data?.description}
                          handleThreeDotAction={(idata) => {
                            debounceFunForPostAction(idata, data.postId);
                          }}
                          threeDotOptions={POST_OPTIONS}
                          invisibleKeys={data.invisibleKeys}
                          handlecardClick={() => {}}
                          postId={data.postId}
                          noThreeDot={toggled}
                          maindata={data}
                        />
                      );
                    })}
                  {!toggled &&
                    postsummarydata?.subCollections?.map((data) => {
                      if (postsummarydata.collectionId !== data.parentCollectionId) return null;
                  return (
                    <PostCard
                      key={data?.parentCollectionId}
                      name={data?.collectionName}
                      postType="post_collection"
                      totalPost={data?.numberOfPosts}
                      mainDescription={data?.description}
                      handleThreeDotAction={(idata) => {
                        debounceFunForSubPostAction(idata, data.subCollectionId);
                      }}
                      threeDotOptions={SUB_COLLECTION_POST_OPTIONS}
                      invisibleKeys={data.invisibleKeys}
                      handlecardClick={() => {}}
                      postId={data.collectionName}
                      maindata={data}
                    />
                  );
                    })}
                </div>
              </>
            )}
          </div>
          {!isLoading && (
            <div className={toggled ? `${classes.hide}` : `${classes.footerDiv}`}>
              <span className={classes.addButtonWrapper}>
                <button
                  onClick={() => {
                    AddPosts();
                  }}
                  className={disabledprePreviewbutton ? classes.disableaddButton : classes.addButton}
                  disabled={disabledprePreviewbutton}
                >
                  <PlusIcon />
                </button>
              </span>
            </div>
          )}
        </div>
      );
    }
    case 'POST_PREVIEW':
      return (
        <PostPreview
          setActionType={setActionType}
          sessions={sessions}
          childEventTrigger={childEventTrigger}
          registerEvent={registerEvent}
          unRegisterEvent={unRegisterEvent}
          panel={panel}
          collectionId={postsummarydata?.collectionId}
        />
      );
  }
};

export default PrePreview;
