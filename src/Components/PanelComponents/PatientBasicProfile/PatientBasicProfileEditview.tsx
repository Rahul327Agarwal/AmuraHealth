import { Avatar, IconButton } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { getFirstLetters } from '../../../Common/Common.functions';
import ErrorToaster from '../../../Common/ErrorToaster';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { useDFEvent, useDFGoBack } from '../../../DisplayFramework/Events/DFEvents';
import InputField from '../../LibraryComponents/InputField/InputField';
import MUIDrawer from '../../LibraryComponents/MUIDrawer/MUIDrawer';
import PageHeader from '../../LibraryComponents/PageHeader/PageHeader';
import PannelFooter from '../../LibraryComponents/PannelFooter/PannelFooter';
import Select from '../../LibraryComponents/Select/Select';
import ProfileCropper from '../ProfileManagement/ProfileCropper/ProfileCropper';
import { callUploadProfileImage } from '../ProfileManagement/ProfileHeader/ProfileHeader.functions';
import {
  SALUTATION_OPTIONS,
  callCitiesAPI,
  callCountriesAPI,
  callTimeZoneAPI,
  clientData,
  getPersonalProfileData,
  postPersonalData,
  removeProfileImage,
  validatePersonalFields,
} from './PatientBasicProfile.functions';
import { useStyles } from './PatientBasicProfile.styles';
import { EditWhite, LocationIcon, PersonIcon } from './PatientBasicProfile.svg';
import { IPatientBasicProfile, IclientData } from './PatientBasicProfile.types';
import MUISkeleton from '../../LibraryComponents/MUISkeleton/MUISkeleton';
import { PMS_S3 } from '../../../Utils';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';

