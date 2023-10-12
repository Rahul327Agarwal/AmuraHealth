import { IconButton } from '@mui/material';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { PMS_LOCALE } from '../../../Utils';
import ErrorToaster from './../../../Common/ErrorToaster';
import MUIDrawer from './../../LibraryComponents/MUIDrawer/MUIDrawer';
import MUITabs from './../../LibraryComponents/MUITabs/MUITabs';
import ModalBox from './../../LibraryComponents/ModalBox/ModalBox';
import PageHeader from './../../LibraryComponents/PageHeader/PageHeader';
import PannelFooter from './../../LibraryComponents/PannelFooter/PannelFooter';
import AccountDetails from './AccountDetails/AccountDetails';
import FoodAndHealth from './FoodAndHealth/FoodAndHealth';
import { LogoutRed, RightArrowIcon, ThreeDotIcons } from './ProfileManagement.svg';
// import { foodAndHealth } from "./FoodAndHealth/FoodAndHealth.functions";
import { useDFGoBack } from '../../../DisplayFramework/Events/DFEvents';
import { BackArrowIcon } from './ProfileManagement.svg';
import Personal from './Personal/Personal';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import {
  AccountDetail,
  PROFILE_TABS,
  callCitiesAPI,
  callCountriesAPI,
  callTimeZoneAPI,
  defaultPersonal,
  foodAndHealth,
  getPersonalProfileData,
  postPersonalData,
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
  const { injectComponent, registerEvent, sessions, selectedClient, unRegisterEvent, panel, childEventTrigger } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const { id: panelId } = useCurrentPanel();
  const [profileEditable, setProfileEditable] = useState(false);
  const [activeTab, setActiveTab] = useState<profileTabsType>(PROFILE_TABS[0]);

  const [openConfirmDrawer, setOpenConfirmDrawer] = useState(false);
  const [openActionDrawer, setOpenActionDrawer] = useState(false);

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

  const [showPopUp, setShowPopUp] = useState(false);

  const profileImage = `${import.meta.env.VITE_DP_URL}${sessions?.user?.id}/profile-pic.png`;
  const profileName = `${personalAPIState.Salutation || ''} ${personalAPIState.FirstName || ''} ${
    personalAPIState.LastName || ''
  }`;
  const firstName = `${personalAPIState.FirstName || ''}`;
  const lastName = `${personalAPIState.LastName || ''}`;
  const Email = `${accountDetailsAPIState.EMail || ''}`;
  const profileUsername = '';

  // ---

  const goBack = useDFGoBack();

  // ---

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
      registerEvent && registerEvent(sessions?.user?.id, 'pms-ql-user', async () => await getPersonalProfileDataCall());
    return () => {
      unRegisterEvent && unRegisterEvent(myCustomerSubscription);
    };
  }, []);

  const getPersonalProfileDataCall = async () => {
    const response = await getPersonalProfileData(panelId, props, sessions?.user?.id);
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
  const handleCancelModal = () => {
    setShowPopUp(false);
  };
  const handleSaveModal = () => {
    handleLogout();
  };
  const handleUpdate = async () => {
    var { personalError, isValid } = validatePersonalFields(personalState);
    if (!isValid) {
      setPersonalError(JSON.parse(JSON.stringify(personalError)));
      ErrorToaster(`Please Enter the required values`, panelId, 'error');
    }
    var { accountDetailsError, isValid } = validateAccountDetails(accountDetailsState);
    if (!isValid) {
      setAccountDetailsError(JSON.parse(JSON.stringify(accountDetailsError)));
      ErrorToaster(`Please Enter the required values`, panelId, 'error');
    }
    await postPersonalData(panelId, props, sessions?.user?.id, {
      ...personalState,
      ...accountDetailsState,
      ...healthAndFoodState,
    });
    setProfileEditable(false);
    setAccountDetailsError(AccountDetail);
    return;
  };
  const handleCancel = () => setOpenConfirmDrawer(true);

  const handleLogout = () => {
    localStorage.removeItem('UserLoggedIn');
    window.location.href = '/login';
  };
  const handleEditHistory = () => {
    childEventTrigger('MyList', 'MyList', 'HistorySummary', {
      //patientId: "",
      //clientData: "",
    });
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
            setAccountDetailsError={setAccountDetailsError}
          />
        );
    }
  };

  return (
    <div className={classes.mainProfileContainer}>
      <PageHeader
        startAdornment={
          <IconButton
            onClick={() => {
              if (profileEditable) {
                handleCancel();
              } else {
                goBack();
              }
            }}
          >
            <BackArrowIcon />
          </IconButton>
        }
        endAdornment={
          <IconButton onClick={() => setOpenActionDrawer(true)}>{!profileEditable ? <ThreeDotIcons /> : null}</IconButton>
        }
        headerContent={profileEditable ? 'Edit Profile' : 'Profile'}
      />
      <MemoProfileHeader
        selectedClient={selectedClient}
        sessions={sessions}
        myPatientId={sessions?.user?.id}
        profileImage={profileImage}
        profileEditable={profileEditable}
        setProfileEditable={(data: any) => setProfileEditable(data)}
        name={profileName.trim()}
        username={profileUsername}
        firstname={firstName}
        lastname={lastName}
        email={Email}
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
      <MUIDrawer drawerPadding="32px" open={openActionDrawer} anchor={'bottom'} handleClose={() => setOpenActionDrawer(false)}>
        <div className={classes.menuButton} onClick={() => setShowPopUp(true)}>
          <span className={`${commonClasses.body15Regular} label`}>{<LogoutRed />} Logout</span>
          <span>{<RightArrowIcon />}</span>
        </div>
      </MUIDrawer>
      <ModalBox
        panelWidth={panel?.width}
        open={showPopUp}
        handleClose={handleCancelModal}
        modalTitle={'Logout'}
        buttonConfig={[
          {
            text: PMS_LOCALE.translate('Cancel'),
            variant: 'text',
            onClick: handleCancelModal,
          },
          {
            text: PMS_LOCALE.translate('Confirm'),
            variant: 'contained',
            onClick: handleSaveModal,
          },
        ]}
      >
        <div className={classes.modalWrapper}>Are you sure you want to Logout?</div>
      </ModalBox>
    </div>
  );
}
