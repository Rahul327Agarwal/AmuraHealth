import { FormControl, Popper, TextField } from '@mui/material';
import { Autocomplete } from '@mui/material';
import React from 'react';
import { PMS_LOCALE } from '../../../../../Utils';
import { useStyles, useStylesForMenu } from './SearchAndSelect.styles';
import { IProps } from './SearchAndSelect.types';

const CustomPopper = function (props) {
  const { classes } = useStylesForMenu();
  return <Popper {...props} className={classes.root} placement="bottom" />;
};

export default function SearchAndSelect(props: IProps) {
  const { classes } = useStyles(props);
  const {
    options,
    value,
    onChange,
    onChangeInput,
    disabled,
    idParameter,
    labelParameter,
    placeHolder,
    freeSolo,
    label,
    showError,
    errorText,
    ListboxComponent,
    PopperComponent,
  } = props;
  const getSelectedItem = (list: any[], record: any) => {
    const item = list.find((opt) => {
      if (opt[idParameter] === record) return opt;
    });
    return item || { [idParameter]: '' };
  };
  return (
    <div>
      {label ? (
        <div>
          <span className={classes.label} title={label}>
            {PMS_LOCALE.translate(label)}
          </span>
        </div>
      ) : null}
      <FormControl fullWidth>
        <Autocomplete
          disableClearable
          className={`${classes.root} ${disabled ? classes.disabled : ''}`}
          options={options}
          slotProps={{ paper: { className: classes.noHorizonatal } }}
          value={Boolean(onChangeInput) ? value : getSelectedItem(options, value)}
          freeSolo={freeSolo}
          onChange={(e, value) => {
            onChange(value);
          }}
          onInputChange={(_, inputValue) => {
            if (freeSolo) onChange(inputValue);
          }}
          disabled={disabled}
          getOptionLabel={(option: any) => {
            return option[labelParameter];
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              className={`${classes.InputField} ${disabled ? classes.inputDisabled : ''}`}
              placeholder={PMS_LOCALE.translate(placeHolder)}
              InputProps={{ ...params.InputProps, disableUnderline: true }}
              onChange={(ev) => {
                if (ev.target.value && Boolean(onChangeInput)) {
                  onChangeInput(ev.target.value);
                }
              }}
            />
          )}
          PopperComponent={PopperComponent || CustomPopper}
          ListboxComponent={ListboxComponent}
        />
      </FormControl>
      {showError && errorText ? (
        <div>
          <span className={classes.errorText}>{errorText}</span>
        </div>
      ) : null}
    </div>
  );
}
