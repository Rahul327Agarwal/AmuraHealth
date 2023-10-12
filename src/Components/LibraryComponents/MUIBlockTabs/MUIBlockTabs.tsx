import { IconButton } from '@mui/material';
import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { ThreeDotIcon } from '../../SVGs/Common';
import ThreeDotMenu from '../ThreeDotMenu/ThreeDotMenu';
import { TabsStyled, TabStyled, useStyles } from './MUIBlockTabs.styles';
import { IProps, TabContentProps } from './MUIBlockTabs.types';

const TabContent = (props: TabContentProps) => {
  const { classes, commonClasses, tabName, isBlackDot, isRedDot, isBlueDot } = props;
  return (
    <>
      <div className={classes.botBox}>
        <span data-blackdot={isBlackDot} className={classes.dotIcon} />
        <span data-bluedot={isBlueDot} className={classes.dotIcon} />
        <span data-reddot={isRedDot} className={classes.dotIcon} />
      </div>
      <div className={`${commonClasses.body15Medium} ${classes.tabLabel}`}>{tabName}</div>
    </>
  );
};

export default function MUIBlockTabs(props: IProps) {
  const { tabOptions, activeTab, threeDotOption, handleThreeDot, onTabChange, onTabClick, customStyle, ...restProps } = props;

  const memoTabOptions = useMemo(() => {
    return tabOptions.reduce((pre, curr) => {
      if (curr.tabId === activeTab.tabId) {
        pre.splice(1, 0, curr);
        // return [curr,...pre]
      } else {
        pre.push(curr);
      }
      return pre;
    }, []);
  }, [tabOptions, activeTab]);
  const { classes } = useStyles(restProps);
  const commonClasses = useCommonStyles();
  const tabRef = useRef(null);

  const handleChange = (_, value) => {};

  return (
    <div className={`${classes.rootTabsContainer} ${customStyle}`}>
      <TabsStyled ref={tabRef} selectionFollowsFocus={true} value={false} onChange={handleChange} variant="scrollable" scrollButtons={false}>
        {memoTabOptions.map((data) => (
          <div
            className={classes.liststylecustom}
            onClick={() => {
              const container = tabRef?.current?.children[1];          
              if (container) {
                container.scrollLeft = -100; // Adjust the scroll distance as needed
              } 
              onTabClick(data);
            }}
          >
            <TabStyled
              key={data.tabId}
              // key={0}
              disableFocusRipple
              tabIndex={-1}
              // value={data.tabId}
              // TODO: selected props throws error
              selected={data.tabId === activeTab.tabId}
              label={<TabContent classes={classes} commonClasses={commonClasses} tabName={data.tabName} {...restProps} />}
            />
          </div>
        ))}
      </TabsStyled>
      {handleThreeDot && threeDotOption ? (
        <ThreeDotMenu
          isDivider
          options={threeDotOption}
          handleClick={handleThreeDot}
          customStyle={classes.threeDotMenuStyle}
          renderButton={
            <IconButton className={classes.threeDoticon}>
              <ThreeDotIcon />
            </IconButton>
          }
        />
      ) : null}
    </div>
  );
}
