import { MouseEventHandler } from 'react';

export interface IProps {
  title?: any;
  textValue?: any;
  icon?: React.ReactElement;
  completeView?: boolean;
  onClick?: MouseEventHandler;
}
