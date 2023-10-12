import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { PMS_LOCALE } from '../../../Utils';
// import { SearchIcon } from "../../LibraryComponentsNew/SVGNew/SearchIcon";
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { ChatSearchIcon as SearchIcon } from '../../SVGs/ChatSearch';
import { useStyles } from './PanelHeader.styles';
import { IProps } from './PanelHeader.types';
export default function PanelHeader(props: IProps) {
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  const {
    title,
    iconTray,
    injectComponent,
    loadingFlag,
    subComponent,
    showBorder,
    showSearch,
    searchComponent,
    besideHeader,
    isSearchIocn,
    handleShowSerach,
    headerSubComponents,
    headerSubComponent2,
    subTitle,
  } = props;

  return (
    <div className={classes.background}>
      <div className={`${classes.headerContainer} ${showBorder ? classes.borderBottom : ''}`}>
        {showSearch ? (
          <>{searchComponent}</>
        ) : (
          <>
            {' '}
            <div className={classes.injectContainer}>{injectComponent}</div>
            <div className={classes.titleContainer}>
              <span className={classes.titleText} title={title}>
                {PMS_LOCALE.translate(title)}
              </span>
              {subTitle && <span className={`${classes.subTitle} ${commonClasses.caption12Regular}`}>{subTitle}</span>}
              {besideHeader && <span className={classes.iconCon}>{besideHeader}</span>}
            </div>
            <div className={classes.loaderContainer}>
              <div className={classes.loaderContainerIcons}>
                {loadingFlag ? <CircularProgress className={classes.loader} /> : null}
                {headerSubComponents}
                {isSearchIocn ? (
                  <span className={`${classes.loader}${classes.pointer}`} onClick={() => handleShowSerach()}>
                    <SearchIcon />
                  </span>
                ) : null}
              </div>
              {headerSubComponent2}
            </div>
            {iconTray}
          </>
        )}
      </div>
      {subComponent}
    </div>
  );
}
