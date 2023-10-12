import { useState } from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import Checkbox from '../../../../LibraryComponents/MUICheckbox/MUICheckbox';
import MUISkeleton from '../../../../LibraryComponents/MUISkeleton/MUISkeleton';
import PannelFooter from '../../../../LibraryComponents/PannelFooter/PannelFooter';
import {
  CloseIcon,
  FilterApplyedIcon,
  FilterIcon,
  PartialCheckedGray,
  SortApplyedIcon,
  SortIcon,
} from '../../PostCollections.svgs';
import FilterCollection from '../FilterCollection/FilterCollection';
import PostAndCollectionCard from '../PostAndCollectionCard/PostAndCollectionCard';
import SortCollection from '../SortCollection/SortCollection';
import SearchField from './../../../../LibraryComponents/SearchField/SearchField';
import { useAddCollection } from './AddCollection.hook';
import { useStyles } from './AddCollection.styles';
import { ICollectionsList, IEsPosts, IProps, TScreen } from './AddCollection.types';
import InViewWrapper from './InViewWrapper';

export default function AddCollection(props: IProps) {
  const { onBack, onPostPreview, onCollectionPreview, criteriaOpts, criteriaBaseOpts } = props;
  const { classes } = useStyles();
  const commonClass = useCommonStyles();

  const [screen, setScreen] = useState<TScreen>('HOME');

  const {
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
  } = useAddCollection(props);

  const onNavToFilterScreen = () => {
    if (isLoading) return;
    setScreen('FILTER');
  };
  const onNavToSortScreen = () => {
    if (isLoading) return;
    setScreen('SORT');
  };

  const backToHome = () => {
    setScreen('HOME');
  };

  if (screen === 'FILTER') {
    return (
      <FilterCollection
        onBack={backToHome}
        editCriteria={applyedFilter}
        onApply={onApplyFilter}
        criteriaOpts={criteriaOpts}
        criteriaBaseOpts={criteriaBaseOpts}
      />
    );
  }

  if (screen === 'SORT') {
    return <SortCollection onBack={backToHome} editCriteria={applyedSort} onApply={onApplySort} />;
  }

  return (
    <div className={classes.rootContainer}>
      <div className={`${classes.dflex} ${classes.titleWraper}`}>
        <div className={`${commonClass.body17Medium}`}>Posts & Sub collections</div>
        <button
          className={classes.iconStyle}
          onClick={() => {
            handleclear();
            onBack();
          }}
        >
          <CloseIcon />
        </button>
      </div>
      <div className={classes.mainwrapper}>
        <div className={classes.searchCardWrap}>
          <div className={classes.searchFieldWrap}>
            <SearchField placeholder="Search a post/sub collection " value={searchString} handleSearch={onSearchFun} autoFocus />
          </div>
          <i className={classes.filterIcon} onClick={onNavToFilterScreen}>
            {isFiltered ? <FilterApplyedIcon /> : <FilterIcon />}
          </i>
          <i className={classes.filterIcon} onClick={onNavToSortScreen}>
            {isShorted ? <SortApplyedIcon /> : <SortIcon />}
          </i>
        </div>
      </div>
      <div className={classes.searchresult}>
        <div className={`${commonClass.caption12Medium} ${classes.result}`}>
          {searchString == ''
            ? `Total ${searched.posts.length} posts & ${searched.collections.length} sub collection`
            : `${searched.collections.length + searched.posts.length} results found`}
        </div>

        {(searchString !== '' || isFiltered || !!isShorted) && (
          <div className={`${commonClass.caption12Medium} ${classes.clear}`} onClick={handleclear}>
            Clear
          </div>
        )}
      </div>
      {searched.posts.length || searched.collections.length ? (
        <div className={classes.selectAllCon}>
          <span className={classes.selectAllButton} onClick={onSelectAllCards}>
            <span className={`${commonClass.body17Regular} ${classes.selectAllText}`}>Select All</span>
            <Checkbox checked={isAllChecked} icon={isPartialChecked ? <PartialCheckedGray /> : undefined} />
          </span>
        </div>
      ) : null}
      <div className={classes.scrollBody}>
        {isLoading && (
          <>
            <MUISkeleton variant={'rectangular'} height={'100px'} style={{ margin: '5px 0px' }} />
            <MUISkeleton variant={'rectangular'} height={'100px'} style={{ margin: '5px 0px' }} />
            <MUISkeleton variant={'rectangular'} height={'100px'} style={{ margin: '5px 0px' }} />
            <MUISkeleton variant={'rectangular'} height={'100px'} style={{ margin: '5px 0px' }} />
            <MUISkeleton variant={'rectangular'} height={'100px'} style={{ margin: '5px 0px' }} />
          </>
        )}

        {!isLoading &&
          searched.posts?.map((item: IEsPosts, idx: number) => {
            const postIndex = selectedPosts?.findIndex((v) => v.postId === item.postId);
            return (
              <InViewWrapper key={item.postId}>
                <PostAndCollectionCard
                  postType={item.postType}
                  cardData={{
                    description: item?.topics?.description?.snippet,
                    heading: item?.topics?.heading?.snippet,
                    postId: item?.postId,
                  }}
                  postpreview1={() => onPostPreview(item.postId, item.postType)}
                  endActionBtn={
                    <Checkbox
                      onClick={(event) => {
                        event.stopPropagation();
                        onPostsSelect(postIndex, item, idx);
                      }}
                      checked={postIndex >= 0}
                    />
                  }
                />
              </InViewWrapper>
            );
          })}
        {!isLoading &&
          searched.collections?.map((item: ICollectionsList, idx: number) => {
            const collectionIndex = selectedCollections?.findIndex((v) => v.subCollectionId === item.collectionId);
            return (
              <InViewWrapper key={item.collectionId}>
                <PostAndCollectionCard
                  postType="post_collection"
                  cardData={item as any}
                  postpreview1={() => onCollectionPreview(item.collectionId)}
                  endActionBtn={
                    <Checkbox
                      onClick={(event) => {
                        event.stopPropagation();
                        onCollectionsSelect(collectionIndex, item, idx);
                      }}
                      checked={collectionIndex >= 0}
                    />
                  }
                />
              </InViewWrapper>
            );
          })}
      </div>
      {selectedCollections.length + selectedPosts.length ? (
        <PannelFooter
          customStyle={classes.footerStyle}
          handleAdd={onAddSelection}
          handleCancel={onBack}
          buttonOneTitle="Cancel"
          buttonTwoTitle="Add"
        />
      ) : null}
    </div>
  );
}
