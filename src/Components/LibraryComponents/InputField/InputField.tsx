import { TextField } from '@mui/material';
import React from 'react';
import MUIProfileToken from '../MUIProfileToken/MUIProfileToken';
import Token from '../MUIToken/MUIToken';
import { useStyles } from './InputField.styles';
import { IProps } from './InputField.types';

export default function InputField(props: IProps) {
  const {
    renderValueAsToken,
    renderValueAsTokenDeletable,
    handleDeleteToken,
    solidVariant,
    placeholder,
    className,
    isSearchInput,
    isProfileToken,
    profileTokenList,
    onFocus,
    onBlur,
    name,
    value,
    characterLimit,
    ...rest
  } = props;
  const errorText = React.useMemo(() => {
    if (characterLimit>0 && typeof value === 'string') {
      if (value.length > characterLimit) {
        return `${value.length - characterLimit} characters over the limit`;
      } else {
        return '';
      }
    }
  }, [value]);
  const { classes } = useStyles({...props, errorText});

  return (
    <div className={classes.inputWrapper}>
      <TextField
        name={name}
        value={value}
        className={`${isSearchInput ? '' : classes.inputRootStyle} ${className}`}
        autoComplete="off"
        variant={solidVariant || isSearchInput ? 'outlined' : 'standard'}
        fullWidth
        placeholder={placeholder || ''}
        error={Boolean(errorText) || Boolean(props.helperText)}
        helperText={errorText ? '' : props.helperText}
        onFocus={() => Object.prototype.toString.call(onFocus) == '[object Function]' && onFocus()}
        onBlur={() => Object.prototype.toString.call(onBlur) == '[object Function]' && onBlur()}
        {...(renderValueAsToken
          ? {
              MenuProps: { className: classes.menu },
              select: true,
              SelectProps: {
                renderValue: (value: Array<string>) => {
                  return (
                    <div className={classes.tokenWrap}>
                      {value.map((data, index) => {
                        if (isProfileToken) {
                          const profile = profileTokenList?.find((token) => token.label === data);
                          const { subLabel, userId, profileLabel, value } = profile || {};
                          return (
                            <MUIProfileToken
                              minWidth={'143px'}
                              key={userId}
                              userId={userId}
                              userName={profileLabel || data}
                              onDelete={() => handleDeleteToken && handleDeleteToken(value)}
                              subLabel={subLabel}
                              isDefaultAvatarDark
                            />
                          );
                        }
                        return (
                          <Token
                            key={index}
                            label={data}
                            {...(renderValueAsTokenDeletable && { onDelete: () => handleDeleteToken && handleDeleteToken(data) })}
                          />
                        );
                      })}
                    </div>
                  );
                },
              },
            }
          : props.select
          ? { SelectProps: { MenuProps: { className: classes.menu } } }
          : {})}
        {...rest}
      />
      {characterLimit && characterLimit>0 && typeof value ==='string' ? (
        <div className={classes.errorText}>
          <span className={classes.errorHighlight}>{errorText}</span>
          <span className={!errorText ? classes.count : classes.errorHighlight}>
            {value.length}/{characterLimit}
          </span>
        </div>
      ) : null }
    </div>
  );
}
