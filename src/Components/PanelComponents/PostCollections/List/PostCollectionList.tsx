import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';
import {
  setDataList,
  setDisabledButton,
  setprePreviewDisabledButton,
  setStoreData,
  setUniqueId,
  setUniqueType,
} from '../../../../DisplayFramework/State/Slices/AllPostsDataSlice';
import { IRootState } from '../../../../DisplayFramework/State/store';

import { IProps } from '../MyListHome.types';

import { getpostCollectionListData } from './PostCollectionsList.function';
import { useStyles } from './PostCollectionsList.styles';

import { debounce, IconButton } from '@mui/material';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { usePanelsContainerSizeInfo } from '../../../../DisplayFramework/DisplayFramework.hooks';
import { AutoSizer, List } from '../../../../Utilities/AutoResizerWrapper';
import { ListHeaderDropdownTypes } from '../../../LibraryComponents/ListDropdownHeader/ListDropdownHeader.types';
import NameCard from '../../../LibraryComponents/NameCard1/NameCard1';
import SearchField from '../../../LibraryComponents/SearchField/SearchField';
import { BlackArrowIcon, FilterIcon, PlusIcon, PostCollectionsIcon, SearchIcon } from '../PostCollections.svgs';
import { atom, useAtom, useSetAtom } from 'jotai';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { applyedFilterAtom, applyedSortAtom } from '../Components/AddCollection/AddCollection.hook';
// import SearchField from '../../SearchField/SearchField';

export const postCollectionSelectedCardAtom = atom('');

