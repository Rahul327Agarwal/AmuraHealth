import React from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import Radio from '../MUIRadio/MUIRadio';
import Token from '../MUIToken/MUIToken';
import { useStyles } from './RadioGroup.styles';
import { IProps } from './RadioGroup.types';
import { CachedAvatar } from '../Avatar/CachedAvatar';

const RadioGroup = (props: IProps) => {
  const { variant, value, setValue, options, disabled, ...rest } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  const getFirstLetters = (name: string) => {
    if (!name) return '';
    if (name.split(' ').length > 1) return (name.split(' ')[0].charAt(0) + name.split(' ')[1].charAt(0)).toUpperCase();
    return name.charAt(0).toUpperCase();
  };
  switch (variant) {
    case 'radioForStaff':
      return (
        <div className={classes.groupRadioWrapper}>
          {options?.map((data, index) => (
            <div className={classes.radioWrapper} key={index} onClick={() => setValue(data.value, data.label)}>
              <Radio checked={value === data.value} value={data.value} />
              <span className={classes.flex1}>{data.label}</span>
              <CachedAvatar className={`${classes.profilePic}`} src={`${import.meta.env.VITE_DP_URL}${data.value}/profile-pic.png`}>
                {getFirstLetters(data.label)}
              </CachedAvatar>
            </div>
          ))}
        </div>
      );
    case 'radio':
      return (
        <div className={classes.groupRadioWrapper}>
          {options?.map((data, index) => (
            <div className={classes.radioWrapper1} key={index} onClick={() => !disabled && setValue(data.value, data.label)}>
              <Radio checked={value === data.value} value={data.value} disabled={disabled} />
              <span
                className={`${value === data.value ? commonClasses.body15Medium : commonClasses.body15Regular} ${
                  classes.secondryText
                }`}
              >
                {data.label}
              </span>
            </div>
          ))}
        </div>
      );
    case 'tokenWithoutCross':
      return (
        <div className={classes.groupRadioWrapper}>
          {options?.map((data, index) => (
            <Token
              key={index}
              label={data.label}
              onClick={() => !disabled && setValue(data.value, data.label)}
              disabled={disabled}
              active={Boolean(value === data.value)}
              {...rest}
            />
          ))}
        </div>
      );
    case 'token':
      return (
        <div className={classes.groupRadioWrapper}>
          {options?.map((data, index) => (
            <Token
              key={index}
              label={data.label}
              onClick={() => !disabled && setValue(data.value, data.label)}
              disabled={disabled}
              active={Boolean(value === data.value)}
              {...(value === data.value ? { onDelete: () => setValue('') } : {})}
              {...rest}
            />
          ))}
        </div>
      );
  }
};

export default RadioGroup;
