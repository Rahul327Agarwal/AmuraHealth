import { debounce } from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { AddCircleIcon } from '../../../SVGs/Common';

import PageHeader from '../../PageHeader/PageHeader';
import PanelFooter from '../../PanelFooter/PanelFooter';
import ProfileCardGroup from '../../ProfileCardGroup/ProfileCardGroup';
import { barColors } from '../../ProfileCardGroup/ProfileCardGroup.types';
import PropertyCard from '../../PropertyCard/PropertyCard';

import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import MUISkeleton from '../../MUISkeleton/MUISkeleton';
import { getUserName } from '../CareTeam.functions';
import { AssignLeadDoctorProps } from '../CareTeam.types';
import { getAllStaffProfileFromRole, initCoefficientObject, onSave, propertyCardConfig } from './AssignLeadDoctor.function';
import { useStyles } from './AssignLeadDoctor.styles';

const MemoPropertyCard = memo(PropertyCard);
const MemoProfileCardGroup = memo(ProfileCardGroup);

const AssignLeadDoctor = (props: AssignLeadDoctorProps) => {
  const { setActionType, selectedRole, selectedBulkRole, childEventTrigger, selectedClient } = props;
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

  useEffect(() => {
    (async () => {
      const response = await getAllStaffProfileFromRole(panelId, props);
      if (response) {
        setMatchProperties(response.properties);
        let staffDetails = JSON.parse(JSON.stringify(response.staffDetails));
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
          setActionType('NO_RESULTS');
        }
        setAllStaff(staffs);
        setRange(JSON.parse(JSON.stringify(range)));
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
    if (!selectedBulkRole) return setActionType('SELECT_ROLE');
    childEventTrigger(null, null, 'onCloseWorkPanelOnly', {});
  };

  const handleNext = async () => {
    const resonse = await onSave(
      panelId,
      props,
      profileLists.find((value) => value.id === finalSelectedProfile),
      selectedRole,
      selectedClientObject,
      props.setRemoveSelectedRole,
      selectedClient
    );
    if (resonse) handleCancel();
  };

  const debounceFun: Function = debounce(handleRangeChange, 500);

  const onRangeChange = useCallback((value) => debounceFun(value), []);

  return (
    <>
      <div className={classes.rootContainer}>
        <PageHeader customStyle={classes.padding20} handleBack={handleCancel} headerContent={`Assign ${selectedRole.label}`} />
        <div className={classes.middleContainer}>
          {props.isLoading && (
            <>
              <MUISkeleton
                animation="wave"
                variant="rectangular"
                height="135px"
                width="100%"
                style={{ marginBottom: '8px', marginTop: '20px' }}
              />
              <MUISkeleton animation="wave" variant="rectangular" height="135px" width="100%" style={{ marginBottom: '8px' }} />
              <MUISkeleton animation="wave" variant="rectangular" height="135px" width="100%" style={{ marginBottom: '8px' }} />
              <MUISkeleton animation="wave" variant="rectangular" height="135px" width="100%" style={{ marginBottom: '8px' }} />
            </>
          )}
          {!props.isLoading && (
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
          )}
          <div className={classes.propertyCardWrapper}>
            {propertyCardConfig.map((data) => (
              <MemoPropertyCard
                key={data.id}
                defaultRangeValue={1}
                isResetFilter={isResetFilter}
                profileProgress={profileLists}
                onRangeChange={onRangeChange}
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
    </>
  );
};

export default AssignLeadDoctor;
