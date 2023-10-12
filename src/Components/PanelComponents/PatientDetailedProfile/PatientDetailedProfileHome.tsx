import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { useDFEvent, useDFGoBack } from '../../../DisplayFramework/Events/DFEvents';
import { IRootState } from '../../../DisplayFramework/State/store';
import PageHeader from '../../LibraryComponents/PageHeader/PageHeader';
import { EditIcon } from '../../SVGs/Common';
import SubSummaryPannel from '../SummaryPanel/SubSummaryPannel/SubSummaryPannel';
import WithIconContainer from './Components/WithIconContainer';
import PatientDetailedProfile from './PatientDetailedProfile';
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
import { IPatientDetailedProfile } from './PatientDetailedProfile.types';
import { doesUserHaveViewAccess } from '../../../Utilities/AccessPermissions';
import IndeterminateLoader from '../../LibraryComponents/InderminateLoader/InderminateLoader';
import MUISkeleton from '../../LibraryComponents/MUISkeleton/MUISkeleton';
export default function PatientDetailedProfileHome(props: IPatientDetailedProfile) {
  const { classes } = useStyles();
  const goBack = useDFGoBack();
  const commonClasses = useCommonStyles();
  const accessPermissionsForThisClient = useSelector(
    (state: IRootState) => state.accessPermissions.accessPermissionsForThisClient
  );
  const childEventTrigger = useDFEvent();
  const { profileDetails, isLoading } = useProfileDetails(props);

  const onBack = () => {
    goBack('S');
  };

  const handleEditHistory = () => {
    childEventTrigger('HistorySummary', {
      sourceComponent: 'PersonalDetailsSection',
    });
  };

  const onEdit = () => {
    childEventTrigger('onPatientDetailedProfileEdit', props);
  };
  let height = '';
  if (profileDetails.height && profileDetails.height?.includes('~')) {
    let feet = profileDetails.height.split('~')[0];
    let inches = profileDetails.height.split('~')[1].split(' ')[0];
    height = inches && +inches!==0 ? `${feet ? feet : 0} ft ${inches} in` : `${feet} Feet`;
  }
  return (
    <>
      {isLoading && (
        <>
          <MUISkeleton animation="wave" variant="rectangular" height="120px" width="100%" style={{ marginBottom: '8px' }}/>
          <MUISkeleton animation="wave" variant="rectangular" height="120px" width="100%" style={{ marginBottom: '8px' }}/>
          <MUISkeleton animation="wave" variant="rectangular" height="120px" width="100%" style={{ marginBottom: '8px' }}/>
          <MUISkeleton animation="wave" variant="rectangular" height="120px" width="100%" style={{ marginBottom: '8px' }}/>
          <MUISkeleton animation="wave" variant="rectangular" height="160px" width="100%" style={{ marginBottom: '8px' }}/>
          <MUISkeleton animation="wave" variant="rectangular" height="120px" width="100%" style={{ marginBottom: '8px' }}/>
        </>
      )}
      {!isLoading && (
        <div className={classes.mainContainer}>
          <PageHeader
            customStyle={classes.headerStyle}
            handleBack={onBack}
            headerContent={'Profile Details'}
            endAdornment={
              <div className={classes.iconHeaderWrapper}>
                <span onClick={handleEditHistory}>
                  <ClockIconInEditHistory />
                </span>
                <span onClick={onEdit}>
                  <EditIcon />
                </span>
              </div>
            }
          />
          <div className={classes.scrollBody}>
            <WithIconContainer
              alignStart
              Icon={<HeightIcon />}
              Label={'Height'}
              rowGap="0"
              iconTranslateY="25px"
              isHidden={
                !doesUserHaveViewAccess(
                  accessPermissionsForThisClient,
                  'PatientBasicProfileDetails',
                  'PatientBasicProfileDetails.1'
                )
              }
            >
              <span className={`${commonClasses.body17Regular}`}>
                {profileDetails.height
                  ? profileDetails.heightUnit == 'cm'
                    ? `${profileDetails.height} ${profileDetails.heightUnit}`
                    : `${height}`
                  : '-'}
              </span>
            </WithIconContainer>

            <WithIconContainer
              alignStart
              Icon={<WeightIcon />}
              Label={'Weight'}
              rowGap="0"
              iconTranslateY="25px"
              isHidden={
                !doesUserHaveViewAccess(
                  accessPermissionsForThisClient,
                  'PatientBasicProfileDetails',
                  'PatientBasicProfileDetails.2'
                )
              }
            >
              <span className={`${commonClasses.body17Regular}`}>
                {profileDetails.weight ? `${profileDetails.weight} ${profileDetails.weightUnit}` : '-'}
              </span>
            </WithIconContainer>

            <WithIconContainer
              alignStart
              Icon={<DateOfBirthIcon />}
              Label={'Date of birth'}
              rowGap="0"
              iconTranslateY="25px"
              isHidden={
                !doesUserHaveViewAccess(
                  accessPermissionsForThisClient,
                  'PatientBasicProfileDetails',
                  'PatientBasicProfileDetails.3'
                )
              }
            >
              <span className={`${commonClasses.body17Regular}`}>
                {profileDetails.DateOfBirth && profileDetails.DateOfBirth.toString() !== 'Invalid Date'
                  ? `${format(profileDetails.DateOfBirth, 'dd-MM-yyyy')}`
                  : '-'}
              </span>
            </WithIconContainer>

            <WithIconContainer
              alignStart
              Icon={<GenderIconNew />}
              rowGap="0"
              iconTranslateY="25px"
              Label={'Sex at birth'}
              isHidden={
                !doesUserHaveViewAccess(
                  accessPermissionsForThisClient,
                  'PatientBasicProfileDetails',
                  'PatientBasicProfileDetails.4'
                )
              }
            >
              <div className={`${classes.inputWrapper} ${classes.inputWrapperNoBorder}`}>
                <span className={`${commonClasses.body17Regular}`}>{profileDetails.Gender ? profileDetails.Gender : '-'}</span>
              </div>
            </WithIconContainer>

            <WithIconContainer
              alignStart
              Icon={<></>}
              Label={'Has it been medically modified in any way?'}
              rowGap="0"
              iconTranslateY="25px"
              isHidden={
                !doesUserHaveViewAccess(
                  accessPermissionsForThisClient,
                  'PatientBasicProfileDetails',
                  'PatientBasicProfileDetails.4'
                )
              }
            >
              <span className={`${commonClasses.body17Regular}`}>
                {profileDetails.isModifiedGender
                  ? `Yes ${
                      profileDetails?.isModifiedGender &&
                      ',  ' + (profileDetails?.MedicallyModifiedGender || profileDetails?.userTypedGender || '')
                    }`
                  : 'No'}
              </span>
            </WithIconContainer>

            <WithIconContainer
              alignStart
              Icon={<FoodRestrictionIcon />}
              rowGap="0"
              iconTranslateY="25px"
              Label={'Restriction'}
              isHidden={
                !doesUserHaveViewAccess(
                  accessPermissionsForThisClient,
                  'PatientBasicProfileDetails',
                  'PatientBasicProfileDetails.7'
                )
              }
            >
              <span className={`${commonClasses.body17Regular}`}>
                {profileDetails.FoodRestriction ? profileDetails.FoodRestriction : '-'}
              </span>
            </WithIconContainer>

            <WithIconContainer
              alignStart
              Icon={<FoodIcon />}
              rowGap="0"
              iconTranslateY="25px"
              Label={'Cuisine'}
              isHidden={
                !doesUserHaveViewAccess(
                  accessPermissionsForThisClient,
                  'PatientBasicProfileDetails',
                  'PatientBasicProfileDetails.9'
                )
              }
            >
              <span className={`${commonClasses.body17Regular}`}>
                {(profileDetails?.Cuisine?.join && profileDetails.Cuisine.join(', ')) || '-'}
              </span>
            </WithIconContainer>

            <WithIconContainer
              alignStart
              Icon={<GlobalIcon />}
              rowGap="0"
              iconTranslateY="25px"
              Label={'Languages known'}
              isHidden={
                !doesUserHaveViewAccess(
                  accessPermissionsForThisClient,
                  'PatientBasicProfileDetails',
                  'PatientBasicProfileDetails.10'
                )
              }
            >
              <span className={`${commonClasses.body17Regular}`}>
                {(profileDetails?.PreferredLanguages?.join && profileDetails.PreferredLanguages.join(', ')) || '-'}
              </span>
            </WithIconContainer>

            <WithIconContainer
              alignStart
              Icon={<MobileIcon />}
              rowGap="0"
              iconTranslateY="25px"
              Label={'Mobile number'}
              isHidden={
                !doesUserHaveViewAccess(
                  accessPermissionsForThisClient,
                  'PatientBasicProfileDetails',
                  'PatientBasicProfileDetails.11'
                )
              }
            >
              <span className={`${commonClasses.body17Regular}`}>{`${profileDetails.Mobile || '-'}`}</span>
            </WithIconContainer>

            <WithIconContainer
              alignStart
              Icon={<WhatsAppIcon />}
              rowGap="0"
              iconTranslateY="25px"
              Label={'Whatsapp number'}
              isHidden={
                !doesUserHaveViewAccess(
                  accessPermissionsForThisClient,
                  'PatientBasicProfileDetails',
                  'PatientBasicProfileDetails.12'
                )
              }
            >
              <span className={`${commonClasses.body17Regular}`}>{`${profileDetails.whatsAppNumber || '-'}`}</span>
            </WithIconContainer>

            {/* <WithIconContainer alignStart Icon={<CitizenShipIcon />} rowGap="0" iconTranslateY="25px" Label={'Current residence'}>
          <span className={`${commonClasses.body17Regular}`}>{`${profileDetails.ResidingCountry.trim() ?? '-'}`}</span>
        </WithIconContainer> */}

            <WithIconContainer
              alignStart
              Icon={<CitizenShipIcon />}
              rowGap="0"
              iconTranslateY="25px"
              Label={'Citizenship'}
              isHidden={
                !doesUserHaveViewAccess(
                  accessPermissionsForThisClient,
                  'PatientBasicProfileDetails',
                  'PatientBasicProfileDetails.14'
                )
              }
            >
              <span className={`${commonClasses.body17Regular}`}>{`${profileDetails.Nationality || '-'}`}</span>
            </WithIconContainer>

            <WithIconContainer
              alignStart
              Icon={<EmailIcon />}
              rowGap="0"
              iconTranslateY="25px"
              Label={'Email'}
              isHidden={
                !doesUserHaveViewAccess(
                  accessPermissionsForThisClient,
                  'PatientBasicProfileDetails',
                  'PatientBasicProfileDetails.17'
                )
              }
            >
              <span className={`${commonClasses.body17Regular}`}>{`${profileDetails.EMail || '-'}`}</span>
            </WithIconContainer>

            <WithIconContainer
              alignStart
              Icon={<EmergencyContactIcon />}
              rowGap="0"
              iconTranslateY="25px"
              Label={'Emergency Contact'}
              isHidden={
                !doesUserHaveViewAccess(
                  accessPermissionsForThisClient,
                  'PatientBasicProfileDetails',
                  'PatientBasicProfileDetails.19'
                )
              }
            >
              <span className={`${commonClasses.body17Regular}`}>{`${profileDetails.emergencyContact || '-'}`}</span>
            </WithIconContainer>

            <WithIconContainer
              alignStart
              Icon={<BloodIcon />}
              rowGap="0"
              iconTranslateY="25px"
              Label={'Blood Group'}
              isHidden={
                !doesUserHaveViewAccess(
                  accessPermissionsForThisClient,
                  'PatientBasicProfileDetails',
                  'PatientBasicProfileDetails.18'
                )
              }
            >
              <span className={`${commonClasses.body17Regular}`}>{profileDetails.bloodGrp ? profileDetails.bloodGrp : '-'}</span>
            </WithIconContainer>

            <WithIconContainer alignStart Icon={<DBIcon />} rowGap="0" iconTranslateY="25px" Label={'Default nutrition database'}>
              <span className={`${commonClasses.body17Regular}`}>
                {profileDetails.USDatabase ? profileDetails.USDatabase : '-'}
              </span>
            </WithIconContainer>
          </div>
        </div>
      )}
    </>
  );
}
