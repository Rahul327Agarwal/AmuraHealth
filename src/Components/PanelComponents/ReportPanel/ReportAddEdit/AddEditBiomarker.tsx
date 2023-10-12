import { CircularProgress, IconButton } from '@mui/material';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { CrossIcon } from '../../../SVGs/Common';
import { SPLIT_KEY, getBiomarkerOptionLabel, getBiomarkerOptionValue } from '../Reports/Reports.functions';
import InputField from './../../../LibraryComponents/InputField/InputField';
import Button from './../../../LibraryComponents/MUIButton/MUIButton';
import PageHeader from './../../../LibraryComponents/PageHeader/PageHeader';
import Select from './../../../LibraryComponents/Select/Select';
import { DEFAULT_BIOMARKER_STATE, getModifiedData, validateBiomarkerFields } from './ReportAddEdit.functions';
import { useStyles } from './ReportAddEdit.styles';
import { IAddEditBiomarkerProps, IBiomarker, IBiomarkerErrors } from './ReportAddEdit.types';

const InputFieldMemo = memo(InputField);
const MemoSelect = memo(Select);
const AddEditBiomarker = (props: IAddEditBiomarkerProps) => {
  const { handleClose, editData, setBiomarkers, preBiomarkers, bioIdsOptions, bioUnitIdOptions, onBiomarkerAPICall } = props;
  const { classes } = useStyles();

  const [biomarker, setBiomarker] = useState<IBiomarker>(DEFAULT_BIOMARKER_STATE);
  const [errors, setErrors] = useState<IBiomarkerErrors>(DEFAULT_BIOMARKER_STATE);
  const [isEditScreen, setIsEditScreen] = useState(false);
  const [isLoading, setIsLoading] = useState<{ [data: string]: boolean }>({});

  const isDisabled = useMemo(() => !Boolean(biomarker.biomarkerId && biomarker.unitId && biomarker.value), [biomarker]);
  const thisBioIdsOptions = useMemo(() => {
    if (!isEditScreen) return bioIdsOptions;
    return [
      ...bioIdsOptions,
      {
        label: getBiomarkerOptionLabel(editData?.biomarkerId, editData?.groupName, editData?.type),
        value: getBiomarkerOptionValue(editData?.biomarkerId, editData?.groupName, editData?.type),
      },
    ];
  }, [isEditScreen, bioIdsOptions]);

  useEffect(() => {
    if (editData?.biomarkerId) {
      setIsEditScreen(true);
      setBiomarker(editData);
    } else {
      setIsEditScreen(false);
    }
  }, [editData]);

  const onNameChange = useCallback((value) => {
    if (!value) return;
    const dataArr = value.split(SPLIT_KEY);
    const biomarkerId = dataArr[0];
    const groupName = dataArr[1];
    const type = dataArr[2];
    setBiomarker((pre) => ({ ...pre, biomarkerId, groupName, type }));
  }, []);
  const onUnitChange = useCallback((unitId) => setBiomarker((pre) => ({ ...pre, unitId })), []);
  const onValueChange = useCallback((e) => {
    const value = e.target.value;
    setBiomarker((pre) => ({ ...pre, value }));
  }, []);

  const onSave = async (flag: 'SAVE' | 'SAVE_ADD') => {
    let { isValid, errorsObject } = validateBiomarkerFields(biomarker);
    setErrors(errorsObject);
    if (!isValid) return;
    try {
      setIsLoading({ [flag]: true });
      let cloneBiomarkers: Array<IBiomarker> = JSON.parse(JSON.stringify(preBiomarkers)) || [];
      let payload: IBiomarker[];
      if (isEditScreen) {
        const sameBioId = editData.biomarkerId === biomarker.biomarkerId;
        const editIndex = cloneBiomarkers.findIndex((data) => data.biomarkerId === editData.biomarkerId);
        if (editIndex === -1) return;
        if (sameBioId) {
          payload = [{ ...biomarker, action: 'UPDATE' }];
        } else {
          payload = [
            { ...editData, action: 'DELETE' },
            { ...biomarker, action: 'ADD' },
          ];
        }
        cloneBiomarkers[editIndex] = { ...biomarker };
        await onBiomarkerAPICall(payload, cloneBiomarkers);
        setBiomarkers(cloneBiomarkers);
        setIsEditScreen(false);
        handleClose();
        return;
      }
      payload = [{ ...biomarker, action: 'ADD' }];
      const biomarkerPayload: IBiomarker[] = [...cloneBiomarkers, ...payload];
      await onBiomarkerAPICall(payload, biomarkerPayload);
      setBiomarkers(biomarkerPayload);
      if (flag === 'SAVE') handleClose();
      else setBiomarker(DEFAULT_BIOMARKER_STATE);
    } finally {
      setIsLoading({ [flag]: false });
    }
  };

  return (
    <div className={classes.overlapDrawerContainer}>
      <PageHeader
        handleBack={handleClose}
        headerContent={isEditScreen ? 'Edit biomarker' : 'Add biomarker'}
        endAdornment={<IconButton onClick={handleClose}>{<CrossIcon />}</IconButton>}
      />
      <div className={classes.scrollBody}>
        <section className={classes.inputWrapperBox}>
          <MemoSelect
            headerTitle={'Biomarker'}
            placeholder={'Biomarker'}
            values={getBiomarkerOptionValue(biomarker?.biomarkerId, biomarker?.groupName, biomarker?.type)}
            helperText={errors.biomarkerId}
            setValues={onNameChange}
            options={thisBioIdsOptions}
            optionsType={'label'}
            position={'bottom'}
            isDivider
            isAutoOk
            isSearch
          />
          <MemoSelect
            headerTitle={'Unit'}
            placeholder={'Unit'}
            values={biomarker.unitId}
            helperText={errors.unitId}
            setValues={onUnitChange}
            options={bioUnitIdOptions}
            optionsType={'label'}
            position={'bottom'}
            isDivider
            isAutoOk
            isSearch
          />
          <InputFieldMemo label="Value" value={biomarker.value} helperText={errors.value} onChange={onValueChange} />
          <div className={classes.saveButtonWrapper}>
            <Button
              startIcon={
                isLoading['SAVE'] ? <CircularProgress className={!isDisabled ? classes.loaderWhite : ''} size={20} /> : null
              }
              disabled={isDisabled}
              variant="contained"
              onClick={() => onSave('SAVE')}
            >
              Save
            </Button>
            {isEditScreen ? null : (
              <Button
                startIcon={
                  isLoading['SAVE_ADD'] ? <CircularProgress className={!isDisabled ? classes.loaderWhite : ''} size={20} /> : null
                }
                disabled={isDisabled}
                variant="contained"
                onClick={() => onSave('SAVE_ADD')}
              >
                Save & add another
              </Button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddEditBiomarker;
