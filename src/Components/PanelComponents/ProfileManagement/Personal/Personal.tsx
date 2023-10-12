import { IconButton } from '@mui/material';
import { format } from 'date-fns';
import { set } from 'lodash';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { EditIcon } from '../../../SVGs/Common';
import { callCitiesAPI, callCountriesAPI } from '../ProfileManagement.functions';
import { PersonalProps } from '../ProfileManagement.types';
import InputField from './../../../LibraryComponents/InputField/InputField';
import Button from './../../../LibraryComponents/MUIButton/MUIButton';
import MUIDatePicker from './../../../LibraryComponents/MUIDatePicker/MUIDatePicker';
import MUIDrawer from './../../../LibraryComponents/MUIDrawer/MUIDrawer';
import RadioGroup from './../../../LibraryComponents/MUIRadioGroup/MUIRadioGroup';
import Select from './../../../LibraryComponents/Select/Select';
import {
  GENDER_OPTIONS,
  MODIFIED_DETAILS_OPTIONS,
  MODIFIED_GENDER_OPTIONS,
  SALUTATION_OPTIONS,
  getLanguage,
  getNationality,
} from './Personal.functions';
import { useStyles } from './Personal.styles';

const MemoSelect = memo(Select);
const MemoRadioGroup = memo(RadioGroup);
const MemoMUIDatePicker = memo(MUIDatePicker);
const MemoInputField = memo(InputField);

const NATIONALITIES_OPTIONS = getNationality();
const LANGUAGES_OPTIONS = getLanguage();

