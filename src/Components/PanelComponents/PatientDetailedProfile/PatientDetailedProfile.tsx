import { IconButton } from '@mui/material';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ErrorToaster from '../../../Common/ErrorToaster';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';
import { useDFEvent, useDFGoBack } from '../../../DisplayFramework/Events/DFEvents';
import { IRootState } from '../../../DisplayFramework/State/store';
import { doesUserHaveViewAccess } from '../../../Utilities/AccessPermissions';
import IndeterminateLoader from '../../LibraryComponents/InderminateLoader/InderminateLoader';
import InputField from '../../LibraryComponents/InputField/InputField';
import Button from '../../LibraryComponents/MUIButton/MUIButton';
import Checkbox from '../../LibraryComponents/MUICheckbox/MUICheckbox';
import MUIDatePicker from '../../LibraryComponents/MUIDatePicker/MUIDatePicker';
import MUIDrawer from '../../LibraryComponents/MUIDrawer/MUIDrawer';
import RadioGroup from '../../LibraryComponents/MUIRadioGroup/MUIRadioGroup';
import MUISelect from '../../LibraryComponents/MUISelect/MUISelect';
import MUISkeleton from '../../LibraryComponents/MUISkeleton/MUISkeleton';
import PageHeader from '../../LibraryComponents/PageHeader/PageHeader';
import PannelFooter from '../../LibraryComponents/PannelFooter/PannelFooter';
import Select from '../../LibraryComponents/Select/Select';
import PhoneInputField from '../../Registration/Components/InputField/PhoneInputField/PhoneInputField';
import { EditIcon } from '../../SVGs/Common';
import { getLanguage, getNationality } from '../ProfileManagement/Personal/Personal.functions';
import WithIconContainer from './Components/WithIconContainer';
import {
  BLOOD_UNITS,
  FOOD_RESTRICTIONS_OPTIONS,
  GENDER_OPTIONS,
  HEIGHT_UNIT_OPTIONS,
  INIT_PORFILE_STATE,
  MODIFIED_DETAILS_OPTIONS,
  MODIFIED_GENDER_OPTIONS,
  WEIGHT_UNITS,
  postPatientProfileData,
  validateProfileDetails,
} from './PatientDetailedProfile.functions';
import useProfileDetails from './PatientDetailedProfile.hook';
import { useStyles } from './PatientDetailedProfile.styles';
import {
  BloodIcon,
  CitizenShipIcon,
  ClockIconInEditHistory,
  DBIcon,
  DateOfBirthIcon,
  EmailIcon,
  EmergencyContactIcon,
  FoodIcon,
  FoodRestrictionIcon,
  GenderIcon,
  GenderIconNew,
  GlobalIcon,
  HeightIcon,
  MobileIcon,
  RedidenceIcon,
  SocialIcon,
  WeightIcon,
  WhatsAppIcon,
} from './PatientDetailedProfile.svg';
import { IPatientDetailedProfile, IProfileDetailsState, IProfilePayload } from './PatientDetailedProfile.types';

const MemoInputField = memo(InputField);
const MemoMUISelect = memo(MUISelect);
const MemoSelect = memo(Select);
const MemoMUIDatePicker = memo(MUIDatePicker);
const MemoRadioGroup = memo(RadioGroup);

const LANGUAGES_OPTIONS = getLanguage();
const NATIONALITIES_OPTIONS = getNationality();

