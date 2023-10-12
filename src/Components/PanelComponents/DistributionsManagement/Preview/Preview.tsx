import { Fab } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { NoDataIcon, PlusIcon, PostCollectionsIcon, QuestionIcon } from '../../../SVGs/Common';
import ThreeDotActionMenu from '../../PostCollections/ThreeDotActionMenu/ThreeDotActionMenu';
import {
  ImageIcon,
  MultiSelectPost,
  MusicIcon,
  PostsIcon,
  SelectPost,
  TextFieldPost,
  VideoIcon,
} from '../DistributionManagement.svg';
import { SNIPPETS } from '../DistributionSummary/DistributionSummary.function';
import {
  getEsDataforUsers,
  getHeaderKeyByCollectionType,
  getSummaryDataByPostType,
  invisibleKeyUpdateAPI,
} from '../DistributionsMgt.functions';
import FinalPreview from '../FinalPreview/FinalPreview';
import { DEFAULT_SNIPPETS, SNIPPETS_ID, getSnippetValue } from '../Summary/Summary.function';
import {
  setDisabledaddtBtnInPreview,
  setPreviewDataInRedux,
} from './../../../../DisplayFramework/State/Slices/AllPostsDataSlice';
import { IRootState } from './../../../../DisplayFramework/State/store';
import Button from './../../../LibraryComponents/MUIButton/MUIButton';
import NameCard from './../../../LibraryComponents/NameCard1/NameCard1';
import ThreeDotModal from './../../../LibraryComponents/ThreeDotModal/ThreeDotModal';
import { PostSnippet } from './../PostSnippet/PostSnippet';
import { POST_OPTIONS, SUB_COLLECTION_OPTIONS } from './Preview.function';
import { useStyles } from './Preview.styles';
import { ActionType, PreviewProps } from './Preview.types';

