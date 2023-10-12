import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorToaster from '../../../Common/ErrorToaster';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';
import { doesUserHaveViewAccess } from '../../../Utilities/AccessPermissions';
import MUISkeleton from '../../LibraryComponents/MUISkeleton/MUISkeleton';
import PageHeader from '../../LibraryComponents/PageHeader/PageHeader';
import { setLoadSummary, setMyCustomerDetails } from './../../../DisplayFramework/State/Slices/DashboardSlice';
import { IRootState } from './../../../DisplayFramework/State/store';
import ThreeDotMenu from './../../LibraryComponents/ThreeDotMenu/ThreeDotMenu';
import ProfileCard from './ProfileCard';
import SubSummaryPannel from './SubSummaryPannel/SubSummaryPannel';
import {
  clickToCall,
  downloadFile,
  getData,
  sendMessageInWhatsApp,
  threeDotOption,
  threeDotOptionForBasicUser,
  threeDotOptionForLoggedInUser,
} from './SummaryPanel.function';
import { useStyles } from './SummaryPanel.styles';
import { EmptyPatient, IProps } from './SummaryPanel.types';
import TopicList from './TopicList';

const SummaryPanel = (props: IProps) => {
  const ref = React.useRef(null);
  const { classes } = useStyles();
  const [subSummaryLoaded, SetSubSummaryLoaded] = useState(false);
  let summaryData = useSelector((state: IRootState) => {
    return state.dashboard.myCustomer;
  });
  const loadSummary = useSelector((state: IRootState) => {
    return state.dashboard.loadSummary;
  });
  const dispatch = useDispatch();

  const summary = useMemo(() => {
    return JSON.parse(JSON.stringify(summaryData));
  }, [summaryData]);

  const [active, setActive] = useState(false);
  const accessPermissionsForThisClient = useSelector(
    (state: IRootState) => state.accessPermissions.accessPermissionsForThisClient
  );
  const {
    patientId,
    selectedClient,
    registerEvent,
    unRegisterEvent,
    sessions,
    injectComponent,
    type,
    botData,
    selectedPanelName,
    setSelectedPanelName,
  } = props;
  const loggedInUserInformation = useSelector((state: IRootState) => state.displayFrameWork.loggedInUserInformation);
  const { id: panelId } = useCurrentPanel();

  const handleShowEvent = () => {
    setActive(!active);
  };
  let myCustomerSubscription;
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setActive(false);
    }
  };

  useEffect(() => {
    (async () => {
      SetSubSummaryLoaded(false);
      document.addEventListener('mousedown', handleClickOutside);
      const isStaff = doesUserHaveViewAccess(accessPermissionsForThisClient, 'Summary', 'Summary.3H');

      const abortController = new AbortController();

      if (!patientId) {
        dispatch(setLoadSummary(false));
        return;
      }

      dispatch(setLoadSummary(true));
      dispatch(setMyCustomerDetails(EmptyPatient));

      if (type !== 'bot') {
        await getData(panelId, patientId, props, dispatch, type, isStaff, abortController.signal).finally(() => {
          dispatch(setLoadSummary(false));
        });
      }

      if (type === 'bot') {
        dispatch(setLoadSummary(false));
      }

      myCustomerSubscription = registerEvent(patientId, 'pms-ql-mypatient', async () => {
        await getData(panelId, patientId, props, dispatch, type, isStaff);
      });

      //
      return () => {
        unRegisterEvent(myCustomerSubscription);
        document.removeEventListener('mousedown', handleClickOutside);
        abortController.abort();
      };
    })();
  }, [patientId, selectedClient?.tenant_id, selectedClient?.roleId]);

  useEffect(() => {
    if (!loadSummary) {
      if (summary?.Error) {
        ErrorToaster('Something went wrong!', panelId, 'error');
      }
    }
  }, [loadSummary]);
  if (loadSummary) {
    return (
      <div className={classes.loaderWrapper}>
        <MUISkeleton variant={'rectangular'} height={'350px'} width={'90%'} style={{}} />
        <MUISkeleton variant={'rectangular'} height={'450px'} width={'90%'} style={{}} />
        <MUISkeleton variant={'rectangular'} height={'100%'} width={'90%'} style={{}} />
      </div>
    );
  }

  return (
    <div className={classes.summaryPanelWrap}>
      {!loadSummary && (
        <>
          <PageHeader
            customStyle={classes.headerStyle}
            headerContent={'Summary'}
            endAdornment={
              loggedInUserInformation?.id !== props.patientId && (
                <ThreeDotMenu
                  options={
                    loggedInUserInformation?.id === summary.ID
                      ? threeDotOptionForLoggedInUser
                      : loggedInUserInformation.roles.length === 0
                      ? threeDotOptionForBasicUser
                      : threeDotOption
                  }
                  handleClick={(value) => {
                    if (value == 'ViewClientProfile') {
                      props.topicSnippetClick('MyProfile');
                    } else if (value == 'cloudCalling') {
                      clickToCall(
                        `${sessions.user.mobile}`,
                        `${summaryData?.ID !== props?.sessions?.user?.id ? summaryData?.Synopsis?.Mobile || '' : ''}`,
                        panelId
                      );
                    } else if (value == 'chatOnWhatsapp') {
                      sendMessageInWhatsApp(
                        summaryData?.ID !== props?.sessions?.user?.id ? summaryData?.Synopsis?.Mobile || '' : ''
                      );
                    } else if (value == 'ExportDP') {
                      downloadFile(summaryData?.ID, sessions);
                    }
                  }}
                  isReverse={false}
                  isDivider={true}
                />
              )
            }
          />
          <div className={classes.summaryBody}>
            <div className={classes.basicProfile} onClick={() => props.topicSnippetClick('PatientBasicProfile')}>
              <ProfileCard
                userId={patientId || ''}
                data={summary}
                // onProfileHeaderClick={() => props.topicSnippetClick('PatientBasicProfile')}
              />
            </div>

            <SubSummaryPannel
              SetSubSummaryLoaded={SetSubSummaryLoaded}
              onSnippetClick={() => props.topicSnippetClick('PatientDetailedProfile')}
              data={summary}
            />

            {!summary?.Topics?.Error && subSummaryLoaded && (
              <TopicList
                data={summary}
                itemClicked={props.topicSnippetClick}
                selectedClient={selectedClient}
                patientId={patientId}
                setSelectedPanelName={setSelectedPanelName}
                selectedPanelName={''}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(SummaryPanel);
