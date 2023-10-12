import { useEffect, useState } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useDFEvent, useDFGoBack } from '../../../../DisplayFramework/Events/DFEvents';
import { useAppSelector } from '../../../../DisplayFramework/State/store';
import InputField from '../../../LibraryComponents/InputField/InputField';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import { EditIcon } from '../../../SVGs/Common';
import { ClockIconInEditHistory } from '../../PatientDetailedProfile/PatientDetailedProfile.svg';
import { useStyles } from './LoginLogoutSnippet.styles';
import { IProps } from './LoginLogoutSnippet.types';
import PannelFooter from '../../../LibraryComponents/PannelFooter/PannelFooter';
import MUIButton from '../../../LibraryComponents/MUIButton/MUIButton';
import MUIDrawer from '../../../LibraryComponents/MUIDrawer/MUIDrawer';
import ModalBox from '../../../LibraryComponents/ModalBox/ModalBox';
import { PMS_LOCALE } from '../../../../Utils';
import useProfileDetails from '../../PatientDetailedProfile/PatientDetailedProfile.hook';
import { postPatientProfileData, validateProfileDetails } from '../../PatientDetailedProfile/PatientDetailedProfile.functions';
import ErrorToaster from '../../../../Common/ErrorToaster';
import { IProfilePayload } from '../../PatientDetailedProfile/PatientDetailedProfile.types';
import IndeterminateLoader from '../../../LibraryComponents/InderminateLoader/InderminateLoader';
import MUISkeleton from '../../../LibraryComponents/MUISkeleton/MUISkeleton';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

export default function LoginLogoutSnippet(props: IProps) {
  const { isEditView } = props;
  const loggedInUser = useAppSelector((s) => s.displayFrameWork.loggedInUserInformation);
  const { id: panelId } = useCurrentPanel();
  const sendEvent = useDFEvent();
  const goBack = useDFGoBack();

  //

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
    onHeightChange,
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
    onFacebookUrlChange,
    onTwitterUrlChange,
    onInstagramUrlChange,
    onYoutubeUrlChange,
    onLinkedInUrlChange,
    onBloodGrpChange,
    onMobileChange,
    onWhatsAppNumberChange,
    onCheckWhatsAppNumber,
    onEmergencyContactChange,
    onResetFields,
    isLoading,
  } = useProfileDetails(props as any);

  const [openConfirmDrawer, setOpenConfirmDrawer] = useState<boolean>(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState<boolean>(false);

  const onUpdate = async () => {
    const { errorMessage, isValid } = validateProfileDetails(profileDetails);

    if (!isValid) {
      setProfileDetailsError(JSON.parse(JSON.stringify(errorMessage)));
      return ErrorToaster(`Please Enter the required values`, panelId, 'error');
    }
    const { height, heightUnit, weight, weightUnit, DateOfBirth, ...restProfile } = profileDetails;
    let payload: IProfilePayload = {
      ...restProfile,
      height: height ? `${height} ${heightUnit}` : '',
      weight: weight ? `${weight} ${weightUnit}` : '',
      DateOfBirth: DateOfBirth ? new Date(DateOfBirth).toISOString() : '',
    };
    const response = await postPatientProfileData(panelId, props as any, payload);
    if (response) {
      onResetFields();
      // on update, move 2 screens back
      goBack('S');
      goBack('S');
    }
  };

  const onCancel = () => {
    if (!isEditView) {
      goBack();
      return;
    }

    setOpenConfirmDrawer(true);
  };

  //

  const commonClasses = useCommonStyles();
  const { classes } = useStyles({
    isEditView,
  });

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
          <PageHeader
            customStyle={classes.headerStyle}
            handleBack={onCancel}
            headerContent={'Login & Logout'}
            endAdornment={
              !isEditView && (
                <div className={classes.iconHeaderWrapper}>
                  <span
                    onClick={() => {
                      sendEvent<IProps>('onLoginLogoutSnippet', {
                        ...props,
                        isEditView: true,
                      });
                    }}
                  >
                    <EditIcon />
                  </span>
                </div>
              )
            }
          />

          {/*  */}

          <div className={classes.scrollBody}>
            <InputField
              label="Mobile Number"
              value={profileDetails.Mobile}
              disabled={true}
              onChange={onMobileChange}
              helperText={profileDetailsError.Mobile}
            />

            <InputField
              label="Username"
              value={`${profileDetails.FirstName} ${profileDetails.LastName}` || '-'}
              disabled
              //   onChange={(e) => setUsername(e.target.value)}
              //   helperText={error.usernameError}
            />

            <InputField
              label="Email"
              value={profileDetails.EMail}
              disabled={!isEditView}
              onChange={onEmail}
              helperText={profileDetailsError.EMail}
            />

            <InputField
              label="Password"
              value={'-'}
              disabled
              //   onChange={(e) => setPassword(e.target.value)}
              //   helperText={error.passwordError}
            />
          </div>
          {/*  */}

          <MUIDrawer
            open={openConfirmDrawer}
            anchor={'bottom'}
            handleClose={() => {
              setOpenConfirmDrawer(false);
            }}
            headerTitle={'Unsaved Changes'}
          >
            <div className={`${commonClasses.body15Regular} ${classes.warningMessage}`}>
              Your changes will be lost if you don't save them.
            </div>
            <PannelFooter
              customStyle={classes.warningFooterStyle}
              buttonOneProps={{ size: 'medium' }}
              buttonTwoProps={{ size: 'medium' }}
              handleAdd={() => {
                setOpenConfirmDrawer(false);
                goBack();
              }}
              handleCancel={() => {
                setOpenConfirmDrawer(false);
              }}
              buttonOneTitle={'Cancel'}
              buttonTwoTitle={'Discard'}
            />
          </MUIDrawer>

          <ModalBox
            panelWidth={'400px'}
            open={showLogoutPopup}
            handleClose={() => {
              setShowLogoutPopup(false);
            }}
            modalTitle={'Logout'}
            buttonConfig={[
              {
                text: PMS_LOCALE.translate('Cancel'),
                variant: 'text',
                onClick: () => {
                  setShowLogoutPopup(false);
                },
              },
              {
                text: PMS_LOCALE.translate('Confirm'),
                variant: 'contained',
                onClick: () => {
                  localStorage.removeItem('UserLoggedIn');
                  window.location.href = '/login';
                },
              },
            ]}
          >
            <div className={classes.modalWrapper}>Are you sure you want to Logout?</div>
          </ModalBox>

          {/*  */}

          {isEditView && (
            <PannelFooter
              customStyle={classes.footerStyle}
              handleAdd={onUpdate}
              handleCancel={onCancel}
              buttonOneTitle={'Cancel'}
              buttonTwoTitle={'Update'}
              buttonTwoProps={{ disabled: !isChangeInAnyField }}
            />
          )}

          {!isEditView && (
            <div className={classes.footerButtonWrapper}>
              <MUIButton
                variant="contained"
                fullWidth
                onClick={() => {
                  setShowLogoutPopup(true);
                }}
              >
                Logout
              </MUIButton>
            </div>
          )}
        </div>
      )}
    </>
  );
}
