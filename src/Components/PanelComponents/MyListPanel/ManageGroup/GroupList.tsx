import React, { useEffect, useState } from 'react';
import ErrorToaster from '../../../../Common/ErrorToaster';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import ThreeDotMenu from '../../../LibraryComponents/ThreeDotMenu/ThreeDotMenu';
import { AlphabeticalSortIcon, AlphabeticalSortIcon2, NaturalSortIcon, NaturalSortIcon2 } from '../MyListPanel.svg';
import { sortGroupsByDateofCreation } from './ManageGroup.function';
import { useStyles } from './ManageGroup.styles';
import { IProps } from './ManageGroup.types';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

const GroupList = (props: IProps) => {
  const { setAction, groupData, handleActionTab, myListGroups, handleBack, onSetActiveGroup, reportessListType } = props;
  const commonClass = useCommonStyles();
  const { id: panelId } = useCurrentPanel();
  const { classes } = useStyles(props);
  const [groupedData, setGroupedData] = useState([]);
  const [groups, setGroups] = useState(groupData);
  const [sortingOrder, setSortingOrder] = useState('NaturalSort');

  useEffect(() => {
    setGroups(groupData);
  }, [groupData]);

  useEffect(() => {
    let sortedGroups = [...groups];
    if (groups.length) {
      sortedGroups = sortGroupsByDateofCreation(groups);
    }
    setGroupedData(sortedGroups);
  }, [groups]);
  useEffect(() => {
    console.log('mylist groups changed', myListGroups);
    if (myListGroups.length) {
      setGroups(myListGroups);
    }
  }, [myListGroups]);

  const tabOptions = [
    { label: 'Edit', value: 'Edit' },
    { label: 'Delete', value: 'Delete' },
  ];
  const onAddGroup = () => {
    if (groupedData.length < 2) {
      setAction({ screen: 'ADDGROUP', payload: {} });
    } else {
      ErrorToaster('Only 2 groups can be added', panelId, 'error');
    }
  };

  const sortingGroups = (sortingCriteria) => {
    if (sortingCriteria === 'AlphabeticalSort') {
      let GroupDataCopy = JSON.parse(JSON.stringify(myListGroups));
      GroupDataCopy.sort((a, b) => {
        var textA = a.groupName.toUpperCase();
        var textB = b.groupName.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      setGroupedData(GroupDataCopy);
      setSortingOrder('AlphabeticalSort');
    } else {
      setGroupedData(groups);
      setSortingOrder('NaturalSort');
    }
  };
  const handleSetActiveGroup = (value) => {
    onSetActiveGroup(value);
  };
  return (
    <div className={classes.listWrap}>
      <PageHeader
        handleBack={handleBack}
        headerContent={'Groups Setting'}
        endAdornment={
          <div className={classes.sortingicons}>
            <div onClick={() => sortingGroups('AlphabeticalSort')}>
              {sortingOrder === 'AlphabeticalSort' ? <AlphabeticalSortIcon2 /> : <AlphabeticalSortIcon />}
            </div>
            <div onClick={() => sortingGroups('NaturalSort')}>
              {sortingOrder === 'NaturalSort' ? <NaturalSortIcon2 /> : <NaturalSortIcon />}
            </div>
          </div>
        }
      />
      <div className={classes.GroupCards}>
        {groupData.length <= 3 && !reportessListType && (
          <div
            className={`${classes.header} ${commonClass.body15Medium} ${
              groupData.length <= 3 ? classes.bgDark : classes.bgLight
            }`}
            onClick={onAddGroup}
          >
            + Add Group
          </div>
        )}
        {groupedData.length > 0 &&
          groupedData?.map((data, index) => {
            return (
              <div className={classes.listingWrap} key={index} onClick={(e) => handleSetActiveGroup(data)}>
                <div className={classes.tabBarWrapper}>
                  <span className={classes.headerIcon}>{data.shortName}</span>
                  <span className={`${commonClass.body15Medium} ${classes.tabText}`}>{data.groupName}</span>
                </div>
                {!reportessListType && (
                  <ThreeDotMenu options={tabOptions} handleClick={(option) => handleActionTab(option, data, index)} />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default GroupList;
