import React, { useEffect, useMemo, useState } from 'react';
import InputField from '../../../LibraryComponents/InputField/InputField';
import MUIAutoSelect from '../../../LibraryComponents/MUIAutoSelect/MUIAutoSelect';
import MUIDatePicker from '../../../LibraryComponents/MUIDatePicker/MUIDatePicker';
import MUISelect from '../../../LibraryComponents/MUISelect/MUISelect';
import { createTimeDropdownNew } from '../../UserRoleAssignment/ShiftSegment/ShiftSegment.types';
import { useStyles } from './ManageTab.styles';
export const RenderCriteriaInput = ({ matchCriteria, cardData, index, handleChange, options, dragDisabled, setDragDisabled }) => {
  const { classes } = useStyles({ matchCriteria, cardData, index, handleChange, options });
  const [timeDropdown] = useState(createTimeDropdownNew(new Date()));

  const availableOptions = useMemo(() => {
    let availableOptions = options.filter((item) => {
      const alreadySelected =
        matchCriteria === 'MULTISELECT' && cardData[index]?.value?.find((selection) => selection.value === item.value);
      return !alreadySelected;
    });
    return availableOptions;
  }, [cardData]);

  switch (matchCriteria) {
    case 'INPUT':
      return (
        <InputField
          label="Type name"
          value={cardData[index]?.value}
          onChange={(e) => {
            const inputValue = e.target.value.trim() ? e.target.value : e.target.value.trim();
            handleChange(index, 'value', inputValue);
          }}
        />
      );
    case 'SELECT':
      return (
        <MUISelect
          label="Select"
          placeholder="Select"
          options={options}
          value={cardData[index]?.value}
          onChange={(e: any) => {
            handleChange(index, 'value', e.target.value);
          }}
          labelId={'endTime'}
        />
      );
    case 'TIME':
      return (
        <MUISelect
          label="Time"
          placeholder="Time"
          options={timeDropdown}
          value={cardData[index]?.value?.toString()}
          onChange={(e: any) => {
            handleChange(index, 'endTime', e.target.value);
          }}
          labelId={'endTime'}
        />
      );
    case 'MULTISELECT':
      return (
        <MUIAutoSelect
          options={availableOptions}
          InputProps={{ label: 'Multi select', placeholder: 'Select' }}
          onChange={(event, participants) => {
            handleChange(index, 'value', participants);
          }}
          value={cardData[index]?.value}
          multiple
        />
      );
    case 'Number':
      return (
        <InputField
          label="Type Number"
          value={cardData[index]?.value}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            handleChange(index, 'value', value);
          }}
        />
      );
    case 'DATEANDTIME':
      return (
        <div className={classes.flex}>
          <div className={classes.w50}>
            <MUIDatePicker
              label="Date"
              date={!cardData[index]?.value ? null : new Date(cardData[index]?.value)}
              setDate={(e: any) => {
                let selectedDate = new Date(e);
                let selectedTime = new Date(cardData[index]?.value);
                selectedDate.setHours(selectedTime.getHours());
                selectedDate.setSeconds(selectedTime.getSeconds());
                selectedDate.setMinutes(selectedTime.getMinutes());
                selectedDate.setMilliseconds(selectedTime.getMilliseconds());
                handleChange(index, 'value', selectedDate.toISOString());
              }}
              onDrawerStateChange={(isOpen) => {
                setDragDisabled(isOpen);
              }}
              // setDate={onDateChange}
            />
          </div>
          <div className={classes.w50}>
            <MUISelect
              label="Time"
              placeholder="Time"
              options={createTimeDropdownNew(cardData[index]?.value)}
              value={cardData[index]?.value}
              onChange={(e: any) => {
                handleChange(index, 'value', e.target.value);
              }}
              labelId={'endTime'}
            />
          </div>
        </div>
      );
    default:
      return <></>;
  }
};
