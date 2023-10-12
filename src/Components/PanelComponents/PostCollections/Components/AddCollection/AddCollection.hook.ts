import { debounce } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import SuccessToaster from '../../../../../Common/SuccessToaster';
import { useCurrentPanel } from '../../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { IEditFilter } from '../FilterCollection/FilterCollection.types';
import { sortPostsandCollectionsList } from '../SortCollection/SortCollection.function';
import { IEditSort } from '../SortCollection/SortCollection.types';
import { IRootState } from '../../../../../DisplayFramework/State/store';
import {
  addPostOrCollection,
  createCollectionPayload,
  createCollectionsPayload,
  createPostPayload,
  getAllPostsFromES,
  getCriteriaFromMaster,
  getCriteriaOptionFromCriteria,
  getFilteredPostsFromES,
  getPostCollectionData,
  getPostCollectionListData,
} from './AddCollection.function';
import {
  ICollectionsList,
  IEsPosts,
  IFetchHook,
  IOptions,
  IProps,
  ISelectedCollection,
  ISelectedPosts,
  TOptionObj,
  TSelectionType,
} from './AddCollection.types';
import { atom, useAtom, useSetAtom } from 'jotai';

export const applyedFilterAtom = atom<IEditFilter | null>(null as IEditFilter);
export const applyedSortAtom = atom<IEditSort | null>(null as IEditSort);

export const useFetchCollection = (props: IFetchHook, uniqueId: string) => {
  const { sessions } = props;
  const { id: panelId } = useCurrentPanel();

  const [collectionsList, setCollectionsList] = useState<ICollectionsList[]>([]);
  const [postsList, setPostsList] = useState<IEsPosts[]>([]);
  const [selectedPosts, setSelectedPosts] = useState<ISelectedPosts[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<ISelectedCollection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initPosts, setInitPosts] = useState<IEsPosts[]>([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const postcollectiondetails = await getPostCollectionData(panelId, props);
      if (postcollectiondetails) {
        const postId = postcollectiondetails.posts.map((post: any) => post?.postId);
        const collectionId = postcollectiondetails.subCollections.map((data: any) => data?.subCollectionId);
        const esPostLists = await getAllPostsFromES(sessions);
        if (esPostLists) {
          const modified_posts = esPostLists.filter((p) => !postId.includes(p?.postId));
          setPostsList(modified_posts);
          setInitPosts(modified_posts);
        }
        const collectionList = await getPostCollectionListData(panelId, sessions);
        if (collectionList) {
          const collections = collectionList.filter((data: any) => data?.collectionId !== uniqueId);
          const modified_collection = collections.filter((data: any) => {
            return !collectionId.includes(data?.collectionId);
          });
          setCollectionsList(modified_collection);
        }
        setIsLoading(false);
      }
    })();
    return () => {
      setCollectionsList([]);
    };
  }, []);
  return {
    collectionsList,
    postsList,
    selectedPosts,
    selectedCollections,
    isLoading,
    initPosts,
    setCollectionsList,
    setPostsList,
    setSelectedPosts,
    setSelectedCollections,
    setInitPosts,
  };
};

