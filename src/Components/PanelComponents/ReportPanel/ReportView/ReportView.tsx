import { format } from 'date-fns';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useDFGoBack } from '../../../../DisplayFramework/Events/DFEvents';
import { doesUserHaveClickAccess, doesUserHaveViewAccess } from '../../../../Utilities/AccessPermissions';
import { BackArrowIcon, PageDownloadIcon } from '../../../SVGs/Common';
import BiomarkerCard from '../Components/BiomarkerCard/BiomarkerCard';
import ConfirmWithReasonDrawer from '../Components/ConfirmWithReasonDrawer/ConfirmWithReasonDrawer';
import { OPTIONS_REPORTS } from '../Components/ReportCard/ReportCard';
import { TReportMenuTypes } from '../Components/ReportCard/ReportsCard.types';
import { getAttachmentAPI, getFileDetails } from '../ReportAddEdit/ReportAddEdit.functions';
import { getCurrentReport } from '../Reports/Reports.functions';
import { IRootState } from './../../../../DisplayFramework/State/store';
import IndeterminateLoader from './../../../LibraryComponents/InderminateLoader/InderminateLoader';
import RadioGroup from './../../../LibraryComponents/MUIRadioGroup/MUIRadioGroup';
import PageHeader from './../../../LibraryComponents/PageHeader/PageHeader';
import ThreeDotMenu from './../../../LibraryComponents/ThreeDotMenu/ThreeDotMenu';
import ReportPDFGenerator from './ReportPDFGenerator/ReportPDFGenarator';
import { FILTER_OPTIONS, RADIO_OPTIONS } from './ReportView.functions';
import { useStyles } from './ReportView.styles';
import { FilterIcon } from './ReportView.svg';
import { IReportViewHome } from './ReportView.types';
import MUISkeleton from '../../../LibraryComponents/MUISkeleton/MUISkeleton';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

const MemoPDFGenerator = memo(ReportPDFGenerator);

