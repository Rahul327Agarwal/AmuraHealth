import format from 'date-fns/format';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { usePanelNavigation } from '../../../../DisplayFramework/DisplayFramework.hooks';
import { setPostId, setPostMsgData, setResponseType } from '../../../../DisplayFramework/State/Slices/PostSlice';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { useScrollDetection } from '../../../../Utilities/Hooks';
import TopicCard from '../../SummaryPanel/TopicCard';
import { convertIdStringToLabelString, postQuestionType } from '../PostChatNote/PostChatNote.functions';
import {
  AttachmentIcon,
  Author,
  Calendar,
  DescriptionIcon,
  HeadingIcon,
  ImageIcon,
  NoResponseIcon,
  ResponseNewIcon,
  TenantIcon,
  VideoIcon,
} from '../PostManagement.svg';
import { PLACEHOLDER_TEXT, getpostSummaryData, showingResponseMsgs } from './PostManagementSummary.function';
import { useStyles } from './PostManagementSummary.styles';
import { IProps } from './PostManagementSummary.types';
import { useFetchUserName } from '../../../../Common/Common.hooks';

const PostManagementSummary = (props: IProps) => {
  const { injectComponent, registerEvent, unRegisterEvent } = props;
  const postMsgData: any = useSelector((state: IRootState) => state.post.postMsgData);
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const [postsummarydata, setPostSummaryData] = useState<any>();
  const [selectedPost, setSelectedPost] = useState<any>({});
  const [selectedTopic, setSelectedTopic] = useState('');
  const { onScroll, isPanelScrolled } = useScrollDetection();
  const panelNavigation = usePanelNavigation();
  const { fetchUserName } = useFetchUserName();
  const { heading, tenant, description, thumbnail, attachment, response, distributionChannel } = postsummarydata?.topics || {};
  let postSummarryList: any;
  useEffect(() => {
    (async () => {
      const summaryResponse = await getpostSummaryData(props, fetchUserName);
      if (summaryResponse) setPostSummaryData(summaryResponse);
    })();
    setSelectedTopic('');
    postSummarryList = registerEvent(`${props.selectedClient.client_id}`, 'myPost.json', (updateSummary) => {
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
  }, [props?.selectedClient?.client_id]);

  useEffect(() => {
    if (!postMsgData.type) setSelectedTopic('');
    else setSelectedTopic(postMsgData.type);
  }, [postMsgData]);

  const handleReDo = (postId, currentMessage, headerText, type) => {
    const msgMapper = postQuestionType(type);
    let postDataRedo = {
      postId: postId,
      type: type,
      headerText: headerText,
      msgMapper: msgMapper,
      message: currentMessage?.snippet.toString() || '',
      action: 'OPENCONFIRM',
      placeHolderText: PLACEHOLDER_TEXT[type],
    };

    dispatch(setPostId(postId));
    dispatch(setPostMsgData(postDataRedo));
    setSelectedPost(postDataRedo);
    dispatch(setResponseType(''));
    // setOpenConfirmReDO(true);
  };

  const settingPostData = (headerText, type) => {
    setSelectedTopic(type);
    if (postsummarydata.topics[type]) {
      handleReDo(postsummarydata?.postId, postsummarydata?.topics[type], headerText, type);
      return;
    }

    const msgMapper = postQuestionType(type);
    const postDataTemp = {
      type: type,
      headerText: headerText,
      msgMapper: msgMapper,
      action: 'ADD',
      message: '',
      placeHolderText: PLACEHOLDER_TEXT[type],
    };
    dispatch(setPostMsgData(postDataTemp));
    dispatch(setPostId(postsummarydata?.postId));
    dispatch(setResponseType(''));
  };

  return (
    <div className={classes.summarybody}>
      <div className={`${classes.headerWrap} ${isPanelScrolled && classes.shadow}`}>
        <i className={classes.inject}>{injectComponent}</i>
        <div className={classes.flexrow}>
          <div>
            <div className={classes.flexrow2}>
              <span className={classes.span}>{<Author />}</span>
              <span className={`${classes.p1} ${commonClasses.sm10Regular}`}>AUTHOR</span>
            </div>
            <p className={`${classes.p2} ${commonClasses.body15Regular}`} title={postsummarydata?.header?.nameFromEs}>
              {postsummarydata?.header?.nameFromEs || ' '}
            </p>
          </div>
          <div>
            <div className={classes.flexrow2}>
              <span className={classes.span}>{<Calendar />}</span>
              <span className={`${classes.p1} ${commonClasses.sm10Regular}`}>Last Updated date</span>
            </div>
            <p className={`${classes.p2} ${commonClasses.body15Regular}`}>
              {format(new Date(postsummarydata?.header?.lastUpdatedDate || new Date()), 'dd/MM/yyyy')}
            </p>
          </div>
        </div>
      </div>
      <div className={classes.hr} />
      <div className={classes.featureWrap} onScroll={(e) => onScroll(e?.currentTarget?.scrollTop)}>
        <TopicCard
          icon={<HeadingIcon />}
          heading={'Heading'}
          description={heading?.snippet || '+ Add a heading'}
          handleClick={() => {
            settingPostData('Enter heading of the post', 'heading');
            panelNavigation.navigateToPanel('C');
          }}
          selected={selectedTopic === 'heading'}
        />
        <TopicCard
          icon={<TenantIcon />}
          heading={'Tenant'}
          description={tenant?.snippet || '+ Add a tenant'}
          handleClick={() => {}}
          selected={selectedTopic === 'tenant'}
        />
        <TopicCard
          icon={<DescriptionIcon />}
          heading={'Description'}
          description={description?.snippet || '+ Add a description'}
          handleClick={() => {
            settingPostData('Enter description', 'description');
            panelNavigation.navigateToPanel('C');
          }}
          selected={selectedTopic === 'description'}
        />

        <TopicCard
          icon={<ImageIcon />}
          heading={'Thumbnail image'}
          description={thumbnail?.snippet || '+ Add Thumbnail image'}
          handleClick={() => {
            settingPostData('Upload thumbnail image', 'thumbnail');
            panelNavigation.navigateToPanel('C');
          }}
          selected={selectedTopic === 'thumbnail'}
        />
        <TopicCard
          icon={<AttachmentIcon />}
          heading={'Attachments'}
          description={attachment?.snippet || '+ Add attachment'}
          handleClick={() => {
            settingPostData('Select Attachment', 'attachment');
            panelNavigation.navigateToPanel('C');
          }}
          selected={selectedTopic === 'attachment'}
        />
        <TopicCard
          icon={response?.snippet ? <ResponseNewIcon /> : <NoResponseIcon />}
          heading={'Response'}
          description={response?.snippet ? showingResponseMsgs(response) : '+ Add response'}
          handleClick={() => {
            settingPostData('Type of response', 'response');
            panelNavigation.navigateToPanel('C');
          }}
          selected={selectedTopic === 'response'}
        />
        <TopicCard
          icon={<VideoIcon />}
          heading={'Distribution channel'}
          description={distributionChannel?.snippet?.map((d) => convertIdStringToLabelString(d)).join(', ') || '+ Add channel'}
          handleClick={() => {
            settingPostData('Select distribution channel', 'distributionChannel');
            panelNavigation.navigateToPanel('C');
          }}
          selected={selectedTopic === 'distributionChannel'}
        />
      </div>
    </div>
  );
};

export default PostManagementSummary;
