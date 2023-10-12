import React, { useEffect, useState } from 'react';
import { getConditionsHistoryLists } from '../DiagnosticCondition.functions';
import { useStyles } from '../DiagnosticCondition.styles';
import { IConditionHistoryProp } from '../DiagnosticCondition.types';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import MUISkeleton from '../../../LibraryComponents/MUISkeleton/MUISkeleton';
import ReportHistoryCard from '../../ReportPanel/Components/ReportHistoryCard/ReportHistoryCard';
import { NothingToShow } from '../../ProfileManagement/HistorySummary/HistorySummary.svg';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useFetchUserName } from '../../../../Common/Common.hooks';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

export default function ConditionHistory(props: IConditionHistoryProp) {
  const { panel, selectedClient, setActiontype, setSelectedCondition, selectedCondition, modifedBiomarkers } = props;
  const { classes } = useStyles(props);
  const commonClass = useCommonStyles();
  const { id: panelId } = useCurrentPanel();
  const [historyList, setHistoryList] = useState<any>([]);
  const [updatedByNames, setUpdatedByNames] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { fetchMultipleUserNames } = useFetchUserName();

  useEffect(() => {
    callGetReportHistory(props);
  }, [selectedClient]);

  const callGetReportHistory = async (props) => {
    if (!selectedClient) return;
    setIsLoading(true);
    const response = await getConditionsHistoryLists(
      panelId,
      props,
      `${selectedCondition.ConditionId}~${selectedCondition.StageId}`
    );
    setIsLoading(false);
    let historyData = response.sort((a: any, b: any) => {
      return a?.updated_on &&
        b?.updated_on &&
        new Date(a.updated_on).toString() !== 'Invalid Date' &&
        new Date(b.updated_on).toString() !== 'Invalid Date'
        ? new Date(b.updated_on).getTime() - new Date(a.updated_on).getTime()
        : -1;
    });
    let newData = historyData.map((element) => ({
      ...element,
      explanation: (modifedBiomarkers || {})[element?.explanation] || element?.explanation,
    }));
    setHistoryList(newData || []);

    if (!response?.length) return;
    setIsLoading(true);
    const updatedByNamesRes = await fetchMultipleUserNames((response || [])?.map((id) => id?.updated_by));
    setIsLoading(false);
    setUpdatedByNames(updatedByNamesRes || {});
  };

  const handleBack = () => {
    setActiontype('DECISION');
    setSelectedCondition(null);
  };

  return (
    <div className={classes.rootContainer}>
      <PageHeader handleBack={handleBack} headerContent="History" />
      <div className={classes.scrollBody}>
        {isLoading ? (
          <>
            <MUISkeleton animation="wave" variant="rectangular" height="120px" width="100%" />
            <MUISkeleton animation="wave" variant="rectangular" height="120px" width="100%" />
            <MUISkeleton animation="wave" variant="rectangular" height="120px" width="100%" />
          </>
        ) : (
          <>
            {!isLoading && historyList && historyList?.length === 0 && (
              <div className={classes.nothingToShow}>
                <NothingToShow />
                <p className={`${commonClass.body17Medium} ${classes.noHistoryColor}`}>No edit history!</p>
              </div>
            )}
            {historyList?.map((data: any) => (
              <ReportHistoryCard
                discription={data?.explanation}
                updatedBy={data?.updated_by}
                action={data?.status}
                updatedOn={data?.updated_on}
                updatedByName={updatedByNames[data?.updated_by] || ''}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
