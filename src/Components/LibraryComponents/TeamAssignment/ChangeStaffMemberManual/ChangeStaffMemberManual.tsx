import { IconButton, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { setCancelRessignment } from '../../../../DisplayFramework/State/Slices/BulkReassignment';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { BackArrowIcon, Close, NoResultsSVG } from '../../../SVGs/Common';
import IndeterminateLoader from '../../InderminateLoader/InderminateLoader';

import Button from '../../MUIButton/MUIButton';
import RadioGroup from '../../MUIRadioGroup/MUIRadioGroup';

import SearchField from '../../SearchField/SearchField';
import { getUserName } from '../CareTeam.functions';
import { getAllStaffForThatRole } from '../ManualStaffAdd/ManualStaffAdd.functions';
import { ChangeStaffMemberProps } from '../ChangeStaffMember/ChangeStaffMember.types';
import { useStyles } from './ChangeStaffMemberManual.styles';
import { useDFGoBack } from '../../../../DisplayFramework/Events/DFEvents';
import PageHeader from '../../PageHeader/PageHeader';
import { assignNewExistingStaff, removeExistingStaff } from './ChangeStaffMemberManual.functions';
import ErrorToaster from '../../../../Common/ErrorToaster';
import SuccessToaster from '../../../../Common/SuccessToaster';
import MUISkeleton from '../../MUISkeleton/MUISkeleton';
import { setIsTeamChangeInProgress } from '../../../../DisplayFramework/State/Slices/DashboardSlice';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
const ChangeStaffMemberManual = (props: ChangeStaffMemberProps) => {
  const { selectedRole, selectedBulkRole, childEventTrigger, selectedClient, allProfiles } = props;

  const { classes } = useStyles();
  const CommonStyles = useCommonStyles();
  const dispatch = useDispatch();
  const { id: panelId } = useCurrentPanel();
  const goBack = useDFGoBack();
  const [selectedStaff, setSelectedStaff] = useState({ value: '', label: '' });
  const [staffOptions, setStaffOptions] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState('');
  const selectedClientObject = useSelector((state: IRootState) => state.dashboard.selectedClientObject);

  const handleSelect = (value, label) => setSelectedStaff({ value, label });

  useEffect(() => {
    getAllStaffForThatRole(panelId, props, selectedRole)
      .then(async (response) => {
        if (!response.Error) {
          let staff = JSON.parse(JSON.stringify(response));

          staff = staff
            .map((user) => {
              return { value: user.userId, label: user.userName };
            })
            .filter((staff) => staff.value !== allProfiles[0].id);

          for (let i = 0; i < Object.keys(staff).length; i++) {
            let userName = await getUserName(staff[i].value, props.sessions);
            staff[i].label = userName;
          }
          setStaffOptions(staff);
          setFilteredStaff(staff);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchString.length > 2) {
      let staffTemp = JSON.parse(JSON.stringify(staffOptions));
      staffTemp = staffTemp.filter((value) => value.label.toLowerCase().indexOf(searchString.toLowerCase()) > -1);
      setFilteredStaff(staffTemp);
    }
    if (searchString === '') {
      setFilteredStaff(staffOptions);
    }
  }, [searchString]);

  const handleClose = () => {
    goBack('S');
    //dispatch(setCancelRessignment(true));
  };

  const handleAssign = async () => {
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
    const addResponse = await assignNewExistingStaff(props, selectedStaff.value, selectedRole.value);
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

  return (
    <>
      <>
        <div className={`${classes.roleContainer}`}>
          <PageHeader
            customStyle={classes.padding20}
            startAdornment={
              <IconButton
                onClick={() => {
                  goBack('S');
                  goBack('S');
                  dispatch(setIsTeamChangeInProgress(false));
                }}
              >
                <BackArrowIcon />
              </IconButton>
            }
            headerContent={`Assign ${selectedRole.label}`}
          />
          {isLoading && (
            <>
              <MUISkeleton variant={'rectangular'} height={'130px'} style={{ margin: '5px 0px' }} />
              <MUISkeleton variant={'rectangular'} height={'130px'} style={{ margin: '5px 0px' }} />
              <MUISkeleton variant={'rectangular'} height={'130px'} style={{ margin: '5px 0px' }} />
            </>
          )}
          {!isLoading && staffOptions.length === 0 && (
            <div className={`${classes.noResultsDiv}`}>
              <div>
                <div className={`${classes.textAlign}`}>
                  <NoResultsSVG />
                </div>
                <div className={`${classes.topMargin}`}>
                  <div className={`${classes.textAlign}`}>
                    <span className={`${CommonStyles.body20Medium}`}>{`No staff found to`}</span>
                  </div>
                  <div className={`${classes.textAlign}`}>
                    <span className={`${CommonStyles.body20Medium}`}>{`Assign ${selectedRole.label}`}</span>
                  </div>
                </div>
                <div className={`${classes.textAlign} ${classes.topMargin}`}>
                  <Button children={'Go Back'} variant="contained" size="large" startIcon={''} onClick={() => {}} />
                </div>
              </div>
            </div>
          )}
          {!isLoading && staffOptions.length > 0 && (
            <>
              <div className={classes.searchMatch}>
                <SearchField
                  placeholder={`Search for ${selectedRole.label}`}
                  handleSearch={(value) => {
                    setSearchString(value);
                  }}
                />
              </div>
              <div className={classes.radioWrapper}>
                <RadioGroup
                  variant={'radioForStaff'}
                  flexDirection="column"
                  isReverse
                  isDivider
                  options={filteredStaff}
                  value={selectedStaff.value}
                  setValue={handleSelect}
                />
              </div>
            </>
          )}
          {!isLoading && (
            <div>
              <div className={classes.selectFooter}>
                {selectedStaff.value && (
                  <Button children={`Assign Manually`} variant="contained" size="large" fullWidth={true} onClick={handleAssign} />
                )}
              </div>
            </div>
          )}
        </div>
      </>
    </>
  );
};

export default ChangeStaffMemberManual;