export default function PostCollectionList(props: IProps) {
  const { childEventTrigger, registerEvent, unRegisterEvent, panel, selectedClient } = props;
  const { classes } = useStyles();
  const commonClass = useCommonStyles();
  const { id: panelId } = useCurrentPanel();
  const { numOfPanelsCanFit } = usePanelsContainerSizeInfo();

  const [selectedDropdown, setSelectedDropdown] = useState<ListHeaderDropdownTypes>('postsCollections');

  const [activeTabData, setActiveTabData] = useState('All');
  const [tabsTitle, setTabsTitle] = useState(['All']);
  const [cardData, setCardData] = useState<any>([]);
  const [selectedPost, setSelectedPost] = useAtom(postCollectionSelectedCardAtom);
  const [autoSelectCard, setAutoSelectCard] = useState(null as any);
  const [myListRefreshed, setMyListRefreshed] = useState(0);
  const [searchString, setSearchString] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [autosizerHeight, setAutosizerHeight] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const disabledbutton = useSelector((state: IRootState) => state.AllPostData.disabledbutton);
  const MIN_SEARCH_CHAR = 3;
  const setApplyedFilterdata = useSetAtom(applyedFilterAtom);
  const setApplyedSortdata = useSetAtom(applyedSortAtom);

  const searchedList = useMemo(() => {
    if (searchString?.length >= MIN_SEARCH_CHAR) {
      const value = searchString.toLowerCase();
      const collections = cardData.filter((item) => {
        if (item.collectionName) return item.collectionName.toLowerCase().includes(value);
        return true;
      });
      return collections;
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
        const posts = await getpostCollectionListData(panelId, props);
        if (posts) {
          setCardData(posts);
          dispatch(setDataList(posts));
        }
      } catch (error) {
        console.error('error', error.message);
      } finally {
        setIsLoading(false);
      }
    })();
    const patientId = props.sessions.user ? props.sessions.user.id : '';
    newPostListener = registerEvent(patientId, `added-PCM`, (message) => {
      setAutoSelectCard(message);
    });

    postList = registerEvent('PCM', 'collectionList.json', () => {
      getpostCollectionListData(panelId, props)
        .then((posts) => {
          if (!posts?.Error) {
            setCardData(posts);
            dispatch(setDataList(posts));
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

  useEffect(() => {
    if (
      myListRefreshed &&
      autoSelectCard &&
      autoSelectCard?.action === 'ADD' &&
      autoSelectCard?.collectionPayload?.snippet?.type === 'collectionName'
    ) {
      let addedPost = cardData?.find((post) => post.collectionId === autoSelectCard?.collectionPayload?.collectionId);
      if (addedPost) {
        handldeOpenClient(addedPost);
        setAutoSelectCard(null);
      }
    }
  }, [myListRefreshed]);

  const showActiveData = (data) => {
    setActiveTabData(data);
  };

  // Deselects the post collection card when client is null
  useEffect(() => {
    if (!Object.keys(selectedClient).length) {
      setSelectedPost('');
    }
  }, [selectedClient]);

  const handldeOpenClient = (currentCardData) => {
    if (currentCardData?.collectionId === selectedPost) {
      return;
    }
     /*removing filterdata*/
    setApplyedFilterdata(null)
    setApplyedSortdata(null)
     /*removing filterdata*/
    setSelectedPost(currentCardData?.collectionId);
    dispatch(setUniqueId(currentCardData?.collectionId || ''));
    dispatch(setUniqueType(currentCardData?.collectionType || ''));
    dispatch(setDisabledButton(false));
    dispatch(setprePreviewDisabledButton(false));

    childEventTrigger('MyList', 'MyList', 'onPostCollectionsCardClick', {
      cardData: currentCardData,
      type: 'PCM',
      clientData: {
        client_id: currentCardData?.collectionId || '',
        client_name: '',
        LastName: '',
      },
    });
  };

  const addingNewPost = () => {
    const postcollectionData = {
      type: 'collectionName',
      headerText: 'Enter title of the post collection',
      msgMapper: 'QUESTION_ANSWER',
      action: 'ADD',
      placeHolderText: 'Enter title',
    };
    const postIdunique = uuidV4();
    setSelectedPost('');
    dispatch(setStoreData(postcollectionData));
    dispatch(setUniqueId(postIdunique || ''));
    dispatch(setUniqueType('PCM'));
    numOfPanelsCanFit > 1 && dispatch(setDisabledButton(true));
    childEventTrigger('MyList', 'MyList', 'onaddPostCollectionCard', {
      cardData: '',
      type: 'PCM',
      clientData: {
        client_id: postIdunique || '',
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

  const onSearch = (data) => {
    // handleSearchList(data);
    setSearchString(data);
  };
  const debounceSearchFun: Function = debounce(onSearch, 500);

  const headerActionOptions = useMemo(() => [{ id: 'filter', icon: FilterIcon, onClick: () => {} }], []);

  return (
    <div className={classes.rootContainer}>
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
        className={classes.nameChardWrapper}
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        {/* {
          filterSelected === "posts" ? ( */}
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
                const collectionIcon = currentCardData.subCollections ? [<PostCollectionsIcon />] : [];

                return (
                  <div key={index} style={{ ...style, transition: 'all 0.4s ease-in-out 0s' }}>
                    <NameCard
                      id={currentCardData.collectionId}
                      profilePic={<PostCollectionsIcon />}
                      title={currentCardData.collectionName}
                      iconTray={collectionIcon}
                      isClientSelected={selectedPost === currentCardData.collectionId}
                      openClient={() => handldeOpenClient(currentCardData)}
                      hasBranching={currentCardData.hasBranching}
                      content={currentCardData.numberOfPosts ? `${currentCardData.numberOfPosts} Posts` : '0 Posts'}
                    />
                  </div>
                );
              }}
            />
          )}
        </AutoSizer>
        {/* ) : null */}
      </div>

      {/* </> */}

      <div className={classes.footerDiv}>
        <span className={classes.addButtonWrapper}>
          <button
            onClick={addingNewPost}
            className={disabledbutton == true ? classes.addButtonDisabled : classes.addButton}
            disabled={disabledbutton}
          >
            <PlusIcon />
          </button>
        </span>
      </div>
    </div>
  );
}
