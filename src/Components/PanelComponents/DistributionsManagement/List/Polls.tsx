import { debounce, Fab, IconButton } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';
import { usePanelsContainerSizeInfo } from '../../../../DisplayFramework/DisplayFramework.hooks';
import {
  setDataList,
  setDisabledaddBtnInLMS,
  setDisabledaddBtnInPolls,
  setDisabledaddBtnInQMT,
  setDisabledaddBtnInList,
  setDisabledaddtBtnInPreview,
  setSnippetCloseTime,
  setSnippetStartTime,
  setStoreData,
  setTenantId,
  setUniqueId,
  setUniqueType,
} from '../../../../DisplayFramework/State/Slices/AllPostsDataSlice';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { AutoSizer, List } from '../../../../Utilities/AutoResizerWrapper';
import MUITabs from '../../../LibraryComponents/MUITabs/MUITabs';
import NameCard from '../../../LibraryComponents/NameCard1/NameCard1';
import SearchField from '../../../LibraryComponents/SearchField/SearchField';
import { FilterIcon, PlusIcon, PostCollections, PostCollectionsIcon, QuestionIcon } from '../../../SVGs/Common';
import { BlackArrowIcon, SearchIcon } from '../../PostManagement/PostManagement.svg';
import { getCollectionLists, MIN_SEARCH_CHAR } from '../DistributionsMgt.functions';
import { DistributionsListProps, UniqueCollectionType } from '../DistributionsMgt.types';
import { ADDING_STOREDATA, DISTRIBUTION_DROPDOWN, NAME_CARD_ICONS } from './List.function';
import { useStyles } from './List.styles';
import { atom, useAtom, useSetAtom } from 'jotai';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { applyedFilterAtom, applyedSortAtom } from '../../PostCollections/Components/AddCollection/AddCollection.hook';

export const pollsSelectedCardAtom = atom('');

