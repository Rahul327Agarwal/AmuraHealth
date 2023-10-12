import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDFGoBack } from '../../../../DisplayFramework/Events/DFEvents';
import { CrossIcon } from '../../ReporteesListView/SVGs';
import ReportHistoryCard from '../Components/ReportHistoryCard/ReportHistoryCard';
import { IReportViewHome } from '../ReportView/ReportView.types';
import PageHeader from './../../../LibraryComponents/PageHeader/PageHeader';
import { getReportHistoryLists } from './ReportEditHistory.functions';
import { useStyles } from './ReportEditHistory.styles';
import MUISkeleton from '../../../LibraryComponents/MUISkeleton/MUISkeleton';
import { useFetchUserName } from '../../../../Common/Common.hooks';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

export default function ReportEditHistory(props: IReportViewHome) {
  const { panel, reportId, selectedClient, registerEvent, unRegisterEvent } = props;
  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const [reportHistory, setReportHistory] = useState<any>([]);
  const [updatedByNames, setUpdatedByNames] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { fetchMultipleUserNames } = useFetchUserName();
  const goBack = useDFGoBack();

  const handleBack = () => goBack('S');

  let subscription: any;
  useEffect(() => {
    callGetReportHistory(props);
    subscription = registerEvent(`${props.selectedClient.client_id}/${reportId}`, 'pms-ql-biomarker-reports', () => {
      callGetReportHistory(props);
    });
    return () => {
      unRegisterEvent(subscription);
    };
  }, [reportId, selectedClient]);

  const callGetReportHistory = async (props) => {
    if (!(reportId && selectedClient)) return;
    setIsLoading(true);
    const response = await getReportHistoryLists(panelId, props);
    setIsLoading(false);
    let historyData = response.sort((a: any, b: any) => {
      return a?.updatedOn &&
        b?.updatedOn &&
        new Date(a.updatedOn).toString() !== 'Invalid Date' &&
        new Date(b.updatedOn).toString() !== 'Invalid Date'
        ? new Date(b.updatedOn).getTime() - new Date(a.updatedOn).getTime()
        : -1;
    });

    setReportHistory(historyData || []);

    if (!response?.length) return;
    let createdUserIds = [];
    response.forEach(({ createdBy }) => {
      if (createdBy) {
        createdUserIds.push(createdBy);
      }
    });
    setIsLoading(true);
    const updatedByNamesRes = await fetchMultipleUserNames([...new Set(createdUserIds)]);
    setIsLoading(false);
    setUpdatedByNames(updatedByNamesRes || {});
  };

  return (
    <div className={classes.rootContainer}>
      <PageHeader
        endAdornment={
          <IconButton onClick={handleBack}>
            <CrossIcon />
          </IconButton>
        }
        headerContent="Report histories"
      />
      <div className={classes.scrollBody}>
        {isLoading && (
          <>
            <MUISkeleton animation="wave" variant="rectangular" height="135px" width="100%" style={{ marginBottom: '8px' }} />
            <MUISkeleton animation="wave" variant="rectangular" height="135px" width="100%" style={{ marginBottom: '8px' }} />
            <MUISkeleton animation="wave" variant="rectangular" height="135px" width="100%" style={{ marginBottom: '8px' }} />
          </>
        )}
        {!isLoading &&
          reportHistory?.map((data) => (
            <ReportHistoryCard
              unitId={data?.unitId}
              value={data?.value}
              updatedBy={data?.updatedBy}
              action={data?.action}
              label={data?.label}
              updatedOn={data?.updatedOn}
              updatedByName={updatedByNames[data?.updatedBy] || ''}
            />
          ))}
      </div>
    </div>
  );
}
