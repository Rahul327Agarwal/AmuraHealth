import { debounce, Fab, IconButton } from '@mui/material';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { useDFGoBack } from '../../../../DisplayFramework/Events/DFEvents';
import { setSelectedCardInSummary } from '../../../../DisplayFramework/State/Slices/DashboardSlice';
import { doesUserHaveViewAccess } from '../../../../Utilities/AccessPermissions';
import MUISkeleton from '../../../LibraryComponents/MUISkeleton/MUISkeleton';
import { ArchieveIcon, ArchieveIcon2, BackArrowIcon, PlusIcon, SearchIcon } from '../Report.svg';
import ConfirmWithReasonDrawer from '../Components/ConfirmWithReasonDrawer/ConfirmWithReasonDrawer';
import ReportsCard from '../Components/ReportCard/ReportCard';
import { TReportMenuTypes } from '../Components/ReportCard/ReportsCard.types';
import ReportAddEdit from '../ReportAddEdit/ReportAddEdit';
import { IEditReport } from '../ReportAddEdit/ReportAddEdit.types';
import ReportPDFGenerator from '../ReportView/ReportPDFGenerator/ReportPDFGenarator';
import { callQueryFromDB } from './../../../../Common/Common.functions';
import { IRootState } from './../../../../DisplayFramework/State/store';
import PageHeader from './../../../LibraryComponents/PageHeader/PageHeader';
import SearchField from './../../../LibraryComponents/SearchField/SearchField';
import {
  getBiomarkerOptionLabel,
  getBiomarkerOptionValue,
  getCurrentReport,
  getReportsLists,
  postReportsAPI,
  sampledata,
} from './Reports.functions';
import { useStyles } from './Reports.styles';
import { IOption, IProps, IReports } from './Reports.types';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { useFetchUserName } from '../../../../Common/Common.hooks';

