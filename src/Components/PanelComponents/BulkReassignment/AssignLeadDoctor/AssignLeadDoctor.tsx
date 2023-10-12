import { debounce } from '@mui/material';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { AddCircleIcon } from '../../../SVGs/Common';
import { getAllStaffProfileFromRole, initCoefficientObject, onSave, propertyCardConfig } from './AssignLeadDoctor.function';
import { useStyles } from './AssignLeadDoctor.styles';
import PropertyCard from '../../../LibraryComponents/PropertyCard/PropertyCard';
import ProfileCardGroup from '../../../LibraryComponents/ProfileCardGroup/ProfileCardGroup';
import { AssignLeadDoctorProps } from '../ManualAddFlow/ManualAddFlow.types';
import { getUserName } from '../ManualAddFlow/ManualAddFlow.functions';
import { barColors } from '../../../LibraryComponents/ProfileCardGroup/ProfileCardGroup.types';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import PanelFooter from '../../../LibraryComponents/PanelFooter/PanelFooter';
import IndeterminateLoader from '../../../LibraryComponents/InderminateLoader/InderminateLoader';
import { getUserNameFromES } from '../../../../Common/Common.functions';
import { useDFEvent, useDFGoBack } from '../../../../DisplayFramework/Events/DFEvents';
import MUISkeleton from '../../../LibraryComponents/MUISkeleton/MUISkeleton';
import { useFetchUserName } from '../../../../Common/Common.hooks';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

const MemoPropertyCard = memo(PropertyCard);
const MemoProfileCardGroup = memo(ProfileCardGroup);

const AssignLeadDoctor = (props: AssignLeadDoctorProps) => {
  const { setActionType, selectedRole, selectedClient, cardsToAssign, staffPoolData, setAction } = props;
  const { classes } = useStyles();
  const childEventTrigger = useDFEvent();
  const { id: panelId } = useCurrentPanel();
  const goBack = useDFGoBack();
  const commonClasses = useCommonStyles();
  const [range, setRange] = useState(initCoefficientObject);
  const [profileLists, setProfileLists] = useState([]);
  const [allStaff, setAllStaff] = useState([]);
  const [isResetFilter, setIsResetFilter] = useState(false);
  const [finalSelectedProfile, setFinalSelectedProfile] = useState();
  const [matchProperties, setMatchProperties] = useState({} as any);
  const [staffName, setStaffName] = useState('');
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { fetchUserName } = useFetchUserName();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      // let esStaffName = await getUserNameFromES(cardsToAssign.patientId);
      let esStaffName = await fetchUserName(cardsToAssign.patientId);

      setStaffName(esStaffName);
      const response = await getAllStaffProfileFromRole(panelId, props);
      if (response) {
        setMatchProperties(response.properties);
        let staffDetails = JSON.parse(JSON.stringify(response.staffDetails));
        let staffs = [];
        for (let i = 0; i < response.staffDetails.length; i++) {
          // let userName = await getUserName(staffDetails[i].staffId, props.sessions);
          let userName = await fetchUserName(staffDetails[i].staffId);
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
          setFinalSelectedProfile(top4[0]?.id);
          setIsResetFilter(false);
        } else {
          setActionType('NO_RESULTS');
        }
        setAllStaff(staffs);
        setRange(JSON.parse(JSON.stringify(range)));
      }
      setIsLoading(false);
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
    // if (!selectedBulkRole) return setActionType('SELECT_ROLE');
    // childEventTrigger(null, null, 'onCloseWorkPanelOnly', {});
    // //dispatch(setCancelRessignment(true));
    setAction('STAFFPOOLVIEW');
  };

  // const handleReset = () => {
  //   setRange(initCoefficientObject);
  //   setIsResetFilter(true);
  // };
  const handleToTotalClose = () => {
    goBack('S');
    // childEventTrigger('onEmptyWorkPanel', {});
  };
  const handleNext = async () => {
    setIsLoading(true);
    const resonse = await onSave(
      props,
      profileLists.find((value) => value.id === finalSelectedProfile),
      panelId
    );
    if (resonse) handleToTotalClose();
    setIsLoading(false);
  };

  const debounceFun: Function = debounce(handleRangeChange, 500);

  return (
    <>
      {isLoading && (
        <>
          <MUISkeleton variant={'rectangular'} height={'100px'} style={{ margin: '5px 0px' }} />
          <MUISkeleton variant={'rectangular'} height={'100px'} style={{ margin: '5px 0px' }} />
          <MUISkeleton variant={'rectangular'} height={'100px'} style={{ margin: '5px 0px' }} />
          <MUISkeleton variant={'rectangular'} height={'100px'} style={{ margin: '5px 0px' }} />
          <MUISkeleton variant={'rectangular'} height={'100px'} style={{ margin: '5px 0px' }} />
        </>
      )}
      {!isLoading && (
        <div className={classes.rootContainer}>
          <PageHeader customStyle={classes.padding20} handleBack={handleCancel} headerContent={`Assign doctor to ${staffName}`} />
          <div className={classes.middleContainer}>
            <MemoProfileCardGroup
              profileLists={profileLists}
              selectedProfile={finalSelectedProfile}
              setSelectedProfile={setFinalSelectedProfile}
              bottomComponent={
                <div
                  className={classes.addManually}
                  onClick={() => {
                    setActionType('ADD_MANUALLY');
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
                  onRangeChange={(value) => debounceFun(value)}
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
    </>
  );
};

export default AssignLeadDoctor;
