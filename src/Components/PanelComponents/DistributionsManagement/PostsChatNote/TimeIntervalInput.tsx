import React, { useState } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { TickIcon } from '../../../SVGs/Common';
import { DEFAULT_SNIPPETS } from '../Summary/Summary.function';
import Button from './../../../LibraryComponents/MUIButton/MUIButton';
import MUISelect from './../../../LibraryComponents/MUISelect/MUISelect';
import { useStyles } from './ChatNote.styles';
import { ITimeIntervalInputProps } from './ChatNote.types';

const UNIT_OPTIONS = [
  { label: 'Hours', value: 'Hour' },
  { label: 'Minute', value: 'Minute' },
  { label: 'Day', value: 'Day' },
];

const NUMBER_OPTIONS: any = [];

for (let i = 0; i <= 60; i++) {
  NUMBER_OPTIONS.push({ label: i, value: i });
}

const TimeIntervalInput = (props: ITimeIntervalInputProps) => {
  const { snippetId, headerText, handleProceed } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

  const [unitValue, setUnitValue] = useState(0);
  const [unitType, setUnitType] = useState('Hour');

  const onProceed = () => {
    handleProceed({
      value: `${unitValue} ${unitType}${unitValue > 1 ? 's' : ''}`,
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
      <div className={classes.selectInputWrapperWithlabel}>
        <span className={`${commonClasses.body15Medium} ${classes.labelHeader}`}>Every</span>
        <MUISelect
          customMenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
            className: classes.selectTimeStyle,
          }}
          options={NUMBER_OPTIONS}
          value={unitValue}
          onChange={(e: any) => setUnitValue(e.target.value)}
          labelId={'SELECT_TIME_VALUE'}
        />
        <MUISelect
          customMenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
            className: classes.selectTimeStyle,
          }}
          options={UNIT_OPTIONS}
          value={unitType}
          onChange={(e: any) => setUnitType(e.target.value)}
          labelId={'SELECT_TIME_UNIT'}
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

export default TimeIntervalInput;
