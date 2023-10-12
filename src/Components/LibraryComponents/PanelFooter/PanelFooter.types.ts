import { MouseEventHandler } from "react";

export interface IProps {
  leftButtonText: any;
  righButtontText: any;
  handleLeftButton: MouseEventHandler;
  handleRightButton: MouseEventHandler;
  disableRightButton?: boolean;
  customStyle?: string;
  paddingX?: string;
  buttonSize?: "large" | "medium" | "small";
  btnStyle?: string;
  panelWidth?: any;
  plusIcon?: any;
  injectComponent?: any;
  disableLeftButton?: boolean;
}
