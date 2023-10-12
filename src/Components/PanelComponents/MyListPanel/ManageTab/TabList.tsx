import React, { useEffect, useState } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import ThreeDotMenu from '../../../LibraryComponents/ThreeDotMenu/ThreeDotMenu';
import { ITab } from '../MyListHome.types';
import { useStyles } from './ManageTab.styles';
import { IProps } from './ManageTab.types';
import { reorderNew } from './ManagerTab.functions';

export const DEFAULT_TAB = { tabId: 'All', tabName: 'All' };
const tabOptions = [
  { label: 'Edit', value: 'Edit' },
  { label: 'Delete', value: 'Delete' },
];
const TabList = (props: IProps) => {
  const { addButtonLabel, handleThreeDot, myListTabs, onSetActiveTab, onAddNewTab, noDots, reportessListType } = props;
  const commonClass = useCommonStyles();
  const { classes } = useStyles(props);
  const [orderedTabs, setOrderedTabs] = useState<Array<ITab>>([]);
  const [tabs, setTabs] = useState<Array<ITab>>(myListTabs);

  useEffect(() => {
    setOrderedTabs(tabs);
  }, [tabs]);

  useEffect(() => {
    if (myListTabs) {
      setTabs(myListTabs);
    }
  }, [myListTabs]);

  const handleSetActiveTab = (value: ITab) => {
    // const finaltabs = reorderNew(orderedTabs, value.sortingOrder);
    // setOrderedTabs(finaltabs);
    onSetActiveTab(value, orderedTabs);
  };
  return (
    <>
      {addButtonLabel && onAddNewTab && !reportessListType ? (
        <div className={classes.tabCardsHeader}>
          <div className={`${classes.header} ${commonClass.body15Medium}`} onClick={() => onAddNewTab(orderedTabs)}>
            {addButtonLabel}
          </div>
        </div>
      ) : null}
      <div className={classes.tabCards}>
        {orderedTabs?.map((data, index) => (
          <div className={classes.listingWrap}>
            <div className={classes.tabBarWrapper} onClick={(e) => handleSetActiveTab(data)}>
              {!noDots ? (
                <div className={classes.dotIcon}>
                  <span className={`${classes.dot} ${classes.blackDot}`}></span>
                  <span className={`${classes.dot} ${classes.blueDot}`}></span>
                  <span className={`${classes.dot} ${classes.redDot}`}></span>
                  <span className={`${classes.dot} ${classes.greyDot}`}></span>
                </div>
              ) : null}
              <span className={`${commonClass.body15Medium} ${classes.tabText}`}>{data.tabName}</span>
            </div>
            {!reportessListType && (
              <ThreeDotMenu options={tabOptions} handleClick={(option) => handleThreeDot(option, data, index)} usePopOver />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default TabList;
