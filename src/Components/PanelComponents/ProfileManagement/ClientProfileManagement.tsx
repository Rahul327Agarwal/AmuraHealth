import { memo, useCallback, useEffect, useState } from 'react';
import ErrorToaster from './../../../Common/ErrorToaster';
import MUIDrawer from './../../LibraryComponents/MUIDrawer/MUIDrawer';
import MUITabs from './../../LibraryComponents/MUITabs/MUITabs';
import PageHeader from './../../LibraryComponents/PageHeader/PageHeader';
import PannelFooter from './../../LibraryComponents/PannelFooter/PannelFooter';
import AccountDetails from './AccountDetails/AccountDetails';
import FoodAndHealth from './FoodAndHealth/FoodAndHealth';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { useDFGoBack } from '../../../DisplayFramework/Events/DFEvents';
import { BackArrowIcon } from '../../SVGs/Common';
import Personal from './Personal/Personal';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import {
  AccountDetail,
  callCitiesAPI,
  callCountriesAPI,
  callTimeZoneAPI,
  defaultPersonal,
  foodAndHealth,
  getPersonalProfileData,
  postPersonalData,
  PROFILE_TABS,
  validateAccountDetails,
  validatePersonalFields,
} from './ProfileManagement.functions';
import { useStyles } from './ProfileManagement.styles';
import {
  AccountDetailsType,
  FoodAndHealthType,
  IDefaultPersonalTypes,
  IProfileProps,
  profileTabsType,
} from './ProfileManagement.types';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';

const MemoProfileHeader = memo(ProfileHeader);

