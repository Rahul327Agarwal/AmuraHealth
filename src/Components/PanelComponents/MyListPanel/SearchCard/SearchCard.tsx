import React, { useEffect, useState } from 'react';
import { useStyles } from './SearchCard.styles';
import { IProps } from './SearchCard.types';
import { searchHistory } from './SearchCard.function';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import Token from '../../../LibraryComponents/MUIToken/MUIToken';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import SearchField from '../../../LibraryComponents/SearchField/SearchField';

const SearchCard = (props: IProps) => {
  const { handleBack } = props;
  const { classes } = useStyles();
  const commonClass = useCommonStyles();
  const [searchString, setSearchString] = useState('');
  const [recentSearch, setRecentSearch] = useState(searchHistory);
  const [swipeIn, setSwipeIn] = useState(false);
  const [swipeOut, setSwipeOut] = useState(false);
  React.useEffect(() => {
    setSwipeIn(true);
  });
  return (
    <div className={`${classes.searchCardWrap} ${swipeIn ? classes.swipeIn : ''} ${swipeOut ? classes.swipeOut : ''}`}>
      <div className={classes.backdrop}></div>
      <PageHeader
        handleBack={() => {
          handleBack();
        }}
        isClearAll={false}
        headerContent="Search"
        handleClearAll={() => {}}
      />
      <div className={classes.searchCardContent}>
        <SearchField autoFocus={true} placeholder="Search item" handleSearch={setSearchString} />
        <div className={classes.recentSearchWrap}>
          <p className={`${commonClass.body15Medium} ${classes.searchTitle}`}>Recent searches</p>
          <div className={classes.tokenWrap}>
            {recentSearch?.map((item, idx) => {
              return <Token key={idx} label={item} clickable={false} className={classes.tokenItem} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
