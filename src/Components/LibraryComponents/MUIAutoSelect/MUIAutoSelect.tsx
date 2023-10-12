import { Autocomplete, Popper, PopperProps } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { ArrowDown } from '../../SVGs/Common';
import InputField from '../InputField/InputField';
import Checkbox from '../MUICheckbox/MUICheckbox';
import MUIProfileToken from '../MUIProfileToken/MUIProfileToken';
import { useStyles, useStylesForMenu } from './MUIAutoSelect.styles';
import { IProps, optionsType } from './MUIAutoSelect.types';

const CustomPopper = function (props: PopperProps) {
  const { classes } = useStylesForMenu();
  return <Popper {...props} className={classes.root} placement="bottom" />;
};

export default function MUIAutoSelect(props: IProps) {
  const {
    className,
    multiple,
    InputProps,
    error,
    reRenderOptions,
    OptionMenuProps,
    noDeletableToken,
    renderOption,
    options,
    ...restProps
  } = props;
  const { classes } = useStyles(props);
  const commonStyles = useCommonStyles();

  const [innerOptions, setInnerOptions] = useState<Array<optionsType>>(options);

  useEffect(() => {
    if (reRenderOptions) {
      setInnerOptions([...options]);
    }
  }, [options, reRenderOptions]);

  return (
    <Autocomplete
      disableClearable
      popupIcon={<ArrowDown />}
      forcePopupIcon
      getOptionLabel={(option: optionsType) => option?.label || ''}
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
      renderInput={(params) => <InputField error={error ? error : false} {...params} {...InputProps} />}
      {...{
        renderTags: (value, getTagProps: any) => {
          return (
            <div className={classes.profileTokenWrapper}>
              {value.map((option: optionsType, index) => {
                const { onDelete = () => {} } = getTagProps({ index });
                return (
                  <MUIProfileToken
                    key={option?.value}
                    userId={option?.value}
                    userName={option?.label}
                    {...(!noDeletableToken ? { onDelete } : {})}
                    subLabel={option?.subLabel}
                    isDefaultAvatarDark
                  />
                );
              })}
            </div>
          );
        },
      }}
      className={`${commonStyles.body15Regular} ${classes.SelectRoot} ${className}`}
      PopperComponent={CustomPopper}
      renderOption={(props: any, option: optionsType, { selected, ...rest }) => (
        <div className={classes.mainMenuWrapper}>
          {OptionMenuProps?.variant === 'checkbox' ? <Checkbox checked={selected} /> : null}

          {renderOption ? (
            renderOption(props, option, { selected, ...rest })
          ) : (
            <div {...props} className={`${classes.optionsWrap} ${OptionMenuProps?.customStyle}`}>
              <div className={`${commonStyles.body15Regular} ${classes.label}`}>{option?.label}</div>
              {option?.subLabel ? (
                <div className={`${commonStyles.caption12Regular} ${classes.label}`}>{option?.subLabel}</div>
              ) : null}
            </div>
          )}
        </div>
      )}
      options={reRenderOptions ? innerOptions : options}
      multiple={multiple}
      {...restProps}
    />
  );
}
