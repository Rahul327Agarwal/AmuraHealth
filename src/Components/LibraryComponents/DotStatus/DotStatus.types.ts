import { MouseEventHandler } from 'react';

export interface IProps {
  color?: string;
  isSelected?: boolean;
  onClick?: MouseEventHandler;
  count?: number;
  opacityControl?: boolean;
}