const Preview = (props: PreviewProps) => {
  const { selectedClient, childEventTrigger, sessions, registerEvent, unRegisterEvent } = props;

  const { classes } = useStyles();
  const dispatch = useDispatch();
  const { id: panelId } = useCurrentPanel();
  const commonClasses = useCommonStyles();
  const { uniqueType, tenantId, uniqueId, disabledaddtBtnInPreview }: any = useSelector((state: IRootState) => state.AllPostData);

  const [action, setAction] = useState<ActionType>({ screen: 'PREVIEW', payload: {} });
  const [previewData, setPreviewData] = useState<any>({});
  const [invisibleKeys, setInvisibleKeys] = useState([]);

  const { headerKey } = useMemo(() => getHeaderKeyByCollectionType(uniqueType), [uniqueType]);

  let distributionChannel: any;

  useEffect(() => {
    (async () => {
      if (uniqueType && tenantId && uniqueId) {
        const cardData = { collectionType: uniqueType, tenantId, collectionId: uniqueId };
        callPreviewAPI(cardData);
      }
    })();
    distributionChannel = registerEvent(`${selectedClient.client_id}`, 'myCollection.json', async (updatePreview: any) => {
      updatePreviewObj(updatePreview);
    });
    setAction({ screen: 'PREVIEW', payload: {} });
    return () => {
      if (distributionChannel) {
        unRegisterEvent(distributionChannel);
      }
    };
  }, [selectedClient.client_id]);

  const callPreviewAPI = async (cardData: any) => {
    let response: any = await getSummaryDataByPostType(props, cardData);
    if (response) {
      let topicValues: any = [];
      Object.keys(response.topics || {}).forEach((key, value) => topicValues.push(key));

      let topicNewOrder = {};
      (SNIPPETS as any)[uniqueType].forEach((each: any) => {
        let tempNewOrder;
        if (topicValues.indexOf(each.id) > -1) {
          tempNewOrder = { [each.id]: response.topics[each.id] };
          topicNewOrder = { ...topicNewOrder, ...tempNewOrder };
        }
      });
      response = { ...response, topics: { ...topicNewOrder } };

      setInvisibleKeys(response.invisibleKeys || []);
      if (response.topics[SNIPPETS_ID.CONSUMERS]) {
        const nameData = await getEsDataforUsers(panelId, response.topics[SNIPPETS_ID.CONSUMERS]?.snippet);
        response.topics[SNIPPETS_ID.CONSUMERS].snippet = nameData.sort();
      }
      if (response.topics[SNIPPETS_ID.VIEW_ACCESS]) {
        const nameData = await getEsDataforUsers(panelId, response.topics[SNIPPETS_ID.VIEW_ACCESS]?.snippet);
        response.topics[SNIPPETS_ID.VIEW_ACCESS].snippet = nameData.sort();
      }
      setPreviewData(response);
      dispatch(setPreviewDataInRedux(response));
    }
  };
  const updatePreviewObj = async (response: any) => {
    if (response) {
      let topicValues: any = [];
      Object.keys(response.topics || {}).forEach((key, value) => topicValues.push(key));

      let topicNewOrder = {};
      (SNIPPETS as any)[uniqueType].map((each: any) => {
        let tempNewOrder;
        if (topicValues.indexOf(each.id) > -1) {
          tempNewOrder = { [each.id]: response.topics[each.id] };
          topicNewOrder = { ...topicNewOrder, ...tempNewOrder };
        }
      });
      response = { ...response, topics: { ...topicNewOrder } };

      setInvisibleKeys(response.invisibleKeys || []);
      if (response.topics[SNIPPETS_ID.CONSUMERS]) {
        const nameData = await getEsDataforUsers(panelId, response.topics[SNIPPETS_ID.CONSUMERS]?.snippet);
        response.topics[SNIPPETS_ID.CONSUMERS].snippet = nameData.sort();
      }
      if (response.topics[SNIPPETS_ID.VIEW_ACCESS]) {
        const nameData = await getEsDataforUsers(panelId, response.topics[SNIPPETS_ID.VIEW_ACCESS]?.snippet);
        response.topics[SNIPPETS_ID.VIEW_ACCESS].snippet = nameData.sort();
      }
      setPreviewData(response);
      dispatch(setPreviewDataInRedux(response));
    }
  };

  const handlePreview = () => {
    setAction({ screen: 'FINAL_PREVIEW' });
  };

  const addCollection = () => {
    dispatch(setDisabledaddtBtnInPreview(true));
    childEventTrigger(null, null, 'onAddDistributonCollection', {});
  };

  const handlePostAction = async (data: any, postId: any) => {
    if (!data.selected || !postId) return;
    if (data.type === 'checkbox') {
      const collectionPayload = {
        invisibleKeys: data.selected,
        collectionId: uniqueId,
        collectionType: uniqueType,
        postId,
      };
      await invisibleKeyUpdateAPI(sessions, collectionPayload);
    }
  };

  const handleSubCollectionAction = async (data: any, subCollectionId: any) => {
    if (!data.selected || !subCollectionId) return;
    if (data.type === 'checkbox') {
      const collectionPayload = {
        invisibleKeys: data.selected,
        collectionId: uniqueId,
        collectionType: uniqueType,
        subCollectionId,
      };
      await invisibleKeyUpdateAPI(sessions, collectionPayload);
    }
  };

  const Icon_attachmentObj = {
    video: <VideoIcon />,
    image: <ImageIcon />,
    audio: <MusicIcon />,
    file: <PostsIcon />,
    default: <PostsIcon />,
    textField: <TextFieldPost />,
    select: <SelectPost />,
    multiSelect: <MultiSelectPost />,
  };

  switch (action.screen) {
    case 'PREVIEW':
      return (
        <div className={classes.mainContainer}>
          <div className={classes.scrolldiv}>
            <div className={classes.previewHeader}>
              <div className={`${commonClasses.body17Medium} ${classes.headerText}`}>
                {previewData?.topics?.[headerKey]?.snippet || ''}
              </div>
              <Button className={classes.previewButton} variant="contained" onClick={handlePreview}>
                Preview
              </Button>
            </div>
            <div className={classes.previewScrollBody}>
              {Object.entries(previewData?.topics || {}).map(([key, value]: any) => {
                if (headerKey === key) return null;

                return (
                  <>
                    <PostSnippet
                      key={key}
                      title={DEFAULT_SNIPPETS[key]?.heading}
                      content={getSnippetValue(value?.snippet) || ''}
                      isHideView={(invisibleKeys as any).includes(key)}
                    />
                  </>
                );
              })}
              <section>
                {previewData?.posts?.map((data: any, index: any) => (
                  <div key={index} style={{ transition: 'all 0.4s ease-in-out 0s', margin: '0 -1rem' }}>
                    <NameCard
                      id={data.postId}
                      profilePic={(Icon_attachmentObj as any)[data.postType]}
                      title={data.heading}
                      content={data.description}
                      iconTray={[]}
                      iconTrayStyle={classes.cardIconsStyle}
                      isMiniCard
                      endActionButton={
                        <ThreeDotModal isGrow usePopOver>
                          <div className={classes.actionModalStyle}>
                            <ThreeDotActionMenu
                              checkedKeys={data.invisibleKeys || []}
                              options={POST_OPTIONS}
                              handleOnClick={(idata: any) => handlePostAction(idata, data.postId)}
                            />
                          </div>
                        </ThreeDotModal>
                      }
                    />
                  </div>
                ))}

                {previewData?.subCollections?.map((data: any, index: any) => {
                  const postIcon = data.numberOfPosts ? [<QuestionIcon key={data.postId} />] : [];
                  const collectionIcon = data.hasSubcollections ? [<PostCollectionsIcon key={data.postId} />] : [];
                  return (
                    <>
                      {previewData.collectionId == data.parentCollectionId ? (
                        <div key={data.postId} style={{ transition: 'all 0.4s ease-in-out 0s', margin: '0 -1rem' }}>
                          <NameCard
                            id={data.postId}
                            profilePic={<PostCollectionsIcon />}
                            title={data.collectionName || data.title}
                            content={data.numberOfPosts ? `${data.numberOfPosts} Posts` : ''}
                            iconTray={[...postIcon, ...collectionIcon]}
                            isMiniCard
                            endActionButton={
                              <ThreeDotModal isGrow usePopOver>
                                <div className={classes.actionModalStyle}>
                                  <ThreeDotActionMenu
                                    checkedKeys={data.invisibleKeys || []}
                                    options={SUB_COLLECTION_OPTIONS}
                                    handleOnClick={(idata: any) => handleSubCollectionAction(idata, data.subCollectionId)}
                                  />
                                </div>
                              </ThreeDotModal>
                            }
                          />
                        </div>
                      ) : null}
                    </>
                  );
                })}
              </section>
              {!previewData?.posts?.length && !previewData?.subCollections?.length ? (
                <>
                  <div className={`${commonClasses.body17Medium} ${classes.headerText}`}>Posts & Sub collection</div>
                  <div className={classes.noDataBox}>
                    <div>{<NoDataIcon />}</div>
                    <div className={`${commonClasses.body20Medium} ${classes.headerTextGray}`}>
                      No Post & Sub collection added
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <Fab
            onClick={addCollection}
            disabled={disabledaddtBtnInPreview}
            className={disabledaddtBtnInPreview ? classes.disabledButton : classes.addButton}
          >
            {<PlusIcon />}
          </Fab>
        </div>
      );
    case 'FINAL_PREVIEW':
      return (
        <div className={classes.scrolldiv}>
          <FinalPreview {...props} collectionId={previewData.collectionId} collectionType={uniqueType} setAction={setAction} />
        </div>
      );
  }
};

export default Preview;