const PatientDetailedProfile = (props: IPatientDetailedProfile) => {
  const { classes } = useStyles();
  const goBack = useDFGoBack();
  const commonClasses = useCommonStyles();
  const [openConfirmDrawer, setOpenConfirmDrawer] = useState<boolean>(false);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);
  const childEventTrigger = useDFEvent();
  const { id: panelId } = useCurrentPanel();
  const accessPermissionsForThisClient = useSelector(
    (state: IRootState) => state.accessPermissions.accessPermissionsForThisClient
  );
  const {
    profileDetails,
    profileDetailsError,
    openGenderModified,
    modifiedGender,
    cuisineOptions,
    isWhatsAppChecked,
    isChangeInAnyField,
    setOpenGenderModified,
    setProfileDetailsError,
    setProfileDetails,
    onHeightChange,
    onFeetChange,
    onInchesChange,
    onHeightUnitChange,
    onWeightChange,
    onWeightUnitChange,
    onDateOfBirthChange,
    onGender,
    onModifiedGender,
    onMedicallyModifiedGender,
    onUserTypedGender,
    onEditModifyGender,
    onCloseModifiedDrawer,
    onDoneModifiedGender,
    onFoodRestrictionChange,
    onCuisineChange,
    onPreferredLanguages,
    onNationality,
    onEmail,
    onBloodGrpChange,
    onMobileChange,
    onWhatsAppNumberChange,
    onCheckWhatsAppNumber,
    onEmergencyContactChange,
    onResetFields,
    isLoading,
  } = useProfileDetails(props);

  const onBack = () => {
    if (!isChangeInAnyField) {
      goBack('S');
      return;
    }
    setOpenConfirmDrawer(true);
  };

  const onConfirmDiscard = () => {
    onResetFields();
    onCloseDrawer();
    goBack('S');
  };

  const onCloseDrawer = () => setOpenConfirmDrawer(false);

  const onUpdate = async () => {
    const { errorMessage, isValid } = validateProfileDetails(profileDetails);
    if (!isValid) {
      console.log(errorMessage, isValid);
      setProfileDetailsError(JSON.parse(JSON.stringify(errorMessage)));
      return ErrorToaster(`Please Enter the required values`, panelId, 'error');
    }
    const { height, heightField, heightUnit, weight, weightUnit, DateOfBirth, ...restProfile } = profileDetails;

    let payload: IProfilePayload = {
      ...restProfile,
      height: height ? `${height} ${heightUnit}` : '',
      weight: weight ? `${weight} ${weightUnit}` : '',
      DateOfBirth: DateOfBirth ? new Date(DateOfBirth).toISOString() : '',
    };

    const response = await postPatientProfileData(panelId, props, payload);
    if (response) {
      onResetFields();
      // on update, move 2 screens back
      goBack('S');
      goBack('S');
    }
  };

  useEffect(() => {
    let height =
      profileDetails.heightUnit == 'cm' && profileDetails?.heightField?.cm?.length > 0
        ? `${parseFloat(profileDetails?.heightField?.cm)}`
        : profileDetails?.heightField?.cm?.length > 0
        ? `${profileDetails.heightField.ft}~${profileDetails.heightField.in}`
        : '';
    setProfileDetails((pre) => ({ ...pre, height }));
  }, [profileDetails.heightField.ft, profileDetails.heightField.in, profileDetails.heightField.cm]);
  return (
    <>
      {isLoading && (
        <>
          <MUISkeleton animation="wave" variant="rectangular" height="120px" width="100%" style={{ marginBottom: '8px' }} />
          <MUISkeleton animation="wave" variant="rectangular" height="120px" width="100%" style={{ marginBottom: '8px' }} />
          <MUISkeleton animation="wave" variant="rectangular" height="120px" width="100%" style={{ marginBottom: '8px' }} />
          <MUISkeleton animation="wave" variant="rectangular" height="120px" width="100%" style={{ marginBottom: '8px' }} />
          <MUISkeleton animation="wave" variant="rectangular" height="160px" width="100%" style={{ marginBottom: '8px' }} />
          <MUISkeleton animation="wave" variant="rectangular" height="120px" width="100%" style={{ marginBottom: '8px' }} />
          <MUISkeleton animation="wave" variant="rectangular" height="120px" width="100%" style={{ marginBottom: '8px' }} />
        </>
      )}
      {!isLoading && (
        <div className={classes.mainContainer}>
          <PageHeader customStyle={classes.headerStyle} handleBack={onBack} headerContent={'Edit Profile Details'} />
          <div className={classes.scrollBody}>
            <div>
              <WithIconContainer
                alignEnd
                // Icon={<HeightIcon />}
                isHidden={
                  !doesUserHaveViewAccess(
                    accessPermissionsForThisClient,
                    'PatientBasicProfileDetails',
                    'PatientBasicProfileDetails.1'
                  )
                }
              >
                <section className={classes.heightSection}>
                  <div className={`${commonClasses.body15Regular} ${classes.subLabel}`}>Height</div>
                  <MemoRadioGroup
                    variant={'radio'}
                    options={HEIGHT_UNIT_OPTIONS}
                    value={profileDetails.heightUnit}
                    setValue={onHeightUnitChange}
                  />
                </section>
              </WithIconContainer>
            </div>

            {profileDetails.heightUnit === 'ft/in' && (
              <WithIconContainer
                alignEnd
                Icon={<HeightIcon />}
                isHidden={
                  !doesUserHaveViewAccess(
                    accessPermissionsForThisClient,
                    'PatientBasicProfileDetails',
                    'PatientBasicProfileDetails.1'
                  )
                }
              >
                <div className={classes.gridBox}>
                  <MemoInputField
                    label="ft"
                    // value={profileDetails.feet}
                    value={profileDetails.heightField['ft']}
                    onChange={onFeetChange}
                    helperText={profileDetailsError.heightField.ft}
                    inputProps={{ maxLength: 1 }}
                  />
                  <MemoInputField
                    label="in"
                    // value={profileDetails.inches}
                    value={profileDetails.heightField['in']}
                    onChange={onInchesChange}
                    inputProps={{ maxLength: 2 }}
                    helperText={profileDetailsError.heightField.in}
                  />
                </div>
              </WithIconContainer>
            )}

            {profileDetails.heightUnit === 'cm' && (
              <WithIconContainer
                alignEnd
                Icon={<HeightIcon />}
                isHidden={
                  !doesUserHaveViewAccess(
                    accessPermissionsForThisClient,
                    'PatientBasicProfileDetails',
                    'PatientBasicProfileDetails.1'
                  )
                }
              >
                <MemoInputField
                  label="cm"
                  // value={profileDetails.height}
                  value={profileDetails.heightField['cm']}
                  onChange={onHeightChange}
                  helperText={profileDetailsError.heightField.cm}
                />
              </WithIconContainer>
            )}

            <WithIconContainer
              alignEnd
              Icon={<WeightIcon />}
              isHidden={
                !doesUserHaveViewAccess(
                  accessPermissionsForThisClient,
                  'PatientBasicProfileDetails',
                  'PatientBasicProfileDetails.2'
                )
              }
            >
              <div className={classes.gridBox}>
                <MemoInputField
                  label="Weight"
                  value={profileDetails.weight}
                  onChange={onWeightChange}
                  helperText={profileDetailsError.weight}
                />
                <MemoMUISelect
                  value={profileDetails.weightUnit}
                  onChange={onWeightUnitChange}
                  options={WEIGHT_UNITS}
                  labelId={'weightUnit'}
                  label="Unit"
                />
              </div>
            </WithIconContainer>
            <WithIconContainer
              alignEnd
              Icon={<DateOfBirthIcon />}
              isHidden={
                !doesUserHaveViewAccess(
                  accessPermissionsForThisClient,
                  'PatientBasicProfileDetails',
                  'PatientBasicProfileDetails.3'
                )
              }
            >
              <MemoMUIDatePicker
                label="Date of birth"
                date={profileDetails.DateOfBirth ? new Date(profileDetails.DateOfBirth) : null}
                setDate={onDateOfBirthChange}
                format={'yyyy-MM-dd'}
                maxDate={new Date()}
                minDate={new Date('1900-01-01')}
              />
            </WithIconContainer>
            <WithIconContainer
              alignStart
              iconMarginTop="34px"
              Icon={<GenderIcon />}
              isHidden={
                !doesUserHaveViewAccess(
                  accessPermissionsForThisClient,
                  'PatientBasicProfileDetails',
                  'PatientBasicProfileDetails.4'
                )
              }
            >
              <section className={classes.sexAtBirthSection}>
                <div className={classes.inputWrapper}>
                  <div className={`${commonClasses.body15Regular} ${classes.subLabel}`}>Sex at birth</div>
                  <MemoRadioGroup variant={'radio'} options={GENDER_OPTIONS} value={profileDetails.Gender} setValue={onGender} />
                </div>
                <div className={classes.inputWrapper}>
                  <div className={`${commonClasses.body15Regular} ${classes.subLabel}`}>
                    Has it been medically modified in any way?
                  </div>
                  <MemoRadioGroup
                    variant={'tokenWithoutCross'}
                    options={MODIFIED_GENDER_OPTIONS}
                    value={profileDetails.isModifiedGender}
                    setValue={onModifiedGender}
                  />
                </div>
                {profileDetails.isModifiedGender && (
                  <>
                    {profileDetails.isUserTypedGender && (
                      <div className={`${commonClasses.body15Medium} ${classes.subLabel1}`}>Let me Type</div>
                    )}
                    <MemoInputField
                      label="My gender"
                      value={profileDetails.userTypedGender || profileDetails.MedicallyModifiedGender}
                      helperText={profileDetailsError.userTypedGender}
                      InputProps={{
                        endAdornment: <IconButton onClick={onEditModifyGender}>{<EditIcon />}</IconButton>,
                        readOnly: true,
                      }}
                    />
                  </>
                )}
              </section>
            </WithIconContainer>
            <WithIconContainer
              alignEnd
              Icon={<FoodRestrictionIcon />}
              isHidden={
                !doesUserHaveViewAccess(
                  accessPermissionsForThisClient,
                  'PatientBasicProfileDetails',
                  'PatientBasicProfileDetails.7'
                )
              }
            >
              <MemoSelect
                placeholder="Restriction"
                headerTitle="Restriction"
                options={FOOD_RESTRICTIONS_OPTIONS}
                setValues={onFoodRestrictionChange}
                values={profileDetails.FoodRestriction}
                position={'bottom'}
                optionsType={'label'}
                isAutoOk
                isDivider
                drawerPadding={'20px 20px 0px 20px'}
                listAutoHeight
              />
            </WithIconContainer>
            <WithIconContainer
              Icon={<FoodIcon />}
              isHidden={
                !doesUserHaveViewAccess(
                  accessPermissionsForThisClient,
                  'PatientBasicProfileDetails',
                  'PatientBasicProfileDetails.9'
                )
              }
            >
              <MemoSelect
                placeholder="Cuisine"
                headerTitle="Cuisine"
                options={cuisineOptions}
                setValues={onCuisineChange}
                values={profileDetails.Cuisine}
                position={'bottom'}
                optionsType={'checkbox'}
                isDivider
                isSearch
                isToken
                isTokenDeletable
                renderValueAsToken
                renderValueAsTokenDeletable
              />
            </WithIconContainer>
            <WithIconContainer
              alignEnd
              Icon={<GlobalIcon />}
              isHidden={
                !doesUserHaveViewAccess(
                  accessPermissionsForThisClient,
                  'PatientBasicProfileDetails',
                  'PatientBasicProfileDetails.10'
                )
              }
            >
              <MemoSelect
                placeholder="Languages known"
                headerTitle="Languages known"
                options={LANGUAGES_OPTIONS}
                setValues={onPreferredLanguages}
                values={profileDetails.PreferredLanguages}
                parameter={'label'}
                position={'bottom'}
                optionsType={'checkbox'}
                isDivider
                isSearch
                isToken
                isTokenDeletable
                renderValueAsToken
                renderValueAsTokenDeletable
              />
            </WithIconContainer>
            <WithIconContainer
              alignEnd
              Icon={<MobileIcon />}
              isHidden={
                !doesUserHaveViewAccess(
                  accessPermissionsForThisClient,
                  'PatientBasicProfileDetails',
                  'PatientBasicProfileDetails.11'
                )
              }
            >
              <section className={classes.mobileGrid}>
                <MemoInputField
                  label="Mobile number"
                  onChange={onMobileChange}
                  value={profileDetails.Mobile}
                  isReadOnly
                  disabled
                  // helperText={profileDetailsError.Mobile}
                />
                <div className={classes.selectAllButton} onClick={() => onCheckWhatsAppNumber(!isWhatsAppChecked)}>
                  <Checkbox checked={isWhatsAppChecked || profileDetails.Mobile === profileDetails.whatsAppNumber} />
                  <span className={commonClasses.body17Regular}>WhatsApp</span>
                </div>
              </section>
            </WithIconContainer>
            <WithIconContainer
              alignEnd
              Icon={<WhatsAppIcon />}
              isHidden={
                !doesUserHaveViewAccess(
                  accessPermissionsForThisClient,
                  'PatientBasicProfileDetails',
                  'PatientBasicProfileDetails.12'
                )
              }
            >
              <MemoInputField
                label="Whatsapp number"
                onChange={onWhatsAppNumberChange}
                value={profileDetails.whatsAppNumber}
                helperText={profileDetailsError.whatsAppNumber}
              />
            </WithIconContainer>
            {/* <WithIconContainer alignEnd Icon={<RedidenceIcon />}></WithIconContainer> */}
            <WithIconContainer
              alignEnd
              Icon={<CitizenShipIcon />}
              isHidden={
                !doesUserHaveViewAccess(
                  accessPermissionsForThisClient,
                  'PatientBasicProfileDetails',
                  'PatientBasicProfileDetails.14'
                )
              }
            >
              <MemoSelect
                placeholder="Nationality"
                headerTitle="Nationality"
                options={NATIONALITIES_OPTIONS}
                values={profileDetails.Nationality}
                setValues={onNationality}
                parameter={'label'}
                position={'bottom'}
                optionsType={'label'}
                isAutoOk
                isDivider
                isSearch
                drawerPadding={'20px 20px 0px 20px'}
              />
            </WithIconContainer>
            <WithIconContainer
              alignEnd
              Icon={<EmailIcon />}
              isHidden={
                !doesUserHaveViewAccess(
                  accessPermissionsForThisClient,
                  'PatientBasicProfileDetails',
                  'PatientBasicProfileDetails.17'
                )
              }
            >
              <MemoInputField
                label="Email"
                onChange={onEmail}
                value={profileDetails.EMail}
                helperText={profileDetailsError.EMail}
              />
            </WithIconContainer>
            <WithIconContainer
              alignEnd
              Icon={<EmergencyContactIcon />}
              isHidden={
                !doesUserHaveViewAccess(
                  accessPermissionsForThisClient,
                  'PatientBasicProfileDetails',
                  'PatientBasicProfileDetails.19'
                )
              }
            >
              <MemoInputField
                label="Emergency Contact"
                onChange={onEmergencyContactChange}
                value={profileDetails.emergencyContact}
                helperText={profileDetailsError.emergencyContact}
              />
            </WithIconContainer>
            <WithIconContainer
              alignEnd
              Icon={<BloodIcon />}
              isHidden={
                !doesUserHaveViewAccess(
                  accessPermissionsForThisClient,
                  'PatientBasicProfileDetails',
                  'PatientBasicProfileDetails.18'
                )
              }
            >
              <MemoSelect
                placeholder="Blood Group"
                headerTitle="Blood Group"
                options={BLOOD_UNITS}
                setValues={onBloodGrpChange}
                values={profileDetails.bloodGrp}
                position={'bottom'}
                optionsType={'label'}
                isAutoOk
                isDivider
                drawerPadding={'20px 20px 0px 20px'}
                listAutoHeight
                disabled
              />
            </WithIconContainer>
            <WithIconContainer alignEnd Icon={<DBIcon />}>
              <MemoSelect
                placeholder="Default nutrition database"
                headerTitle="Default nutrition database"
                options={BLOOD_UNITS}
                setValues={onBloodGrpChange}
                values={profileDetails.bloodGrp}
                position={'bottom'}
                optionsType={'label'}
                isAutoOk
                isDivider
                drawerPadding={'20px 20px 0px 20px'}
                listAutoHeight
                disabled
              />
            </WithIconContainer>
          </div>

          <MUIDrawer
            open={openGenderModified}
            anchor={'bottom'}
            handleClose={onCloseModifiedDrawer}
            headerTitle={'Medically modified details'}
          >
            <MemoRadioGroup
              flexDirection="column"
              variant={'radio'}
              options={MODIFIED_DETAILS_OPTIONS}
              value={modifiedGender.MedicallyModifiedGender}
              setValue={onMedicallyModifiedGender}
            />
            <div className={`${commonClasses.body15Medium} ${classes.subLabel2}`}>Let me Type</div>
            <InputField
              label="My gender"
              onChange={onUserTypedGender}
              value={modifiedGender.userTypedGender}
              helperText={profileDetailsError.userTypedGender}
            />
            <div className={classes.buttonLeft}>
              <Button variant="contained" onClick={onDoneModifiedGender}>
                Done
              </Button>
            </div>
          </MUIDrawer>
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
          <PannelFooter
            customStyle={classes.footerStyle}
            // handleAdd={onUpdate}
            handleAdd={async () => {
              try {
                setDisabledBtn(true);
                await onUpdate();
              } finally {
                setDisabledBtn(false);
              }
            }}
            handleCancel={onBack}
            buttonOneTitle={'Cancel'}
            buttonTwoTitle={'Update'}
            buttonTwoProps={{ disabled: !isChangeInAnyField || disabledBtn }}
          />
        </div>
      )}
    </>
  );
};

export default PatientDetailedProfile;
