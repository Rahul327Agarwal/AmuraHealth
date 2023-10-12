import React from 'react';
import { SwitchStyled } from './MUISwitch.styles';
import { IProps } from './MUISwitch.types';

export default function MUISwitch(props: IProps) {
  return <SwitchStyled {...props} />;
}
