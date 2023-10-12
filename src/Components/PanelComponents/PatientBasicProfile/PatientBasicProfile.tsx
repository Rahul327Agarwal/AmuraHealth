import React, { memo, useCallback, useEffect, useState } from 'react';
import { IclientData, IPatientBasicProfile } from './PatientBasicProfile.types';
import PageHeader from '../../LibraryComponents/PageHeader/PageHeader';
import { useStyles } from './PatientBasicProfile.styles';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { useDFEvent, useDFGoBack } from '../../../DisplayFramework/Events/DFEvents';
import { clientData, getPersonalProfileData } from './PatientBasicProfile.functions';
import { getFirstLetters } from '../../../Common/Common.functions';
import { EditIcon, LocationIcon, PersonIcon } from './PatientBasicProfile.svg';
import { CachedAvatar } from '../../LibraryComponents/Avatar/CachedAvatar';
import { ClockIconInEditHistory } from '../PatientDetailedProfile/PatientDetailedProfile.svg';
import IndeterminateLoader from '../../LibraryComponents/InderminateLoader/InderminateLoader';
import MUISkeleton from '../../LibraryComponents/MUISkeleton/MUISkeleton';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';

const PatientBasicProfile = (props: IPatientBasicProfile) => {
  const { injectComponent, registerEvent, sessions, selectedClient, patientId, unRegisterEvent, panel, setAction } = props;
  const childEventTrigger = useDFEvent();
  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const commonClasses = useCommonStyles();
  const goBack = useDFGoBack();

  const [personalState, setPersonalState] = useState<any>(clientData);

  const [isLoading, setIsLoading] = useState(true);

  const profileImage = `${import.meta.env.VITE_DP_URL}${patientId}/profile-pic.png`;

  const onBack = () => {
    goBack('S');
  };
  const getPersonalProfileDataCall = async () => {
    setIsLoading(true);
    const response = await getPersonalProfileData(panelId, props, patientId, setIsLoading);
    const { personalResponse, healthAndFoodResponse, accountDetailsResponse } = response || {};
    if (personalResponse) {
      setPersonalState(personalResponse);
    }
  };

  useEffect(() => {
    let myCustomerSubscription: any;
    (async () => await getPersonalProfileDataCall())();
    myCustomerSubscription =
      registerEvent && registerEvent(patientId, 'pms-ql-user', async () => await getPersonalProfileDataCall());
    return () => {
      unRegisterEvent && unRegisterEvent(myCustomerSubscription);
    };
  }, []);

  const handleEditHistory = () => {
    childEventTrigger('HistorySummary', {
      sourceComponent: 'PersonalImageSection',
    });
  };
  const handleEditIcon = () => {
    setAction('EDIT_VIEW');
  };
  return (
    <>
      {isLoading && (
        <>
          <MUISkeleton
            animation="wave"
            variant="circular"
            height="70px"
            width="70px"
            style={{ margin: '50px auto 20px auto', borderRadius: '50%' }}
          />
          <MUISkeleton animation="wave" variant="rectangular" height="120px" width="100%" style={{ marginBottom: '8px' }} />
          <MUISkeleton animation="wave" variant="rectangular" height="120px" width="100%" style={{ marginBottom: '8px' }} />
          <MUISkeleton animation="wave" variant="rectangular" height="120px" width="100%" style={{ marginBottom: '8px' }} />
          <MUISkeleton animation="wave" variant="rectangular" height="160px" width="100%" style={{ marginBottom: '8px' }} />
          <MUISkeleton animation="wave" variant="rectangular" height="120px" width="100%" style={{ marginBottom: '8px' }} />
        </>
      )}
      {!isLoading && (
        <div className={classes.mainContainer}>
          <PageHeader
            customStyle={classes.headerStyle}
            handleBack={onBack}
            headerContent={'Profile Details'}
            endAdornment={
              <div className={classes.iconsContainer}>
                <span onClick={handleEditHistory} className={`${classes.editHistoryOptionCon} ${commonClasses.caption12Medium}`}>
                  <ClockIconInEditHistory />
                </span>
                <span onClick={handleEditIcon} className={`${classes.editHistoryOptionCon} ${commonClasses.caption12Medium}`}>
                  <EditIcon />
                </span>
              </div>
            }
          />
          <div className={classes.profileImageBox}>
            <CachedAvatar className={classes.profileAvatar} src={profileImage}>
              {getFirstLetters(`${personalState.FirstName}` + ' ' + `${personalState.LastName}`)}
            </CachedAvatar>
          </div>
          <div className={classes.scrollBody}>
            <div className={`${classes.marginBottom}`}>
              <div className={classes.contentWithIconContainer}>
                <PersonIcon />
                <div className={classes.eachFields}>
                  <span className={`${commonClasses.body15Regular} ${classes.marginB8}`}>Title</span>
                  <span className={`${commonClasses.body17Regular} ${classes.wordBreaks}`}>
                    {personalState.Salutation || '-'}
                  </span>
                </div>
              </div>
            </div>

            <div className={`${classes.marginBottom} ${classes.marginleft}`}>
              <div className={classes.eachFields}>
                <span className={`${commonClasses.body15Regular} ${classes.marginB8}`}>First name</span>
                <span className={`${commonClasses.body17Regular} ${classes.wordBreaks}`}>{personalState.FirstName || '-'}</span>
              </div>
            </div>
            <div className={`${classes.marginBottom} ${classes.marginleft}`}>
              <div className={classes.eachFields}>
                <span className={`${commonClasses.body15Regular} ${classes.marginB8}`}>Last name</span>
                <span className={`${commonClasses.body17Regular} ${classes.wordBreaks}`}>{personalState.LastName || '-'}</span>
              </div>
            </div>
            <div className={`${classes.marginBottom} ${classes.marginleft}`}>
              <div className={classes.eachFields}>
                <span className={`${commonClasses.body15Regular} ${classes.marginB8}`}>Country</span>
                <span className={`${commonClasses.body17Regular} ${classes.wordBreaks}`}>{personalState.Country || '-'}</span>
              </div>
            </div>
            <div className={classes.marginBottom}>
              <div className={classes.contentWithIconContainer}>
                <LocationIcon />
                <div className={classes.eachFields}>
                  <span className={`${commonClasses.body15Regular} ${classes.marginB8}`}>City</span>
                  <span className={`${commonClasses.body17Regular} ${classes.wordBreaks}`}>{personalState.City || '-'}</span>
                </div>
              </div>
            </div>
            <div className={`${classes.marginBottom} ${classes.marginleft}`}>
              <div className={classes.eachFields}>
                <span className={`${commonClasses.body15Regular} ${classes.marginB8}`}>Time Zone</span>
                <span className={`${commonClasses.body17Regular} ${classes.wordBreaks}`}>
                  {personalState.TimeZoneName || '-'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientBasicProfile;
