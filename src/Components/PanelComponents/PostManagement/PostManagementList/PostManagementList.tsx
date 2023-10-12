import { debounce, Fab, IconButton } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';
import { AutoSizer, List } from '../../../../Utilities/AutoResizerWrapper';
import {
  ArrowDown,
  BlackArrowIcon,
  FilterIcon,
  ImageIcon,
  ImageIcon1,
  MultiSelectPost,
  MusicIcon,
  PlusIcon,
  PostsIcon,
  SearchIcon,
  SelectPost,
  SizeIcon,
  TextFieldPost,
  TickIcon,
  VideoIcon,
  VideoIcon1,
} from '../PostManagement.svg';

import { usePanelsContainerSizeInfo } from '../../../../DisplayFramework/DisplayFramework.hooks';
import { setDisabledButton, setPostId, setPostList, setPostMsgData } from './../../../../DisplayFramework/State/Slices/PostSlice';
import { IRootState } from './../../../../DisplayFramework/State/store';
import NameCard from './../../../LibraryComponents/NameCard1/NameCard1';
import SearchField from './../../../LibraryComponents/SearchField/SearchField';
import { getpostListData } from './PostManagementList.function';
import { useStyles } from './PostManagementList.styles';
import { PostManagementListProps } from './PostManagementList.types';
import { atom, useAtom } from 'jotai';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

export const postManagementSelectedCardAtom = atom('');

