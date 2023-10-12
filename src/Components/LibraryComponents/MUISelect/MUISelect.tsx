// import { KeyboardArrowDownOutlined } from '@material-ui/icons';

import { KeyboardArrowDownOutlined } from '@mui/icons-material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { ArrowDown } from '../../SVGs/Common';
import { useStyles } from './MUISelect.styles';
import { IProps } from './MUISelect.types';

const MUISelect = (props: IProps) => {
  const { type, options, labelId, variant, customStyle, customMenuProps, className, error, ...restProps } = props;
  const commonStyles = useCommonStyles();
  const { classes } = useStyles(props);

  switch (type) {
    case 'withIcon':
      return (
        <FormControl className={`${classes.FormControl} ${className}`} variant={variant || 'standard'}>
          <InputLabel className={classes.InputLabel} id={labelId}>
            {props.label}
          </InputLabel>
          <Select
            labelId={labelId}
            MenuProps={{
              className: `${classes.PopperRoot} ${customMenuProps?.className}`,
              anchorOrigin: customMenuProps?.anchorOrigin,
              transformOrigin: customMenuProps?.transformOrigin,
            }}
            className={`${commonStyles.body15Regular} ${classes.SelectRoot} ${customStyle}`}
            // TODO : Need to add icon
            IconComponent={ArrowDown}
            error={error ? error : false}
            {...restProps}
          >
            {options?.map((data) => (
              <MenuItem key={data.value} value={data.value}>
                <div className={classes.optionWrap}>
                  {data?.icon && <span className={classes.icon}>{data?.icon}</span>}
                  <span className={`${commonStyles.body15Regular} ${classes.optionLabel}`}> {data.label}</span>
                </div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );

    default:
      return (
        <FormControl className={`${classes.FormControl} ${className}`} variant={variant || 'standard'}>
          <InputLabel className={classes.InputLabel} id={labelId}>
            {props.label}
          </InputLabel>
          <Select
            labelId={labelId}
            MenuProps={{
              className: `${classes.PopperRoot} ${customMenuProps?.className}`,
              anchorOrigin: customMenuProps?.anchorOrigin,
              transformOrigin: customMenuProps?.transformOrigin,
            }}
            className={`${commonStyles.body15Regular} ${classes.SelectRoot} ${customStyle}`}
            // TODO : Need to add icon
            IconComponent={ArrowDown}
            error={error ? error : false}
            {...restProps}
          >
            {options?.map((data) => (
              <MenuItem key={data.value} value={data.value}>
                {data.label}
                {/* <span className={`${props.value==data.value? commonStyles.body15Medium : commonStyles.body15Regular} ${classes.optionLabel}`}> {data.label}</span> */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
  }
};

export default MUISelect;
