import React from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import Checkbox  from '../MUICheckbox/MUICheckbox';
import { useStyles } from './MUICheckboxGroup.styles';
import { IProps } from './MUICheckboxGroup.types';

const MUICheckboxGroup = (props: IProps) => {
  const { customStyle, options, value, onChange, disabled } = props;

  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();

  const onSelect = (data: string) => {
    let preValue = [...value];
    const index = preValue.indexOf(data);
    if (index !== -1) {
      preValue.splice(index, 1);
    } else {
      preValue = [...preValue, data];
    }
    onChange(preValue);
  };

  return (
    <div className={`${classes.mainContainer} ${customStyle}`}>
      {options.map((data, index) => (
        <li key={data.value + index} className={classes.menuListStyle} onClick={() => !disabled && onSelect(data.value)}>
          <span className={`${commonClasses.body15Regular} ${classes.secondryText}`}>{data.label}</span>
          <Checkbox checked={value.includes(data.value)} />
        </li>
      ))}
    </div>
  );
};

export default MUICheckboxGroup;
