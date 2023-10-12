import { styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { setCancelRessignment } from '../../../../DisplayFramework/State/Slices/BulkReassignment';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { Close, NoResultsSVG } from '../../../SVGs/Common';
import IndeterminateLoader from '../../InderminateLoader/InderminateLoader';

import Button from '../../MUIButton/MUIButton';
import RadioGroup from '../../MUIRadioGroup/MUIRadioGroup';

import SearchField from '../../SearchField/SearchField';

import { onSave } from '../AssignLeadDoctor/AssignLeadDoctor.function';
import { getUserName } from '../CareTeam.functions';
import { useStyles } from '../CareTeam.styles';
import { ManualSelectProps } from '../CareTeam.types';
import { getAllStaffForThatRole } from './ManualStaffAdd.functions';
import MUISkeleton from '../../MUISkeleton/MUISkeleton';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
const ContainerHeaderStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  //marginBottom: '20px',
  boxSizing: 'border-box',
  padding: '25px 20px 20px 20px',
  gap: '4px',
  '& .contentStyle': {
    color: theme.palette.colors.gray[900],
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    wordBreak: 'break-all',
  },
  '& .iconStyle': { cursor: 'pointer' },
}));
const ManualStaffAdd = (props: ManualSelectProps) => {
  const { setActionType, selectedRole, transferData, selectedBulkRole, childEventTrigger, selectedClient } = props;

  const { classes } = useStyles();
  const CommonStyles = useCommonStyles();
  const dispatch = useDispatch();
  const { id: panelId } = useCurrentPanel();
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

          staff = staff.map((user) => {
            return { value: user.userId, label: user.userName };
          });

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
    if (!selectedBulkRole) return setActionType(transferData?.id ? 'STAFF_HOME' : 'SELECT_ROLE');
    childEventTrigger(null, null, 'onCloseWorkPanelOnly', {});
    //dispatch(setCancelRessignment(true));
  };

  const handleAssign = async () => {
    setIsLoading(true);
    console.log('!!transferdata', transferData);
    console.log('!!selectedRole', selectedRole);

    const resonse = await onSave(
      panelId,
      props,
      { id: selectedStaff.value },
      selectedRole,
      selectedClientObject,
      props.setRemoveSelectedRole,
      selectedClient,
      transferData
    );
    setIsLoading(false);
    if (resonse) handleClose();
  };

  return (
    <>
      <>
        <div className={`${classes.roleContainer}`}>
          <ContainerHeaderStyled>
            <div className={`${CommonStyles.body17Medium} contentStyle`}>{`Assign ${selectedRole.label}`}</div>
            <div className="iconStyle" onClick={handleClose}>
              <Close />
            </div>
          </ContainerHeaderStyled>
          {isLoading && (
            <>
              <MUISkeleton
                animation="wave"
                variant="rectangular"
                height="70px"
                width="100%"
                style={{ margin: '20px 1rem 8px 1rem' }}
              />
              <MUISkeleton
                animation="wave"
                variant="rectangular"
                height="70px"
                width="100%"
                style={{ margin: '0 1rem 8px 1rem' }}
              />
              <MUISkeleton
                animation="wave"
                variant="rectangular"
                height="70px"
                width="100%"
                style={{ margin: '0 1rem 8px 1rem' }}
              />
              <MUISkeleton
                animation="wave"
                variant="rectangular"
                height="70px"
                width="100%"
                style={{ margin: '0 1rem 8px 1rem' }}
              />
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
                  <Button
                    children={'Go Back'}
                    variant="contained"
                    size="large"
                    startIcon={''}
                    onClick={() => {
                      setActionType(transferData?.id ? 'STAFF_HOME' : 'SELECT_ROLE');
                    }}
                  />
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

export default ManualStaffAdd;
