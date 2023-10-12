import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorToaster from '../../../../Common/ErrorToaster';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { setAppliedConditionsNew } from '../../../../DisplayFramework/State/Slices/DashboardSlice';
import { IRootState } from '../../../../DisplayFramework/State/store';
import InputField from '../../../LibraryComponents/InputField/InputField';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import PanelFooter from '../../../LibraryComponents/PanelFooter/PanelFooter';
import Select from '../../../LibraryComponents/Select/Select';
import { getAddConditionObject, onAddNewCondition, validateAddConditionFields } from '../DiagnosticCondition.functions';
import { useStyles } from '../DiagnosticCondition.styles';
import { AddConditionProps, IConditionObject, IDefaultAddCondition, defaultAddCondition } from '../DiagnosticCondition.types';

const AddConditions = (props: AddConditionProps) => {
  const { setActiontype, conditionOptions } = props;
  const { classes } = useStyles(props);
  const { id: panelId } = useCurrentPanel();
  const dispatch = useDispatch();
  const isLoadingRef = useRef(false);

  const appliedConditions = useSelector((state: IRootState) => state.dashboard.appliedConditionsNew);

  const [addCondition, setAddCondition] = useState<IDefaultAddCondition>(defaultAddCondition);
  const [errors, setError] = useState(defaultAddCondition);

  const handleAddCondition = async () => {
    if (isLoadingRef.current) return;
    let { isValid, detailsError } = validateAddConditionFields(addCondition);
    setError(detailsError);
    if (!isValid) return ErrorToaster(`Please Enter the required values`, panelId, 'error');
    isLoadingRef.current = true;
    const response = await onAddNewCondition(panelId, props, addCondition);
    if (response) {
      const addedCondition = getAddConditionObject(response);
      const Conditions1: Array<IConditionObject> = [...appliedConditions.Conditions, addedCondition];
      const Conditions = Conditions1?.sort((a, b) => a?.Name?.localeCompare(b?.Name) || a?.Stage?.localeCompare(b?.Stage));
      dispatch(setAppliedConditionsNew({ ...appliedConditions, Conditions }));
    }
    setActiontype('DECISION');
    isLoadingRef.current = false;
  };

  const handleBack = () => setActiontype('DECISION');

  return (
    <div className={classes.rootContainer}>
      <PageHeader handleBack={handleBack} headerContent={'Add condition'} />
      <section className={classes.scrollBody}>
        <Select
          headerTitle={'Select a condition'}
          placeholder={'Condition'}
          values={addCondition?.Condition}
          setValues={(Condition: any) => {
            const condition = conditionOptions.find((item) => item.value === Condition);
            setAddCondition((pre: any) => ({
              ...pre,
              Condition,
              ConditionId: condition?.ConditionId,
              StageId: condition?.StageId,
            }));
          }}
          options={conditionOptions}
          optionsType={'label'}
          position={'bottom'}
          isDivider
          isAutoOk
          isSearch
        />
        <InputField
          onChange={(e) => {
            const Description = e.target.value;
            setAddCondition((pre) => ({ ...pre, Description }));
          }}
          label="Description"
          value={addCondition?.Description}
          helperText={errors?.Description}
          multiline
          maxRows={5}
        />
      </section>
      <PanelFooter
        paddingX="20px"
        customStyle={classes.footerStyle}
        leftButtonText={'Back'}
        righButtontText={'Add'}
        handleLeftButton={handleBack}
        handleRightButton={handleAddCondition}
      />
    </div>
  );
};

export default AddConditions;