export default function ReportView(props: IReportViewHome) {
  const { panel, childEventTrigger, reportId, registerEvent, unRegisterEvent } = props;

  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const commonClasses = useCommonStyles();
  const componentRef = useRef();

  const accessPermissionsForThisClient = useSelector(
    (state: IRootState) => state.accessPermissions.accessPermissionsForThisClient
  );
  let checkDownloadViewAccess: any = doesUserHaveClickAccess(accessPermissionsForThisClient, 'ReportEntry', 'ReportEntry.5A');
  let checkEditViewAccess: any = doesUserHaveClickAccess(accessPermissionsForThisClient, 'ReportEntry', 'ReportEntry.5B');
  let checkHistoryAccess: any = doesUserHaveClickAccess(accessPermissionsForThisClient, 'ReportEntry', 'ReportEntry.5C');
  let checkActiveViewAccess: any = doesUserHaveClickAccess(accessPermissionsForThisClient, 'ReportEntry', 'ReportEntry.5D');
  let checkDeactiveViewAccess: any = doesUserHaveClickAccess(accessPermissionsForThisClient, 'ReportEntry', 'ReportEntry.5E');
  let checkAccessForClick = doesUserHaveViewAccess(accessPermissionsForThisClient, 'ReportEntry', 'ReportEntry.5A');

  const [selectedUnit, setSelectedUnit] = useState('reportUnit');
  const [deactivation, setDeactivation] = useState({ open: false, reportId: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('default');
  const [fileDetails, setFileDetails] = useState([]);
  const [reportDetails, setReportDetails] = useState<any>({});
  const [biomarkers, setBiomarkers] = useState<any>([]);
  const goBack = useDFGoBack();

  const { sortedBiomarker, isGrouped } = useMemo(() => {
    setIsLoading(false);
    let sortedBiomarker = [];
    let isGrouped = false;
    if (selectedFilter === 'default') {
      sortedBiomarker = biomarkers;
      isGrouped = false;
    } else if (selectedFilter === 'alphabetical') {
      sortedBiomarker = [...biomarkers].sort((a, b) => a?.biomarkerId?.localeCompare(b?.biomarkerId));
      isGrouped = false;
    } else if (selectedFilter === 'bySystem') {
      let groupObj = {};
      let groupArr = [];
      biomarkers.forEach((data) => {
        if (groupObj[data?.groupName]) groupObj[data?.groupName].push(data);
        else groupObj[data?.groupName] = [data];
      });
      for (const [groupName, groupData] of Object.entries(groupObj)) {
        groupArr.push({ groupName, groupData });
      }
      sortedBiomarker = groupArr;
      isGrouped = true;
    }

    return { sortedBiomarker, isGrouped };
  }, [biomarkers, selectedFilter]);

  let subscription: any;

  useEffect(() => {
    setFileDetails([]);
    setSelectedFilter('default');
    getReportData(props);
    subscription = registerEvent(`${props.selectedClient.client_id}/${reportId}`, 'pms-ql-biomarker-reports', () => {
      getReportData(props);
      getFileDetails(
        props?.selectedClient?.client_id,
        reportId,
        props?.sessions,
        props?.selectedClient,
        setIsLoading,
        setFileDetails
      );
    });
    getFileDetails(
      props?.selectedClient?.client_id,
      reportId,
      props?.sessions,
      props?.selectedClient,
      setIsLoading,
      setFileDetails
    );
    return () => {
      unRegisterEvent(subscription);
    };
  }, [reportId]);

  const getReportData = async (props) => {
    if (!(reportId && props.selectedClient)) return;
    setIsLoading(true);
    const response = await getCurrentReport(panelId, props, reportId);
    setIsLoading(false);
    setReportDetails(response || {});
    if (Object.keys(response).length == 0) return;
    if (response?.biomarkers) {
      setBiomarkers(response?.biomarkers || []);
    }
  };
  const handleDownloadPDF = useReactToPrint({
    content: () => componentRef.current,
  });

  const onThreeDotActionChange = (action: TReportMenuTypes) => {
    switch (action) {
      case 'DOWNLOAD':
        handleDownloadPDF();
        return;
      case 'EDIT':
        childEventTrigger(null, null, 'EditReport', {
          bioIdsOptions: props.bioIdsOptions,
          bioUnitIdOptions: props.bioUnitIdOptions,
          editData: {
            reportId,
            reportDate: new Date(reportDetails.reportDate),
            sampleDate: new Date(reportDetails.sampleDate),
            labName: reportDetails.labName,
            biomarkers: reportDetails?.biomarkers || [],
          },
          handleBack: () => {
            goBack('S');
          },
        });
        return;
      case 'VIEW_EDIT_HISTORY':
        childEventTrigger('MyWork', 'MyWork', 'onViewReport', {
          rendarScreen: 'REPORT_HISTORY',
          reportId,
          handleBack: () => {
            goBack('S');
          },
        });
        return;
      case 'DEACTIVATE':
        setDeactivation({ open: true, reportId });
        return;
    }
  };

  const onDeactivationClose = async () => {
    setDeactivation({ open: false, reportId: '' });
    goBack('S');
  };

  return (
    <div className={classes.rootContainer}>
      <PageHeader
        headerContent={reportDetails?.labName}
        startAdornment={
          <span
            className={classes.backArrow}
            onClick={() => {
              goBack('S');
            }}
          >
            <BackArrowIcon />
          </span>
        }
        customStyle={classes.headerStyle}
        bottomContainer={
          <span className={`${commonClasses.caption12Regular} ${classes.secondryText}`}>
            Sample: {format(new Date(reportDetails?.sampleDate || new Date()), 'dd/MM/yyyy')} | Report:{' '}
            {format(new Date(reportDetails?.reportDate || new Date()), 'dd/MM/yyyy')}
          </span>
        }
        bottomContainerStyle={classes.pageheaderStyle}
        endAdornment={
          <div className={classes.dflex}>
            <ThreeDotMenu
              isDivider
              options={OPTIONS_REPORTS(
                checkDownloadViewAccess,
                checkEditViewAccess,
                checkHistoryAccess,
                checkActiveViewAccess,
                checkDeactiveViewAccess,
                reportDetails?.isActive
              )}
              handleClick={onThreeDotActionChange}
            />
            {/* <IconButton>{CrossIcon}</IconButton> */}
          </div>
        }
      />
      <div className={classes.scrollBody}>
        <div className={classes.flex}>
          <div className={classes.bgdark}>
            <RadioGroup
              variant={'radio'}
              flexDirection="row"
              options={RADIO_OPTIONS}
              value={selectedUnit}
              setValue={setSelectedUnit}
            />
          </div>
          <div className={classes.center}>
            <ThreeDotMenu
              isDivider
              options={FILTER_OPTIONS}
              selectedOption={selectedFilter}
              handleClick={setSelectedFilter}
              renderButton={<FilterIcon />}
            />
          </div>
        </div>
        {isLoading && (
          <>
            <MUISkeleton
              animation="wave"
              variant="rectangular"
              height="100px"
              width="100%"
              style={{ marginBottom: '8px', marginTop: '20px' }}
            />
            <MUISkeleton
              animation="wave"
              variant="rectangular"
              height="100px"
              width="100%"
              style={{ marginBottom: '8px', marginTop: '20px' }}
            />
          </>
        )}
        <div>
          {sortedBiomarker.map((data: any) => {
            const groupName = isGrouped ? data?.groupName : '';
            const groupData = isGrouped ? data?.groupData : [data];
            return <BiomarkerCard groupName={groupName} groupData={groupData} />;
          })}
          {/* <span className={classes.download} onClick={() => {}}>
            {pageDownloadIcon} Download Jawaharreport.pdf
          </span> */}
        </div>
        {fileDetails?.length > 0 ? (
          fileDetails.map((fileDetails) => (
            <div className={classes.pointerDiv} onClick={() => getAttachmentAPI(panelId, fileDetails?.url, props)}>
              {<PageDownloadIcon />}
              <span className={`${commonClasses.caption12Regular} ${classes.secondryText}`}>{`  ${fileDetails?.name}`}</span>
            </div>
          ))
        ) : (
          <></>
        )}
        <div>
          {/* <span className={`${classes.heading} ${commonClasses.body17Medium}`}>Laboratory details</span>
          <span className={`${classes.labName} ${commonClasses.body15Regular}`}>Micro Health Laboratories</span> */}
        </div>
      </div>
      {deactivation.open && (
        <ConfirmWithReasonDrawer
          open={deactivation.open}
          onClose={onDeactivationClose}
          reportId={deactivation.reportId}
          sessions={props.sessions}
          selectedClient={props.selectedClient}
        />
      )}
      <div className={classes.hidden}>
        <MemoPDFGenerator
          ref={componentRef}
          labName={reportDetails?.labName}
          biomarkerData={sortedBiomarker}
          isGrouped={isGrouped}
          reportDate={new Date(reportDetails?.reportDate || new Date())}
          sampleDate={new Date(reportDetails?.sampleDate || new Date())}
        />
      </div>
    </div>
  );
}
