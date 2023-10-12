import React, { memo, useCallback, useState } from 'react';
import { useStyles } from './MoveCardRequest.styles';
import { IMoveMyCardsProps, IErrorsState, IFieldState } from './MoveCardRequest.types';
import { DECLINE_TYPE, DEFAULT_ERRORSTATE, DEFAULT_FIELDSTATE, validateFields } from './MoveCardRequest.function';
import RoleAndTenant from './Components/RoleAndTenant/RoleAndTenant';
import Select from '../../../LibraryComponents/Select/Select';
import InputField from '../../../LibraryComponents/InputField/InputField';
import MUIDatePicker from '../../../LibraryComponents/MUIDatePicker/MUIDatePicker';
import MUITimePicker from '../../../LibraryComponents/MUITimePicker/MUITimePicker';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import PanelFooter from '../../../LibraryComponents/PanelFooter/PanelFooter';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import WithIconContainer from '../../TimeManagement/Components/WithIconContainer';
import { useDFGoBack } from '../../../../DisplayFramework/Events/DFEvents';
import { getBlueDotsOfAStaffForAnyPatient } from '../../../LibraryComponents/ChatComponent/BlueDotPopUp/BlueDotClosePopUp/BlueDotClosePopUp.functions';
import ErrorToaster from './../../../../Common/ErrorToaster';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

const MemoInputField = memo(InputField);
const MemoMUIDatePicker = memo(MUIDatePicker);
const MemoMUITimePicker = memo(MUITimePicker);
const MemoSelect = memo(Select);

export default function MoveCardRequest(props: IMoveMyCardsProps) {
  const goBack = useDFGoBack();
  const allUserRole = useSelector((state: IRootState) => state.dashboard.allUserRoles);
  const { setScreen, setFieldState, fieldState, setErrors, errors, sessions, selectedRoleCards, setSelectedRoleCards } =
    props || {};
  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const commonClasses = useCommonStyles();
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);

  const onTitleChange = useCallback((e) => {
    const title = e.target.value;
    setFieldState((pre) => ({ ...pre, title }));
    setErrors((pre) => ({ ...pre, title: '' }));
  }, []);
  //  it will comes in future requirement
  // const onDescriptionChange = useCallback((e) => {
  //   const description = e.target.value;
  //   setFieldState((pre) => ({ ...pre, description }));
  //   setErrors((pre) => ({ ...pre, description: '' }));
  // }, []);
  const onStartDateChange = useCallback((startDate) => {
    setFieldState((pre) => ({ ...pre, startDate }));
    setErrors((pre) => ({ ...pre, startDate: '' }));
  }, []);
  const onEndDateChange = useCallback((endDate) => {
    setFieldState((pre) => ({ ...pre, endDate }));
    setErrors((pre) => ({ ...pre, endDate: '' }));
  }, []);
  const onStartTimeChange = useCallback((startTime) => {
    setFieldState((pre) => ({ ...pre, startTime }));
    setErrors((pre) => ({ ...pre, startTime: '' }));
  }, []);
  const onEndTimeChange = useCallback((endTime) => {
    setFieldState((pre) => ({ ...pre, endTime }));
    setErrors((pre) => ({ ...pre, endTime: '' }));
  }, []);
  //  it will comes in future requirement
  // const onTimeZoneChange = useCallback((timeZone) => {
  //   setFieldState((pre) => ({ ...pre, timeZone }));
  //   setErrors((pre) => ({ ...pre, timeZone: '' }));
  // }, []);

  const onSelectedTenantRoles = useCallback((selectedCards) => {
    setSelectedRoleCards(selectedCards);
  }, []);

  const handleBack = () => {
    setFieldState(DEFAULT_FIELDSTATE);
    setErrors(DEFAULT_ERRORSTATE);
    goBack('H');
    // setScreen('HOME');
  };
  const handleSave = async () => {
    try {
      let { isValid, errorsObject } = validateFields(fieldState);
      try {
        for (let index = 0; index < Object.keys(selectedRoleCards).length; index++) {
          const tenantId = Object.keys(selectedRoleCards)[index];
          for (let y = 0; y < selectedRoleCards[tenantId].length; y++) {
            const element = selectedRoleCards[tenantId][y];
            let bluedots = await getBlueDotsOfAStaffForAnyPatient(panelId, props.sessions, element, props.sessions.user.id);
            if (bluedots.length > 0) {
              ErrorToaster(
                `You have unresolved bluedots as ${allUserRole.find((value) => value.roleId === element)?.roleName || element}`,
                panelId,
                'error'
              );
              throw new Error('Something went wrong! Please try again');
            }
          }
        }
      } catch (e) {
        throw new Error('Something went wrong! Please try again');
      }
      if (isValid && Object.keys(selectedRoleCards).length > 0) {
        setScreen('MOVE_CARD_DESCRIPTION');
      } else {
        if (Object.keys(selectedRoleCards).length === 0) {
          ErrorToaster('Please select atleast one role', panelId, 'error');
        }
        return setErrors(errorsObject);
      }
    } catch (error) {}
  };

  return (
    <div className={classes.mainContainer}>
      <PageHeader handleBack={handleBack} headerContent={'Move my cards request details'} />
      <div className={classes.scrollBody}>
        {/* <WithIconContainer Icon={<TimeIcon />}>
          <MemoMUIDatePicker
            label="Start date"
            date={fieldState.startDate}
            setDate={onStartDateChange}
            format={'E dd, LLL yyyy'}
            helperText={errors.startDate}
          />
        </WithIconContainer> */}
        {/* <WithIconContainer>
          <MemoMUITimePicker
            headerTitle={'Start time'}
            label="Start time"
            value={fieldState.startTime}
            onChange={onStartTimeChange}
            //helperText={errors.startTime}
          />
        </WithIconContainer> */}
        {/* we are not dealing permanentCheckbox its always true only */}
        {/* <WithIconContainer>
          <span className={classes.permanentCheckboxContainer} onClick={() => {}}>
            <Checkbox checked={Boolean(fieldState.permanentCheck)} />
            <span className={`${commonClasses.body17Regular} ${classes.labelText}`}>Permanent</span>
          </span>
        </WithIconContainer> */}
        {/* <Divider className={classes.dividerStyle} /> */}
        {props?.sessions?.user?.roles?.length > 0 && (
          <RoleAndTenant
            tenantsWithRoles={props.sessions.user.roles}
            setSelectedRoleCards={onSelectedTenantRoles}
            selectedRoleCards={selectedRoleCards}
          />
        )}
      </div>
      <PanelFooter
        paddingX="20px"
        customStyle={classes.footerStyle}
        leftButtonText={'Cancel'}
        righButtontText={'Next'}
        disableRightButton={disableSubmit}
        handleLeftButton={handleBack}
        handleRightButton={handleSave}
      />
    </div>
  );
}
