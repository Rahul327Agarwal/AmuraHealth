import { Fab } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';
import { AutoSizer, List } from '../../../../Utilities/AutoResizerWrapper';
import { FilterIcon, PlusIcon, PostCollections, QuestionIcon } from '../../../SVGs/Common';
import { getCollectionLists, MIN_SEARCH_CHAR } from '../DistributionsMgt.functions';
import { DistributionsListProps, UniqueCollectionType } from '../DistributionsMgt.types';
import {
  setDataList,
  setDisabledaddBtnInList,
  setDisabledaddtBtnInPreview,
  setStoreData,
  setTenantId,
  setUniqueId,
  setUniqueType,
  setSnippetStartTime,
  setSnippetCloseTime,
} from './../../../../DisplayFramework/State/Slices/AllPostsDataSlice';
import { IRootState } from './../../../../DisplayFramework/State/store';
import ListDropdownHeader from './../../../LibraryComponents/ListDropdownHeader/ListDropdownHeader';
import { ListHeaderDropdownTypes } from './../../../LibraryComponents/ListDropdownHeader/ListDropdownHeader.types';
import MUITabs from './../../../LibraryComponents/MUITabs/MUITabs';
import MyListHeader from './../../../LibraryComponents/MyListHeader/MyListHeader';
import NameCard from './../../../LibraryComponents/NameCard1/NameCard1';
import ThreeDotMenu from './../../../LibraryComponents/ThreeDotMenu/ThreeDotMenu';
import ThreeDotRenderButton from './../../../LibraryComponents/ThreeDotMenu/ThreeDotRenderButton';
import { ADDING_STOREDATA, DISTRIBUTION_DROPDOWN, NAME_CARD_ICONS } from './List.function';
import { useStyles } from './List.styles';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { applyedFilterAtom, applyedSortAtom } from '../../PostCollections/Components/AddCollection/AddCollection.hook';
import { useSetAtom } from 'jotai';

