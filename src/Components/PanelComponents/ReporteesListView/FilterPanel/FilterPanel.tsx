import React, { useEffect, useState } from 'react';
import { useStyles } from './FilterPanel.styles';
import { IFilterPanel } from './FilterPanel.types';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import { IconButton } from '@mui/material';
import { AlphabeticalSortIcon, NaturalSortIcon } from '../../MyListPanel/MyListPanel.svg';
import TabList from '../../MyListPanel/ManageTab/TabList';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { useSelector } from 'react-redux';

export default function FilterPanel(props: IFilterPanel) {
  const { handleThreeDot, handleOnBack, onSetActiveTab, sessions } = props;
  const { classes } = useStyles();
  const { reporteesTabs } = useSelector((state: IRootState) => state.Reportees);

  const [isSorted, setIsSorted] = useState('NATURAL_SORT');
  const [sortedData, setSortedData] = useState(reporteesTabs);

  useEffect(() => {
    applySort(isSorted);
  }, [reporteesTabs]);

  const applySort = (order: string) => {
    const sortedTabs = [...reporteesTabs].sort((a: any, b: any) =>
      order === 'ALPHABETICAL_SORT' ? a.tabName.localeCompare(b.tabName) : a.sortingOrder - b.sortingOrder
    );
    setIsSorted(order);
    setSortedData(sortedTabs);
  };

  return (
    <div className={classes.mainContainer}>
      <PageHeader
        handleBack={handleOnBack}
        headerContent={'Filter Setting'}
        endAdornment={
          <div>
            <IconButton
              className={isSorted !== 'ALPHABETICAL_SORT' ? classes.active : classes.inactive}
              onClick={() => {
                if (isSorted !== 'ALPHABETICAL_SORT') {
                  applySort('ALPHABETICAL_SORT');
                }
              }}
            >
              {<AlphabeticalSortIcon />}
            </IconButton>
            <IconButton
              className={isSorted !== 'NATURAL_SORT' ? classes.active : classes.inactive}
              onClick={() => {
                if (isSorted !== 'NATURAL_SORT') {
                  applySort('NATURAL_SORT');
                }
              }}
            >
              {<NaturalSortIcon />}
            </IconButton>
          </div>
        }
      />
      <div className={classes.scrollBody}>
        <TabList
          noDots
          myListTabs={sortedData}
          handleThreeDot={handleThreeDot}
          onSetActiveTab={onSetActiveTab}
          sessions={sessions}
          reportessListType=""
        />
      </div>
    </div>
  );
}