export default function Polls(props: DistributionsListProps) {
  const { childEventTrigger, registerEvent, unRegisterEvent, panel, selectedClient } = props;
  const { classes } = useStyles(props);
  const dispatch = useDispatch();
  const { id: panelId } = useCurrentPanel();

  const disabledaddBtnInPolls = useSelector((state: IRootState) => state.AllPostData.disabledaddBtnInPolls);

  const [uniqueCollectionType, setUniqueCollectionType] = useState<UniqueCollectionType>('POLL');
  const [activeTab, setActiveTab] = useState('All');
  const [searchString, setSearchString] = useState('');
  const [cardData, setCardData] = useState<any>([]);
  const [selectedCardId, setSelectedCardId] = useAtom(pollsSelectedCardAtom);
  const [autoSelectCard, setAutoSelectCard] = useState(null as any);
  const [myListRefreshed, setMyListRefreshed] = useState(0);
  const [searchClose, setSearchClose] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { numOfPanelsCanFit } = usePanelsContainerSizeInfo();
  const setApplyedFilterdata = useSetAtom(applyedFilterAtom);
  const setApplyedSortdata = useSetAtom(applyedSortAtom);
  const searchedList = useMemo(() => {
    if (searchString.length >= MIN_SEARCH_CHAR) {
      const value = searchString.toLowerCase();
      const collections = cardData.filter((item) => {
        if (item.title) return item.title.toLowerCase().includes(value);
        else if (item.collectionName) return item.collectionName.toLowerCase().includes(value);
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
    setSelectedCardId('');
    dispatch(setDisabledaddBtnInList(false));
    dispatch(setDisabledaddBtnInLMS(false));
    dispatch(setDisabledaddBtnInPolls(false));
    dispatch(setDisabledaddBtnInQMT(false));
    if (uniqueCollectionType) {
      dispatch(setUniqueType(uniqueCollectionType));
      childEventTrigger('MyList', 'MyList', 'showingEmpty', {});
      (async () => {
        try {
          const response = await getCollectionLists(panelId, props, uniqueCollectionType);
          if (response) {
            setCardData(response);
            dispatch(setDataList(response));
          }
        } catch (error) {
          console.error('error', error.message);
        } finally {
          setIsLoading(false);
        }
      })();
      const patientId = props.sessions.user ? props.sessions.user.id : '';
      newPostListener = registerEvent(patientId, `added-${uniqueCollectionType}`, (message) => {
        setAutoSelectCard(message);
      });

      postList = registerEvent(uniqueCollectionType, 'collectionList.json', () => {
        (async () => {
          try {
            const response = await getCollectionLists(panelId, props, uniqueCollectionType);
            if (response) {
              setCardData(response);
              dispatch(setDataList(response));
              setMyListRefreshed(new Date().getTime());
            }
          } catch (error) {
            console.error('error', error.message);
          } finally {
            setIsLoading(false);
          }
        })();
      });
    }

    return () => {
      if (newPostListener) {
        unRegisterEvent(newPostListener);
      }
      if (postList) {
        unRegisterEvent(postList);
      }
    };
  }, [uniqueCollectionType]);

  useEffect(() => {
    if (!Object.keys(selectedClient).length) {
      setSelectedCardId('');
    }
  }, [selectedClient]);

  const addingNewPost = () => {
    const addNewStoreData = ADDING_STOREDATA[uniqueCollectionType];
    const newUnique = uuidV4();
    setSelectedCardId('');
    numOfPanelsCanFit > 1 && dispatch(setDisabledaddBtnInPolls(true));
    dispatch(setDisabledaddBtnInList(false));
    dispatch(setDisabledaddBtnInLMS(false));
    dispatch(setDisabledaddBtnInQMT(false));
    dispatch(setStoreData(addNewStoreData));
    dispatch(setUniqueId(newUnique));
    childEventTrigger('MyList', 'MyList', 'onCreateNewCard', {
      cardData: '',
      type: uniqueCollectionType,
      clientData: {
        client_id: newUnique || '',
        client_name: '',
        LastName: '',
      },
    });
  };

  const handleClickFilter = () => {
    // NOTE: FILTER
  };

  const headerActionOptions = useMemo(() => [{ id: 'filter', icon: FilterIcon, onClick: handleClickFilter }], []);

  const handldeOpenClient = (data) => {
    // if (data.postId === selectedPost) return;
    if (data?.collectionId === selectedCardId) return;
    /*removing filterdata*/
    setApplyedFilterdata(null);
    setApplyedSortdata(null);
    /*for controlling start time and close time in snippets*/
    dispatch(setSnippetStartTime(null));
    dispatch(setSnippetCloseTime(null));
    /*for controlling start time and close time in snippets*/
    dispatch(setDisabledaddBtnInList(false));
    dispatch(setDisabledaddBtnInLMS(false));
    dispatch(setDisabledaddBtnInPolls(false));
    dispatch(setDisabledaddBtnInQMT(false));
    dispatch(setDisabledaddtBtnInPreview(false));
    setSelectedCardId(data?.collectionId);
    dispatch(setStoreData({}));
    dispatch(setUniqueId(data?.collectionId || ''));
    dispatch(setUniqueType(data?.collectionType || ''));
    dispatch(setTenantId(data?.tenantId || ''));
    childEventTrigger('MyList', 'MyList', 'onDistributionListCardClick', {
      cardData: data,
      type: data?.collectionType,
      clientData: {
        client_id: data?.collectionId || '',
        client_name: '',
        LastName: '',
      },
    });
  };

  useEffect(() => {
    if (
      myListRefreshed &&
      autoSelectCard &&
      autoSelectCard?.action === 'ADD' &&
      autoSelectCard?.collectionPayload?.snippet?.type === 'title'
    ) {
      let addedPost = cardData.find((post) => post.collectionId === autoSelectCard?.collectionPayload?.collectionId);
      if (addedPost) {
        handldeOpenClient(addedPost);
        setAutoSelectCard(null);
      }
    }
  }, [myListRefreshed]);

  const selectDistributionValue = useMemo(() => {
    setSearchClose(new Date().getTime());
    setSearchString('');
    dispatch(setDisabledaddBtnInList(false));
    dispatch(setDisabledaddBtnInLMS(false));
    dispatch(setDisabledaddBtnInPolls(false));
    dispatch(setDisabledaddBtnInQMT(false));
    return DISTRIBUTION_DROPDOWN.find((v) => v.value === uniqueCollectionType);
  }, [uniqueCollectionType]);

  const handleEditTab = () => {
    // NOTE: EDIT TAB
  };
  const onSearch = (data) => {
    setSearchString(data);
  };
  const handleSearchBack = () => {};
  const onSearchBack = () => {
    setShowSearch(false);
    setSearchString('');
    handleSearchBack && handleSearchBack();
  };
  const debounceSearchFun: Function = debounce(onSearch, 500);

  return (
    <div className={classes.mainContainer} key={searchClose}>
      {showSearch ? (
        <div className={`${classes.searchBox}`}>
          <IconButton className={classes.backButton} onClick={onSearchBack}>
            <BlackArrowIcon />
          </IconButton>
          <SearchField placeholder="Search" handleSearch={debounceSearchFun} autoFocus customStyle={classes.searchFieldWrap} />
        </div>
      ) : (
        <div className={classes.subHeader}>
          <span className={classes.headerIcon} onClick={() => setShowSearch(true)}>
            <SearchIcon />
          </span>
        </div>
      )}
      <MUITabs
        paddingX="20px"
        tabOptions={['All']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        handleEditTab={handleEditTab}
        customStyle={classes.addmargin}
      />
      {!isLoading && searchedList.length === 0 && (
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
              rowCount={searchedList.length}
              rowRenderer={({ index, style }) => {
                const currentCardData = searchedList[index];
                // const postIcon = currentCardData.numberOfPosts ? [PostCollections] : [];
                const collectionIcon = currentCardData.subCollections ? [<PostCollectionsIcon />] : [];

                return (
                  <div key={index} style={{ ...style, transition: 'all 0.4s ease-in-out 0s' }}>
                    <NameCard
                      id={currentCardData.collectionId}
                      profilePic={NAME_CARD_ICONS[uniqueCollectionType]}
                      title={currentCardData.title}
                      iconTray={[...collectionIcon]}
                      isClientSelected={selectedCardId === currentCardData.collectionId}
                      openClient={() => handldeOpenClient(currentCardData)}
                      content={currentCardData.numberOfPosts ? `${currentCardData.numberOfPosts} Posts` : '0 Posts'}
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
          if (!disabledaddBtnInPolls) {
            addingNewPost();
          } else {
          }
        }}
        className={disabledaddBtnInPolls ? classes.disabledButton : classes.addButton}
      >
        <PlusIcon />
      </Fab>
    </div>
  );
}
