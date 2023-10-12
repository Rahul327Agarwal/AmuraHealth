import { styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { Close, NoResultsSVG } from '../../../SVGs/Common';
import Button from '../../../LibraryComponents/MUIButton/MUIButton';
import { onSave } from '../AssignLeadDoctor/AssignLeadDoctor.function';
import { useStyles } from '../ManualAddFlow/ManualAddFlow.styles';
import { ManualSelectProps } from '../ManualAddFlow/ManualAddFlow.types';
import SearchField from '../../../LibraryComponents/SearchField/SearchField';
import RadioGroup from '../../../LibraryComponents/MUIRadioGroup/MUIRadioGroup';
import IndeterminateLoader from '../../../LibraryComponents/InderminateLoader/InderminateLoader';
import { getUserNameFromES } from '../../../../Common/Common.functions';
import { useDFEvent, useDFGoBack } from '../../../../DisplayFramework/Events/DFEvents';
import { useFetchUserName } from '../../../../Common/Common.hooks';
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
  const { setActionType, selectedRole, transferData, selectedClient, setAction, cardsToAssign, staffPoolData } = props;

  const { classes } = useStyles();
  const CommonStyles = useCommonStyles();
  const dispatch = useDispatch();
  const { id: panelId } = useCurrentPanel();
  const [selectedStaff, setSelectedStaff] = useState({ value: '', label: '' });
  const [staffOptions, setStaffOptions] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState('');
  const [staffName, setStaffName] = useState('');
  const { fetchUserName } = useFetchUserName();

  const handleSelect = (value, label) => setSelectedStaff({ value, label });
  const childEventTrigger = useDFEvent();
  const goBack = useDFGoBack();
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      // let esStaffName = await getUserNameFromES(cardsToAssign.patientId);
      let esStaffName = await fetchUserName(cardsToAssign.patientId);
      setStaffName(esStaffName);
      let userIdsdata = Object.values(staffPoolData);
      let staff = userIdsdata[0]?.map((each) => {
        return {
          value: each,
          label: each,
        };
      });
      for (let i = 0; i < Object.keys(staff).length; i++) {
        // let userName = await getUserNameFromES(staff[i].value);
        let userName = await fetchUserName(staff[i].value);
        staff[i].label = userName;
      }
      setStaffOptions(staff);
      setFilteredStaff(staff);
      setIsLoading(false);
    })();
  }, [staffPoolData]);

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
    setAction('STAFFPOOLVIEW');
  };
  const handleToTotalClose = () => {
    goBack('S');
    // childEventTrigger('onEmptyWorkPanel', {});
  };
  const handleAssign = async () => {
    setIsLoading(true);
    const resonse = await onSave(props, { id: selectedStaff.value }, panelId);
    if (resonse) handleToTotalClose();
    setIsLoading(false);
  };

  return (
    <>
      {/* {isLoading && <IndeterminateLoader panelWidth={props?.panel?.width} />} */}
      <>
        <div className={`${classes.roleContainer}`}>
          <ContainerHeaderStyled>
            <div className={`${CommonStyles.body17Medium} contentStyle`}>{`Assign doctor to ${staffName}`}</div>
            <div className="iconStyle" onClick={handleClose}>
              <Close />
            </div>
          </ContainerHeaderStyled>
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
                      setAction('STAFFPOOLVIEW');
                      // setActionType(transferData.id ? 'STAFF_HOME' : 'SELECT_ROLE');
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