const Reports = (props: IProps) => {
  const { panel, childEventTrigger, selectedClient, sessions, registerEvent, unRegisterEvent } = props;
  const selectedCardInSummary = useSelector((state: IRootState) => state.dashboard.selectedCardInSummary);
  const componentRef = useRef();
  const [reports, setReports] = useState<Array<IReports>>([]);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [editData, setEditData] = useState<IEditReport>(null);
  const [showAddReport, setShowAddReport] = useState(false);
  const [showAllReports, setShowAllReports] = useState(false);
  const [deactivation, setDeactivation] = useState({
    open: false,
    reportId: '',
  });
  const [bioIdsOptions, setBioIdsOptions] = useState<Array<IOption>>([]);
  const [bioUnitIdOptions, setBioUnitIdOptions] = useState<Array<IOption>>([]);
  const [createdBy, setCreatedBy] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const MemoPDFGenerator = memo(ReportPDFGenerator);
  const [printedData, setPrintedData] = useState<any>(sampledata);
  const [showPage, setShowPage] = useState('show');
  const { classes } = useStyles({ showSearch });
  const { fetchMultipleUserNames } = useFetchUserName();
  const goBack = useDFGoBack();
  const { id: panelId } = useCurrentPanel();

  const accessPermissionsForThisClient = useSelector(
    (state: IRootState) => state.accessPermissions.accessPermissionsForThisClient
  );
  let checkAccessForClick = doesUserHaveViewAccess(accessPermissionsForThisClient, 'ReportEntry', 'ReportEntry');

  const searchedReports = useMemo(() => {
    const value = search.toLowerCase();
    let reportsList = [...reports];
    reportsList = reportsList.sort((a, b) => {
      const dateA = a?.createdOn ? new Date(a.createdOn).getTime() : 0;
      const dateB = b?.createdOn ? new Date(b.createdOn).getTime() : 0;
      // return dateA - dateB;
      return dateB - dateA;
    });
    return reportsList.filter(({ labName }) => labName?.toLowerCase().includes(value));
  }, [reports, search]);

  const sortedSearchedReports = useMemo(() => {
    return searchedReports?.sort((a, b) => {
      try {
        return new Date(b.reportDate).getTime() - new Date(a.reportDate).getTime();
      } catch {
        return 0;
      }
    });
  }, [searchedReports]);

  let subscription: any;
  const dispatch = useDispatch();
  useEffect(() => {
    callGetReportsLists(props);
    subscription = registerEvent(props.selectedClient.client_id, 'pms-ql-biomarker-reports', () => {
      callGetReportsLists(props);
    });
    return () => {
      unRegisterEvent(subscription);
    };
  }, [selectedClient]);

  useEffect(() => {
    (async () => {
      const biomarkerOptions = await callQueryFromDB(panelId, sessions, 'BIOMARKER_ID');
      if (biomarkerOptions) {
        const options = biomarkerOptions.map((data) => ({
          label: getBiomarkerOptionLabel(data?.lov_name_id, data?.group_name, data?.type),
          value: getBiomarkerOptionValue(data?.lov_name_id, data?.group_name, data?.type),
        }));
        setBioIdsOptions(options);
      }
      const biomarkerUnitOptions = await callQueryFromDB(panelId, sessions, 'BIOMARKER_UNIT_ID');
      if (biomarkerUnitOptions) {
        const options = biomarkerUnitOptions.map((data) => ({ label: data?.lov_name_id, value: data?.lov_name_id }));
        setBioUnitIdOptions(options);
      }
    })();
  }, []);

  useEffect(() => {
    if (selectedCardInSummary === 'biomarkers') setShowPage('show');
  }, [selectedCardInSummary]);

  const callGetReportsLists = async (props) => {
    if (!selectedClient) return;
    setIsLoading(true);
    const response = await getReportsLists(panelId, props);
    setIsLoading(false);
    setReports(JSON.parse(JSON.stringify(response || [])));

    if (!response?.length) return;
    let createdUserIds = [];
    response.forEach(({ createdBy }) => {
      if (createdBy) {
        createdUserIds.push(createdBy);
      }
    });
    setIsLoading(true);
    const createdByName = await fetchMultipleUserNames([...new Set(createdUserIds)]);
    setIsLoading(false);
    setCreatedBy(createdByName || {});
  };

  const handleDownloadPDF = useReactToPrint({
    content: () => componentRef.current,
  });

  const onThreeDotActionChange = async (action: TReportMenuTypes, currData: any) => {
    if (!currData) return;
    switch (action) {
      case 'DOWNLOAD':
        let reportData = await getCurrentReport(panelId, props, currData.reportId);
        setPrintedData({
          ...currData,
          biomarkers: reportData?.biomarkers || [],
          reportDate: new Date(currData.reportDate),
          sampleDate: new Date(currData.sampleDate),
        });
        setTimeout(handleDownloadPDF, 1000);
        return;
      case 'EDIT':
        let reportData2 = await getCurrentReport(panelId, props, currData.reportId);
        setShowAddReport(true);

        setEditData({
          ...currData,
          biomarkers: reportData2?.biomarkers || [],
          reportDate: new Date(currData.reportDate),
          sampleDate: new Date(currData.sampleDate),
        });
        return;
      case 'VIEW_EDIT_HISTORY':
        childEventTrigger(null, null, 'onViewReport', {
          rendarScreen: 'REPORT_HISTORY',
          reportId: currData.reportId,
        });
        return;
      case 'DEACTIVATE':
        setDeactivation({ open: true, reportId: currData.reportId });
        return;
      case 'ACTIVATE':
        (async () => {
          const payload = { action: 'ACTIVATE', reportId: currData.reportId };
          await postReportsAPI(props, payload, panelId);
        })();
        return;
    }
  };

  const closeReportPage = () => {
    dispatch(setSelectedCardInSummary(''));
    setShowPage('dontShow');
    goBack('S');
  };
  const onDeactivationClose = async () => {
    setDeactivation({ open: false, reportId: '' });
  };
  const handleBacktoReports = async () => {
    setShowAddReport(false);
    setEditData(null);
  };

  const onReportSelect = (data: IReports) => {
    if (!data) return;
    childEventTrigger(null, null, 'onViewReport', {
      rendarScreen: 'REPORT_VIEW',
      ...data,
      bioIdsOptions: bioIdsOptions,
      bioUnitIdOptions: bioUnitIdOptions,
    });
  };

  const debounceSearchFun: Function = debounce(setSearch, 500);

  switch (showPage) {
    case 'show':
      return (
        <>
          {showAddReport ? (
            <ReportAddEdit
              bioIdsOptions={bioIdsOptions}
              bioUnitIdOptions={bioUnitIdOptions}
              editData={editData}
              handleBack={handleBacktoReports}
              selectedClient={selectedClient}
              sessions={sessions}
              panel={props?.panel}
            />
          ) : (
            <div className={classes.rootContainer}>
              <PageHeader
                startAdornment={
                  <span className={classes.backArrow} onClick={closeReportPage}>
                    <BackArrowIcon />
                  </span>
                }
                headerContent="Reports"
              />
              <div className={classes.searchBar}>
                <IconButton
                  onClick={() => {
                    setShowSearch((pre) => !pre);
                    setSearch('');
                    setShowAllReports(false);
                  }}
                >
                  <SearchIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setShowAllReports((pre) => !pre);
                    setShowSearch(false);
                    setSearch('');
                  }}
                >
                  {showAllReports ? <ArchieveIcon2 /> : <ArchieveIcon />}
                </IconButton>
              </div>
              {showSearch ? (
                <SearchField value={search} autoFocus placeholder={'Search Report'} handleSearch={debounceSearchFun} />
              ) : null}
              <div className={classes.scrollBody}>
                {isLoading ? (
                  <>
                    <MUISkeleton
                      animation="wave"
                      variant="rectangular"
                      height="135px"
                      width="100%"
                      style={{ margin: '20px 0px' }}
                    />
                    <MUISkeleton
                      animation="wave"
                      variant="rectangular"
                      height="135px"
                      width="100%"
                      style={{ margin: '20px 0px' }}
                    />
                    <MUISkeleton
                      animation="wave"
                      variant="rectangular"
                      height="135px"
                      width="100%"
                      style={{ margin: '20px 0px' }}
                    />
                  </>
                ) : (
                  sortedSearchedReports?.map((data) => {
                    if (!data.isActive && !showAllReports) return null;
                    return (
                      <ReportsCard
                        key={data.reportId}
                        labName={data.labName}
                        reportDate={data.reportDate}
                        createdBy={data.createdBy}
                        createdByName={createdBy[data.createdBy] || ''}
                        createdOn={data.createdOn}
                        reasonForDeactivation={data.reasonForDeactivation}
                        isActive={Boolean(data.isActive)}
                        onClick={() => onReportSelect(data)}
                        onThreeDotAction={(action) => onThreeDotActionChange(action, data)}
                        isSelected={false}
                      />
                    );
                  })
                )}
              </div>
              <Fab
                onClick={() => {
                  if (checkAccessForClick) setShowAddReport(true);
                }}
                className={`${checkAccessForClick ? classes.addButton : classes.addButtonDisable}`}
              >
                <PlusIcon />
              </Fab>
              {deactivation.open && (
                <ConfirmWithReasonDrawer
                  open={deactivation.open}
                  onClose={onDeactivationClose}
                  reportId={deactivation.reportId}
                  sessions={sessions}
                  selectedClient={selectedClient}
                />
              )}
              <div className={classes.hidden}>
                <MemoPDFGenerator
                  ref={componentRef}
                  biomarkerData={printedData?.biomarkers}
                  isGrouped={false}
                  reportDate={printedData?.reportDate}
                  sampleDate={printedData?.sampleDate}
                  labName={printedData?.labName}
                />
              </div>
            </div>
          )}
        </>
      );
    default:
      return <></>;
  }
};

export default Reports;
