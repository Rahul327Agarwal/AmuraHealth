import React, { useState } from 'react';
import { minutesToTimeString } from '../../../../Common/Common.functions';
import InputField from '../../../LibraryComponents/InputField/InputField';
import MUIDrawer from '../../../LibraryComponents/MUIDrawer/MUIDrawer';
import PanelFooter from '../../../LibraryComponents/PanelFooter/PanelFooter';
import { TM_IDS, validateCustomDurationFields } from '../TimeManagement.function';
import { useStyles } from '../TimeManagement.style';
import { CustomDurationProps } from '../TimeManagement.types';

export default function CustomDuration(props: CustomDurationProps) {
  const { setCustomDuration, open, setOpen } = props;
  const { classes } = useStyles(props);

  const [duration, setDuration] = useState({ HH: '', MM: '' });
  const [error, setError] = useState({ HH: '', MM: '', duplicateValue: '' });

  const onHHChange = (event: any) => {
    const value = event.target.value;
    if (!(Number(value) < 24)) return;
    const trimVal = value; //value.length > 2 ? value.substring(1) : value;
    setError({ HH: '', MM: '', duplicateValue: '' });
    if (/^\d{0,4}$/.test(trimVal) || value === '') {
      const HH = Number(trimVal).toString();
      setDuration((pre) => ({ ...pre, HH }));
    }
  };
  const onMMChange = (event: any) => {
    const value = event.target.value;
    if (!(Number(value) < 60)) return;
    const trimVal = value; //value.length > 2 ? value.substring(1) : value;
    setError({ HH: '', MM: '', duplicateValue: '' });
    if (/^\d{0,4}$/.test(trimVal) || value === '') {
      const MM = Number(trimVal).toString();
      setDuration((pre) => ({ ...pre, MM }));
    }
  };

  const onCancel = () => {
    setCustomDuration({});
    setOpen(false);
  };
  const onSave = () => {
    const { isValid, errorsObject } = validateCustomDurationFields(duration);
    setError(errorsObject);
    if (!isValid) return;

    const totalMinutes = Number(duration.HH) * 60 + Number(duration.MM);
    setDuration({ HH: '', MM: '' });
    setCustomDuration({
      key: TM_IDS.CUSTOM_DURATION,
      value: `${totalMinutes}`,
      label: minutesToTimeString(totalMinutes),
    });
    setOpen(false);
  };

  return (
    <MUIDrawer anchor={'bottom'} headerTitle={'Custom duration'} open={open} handleClose={onCancel}>
      <div className={classes.customWrapper}>
        <div className={classes.customDurationBox}>
          <InputField helperText={error.HH} className={classes.inputStyle} label="HH" value={duration.HH} onChange={onHHChange} />
          <InputField helperText={error.MM} className={classes.inputStyle} label="MM" value={duration.MM} onChange={onMMChange} />
        </div>
        {error.duplicateValue && <span className={classes.errormsg}>{error.duplicateValue}</span>}
      </div>
      <PanelFooter
        paddingX="20px"
        customStyle={classes.footerStyle}
        leftButtonText={'Cancel'}
        righButtontText={'Save'}
        handleLeftButton={onCancel}
        handleRightButton={onSave}
      />
    </MUIDrawer>
  );
}
