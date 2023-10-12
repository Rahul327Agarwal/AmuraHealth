import { InputAdornment } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getTimeFromTimeString } from '../../../Common/Common.functions';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { ArrowDown } from '../../SVGs/Common';
import InputField from '../InputField/InputField';
import MUIButton from '../MUIButton/MUIButton';
import MUIDrawer from '../MUIDrawer/MUIDrawer';
import MUISelect from '../MUISelect/MUISelect';
import { useStyles } from './MUITimePicker.styles';
import { IProps } from './MUITimePicker.types';

const AMPM_OPTIONS = [
  { label: 'AM', value: 'AM' },
  { label: 'PM', value: 'PM' },
];

export default function MUITimePicker(props: IProps) {
  const { value, onChange, label, headerTitle, disabled, customStyle, helperText, showSeconds } = props;

  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

  const [open, setOpen] = useState(false);
  const [time, setTime] = useState({ HH: '12', MM: '00', SS: '00', AMPM: 'AM' });
  const [error, setError] = useState({ HH: '', MM: '', SS: '' });

  useEffect(() => {
    if (value && open) {
      const { HH, MM, SS, AMPM } = getTimeFromTimeString(value)!;
      setTime({ HH: HH ?? '12', MM: MM ?? '00', SS: SS ?? '00', AMPM: AMPM ?? 'AM' });
    }
  }, [value, open]);

  const onClose = () => {
    setOpen(false);
    setError({ HH: '', MM: '', SS: '' });
  };

  const onAmpmChange = (event: any) => {
    const value = event.target.value;
    setTime((pre) => ({ ...pre, AMPM: value }));
  };

  const onInputChange = (event: any) => {
    const { name, value } = event.target;
    const trimedValue = value.trim();

    const REX = {
      HH: { min: 1, max: 12 },
      MM: { min: 0, max: 59 },
      SS: { min: 0, max: 59 },
    };

    const { min, max } = REX[name as keyof typeof REX];

    if (/^(\s*|\d{1,2})$/.test(trimedValue)) {
      if (Number(trimedValue) >= min && Number(trimedValue) <= max) setError((pre) => ({ ...pre, [name]: '' }));
      else setError((pre) => ({ ...pre, [name]: 'Invalid time' }));
      setTime((pre) => ({ ...pre, [name]: trimedValue }));
    }
  };

  const onDone = () => {
    if (error.HH || error.MM || error.SS) return;
    if (Boolean(showSeconds)) onChange(`${time.HH}:${time.MM ? time.MM : '00'}:${time.SS ? time.SS : '00'} ${time.AMPM}`);
    else onChange(`${time.HH}:${time.MM ? time.MM : '00'} ${time.AMPM}`);
    onClose();
  };

  return (
    <div className={`${classes.rootContainer} ${customStyle}`}>
      <InputField
        disabled={disabled}
        inputProps={{ readOnly: true }}
        InputProps={{ endAdornment: <InputAdornment position="start">{<ArrowDown />}</InputAdornment> }}
        label={label}
        value={value}
        helperText={helperText}
        fullWidth
        onClick={() => !disabled && setOpen(true)}
      />
      <MUIDrawer anchor={'bottom'} headerTitle={headerTitle} open={open} handleClose={onClose}>
        <section className={classes.mainInputWrapper}>
          <div className={classes.inputWrapper}>
            <InputField className={classes.inputStyle} label="HH" name="HH" value={time.HH} onChange={onInputChange} />
            <InputField className={classes.inputStyle} label="MM" name="MM" value={time.MM} onChange={onInputChange} />
            {Boolean(showSeconds) && (
              <InputField className={classes.inputStyle} label="SS" name="SS" value={time.SS} onChange={onInputChange} />
            )}
          </div>
          <MUISelect
            options={AMPM_OPTIONS}
            value={time.AMPM}
            onChange={onAmpmChange}
            labelId={''}
            customStyle={classes.borderBottom}
          />
        </section>
        {error.HH || error.MM || error.SS ? (
          <div className={`${commonClasses.caption12Regular} ${classes.errorText}`}>{error.HH || error.MM || error.SS}</div>
        ) : null}
        <div className={classes.footerWrapper}>
          <MUIButton variant="text" onClick={onClose}>
            Cancel
          </MUIButton>
          <MUIButton variant="contained" onClick={onDone}>
            Done
          </MUIButton>
        </div>
      </MUIDrawer>
    </div>
  );
}
