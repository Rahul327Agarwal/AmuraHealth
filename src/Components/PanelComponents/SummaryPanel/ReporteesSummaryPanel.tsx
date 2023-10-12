import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ErrorToaster from '../../../Common/ErrorToaster';
import { setMyCustomerDetails, setSelectedCardInSummary } from '../../../DisplayFramework/State/Slices/DashboardSlice';
import { IRootState } from '../../../DisplayFramework/State/store';
import { doesUserHaveViewAccess } from '../../../Utilities/AccessPermissions';
import PageHeader from '../../LibraryComponents/PageHeader/PageHeader';
import { Roles, SocialPlatformIcon } from './SummaryPanel.svg';
import ProfileCard from './ProfileCard';
import StaffSummaryPanel from './SubSummaryPannel/StaffSummaryPanel';
import SubSummaryPannel from './SubSummaryPannel/SubSummaryPannel';
import { REPORTEES_THREEDOT_OP, checkSocialPlatformData, getData } from './SummaryPanel.function';
import { useStyles } from './SummaryPanel.styles';
import { EmptyPatient, IPatient, IProps } from './SummaryPanel.types';
import TopicCard from './TopicCard';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';

const ReporteesSummaryPanel = (props: IProps) => {
  const {
    patientId,
    selectedClient,
    registerEvent,
    unRegisterEvent,
    injectComponent,
    type,
    botData,
    selectedPanelName,
    setSelectedPanelName,
  } = props;
  const { classes } = useStyles();
  let summaryData = useSelector((state: IRootState) => {
    return state.dashboard.myCustomer;
  });
  const dispatch = useDispatch();
  const { id: panelId } = useCurrentPanel();
  const [summary, setSummary] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const education = summary?.Topics?.education;

  const accessPermissionsForThisClient = useSelector(
    (state: IRootState) => state.accessPermissions.accessPermissionsForThisClient
  );
  let roleToClient = useSelector((state: IRootState) => {
    return state.accessPermissions.roleToClient;
  });
  const checkShowAllOptions =
    roleToClient !== 'be7f1559-a300-4ad3-83fa-521c7845464a' &&
    roleToClient !== 'L1_dataentry' &&
    roleToClient !== 'L2_dataentry' &&
    roleToClient !== 'L3_dataentry';

  const socialPlatformData = checkSocialPlatformData(summary?.Synopsis || {});
  let myCustomerSubscription;
  useEffect(() => {
    setIsLoading(true);
    if (patientId) {
      summaryData = EmptyPatient;
      dispatch(setMyCustomerDetails(EmptyPatient));
      if (type !== 'bot') {
        getData(panelId, patientId, props, dispatch, type, true)
          .then((res: IPatient) => {
            if (res?.ID || res?.Synopsis?.UserName) {
              setSummary(res);
              return;
            } else {
              setSummary(EmptyPatient);
              ErrorToaster('Something went wrong!', panelId, 'error');
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
      if (type === 'bot') {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
    myCustomerSubscription = registerEvent(patientId, 'pms-ql-mypatient', async () => {
      getData(panelId, patientId, props, dispatch, type, true).then((res: IPatient) => {
        if (res?.ID || res?.Synopsis?.UserName) {
          console.log('res', res);
          setSummary(res);
          return;
        } else {
          setSummary(EmptyPatient);
          ErrorToaster('Something went wrong!', panelId, 'error');
        }
      });
    });
    return () => {
      unRegisterEvent(myCustomerSubscription);
    };
  }, [patientId, selectedClient?.tenant_id]);

  const handleClick = (value: string) => {
    setSelectedPanelName(value);
    dispatch(setSelectedCardInSummary(value));
    props.topicSnippetClick(value);
  };

  if (!summary?.ID && !summary?.Synopsis?.UserName) {
    return <></>;
  }

  return (
    <div className={classes.summaryPanelWrap}>
      {!isLoading && (
        <>
          <PageHeader customStyle={classes.headerStyle} headerContent={'Summary'} />

          <div className={classes.summaryBody}>
            <div className={classes.basicProfile} onClick={() => props.topicSnippetClick('PatientBasicProfile')}>
              <ProfileCard userId={summary?.ID ?? patientId ?? ''} data={summary} />
            </div>
            {checkShowAllOptions ? (
              <SubSummaryPannel onSnippetClick={() => props.topicSnippetClick('PatientDetailedProfile')} data={summary} />
            ) : (
              <div className={classes.horizonatalLineStyle} />
            )}
            <div className={classes.featureWrap}>
              {/* {doesUserHaveViewAccess(accessPermissionsForThisClient, 'Summary', 'Summary.3N') && (
                <TopicCard
                  icon={<Education />}
                  heading={'Education'}
                  description={education?.Snippet || 'Add Education'}
                  handleClick={() => {
                    handleClick('Education');
                  }}
                  selected={selectedPanelName === 'Education'}
                />
              )} */}
              <TopicCard
                heading={'Amura mission'}
                description={'No Data' || 'Add health objective'}
                handleClick={() => {
                  //handleClick(''); //'HealthObjective'
                }}
                selected={selectedPanelName === 'HealthObjective'}
                withoutIcon={true}
              />
              <TopicCard
                icon={<Roles />}
                heading={'Roles'}
                description={(summary?.Topics?.Roles?.amura ?? '') || 'Add Roles'}
                handleClick={() => {
                  handleClick('roles');
                }}
                selected={selectedPanelName === 'roles'}
              />
              {doesUserHaveViewAccess(accessPermissionsForThisClient, 'Summary', 'Summary.3L') && (
                <TopicCard
                  icon={<SocialPlatformIcon />}
                  heading={'Social platforms'}
                  description={socialPlatformData || '+ Add Details'}
                  handleClick={() => {
                    handleClick('SocialPlatforms');
                  }}
                  selected={selectedPanelName === 'SocialPlatforms'}
                />
              )}
              {/* {doesUserHaveViewAccess(accessPermissionsForThisClient, 'Summary', 'Summary.3M') && (
                <TopicCard
                  icon={<RegistrationSnippetIcon />}
                  heading={'Registration with professional bodies'}
                  description={summary?.Topics?.registration?.Snippet || '+ Add Details'}
                  handleClick={() => {
                    handleClick('RegistrationSnippet');
                  }}
                  selected={selectedPanelName === 'RegistrationSnippet'}
                />
              )} */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReporteesSummaryPanel;
