import React, { useState } from 'react';
import { DEFAULT_SNIPPETS } from '../Summary/Summary.function';
import InputField from './../../../LibraryComponents/InputField/InputField';
import Button from './../../../LibraryComponents/MUIButton/MUIButton';
import MUISelect from './../../../LibraryComponents/MUISelect/MUISelect';
import { useStyles } from './ChatNote.styles';
import { ITimeSelectInputProps } from './ChatNote.types';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { TickIcon } from '../../../SVGs/Common';

const UNIT_OPTIONS = [
  { label: 'Hours', value: 'Hour' },
  { label: 'Minute', value: 'Minute' },
  { label: 'Day', value: 'Day' },
];

const TimeSelectInput = (props: ITimeSelectInputProps) => {
  const { snippetId, headerText, handleProceed } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

  const [unitValue, setUnitValue] = useState('');
  const [unitType, setUnitType] = useState('Hour');

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    let trimVal = value.length > 3 ? parseInt(value) : value;
    if (/^[1-9]\d{0,2}$/.test(trimVal) || value === '') {
      setUnitValue(trimVal);
    }
  };

  const onProceed = () => {
    handleProceed({
      value: `${unitValue} ${unitType}${Number(unitValue) > 1 ? 's' : ''}`,
      time: Number(unitValue),
      units: unitType,
    });
  };

  return (
    <div className={classes.selectInputDrawerBox}>
      <div className={`${commonClasses.body17Medium} ${classes.questionHeader}`}>
        <span>{DEFAULT_SNIPPETS[snippetId]?.iconChat || ''}</span>
        <span>{headerText}</span>
      </div>
      <div className={classes.selectInputWrapper}>
        <InputField solidVariant value={unitValue} placeholder="Type here" onChange={handleInputChange} />
        <MUISelect
          variant="filled"
          options={UNIT_OPTIONS}
          value={unitType}
          onChange={(e: any) => setUnitType(e.target.value)}
          labelId={'SELECT_TIME_UNIT'}
          removePaddingTB={true}
          className={classes.timeType}
        />
      </div>
      <Button
        className={classes.selectInputButton}
        variant="contained"
        onClick={onProceed}
        startIcon={<TickIcon />}
        disabled={!unitValue}
      >
        Proceed
      </Button>
    </div>
  );
};

export default TimeSelectInput;