export default function Personal(props: PersonalProps) {
  const {
    citiesOption,
    countriesOption,
    timezoneOption,
    profileEditable,
    personalState,
    setPersonalState,
    personalError,
    setPersonalError,
  } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const [openGenderModified, setOpenGenderModified] = useState(false);
  const [modifiedGender, setModifiedGender] = useState({
    MedicallyModifiedGender: personalState.MedicallyModifiedGender,
    userTypedGender: personalState.userTypedGender,
    isUserTypedGender: personalState.isUserTypedGender,
  });
  useEffect(() => {
    setModifiedGender({
      MedicallyModifiedGender: personalState.MedicallyModifiedGender,
      userTypedGender: personalState.userTypedGender,
      isUserTypedGender: personalState.isUserTypedGender,
    });
  }, [personalState.MedicallyModifiedGender, personalState.userTypedGender, personalState.isUserTypedGender]);

  const handleSalutation = useCallback((Salutation: any) => {
    setPersonalState((pre: any) => ({ ...pre, Salutation }));
  }, []);
  const handleFirstName = useCallback((e: any) => {
    const FirstName = e.target.value;
    setPersonalError((prev: any) => ({ ...prev, FirstName: '' }));
    setPersonalState((pre: any) => ({ ...pre, FirstName }));
  }, []);
  const handleLastName = useCallback((e: any) => {
    const LastName = e.target.value;
    setPersonalError((prev: any) => ({ ...prev, LastName: '' }));
    setPersonalState((pre: any) => ({ ...pre, LastName }));
  }, []);
  const handleGender = useCallback((Gender: any) => {
    setPersonalState((pre: any) => ({ ...pre, Gender }));
  }, []);
  const handleModifiedGender = useCallback((isModifiedGender: any) => {
    setOpenGenderModified(isModifiedGender);
    // personalError.userTypedGender=="";
    setPersonalState((pre: any) => ({ ...pre, isModifiedGender }));
    if (!isModifiedGender) {
      setModifiedGender((pre) => ({
        ...pre,
        userTypedGender: '',
        MedicallyModifiedGender: '',
        isUserTypedGender: false,
      }));
      setPersonalState((pre: any) => ({
        ...pre,
        userTypedGender: '',
        MedicallyModifiedGender: '',
        isUserTypedGender: false,
      }));

      setPersonalError({
        isModifiedGender: false,
        isUserTypedGender: false,
        MedicallyModifiedGender: '',
        userTypedGender: '',
        PreferredLanguages: [],
      });
    }
  }, []);
  const handleMedicallyModifiedGender = useCallback((MedicallyModifiedGender: any) => {
    setModifiedGender((pre) => ({
      ...pre,
      MedicallyModifiedGender,
      userTypedGender: '',
    }));
    (MedicallyModifiedGender || personalError.userTypedGender) && setPersonalError((prev) => ({ ...prev, userTypedGender: '' }));
  }, []);
  const handleUserTypedGender = useCallback((e: any) => {
    const userTypedGender = e.target.value.trim() ? e.target.value : e.target.value.trim();
    setModifiedGender((pre) => ({
      ...pre,
      userTypedGender,
      MedicallyModifiedGender: userTypedGender.trim() ? '' : pre.MedicallyModifiedGender,
      isUserTypedGender: Boolean(userTypedGender),
    }));
     setPersonalError((prev) => ({ ...prev, userTypedGender: '' }));
  }, []);
  const handleDateOfBirth = useCallback((DateOfBirth: any) => {
    setPersonalState((pre: any) => ({ ...pre, DateOfBirth }));
  }, []);
  const handleNationality = useCallback((Nationality: any) => {
    setPersonalState((pre: any) => ({ ...pre, Nationality }));
  }, []);
  const handleCurrentResidence = useCallback((e: any) => {
    const CurrentResidence = e.target.value;
    setPersonalState((pre: any) => ({ ...pre, CurrentResidence }));
  }, []);
  const handleCity = useCallback((City: any) => {
    setPersonalState((pre: any) => ({ ...pre, City }));
  }, []);
  const handleCountry = useCallback((_: any, e: any) => {
    if (!e?.value || !e?.label) return;
    setPersonalState((pre: any) => ({
      ...pre,
      CountryCode: e.value,
      Country: e.label,
      City: e.label === pre.Country ? pre.City : '',
    }));
  }, []);
  const handleTimeZoneName = useCallback((_: any, e: any) => {
    if (!e?.value || !e?.label) return;
    setPersonalState((pre: any) => ({
      ...pre,
      TimeZone: e?.value,
      TimeZoneName: e?.label,
    }));
  }, []);
  const handlePreferredLanguages = useCallback((PreferredLanguages: any) => {
    setPersonalState((pre: any) => ({ ...pre, PreferredLanguages }));
  }, []);

  const handleEditModifyGender = () => setOpenGenderModified(true);
  const handleCloseModifiedDrawer = () => {
    if (
      personalState.userTypedGender.trim() === '' &&
      modifiedGender.MedicallyModifiedGender == '' &&
      modifiedGender.userTypedGender.trim() == '' &&
      personalState.MedicallyModifiedGender == ''
    ) {
      setPersonalState((pre: any) => ({ ...pre, isModifiedGender: false }));
      // setOpenGenderModified(false);
      // setPersonalError((prev) => ({ ...prev, userTypedGender: '' }));

      // return;
    }
    //setPersonalState((pre: any) => ({ ...pre, isModifiedGender: false }));
    setPersonalError((prev) => ({ ...prev, userTypedGender: '' }));
    setModifiedGender((pre) => ({
      ...pre,
      MedicallyModifiedGender: personalState.MedicallyModifiedGender,
      userTypedGender: personalState.userTypedGender,
    }));
    setOpenGenderModified(false);
  };
  const handleDoneModifiedGender = () => {
    // setModifiedGender((prev) => ({ ...prev, userTypedGender: prev.userTypedGender.trim() }));
    if (modifiedGender.userTypedGender.trim() === '' && !modifiedGender.MedicallyModifiedGender) {
      setPersonalError((prev) => ({ ...prev, userTypedGender: 'Invalid Input' }));
      return;
    }
    if (modifiedGender.MedicallyModifiedGender == '' && modifiedGender.userTypedGender.trim() == '') {
      setPersonalState((pre: any) => ({ ...pre, isModifiedGender: false }));
      setOpenGenderModified(false);
      return;
    }
    if (modifiedGender.MedicallyModifiedGender == '' && modifiedGender.userTypedGender.trim().length > 60) {
      setPersonalError((prev) => ({ ...prev, userTypedGender: 'Please enter maximum 60 characters only' }));
      return;
    }
    setModifiedGender((prev) => ({ ...prev, userTypedGender: prev.userTypedGender.trim() }));
    setPersonalState((pre: any) => ({ ...pre, ...modifiedGender, userTypedGender: modifiedGender.userTypedGender.trim() }));
    setOpenGenderModified(false);
    setPersonalError((prev) => ({ ...prev, userTypedGender: '' }));
  };
  return (
    <>
      <div className={classes.profileBody} tabIndex={-1}>
        {profileEditable ? (
          <MemoSelect
            placeholder="Title"
            headerTitle="Title"
            options={SALUTATION_OPTIONS}
            setValues={handleSalutation}
            values={personalState.Salutation}
            helperText={personalError.Salutation}
            position={'bottom'}
            optionsType={'radio'}
            isAutoOk
            isDivider
          />
        ) : (
          <MemoInputField label="Title" onChange={handleSalutation} value={personalState.Salutation} disabled={true} />
        )}
        <MemoInputField
          label="First name"
          onChange={handleFirstName}
          value={personalState.FirstName}
          helperText={profileEditable ? personalError.FirstName : null}
          disabled={!profileEditable}
        />
        <MemoInputField
          label="Last name"
          onChange={handleLastName}
          value={personalState.LastName}
          helperText={profileEditable ? personalError.LastName : null}
          disabled={!profileEditable}
        />
        {profileEditable ? (
          <div className={classes.inputWrapper}>
            <div className={`${commonClasses.body15Regular} ${classes.subLabel}`}>Sex at birth</div>
            <MemoRadioGroup variant={'radio'} options={GENDER_OPTIONS} value={personalState.Gender} setValue={handleGender} />
          </div>
        ) : (
          <MemoInputField label="Sex at birth" value={personalState.Gender} disabled={true} />
        )}
        {profileEditable ? (
          <div className={classes.inputWrapper}>
            <div className={`${commonClasses.body15Regular} ${classes.subLabel}`}>Has it been medically modified in any way?</div>
            <MemoRadioGroup
              variant={'tokenWithoutCross'}
              options={MODIFIED_GENDER_OPTIONS}
              value={personalState.isModifiedGender}
              setValue={handleModifiedGender}
            />
          </div>
        ) : (
          <MemoInputField
            label="Has it been medically modified in any way?"
            value={
              personalState.isModifiedGender == true
                ? `Yes, ${personalState.userTypedGender || personalState.MedicallyModifiedGender}`
                : 'No'
            }
            disabled={true}
          />
        )}

        {profileEditable && personalState.isModifiedGender && (
          <div>
            {personalState.isUserTypedGender && (
              <div className={`${commonClasses.body15Medium} ${classes.subLabel1}`}>Let me Type</div>
            )}
            <MemoInputField
              label="My gender"
              value={personalState.userTypedGender || personalState.MedicallyModifiedGender}
              helperText={personalError.userTypedGender}
              InputProps={{
                endAdornment: <IconButton onClick={handleEditModifyGender}>{<EditIcon />}</IconButton>,
                readOnly: true,
              }}
            />
          </div>
        )}
        {profileEditable ? (
          <MemoMUIDatePicker
            label="Date of birth"
            // format="yyyy/MM/dd"
            setDate={handleDateOfBirth}
            date={personalState.DateOfBirth ? new Date(personalState.DateOfBirth) : null}
            helperText={personalError.DateOfBirth}
            // disabled={!profileEditable}
            maxDate={new Date()}
            minDate={new Date('1900-01-01')}
          />
        ) : (
          <MemoInputField
            label="Date of birth"
            value={
              personalState.DateOfBirth && new Date(personalState.DateOfBirth).toString() !== 'Invalid Date'
                ? `${format(new Date(personalState.DateOfBirth), 'dd/MM/yyyy')}`
                : ''
            }
            disabled={true}
          />
        )}
        <div className={`${commonClasses.body17Medium} ${classes.mainLabel}`}>Location</div>
        {profileEditable ? (
          <MemoSelect
            placeholder="Nationality"
            headerTitle="Nationality"
            options={NATIONALITIES_OPTIONS}
            values={personalState.Nationality}
            helperText={personalError.Nationality}
            setValues={handleNationality}
            parameter={'label'}
            position={'bottom'}
            optionsType={'label'}
            isAutoOk
            isDivider
            isSearch
            drawerPadding={'20px 20px 0px 20px'}
          />
        ) : (
          <MemoInputField label="Nationality" value={personalState.Nationality} disabled={true} />
        )}

        {profileEditable ? (
          <MemoSelect
            placeholder="Country"
            headerTitle="Country"
            options={countriesOption}
            setValues={handleCountry}
            onSearchAPICall={(data) => callCountriesAPI(data)}
            values={personalState.Country}
            helperText={personalError.Country}
            parameter={'label'}
            optionsType={'label'}
            position={'bottom'}
            isReturnSelectedOption
            isAutoOk
            isDivider
            isSearch
            drawerPadding={'20px 20px 0px 20px'}
          />
        ) : (
          <MemoInputField label="Country" value={personalState.Country} disabled={true} />
        )}
        {profileEditable ? (
          <MemoSelect
            placeholder="City"
            headerTitle="City"
            options={citiesOption}
            setValues={handleCity}
            onSearchAPICall={(data) => callCitiesAPI(personalState.CountryCode, data)}
            values={personalState.City}
            helperText={personalError.City}
            disabled={!profileEditable || !Boolean(personalState.CountryCode)}
            parameter={'label'}
            // optionsType={'radio'}
            optionsType={'label'}
            position={'bottom'}
            isAutoOk
            isDivider
            isSearch
            drawerPadding={'20px 20px 0px 20px'}
          />
        ) : (
          <MemoInputField label="City" value={personalState.City} disabled={true} />
        )}
        {profileEditable ? (
          <MemoSelect
            placeholder="Time Zone"
            headerTitle="Time Zone"
            options={timezoneOption}
            setValues={handleTimeZoneName}
            values={personalState.TimeZoneName}
            helperText={personalError.TimeZoneName}
            disabled={!profileEditable || !Boolean(personalState.CountryCode)}
            parameter={'label'}
            optionsType={'radio'}
            position={'bottom'}
            isReturnSelectedOption
            isAutoOk
            isDivider
            isSearch
          />
        ) : (
          <MemoInputField label="Time Zone" value={personalState.TimeZoneName} disabled={true} />
        )}
        {profileEditable ? (
          <MemoSelect
            placeholder="Languages known"
            headerTitle="Languages known"
            options={LANGUAGES_OPTIONS}
            setValues={handlePreferredLanguages}
            values={personalState.PreferredLanguages}
            helperText={personalError.PreferredLanguages[0]}
            parameter={'label'}
            position={'bottom'}
            optionsType={'checkbox'}
            isDivider
            isSearch
            isToken
            isTokenDeletable
            renderValueAsToken
            renderValueAsTokenDeletable={profileEditable}
          />
        ) : (
          <MemoInputField
            label="Languages known"
            value={personalState.PreferredLanguages}
            disabled={true}
            multiline
            maxRows={3}
          />
        )}
      </div>
      {openGenderModified && (
        <MUIDrawer
          open={openGenderModified}
          anchor={'bottom'}
          handleClose={handleCloseModifiedDrawer}
          headerTitle={'Medically modified details'}
        >
          <MemoRadioGroup
            flexDirection="column"
            variant={'radio'}
            options={MODIFIED_DETAILS_OPTIONS}
            value={modifiedGender.MedicallyModifiedGender}
            setValue={handleMedicallyModifiedGender}
          />
          <div className={`${commonClasses.body15Medium} ${classes.subLabel2}`}>Let me Type</div>
          <InputField
            label="My gender"
            onChange={handleUserTypedGender}
            value={modifiedGender.userTypedGender}
            helperText={personalError.userTypedGender}
          />
          <div className={classes.buttonLeft}>
            <Button variant="contained" onClick={handleDoneModifiedGender}>
              Done
            </Button>
          </div>
        </MUIDrawer>
      )}
    </>
  );
}
