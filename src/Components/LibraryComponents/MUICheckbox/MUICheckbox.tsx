import React from 'react';
import { CheckboxCheckedIcon, CheckboxUncheckedIcon } from './MUICheckbox.svg';
import { CheckboxStyled } from './Checkbox.styles';
import { IProps } from './Checkbox.types';

const Checkbox = (props: IProps) => (
  <CheckboxStyled
    {...props}
    icon={props?.icon ?? <CheckboxUncheckedIcon />}
    checkedIcon={props?.checkedIcon ?? <CheckboxCheckedIcon />}
  />
);

export default Checkbox;
