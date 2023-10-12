import React, { memo, useCallback, useEffect, useState } from 'react';
import { IPatientDetailedProfile, IProfileDetailsState, IProfilePayload } from './PatientDetailedProfile.types';
import { useStyles } from './PatientDetailedProfile.styles';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { useDFEvent, useDFGoBack } from '../../../DisplayFramework/Events/DFEvents';
import PageHeader from '../../LibraryComponents/PageHeader/PageHeader';
import PannelFooter from '../../LibraryComponents/PannelFooter/PannelFooter';
import InputField from '../../LibraryComponents/InputField/InputField';

import { postPatientProfileData } from './PatientDetailedProfile.functions';

import MUIDrawer from '../../LibraryComponents/MUIDrawer/MUIDrawer';
import useProfileDetails from './PatientDetailedProfile.hook';
import MUISkeleton from '../../LibraryComponents/MUISkeleton/MUISkeleton';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';

const MemoInputField = memo(InputField);

const SocialPlatformEditView = (props: IPatientDetailedProfile) => {
  const { classes } = useStyles();
  const goBack = useDFGoBack();
  const { id: panelId } = useCurrentPanel();
  const commonClasses = useCommonStyles();
  const [openConfirmDrawer, setOpenConfirmDrawer] = useState<boolean>(false);
  const childEventTrigger = useDFEvent();
  const {
    profileDetails,

    isChangeInAnyField,
    setProfileDetailsError,

    onFacebookUrlChange,
    onTwitterUrlChange,
    onInstagramUrlChange,
    onYoutubeUrlChange,
    onLinkedInUrlChange,

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
    // const { errorMessage, isValid } = validateProfileDetails(profileDetails);
    // if (!isValid) {
    //   setProfileDetailsError(JSON.parse(JSON.stringify(errorMessage)));
    //   return ErrorToaster(`Please Enter the required values`);
    // }
    const { height, heightUnit, weight, weightUnit, DateOfBirth, ...restProfile } = profileDetails;
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

  return (
    <>
      {isLoading && (
        <>
          <MUISkeleton
            animation="wave"
            variant="rectangular"
            height="80px"
            width="100%"
            style={{ margin: '20px 16px 8px 16px' }}
          />
          <MUISkeleton animation="wave" variant="rectangular" height="80px" width="100%" style={{ margin: '0 16px 8px 16px' }} />
          <MUISkeleton animation="wave" variant="rectangular" height="80px" width="100%" style={{ margin: '0 16px 8px 16px' }} />
          <MUISkeleton animation="wave" variant="rectangular" height="80px" width="100%" style={{ margin: '0 16px 8px 16px' }} />
          <MUISkeleton animation="wave" variant="rectangular" height="80px" width="100%" style={{ margin: '0 16px 8px 16px' }} />
        </>
      )}
      {!isLoading && (
        <div className={classes.mainContainer}>
          <PageHeader customStyle={classes.headerStyle} handleBack={onBack} headerContent={'Edit Social platforms'} />

          <div className={classes.scrollBody}>
            <MemoInputField label="Facebook URL" value={profileDetails.facebookUrl} onChange={onFacebookUrlChange} />
            <MemoInputField label="Twitter URL" value={profileDetails.twitterUrl} onChange={onTwitterUrlChange} />
            <MemoInputField label="Instagram URL" value={profileDetails.instagramUrl} onChange={onInstagramUrlChange} />
            <MemoInputField label="Youtube URL" value={profileDetails.youtubeUrl} onChange={onYoutubeUrlChange} />
            <MemoInputField label="LinkedIn URL" value={profileDetails.linkedInUrl} onChange={onLinkedInUrlChange} />
          </div>

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
            handleAdd={onUpdate}
            handleCancel={onBack}
            buttonOneTitle={'Cancel'}
            buttonTwoTitle={'Update'}
            buttonTwoProps={{ disabled: !isChangeInAnyField }}
          />
        </div>
      )}
    </>
  );
};

export default SocialPlatformEditView;
