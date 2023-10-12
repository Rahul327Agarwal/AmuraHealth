import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerEvent, unRegisterEvent } from '../../../../../AppSync/AppSync.functions';
import ErrorToaster from '../../../../../Common/ErrorToaster';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { useCurrentPanel } from '../../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { setBranchingCardData } from '../../../../../DisplayFramework/State/Slices/BranchingSlice';
import { IRootState } from '../../../../../DisplayFramework/State/store';
import { PMS_LOCALE } from '../../../../../Utils';
import Button from '../../../../LibraryComponents/MUIButton/MUIButton';
import ModalBox from '../../../../LibraryComponents/ModalBox/ModalBox';
import SearchField from '../../../../LibraryComponents/SearchField/SearchField';
import { BackArrowIcon } from '../../../../SVGs/Common';
import { getpostCollectionSummaryData } from '../../Summary/PostCollectionsSummary.function';
import PostCard from '../PostCard/PostCard';
import {
  AddBranching,
  filterPostThatAreAllowedToBranch,
  formatPostData,
  getBranchingpostData,
  getBranchingpostDataWithSubSubCollectionId,
  getpostData,
} from './Branching.function';
import { useStyles } from './Branching.styles';
import { MyListProps } from './Branching.types';

const colors = {
  '#DA5552': '#FFE3E0',
  '#52B788': '#D8F3DC',
  '#00B4D8': '#E3FAFF',
  '#FFB743': '#FFF1DB',
  '#DA4EC3': '#FFEBFC',
};

