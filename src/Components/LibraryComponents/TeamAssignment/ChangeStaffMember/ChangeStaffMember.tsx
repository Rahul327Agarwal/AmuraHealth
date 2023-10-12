import { debounce } from '@mui/material';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { setCancelRessignment } from '../../../../DisplayFramework/State/Slices/BulkReassignment';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { AddCircleIcon } from '../../../SVGs/Common';
import IndeterminateLoader from '../../InderminateLoader/InderminateLoader';

import PageHeader from '../../PageHeader/PageHeader';
import PanelFooter from '../../PanelFooter/PanelFooter';
import ProfileCardGroup from '../../ProfileCardGroup/ProfileCardGroup';
import { barColors } from '../../ProfileCardGroup/ProfileCardGroup.types';
import PropertyCard from '../../PropertyCard/PropertyCard';

import { getUserName } from '../CareTeam.functions';
import { AssignLeadDoctorProps } from '../CareTeam.types';
import { getAllStaffProfileFromRole, initCoefficientObject, propertyCardConfig } from './ChangeStaffMember.function';
import { useStyles } from './ChangeStaffMember.styles';
import { useDFEvent, useDFGoBack } from '../../../../DisplayFramework/Events/DFEvents';
import NoResults from './NoResults';
import MUISkeleton from '../../MUISkeleton/MUISkeleton';
import { setIsTeamChangeInProgress } from '../../../../DisplayFramework/State/Slices/DashboardSlice';
import { assignNewExistingStaff, removeExistingStaff } from '../ChangeStaffMemberManual/ChangeStaffMemberManual.functions';
import ErrorToaster from '../../../../Common/ErrorToaster';
import SuccessToaster from '../../../../Common/SuccessToaster';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

const MemoPropertyCard = memo(PropertyCard);
const MemoProfileCardGroup = memo(ProfileCardGroup);