export default function ProfileManagement(props: IProfileProps) {
  const { injectComponent, registerEvent, sessions, selectedClient, patientId, unRegisterEvent, panel, childEventTrigger } =
    props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

  const [profileEditable, setProfileEditable] = useState(false);
  const [activeTab, setActiveTab] = useState<profileTabsType>(PROFILE_TABS[0]);
  const { id: panelId } = useCurrentPanel();
  const [openConfirmDrawer, setOpenConfirmDrawer] = useState(false);

  const [personalAPIState, setPersonalAPIState] = useState<IDefaultPersonalTypes>(defaultPersonal);
  const [personalState, setPersonalState] = useState<IDefaultPersonalTypes>(defaultPersonal);

  const [healthAndFoodAPIState, setHealthAndFoodAPIState] = useState<FoodAndHealthType>(foodAndHealth);
  const [healthAndFoodState, setHealthAndFoodState] = useState<FoodAndHealthType>(foodAndHealth);

  const [accountDetailsAPIState, setAccountDetailsAPIState] = useState<AccountDetailsType>(AccountDetail);
  const [accountDetailsState, setAccountDetailsState] = useState<AccountDetailsType>(AccountDetail);

  const [personalError, setPersonalError] = useState<IDefaultPersonalTypes>(defaultPersonal);
  const [accountDetailsError, setAccountDetailsError] = useState<AccountDetailsType>(AccountDetail);
  const [citiesOption, setCitiesOption] = useState([]);
  const [countriesOption, setCountriesOption] = useState([]);
  const [timezoneOption, setTimezoneOption] = useState([]);
  const [profileImage, setProfileImage] = useState(`${import.meta.env.VITE_DP_URL}${patientId}/profile-pic.png`);
  const profileName = `${personalAPIState.Salutation || ''} ${personalAPIState.FirstName || ''} ${
    personalAPIState.LastName || ''
  }`;
  const profileUsername = '';
  const firstName = `${personalAPIState.FirstName || ''}`;
  const lastName = `${personalAPIState.LastName || ''}`;
  const Email = `${accountDetailsAPIState.EMail || ''}`;

  const goBack = useDFGoBack();

  useEffect(() => {
    (async () => {
      const countries = await callCountriesAPI();
      if (countries) setCountriesOption(countries);
    })();
  }, []);

  useEffect(() => {
    if (personalState.CountryCode) {
      (async () => {
        const cities = await callCitiesAPI(personalState.CountryCode);
        if (cities) setCitiesOption(cities);
        const timezones = await callTimeZoneAPI(personalState.CountryCode);
        if (timezones) {
          setTimezoneOption(timezones);
          if (timezones.length === 1) {
            setPersonalState((pre) => ({
              ...pre,
              TimeZone: timezones[0].value,
              TimeZoneName: timezones[0].label,
            }));
          }
        }
      })();
    }
  }, [personalState.CountryCode]);

  useEffect(() => {
    let myCustomerSubscription: any;
    (async () => await getPersonalProfileDataCall())();
    myCustomerSubscription =
      registerEvent && registerEvent(patientId, 'pms-ql-user', async () => await getPersonalProfileDataCall());
    return () => {
      unRegisterEvent && unRegisterEvent(myCustomerSubscription);
    };
  }, []);

  const getPersonalProfileDataCall = async () => {
    const response = await getPersonalProfileData(panelId, props, patientId);
    const { personalResponse, healthAndFoodResponse, accountDetailsResponse } = response || {};
    if (personalResponse) {
      setPersonalAPIState(personalResponse);
      setPersonalState(personalResponse);
    }
    if (healthAndFoodResponse) {
      setHealthAndFoodAPIState(healthAndFoodResponse);
      setHealthAndFoodState(healthAndFoodResponse);
    }
    if (accountDetailsResponse) {
      setAccountDetailsAPIState(accountDetailsResponse);
      setAccountDetailsState(accountDetailsResponse);
    }
  };

  const handleDiscard = () => {
    setPersonalState({ ...personalAPIState });
    setHealthAndFoodState({ ...healthAndFoodAPIState });
    setAccountDetailsState({ ...accountDetailsAPIState });
    setProfileEditable(false);
    setPersonalError({
      Salutation: '',
      FirstName: '',
      LastName: '',
      Gender: 'Male',
      isModifiedGender: false,
      isUserTypedGender: false,
      MedicallyModifiedGender: '',
      userTypedGender: '',
      DateOfBirth: '',
      Nationality: '',
      CurrentResidence: '',
      City: '',
      Country: '',
      CountryCode: '',
      TimeZone: '',
      TimeZoneName: '',
      PreferredLanguages: [],
    });
    setAccountDetailsError({
      NickName: '',
      EMail: '',
      Mobile: '',
      whatsAppNumber: '',
      Password: '',
      referredBy: '',
      referredPersonRelation: '',
    });
    handleCloseDrawer();
  };

  const handleCloseDrawer = () => setOpenConfirmDrawer(false);
  const handleSaveModal = () => {
    handleLogout();
  };
  const handleUpdate = async () => {
    var { personalError, isValid } = validatePersonalFields(personalState);
    if (!isValid) {
      setPersonalError(JSON.parse(JSON.stringify(personalError)));
      return ErrorToaster(`Please Enter the required values`, panelId, 'error');
    }
    var { accountDetailsError, isValid } = validateAccountDetails(accountDetailsState);
    if (!isValid) {
      setAccountDetailsError(JSON.parse(JSON.stringify(accountDetailsError)));
      return ErrorToaster(`Please Enter the required values`, panelId, 'error');
    }
    const response = await postPersonalData(panelId, props, patientId, {
      ...personalState,
      ...accountDetailsState,
      ...healthAndFoodState,
    });
    setProfileEditable(false);
    setAccountDetailsError(AccountDetail);
    return;
  };

  const handleCancel = () => setOpenConfirmDrawer(true);

  const handleBackArrowClick = () => {
    if (profileEditable) {
      return handleCancel();
    }
    goBack('S');
  };

  const handleLogout = () => {
    localStorage.removeItem('UserLoggedIn');
    window.location.href = '/login';
  };
  const handleEditHistory = () => {
    childEventTrigger(null, null, 'HistorySummary', {
      sourceComponent: '',
    });
    // setActionType("EDIT_HISTORY");
  };
  const renderTabScreen = () => {
    switch (activeTab) {
      case PROFILE_TABS[0]:
        return (
          <Personal
            profileEditable={profileEditable}
            setPersonalState={setPersonalState}
            personalState={personalState}
            personalError={personalError}
            citiesOption={citiesOption}
            countriesOption={countriesOption}
            timezoneOption={timezoneOption}
            setPersonalError={setPersonalError}
          />
        );
      case PROFILE_TABS[1]:
        return (
          <FoodAndHealth
            setHealthAndFoodState={setHealthAndFoodState}
            healthAndFoodState={healthAndFoodState}
            sessions={sessions}
            selectedClient={selectedClient}
            profileEditable={profileEditable}
            setOpenConfirmDrawer={setOpenConfirmDrawer}
          />
        );
      case PROFILE_TABS[2]:
        return (
          <AccountDetails
            setAccountDetailsState={setAccountDetailsState}
            accountDetailsState={accountDetailsState}
            // sessions={sessions}
            // selectedClient={selectedClient}
            profileEditable={profileEditable}
            setOpenConfirmDrawer={setOpenConfirmDrawer}
            accountDetailsError={accountDetailsError}
            showRefer={true}
            setAccountDetailsError={setAccountDetailsError}
          />
        );
    }
  };

  return (
    <div className={classes.mainProfileContainer}>
      <PageHeader
        customStyle={classes.backButtonStyle}
        startAdornment={<BackArrowIcon className={classes.backArrowIcon} onClick={handleBackArrowClick} />}
        endAdornment={
          <span className={`${commonClasses.body15Medium} ${classes.editBtn}`} onClick={handleEditHistory}>
            Edit History
          </span>
        }
        headerContent={profileEditable ? 'Edit Profile' : 'Profile'}
      />
      <MemoProfileHeader
        selectedClient={selectedClient}
        sessions={sessions}
        myPatientId={patientId}
        profileImage={profileImage}
        profileEditable={profileEditable}
        setProfileEditable={useCallback((data) => setProfileEditable(data), [])}
        name={profileName.trim()}
        username={profileUsername}
        firstname={firstName}
        lastname={lastName}
        email={Email}
        setProfileImage={setProfileImage}
      />
      <MUITabs tabOptions={PROFILE_TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className={classes.wrap}>
        {renderTabScreen()}
        {profileEditable && (
          <PannelFooter
            customStyle={classes.pannelFooterStyle}
            handleAdd={handleUpdate}
            handleCancel={handleCancel}
            buttonOneTitle={'Cancel'}
            buttonTwoTitle={'Update'}
          />
        )}
      </div>

      <MUIDrawer open={openConfirmDrawer} anchor={'bottom'} handleClose={handleCloseDrawer} headerTitle={'Unsaved Changes'}>
        <div className={`${commonClasses.body15Regular} ${classes.warningMessage}`}>
          Your changes will be lost if you don't save them.
        </div>
        <PannelFooter
          customStyle={classes.warningFooterStyle}
          buttonOneProps={{ size: 'medium' }}
          buttonTwoProps={{ size: 'medium' }}
          handleAdd={handleDiscard}
          handleCancel={handleCloseDrawer}
          buttonOneTitle={'Cancel'}
          buttonTwoTitle={'Discard'}
        />
      </MUIDrawer>
    </div>
  );
}
