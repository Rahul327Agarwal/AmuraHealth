import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { useDFEvent, useDFGoBack } from '../../../DisplayFramework/Events/DFEvents';
import PageHeader from '../../LibraryComponents/PageHeader/PageHeader';
import useProfileDetails from './PatientDetailedProfile.hook';
import { useStyles } from './PatientDetailedProfile.styles';
import { IPatientDetailedProfile } from './PatientDetailedProfile.types';

import WithIconContainer from './Components/WithIconContainer';
import { ClockIconInEditHistory } from './PatientDetailedProfile.svg';
import { EditIcon } from '../../SVGs/Common';
import IndeterminateLoader from '../../LibraryComponents/InderminateLoader/InderminateLoader';
import MUISkeleton from '../../LibraryComponents/MUISkeleton/MUISkeleton';
export default function SocialPlatformView(props: IPatientDetailedProfile) {
  const { classes } = useStyles();
  const goBack = useDFGoBack();
  const commonClasses = useCommonStyles();
  const childEventTrigger = useDFEvent();
  const { profileDetails, isLoading } = useProfileDetails(props);

  const onBack = () => {
    goBack('S');
  };

  const handleEditHistory = () => {
    childEventTrigger('HistorySummary', {
      sourceComponent: 'SocialPlatformDetails',
    });
  };

  const onEdit = () => {
    childEventTrigger('onSocialPlatformDetailsEdit', props);
  };

  return (
    <>
      {isLoading && (
        <>
          <MUISkeleton animation="wave" variant="rectangular" height="80px" width="100%" style={{ margin: '20px 16px 8px 16px' }}/>
          <MUISkeleton animation="wave" variant="rectangular" height="80px" width="100%" style={{ margin: '0 16px 8px 16px' }}/>
          <MUISkeleton animation="wave" variant="rectangular" height="80px" width="100%" style={{ margin: '0 16px 8px 16px' }}/>
          <MUISkeleton animation="wave" variant="rectangular" height="80px" width="100%" style={{ margin: '0 16px 8px 16px' }}/>
          <MUISkeleton animation="wave" variant="rectangular" height="80px" width="100%" style={{ margin: '0 16px 8px 16px' }}/>
        </>
      )}
      {!isLoading && (
        <div className={classes.mainContainer}>
          <PageHeader
            customStyle={classes.headerStyle}
            handleBack={onBack}
            headerContent={'Social platforms'}
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
            <WithIconContainer rowGap="0" Label={'Facebook URL'} noStartingGap>
              <span className={`${commonClasses.body17Regular}  ${classes.marginT8}`}>{`${
                profileDetails?.facebookUrl || '-'
              }`}</span>
            </WithIconContainer>
            <WithIconContainer rowGap="0" Label={'Twitter URL'} noStartingGap>
              <span className={`${commonClasses.body17Regular}  ${classes.marginT8}`}>{`${
                profileDetails?.twitterUrl || '-'
              }`}</span>
            </WithIconContainer>
            <WithIconContainer rowGap="0" Label={'Instagram URL'} noStartingGap>
              <span className={`${commonClasses.body17Regular} ${classes.marginT8}`}>{`${
                profileDetails?.instagramUrl || '-'
              }`}</span>
            </WithIconContainer>
            <WithIconContainer rowGap="0" Label={'Youtube URL'} noStartingGap>
              <span className={`${commonClasses.body17Regular}  ${classes.marginT8}`}>{`${
                profileDetails?.youtubeUrl || '-'
              }`}</span>
            </WithIconContainer>
            <WithIconContainer rowGap="0" Label={'Linkedin URL'} noStartingGap>
              <span className={`${commonClasses.body17Regular} ${classes.marginT8}`}>{`${
                profileDetails?.linkedInUrl || '-'
              }`}</span>
            </WithIconContainer>
          </div>
        </div>
      )}
    </>
  );
}
