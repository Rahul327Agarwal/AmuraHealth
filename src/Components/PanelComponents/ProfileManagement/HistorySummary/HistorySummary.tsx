import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useDFGoBack } from '../../../../DisplayFramework/Events/DFEvents';
import { PMS_S3 } from '../../../../Utils';
import HistoryCard from './../../../LibraryComponents/HistoryCard/HistoryCard';
import PageHeader from './../../../LibraryComponents/PageHeader/PageHeader';
import {
  HistoryCard_Data,
  I_DETAILS_SECTION_OPTIONS,
  I_IMAGE_SECTION_OPTIONS,
  I_SOCIAL_PLATFORMS_OPTIONS,
} from './HistorySummary.functions';
import { useStyles } from './HistorySummary.styles';
import { NothingToShow } from './HistorySummary.svg';
import { IProps } from './HistorySummary.types';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { doesUserHaveViewAccess } from '../../../../Utilities/AccessPermissions';
import { optionsDetailsWithIDS } from '../../SummaryPanel/SubSummaryPannel/SubSummaryPannel.types';
import IndeterminateLoader from '../../../LibraryComponents/InderminateLoader/InderminateLoader';
import MUISkeleton from '../../../LibraryComponents/MUISkeleton/MUISkeleton';

const HistorySummary = (props: IProps) => {
  const { selectedClient, sessions, patientId, clientId, setActionType, childEventTrigger, sourceComponent } = props;
  const { classes } = useStyles();
  const commonClass = useCommonStyles();
  const [isLoading, setIsLoading] = useState(true);
  const goBack = useDFGoBack();

  const [historyCardData, setHistoryCardData] = useState([]);
  const accessPermissionsForThisClient = useSelector(
    (state: IRootState) => state.accessPermissions.accessPermissionsForThisClient
  );

  const getHistory = async (props: any) => {
    setIsLoading(true);
    let summaryHistory = await PMS_S3.getObject(
      `pms-ql-user/${selectedClient.client_id}/userProfileHistory.json`,
      import.meta.env.VITE_PLATFORM_BUCKET,
      {
        TenantId: selectedClient.tenant_id,
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: sessions.id_token,
        headers: {},
      }
    );
    if (!summaryHistory.Error) {
      return Promise.resolve(summaryHistory);
    }
    return Promise.reject({ history: [] });
  };

  let I_DETAILS_SECTION_OPTIONS_WITH_PERMISSIONS = I_DETAILS_SECTION_OPTIONS.filter((option) =>
    doesUserHaveViewAccess(accessPermissionsForThisClient, 'PatientBasicProfileDetails', optionsDetailsWithIDS[option])
  );

  useEffect(() => {
    getHistory(props)
      .then((res) => {
        if (res && res.history.length) {
          switch (sourceComponent) {
            case 'PersonalImageSection':
              setHistoryCardData(
                res?.history
                  ?.filter(
                    (item) =>
                      I_IMAGE_SECTION_OPTIONS.some((each) => each.toLowerCase() == item.label.toLowerCase()) &&
                      (item?.after || item?.before)
                  )
                  ?.sort((a: any, b: any) => {
                    return a?.updatedOn &&
                      b?.updatedOn &&
                      new Date(a.updatedOn).toString() !== 'Invalid Date' &&
                      new Date(b.updatedOn).toString() !== 'Invalid Date'
                      ? new Date(b.updatedOn).getTime() - new Date(a.updatedOn).getTime()
                      : -1;
                  })
              );
              break;
            case 'PersonalDetailsSection':
              setHistoryCardData(
                res?.history
                  ?.filter(
                    (item) =>
                      I_DETAILS_SECTION_OPTIONS_WITH_PERMISSIONS.some((each) => each.toLowerCase() == item.label.toLowerCase()) &&
                      (item?.after || item?.before)
                  )
                  ?.sort((a: any, b: any) => {
                    return a?.updatedOn &&
                      b?.updatedOn &&
                      new Date(a.updatedOn).toString() !== 'Invalid Date' &&
                      new Date(b.updatedOn).toString() !== 'Invalid Date'
                      ? new Date(b.updatedOn).getTime() - new Date(a.updatedOn).getTime()
                      : -1;
                  })
              );
              break;
            case 'SocialPlatformDetails':
              setHistoryCardData(
                res?.history
                  ?.filter(
                    (item) =>
                      I_SOCIAL_PLATFORMS_OPTIONS.some((each) => each.toLowerCase() == item.label.toLowerCase()) &&
                      (item?.after || item?.before)
                  )
                  ?.sort((a: any, b: any) => {
                    return a?.updatedOn &&
                      b?.updatedOn &&
                      new Date(a.updatedOn).toString() !== 'Invalid Date' &&
                      new Date(b.updatedOn).toString() !== 'Invalid Date'
                      ? new Date(b.updatedOn).getTime() - new Date(a.updatedOn).getTime()
                      : -1;
                  })
              );
              break;

            case 'HealthObjective':
              setHistoryCardData(
                res?.history
                  ?.filter((item) => item?.label === 'objective')
                  ?.sort((a: any, b: any) => {
                    return a?.updatedOn &&
                      b?.updatedOn &&
                      new Date(a.updatedOn).toString() !== 'Invalid Date' &&
                      new Date(b.updatedOn).toString() !== 'Invalid Date'
                      ? new Date(b.updatedOn).getTime() - new Date(a.updatedOn).getTime()
                      : -1;
                  })
              );
              break;

            default:
              setHistoryCardData(
                res?.history
                  ?.filter((item) => item?.label !== 'objective')
                  .sort((a: any, b: any) => {
                    return a?.updatedOn &&
                      b?.updatedOn &&
                      new Date(a.updatedOn).toString() !== 'Invalid Date' &&
                      new Date(b.updatedOn).toString() !== 'Invalid Date'
                      ? new Date(b.updatedOn).getTime() - new Date(a.updatedOn).getTime()
                      : -1;
                  })
              );
          }
          setIsLoading(false);
        }
      })
      .catch((err: any) => {
        console.log('summaryHistory error', err);
        setIsLoading(false);
        setIsLoading(false);
      });
  }, [sourceComponent]);
  return (
    <>
      <div className={classes.container}>
        <div className={classes.Headerwrapper}>
          <PageHeader
            handleBack={() => {
              goBack('S');
            }}
            isClearAll={false}
            headerContent="Edit history"
            handleClearAll={() => {}}
          />
        </div>
        {isLoading && (
          <>
            <MUISkeleton
              animation="wave"
              variant="rectangular"
              height="140px"
              width="100%"
              style={{ margin: '0px 16px 8px 16px' }}
            />
            <MUISkeleton
              animation="wave"
              variant="rectangular"
              height="140px"
              width="100%"
              style={{ margin: '0 16px 8px 16px' }}
            />
            <MUISkeleton
              animation="wave"
              variant="rectangular"
              height="140px"
              width="100%"
              style={{ margin: '0 16px 8px 16px' }}
            />
            <MUISkeleton
              animation="wave"
              variant="rectangular"
              height="140px"
              width="100%"
              style={{ margin: '0 16px 8px 16px' }}
            />
          </>
        )}

        {!isLoading && historyCardData?.length > 0 && (
          <div className={classes.cardWrap}>
            {historyCardData?.map((data, index) => {
              return <HistoryCard {...data} sessions={sessions} key={index} />;
            })}
          </div>
        )}
        {!isLoading && historyCardData && historyCardData?.length === 0 && (
          <div className={classes.nothingToShow}>
            <NothingToShow />
            <p className={`${commonClass.body17Medium} ${classes.noHistoryColor}`}>No edit history!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default HistorySummary;
