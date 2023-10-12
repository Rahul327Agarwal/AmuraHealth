import format from 'date-fns/format';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { usePanelNavigation } from '../../../../DisplayFramework/DisplayFramework.hooks';
import { setStoreData, setUniqueId } from '../../../../DisplayFramework/State/Slices/AllPostsDataSlice';
import { setPostCollectionId, setPostCollectionMsgData } from '../../../../DisplayFramework/State/Slices/PostCollectionSlice';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { useScrollDetection } from '../../../../Utilities/Hooks';
import TopicCard from '../../SummaryPanel/TopicCard';
import { postQuestionType } from '../PostCollectionChatNote/PostCollectionChatNote.functions';
import { PLACEHOLDER_TEXT, getpostCollectionSummaryData } from './PostCollectionsSummary.function';
import { useStyles } from './PostCollectionsSummary.styles';
import { AuthorIcon, CalendarIcon, DescriptionIcon, HeadingIcon, TenantIcon, VideoIcon } from './PostCollectionsSummary.svg';
import { IProps } from './PostCollectionsSummary.types';
import { useFetchUserName } from '../../../../Common/Common.hooks';

const PostCollectiontSummary = (props: IProps) => {
  const { cardData, injectComponent, registerEvent, unRegisterEvent } = props;
  const storeData = useSelector((state: IRootState) => state.AllPostData.storeData);
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const [selected, setSelected] = useState('');
  const [postsummarydata, setPostSummaryData] = useState<any>();
  const [openConfirmReDO, setOpenConfirmReDO] = useState<any>(false);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedPost, setSelectedPost] = useState<any>({});

  const panelNavigation = usePanelNavigation();
  const { onScroll, isPanelScrolled } = useScrollDetection();

  const { fetchUserName } = useFetchUserName();

  const settingPostData = (headerText, type, msgMapper) => {
    setSelectedTopic(type);
    if (postsummarydata.topics[type]) {
      handleReDo(postsummarydata?.collectionId, postsummarydata?.topics[type], headerText, type);
      return;
    }
    let postData = {
      type: type,
      open: true,
      headerText: headerText,
      msgMapper: msgMapper,
      action: 'ADD',
      message: '',
      placeHolderText: PLACEHOLDER_TEXT[type],
    };

    dispatch(setStoreData(postData));
    dispatch(setUniqueId(postsummarydata?.collectionId || ''));
    dispatch(setPostCollectionMsgData(postData));
  };
  let postSummarryList: any;
  useEffect(() => {
    (async () => {
      const summaryResponse = await getpostCollectionSummaryData(props, fetchUserName);
      if (summaryResponse) {
        setPostSummaryData(summaryResponse);
      }
    })();
    postSummarryList = registerEvent(`${props.selectedClient.client_id}`, 'myCollection.json', (updateSummary) => {
      if (updateSummary) {
        (async () => {
          let userName = await fetchUserName(updateSummary?.header?.name);
          let newObj = {
            ...updateSummary,
            header: { ...updateSummary.header, nameFromEs: userName || updateSummary?.header?.name },
          };
          setPostSummaryData(newObj);
        })();
      }
    });
    return () => {
      if (postSummarryList) {
        unRegisterEvent(postSummarryList);
      }
    };
  }, [props.cardData.collectionId]);

  useEffect(() => {
    if (!storeData.type) setSelected('');
    else setSelected(storeData.type);
  }, [storeData]);

  useEffect(() => {
    setSelected('');
    let postData = {
      type: '',
      // open: true,
      headerText: '',
      msgMapper: '',
      action: 'ADD',
      message: '',
    };
    dispatch(setStoreData(postData));
  }, [postsummarydata?.collectionId]);

  const { collectionName, title, tenant, description, welcomeMessage, thankYouMessage, distributionChannel, privacy } =
    postsummarydata?.topics || {};

  const handleNo = () => {
    handleCloseDrawer();
  };

  const handleCloseDrawer = () => {
    setOpenConfirmReDO(false);
    dispatch(setPostCollectionMsgData({}));
    dispatch(setPostCollectionId(''));
  };
  const handleYes = () => {
    setOpenConfirmReDO(false);
    dispatch(setPostCollectionMsgData(selectedPost));
  };

  const handleReDo = (postId, currentMessage, headerText, type) => {
    const msgMapper = postQuestionType(type);
    let postDataRedo = {
      postCollectionId: postId,
      type: type,
      headerText: headerText,
      msgMapper: msgMapper,
      message: currentMessage?.snippet.toString() || '',
      action: 'OPENCONFIRM',
      placeHolderText: PLACEHOLDER_TEXT[type],
    };
    dispatch(setPostCollectionId(postId));
    dispatch(setPostCollectionMsgData(postDataRedo));
    setSelectedPost(postDataRedo);
    // setOpenConfirmReDO(true);
  };

  return (
    <div className={classes.summarybody}>
      <div className={`${classes.headerWrap} ${isPanelScrolled && classes.shadow}`}>
        <i className={classes.inject}>{injectComponent}</i>
        <div className={classes.flexrow}>
          <div>
            <div className={classes.flexrow2}>
              <span className={classes.span}>
                <AuthorIcon />
              </span>
              <span className={`${classes.p1} ${commonClasses.sm10Regular}`}>AUTHOR</span>
            </div>
            <p className={`${classes.p2} ${commonClasses.body15Regular}`} title={postsummarydata?.header?.nameFromEs || ' '}>
              {postsummarydata?.header?.nameFromEs || ' '}
            </p>
          </div>
          <div>
            <div className={classes.flexrow2}>
              <span className={classes.span}>
                <CalendarIcon />
              </span>
              <span className={`${classes.p1} ${commonClasses.sm10Regular}`}>Last Updated date</span>
            </div>
            <p className={`${classes.p2} ${commonClasses.body15Regular}`}>
              {format(new Date(postsummarydata?.header?.lastUpdatedDate || new Date()), 'dd/MM/yyyy')}
            </p>
          </div>
        </div>
      </div>
      <div className={classes.hr} />
      <div className={classes.topicsContainer} onScroll={(e) => onScroll(e?.currentTarget?.scrollTop)}>
        <TopicCard
          icon={<HeadingIcon />}
          heading={'Title'}
          description={collectionName?.snippet || '+ Add a Title'}
          handleClick={() => {
            setSelected('collectionName');
            settingPostData('Enter title of the post collection', 'collectionName', 'QUESTION_ANSWER');
            panelNavigation.navigateToPanel('C');
          }}
          selected={selected == 'collectionName'}
        />

        <TopicCard
          icon={<TenantIcon />}
          heading={'Tenant'}
          description={tenant?.snippet || '+ Add a Tenant'}
          handleClick={() => {}}
          // selected={selected=="collectionName"}
        />

        <TopicCard
          icon={<DescriptionIcon />}
          heading={'Description'}
          description={description?.snippet || '+ Add a description'}
          handleClick={() => {
            setSelected('description');
            settingPostData('Enter description', 'description', 'QUESTION_ANSWER');
            panelNavigation.navigateToPanel('C');
          }}
          selected={selected == 'description'}
        />
        <TopicCard
          icon={<DescriptionIcon />}
          heading={' Welcome message'}
          description={welcomeMessage?.snippet || '+ Add a Welcome message'}
          handleClick={() => {
            setSelected('welcomeMessage');
            settingPostData('Enter welcome message', 'welcomeMessage', 'QUESTION_ANSWER');
            panelNavigation.navigateToPanel('C');
          }}
          selected={selected == 'welcomeMessage'}
        />
        <TopicCard
          icon={<DescriptionIcon />}
          heading={'Thank you message'}
          description={thankYouMessage?.snippet || '+ Add a Thank you message'}
          handleClick={() => {
            setSelected('thankYouMessage');
            settingPostData('Enter thank you message', 'thankYouMessage', 'QUESTION_ANSWER');
            panelNavigation.navigateToPanel('C');
          }}
          selected={selected == 'thankYouMessage'}
        />
        <TopicCard
          icon={<VideoIcon />}
          heading={'Distribution channel'}
          description={distributionChannel?.snippet?.join(', ') || '+ Add distribution channel'}
          handleClick={() => {
            setSelected('distributionChannel');
            settingPostData('Select distribution channels', 'distributionChannel', 'QUESTION_ANSWER');
            panelNavigation.navigateToPanel('C');
          }}
          selected={selected == 'distributionChannel'}
        />
        <TopicCard
          icon={<VideoIcon />}
          heading={'Privacy '}
          description={privacy?.snippet || '+ Add privacy'}
          handleClick={() => {
            setSelected('privacy');
            settingPostData('Select privacy', 'privacy', 'QUESTION_ANSWER');
            panelNavigation.navigateToPanel('C');
          }}
          selected={selected == 'privacy'}
        />
      </div>
    </div>
  );
};

export default PostCollectiontSummary;
