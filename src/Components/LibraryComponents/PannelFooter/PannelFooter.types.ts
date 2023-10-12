import { ButtonProps } from '@mui/material';
import { MouseEventHandler } from 'react';
export interface IProps {
  handleAdd: MouseEventHandler;
  handleCancel: MouseEventHandler;
  buttonOneTitle: String;
  buttonTwoTitle: String;
  customStyle?: string;
  buttonOneProps?: ButtonProps;
  buttonTwoProps?: ButtonProps;
}