const ChangeStaffMember = (props: AssignLeadDoctorProps) => {
  const { selectedRole, selectedBulkRole, childEventTrigger, selectedClient, allProfiles } = props;
  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const commonClasses = useCommonStyles();
  const [range, setRange] = useState(initCoefficientObject);
  const [profileLists, setProfileLists] = useState([]);
  const [allStaff, setAllStaff] = useState([]);
  const [isResetFilter, setIsResetFilter] = useState(false);
  const [finalSelectedProfile, setFinalSelectedProfile] = useState();
  const [matchProperties, setMatchProperties] = useState({} as any);
  const selectedClientObject = useSelector((state: IRootState) => state.dashboard.selectedClientObject);
  const [isLoading, setIsLoading] = useState(true);
  const [noSuggestions, setNoSuggestions] = useState(false);
  const goBack = useDFGoBack();
  const sendEvent = useDFEvent();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllStaffProfileFromRole(panelId, props);
        console.log('!!response', response);
        if (response) {
          setMatchProperties(response.properties);
          let staffDetails = JSON.parse(JSON.stringify(response.staffDetails));
          if (staffDetails.length === 0) {
            setNoSuggestions(true);
            return;
          }
          let staffs = [];
          for (let i = 0; i < response.staffDetails.length; i++) {
            let userName = await getUserName(staffDetails[i].staffId, props.sessions);
            staffDetails[i].name = userName;
            let staff = {
              id: staffDetails[i].staffId,
              profileName: userName,
              ratingValue: '',
              progreesColor: '',
              ...staffDetails[i].matchIndex,
            };

            let sumOfCoeffAndScore = 0;
            let sumOfCoeff = 0;
            for (const key in range) {
              sumOfCoeffAndScore += (staff[key] || 0) * range[key];
              sumOfCoeff += range[key];
            }
            staff = {
              ...staff,
              progressValue: sumOfCoeffAndScore / sumOfCoeff,
            };
            staffs.push(staff);
          }
          staffs.sort((a, b) => b.progressValue - a.progressValue);
          if (staffs.length > 0) {
            const top4 = staffs.slice(0, 4);
            setProfileLists(top4);
            setFinalSelectedProfile(top4[0].id);
            setIsResetFilter(false);
          } else {
          }
          setAllStaff(staffs);
          setRange(JSON.parse(JSON.stringify(range)));
        }
      } catch (e) {
        console.error('Error while fetching suggested staff', e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const staffdata = [];
    allStaff.forEach((staff) => {
      const score = { ...staff };
      let sumOfCoeffAndScore = 0;
      let sumOfCoeff = 0;
      for (const key in range) {
        sumOfCoeffAndScore += score[key] * range[key];
        sumOfCoeff += range[key];
      }
      staffdata.push({
        ...staff,
        score,
        progressValue: sumOfCoeffAndScore / sumOfCoeff,
      });
    });
    staffdata.sort((a, b) => b.progressValue - a.progressValue);
    if (staffdata.length > 0) {
      let top4 = staffdata.slice(0, 4);
      top4 = top4.map((value, index) => ({
        ...value,
        progreesColor: barColors[index],
      }));
      setProfileLists(top4);
      setFinalSelectedProfile(top4[0].id);
      setIsResetFilter(false);
    }
  }, [range]);

  const handleRangeChange = (value) => setRange((pre) => ({ ...pre, ...value }));

  const handleCancel = () => {
    goBack('S');
    //dispatch(setCancelRessignment(true));
  };

  // const handleReset = () => {
  //   setRange(initCoefficientObject);
  //   setIsResetFilter(true);
  // };
  const handleNext = async () => {
    setIsLoading(true);
    console.log('!!selectedRole', selectedRole);
    const removeResponse = await removeExistingStaff(
      panelId,
      props,
      allProfiles[0].id,
      selectedRole.value,
      allProfiles[0].hierarchyId
    );
    if (!removeResponse) {
      ErrorToaster('Something went wrong!', panelId, 'error');
    }
    const addResponse = await assignNewExistingStaff(props, finalSelectedProfile, selectedRole.value);
    if (!addResponse) {
      ErrorToaster('Something went wrong!', panelId, 'error');
    }
    if (removeResponse && addResponse) {
      SuccessToaster('Staff changed successfully!', panelId, 'success');
      goBack('S');
      goBack('S');
      dispatch(setIsTeamChangeInProgress(false));
    }
    setIsLoading(false);
  };

  const debounceFun: Function = debounce(handleRangeChange, 500);

  return (
    <>
      {isLoading && (
        <div className={classes.rootContainer}>
          <PageHeader customStyle={classes.padding20} handleBack={handleCancel} headerContent={`Assign ${selectedRole.label}`} />
          <div className={classes.middleContainer}>
            <MUISkeleton variant={'rectangular'} height={'130px'} style={{ margin: '5px 0px' }} />
            <MUISkeleton variant={'rectangular'} height={'130px'} style={{ margin: '5px 0px' }} />
            <MUISkeleton variant={'rectangular'} height={'130px'} style={{ margin: '5px 0px' }} />
          </div>
        </div>
      )}
      {!isLoading && !noSuggestions && (
        <div className={classes.rootContainer}>
          <PageHeader customStyle={classes.padding20} handleBack={handleCancel} headerContent={`Assign ${selectedRole.label}`} />
          <div className={classes.middleContainer}>
            <MemoProfileCardGroup
              profileLists={profileLists}
              selectedProfile={finalSelectedProfile}
              setSelectedProfile={setFinalSelectedProfile}
              bottomComponent={
                <div
                  className={classes.addManually}
                  onClick={() => {
                    console.log('props about to be sent', props);
                    sendEvent('onManualChange', { ...props });
                  }}
                >
                  <span>
                    <AddCircleIcon />
                  </span>
                  <span className={`${commonClasses.caption12Medium}`}>Add Manually</span>
                </div>
              }
            />
            <div className={classes.propertyCardWrapper}>
              {propertyCardConfig.map((data) => (
                <MemoPropertyCard
                  key={data.id}
                  defaultRangeValue={1}
                  isResetFilter={isResetFilter}
                  profileProgress={profileLists}
                  onRangeChange={(value) => {
                    debounceFun(value);
                  }}
                  {...data}
                  rangeHeader={matchProperties[data.id] || 'None'}
                />
              ))}
            </div>
          </div>
          <div className={classes.footerButtons}>
            <PanelFooter
              paddingX="20px"
              handleLeftButton={handleCancel}
              handleRightButton={handleNext}
              disableRightButton={!finalSelectedProfile || !profileLists[0]}
              leftButtonText="Cancel"
              righButtontText="Assign"
            />
          </div>
        </div>
      )}
      {!isLoading && noSuggestions && <NoResults {...props} />}
    </>
  );
};

export default ChangeStaffMember;
