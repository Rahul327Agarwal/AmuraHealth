import { Divider, IconButton } from '@mui/material';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { isValidNumberOrEmpty } from '../../../../Common/Common.functions';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import InputField from '../../../LibraryComponents/InputField/InputField';
import Select from '../../../LibraryComponents/Select/Select';
import { BookablesIcon, CalendarIconV2, Close, VisibilityIcon } from '../../../SVGs/Common';
import { CHANNEL_ICON, VISIBILITY_OPTIONS } from '../TimeManagement.function';
import { useStyles } from '../TimeManagement.style';
import { InviteesCannotScheduleIcon, PeopleIcon } from '../TimeManagement.svg';
import { ISlotsProps } from '../TimeManagement.types';
import WithIconContainer from './WithIconContainer';
import MUISetTime from '../../../LibraryComponents/MUISetTime/MUISetTime';

const InputFieldMemo = memo(InputField);
const MemoMUISetTime = memo(MUISetTime);

export default function Slots(props: ISlotsProps) {
  const { bookableOptions, bookableObject, errors, slotsState, setSlotsState } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();

  const [fieldFocusState, setFieldFocusState] = useState({ maximumUses: false });

  const onMaxDayChange = useCallback((e: any) => {
    const value = e.target.value;
    if (isValidNumberOrEmpty(value)) {
      setSlotsState((pre: any) => ({ ...pre, allowedMaximumDays: value }));
    }
  }, []);

  const onMaxBookablesChange = useCallback((e: any) => {
    const value = e.target.value;
    if (isValidNumberOrEmpty(value)) {
      setSlotsState((pre: any) => ({ ...pre, maximumUses: value }));
    }
  }, []);
  const onvisibilityChange = useCallback((visibility: any) => {
    setSlotsState((pre: any) => ({ ...pre, visibility }));
  }, []);
  const handleSetTime = useCallback(({ totalSeconds }) => {
    setSlotsState((pre) => ({ ...pre, cannotBookBefore: totalSeconds ? String(totalSeconds) : '' }));
  }, []);

  // const onVisibilityChange = useCallback((visibility) => setEventsState((pre:any) => ({ ...pre, visibility })), []);

  const bookable = useMemo(() => bookableObject[slotsState.activityType] || {}, [bookableObject, slotsState.activityType]);
  return (
    <>
      <WithIconContainer Icon={<CalendarIconV2 />}>
        <InputFieldMemo
          label="Maximum days to open"
          value={slotsState.allowedMaximumDays}
          onChange={onMaxDayChange}
          helperText={errors.allowedMaximumDays}
          id='allowedMaximumDays'
        />
      </WithIconContainer>
      {/* <div
        className={classes.checkboxLabel}
        onClick={() => setSlotsState((pre) => ({ ...pre, useWorkingTime: !pre.useWorkingTime }))}
      >
        <Checkbox checked={slotsState.useWorkingTime} />
        <span className={`${commonClasses.body15Regular} ${classes.secondryText}`}>Use working time</span>
      </div> */}
      <Divider className={classes.dividerStyle} />
      <WithIconContainer Label="Bookables" Icon={<BookablesIcon />}>
        {!Boolean(slotsState.activityType) ? (
          <div id='activityType'>
            <Select
            headerTitle={'Bookables'}
            placeholder={'Select bookables'}
            values={slotsState.activityType}
            helperText={errors.activityType}
            setValues={(activityType: any) => setSlotsState((pre: any) => ({ ...pre, activityType }))}
            options={bookableOptions}
            optionsType={'label'}
            position={'bottom'}
            isDivider
            isAutoOk
          />
          </div>
          
        ) : (
          <section className={classes.bookedBox}>
            <header className={classes.bookedHeader}>
              <span className={`${commonClasses.body20Regular} ${classes.primaryText}`}>{slotsState?.activityType}</span>
              <IconButton onClick={() => setSlotsState((pre: any) => ({ ...pre, activityType: '' }))}>
                <Close />
              </IconButton>
            </header>
            <section className={classes.tableBox}>
              <div className={classes.tableRow}>
                <span className={commonClasses.body17Regular}>Activity Length</span>
                <span className={commonClasses.body17Regular}>
                  {bookable?.activityLength - bookable?.beforeActivity - bookable?.afterActivity} Minutes
                </span>
              </div>
              <div className={classes.tableRow}>
                <span className={commonClasses.body17Regular}>Before activity</span>
                <span className={commonClasses.body17Regular}>{bookable?.beforeActivity} Minutes</span>
              </div>
              <div className={classes.tableRow}>
                <span className={commonClasses.body17Regular}>After activity</span>
                <span className={commonClasses.body17Regular}>{bookable?.afterActivity} Minutes</span>
              </div>
            </section>
            <footer className={classes.bookedFooter}>
              <div className={classes.iconBox}>{CHANNEL_ICON[bookable?.channel] || ''}</div>
              <div className={`${commonClasses.body17Regular} ${classes.primaryText}`}>{bookable?.channel}</div>
            </footer>
            <span className={`${commonClasses.caption12Regular} ${classes.errorMsg}`}>{errors.bookables}</span>
          </section>
        )}
      </WithIconContainer>
      <WithIconContainer
        Icon={<PeopleIcon />}
        iconStyle={(slotsState.maximumUses || fieldFocusState.maximumUses) && classes.marginTop16}
      >
        <InputFieldMemo
          label="Maximum number of bookings in a day"
          value={slotsState.maximumUses}
          onChange={onMaxBookablesChange}
          onFocus={() => setFieldFocusState((prev) => ({ ...prev, maximumUses: true }))}
          onBlur={() => setFieldFocusState((prev) => ({ ...prev, maximumUses: false }))}
          helperText={errors.maximumUses}
          id='maximumUses'
        />
      </WithIconContainer>
      <Divider className={classes.dividerStyle} />
      <WithIconContainer Icon={<InviteesCannotScheduleIcon />}>
        <MemoMUISetTime
          inputLabel={'Invitees cannot schedule within'}
          isSuggestion
          onTimeChange={handleSetTime}
          helperText={''}
          inputValue={slotsState.cannotBookBefore}
        />
      </WithIconContainer>
      <Divider className={classes.dividerStyle} />
      <WithIconContainer Label="Visibility" Icon={<VisibilityIcon />}>
        <Select
          headerTitle={'visibility'}
          placeholder={'Default visibility'}
          values={slotsState.visibility}
          helperText={errors.visibility}
          // setValues={(visibility) => setSlotsState((pre) => ({ ...pre, visibility }))}
          setValues={onvisibilityChange}
          options={VISIBILITY_OPTIONS}
          optionsType={'radio'}
          position={'bottom'}
          isDivider
          isAutoOk
        />
      </WithIconContainer>
    </>
  );
}