const PatientBasicProfileEditView = (props: IPatientBasicProfile) => {
  const { injectComponent, registerEvent, sessions, selectedClient, patientId, unRegisterEvent, panel, setAction } = props;
  const childEventTrigger = useDFEvent();
  const { id: panelId } = useCurrentPanel();
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const goBack = useDFGoBack();
  const [countriesOption, setCountriesOption] = useState([]);
  const [citiesOption, setCitiesOption] = useState([]);
  const [timezoneOption, setTimezoneOption] = useState([]);
  const [personalState, setPersonalState] = useState<any>(clientData);
  const [personalStateInitial, setPersonalStateInitial] = useState<any>(clientData);
  const [openProfileCropper, setOpenProfileCropper] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [personalError, setPersonalError] = useState<IclientData>(clientData);
  const [openConfirmDrawer, setOpenConfirmDrawer] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(`${import.meta.env.VITE_DP_URL}${patientId}/profile-pic.png`);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);

  const handleEditProfileImage = () => setOpenProfileCropper(true);
  const onImageCropped = async (image: any) => {
    if (image) {
      setCroppedImage(image);
      setOpenProfileCropper(false);
      await callUploadProfileImage(panelId, props, patientId, image);
    }
  };

  const onRemoveImg = async () => {
    const isProfileImageRevmoved = await removeProfileImage(panelId, props, patientId, {});
    // setCroppedImage(null);
    // setOpenProfileCropper(false);
    isProfileImageRevmoved && setProfileImage('');
    setOpenProfileCropper(false);
  };

  const onCancel = () => {
    if (
      personalStateInitial.FirstName === personalState.FirstName &&
      personalStateInitial.LastName === personalState.LastName &&
      personalStateInitial.Salutation === personalState.Salutation &&
      personalStateInitial.City === personalState.City &&
      personalStateInitial.TimeZoneName === personalState.TimeZoneName &&
      personalStateInitial.Country === personalState.Country &&
      croppedImage === null
    ) {
      setAction('NORMAL_VIEW');
    } else {
      setOpenConfirmDrawer(true);
    }
  };
  const onBack = () => {
    if (
      personalStateInitial.FirstName === personalState.FirstName &&
      personalStateInitial.LastName === personalState.LastName &&
      personalStateInitial.Salutation === personalState.Salutation &&
      personalStateInitial.City === personalState.City &&
      personalStateInitial.TimeZoneName === personalState.TimeZoneName &&
      personalStateInitial.Country === personalState.Country &&
      croppedImage === null
    ) {
      setAction('NORMAL_VIEW');
    } else {
      setOpenConfirmDrawer(true);
    }
  };

  const handleCountry = useCallback((_: any, e: any) => {
    if (!e?.value || !e?.label) return;
    setPersonalState((pre: any) => ({
      ...pre,
      CountryCode: e.value,
      Country: e.label,
      City: e.label === pre.Country ? pre.City : '',
    }));
  }, []);

  const handleCity = useCallback((City: any) => {
    setPersonalState((pre: any) => ({ ...pre, City }));
  }, []);

  const handleTimeZoneName = useCallback((_: any, e: any) => {
    if (!e?.value || !e?.label) return;
    setPersonalState((pre: any) => ({
      ...pre,
      TimeZone: e?.value,
      TimeZoneName: e?.label,
    }));
  }, []);

  const handleLastName = useCallback((e: any) => {
    const LastName = e.target.value;
    setPersonalError((prev: any) => ({ ...prev, LastName: '' }));
    setPersonalState((pre: any) => ({ ...pre, LastName }));
  }, []);

  const handleSalutation = useCallback((Salutation: any) => {
    setPersonalState((pre: any) => ({ ...pre, Salutation }));
  }, []);

  const handleFirstName = useCallback((e: any) => {
    const FirstName = e.target.value;
    setPersonalError((prev: any) => ({ ...prev, FirstName: '' }));
    setPersonalState((pre: any) => ({ ...pre, FirstName }));
  }, []);

  const getPersonalProfileDataCall = async () => {
    setIsLoading(true);
    const response = await getPersonalProfileData(panelId, props, patientId, setIsLoading);
    const { personalResponse, healthAndFoodResponse, accountDetailsResponse } = response || {};
    if (personalResponse) {
      // setPersonalAPIState(personalResponse);
      setPersonalState(personalResponse);
      setPersonalStateInitial(personalResponse);
    }
    // if (healthAndFoodResponse) {
    //   setHealthAndFoodAPIState(healthAndFoodResponse);
    //   setHealthAndFoodState(healthAndFoodResponse);
    // }
    // if (accountDetailsResponse) {
    //   setAccountDetailsAPIState(accountDetailsResponse);
    //   setAccountDetailsState(accountDetailsResponse);
    // }
  };

  const handleUpdate = async () => {
    var { personalError, isValid } = validatePersonalFields(personalState);
    if (!isValid) {
      setPersonalError(JSON.parse(JSON.stringify(personalError)));
      return ErrorToaster(`Please Enter the required values`, panelId, 'error');
    }
    // var { accountDetailsError, isValid } = validateAccountDetails(accountDetailsState);
    // if (!isValid) {
    //   setAccountDetailsError(JSON.parse(JSON.stringify(accountDetailsError)));

    // }
    await postPersonalData(panelId, props, patientId, {
      ...personalState,
      // ...accountDetailsState,
      // ...healthAndFoodState,
    });
    // setProfileEditable(false);
    // setAccountDetailsError(AccountDetail);
    goBack('S');
  };
  const onCloseDrawer = () => setOpenConfirmDrawer(false);
  const onConfirmDiscard = () => {
    onCloseDrawer();
    goBack('S');
  };

  useEffect(() => {
    (async () => {
      const countries = await callCountriesAPI();
      if (countries) setCountriesOption(countries);
    })();
  }, []);

  useEffect(() => {
    let myCustomerSubscription: any;
    (async () => await getPersonalProfileDataCall())();
    myCustomerSubscription =
      registerEvent && registerEvent(patientId, 'pms-ql-user', async () => await getPersonalProfileDataCall());
    return () => {
      unRegisterEvent && unRegisterEvent(myCustomerSubscription);
    };
  }, []);

  useEffect(() => {
    if (personalState.CountryCode) {
      (async () => {
        const cities = await callCitiesAPI(personalState.CountryCode);
        if (cities) setCitiesOption(cities);
        const timezones = await callTimeZoneAPI(personalState.CountryCode);
        if (timezones) {
          setTimezoneOption(timezones);
          if (timezones.length >= 1) {
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

  async function searchCountries(searchString: string) {
    const payload = {
      size: 10000,
      index: 'countries_master',
      keyToCheck: 'name',
      value: searchString ?? '',
      method: 'POST',
      url: `${import.meta.env.VITE_BASE_API_URL}/search`,
      token: sessions.id_token,
      headers: {},
    };

    try {
      const response = await PMS_S3.postData(payload);
      if (response.Error) return ErrorToaster(response.Error, panelId, 'error');
      let options = response?.map((country) => ({ label: country._source?.name, value: country._source?.isoCode }));
      return options;
    } catch (error) {
      ErrorToaster(error.message, panelId, 'error');
    }
  }
  return (
    <>
      {isLoading ? (
        <>
          <MUISkeleton animation="wave" variant="rectangular" height="135px" width="100%" style={{ margin: '20px 0px' }} />
          <MUISkeleton animation="wave" variant="rectangular" height="135px" width="100%" style={{ margin: '20px 0px' }} />
          <MUISkeleton animation="wave" variant="rectangular" height="135px" width="100%" style={{ margin: '20px 0px' }} />
        </>
      ) : (
        <div className={classes.mainContainer}>
          <PageHeader customStyle={classes.headerStyle} handleBack={onBack} headerContent={'Edit Profile Details'} />
          <div className={classes.profileImageBox}>
            <Avatar className={classes.profileAvatar} src={croppedImage || profileImage}>
              {getFirstLetters(`${personalState.FirstName}` + ' ' + `${personalState.LastName}`)}
            </Avatar>

            <IconButton onClick={handleEditProfileImage} className={classes.profileEditBottom}>
              {<EditWhite />}
            </IconButton>
          </div>
          <div className={classes.scrollBody}>
            <div className={`${classes.marginBottom}`}>
              <div className={classes.contentWithIconContainer}>
                <PersonIcon />
                <Select
                  placeholder="Title"
                  headerTitle="Title"
                  options={SALUTATION_OPTIONS}
                  setValues={handleSalutation}
                  values={personalState.Salutation}
                  helperText={personalError.Salutation}
                  position={'bottom'}
                  optionsType={'radio'}
                  isAutoOk
                  isDivider
                />
              </div>
            </div>

            <div className={`${classes.marginBottom} ${classes.marginleft}`}>
              <InputField
                label="First name"
                onChange={handleFirstName}
                value={personalState.FirstName}
                helperText={personalError.FirstName}
                //  disabled={!profileEditable}
              />
            </div>
            <div className={`${classes.marginBottom} ${classes.marginleft}`}>
              <InputField
                label="Last name"
                onChange={handleLastName}
                value={personalState.LastName}
                helperText={personalError.LastName}
                // disabled={!profileEditable}
              />
            </div>
            <div className={`${classes.marginBottom} ${classes.marginleft}`}>
              <Select
                placeholder="Country"
                headerTitle="Country"
                options={countriesOption}
                setValues={handleCountry}
                onSearchAPICall={searchCountries}
                values={personalState.Country}
                helperText={personalError.Country}
                parameter={'label'}
                optionsType={'label'}
                position={'bottom'}
                isReturnSelectedOption
                isAutoOk
                isDivider
                isSearch
                drawerPadding={'20px 20px 0px 20px'}
              />
            </div>
            <div className={classes.marginBottom}>
              <div className={classes.contentWithIconContainer}>
                <LocationIcon />
                <Select
                  placeholder="City"
                  headerTitle="City"
                  options={citiesOption}
                  setValues={handleCity}
                  onSearchAPICall={(data) => callCitiesAPI(personalState.CountryCode, data)}
                  values={personalState.City}
                  helperText={personalError.City}
                  disabled={!Boolean(personalState.Country)}
                  parameter={'label'}
                  optionsType={'label'}
                  position={'bottom'}
                  isAutoOk
                  isDivider
                  isSearch
                  drawerPadding={'20px 20px 0px 20px'}
                />
              </div>
            </div>

            <div className={`${classes.marginBottom} ${classes.marginleft}`}>
              <Select
                placeholder="Time Zone"
                headerTitle="Time Zone"
                options={timezoneOption}
                setValues={handleTimeZoneName}
                values={personalState.TimeZoneName}
                helperText={personalError.TimeZoneName}
                disabled={!Boolean(personalState.Country)}
                parameter={'label'}
                optionsType={'radio'}
                position={'bottom'}
                isReturnSelectedOption
                isAutoOk
                isDivider
                isSearch
              />

              <ProfileCropper
                open={openProfileCropper}
                setOpenProfileCropper={setOpenProfileCropper}
                onImageCropped={onImageCropped}
                onRemoveImg={onRemoveImg}
              />
            </div>
          </div>
          <div className={classes.footercontainer}>
            <PannelFooter
              customStyle={classes.footerStyle}
              handleAdd={async () => {
                try {
                  setDisabledBtn(true);
                  await handleUpdate();
                } finally {
                  setDisabledBtn(false);
                }
              }}
              handleCancel={onCancel}
              buttonOneTitle={'Cancel'}
              buttonTwoProps={{
                disabled:
                  (personalStateInitial.FirstName === personalState.FirstName &&
                    personalStateInitial.LastName === personalState.LastName &&
                    personalStateInitial.Salutation === personalState.Salutation &&
                    personalStateInitial.City === personalState.City &&
                    personalStateInitial.TimeZoneName === personalState.TimeZoneName &&
                    personalStateInitial.Country === personalState.Country &&
                    croppedImage === null) ||
                  disabledBtn,
              }}
              buttonTwoTitle={'Update'}
            />
            <MUIDrawer open={openConfirmDrawer} anchor={'bottom'} handleClose={onCloseDrawer} headerTitle={'Unsaved Changes'}>
              <div className={`${commonClasses.body15Regular} ${classes.warningMessage}`}>
                Your changes will be lost if you don't save them.
              </div>
              <PannelFooter
                customStyle={classes.warningFooterStyle}
                buttonOneProps={{ size: 'medium' }}
                buttonTwoProps={{ size: 'medium' }}
                handleAdd={onConfirmDiscard}
                handleCancel={onCloseDrawer}
                buttonOneTitle={'Cancel'}
                buttonTwoTitle={'Discard'}
              />
            </MUIDrawer>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientBasicProfileEditView;
