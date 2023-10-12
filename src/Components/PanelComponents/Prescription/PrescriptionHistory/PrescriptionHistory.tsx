import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { downloadPrescription, fetchPrescription, handlePrescriptionFilter } from './PrescriptionHistory.function';
import { historyPrescriptionStyles } from './PrescriptionHistory.styles';
import { historyPrescriptionProps } from './PrescriptionHistory.types';
// import PanelHeader from '../LibraryComponents/PanelHeaderForWhite/PanelHeader';
// import Search from './../../../LibraryComponents/Search';
import { Fab } from '@mui/material';
import { useDFGoBack } from '../../../../DisplayFramework/Events/DFEvents';
import IndeterminateLoader from '../../../LibraryComponents/InderminateLoader/InderminateLoader';
import PanelHeader from '../../../LibraryComponents/PanelHeaderForWhite/PanelHeaderForWhite';
import SearchField from '../../../LibraryComponents/SearchField/SearchField';
import { BackArrowIcon, PlusIcon } from '../../../SVGs/Common';
import PrescriptionHistoryListNew from './PrescriptionHistoryList/PrescriptionHistoryListNew';
export default function PrescriptionHistory(props: historyPrescriptionProps) {
  const { sessions, selectedClient, patientId, registerEvent, unRegisterEvent, topicSnippetClick, openDiagnosticCondition } =
    props;

  const prescriptionList = useSelector((state: IRootState) => state.dashboard.prescriptionList);
  const dispatch = useDispatch();
  const { classes } = historyPrescriptionStyles();
  const [searchValue, setSearchValue] = useState('');
  const [loadignFlag, setLoadingFlag] = useState(true);
  const [filteredPrescriptionList, setFilteredPrescriptionList] = useState(prescriptionList);
  const [isPanelScrolled, setIsPanelScrolled] = useState(false);

  const setScrollTop = (scrollTop) => (scrollTop) => scrollTop <= 0 ? setIsPanelScrolled(false) : setIsPanelScrolled(true);

  const goBack = useDFGoBack();

  let eventSubscription: any;
  useEffect(() => {
    fetchPrescription(sessions, selectedClient, patientId, dispatch, setFilteredPrescriptionList, setLoadingFlag);
    eventSubscription = registerEvent(patientId, 'pms-prescription-s3-upload', () => {
      fetchPrescription(sessions, selectedClient, patientId, dispatch, setFilteredPrescriptionList, setLoadingFlag);
    });
    return () => {
      unRegisterEvent(eventSubscription);
    };
  }, []);
  return (
    <div className={classes.historyContainer}>
      {loadignFlag && <IndeterminateLoader panelWidth={props?.panel?.width} />}
      <div className={classes.searchFieldWrap}>
        <PanelHeader
          title="All Prescriptions"
          injectComponent={<BackArrowIcon onClick={() => goBack('S')} />}
          isShadow={isPanelScrolled}
        />
      </div>
      <div className={`${classes.searchbar} ${classes.searchFieldWrap}`}>
        <SearchField
          handleSearch={(e: any) => {
            handlePrescriptionFilter(e, setSearchValue, prescriptionList, setFilteredPrescriptionList);
          }}
          placeholder="Search for prescription"
          // searchValue={searchValue}
          // handleOnBlur={() => {}}
        />
      </div>
      <div className={classes.prescriptionList} onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}>
        {!loadignFlag && (
          <PrescriptionHistoryListNew
            patientId={patientId}
            downloadPrescription={downloadPrescription}
            prescriptionList={filteredPrescriptionList}
            topicSnippetClick={topicSnippetClick}
            sessions={sessions}
            selectedClient={selectedClient}
          />
        )}
      </div>
      {/* <div className={classes.footer1}>
        <Fab
          onClick={() => {
            if (openDiagnosticCondition) {
              openDiagnosticCondition();
            }
          }}
          className={classes.addButton}
        >
          {<PlusIcon />}
        </Fab>
      </div> */}
    </div>
  );
}