export default function PostManagementList(props: PostManagementListProps) {
  const { childEventTrigger, panel, registerEvent, unRegisterEvent, selectedClient } = props;
  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const [searchString, setSearchString] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cardData, setCardData] = useState<any>([]);
  const [selectedPost, setSelectedPost] = useAtom(postManagementSelectedCardAtom);
  const [tempFilteredData, setTempFilteredData] = useState<any>([]);
  const [autoSelectCard, setAutoSelectCard] = useState(null as any);
  const [myListRefreshed, setMyListRefreshed] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const disabledbutton = useSelector((state: IRootState) => state.post.disabledbutton);
  const { numOfPanelsCanFit } = usePanelsContainerSizeInfo();

  const dispatch = useDispatch();
  const MIN_SEARCH_CHAR = 3;
  const searchedList = useMemo(() => {
    if (searchString?.length >= MIN_SEARCH_CHAR) {
      const value = searchString.toLowerCase();
      const postsDetails = cardData?.filter((item) => {
        if (item.heading) return item.heading.toLowerCase().includes(value);
        // else if (item.heading) return item.heading.toLowerCase().includes(value);
        return true;
      });
      return postsDetails;
    } else {
      return cardData;
    }
  }, [cardData, searchString]);

  let newPostListener: any;
  let postList: any;
  useEffect(() => {
    dispatch(setDisabledButton(false));
    (async () => {
      try {
        const posts = await getpostListData(panelId, props);
        if (posts) {
          setCardData(posts);
          setTempFilteredData(posts);
          dispatch(setPostList(posts));
        }
      } catch (error) {
        console.error('error', error.message);
      } finally {
        setIsLoading(false);
      }
    })();

    const patientId = props.sessions.user ? props.sessions.user.id : '';
    newPostListener = registerEvent(patientId, 'added-posts', (message) => {
      setAutoSelectCard(message);
    });
    postList = registerEvent('amura', 'pms-ql-posts', () => {
      getpostListData(panelId, props)
        .then((posts) => {
          if (!posts?.Error) {
            setCardData(posts);
            setTempFilteredData(posts);
            dispatch(setPostList(posts));
            setMyListRefreshed(new Date().getTime());
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
    return () => {
      if (newPostListener) {
        unRegisterEvent(newPostListener);
      }
      if (postList) {
        unRegisterEvent(postList);
      }
    };
  }, []);

  // Deselects the post collection card when client is null
  useEffect(() => {
    if (!Object.keys(selectedClient).length) {
      setSelectedPost('');
    }
  }, [selectedClient]);

  useEffect(() => {
    if (
      myListRefreshed &&
      autoSelectCard &&
      autoSelectCard?.action === 'ADD' &&
      autoSelectCard?.postPayload?.snippet?.type === 'heading'
    ) {
      let addedPost = cardData?.find((post) => post.postId === autoSelectCard?.postPayload?.postId);
      if (addedPost) {
        handldeOpenClient(addedPost);
        setAutoSelectCard(null);
      }
    }
  }, [myListRefreshed]);

  const addingNewPost = () => {
    setSelectedPost('');
    const postDataAdd = {
      type: 'heading',
      headerText: 'Enter heading of the post',
      msgMapper: 'QUESTION_ANSWER',
      action: 'ADD',
      placeHolderText: 'Type heading',
    };
    const postIdunique = uuidV4();
    dispatch(setPostMsgData(postDataAdd));
    dispatch(setPostId(postIdunique));
    numOfPanelsCanFit > 1 && dispatch(setDisabledButton(true));
    childEventTrigger(null, null, 'onaddPostmanagementCard', {
      cardData: '',
      type: 'post',
      clientData: {
        client_id: postIdunique || '',
        client_name: '',
        LastName: '',
      },
    });
  };

  const handldeOpenClient = (currentCardData) => {
    if (currentCardData.postId === selectedPost) return;
    setSelectedPost(currentCardData?.postId);
    dispatch(setPostMsgData({}));
    dispatch(setDisabledButton(false));
    dispatch(setPostId(currentCardData?.postId || ''));
    childEventTrigger(null, null, 'onPostmanagementCardClick', {
      cardData: currentCardData,
      type: 'post',
      clientData: {
        client_id: currentCardData?.postId || '',
        client_name: '',
        LastName: '',
      },
    });
  };

  const handleSearchBack = () => {
    // setCardData(tempFilteredData)
  };

  const onSearchBack = () => {
    setShowSearch(false);
    // handleSearchList('');
    setSearchString('');
    handleSearchBack && handleSearchBack();
    // setCardData(tempFilteredData);
  };

  const handleSearchList = (value) => {
    const postsDetails = cardData.filter((item) => {
      if (item.heading) return item.heading.toLowerCase().includes(value);
      // else if (item.heading) return item.heading.toLowerCase().includes(value);
      return true;
    });
    setCardData(postsDetails);
  };

  const onSearch = (data) => {
    // handleSearchList(data);
    setSearchString(data);
  };
  const debounceSearchFun: Function = debounce(onSearch, 500);

  const Icon_attachmentObj = {
    video: <VideoIcon1 />,
    image: <ImageIcon1 />,
    audio: <MusicIcon />,
    file: <PostsIcon />,
    default: <PostsIcon />,
    textField: <TextFieldPost />,
    select: <SelectPost />,
    multiSelect: <MultiSelectPost />,
  };

  return (
    <div className={classes.mainContainer}>
      {showSearch ? (
        <div className={`${classes.searchBox}`}>
          <IconButton className={classes.backButton} onClick={onSearchBack}>
            <BlackArrowIcon />
          </IconButton>
          <SearchField placeholder="Search" handleSearch={debounceSearchFun} autoFocus customStyle={classes.searchFieldWrap} />
        </div>
      ) : (
        <div className={classes.subHeader}>
          <span className={classes.headerIcon}>{/* <TickIcon /> */}</span>
          <span className={classes.headerIcon} onClick={() => {}}>
            {/* <SizeIcon /> */}
          </span>
          <span className={classes.headerIcon} onClick={() => setShowSearch(true)}>
            <SearchIcon />
          </span>
        </div>
      )}
      {!isLoading && searchedList?.length === 0 && (
        <div className={classes.noDataContainer}>
          <div>NO RESULTS FOUND</div>
        </div>
      )}
      <div
        style={{
          height: '100%',
          width: '100%',
        }}
        className={classes.nameChardWrapper}
      >
        <AutoSizer
          style={{
            height: '100%',
            width: '100%',
          }}
          data-header-hidable
        >
          {({ width, height }) => (
            <List
              data={searchedList}
              width={width}
              height={height}
              rowHeight={114}
              rowCount={searchedList?.length}
              rowRenderer={({ index, style }) => {
                const currentCardData = searchedList[index];
                return (
                  <div key={index} style={{ ...style, transition: 'all 0.4s ease-in-out 0s' }}>
                    <NameCard
                      id={currentCardData.postId}
                      profilePic={Icon_attachmentObj[currentCardData.postType]}
                      title={currentCardData.heading}
                      isClientSelected={selectedPost === currentCardData.postId}
                      openClient={() => handldeOpenClient(currentCardData)}
                      content={currentCardData.description}
                    />
                  </div>
                );
              }}
            />
          )}
        </AutoSizer>
      </div>
      <Fab
        onClick={() => {
          if (!disabledbutton) {
            addingNewPost();
          } else {
          }
        }}
        className={disabledbutton == true ? classes.addButtonDisabled : classes.addButton}
      >
        {PlusIcon}
      </Fab>
    </div>
  );
}
