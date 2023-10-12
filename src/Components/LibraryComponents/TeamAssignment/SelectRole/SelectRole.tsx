// import { styled } from '@mui/material';
import { debounce, styled } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { Close } from '../../../SVGs/Common';
import IndeterminateLoader from '../../InderminateLoader/InderminateLoader';
import RadioGroup from '../../MUIRadioGroup/MUIRadioGroup';
// import { IRootState } from '../../../DisplayFramework/State/store';
// import IndeterminateLoader from '../../InderminateLoader/IndeterminateLoader';
// import RadioGroup from '../../MUIRadioGroup/RadioGroup';
import PannelFooter from '../../PannelFooter/PannelFooter';
// import { Close } from '../../SVGNew/Close';
// import { useCommonStyles } from '../../Theme/CommonStyles';
import { useStyles } from '../CareTeam.styles';
import { SelectRoleProps } from '../CareTeam.types';
import { getAllStaffProfileFromRole } from './SelectRole.functions';
import SearchField from '../../SearchField/SearchField';
import MUISkeleton from '../../MUISkeleton/MUISkeleton';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
const SelectRole = (props: SelectRoleProps) => {
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
  const { setActionType, setSelectedRole, roles, eligibleRolesCheck } = props;

  const { classes } = useStyles();
  const CommonStyles = useCommonStyles();
  const { id: panelId } = useCurrentPanel();
  const [role, setRole] = useState({ value: '', label: '' });
  const [roleOptions, setRoleOptions] = useState(roles);
  const [filteredRole, setFilteredRole] = useState([]);

  const [searchString, setSearchString] = useState('');

  const selectedClientObject = useSelector((state: IRootState) => state.dashboard.selectedClientObject);
  useEffect(() => {
    if (searchString.length > 2) {
      let staffTemp = JSON.parse(JSON.stringify(roleOptions));
      staffTemp = staffTemp.filter((value) => value.label.toLowerCase().indexOf(searchString.toLowerCase()) > -1);
      // staffTemp = staffTemp.filter((value) => value.label.toLowerCase().includes(searchString.toLowerCase()));
      setFilteredRole(staffTemp);
    }
    if (searchString === '') {
      setFilteredRole(roleOptions);
    }
  }, [searchString]);

  const handleSelect = (value, label) => setRole({ value, label });

  const handleAssign = async () => {
    props.setIsLoading(true);
    const response = await getAllStaffProfileFromRole(panelId, props, role);
    console.log('!!response', response);
    let staffDetails: any = [];
    if (response) {
      staffDetails = JSON.parse(JSON.stringify(response.staffDetails));
    }
    props.setIsLoading(false);
    setSelectedRole(role);
    if (staffDetails.length > 0) {
      setActionType('ASSIGN_LEAD');
    } else {
      setActionType('NO_RESULTS');
    }
  };

  useEffect(() => {
    setRoleOptions(roles);
  }, [roles]);

  const onSearch = (data) => {
    setSearchString(data);
  };
  const debounceSearchFun: Function = debounce(onSearch, 500);

  return (
    <>
      <div className={`${classes.roleContainer}`}>
        <ContainerHeaderStyled>
          <div className={`${CommonStyles.body17Medium} contentStyle`}>Select a role</div>
          {!eligibleRolesCheck && (
            <div
              className="iconStyle"
              onClick={() => {
                props.setActionType('STAFF_HOME');
              }}
            >
              <Close />
            </div>
          )}
        </ContainerHeaderStyled>

        <div className={classes.searchMatch}>
          <SearchField
            placeholder={`Search for Role`}
            // handleSearch={(value) => {setSearchString(value);}}
            handleSearch={debounceSearchFun}
          />
        </div>
        {props.isLoading && (
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
        {!props.isLoading && (
          <>
            <div className={classes.radioWrapper}>
              <RadioGroup
                variant={'radio'}
                flexDirection="column"
                isReverse
                isDivider
                options={filteredRole}
                value={role.value}
                setValue={handleSelect}
              />
            </div>
            {role.value && (
              <PannelFooter
                customStyle={`${classes.footerStyle} ${classes.positionRevert}`}
                handleAdd={handleAssign}
                handleCancel={() => {
                  setSelectedRole(role);
                  setActionType('ADD_MANUALLY');
                }}
                buttonOneTitle="Assign manually"
                buttonTwoTitle="Show Suggestions"
                buttonOneProps={{ size: 'small' }}
                buttonTwoProps={{ size: 'large', style: { padding: '16px' } }}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SelectRole;
