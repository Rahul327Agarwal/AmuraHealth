import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { isValidNumberOrEmpty } from '../../../../Common/Common.functions';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import InputField  from '../../../LibraryComponents/InputField/InputField';
import MUIButton  from '../../../LibraryComponents/MUIButton/MUIButton';
import Checkbox  from '../../../LibraryComponents/MUICheckbox/MUICheckbox';
import MUIDrawer  from '../../../LibraryComponents/MUIDrawer/MUIDrawer';
import MUISelect  from '../../../LibraryComponents/MUISelect/MUISelect';
import Token  from '../../../LibraryComponents/MUIToken/MUIToken';
import PanelFooter  from '../../../LibraryComponents/PanelFooter/PanelFooter';
import { MinusIconV2 } from '../../../SVGs/Common';
import { DEFAULT_CUSTOM_NOTIFY, NOTIFICTION_OPTIONS, TIME_UNIT_OPTIONS } from '../TimeManagement.function';
import { useStyles } from '../TimeManagement.style';
import { AddNoticitionDrawerProps, ICustomNotifyState } from '../TimeManagement.types';

export default function AddNoticitionDrawer(props: AddNoticitionDrawerProps) {
  const { open, setOpen, notification, onNotificationChange } = props;

  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();

  const [openCustomNotify, setOpenCustomNotify] = useState(false);

  const [defaultNotify, setDefaultNotify] = useState<any>([]);
  const [customNotify, setCustomNotify] = useState([]);
  const [customNotifyState, setCustomNotifyState] = useState<Array<ICustomNotifyState>>([DEFAULT_CUSTOM_NOTIFY]);
  const [customError, setCustomError] = useState('');
  const [defaultError, setDefaultError] = useState('');

  useEffect(() => {
    if (notification) {
      const defaultdata: any = [];
      const customdata: any = [];
      const customInput: any = [];
      notification.forEach((data: any) => {
        if (NOTIFICTION_OPTIONS.includes(data) && !defaultdata.includes(data)) {
          defaultdata.push(data);
        } else {
          const datavalue = data?.split(' ');
          const inputObject = {
            time: datavalue[0] || '',
            unit: datavalue[1] || 'Minutes',
          };
          customdata.push(data);
          customInput.push(inputObject);
        }
      });
      setDefaultNotify(defaultdata);
      setCustomNotify(customdata);
      setCustomNotifyState(customInput.length ? customInput : [DEFAULT_CUSTOM_NOTIFY]);
    }
  }, [notification]);

  const onDeleteDefaultNotify = (data: any) => {
    const restData = defaultNotify.filter((d: any) => d !== data);
    setDefaultNotify(restData);
  };
  const onDeleteCustomNotify = (data: any) => {
    const restData = customNotify.filter((d) => d !== data);
    const restData2 = customNotifyState.filter((each) => each.time !== data.split(' ')[0] && each.unit !== data.split(' ')[1]);
    setCustomNotifyState(restData2.length ? restData2 : [DEFAULT_CUSTOM_NOTIFY]);
    setCustomNotify(restData);
  };

  const onNotifyTimeChange = (e: any, index: number) => {
    const time = e.target.value;
    let clonedata = [...customNotifyState];
    const cusrrentData = clonedata[index];
    if (isValidNumberOrEmpty(time) && time.length <= 3) {
      const validValue = Number(time) > 0 ? `${Number(time)}` : '';
      clonedata[index] = { ...cusrrentData, time: validValue };
      setCustomNotifyState(clonedata);
    }
  };

  const onNotifyUnitChange = (e: any, index: number) => {
    let clonedata = [...customNotifyState];
    const cusrrentData = clonedata[index];
    clonedata[index] = { ...cusrrentData, unit: e.target.value };
    setCustomNotifyState(clonedata);
  };

  const onAddNoticitionClose = () => {
    setOpen(false);
  };
  const onCustomNoticitionClose = () => {
    // setCustomNotify([]);
    // setCustomNotifyState([DEFAULT_CUSTOM_NOTIFY])
    setOpenCustomNotify(false);
  };

  const onSelect = (value: string) => {
    let preValue: any = [...defaultNotify];
    const index = preValue.indexOf(value);
    setDefaultError('');
    if (index !== -1) {
      preValue.splice(index, 1);
    } else if (defaultNotify.length + customNotifyState.length < 5) {
      preValue = [...preValue, value];
    } else {
      setDefaultError('Maximum 5 notification are only allowed');
    }
    setDefaultNotify(preValue);
  };
  const onAdd = () => {
    onNotificationChange([...defaultNotify, ...customNotify]);
    onAddNoticitionClose();
  };

  const onSaveCustomNoticition = () => {
    const stringdata: any = [];
    let isError = false;
    customNotifyState.forEach((data: any) => {
      if (data.time && data.unit) {
        const existingOptions = [...NOTIFICTION_OPTIONS, '1 minutes before'];
        const newValue = `${data.time} ${data.unit} before`;
        if (!existingOptions.includes(newValue) && !stringdata.includes(newValue)) {
          stringdata.push(newValue);
        } else isError = true;
      } else isError = true;
    });
    if (isError) return setCustomError('The number field is empty/invalid/duplicate.');
    setCustomError('');
    setCustomNotify(stringdata);
    onCustomNoticitionClose();
  };

  const onOpenCustomNotify = () => {
    setOpenCustomNotify(true);
  };

  const addMoreCustomInput = () => {
    const isPreValues = customNotifyState.every((data: any) => data?.time?.trim().length && data.unit);
    if (isPreValues) {
      setCustomError('');
      setCustomNotifyState((pre) => [...pre, DEFAULT_CUSTOM_NOTIFY]);
    } else setCustomError('The time field is empty/invalid.');
  };

  const onDeleteCustomInput = (index: number) => {
    const restData = customNotifyState.filter((_, i) => i !== index);
    //setCustomNotify(restData);
    const removeOptoionData = customNotifyState.filter((_, i) => i === index);
    const removeOption = `${removeOptoionData[0].time} ${removeOptoionData[0].unit} before`;
    const reemoveOptionFromCustomNotify = customNotify.filter((each) => each !== removeOption);
    setCustomNotify(reemoveOptionFromCustomNotify);
    setCustomNotifyState(restData);
  };

  return (
    <>
      <MUIDrawer
        anchor={'bottom'}
        headerTitle={'Notification'}
        open={!openCustomNotify && open}
        handleClose={onAddNoticitionClose}
      >
        <section className={classes.notifyBox}>
          <div className={classes.notifyTokenBox}>
            {defaultNotify.map((data: any, index: number) => (
              <Token key={data + index} label={data} active onDelete={() => onDeleteDefaultNotify(data)} />
            ))}
            {customNotify.map((data, index) => (
              <Token key={data + index} label={data} active onDelete={() => onDeleteCustomNotify(data)} />
            ))}
          </div>
          <div className={classes.notifyCheckBox}>
            {NOTIFICTION_OPTIONS.map((data: string, index: number) => (
              <li key={data + index} className={classes.menuListStyle} onClick={() => onSelect(data)}>
                <span className={`${commonClasses.body15Regular} ${classes.secondryText}`}>{data}</span>
                <Checkbox checked={defaultNotify.indexOf(data) > -1} />
              </li>
            ))}
            <li className={classes.menuListStyle} onClick={onOpenCustomNotify}>
              <span className={`${commonClasses.body15Regular} ${classes.secondryText}`}>Custom</span>
              {customNotify.length ? (
                <span className={`${commonClasses.body15Regular} ${classes.secondryText}`}>Added</span>
              ) : (
                <></>
              )}
            </li>
          </div>
          {defaultError ? <div className={`${commonClasses.caption12Medium} ${classes.errorStyle}`}>{defaultError}</div> : null}
          <MUIButton fullWidth size="large" variant="contained" onClick={onAdd}>
            Add
          </MUIButton>
        </section>
      </MUIDrawer>
      <MUIDrawer
        anchor={'bottom'}
        headerTitle={'Custom notification'}
        open={openCustomNotify}
        handleClose={onCustomNoticitionClose}
      >
        <div className={classes.customNotofyBox}>
          <div className={`${commonClasses.body15Medium} ${classes.primaryText}`}>Before</div>
          <section className={classes.customNotofyInputBox}>
            {customNotifyState.map((_, index) => (
              <div className={classes.customInputBox} key={index}>
                <InputField
                  className={classes.inputStyle}
                  label="Time"
                  value={customNotifyState[index]?.time}
                  onChange={(e) => onNotifyTimeChange(e, index)}
                />
                <MUISelect
                  value={customNotifyState[index]?.unit}
                  onChange={(e: any) => onNotifyUnitChange(e, index)}
                  options={TIME_UNIT_OPTIONS}
                  labelId={'MINITES' + index}
                  label="Unit"
                />
                <IconButton className={classes.minusIxon} onClick={() => onDeleteCustomInput(index)}>
                  <MinusIconV2 />
                </IconButton>
              </div>
            ))}

            {defaultNotify.length + customNotifyState.length < 5 ? (
              <div>
                <MUIButton variant="text" onClick={addMoreCustomInput}>
                  Add more
                </MUIButton>
              </div>
            ) : null}
          </section>
          {customError ? <div className={`${commonClasses.caption12Medium} ${classes.errorStyle}`}>{customError}</div> : null}
        </div>
        <PanelFooter
          paddingX="20px"
          customStyle={classes.footerStyle}
          leftButtonText={'Cancel'}
          righButtontText={'Save'}
          handleLeftButton={onCustomNoticitionClose}
          handleRightButton={onSaveCustomNoticition}
        />
      </MUIDrawer>
    </>
  );
}