export const useAddCollection = (props: IProps) => {
  const {
    collectionsList,
    setCollectionsList,
    postsList,
    setPostsList,
    selectedPosts,
    setSelectedPosts,
    selectedCollections,
    setSelectedCollections,
    initPosts,
    setInitPosts,
    isLoading,
    sessions,
  } = props;
  const { id: panelId } = useCurrentPanel();
  const setApplyedFilterdata = useSetAtom(applyedFilterAtom);
  const setApplyedSortdata = useSetAtom(applyedSortAtom);

  const [searchString, setSearchString] = useState('');
  const [applyedFilter, setApplyedFilter] = useAtom(applyedFilterAtom);
  const [applyedSort, setApplyedSort] = useAtom(applyedSortAtom);

  const { uniqueType, uniqueId, previewDataInRedux }: any = useSelector((state: IRootState) => state.AllPostData);

  const isFiltered = applyedFilter?.criteria?.length && applyedFilter?.domainType;
  const isShorted = applyedSort?.length;

  const sortedPosts = useMemo(() => {
    if (!isShorted) return postsList;
    return sortPostsandCollectionsList(postsList, applyedSort);
  }, [postsList, applyedSort, isShorted]);

  const sortedCollections = useMemo(() => {
    if (!isShorted) return collectionsList;
    return sortPostsandCollectionsList(collectionsList, applyedSort, 'collections');
  }, [collectionsList, applyedSort, isShorted]);

  const searched = useMemo(() => {
    const value = searchString.toLowerCase();
    let posts: IEsPosts[] = sortedPosts;
    let collections: ICollectionsList[] = sortedCollections;
    const allPosts: ISelectedPosts[] = [];
    let allCollections: ISelectedCollection[] = [];

    let postIndex = 0;
    posts = sortedPosts.filter((item: IEsPosts) => {
      const isSearch = item?.topics?.heading?.snippet?.toLowerCase().includes(value);
      if (isSearch) {
        ++postIndex;
        allPosts.push(createPostPayload(item, postIndex));
      }
      return isSearch;
    });
    let collectionIndex = 0;
    if (isFiltered) {
      collections = [];
      allCollections = [];
    } else {
      collections = sortedCollections.filter((item: ICollectionsList) => {
        const isSearch = item?.collectionName?.toLowerCase().includes(value);
        if (isSearch) {
          ++collectionIndex;
          allCollections.push(createCollectionPayload(item, collectionIndex));
        }
        return isSearch;
      });
    }
    // console.log('!!collections', collections);
    // console.log('!!posts', posts);

    return { posts, collections, allPosts, allCollections };
  }, [sortedPosts, sortedCollections, searchString, isFiltered]);

  const postsSelectedType: TSelectionType = useMemo(() => {
    if (!selectedPosts.length && searched.allPosts?.length) return 'UNCHECKED';

    const isAllChecked = searched?.allPosts?.every((v) => selectedPosts.some((p) => p.postId === v.postId));

    return isAllChecked ? 'ALL_CHECKED' : 'PARTIAL_CHECKED';
  }, [selectedPosts, searched.allPosts]);

  const collectionSelectedType: TSelectionType = useMemo(() => {
    if (!selectedCollections.length && searched.allCollections?.length) return 'UNCHECKED';
    const isAllChecked = searched?.allCollections?.every((v) => {
      return selectedCollections.some((p) => p.subCollectionId === v.subCollectionId);
    });

    return isAllChecked ? 'ALL_CHECKED' : 'PARTIAL_CHECKED';
  }, [selectedCollections, searched.allCollections]);

  const isAllChecked = postsSelectedType === 'ALL_CHECKED' && collectionSelectedType === 'ALL_CHECKED';
  const isPartialChecked = postsSelectedType === 'PARTIAL_CHECKED' || collectionSelectedType === 'PARTIAL_CHECKED';

  const onPostsSelect = (postIndex: number, post: IEsPosts, idx: number) => {
    const curPost = createPostPayload(post, idx);

    setSelectedPosts((pre) => {
      const copyPre: ISelectedPosts[] = JSON.parse(JSON.stringify(pre));
      if (postIndex === -1) {
        copyPre.push(curPost);
      } else {
        copyPre.splice(postIndex, 1);
      }
      return copyPre;
    });
  };

  const onCollectionsSelect = (collectionIndex: number, collection: ICollectionsList, idx: number) => {
    const curCollection = createCollectionPayload(collection, idx);

    setSelectedCollections((pre) => {
      const copyPre: ISelectedCollection[] = JSON.parse(JSON.stringify(pre));
      if (collectionIndex === -1) {
        copyPre.push(curCollection);
      } else {
        copyPre.splice(collectionIndex, 1);
      }
      return copyPre;
    });
  };

  const onSelectAllCards = () => {
    if (isAllChecked) {
      setSelectedPosts([]);
      !isFiltered && setSelectedCollections([]);
    } else {
      setSelectedPosts(searched.allPosts);
      !isFiltered && setSelectedCollections(searched.allCollections);
    }
  };

  const handleclear = () => {
    setSearchString('');
    setPostsList(initPosts);
    setApplyedFilterdata(null);
    setApplyedSortdata(null);
  };

  const onApplyFilter = async (data: IEditFilter) => {
    const filteredPosts = await getFilteredPostsFromES(sessions, data);

    // filter the posts from the results which are already added
    const HeadingOfTheAlreadyAddedPosts = previewDataInRedux?.posts?.reduce((accumulator, addedPost) => {
      accumulator.push(addedPost?.heading?.toLowerCase());
      return accumulator;
    }, []);

    const UpdatedfilteredPosts = filteredPosts?.filter((item: IEsPosts) => {
      return !HeadingOfTheAlreadyAddedPosts.includes(item?.topics?.heading?.snippet?.toLowerCase());
    });

    setPostsList(UpdatedfilteredPosts);
    setApplyedFilter(data);
  };

  const onApplySort = (data: IEditSort) => {
    setApplyedSortdata(data);
  };

  const onAddSelection = async () => {
    const _sortedPosts: ISelectedPosts[] = JSON.parse(JSON.stringify(selectedPosts));
    _sortedPosts.sort((a, b) => a.elementOrder - b.elementOrder);

    const _sortedCollection = await createCollectionsPayload(sessions, selectedCollections);
    _sortedCollection.sort((a, b) => a.elementOrder - b.elementOrder);

    const selectedPostIds = {};
    const selectedCollectionIds = {};

    const elementsToAdd = [..._sortedPosts, ..._sortedCollection].map((v, i) => {
      if (v.elementToAdd === 'POST') {
        selectedPostIds[v.postId] = true;
      }
      if (v.elementToAdd === 'SC') {
        selectedCollectionIds[v.subCollectionId] = true;
      }
      return { ...v, elementOrder: i + 1 };
    });

    const response = await addPostOrCollection(sessions, elementsToAdd, {
      collectionId: uniqueId,
      collectionType: uniqueType || 'PCM',
    });
    if (response) {
      const filteredPosts = postsList?.filter((v) => !selectedPostIds[v.postId]);
      const filteredCollections = collectionsList?.filter((v) => !selectedCollectionIds[v.collectionId]);
      setPostsList(filteredPosts);
      setInitPosts(filteredPosts);
      setCollectionsList(filteredCollections);
      setSelectedPosts([]);
      setSelectedCollections([]);
      const message =
        _sortedPosts.length && _sortedCollection.length ? 'Post and collection' : _sortedPosts.length ? 'Post' : 'Collection';
      SuccessToaster(`${message} added successfully`, panelId, 'success');
    }
  };

  const onSearchFun: Function = debounce(setSearchString, 500);

  return {
    applyedFilter,
    applyedSort,
    selectedPosts,
    selectedCollections,
    searchString,
    isLoading,
    isFiltered,
    isShorted,
    searched,
    isAllChecked,
    isPartialChecked,
    onPostsSelect,
    onCollectionsSelect,
    onSelectAllCards,
    handleclear,
    onApplyFilter,
    onApplySort,
    onAddSelection,
    onSearchFun,
  };
};

export const useCriteriaOptions = (sessions) => {
  const [criteriaOpts, setCriteriaOpts] = useState<IOptions[]>([]);
  const [criteriaBaseOpts, setCriteriaBaseOpts] = useState<TOptionObj>();
  useEffect(() => {
    (async () => {
      let criteriaOptsRes = await getCriteriaFromMaster(sessions, 'postFilterCriteria');
      // criteriaOptsRes = criteriaOptsRes?.filter((v) => v.value !== 'conditionsApplicable');
      const criteriaBaseOptsRes = await getCriteriaOptionFromCriteria(sessions, [
        ...criteriaOptsRes,
        { label: 'domain', value: 'domain' },
      ]);
      setCriteriaOpts(criteriaOptsRes);
      setCriteriaBaseOpts(criteriaBaseOptsRes);
    })();
  }, []);

  return { criteriaOpts, criteriaBaseOpts };
};
