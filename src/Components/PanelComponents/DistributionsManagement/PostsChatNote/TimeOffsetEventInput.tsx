import React, { useState } from 'react';
import Button from './../../../LibraryComponents/MUIButton/MUIButton';
import MUISelect from './../../../LibraryComponents/MUISelect/MUISelect';
import { DEFAULT_SNIPPETS } from '../Summary/Summary.function';
import { useStyles } from './ChatNote.styles';
import { ITimeOffsetEventInputProps } from './ChatNote.types';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { TickIcon } from '../../../SVGs/Common';

const UNIT_OPTIONS = [
  { label: 'Hours', value: 'Hour' },
  { label: 'Minute', value: 'Minute' },
  { label: 'Day', value: 'Day' },
];

const EVENT_OPTIONS = [
  { label: 'Before', value: 'Before' },
  { label: 'After', value: 'After' },
];

const OFFSET_OPTIONS = [
  { label: 'Breakfast', value: 'Breakfast' },
  { label: 'Lunch', value: 'Lunch' },
  { label: 'Dinner', value: 'Dinner' },
];

const NUMBER_OPTIONS: any = [];

for (let i = 1; i <= 60; i++) {
  NUMBER_OPTIONS.push({ label: i, value: i });
}

const TimeOffsetEventInput = (props: ITimeOffsetEventInputProps) => {
  const { snippetId, headerText, handleProceed } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

  const [unitValue, setUnitValue] = useState(1);
  const [unitType, setUnitType] = useState('Hour');
  const [eventType, setEventType] = useState('Before');
  const [offsetType, setOffsetType] = useState('Lunch');

  const onProceed = () => {
    handleProceed({
      value: `${unitValue} ${unitType}${unitValue > 1 ? 's' : ''} ${eventType} ${offsetType}`,
      time: Number(unitValue),
      offset: offsetType,
      at: eventType,
      units: unitType,
    });
  };

  return (
    <div className={classes.selectInputDrawerBox}>
      <div className={`${commonClasses.body17Medium} ${classes.questionHeader}`}>
        <span>{DEFAULT_SNIPPETS[snippetId]?.iconChat || ''}</span>
        <span>{headerText}</span>
      </div>
      <div className={classes.selectInputWrapperWithlabel}>
        <MUISelect
          options={NUMBER_OPTIONS}
          value={unitValue}
          onChange={(e: any) => setUnitValue(e.target.value)}
          labelId={'SELECT_TIME_VALUE'}
        />
        <MUISelect
          options={UNIT_OPTIONS}
          value={unitType}
          onChange={(e: any) => setUnitType(e.target.value)}
          labelId={'SELECT_UNIT_TYPE'}
        />
        <MUISelect
          options={EVENT_OPTIONS}
          value={eventType}
          onChange={(e: any) => setEventType(e.target.value)}
          labelId={'SELECT_TIME_UNIT'}
        />
      </div>
      <MUISelect
        fullWidth
        options={OFFSET_OPTIONS}
        value={offsetType}
        onChange={(e: any) => setOffsetType(e.target.value)}
        labelId={'SELECT_OFFSET'}
      />
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

export default TimeOffsetEventInput;