export default function Branching(props: MyListProps) {
  const { cardData, sessions, panel, childEventTrigger } = props;
  const maindata = useSelector((state: IRootState) => state.Branching.BranchingCardData);

  const { id: panelId } = useCurrentPanel();
  const [availableColors, setAvailableColors] = useState({ ...colors });
  const [activeColor, setActiveColor] = useState('');
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const [responseclicked, setResponseclicked] = useState(false);
  const [questionposts, setQuestionposts] = useState<any[]>([]);
  const [optionsData, setOptionData] = useState([]);
  const [postData, setPostData] = useState<any>([]);
  const [colormapping, setColorMapping] = useState({});
  const [branchingpost, setBranchingpost] = useState([]);
  const [existingBranching, setExistingBranching] = useState([]);
  const [openpopup, setOpenpopup] = useState(false);
  const [indexclicked, setIndexclicked] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  const handleColorMapping = (index) => {
    if (index in colormapping && indexclicked.indexOf(index) === -1) {
      setClickedIndex(index);
      setOpenpopup(true);
      return;
    }
    if (index in colormapping && indexclicked.indexOf(index) > -1) {
      removebranching(index);
      setIndexclicked([...indexclicked.filter((value) => value !== index)]);
      return;
    }
    if (postData.length == 0) {
      ErrorToaster('There is no post to branch', panelId, 'error');
      return;
    }
    if (Object.keys(availableColors).length === 0) {
      ErrorToaster('Maximum 5 braching are only allowed', panelId, 'error');
      return;
    }
    if (Object.keys(availableColors).length > 0) {
      setColorMapping({
        ...colormapping,
        [index]: activeColor || Object.keys(availableColors)[0],
      });
      setActiveColor(Object.keys(availableColors)[0]);
    }
    setResponseclicked(true);
    let filterSubCollection = [];
    let POST_ID = [];
    questionposts.forEach((data) => {
      if (!POST_ID.includes(data.postId)) {
        POST_ID.push(data.postId);
        filterSubCollection.push(data);
      }
    });

    setPostData(filterSubCollection);
    setIndexclicked([...indexclicked, index]);
  };

  const handlesearch = (search) => {
    let filterSubCollection = [];
    let POST_ID = [];
    questionposts.forEach((data) => {
      if (!POST_ID.includes(data.postId)) {
        POST_ID.push(data.postId);
        filterSubCollection.push(data);
      }
    });

    setPostData(filterSubCollection);

    setPostData(filterSubCollection?.filter((post) => (post.heading?.toLowerCase() || '').includes(search?.toLowerCase() || '')));
  };
  const handleCardClick = (data) => {
    setBranchingpost([
      ...branchingpost,
      {
        ...data,
        color: activeColor,
        parentIndex: indexclicked,
      },
    ]);

    let copyAvailableColors = JSON.parse(JSON.stringify(availableColors));
    delete copyAvailableColors[activeColor];
    setAvailableColors(copyAvailableColors);
    setPostData(questionposts);
    setQuestionposts([...questionposts]);
    setResponseclicked(false);
    setIndexclicked([]);
    setActiveColor('');
  };
  const removebranching = (clickedIndex) => {
    let copyOfColorMapping = JSON.parse(JSON.stringify(colormapping));
    let deletedColor = copyOfColorMapping[clickedIndex];
    delete copyOfColorMapping[clickedIndex];
    setColorMapping(copyOfColorMapping);
    let hasAnotherBranchingWithDeleteColor = Object.keys(copyOfColorMapping).find(
      (index) => copyOfColorMapping[index] === deletedColor
    );
    if (!hasAnotherBranchingWithDeleteColor) {
      setAvailableColors({ ...availableColors, [deletedColor]: colors[deletedColor] });
      if (activeColor === deletedColor) {
        setActiveColor('');
        setResponseclicked(false);
      }
    }
    let modifiedpost = [];
    branchingpost.forEach((bpost) => {
      bpost.parentIndex = bpost?.parentIndex?.filter((index) => index != clickedIndex) || [];
      modifiedpost.push(bpost);
    });
    modifiedpost = modifiedpost.filter((value) => value.parentIndex.length > 0);
    setBranchingpost(modifiedpost);
    setOpenpopup(false);
  };

  const addBranching = async () => {
    const payload = {
      EventName: 'manage-branching',
      userId: sessions.user.id,
      tenantId: 'amura', //selectedClient.tenant_id,
      collectionId: cardData?.collectionId,
      collectionType: cardData?.collectionType,
      postId: maindata.postId,
      branching: branchingpost.map((bdata) => ({
        responses: bdata.parentIndex.map((index) => optionsData[index]),
        postId: bdata.postId,
      })),
    };
    let response: any = await AddBranching(props, payload, panelId);
    if (!response?.Error) {
      childEventTrigger(null, null, 'onBackOfConfigureBranching', {
        cardData: props.cardData,
        type: 'PCM',
        clientData: {
          client_id: props.cardData?.collectionId || '',
          client_name: '',
          LastName: '',
        },
      });
    }
  };

  const getBranchingData = async () => {
    const collectionData = await getpostCollectionSummaryData(props);
    if (collectionData) {
      let result = filterPostThatAreAllowedToBranch(collectionData, maindata);
      setPostData(result);
      setQuestionposts(result);
      let postData = await getBranchingpostData(sessions, collectionData, maindata.postId);
      if (Object.keys(postData).length == 0) {
        postData = await getBranchingpostDataWithSubSubCollectionId(
          sessions,
          collectionData,
          maindata.postId,
          maindata.subCollectionId
        );
      }
      if (Object.keys(postData).length !== 0) {
        let { responseAndColorMap, availableColors, tempbranchpost } = formatPostData(postData, colors);
        setOptionData(postData?.responses);
        setColorMapping({ ...responseAndColorMap });
        setAvailableColors({ ...availableColors });
        setBranchingpost(tempbranchpost);
        setExistingBranching(tempbranchpost);
        setLoading(false);
        return;
      }
      postData = await getpostData(sessions, maindata.postId);
      setOptionData(postData?.topics?.response?.snippet);
      setExistingBranching([]);
      setAvailableColors({ ...colors });
      setLoading(false);
      return;
    }
  };

  const handleClose = () => {
    dispatch(setBranchingCardData({}));
    childEventTrigger(null, null, 'onBackOfConfigureBranching', {
      cardData: props.cardData,
      type: 'PCM',
      clientData: {
        client_id: props.cardData?.collectionId || '',
        client_name: '',
        LastName: '',
      },
    });
  };
  useEffect(() => {
    setLoading(true);
    setBranchingpost([]);
    setClickedIndex(-1);
    setColorMapping({});
    setIndexclicked([]);
    setResponseclicked(false);
    if (maindata.postId) {
      getBranchingData();
    }
  }, [maindata]);

  let BranchingEvent;

  // to add a register event for the updated collection data for bug 1403
  useEffect(() => {
    BranchingEvent = registerEvent(`${cardData?.collectionId}/${maindata.postId}`, 'myPostBranching.json', (response) => {});
    return () => {
      if (BranchingEvent) {
        unRegisterEvent(BranchingEvent);
      }
    };
  }, [props.selectedClient.client_id]);

  const dispatch = useDispatch();

  return (
    <div className={classes.rootContainer}>
      <div className={classes.headerWrapper}>
        <BackArrowIcon className={classes.backArrowIcon} onClick={handleClose} />

        <div className={`${classes.titleWraper}`}>
          <div className={`${commonClasses.body17Medium}`}>Configure branching</div>
        </div>
      </div>

      <div
        className={`${classes.bodyOverflow} ${
          branchingpost.length > 0 || existingBranching.length > 0 ? classes.maxHeightIfBranchingButton : ''
        }`}
      >
        {!loading && (
          <div className={classes.card}>
            <PostCard name={maindata.heading} mainDescription={maindata.description} postType={maindata.postType} />
            <div className={classes.response}>
              {optionsData?.map((item, index) => (
                <div
                  key={item}
                  className={`${classes.labelContainer} ${commonClasses.body15Regular}`}
                  onClick={() => handleColorMapping(index)}
                >
                  <div className={classes.labelStyle}>
                    <span
                      className={maindata.postType === 'select' ? classes.radio : classes.checkBox}
                      style={{
                        border: `2px solid ${colormapping[index] ? colormapping[index] : '#5C5A61'}`,
                        background: `${colormapping[index] ? colors[colormapping[index]] : '#E1E1E1'}`,
                      }}
                    ></span>
                  </div>
                  <span className={`${classes.labelOption}`} title={item}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
            {branchingpost?.map((data) => {
              return (
                <PostCard
                  key={data?.postId}
                  name={data.heading}
                  mainDescription={data.description}
                  handleCardClick={() => {}}
                  borderColor={[data.color, colors[data.color]]}
                  postType={data.postType}
                />
              );
            })}
          </div>
        )}
        {responseclicked && (
          <>
            <div className={classes.search}>
              <SearchField customStyle={classes.bgColor} placeholder="Search posts" handleSearch={handlesearch} autoFocus />
            </div>
            <div className={classes.namecard}>
              {postData?.map((data) => {
                return (
                  <>
                    {data.postId !== maindata.postId ? (
                      <PostCard
                        name={data.heading}
                        mainDescription={data.description}
                        handleCardClick={() => handleCardClick(data)}
                        postType={data.postType}
                      />
                    ) : null}
                  </>
                );
              })}
            </div>
          </>
        )}
      </div>

      {(branchingpost.length > 0 || existingBranching.length > 0) && (
        <div className={classes.footer}>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              addBranching();
            }}
            children="Add Branching"
            fullWidth={true}
          />
        </div>
      )}
      <ModalBox
        panelWidth={panel?.width}
        open={openpopup}
        handleClose={() => {
          setOpenpopup(false);
        }}
        modalTitle={'Are you sure?'}
        buttonConfig={[
          {
            text: PMS_LOCALE.translate('No'),
            variant: 'text',
            onClick: () => {
              setOpenpopup(false);
            },
          },
          {
            text: PMS_LOCALE.translate('Yes'),
            variant: 'contained',
            onClick: () => {
              removebranching(clickedIndex);
            },
          },
        ]}
      >
        <div className={`${commonClasses.body15Regular} ${classes.modalWrapper}`}>Do you want to change or remove branching?</div>
      </ModalBox>
    </div>
  );
}
