import { Divider, FormControlLabel } from '@mui/material';
import React, { memo, useCallback, useState } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import InputField  from '../../../LibraryComponents/InputField/InputField';
import MUIDatePicker  from '../../../LibraryComponents/MUIDatePicker/MUIDatePicker';
import MUIDrawer  from '../../../LibraryComponents/MUIDrawer/MUIDrawer';
import Radio  from '../../../LibraryComponents/MUIRadio/MUIRadio';
import PanelFooter  from '../../../LibraryComponents/PanelFooter/PanelFooter';
import Select  from '../../../LibraryComponents/Select/Select';
import { DEFAULT_CUSTOM_REPEAT, REPEAT_EVERY_OPTIONS, TM_IDS } from '../TimeManagement.function';
import { useStyles } from '../TimeManagement.style';
import { CustomRepeatDrawerProps } from '../TimeManagement.types';
import DaysCheckBoxGroup from './DaysCheckBoxGroup';

const InputFieldMemo = memo(InputField);
const MemoSelect = memo(Select);
const MemoMUIDatePicker = memo(MUIDatePicker);

const CustomRepeatDrawer = (props: CustomRepeatDrawerProps) => {
  const { setCustomRepeat, eventdateforMonthOcc, open, setOpen } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();

  const [repeatsEvery, setRepeatsEvery] = useState(DEFAULT_CUSTOM_REPEAT.repeatsEvery);
  const [repeatType, setRepeatType] = useState(DEFAULT_CUSTOM_REPEAT.repeatType);
  const [weekDaysName, setWeekDaysName] = useState(DEFAULT_CUSTOM_REPEAT.weekDaysName);
  const [endsType, setEndsType] = useState(DEFAULT_CUSTOM_REPEAT.endsType);
  const [ends, setEnds] = useState(DEFAULT_CUSTOM_REPEAT.ends);
  const [endsOnError, setEndsOnError] = useState('');
  const [endsAferError, setEndsAfterError] = useState('');

  const onClose = () => {
    setOpen(false);
    // setCustomRepeat([])
    setEnds(DEFAULT_CUSTOM_REPEAT.ends);
    setEndsOnError('');
    setEndsAfterError('');
    setEndsType(DEFAULT_CUSTOM_REPEAT.endsType);
    setWeekDaysName(DEFAULT_CUSTOM_REPEAT.weekDaysName);
    setRepeatType(DEFAULT_CUSTOM_REPEAT.repeatType);
    setRepeatsEvery(DEFAULT_CUSTOM_REPEAT.repeatsEvery);
  };

  const handleSave = () => {
    if (endsType === TM_IDS.ON && !ends.on) return setEndsOnError('The field is empty/invalid.');
    if (endsType === TM_IDS.AFTER && !Number(ends.afterOccurrences)) return setEndsAfterError('The field is empty/invalid.');
    setEndsOnError('');
    setEndsAfterError('');
    const endsData = {
      [TM_IDS.NEVER]: { never: ends.never },
      [TM_IDS.ON]: { on: ends.on },
      [TM_IDS.AFTER]: { afterOccurrences: Number(ends.afterOccurrences) },
    };
    setCustomRepeat({
      repeatType,
      weekDaysName,
      ends: endsData[endsType],
      endsType,
      startDate: DEFAULT_CUSTOM_REPEAT.startDate,
      repeatsEvery,
      monthsOccurance: DEFAULT_CUSTOM_REPEAT.monthsOccurance,
      key: TM_IDS.CUSTOM_REPEAT,
    });
    onClose();
  };

  const daysArray = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const onRepeatOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    let days = [...weekDaysName];
    const index = days.indexOf(value);
    if (index !== -1) {
      if (weekDaysName.length > 1) days.splice(index, 1);
    } else {
      days = [...days, value];
    }
    const sortedDays = days.sort((a, b) => {
      let c = daysArray.indexOf(a);
      let d = daysArray.indexOf(b);
      return c - d;
    });
    setWeekDaysName(sortedDays);
  };

  const onRepeatTimeChange = useCallback((e: any) => {
    const { value } = e.target;
    let trimVal = value.length > 3 ? parseInt(value) : value;
    if (/^[1-9]\d{0,2}$/.test(trimVal) || value === '') {
      setRepeatsEvery(trimVal);
    }
  }, []);

  const onRepeatTypeChange = useCallback((e: any) => {
    setRepeatType(e);
    const data: any = { Days: 30, Weeks: 13, Months: 12, Years: 1 };
    setEnds((pre: any) => ({ ...pre, afterOccurrences: data[e] || DEFAULT_CUSTOM_REPEAT.ends.afterOccurrences }));
  }, []);

  const onEndsOnChange = useCallback((e: any) => {
    setEndsType(e);
    if (e === TM_IDS.NEVER) return setEnds((pre: any) => ({ ...pre, never: true }));
    return setEnds((pre: any) => ({ ...pre, never: false }));
  }, []);

  const onDateChange = useCallback((on: any) => {
    setEnds((pre: any) => ({ ...pre, on, afterOccurrences: DEFAULT_CUSTOM_REPEAT.ends.afterOccurrences }));
  }, []);

  const onOccurrencesChange = useCallback((e: any) => {
    const { value } = e.target;
    let trimVal = value.length > 3 ? parseInt(value) : value;
    if (/^\d{0,3}$/.test(trimVal) || value === '') {
      setEnds((pre: any) => ({ ...pre, afterOccurrences: trimVal }));
    }
  }, []);

  return (
    <MUIDrawer anchor={'bottom'} headerTitle={'Custom Repeat'} open={open} handleClose={onClose}>
      <div className={classes.repeatBody}>
        <section className={classes.repeatSection}>
          <div className={`${commonClasses.body15Medium} ${classes.primaryText}`}>Repeat every</div>
          <div className={classes.repeatEveryBox}>
            <InputFieldMemo
              label="Time"
              value={repeatsEvery}
              onChange={onRepeatTimeChange}
              onBlur={() => !repeatsEvery && setRepeatsEvery(1)}
            />
            <MemoSelect
              headerTitle={'Days'}
              placeholder={'Days'}
              values={repeatType}
              setValues={onRepeatTypeChange}
              options={REPEAT_EVERY_OPTIONS}
              optionsType={'label'}
              position={'bottom'}
              isDivider
              isAutoOk
            />
          </div>
        </section>
        {repeatType === TM_IDS.WEEKS && (
          <>
            <Divider className={classes.dividerStyle} />
            <section className={classes.repeatSection}>
              <div className={`${commonClasses.body15Medium} ${classes.primaryText}`}>Repeat on</div>
              <DaysCheckBoxGroup onChange={onRepeatOnChange} values={weekDaysName} />
            </section>
          </>
        )}
        <Divider className={classes.dividerStyle} />
        <section className={classes.repeatSection}>
          <div className={`${commonClasses.body15Medium} ${classes.primaryText}`}>Ends</div>
          <div className={classes.endsBox}>
            <FormControlLabel
              onClick={() => onEndsOnChange(TM_IDS.NEVER)}
              value={TM_IDS.NEVER}
              control={<Radio />}
              label={'Never'}
              checked={endsType === TM_IDS.NEVER}
              className={endsType === TM_IDS.NEVER ? 'checked' : ''}
            />
            <FormControlLabel
              onClick={() => onEndsOnChange(TM_IDS.ON)}
              value={TM_IDS.ON}
              control={<Radio />}
              label={'On'}
              checked={endsType === TM_IDS.ON}
              className={endsType === TM_IDS.ON ? 'checked' : ''}
            />
            <section className={classes.endsSection}>
              <MemoMUIDatePicker
                label="Date"
                // date={ends.on}
                date={endsType !== TM_IDS.ON ? null : ends.on}
                minDate={new Date(eventdateforMonthOcc)}
                setDate={onDateChange}
                disablePast
                disabled={endsType !== TM_IDS.ON}
                helperText={endsOnError}
                format={'E dd, LLL yyyy'}
              />
            </section>
            <FormControlLabel
              onClick={() => onEndsOnChange(TM_IDS.AFTER)}
              value={TM_IDS.AFTER}
              control={<Radio />}
              label={'After'}
              checked={endsType === TM_IDS.AFTER}
              className={endsType === TM_IDS.AFTER ? 'checked' : ''}
            />
            {endsType === TM_IDS.AFTER ? (
              <section className={classes.endsSection}>
                <InputFieldMemo
                  label="Value"
                  value={ends.afterOccurrences}
                  onChange={onOccurrencesChange}
                  helperText={endsAferError}
                />
              </section>
            ) : null}
          </div>
        </section>
      </div>
      <PanelFooter
        paddingX="20px"
        customStyle={classes.footerStyle}
        leftButtonText={'Cancel'}
        righButtontText={'Save'}
        handleLeftButton={onClose}
        handleRightButton={handleSave}
      />
    </MUIDrawer>
  );
};

export default CustomRepeatDrawer;