export default function DistributionsList(props: DistributionsListProps) {
  const { childEventTrigger, panel, registerEvent, unRegisterEvent } = props;
  const { classes } = useStyles(props);
  const dispatch = useDispatch();
  const { id: panelId } = useCurrentPanel();

  const disabledaddBtnInList = useSelector((state: IRootState) => state.AllPostData.disabledaddBtnInList);

  const [selectedDropdown, setSelectedDropdown] = useState<ListHeaderDropdownTypes>('distributions');
  const [uniqueCollectionType, setUniqueCollectionType] = useState<UniqueCollectionType>('POLL');
  const [activeTab, setActiveTab] = useState('All');
  const [searchString, setSearchString] = useState('');
  const [cardData, setCardData] = useState<any>([]);
  const [selectedCardId, setSelectedCardId] = useState('');
  const [autoSelectCard, setAutoSelectCard] = useState(null as any);
  const [myListRefreshed, setMyListRefreshed] = useState(0);
  const [searchClose, setSearchClose] = useState(0);
  const setApplyedFilterdata = useSetAtom(applyedFilterAtom);
  const setApplyedSortdata = useSetAtom(applyedSortAtom);
  const searchedList = useMemo(() => {
    if (searchString.length >= MIN_SEARCH_CHAR) {
      const value = searchString.toLowerCase();
      const collections = cardData.filter((item: any) => {
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
    if (uniqueCollectionType) {
      dispatch(setUniqueType(uniqueCollectionType));
      childEventTrigger(null, null, 'showingEmpty', {});
      (async () => {
        const response = await getCollectionLists(panelId,props, uniqueCollectionType);
        if (response) {
          setCardData(response);
          dispatch(setDataList(response));
        }
      })();
      const patientId = props.sessions.user ? props.sessions.user.id : '';
      newPostListener = registerEvent(patientId, `added-${uniqueCollectionType}`, (message: any) => {
        setAutoSelectCard(message);
      });

      postList = registerEvent(uniqueCollectionType, 'collectionList.json', () => {
        (async () => {
          const response = await getCollectionLists(panelId,props, uniqueCollectionType);
          if (response) {
            setCardData(response);
            dispatch(setDataList(response));
            setMyListRefreshed(new Date().getTime());
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

  const addingNewPost = () => {
    const addNewStoreData = (ADDING_STOREDATA as any)[uniqueCollectionType];
    const newUnique = uuidV4();
    setSelectedCardId('');
    dispatch(setDisabledaddBtnInList(true));
    dispatch(setStoreData(addNewStoreData));
    dispatch(setUniqueId(newUnique));
    childEventTrigger(null, null, 'onCreateNewCard', {
      cardData: '',
      type: uniqueCollectionType,
      clientData: {
        client_id: newUnique || '',
        client_name: '',
        LastName: '',
      },
    });
  };
  const handleEditTab = () => {
    // NOTE: EDIT TAB
  };
  const handleClickFilter = () => {
    // NOTE: FILTER
  };

  const headerActionOptions = useMemo(() => [{ id: 'filter', icon: <FilterIcon />, onClick: handleClickFilter }], []);
  const handldeOpenClient = (data) => {
    /*removing filterdata*/
    setApplyedFilterdata(null)
    setApplyedSortdata(null)
    /*for controlling start time and close time in snippets*/
    dispatch(setSnippetStartTime(null));
    dispatch(setSnippetCloseTime(null));
    /*for controlling start time and close time in snippets*/
    dispatch(setDisabledaddBtnInList(false));
    dispatch(setDisabledaddtBtnInPreview(false));
    setSelectedCardId(data?.collectionId);
    dispatch(setStoreData({}));
    dispatch(setUniqueId(data?.collectionId || ''));
    dispatch(setUniqueType(data?.collectionType || ''));
    dispatch(setTenantId(data?.tenantId || ''));
    childEventTrigger(null, null, 'onDistributionListCardClick', {
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
      let addedPost = cardData.find((post: any) => post.collectionId === autoSelectCard?.collectionPayload?.collectionId);
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
    return DISTRIBUTION_DROPDOWN.find((v) => v.value === uniqueCollectionType);
  }, [uniqueCollectionType]);

  return (
    <div className={classes.mainContainer} key={searchClose}>
      <ListDropdownHeader
        childEventTrigger={childEventTrigger}
        selectedDropdown={selectedDropdown}
        setSelectedDropdown={setSelectedDropdown}
        handleSearch={setSearchString}
        headerActionOptions={headerActionOptions}
        customStyle={classes.addmargin}
      />
      <MyListHeader
        padding="5px 20px"
        injectComponent={
          <ThreeDotMenu
            isReverse
            isDivider
            options={DISTRIBUTION_DROPDOWN}
            renderButton={<ThreeDotRenderButton icon={selectDistributionValue!.icon} label={selectDistributionValue!.label} />}
            handleClick={setUniqueCollectionType}
          />
        }
      />
      <MUITabs
        paddingX="20px"
        tabOptions={['All']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        handleEditTab={handleEditTab}
        customStyle={classes.addmargin}
      />
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
        >
          {({ width, height }) => (
            <List
              data={searchedList}
              width={width}
              height={height - 176}
              rowHeight={114}
              rowCount={searchedList.length}
              rowRenderer={({ index, style }) => {
                const currentCardData = searchedList[index];
                // const postIcon = currentCardData.numberOfPosts
                // ? [<PostCollections />]
                // : [];
                const collectionIcon = currentCardData.subCollections ? [<PostCollections />] : [];
                return (
                  <div key={index} style={{ ...style, transition: 'all 0.4s ease-in-out 0s' }}>
                    <NameCard
                      id={currentCardData.collectionId}
                      profilePic={(NAME_CARD_ICONS as any)[uniqueCollectionType]}
                      title={currentCardData.title}
                      iconTray={collectionIcon}
                      hasBranching={currentCardData.hasBranching}
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
          if (!disabledaddBtnInList) {
            addingNewPost();
          } else {
          }
        }}
        className={disabledaddBtnInList ? classes.disabledButton : classes.addButton}
      >
        {<PlusIcon />}
      </Fab>
    </div>
  );
}
