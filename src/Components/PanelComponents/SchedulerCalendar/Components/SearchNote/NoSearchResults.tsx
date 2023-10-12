import React from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import MUIButton  from '../../../../LibraryComponents/MUIButton/MUIButton';
import { NoSearchIcon } from '../../../../SVGs/Common';
import { useStyles } from './SearchNote.styles';

const NoSearchResults = (props: any) => {
  const { classes } = useStyles(props);
  const commanClass = useCommonStyles();

  return (
    <div className={classes.noSearchWrapper}>
      <div className={classes.spaceBetween}>
        <span className={`${commanClass.caption12Medium} ${classes.results}`}>0 results found</span>
        <MUIButton size="small" className={`${commanClass.caption12Medium} ${classes.clear}`} onClick={props.clearFilter ? props.clearFilter : () => {}}>
          Clear
        </MUIButton>
      </div>
      <div className={classes.noSearch}>
        <div className={classes.wrap}>
          <NoSearchIcon />
          <span className={`${classes.span} ${commanClass.body15Medium}`}>No result found!</span>
          <span className={`${commanClass.body15Regular} ${classes.helperText}`}>
            Please check for the spellings (or) try changing filters if you applied any.
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoSearchResults;
